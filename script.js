/*
  Function to get a random choice from rock/paper/scissors
*/
function getCpuChoice() {
  let CpuChoice,
    randNo = Math.random();
  if (randNo < 0.34) {
    CpuChoice = "Rock";
  } else if (randNo >= 0.34 && randNo < 0.67) {
    CpuChoice = "Paper";
  } else {
    CpuChoice = "Scissors";
  }
  return CpuChoice;
}






/*
  Function for testing purposes
  Without a console.log() we have to use the Window Alert method
*/
function testFunc() {
  alert(getCpuChoice());
}