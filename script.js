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
let stringResult = " ";
let dotOK = true;
let opOK = false;

console.log("hello");

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
        return "error : div by 0";
    } else {
        return aNumber / bNumber;
    }
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

const calculate = function(){
    if (stringOperation !== "") {
        let array = stringOperation.split(" ");
        while (array.indexOf("×") >= 0) {
            let index = array.indexOf("×");
            array[index - 1] = operate("*", array[index - 1], array[index + 1]);
            array.splice(index, 2);
        }
        while (array.indexOf("÷") >= 0) {
            let index = array.indexOf("÷");
            array[index - 1] = operate("/", array[index - 1], array[index + 1]);
            array.splice(index, 2);
            if (array.indexOf("error : div by 0") >= 0) {
                array[0] = "error : div by 0";
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
        if (array[0] !== "error : div by 0"){
            array[0] = Math.floor(array[0]*1000000000)/1000000000;
            stringResult = array[0].toString();
            result.textContent = " = " + stringResult;
        }
        else {
        stringResult = array[0].toString();
        result.textContent = stringResult;
        }
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
        if (stringOperation.length < 15){
            if (stringResult !== "") {
                stringOperation = "";
                stringResult = "";
            }
            stringOperation += button.textContent;
            operation.textContent = stringOperation;
            opOK=true;
        }
        else {
            stringResult = "Expression too long";
            result.textContent = stringResult;
        }
    })
})

operators.forEach((button) => {
    button.addEventListener("click", () => {
        if (stringOperation.length < 12){
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
        }
        else {
            stringResult = "Expression too long";
            result.textContent = stringResult;
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
        if (stringOperation.length < 12){
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
        else {
            stringResult = "Expression too long";
            result.textContent = stringResult;
        }
    }
    else if (character === "/"){
        if (stringOperation.length < 12){
        event.preventDefault();
            if (opOK){
                if (stringResult !== "") {
                    stringOperation = stringResult;
                    stringResult = "";
                }
                stringOperation += " ÷ ";
                operation.textContent = stringOperation;
                dotOK=true;
                opOK=false;
            }
        }
        else {
            stringResult = "Expression too long";
            result.textContent = stringResult;
        }
    }
    else if ((character === "." )&& (dotOK === true)){
        decimal();
    }
    else if (/^[0-9]$/.test(character) ){ //add the number to the operation string
        if (stringOperation.length < 15){
            if (stringResult !== "") {
                stringOperation = "";
                stringResult = "";
            }
            stringOperation += character;
            operation.textContent = stringOperation;
            opOK=true;
        }
        else {
            stringResult = "Expression too long";
            result.textContent = stringResult;
        }

    }
    else if (character === "+" || character === "-"){
        event.preventDefault();
        if (stringOperation.length < 12){
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
        else {
            stringResult = "Expression too long";
            result.textContent = stringResult;
        }
    }
    
})


let addNotePad = document.querySelector("#addNotePad");
let notepadDisplay = document.querySelector("#notepadDisplay");
let clearNotePad = document.querySelector("#clearNotePad");


addNotePad.addEventListener("click", () => {
    let display = document.createElement("div");
    let displayText = document.createElement("p");
    let displayButton = document.createElement("button");
    displayButton.textContent = "delete";
    displayText.textContent = operation.textContent + result.textContent;
    display.appendChild(displayText);
    display.appendChild(displayButton);
    notepadDisplay.appendChild(display);
    displayButton.addEventListener("click", () => {
        notepadDisplay.removeChild(display);
    })
})

clearNotePad.addEventListener("click", () => {
    while (notepadDisplay.firstChild){
        notepadDisplay.removeChild(notepadDisplay.firstChild);
    }
})