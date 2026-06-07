# PickNotch — Deploy Guide (one-time, ~15 minutes, all free)

You'll put the files on GitHub, let Cloudflare Pages build + host them, then point picknotch.com. No coding, no Node install on your computer — Cloudflare builds it for you.

## Part 1 — GitHub (stores the files)
1. Free account at github.com.
2. Click the + (top right) -> New repository. Name: picknotch. Click Create repository.
3. On the new repo page click "uploading an existing file".
4. Drag in everything from this picknotch-site folder EXCEPT node_modules (there shouldn't be one here). Include: src, public, package.json, astro.config.mjs, README.md, .gitignore.
5. Click Commit changes.

## Part 2 — Cloudflare Pages (builds + hosts, free)
1. Free account at dash.cloudflare.com.
2. Workers & Pages -> Create -> Pages -> Connect to Git -> choose your picknotch repo.
3. Framework preset: pick "Astro" (it auto-fills Build command `npm run build`, Output dir `dist`).
4. Save and Deploy. Wait ~1-2 min -> you get a live URL like picknotch.pages.dev.

## Part 3 — Point picknotch.com
1. In your Pages project -> Custom domains -> Set up a domain -> enter picknotch.com.
2. Add picknotch.com to Cloudflare and update the nameservers at the registrar where you bought it to the two Cloudflare nameservers it shows.
3. When it verifies, picknotch.com serves your site over https automatically.

## Updating it later (the everyday job)
- Add a review: ask Claude or GPT to write it, save as `src/content/reviews/<name>.md` (copy the format of qronge-x1-spark.md), then in GitHub: Add file -> Upload files (or edit in the browser). Cloudflare rebuilds automatically in ~1 min.
- The fields at the top of each .md (score, price, code, pros, cons) drive the page AND the Google star-rating snippet.
- Optional upgrade later: add TinaCMS or Decap CMS for a friendly form-based editor instead of files.
