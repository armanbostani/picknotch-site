# PickNotch — website

An Astro site. Every review is one Markdown file in `src/content/reviews/`.
Brand: navy #1C2540 + cyan #22D3EE. Tagline: "A notch above the usual picks."

## Add or update a review (the everyday job)
1. Ask Claude or GPT: "write a PickNotch review for <brand/product>."
2. Save it as `src/content/reviews/<slug>.md` (copy the format of `qronge-x1-spark.md`).
3. Commit / upload the file. The site rebuilds and the review is live in ~1 minute.
That's it — no code touched. The fields at the top (score, price, code, pros, cons) drive the page and the Google star-rating snippet automatically.

## Run locally (optional)
    npm install
    npm run dev      # preview at localhost:4321
    npm run build    # output in dist/

## Deploy (one-time) — see Deploy_Guide for click-by-click.
