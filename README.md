# Chord Quiz

A tiny flashcard quiz for learning guitar chord shapes: a chord name shows up,
you try to picture the shape, then click to reveal the diagram — Ultimate
Guitar style.

- 636 chords across all 12 roots:
  - **Essentials** — major, minor, 7, maj7, min7 (hand-verified open/barre shapes)
  - **Jazz & bossa nova** — 6, 6/9, m6, 9, m9, maj9, 13, add9, m11, altered
    dominants (7b9, 7#9, 7#5, 7b5, 7#11), diminished/half-diminished, sus2,
    sus4, 9sus4, augmented, mMaj7, maj7#5, maj7#11 — each as **two movable
    shell voicings** (root on the 6th string and root on the 5th string)
- The jazz shapes aren't hand-typed: they're generated from a single
  transposable "shell voicing" formula per quality (root + 3 chord tones on
  strings D/G/B), verified note-by-note, so the same shape is guaranteed
  correct on every root.
- Filter by chord family with the dropdown
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
