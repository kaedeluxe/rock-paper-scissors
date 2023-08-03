let countWin, countLose, countDraw;

//  Function to get a random choice from rock/paper/scissors
//    -Currently uses a random number between 0 and 1 and converts that at breakpoints
//    -This means that technically scissors has a 0.1% higher chance of being selected than the others
//    -Investigate use of other random functions to allow a more fair chance

function getCpuChoice() {
  let cpuChoice,
    randNo = Math.random();
  if (randNo < 0.333) {
    cpuChoice = "rock";
  } else if (randNo >= 0.333 && randNo < 0.666) {
    cpuChoice = "paper";
  } else {
    cpuChoice = "scissors";
  }
  return cpuChoice;
}

//  Function to play a round, including taking a shortcut for player input and converting it to a true value
//    -Investigate splitting into several smaller functions
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
      alert(`${playerChoice} is not a valid argument, please try again.`);
      break;
  }
}

//  Function to play a best of 5 against the CPU
//    -Loops the playRound() function until either the player or the CPU have won 3 games
//    -Does not take into account draws, you could potentially draw infinitely and the game would never end
//    -Not 100% sure why && works in the for loop, I was expecting || but it loops forever that way
//    -Investigate for loop alternative to &&
function playBestOfFive() {
  let scoreContent = document.getElementById("play__score");
  countWin = 0;
  countLose = 0;
  countDraw = 0;
  for (; countWin < 3 && countLose < 3; ) {
    playRound();
    if (countWin >= 3) {
      scoreContent.textContent = `You won! Final score: ${countWin} to ${countLose}.`;
    } else if (countLose >= 3) {
      scoreContent.textContent = `You lost! Final score: ${countWin} to ${countLose}.`;
    }
  }
}
