console.log("🦆 Linkin' Duck");

//GLOBAL VARIABLES
let total = "";
let activeNumber = "";
let currentOperator = "";

const operate = (num1, num2) => {
  if (currentOperator === "add") total = Number(total) + Number(activeNumber);
  if (currentOperator === "subtract")
    total = Number(total) - Number(activeNumber);
  if (currentOperator === "multiply")
    total = Number(total) * Number(activeNumber);
  if (currentOperator === "divide") {
    if (activeNumber === "0") {
      bottomDisplay.textContent = "To Infinity... And beyond!";
      activeNumber = "";
      currentOperator = "";
      return;
    } else total = Number(total) / Number(activeNumber);
  }

  bottomDisplay.textContent = total;
  activeNumber = "";
};

//ELEMENTS
const topDisplay = document.querySelector("#topDisplay");
const bottomDisplay = document.querySelector("#bottomDisplay");

const padNumbers = document.querySelectorAll(".number");
const padOperators = document.querySelectorAll(".operator");

const resultBtn = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const negateBtn = document.querySelector(".negate");
const dotBtn = document.querySelector(".dot");
const resetBtn = document.querySelector(".reset");
const resetNumberBtn = document.querySelector(".ce");

//PAD NUMBERS
padNumbers.forEach((number) => {
  number.addEventListener("click", function (e) {
    activeNumber += e.target.value;

    bottomDisplay.textContent = activeNumber;
  });
});

//PAD OPERATORS
padOperators.forEach((operator) => {
  operator.addEventListener("click", function (e) {
    if (total === "" && activeNumber === "") {
      total = 0;
      currentOperator = e.target.value;
    } else if (total === "") total = activeNumber;

    if (activeNumber === "") {
      currentOperator = e.target.value;
      topDisplay.textContent = `${total} ${e.target.textContent}`;
      return;
    }

    if (total !== "") {
      operate(total, activeNumber);
      currentOperator = e.target.value;
    }

    activeNumber = "";
    topDisplay.textContent = `${total} ${e.target.textContent}`;
  });
});

//SPECIAL BUTTONS
resultBtn.addEventListener("click", function () {
  if (total === "") return;

  topDisplay.textContent = `${topDisplay.textContent} ${activeNumber} =`;

  if (activeNumber !== "") {
    operate(total, activeNumber);
  }
});

dotBtn.addEventListener("click", function () {
  if (activeNumber.includes(".")) {
    return;
  } else {
    activeNumber += ".";
  }

  bottomDisplay.textContent = activeNumber;
});

deleteBtn.addEventListener("click", function () {
  if (activeNumber.length > 0) {
    activeNumber = activeNumber.slice(0, -1);
    bottomDisplay.textContent = activeNumber;
  }
});

negateBtn.addEventListener("click", function () {
  if (activeNumber.includes("-")) activeNumber = activeNumber.replace("-", "");
  else activeNumber = "-" + activeNumber;

  console.log(activeNumber);
  bottomDisplay.textContent = activeNumber;
});

resetBtn.addEventListener("click", function () {
  total = "";
  activeNumber = "";
  currentOperator = "";
  topDisplay.textContent = "";
  bottomDisplay.textContent = "";
});

resetNumberBtn.addEventListener("click", function () {
  activeNumber = "";
  bottomDisplay.textContent = "";
});
