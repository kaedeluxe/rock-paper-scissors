const divPlay = document.querySelector(".play"),
  divBG = document.createElement("div"),
  divBox = document.createElement("div"),
  divText = document.createElement("div"),
  emoji = document.createElement("p"),
  text = document.createElement("p"),
  input = document.createElement("button"),
  scoreContent = document.querySelector("#play__score"),
  btn = document.querySelectorAll(".play-button"),
  emojiPlayerDoc = document.querySelector("#round-emoji__player"),
  playerBG = document.querySelector(".player-bg"),
  cpuBG = document.querySelector(".cpu-bg"),
  emojiCpuDoc = document.querySelector("#round-emoji__cpu"),
  emojis = {
    rock: String.fromCodePoint(0x1f5ff),
    paper: String.fromCodePoint(0x1f4dc),
    scissors: String.fromCodePoint(0x2702),
    spock: String.fromCodePoint(128406),
    lizard: String.fromCodePoint(129422),
    variation: String.fromCodePoint(0xfe0f),
    win: String.fromCodePoint(128077),
    lose: String.fromCodePoint(128078),
  };

let cpuNum,
  cpuString,
  playerNum,
  playerString,
  itemChoices = ["Rock", "Paper", "Scissors", "Spock", "Lizard"],
  WLD = [0, 0, 0]; // Wins[0], Losses[1], Draws[2]

// Random number will always be an integer between 1 and maxNum due to Math.floor+1

getRandomNum = (maxNum) => Math.floor(Math.random() * maxNum) + 1;

function findWinner(playerChoice, cpuChoice) {

}

function convertText(selectedChoice) {
  let convertedString;
  if (typeof selectedChoice === "number") {
    switch (selectedChoice) {
      case 1:
        convertedString = "Rock";
        break;
      case 2:
        convertedString = "Paper";
        break;
      case 3:
        convertedString = "Scissors";
        break;
      case 4:
        convertedString = "Spock";
        break;
      case 5:
        convertedString = "Lizard";
        break;
    }
    return convertedString;
  }
}

// Plays a round, converts to string and compares

function playRound(playerChoice) {
  cpuNum = getRandomNum(5);
  playerNum = Number(playerChoice);
  // findWinner(playerNum, cpuNum);

  playerString = itemChoices[playerNum-1];
  cpuString = itemChoices[cpuNum-1];
  document.querySelector(
    "#round__result"
  ).textContent = `${playerString} | ${cpuString}`;
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
    // while (WLD[0] <= 5 && WLD[1] <= 5) {
    playRound(button.id);
    emojiPlayerDoc.textContent = getEmoji(playerString);
    emojiCpuDoc.textContent = getEmoji(cpuString);
    document.querySelector(".round-text__player").textContent = playerString;
    document.querySelector(".round-text__cpu").textContent = cpuString;
    // scoreContent.textContent = `Score: ${WLD[0]} to ${WLD[1]}.`;
    // }// evalWins();
  });
});

// Makes the round end when someone reaches 5 wins and resets

function evalWins() {
  if (WLD[0] >= 5) {
    text.textContent = `Conglaturation!!! You won ${WLD[0]} to ${WLD[1]}!`;
    emoji.textContent = emojis.win;
    resetScreen();
  } else if (WLD[1] >= 5) {
    text.textContent = `Heck! You lost ${WLD[0]} to ${WLD[1]}!`;
    emoji.textContent = emojis.lose;
    resetScreen();
  }
}

function resetScreen() {
  emojiCpuDoc.textContent = String.fromCodePoint(10067);
  emojiPlayerDoc.textContent = String.fromCodePoint(10067);
  scoreContent.textContent = "Score:";
  divBG.classList.toggle("show");
  document.querySelector(".round-text__cpu").textContent = "";
  document.querySelector(".round-text__player").textContent = "";
  document.querySelector("#round__result").textContent = "";
  playerBG.classList.remove("lose", "win");
  cpuBG.classList.remove("lose", "win");
  WLD = [0, 0, 0];
}

emoji.classList.toggle("round-emoji");
text.setAttribute("class", "vs");
input.setAttribute("type", "button");
input.setAttribute("class", "play-button play-button-reverse");
input.textContent = "Wow!";
divText.setAttribute("class", "popupContent");
divBG.setAttribute("class", "popupBG");
divBox.setAttribute("class", "popupBox");
input.addEventListener("click", () => {
  divBG.classList.toggle("show");
});

divText.appendChild(emoji);
divText.appendChild(text);
divText.appendChild(input);
divBox.appendChild(divText);
divBG.appendChild(divBox);
divPlay.appendChild(divBG);
