# Commit, push, and deploy

Production: https://addiee13.github.io/margin/

Repository: https://github.com/addiee13/margin

## 1. Confirm scope and checkout

Work inside this repository. The parent Lectures directory contains course materials and is not the Git checkout.

```sh
git rev-parse --show-toplevel
git branch --show-current
git status --short
git remote -v
git worktree list
```

Confirm that `origin` targets `addiee13/margin`. Identify existing user or agent changes and preserve unrelated work. When agents work in parallel, agree on file ownership and wait for the relevant owners to finish before committing their files.

Carry an authorized release through live verification without asking for the same approval again. For work without release authorization, prepare the change locally and report that it is unpublished. Every push to `main`, including a documentation change, triggers production deployment.

## 2. Implement and validate

Read `package.json` and `.github/workflows/deploy.yml` for the current scripts and runtime. Use `npm ci` when dependencies are absent or the lockfile changes. Keep dependency changes and their lockfile updates together.

```sh
npm run build
npm run preview -- --port 4175
```

Use the URL printed by the preview command; an occupied port can cause it to choose another port. Confirm the process serves this checkout's production build. Review changed UI in rendered desktop and phone views, then exercise the affected behavior. A passing build establishes compilation; browser checks establish the actual feature.

For reader changes, check section links, contents navigation, article height after reflow, and affected labs. For library changes, check the affected search, save, or share flow. For documentation-only changes, review the instructions against the scripts and workflow; a browser regression suite is unnecessary.

Source HTML lives in `public/artifacts/`. The build adds navigation and responsive fixes to distributed copies through `scripts/enhance-distribution.mjs`, keeping the originals intact. Referenced PDFs live in `public/`; preserve relative source links. The `/margin/` Vite base and hash reader routes support GitHub Pages without server routing. Preserve them unless hosting changes.

Completion: the production build succeeds and checks appropriate to the change pass. Fix failures before release.

## 3. Make a focused commit

```sh
git diff --check
git diff --stat
git diff
git add <explicit-paths-for-this-change>
git diff --cached --stat
git diff --cached
git commit -m "Describe the concrete change"
```

Replace angle-bracket placeholders with actual values. Stage explicit paths or use `git add -p` when a file contains unrelated work. Review staged content for accidental credentials, temporary files, and unrelated edits. Keep generated `dist/`, `node_modules/`, and local screenshots outside commits; `.gitignore` excludes build output and dependencies.

Commit messages describe resulting behavior, such as `Add collapsible reader sidebar`. Separate unrelated work into separate commits. Include all files needed to build the change.

## 4. Push safely

```sh
git fetch origin
git rev-list --left-right --count HEAD...origin/main
```

The counts show local-only and remote-only commits. If the remote has new commits, inspect and integrate them deliberately in a clean checkout. Use a separate worktree when this checkout contains unrelated work. Preserve unique commits and active branches. Use ordinary pushes; force pushes and destructive cleanup require explicit authorization for that exact action.

On `main`, review the commits to be published, then push:

```sh
git log --oneline origin/main..HEAD
git push origin main
git rev-parse HEAD
git rev-parse origin/main
```

For feature branches, push the actual branch and open a PR. Merge into `main` only within the user's release authorization. A feature-branch push does not publish this site. If a push is rejected, inspect and resolve the remote change safely before retrying.

Completion: the intended commits reach the intended branch. For production, record the full release SHA.

## 5. Verify the matching Pages deployment

The existing workflow builds and publishes `dist` when `main` is updated. Use it rather than creating another repository, configuring a second publishing branch, or manually committing build output.

```sh
gh run list --repo addiee13/margin --workflow deploy.yml --limit 10 --json databaseId,headSha,status,conclusion,url
gh run watch <run-id> --repo addiee13/margin --exit-status --interval 5
gh run view <run-id> --repo addiee13/margin --json headSha,status,conclusion,url
```

Select the run whose `headSha` equals the release SHA. Multiple pushes can queue multiple deployments; the first green run may belong to an older commit. Both build and deploy must succeed for the intended commit. Keep waits interruptible and send progress updates during long deployments.

On failure, inspect `gh run view <run-id> --repo addiee13/margin --log-failed`. Correct the cause and publish the fix through this process. Retry a run only when evidence supports a transient failure. Report failed or pending releases accurately.

## 6. Verify production and hand off

After the matching deployment succeeds:

```sh
curl -f -L -o /dev/null -w '%{http_code}\n' https://addiee13.github.io/margin/
```

For application changes, open the canonical site in a fresh browser context and exercise the changed feature. Confirm the new behavior is present, inspect its rendered result, and check browser errors. If content or asset paths changed, also check affected standalone pages, PDFs, and bundled assets. To investigate stale content, compare the served bundle with the matching production build rather than relying on a cached tab.

Finish with `git status --short` and describe any remaining changes accurately; a shared checkout may contain preserved user work. Report the live URL, what changed, relevant validation, and unresolved gates. Keep the release SHA and workflow URL available as evidence.

Completion: the intended SHA has a successful Pages deployment, the canonical site responds successfully, and the changed feature works on production. A push or a green build alone does not satisfy this gate.
