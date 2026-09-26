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

const { TEAM, EXTENDED_TEAM } = require("../lib/team-data.ts");

test("every core and extended team member has concise experience highlights", () => {
  for (const member of [...TEAM, ...EXTENDED_TEAM]) {
    assert.ok(member.experience.length >= 1 && member.experience.length <= 3, member.name);
    assert.equal(new Set(member.experience).size, member.experience.length, member.name);
    for (const highlight of member.experience) {
      assert.equal(typeof highlight, "string", member.name);
      assert.ok(highlight.trim().length > 0 && highlight.length <= 140, member.name);
    }
  }
});

test("highlights retain the approved patent and education details", () => {
  const rick = TEAM.find((member) => member.name === "Rick Jahnke");
  assert.ok(rick.experience.includes("24 patents across heterogeneous computing, SoC design, and embedded systems."));
  const lizzie = EXTENDED_TEAM.find((member) => member.name === "Lizzie Johnson");
  assert.ok(lizzie.experience.includes("Full Stack Web Development student at Arizona State University."));
});