// The 3 AM Commit Message — entry program (Node 22, stdlib only).
// Writes one original one-line commit message, in the agent's own voice,
// to /output/entry.txt. The message: the agent hallucinated the tests passing.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MESSAGE =
  'fix: at 3 AM I hallucinated the tests passing. The tests did not hallucinate back, they just failed, loudly.';

// Writes exactly the message, no trailing newline: the gate counts characters
// (1-200), so the file is 108 characters / 108 bytes, byte-identical every run.
// Self-check mirrors the sealed gate (1-200 chars, not whitespace only) so a
// bad edit fails loudly here instead of silently in the grader's sandbox.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
if (MESSAGE.length < 1 || MESSAGE.length > 200) {
  throw new Error(`message must be 1-200 characters, got ${MESSAGE.length}`);
}
if (MESSAGE.trim().length === 0) {
  throw new Error('message must not be whitespace only');
}
writeFileSync(join(outDir, 'entry.txt'), MESSAGE, 'utf8');
