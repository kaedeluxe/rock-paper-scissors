const divPlay = document.querySelector('.play'),
  divBG = document.createElement('div'),
  divBox = document.createElement('div'),
  divText = document.createElement('div'),
  emoji = document.createElement('p'), 
  text = document.createElement('p'),
  input = document.createElement('button'),
  scoreContent = document.querySelector("#play__score"),
  btn = document.querySelectorAll(".play-button"),
  emojiPlayerDoc = document.querySelector("#round-emoji__player"),
  playerBG = document.querySelector('.player-bg'),
  cpuBG = document.querySelector('.cpu-bg'),
  emojiCpuDoc = document.querySelector("#round-emoji__cpu"),
  emojis = {
    rock: String.fromCodePoint(0x1F5FF),
    paper: String.fromCodePoint(0x1F4DC),
    scissors: String.fromCodePoint(0x2702),
    spock: String.fromCodePoint(128406),
    lizard: String.fromCodePoint(129422),
    variation: String.fromCodePoint(0xFE0F)
    }
  RPSPL = [1, 2, 3, 4, 5];  // Initialise in rock paper scissors spock lizard order

let 
  
  cpuChoice,
  WLD = [0, 0, 0];

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

// Plays a round, converts to string and compares 

function playRound(playerChoice) {
  let cpuChoiceTemp = getCpuChoice(),
    compareChoiceTemp,
    result = document.querySelector("#round__result");
  compareChoiceTemp = playerChoice.toLowerCase() + cpuChoiceTemp.toLowerCase();
  cpuChoice = cpuChoiceTemp;
  switch (compareChoiceTemp) {
    case "rockrock":              //
    case "paperpaper":            // Draw scenarios
    case "scissorsscissors":      //
      ++WLD[2];
      result.textContent = `Draw! You both chose ${playerChoice.toLowerCase()}.`;
      playerBG.classList.remove('lose', 'win');
      cpuBG.classList.remove('lose', 'win');
      break;
    case "rockscissors":          //
    case "paperrock":             // Win scenarios
    case "scissorspaper":         //
      ++WLD[0];
      result.textContent = `You win! ${playerChoice} beats ${cpuChoiceTemp.toLowerCase()}.`;
      playerBG.classList.add('win');
      playerBG.classList.remove('lose');
      cpuBG.classList.add('lose');
      cpuBG.classList.remove('win');
      break;
    case "rockpaper":             //
    case "paperscissors":         // Lose scenarios
    case "scissorsrock":          //
      ++WLD[1];
      result.textContent = `You lose! ${cpuChoiceTemp} beats ${playerChoice.toLowerCase()}.`;
      playerBG.classList.add('lose');
      playerBG.classList.remove('win');
      cpuBG.classList.add('win');
      cpuBG.classList.remove('lose');
      break;
    default:          // Not used, just in case something hecks up
      alert(`${playerChoice} is not a valid argument, please try again.`);
      break;
  }
}

// Determines the correct emoji to display

function getEmoji(emojiFromVar) {
  switch (emojiFromVar) {
    case "Rock":
      emojiTemp = emojis.rock; 
      break;
    case "Paper":
      emojiTemp = emojis.paper;
      break;
    case "Scissors":
      emojiTemp = emojis.scissors + emojis.variation;
      break;
    case "Lizard":
      emojiTemp = emojis.lizard;
      break;
    case "Spock":
      emojiTemp = emojis.spock;
      break;
  }
  return emojiTemp;
}

// Adds onclick listener to buttons, runs through round code taking in the html button id as a parameter

btn.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.id);
    emojiPlayerDoc.textContent = getEmoji(button.id);
    emojiCpuDoc.textContent = getEmoji(cpuChoice);
    document.querySelector(".round-text__player").textContent = button.id;
    document.querySelector(".round-text__cpu").textContent = cpuChoice;
    scoreContent.textContent = `Score: ${WLD[0]} to ${WLD[1]}.`;
    // evalWins();
  });
});

// Makes the round end when someone reaches 5 wins and resets

function evalWins() {
  if (WLD[0] >= 5) {
    text.textContent = `Conglaturation!!! You won ${WLD[0]} to ${WLD[1]}!`;
    emoji.textContent = String.fromCodePoint( 128077 );
    resetScreen();
  } else if (WLD[1] >= 5) {
    text.textContent = `Heck! You lost ${WLD[0]} to ${WLD[1]}!`;
    emoji.textContent = String.fromCodePoint( 128078 );
    resetScreen();
  }
}

function resetScreen() {
  emojiCpuDoc.textContent = String.fromCodePoint( 10067 );
  emojiPlayerDoc.textContent = String.fromCodePoint( 10067 );
  scoreContent.textContent = 'Score:';
  divBG.classList.toggle('show');
  document.querySelector(".round-text__cpu").textContent = "";
  document.querySelector(".round-text__player").textContent = "";
  document.querySelector("#round__result").textContent = "";
  playerBG.classList.remove('lose', 'win');
  cpuBG.classList.remove('lose', 'win');
  WLD = [0,0,0];
}

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