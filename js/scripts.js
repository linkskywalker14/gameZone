//PIG DICE
//1. Global Variables, Constructors, Prototypes
//2. Functions (Back End)
//3. Functions (Player Controls)
//4. Functions (Options Menu)
//5. User Interface Logic

//######
//1. Global Variables, Constructors, Prototypes
//######

//Eventually all of these will need to be Objects

let rounds = [];
let roundIndex = 0;

function Settings(cheating, twoDice, ai) {
  this.cheating = cheating;
  this.twoDice = twoDice;
  this.ai = ai;
}

let setting = new Settings(false,false,1);

//the Rounds constructor creates objects which contain all the variables necessary for each new round of the game.
function Round(player, rolls, ending, round, total) {
  this.turn = roundIndex + 1;
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
  } else {
    return "The evil ROBO PIG oppressor";
  }
}

//Round.totalScore pulls the total result from the active player's last round, and adds their total score from this round to return the new total.
Round.prototype.totalScore = function(){
  if (rounds[2]){
    return rounds[2].total + rounds[0].round;
  } else {
    return rounds[0].round;
  }
}

//######
//2. Functions (Back End)
//######

//the rollD6 function is called when either player rolls the die. It returns a value between 1 and 6. If cheating is active, the number is weighted.
function rollD6(){
  if (setting.cheating === true){
    const loadedD6 = [1, 2, 3, 4, 4, 5, 6, 6];
    const x = parseInt(Math.random() * 8 + 0);
    return loadedD6[x];
  } else {
    return parseInt(Math.random() * 5 + 1);
  }
}

//The displayTurns function is called at the end of each round, and updates the display of all turns so far.
function displayTurns(rounds){
  let turnList = $("ul#turns");
  let htmlForList = "";
  rounds.forEach(function(x) {
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

//the winCheck function is called after each die roll to determine if the active player has reached 100 points.
function winCheck(){
  if (rounds[0].player && rounds[0].totalScore() >= 100){
    $("#victor").html("WE ARE SAVED! THE PLAYER WINS!");
    rounds[0].ending = "victory.";
    rounds[0].total = rounds[0].totalScore();
    displayTurns(rounds);
    updateScore("humoscore")
  } else if (!rounds[0].player && rounds[0].totalScore() >= 100){
    rounds[0].ending = "victory.";
    rounds[0].total = rounds[0].totalScore();
    $("#victor").html("WE ARE DOOMED! THE EVIL ROBO-PIG HAS WON!");
    displayTurns(rounds);
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
    rounds[0].ending = "a hold.";
    rounds[0].total = rounds[0].totalScore();
    ridingRolls(2);
    swapPlayer();
  } else if(snake === true){
    rounds[0].ending = "SNAKE EYES!";
    rounds[0].total = 0;
    ridingRolls(3);
    swapPlayer();
  } else {
    rounds[0].round = 0;
    rounds[0].ending = "a break.";
    rounds[0].total = rounds[0].totalScore();
    ridingRolls(3);
    swapPlayer();
  }  
}

function swapPlayer(){
  displayTurns(rounds);
  roundIndex++;
  nextPlayer = !rounds[0].player;
  rounds.unshift(new Round(nextPlayer, [], "", 0, 0));
  if (setting.ai > 0 && rounds[0].player === false){
    aiPlayer();
  }
}

//the aiPlayer function is called whenever the human player's turn ends.
function aiPlayer(){
  let goal = aiGoal();
  if (setting.ai === 1){
    goal = Math.min(goal + 7, 100);
  }
  do {
    click();
    if (rounds[0].round === 0){
      break;
    }
  } while (rounds[0].totalScore() < goal);
    if (rounds[0].round != 0 && rounds[0].total < 100){
    roundEnd(true,false);
  }
}

//the aiGoal function is called at the start of the AI turn. It decides what number the AI will try to reach before choosing to end its turn.
function aiGoal(){
  if (100 <= rounds[0].totalScore() + 20) {
    return 100;
  } else if (15 < rounds[1].total - rounds[0].totalScore()) {
    return rounds[0].totalScore() + 15;
  } else if (rounds[1].total > rounds[0].totalScore()){
    return rounds[1].total + 1;
  } else if (rounds[1].total <= rounds[0].totalScore()){
    return rounds[0].totalScore() + 5;
  }
}

//######
//3. Functions (Player Controls)
//######

//the initialize function runs when players click the "Start Game" buttom.
function initialize(){
  rounds = [];
  roundIndex = 0;
  displayTurns(rounds);
  $("#endgame").hide();
  $("#pregame").hide();
  $("#controls").show();
  $("#currentRound").html("");
  $("#currentTotal").html("");
  rounds.unshift(new Round(true, [], "", 0, 0));
}

//The riding rolls function displays the actions of the current turn.
function ridingRolls(state){
  let ridingRolls = "";
  rounds[0].rolls.forEach(function(x) {
    ridingRolls += x + " + ";
  });
  if (state === 1){
    ridingRolls += "?";
  } else if (state === 2){
    ridingRolls += "[HOLD]";
    displayPresentTotal()
  } else if (state === 3){
    ridingRolls = ridingRolls.slice(0, -4);
    ridingRolls += ">BREAK<";
    displayPresentTotal()
  }
  $("#currentRound").html(ridingRolls);
}

function displayPresentTotal(){
  let p2 = "";
  if (setting.ai === 0){
    p2 = "Other Human: ";
  } else {
    p2 = "RoboPig: ";
  }
  if (!rounds[1]){
    $("#currentTotal").html("Human: " + rounds[0].total + "/100  |  " + p2 + "0/100");
  } else if (rounds[1].player === false) {
    $("#currentTotal").html("Human: " + rounds[0].total + "/100  |  " + p2 + rounds[1].total + "/100");
  } else {
    $("#currentTotal").html("Human: " + rounds[1].total + "/100  |  " + p2 + rounds[0].total + "/100");
  }  
}

//the click function is called whenever the player clicks "Roll."
function click(){
  if (setting.twoDice === true){
    click2D();
  } else {
    click1D();
  }
}

function click2D(){
  const faces = [rollD6(), rollD6()];
    displayFace(faces[0], "#theFirstDie");
    displayFace(faces[1], "#theSecondDie");
    rounds[0].rolls.push(faces[0] + faces[1]);
    if (faces[0] + faces[1] === 2) {
      const hold = false;
      const snake = true;
      roundEnd(hold,snake);
    } else if (faces[0] === 1 || faces[1] === 1) {
      roundEnd();
    } else if (faces[0] === faces[1]) {
      rounds[0].round = rounds[0].round + faces[0] + faces[1];
      rounds[0].rolls.push("Double! Roll again.");
      ridingRolls(1);
      click();
    } else {
      rounds[0].round = rounds[0].round + faces[0] + faces[1];
      ridingRolls(1);
      winCheck();
    }
}

function click1D(){
  const face = rollD6();
  displayFace(face, "#theFirstDie");
  rounds[0].rolls.push(face);
  if (face === 1) {
    roundEnd(false,false);
  } else {
    rounds[0].round = rounds[0].round + face;
    ridingRolls(1);
    winCheck();
  }
}

//######
//4. Functions (Options Menu)
//######

//the cheatMode function runs when the player clicks "Cheat" on the options drop down menu.
function cheatMode(){
  setting.cheating = !setting.cheating;
  if (setting.cheating === true){
    $(".theDie").css({'background-color':'#FFA340'});
    $("#cheat").css({'background-color':'#FFA340'});
  } else {
    $(".theDie").css({'background-color':'#FAFADA'});
    $("#cheat").css({'background-color':''});
  }
}

//the twoDicePig function runs when the player clicks "Two Dice" on the options drop down menu.
function twoDicePig(){
  if (roundIndex > 0){
    const x = confirm("This will restart your game. Do you wish to continue?");
    if (x === true){
      initialize();
      twoDicePig();
    }
  } else {
    setting.twoDice = !setting.twoDice;
    if (setting.twoDice === true){
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

//the changeAILevel function runs when the player clicks "AI Easy" on the options drop down menu.
function changeAILevel(level){
  if (level === 0){
    setting.ai = 0;
    $("#lvl0").css({'background-color':'#FFA340'});
    $("#lvl1").css({'background-color':''});
    $("#lvl2").css({'background-color':''});
  } else if (level === 1){
    setting.ai = 1;
    $("#lvl0").css({'background-color':''});
    $("#lvl1").css({'background-color':'#FFA340'});
    $("#lvl2").css({'background-color':''});
  } else if (level === 2){
    setting.ai = 2;
    $("#lvl0").css({'background-color':''});
    $("#lvl1").css({'background-color':''});
    $("#lvl2").css({'background-color':'#FFA340'});
  }
}


//######
//4. User Interface Logic
//######
$(document).ready(function() {
  storeScore();
  changeAILevel(1);

//Main game controls.
  $("#pregame").on("click", ".start",function() {
    initialize();
  });  
  $("#controls").on("click", ".roll",function() {
    click();
  });
  $("#controls").on("click", ".hold",function() {
    roundEnd(true,false);
  });

//Options Drop Down Menu
  $("#options").on("click", "#lvl0",function() {
    changeAILevel(0);
  });
  $("#options").on("click", "#lvl1",function() {
    changeAILevel(1);
  });
  $("#options").on("click", "#lvl2",function() {
    changeAILevel(2);
  });
  $("#options").on("click", "#cheat",function() {
    cheatMode();
  });
  $("#options").on("click", "#2die",function() {
    twoDicePig();
  });
});