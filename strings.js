// w2.str:

// naTrim(str, p?) - trims non alpha characters from ends of string
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
// capitalizeWord(w) - capitalizes the first letter of a word
// capitalize(str) - capitalize first letter of each word in str

// splitAt(str, x) - splits string str at position x
// x is string - splits either side of string
// x is number - splits at that index
// Returns: [left, right]

// chop( str, x, y) - remove characters from str
// x, y > 0 - remove y characters at position x
// x, y < 0 - remove length -y characters at position x
// Returns: str with characters removed

// splice( str, x, y?) - return and remove characters from str
// x is Regex - matches Regular Expression, returned removed text as array of matches
// x is number, y > 0 - remove y characters at position x
// x is number, y < 0 - remove length -y characters at position x
// Returns: [ remaining text, removed text]


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
		const p = str.indexOf(s);
		return p >= 0 ? str.substr(0, p) : str;
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
		if (!this.#w2.op.isStr(str)) return str;
		let words = str.split(" ");

		for (let i = 0; i < words.length; i++) {
			words[i] = this.capitalizeWord(words[i]);
		}

		return words.join(" ");
	}

	splitAt(str, x) {
		if (!this.#w2.op.isStr(str)) return ["", ""];

		if (this.#w2.op.isStr(x)) {
			return [this.before(str, x), this.after(str, x)];
		}

		return [this.left(str, x), str.slice(x)];
	}

	chop(str, x, y) {
		if (!this.#w2.op.isStr(str)) return "";
		return str.replace(y >= 0 ? str.substr(x, y) : str.slice(x, y), "");
	}

	#spliceRx(str, rx) {
		let matches = [];

		for (let m of str.match(rx) || []) {
			matches.push(m);
			str = str.replace(m, "");
		}

		return [str, matches];
	}

	#spliceXY(str, x, y) {
		const s = y >= 0 ? str.substr(x, y) : str.slice(x, y);
		return [str.replace(s, ""), s];
	}

	splice(str, x, y) {
		if (this.#w2.op.isStr(str)) {
			if (this.#w2.op.isRx(x)) return this.#spliceRx(str, x);
			if (this.#w2.op.isWholeNum(x) && this.#w2.op.isWholeNum(y)) return this.#spliceXY(str, x, y);
		}

		return [str, ""];
	}
});
