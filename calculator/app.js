const calculator = document.querySelector('.calculator');
const calculatingArea = document.querySelector('.calculatingArea');
const numberContainer = document.querySelector(".numbers-container");
let firstNumberToCalculate = ``
let secondNumberToCalculate = ``
let firstNumber;
let operation;
let result;

numberContainer.addEventListener("click", (e) => {
    const element = e.target;
    const number = element.classList.contains("numbers");
    const operator = element.classList.contains("operator");
    const elementClicked = element.innerText;
    let numberInCalculatingArea = calculatingArea.innerText;

    if (number) {
        // if (numberInCalculatingArea === "0"){
            //     calculatingArea.innerHTML = ``;
            // }
        if (firstNumberToCalculate !== 0){
            firstNumberToCalculate += `${elementClicked}`;
            firstNumberToCalculate = parseInt(firstNumberToCalculate)
            calculatingArea.innerText = firstNumberToCalculate;
            firstNumber = firstNumberToCalculate;
            console.log(firstNumberToCalculate);
            
        }
        else{
            secondNumberToCalculate += `${elementClicked}`;
            secondNumberToCalculate = parseInt(secondNumberToCalculate);
            calculatingArea.innerText = secondNumberToCalculate;
        }
    }
    else if (operator){
        calculatingArea.innerText = ``;
        firstNumberToCalculate = 0;
        if (elementClicked !== "="){
            if (elementClicked === "+"){
                operation = "+"
            }
            
            if (elementClicked === "-"){
                operation = "-"
            }
            
            if (elementClicked === "*"){
                operation = "*"
            }
            
            if (elementClicked === "/"){
                operation = "/"
            }
            
        }
        else{
            if(operation === "+"){
                result = firstNumber + secondNumberToCalculate;
            }
            if(operation === "-"){
                result = firstNumber - secondNumberToCalculate;
            }
            if(operation === "*"){
                result = firstNumber * secondNumberToCalculate;
            }
            if(operation === "/"){
                result = firstNumber / secondNumberToCalculate;
            }
            calculatingArea.innerHTML = result;
            firstNumberToCalculate = ``
            secondNumberToCalculate = ``
        }
    }
})