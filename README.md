# Chord Quiz

A tiny flashcard quiz for learning guitar chord shapes: a chord name shows up,
you try to picture the shape, then click to reveal the diagram — Ultimate
Guitar style.

- 60 chords: major, minor, 7, maj7, min7 across all 12 roots
- Filter by quality with the chips at the top
- Keyboard: `Space`/`Enter` to reveal, `→` next, `←` back
- Zero dependencies, zero build step — plain HTML/CSS/JS

## Run locally

Just open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Deploy

**GitHub Pages** — already wired up via `.github/workflows/pages.yml`. Enable
it once in the repo: **Settings → Pages → Source: GitHub Actions**. Every push
to `main` redeploys.

**Vercel** — import the repo, no config needed (static site, no build
command).
