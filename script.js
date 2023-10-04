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

function moreThanOneSymbol(){
    let result = false; //assuming there is only one symbol
    let displayText = displayExpression.innerHTML.split('');
    displayText.pop();//quitamos el ultimo elemento
    const symbols = ['+','-','\u00d7','\u00F7'];
    symbols.forEach(function (item){
        if (displayText.includes(item)){
            result = true;
            return;
        }
    });
    return result;
}

function scanDisplay(displayText){//valor por defecto
    displayText = displayText.split('');
    const symbols = ['+','-','\u00d7','\u00F7'];
    let indexSymbol;
    let information = [];
    symbols.forEach(function(item) {
        if(displayText.indexOf(item)!==-1){//si contiene el simbolo
            indexSymbol = displayText.indexOf(item);
        }
    });
    let displaystring = displayText.join('');
    information.push(displaystring.slice(0,indexSymbol));
    information.push(displaystring[indexSymbol]);
    information.push(displaystring.slice(indexSymbol+1));
    return information;
}

function toggleOperations (option){
    if (option === 'deactivate'){
        operations.forEach(function (operation) {
            operation.removeEventListener('click', operationClickHandler);
        });
        equals.removeEventListener('click', equalsClickHandler);
    }
    if(option === 'activate'){
        operations.forEach(function (operation) {
            operation.addEventListener('click', operationClickHandler);
        });
        equals.addEventListener('click', equalsClickHandler);
    }
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
// let areOperationsEnabled = true;

//callback functions for eventListeners
function digitClickHandler() {
    displayExpression.innerHTML = displayExpression.innerHTML + `${this.innerHTML}`;
    toggleOperations('activate'); //activa las operaciones
}

function operationClickHandler(){
    displayExpression.innerHTML = displayExpression.innerHTML +`${this.innerHTML}`;
    toggleOperations('deactivate'); //desactiva las operaciones
        /* 
        invoke the toggle function 
        check the value of the flag
            if flag === true
                iterate throw the nodeList removing the event listeners
                change the flag to false;
            if flag === false
                iterate throw the nodeList activating the event listeners
         */
        /* if (moreThanOneSymbol()){
            let displayText = displayExpression.innerHTML.split('');
            displayText.pop();
            displayText = displayText.join('');
            let result = equalsClickHandler(displayText);
            let lastSymbol = displayExpression.innerHTML.charAt(displayExpression.innerHTML.length-1);
            displayExpression.innerHTML = result+lastSymbol;
        } */
}

function clearAllClickHandler (){
    displayExpression.innerHTML = '';
    answer.innerHTML = '';
}

function clearClickHandler () {
    let text = displayExpression.innerHTML;
    displayExpression.innerHTML = text.slice(0,text.length-1);
}

function decimalClickHandler (){
    let characters = displayExpression.innerHTML.split('');
    if(!characters.includes('.')){
        displayExpression.innerHTML = displayExpression.innerHTML +`${decimal.innerHTML}`;
    }
}

function equalsClickHandler(displayText = displayExpression.innerHTML){
    const data = scanDisplay(displayText);
    let operationResult = operate(data[0],data[1],data[2]);
    let finalResult;
    /* if (data === undefined || data === null){
        return;
    }else{

    } */
    if(isNaN(operationResult)){
        finalResult = 'SYNTAX ERROR';
    }else{
        finalResult = operationResult;
    }    
    answer.innerHTML = finalResult;
}

//EventListeners
digits.forEach((digit) => digit.addEventListener('click', digitClickHandler));

operations.forEach((operation) => operation.addEventListener('click',operationClickHandler));    

clearAll.addEventListener('click',clearAllClickHandler );

clear.addEventListener('click',clearClickHandler);

decimal.addEventListener('click',decimalClickHandler);

equals.addEventListener('click',equalsClickHandler);


document.addEventListener('keypress', function(e) {
    //figure out this part!
    e.preventDefault();
    let key = e.key;
    console.log(key);
    const triggerEvent = new Event('click');
    const digitNodesArray = Array.from(digits);
    const operationNodesArray = Array.from(operations);
    switch (key) {
        case 'Backspace':
            clear.dispatchEvent(triggerEvent);
            break;
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


