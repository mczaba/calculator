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
let opOK = false;

console.log("hello");

const add = function(a, b) {  //add 2 numbers taken as strings
    let aNumber = +a;
    let bNumber = +b;
    return aNumber + bNumber;
}

const sub = function(a, b) {   //substract 2 numbers taken as strings
    let aNumber = +a;
    let bNumber = +b;
    return aNumber - bNumber;
}

const mult = function(a, b) {   //multiply 2 numbers taken as strings
    let aNumber = +a;
    let bNumber = +b;
    return aNumber * bNumber;
}

const div = function(a, b) {  //divide 2 numbers taken as strings
    let aNumber = +a;
    let bNumber = +b;
    if (bNumber === 0) {
        return "error : div by 0";
    } else {
        return aNumber / bNumber;
    }
}

const operate = function(operator, a, b) {  //call the appropriate operation function for the 2 numbers and the operator
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

const calculate = function(){ //takes the stringOperation, do the calculations and display the result
    if (stringOperation !== "") {
        let array = stringOperation.split(" "); //split stringOperation in an array of number operator number operator etc
        while (array.indexOf("×") >= 0) { //search and do all multiplications
            let index = array.indexOf("×");
            array[index - 1] = operate("*", array[index - 1], array[index + 1]);
            array.splice(index, 2);
        }
        while (array.indexOf("÷") >= 0) { //search and do all divisions
            let index = array.indexOf("÷");
            array[index - 1] = operate("/", array[index - 1], array[index + 1]);
            array.splice(index, 2);
            if (array.indexOf("error : div by 0") >= 0) { //if some division by 0 was made, array becomes just an error
                array[0] = "error : div by 0";
                array.splice(1, array.length - 1);
            }
        }
        while (array.indexOf("+") >= 0) { //search and do all additions
            let index = array.indexOf("+");
            array[index - 1] = operate("+", array[index - 1], array[index + 1]);
            array.splice(index, 2);
        }
        while (array.indexOf("-") >= 0) { //search and do all substraction
            let index = array.indexOf("-");
            array[index - 1] = operate("-", array[index - 1], array[index + 1]);
            array.splice(index, 2);
        }
        if (array[0] !== "error : div by 0"){ //if no division by 0 was made, display the result 
            array[0] = Math.floor(array[0]*1000000000)/1000000000; //round in case of decimal too big
            stringResult = array[0].toString();
            result.textContent = " = " + stringResult;
        }
        else { //if some division by 0 was made display the error
        stringResult = array[0].toString();
        result.textContent = stringResult;
        }
    }
}

const back = function(){  //removes last character typed
    let string=Array.from(stringOperation);
    if (string[string.length-1]=== " "){
        string.splice((string.length-3),3);
        opOK=true;
    }
    else{
        string.pop();
    }
    stringOperation = string.join("");
    operation.textContent = stringOperation;
    stringResult = "";
    result.textContent = stringResult;
}

const decimal = function(){ //check if adding a dot is possible and adds it
    let dotIndex = stringOperation.lastIndexOf(".")
    let spaceIndex = stringOperation.lastIndexOf(" ");
    if (spaceIndex <= dotIndex){
        if (stringResult !== "") {
            stringOperation = "";
            stringResult = "";
        }
        stringOperation += ".";
        operation.textContent = stringOperation;
    }
}
const clearCalc = function(){ //reset the calculator
    stringOperation = "";
    stringResult = "";
    operation.textContent = stringOperation;
    result.textContent = stringResult;
}

const addNumber = function(number){ //add a number to the operation string
    if (stringOperation.length < 15){
        if (stringResult !== "") {
            stringOperation = "";
            stringResult = "";
            result.textContent = stringResult;
        }
        stringOperation += number;
        operation.textContent = stringOperation;
        opOK=true;
    }
    else {
        stringResult = "Expression too long";
        result.textContent = stringResult;
    }
}

const addOperator = function(operator){ //add an operator to the operation string
    if (stringOperation.length < 12){
        if (opOK){
            if (stringResult !== "") {
                stringOperation = stringResult;
                stringResult = "";
                result.textContent = stringResult;
            }
            stringOperation += " " + operator + " ";
            operation.textContent = stringOperation;
            opOK=false;
        }
    }
    else {
        stringResult = "Expression too long";
        result.textContent = stringResult;
    }
}

const press = function(button){ //makes a button look like it was pressed
    button.style.transform = "scale(0.85)";
    setTimeout(() => { button.style.transform = "scale(1)"; }, 200);
}

numbers.forEach((button) => {
    button.addEventListener("click", function(){addNumber(button.textContent)})
})

operators.forEach((button) => {
    button.addEventListener("click", () => {addOperator(button.textContent)})
})


dot.addEventListener("click", decimal);

clear.addEventListener("click", clearCalc)



backspace.addEventListener("click", back)


equal.addEventListener("click", calculate)




document.addEventListener('keydown', function(event) {
    let character = event.key;
    if (character === "*"){character = "×"}
    if (character === "/"){
        character = "÷";
        event.preventDefault();
    }
    if (character === "Enter"){ 
        event.preventDefault();
        calculate();
        press(equal);
    }
    else if (character === "Escape"){
        clearCalc();
        press(clear);
    }
    else if (character === "Backspace"){
        back();
        press(backspace);
    }
    else if (character === "." ){
        decimal();
        press(dot);
    }
    else if (/^[0-9]$/.test(character) ){ 
        numbers.forEach((button) => {
            if (character === button.textContent){press(button)}
        })
        addNumber(character);
    }
    else if (character === "+" || character === "-" || character === "÷" || character === "×"){
        operators.forEach((button) => {
            if (character === button.textContent){press(button)}
        })
        addOperator(character);
    }
    
})


let addNotePad = document.querySelector("#addNotePad");
let notepadDisplay = document.querySelector("#notepadDisplay");
let clearNotePad = document.querySelector("#clearNotePad");
let lines = 0;


addNotePad.addEventListener("click", () => { //save the calculator line into the notepad
    if(stringResult !== ""){ //doesn't do anything if there is no result calculated
        if (lines >= 10){ //if notepad is full, remove the last line to make space for the new one
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
        })
        lines++;
    }
})

clearNotePad.addEventListener("click", () => {
    while (notepadDisplay.firstChild){
        notepadDisplay.removeChild(notepadDisplay.firstChild);
    }
    lines = 0;
})