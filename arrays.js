// w2.arr:

// isArr( a) - returns true/false if a is an array
// last( a) - returns the last item in a

// shove( ...) - a more aggressive push: returns an array with everything shoved into it, nested arrays will be unnested
// deBlank( a) - returns an array with all blank elements from a removed, according to Wheel 2.0 Operators.isBlank
// trim( a) - returns an array with all string elements trimmed

// flatten( a, i) - returns an array containing:
// a is array of arrays - a list of index i from nested arrays
// a is array of objects - a list of properties p from nested objects

// min/max( a, i) - returns:
// a is flat array - index of min/max value
// a is array of arrays - index of array with min/max value at position i
// a is array of objects - index of array with min/max property i

window[window['__wheel2_locator']].arr.load(new class {
	#w2 = window[window['__wheel2_locator']];

	last(a) { return a[a.length - 1]; }

	shove() {
		let arr = [];

		const shoveArr = (arr1) => {
			let arr2 = [];

			for (let a of arr1) {
				if (this.#w2.op.isArr(a))
					arr2.push(...shoveArr(a));

				else arr2.push(a);
			}

			return arr2;
		};

		for (let a of arguments) {
			if (this.isArr(a))
				arr.push(...shoveArr(a));

			else arr.push(a);
		}

		return arr;
	}

	deBlank(a) {
		let arr = [];

		for (let i of a)
			if (!w2.op.isBlank(i))
				arr.push(i);

		return arr;
	}

	trim(a) {
		let arr = [];

		for (let i of a)
			if (this.#w2.op.isStr(i))
				arr.push(i.trim());

			else
				arr.push(i);

		return arr;
	}

	flatten(a, i) {
		let arr = [];

		// if we have array of objects or array of arrays
		if (this.#w2.op.isArrArr(a) || this.#w2.op.isArrObj(a))
			for (let o of a)
				arr.push(o[i]);

		return arr;
	}

	min(a, i) { return this.#minmaxcore(a, i, (a, b) => { return a > b }); }
	max(a, i) { return this.#minmaxcore(a, i, (a, b) => { return a < b }); }

	#minmaxcore(a, i, f) {
		let vals = [];

		// check if we've been given an object to look through
		if (this.#w2.op.isArr(a) && i)
			vals = this.flatten(a, i);

		// else already a flat array
		else vals = a;

		if (!vals.length) return;

		let val;
		let idx;

		for (let v in vals) {
			if (!this.#w2.op.isNum(vals[v]))
				continue;

			if (this.#w2.op.isUndef(val))
				val = vals[v];

			if (f.call(this, val, vals[v])) {
				val = vals[v];
				idx = v;
			}
		}

		return idx;
	}

	pickOne(arr) {
		return arr[Math.round(Math.random() * (arr.length - 1))];
	}

});


// Todo:
// gt - is any value greater than
// lt - is any value less than
// eq - is any value equal to
// deDupe - remove duplicates
