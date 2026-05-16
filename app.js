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

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
