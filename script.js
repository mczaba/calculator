const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const parenthese = document.querySelectorAll(".parenthese");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equal");
const display = document.querySelector("#display");
const operation = document.querySelector("#operation");
const result = document.querySelector("#result");
const dot = document.querySelector("#dot");
const backspace = document.querySelector("#return");

let stringOperation = "";
let stringResult = " ";
let opOK = false;

const add = function (a, b) {
  //add 2 numbers taken as strings
  let aNumber = +a;
  let bNumber = +b;
  return aNumber + bNumber;
};

const sub = function (a, b) {
  //substract 2 numbers taken as strings
  let aNumber = +a;
  let bNumber = +b;
  return aNumber - bNumber;
};

const mult = function (a, b) {
  //multiply 2 numbers taken as strings
  let aNumber = +a;
  let bNumber = +b;
  return aNumber * bNumber;
};

const div = function (a, b) {
  //divide 2 numbers taken as strings
  let aNumber = +a;
  let bNumber = +b;
  if (bNumber === 0) {
    return "error : div by 0";
  } else {
    return aNumber / bNumber;
  }
};

const operate = function (operator, a, b) {
  //call the appropriate operation function for the 2 numbers and the operator
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return sub(a, b);
  } else if (operator === "*") {
    return mult(a, b);
  } else if (operator === "/") {
    return div(a, b);
  } else {
    return "error";
  }
};

const calculate = function () {
  //takes the stringOperation, do the calculations and display the result
  if (stringOperation !== "") {
    stringOperation = stringOperation.replaceAll("(", "( ");
    stringOperation = stringOperation.replaceAll(")", " )");
    stringOperation = stringOperation.trim();
    let array = stringOperation.split(" "); //split stringOperation in an array of number operator number operator etc
    const openCount = array.reduce((n, x) => n + (x === "("), 0);
    const closedCount = array.reduce((n, x) => n + (x === ")"), 0);
    if (openCount !== closedCount) {
      stringResult = "Syntax error";
      result.textContent = stringResult;
      return;
    }
    function calcArray(array) {
      while (array.indexOf("(") >= 0) {
        const initialIndex = array.indexOf("(");
        const newArray = [...array];
        newArray.splice(0, initialIndex);
        let openCount = 1;
        let closeCount = 0;
        let index = 1;
        while (openCount > closeCount) {
          if (newArray[index] === "(") {
            openCount++;
          } else if (newArray[index] === ")") {
            closeCount++;
          }
          index++;
        }
        newArray.length = index - 1;
        newArray.shift();
        const newLength = newArray.length;
        const newArrayValue = calcArray(newArray);
        array.splice(initialIndex, newLength + 2, newArrayValue);
      }
      if (array.includes("error : div by 0")) {
        return "error : div by 0";
      }
      while (array.indexOf("×") >= 0) {
        //search and do all multiplications
        let index = array.indexOf("×");
        array[index - 1] = operate("*", array[index - 1], array[index + 1]);
        array.splice(index, 2);
      }
      while (array.indexOf("÷") >= 0) {
        //search and do all divisions
        let index = array.indexOf("÷");
        array[index - 1] = operate("/", array[index - 1], array[index + 1]);
        array.splice(index, 2);
        if (array.indexOf("error : div by 0") >= 0) {
          //if some division by 0 was made, array becomes just an error
          array[0] = "error : div by 0";
          array.splice(1, array.length - 1);
        }
      }
      while (array.indexOf("+") >= 0) {
        //search and do all additions
        let index = array.indexOf("+");
        array[index - 1] = operate("+", array[index - 1], array[index + 1]);
        array.splice(index, 2);
      }
      while (array.indexOf("-") >= 0) {
        //search and do all substraction
        let index = array.indexOf("-");
        array[index - 1] = operate("-", array[index - 1], array[index + 1]);
        array.splice(index, 2);
      }
      return array[0].toString();
    }
    let operationResult = calcArray(array);
    if (operationResult !== "error : div by 0") {
      //if no division by 0 was made, display the result
      operationResult = Math.floor(+operationResult * 1000000000) / 1000000000; //round in case of decimal too big
      stringResult = operationResult.toString();
      result.textContent = " = " + stringResult;
    } else {
      //if some division by 0 was made display the error
      stringResult = array[0].toString();
      result.textContent = stringResult;
    }
  }
};

const back = function () {
  //removes last character typed
  let string = Array.from(stringOperation);
  if (string[string.length - 1] === " ") {
    string.splice(string.length - 3, 3);
    opOK = true;
  } else {
    string.pop();
  }
  stringOperation = string.join("");
  operation.textContent = stringOperation;
  stringResult = "";
  result.textContent = stringResult;
};

const decimal = function () {
  //check if adding a dot is possible and adds it
  let dotIndex = stringOperation.lastIndexOf(".");
  let spaceIndex = stringOperation.lastIndexOf(" ");
  if (spaceIndex <= dotIndex) {
    if (stringResult !== "") {
      stringOperation = "";
      stringResult = "";
    }
    stringOperation += ".";
    operation.textContent = stringOperation;
  }
};
const clearCalc = function () {
  //reset the calculator
  stringOperation = "";
  stringResult = "";
  operation.textContent = stringOperation;
  result.textContent = stringResult;
};

const addNumber = function (number) {
  //add a number to the operation string
  if (stringOperation.length < 28) {
    if (stringResult !== "") {
      stringOperation = "";
      stringResult = "";
      result.textContent = stringResult;
    }
    stringOperation += number;
    operation.textContent = stringOperation;
    opOK = true;
  } else {
    stringResult = "Expression too long";
    result.textContent = stringResult;
  }
};

const addParenthesis = function (parenthesis) {
  if (parenthesis === "(") {
    if (stringOperation.length < 22) {
      if (stringResult !== "") {
        stringOperation = "";
        stringResult = "";
        result.textContent = stringResult;
      }
      stringOperation += "(";
      operation.textContent = stringOperation;
      opOK = true;
    } else {
      stringResult = "Expression too long";
      result.textContent = stringResult;
    }
  }
  if (parenthesis === ")") {
    const openCount = (stringOperation.match(/\(/g) || []).length;
    const closeCount = (stringOperation.match(/\)/g) || []).length;
    if (openCount - closeCount > 0) {
      stringOperation += ")";
      operation.textContent = stringOperation;
      opOK = true;
    } else {
      stringResult = "Syntax error";
      result.textContent = stringResult;
      opOK = false;
    }
  }
};

const addOperator = function (operator) {
  //add an operator to the operation string
  if (stringOperation.length < 25) {
    if (opOK) {
      if (stringResult !== "") {
        stringOperation = stringResult;
        stringResult = "";
        result.textContent = stringResult;
      }
      stringOperation += " " + operator + " ";
      operation.textContent = stringOperation;
      opOK = false;
    }
  } else {
    stringResult = "Expression too long";
    result.textContent = stringResult;
  }
};

const press = function (button) {
  //makes a button look like it was pressed
  button.style.transform = "scale(0.85)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, 200);
};

numbers.forEach(button => {
  button.addEventListener("click", function () {
    addNumber(button.textContent);
  });
});

operators.forEach(button => {
  button.addEventListener("click", () => {
    addOperator(button.textContent);
  });
});

parenthese.forEach(button => {
  button.addEventListener("click", () => {
    addParenthesis(button.textContent);
  });
});

dot.addEventListener("click", decimal);

clear.addEventListener("click", clearCalc);

backspace.addEventListener("click", back);

equal.addEventListener("click", calculate);

document.addEventListener("keydown", function (event) {
  let character = event.key;
  if (character === "*") {
    character = "×";
  }
  if (character === "/") {
    character = "÷";
    event.preventDefault();
  }
  if (character === "Enter") {
    event.preventDefault();
    calculate();
    press(equal);
  } else if (character === "Escape") {
    clearCalc();
    press(clear);
  } else if (character === "Backspace") {
    event.preventDefault();
    back();
    press(backspace);
  } else if (character === ".") {
    decimal();
    press(dot);
  } else if (/^[0-9]$/.test(character)) {
    numbers.forEach(button => {
      if (character === button.textContent) {
        press(button);
      }
    });
    addNumber(character);
  } else if (
    character === "+" ||
    character === "-" ||
    character === "÷" ||
    character === "×"
  ) {
    operators.forEach(button => {
      if (character === button.textContent) {
        press(button);
      }
    });
    addOperator(character);
  } else if (character === "(" || character === ")") {
    parenthese.forEach(button => {
      if (character === button.textContent) {
        press(button);
      }
    });
    addParenthesis(character);
  }
});

let addNotePad = document.querySelector("#addNotePad");
let notepadDisplay = document.querySelector("#notepadDisplay");
let clearNotePad = document.querySelector("#clearNotePad");
let lines = 0;

addNotePad.addEventListener("click", () => {
  //save the calculator line into the notepad
  if (stringResult !== "") {
    //doesn't do anything if there is no result calculated
    if (lines >= 10) {
      //if notepad is full, remove the last line to make space for the new one
      notepadDisplay.removeChild(notepadDisplay.lastChild);
      lines--;
    }
    let display = document.createElement("div");
    let displayText = document.createElement("p");
    let displayButton = document.createElement("button");
    displayText.textContent = operation.textContent + result.textContent;
    display.appendChild(displayText);
    display.appendChild(displayButton);
    notepadDisplay.insertBefore(display, notepadDisplay.children[0]);
    displayButton.addEventListener("click", () => {
      notepadDisplay.removeChild(display);
      lines--;
    });
    lines++;
  }
});

clearNotePad.addEventListener("click", () => {
  while (notepadDisplay.firstChild) {
    notepadDisplay.removeChild(notepadDisplay.firstChild);
  }
  lines = 0;
});
