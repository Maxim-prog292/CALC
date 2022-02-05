"use strict";

let first = '',
    second = '',
    sign = '',
    finish = false,
    history = [];

const out = document.querySelector('.out'),
      historyScreen = document.querySelector('.history');
      
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
      signs = ['-', '+', '÷', '×', '%', '^', '√', 'cos', 'sin', '/'];

function clean() {
    first = '';
    second = '';
    sign = '';
    finish = false;
    out.textContent = '0';
}

window.addEventListener('keydown', (e) => {
    let key = e.key;
    enterCalc(key)
})

document.querySelector('.buttons').addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn')) return;

    if (e.target.classList.contains('clear')) clean();

    let key = e.target.textContent;

    enterCalc(key)
    
});

function enterCalc(key) {
    if (digit.includes(key)) {
        if (!second && !sign) {
            first += key;
            out.textContent = first;
        } else if (first && second && finish) {
            first = '';
            first += key;
            second = '';
            sign = '';
            finish = false;
            out.textContent = first;
        } else {
            if (!second) {
                second = key;
            } else {
                second += key;
            }
            out.textContent = second;
        }

        console.log(first, sign, second)
    }

    if (signs.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(first, sign, second);
        return;

    }

    if (key === '=' || key === 'Enter') {
        previos();
    }
    if (key === 'π') {
        first = 3.14;
        out.textContent = first;
    }
    if ( key ==='c' || key === 'C') {
        clean();
    }
}

function previos() {
    if (second === '') second = first;
    switch (sign) {
        case '+':
            first = (+first) + (+second);
            break;
        case '-':
            first = first - second;
            break;
        case '^':
            first = first ** second;
            break;
        case '×':
            first = first * second;
            break;
        case '÷':
            divide()
            break;
        case '/':
            divide()
            break;
        case '%':
            first = first / 100;
            break;
        case '√':
            first = Math.sqrt(first);
            break;
        case 'cos':
            first = Math.cos(first * Math.PI / 180);
            break;
        case 'sin':
            first = Math.sin(first * Math.PI / 180);
            break;
        default:
            break;
    }
    
    finish = true;
    
    if (Number.isInteger(+first)) {
        out.textContent = first;
        history.push(first);
    } else {
        if (first === 0) {
            out.textContent = first;
        } else {
            out.textContent = (+first).toFixed(2)
        }
            
        history.push((+first).toFixed(2));
    }
    console.log(history)
    historyOut()
}

function divide() {
    if (second === '0') {
        out.textContent = 'Error'
    } else {
        first = first / second;
    }
}

function historyOut() {
    historyScreen.textContent = '';
    history.forEach(item => {
        const span = document.createElement('span');
        span.classList.add('history_item');
        span.textContent = item;
        historyScreen.append(span);
    })
}

function historyInput() {
    historyScreen.addEventListener('click', (e) => {

        if (e.target.classList.contains('history_item')) {
            clean();
            first = e.target.textContent;
            out.textContent = first;
        }
    })
}
historyInput();