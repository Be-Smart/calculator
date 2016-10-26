'use strict';

import './calc.sass';
import template from './calc.pug';
import Calc from './calculate';
import Logic from './logic';
import DragNdrop from './dragNdrop';

export default class Calculator {
	constructor(element) {
		this._element = element;
		this._element.innerHTML = template();

		this._equation = '0';

		new DragNdrop();
		this._calc = new Calc();
		this._logic = new Logic();

		this._calcContainer = this._element.querySelector('[data-container]');
		this._displayResult = this._element.querySelector('[data-element="calc-result"]');

		this._calcContainer.addEventListener('click', this._onCalculatorBtnClick.bind(this));

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