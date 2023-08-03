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

let countWin = 0,
  countLose = 0,
  countDraw = 0,
i;

function playRound() {
  let cpuChoice = getCpuChoice(),
    playerInput = prompt("Enter rock (r), paper (p) or scissors (s):"),
    playerChoice,
    evalChoices,
    result;
  switch (playerInput) {
    case "r":
    case "R":
      playerChoice = "rock";
      break;
    case "p":
    case "P":
      playerChoice = "paper";
      break;
    case "s":
    case "S":
      playerChoice = "scissors";
      break;
    default:
      playerChoice = playerInput.toLowerCase();
      break;
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
  document.getElementById("play__score").textContent = `Score: ${countWin}`;
}