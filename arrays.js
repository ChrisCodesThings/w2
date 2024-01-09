// w2.arr:

// last(arr) - returns the last item in arr
// pushArr(arr, arr2, ...) - pushes the contents of arr2 into arr, returns arr
// shove(arr, ...) - shoves everything into arr, nested arrays will be flattened, returns arr
// withEach(arr, fn) - replace each array element with the return value from fn
// trim( a) - returns an array with all string elements trimmed

// min/max(arr, i?) - returns:
// arr is array - min/max value
// arr is array of arrays:
// - i is number - returns min/max value from index i across all nested arrays
// - i is undefined - min/max value of flattened array

// extract(arrarr, i) - returns an array containing the value at index i of each nested array in arrarr
// pick(arr, n?) - picks n random items from arr. Returns item, or array of items if n > 1
// shuffle(arr) - shuffles arr
// deBlank(arr) - removes all blank items from arr, returns arr
// deDupe(arr) - remove duplicates from arr

window[window['__wheel2_locator']].arr.load(new class /* arr */ {
	#w2 = window[window['__wheel2_locator']];

	last(arr) { return arr[arr.length - 1]; }

	pushArr(arr) {
		for (let i = 1; i < arguments.length; i++) {
			for (let e of arguments[i]) {
				arr.push(e);
			}
		}

		return arr;
	}

	shove(arr) {
		for (let i = 1; i < arguments.length; i++) {
			const arg = arguments[i];

			if (this.#w2.op.isArr(arg)) {
				for (let item of arg.flat(Infinity)) {
					arr.push(item);
				}

				continue;
			}

			arr.push(arg);
		}

		return arr;
	}

	withEach(arr, fn) {
		for (let i = 0; i < arr.length; i++) {
			arr[i] = fn.call(this, arr[i]);
		}

		return arr;
	}

	deBlank(arr) {
		for (let i = 0; i < arr.length; i++) {
			if (w2.op.isBlank(arr[i])) {
				arr.splice(i--, 1);
			}
		}

		return arr;
	}

	trim(arr) {
		this.withEach(arr, i => {
			if (this.#w2.op.isStr(i)) {
				return i.trim();
			}

			return i;
		});

		return arr;
	}

	#minMaxCore(arr, i, minOrMaxFn) {
		if (this.#w2.op.isArrArr(arr)) {
			if (this.#w2.op.isUndef(i)) return minOrMaxFn(...arr.flat(Infinity));
			return minOrMaxFn(...this.extract(arr, i));
		}

		return minOrMaxFn(...arr);
	}

	min(arr, i) { return this.#minMaxCore(arr, i, Math.min); }
	max(arr, i) { return this.#minMaxCore(arr, i, Math.max); }

	extract(arrarr, i) {
		let e = [];

		for (let arr of arrarr)
			e.push(arr[i]);

		return e;
	}

	pick(arr, n = 1) {
		const picks = [];
		const a = Array.from(arr);

		for (let i = 0; i < n; i++) {
			picks.push(a.splice(Math.round(Math.random() * (a.length - 1)), 1)[0]);
		}

		return n > 1 ? picks : picks[0];
	}

	shuffle(arr) {
		const a = Array.from(arr);
		for (let i = 0; i < arr.length; i++) {
			arr[i] = a.splice(Math.round(Math.random() * (a.length - 1)), 1)[0];
		}

		return arr;
	}

	deDupe(arr) { return Array.from(new Set(arr)); }
});

const ukRossOnWyeAverageMonthlyRainfall_2014_2023 = [
	[180.5, 168.1, 43.1, 42.6, 95.2, 57.4, 30.4, 110, 19.7, 93.1, 113, 35.2],
	[113, 35.2, 73, 35.3, 38.4, 14.1, 70.8, 19.3, 42.9, 92.5, 36.3, 38],
	[115.4, 81.6, 68, 42.4, 57.7, 80.7, 10.4, 49.1, 56.9, 23.8, 112.4, 34.4],
	[60, 37.6, 58, 8, 75, 75, 63, 49.8, 45.8, 38.6, 37.2, 98.8],
	[70.4, 22.2, 139.4, 73.2, 80.2, 9, 36.4, 63, 44.4, 56.8, 74, 78.6],
	[25.2, 40, 66.6, 75.8, 43.4, 140, 36.6, 77.8, 84, 139.6, 115.4, 95],
	[73.4, 162.6, 40.8, 44, 4.6, 86, 33.2, 123, 27, 133.2, 58.2, 174.6],
	[96.6, 68.6, 33.2, 19.2, 144.8, 38.6, 72.2, 32.6, 82, 131.2, 9.2, 58.8],
	[16.2, 86.2, 35.4, 16.4, 35.8, 50, 22, 27.4, 48.1, 94.7, 150.4, 65.4],
	[75.2, 7.2, 124.2, 62.2, 33.8, 37.8, 63.2, 42.4, 45.8, 137, 80.8, 130.6],
];
