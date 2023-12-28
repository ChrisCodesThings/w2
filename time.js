// w2.stopw:

// start( n (optional)) - start timer with name n, returns timer name if not specified
// stop( n (optional)) - stop timer with name n and return time taken in ms

// time( c, a, f) - times how long to execute a function 
// c - number of times to iterate
// a - array of arguments to pass to function, iteration count passed as last argument
// f - function to execute
// Returns: time take in ms

window[window['__wheel2_locator']].tm.load(new class {
	#timers = {};

	#defName() { return "timer" + (+new Date()).toString(); }
	#last() { return Object.keys(this.#timers)[Object.keys(this.#timers).length - 1]; }
	#getTime(n) { return (+new Date() - this.#timers[n]) || 0; }

	start(n = this.#defName()) { this.#timers[n] = +new Date(); return n; }

	split(n = this.#last()) { return this.#getTime(n); }

	stop(n = this.#last()) {
		const time = this.#getTime(n);
		if (time) delete this.#timers[n];
		return time;
	}

	time(c, a, f) {
		let n = this.start();

		for (let i = 0; i < c; i++)
			f.apply(null, [].concat(a, i));

		return this.stop(n);
	}
});

