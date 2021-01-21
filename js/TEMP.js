function Board(toprow, midrow, botrow, won, ai, dude) {
  this.toprow = toprow;
  this.midrow = midrow;
  this.botrow = botrow;
  this.won = won;
  this.ai = ai;  //0 is human v human, 1 is random, 2 has some strategy?
  this.dude = dude;
}

let game1 = new Board ([],[],[], false, 0, "X");

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

function findHWin(row){
  if (row[0] === row[1] && row[0] === row[2]){
    console.log("AN H WIN HAS BEEN DISCOVERED!");
    game1.won = true;
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
    } else if (game1.midrow[1] === game1.toprow[2] && game1.midrow[1] === game1.botrow[0]){
      console.log("A D WIN HAS BEEN DISCOVERED!");
      $("#NE, #CC, #SW").css({'background-color':'red'});
      game1.won = true;
    } else {
      console.log("no d win yet, center taken tho");
    }
  } else {
    console.log("no d win yet, no center taken either");
  }
}

function placeVis(position){
  let move = $("#" + position);
  const currentDude = player();
  move.html(currentDude);
  if (game1.won === true){
    console.log(currentDude);
    $("#ticTacTurn").html(currentDude + " has won!");
    updateScore(currentDude.toLowerCase() + "score");
  }
}

function maybeplace(position){
  if (game1.won === false){
    placeReal(position);
    placeVis(position);
    if (1 <= game1.ai){
      aiMove();
    }
  } else {
    console.log("The game is over. I'm not gonna do shit.");
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
  if (9 === game1.toprow.length + game1.midrow.length + game1.botrow.length){
    console.log("All spaces are filled up, dingus!");
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



function aiPlayer(level){
  //
  //Eventually this code will be used to ensure the AI is turned on at the start of a match.
  //
  //if (1 <= game1.toprow.length + game1.midrow.length + game1.botrow.length){
  //  const x = confirm("This will restart your game. Do you wish to continue?");
  //  if (x === true){
  //    
  //  }
  //}
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

$(document).ready(function() {
  
  storeScore();

//Attaching listeners to each space on the Tic Tac Toe board.

  $("#game").on("click", "#NW",function() {
    const position = "NW";
    maybeplace(position);
  }); 
  $("#game").on("click", "#NC",function() {
    const position = "NC";
    maybeplace(position);
  }); 
  $("#game").on("click", "#NE",function() {
    const position = "NE";
    maybeplace(position);
  }); 
  $("#game").on("click", "#CW",function() {
    const position = "CW";
    maybeplace(position);
  }); 
  $("#game").on("click", "#CC",function() {
    const position = "CC";
    maybeplace(position);
  }); 
  $("#game").on("click", "#CE",function() {
    const position = "CE";
    maybeplace(position);
  }); 
  $("#game").on("click", "#SW",function() {
    const position = "SW";
    maybeplace(position);
  }); 
  $("#game").on("click", "#SC",function() {
    const position = "SC";
    maybeplace(position);
  }); 
  $("#game").on("click", "#SE",function() {
    const position = "SE";
    maybeplace(position);
  });

//Attaching listeners to the options menu.
  $("#options").on("click", "#easyAI",function() {
    aiPlayer(1);
  });
  $("#options").on("click", "#hardAI",function() {
    aiPlayer(2);
  });


});