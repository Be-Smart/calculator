'use strict';

export default class DragNdrop {
	constructor () {
		this._dragObj = {};
		document.addEventListener('mousedown', this._onMousedown.bind(this));
		document.addEventListener('mousemove', this._onMousemove.bind(this));
		document.addEventListener('mouseup', this._onMouseup.bind(this));

	}

	_onMousedown (event) {
		if (event.which != 1) return;

		let targetBtn = event.target.dataset.btnType;
		let targetElem = event.target.dataset.element;
		let calcContainer = event.target.closest('[data-container]');
		let component = event.target.closest('[data-component="calculator"]');

		if (!calcContainer || targetBtn || targetElem) return;

		this._dragObj.component = component;
		this._dragObj.calcContainer = calcContainer;

		this._dragObj.downX = event.pageX;
		this._dragObj.downY = event.pageY;
		this._dragObj.start = true;
	}

	_onMousemove (event) {
		if (!this._dragObj.component) return;
		let component = this._dragObj.component;

		if (this._dragObj.start) {
			let moveX = event.pageX - this._dragObj.downX;
			let moveY = event.pageY - this._dragObj.downY;

			if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) return;

			this._dragObj.start = false;

			let coords = this._getCoords(this._dragObj.calcContainer);
			this._dragObj.shiftX = this._dragObj.downX - coords.left;
			this._dragObj.shiftY = this._dragObj.downY - coords.top;

			document.body.appendChild(component);
			component.style.zIndex = 9999;
			component.style.position = 'absolute';
		}

		component.style.left = event.pageX - this._dragObj.shiftX + 'px';
		component.style.top = event.pageY - this._dragObj.shiftY + 'px';
	}

	_onMouseup () {
		this._dragObj = {};
	}

	_getCoords (elem) {
		let box = elem.getBoundingClientRect();

		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	}

}