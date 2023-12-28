// w2.obj:

// isObj( o) - returns true/false if o is an Object, but not an Array, Date, or RegExp

// first( o) - returns first property of o
// nth( o, n) - returns the nth property of o
// last( o) - returns last property of o

// flatten( o, p) - returns an array containing:
// o is object of arrays - a list of index p from nested arrays
// o is object of objects - a list of named properties p from nested objects

window[window['__wheel2_locator']].obj.load(new class {
	#w2 = window[window['__wheel2_locator']];

	isObj(o) { return this.#w2.op.isObj(o); }

	first(o) { return o[Object.keys(o)[0]]; }
	nth(o, n) { return o[Object.keys(o)[n]]; }
	last(o) { return o[Object.keys(o)[Object.keys(o).length - 1]]; }

	flatten(o, p) {
		let arr = [];

		// if we have object of arrays or object of objects
		if (this.#w2.op.isObjArr(o) || this.#w2.op.isObjObj(o))
			for (let i of Object.keys(o))
				arr.push(o[i][p]);

		return arr;
	}

});

// Todo:
// min - return min of object[prop]
// max - return min of object[prop]
// eq - return if 2 objects properties are equal

