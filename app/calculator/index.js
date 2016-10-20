'use strict';

import './calc.sass';
import template from './calc.pug';
import Calc from './calculate';
import Logic from './logic';

export default class Calculator {
	constructor(container) {
		this._container = container;
		this._equation = '0';

		this._calc = new Calc();
		this._logic = new Logic();

		this._container.addEventListener('click', this._onCalculatorBtnClick.bind(this));
		this._container.innerHTML = template();
		this._displayResult = document.querySelector(`.${container.className} .calc__result`);
	}

	_onCalculatorBtnClick (event) {
		let value = event.target.value;
		let dataSet = event.target.dataset.btnType;

		if (!dataSet) return;

		this._displayResult.innerHTML = this._equation = this._logic.buttonsHandler(value, dataSet, this._equation);

		if (dataSet === 'equal') {
			this._displayResult.innerHTML = this._equation = this._calc.calculate(this._equation);
		}
	}

}