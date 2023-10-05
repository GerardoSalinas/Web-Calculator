//functions
function divide(num1,num2){
    let calculation;
    if (parseInt(num2) === 0){
        calculation = 'SYNTAX ERROR';
    }else{
        calculation = num1/num2;
        calculation = fixDecimalPoint(calculation);
    }
    return calculation;
}

function fixDecimalPoint(number){
    let result;
    if (number%1 === 0){
        result = Math.round(number);
    }else{
        result = number.toFixed(3);
    }
    return result;
}

function multiply(num1,num2){//works with integers
    let calculation = parseFloat(num1)*parseFloat(num2);
    return fixDecimalPoint(calculation);
}

function add(num1, num2){//works with integers
    let calculation = parseFloat(num1) + parseFloat(num2);
    return fixDecimalPoint(calculation);
}

function subtract(num1,num2){
    let calculation = parseFloat(num1)-parseFloat(num2);

    return fixDecimalPoint(calculation);
}

function operate (num1,operator,num2){
    let result;
    switch (operator) {
        case '+':
            result = add(num1,num2);
            break;
        case '-':
            result = subtract(num1,num2);
            break;
        case '\u00d7':
            result = multiply(num1, num2)
            break;
        case '\u00F7':
            result = divide(num1, num2);
            break;
        default:
            break;
    }
    return result;
}


function toggleOperations (option){
    if (option === 'deactivate'){
        operations.forEach(function (operation) {
            operation.removeEventListener('click', operationClickHandler);
        });
        equals.removeEventListener('click', equalsClickHandler);
        availableOperations = false;
    }
    if(option === 'activate'){
        operations.forEach(function (operation) {
            operation.addEventListener('click', operationClickHandler);
        });
        equals.addEventListener('click', equalsClickHandler);
        availableOperations = true;
    }
}

function newScanDisplay () {
    let displayText = displayExpression.innerHTML.slice(0,displayExpression.innerHTML.length-1);
    const symbols = ['+','-','\u00d7','\u00F7'];
    let symbolIndex = -1;
    for (let symbol of symbols){
        if (displayText.includes(symbol)){
            symbolIndex = displayText.indexOf(symbol);
            break;
        }
    }
    return symbolIndex;    
}

let displayExpression = document.querySelector('.expression');
let digits = document.querySelectorAll('.digit');
let clear = document.querySelector('.delete');
let clearAll = document.querySelector('.ca');
let decimal = document.querySelector('.decimal');
let answer = document.querySelector('.answer');
let equals = document.querySelector('.equals');
let mainFrame = document.querySelector('.main-body');

let operations = document.querySelectorAll('.operation');
let availableOperations = false;
//callback functions for eventListeners
function digitClickHandler() {
    displayExpression.innerHTML = displayExpression.innerHTML + `${this.innerHTML}`;
    toggleOperations('activate'); 
}

function operationClickHandler(){
    if (displayExpression.innerHTML === ''){
        toggleOperations('deactivate'); 
    }
    displayExpression.innerHTML = displayExpression.innerHTML +`${this.innerHTML}`;
    toggleOperations('deactivate'); 
    let symbolIndex = newScanDisplay();
    if (symbolIndex !== -1){
        let displayText = displayExpression.innerHTML.slice(0,displayExpression.innerHTML.length-1);
        let operand1 = displayText.slice(0,symbolIndex);
        let operator = displayText.at(symbolIndex);
        let operand2 = displayText.slice(symbolIndex+1);
        let result = operate(operand1, operator, operand2);
        displayExpression.innerHTML = displayExpression.innerHTML.replace(displayText, String(result));
    }
}

function clearAllClickHandler (){
    displayExpression.innerHTML = '';
    answer.innerHTML = '';
}

function clearClickHandler () {
    let text = displayExpression.innerHTML;
    displayExpression.innerHTML = text.slice(0,text.length-1);
    if(availableOperations === false && text !== ''){
        toggleOperations('activate');
    }
}

function decimalClickHandler (){
    let characters = displayExpression.innerHTML.split('');
    if(!characters.includes('.')){
        displayExpression.innerHTML = displayExpression.innerHTML +`${decimal.innerHTML}`;
    }
}

function equalsClickHandler(){
    let symbolIndex = newScanDisplay();
    let displayText = displayExpression.innerHTML;
    let operand1 = displayText.slice(0,symbolIndex);
    let operator = displayText.at(symbolIndex);
    let operand2 = displayText.slice(symbolIndex+1);
    let finalResult = operate(operand1, operator, operand2);
    
    //fix this part by checking if finalresult is undefined
    if (typeof finalResult !== 'undefined'){
        answer.innerHTML = finalResult;
    }
}

//EventListeners
digits.forEach((digit) => digit.addEventListener('click', digitClickHandler));

// operations.forEach((operation) => operation.addEventListener('click',operationClickHandler)); 

clearAll.addEventListener('click',clearAllClickHandler );

clear.addEventListener('click',clearClickHandler);

decimal.addEventListener('click',decimalClickHandler);

equals.addEventListener('click',equalsClickHandler);


document.addEventListener('keypress', function(e) {
    e.preventDefault();
    let key = e.key;
    const triggerEvent = new Event('click');
    const digitNodesArray = Array.from(digits);
    const operationNodesArray = Array.from(operations);
    switch (key) {
        case 'Enter':
            equals.dispatchEvent(triggerEvent);
            break;
        case ' ':
            clearAll.dispatchEvent(triggerEvent);
            break;
        case '/':
            operationNodesArray.find((element) => element.innerHTML === '÷').dispatchEvent(triggerEvent);
            break;
        case '*':
            operationNodesArray.find((element) => element.innerHTML === `\u00d7`).dispatchEvent(triggerEvent);
            break; 
        case '+': case '-':
            operationNodesArray.find((element) => element.innerHTML === `${key}`).dispatchEvent(triggerEvent);
            break;
        case '.':
            decimal.dispatchEvent(triggerEvent);
            break;
        default:
            if (Number.isInteger(Number.parseInt(key))){
                digitNodesArray.find((element) => element.innerHTML === `${key}`).dispatchEvent(triggerEvent);
            }
            break;
    }
});

document.addEventListener('keydown', function (e) {
    const triggerEvent = new Event('click');
    if(e.key === 'Backspace'){
        clear.dispatchEvent(triggerEvent);
    }
})


