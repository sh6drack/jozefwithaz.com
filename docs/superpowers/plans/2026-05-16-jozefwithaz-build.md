# jozefwithaz.com Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal static artist hub at jozefwithaz.com — header, inline track player, bio, AVDP feature link, mailing list, contact — ready for handoff to Jozef's GitHub account.

**Architecture:** Plain HTML/CSS/JS, no build step, no framework. One `index.html`, one `style.css`, one `app.js`, one `tracks.json`. Hosted on GitHub Pages. Mailing list submissions posted to a configurable Formspree endpoint. Verification is done in a live browser preview, not via an automated test harness — adding a test toolchain would only get in the way of a non-developer maintainer.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox), vanilla ES2020, native `<audio>`, Formspree, GitHub Pages.

---

## File Structure

| File | Responsibility |
|---|---|
| `index.html` | Semantic single-page markup. All copy except track titles. Noscript fallback inside the Tracks section. |
| `style.css` | All visual styling. Color and font tokens at top. One mobile breakpoint. |
| `app.js` | Three concerns: render tracks from `tracks.json`, drive the audio player, submit the mailing list form. |
| `tracks.json` | Track metadata, the only file Jozef edits to add a track. |
| `audio/*.mp3` | Audio files referenced from `tracks.json`. |
| `fonts/jetbrains-mono.woff2` | Self-hosted display font. |
| `img/favicon.svg` | Single-color mono "J" favicon. |
| `CNAME` | `jozefwithaz.com`. |
| `.gitignore` | macOS / editor cruft. |
| `README.md` | Handoff doc for Jozef. |

The working directory for every command in this plan is `/Users/shadrack/projects/jozefwithaz.com`.

---

### Task 1: Scaffold and shell

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `app.js`
- Create: `.gitignore`
- Create: `CNAME`

- [ ] **Step 1: Create `.gitignore`**

```
.DS_Store
.vscode/
.idea/
*.swp
node_modules/
```

- [ ] **Step 2: Create `CNAME`**

```
jozefwithaz.com
```

- [ ] **Step 3: Create `index.html` with shell only**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Jozef With a Z</title>
  <meta name="description" content="Jozef With a Z. The Range, forthcoming." />
  <link rel="icon" href="img/favicon.svg" type="image/svg+xml" />
  <link rel="preload" href="fonts/jetbrains-mono.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main>
    <header class="site-header">
      <h1>Jozef With a Z</h1>
      <p class="tagline">The Range &mdash; forthcoming</p>
    </header>
  </main>
  <script src="app.js" defer></script>
</body>
</html>
```

- [ ] **Step 4: Create `style.css` with tokens and base styles**

```css
:root {
  --bg: #0a0a0a;
  --fg: #e8e4d8;
  --rule: #2a2a2a;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  --content-width: 640px;
}

*, *::before, *::after { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-mono);
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

main {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;
}

a {
  color: inherit;
  text-decoration: none;
}
a:hover { text-decoration: underline; }

.site-header h1 {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
}
.site-header .tagline {
  margin: 0.25rem 0 0;
  opacity: 0.6;
  font-size: 0.875rem;
}

section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--rule);
}

section > h2 {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.5;
  margin: 0 0 1.5rem;
}

@media (max-width: 640px) {
  html, body { font-size: 14px; }
  main { padding: 2.5rem 1.25rem 4rem; }
}
```

- [ ] **Step 5: Create empty `app.js`**

```js
// jozefwithaz.com — see README.md for what each section does.
```

- [ ] **Step 6: Start preview and verify header renders**

Run: `preview_start` on the project directory.
Open the preview. Expected: black background, off-white "JOZEF WITH A Z" header with the tagline below in muted mono. No errors in console.

- [ ] **Step 7: Commit**

```bash
git add .gitignore CNAME index.html style.css app.js
git commit -m "scaffold: html/css/js shell + header"
```

---

### Task 2: Self-hosted font

**Files:**
- Create: `fonts/jetbrains-mono.woff2`
- Modify: `style.css` (top of file)

- [ ] **Step 1: Download JetBrains Mono Regular as woff2**

Run:
```bash
mkdir -p fonts
curl -L -o fonts/jetbrains-mono.woff2 \
  "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-Regular.woff2"
```

Expected: file exists, `ls -la fonts/jetbrains-mono.woff2` shows ~30-50KB.

- [ ] **Step 2: Add `@font-face` at the top of `style.css`**

Insert before `:root`:

```css
@font-face {
  font-family: "JetBrains Mono";
  src: url("fonts/jetbrains-mono.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 3: Verify font loads in browser**

Reload preview. Inspect the `<h1>` element. Expected: `font-family` resolves to JetBrains Mono (not the system fallback). No 404 on the font file in the Network tab.

- [ ] **Step 4: Commit**

```bash
git add fonts/jetbrains-mono.woff2 style.css
git commit -m "feat: self-hosted JetBrains Mono"
```

---

### Task 3: Favicon

**Files:**
- Create: `img/favicon.svg`

- [ ] **Step 1: Create `img/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0a0a0a"/>
  <text x="16" y="22" font-family="JetBrains Mono, monospace" font-size="20" font-weight="400" fill="#e8e4d8" text-anchor="middle">J</text>
</svg>
```

- [ ] **Step 2: Verify favicon loads**

Reload preview. Check the browser tab for the J favicon. Expected: visible, no console 404.

- [ ] **Step 3: Commit**

```bash
git add img/favicon.svg
git commit -m "feat: mono J favicon"
```

---

### Task 4: Track data and rendering

**Files:**
- Create: `tracks.json`
- Modify: `index.html` (add Tracks section)
- Modify: `style.css` (track row styling)
- Modify: `app.js` (fetch and render)

- [ ] **Step 1: Create `tracks.json`**

```json
[
  {
    "number": "01",
    "title": "Dunkin' Flow",
    "file": "",
    "duration": "",
    "spotify": "https://open.spotify.com/track/75ezScmzHLaRxBMWxDGtmE?si=JVDRlW8YSOCurEpqw3GwSw",
    "apple": "https://music.apple.com/gb/album/dunkin-flow/1826198844?i=1826198845"
  }
]
```

The `file` and `duration` fields are empty until audio is supplied. Rendering must tolerate empty `file` (hide the `[PLAY]` button on that row).

- [ ] **Step 2: Add Tracks section to `index.html`**

Insert inside `<main>`, after `</header>`:

```html
<section id="tracks">
  <h2>Tracks</h2>
  <ol id="track-list" class="tracks"></ol>
  <noscript>
    <ul class="tracks-fallback">
      <li>
        01 &mdash; Dunkin' Flow &mdash;
        <a href="https://open.spotify.com/track/75ezScmzHLaRxBMWxDGtmE?si=JVDRlW8YSOCurEpqw3GwSw">Spotify</a>
        &middot;
        <a href="https://music.apple.com/gb/album/dunkin-flow/1826198844?i=1826198845">Apple</a>
      </li>
    </ul>
  </noscript>
</section>
```

- [ ] **Step 3: Add track row styles to `style.css`**

Append at the bottom of the file:

```css
.tracks {
  list-style: none;
  margin: 0;
  padding: 0;
}

.track {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto auto;
  gap: 1rem;
  align-items: baseline;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--rule);
}

.track:last-child { border-bottom: none; }

.track-number { opacity: 0.5; }
.track-title { text-transform: uppercase; letter-spacing: 0.04em; }
.track-duration { opacity: 0.5; font-variant-numeric: tabular-nums; }
.track-play, .track-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.track-play[hidden], .track-link[hidden] { display: none; }
.track-play:hover, .track-link:hover { text-decoration: underline; }

.track-progress {
  grid-column: 1 / -1;
  height: 1px;
  background: var(--fg);
  width: 0;
  transition: width 0.1s linear;
}

.tracks-fallback {
  list-style: none;
  margin: 0;
  padding: 0;
  opacity: 0.8;
}

@media (max-width: 640px) {
  .track {
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      "num title dur"
      ".   links links"
      ".   play  play";
    row-gap: 0.25rem;
  }
  .track-number { grid-area: num; }
  .track-title { grid-area: title; }
  .track-duration { grid-area: dur; }
  .track-play { grid-area: play; justify-self: start; }
  .track-link { display: inline; }
}
```

- [ ] **Step 4: Render tracks in `app.js`**

Replace the contents of `app.js` with the following. All DOM construction uses `textContent` and `createElement`. No string-to-HTML conversion anywhere — every value from `tracks.json` is set via `textContent` or assigned to a typed attribute, so even a hostile track title cannot inject markup.

```js
// jozefwithaz.com — see README.md for what each section does.

const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID";

async function loadTracks() {
  const list = document.getElementById("track-list");
  if (!list) return;
  const res = await fetch("tracks.json", { cache: "no-cache" });
  if (!res.ok) return;
  const tracks = await res.json();
  while (list.firstChild) list.removeChild(list.firstChild);
  for (const t of tracks) {
    list.appendChild(renderTrack(t));
  }
}

function renderTrack(t) {
  const li = document.createElement("li");
  li.className = "track";
  li.dataset.file = t.file || "";

  const number = document.createElement("span");
  number.className = "track-number";
  number.textContent = t.number;

  const title = document.createElement("span");
  title.className = "track-title";
  title.textContent = t.title;

  const duration = document.createElement("span");
  duration.className = "track-duration";
  duration.textContent = t.duration || "";

  const play = document.createElement("button");
  play.className = "track-play";
  play.type = "button";
  play.setAttribute("aria-pressed", "false");
  play.textContent = "[ Play ]";
  if (!t.file) play.hidden = true;

  const spotify = makeLink(t.spotify, "Spotify");
  const apple = makeLink(t.apple, "Apple");

  const progress = document.createElement("div");
  progress.className = "track-progress";
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-valuemin", "0");
  progress.setAttribute("aria-valuemax", "100");
  progress.setAttribute("aria-valuenow", "0");

  li.append(number, title, duration, play, spotify, apple, progress);
  return li;
}

function makeLink(href, label) {
  const a = document.createElement("a");
  a.className = "track-link";
  a.textContent = label;
  if (href) a.href = href;
  else a.hidden = true;
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}

loadTracks();
```

- [ ] **Step 5: Verify track row renders**

Reload preview. Expected: "TRACKS" section appears with one row showing `01  DUNKIN' FLOW  Spotify  Apple`. No `[Play]` button (file is empty). No console errors. Disable JS in DevTools and reload — the noscript fallback shows Dunkin' Flow with Spotify + Apple links.

- [ ] **Step 6: Commit**

```bash
git add tracks.json index.html style.css app.js
git commit -m "feat: render tracks from tracks.json with noscript fallback"
```

---

### Task 5: Inline audio playback

**Files:**
- Modify: `index.html` (add hidden audio element)
- Modify: `app.js` (wire play/stop)

For verification, add a placeholder audio file: any short MP3 works. Use a public-domain sample as a stand-in.

- [ ] **Step 1: Add placeholder audio file**

Run:
```bash
mkdir -p audio
curl -L -o audio/dunkin-flow.mp3 \
  "https://archive.org/download/testmp3testfile/mpthreetest.mp3"
```

This is a stand-in only. Jozef replaces it with the real Dunkin' Flow file at handoff.

- [ ] **Step 2: Point `tracks.json` at the audio file**

Edit `tracks.json` to set the first track's `file` and `duration`:

```json
[
  {
    "number": "01",
    "title": "Dunkin' Flow",
    "file": "audio/dunkin-flow.mp3",
    "duration": "0:27",
    "spotify": "https://open.spotify.com/track/75ezScmzHLaRxBMWxDGtmE?si=JVDRlW8YSOCurEpqw3GwSw",
    "apple": "https://music.apple.com/gb/album/dunkin-flow/1826198844?i=1826198845"
  }
]
```

- [ ] **Step 3: Add a hidden `<audio>` element to `index.html`**

Insert just before `</main>`:

```html
<audio id="player" preload="none"></audio>
```

- [ ] **Step 4: Wire playback in `app.js`**

Append to `app.js`:

```js
const player = document.getElementById("player");
let currentRow = null;
let rafId = null;

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".track-play");
  if (!btn) return;
  const row = btn.closest(".track");
  const file = row.dataset.file;
  if (!file) return;

  if (currentRow === row && !player.paused) {
    stopPlayback();
    return;
  }

  stopPlayback();
  currentRow = row;
  player.src = file;
  player.play();
  btn.textContent = "[ Stop ]";
  btn.setAttribute("aria-pressed", "true");
  tickProgress();
});

player.addEventListener("ended", stopPlayback);

function stopPlayback() {
  if (!currentRow) return;
  const btn = currentRow.querySelector(".track-play");
  const progress = currentRow.querySelector(".track-progress");
  btn.textContent = "[ Play ]";
  btn.setAttribute("aria-pressed", "false");
  progress.style.width = "0";
  progress.setAttribute("aria-valuenow", "0");
  player.pause();
  player.removeAttribute("src");
  player.load();
  currentRow = null;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
}

function tickProgress() {
  if (!currentRow) return;
  const progress = currentRow.querySelector(".track-progress");
  const pct = player.duration ? (player.currentTime / player.duration) * 100 : 0;
  progress.style.width = pct + "%";
  progress.setAttribute("aria-valuenow", String(Math.round(pct)));
  rafId = requestAnimationFrame(tickProgress);
}
```

- [ ] **Step 5: Verify playback**

Reload preview. Click `[ Play ]` on the Dunkin' Flow row. Expected:
- Button text becomes `[ Stop ]`.
- Audio plays.
- A thin progress bar fills under the row.
- Clicking `[ Stop ]` halts playback and clears the bar.
- Audio ending naturally resets the row to `[ Play ]`.

- [ ] **Step 6: Commit**

```bash
git add audio/dunkin-flow.mp3 tracks.json index.html app.js
git commit -m "feat: inline audio playback with progress bar"
```

---

### Task 6: Bio, Featured on, Contact, Footer

**Files:**
- Modify: `index.html`
- Modify: `style.css` (add muted utility and footer styles)

- [ ] **Step 1: Append the remaining sections to `index.html` inside `<main>`**

Insert after the Tracks `</section>`:

```html
<section id="bio">
  <h2>Bio</h2>
  <p>
    Jozef With a Z is a producer and artist working across R&amp;B, rap, and live instruments.
    The Range, his forthcoming self-produced project, gathers it all in one place.
    [Placeholder paragraph &mdash; Jozef to replace before launch.]
  </p>
</section>

<section id="featured">
  <h2>Featured on</h2>
  <p>
    <a href="https://averydistantperspective.com" target="_blank" rel="noopener">A Very Distant Perspective</a>
    &middot;
    <a href="https://www.youtube.com/@averydistantperspective" target="_blank" rel="noopener">YouTube</a>
  </p>
</section>

<section id="contact">
  <h2>Contact</h2>
  <p>
    <a href="https://instagram.com/josefwithaz" target="_blank" rel="noopener">@josefwithaz</a><br />
    <span class="muted">email coming soon</span>
  </p>
</section>
```

Also, just before the closing `</main>` (and before the `<audio>` element added in Task 5), insert the footer:

```html
<footer class="site-footer">
  <p>&copy; <span id="year">2026</span> Jozef With a Z</p>
</footer>
```

- [ ] **Step 2: Add `.muted` and footer styles to `style.css`**

Append:

```css
.muted { opacity: 0.5; }

.site-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--rule);
  opacity: 0.4;
  font-size: 0.75rem;
}
.site-footer p { margin: 0; }
```

- [ ] **Step 2b: Set the footer year dynamically in `app.js`**

Append to `app.js`:

```js
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
```

- [ ] **Step 3: Verify sections render**

Reload preview. Expected: three new labeled sections appear in order (BIO, FEATURED ON, CONTACT), separated by hairline rules. Bio paragraph is left-aligned mono. Featured On links open AVDP. Contact shows the IG handle as a link and the muted email line. At the bottom, a muted footer reads `© <current year> Jozef With a Z`.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css app.js
git commit -m "feat: bio, featured on, contact, footer"
```

---

### Task 7: Mailing list form

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `app.js`

- [ ] **Step 1: Add the form to `index.html`**

Insert between the Featured On section and the Contact section:

```html
<section id="notify">
  <h2>Notify on release</h2>
  <form id="notify-form" novalidate>
    <label for="notify-email" class="visually-hidden">Email</label>
    <input
      id="notify-email"
      name="email"
      type="email"
      required
      autocomplete="email"
      placeholder="you@email.com"
    />
    <button type="submit">[ Notify me ]</button>
    <p id="notify-status" class="muted" role="status" aria-live="polite"></p>
  </form>
</section>
```

- [ ] **Step 2: Add form styles to `style.css`**

Append:

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

#notify-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: baseline;
}

#notify-form input[type="email"] {
  flex: 1 1 240px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--rule);
  color: var(--fg);
  font: inherit;
  padding: 0.5rem 0;
}
#notify-form input[type="email"]:focus {
  outline: none;
  border-bottom-color: var(--fg);
}

#notify-form button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
#notify-form button:hover { text-decoration: underline; }

#notify-status { flex-basis: 100%; margin: 0; min-height: 1.5em; }
```

- [ ] **Step 3: Wire the form submit in `app.js`**

Append. On success the form's children are removed and replaced with a fixed string node; no markup is parsed from any external source.

```js
const form = document.getElementById("notify-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("notify-status");
    const email = form.elements.email.value.trim();
    if (!email) {
      status.textContent = "Enter an email.";
      return;
    }
    status.textContent = "Sending...";
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error("bad response");
      while (form.firstChild) form.removeChild(form.firstChild);
      const msg = document.createElement("p");
      msg.className = "muted";
      msg.textContent = "Saved. We will let you know when The Range drops.";
      form.appendChild(msg);
    } catch {
      status.textContent = "Something went wrong. Try again.";
    }
  });
}
```

- [ ] **Step 4: Verify the form renders and submits**

Reload preview. Expected: "NOTIFY ON RELEASE" section appears with email input and `[ Notify me ]` button. Submitting with an empty value shows "Enter an email." Submitting a real address attempts to POST to the placeholder Formspree endpoint, fails (because the endpoint is `REPLACE_WITH_FORMSPREE_ID`), and shows "Something went wrong. Try again." The failure is expected at this stage.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css app.js
git commit -m "feat: mailing list form with formspree endpoint"
```

---

### Task 8: README and handoff doc

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write `README.md` for Jozef**

````markdown
# jozefwithaz.com

Your website. Hosted on GitHub Pages. Static files, no server. Edit anything from this page directly in your browser.

## How to add a track

1. Click `audio/` above. Click "Add file > Upload files". Drop your MP3 in. Commit.
2. Click `tracks.json`. Click the pencil icon to edit. Add a new entry like the existing one. Make sure to add a comma after the previous entry's closing brace. Commit.

A new track entry looks like:

```json
{
  "number": "02",
  "title": "Track Title",
  "file": "audio/your-file.mp3",
  "duration": "3:42",
  "spotify": "",
  "apple": ""
}
```

Leave `spotify` and `apple` as empty strings if the track is not on those services yet.

## How to change copy

Open `index.html` and edit the text between the tags. The Bio paragraph, Featured On, and Contact sections are all plain HTML.

## Mailing list

The form sends submissions to Formspree, which forwards them to your email. To point it at your own Formspree account:

1. Sign up at formspree.io.
2. Create a new form. Copy its endpoint URL (looks like `https://formspree.io/f/abcd1234`).
3. Open `app.js`. Near the top, replace `REPLACE_WITH_FORMSPREE_ID` with your endpoint.
4. Commit.

## DNS and the domain

`CNAME` tells GitHub Pages your custom domain is `jozefwithaz.com`. DNS is configured at the registrar to point at GitHub Pages. If you ever change registrars, follow GitHub's "Configuring a custom domain" docs.

## When things break

- Site shows the wrong content: check the `Actions` tab. A red X means a deploy failed.
- A track does not play: open the page in Chrome, right-click > Inspect > Console. If you see a 404 on the MP3 file, the filename in `tracks.json` does not match the file in `audio/`.
- Form does not work: confirm the Formspree endpoint in `app.js` is yours and active.

## What is what

| File | Job |
|---|---|
| `index.html` | The page itself. Text and structure. |
| `style.css` | Colors, fonts, spacing. Change the four lines at the top of the file to recolor. |
| `app.js` | Plays tracks. Handles the form. |
| `tracks.json` | List of tracks. |
| `audio/` | The MP3 files. |
| `CNAME` | The custom domain. Do not delete. |
````

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: README handoff guide for Jozef"
```

---

### Task 9: Accessibility and responsive pass

**Files:**
- Modify: `style.css` (only if issues found)
- Modify: `index.html` (only if issues found)

- [ ] **Step 1: Resize to 375px and verify**

Run `preview_resize` to 375px. Expected:
- Header readable, no overflow.
- Track row collapses to the mobile grid (number/title/duration on top row, play and links wrap below).
- All sections stack with comfortable padding.
- Form input takes full width with the button below or beside it.

If anything overflows or wraps awkwardly, adjust `style.css` and commit a fix in this task.

- [ ] **Step 2: Resize to 1280px and verify**

Run `preview_resize` to 1280px. Expected:
- Content stays in the 640px column, centered.
- No stretched elements.

- [ ] **Step 3: Keyboard navigation check**

In the preview, press Tab repeatedly. Expected: focus moves through every link, the play button, the email input, and the submit button. Focused elements have a visible outline (browser default acceptable).

- [ ] **Step 4: Color contrast spot check**

In DevTools, use the contrast checker on body text. Expected: ratio exceeds 7:1 (AAA).

- [ ] **Step 5: Take a screenshot for the record**

Run `preview_screenshot` and save it to share with the user.

- [ ] **Step 6: Commit any tweaks**

```bash
git add -p
git commit -m "polish: responsive and a11y pass"
```

If no changes were needed, skip the commit.

---

### Task 10: Final state and handoff prep

**Files:** none

- [ ] **Step 1: Final inventory**

Run:
```bash
ls -la
```

Expected contents (in some order): `.git/`, `.gitignore`, `CNAME`, `README.md`, `app.js`, `audio/`, `docs/`, `fonts/`, `img/`, `index.html`, `style.css`, `tracks.json`.

- [ ] **Step 2: Verify no secrets committed**

Run:
```bash
git log --all -p | grep -iE "(api[_-]?key|secret|token|password|brevo|formspree/f/[a-z0-9]{6,})" || echo "clean"
```

Expected: `clean` (the Formspree placeholder string `REPLACE_WITH_FORMSPREE_ID` is fine, an actual endpoint ID is not).

- [ ] **Step 3: Confirm CNAME**

Run:
```bash
cat CNAME
```

Expected: `jozefwithaz.com` (single line).

- [ ] **Step 4: Print handoff summary**

Print a short summary to the user covering:
- Repo location.
- What works (header, track player, sections, form UI).
- What still needs Jozef's input before launch (bio paragraph, real Dunkin' Flow MP3, Formspree endpoint, contact email, AVDP episode URL once live, tracks 02+).
- How to transfer the repo to Jozef's GitHub account.

---

## Open Items Tracked from Spec

These do not block the build; they block launch and are picked up by Jozef during handoff:

- Final bio paragraph.
- Contact email (or omit).
- AVDP episode URL once published.
- Tracks 02+ audio files and metadata.
- Formspree account creation and endpoint paste.
- Replace placeholder `audio/dunkin-flow.mp3` with the real master.
