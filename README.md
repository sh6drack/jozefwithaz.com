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
