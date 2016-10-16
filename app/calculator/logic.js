'use strict';

export default class Logic {
	constructor () {
		this._cacheValue = '';
	}

	buttonsHandler (elementValue, elementDataSet, storage) {
		let length = this._cacheValue.length;
		let lastSign = this._cacheValue[length - 1];

		if (elementDataSet === 'num') {

			if (storage === '0') {
				storage = elementValue;
			} else if (lastSign === '=') {
				this._cacheValue = storage = elementValue;
			} else {
				storage += elementValue;
			}

		} else if (elementDataSet === 'minus') {

			if (storage === '0') {
				storage = elementValue;
			} else if (lastSign === '=') {
				this._cacheValue = storage += elementValue;
			} else {
				storage += elementValue;
			}

		} else if (elementValue === 'ac') {

			storage = '0';
			this._cacheValue = '';

		} else if (elementValue == 'ce') {

			let length = storage.length;
			if (length > 1) {
				storage = storage.substr(0, length - 1);
			} else {
				storage = '0';
			}

		} else if (elementDataSet && elementDataSet !== 'equal') {

			if (lastSign === '=') {
				this._cacheValue = storage += elementValue;
			} else {
				storage += elementValue;
			}

		} else if (elementDataSet === 'equal' && lastSign === '=') {

			let num = '';
			for (let i = 1; i < length; i++) {
				let val = this._cacheValue[length - i];
				let op = '/*-+'.indexOf(val) !== -1;
				if ( !op && val !== '=' ) {
					num = val + num;
				} else if (op && val !== '=') {
					num = val + num;
					break;
				}
			}
			storage += num;

		} else if (elementDataSet === 'equal' && '/*-+'.indexOf(lastSign) !== -1) {

			let op = this._cacheValue.split('').filter( val => '/*-+'.indexOf(val) !== -1 ).join('');

			if (op.length === 1) {
				for (var i = 0; i < this._cacheValue.length; i++) {
					let val = this._cacheValue[i];
					let op = '/*-+'.indexOf(val) !== -1;
					if (op) break;
					this._cacheValue = storage += val;
				}
			}

		}

		if (lastSign !== '=') this._cacheValue += elementValue;

		return storage;
	}
}
