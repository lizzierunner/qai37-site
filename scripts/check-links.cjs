const fs = require("node:fs");
const path = require("node:path");
const { load } = require("cheerio");

function checkExport(directory, basePath = "") {
  const root = path.resolve(directory);
  const prefix = basePath ? `/${basePath.replace(/^\/+|\/+$/g, "")}` : "";
  const errors = [];
  const documents = new Map();

  function collect(folder) {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const filename = path.join(folder, entry.name);
      if (entry.isDirectory()) collect(filename);
      else if (entry.name.endsWith(".html")) documents.set(filename, load(fs.readFileSync(filename, "utf8")));
    }
  }

  if (!fs.existsSync(root)) return { pages: 0, references: 0, errors: ["Export directory missing. Run npm run build first."] };
  collect(root);
  if (!documents.size) errors.push("No exported HTML pages found.");
  let references = 0;

  for (const [filename, document] of documents) {
    const relative = path.relative(root, filename).split(path.sep).join("/");
    const route = relative.replace(/index\.html$/, "");
    const sourceUrl = new URL(`${prefix}/${route}`, "https://export.invalid");
    document("a[href], img[src], script[src], link[href], source[src], video[src], video[poster], audio[src]").each((_, element) => {
      const node = document(element);
      const attributes = element.name === "video" ? ["src", "poster"] : [element.name === "a" || element.name === "link" ? "href" : "src"];
      for (const attribute of attributes) {
        const value = node.attr(attribute);
        if (value === undefined) continue;
        references += 1;
        const fail = (message) => errors.push(`${relative}: ${attribute}="${value}" - ${message}`);
        if (!value.trim()) { fail("empty destination"); continue; }
        let target;
        try { target = new URL(value, sourceUrl); } catch { fail("invalid URL"); continue; }
        if (target.protocol === "mailto:" || target.protocol === "tel:") {
          if (!target.pathname.trim()) fail("empty contact destination");
          continue;
        }
        if (target.protocol === "data:" || target.protocol === "blob:") continue;
        if (target.protocol !== "https:" && target.protocol !== "http:") { fail("unsupported URL scheme"); continue; }
        if (target.origin !== sourceUrl.origin) continue;
        let pathname;
        try { pathname = decodeURIComponent(target.pathname); } catch { fail("invalid URL encoding"); continue; }
        if (prefix && pathname !== prefix && !pathname.startsWith(`${prefix}/`)) { fail(`outside deployment base path ${prefix}`); continue; }
        const destination = path.resolve(root, `.${pathname.slice(prefix.length) || "/"}`);
        if (destination !== root && !destination.startsWith(`${root}${path.sep}`)) { fail("outside export directory"); continue; }
        const resolved = fs.existsSync(destination) && fs.statSync(destination).isDirectory() ? path.join(destination, "index.html") : destination;
        if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) { fail("missing local file or page"); continue; }
        if (element.name === "a" && target.hash && target.hash !== "#" && documents.has(resolved)) {
          let fragment;
          try { fragment = decodeURIComponent(target.hash.slice(1)); } catch { fail("invalid fragment encoding"); continue; }
          if (fragment.startsWith(":~:text=")) continue;
          const targetDocument = documents.get(resolved);
          const found = targetDocument("[id], a[name]").toArray().some((candidate) => candidate.attribs.id === fragment || candidate.attribs.name === fragment);
          if (!found) fail(`missing fragment #${fragment}`);
        }
      }
    });
  }
  return { pages: documents.size, references, errors };
}

if (require.main === module) {
  const result = checkExport(process.argv[2] || "out", process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_PAGES === "true" ? "/qai37-site" : ""));
  if (result.errors.length) {
    console.error(result.errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`Checked ${result.pages} pages and ${result.references} references: no broken internal links or assets.`);
  }
}

module.exports = { checkExport };