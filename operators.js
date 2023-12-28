
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
// isUpper( s) returns true/false if s is entirely an upper case string
// isLower( s) returns true/false if s is entirely a lower case string
// isWord( s) returns true/false if s is a word - containing only letters and -
// isRGB( rgb) - returns if RGB is an array containing 3 numbers between 0 and 255
// isHexColour( h) - returns true/false if h is a hexadecimal colour code

// rxFlags( r) - returns a string containing flags attached to a Regular Expression
// isRxFlag( rx, c) - returns true/false if c is present in Regular Expression (rx) flags

window[window['__wheel2_locator']].op.load(new class {
	// Nullish things
	isUndef(x) { return typeof x === 'undefined' }
	isNull(x) { return x === null; }
	isNullish(x) { return this.isNull(x) || this.isUndef(x); }

	// Primitives
	isBool(x) { return typeof x === 'boolean' || x instanceof Boolean; }

	isNum(x) {
		if (this.isStr(x) || this.isArr(x)) return false;	// "" and [number] will report as number
		return !isNaN(Number(x));
	}

	isWholeNum(x) { return this.isNum(x) && Number.isInteger(x); }
	isStr(x) { return typeof x === 'string' || x instanceof String; }
	isPrim(x) { return this.isBool(x) || this.isNum(x) || this.isStr(x); }

	/* Objects */
	isArr(x) { return Array.isArray(x); }
	isObj(x) { return x.__proto__ == {}.__proto__; }
	isRx(x) { return x instanceof RegExp; }
	isDate(x) { return x instanceof Date; }
	isFn(x) { return typeof x === 'function'; }

	/* Bigger Objects */
	isArrArr(x) { return this.isArr(x) && this.isArr(x[0]); }
	isArrObj(x) { return this.isArr(x) && this.isObj(x[0]); }
	isObjArr(x) { return this.isObj(x) && this.isArr(x[Object.keys(x)[0]]); }
	isObjObj(x) { return this.isObj(x) && this.isObj(x[Object.keys(x)[0]]); }

	/* Data type tests */
	isBlank(x) {
		if (this.isNull(x)) return true;
		if (this.isStr(x)) return !x.trim();
		if (this.isArr(x)) return !x.length;
		if (this.isObj(x)) return !Object.keys(x).length;

		return this.isUndef(x);
	}

	isHex(x) { return !x.toString().match(/[^0-9a-f]/i); }
	isUpper(s) { return s.match(/^[A-Z]*$/); }
	isLower(s) { return s.match(/^[a-z]*$/); }
	isWord(s) { return s.match(/^[a-z\-]+$/i); }

	isRGB(rgb) {
		if (!this.isArr(rgb) || rgb.length != 3) {
			return false;
		}

		if (!this.isNum(rgb[0], true) || !this.isNum(rgb[1], true) || !this.isNum(rgb[2], true)) {
			return false;
		}

		const b = (n, x, y) => { return n >= x && n <= y; }

		if (!b(rgb[0], 0, 255) || !b(rgb[1], 0, 255) || !b(rgb[2], 0, 255)) {
			return false;
		}

		return true;
	}

	isHexColour(h) {
		if (h[0] === '#') {
			h = h.substr(1);
		}

		return this.isHex(h) && [3, 6].includes(h.length);
	}

	rxFlags(r) { return r.toString().substring(r.toString().lastIndexOf("/") + 1); }
	isRxFlag(rx, c) {
		for (let l of c)
			if (this.rxFlags(rx).indexOf(l) < 0)
				return false;

		return true;
	}

	or(x, a) { return a.includes(x); }
});

// Todo:
// isDef
