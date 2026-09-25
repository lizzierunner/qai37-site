const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { checkExport } = require("../scripts/check-links.cjs");

function fixture(context, files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "qai37-links-"));
  context.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(files)) {
    const filename = path.join(root, name);
    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content);
  }
  return root;
}

test("checks local pages, fragments, encoded images and relative assets", (context) => {
  const root = fixture(context, {
    "index.html": '<a href="/wiki/?source=home#terms">Wiki</a><img src="/images/team%20photo.jpg"><script src="/app.js"></script><link rel="stylesheet" href="/style.css"><a href="mailto:contact@qai37.com">Contact</a><a href="https://example.com">External</a>',
    "wiki/index.html": '<h2 id="terms">Terms</h2><a href="../">Home</a>',
    "images/team photo.jpg": "image", "app.js": "", "style.css": "",
  });
  assert.deepEqual(checkExport(root).errors, []);
  assert.equal(checkExport(root).pages, 2);
});

test("reports missing routes, fragment targets, images and empty contacts", (context) => {
  const root = fixture(context, { "index.html": '<a href="/missing/">Missing</a><a href="#gone">Gone</a><img src="/missing.jpg"><a href="mailto:">Empty</a>' });
  const result = checkExport(root);
  assert.equal(result.errors.length, 4);
  assert.ok(result.errors.some((error) => error.includes("missing fragment #gone")));
  assert.ok(result.errors.some((error) => error.includes("empty contact destination")));
});

test("supports GitHub Pages prefixes and rejects links escaping them", (context) => {
  const root = fixture(context, {
    "index.html": '<a href="/qai37-site/wiki/#terms">Wiki</a><a href="/wiki/">Wrong prefix</a>',
    "wiki/index.html": '<h2 id="terms">Terms</h2>',
  });
  const result = checkExport(root, "/qai37-site");
  assert.equal(result.errors.length, 1);
  assert.ok(result.errors[0].includes("outside deployment base path"));
});

test("rejects empty exports and malformed references", (context) => {
  const root = fixture(context, { "index.html": '<img src=""><a href="/%ZZ">Bad</a><a href="javascript:void(0)">Bad scheme</a>' });
  assert.equal(checkExport(root).errors.length, 3);
  assert.equal(checkExport(path.join(root, "missing")).errors.length, 1);
});