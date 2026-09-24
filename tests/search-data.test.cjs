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
      esModuleInterop: true,
    },
  });
  module._compile(outputText, filename);
};

const { searchSite, SEARCH_ITEMS } = require("../lib/search-data.ts");
const { TEAM, EXTENDED_TEAM } = require("../lib/team-data.ts");
const { NEWS } = require("../lib/news-data.ts");

test("default results include navigation and the request walkthrough", () => {
  assert.equal(searchSite("").length, 8);
  assert.deepEqual(searchSite("   "), searchSite(""));
  assert.ok(searchSite("").some((item) => item.id === "guide-request"));
  assert.equal(new Set(SEARCH_ITEMS.map((item) => item.id)).size, SEARCH_ITEMS.length);
});

test("walkthrough and Wiki sections have direct destinations", () => {
  for (const query of ["walkthrough", "  WALKTHROUGH  ", "hybrid fallback", "neutral-atom routing"]) {
    assert.equal(searchSite(query)[0].url, "/#request-walkthrough", query);
  }
  assert.equal(searchSite("execution model")[0].url, "/wiki#execution");
  assert.equal(searchSite("glossary")[0].url, "/wiki#terms");
  assert.equal(searchSite("faq")[0].url, "/wiki#questions");
});

test("every team member's search result uses the current shared roster", () => {
  for (const member of [...TEAM, ...EXTENDED_TEAM]) {
    const result = searchSite(member.name)[0];
    assert.equal(result.title, member.name);
    assert.equal(result.subtitle, member.role);
    assert.equal(result.url, "/team");
    assert.ok(searchSite(`${member.name} ${member.role}`).some((item) => item.title === member.name));
  }
  assert.equal(searchSite("Michelle Microsoft")[0].title, "Michelle Holtmann");
  assert.ok(!SEARCH_ITEMS.some((item) => item.subtitle.includes("President & Chief Strategy Officer")));
});

test("exact titles rank first and unmatched terms do not broaden the query", () => {
  assert.equal(searchSite("Team")[0].id, "nav-team");
  assert.equal(searchSite("News")[0].id, "nav-news");
  assert.deepEqual(searchSite("Michelle nonexistentword"), []);
  assert.deepEqual(searchSite("zzzzzzzz"), []);
});

test("news search preserves current titles and external destinations", () => {
  const newsItems = SEARCH_ITEMS.filter((item) => item.category === "News");
  assert.equal(newsItems.length, NEWS.length);
  NEWS.forEach((post, index) => {
    assert.equal(newsItems[index].title, post.title);
    assert.equal(newsItems[index].url, post.url);
    assert.equal(newsItems[index].isExternal, true);
  });
});