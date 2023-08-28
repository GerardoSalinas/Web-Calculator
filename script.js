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
    // let displayText = displayExpression.innerHTML.split('');
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

function getRandomColor(){
    let rgbValues = [] ;
    let randNumber;
    for (let i = 0; i<3; i++){
        randNumber = Math.floor(Math.random() * (255 - 0 + 1) ) + 0;
        rgbValues.push(randNumber);
    } 
    return `rgb(${rgbValues[0]},${rgbValues[1]},${rgbValues[2]})`; 
}

function randomizeShadow(){
    const randomColor = getRandomColor();
    mainFrame.style.boxShadow = `0px 0px 10px 0px ${randomColor}`; 
}

// creating eventlisteners for all digits
let displayExpression = document.querySelector('.expression');
let digits = document.querySelectorAll('.digit');
let clear = document.querySelector('.delete');
let clearAll = document.querySelector('.ca');
let decimal = document.querySelector('.decimal');
let answer = document.querySelector('.answer');
let equals = document.querySelector('.equals');
let mainFrame = document.querySelector('.main-body');

let operations = document.querySelectorAll('.operation');

digits.forEach(function (digit) {
    digit.addEventListener('click', function() {
        randomizeShadow();
        displayExpression.innerHTML = displayExpression.innerHTML +`${digit.innerHTML}`;
    });
});

operations.forEach(function (item) {
    item.addEventListener('click', function () {
        //evaluar operacion anterior
        // let result;
        displayExpression.innerHTML = displayExpression.innerHTML +`${item.innerHTML}`;//12+7-
        if (moreThanOneSymbol()){
            let displayText = displayExpression.innerHTML.split('');//[1,2,+,7,-]
            displayText.pop();
            displayText = displayText.join('');//12+7
            let result = evaluate(displayText);
            let lastSymbol = displayExpression.innerHTML.charAt(displayExpression.innerHTML.length-1);
            displayExpression.innerHTML = result+lastSymbol;
        }
    });
});

clearAll.addEventListener('click', function() {
    displayExpression.innerHTML = '';
    answer.innerHTML = '';
});

clear.addEventListener('click', function(){
    let text = displayExpression.innerHTML;
    displayExpression.innerHTML = text.slice(0,text.length-1);
});

decimal.addEventListener('click', function(){
    let characaters = displayExpression.innerHTML.split('');
    if(!characaters.includes('.')){
        displayExpression.innerHTML = displayExpression.innerHTML +`${decimal.innerHTML}`;
    }
});

equals.addEventListener('click', function (){
    /* const data = scanDisplay();
    let operationResult = operate(data[0],data[1],data[2]);
    if (operationResult !== undefined){
        answer.innerHTML = operationResult;
    } */
    evaluate();
});

function evaluate(displayText = displayExpression.innerHTML){
    const data = scanDisplay(displayText);
    let operationResult = operate(data[0],data[1],data[2]);
    if (operationResult !== undefined){
        answer.innerHTML = operationResult;
    }
    return operationResult;
}

