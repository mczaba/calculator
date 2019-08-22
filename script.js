let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let clear = document.querySelector("#clear");
let equal = document.querySelector("#equal");
let display = document.querySelector("#display");
let operation = document.querySelector("#operation");
let result = document.querySelector("#result");
let dot = document.querySelector("#dot");
let backspace = document.querySelector("#return");

let stringOperation = "";
let stringResult = "";



numbers.forEach((button) => {
    button.addEventListener("click", (addnumber) => {
        if (stringResult !== "") {
            stringOperation = "";
            stringResult = "";
        }
        stringOperation += button.textContent;
        operation.textContent = stringOperation;
    })
})

operators.forEach((button) => {
    button.addEventListener("click", (addoperator) => {
        if (stringResult !== "") {
            stringOperation = stringResult;
            stringResult = "";
        }
        stringOperation += " " + button.textContent + " ";
        operation.textContent = stringOperation;
        dot.addEventListener("click", decimal);
    })
})

const decimal = function(){
    if (stringResult !== "") {
        stringOperation = "";
        stringResult = "";
    }
    stringOperation += ".";
    operation.textContent = stringOperation;
    dot.removeEventListener("click", decimal);
}
dot.addEventListener("click", decimal);

clear.addEventListener("click", () => {
    stringOperation = "";
    stringResult = "";
    operation.textContent = stringOperation;
    result.textContent = stringResult;

})

backspace.addEventListener("click", () => {
    let string=Array.from(stringOperation);
    if (string[string.length-1]=== " "){
        string.splice((string.length-3),3);
        dot.removeEventListener("click", decimal);

    }
    else{
        string.pop();
    }
    stringOperation = string.join("");
    operation.textContent = stringOperation;
})

equal.addEventListener("click", () => {
    if (stringOperation !== "") {
        let array = stringOperation.split(" ");
        console.log(array);
        while (array.indexOf("×") >= 0) {
            let index = array.indexOf("×");
            array[index - 1] = operate("×", array[index - 1], array[index + 1]);
            array.splice(index, 2);
        }
        while (array.indexOf("/") >= 0) {
            let index = array.indexOf("/");
            array[index - 1] = operate("/", array[index - 1], array[index + 1]);
            array.splice(index, 2);
            if (array.indexOf("can't divide by 0") >= 0) {
                array[0] = "can't divide by 0";
                array.splice(1, array.length - 1);
            }
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
        stringResult = array[0].toString();
        result.textContent = stringOperation + " = " + stringResult;
    }
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
    if (bNumber === 0) {
        return "can't divide by 0";
    } else {
        return aNumber / bNumber;
    }
}

const operate = function(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return sub(a, b);
    } else if (operator === "×") {
        return mult(a, b);
    } else if (operator === "/") {
        return div(a, b);
    } else { return "error"; }
}