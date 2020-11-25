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
      break;
    case "NC":
      game1.toprow[1] = dude;
      break;
    case "NE":
      game1.toprow[2] = dude;
      break;
    case "CW":
      game1.midrow[0] = dude;
      break;
    case "CC":
      game1.midrow[1] = dude;
      break;
    case "CE":
      game1.midrow[2] = dude;
      break;
    case "SW":
      game1.botrow[0] = dude;
      break;
    case "SC":
      game1.botrow[1] = dude;
      break;
    case "SE":
      game1.botrow[2] = dude;
      break;
    default:
      console.log("WHAT DID YOU DO!?");
  }
}

function placeVis(position){
  console.log("The dingbat clicked the " + position + " place.");
  let move = $("#" + position);
  move.append(player());
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