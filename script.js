/*
  Function to get a random choice from rock/paper/scissors
*/
function getCpuChoice() {
  let cpuChoice,
    randNo = Math.random();
  if (randNo < 0.34) {
    cpuChoice = "rock";
  } else if (randNo >= 0.34 && randNo < 0.67) {
    cpuChoice = "paper";
  } else {
    cpuChoice = "scissors";
  }
  return cpuChoice;
}

let countWin,
  countLose,
  countDraw
  i;

function playRound() {
  let cpuChoice = getCpuChoice(),
    playerInput = prompt("Enter rock, paper or scissors:"),
    playerChoice,
    evalChoices,
    result;
  // playerChoice = playerInput.toLowerCase();
  switch (playerInput) {
    case "r":
    case "R":
      playerChoice = "rock";
    case "p":
    case "P":
      playerChoice = "paper";
    case "s":
    case "S":
      playerChoice = "scissors";
    default:
      playerChoice = playerInput.toLowerCase();
  }
  evalChoices = playerChoice + cpuChoice;
  switch (evalChoices) {
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      ++countDraw;
      alert(`Draw! You both chose ${playerChoice}.`);
      break;
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      ++countWin;
      alert(`You win! ${playerChoice} beats ${cpuChoice}.`);
      break;
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      ++countLose;
      alert(`You lose! ${cpuChoice} beats ${playerChoice}.`);
      break;
    default:
      alert(`${playerChoice} is not a valid argument, please try again.`)
      break;
  }
}