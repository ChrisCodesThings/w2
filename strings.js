// w2.str:

// alphaTrim( t, p (optional)) - non alpha trim of start and end as below
// alphaTrimStart( t) - trim non alpha characters from start of t
// alphaTrimEnd( t, p (optional)) - trim non alpha characters from end of t
// p - true/false - default true - allow punctuation ? ! .

// last( str) - return last character of str

// left( str, n) - return characters from left of str
// n - number of characters. 
// n > 0 - n characters from left
// n < 0 - characters up to length -n

// right( str, n) - return characters from right of str
// n - number of characters. 
// n > 0 - n characters from right
// n < 0 - characters from length -n

// mid( str, s, n) - return characters from middle of str
// s - start position
// n > 0 - number of characters
// n < 0 - characters from length -n

// before( str, s) - return characters before the first occurence of s within str
// after( str, s) - return characters after the first occurence of s within str

// starts( str, s) - returns true if str begins with s
// ends( str, e) - returns true if str ends with e
// count( str, s) - returns the number of occurences of s within str

// deQuote( s) - trim and remove double or single quote marks from s, if present
// capitalize( t) - capitalize first letter of each word in t

// splice( str, x, y) - return and remove characters from str
// x is string: match string
// x is number, y is null: x > 0 - characters from left
// x is number, y is null: x < 0 - characters from right
// x is number, y is number - y characters from position starting from x
// x is RegExp - matches Regular Expression, returned removed text as array of matches
// Returns: [ removed text, remaining text]

// chop( str, x, y) - remove characters from str
// x is string - remove string from str
// x > 0, y is null - remove x characters from start of string
// x < 0, y is null - remove x characters from end of string
// x, y - remove y characters from position starting from x
// Returns: str with characters removed

// splitAt( s, i) - splits string s at position i
// i is string - splits either side of string
// i is number - splits at that index
// Returns: [ left, right]


window[window['__wheel2_locator']].str.load(new class {
	#w2 = window[window['__wheel2_locator']];

	alphaTrim(t, p) { return this.alphaTrimStart(this.alphaTrimEnd(t, p)); };
	alphaTrimStart(t) { return t.replace(/^[^\w0-9]+/, ""); };
	alphaTrimEnd(t, p = true) { return t.replace(p ? /[^\w0-9!?.]+$/ : /[^\w0-9]+$/, ""); };

	last(str) { return this.right(str, 1); }
	left(str, n) { return str.substr(0, n >= 0 ? n : str.length + n); }
	right(str, n) { return str.substr(n >= 0 ? str.length - n : -n); }
	mid(str, s, n) { return str.substring(s, (n >= 0 ? s : str.length) + n); }

	before(str, s) { return str.substr(0, str.indexOf(s)) || str; }
	after(str, s) { return str.indexOf(s) != -1 ? str.substr(str.indexOf(s) + s.length) : ""; }

	starts(str, s) { return str.indexOf(s) == 0; }
	ends(str, e) { return this.right(str, e.length) === e; }
	count(str, s) { return str.split(s).length - 1; }

	deQuote(s) {
		let str = s.trim();

		if (["\"", "'"].includes(str[0]) && str[0] == this.last(str)) {
			str = this.mid(str, 1, -1).trim();
		}

		return str;
	}

	capitalizeWord(w) {
		if (!this.#w2.op.isWord(w)) return w;
		return w[0].toUpperCase() + w.substr(1).toLowerCase();
	}

	capitalize(t) {
		let words = [];
		t.split(" ").forEach(w => words.push(this.capitalizeWord(w)));
		return words.join(" ");
	}

	splice(str, x, y) {
		let start = 0;
		let end = 0;
		let matches = [];

		if (this.#w2.op.isStr(x)) {
			start = str.indexOf(x);
			end = start + x.length;

			if (start < 0) {
				return ["", str];
			}

		} else if (this.#w2.op.isNum(x)) {
			if (!y && x > 0) {
				start = 0;
				end = x;

			} else if (!y && x < 0) {
				start = str.length - (-x);
				end = str.length;

			} else if (this.#w2.op.isNum(y)) {
				[start, end] = [x, x + y];
			}

		} else if (this.#w2.op.isRgx(x)) {
			let mm = str.match(x);

			if (mm === null) {
				return ["", str];
			}

			if (!this.#w2.op.isRxFlag(x, "g")) {
				return this.splice(str, mm[0]);
			}

			for (let m of mm) {
				let match;
				[match, str] = this.splice(str, m);
				matches.push(match);
			}

			return [matches, str];
		}

		let removed = str.substring(start, end);
		let remain = str.substr(0, start) + str.substr(end);

		return [removed, remain];
	}

	chop(str, x, y) {
		let start = 0;
		let end = str.length;

		if (this.#w2.op.isStr(x)) {
			return this.splitAt(str, x).join("");
		}

		if (x > 0 && !y) {
			end = x;

		} else if (x < 0 && !y) {
			start = end + x;

		} else {
			start = x;
			end = x + y;
		}

		return str.substr(0, start) + str.substr(end);
	}

	splitAt(s, i) {
		let l, r;

		if (this.#w2.op.isStr(i)) {
			return [this.before(s, i), this.after(s, i)];
		}

		return [this.left(s, i), this.right(s, -i)];
	}

});
