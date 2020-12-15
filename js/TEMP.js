function Board(toprow, midrow, botrow) {
  this.toprow = toprow;
  this.midrow = midrow;
  this.botrow = botrow;
}

let dude = "x";
let game1 = new Board ([],[],[]);

function player(){
  if (dude === "x"){
    dude = "o";
    return "X";
  } else {
    dude = "x";
    return "O";
  }
}

function placeReal(position){
  switch(position){
    case "NW":
      game1.toprow[0] = dude;
      findHWin(game1.toprow);
      findVWin(0);
      break;
    case "NC":
      game1.toprow[1] = dude;
      findHWin(game1.toprow);
      findVWin(1);
      break;
    case "NE":
      game1.toprow[2] = dude;
      findHWin(game1.toprow);
      findVWin(2);
      break;
    case "CW":
      game1.midrow[0] = dude;
      findHWin(game1.midrow);
      findVWin(0);
      break;
    case "CC":
      game1.midrow[1] = dude;
      findHWin(game1.midrow);
      findVWin(1);
      break;
    case "CE":
      game1.midrow[2] = dude;
      findHWin(game1.midrow);
      findVWin(2);
      break;
    case "SW":
      game1.botrow[0] = dude;
      findHWin(game1.botrow);
      findVWin(0);
      break;
    case "SC":
      game1.botrow[1] = dude;
      findHWin(game1.botrow);
      findVWin(1);
      break;
    case "SE":
      game1.botrow[2] = dude;
      findHWin(game1.botrow);
      findVWin(2);
      break;
    default:
      console.log("WHAT DID YOU DO!?");
  }
}

function findHWin(row){
  //Is it possible to have a loop or something inside an if statement? To make this scale?
  if (row[0] === row[1] && row[0] === row[2]){
    console.log("AN H WIN HAS BEEN DISCOVERED!");
  } else {
    console.log("no h win yet");
  }
}

function findVWin(line){
  if (game1.toprow[line] === game1.midrow[line] && game1.toprow[line] === game1.botrow[line]){
    console.log("A V WIN HAS BEEN DISCOVERED!");
  } else {
    console.log("no v win yet");
  }
}

function findDWin(){
  //No idea how to find a diagonal win in a scaleable way right now. I don't want to just hard code two possible win states, I want this to scale up to connect 4 size.
}

function placeVis(position){
  let move = $("#" + position);
  move.html(player());
}

$(document).ready(function() {

  $("#game").on("click", "#NW",function() {
    const position = "NW";
    placeReal(position);
    placeVis(position);
  }); 
  $("#game").on("click", "#NC",function() {
    const position = "NC";
    placeReal(position);
    placeVis(position);
  }); 
  $("#game").on("click", "#NE",function() {
    const position = "NE";
    placeReal(position);
    placeVis(position);
  }); 
  $("#game").on("click", "#CW",function() {
    const position = "CW";
    placeReal(position);
    placeVis(position);
  }); 
  $("#game").on("click", "#CC",function() {
    const position = "CC";
    placeReal(position);
    placeVis(position);
  }); 
  $("#game").on("click", "#CE",function() {
    const position = "CE";
    placeReal(position);
    placeVis(position);
  }); 
  $("#game").on("click", "#SW",function() {
    const position = "SW";
    placeReal(position);
    placeVis(position);
  }); 
  $("#game").on("click", "#SC",function() {
    const position = "SC";
    placeReal(position);
    placeVis(position);
  }); 
  $("#game").on("click", "#SE",function() {
    const position = "SE";
    placeReal(position);
    placeVis(position);
  });  

});