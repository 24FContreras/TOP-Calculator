console.log("🦆 Linkin' Duck");

//GLOBALS
let total;
let activeOperator;
let activeDigit = "";
let digitsArray = [];

//MATH FUNCTIONS
const add = (array) => array.reduce((num1, num2) => num1 + num2);
const subtract = (array) => array.reduce((num1, num2) => num1 - num2);
const multiply = (array) => array.reduce((num1, num2) => num1 * num2);
const divide = (array) => array.reduce((num1, num2) => num1 / num2);

//OPERATE
const operate = (array) => {
  if (activeOperator === "add") total = add(array);
  else if (activeOperator === "subtract") total = subtract(array);
  else if (activeOperator === "multiply") total = multiply(array);
  else if (activeOperator === "divide") {
    if (array[1] === 0) {
      total = NaN;
      totalDisplay.textContent = "ERROR";
      return;
    }
    total = divide(array);
  }

  totalDisplay.textContent = total;
  return total;
};

//PAD BUTTONS
const padNumbers = document.querySelectorAll(".number");
const padOperators = document.querySelectorAll(".operator");
const resultBtn = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const resetBtn = document.querySelector(".reset");
const dotBtn = document.querySelector(".dot");
const deleteDigitBtn = document.querySelector(".delete-digit");

//DISPLAYS
const upperDisplay = document.querySelector("#operationDisplay");
const totalDisplay = document.querySelector("#totalDisplay");

padNumbers.forEach((button) => {
  button.addEventListener("click", function (e) {
    activeDigit += e.target.value;
    totalDisplay.textContent = activeDigit;
  });
});

padOperators.forEach((button) => {
  button.addEventListener("click", function (e) {
    if (activeDigit === "") {
      activeOperator = e.target.value;
      console.log(activeOperator);
      console.log("no hay segundo número!");
      return;
    }

    if (digitsArray.length < 2 && digitsArray.length !== 1) {
      total = 0;
      activeOperator = e.target.value;
      console.log(activeOperator);

      console.log("we have at least one number inside");
      digitsArray.push(Number(activeDigit));
      activeDigit = "";
    } else if (total !== undefined) {
      digitsArray.push(Number(activeDigit));
      activeDigit = "";

      operate(digitsArray);

      digitsArray[0] = total;
      digitsArray.pop();
      activeOperator = e.target.value;
    }
  });
});

resultBtn.addEventListener("click", function () {
  digitsArray.push(Number(activeDigit));
  activeDigit = "";

  operate(digitsArray);

  digitsArray[0] = total;
  digitsArray.pop();
});

deleteBtn.addEventListener("click", function () {
  if (totalDisplay.textContent !== activeDigit) {
    console.log("este es el total. el total no se toca");
    return;
  } else {
    activeDigit = activeDigit.slice(0, -1);
    totalDisplay.textContent = activeDigit;
  }
});

resetBtn.addEventListener("click", function () {
  activeDigit = "";
  digitsArray = [];
  total = "";
  activeOperator = "";
  operationDisplay.textContent = "";
  totalDisplay.textContent = "";
});

dotBtn.addEventListener("click", function () {
  if (!activeDigit.includes(".")) {
    activeDigit += ".";
    totalDisplay.textContent = activeDigit;
  } else return;
});

dotBtn.addEventListener("click", function () {
  if (!activeDigit.includes(".")) {
    activeDigit += ".";
    totalDisplay.textContent = activeDigit;
  } else return;
});

deleteDigitBtn.addEventListener("click", function () {
  activeDigit = "";
  totalDisplay.textContent = activeDigit;
});

document.querySelector(".negate").addEventListener("click", function () {
  if (activeDigit.includes("-")) {
    activeDigit = activeDigit.replace("-", "");
    totalDisplay.textContent = activeDigit;
  } else {
    activeDigit = "-" + activeDigit;
    totalDisplay.textContent = activeDigit;
  }
});
