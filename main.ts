import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "WARNING: Do not meet your past self. Do not kill your grandfather. Warranty void if parked in the Cretaceous.";

const MIN_CHARS = 1;
const MAX_CHARS = 120;

const length = [...ENTRY].length;
if (length < MIN_CHARS || length > MAX_CHARS) {
  throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${length}`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${length} characters)`);
