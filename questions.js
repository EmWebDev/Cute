/* =====================================================================
   QUESTIONS DATA FILE
   =====================================================================

   This file holds every question in the game. script.js reads this
   list, it never edits it. You only ever need to touch THIS file to
   add, remove, or change questions — you never need to touch script.js
   or style.css for that.

   -----------------------------------------------------------------
   HOW TO ADD A NEW QUESTION
   -----------------------------------------------------------------
   Copy one of the objects below, paste it before the closing "]" of
   the "questions" array, and edit the four parts:

   {
     player1Question: "Which season is your favorite?",   // shown to Player 1
     player2Question: "What is their favorite season?",   // shown to Player 2 (same question, reworded as a guess)
     options: ["Summer", "Winter", "Autumn", "Spring"]     // 2-4 answer choices, same list for both players
   },

   Rules to keep in mind:
   - "player1Question" is asked directly, e.g. "Which ___ is your favorite?"
   - "player2Question" is the SAME question reworded so Player 2 is
     guessing, e.g. "What is their favorite ___?"
   - "options" must be an array of strings. You can have 2, 3, 4, or
     more options — the game will lay out however many you give it.
   - Don't forget the comma "," between question objects!
   - You can have as many questions as you like. The instructions
     mention 1000 — just keep adding objects the same way. The game
     will automatically play through however many are in this list
     and stop when it runs out.

   Example of adding a 6th question to the 5 below:

   const questions = [
     { ...question 1... },
     { ...question 2... },
     { ...question 3... },
     { ...question 4... },
     { ...question 5... },
     {
       player1Question: "Which pet would you rather own?",
       player2Question: "Which pet would they rather own?",
       options: ["Dog", "Cat", "Fish", "Bird"]
     }
   ];

   ===================================================================== */

const questions = [
  {
    player1Question: "Which season is your favorite?",
    player2Question: "What is their favorite season?",
    options: ["Summer", "Winter", "Autumn", "Spring"]
  },
  {
    player1Question: "Which meal do you look forward to most?",
    player2Question: "Which meal do they look forward to most?",
    options: ["Breakfast", "Lunch", "Dinner", "Dessert"]
  },
  {
    player1Question: "Where would you rather go on vacation?",
    player2Question: "Where would they rather go on vacation?",
    options: ["Beach", "Mountains", "City", "Countryside"]
  },
  {
    player1Question: "Which superpower would you pick?",
    player2Question: "Which superpower would they pick?",
    options: ["Flying", "Invisibility", "Super Strength", "Mind Reading"]
  },
  {
    player1Question: "What's your go-to movie genre?",
    player2Question: "What's their go-to movie genre?",
    options: ["Comedy", "Horror", "Romance", "Action"]
  }

  /* ---------------------------------------------------------------
     Add your next question below this line, following the same
     pattern as the objects above. Remember the comma after the
     closing "}" of the object above yours!
     --------------------------------------------------------------- */
];
