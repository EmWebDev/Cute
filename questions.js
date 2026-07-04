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
  },
 {
    player1Question: "What's your go-to movie genre?",
    player2Question: "What's their go-to movie genre?",
    options: ["Comedy", "Horror", "Romance", "Action"]
  },
  {
    player1Question: "What's your favorite season?",
    player2Question: "What's their favorite season?",
    options: ["Spring", "Summer", "Autumn", "Winter"]
  },
  {
    player1Question: "What's your dream vacation?",
    player2Question: "What's their dream vacation?",
    options: ["Beach", "Mountains", "City", "Countryside"]
  },
  {
    player1Question: "Which pet would you rather have?",
    player2Question: "Which pet would they rather have?",
    options: ["Dog", "Cat", "Bird", "Fish"]
  },
  {
    player1Question: "What's your favorite type of dessert?",
    player2Question: "What's their favorite type of dessert?",
    options: ["Ice Cream", "Cake", "Cookies", "Chocolate"]
  },
  {
    player1Question: "Which type of date feels the most romantic?",
    player2Question: "Which type of date do they find most romantic?",
    options:["Candlelight Dinner", "Movie Night","Beach Walk", "Stargazing"]
  }, 
  {
    player1Question: "What's your favorite way to receive affection?",
    player2Question: "What's their favorite way to receive affection?",
    options: ["Cuddles", "Kisses", "Compliments", "Holding Hands"]
  },
  {
    player1Question: "Which surprise would make you happiest?",
    player2Question: "Which surprise would make them happiest?",
    options: ["Love Letter","Weekend Trip", "Flowers","Favorite Meal"]
  },
  {
    player1Question: "What instantly makes someone more attractive to you?",
    player2Question: "What do they find most attractive?",
    options: ["Confidence", "Humor","Kindness", "Intelligence"]
  },
  {
    player1Question: "What's your ideal cuddle spot?",
    player2Question: "What's their ideal cuddle spot?",
    options: [
      "On the Couch","Watching the Sunset","By a Fireplace","In Bed"]
  }, 
  {
    player1Question: "What's your favorite way to spend a free weekend?",
    player2Question: "What's their favorite way to spend a free weekend?",
    options: ["Relaxing at Home", "Exploring Outdoors", "Going Out with Friends", "Watching Movies"]
  },
  {
    player1Question: "Which meal could you eat every day?",
    player2Question: "Which meal could they eat every day?",
    options: ["Pizza", "Sushi", "Burgers", "Pasta"]
  },
  {
    player1Question: "What's your favorite time of day?",
    player2Question: "What's their favorite time of day?",
    options: ["Morning", "Afternoon", "Evening", "Late Night"]
  },
  {
    player1Question: "Which superpower would you choose?",
    player2Question: "Which superpower would they choose?",
    options: ["Flying", "Invisibility", "Teleportation", "Reading Minds"]
  },
  {
    player1Question: "What's your favorite type of weather?",
    player2Question: "What's their favorite type of weather?",
    options: ["Sunny", "Rainy", "Snowy", "Cloudy"]
  },
  {
    player1Question: "Which drink do you usually order?",
    player2Question: "Which drink do they usually order?",
    options: ["Coffee", "Tea", "Soft Drink", "Water"]
  },
  {
    player1Question: "What's your favorite kind of music?",
    player2Question: "What's their favorite kind of music?",
    options: ["Pop", "Rock", "Hip-Hop", "Country"]
  },
  {
    player1Question: "Which holiday do you enjoy the most?",
    player2Question: "Which holiday do they enjoy the most?",
    options: ["Christmas", "Halloween", "New Year's", "Easter"]
  },
  {
    player1Question: "What's your ideal way to relax after a long day?",
    player2Question: "What's their ideal way to relax after a long day?",
    options: ["Reading", "Gaming", "Watching TV", "Taking a Nap"]
  },
  {
    player1Question: "If you could instantly learn one skill, what would it be?",
    player2Question: "If they could instantly learn one skill, what would it be?",
    options: ["Playing an Instrument", "Cooking", "Speaking a New Language", "Dancing"]
  },
  {
    player1Question: "What's your favorite fast food restaurant?",
    player2Question: "What's their favorite fast food restaurant?",
    options: ["McDonald's", "Burger King", "KFC", "Subway"]
  },
  {
    player1Question: "Which animal would you most like to see in the wild?",
    player2Question: "Which animal would they most like to see in the wild?",
    options: ["Lion", "Elephant", "Dolphin", "Penguin"]
  },
  {
    player1Question: "What's your favorite ice cream flavor?",
    player2Question: "What's their favorite ice cream flavor?",
    options: ["Vanilla", "Chocolate", "Strawberry", "Mint Chocolate Chip"]
  },
  {
    player1Question: "Which app do you use the most?",
    player2Question: "Which app do they use the most?",
    options: ["Instagram", "TikTok", "YouTube", "Spotify"]
  },
  {
    player1Question: "What's your favorite way to stay active?",
    player2Question: "What's their favorite way to stay active?",
    options: ["Walking", "Gym", "Cycling", "Swimming"]
  },
  {
    player1Question: "Which type of home would you rather live in?",
    player2Question: "Which type of home would they rather live in?",
    options: ["Beach House", "Mountain Cabin", "City Apartment", "Country Farmhouse"]
  },
  {
    player1Question: "Which snack do you reach for first?",
    player2Question: "Which snack do they reach for first?",
    options: ["Chips", "Chocolate", "Popcorn", "Fruit"]
  },
  {
    player1Question: "What's your favorite way to celebrate your birthday?",
    player2Question: "What's their favorite way to celebrate their birthday?",
    options: ["Big Party", "Dinner with Family", "Weekend Getaway", "Relaxing at Home"]
  },
  {
    player1Question: "If you could own one luxury item, what would you choose?",
    player2Question: "If they could own one luxury item, what would they choose?",
    options: ["Sports Car", "Luxury Watch", "Private Yacht", "Designer Wardrobe"]
  },
  {
    player1Question: "Which board game would you rather play?",
    player2Question: "Which board game would they rather play?",
    options: ["Monopoly", "Uno", "Chess", "Scrabble"]
  }

  /* ---------------------------------------------------------------
     Add your next question below this line, following the same
     pattern as the objects above. Remember the comma after the
     closing "}" of the object above yours!
     --------------------------------------------------------------- */
];
