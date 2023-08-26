//functions
function divide(num1,num2){
    let result;
    if (num2 === 0){
        result = 'SYNTAX ERROR';
    }else{
        result = num1/num2;
        if (result%1 === 0){
            result = Math.round(result);
        }else{
            result = result.toFixed(3);
        }
    }
    return result;
}

function multiply(num1,num2){//works with integers
    return num1*num2;
}

function add(num1, num2){//works with integers
    return +num1 + +num2;
}

function subtract(num1,num2){
    return parseInt(num1)-parseInt(num2);
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

function scanDisplay(){
    let displayText = displayExpression.innerHTML.split('');
    const symbols = ['+','-','\u00d7','\u00F7'];
    let indexSymbol;
    let information = [];
    symbols.forEach(function(item) {
        if(displayText.indexOf(item)!==-1){//si contiene el simbolo
            indexSymbol = displayText.indexOf(item);
        }
    });

    information.push(displayExpression.innerHTML.slice(0,indexSymbol));
    information.push(displayText[indexSymbol]);
    information.push(displayExpression.innerHTML.slice(indexSymbol+1));
    return information;
}

// creating eventlisteners for all digits
let displayExpression = document.querySelector('.expression');
let digits = document.querySelectorAll('.digit');
let clear = document.querySelector('.delete');
let clearAll = document.querySelector('.ca');
let decimal = document.querySelector('.decimal');
let answer = document.querySelector('.answer');
let equals = document.querySelector('.equals');

let operations = document.querySelectorAll('.operation');

digits.forEach(function (digit) {
    digit.addEventListener('click', function() {
        displayExpression.innerHTML = displayExpression.innerHTML +`${digit.innerHTML}`;
    });
});

operations.forEach(function (item) {
    item.addEventListener('click', function () {
        displayExpression.innerHTML = displayExpression.innerHTML +`${item.innerHTML}`;
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
    const data = scanDisplay();
    let operationResult = operate(data[0],data[1],data[2]);
    if (operationResult !== undefined){
        answer.innerHTML = operationResult;
    }
});

