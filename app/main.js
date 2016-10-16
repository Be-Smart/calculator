'use strict';

import Calc from './calculator';
import Logic from './calculator/logic';

const calc = new Calc();
const logic = new Logic();

let btnsContainer = document.querySelector('.calc__btns');
let display = document.querySelector('.calc__result');
let equation = '0';

function callback(event) {
	let value = event.target.value;
	let dataSet = event.target.dataset.btnType;

	display.innerHTML = equation = logic.buttonsHandler(value, dataSet, equation);

	if (dataSet === 'equal') equation = display.innerHTML = calc.calculate(equation);

}

btnsContainer.addEventListener('click', callback);
