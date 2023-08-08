let scoreContent = document.querySelector("#play__score"),
  btn = document.querySelectorAll(".play-button"),
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

function getCpuChoice() {
  let cpuChoiceTemp,
    randNo = Math.random();
  if (randNo < 0.333) {
    cpuChoiceTemp = "Rock";
  } else if (randNo >= 0.333 && randNo < 0.666) {
    cpuChoiceTemp = "Paper";
  } else {
    cpuChoiceTemp = "Scissors";
  }
  return cpuChoiceTemp;
}

// Plays a round, converts to string and evals together

function playRound(playerChoice) {
  let cpuChoiceTemp = getCpuChoice(),
    evalChoices,
    result = document.querySelector("#round__result");
  evalChoices = playerChoice.toLowerCase() + cpuChoiceTemp.toLowerCase();
  cpuChoice = cpuChoiceTemp;
  switch (evalChoices) {
    case "rockrock":              //
    case "paperpaper":            // Draw scenarios
    case "scissorsscissors":      //
      ++countDraw;
      result.textContent = `Draw! You both chose ${playerChoice.toLowerCase()}.`;
      break;
    case "rockscissors":          //
    case "paperrock":             // Win scenarios
    case "scissorspaper":         //
      ++countWin;
      result.textContent = `You win! ${playerChoice} beats ${cpuChoiceTemp.toLowerCase()}.`;
      break;
    case "rockpaper":             //
    case "paperscissors":         // Lose scenarios
    case "scissorsrock":          //
      ++countLose;
      result.textContent = `You lose! ${cpuChoiceTemp} beats ${playerChoice.toLowerCase()}.`;
      break;
    default:          // Not used, just in case something hecks up
      alert(`${playerChoice} is not a valid argument, please try again.`);
      break;
  }
}

// Displays large emoji for the player and the cpu in separate functions

function getPlayerEmoji(emojiPlayerChoice) {
  if (emojiPlayerChoice === "Rock") {
    emojiPlayer = String.fromCodePoint(9994);
  } else if (emojiPlayerChoice === "Paper") {
    emojiPlayer = String.fromCodePoint(9995);
  } else {
    emojiPlayer = String.fromCodePoint(9996);
  }
}

function getCpuEmoji(cpuChoiceTemp) {
  if (cpuChoiceTemp === "Rock") {
    emojiCpu = String.fromCodePoint(9994);
  } else if (cpuChoiceTemp === "Paper") {
    emojiCpu = String.fromCodePoint(9995);
  } else {
    emojiCpu = String.fromCodePoint(9996);
  }
}

// Adds onclick listener to buttons, runs through round code taking in the html button id as a parameter

btn.forEach((button) => {
  button.addEventListener("click", () => {
    let roundTextPlayer = document.querySelector(".round-text__player"),
      roundTextCpu = document.querySelector(".round-text__cpu");
    playRound(button.id);
    getPlayerEmoji(button.id);
    getCpuEmoji(cpuChoice);
    emojiPlayerDoc.textContent = emojiPlayer;
    emojiCpuDoc.textContent = emojiCpu;
    roundTextPlayer.textContent = button.id;
    roundTextCpu.textContent = cpuChoice;
    scoreContent.textContent = `Score: ${countWin} to ${countLose}.`;
    evalWins();
  });
});

// Makes the round end when someone reaches 5 wins and resets

function evalWins() {
  if (countWin >= 5) {
    text.textContent = `Conglaturation!!! You won ${countWin} to ${countLose}!`;
    emoji.textContent = String.fromCodePoint( 128077 );
    emojiCpuDoc.textContent = String.fromCodePoint( 10067 );
    emojiPlayerDoc.textContent = String.fromCodePoint( 10067 );
    scoreContent.textContent = 'Score:';
    divBG.classList.toggle('show');
    document.querySelector(".round-text__cpu").textContent = "";
    document.querySelector(".round-text__player").textContent = "";
    document.querySelector("#round__result").textContent = "";
    countWin = 0;
    countLose = 0;
    countDraw = 0;
  } else if (countLose >= 5) {
    text.textContent = `Heck! You lost ${countWin} to ${countLose}!`;
    emoji.textContent = String.fromCodePoint( 128078 );
    emojiCpuDoc.textContent = String.fromCodePoint( 10067 );
    emojiPlayerDoc.textContent = String.fromCodePoint( 10067 );
    scoreContent.textContent = 'Score:';
    divBG.classList.toggle('show');
    document.querySelector(".round-text__cpu").textContent = "";
    document.querySelector(".round-text__player").textContent = "";
    document.querySelector("#round__result").textContent = "";
    countWin = 0;
    countLose = 0;
    countDraw = 0;
  }
}

  const divPlay = document.querySelector('.play')
    divBG = document.createElement('div'),
    divBox = document.createElement('div'),
    divText = document.createElement('div'),
    emoji = document.createElement('p'), 
    text = document.createElement('p'),
    input = document.createElement('button');
  
  emoji.classList.toggle('round-emoji');
  text.setAttribute('class', 'vs');
  input.setAttribute('type', 'button');
  input.setAttribute('class', 'play-button play-button-reverse');
  input.textContent = "Wow!";
  divText.setAttribute('class', 'popupContent');
  divBG.setAttribute('class', 'popupBG');
  divBox.setAttribute('class', 'popupBox');
  input.addEventListener('click', () => {
    divBG.classList.toggle('show');
  });
  
  divText.appendChild(emoji);
  divText.appendChild(text);
  divText.appendChild(input);
  divBox.appendChild(divText);
  divBG.appendChild(divBox);
  divPlay.appendChild(divBG);
