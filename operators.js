
// w2.op:

// isUndef(x), Null, Nullish - return true/false if x is one of these nullish types
// isBool(x), Num, WholeNum, Str - returns true/false if x is one of these primitive types
// isPrim(x) - returns true/false if x is any of the primitive types

// isArr(x) - returns true/false if x is an array
// isObj(x) - returns true/false if x is a data object
// isRgx(x) - returns true/false if x is a regular expression
// isDate(x) - returns true/false if x is a date object
// isFn(x) - returns true/false if x is a function

// isArrArr, ArrObj, ObjArr, ObjObj(x) - returns true/false if x is an array of arrays, array of objects, etc

// isVal( x) - returns true/false if x is actual data, i.e. null, boolean, number, big int, or string
// isBlank( x) - returns true/false if x is blank:
// x is null or undefined
// x is a string and is either empty or contains only whitespace
// x is an array but has no elements
// x is an object but has no keys

// or( x, a) returns true if x matches any item in array a
// isHex(x) returns true/false if x is a hexadecimal number
// isWord(x) returns true/false if s is a word - containing only letters and -
// isRGB(x) - returns if RGB is an array containing 3 numbers between 0 and 255
// isHexColour(x) - returns true/false if h is a hexadecimal colour code

// rxFlags( r) - returns a string containing flags attached to a Regular Expression
// isRxFlag( rx, c) - returns true/false if c is present in Regular Expression (rx) flags

window[window['__wheel2_locator']].op.load(new class /* op */ {
	// Nullish things
	isUndef(x) { return typeof x === 'undefined' }
	isNull(x) { return x === null; }
	isNullish(x) { return this.isNull(x) || this.isUndef(x); }

	// Primitives
	isBool(x) { return typeof x === 'boolean' || x instanceof Boolean; }
	isNum(x) { return typeof x === 'number' || x instanceof Number; }
	isWholeNum(x) { return Number.isInteger(x); }
	isStr(x) { return typeof x === 'string' || x instanceof String; }
	isPrim(x) { return this.isBool(x) || this.isNum(x) || this.isStr(x); }

	/* Objects */
	isArr(x) { return Array.isArray(x); }
	isObj(x) { return !this.isUndef(x) && !this.isNull(x) && x.__proto__ === {}.__proto__; }
	isRx(x) { return x instanceof RegExp; }
	isDate(x) { return x instanceof Date; }
	isFn(x) { return typeof x === 'function'; }

	/* Bigger Objects */
	isArrArr(x) {
		if (!this.isArr(x)) return false;

		for (let e of x) {
			if (!this.isArr(e)) return false;
		}

		return true;
	}

	isArrObj(x) {
		if (!this.isArr(x)) return false;

		for (let e of x) {
			if (!this.isObj(e)) return false;
		}

		return true;
	}

	isObjArr(x) {
		if (!this.isObj(x)) return false;

		for (let k of Object.keys(x)) {
			if (!this.isArr(x[k])) return false;
		}

		return true;
	}

	isObjObj(x) {
		if (!this.isObj(x)) return false;

		for (let k of Object.keys(x)) {
			if (!this.isObj(x[k])) return false;
		}

		return true;
	}

	/* Data type tests */
	isBlank(x) {
		if (this.isNull(x)) return true;
		if (this.isStr(x)) return !x.trim();
		if (this.isArr(x)) return !x.length;
		if (this.isObj(x)) return !Object.keys(x).length;

		return this.isUndef(x);
	}

	isHex(x) {
		if (this.isWholeNum(x)) return true;
		if (!this.isStr(x)) return false;

		for (let i = 0; i < x.length; i++) {
			const code = x.charCodeAt(i);

			// a-f, A-F, 0-9
			if (!((code >= 97 && code <= 102) || (code >= 65 && code <= 70) || (code >= 48 && code <= 57))) {
				return false;
			}
		}

		return true;
	}

	isWord(x) {
		if (!this.isStr(x)) return false;

		for (let i = 0; i < x.length; i++) {
			const code = x.charCodeAt(i);

			// a-z, A-Z, -
			if (!((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || code == 45)) {
				return false;
			}
		}

		return true;
	}

	#between = (n, x, y) => { return n >= x && n <= y; }
	isRGB(rgb) {
		// Fail if not an array of 3
		if (!this.isArr(rgb) || rgb.length != 3) {
			return false;
		}

		for (let n of rgb) {
			if (!this.isWholeNum(n)) return false;
			if (!this.#between(n, 0, 255)) return false;

		}

		return true;
	}

	isHexColour(x) {
		if (!this.isStr(x)) return false;

		if (x[0] === '#') {
			x = x.substr(1);
		}

		return this.isHex(x) && x.length == 3 || x.length == 4 || x.length == 6 || x.length == 8;
	}

	isRxFlag(rx, c) {
		if (!this.isRx(rx)) return false;
		if (!this.isStr(c) || c.length != 1) return false;
		return rx.flags.indexOf(c.toLowerCase()) !== -1;
	}

	or(x, a) {
		if (!this.isArr(a)) return false;

		for (let e of a) {
			if (x === e) return true;
		}

		return false;
	}
});
