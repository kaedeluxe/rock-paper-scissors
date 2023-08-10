const btnsAll = document.querySelectorAll('.play-button'),
  query = (queryString) => document.querySelector(queryString),
  emojiCode = (codePoint) => String.fromCodePoint(codePoint),
  createEl = (element) => document.createElement(element),
  divPlay = query('.play'),
  popupBG = createEl('div'),
  popupContainer = createEl('div'),
  popupMain = createEl('div'),
  popupTitle = createEl('p'),
  popupText = createEl('p'),
  popupEmoji = createEl('p'),
  popupBtn = createEl('button'),
  itemChoices = [
    // compareID MUST be in (rock, paper, scissors, spock, lizard) order for the calculation to work
    { compareID: 1, name: 'Rock', emojiRef: emojiCode(0x1f5ff) },
    { compareID: 2, name: 'Paper', emojiRef: emojiCode(0x1f4dc) },
    { compareID: 3, name: 'Scissors', emojiRef: emojiCode(0x2702) },
    { compareID: 4, name: 'Spock', emojiRef: emojiCode(128406) },
    { compareID: 5, name: 'Lizard', emojiRef: emojiCode(129422) },
    { name: 'variation', emojiRef: emojiCode(0xfe0f) },
    { name: 'win', emojiRef: emojiCode(128077) },
    { name: 'lose', emojiRef: emojiCode(128078) },
    { name: 'reset emoji', emojiRef: emojiCode(10067)},
  ],
  quotesWin = [
    'Maybe you should go pro.',
    "Tbh I'm surprised this even functions.",
    'Wanna put our minecraft beds together?',
    'What are the rules again?',
    "Let's be honest, you just clicked random buttons didn't you.",
    'Nat 20!',
    "OwO what's this?",
  ],
  quotesLose = [
    'The rng gods were not with you today my friend.',
    'When you stare into the abyss, sometimes the abyss stares back.',
    "Yeah, I don't know the rules either.",
    'Ah yes the tried and true tactic of "guessing and hoping for the best".',
    "Don't quit your day job.",
    "Let's be honest, you just clicked random buttons didn't you.",
    'Blame the developer.',
  ];

let cpuIndex,
  playerIndex,
  winText,
  lossText,
  result,
  WLD = [0, 0, 0], // Wins[0], Losses[1], Draws[2]
  getRandomNum = (maxNum) => Math.floor(Math.random() * maxNum);

popupEmoji.classList.toggle('round-emoji');
popupText.classList.toggle('flavour');
popupTitle.setAttribute('class', 'vs');
popupBtn.setAttribute('type', 'button');
popupBtn.setAttribute('class', 'play-button play-button-reverse');
popupBtn.textContent = 'Wow!';
popupMain.setAttribute('class', 'popupContent');
popupBG.setAttribute('class', 'popupBG');
popupContainer.setAttribute('class', 'popupBox');
popupBtn.addEventListener('click', () => {
  popupBG.classList.toggle('show');
});
popupMain.appendChild(popupEmoji);
popupMain.appendChild(popupTitle);
popupMain.appendChild(popupText);
popupMain.appendChild(popupBtn);
popupContainer.appendChild(popupMain);
popupBG.appendChild(popupContainer);
divPlay.appendChild(popupBG);

function findWinner(playerInput, cpuInput) {
  let absoluteDiff;
  if (playerInput === cpuInput) {
    ++WLD[2];
  } else {
    absoluteDiff = Math.abs(playerInput - cpuInput) % 2;
    switch (absoluteDiff) {
      case 0: // Even difference: smallest number wins
        if (Math.min(playerInput, cpuInput) === playerInput) {
          ++WLD[0];
        } else {
          ++WLD[1];
        }
        break;
      case 1: // Odd difference: biggest number wins
        if (Math.max(playerInput, cpuInput) === playerInput) {
          ++WLD[0];
        } else {
          ++WLD[1];
        }
        break;
    }
  }
};

function playRound(buttonID) {
  if (WLD[0] < 5 && WLD[1] < 5) {
    cpuIndex = getRandomNum(5);
    playerIndex = Number(buttonID);
    findWinner(
      itemChoices[playerIndex].compareID,
      itemChoices[cpuIndex].compareID
    );
  }
};

function displayResult() {
  query('#round-emoji__player').textContent =
    itemChoices[playerIndex].emojiRef + itemChoices[5].emojiRef;
  query('#round-emoji__cpu').textContent =
    itemChoices[cpuIndex].emojiRef + itemChoices[5].emojiRef;
  query('#round-text__player').textContent = itemChoices[playerIndex].name;
  query('#round-text__cpu').textContent = itemChoices[cpuIndex].name;
  winText = WLD[0] === 1 ? 'win' : 'wins';
  lossText = WLD[1] === 1 ? 'loss' : 'losses';
  query(
    '#play__score'
  ).textContent = `Score: ${WLD[0]} ${winText} | ${WLD[1]} ${lossText}.`;
};

function displayEndGame() {
  let flavourText,
    showEmoji;
  if (WLD[0] >= 5 || WLD[1] >= 5) {
    popupBG.classList.toggle('show');
    if (WLD[0] >= 5) {
      result = `You won ${WLD[0]} to ${WLD[1]}.`;
      flavourText = quotesWin[getRandomNum(quotesWin.length)];
      showEmoji = itemChoices[6].emojiRef;
    } else if (WLD[1] >= 5) {
      result = `You lost ${WLD[0]} to ${WLD[1]}.`;
      flavourText = quotesLose[getRandomNum(quotesLose.length)];
      showEmoji = itemChoices[7].emojiRef;
    };
    popupTitle.textContent = result;
    popupText.textContent = flavourText;
    popupEmoji.textContent = showEmoji;
    resetScreen();
  };
};

btnsAll.forEach((button) => {
  button.addEventListener('click', () => {
    playRound(button.getAttribute('data-identifier'));
    displayResult();
    displayEndGame();
  });
});

function resetScreen() {
  query('#round-emoji__player').textContent = itemChoices[8].emojiRef;
  query('#round-emoji__cpu').textContent = itemChoices[8].emojiRef;
  query('#play__score').textContent = 'Score:';
  query('#round-text__cpu').textContent = '';
  query('#round-text__player').textContent = '';
  WLD = [0, 0, 0];
};

