'use strict';

import Calculator from './calculator';

let calcComponents = document.querySelectorAll('[data-component="calculator"]');

Array.from(calcComponents).forEach( el => new Calculator(el) );
