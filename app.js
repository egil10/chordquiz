// Chord Quiz — flashcard-style guitar chord trainer.
// Frets are stored low-E to high-e: null = muted, 0 = open, n = fret n.

const QUALITY_LABELS = {
  major: "Major",
  minor: "Minor",
  dom7: "7",
  maj7: "Maj7",
  min7: "Min7",
};

const CHORDS = [
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
  if (startFret === minFret && minFret > 0) {
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
    svg += `<line x1="${stringXs[i]}" y1="${gridTop}" x2="${stringXs[i]}" y2="${gridBottom}" stroke="#4a463c" stroke-width="1.5"/>`;
  }
  for (let r = 0; r <= numFrets; r++) {
    const y = gridTop + r * fretH;
    const isNut = r === 0 && startFret === 1;
    svg += `<line x1="${stringXs[0]}" y1="${y}" x2="${stringXs[5]}" y2="${y}" stroke="${isNut ? "#f3f1ec" : "#4a463c"}" stroke-width="${isNut ? 4 : 1.5}"/>`;
  }

  if (startFret > 1) {
    svg += `<text x="${stringXs[0] - 10}" y="${gridTop + fretH * 0.65}" font-size="11" fill="#9a9691" text-anchor="end">${startFret}fr</text>`;
  }

  // open / muted markers above nut
  frets.forEach((f, i) => {
    const x = stringXs[i];
    const y = gridTop - 14;
    if (f === null) {
      svg += `<text x="${x}" y="${y + 8}" font-size="13" fill="#9a9691" text-anchor="middle">&#215;</text>`;
    } else if (f === 0) {
      svg += `<circle cx="${x}" cy="${y}" r="4.5" fill="none" stroke="#f3f1ec" stroke-width="1.5"/>`;
    }
  });

  // barre bar
  if (barre) {
    const row = barre.fret - startFret;
    const y = gridTop + row * fretH + fretH / 2;
    svg += `<rect x="${stringXs[barre.from] - 8}" y="${y - 8}" width="${stringXs[barre.to] - stringXs[barre.from] + 16}" height="16" rx="8" fill="#e8b84b"/>`;
  }

  // finger dots
  frets.forEach((f, i) => {
    if (typeof f === "number" && f > 0) {
      const row = f - startFret;
      if (row < 0 || row >= numFrets) return;
      const x = stringXs[i];
      const y = gridTop + row * fretH + fretH / 2;
      svg += `<circle cx="${x}" cy="${y}" r="8" fill="#e8b84b" stroke="#1e1c18" stroke-width="1.5"/>`;
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
  activeQualities: new Set(Object.keys(QUALITY_LABELS)),
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
  state.pool = CHORDS.filter((c) => state.activeQualities.has(c.quality));
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

const filtersEl = document.getElementById("filters");
const card = document.getElementById("card");
const cardInner = document.getElementById("cardInner");
const chordNameEl = document.getElementById("chordName");
const chordNameBackEl = document.getElementById("chordNameBack");
const diagramEl = document.getElementById("diagram");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const revealBtn = document.getElementById("revealBtn");

function buildFilters() {
  const allChip = document.createElement("button");
  allChip.className = "chip active";
  allChip.textContent = "All";
  allChip.addEventListener("click", () => {
    state.activeQualities = new Set(Object.keys(QUALITY_LABELS));
    syncChips();
    rebuildPool();
  });
  filtersEl.appendChild(allChip);

  Object.entries(QUALITY_LABELS).forEach(([key, label]) => {
    const chip = document.createElement("button");
    chip.className = "chip active";
    chip.textContent = label;
    chip.dataset.key = key;
    chip.addEventListener("click", () => {
      if (state.activeQualities.has(key)) {
        if (state.activeQualities.size === 1) return; // keep at least one
        state.activeQualities.delete(key);
      } else {
        state.activeQualities.add(key);
      }
      syncChips();
      rebuildPool();
    });
    filtersEl.appendChild(chip);
  });
}

function syncChips() {
  const chips = filtersEl.querySelectorAll(".chip");
  const all = state.activeQualities.size === Object.keys(QUALITY_LABELS).length;
  chips.forEach((chip) => {
    if (!chip.dataset.key) {
      chip.classList.toggle("active", all);
    } else {
      chip.classList.toggle("active", state.activeQualities.has(chip.dataset.key));
    }
  });
}

function render() {
  const chord = state.history[state.pos];
  if (!chord) return;
  chordNameEl.textContent = chord.name;
  chordNameBackEl.textContent = chord.name;
  diagramEl.innerHTML = renderDiagram(chord.frets);
  progressEl.textContent = `${state.pos + 1} / ${state.pool.length} · ${QUALITY_LABELS[chord.quality]}`;
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

buildFilters();
rebuildPool();
