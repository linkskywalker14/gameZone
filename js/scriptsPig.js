//PIG DICE
//1. Constructors, Prototypes
//2. Functions (Back End)
//3. Functions (AI)
//4. Functions (Display)
//5. Functions (Player Controls)
//6. Functions (Options Menu)
//7. User Interface Logic

//######
//1. Constructors, Prototypes
//######

//the Game constructor creates the object which contains the settings, round information, and counts the number of rounds played.
function Game(rounds, roundIndex){
  this.rounds = rounds;
  this.roundIndex = roundIndex;
  this.setting = new Settings(false,false,1);
}

//the Settings constructor creates the object which tracks the various options currently being used in play.
function Settings(cheating, twoDice, ai) {
  this.cheating = cheating;
  this.twoDice = twoDice;
  this.ai = ai;
}

//the Rounds constructor creates objects which contain all the variables necessary for each new round of the game.
function Round(player, rolls, ending, round, total) {
  this.turn = game1.roundIndex + 1;
  this.player = player;
  this.rolls = rolls;
  this.ending = ending;
  this.round = round;
  this.total = total;
}

// Round.who converts the true/false player statement into a string to print on the page.
Round.prototype.who = function(){
  if (this.player === true){
    return "Our noble Human champion";
  } else if (game1.setting.ai === 0){
    return "The wicked Human traitor";
  } else {
    return "The evil ROBO PIG oppressor";
  }
};

//Round.totalScore pulls the total result from the active player's last round, and adds their total score from this round to return the new total.
Round.prototype.totalScore = function(){
  if (game1.rounds[2]){
    return game1.rounds[2].total + game1.rounds[0].round;
  } else {
    return game1.rounds[0].round;
  }
};

//######
//2. Functions (Back End)
//######

//the rollD6 function is called when either player rolls the die. It returns a value between 1 and 6. If cheating is active, the number is weighted.
function rollD6(){
  if (game1.setting.cheating === true){
    const loadedD6 = [1, 2, 3, 4, 4, 5, 5, 6, 6];
    return loadedD6[parseInt(Math.random() * 9)];
  } else {
    return parseInt(Math.random() * 5 + 1);
  }
}

//the winCheck function is called after each die roll to determine if the active player has reached 100 points.
function winCheck(){
  if (game1.rounds[0].player && game1.rounds[0].totalScore() >= 100){
    $("#victor").html("WE ARE SAVED! THE PLAYER WINS!");
    game1.rounds[0].ending = "victory.";
    game1.rounds[0].total = game1.rounds[0].totalScore();
    displayTurns();
    updateScore("humoscore");
  } else if (!game1.rounds[0].player && game1.rounds[0].totalScore() >= 100){
    game1.rounds[0].ending = "victory.";
    game1.rounds[0].total = game1.rounds[0].totalScore();
    if (game1.setting.ai === 0){
      $("#victor").html("Such treachery! The human serving as proxy for the evil robo pig has won!");
    } else {
      $("#victor").html("WE ARE DOOMED! THE EVIL ROBO-PIG HAS WON!");
    }  
    displayTurns();
    updateScore("roboscore");
  }
}

//the storeScore function runs when the page is first loaded. It displays the locally scored W/L ratio, and if no ratio is present it creates the appropriate values in local storage.
function storeScore(){
  if (localStorage.getItem("humoscore")){
    $("#humoscore").html(localStorage.getItem("humoscore"));
    $("#roboscore").html(localStorage.getItem("roboscore"));

  } else {
    localStorage.setItem("humoscore", "0");
    localStorage.setItem("roboscore", "0");
    $("#humoscore").html(localStorage.getItem("humoscore"));
    $("#roboscore").html(localStorage.getItem("roboscore"));
  }
}

//the updateScore function is called when the game ends, and updates the W/L ratio kept in local storage.
function updateScore(winner){
  let x = parseInt(localStorage.getItem(winner));
  x = x + 1;
  localStorage.setItem(winner, x);
  storeScore();
  $("#controls").hide();
  $("#endgame").show();
  $("#pregame").show();
}

//the roundEnd function runs either when the active player rolls a 1, or chooses to hold. It updates scores appropriately, and passes the turn to the other player.
function roundEnd(hold,snake){
  if (hold === true){
    game1.rounds[0].ending = "a hold.";
    game1.rounds[0].total = game1.rounds[0].totalScore();
    ridingRolls(2);
    swapPlayer();
  } else if(snake === true){
    game1.rounds[0].round = 0;
    game1.rounds[0].ending = "SNAKE EYES!";
    game1.rounds[0].total = 0;
    ridingRolls(3);
    swapPlayer();
  } else {
    game1.rounds[0].round = 0;
    game1.rounds[0].ending = "a break.";
    game1.rounds[0].total = game1.rounds[0].totalScore();
    ridingRolls(3);
    swapPlayer();
  }  
}

function swapPlayer(){
  displayTurns();
  game1.roundIndex++;
  nextPlayer = !game1.rounds[0].player;
  game1.rounds.unshift(new Round(nextPlayer, [], "", 0, 0));
  if (game1.setting.ai > 0 && game1.rounds[0].player === false){
    aiPlayer();
  }
}

//######
//3. Functions (AI)
//######

//the aiPlayer function is called whenever the human player's turn ends.
async function aiPlayer(){
  document.getElementById('roll').disabled = true;
  document.getElementById('hold').disabled = true;
  let goal = aiGoal();
  if (game1.setting.ai === 1){
    goal = Math.min(goal + 7, 100);
  }
  do {
    await sleep(800);
    click();
    if (game1.rounds[0].round === 0){
      break;
    }
  } while (game1.rounds[0].totalScore() < goal);
    if (game1.rounds[0].round != 0 && game1.rounds[0].total < 100){
    roundEnd(true,false);
  }
  document.getElementById('roll').disabled = false;
  document.getElementById('hold').disabled = false;
}

//the aiGoal function is called at the start of the AI turn. It decides what number the AI will try to reach before choosing to end its turn.
function aiGoal(){
  if (100 <= game1.rounds[0].totalScore() + 20) {
    return 100;
  } else if (15 < game1.rounds[1].total - game1.rounds[0].totalScore()) {
    return game1.rounds[0].totalScore() + 15;
  } else if (game1.rounds[1].total > game1.rounds[0].totalScore()){
    return game1.rounds[1].total + 1;
  } else if (game1.rounds[1].total <= game1.rounds[0].totalScore()){
    return game1.rounds[0].totalScore() + 5;
  }
}

//the sleep function is called when the AI makes its turn, to give it a more human perceptible pacing.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//######
//4. Functions (Display)
//######

//The displayTurns function is called at the end of each round, and updates the display of all turns so far.
function displayTurns(){
  let turnList = $("ul#turns");
  let htmlForList = "";
  game1.rounds.forEach(function(x) {
    htmlForList += "<li class='turnList' id='" + x.player +"turn'><u><strong>Turn " + x.turn + ":</strong></u> " + x.who() + " rolled " + x.rolls.length + " times. (" + x.rolls + ") <br />Turn ended in " + x.ending + " They added " + x.round + " to their score, for a <strong>total of " + x.total + ".</strong>";
  });
  turnList.html(htmlForList);
}

//The displayFace function is called whenever the dice are rolled, and updates the visual representation of the die on the page.
function displayFace(face, die){
  const pip = '<img src="img/pip.gif" />';
  const nopip = '<img src="img/nopip.gif" />';
  switch (face){
    case (1): 
      $(die).html(nopip + nopip + nopip + "<br />" + nopip + pip + nopip + "<br />" + nopip + nopip + nopip);
      break;
    case (2): 
      $(die).html(nopip + nopip + pip + "<br />" + nopip + nopip + nopip + "<br />" + pip + nopip + nopip);
      break;
    case (3):  
      $(die).html(nopip + nopip + pip + "<br />" + nopip + pip + nopip + "<br />" + pip + nopip + nopip);
      break;
    case (4):  
      $(die).html(pip + nopip + pip + "<br />" + nopip + nopip + nopip + "<br />" + pip + nopip + pip);
      break;
    case (5):  
      $(die).html(pip + nopip + pip + "<br />" + nopip + pip + nopip + "<br />" + pip + nopip + pip);
      break;
    case (6):  
      $(die).html(pip + nopip + pip + "<br />" + pip + nopip + pip + "<br />" + pip + nopip + pip);
      break;
    default: $(die).html("What did you do!?");
  }
}

//The riding rolls function displays the rolls of the current round as they happen, before they're added to the total.
function ridingRolls(state){
  let ridingRolls = "";
  game1.rounds[0].rolls.forEach(function(x) {
    ridingRolls += x + " + ";
  });
  if (state === 1){
    ridingRolls += "?";
  } else if (state === 2){
    ridingRolls += "[HOLD]";
    displayPresentTotal();
  } else if (state === 3){
    ridingRolls = ridingRolls.slice(0, -4);
    ridingRolls += ">BREAK<";
    displayPresentTotal();
  }
  if (game1.rounds[0].player === true){
    $("#currentRound").css({'color':'black'});
  } else {
    $("#currentRound").css({'color':'red'});
  }
  $("#currentRound").html(ridingRolls);
}

//The displayPresentTotal function shows what the two players current total scores are.
function displayPresentTotal(){
  let p2 = "";
  if (game1.setting.ai === 0){
    p2 = "Traitor Human: ";
  } else {
    p2 = "RoboPig: ";
  }
  if (!game1.rounds[1]){
    $("#currentTotal").html("Human: " + game1.rounds[0].total + "/100  |  " + p2 + "0/100");
  } else if (game1.rounds[1].player === false) {
    $("#currentTotal").html("Human: " + game1.rounds[0].total + "/100  |  " + p2 + game1.rounds[1].total + "/100");
  } else {
    $("#currentTotal").html("Human: " + game1.rounds[1].total + "/100  |  " + p2 + game1.rounds[0].total + "/100");
  }  
}

//######
//5. Functions (Player Controls)
//######

//the initialize function runs when players click the "Start Game" buttom.
function initialize(){
  game1.rounds = [];
  game1.roundIndex = 0;
  displayTurns();
  $("#endgame").hide();
  $("#pregame").hide();
  $("#controls").show();
  $("#currentRound").html("");
  $("#currentTotal").html("");
  game1.rounds.unshift(new Round(true, [], "", 0, 0));
}

//the click function is called whenever the player clicks "Roll."
function click(){
  if (game1.setting.twoDice === true){
    click2D();
  } else {
    click1D();
  }
}

function click2D(){
  const faces = [rollD6(), rollD6()];
    displayFace(faces[0], "#theFirstDie");
    displayFace(faces[1], "#theSecondDie");
    game1.rounds[0].rolls.push(faces[0] + faces[1]);
    if (faces[0] + faces[1] === 2) {
      const hold = false;
      const snake = true;
      roundEnd(hold,snake);
    } else if (faces[0] === 1 || faces[1] === 1) {
      roundEnd();
    } else if (faces[0] === faces[1]) {
      game1.rounds[0].round = game1.rounds[0].round + faces[0] + faces[1];
      game1.rounds[0].rolls.push("Double! Roll again");
      ridingRolls(1);
      click();
    } else {
      game1.rounds[0].round = game1.rounds[0].round + faces[0] + faces[1];
      ridingRolls(1);
      winCheck();
    }
}

function click1D(){
  const face = rollD6();
  displayFace(face, "#theFirstDie");
  game1.rounds[0].rolls.push(face);
  if (face === 1) {
    roundEnd(false,false);
  } else {
    game1.rounds[0].round = game1.rounds[0].round + face;
    ridingRolls(1);
    winCheck();
  }
}

//######
//6. Functions (Options Menu)
//######

//the cheatMode function runs when the player clicks "Cheat" on the options drop down menu.
function cheatMode(){
  game1.setting.cheating = !game1.setting.cheating;
  if (game1.setting.cheating === true){
    $(".theDie").css({'background-color':'#FFA340'});
    $("#cheat").css({'background-color':'#FFA340'});
  } else {
    $(".theDie").css({'background-color':'#FAFADA'});
    $("#cheat").css({'background-color':''});
  }
}

//the twoDicePig function runs when the player clicks "Two Dice" on the options drop down menu.
function twoDicePig(){
  if (game1.roundIndex > 0){
    if (confirm("This will restart your game. Do you wish to continue?")){
      initialize();
      twoDicePig();
    }
  } else {
    game1.setting.twoDice = !game1.setting.twoDice;
    if (game1.setting.twoDice === true){
      $("#theSecondDie").css({'display' : 'inline-block'});
      $("#twoDiceRules").show();
      $("#oneDiceRules").hide();
      $("#2die").css({'background-color':'#FFA340'});
    } else {
      $("#theSecondDie").hide();
      $("#twoDiceRules").hide();
      $("#oneDiceRules").show();
      $("#2die").css({'background-color':''});
    }
  }
}

function gameInProgressCheck(level){
  if (game1.rounds.length > 0){
    if (confirm("This will restart your game. Do you wish to continue?")){
      changeAILevel(level);
      initialize();
    }
  } else {
    changeAILevel(level);
  }
}

//the changeAILevel function runs when the player clicks "AI Easy" on the options drop down menu.
function changeAILevel(level){
  if (level === 0){
    game1.setting.ai = 0;
    $("#lvl0").css({'background-color':'#FFA340'});
    $("#lvl1").css({'background-color':''});
    $("#lvl2").css({'background-color':''});
  } else if (level === 1){
    game1.setting.ai = 1;
    $("#lvl0").css({'background-color':''});
    $("#lvl1").css({'background-color':'#FFA340'});
    $("#lvl2").css({'background-color':''});
  } else if (level === 2){
    game1.setting.ai = 2;
    $("#lvl0").css({'background-color':''});
    $("#lvl1").css({'background-color':''});
    $("#lvl2").css({'background-color':'#FFA340'});
  }
}


//######
//7. User Interface Logic
//######
let game1 = new Game([], 0);

$(document).ready(function() {
  storeScore();
  changeAILevel(1);

//Main game controls.
  $("#pregame").on("click", ".start",function() {
    initialize();
  });  
  $("#controls").on("click", "#roll",function() {
    click();
  });
  $("#controls").on("click", "#hold",function() {
    roundEnd(true,false);
  });

//Options Drop Down Menu
  $("#options").on("click", "#lvl0",function() {
    gameInProgressCheck(0);
  });
  $("#options").on("click", "#lvl1",function() {
    gameInProgressCheck(1);
  });
  $("#options").on("click", "#lvl2",function() {
    gameInProgressCheck(2);
  });
  $("#options").on("click", "#cheat",function() {
    cheatMode();
  });
  $("#options").on("click", "#2die",function() {
    twoDicePig();
  });
});