'use strict';

import './calc.sass';

export default class Calc {
	constructor() {
		this._eval = {
			divide: (a, b) => a / b,
			multiply: (a, b) => a * b,
			substract: (a, b) => a - b,
			add: (a, b) => a + b
		};
	}

	_isNum (num) {
		return !isNaN(parseFloat(num)) && isFinite(num);
	}

//Convert Infix notation to Reverse Polish Notation
	_rpn (infix) {
		let infixArr = infix.split(/([\+\-\*\/])/);
		let output = '';
		let stack = [];
		let operators = {'/': 2, '*': 2, '-': 1, '+': 1};

		for (let i = 0; i < infixArr.length; i++) {
			if ( this._isNum(infixArr[i]) ) {
				output += `${infixArr[i]} `;
			} else {
				let o1 = infixArr[i];
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
		let postfix = arr.filter( (x) => x !== '' )
		let result = [];

		for (let i = 0; i < postfix.length; i++) {
			if ( this._isNum(postfix[i]) ) {
				result.push(postfix[i]);
			} else {
				let b = +result.pop();
				let a = +result.pop();

				switch (postfix[i]) {
					case '/':
						result.push( this._eval.divide(a, b) );
						break;
					case '*':
						result.push( this._eval.multiply(a, b) );
						break;
					case '-':
						result.push( this._eval.substract(a, b) );
						break;
					case '+':
						result.push( this._eval.add(a, b) );
						break;
				}
			}
		}

		if (result.length > 1) return;

		return Math.round(result.pop() * 100) / 100;
	}


}