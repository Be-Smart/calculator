'use strict';

import './calc.sass';
import template from './calc.pug';
import Calc from './calculate';
import Logic from './logic';
import DragNdrop from './dragNdrop';

export default class Calculator {
	constructor(wrapper, id) {
		this._wrapper = wrapper;

		this._container = document.createElement('div');
		this._container.className = 'calc draggable';
		this._container.id = id;
		this._container.innerHTML = template();

		this._equation = '0';

		this._calc = new Calc();
		this._logic = new Logic();
		this._dragManager = new DragNdrop();

		this._container.addEventListener('click', this._onCalculatorBtnClick.bind(this));
		// document.addEventListener('mousedown', this._dragManager._onMousedown.bind(this));
		// document.addEventListener('mousemove', this._dragManager._onMousemove.bind(this));
		// document.addEventListener('mouseup', this._dragManager._onMouseup.bind(this));
		this._wrapper.appendChild(this._container);

		this._displayResult = document.querySelector(`#${this._container.id} .calc__result`);
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

	// _onMousedown (event) {
	// 	if (event.which != 1) return;

	// 	let elem = event.target.closest('.draggable');

	// 	if (!elem) return;

	// 	this._dragObj.elem = elem;

	// 	this._dragObj.downX = event.pageX;
	// 	this._dragObj.downY = event.pageY;
	// 	this._dragObj.start = true;
	// }

	// _onMousemove (event) {
	// 	if (!this._dragObj.elem) return;
	// 	let elem = this._dragObj.elem;

	// 	if (this._dragObj.start) {
	// 		let moveX = event.pageX - this._dragObj.downX;
	// 		let moveY = event.pageY - this._dragObj.downY;

	// 		if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) return;

	// 		this._dragObj.start = false;

	// 		let coords = this._getCoords(elem);
	// 		this._dragObj.shiftX = this._dragObj.downX - coords.left;
	// 		this._dragObj.shiftY = this._dragObj.downY - coords.top;

	// 		document.body.insertBefore(elem, document.body.lastElementChild);
	// 		elem.style.zIndex = 9999;
	// 		elem.style.position = 'absolute';
	// 	}

	// 	elem.style.left = event.pageX - this._dragObj.shiftX + 'px';
	// 	elem.style.top = event.pageY - this._dragObj.shiftY + 'px';

	// 	return false;
	// }

	// _onMouseup () {
	// 	this._dragObj = {};
	// }

	// _getCoords (elem) {
	// 	let box = elem.getBoundingClientRect();

	// 	return {
	// 		top: box.top + pageYOffset,
	// 		left: box.left + pageXOffset
	// 	};
	// }

}