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
let dotOK = true;
let opOK = false;

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

const calculate = function(){
    if (stringOperation !== "") {
        let array = stringOperation.split(" ");
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
}

const back = function(){
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
}

const decimal = function(){
    if (dotOK){
        if (stringResult !== "") {
            stringOperation = "";
            stringResult = "";
        }
        stringOperation += ".";
        operation.textContent = stringOperation;
        dotOK=false;
    }
}
const clearCalc = function(){
    stringOperation = "";
    stringResult = "";
    operation.textContent = stringOperation;
    result.textContent = stringResult;
}
numbers.forEach((button) => {
    button.addEventListener("click", () => {
        if (stringResult !== "") {
            stringOperation = "";
            stringResult = "";
        }
        stringOperation += button.textContent;
        operation.textContent = stringOperation;
        opOK=true;
    })
})

operators.forEach((button) => {
    button.addEventListener("click", () => {
        if (opOK){
            if (stringResult !== "") {
                stringOperation = stringResult;
                stringResult = "";
            }
            stringOperation += " " + button.textContent + " ";
            operation.textContent = stringOperation;
            dotOK=true;
            opOK=false;
        }
    })
})


dot.addEventListener("click", decimal);

clear.addEventListener("click", clearCalc)



backspace.addEventListener("click", back)


equal.addEventListener("click", calculate)




document.addEventListener('keydown', function(event) {
    let character = event.key;
    if (character === "Enter"){ //calculate if the user press enter
        event.preventDefault();
        calculate();
    }
    else if (character === "Escape"){
        clearCalc();
    }
    else if (character === "Backspace"){ //remove last element from the string if user press backspace
        back();
    }
    else if (character === "*"){ //add mult sign if user press *
        if (opOK){
            if (stringResult !== "") {
                stringOperation = stringResult;
                stringResult = "";
            }
            stringOperation += " × ";
            operation.textContent = stringOperation;
            dotOK=true;
            opOK=false;
        }
    }
    else if ((character === "." )&& (dotOK === true)){
        decimal();
    }
    else if (/^[0-9]$/.test(character) ){ //add the number to the operation string
        if (stringResult !== "") {
            stringOperation = "";
            stringResult = "";
        }
        stringOperation += character;
        operation.textContent = stringOperation;
        opOK=true;

    }
    else if (character === "+" || character === "-" || character === "/"){
        event.preventDefault();
        if (opOK){
            if (stringResult !== "") {
                stringOperation = stringResult;
                stringResult = "";
            }
            stringOperation += " " + character +" ";
            operation.textContent = stringOperation;
            dotOK=true;
            opOK=false;
        }
    }
    
})