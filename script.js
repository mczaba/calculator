let numbers = document.querySelectorAll(".number");
let display = document.querySelector("#display");


numbers.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.textContent);
        let string = document.createElement("p");
        string.textContent = button.textContent;
        display.appendChild(string);
    })
})