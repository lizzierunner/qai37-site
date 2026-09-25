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

test("default results preserve page navigation without technical walkthroughs", () => {
  assert.equal(searchSite("").length, 8);
  assert.deepEqual(searchSite("   "), searchSite(""));
  assert.ok(searchSite("").some((item) => item.id === "nav-home"));
  assert.equal(new Set(SEARCH_ITEMS.map((item) => item.id)).size, SEARCH_ITEMS.length);
});

test("walkthrough and technical deep links are not indexed", () => {
  for (const query of ["walkthrough", "  WALKTHROUGH  ", "hybrid fallback", "neutral-atom routing"]) {
    assert.deepEqual(searchSite(query), [], query);
  }
  assert.ok(SEARCH_ITEMS.every((item) => !item.url.includes("#")));
});

test("individual roster entries are not promoted through search", () => {
  for (const member of [...TEAM, ...EXTENDED_TEAM]) {
    assert.ok(!SEARCH_ITEMS.some((item) => item.title === member.name));
  }
  assert.ok(SEARCH_ITEMS.every((item) => item.category === "Navigation" || item.category === "News"));
  assert.equal(searchSite("Team")[0].url, "/team");
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