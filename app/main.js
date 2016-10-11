'use strict';

import Calc from './components';

const calc = new Calc();

let btnsContainer = document.querySelector('.calc__btns');
let display = document.querySelector('.calc__result');
let equation = '0';

function setLogic(value, dataSet) {
	if (dataSet === 'num' || dataSet === 'minus') {
		equation === '0' ? equation = value : equation += value;
	} else if (value === 'ac') {
		equation = '0';
	} else if (value == 'ce') {
		let length = equation.length;
		length > 1 ? equation = equation.substr(0, length - 1) : equation = '0';
	} else {
		(dataSet && dataSet !== 'equal') ? equation += value : null;
	}

	dataSet === 'equal' ? equation = display.innerHTML = calc.calculate(equation) : display.innerHTML = equation;
}

btnsContainer.addEventListener('click', function(e) {
	let val = e.target.value;
	let data = e.target.dataset.val;

	setLogic(val, data);
});
