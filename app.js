// Chord Quiz — flashcard-style guitar chord trainer.
// Frets are stored low-E to high-e: null = muted, 0 = open, n = fret n.

const ROOTS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// ---------- essential chords: full open / barre voicings, hand-verified ----------

const ESSENTIALS = [
  // --- C ---
  { name: "C",      quality: "major", frets: [null, 3, 2, 0, 1, 0] },
  { name: "Cm",      quality: "minor", frets: [null, 3, 5, 5, 4, 3] },
  { name: "C7",      quality: "dom7",  frets: [null, 3, 2, 3, 1, 0] },
  { name: "Cmaj7",   quality: "maj7",  frets: [null, 3, 2, 0, 0, 0] },
  { name: "Cm7",     quality: "min7",  frets: [null, 3, 5, 3, 4, 3] },
  // --- C# / Db ---
  { name: "C#",      quality: "major", frets: [null, 4, 6, 6, 6, 4] },
  { name: "C#m",     quality: "minor", frets: [null, 4, 6, 6, 5, 4] },
  { name: "C#7",     quality: "dom7",  frets: [null, 4, 6, 4, 6, 4] },
  { name: "C#maj7",  quality: "maj7",  frets: [null, 4, 6, 5, 6, 4] },
  { name: "C#m7",    quality: "min7",  frets: [null, 4, 6, 4, 5, 4] },
  // --- D ---
  { name: "D",       quality: "major", frets: [null, null, 0, 2, 3, 2] },
  { name: "Dm",      quality: "minor", frets: [null, null, 0, 2, 3, 1] },
  { name: "D7",      quality: "dom7",  frets: [null, null, 0, 2, 1, 2] },
  { name: "Dmaj7",   quality: "maj7",  frets: [null, null, 0, 2, 2, 2] },
  { name: "Dm7",     quality: "min7",  frets: [null, null, 0, 2, 1, 1] },
  // --- D# / Eb ---
  { name: "D#",      quality: "major", frets: [null, 6, 8, 8, 8, 6] },
  { name: "D#m",     quality: "minor", frets: [null, 6, 8, 8, 7, 6] },
  { name: "D#7",     quality: "dom7",  frets: [null, 6, 8, 6, 8, 6] },
  { name: "D#maj7",  quality: "maj7",  frets: [null, 6, 8, 7, 8, 6] },
  { name: "D#m7",    quality: "min7",  frets: [null, 6, 8, 6, 7, 6] },
  // --- E ---
  { name: "E",       quality: "major", frets: [0, 2, 2, 1, 0, 0] },
  { name: "Em",      quality: "minor", frets: [0, 2, 2, 0, 0, 0] },
  { name: "E7",      quality: "dom7",  frets: [0, 2, 0, 1, 0, 0] },
  { name: "Emaj7",   quality: "maj7",  frets: [0, 2, 1, 1, 0, 0] },
  { name: "Em7",     quality: "min7",  frets: [0, 2, 0, 0, 0, 0] },
  // --- F ---
  { name: "F",       quality: "major", frets: [1, 3, 3, 2, 1, 1] },
  { name: "Fm",      quality: "minor", frets: [1, 3, 3, 1, 1, 1] },
  { name: "F7",      quality: "dom7",  frets: [1, 3, 1, 2, 1, 1] },
  { name: "Fmaj7",   quality: "maj7",  frets: [1, 3, 2, 2, 1, 1] },
  { name: "Fm7",     quality: "min7",  frets: [1, 3, 1, 1, 1, 1] },
  // --- F# / Gb ---
  { name: "F#",      quality: "major", frets: [2, 4, 4, 3, 2, 2] },
  { name: "F#m",     quality: "minor", frets: [2, 4, 4, 2, 2, 2] },
  { name: "F#7",     quality: "dom7",  frets: [2, 4, 2, 3, 2, 2] },
  { name: "F#maj7",  quality: "maj7",  frets: [2, 4, 3, 3, 2, 2] },
  { name: "F#m7",    quality: "min7",  frets: [2, 4, 2, 2, 2, 2] },
  // --- G ---
  { name: "G",       quality: "major", frets: [3, 2, 0, 0, 0, 3] },
  { name: "Gm",      quality: "minor", frets: [3, 5, 5, 3, 3, 3] },
  { name: "G7",      quality: "dom7",  frets: [3, 2, 0, 0, 0, 1] },
  { name: "Gmaj7",   quality: "maj7",  frets: [3, 5, 4, 4, 3, 3] },
  { name: "Gm7",     quality: "min7",  frets: [3, 5, 3, 3, 3, 3] },
  // --- G# / Ab ---
  { name: "G#",      quality: "major", frets: [4, 6, 6, 5, 4, 4] },
  { name: "G#m",     quality: "minor", frets: [4, 6, 6, 4, 4, 4] },
  { name: "G#7",     quality: "dom7",  frets: [4, 6, 4, 5, 4, 4] },
  { name: "G#maj7",  quality: "maj7",  frets: [4, 6, 5, 5, 4, 4] },
  { name: "G#m7",    quality: "min7",  frets: [4, 6, 4, 4, 4, 4] },
  // --- A ---
  { name: "A",       quality: "major", frets: [null, 0, 2, 2, 2, 0] },
  { name: "Am",      quality: "minor", frets: [null, 0, 2, 2, 1, 0] },
  { name: "A7",      quality: "dom7",  frets: [null, 0, 2, 0, 2, 0] },
  { name: "Amaj7",   quality: "maj7",  frets: [null, 0, 2, 1, 2, 0] },
  { name: "Am7",     quality: "min7",  frets: [null, 0, 2, 0, 1, 0] },
  // --- A# / Bb ---
  { name: "A#",      quality: "major", frets: [null, 1, 3, 3, 3, 1] },
  { name: "A#m",     quality: "minor", frets: [null, 1, 3, 3, 2, 1] },
  { name: "A#7",     quality: "dom7",  frets: [null, 1, 3, 1, 3, 1] },
  { name: "A#maj7",  quality: "maj7",  frets: [null, 1, 3, 2, 3, 1] },
  { name: "A#m7",    quality: "min7",  frets: [null, 1, 3, 1, 2, 1] },
  // --- B ---
  { name: "B",       quality: "major", frets: [null, 2, 4, 4, 4, 2] },
  { name: "Bm",      quality: "minor", frets: [null, 2, 4, 4, 3, 2] },
  { name: "B7",      quality: "dom7",  frets: [null, 2, 1, 2, 0, 2] },
  { name: "Bmaj7",   quality: "maj7",  frets: [null, 2, 4, 3, 4, 2] },
  { name: "Bm7",     quality: "min7",  frets: [null, 2, 4, 2, 3, 2] },
];

// ---------- jazz / bossa shell voicings: generated, movable-shape family ----------
//
// Each quality is a compact 4-note shell: root on the 6th string ("E" family)
// or 5th string ("A" family), the other muted, and the three chord tones on
// strings D/G/B as a fixed fret offset from the root fret. Because the offset
// is fixed, the same physical shape transposes cleanly to all 12 roots — the
// offsets below were solved (and verified note-by-note) to keep every shape
// within a comfortable stretch, the way real jazz "shell voicing" method
// books teach them. Every quality ships as two independent shapes — root on
// the 6th string and root on the 5th string — so you learn it movable in two
// places on the neck, not just one fixed spot.

const JAZZ_SPECS = {
  "6":       { suffix: "6",       label: "6",
    E: { D: -1, G: 1,  B: 0 },  A: { D: 2,  G: -1, B: 2 } },
  "6/9":     { suffix: "6/9",     label: "6/9",
    E: { D: -1, G: -1, B: -3 }, A: { D: -1, G: -1, B: 0 } },
  m6:        { suffix: "m6",      label: "m6",
    E: { D: -1, G: 0,  B: 0 },  A: { D: 2,  G: -1, B: 1 } },
  m7b5:      { suffix: "m7b5",    label: "m7b5",
    E: { D: 0,  G: 0,  B: -1 }, A: { D: 1,  G: 0,  B: 1 } },
  dim7:      { suffix: "dim7",    label: "dim7",
    E: { D: -1, G: 0,  B: -1 }, A: { D: 1,  G: -1, B: 1 } },
  "9":       { suffix: "9",       label: "9",
    E: { D: 0,  G: -1, B: -3 }, A: { D: -1, G: 0,  B: 0 } },
  m9:        { suffix: "m9",      label: "m9",
    E: { D: 0,  G: -1, B: -4 }, A: { D: -2, G: 0,  B: 0 } },
  maj9:      { suffix: "maj9",    label: "maj9",
    E: { D: 1,  G: -1, B: -3 }, A: { D: -1, G: 1,  B: 0 } },
  "7b9":     { suffix: "7b9",     label: "7b9",
    E: { D: 0,  G: -2, B: -3 }, A: { D: -1, G: 0,  B: -1 } },
  "7#9":     { suffix: "7#9",     label: "7#9",
    E: { D: 0,  G: 0,  B: -3 }, A: { D: -1, G: 0,  B: 1 } },
  "7#5":     { suffix: "7#5",     label: "7#5",
    E: { D: 0,  G: 1,  B: 1 },  A: { D: 3,  G: 0,  B: 2 } },
  "7b5":     { suffix: "7b5",     label: "7b5",
    E: { D: 0,  G: 1,  B: -1 }, A: { D: 1,  G: 0,  B: 2 } },
  "7#11":    { suffix: "7#11",    label: "7#11",
    E: { D: 0,  G: 1,  B: -1 }, A: { D: 1,  G: 0,  B: 2 } },
  "9sus4":   { suffix: "9sus4",   label: "9sus4",
    E: { D: 0,  G: -1, B: -2 }, A: { D: 0,  G: 0,  B: 0 } },
  "13":      { suffix: "13",      label: "13",
    E: { D: 0,  G: 1,  B: 2 },  A: { D: -1, G: -1, B: -4 } },
  add9:      { suffix: "add9",    label: "add9",
    E: { D: -3, G: -1, B: -3 }, A: { D: -1, G: -3, B: 0 } },
  sus2:      { suffix: "sus2",    label: "sus2",
    E: { D: null, G: -1, B: 0 }, A: { D: 2,  G: null, B: 0 } },
  sus4:      { suffix: "sus4",    label: "sus4",
    E: { D: null, G: 2,  B: 0 }, A: { D: 0,  G: -3,   B: null } },
  aug:       { suffix: "aug",     label: "aug",
    E: { D: null, G: 1,  B: 1 }, A: { D: -1, G: -2,   B: null } },
  dim:       { suffix: "dim",     label: "dim",
    E: { D: null, G: 0,  B: -1 }, A: { D: 1, G: null, B: 1 } },
  mMaj7:     { suffix: "mMaj7",   label: "mMaj7",
    E: { D: 1,  G: 0,  B: 0 },  A: { D: 2,  G: 1,  B: 1 } },
  "maj7#5":  { suffix: "maj7#5",  label: "maj7#5",
    E: { D: 1,  G: 1,  B: 1 },  A: { D: -1, G: -2, B: -3 } },
  "maj7#11": { suffix: "maj7#11", label: "maj7#11",
    E: { D: 1,  G: 1,  B: -1 }, A: { D: 1,  G: 1,  B: 2 } },
  m11:       { suffix: "m11",     label: "m11",
    E: { D: 0,  G: 0,  B: -2 }, A: { D: 0,  G: 0,  B: 1 } },
};

function mod(a, n) {
  return ((a % n) + n) % n;
}

function buildJazzFrets(rootIdx, family, offsets) {
  const rootStringPC = family === "E" ? 4 : 9;
  let n = mod(rootIdx - rootStringPC, 12);
  const nonNull = [offsets.D, offsets.G, offsets.B].filter((o) => o !== null);
  const minOffset = Math.min(0, ...nonNull);
  if (n + minOffset < 0) n += 12;
  const D = offsets.D === null ? null : n + offsets.D;
  const G = offsets.G === null ? null : n + offsets.G;
  const B = offsets.B === null ? null : n + offsets.B;
  return family === "E" ? [n, null, D, G, B, null] : [null, n, D, G, B, null];
}

const JAZZ = [];
for (let r = 0; r < 12; r++) {
  for (const [key, spec] of Object.entries(JAZZ_SPECS)) {
    JAZZ.push({
      name: ROOTS[r] + spec.suffix,
      quality: key,
      voicing: "root on 6th string",
      frets: buildJazzFrets(r, "E", spec.E),
    });
    JAZZ.push({
      name: ROOTS[r] + spec.suffix,
      quality: key,
      voicing: "root on 5th string",
      frets: buildJazzFrets(r, "A", spec.A),
    });
  }
}

const CHORDS = ESSENTIALS.concat(JAZZ);

// ---------- category / quality metadata for the filter ----------

const CATEGORIES = [
  { key: "essentials", label: "Essentials", qualities: ["major", "minor", "dom7", "maj7", "min7"] },
  { key: "sixths", label: "Sixths", qualities: ["6", "6/9", "m6"] },
  { key: "extended", label: "Extended (9 / 11 / 13)", qualities: ["9", "m9", "maj9", "13", "add9", "m11"] },
  { key: "altered", label: "Altered dominants", qualities: ["7b9", "7#9", "7#5", "7b5", "7#11"] },
  { key: "diminished", label: "Diminished & half-dim", qualities: ["dim7", "m7b5", "dim"] },
  { key: "suspended", label: "Suspended", qualities: ["sus2", "sus4", "9sus4"] },
  { key: "augmented", label: "Augmented", qualities: ["aug", "mMaj7", "maj7#5", "maj7#11"] },
];

const QUALITY_LABEL = {
  major: "Major", minor: "Minor", dom7: "7", maj7: "Maj7", min7: "Min7",
};
for (const [key, spec] of Object.entries(JAZZ_SPECS)) QUALITY_LABEL[key] = spec.label;

const QUALITY_TO_CATEGORY = {};
CATEGORIES.forEach((cat) => cat.qualities.forEach((q) => (QUALITY_TO_CATEGORY[q] = cat.key)));

// ---------- chord diagram rendering (SVG, Ultimate-Guitar style) ----------

function renderDiagram(frets) {
  const played = frets.filter((f) => typeof f === "number" && f > 0);
  const maxFret = played.length ? Math.max(...played) : 1;
  const minFret = played.length ? Math.min(...played) : 1;
  const numFrets = 4;
  const startFret = maxFret <= numFrets ? 1 : minFret;

  const W = 150, marginX = 24;
  const stringXs = [0, 1, 2, 3, 4, 5].map(
    (i) => marginX + (i * (W - 2 * marginX)) / 5
  );
  const gridTop = 34;
  const fretH = 28;
  const gridBottom = gridTop + numFrets * fretH;

  // barre detection: lowest fretted value repeated across 2+ strings
  let barre = null;
  if (minFret > 0) {
    const idxs = frets
      .map((f, i) => (f === minFret ? i : -1))
      .filter((i) => i !== -1);
    if (idxs.length >= 2) {
      barre = { fret: minFret, from: idxs[0], to: idxs[idxs.length - 1] };
    }
  }

  let svg = `<svg viewBox="0 0 ${W} ${gridBottom + 14}" xmlns="http://www.w3.org/2000/svg">`;

  // string/fret grid
  for (let i = 0; i < 6; i++) {
    svg += `<line x1="${stringXs[i]}" y1="${gridTop}" x2="${stringXs[i]}" y2="${gridBottom}" stroke="var(--string)" stroke-width="1.5"/>`;
  }
  for (let r = 0; r <= numFrets; r++) {
    const y = gridTop + r * fretH;
    const isNut = r === 0 && startFret === 1;
    svg += `<line x1="${stringXs[0]}" y1="${y}" x2="${stringXs[5]}" y2="${y}" stroke="${isNut ? "var(--nut)" : "var(--string)"}" stroke-width="${isNut ? 4 : 1.5}"/>`;
  }

  if (startFret > 1) {
    svg += `<text x="${stringXs[0] - 10}" y="${gridTop + fretH * 0.65}" font-size="11" fill="var(--dim)" text-anchor="end">${startFret}fr</text>`;
  }

  // open / muted markers above nut
  frets.forEach((f, i) => {
    const x = stringXs[i];
    const y = gridTop - 14;
    if (f === null) {
      svg += `<text x="${x}" y="${y + 8}" font-size="13" fill="var(--dim)" text-anchor="middle">&#215;</text>`;
    } else if (f === 0) {
      svg += `<circle cx="${x}" cy="${y}" r="4.5" fill="none" stroke="var(--nut)" stroke-width="1.5"/>`;
    }
  });

  // barre bar
  if (barre) {
    const row = barre.fret - startFret;
    if (row >= 0 && row < numFrets) {
      const y = gridTop + row * fretH + fretH / 2;
      svg += `<rect x="${stringXs[barre.from] - 8}" y="${y - 8}" width="${stringXs[barre.to] - stringXs[barre.from] + 16}" height="16" rx="8" fill="var(--accent)"/>`;
    }
  }

  // finger dots
  frets.forEach((f, i) => {
    if (typeof f === "number" && f > 0) {
      const row = f - startFret;
      if (row < 0 || row >= numFrets) return;
      const x = stringXs[i];
      const y = gridTop + row * fretH + fretH / 2;
      svg += `<circle cx="${x}" cy="${y}" r="8" fill="var(--accent)" stroke="var(--card)" stroke-width="1.5"/>`;
    }
  });

  svg += `</svg>`;
  return svg;
}

// ---------- quiz state ----------

const state = {
  pool: [],
  queue: [],
  history: [],
  pos: -1,
  flipped: false,
  category: "all",
};

function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rebuildPool() {
  state.pool =
    state.category === "all"
      ? CHORDS
      : CHORDS.filter((c) => QUALITY_TO_CATEGORY[c.quality] === state.category);
  state.queue = shuffled(state.pool);
  state.history = [];
  state.pos = -1;
  advance();
}

function advance() {
  if (state.pos < state.history.length - 1) {
    state.pos++;
  } else {
    if (!state.queue.length) state.queue = shuffled(state.pool);
    const next = state.queue.pop();
    state.history.push(next);
    state.pos = state.history.length - 1;
  }
  setFlipped(false);
  render();
}

function goBack() {
  if (state.pos > 0) {
    state.pos--;
    setFlipped(false);
    render();
  }
}

function setFlipped(val) {
  state.flipped = val;
  cardInner.classList.toggle("flipped", val);
}

// ---------- DOM wiring ----------

const categorySelect = document.getElementById("categorySelect");
const card = document.getElementById("card");
const cardInner = document.getElementById("cardInner");
const chordNameEl = document.getElementById("chordName");
const chordNameBackEl = document.getElementById("chordNameBack");
const voicingFrontEl = document.getElementById("voicingFront");
const voicingBackEl = document.getElementById("voicingBack");
const diagramEl = document.getElementById("diagram");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const revealBtn = document.getElementById("revealBtn");

function populateCategorySelect() {
  const allOpt = document.createElement("option");
  allOpt.value = "all";
  allOpt.textContent = `All chords (${CHORDS.length})`;
  categorySelect.appendChild(allOpt);

  CATEGORIES.forEach((cat) => {
    const count = CHORDS.filter((c) => QUALITY_TO_CATEGORY[c.quality] === cat.key).length;
    const opt = document.createElement("option");
    opt.value = cat.key;
    opt.textContent = `${cat.label} (${count})`;
    categorySelect.appendChild(opt);
  });

  categorySelect.addEventListener("change", () => {
    state.category = categorySelect.value;
    rebuildPool();
  });
}

function render() {
  const chord = state.history[state.pos];
  if (!chord) return;
  chordNameEl.textContent = chord.name;
  chordNameBackEl.textContent = chord.name;
  voicingFrontEl.textContent = chord.voicing || "";
  voicingBackEl.textContent = chord.voicing || "";
  diagramEl.innerHTML = renderDiagram(chord.frets);
  progressEl.textContent = `${state.pos + 1} / ${state.pool.length} · ${QUALITY_LABEL[chord.quality]}`;
  prevBtn.disabled = state.pos === 0;
}

card.addEventListener("click", () => setFlipped(!state.flipped));
revealBtn.addEventListener("click", () => setFlipped(!state.flipped));
nextBtn.addEventListener("click", advance);
prevBtn.addEventListener("click", goBack);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "Enter") {
    e.preventDefault();
    setFlipped(!state.flipped);
  } else if (e.code === "ArrowRight") {
    advance();
  } else if (e.code === "ArrowLeft") {
    goBack();
  }
});

populateCategorySelect();
rebuildPool();
