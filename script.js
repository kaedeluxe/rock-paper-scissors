let btn = document.querySelectorAll(".play-button"),
  emojiPlayerDoc = document.querySelector("#round-emoji__player"),
  emojiCpuDoc = document.querySelector("#round-emoji__cpu"),
  emojiPlayer,
  emojiCpu,
  cpuChoice,
  countWin = 0,
  countLose = 0,
  countDraw = 0;

//  Function to get a random choice from rock/paper/scissors
//    -Currently uses a random number between 0 and 1 and converts that at breakpoints
//    -This means that technically scissors has a 0.1% higher chance of being selected than the others
//    -Investigate use of other random functions to allow a more fair chance

function getCpuChoice() {
  let cpuChoiceTemp,
    randNo = Math.random();
  if (randNo < 0.333) {
    cpuChoiceTemp = "rock";
  } else if (randNo >= 0.333 && randNo < 0.666) {
    cpuChoiceTemp = "paper";
  } else {
    cpuChoiceTemp = "scissors";
  }
  return cpuChoiceTemp;
}

//  Function to play a round, including taking a shortcut for player input and converting it to a true value
function playRound(playerChoice) {
  let cpuChoiceTemp = getCpuChoice(),
    evalChoices,
    result = document.querySelector("#round__result");
  evalChoices = playerChoice + cpuChoiceTemp;
  cpuChoice = cpuChoiceTemp;
  switch (evalChoices) {
    case "rockrock":
    case "paperpaper":
    case "scissorsscissors":
      ++countDraw;
      result.textContent = `Draw! You both chose ${playerChoice}.`;
      break;
    case "rockscissors":
    case "paperrock":
    case "scissorspaper":
      ++countWin;
      result.textContent = `You win! ${playerChoice} beats ${cpuChoiceTemp}.`;
      break;
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      ++countLose;
      result.textContent = `You lose! ${cpuChoiceTemp} beats ${playerChoice}.`;
      break;
    default:
      alert(`${playerChoice} is not a valid argument, please try again.`);
      break;
  }
}

function getPlayerEmoji(emojiPlayerChoice) {
  if (emojiPlayerChoice === "rock") {
    emojiPlayer = String.fromCodePoint( 9994 );
  } else if (emojiPlayerChoice === "paper") {
    emojiPlayer = String.fromCodePoint( 9995 );
  } else {
    emojiPlayer = String.fromCodePoint( 9996 );
  }
}

function getCpuEmoji(cpuChoiceTemp) {
  if (cpuChoiceTemp === "rock") {
    emojiCpu = String.fromCodePoint( 9994 );
  } else if (cpuChoiceTemp === "paper") {
    emojiCpu = String.fromCodePoint( 9995 );
  } else {
    emojiCpu = String.fromCodePoint( 9996 );
  }
}

btn.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.id);
    getPlayerEmoji(button.id);
    getCpuEmoji(cpuChoice);
    emojiPlayerDoc.textContent = emojiPlayer;
    emojiCpuDoc.textContent = emojiCpu;
    // btn.forEach((button) => {
    //   button.classList.remove("active");
    // });
    // button.classList.add("active");
  });
});
//  Function to play a best of 5 against the CPU
//    -Loops the playRound() function until either the player or the CPU have won 3 games
//    -Does not take into account draws, you could potentially draw infinitely and the game would never end
//    -Not 100% sure why && works in the for loop, I was expecting || but it loops forever that way
//    -Investigate for loop alternative to &&
// function playBestOfFive() {
//   let scoreContent = document.querySelector("#play__score");
//   countWin = 0;
//   countLose = 0;
//   countDraw = 0;
//   for (; countWin < 3 && countLose < 3; ) {
//     playRound();
//     if (countWin >= 3) {
//       scoreContent.textContent = `You won! Final score: ${countWin} to ${countLose}.`;
//     } else if (countLose >= 3) {
//       scoreContent.textContent = `You lost! Final score: ${countWin} to ${countLose}.`;
//     }
//   }
// }
