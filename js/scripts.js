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

//The three above seem necessary, given my current limitations. The three below haven't been assessed yet.

let rounds = [];
let roundIndex = 0;
let cheating = false;

//######
//2. Ancilary Modules
// 1, 2, 3--an Index
//######

//the Rounds constructor records information about each round of play for display.
function Round(player, rolls, ending, round, total) {
  this.turn = roundIndex + 1;
  this.player = player;
  this.rolls = rolls;
  this.ending = ending;
  this.round = round;
  this.total = total;
}

Round.prototype.who = function(){
  if (this.player === true){
    return "Our noble Human champion";
  } else {
    return "The evil ROBO PIG oppressor";
  }
}

Round.prototype.totalScore = function(){
  //Eventually this will swap scores between the two players. 
}

//The displayTurns function shows all the moves in a given game. Runs at the end of a turn.
function displayTurns(rounds){
  let turnList = $("ul#turns");
  let htmlForList = "";
  rounds.forEach(function(x) {
    htmlForList += "<li class='turnList' id='" + x.player +"turn'><u><strong>Turn " + x.turn + ":</strong></u> " + x.who() + " rolled " + x.rolls.length + " times. (" + x.rolls + ") <br />Turn ended in a " + x.ending + ". They added " + x.round + " to their score, for a <strong>total of " + x.total + ".</strong>";
  });
  turnList.html(htmlForList);
}

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
  if (rounds[0].player && playerScore + rounds[0].round >= 100){
    $("#controls").hide();
    $("#endgame").show();
    $("#victor").append("WE ARE SAVED! THE PLAYER WINS!");
    $("#pregame").show();
  } else if (!rounds[0].player && robotScore + rounds[0].round >= 100){
    $("#controls").hide();
    $("#endgame").show();
    $("#victor").append("WE ARE DOOMED! THE EVIL ROBO-PIG HAS WON!");
    $("#pregame").show();
  }
}

//the roundEnd function is INCOMPLETE. It runs either when a 1 is rolled, or when hold occurs. 
function roundEnd(hold){
  if (hold === true){
    if(rounds[0].player === true){
      playerScore = playerScore + rounds[0].round;
      rounds[0].ending = "hold";
      rounds[0].total = playerScore;
      aiPlayer();
    } else {
      robotScore = robotScore + rounds[0].round;
      rounds[0].ending = "hold";
      rounds[0].total = robotScore;
    }
  } else {
    if (rounds[0].player === true){
      rounds[0].round = 0;
      rounds[0].ending = "break";
      rounds[0].total = playerScore;
      aiPlayer();
    } else {
      rounds[0].round = 0;
      rounds[0].ending = "break";
      rounds[0].total = robotScore;
    }
  }  
}

//the aiGoal function runs at the beginning of the AI turn. It decides what number the AI will try to reach before choosing to end its turn.
function aiGoal(){
  if (100 <= robotScore + 20) {
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
  rounds.unshift(new Round(true, [], "", 0, 0));
}

//The click function runs whenever either player rolls the dice.
function click(){
  const face = rollD6();
  displayFace(face);
  rounds[0].rolls.push(face);
  if (face === 1) {
    roundEnd();
  } else {
    rounds[0].round = rounds[0].round + face;
    winCheck();
  } 
}

//the hold function runs when the player chooses to end their turn.
function hold(){
  const hold = true;
  roundEnd(hold);
}

//the aiPlayer function runs anytime it stops being the player's turn.
function aiPlayer(){
  displayTurns(rounds);
  roundIndex++;
  rounds.unshift(new Round(false, [], "", 0, 0));
  const goal = aiGoal();
  do {
    click();
    if (rounds[0].round === 0){
      break;
    }
  } while (robotScore + rounds[0].round < goal);
  if (rounds[0].round != 0){
    hold();
  }
  displayTurns(rounds);
  roundIndex++;
  rounds.unshift(new Round(true, [], "", 0, 0));
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