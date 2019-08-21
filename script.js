let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let clear = document.querySelector("#clear");
let equal = document.querySelector("#equal");
let display = document.querySelector("#display");
let operation = document.querySelector("#operation");
let result = document.querySelector("#result");

let stringOperation = "";
let stringResult = "";



numbers.forEach((button) => {
    button.addEventListener("click", () => {
        stringOperation += button.textContent;
        operation.textContent = stringOperation;
    })
})

operators.forEach((button) => {
    button.addEventListener("click", () => {
        stringOperation += " " + button.textContent + " ";
        operation.textContent = stringOperation;
    })
})

clear.addEventListener("click", () => {
    stringOperation = "";
    stringResult = "";
    operation.textContent = stringOperation;
    result.textContent = stringResult;

})

equal.addEventListener("click", () => {
    let array = stringOperation.split(" ");
    console.log(array);
    while (array.indexOf("*") >= 0) {
        let index = array.indexOf("*");
        array[index - 1] = operate("*", array[index - 1], array[index + 1]);
        array.splice(index, 2);
    }
    while (array.indexOf("/") >= 0) {
        let index = array.indexOf("/");
        array[index - 1] = operate("/", array[index - 1], array[index + 1]);
        array.splice(index, 2);
    }
    while (array.indexOf("+") >= 0) {
        let index = array.indexOf("+");
        array[index - 1] = operate("+", array[index - 1], array[index + 1]);
        array.splice(index, 2);
    }
    while (array.indexOf("-") >= 0) {
        let index = array.indexOf("-");
        array[index - 1] = operate("-", array[index - 1], array[index + 1]);
        array.splice(index, 2);
    }
    console.log(array[0]);
    stringResult = "= " + array[0].toString();
    result.textContent = stringResult;
})


const add = function(a, b) {
    let aNumber = +a;
    let bNumber = +b;
    return aNumber + bNumber;
}

const sub = function(a, b) {
    let aNumber = +a;
    let bNumber = +b;
    return aNumber - bNumber;
}

const mult = function(a, b) {
    let aNumber = +a;
    let bNumber = +b;
    return aNumber * bNumber;
}

const div = function(a, b) {
    let aNumber = +a;
    let bNumber = +b;
    return aNumber / bNumber;
}

const operate = function(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return sub(a, b);
    } else if (operator === "*") {
        return mult(a, b);
    } else if (operator === "/") {
        return div(a, b);
    } else { return "error"; }
}