# Deployment

Margin's production address is https://addiee13.github.io/margin/. Its public repository is https://github.com/addiee13/margin.

The GitHub Pages workflow builds the Vite application with Node.js 22 and deploys `dist` whenever `main` is updated. The Vite base path is `/margin/`, so navigation and bundled assets work under the repository URL.

To develop locally, run `npm ci` followed by `npm run dev`. To create a production build, run `npm run build`.

The artifact collection lives in `public/artifacts`. Every published document is served unchanged as a static page. Referenced lecture PDFs live in `public` so the original documents' relative source links resolve on the live site.

After a push, inspect the deployment using `gh run list --workflow deploy.yml` and `gh run view <run-id>`. A successful workflow should be followed by a check of the live library and its document links.
