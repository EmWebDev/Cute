/* =====================================================================
   GAME LOGIC
   =====================================================================
   This file makes the game run across TWO SEPARATE DEVICES. It uses
   the PeerJS library (loaded in index.html) to open a direct
   connection between Player 1's device and Player 2's device over
   the internet, using PeerJS's free public server just to help the
   two devices find each other (no account, no server of our own).

   You should not need to edit this file to add questions (use
   questions.js for that) or to change colors (use style.css for
   that). You WOULD edit this file if you wanted to change the game's
   RULES — e.g. how scoring works, or what messages get sent between
   devices.

   -----------------------------------------------------------------
   HOW THE TWO DEVICES STAY IN SYNC
   -----------------------------------------------------------------
   Each device only ever knows about its OWN role (Player 1 or
   Player 2) and shows only that player's version of each question.
   The two devices "talk" by sending small network messages to each
   other — never the full screen, never anything the other player
   shouldn't see. There are exactly two message types:

     ANSWER        Player 1's device sends this the moment Player 1
                   picks an answer. It carries the answer itself, but
                   Player 2's device never displays it — it's only
                   used internally to compare against Player 2's
                   guess.

     GUESS_RESULT  Player 2's device sends this after Player 2
                   guesses. It carries only true/false (was the
                   guess correct?) — never the guess itself — so
                   Player 1's device can keep an identical running
                   total without ever learning what Player 2 picked.

   Because of this back-and-forth, both devices always end the game
   with the exact same total score, without either one ever seeing
   the other's answers on screen.
   ===================================================================== */


/* ---------------------------------------------------------------
   GAME STATE
   --------------------------------------------------------------- */
let myRole = null;              // 1 or 2 — set once, when this device connects
let peer = null;                // this device's PeerJS Peer object
let connection = null;          // the open connection to the other device
let currentQuestionIndex = 0;   // which question (from the questions array) we're on
let player1AnswerReceived = null; // (Player 2 device only) the answer just received from Player 1
let totalScore = 0;             // combined score, kept identical on both devices


/* A short prefix keeps our room codes from colliding with other
   people's rooms on the shared public PeerJS server. */
const ROOM_PREFIX = "guess-my-answer-";


/* ---------------------------------------------------------------
   GRAB ELEMENTS FROM THE HTML
   --------------------------------------------------------------- */
const screens = {
  connect: document.getElementById("connect-screen"),
  waiting: document.getElementById("waiting-screen"),
  question: document.getElementById("question-screen"),
  gameover: document.getElementById("gameover-screen")
};

const roomCodeInput = document.getElementById("room-code-input");
const hostBtn = document.getElementById("host-btn");
const joinBtn = document.getElementById("join-btn");
const connectStatus = document.getElementById("connect-status");

const waitingTitle = document.getElementById("waiting-title");
const waitingSubtitle = document.getElementById("waiting-subtitle");
const waitingCancelBtn = document.getElementById("waiting-cancel-btn");

const progressLabel = document.getElementById("progress-label");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const finalScoreTotalEl = document.getElementById("final-score-total");
const finalScoreMaxEl = document.getElementById("final-score-max");
const restartBtn = document.getElementById("restart-btn");


/* =====================================================================
   FUNCTION: showScreen(screenName)
   -----------------------------------------------------------------
   WHAT IT DOES: Hides every screen, then shows only the one you ask
   for.
   WHEN IT'S USED: Any time we need to switch what's on this device's
   screen.
   ===================================================================== */
function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[screenName].classList.add("active");
}


/* =====================================================================
   FUNCTION: showWaiting(title, subtitle, showCancel)
   -----------------------------------------------------------------
   WHAT IT DOES: Displays the spinner screen with a custom message.
   Used both while the two devices are still linking up, and later
   while this device is waiting for the other player to take their
   turn.
   WHEN IT'S USED: During connection, and between turns.
   ===================================================================== */
function showWaiting(title, subtitle, showCancel) {
  waitingTitle.textContent = title;
  waitingSubtitle.textContent = subtitle;
  waitingCancelBtn.classList.toggle("is-hidden", !showCancel);
  showScreen("waiting");
}


/* =====================================================================
   FUNCTION: hostGame(roomCode)
   -----------------------------------------------------------------
   WHAT IT DOES: Called when someone taps "Host as Player 1". Creates
   a PeerJS Peer using the room code as its address, so Player 2's
   device can find it. Waits for Player 2 to connect.
   WHEN IT'S USED: Player 1 taps "Host as Player 1" on the connect
   screen.
   ===================================================================== */
function hostGame(roomCode) {
  myRole = 1;
  showWaiting("Setting up your room…", "Just a moment.", false);

  peer = new Peer(ROOM_PREFIX + roomCode);

  peer.on("open", () => {
    showWaiting("Waiting for Player 2…", `Room code "${roomCode}" is ready. Have Player 2 join with it.`, true);
  });

  // Fires automatically when Player 2's device connects to us.
  peer.on("connection", (conn) => {
    connection = conn;
    attachConnectionHandlers();
    connection.on("open", () => startGame());
  });

  peer.on("error", (err) => handlePeerError(err, roomCode));
}


/* =====================================================================
   FUNCTION: joinGame(roomCode)
   -----------------------------------------------------------------
   WHAT IT DOES: Called when someone taps "Join as Player 2". Creates
   this device's own Peer (with a random ID — it doesn't need to be
   found by anyone), then connects out to the host's room code.
   WHEN IT'S USED: Player 2 taps "Join as Player 2" on the connect
   screen, AFTER Player 1 has already hosted with the same code.
   ===================================================================== */
function joinGame(roomCode) {
  myRole = 2;
  showWaiting("Connecting to Player 1…", "Make sure they've already tapped \u201cHost as Player 1\u201d.", true);

  peer = new Peer();

  peer.on("open", () => {
    connection = peer.connect(ROOM_PREFIX + roomCode, { reliable: true });
    attachConnectionHandlers();
    connection.on("open", () => startGame());
  });

  peer.on("error", (err) => handlePeerError(err, roomCode));
}


/* =====================================================================
   FUNCTION: handlePeerError(err, roomCode)
   -----------------------------------------------------------------
   WHAT IT DOES: Shows a friendly message when connecting fails —
   e.g. the room code is already taken by someone else, or Player 1
   hasn't hosted yet — and sends the device back to the connect
   screen so they can try again.
   WHEN IT'S USED: Whenever PeerJS reports a connection problem.
   ===================================================================== */
function handlePeerError(err, roomCode) {
  console.error(err);

  if (err.type === "unavailable-id") {
    connectStatus.textContent = `The code "${roomCode}" is already in use as a host. Try a different code.`;
  } else if (err.type === "peer-unavailable") {
    connectStatus.textContent = `No one is hosting with the code "${roomCode}" yet. Ask Player 1 to host first.`;
  } else {
    connectStatus.textContent = "Connection problem — please try again.";
  }

  if (peer) {
    peer.destroy();
    peer = null;
  }
  showScreen("connect");
}


/* =====================================================================
   FUNCTION: attachConnectionHandlers()
   -----------------------------------------------------------------
   WHAT IT DOES: Wires up what happens when a message arrives from
   the other device, and what happens if the connection drops.
   WHEN IT'S USED: Right after a connection is created, on both the
   hosting and joining device.
   ===================================================================== */
function attachConnectionHandlers() {
  connection.on("data", handleIncomingMessage);
  connection.on("close", () => {
    showWaiting("Connection lost", "The other player's device disconnected.", true);
  });
}


/* =====================================================================
   FUNCTION: startGame()
   -----------------------------------------------------------------
   WHAT IT DOES: Runs once both devices are connected. Player 1's
   device immediately shows question 1. Player 2's device shows a
   waiting screen until Player 1 answers.
   WHEN IT'S USED: Right after the PeerJS connection opens.
   ===================================================================== */
function startGame() {
  currentQuestionIndex = 0;
  totalScore = 0;

  if (myRole === 1) {
    showPlayer1Question();
  } else {
    showWaiting("Waiting for Player 1…", "They're answering the first question.", false);
  }
}


/* =====================================================================
   FUNCTION: showPlayer1Question()
   -----------------------------------------------------------------
   WHAT IT DOES: Renders the current question for Player 1's device
   only — the direct version, e.g. "Which season is your favorite?"
   WHEN IT'S USED: On the Player 1 device, at the start of every
   round.
   ===================================================================== */
function showPlayer1Question() {
  const q = questions[currentQuestionIndex];
  progressLabel.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = q.player1Question;
  renderOptions(q.options, (chosenOption) => submitPlayer1Answer(chosenOption));
  showScreen("question");
}


/* =====================================================================
   FUNCTION: showPlayer2Question()
   -----------------------------------------------------------------
   WHAT IT DOES: Renders the current question for Player 2's device
   only — the guessing version, e.g. "What is their favorite season?"
   WHEN IT'S USED: On the Player 2 device, once it has received
   Player 1's ANSWER message for this round.
   ===================================================================== */
function showPlayer2Question() {
  const q = questions[currentQuestionIndex];
  progressLabel.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = q.player2Question;
  renderOptions(q.options, (chosenOption) => submitPlayer2Guess(chosenOption));
  showScreen("question");
}


/* =====================================================================
   FUNCTION: renderOptions(optionList, onPick)
   -----------------------------------------------------------------
   WHAT IT DOES: Builds one button per answer choice and calls
   onPick(optionLabel) when one is tapped. Shared by both the
   Player 1 and Player 2 question screens.
   WHEN IT'S USED: Every time a question screen is shown.
   ===================================================================== */
function renderOptions(optionList, onPick) {
  optionsContainer.innerHTML = "";
  optionList.forEach((optionLabel) => {
    const btn = document.createElement("button");
    btn.textContent = optionLabel;
    btn.className = "option-btn";
    btn.addEventListener("click", () => onPick(optionLabel));
    optionsContainer.appendChild(btn);
  });
}


/* =====================================================================
   FUNCTION: submitPlayer1Answer(chosenOption)
   -----------------------------------------------------------------
   WHAT IT DOES: Runs on Player 1's device when they tap an answer.
   Sends an ANSWER message to Player 2's device (over the network),
   then shows a waiting screen until Player 2 has guessed.
   WHEN IT'S USED: Every time Player 1 answers a question.
   ===================================================================== */
function submitPlayer1Answer(chosenOption) {
  connection.send({
    type: "ANSWER",
    index: currentQuestionIndex,
    answer: chosenOption
  });
  showWaiting("Answer sent!", "Waiting for Player 2 to guess…", false);
}


/* =====================================================================
   FUNCTION: submitPlayer2Guess(chosenOption)
   -----------------------------------------------------------------
   WHAT IT DOES: Runs on Player 2's device when they tap a guess.
   Compares it to the answer received from Player 1 (never shown on
   screen), updates the score if correct, and sends a GUESS_RESULT
   message back — carrying only true/false, never the actual guess.

   >>> THIS IS WHERE POINTS ARE AWARDED. <<<
   To change how scoring works (e.g. award 2 points instead of 1),
   edit the "totalScore += 1" line below.
   WHEN IT'S USED: Every time Player 2 submits a guess.
   ===================================================================== */
function submitPlayer2Guess(chosenOption) {
  const isCorrect = chosenOption === player1AnswerReceived;

  if (isCorrect) {
    totalScore += 1;   // <-- this line makes the score go up
  }

  connection.send({
    type: "GUESS_RESULT",
    index: currentQuestionIndex,
    correct: isCorrect
  });

  player1AnswerReceived = null;
  advanceRound();
}


/* =====================================================================
   FUNCTION: handleIncomingMessage(message)
   -----------------------------------------------------------------
   WHAT IT DOES: Runs whenever a message arrives from the other
   device.
   - Player 2's device listens for ANSWER messages, then shows its
     own guessing screen.
   - Player 1's device listens for GUESS_RESULT messages, adds to its
     own score if correct, then moves to the next round.
   WHEN IT'S USED: Automatically, any time the other device sends
   data.
   ===================================================================== */
function handleIncomingMessage(message) {
  if (message.type === "ANSWER" && myRole === 2) {
    player1AnswerReceived = message.answer;
    showPlayer2Question();
  }

  if (message.type === "GUESS_RESULT" && myRole === 1) {
    if (message.correct) {
      totalScore += 1;
    }
    advanceRound();
  }
}


/* =====================================================================
   FUNCTION: advanceRound()
   -----------------------------------------------------------------
   WHAT IT DOES: Moves to the next question, or ends the game if that
   was the last one. Each device figures this out independently after
   its part of the round is done, so both stay on the same question
   without needing a third "go to next round" message.
   WHEN IT'S USED: After Player 2 sends a GUESS_RESULT, and after
   Player 1 receives one.
   ===================================================================== */
function advanceRound() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    showGameOver();
    return;
  }

  if (myRole === 1) {
    showPlayer1Question();
  } else {
    showWaiting("Waiting for Player 1…", "They're answering the next question.", false);
  }
}


/* =====================================================================
   FUNCTION: showGameOver()
   -----------------------------------------------------------------
   WHAT IT DOES: Displays the combined total score. Both devices show
   the exact same number — there's no per-player split and no winner
   announced.
   WHEN IT'S USED: Once every question has been played.
   ===================================================================== */
function showGameOver() {
  finalScoreTotalEl.textContent = totalScore;
  finalScoreMaxEl.textContent = questions.length;
  showScreen("gameover");
}


/* =====================================================================
   FUNCTION: resetGame()
   -----------------------------------------------------------------
   WHAT IT DOES: Closes the network connection and resets every piece
   of state, so this device can host or join a fresh game.
   WHEN IT'S USED: When "Play Again" is tapped.
   ===================================================================== */
function resetGame() {
  if (connection) {
    connection.close();
    connection = null;
  }
  if (peer) {
    peer.destroy();
    peer = null;
  }
  myRole = null;
  currentQuestionIndex = 0;
  player1AnswerReceived = null;
  totalScore = 0;
  connectStatus.textContent = "";
  roomCodeInput.value = "";
  showScreen("connect");
}


/* ---------------------------------------------------------------
   HELPER: getRoomCode()
   Reads and cleans up whatever the player typed into the room code
   box (trims spaces, lowercases it) so "Sunshine22" and "sunshine22 "
   are treated as the same code.
   --------------------------------------------------------------- */
function getRoomCode() {
  return roomCodeInput.value.trim().toLowerCase();
}


/* ---------------------------------------------------------------
   WIRE UP BUTTONS
   --------------------------------------------------------------- */
hostBtn.addEventListener("click", () => {
  const roomCode = getRoomCode();
  if (!roomCode) {
    connectStatus.textContent = "Type a room code first.";
    return;
  }
  connectStatus.textContent = "";
  hostGame(roomCode);
});

joinBtn.addEventListener("click", () => {
  const roomCode = getRoomCode();
  if (!roomCode) {
    connectStatus.textContent = "Type a room code first.";
    return;
  }
  connectStatus.textContent = "";
  joinGame(roomCode);
});

waitingCancelBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", resetGame);
