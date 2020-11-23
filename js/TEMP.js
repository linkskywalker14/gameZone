function place(position){
  console.log("The dingbat clicked the " + position + " place.");
}

$(document).ready(function() {

  $("#game").on("click", "#NW",function() {
    const position = "NW";
    place(position);
  }); 
  $("#game").on("click", "#NC",function() {
    const position = "NC";
    place(position);
  }); 
  $("#game").on("click", "#NE",function() {
    const position = "NE";
    place(position);
  }); 
  $("#game").on("click", "#CW",function() {
    const position = "CW";
    place(position);
  }); 
  $("#game").on("click", "#CC",function() {
    const position = "CC";
    place(position);
  }); 
  $("#game").on("click", "#CE",function() {
    const position = "CE";
    place(position);
  }); 
  $("#game").on("click", "#SW",function() {
    const position = "SW";
    place(position);
  }); 
  $("#game").on("click", "#SC",function() {
    const position = "SC";
    place(position);
  }); 
  $("#game").on("click", "#SE",function() {
    const position = "SE";
    place(position);
  });  

});