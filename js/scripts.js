//Global Variables. Have none by the end. 

let score = 0;
let robotScore = 0;
let roundTotal = 0;
player = true;


function rollD6(){
  return parseInt(Math.random() * 5 + 1);
}

function winCheck(){
  if (player && score + roundTotal >= 100){
    console.log("WE ARE SAVED! THE PLAYER WINS!");
  } else if (!player && robotScore + roundTotal >= 100){
    console.log("WE ARE DOOMED! THE EVIL COMPUTER HAS WON!");
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
  score = score + roundTotal;
  roundTotal = 0;
  console.log("The player has chosen to end their turn with " + score + " points. The turn now passes to the EVIL COMPUTER.");
  aiPlayer();
}

function aiGoal(){
  if (100 <= robotScore + 20) {
    console.log("The EVIL COMPUTER speaks: 'Looks like we're in end game now, HOOMAN!'");
    return 100;
  } else if (15 < score - robotScore) {
    return robotScore + 15;
  } else if (score > robotScore){
    return score + 1;
  } else if (score <= robotScore){
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