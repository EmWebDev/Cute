# Guess My Answer

A 2-player guessing game played on **two separate devices**, linked over the
internet.

1. Both players agree on a room code (any word or number).
2. Player 1 taps **"Host as Player 1"** with that code.
3. Player 2 taps **"Join as Player 2"** with the same code.
4. Once connected, each device only ever shows that player's own
   questions — Player 1's device never shows Player 2's screen, and
   vice versa.
5. Player 1 answers a question secretly. Player 2 then sees the same
   question reworded as a guess, and tries to match Player 1's answer.
   Nothing is revealed as right or wrong along the way.
6. At the very end, both devices show one **combined total score** —
   no per-player split, no "winner" announced.

## How the two devices are linked

This is a static site — there's no server of ours involved — so the two
devices connect **directly to each other** using [PeerJS](https://peerjs.com/),
a library built on WebRTC. PeerJS's free public server is only used to help
the two devices find each other by room code; once connected, the actual
game data (answers, guesses) travels directly between the two devices, not
through any server.

**A couple of real-world caveats worth knowing:**
- Both devices need a working internet connection at the same time.
- Very restrictive networks (some corporate or school Wi-Fi/firewalls) can
  block the direct WebRTC connection. If "Join as Player 2" gets stuck on
  connecting, try a different network (e.g. mobile data).
- PeerJS's free public server occasionally has downtime. If hosting fails
  outright, try again in a bit.
- Room codes aren't private accounts — anyone who knows your exact code
  could theoretically join. Pick something a little unique (not "test").

## Files

| File           | Purpose                                                             |
|----------------|----------------------------------------------------------------------|
| `index.html`   | Page structure — connect, waiting, question, and game-over screens  |
| `style.css`    | All colors, fonts, and layout (light pink & blue theme)             |
| `questions.js` | The question bank — **edit this file to add your 1000 questions**   |
| `script.js`    | Game logic — the PeerJS networking, question flow, and scoring      |

The files are loaded by `index.html` in this order:

```
index.html
   ├─ loads style.css        (visual styling)
   ├─ loads peerjs (via CDN) (the device-to-device connection library)
   ├─ loads questions.js     (defines the `questions` array — same file on both devices)
   └─ loads script.js        (reads `questions`, drives the game, talks over the network)
```

## How to add questions

Open `questions.js`. Full instructions are written at the top of the file,
but in short — add an object like this to the `questions` array:

```js
{
  player1Question: "Which season is your favorite?",
  player2Question: "What is their favorite season?",
  options: ["Summer", "Winter", "Autumn", "Spring"]
}
```

- `player1Question` — asked directly to Player 1.
- `player2Question` — the same question reworded so Player 2 is guessing.
- `options` — 2 or more answer choices, shared by both players.

Just keep adding objects (separated by commas) until you have all 1000.
Both devices load the exact same `questions.js` file, so they always agree
on what each question says — only the current index number needs to travel
over the network.

## How scoring works

Look in `script.js` for the `submitPlayer2Guess()` function (marked
`>>> THIS IS WHERE POINTS ARE AWARDED <<<`). By default, a correct guess
adds **+1** to `totalScore`. To change the amount, edit the
`totalScore += 1;` line.

Both devices keep an identical running total the whole game — Player 2's
device figures out if a guess was correct, and tells Player 1's device only
`true` or `false` (never the guess itself), so both totals always match.
Nothing is shown on screen until `showGameOver()` runs after the last
question, where the single combined total is displayed.

## Running it locally

No build step or install needed. Because this version needs an internet
connection to link two devices, opening `index.html` directly from your
file system will still work for hosting/joining, as long as you're online.

## Hosting on GitHub Pages

1. Create a new GitHub repository and push these files to it.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`.
4. Pick the `main` branch and `/ (root)` folder, then click **Save**.
5. GitHub will give you a URL like `https://yourusername.github.io/your-repo/`
   — share that link with both players so they can each open it on their
   own device.
