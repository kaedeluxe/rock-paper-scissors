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

function playRound(playerChoice) {
  let cpuChoice = getCpuChoice(),
    evalChoices = playerChoice + cpuChoice;

  switch (evalChoices) {
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      alert(`Draw! You both chose ${playerChoice}.`);
      break;
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      alert(`You win! ${playerChoice} beats ${cpuChoice}.`);
      break;
    default:
        alert(`You lose! ${cpuChoice} beats ${playerChoice}.`)
      break;
  }
}