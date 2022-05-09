const calculatorButtons = document.getElementById("calculator-buttons");
calculatorButtons.addEventListener("click", handleButtonClick);

const formulaWindow = document.getElementById("formula-window");
const userInputWindow = document.getElementById("user-input");

let calcDone = false;

function handleButtonClick(event) {
  let data;
  if (event.target.classList.contains("button-operation")) {
    data = event.target.id;
  } else if (event.target.classList.contains("button-number")) {
    data = event.target.innerHTML;
  }
  manageUserInputWindow(data);
  manageFormulaWindow(data);
}

function manageUserInputWindow(data) {
  if (isNaN(data) && data !== ".") {
    userInputWindow.innerHTML = data;
  } else {
    userInputWindow.insertAdjacentText("beforeend", data);
  }
}

function manageFormulaWindow(data) {
  let lastElement = formulaWindow.innerText[formulaWindow.innerText.length - 1];
  let secondLastElement =
    formulaWindow.innerText[formulaWindow.innerText.length - 2];

  if (data === "clear") {
    formulaWindow.innerHTML = "";
    userInputWindow.innerHTML = "0";
    calcDone = false;
  } else if (data === "equal") {
    calcResult(upperDisplayInput);
  } else if (calcDone === true) {
    if (isNaN(data) && data !== ".") {
      formulaWindow.insertAdjacentText("beforeend", data);
      calcDone = false;
    } else if (!isNaN(data)) {
      formulaWindow.innerHTML = data;
      calcDone = false;
    } else if (data === ".") {
      formulaWindow.innerHTML = "0.";
      calcDone = false;
    }
  } else {
    if (formulaWindow.innerHTML === "0") {
      if (!isNaN(data)) {
        formulaWindow.innerHTML = data;
      } else if (isNaN(data) && data !== ".") {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (
        data === "." &&
        !Array.from(userInputWindow.innerHTML).includes(data)
      ) {
        formulaWindow.insertAdjacentText("beforeend", data);
      }
    } else if (
      (formulaWindow.innerHTML.length === 1 &&
        formulaWindow.innerHTML !== "0") ||
      (formulaWindow.innerHTML.length > 1 && !isNaN(lastElement))
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
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (data === ".") {
        formulaWindow.insertAdjacentText("beforeend", "0.");
      } else if (data === "-") {
        formulaWindow.insertAdjacentText("beforeend", data);
      }
    } else if (lastElement === "-") {
      if (!isNaN(data)) {
        formulaWindow.insertAdjacentText("beforeend", data);
      } else if (isNaN(data) && data !== "." && data !== "-") {
        let newFormula = formulaWindow.innerText.slice(
          0,
          formulaWindow.innerText.length - 2
        );
        formulaWindow.insertAdjacentText("beforeend", newFormula + data);
      } else if (data === ".") {
        formulaWindow.insertAdjacentText("beforeend", "0.");
      } else if (data === "-") {
        if (secondLastElement !== "-") {
          let newFormula = formulaWindow.innerText.slice(
            0,
            formulaWindow.innerText.length - 2
          );
          formulaWindow.insertAdjacentText("beforeend", "+");
        }
      }
    }
  }
}
