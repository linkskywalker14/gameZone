/* DEAL WITH THIS LATER

function Round(player, rolls, ending, total) {
  this.player = player;
  this.rolls = rolls;
  this.ending = ending;
  this.total = total;
}

rounds.push(new Round());

*/

//PIG DICE
//1. Global Variables
//2. Ancilary Modules
//3. Active Modules
//4. User Interface Logic

//1. Global Variables
//Unfortunately, after thorough googling, the only way I can find to pass variables through an onClick event is to use React.
//Since this would seem necessary, and since I haven't learned React, I believe global variables are necessary.

let playerScore = 0;
let robotScore = 0;
let roundTotal = 0;

//The three above seem necessary, given my current limitations. The three below haven't been assessed yet.

let cheating = false;
let rounds = [];
player = true;

//######
//2. Ancilary Modules
// 1, 2, 3--an Index
//######

//The displayFace function arranges the pips on the die. 
function displayFace(face){
  const pip = '<img src="img/pip.gif" />';
  const nopip = '<img src="img/nopip.gif" />';
  switch (face){
    case (1): 
      $("#theDie").html(nopip + nopip + nopip + "<br />" + nopip + pip + nopip + "<br />" + nopip + nopip + nopip);
      break;
    case (2): 
      $("#theDie").html(nopip + nopip + pip + "<br />" + nopip + nopip + nopip + "<br />" + pip + nopip + nopip);
      break;
    case (3):  
      $("#theDie").html(nopip + nopip + pip + "<br />" + nopip + pip + nopip + "<br />" + pip + nopip + nopip);
      break;
    case (4):  
      $("#theDie").html(pip + nopip + pip + "<br />" + nopip + nopip + nopip + "<br />" + pip + nopip + pip);
      break;
    case (5):  
      $("#theDie").html(pip + nopip + pip + "<br />" + nopip + pip + nopip + "<br />" + pip + nopip + pip);
      break;
    case (6):  
      $("#theDie").html(pip + nopip + pip + "<br />" + pip + nopip + pip + "<br />" + pip + nopip + pip);
      break;
    default: $("#theDie").html("What did you do!?");
  }
}

//the rollD6 function returns a random number between 1 and 6. If cheating is active, the number is weighted.
function rollD6(){
  if (cheating === true){
    const loadedD6 = [1, 2, 3, 4, 4, 5, 6, 6];
    const x = parseInt(Math.random() * 8 + 0);
    return loadedD6[x];
  } else {
    return parseInt(Math.random() * 5 + 1);
  }
}

//the winCheck function is run after every die roll to see if the active player has gotten enough points to win.
function winCheck(){
  if (player && playerScore + roundTotal >= 100){
    $("#controls").hide();
    $("#endgame").show();
    $("#victor").append("WE ARE SAVED! THE PLAYER WINS!");
    $("#pregame").show();
  } else if (!player && robotScore + roundTotal >= 100){
    $("#controls").hide();
    $("#endgame").show();
    $("#victor").append("WE ARE DOOMED! THE EVIL ROBO-PIG HAS WON!");
    $("#pregame").show();
  }
}

//the roundEnd function is INCOMPLETE. It runs either when a 1 is rolled, or when hold occurs. 
function roundEnd(hold){
  player = !player;
  if (hold === true){
    if(player === false){
      playerScore = playerScore + roundTotal;
      roundTotal = 0;
      console.log("Player chooses to end with " + playerScore + " points. Turn passes to computer.");
      aiPlayer();
    } else {
      robotScore = robotScore + roundTotal;
      roundTotal = 0;
      console.log("Computer chooses to end with " + robotScore + " points. Turn passes to player.");
    }
  } else {
    if (player === false){
      console.log("!!!THE PLAYER ROLLED A ONE!!!");
      roundTotal = 0;
      aiPlayer();
    } else {
      console.log("!!!THE COMPUTER ROLLED A ONE!!!");
      roundTotal = 0;
    }
  }  
}

//the aiGoal function runs at the beginning of the AI turn. It decides what number the AI will try to reach before choosing to end its turn.
function aiGoal(){
  if (100 <= robotScore + 20) {
    console.log("The EVIL COMPUTER speaks: 'Looks like we're in end game now, HOOMAN!'");
    return 100;
  } else if (15 < playerScore - robotScore) {
    return robotScore + 15;
  } else if (playerScore > robotScore){
    return playerScore + 1;
  } else if (playerScore <= robotScore){
    return robotScore + 5;
  }
}

//######
//3. Active Modules
// 1, 2, 3--an Index
//######

//The initialize function runs when the player wishes to start a new game.
function initialize(){
  $("#pregame").hide();
  $("#controls").show();
  playerScore = 0;
  robotScore = 0;
  roundTotal = 0;
}

//The click function runs whenever either player rolls the dice.
function click(){
  const face = rollD6();
  displayFace(face);
  if (face === 1) {
    roundEnd();
  } else {
    roundTotal = roundTotal + face;
    winCheck();
    switch (player) {
      case (true):
        console.log("players rolls " + face + ". Round total is now " + roundTotal);
        break;
      default:
        console.log("EVIL PIG ROLLS " + face + ". EVIL TOTAL IS NOW  " + roundTotal);
    }
  } 
}

//the hold function runs when the player chooses to end their turn.
function hold(){
  const hold = true;
  roundEnd(hold);
}

//the aiPlayer function runs anytime it stops being the player's turn.
function aiPlayer(){
  const goal = aiGoal();
  do {
    click();
    if (roundTotal === 0){
      break;
    }
  } while (robotScore + roundTotal < goal);
  if (roundTotal != 0){
    hold();
  }
}

//the cheatMode function runs when the player clicks the cheating button.
function cheatMode(){
  cheating = !cheating;
  if (cheating === true){
    $("#theDie").css({'background-color':'#FFA340'});
  } else {
    $("#theDie").css({'background-color':'#FAFADA'});
  }
}

//######
//4. User Interface Logic
//######

$(document).ready(function() {

  $("#pregame").on("click", ".start",function() {
    initialize();
  });  
  $("#controls").on("click", ".roll",function() {
    click();
  });
  $("#controls").on("click", ".hold",function() {
    hold();
  });
  $("#controls").on("click", ".cheat",function() {
    cheatMode();
  });

});