// w2.el:

// writebr( t) - document.write with a br tag on the end

// colourFade( c, f) - returns a colour code for a colour faded towards black or white
// c - colour code, can be RGB array or hex colour code
// f - fade amount from reference point 1 - 0 is black, 2 is white.
//     e.g. 1.5 will fade 50% towards white. 0.8 will fade 20% towards black.

// create({}) - returns a new text node or element
// innerText - text - specify ONLY this for a text node
// ...or for an element...
// tag - name of HTML tag
// children - array - child elements
// listeners - array - event handlers
// anything else - passed as property to new element
// Returns: elememt

window[window['__wheel2_locator']].el.load(new class {
	#w2 = window[window['__wheel2_locator']];

	writebr(t) {
		if (typeof t === 'undefined') t = "";
		document.write(...t, "<br>");
	}

	colourFade(c, f) {
		if (w2.op.isHexColour(c))
			return this.colourFadeHex(c, f);

		if (w2.op.isRGB(c))
			return this.colourFadeRGB(c, f);

		return;
	}

	colourFadeRGB(rgb, f) {
		f--;

		if (f > 1 || f < -1) return rgb;

		let target;

		if (f > 0) target = 255;
		if (f < 0) target = 0;

		return [
			rgb[0] + Math.floor(this.#w2.math.diff(rgb[0], target) * f),
			rgb[1] + Math.floor(this.#w2.math.diff(rgb[1], target) * f),
			rgb[2] + Math.floor(this.#w2.math.diff(rgb[2], target) * f),
		];
	}

	colourFadeHex(h, f) { return this.#w2.conv.RGBToHex(this.colourFadeRGB(this.#w2.conv.hexToRGB(h), f)); }

	make(o) { return this.create(o); }
	create(o) {
		if (!o.tag) {
			return document.createTextNode(o.text);
		}

		let e = document.createElement(o.tag);
		let c = o.children;
		let l = o.listeners;

		delete o.tag;
		delete o.children;
		delete o.listeners;

		Object.assign(e, o);

		if (c) for (let n of c) e.appendChild(n);
		if (l) for (let t of l) e.addEventListener(t.when, t.do);

		return e;
	}

});
