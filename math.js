// w2.math:

// round( n, dp) - round a number
// n - a number to round
// dp - decimal places to round to

// random( n, nn, r) - proper random number generator
// ( 9) - random number from 0 to 9, rounded to whole number
// ( 10, 19) - random number from 10 to 19, rounded to whole number
// ( 9, false) - as above but without rounding
// ( 10, 19, false) - as above but without rounding

// between( n, x, y) - returns true/false if n is between x and y
// diff( x, y) - returns the difference between x and y

// min, max( ...) - find lowest value
// ( 1, 2, [ 3, 4, [ 5, 6]]) - arguments may be numbers or arrays of numbers including nested arrays
// or....
// ( [ { num: 1}, { num: 2}, { num: 3}], 'num') - array of objects and property name
// or....
// ( [ [ 1, 2, 3], [ 4, 5, 6], [ 7, 8, 9]], 1) - array of arrays with an index

window[window['__wheel2_locator']].math.load(new class {
	#w2 = window[window['__wheel2_locator']];

	round(n, dp) { return Math.round(n * (10 ** dp)) / (10 ** dp); }
	random(n, nn, r = true) {
		if (this.#w2.op.isBool(nn)) {
			r = nn;
		}

		let s = 0, e = n;

		if (this.#w2.op.isNum(nn)) {
			s = n;
			e = nn - s;
		}

		let mr = s + (Math.random() * e);

		return r ? Math.round(mr) : mr;
	}

	min(x, y) {
		if (w2.op.isArrArr(x) || w2.op.isArrObj(x)) {
			return x[w2.arr.min(x, y)][y];
		}

		return Math.min(...w2.arr.shove(...arguments));
	}

	max(x, y) {
		if (w2.op.isArrArr(x) || w2.op.isArrObj(x)) {
			return x[w2.arr.min(x, y)][y];
		}

		return Math.min(...w2.arr.shove(...arguments));
	}

	between(n, x, y) { return n >= x && n <= y; }
	diff(x, y) { return Math.abs(x - y); }

});

