
/* Function to add 7 to a given value */

function add7(inputNo) {
  return Number(inputNo.value) + 7;
}
function showAdd7() {
let userNo = document.getElementById("add7input");
document.getElementById("add7result").innerHTML = add7(userNo);
}

/* Function to multiply 2 user given values */

function multiply(a, b) {
  return Number(a.value) * Number(b.value);
}
function showMultiply() {
  let inputA = document.getElementById("multiplyFirstNo"),
  inputB = document.getElementById("multiplySecondNo");
  document.getElementById("multiplyResult").innerHTML = multiply(inputA, inputB);
}

/* Function to capitalise only the first letter of a given string */

function capitalise(userString) {
  let firstLetter = userString.value.substr(0,1),
  restString = userString.value.substr(1),
  outString;
  firstLetter = firstLetter.toUpperCase();
  restString = restString.toLowerCase();
  outString = firstLetter.concat(restString);
  return outString;
}
function showCap() {
  let inputString = document.getElementById("inputCap");
  document.getElementById("outputCap").innerHTML = capitalise(inputString);
}

/* Function to get last letter of a string */

function getLast(userString) {
  let strLength = userString.value.length,
  lastLetter = userString.value.substr(strLength - 1);
  return lastLetter;
}
function showLast() {
  let inputString = document.getElementById("inputLast");
  document.getElementById("outputLast").innerHTML = getLast(inputString);
}

/* Function to clear strings */

function clearResult(elementID) {
  document.getElementById(elementID).innerHTML = "N/A";
}