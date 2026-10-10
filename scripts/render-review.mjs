import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

// Render the preserved, repository-owned Markdown into the same paper-style reader.
const directory = new URL("../public/artifacts/", import.meta.url);
const markdown = await readFile(new URL("review-and-mock-questions.md", directory), "utf8");
const body = marked.parse(markdown, { gfm: true });
const style = `:root{--ink:#1d1c1b;--mut:#6c6863;--line:#e6e3de;--hl:#fde7c4;--ac:#5b4fc7;--mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;--serif:Charter,Georgia,serif}*{box-sizing:border-box}body{margin:0;background:#f6f6f5;color:var(--ink);font:17px/1.85 var(--serif)}.sheet{max-width:56rem;margin:0 auto;background:#fff;padding:3.5rem 1.25rem 4rem}.col{max-width:40rem;margin:0 auto}h1{font-weight:400;font-size:clamp(1.8rem,5vw,2.4rem);line-height:1.18;margin:1rem 0 1.4rem;text-align:center}h2{font-size:1.2rem;margin:3.2rem 0 1rem}h3{font-size:1rem;margin:2rem 0 .6rem}p,li{font-size:.95rem}p{margin:0 0 1.25rem}a{color:var(--ac)}a:focus-visible{outline:2px solid var(--ac);outline-offset:3px}code{font-family:var(--mono);font-size:.82em;overflow-wrap:anywhere}pre{overflow:auto;background:#f6f6f5;padding:1rem}table{width:100%;border-collapse:collapse;font-size:.85rem;margin:1.5rem 0}th,td{padding:.5rem .6rem;border-bottom:1px solid var(--line);text-align:left;vertical-align:top;min-width:8rem}th{font:.65rem/1.5 var(--mono);color:var(--mut)}footer{border-top:1px solid var(--line);margin-top:3rem;padding-top:1rem;font:.7rem/1.6 var(--mono);color:var(--mut)}@media(max-width:560px){.sheet{padding:2rem .75rem}h1{font-size:1.9rem}}@media print{body{background:#fff}.sheet{padding:0}h2,h3{break-after:avoid}}`;
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lecture 6 Pruning Review and Mock Questions</title><style>${style}</style></head>
<body><div class="sheet"><div class="col">${body}
<footer>Published from the preserved <a href="review-and-mock-questions.md">Markdown study packet</a>. Practice questions are authored study material; source slide content is labeled separately.</footer>
</div></div></body></html>\n`;
const target = new URL("review-and-mock-questions.html", directory);
await writeFile(target, html);
console.log(`Rendered ${fileURLToPath(target)}`);
