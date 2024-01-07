// w2.str:

// naTrim(str, p (optional)) - trims non alpha characters from ends of string
// p - true/false - default true - allow ending punctuation ? ! .

// last(str) - return last character of str

// left(str, n) - return characters from left of str
// n - number of characters. 
// n > 0 - n characters from left
// n < 0 - characters up to length -n

// right(str, n) - return characters from right of str
// n - number of characters. 
// n > 0 - n characters from right
// n < 0 - characters from length -n

// mid(str, s, n) - return characters from middle of str
// s - start position
// n > 0 - number of characters
// n < 0 - characters from length -n

// before(str, s) - return characters before the first occurence of s within str
// after(str, s) - return characters after the first occurence of s within str

// count(str, s) - returns the number of occurences of s within str

// reverse(str) - reverses str

// deQuote(str) - trim and remove double or single quote marks from s, if present
// capitalize(str) - capitalize first letter of each word in t

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
// Returns: [left, right]


window[window['__wheel2_locator']].str.load(new class /* str */ {
	#w2 = window[window['__wheel2_locator']];

	#isAlphaCode(c) { return (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || (c >= 48 && c <= 57); }

	#findAlpha(str, rev, punc) {
		let pos = -1;

		if (rev) str = this.reverse(str);

		while (++pos < str.length) {
			const code = str.charCodeAt(pos);
			const pmatch = punc ? code == 33 || code == 46 || code == 63 : false;

			if (pmatch || this.#isAlphaCode(code)) {
				break;
			}
		}

		return pos;
	}

	#naTrimS(s) { return s.slice(this.#findAlpha(s)); }
	#naTrimE(s, p) { return s.slice(0, s.length - this.#findAlpha(s, true, p)); }
	naTrim(str, p = true) {
		if (!this.#w2.op.isStr(str)) return str;
		return this.#naTrimS(this.#naTrimE(str, p));
	};

	last(str) {
		if (!this.#w2.op.isStr(str)) return "";
		return str[str.length - 1];
	}

	left(str, n) {
		if (!this.#w2.op.isStr(str)) return "";
		return str.slice(0, n);
	}

	right(str, n) {
		if (!this.#w2.op.isStr(str)) return "";
		if (!n) return "";
		return str.slice(-n);
	}

	mid(str, p, n) {
		if (!this.#w2.op.isStr(str)) return "";
		if (!n) n = str.length - p;
		return str.slice(p, (n > 0 ? p + n : n));
	}

	before(str, s) {
		if (!this.#w2.op.isStr(str)) return "";
		if (!this.#w2.op.isStr(s)) return str;
		return str.substr(0, str.indexOf(s)) || str;
	}

	after(str, s) {
		if (!this.#w2.op.isStr(str)) return "";
		if (!this.#w2.op.isStr(s)) return "";
		let p = str.indexOf(s);
		if (p == -1) p = str.length;
		return str.slice(s.length + p);
	}

	count(str, s) {
		if (!this.#w2.op.isStr(str)) return 0;
		if (!this.#w2.op.isStr(s)) return 0;
		return str.split(s).length - 1;
	}

	reverse(str) {
		if (!this.#w2.op.isStr(str)) return "";
		return str.split("").reverse().join("");
	}

	deQuote(str) {
		if (!this.#w2.op.isStr(str)) return "";

		str = str.trim();

		const firstCode = str.charCodeAt(0);
		const quotes = (firstCode == 34 || firstCode == 39) && str[0] == this.last(str);

		return (quotes ? str.slice(1, -1).trim() : str);
	}

	capitalizeWord(w) {
		if (!this.#w2.op.isWord(w)) return w;
		return w[0].toUpperCase() + w.slice(1).toLowerCase();
	}

	capitalize(str) {
		let words = str.split(" ");

		for (let i = 0; i < words.length; i++) {
			words[i] = this.capitalizeWord(words[i]);
		}

		return words.join(" ");
	}

	splitAt(s, i) {
		let l, r;

		if (this.#w2.op.isStr(i)) {
			return [this.before(s, i), this.after(s, i)];
		}

		return [this.left(s, i), this.right(s, -i)];
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
});


function test(str) {
	let code = str.charCodeAt(0);
	while (
		!(code >= 65 && code <= 90)
		&& !(code >= 97 && code <= 122)
		&& !(code >= 48 && code <= 57)
	) {
		str = str.slice(1);
		code = str.charCodeAt(0);
	}

	return str;
}