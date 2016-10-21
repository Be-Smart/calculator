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

		let elem = event.target.closest('.draggable');

		if (!elem) return;

		this._dragObj.elem = elem;

		this._dragObj.downX = event.pageX;
		this._dragObj.downY = event.pageY;
		this._dragObj.start = true;
	}

	_onMousemove (event) {
		if (!this._dragObj.elem) return;
		let elem = this._dragObj.elem;

		if (this._dragObj.start) {
			let moveX = event.pageX - this._dragObj.downX;
			let moveY = event.pageY - this._dragObj.downY;

			if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) return;

			this._dragObj.start = false;

			let coords = this._getCoords(elem);
			this._dragObj.shiftX = this._dragObj.downX - coords.left;
			this._dragObj.shiftY = this._dragObj.downY - coords.top;

			document.body.insertBefore(elem, document.body.lastElementChild);
			elem.style.zIndex = 9999;
			elem.style.position = 'absolute';
		}

		elem.style.left = event.pageX - this._dragObj.shiftX + 'px';
		elem.style.top = event.pageY - this._dragObj.shiftY + 'px';

		return false;
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