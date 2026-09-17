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

const { findChatAnswer, CHAT_ANSWERS } = require("../lib/chatbot-data.ts");
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