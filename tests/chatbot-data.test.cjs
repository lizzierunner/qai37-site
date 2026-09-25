const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const ts = require("typescript");

require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  module._compile(outputText, filename);
};

const { findChatAnswer, getChatSuggestions, CHAT_ANSWERS, CHAT_SUGGESTIONS } = require("../lib/chatbot-data.ts");
const { TEAM, EXTENDED_TEAM } = require("../lib/team-data.ts");

test("Michelle's title matches the current Team page data", () => {
  const michelle = TEAM.find((member) => member.name === "Michelle Holtmann");
  assert.equal(michelle.role, "Founding Advisor, Product & Strategic Partnerships");
  for (const question of [
    "What is Michelle's title?",
    "What is Michelle\u2019s title at qAI37?",
    "Who is Michelle Holtmann?",
    "What does Holtmann do?",
    "I'm Michelle, what is my title?",
    "Is Michelle the CEO?",
  ]) {
    const reply = findChatAnswer(question);
    assert.ok(reply.answer.includes(`${michelle.name} is qAI37's ${michelle.role}.`), question);
    assert.equal(reply.linkUrl, "/team");
  }
  assert.ok(!JSON.stringify(CHAT_ANSWERS).includes("President & Chief Strategy Officer"));
});

test("every member's name, role, and bio come from the shared roster", () => {
  for (const member of [...TEAM, ...EXTENDED_TEAM]) {
    for (const name of [member.name, member.name.split(" ")[0]]) {
      const reply = findChatAnswer(`What is ${name}'s role at qAI37?`);
      assert.ok(reply.answer.includes(`${member.name} is qAI37's ${member.role}.`), name);
      assert.ok(reply.answer.includes(member.bio), name);
      assert.equal(reply.linkUrl, "/team");
    }
  }
});

test("a shared surname includes both members rather than guessing", () => {
  const reply = findChatAnswer("Who is Jahnke?");
  assert.ok(reply.answer.includes("Steve Jahnke"));
  assert.ok(reply.answer.includes("Rick Jahnke"));
  const specificReply = findChatAnswer("Who is Rick Jahnke?");
  assert.ok(specificReply.answer.includes("Rick Jahnke"));
  assert.ok(!specificReply.answer.includes("Steve Jahnke"));
});

test("the team overview includes every current core name and title", () => {
  const reply = findChatAnswer("Who's on the team?");
  for (const member of TEAM) {
    assert.ok(reply.answer.includes(`${member.name} (${member.role})`));
  }
});

test("existing topics and unknown-question fallback still work", () => {
  for (const [question, expectedId] of [
    ["What is qAI37?", "what-is-qai37"],
    ["Are you building a quantum computer?", "quantum-computer"],
    ["How do I get in touch?", "contact"],
    ["What is the mission?", "mission"],
    ["Tell me about neutral-atom systems", "neutral-atom"],
    ["Explain post-silicon AI", "wiki"],
  ]) {
    assert.equal(findChatAnswer(question).id, expectedId, question);
  }
  assert.equal(findChatAnswer(""), undefined);
  assert.equal(findChatAnswer("unknown question"), undefined);
  assert.equal(findChatAnswer("What is my title?"), undefined);
});

test("person follow-ups use the last named member's shared bio and role", () => {
  for (const member of [...TEAM, ...EXTENDED_TEAM]) {
    const context = findChatAnswer(`Who is ${member.name}?`);
    for (const question of ["What's her background?", "What is his experience?", "What's their background?", "Tell me more"]) {
      const reply = findChatAnswer(question, context);
      assert.ok(reply.answer.includes(member.bio), question);
      assert.deepEqual(reply.memberNames, [member.name]);
      assert.equal(reply.linkUrl, "/team");
      assert.equal(findChatAnswer("What is their role?", reply).answer, `${member.name} is qAI37's ${member.role}.`);
    }
  }
});

test("explicit subjects override context and uncertain follow-ups are not guessed", () => {
  const michelle = findChatAnswer("Who is Michelle?");
  assert.equal(findChatAnswer("What is the mission?", michelle).id, "mission");
  assert.deepEqual(findChatAnswer("Who is Rick Jahnke?", michelle).memberNames, ["Rick Jahnke"]);
  for (const question of ["What is my title?", "What is her salary?", "unknown question", ""]) {
    assert.equal(findChatAnswer(question, michelle), undefined);
  }
  assert.equal(findChatAnswer("What's her background?"), undefined);
  assert.equal(findChatAnswer("What's her background?", findChatAnswer("What is the mission?")), undefined);
  assert.equal(findChatAnswer("What's their background?", findChatAnswer("Who is Jahnke?")), undefined);
});

test("topic follow-ups lead to related site content", () => {
  const context = findChatAnswer("What is qAI37?");
  for (const question of ["Tell me more", "How does it work?", "Can you explain that?"]) {
    assert.equal(findChatAnswer(question, context).id, "hybrid");
  }
  assert.equal(findChatAnswer("Tell me more"), undefined);
});

test("dynamic suggestions resolve and do not repeat the current answer", () => {
  assert.deepEqual(getChatSuggestions(), CHAT_SUGGESTIONS);
  const contexts = [
    ...CHAT_ANSWERS,
    findChatAnswer("Who is Jahnke?"),
    findChatAnswer("What's her background?", findChatAnswer("Who is Michelle?")),
  ];
  for (const context of contexts) {
    const suggestions = getChatSuggestions(context);
    assert.ok(suggestions.length >= 2 && suggestions.length <= 4);
    for (const suggestion of suggestions) {
      const reply = findChatAnswer(suggestion, context);
      assert.ok(reply, `${context.id}: ${suggestion}`);
      assert.notEqual(reply.answer, context.answer, suggestion);
    }
  }
});

test("the withdrawn walkthrough is absent from chatbot answers and suggestions", () => {
  assert.equal(findChatAnswer("Show me the walkthrough"), undefined);
  assert.equal(findChatAnswer("Explain the architecture"), undefined);
  assert.ok(!JSON.stringify(CHAT_ANSWERS).includes("request-walkthrough"));
  for (const answer of CHAT_ANSWERS) {
    assert.ok(!getChatSuggestions(answer).some((question) => question.includes("walkthrough")));
  }
});