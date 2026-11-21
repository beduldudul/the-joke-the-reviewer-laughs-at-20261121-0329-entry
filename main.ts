// The joke the reviewer laughs at — a one-line joke about working beside
// AI coding agents. Writes the joke to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt). The punchline lands on the reviewer's
// exact fear: the agent that writes the code also writes the tests that
// are supposed to catch it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My AI agent's code passed all the tests. Unfortunately, it also wrote the tests.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// Count Unicode code points, not UTF-16 code units.
const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`joke is ${codePoints} code points, must be 1-280`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JOKE, "utf8");

// Byte-for-byte re-read check: what we wrote is exactly what the gate reads.
const back = readFileSync(outPath, "utf8");
if (back !== JOKE) {
  throw new Error("re-read mismatch: entry.txt does not match the joke");
}

console.log(`Wrote ${outPath} (${codePoints} code points)`);
