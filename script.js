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
        console.log(stringOperation);
        operation.textContent = stringOperation;
    })
})

operators.forEach((button) => {
    button.addEventListener("click", () => {
        stringOperation += button.textContent;
        console.log(stringOperation);
        operation.textContent = stringOperation;
    })
})

clear.addEventListener("click", () => {
    stringOperation = "";
    stringResult = "";
    operation.textContent = stringOperation;
    result.textContent = stringResult;

})