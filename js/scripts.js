//Global Variables. Have none by the end. 

let playerScore = 0;
let robotScore = 0;
let roundTotal = 0;
let cheating = false;
player = true;



function rollD6(){
  if (cheating === true){
    const loadedD6 = [1, 2, 3, 4, 4, 5, 6, 6];
    const x = parseInt(Math.random() * 8 + 0);
    console.log("I'm cheating by rolling a d8. I got a " + x);
    return loadedD6[x];
  } else {
    return parseInt(Math.random() * 5 + 1);
  }
}

function winCheck(){
  if (player && playerScore + roundTotal >= 100){
    $("#controls").hide();
    $("#endgame").show();
    $("#victor").append("WE ARE SAVED! THE PLAYER WINS!");
  } else if (!player && robotScore + roundTotal >= 100){
    $("#controls").hide();
    $("#endgame").show();
    $("#victor").append("WE ARE DOOMED! THE EVIL ROBO-PIG HAS WON!");
  }
}

function click(){
  const face = rollD6();
  if (face === 1) {
    if (player === true){
      console.log("Boo, you have rolled a 1, player! The " + roundTotal + " points you earned this round must be discarded, and now the turn passes to the EVIL COMPUTER!");
      roundTotal = 0;
      aiPlayer();
    } else {
      console.log("Huzzah! The EVIL COMPUTER has rolled a 1! Now we can discard the " + roundTotal + " points it accumulated during this round!");
      roundTotal = 0;
    }
  } else {
    roundTotal = roundTotal + face;
    winCheck();

    switch (player) {
      case (true):
        console.log("Congratulations, player! You have rolled a " + face + " and now have a running total for this round of " + roundTotal);
        break;
      default:
        console.log("Oh dear! The EVIL COMPUTER has rolled a " + face + " and now has a running total of " + roundTotal + " for this round!");
    }
  }  
}

function hold(){
  playerScore = playerScore + roundTotal;
  roundTotal = 0;
  console.log("The player has chosen to end their turn with " + playerScore + " points. The turn now passes to the EVIL COMPUTER.");
  aiPlayer();
}

function aiGoal(){
  if (100 <= robotScore + 20) {
    console.log("The EVIL COMPUTER speaks: 'Looks like we're in end game now, HOOMAN!'");
    return 100;
  } else if (15 < playerScore - robotScore) {
    return robotScore + 15;
  } else if (playerScore > robotScore){
    return playerScore + 1;
  } else if (playerScore <= robotScore){
    return robotScore + 5;
  }
}

function aiPlayer(){
  player = false;
  goal = aiGoal();

  do {
    click();
    if (roundTotal === 0) {
      player = true;
      break;
    }
  } while (robotScore + roundTotal < goal);

  robotScore = robotScore + roundTotal;
  roundTotal = 0;
  console.log("COMPUTER ends the round with " + robotScore + " points.");
  player = true;
}




// USER INTERFACE LOGIC

$(document).ready(function() {

  $("#controls").on("click", ".roll",function() {
    click();
  });
  $("#controls").on("click", ".hold",function() {
    hold();
  });

});