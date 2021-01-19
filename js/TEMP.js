function Board(toprow, midrow, botrow, won, dude) {
  this.toprow = toprow;
  this.midrow = midrow;
  this.botrow = botrow;
  this.won = won;
  this.dude = dude;
}

let game1 = new Board ([],[],[], false, "X");

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
  //Is it possible to have a loop or something inside an if statement? To make this scale?
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
  }
}

function maybeplace(position){
  if (game1.won === false){
    placeReal(position);
    placeVis(position);

  } else {
    console.log("The game is over. I'm not gonna do shit.");
  }  
}

$(document).ready(function() {
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
});