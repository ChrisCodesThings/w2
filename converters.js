// w2.conv:

// decToHex( n) - returns hexadecimal conversion of n
// hexToDec( h) - returns decimal conversion of h

// hexToRGB( h) - returns array [ r, g, b] of hex triplet converted to RGB values
// RGBToHex( rgb) - returns hex triplet string from array or RGB values

// milesToMetres( m) - convert from miles to metres (UK)
// metresToMiles( m) - convert from metres to miles (UK)

window[window['__wheel2_locator']].cnv.load(new class {
	#w2 = window[window['__wheel2_locator']];

	decToHex(n) { return n.toString(16); }
	hexToDec(h) { return parseInt(h, 16); }

	hexToRGB(h) {
		if (!this.#w2.op.isHexColour(h)) {
			return;
		}

		if (h[0] === '#') {
			h = h.substr(1);
		}

		let s = "";

		// Convert from short 3 characters to full 6
		for (let i = 1; i <= 6; i++) {
			s += h[Math.round(h.length / (6 / i)) - 1];
		}

		return [
			this.hexToDec(s.substr(0, 2)),
			this.hexToDec(s.substr(2, 2)),
			this.hexToDec(s.substr(4, 2)),
		];
	}

	RGBToHex(rgb) {
		if (!this.#w2.op.isRGB(rgb)) {
			return;
		}

		let h = '#';

		h += this.decToHex(rgb[0]).padStart(2, '0')
		h += this.decToHex(rgb[1]).padStart(2, '0')
		h += this.decToHex(rgb[2]).padStart(2, '0');

		return h;
	}

	milesToMetres(m) { return m * 1609.344; }
	metresToMiles(m) { return m / 1609.344; }

});
