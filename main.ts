// Funniest Time Machine Warning Label — entry program.
//
// Writes a single one-line warning label to /output/entry.txt.
// Gate: UTF-8 text, 1 to 120 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";

// The entry: a real time-travel hazard (meeting your duplicate self) turned
// into the joke, phrased as a deadpan safety notice, with the surprise saved
// for the last few words.
const ENTRY =
  "WARNING: If you meet yourself, do not speak. They already regret this conversation.";

// Runtime validation matching the sealed gate: 1..120 characters,
// not only whitespace, a single line, and valid UTF-8.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 120) {
  throw new Error(`entry is ${charCount} characters, must be 1..120`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}
const byteCount = Buffer.byteLength(ENTRY, "utf8");
if (byteCount > 120) {
  throw new Error(`entry is ${byteCount} bytes, must be at most 120`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Verify what was written is byte-for-byte the entry.
import { readFileSync } from "node:fs";
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("written entry.txt does not match the entry text");
}
console.log(`wrote ${charCount} chars (${byteCount} bytes) to /output/entry.txt`);
