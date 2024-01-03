

// ------------------ //
//     Wheel  2.0     //
//       Loader       //
// ------------------ //

// Creates Wheel 2.0 namespace and loads requested modules

// modules: bitmask up to 0x1ff (loads all modules by default)

// mode:
//  - instant, injects immediately into HTML. Available immediately but causes warnings on load.
//  - async (default), available at onload event.

// namespace: name of the global variable to initialize (defaults to w2)

"use strict";

(() => {
    const LOG_ERROR = 0;
    const LOG_WARN = 1;
    const LOG_INFO = 2;

    function log(type, msg) {
        const err = "Wheel 2 -- " + msg;

        if (type == LOG_ERROR) {
            console.error(err);
        }

        if (type == LOG_WARN) {
            console.warn(err);
        }

        if (type == LOG_INFO) {
            console.log("%c" + err, "background:palegreen");
        }
    }

    let tag;

    for (let s of document.getElementsByTagName("script")) {
        if (s.src.indexOf("/w2.") != -1) {
            tag = s;
        }
    }

    if (!tag) {
        log(LOG_ERROR, "Couldn't find script tag, did you rename w2.js?");
        return;
    }

    const modList = {
        "operators": {
            bit: 1,
            shortname: "op",
            longname: "Operators"
        },

        "strings": {
            bit: 2,
            shortname: "str",
            longname: "Strings",
            dependencies: ['operators'],
        },

        "arrays": {
            bit: 4,
            shortname: "arr",
            longname: "Arrays",
            dependencies: ['operators'],
        },

        "objects": {
            bit: 8,
            shortname: "obj",
            longname: "Objects",
            dependencies: ['operators'],
        },

        "math": {
            bit: 16,
            shortname: "math",
            longname: "Math",
            dependencies: ['operators', 'arrays', 'objects'],
        },

        "converters": {
            bit: 32,
            shortname: "cnv",
            longname: "Converters"
        },

        "time": {
            bit: 64,
            shortname: "tm",
            longname: "Time"
        },

        "elements": {
            bit: 128,
            shortname: "el",
            longname: "Elements",
            dependencies: ['converters', 'strings', 'arrays']
        },

        "gmap": {
            bit: 256,
            shortname: "gmap",
            longname: "Google Maps"
        },
    };

    let bitmask = 0;

    for (let mod of Object.keys(modList)) {
        bitmask += Number(modList[mod].bit);
    }

    const paramList = tag.src.split("?")[1];
    let name = "w2";
    let mode = "async";

    if (paramList) {
        for (let arg of paramList.split("&")) {
            const [key, value] = decodeURI(arg).toLowerCase().split("=");

            if (!['modules', 'mode', 'namespace'].includes(key)) {
                log(LOG_ERROR, "Invalid argument: " + key + ". Must be modules, mode or namespace.");
                continue;
            }

            if (value == "") {
                log(LOG_ERROR, "No value specified for " + key);
                continue;
            }

            if (key == 'namespace') {
                if (value.match(/[^a-z0-9_\-]/)) {
                    log(LOG_ERROR, "Invalid characters in namespace: " + value + ". Must be alpha plus _ and -");
                    continue;
                }

                name = value;
            }

            if (key == 'mode') {
                if (!['instant', 'async'].includes(value)) {
                    log(LOG_ERROR, "Invalid mode specified: " + value + ". Must be: instant, load, defer or import");
                    continue;
                }

                mode = value;
            }

            if (key == 'modules') {
                if (!value.match(/^[0-9a-f]+$/)) {
                    log(LOG_ERROR, "Invalid format specified for modules. Must be a hexadecimal number.");
                    continue;
                }

                let newBitmask = Number("0x" + value);

                if (newBitmask > bitmask) {
                    log(LOG_ERROR, "Value for modules too large: 0x" + value);
                    continue;
                }

                bitmask = newBitmask;
            }
        }
    }

    const modRequested = [];

    for (let mod of Object.keys(modList)) {
        if (bitmask & modList[mod].bit) {
            for (let d of modList[mod].dependencies || []) {
                modRequested.push(d);
            }

            modRequested.push(mod);
        }

        bitmask &= ~modList[mod].bit;
    }

    const nextTag = tag.nextSibling;
    const modLoaded = [];
    const url = tag.src.substring(0, tag.src.lastIndexOf("/") + 1);
    const extEnd = (tag.src.lastIndexOf("?") == -1 ? tag.src.length : tag.src.lastIndexOf("?"));
    const ext = tag.src.substring(url.length + 2, extEnd);

    for (let m of modRequested) {
        if (modLoaded.includes(m)) {
            continue;
        }

        modLoaded.push(m);

        const src = url + m + ext;

        if (mode === "instant") {
            document.write("<script src='" + src + "'></script>");
        }

        if (mode === "async") {
            let e = document.createElement("script");
            e.type = 'text/javascript';
            e.src = src;
            e.async = true;

            if (nextTag) {
                tag.parentNode.insertBefore(nextTag, e);
            } else {
                document.head.appendChild(e);
            }
        }
    }

    let notLoadedProxy = (mod) => {
        return {
            set(target, key, receiver) {
                log(LOG_ERROR, "Can't set " + key);
            },

            get(target, key, receiver) {
                if (key == "load") {
                    return (something) => {
                        window[window['__wheel2_locator']][mod.shortname] = something;
                    };
                }

                log(LOG_ERROR, "The " + mod.longname + " module is not loaded.");
            }
        }
    }

    window['__wheel2_locator'] = name;
    window[window['__wheel2_locator']] = new class {
        constructor() {
            for (let mod of Object.keys(modList)) {
                this[modList[mod].shortname] = new Proxy({}, notLoadedProxy(modList[mod]));
            }
        }

        #version = 1;

        logError(msg) { log(LOG_ERROR, msg); }
        logWarn(msg) { log(LOG_WARN, msg); }
        logInfo(msg) { log(LOG_INFO, msg); }

        hi() { return "Hello!"; }
        version() { return this.#version; }
        undef() { return; }
    };
})();
