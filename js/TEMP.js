//TIC TAC TOE
//1. Global Variables, Constructors, Prototypes
//2. Functions (Back End)
//3. Functions (Player Controls)
//4. Functions (Options Menu)
//5. User Interface Logic

//######
//1. Global Variables, Constructors, Prototypes
//######

//Eventually all of these will need to be Objects

function Board(toprow, midrow, botrow, won, ai, dude) {
  this.toprow = toprow;
  this.midrow = midrow;
  this.botrow = botrow;
  this.won = won;
  this.ai = ai;  //0 is human v human, 1 is random, 2 blocks win attempts, future: 3 pursues wins using the same functions used to ID blocks.
  this.dude = dude;
}

let game1 = new Board ([],[],[], false, 0, "X");

//######
//2. Functions (Back End)
//######

//The player function is called whenever a move is made. It returns either X or O, and updates game1.dude for the next player's turn.
function player(){
  if (game1.dude === "X"){
    game1.dude = "O";
    $("#ticTacTurn").html("O's turn");
    return "X";
  } else {
    game1.dude = "X";
    $("#ticTacTurn").html("X's turn");
    return "O";
  }
}

//The placeReal function is called whenever a move is made. It updates the three arrays which track the game's progress, and checks to see if a win has occurred.

function placeReal(position){
  switch(position){
    case "NW":
      game1.toprow[0] = game1.dude;
      findHWin(game1.toprow);
      findVWin(0);
      findDWin();
      break;
    case "NC":
      game1.toprow[1] = game1.dude;
      findHWin(game1.toprow);
      findVWin(1);
      break;
    case "NE":
      game1.toprow[2] = game1.dude;
      findHWin(game1.toprow);
      findVWin(2);
      findDWin();
      break;
    case "CW":
      game1.midrow[0] = game1.dude;
      findHWin(game1.midrow);
      findVWin(0);
      break;
    case "CC":
      game1.midrow[1] = game1.dude;
      findHWin(game1.midrow);
      findVWin(1);
      findDWin();
      break;
    case "CE":
      game1.midrow[2] = game1.dude;
      findHWin(game1.midrow);
      findVWin(2);
      break;
    case "SW":
      game1.botrow[0] = game1.dude;
      findHWin(game1.botrow);
      findVWin(0);
      findDWin();
      break;
    case "SC":
      game1.botrow[1] = game1.dude;
      findHWin(game1.botrow);
      findVWin(1);
      break;
    case "SE":
      game1.botrow[2] = game1.dude;
      findHWin(game1.botrow);
      findVWin(2);
      findDWin();
      break;
    default:
      console.log("WHAT DID YOU DO!?");
  }
}

//The placeVis function is called whenever a move is made. It updates the visual representation of the game state, including displaying win, loss, or draw messages.

function placeVis(position){
  let move = $("#" + position);
  const currentDude = player();
  move.html(currentDude);
  if (game1.won === true){
    console.log(currentDude);
    $("#ticTacTurn").html(currentDude + " has won!");
    updateScore(currentDude.toLowerCase() + "score");
  } else if (game1.toprow.length + game1.midrow.length + game1.botrow.length === 9 && !game1.toprow.includes(undefined) && !game1.midrow.includes(undefined) && !game1.botrow.includes(undefined)){
    $("#ticTacTurn").html("Draw");
    game1.won = true;
    $("#playAgain").show();
  }
}

//The findHWin, findVWin, & findDWin functions are called whenever a move is made. They check for winning lines Horizontally, Vertically, and Diagonally, and highlight the win if found.

function findHWin(row){
  if (row[0] === row[1] && row[0] === row[2]){
    console.log("AN H WIN HAS BEEN DISCOVERED!");
    game1.won = true;
    $("#playAgain").show();
    switch (row){
      case game1.toprow:
        $("#NW, #NC, #NE").css({'background-color':'red'});
        break;
      case game1.midrow:
        $("#CW, #CC, #CE").css({'background-color':'red'});
        break;
      case game1.botrow:
        $("#SW, #SC, #SE").css({'background-color':'red'});
        break;
      default:
        console.log("Horizontal win highlighting error");
    }
  } else {
    console.log("no h win yet");
  }
}

function findVWin(line){
  if (game1.toprow[line] === game1.midrow[line] && game1.toprow[line] === game1.botrow[line]){
    console.log("A V WIN HAS BEEN DISCOVERED!");
    game1.won = true;
    $("#playAgain").show();
    switch (line){
      case 0:
        $("#NW, #CW, #SW").css({'background-color':'red'});
        break;
      case 1:
        $("#NC, #CC, #SC").css({'background-color':'red'});
        break;
      case 2:
        $("#NE, #CE, #SE").css({'background-color':'red'});
        break;
      default:
        console.log("Vertical win highlighting error");
    }
  } else {
    console.log("no v win yet");
  }
}

function findDWin(){
  if (game1.midrow[1]){
    if (game1.midrow[1] === game1.toprow[0] && game1.midrow[1] === game1.botrow[2]){
      console.log("A D WIN HAS BEEN DISCOVERED!");
      $("#NW, #CC, #SE").css({'background-color':'red'});
      game1.won = true;
      $("#playAgain").show();
    } else if (game1.midrow[1] === game1.toprow[2] && game1.midrow[1] === game1.botrow[0]){
      console.log("A D WIN HAS BEEN DISCOVERED!");
      $("#NE, #CC, #SW").css({'background-color':'red'});
      game1.won = true;
      $("#playAgain").show();
    } else {
      console.log("no d win yet, center taken tho");
    }
  } else {
    console.log("no d win yet, no center taken either");
  }
}


























function openSpaceCheck(position){
  switch(position){
    case "NW":
      if (game1.toprow[0] === undefined){
        return true;
      } else {
        console.log("That space is taken already!")
      }
      break;
    case "NC":
      if (game1.toprow[1] === undefined){
        return true;
      } else {
        console.log("That space is taken already!")
      }
      break;
    case "NE":
      if (game1.toprow[2] === undefined){
        return true;
      } else {
        console.log("That space is taken already!")
      }
      break;
    case "CW":
      if (game1.midrow[0] === undefined){
        return true;
      } else {
        console.log("That space is taken already!")
      }
      break;
    case "CC":
      if (game1.midrow[1] === undefined){
        return true;
      } else {
        console.log("That space is taken already!")
      }
      break;
    case "CE":
      if (game1.midrow[2] === undefined){
        return true;
      } else {
        console.log("That space is taken already!")
      }
      break;
    case "SW":
      if (game1.botrow[0] === undefined){
        return true;
      } else {
        console.log("That space is taken already!")
      }
      break;
    case "SC":
      if (game1.botrow[1] === undefined){
        return true;
      } else {
        console.log("That space is taken already!")
      }
      break;
    case "SE":
      if (game1.botrow[2] === undefined){
        return true;
      } else {
        console.log("That space is taken already!")
      }
      break;
    default:
      return false;
  }
}

//Block Checks
//asdf
function hBlockCheck(){
  const tRowTest = game1.toprow.filter(element => element === "X");
  const mRowTest = game1.midrow.filter(element => element === "X");
  const bRowTest = game1.botrow.filter(element => element === "X");
  if (tRowTest.length === 2 && !game1.toprow.includes("O")){
    console.log("NOT SO FAST, HUMAN! I WILL BLOCK YOUR ATTEMPT TO WIN!");
    const place = game1.toprow.findIndex(empty => empty != "X");
    switch (place){
      case 0:
        maybeaiplace("NW");
        break;
      case 1:
        maybeaiplace("NC");
        break;
      case -1:
        maybeaiplace("NE");
        break;
      default:
        console.log("Something broke!");
        break;
    }
  } else if (mRowTest.length === 2 && !game1.midrow.includes("O")){
    console.log("NOT SO FAST, HUMAN! I WILL BLOCK YOUR ATTEMPT TO WIN!");
    const place = game1.midrow.findIndex(empty => empty != "X");
    switch (place){
      case 0:
        maybeaiplace("CW");
        break;
      case 1:
        maybeaiplace("CC");
        break;
      case -1:
        maybeaiplace("CE");
        break;
      default:
        console.log("Something broke!");
        break;
    }
  } else if (bRowTest.length === 2 && !game1.botrow.includes("O")) {
    console.log("NOT SO FAST, HUMAN! I WILL BLOCK YOUR ATTEMPT TO WIN!");
    const place = game1.botrow.findIndex(empty => empty != "X");
    switch (place){
      case 0:
        maybeaiplace("SW");
        break;
      case 1:
        maybeaiplace("SC");
        break;
      case -1:
        maybeaiplace("SE");
        break;
      default:
        console.log("Something broke!");
        break;
    }
  } else {
    vBlockCheck();
  }
}

function vBlockCheck(){
  const wColumn = [game1.toprow[0], game1.midrow[0], game1.botrow[0]];
  const cColumn = [game1.toprow[1], game1.midrow[1], game1.botrow[1]];
  const eColumn = [game1.toprow[2], game1.midrow[2], game1.botrow[2]];
  const wColumnTest = wColumn.filter(element => element === "X");
  const cColumnTest = cColumn.filter(element => element === "X");
  const eColumnTest = eColumn.filter(element => element === "X");
  console.log("W column is " + wColumn + " wColumnTest is " + wColumnTest);
  console.log("C column is " + cColumn + " cColumnTest is " + cColumnTest);
  console.log("E column is " + eColumn + " eColumnTest is " + eColumnTest);

  if (wColumnTest.length === 2 && !wColumn.includes("O")){
    console.log("Thought you could trick me horizontally?");
    const place = wColumn.findIndex(empty => empty != "X");
    console.log("place is" + place);
    switch (place){
      case 0:
        maybeaiplace("NW");
        break;
      case 1:
        maybeaiplace("CW");
        break;
      case 2:
        maybeaiplace("SW");
        break;
      default:
        console.log("Something broke!");
        break;
    }
  } else if (cColumnTest.length === 2 && !cColumn.includes("O")){
    console.log("Thought you could trick me horizontally?");
    const place = cColumn.findIndex(empty => empty != "X");
    console.log("place is" + place);
    switch (place){
      case 0:
        maybeaiplace("NC");
        break;
      case 1:
        maybeaiplace("CC");
        break;
      case 2:
        maybeaiplace("SC");
        break;
      default:
        console.log("Something broke!");
        break;
    }
  } else if (eColumnTest.length === 2 && !eColumn.includes("O")) {
    console.log("Thought you could trick me horizontally?");
    const place = eColumn.findIndex(empty => empty != "X");
    console.log("place is" + place);
    switch (place){
      case 0:
        maybeaiplace("NE");
        break;
      case 1:
        maybeaiplace("CE");
        break;
      case 2:
        maybeaiplace("SE");
        break;
      default:
        console.log("Something broke!");
        break;
    }
  } else {
    console.log("I got to vBlock, but I didn't find one.");
    dBlockCheck();
  }
}

function dBlockCheck(){
  const fDiag = [game1.botrow[0], game1.midrow[1], game1.toprow[2]];
  const bDiag = [game1.toprow[0], game1.midrow[1], game1.botrow[2]];
  const fDiagTest = fDiag.filter(element => element === "X");
  const bDiagTest = bDiag.filter(element => element === "X");
  
  console.log("forward diagonal is " + fDiag + " fDiagTest is " + fDiagTest);
  console.log("backward diagonal is " + bDiag + " bDiagTest is " + bDiagTest);

  if (fDiagTest.length === 2 && !fDiag.includes("O")){
    console.log("I've mastered the diagonal!");
    const place = fDiag.findIndex(empty => empty != "X");
    switch (place){
      case 0:
        maybeaiplace("SW");
        break;
      case 1:
        maybeaiplace("CC");
        break;
      case 2:
        maybeaiplace("NE");
        break;
      default:
        console.log("Something broke!");
        break;
    }
  } else if (bDiagTest.length === 2 && !bDiag.includes("O")){
    console.log("I've mastered the diagonal!");
    const place = bDiag.findIndex(empty => empty != "X");
    console.log("place is" + place);
    switch (place){
      case 0:
        maybeaiplace("NW");
        break;
      case 1:
        maybeaiplace("CC");
        break;
      case 2:
        maybeaiplace("SE");
        break;
      default:
        console.log("Something broke!");
        break;
    }
  } else {
    console.log("I got to dBlock, but I didn't find one.");
    aiMove();
  }
}

function maybeaiplace(position){
  if (game1.won === false){
    placeReal(position);
    placeVis(position);
  } else {
    console.log("The game is over. I'm not gonna do shit.");
  }  
}

function aiMove(){
  if (game1.toprow.length + game1.midrow.length + game1.botrow.length === 9 && !game1.toprow.includes(undefined) && !game1.midrow.includes(undefined) && !game1.botrow.includes(undefined)){
    $("#ticTacTurn").html("Draw");
    game1.won = true;
    $("#playAgain").show();
  } else {
    const pos = [parseInt(Math.random() * 3 + 0), parseInt(Math.random() * 3 + 0)]
    switch (pos[0]){
      case 0:
        console.log("Top row, " + pos[1] + " position is " + game1.toprow[pos[1]]);
        if (game1.toprow[pos[1]] === undefined){
          aiPlace(pos);
        } else {
          aiMove();
        }
        break;
      case 1:
        console.log("Middle row, " + pos[1] + " position is " + game1.midrow[pos[1]]);
        if (game1.midrow[pos[1]] === undefined){
          aiPlace(pos);
        } else {
          aiMove();
        } 
        break;
      case 2:
        console.log("Bottom row, " + pos[1] + " position is " + game1.botrow[pos[1]]);
        if (game1.botrow[pos[1]] === undefined){
          aiPlace(pos);
        } else {
          aiMove();
        }  
        break;
      default:
        console.log("AI placement error!");
    }
  }
}

function aiPlace(pos){
  console.log("I got there! Row: " + pos[0] + " & Col: " + pos[1]);
  switch (pos[0]){
    case 0:
      switch (pos[1]){
        case 0:
          maybeaiplace("NW");
          break;
        case 1:
          maybeaiplace("NC");
          break;
        case 2:
          maybeaiplace("NE");
          break;
      }
      break;
    case 1:
      switch (pos[1]){
        case 0:
          maybeaiplace("CW");
          break;
        case 1:
          maybeaiplace("CC");
          break;
        case 2:
          maybeaiplace("CE");
          break;
      }
      break;
    case 2:
      switch (pos[1]){
        case 0:
          maybeaiplace("SW");
          break;
        case 1:
          maybeaiplace("SC");
          break;
        case 2:
          maybeaiplace("SE");
          break;
      }
      break;
  }
}

function storeScore(){
  if (localStorage.getItem("xscore")){
    $("#xscore").html(localStorage.getItem("xscore"));
    $("#oscore").html(localStorage.getItem("oscore"));

  } else {
    localStorage.setItem("xscore", "0");
    localStorage.setItem("oscore", "0");
    $("#xscore").html(localStorage.getItem("xscore"));
    $("#oscore").html(localStorage.getItem("oscore"));
  }
}

function updateScore(winner){
  let x = parseInt(localStorage.getItem(winner));
  x = x + 1;
  localStorage.setItem(winner, x);
  storeScore();
}

function gameInProgressCheck(level){
  if (1 <= game1.toprow.length + game1.midrow.length + game1.botrow.length){
    if (confirm("This will restart your game. Do you wish to continue?")){
      aiPlayer(level);
      newRound(game1.ai);
    }
  } else {
    aiPlayer(level);
  }
}

function aiPlayer(level){
  if (level === game1.ai){
    game1.ai = 0;
    $("#easyAI").css({'background-color':''});
    $("#hardAI").css({'background-color':''});
  } else if (level === 1){
    game1.ai = 1;
    $("#easyAI").css({'background-color':'#FFA340'});
    $("#hardAI").css({'background-color':''});
  } else if (level === 2){
    game1.ai = 2;
    $("#hardAI").css({'background-color':'#FFA340'});
    $("#easyAI").css({'background-color':''});
  }
}

















//######
//ZZZ. Functions (Player Controls)
//######

//The maybePlace function is called whenever a player clicks a space on the board. It checks if the space is open, calls the functions which make the appropriate move, and summons the AI player if any.

function maybePlace(position){
  if (openSpaceCheck(position)){
    if (game1.won === false){
      placeReal(position);
      placeVis(position);
      console.log("game1.ai is currently set to: " + game1.ai);
      if (game1.ai === 1){
        aiMove();
      } else if (game1.ai === 2){
        hBlockCheck();
      }
    } else {
      console.log("The game is over. I'm not gonna do shit.");
    }
  }    
}

//The newRound function is only available after the game ends and the "Play Again?" button appears.

function newRound(ai) {
  $("#playAgain").hide();
  game1 = new Board ([],[],[], false, ai, "X");
  $("#NW, #NC, #NE, #CW, #CC, #CE, #SE, #SC, #SW").html("");
  $("#NW, #NC, #NE, #CW, #CC, #CE, #SE, #SC, #SW").css({'background-color':''});
  $("#ticTacTurn").html("X goes first");
}

//Attaching attaching listeners to the page's UI.

$(document).ready(function() {
  
  storeScore();

//Game Board Listeners
  $("#game").on("click", "#NW",function() {
    const position = "NW";
    maybePlace(position);
  }); 
  $("#game").on("click", "#NC",function() {
    const position = "NC";
    maybePlace(position);
  }); 
  $("#game").on("click", "#NE",function() {
    const position = "NE";
    maybePlace(position);
  }); 
  $("#game").on("click", "#CW",function() {
    const position = "CW";
    maybePlace(position);
  }); 
  $("#game").on("click", "#CC",function() {
    const position = "CC";
    maybePlace(position);
  }); 
  $("#game").on("click", "#CE",function() {
    const position = "CE";
    maybePlace(position);
  }); 
  $("#game").on("click", "#SW",function() {
    const position = "SW";
    maybePlace(position);
  }); 
  $("#game").on("click", "#SC",function() {
    const position = "SC";
    maybePlace(position);
  }); 
  $("#game").on("click", "#SE",function() {
    const position = "SE";
    maybePlace(position);
  });

//Options menu listeners
  $("#options").on("click", "#easyAI",function() {
    gameInProgressCheck(1);
  });
  $("#options").on("click", "#hardAI",function() {
    gameInProgressCheck(2);
  });

//Play again listener
  $("#playAgain").on("click", ".start",function() {
    newRound(game1.ai);
  });  
});