'use strict';

import './calc.sass';

export default class Calc {
	constructor() {
		this._eval = {
			'/': (a, b) => a / b,
			'*': (a, b) => a * b,
			'-': (a, b) => a - b,
			'+': (a, b) => a + b
		};
	}

	_isNum (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	}

//Convert Infix notation to Reverse Polish Notation
	_rpn (infix) {
		let infixArr = infix.split(/([\+\-\*\/])/).filter( (x) => x !== '' );
		let output = '';
		let stack = [];
		let operators = {'/': 2, '*': 2, '-': 1, '+': 1};

		if (infixArr[0] === '-') output += infixArr.shift();

		for (let i = 0; i < infixArr.length; i++) {
			let sign = infixArr[i];
			if ( this._isNum(sign) ) {
				output += `${sign} `;
			} else {
				let o1 = sign;
				let o2 = stack[stack.length - 1];
				while ("*/+-".indexOf(o2) !== -1 && (operators[o1] <= operators[o2]) ) {
					output += `${stack.pop()} `;
					o2 = stack[stack.length - 1];
				}
				stack.push(o1);
			}
		}

		while(stack.length > 0) {
			output += `${stack.pop()} `;
		}

		return output;
	}

//Evaluate a Reverse Polish Notation
	calculate (equation) {
		let arr = this._rpn(equation).split(' ');
		let postfix = arr.filter( (x) => x !== '' );
		let result = [];
		let response;

		for (let i = 0; i < postfix.length; i++) {
			let sign = postfix[i];

			if ( this._isNum(sign) ) {
				result.push(sign);
			} else {
				let b = +result.pop();
				let a = +result.pop();

				if (!this._eval[sign]) return 'Invalid equation!';

				result.push( this._eval[sign](a, b) );
			}
		}

		if (result.length > 1) return 'Error!';

		response = result.pop();

		return isNaN( response ) ? '0' : Math.round(response * 100) / 100;
	}

}