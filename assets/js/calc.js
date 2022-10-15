console.log("🦆 Linkin' Duck");

//ARRAY OF WORKING NUMBERS
let digit = "";
let activeDigits = [];
let activeOperator;
let total;
let topDisplay;
let bottomDisplay;

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
  else if (activeOperator === "divide") total = divide(array);

  totalDisplay.textContent = total;
  return total;
};

// DOM ELEMENTS
const padNumbers = document.querySelectorAll(".number");
const padOperators = document.querySelectorAll(".operator");
const resultBtn = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const resetBtn = document.querySelector(".reset");
const operationDisplay = document.querySelector("#operationDisplay");
const totalDisplay = document.querySelector("#totalDisplay");

padNumbers.forEach((button) => {
  button.addEventListener("click", function (e) {
    digit += e.target.value;
    totalDisplay.textContent = digit;
  });
});

padOperators.forEach((button) => {
  button.addEventListener("click", function (e) {
    total = 0;

    if (activeDigits.length < 2 && activeDigits.length !== 1) {
      activeOperator = e.target.value;
      activeDigits.push(Number(digit));
      digit = "";
      return;
    } else if (total !== undefined) {
      activeDigits.push(Number(digit));
      digit = "";

      operate(activeDigits);

      activeDigits[0] = total;
      activeDigits.pop();
      activeOperator = e.target.value;
      return;
    }
  });
});

resultBtn.addEventListener("click", function () {
  activeDigits.push(Number(digit));
  digit = "";

  operate(activeDigits);

  activeDigits[0] = total;
  activeDigits.pop();
});

deleteBtn.addEventListener("click", function () {
  digit = digit.slice(0, -1);
  totalDisplay.textContent = digit;
});

resetBtn.addEventListener("click", function () {
  digit = "";
  activeOperator = "";
  total = "";
  activeDigits = [];
  operationDisplay.textContent = "";
  currentOperation = "";
  totalDisplay.textContent = "";
});
