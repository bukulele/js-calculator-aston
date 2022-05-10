const calculatorButtons = document.getElementById("calculator-buttons");
calculatorButtons.addEventListener("click", handleButtonClick);

const formulaWindow = document.getElementById("formula-window");
const userInputWindow = document.getElementById("user-input");

const maxFormulaLength = 125;
const maxUserInputLength = 21;

let calcDone = false;

function handleButtonClick(event) {
  let data;
  if (event.target.classList.contains("button-operation")) {
    if (event.target.id === "equal" && calcDone === false) {
      calcResult(formulaWindow.innerText);
    } else if (event.target.id === "division") {
      data = "÷";
    } else if (event.target.id === "multiply") {
      data = "x";
    } else if (event.target.id === "minus") {
      data = "-";
    } else if (event.target.id === "plus") {
      data = "+";
    } else if (event.target.id !== "equal") {
      data = event.target.id;
    }
  } else if (event.target.classList.contains("button-number")) {
    data = event.target.innerText;
  }
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

function manageUserInputWindow(data) {
  if (calcDone === true) {
    if (!isNaN(data)) {
      userInputWindow.innerText = data;
    } else if (data === ".") {
      userInputWindow.innerText = "0.";
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
    if (
      formulaWindow.innerText === "0" ||
      formulaWindow.innerText.length === 0
    ) {
      if (!isNaN(data)) {
        formulaWindow.innerText = data;
      } else if (isNaN(data) && data !== ".") {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (
        data === "." &&
        !Array.from(userInputWindow.innerText).includes(data)
      ) {
        formulaWindow.insertAdjacentText("beforeend", data);
      }
    } else if (
      (formulaWindow.innerText.length === 1 &&
        formulaWindow.innerText !== "0") ||
      (formulaWindow.innerText.length > 1 && !isNaN(lastElement))
    ) {
      if (!isNaN(data)) {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (isNaN(data) && data !== ".") {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (data === ".") {
        if (!Array.from(userInputWindow.innerText).includes("."))
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
      } else if (data === ".") {
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

function calcResult(expression) {
  const exp = convertExpression(expression);
  let calc = new Function("return " + exp);
  let result = (calc().toFixed(9) * 100) / 100;
  let i = formulaWindow.innerText.length - 1;
  while (isNaN(formulaWindow.innerText[i])) {
    i--;
  }
  let newFormula = formulaWindow.innerText.slice(0, i + 1);
  formulaWindow.innerText = newFormula + "=";
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
  return correctSignsArr.join("");
}
