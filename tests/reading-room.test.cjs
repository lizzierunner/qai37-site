const assert = require("node:assert/strict");
const test = require("node:test");
const readings = require("../content/reading-room.json");

test("reading room contains the two approved public papers", () => {
  assert.deepEqual(readings.map((reading) => reading.url), [
    "https://arxiv.org/abs/2309.06180",
    "https://arxiv.org/abs/2312.03982",
  ]);
  assert.equal(new Set(readings.map((reading) => reading.id)).size, readings.length);
  for (const reading of readings) {
    for (const field of ["id", "title", "authors", "date", "topic", "note"]) {
      assert.equal(typeof reading[field], "string", field);
      assert.ok(reading[field].trim(), field);
    }
    assert.equal(new URL(reading.url).protocol, "https:");
  }
});

test("neutral-atom reading preserves the experimental scope caveat", () => {
  const reading = readings.find((entry) => entry.id === "logical-atom-arrays");
  assert.ok(reading.note.includes("not a demonstration of commercial AI advantage"));
});