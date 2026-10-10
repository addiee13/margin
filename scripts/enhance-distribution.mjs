import { readFile, writeFile, readdir } from "node:fs/promises";
// Add publication navigation and narrow-screen fixes only to the distributed copies.
for (const name of await readdir("dist/artifacts")) {
  if (!name.endsWith(".html")) continue;
  const path = `dist/artifacts/${name}`;
  let html = await readFile(path, "utf8");
  const style = `<style>.margin-bar{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:15px 22px;border-bottom:1px solid #ded9ce;background:#f7f5ef;font:12px/1.5 ui-monospace,monospace}.margin-bar a{text-decoration:none;color:#5b4fc7}.margin-bar a:focus-visible{outline:2px solid #5b4fc7;outline-offset:4px}.margin-table{overflow-x:auto;max-width:100%}@media(max-width:560px){.mx span{width:clamp(1.45rem,7vw,2.6rem)!important;font-size:.6rem!important}.mx.sm span{width:clamp(1.35rem,5.6vw,2.1rem)!important}#g-mx span{font-size:.56rem!important}#c-vis{gap:2px!important}#c-vis span{width:clamp(.6rem,2.7vw,1.2rem)!important;height:clamp(.6rem,2.7vw,1.2rem)!important}.eq{overflow-x:auto}.lab{padding:.7rem!important}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important}}</style>`;
  html = html
    .replace("</head>", style + "</head>")
    .replace(
      "<body>",
      '<body><nav class="margin-bar" aria-label="Margin reading room"><a href="../#/">← Library</a><a href="../#/read/' +
        name.replace(".html", "") +
        '">Read in Margin ↗</a></nav>',
    );
  html = html.replace(
    "</body>",
    '<script>document.querySelectorAll("table").forEach(function(t){var w=document.createElement("div");w.className="margin-table";t.parentNode.insertBefore(w,t);w.appendChild(t)})</script></body>',
  );
  await writeFile(path, html);
}
