const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");

test("published entry points do not render or promote the withdrawn walkthrough", () => {
  for (const file of ["app/page.tsx", "app/wiki/page.tsx", "lib/search-data.ts", "lib/chatbot-data.ts"]) {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    assert.ok(!source.includes("request-walkthrough"), file);
    assert.ok(!source.includes("ArchitectureExplainer"), file);
  }
  assert.equal(fs.existsSync(path.join(root, "components/ArchitectureExplainer.tsx")), false);
});

test("chat UI retains starter questions without proactive contextual suggestions", () => {
  const source = fs.readFileSync(path.join(root, "components/ChatBot.tsx"), "utf8");
  assert.ok(source.includes("CHAT_SUGGESTIONS.map"));
  assert.ok(source.includes("messages.length === 1"));
  assert.ok(!source.includes("getChatSuggestions"));
  assert.ok(source.includes("findChatAnswer(trimmed)"));
  assert.ok(!source.includes("how the neutral-atom access layer works"));
  for (const capability of ["localStorage", "sessionStorage", "fetch(", "sendBeacon", "WebSocket"]) {
    assert.ok(!source.includes(capability), capability);
  }
});