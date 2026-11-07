# komen-reels

Turn Instagram comments into animated 9:16 Reels videos, built with [Remotion](https://www.remotion.dev).

Made by [beeyour.studio](https://beeyour.studio) — the tooling behind comment-driven series like **Negeri Komen**, where followers shape the story through their comments.

<p align="center"><img src="docs/preview.png" width="320" alt="komen-reels preview"></p>

## Demo

https://github.com/user-attachments/assets/bf7ba051-9fd5-4643-8e7b-8b3c0a9cc457


## Features

- Instagram-style comment cards that spring in one by one
- Newest comment highlighted with your accent color
- Like counter that ticks up after each card lands
- Older comments scroll out of the stack automatically
- Video length adapts to the number of comments
- Edit everything from a single JSON file, no code changes needed
- 1080×1920 @ 30fps, ready for Reels, TikTok and Shorts

## Quick start

```bash
git clone https://github.com/befthr/komen-reels.git
cd komen-reels
npm install
npm run dev        # open Remotion Studio to preview
npm run render     # render to out/komen-reel.mp4
```

## Your own comments

Edit `src/data/sample-comments.json`:

```json
{
  "title": "Hari ke-12",
  "subtitle": "Warga memutuskan…",
  "accentColor": "#F5B700",
  "secondsPerComment": 2.2,
  "comments": [
    { "username": "warga.jogja", "text": "Bangun jembatan ke pulau sebelah! 🌉", "likes": 128 }
  ]
}
```

| Field | Description |
| --- | --- |
| `title` | Big headline at the top |
| `subtitle` | Optional line under the title, in the accent color |
| `accentColor` | Hex color for highlights |
| `secondsPerComment` | Time between each new comment |
| `comments[].username` | Instagram handle, without `@` |
| `comments[].text` | Comment text, emoji supported |
| `comments[].likes` | Optional like count |

You can also pass props at render time without touching the file:

```bash
npx remotion render KomenReel out/hari-13.mp4 --props=./hari-13.json
```

## Project structure

```
src/
  Composition.tsx     composition setup and duration logic
  KomenReel.tsx       main scene: title + comment stack
  CommentBubble.tsx   single animated comment card
  types.ts            prop types
  data/               sample comment data
```

## Roadmap

- [ ] Import comments straight from an Instagram export / CSV
- [ ] Profile pictures instead of initials
- [ ] Background music and subtitle track
- [ ] More layouts (map tags, polls, vote tallies)

Ideas and pull requests are welcome.

## License

[MIT](LICENSE). Note that Remotion itself has its own license: it's free for individuals and small teams, see [remotion.dev/license](https://www.remotion.dev/license).
