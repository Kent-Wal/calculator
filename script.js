//buttons
let x;
let y;
let operator;
let clicked = false;
let result = false;
let lastPressed = null;
let decimal = false;

const screenCurrent = document.querySelector('.bottom');
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.className === 'operator') {
            if (lastPressed === 'operator') {
                operator = e.target.textContent;
                return;
            }
            if (clicked == true) {
                y = getNum();
                operation();
            }
            x = getNum();
            operator = e.target.textContent;
            clicked = true;

            lastPressed = 'operator';
        }
        else if (e.target.className === 'clear') {
            clearScreen();

            lastPressed = 'clear';
        }
        else if (e.target.className === 'delete') {
            deleteNum();

            lastPressed = 'delete';
        }
        else if (e.target.textContent === '=') { 
            if (lastPressed !== 'operator') {
                y = getNum();
                operation();

                lastPressed = '=';
            }
            
        }
        else if (e.target.textContent === '.') {
            if (decimal == false) updateScreen(e.target.textContent);
            decimal = true;
        }
        else {
            updateScreen(e.target.textContent);

            lastPressed = 'number';
        }
    });
});

function updateScreen(buttonChoice) {
    if ((screenCurrent.textContent === '0' && buttonChoice != '.') || result == true || clicked == true) {
        screenCurrent.textContent = buttonChoice;
        result = false;
        clicked = false;
    }
    else screenCurrent.textContent = screenCurrent.textContent + buttonChoice;
}

function clearScreen() {
    screenCurrent.textContent = '0';
    x = 0;
    y = 0;
    operator = "";
    clicked = false;
    decimal = false;
}

function deleteNum() {
    if (screenCurrent.textContent === '0') return;
    else {
        let num = screenCurrent.textContent.split('');
        num.pop();

        if (screenCurrent.textContent === '.') decimal = false;
        if (num.length === 0) screenCurrent.textContent = '0';
        else screenCurrent.textContent = num.join('');
    }
}

function operation() {
    if (y === '0' && operator === "÷") alert("You can't divide by 0");
    else {
        if (operator === '+') result = Number(x) + Number(y);
        else if (operator === '-') result = Number(x) - Number(y);
        else if (operator === '×') result = Number(x) * Number(y);
        else if (operator === '÷') result = Number(x) / Number(y);
    
        if (Number.isInteger(result)) screenCurrent.textContent = result;
        else screenCurrent.textContent = result.toFixed(3);

        x = result;
        clicked = false;
        result = true;
        decimal = false;
    }
}

function getNum() { 
    const num = screenCurrent.textContent;
    clicked = false;
    decimal = false;
    return num;
}