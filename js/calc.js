window.addEventListener("keydown", keyboardListener);

const calculatorButtons = document.getElementById("calculator-buttons");
calculatorButtons.addEventListener("click", handleButtonClick);

const formulaWindow = document.getElementById("formula-window");
const userInputWindow = document.getElementById("user-input");

const maxFormulaLength = 125;
const maxUserInputLength = 21;

let calcDone = false;

const calcElements = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "clear",
  "delete",
  "%",
  "÷",
  "x",
  "-",
  "+",
  "equal",
  ".",
];

function executeClick(data) {
  if ((data === "equal" || data === "%") && calcDone === false) {
    calcResult(formulaWindow.innerText, data);
  } else if (data !== "equal" && data !== "%") {
    if (data === "clear" || (calcDone === true && data === "delete")) {
      formulaWindow.innerText = "0";
      userInputWindow.innerText = "0";
      calcDone = false;
    } else if (
      (formulaWindow.innerText.length < maxFormulaLength &&
        userInputWindow.innerText.length < maxUserInputLength &&
        data) ||
      data === "delete"
    ) {
      manageUserInputWindow(data);
      manageFormulaWindow(data);
    }
  }
}

function handleButtonClick(event) {
  let data;
  if (event.target.classList.contains("button-operation")) {
    if (event.target.id === "division") {
      data = "÷";
    } else if (event.target.id === "multiply") {
      data = "x";
    } else if (event.target.id === "minus") {
      data = "-";
    } else if (event.target.id === "plus") {
      data = "+";
    } else if (event.target.id === "percentage") {
      data = "%";
    } else {
      data = event.target.id;
    }
  } else if (event.target.classList.contains("button-number")) {
    data = event.target.innerText;
  }
  executeClick(data);
}

function keyboardListener(event) {
  let code = event.code;
  let shift = event.shiftKey;
  if (code.includes("Digit")) {
    code = code.slice(5);
  } else if (code.includes("Numpad")) {
    code = code.slice(6);
  }
  if (code === "Minus" || code === "Subtract") {
    code = "-";
  } else if (code === "Add" || (code === "Equal" && shift)) {
    code = "+";
  } else if (code === "Multiply" || (code === "8" && shift)) {
    code = "x";
  } else if (code === "5" && shift) {
    code = "%";
  } else if (code === "Decimal" || code === "Period") {
    code = ".";
  } else if (code === "Equal" || code === "Enter") {
    code = "equal";
  } else if (code === "Slash" || code === "Divide") {
    event.preventDefault();
    code = "÷";
  } else if (code === "Escape" || code === "Delete") {
    code = "clear";
  } else if (code === "Backspace") {
    code = "delete";
  }
  if (calcElements.includes(code)) {
    executeClick(code);
  }
}

function manageUserInputWindow(data) {
  if (calcDone === true) {
    if (data === ".") {
      userInputWindow.innerText = "0.";
    } else {
      userInputWindow.innerText = data;
    }
  } else {
    if (isNaN(data) && data !== "." && data !== "delete") {
      userInputWindow.innerText = data;
    } else if (data === "delete" && userInputWindow.innerText.length > 1) {
      let newUserInput = userInputWindow.innerText.slice(
        0,
        userInputWindow.innerText.length - 1
      );
      userInputWindow.innerText = newUserInput;
    } else if (data === "delete" && userInputWindow.innerText.length <= 1) {
      userInputWindow.innerText = "0";
    } else if (isNaN(userInputWindow.innerText) && data !== ".") {
      userInputWindow.innerText = data;
    } else if (isNaN(userInputWindow.innerText) && data === ".") {
      userInputWindow.innerText = "0.";
    } else if (userInputWindow.innerText === "0" && data === ".") {
      userInputWindow.insertAdjacentText("beforeend", data);
    } else if (userInputWindow.innerText !== "0" && data === ".") {
      if (!Array.from(userInputWindow.innerText).includes("."))
        userInputWindow.insertAdjacentText("beforeend", data);
    } else if (userInputWindow.innerText === "0" && data !== ".") {
      userInputWindow.innerText = data;
    } else {
      userInputWindow.insertAdjacentText("beforeend", data);
    }
  }
}

function manageFormulaWindow(data) {
  let lastElement = formulaWindow.innerText
    ? formulaWindow.innerText[formulaWindow.innerText.length - 1]
    : data;
  let secondLastElement =
    formulaWindow.innerText.length > 1
      ? formulaWindow.innerText[formulaWindow.innerText.length - 2]
      : null;
  let idx = formulaWindow.innerText.length - 1;
  while (
    !isNaN(formulaWindow.innerText[idx]) ||
    formulaWindow.innerText[idx] === "."
  ) {
    idx--;
  }
  let lastNumber = formulaWindow.innerText.slice(
    idx + 1,
    formulaWindow.innerText.length
  );
  if (data === "delete" && formulaWindow.innerText.length > 1) {
    let newUserInput = formulaWindow.innerText.slice(
      0,
      formulaWindow.innerText.length - 1
    );
    formulaWindow.innerText = newUserInput;
  } else if (data === "delete" && formulaWindow.innerText.length <= 1) {
    formulaWindow.innerText = "0";
  } else if (calcDone === true) {
    if (isNaN(data) && data !== ".") {
      let i = formulaWindow.innerText.length - 1;
      while (!isNaN(formulaWindow.innerText[i])) {
        i--;
      }
      let newFormula = formulaWindow.innerText.slice(
        i + 1,
        formulaWindow.innerText.length
      );
      formulaWindow.innerText = newFormula + data;
    } else if (!isNaN(data)) {
      formulaWindow.innerText = data;
    } else if (data === ".") {
      formulaWindow.innerText = "0.";
    }
    calcDone = false;
  } else {
    if (formulaWindow.innerText === "0") {
      if (!isNaN(data)) {
        formulaWindow.innerText = data;
      } else if (isNaN(data) && data !== ".") {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (data === ".") {
        formulaWindow.insertAdjacentText("beforeend", data);
      }
    } else if (
      (formulaWindow.innerText.length === 1 &&
        formulaWindow.innerText !== "0") ||
      (formulaWindow.innerText.length > 1 && !isNaN(lastElement))
    ) {
      if (!isNaN(data) && Number(lastNumber) !== 0) {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (
        !isNaN(data) &&
        Number(lastNumber) === 0 &&
        !Array.from(lastNumber).includes(".")
      ) {
        let newFormula = formulaWindow.innerText.slice(0, idx + 1);
        formulaWindow.innerText = newFormula + data;
      } else if (
        !isNaN(data) &&
        Number(lastNumber) === 0 &&
        Array.from(lastNumber).includes(".")
      ) {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (isNaN(data) && data !== ".") {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (data === ".") {
        if (!Array.from(lastNumber).includes("."))
          formulaWindow.insertAdjacentText("beforeend", data);
      }
    } else if (isNaN(lastElement) && lastElement !== "-") {
      if (!isNaN(data)) {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (isNaN(data) && data !== "." && data !== "-") {
        let newFormula = formulaWindow.innerText.slice(
          0,
          formulaWindow.innerText.length - 1
        );
        formulaWindow.innerText = newFormula + data;
      } else if (data === "." && lastElement !== ".") {
        formulaWindow.insertAdjacentText("beforeend", "0.");
      } else if (data === "-") {
        formulaWindow.insertAdjacentText("beforeend", data);
      }
    } else if (lastElement === "-") {
      if (!isNaN(data)) {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (isNaN(data) && data !== "." && data !== "-") {
        let i = formulaWindow.innerText.length - 1;
        while (isNaN(formulaWindow.innerText[i])) {
          i--;
        }
        let newFormula = formulaWindow.innerText.slice(0, i + 1);
        formulaWindow.innerText = newFormula + data;
      } else if (data === ".") {
        formulaWindow.insertAdjacentText("beforeend", "0.");
      } else if (data === "-") {
        if (secondLastElement !== "-") {
          let i = formulaWindow.innerText.length - 1;
          while (isNaN(formulaWindow.innerText[i])) {
            i--;
          }
          let newFormula = formulaWindow.innerText.slice(0, i + 1);
          formulaWindow.innerText = newFormula + "+";
        }
      }
    }
  }
}

function calcResult(expression, operation) {
  const exp = convertExpression(expression);
  let result;
  if (operation === "equal") {
    let calc = new Function("return " + exp.join(""));
    result = (calc().toFixed(9) * 100) / 100;
    let i = formulaWindow.innerText.length - 1;
    while (isNaN(formulaWindow.innerText[i])) {
      i--;
    }
    let newFormula = formulaWindow.innerText.slice(0, i + 1);
    formulaWindow.innerText = newFormula + "=";
  } else if (operation === "%") {
    if (isNaN(exp.join(""))) {
      let slicedExp = exp.slice(0, exp.length - 2);
      let percentValue = exp[exp.length - 1];
      let preCalcFunction = new Function("return " + slicedExp.join(""));
      let preCalcResult = (preCalcFunction().toFixed(9) * 100) / 100;
      if (exp[exp.length - 2] === "-") {
        result = preCalcResult - (preCalcResult * percentValue) / 100;
      } else if (exp[exp.length - 2] === "+") {
        result = preCalcResult + (preCalcResult * percentValue) / 100;
      } else if (exp[exp.length - 2] === "*") {
        result = (preCalcResult * percentValue) / 100;
      } else if (exp[exp.length - 2] === "/") {
        result = (preCalcResult / percentValue) * 100;
      }
    } else {
      result = exp.join("") / 100;
    }
    let i = formulaWindow.innerText.length - 1;
    while (isNaN(formulaWindow.innerText[i])) {
      i--;
    }
    let newFormula = formulaWindow.innerText.slice(0, i + 1);
    formulaWindow.innerText = newFormula + "%=";
  }
  formulaWindow.insertAdjacentText("beforeend", result);
  userInputWindow.innerText = result;
  calcDone = true;
}

function convertExpression(expression) {
  let tempArray = Array.from(expression);
  let correctSignsArr = tempArray.map((elem) => {
    if (elem === "x") {
      return "*";
    } else if (elem === "÷") {
      return "/";
    } else {
      return elem;
    }
  });
  while (isNaN(correctSignsArr[correctSignsArr.length - 1])) {
    correctSignsArr.pop();
  }
  return correctSignsArr;
}
