//TIC TAC TOE
//1. Constructors, Prototypes
//2. Functions (Back End)
//3. Functions (Exclusive to AI Players)
//4. Functions (Player Controls & Options)
//5. User Interface Logic

//######
//1. Constructors, Prototypes
//######

function Board(toprow, midrow, botrow, won, ai, dude) {
  this.toprow = toprow;
  this.midrow = midrow;
  this.botrow = botrow;
  this.won = won;
  this.ai = ai;  //0 is human v human, 1 is random, 2 blocks win attempts, future: 3 pursues wins using the same functions used to ID blocks.
  this.dude = dude;
}

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

//The openSpaceCheck function is called whenever a human's move is made. It confirms a space is available before allowing the move to go forward.
//!!!!!!!!!!This function can almost certainly be refactored out of existence. Perhaps by combining it with "Place Real?"!!!!!!!!!!

function openSpaceCheck(position){
  switch(position){
    case "NW":
      if (game1.toprow[0] === undefined){
        return true;
      }
      break;
    case "NC":
      if (game1.toprow[1] === undefined){
        return true;
      }
      break;
    case "NE":
      if (game1.toprow[2] === undefined){
        return true;
      }
      break;
    case "CW":
      if (game1.midrow[0] === undefined){
        return true;
      }
      break;
    case "CC":
      if (game1.midrow[1] === undefined){
        return true;
      }
      break;
    case "CE":
      if (game1.midrow[2] === undefined){
        return true;
      }
      break;
    case "SW":
      if (game1.botrow[0] === undefined){
        return true;
      }
      break;
    case "SC":
      if (game1.botrow[1] === undefined){
        return true;
      }
      break;
    case "SE":
      if (game1.botrow[2] === undefined){
        return true;
      }
      break;
    default:
      return false;
  }
}

//The placeVis function is called whenever a move is made. It updates the visual representation of the game state, including displaying win, loss, or draw messages.

function placeVis(position){
  let move = $("#" + position);
  const currentDude = player();
  move.html(currentDude);
  if (game1.won === true){
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
  }
}

function findVWin(line){
  if (game1.toprow[line] === game1.midrow[line] && game1.toprow[line] === game1.botrow[line]){
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
  }
}

function findDWin(){
  if (game1.midrow[1]){
    if (game1.midrow[1] === game1.toprow[0] && game1.midrow[1] === game1.botrow[2]){
      $("#NW, #CC, #SE").css({'background-color':'red'});
      game1.won = true;
      $("#playAgain").show();
    } else if (game1.midrow[1] === game1.toprow[2] && game1.midrow[1] === game1.botrow[0]){
      $("#NE, #CC, #SW").css({'background-color':'red'});
      game1.won = true;
      $("#playAgain").show();
    }
  }
}

//the storeScore function runs when the page is first loaded. It displays the locally scored W/L ratio, and if no ratio is present it creates the appropriate values in local storage.

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

//the updateScore function is called when the game ends, and updates the W/L ratio kept in local storage.

function updateScore(winner){
  let x = parseInt(localStorage.getItem(winner));
  x = x + 1;
  localStorage.setItem(winner, x);
  storeScore();
}

//######
//3. Functions (Exclusive to AI Players)
//######

//the aiMove function selects an open board space at random. It is the extent of the level 1 AI, and the last-resort behavior of the level 2 AI.

function aiMove(){
  if (game1.toprow.length + game1.midrow.length + game1.botrow.length === 9 && !game1.toprow.includes(undefined) && !game1.midrow.includes(undefined) && !game1.botrow.includes(undefined)){
    $("#ticTacTurn").html("Draw");
    game1.won = true;
    $("#playAgain").show();
  } else {
    const pos = [parseInt(Math.random() * 3 + 0), parseInt(Math.random() * 3 + 0)]
    switch (pos[0]){
      case 0:
        if (game1.toprow[pos[1]] === undefined){
          aiPlace(pos);
        } else {
          aiMove();
        }
        break;
      case 1:
        if (game1.midrow[pos[1]] === undefined){
          aiPlace(pos);
        } else {
          aiMove();
        } 
        break;
      case 2:
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

//the aiPlace function converts the random numbers generated in the aiMove function into actual places on the board.

function aiPlace(pos){
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

//the maybeAiPlace function is called after the AI has decided on what its move ought to be. It checks to ensure the game is still going, then calls the same placement functions human players use.
//!!!!!!!!!!This should certainly be refactored out of existence. !!!!!!!!!!

function maybeaiplace(position){
  if (game1.won === false){
    placeReal(position);
    placeVis(position);
  }
}

//the hBlockCheck, vBlockCheck, and dBlockCheck functions are call in sequence by the level 2 AI. They identify near-wins by the human player, and attempt to circumvent them.

function hBlockCheck(){
  const tRowTest = game1.toprow.filter(element => element === "X");
  const mRowTest = game1.midrow.filter(element => element === "X");
  const bRowTest = game1.botrow.filter(element => element === "X");
  if (tRowTest.length === 2 && !game1.toprow.includes("O")){
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

  if (wColumnTest.length === 2 && !wColumn.includes("O")){
    const place = wColumn.findIndex(empty => empty != "X");
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
    const place = cColumn.findIndex(empty => empty != "X");
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
    const place = eColumn.findIndex(empty => empty != "X");
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
    dBlockCheck();
  }
}

function dBlockCheck(){
  const fDiag = [game1.botrow[0], game1.midrow[1], game1.toprow[2]];
  const bDiag = [game1.toprow[0], game1.midrow[1], game1.botrow[2]];
  const fDiagTest = fDiag.filter(element => element === "X");
  const bDiagTest = bDiag.filter(element => element === "X");

  if (fDiagTest.length === 2 && !fDiag.includes("O")){
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
    const place = bDiag.findIndex(empty => empty != "X");
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
    aiMove();
  }
}

//######
//4. Functions (Player Controls & Options)
//######

//The maybePlace function is called whenever a player clicks a space on the board. It checks if the space is open, calls the functions which make the appropriate move, and summons the AI player if any.

function maybePlace(position){
  if (openSpaceCheck(position)){
    if (game1.won === false){
      placeReal(position);
      placeVis(position);
      if (game1.ai === 1){
        aiMove();
      } else if (game1.ai === 2){
        hBlockCheck();
      }
    }
  }    
}

//The gameInProgressCheck function is called whenever the player changes the level of the game's AI. If there is a game in progress, it prompts a restart of the game.

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

//The aiPlayer function is called when the player uses the option menu to alter the level of the AI player. It updates the AI level, and the highlighting on the menu.

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

//The newRound function is only available after the game ends and the "Play Again?" button appears.

function newRound(ai) {
  $("#playAgain").hide();
  game1 = new Board ([],[],[], false, ai, "X");
  $("#NW, #NC, #NE, #CW, #CC, #CE, #SE, #SC, #SW").html("");
  $("#NW, #NC, #NE, #CW, #CC, #CE, #SE, #SC, #SW").css({'background-color':''});
  $("#ticTacTurn").html("X goes first");
}

//######
//5. User Interface Logic
//######

let game1 = new Board ([],[],[], false, 0, "X");

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