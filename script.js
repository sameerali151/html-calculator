function add(x, y) {
    return String(Number(x) + Number(y))
}

function subtract(x, y) {
    return x - y
}

function multiply(x, y) {
    return x * y
}

function divide(x, y) {
    return x / y
}

function operate(operator, x, y) {
    operatorMapping = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '/': divide,
    }
    return operatorMapping[operator](x, y)
}

function partitionComponents(expression) {
    let result = [];
    let numberChain = "";
    for (let i = 0; i < expression.length; i++) {
        element = expression.substr(i, 1)
        if (Number(element) || element == "0") {
            numberChain += element;
        } else {
            result.push(numberChain);
            result.push(element);
            numberChain = "";
        }
    }
    if (!!numberChain) {
        result.push(numberChain);
    }
    return result
}

function validateExpressionArray(array) {
    //  every expression-array must be an alternating series of numbers and operators,
    //  beginning and ending with a number
    let number = true;

    reNumber = /^\d+$/;
    reOperator = /^[+-\/\*]$/;

    if (!(array[0].match(reNumber)) || !(array[array.length - 1].match(reNumber))) {
        return false
    }

    for (let i = 0; i < array.length; i++) {
        element = array[i]
        if (!!number && !(element.match(reNumber))) {
            return false
        } else if (!number && !(element.match(reOperator))) {
            return false
        } else if ((!element.match(reNumber) && !element.match(reOperator))) {
            return false
        }
        number = !number
    }
    return true
}

function evaluateExpression(expression) {

    expressionArray = partitionComponents(expression)

    if (!validateExpressionArray(expressionArray)) {
        return "ERROR"
    }

    for (let i = 0; i < operators.length; i++) {
        operator = operators[i]
        var result
        while (expressionArray.includes(operator)) {
            opIdx = expressionArray.indexOf(operator)
            result = operate(operator, expressionArray[opIdx - 1], expressionArray[opIdx + 1])
            expressionArray.splice(opIdx - 1, 3, result)
        }
    }

    return expressionArray[0]

}

function appendToDisplay(e) {
    outputDisplay = document.querySelector('#output-display')
    outputDisplay.textContent += e.target.id.substr(-1)
}

function clickEquals() {
    let expression = document.querySelector('#output-display').textContent
    result = evaluateExpression(expression)
    document.querySelector('#output-display').textContent = result
}

function clickClear() {
    document.querySelector('#output-display').textContent = ""
}

const operators = ['*', '/', '+', '-']

document.querySelectorAll('.calc-button').forEach(
    (button) => button.addEventListener('click', appendToDisplay)
)
document.querySelector('.equals-calc-button').addEventListener('click', clickEquals)
document.querySelector('.clear-calc-button').addEventListener('click', clickClear)
