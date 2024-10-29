! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Depicter = e()
}(this, function() {
    "use strict";

    function s(e, t) {
        var i, s = Object.keys(e);
        return Object.getOwnPropertySymbols && (i = Object.getOwnPropertySymbols(e), t && (i = i.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        })), s.push.apply(s, i)), s
    }

    function x(e) {
        for (var t = 1; t < arguments.length; t++) {
            var i = null != arguments[t] ? arguments[t] : {};
            t % 2 ? s(Object(i), !0).forEach(function(t) {
                n(e, t, i[t])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : s(Object(i)).forEach(function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
            })
        }
        return e
    }

    function n(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i, t
    }

    function S(t, e) {
        if (null == t) return {};
        var i, s = function(t, e) {
            if (null == t) return {};
            for (var i, s = {}, n = Object.keys(t), o = 0; o < n.length; o++) i = n[o], 0 <= e.indexOf(i) || (s[i] = t[i]);
            return s
        }(t, e);
        if (Object.getOwnPropertySymbols)
            for (var n = Object.getOwnPropertySymbols(t), o = 0; o < n.length; o++) i = n[o], 0 <= e.indexOf(i) || Object.prototype.propertyIsEnumerable.call(t, i) && (s[i] = t[i]);
        return s
    }

    function e(t, e) {
        return function(t, e) {
            if (e.get) return e.get.call(t);
            return e.value
        }(t, o(t, e, "get"))
    }

    function i(t, e, i) {
        return function(t, e, i) {
            if (e.set) e.set.call(t, i);
            else {
                if (!e.writable) throw new TypeError("attempted to set read only private field");
                e.value = i
            }
        }(t, o(t, e, "set"), i), i
    }

    function o(t, e, i) {
        if (!e.has(t)) throw new TypeError("attempted to " + i + " private field on non-instance");
        return e.get(t)
    }

    function r(t, e, i) {
        ! function(t, e) {
            if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object")
        }(t, e), e.set(t, i)
    }[Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(t => {
            t.hasOwnProperty("remove") || Object.defineProperty(t, "remove", {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                value: function() {
                    this.parentNode && this.parentNode.removeChild(this)
                }
            })
        }),
        function(o, e) {
            try {
                o.querySelector(":scope body")
            } catch (t) {
                ["querySelector", "querySelectorAll"].forEach(s => {
                    const n = e[s];
                    e[s] = function(t) {
                        if (/(^|,)\s*:scope/.test(t)) {
                            var e = this["id"];
                            this.id = "ID_" + Date.now(), t = t.replace(/((^|,)\s*):scope/g, "$1#" + this.id);
                            var i = o[s](t);
                            return this.id = e, i
                        }
                        return n.call(this, t)
                    }
                })
            }
        }(window.document, Element.prototype), void 0 === Node.prototype.replaceChildren && (Node.prototype.replaceChildren = function(t) {
            for (; this.lastChild;) this.removeChild(this.lastChild);
            void 0 !== t && this.append(t)
        });
    class t {
        constructor() {
            this.listeners = {}, this._onceList = [], this.addEventListener = this.on, this.removeEventListener = this.off, this.debugEvents = !1
        }
        trigger(e, i, t = !1) {
            this.debugEvents && console.log(e, i), this.parentEmitter && this.parentEmitter.trigger(t ? this._transformName(e) : e, i), this.listeners && (this.listeners[e] && (i ? i.unshift(e) : i = [e], this.listeners[e].forEach(t => {
                t.callback.apply(t.context, i)
            })), this._onceList.length && (this._onceList = this._onceList.filter(t => t.name !== e || (this.off(t.name, t.callback, t.context), !1))))
        }
        on(e, i, s, n = 0) {
            if (-1 === e.indexOf(",")) {
                this.listeners[e] || (this.listeners[e] = []);
                let t = this.listeners[e];
                t.find(t => t.callback === i && t.context === s && t.priority === n) || (t.push({
                    callback: i,
                    priority: n,
                    context: s
                }), t = t.sort((t, e) => t.priority > e.priority ? 1 : t.priority < e.priority ? -1 : 0))
            } else e.replace(/\s*/g, "").split(",").forEach(t => {
                this.on(t, i, s, n)
            })
        }
        once(t, e, i, s) {
            this.on(t, e, i, s), this._onceList.push({
                name: t,
                callback: e,
                context: i
            })
        }
        off(t, e, i) {
            if (-1 === t.indexOf(",")) {
                const s = this.listeners[t];
                s && s.length && (this.listeners[t] = s.filter(t => t.callback !== e || t.context !== i))
            } else t.replace(/\s*/g, "").split(",").forEach(t => {
                this.off(t, e, i)
            })
        }
        offOnContext(e) {
            Object.keys(this.listeners).forEach(t => {
                this.listeners[t] = this.listeners[t].filter(t => t.context !== e)
            })
        }
        offByName(t) {
            this.listeners[t] && (this.listeners[t] = void 0)
        }
        _transformName(t) {
            return this.eventPrefix && this.eventPrefix.length ? this.eventPrefix + t.slice(0, 1).toUpperCase() + t.slice(1) : t
        }
    }
    const l = "depicter",
        a = "ontouchstart" in document,
        c = Object.prototype.hasOwnProperty,
        h = {
            mobile: 767,
            tablet: 1024
        },
        d = Object.keys(h).sort((t, e) => h[e] - h[t]),
        p = () => {
            const i = window.innerWidth;
            let s = null,
                n = -1;
            return [...d].reverse().some((t, e) => i <= h[t] && (s = t, n = d.length - e - 1, !0)), {
                name: s,
                index: n,
                size: h[s] || i
            }
        };
    let u = null;
    window.addEventListener("resize", () => {
        u = p().name
    });
    const m = new class extends t {
            constructor() {
                super(), this.update = this.update.bind(this), window.addEventListener("resize", this.update), this.activeBreakpoint = null, this.activeBreakpointIndex = null, this.activeBreakpointSize = null, this.update()
            }
            update(t) {
                if (t) return clearTimeout(this._resizeTimeout), void(this._resizeTimeout = setTimeout(this.update, 20));
                var {
                    name: e,
                    index: i,
                    size: t
                } = p();
                e !== this.activeBreakpoint && (this.activeBreakpoint = e, this.activeBreakpointIndex = i, this.activeBreakpointSize = t, this.trigger("breakpointChange", [e, i, t]))
            }
        },
        g = (t, e) => {
            e = e || p().name;
            var i = d.indexOf(e);
            if (Array.isArray(t)) {
                if (0 === t.length) return;
                var s = t[i + 1];
                return !s && !1 !== s || "string" == typeof s && !s.length ? "none" === e ? void 0 : g(t, 1 <= i ? d[i - 1] : "none") : s
            }
            return "object" == typeof(t = c.call(t, "toObject") ? t.toObject() : t) ? c.call(t, e) ? t[e] : "none" === e ? void 0 : g(t, 1 <= i ? d[i - 1] : "none") : t
        },
        v = (e, i) => {
            const s = {};
            return e.hasAttribute(`data-${i}`) && (s.none = e.getAttribute(`data-${i}`)), d.forEach(t => {
                e.hasAttribute(`data-${t}-${i}`) && (s[t] = e.getAttribute(`data-${t}-${i}`))
            }), s
        },
        f = (t, i) => {
            const s = [];
            let n;
            t.forEach((t, e) => ((t, i) => {
                let s = t;
                if (Array.isArray(t)) {
                    if (1 === t.length) return void i(t[0]);
                    s = t.slice()
                } else {
                    if ("string" != typeof t || !t.includes(",")) return void i(s);
                    s = t.split(",").map(t => t.trim())
                }
                let n;
                t = (t, e) => {
                    e = g(s, e);
                    e !== n && (n = e, i(e))
                };
                m.on("breakpointChange", t), t(0, m.activeBreakpoint)
            })(t, t => {
                s[e] = t, clearTimeout(n), n = setTimeout(() => {
                    i(s)
                }, 1)
            }))
        };
    class y {
        constructor(t, e, i) {
            this.composer = t, this.options = i, this.view = e, this.innerContainers = {}, this.outerContainers = {}, this._matchHeightList = [], this.options.register({
                layout: "boxed",
                stretchWidth: !1,
                width: 900,
                height: 500,
                columns: 1,
                rtl: !1,
                keepAspectRatio: !0,
                delayBeforeResize: 0,
                fullscreenMargin: 0,
                narrowLayoutOn: "mobile",
                overflowFix: !0
            }), this.primaryContainer = document.createElement("div"), this.primaryContainer.classList.add(`${l}-primary-container`), this.composer.element.appendChild(this.primaryContainer), this.viewContainer = document.createElement("div"), this.viewContainer.classList.add(`${l}-view-container`), this.view.appendTo(this.viewContainer), this.primaryContainer.appendChild(this.viewContainer), this.view.options.has("reverse") && (e = this.options.get("rtl"), this.view.options.set("reverse", e), e && this.composer.element.classList.add(`${l}-rtl`), this.options.observe("rtl", (t, e) => {
                this.view.options.set("reverse", e), this.composer.element.classList[e ? "add" : "remove"](`${l}-rtl`)
            })), this.update = this.update.bind(this), window.addEventListener("resize", this.update, !1), requestAnimationFrame(this.update), this.update()
        }
        update(e) {
            var t = this.options.get("delayBeforeResize");
            if (e && 0 < t) return clearTimeout(this._resizeTimeout), void(this._resizeTimeout = setTimeout(this.update, t));
            var i = this.options.get(["layout", "width", "height", "maxHeight", "minHeight", "fullscreenMargin", "overflowFix", "narrowLayoutOn"]);
            const s = this.composer.element;
            s.classList.add(`${l}-layout-${i.layout}`);
            var {
                name: n,
                size: e
            } = p();
            switch (n !== this.activeBreakpoint && (this.activeBreakpoint && this.composer.element.classList.remove(`${l}-bp-${this.activeBreakpoint}`), null !== (this.activeBreakpoint = n) && this.composer.element.classList.add(`${l}-bp-${n}`), this.activeBreakpointSize = n ? e : g(i.width, n)), this.isNarrow = n === i.narrowLayoutOn, this._lastNarrowStatus !== this.isNarrow && (this.isNarrow ? s.classList.add(`${l}-narrow-layout`) : s.classList.remove(`${l}-narrow-layout`), this._lastNarrowStatus = this.isNarrow), i.layout) {
                case "fullscreen":
                    i.overflowFix && document.body.classList.add(`${l}-overflow-fix`);
                case "fullwidth":
                    s.style.width = document.body.clientWidth + "px", requestAnimationFrame(() => {
                        s.style.marginLeft = "";
                        var t = -(window.scrollX + Math.ceil(s.getBoundingClientRect().left)) + "px";
                        s.style.marginLeft = t;
                        try {
                            s.style.setProperty("margin-left", t, "important")
                        } catch (t) {}
                        s.style.width = document.body.clientWidth + "px"
                    });
                    break;
                case "boxed":
                    s.style.maxWidth = g(i.width, n) + "px"
            }
            t = s.offsetWidth;
            if ("fullscreen" === i.layout) {
                e = window.innerHeight;
                if (i.fullscreenMargin) {
                    let t = window.scrollY + Math.ceil(s.getBoundingClientRect().top);
                    "auto" === i.fullscreenMargin && .75 <= t / window.innerHeight ? t = 0 : "auto" !== i.fullscreenMargin && (t = i.fullscreenMargin), s.style.height = `${e-t}px`
                } else s.style.height = `${e}px`
            }
            this.composer.trigger("beforeViewResize", [this]), this.view.resize(), this._updateMatchHeights(), t === this.width && this.height === s.offMatchHeight || (this.width = t, this.height = s.offsetHeight, this.composer.trigger("resize")), this.composer.trigger("layoutUpdate", [this])
        }
        getContainer(t) {
            if ("string" != typeof t) return !1;
            var e = -1 !== (t = t.toLowerCase()).indexOf("inner"),
                i = t.replace("inner", ""),
                t = e ? this.innerContainers : this.outerContainers;
            return c.call(t, i) || this._createContainer(i, e), t[i]
        }
        onMatchHeight(t) {
            this._matchHeightList.push(t), this._updateMatchHeights()
        }
        offMatchHeight(t) {
            t.style.height = "", this._matchHeightList.splice(this._matchHeightList.indexOf(t), 1)
        }
        _updateMatchHeights() {
            this._matchHeightList.forEach(t => {
                t.style.height = this.slider.view.height + "px"
            })
        }
        _createContainer(t, e) {
            const i = document.createElement("div");
            i.classList.add(`${l}-${t}-container`), e ? (this.hasInnerBox || (this.hasInnerBox = !0, this.innerBox = document.createElement("div"), this.innerBox.classList.add(`${l}-inner-container`), this.innerBox.appendChild(this.viewContainer), (this.hasMidRow ? this.midRow : this.primaryContainer).appendChild(this.innerBox)), this.innerContainers[t] = i, "right" === t || "left" === t ? (this.hasInnerMidRow || (this.hasInnerMidRow = !0, this.innerMidRow = document.createElement("div"), this.innerMidRow.classList.add(`${l}-mid-row`), this.innerMidRow.appendChild(this.viewContainer), this.innerBox.appendChild(this.innerMidRow)), this.innerMidRow.appendChild(i)) : this.innerBox.appendChild(i)) : (this.outerContainers[t] = i, "right" === t || "left" === t ? (this.hasMidRow || (this.hasMidRow = !0, this.midRow = document.createElement("div"), this.midRow.classList.add(`${l}-mid-row`), this.midRow.appendChild(this.hasInnerBox ? this.innerBox : this.viewContainer), this.primaryContainer.appendChild(this.midRow)), this.midRow.appendChild(i)) : this.primaryContainer.appendChild(i)), this.update()
        }
    }
    var _ = {
            update: null,
            begin: null,
            loopBegin: null,
            changeBegin: null,
            change: null,
            changeComplete: null,
            loopComplete: null,
            complete: null,
            loop: 1,
            direction: "normal",
            autoplay: !0,
            timelineOffset: 0
        },
        b = {
            duration: 1e3,
            delay: 0,
            endDelay: 0,
            easing: "easeOutElastic(1, .5)",
            round: 0
        },
        w = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"],
        A = {
            CSS: {},
            springs: {}
        };

    function E(t, e, i) {
        return Math.min(Math.max(t, e), i)
    }

    function C(t, e) {
        return -1 < t.indexOf(e)
    }

    function k(t, e) {
        return t.apply(null, e)
    }
    var L = {
        arr: function(t) {
            return Array.isArray(t)
        },
        obj: function(t) {
            return C(Object.prototype.toString.call(t), "Object")
        },
        pth: function(t) {
            return L.obj(t) && t.hasOwnProperty("totalLength")
        },
        svg: function(t) {
            return t instanceof SVGElement
        },
        inp: function(t) {
            return t instanceof HTMLInputElement
        },
        dom: function(t) {
            return t.nodeType || L.svg(t)
        },
        str: function(t) {
            return "string" == typeof t
        },
        fnc: function(t) {
            return "function" == typeof t
        },
        und: function(t) {
            return void 0 === t
        },
        nil: function(t) {
            return L.und(t) || null === t
        },
        hex: function(t) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
        },
        rgb: function(t) {
            return /^rgb/.test(t)
        },
        hsl: function(t) {
            return /^hsl/.test(t)
        },
        col: function(t) {
            return L.hex(t) || L.rgb(t) || L.hsl(t)
        },
        key: function(t) {
            return !_.hasOwnProperty(t) && !b.hasOwnProperty(t) && "targets" !== t && "keyframes" !== t
        }
    };

    function I(t) {
        t = /\(([^)]+)\)/.exec(t);
        return t ? t[1].split(",").map(function(t) {
            return parseFloat(t)
        }) : []
    }

    function $(s, i) {
        var t = I(s),
            e = E(L.und(t[0]) ? 1 : t[0], .1, 100),
            n = E(L.und(t[1]) ? 100 : t[1], .1, 100),
            o = E(L.und(t[2]) ? 10 : t[2], .1, 100),
            t = E(L.und(t[3]) ? 0 : t[3], .1, 100),
            r = Math.sqrt(n / e),
            a = o / (2 * Math.sqrt(n * e)),
            h = a < 1 ? r * Math.sqrt(1 - a * a) : 0,
            l = a < 1 ? (a * r - t) / h : -t + r;

        function c(t) {
            var e = i ? i * t / 1e3 : t,
                e = a < 1 ? Math.exp(-e * a * r) * (+Math.cos(h * e) + l * Math.sin(h * e)) : (1 + l * e) * Math.exp(-e * r);
            return 0 === t || 1 === t ? t : 1 - e
        }
        return i ? c : function() {
            var t = A.springs[s];
            if (t) return t;
            for (var e = 0, i = 0;;)
                if (1 === c(e += 1 / 6)) {
                    if (16 <= ++i) break
                } else i = 0;
            return t = e * (1 / 6) * 1e3, A.springs[s] = t
        }
    }

    function O(e) {
        return void 0 === e && (e = 10),
            function(t) {
                return Math.ceil(E(t, 1e-6, 1) * e) * (1 / e)
            }
    }
    var T = function(o, e, r, i) {
        if (0 <= o && o <= 1 && 0 <= r && r <= 1) {
            var a = new Float32Array(11);
            if (o !== e || r !== i)
                for (var t = 0; t < 11; ++t) a[t] = M(.1 * t, o, r);
            return function(t) {
                return o === e && r === i || 0 === t || 1 === t ? t : M(s(t), e, i)
            }
        }

        function s(t) {
            for (var e = 0, i = 1; 10 !== i && a[i] <= t; ++i) e += .1;
            var s = e + .1 * ((t - a[--i]) / (a[i + 1] - a[i])),
                n = B(s, o, r);
            return .001 <= n ? function(t, e, i, s) {
                for (var n = 0; n < 4; ++n) {
                    var o = B(e, i, s);
                    if (0 === o) return e;
                    e -= (M(e, i, s) - t) / o
                }
                return e
            }(t, s, o, r) : 0 === n ? s : function(t, e, i, s, n) {
                for (var o, r, a = 0; 0 < (o = M(r = e + (i - e) / 2, s, n) - t) ? i = r : e = r, 1e-7 < Math.abs(o) && ++a < 10;);
                return r
            }(t, e, e + .1, o, r)
        }
    };

    function P(t, e) {
        return 1 - 3 * e + 3 * t
    }

    function M(t, e, i) {
        return ((P(e, i) * t + (3 * i - 6 * e)) * t + 3 * e) * t
    }

    function B(t, e, i) {
        return 3 * P(e, i) * t * t + 2 * (3 * i - 6 * e) * t + 3 * e
    }
    var z, D, V = (z = {
        linear: function() {
            return function(t) {
                return t
            }
        }
    }, D = {
        Sine: function() {
            return function(t) {
                return 1 - Math.cos(t * Math.PI / 2)
            }
        },
        Circ: function() {
            return function(t) {
                return 1 - Math.sqrt(1 - t * t)
            }
        },
        Back: function() {
            return function(t) {
                return t * t * (3 * t - 2)
            }
        },
        Bounce: function() {
            return function(t) {
                for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11;);
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            }
        },
        Elastic: function(t, e) {
            void 0 === e && (e = .5);
            var i = E(t = void 0 === t ? 1 : t, 1, 10),
                s = E(e, .1, 2);
            return function(t) {
                return 0 === t || 1 === t ? t : -i * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - s / (2 * Math.PI) * Math.asin(1 / i)) * (2 * Math.PI) / s)
            }
        }
    }, ["Quad", "Cubic", "Quart", "Quint", "Expo"].forEach(function(t, e) {
        D[t] = function() {
            return function(t) {
                return Math.pow(t, e + 2)
            }
        }
    }), Object.keys(D).forEach(function(t) {
        var s = D[t];
        z["easeIn" + t] = s, z["easeOut" + t] = function(e, i) {
            return function(t) {
                return 1 - s(e, i)(1 - t)
            }
        }, z["easeInOut" + t] = function(e, i) {
            return function(t) {
                return t < .5 ? s(e, i)(2 * t) / 2 : 1 - s(e, i)(-2 * t + 2) / 2
            }
        }, z["easeOutIn" + t] = function(e, i) {
            return function(t) {
                return t < .5 ? (1 - s(e, i)(1 - 2 * t)) / 2 : (s(e, i)(2 * t - 1) + 1) / 2
            }
        }
    }), z);

    function j(t, e) {
        if (L.fnc(t)) return t;
        var i = t.split("(")[0],
            s = V[i],
            n = I(t);
        switch (i) {
            case "spring":
                return $(t, e);
            case "cubicBezier":
                return k(T, n);
            case "steps":
                return k(O, n);
            default:
                return k(s, n)
        }
    }

    function R(t) {
        try {
            return document.querySelectorAll(t)
        } catch (t) {
            return
        }
    }

    function W(t, e) {
        for (var i, s = t.length, n = 2 <= arguments.length ? e : void 0, o = [], r = 0; r < s; r++) r in t && (i = t[r], e.call(n, i, r, t) && o.push(i));
        return o
    }

    function N(t) {
        return t.reduce(function(t, e) {
            return t.concat(L.arr(e) ? N(e) : e)
        }, [])
    }

    function F(t) {
        return L.arr(t) ? t : (t = L.str(t) ? R(t) || t : t) instanceof NodeList || t instanceof HTMLCollection ? [].slice.call(t) : [t]
    }

    function H(t, e) {
        return t.some(function(t) {
            return t === e
        })
    }

    function Y(t) {
        var e, i = {};
        for (e in t) i[e] = t[e];
        return i
    }

    function X(t, e) {
        var i, s = Y(t);
        for (i in t) s[i] = (e.hasOwnProperty(i) ? e : t)[i];
        return s
    }

    function q(t, e) {
        var i, s = Y(t);
        for (i in e) s[i] = (L.und(t[i]) ? e : t)[i];
        return s
    }

    function Z(t) {
        return L.rgb(t) ? (e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(o = t)) ? "rgba(" + e[1] + ",1)" : o : L.hex(t) ? (r = (r = t).replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(t, e, i, s) {
            return e + e + i + i + s + s
        }), r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r), "rgba(" + parseInt(r[1], 16) + "," + parseInt(r[2], 16) + "," + parseInt(r[3], 16) + ",1)") : L.hsl(t) ? (o = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e = t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e), r = parseInt(o[1], 10) / 360, t = parseInt(o[2], 10) / 100, e = parseInt(o[3], 10) / 100, o = o[4] || 1, 0 == t ? i = s = n = e : (i = a(t = 2 * e - (e = e < .5 ? e * (1 + t) : e + t - e * t), e, r + 1 / 3), s = a(t, e, r), n = a(t, e, r - 1 / 3)), "rgba(" + 255 * i + "," + 255 * s + "," + 255 * n + "," + o + ")") : void 0;
        var e, i, s, n, o, r;

        function a(t, e, i) {
            return i < 0 && (i += 1), 1 < i && --i, i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
        }
    }

    function G(t) {
        t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t);
        if (t) return t[1]
    }

    function U(t, e) {
        return L.fnc(t) ? t(e.target, e.id, e.total) : t
    }

    function K(t, e) {
        return t.getAttribute(e)
    }

    function J(t, e, i) {
        if (H([i, "deg", "rad", "turn"], G(e))) return e;
        var s = A.CSS[e + i];
        if (!L.und(s)) return s;
        var n = document.createElement(t.tagName),
            s = t.parentNode && t.parentNode !== document ? t.parentNode : document.body;
        s.appendChild(n), n.style.position = "absolute", n.style.width = 100 + i;
        t = 100 / n.offsetWidth;
        s.removeChild(n);
        t *= parseFloat(e);
        return A.CSS[e + i] = t
    }

    function Q(t, e, i) {
        if (e in t.style) {
            var s = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
                s = t.style[e] || getComputedStyle(t).getPropertyValue(s) || "0";
            return i ? J(t, s, i) : s
        }
    }

    function tt(t, e) {
        return L.dom(t) && !L.inp(t) && (!L.nil(K(t, e)) || L.svg(t) && t[e]) ? "attribute" : L.dom(t) && H(w, e) ? "transform" : L.dom(t) && "transform" !== e && Q(t, e) ? "css" : null != t[e] ? "object" : void 0
    }

    function et(t) {
        if (L.dom(t)) {
            for (var e, i = t.style.transform || "", s = /(\w+)\(([^)]*)\)/g, n = new Map; e = s.exec(i);) n.set(e[1], e[2]);
            return n
        }
    }

    function it(t, e, i, s) {
        var n = C(e, "scale") ? 1 : 0 + (C(n = e, "translate") || "perspective" === n ? "px" : C(n, "rotate") || C(n, "skew") ? "deg" : void 0),
            n = et(t).get(e) || n;
        return i && (i.transforms.list.set(e, n), i.transforms.last = e), s ? J(t, n, s) : n
    }

    function st(t, e, i, s) {
        switch (tt(t, e)) {
            case "transform":
                return it(t, e, s, i);
            case "css":
                return Q(t, e, i);
            case "attribute":
                return K(t, e);
            default:
                return t[e] || 0
        }
    }

    function nt(t, e) {
        var i = /^(\*=|\+=|-=)/.exec(t);
        if (!i) return t;
        var s = G(t) || 0,
            n = parseFloat(e),
            o = parseFloat(t.replace(i[0], ""));
        switch (i[0][0]) {
            case "+":
                return n + o + s;
            case "-":
                return n - o + s;
            case "*":
                return n * o + s
        }
    }

    function ot(t, e) {
        if (L.col(t)) return Z(t);
        if (/\s/g.test(t)) return t;
        var i = G(t),
            t = i ? t.substr(0, t.length - i.length) : t;
        return e ? t + e : t
    }

    function rt(t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
    }

    function at(t) {
        for (var e, i = t.points, s = 0, n = 0; n < i.numberOfItems; n++) {
            var o = i.getItem(n);
            0 < n && (s += rt(e, o)), e = o
        }
        return s
    }

    function ht(t) {
        if (t.getTotalLength) return t.getTotalLength();
        switch (t.tagName.toLowerCase()) {
            case "circle":
                return 2 * Math.PI * K(t, "r");
            case "rect":
                return 2 * K(i = t, "width") + 2 * K(i, "height");
            case "line":
                return rt({
                    x: K(e = t, "x1"),
                    y: K(e, "y1")
                }, {
                    x: K(e, "x2"),
                    y: K(e, "y2")
                });
            case "polyline":
                return at(t);
            case "polygon":
                return e = t.points, at(t) + rt(e.getItem(e.numberOfItems - 1), e.getItem(0))
        }
        var e, i
    }

    function lt(t, e) {
        var i = e || {},
            s = i.el || function(t) {
                for (var e = t.parentNode; L.svg(e) && L.svg(e.parentNode);) e = e.parentNode;
                return e
            }(t),
            n = s.getBoundingClientRect(),
            e = K(s, "viewBox"),
            t = n.width,
            n = n.height,
            e = i.viewBox || (e ? e.split(" ") : [0, 0, t, n]);
        return {
            el: s,
            viewBox: e,
            x: +e[0],
            y: +e[1],
            w: t,
            h: n,
            vW: e[2],
            vH: e[3]
        }
    }

    function ct(t, e) {
        var i = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
            s = ot(L.pth(t) ? t.totalLength : t, e) + "";
        return {
            original: s,
            numbers: s.match(i) ? s.match(i).map(Number) : [0],
            strings: L.str(t) || e ? s.split(i) : []
        }
    }

    function dt(t) {
        return W(t ? N(L.arr(t) ? t.map(F) : F(t)) : [], function(t, e, i) {
            return i.indexOf(t) === e
        })
    }

    function pt(t) {
        var i = dt(t);
        return i.map(function(t, e) {
            return {
                target: t,
                id: e,
                total: i.length,
                transforms: {
                    list: et(t)
                }
            }
        })
    }

    function ut(e) {
        for (var i = W(N(e.map(function(t) {
                return Object.keys(t)
            })), function(t) {
                return L.key(t)
            }).reduce(function(t, e) {
                return t.indexOf(e) < 0 && t.push(e), t
            }, []), n = {}, t = 0; t < i.length; t++) ! function(t) {
            var s = i[t];
            n[s] = e.map(function(t) {
                var e, i = {};
                for (e in t) L.key(e) ? e == s && (i.value = t[e]) : i[e] = t[e];
                return i
            })
        }(t);
        return n
    }

    function mt(t, e) {
        var i, s = [],
            n = e.keyframes;
        for (i in e = n ? q(ut(n), e) : e) L.key(i) && s.push({
            name: i,
            tweens: function(t, i) {
                var e, s = Y(i);
                /^spring/.test(s.easing) && (s.duration = $(s.easing)), L.arr(t) && (2 === (e = t.length) && !L.obj(t[0]) ? t = {
                    value: t
                } : L.fnc(i.duration) || (s.duration = i.duration / e));
                var n = L.arr(t) ? t : [t];
                return n.map(function(t, e) {
                    t = L.obj(t) && !L.pth(t) ? t : {
                        value: t
                    };
                    return L.und(t.delay) && (t.delay = e ? 0 : i.delay), L.und(t.endDelay) && (t.endDelay = e === n.length - 1 ? i.endDelay : 0), t
                }).map(function(t) {
                    return q(t, s)
                })
            }(e[i], t)
        });
        return s
    }

    function gt(a, h) {
        var l;
        return a.tweens.map(function(t) {
            var e = function(t, e) {
                    var i, s = {};
                    for (i in t) {
                        var n = U(t[i], e);
                        L.arr(n) && 1 === (n = n.map(function(t) {
                            return U(t, e)
                        })).length && (n = n[0]), s[i] = n
                    }
                    return s.duration = parseFloat(s.duration), s.delay = parseFloat(s.delay), s
                }(t, h),
                i = e.value,
                s = L.arr(i) ? i[1] : i,
                n = G(s),
                o = st(h.target, a.name, n, h),
                r = l ? l.to.original : o,
                t = L.arr(i) ? i[0] : r,
                o = G(t) || G(o),
                o = n || o;
            return L.und(s) && (s = r), e.from = ct(t, o), e.to = ct(nt(s, t), o), e.start = l ? l.end : 0, e.end = e.start + e.delay + e.duration + e.endDelay, e.easing = j(e.easing, e.duration), e.isPath = L.pth(i), e.isPathTargetInsideSVG = e.isPath && L.svg(h.target), e.isColor = L.col(e.from.original), e.isColor && (e.round = 1), l = e
        })
    }
    var vt = {
        css: function(t, e, i) {
            return t.style[e] = i
        },
        attribute: function(t, e, i) {
            return t.setAttribute(e, i)
        },
        object: function(t, e, i) {
            return t[e] = i
        },
        transform: function(t, e, i, s, n) {
            var o;
            s.list.set(e, i), e !== s.last && !n || (o = "", s.list.forEach(function(t, e) {
                o += e + "(" + t + ") "
            }), t.style.transform = o)
        }
    };

    function ft(t, r) {
        pt(t).forEach(function(t) {
            for (var e in r) {
                var i = U(r[e], t),
                    s = t.target,
                    n = G(i),
                    o = st(s, e, n, t),
                    n = nt(ot(i, n || G(o)), o),
                    o = tt(s, e);
                vt[o](s, e, n, t.transforms, !0)
            }
        })
    }

    function yt(t, i) {
        return W(N(t.map(function(e) {
            return i.map(function(t) {
                return function(t, e) {
                    var i = tt(t.target, e.name);
                    if (i) {
                        var s = gt(e, t),
                            n = s[s.length - 1];
                        return {
                            type: i,
                            property: e.name,
                            animatable: t,
                            tweens: s,
                            duration: n.end,
                            delay: s[0].delay,
                            endDelay: n.endDelay
                        }
                    }
                }(e, t)
            })
        })), function(t) {
            return !L.und(t)
        })
    }

    function _t(t, e) {
        function i(t) {
            return t.timelineOffset || 0
        }
        var s = t.length,
            n = {};
        return n.duration = s ? Math.max.apply(Math, t.map(function(t) {
            return i(t) + t.duration
        })) : e.duration, n.delay = s ? Math.min.apply(Math, t.map(function(t) {
            return i(t) + t.delay
        })) : e.delay, n.endDelay = s ? n.duration - Math.max.apply(Math, t.map(function(t) {
            return i(t) + t.duration - t.endDelay
        })) : e.endDelay, n
    }
    var bt = 0;
    var wt, xt = [],
        St = ("undefined" != typeof document && document.addEventListener("visibilitychange", function() {
            Ct.suspendWhenDocumentHidden && (Et() ? wt = cancelAnimationFrame(wt) : (xt.forEach(function(t) {
                return t._onDocumentVisibility()
            }), St()))
        }), function() {
            wt || Et() && Ct.suspendWhenDocumentHidden || !(0 < xt.length) || (wt = requestAnimationFrame(At))
        });

    function At(t) {
        for (var e = xt.length, i = 0; i < e;) {
            var s = xt[i];
            s.paused ? (xt.splice(i, 1), e--) : (s.tick(t), i++)
        }
        wt = 0 < i ? requestAnimationFrame(At) : void 0
    }

    function Et() {
        return document && document.hidden
    }

    function Ct(t) {
        var o, r = 0,
            a = 0,
            h = 0,
            l = 0,
            c = null;

        function d(t) {
            var e = window.Promise && new Promise(function(t) {
                return c = t
            });
            return t.finished = e
        }
        var e, i, s, n, S = (i = X(_, e = t = void 0 === t ? {} : t), s = mt(n = X(b, e), e), t = pt(e.targets), s = _t(e = yt(t, s), n), n = bt, bt++, q(i, {
            id: n,
            children: [],
            animatables: t,
            animations: e,
            duration: s.duration,
            delay: s.delay,
            endDelay: s.endDelay
        }));

        function p() {
            var t = S.direction;
            "alternate" !== t && (S.direction = "normal" !== t ? "normal" : "reverse"), S.reversed = !S.reversed, o.forEach(function(t) {
                return t.reversed = S.reversed
            })
        }

        function u(t) {
            return S.reversed ? S.duration - t : t
        }

        function m() {
            r = 0, a = u(S.currentTime) * (1 / Ct.speed)
        }

        function g(t, e) {
            e && e.seek(t - e.timelineOffset)
        }

        function v(e) {
            for (var t = 0, i = S.animations, s = i.length; t < s;) {
                var n = i[t],
                    o = n.animatable,
                    r = n.tweens,
                    a = r.length - 1,
                    h = r[a];
                a && (h = W(r, function(t) {
                    return e < t.end
                })[0] || h);
                for (var r = E(e - h.start - h.delay, 0, h.duration) / h.duration, l = isNaN(r) ? 1 : h.easing(r), c = h.to.strings, d = h.round, p = [], u = h.to.numbers.length, m = void 0, g = 0; g < u; g++) {
                    var v = void 0,
                        f = h.to.numbers[g],
                        y = h.from.numbers[g] || 0,
                        v = h.isPath ? function(e, i, t) {
                            function s(t) {
                                return e.el.getPointAtLength(1 <= i + (t = void 0 === t ? 0 : t) ? i + t : 0)
                            }
                            var n = lt(e.el, e.svg),
                                o = s(),
                                r = s(-1),
                                a = s(1),
                                h = t ? 1 : n.w / n.vW,
                                l = t ? 1 : n.h / n.vH;
                            switch (e.property) {
                                case "x":
                                    return (o.x - n.x) * h;
                                case "y":
                                    return (o.y - n.y) * l;
                                case "angle":
                                    return 180 * Math.atan2(a.y - r.y, a.x - r.x) / Math.PI
                            }
                        }(h.value, l * f, h.isPathTargetInsideSVG) : y + l * (f - y);
                    d && (h.isColor && 2 < g || (v = Math.round(v * d) / d)), p.push(v)
                }
                var _ = c.length;
                if (_)
                    for (var m = c[0], b = 0; b < _; b++) {
                        c[b];
                        var w = c[b + 1],
                            x = p[b];
                        isNaN(x) || (m += w ? x + w : x + " ")
                    } else m = p[0];
                vt[n.type](o.target, n.property, m, o.transforms), n.currentValue = m, t++
            }
        }

        function f(t) {
            S[t] && !S.passThrough && S[t](S)
        }

        function y(t) {
            var e = S.duration,
                i = S.delay,
                s = e - S.endDelay,
                n = u(t);
            S.progress = E(n / e * 100, 0, 100), S.reversePlayback = n < S.currentTime, o && function(t) {
                if (S.reversePlayback)
                    for (var e = l; e--;) g(t, o[e]);
                else
                    for (var i = 0; i < l; i++) g(t, o[i])
            }(n), !S.began && 0 < S.currentTime && (S.began = !0, f("begin")), !S.loopBegan && 0 < S.currentTime && (S.loopBegan = !0, f("loopBegin")), n <= i && 0 !== S.currentTime && v(0), (s <= n && S.currentTime !== e || !e) && v(e), i < n && n < s ? (S.changeBegan || (S.changeBegan = !0, S.changeCompleted = !1, f("changeBegin")), f("change"), v(n)) : S.changeBegan && (S.changeCompleted = !0, S.changeBegan = !1, f("changeComplete")), S.currentTime = E(n, 0, e), S.began && f("update"), e <= t && (a = 0, S.remaining && !0 !== S.remaining && S.remaining--, S.remaining ? (r = h, f("loopComplete"), S.loopBegan = !1, "alternate" === S.direction && p()) : (S.paused = !0, S.completed || (S.completed = !0, f("loopComplete"), f("complete"), !S.passThrough && "Promise" in window && (c(), d(S)))))
        }
        return d(S), S.reset = function() {
            var t = S.direction;
            S.passThrough = !1, S.currentTime = 0, S.progress = 0, S.paused = !0, S.began = !1, S.loopBegan = !1, S.changeBegan = !1, S.completed = !1, S.changeCompleted = !1, S.reversePlayback = !1, S.reversed = "reverse" === t, S.remaining = S.loop, o = S.children;
            for (var e = l = o.length; e--;) S.children[e].reset();
            (S.reversed && !0 !== S.loop || "alternate" === t && 1 === S.loop) && S.remaining++, v(S.reversed ? S.duration : 0)
        }, S._onDocumentVisibility = m, S.set = function(t, e) {
            return ft(t, e), S
        }, S.tick = function(t) {
            y(((h = t) + (a - (r = r || h))) * Ct.speed)
        }, S.seek = function(t) {
            y(u(t))
        }, S.pause = function() {
            S.paused = !0, m()
        }, S.play = function() {
            S.paused && (S.completed && S.reset(), S.paused = !1, xt.push(S), m(), St())
        }, S.reverse = function() {
            p(), S.completed = !S.reversed, m()
        }, S.restart = function() {
            S.reset(), S.play()
        }, S.remove = function(t) {
            Lt(dt(t), S)
        }, S.reset(), S.autoplay && S.play(), S
    }

    function kt(t, e) {
        for (var i = e.length; i--;) H(t, e[i].animatable.target) && e.splice(i, 1)
    }

    function Lt(t, e) {
        var i = e.animations,
            s = e.children;
        kt(t, i);
        for (var n = s.length; n--;) {
            var o = s[n],
                r = o.animations;
            kt(t, r), r.length || o.children.length || s.splice(n, 1)
        }
        i.length || s.length || e.pause()
    }
    Ct.version = "3.2.1", Ct.speed = 1, Ct.suspendWhenDocumentHidden = !0, Ct.running = xt, Ct.remove = function(t) {
        for (var e = dt(t), i = xt.length; i--;) Lt(e, xt[i])
    }, Ct.get = st, Ct.set = ft, Ct.convertPx = J, Ct.path = function(t, e) {
        var i = L.str(t) ? R(t)[0] : t,
            s = e || 100;
        return function(t) {
            return {
                property: t,
                el: i,
                svg: lt(i),
                totalLength: ht(i) * (s / 100)
            }
        }
    }, Ct.setDashoffset = function(t) {
        var e = ht(t);
        return t.setAttribute("stroke-dasharray", e), e
    }, Ct.stagger = function(t, e) {
        var a = (e = void 0 === e ? {} : e).direction || "normal",
            h = e.easing ? j(e.easing) : null,
            l = e.grid,
            c = e.axis,
            d = e.from || 0,
            p = "first" === d,
            u = "center" === d,
            m = "last" === d,
            g = L.arr(t),
            v = g ? parseFloat(t[0]) : parseFloat(t),
            f = g ? parseFloat(t[1]) : 0,
            y = G(g ? t[1] : t) || 0,
            _ = e.start || 0 + (g ? v : 0),
            b = [],
            w = 0;
        return function(t, e, i) {
            if (p && (d = 0), u && (d = (i - 1) / 2), m && (d = i - 1), !b.length) {
                for (var s, n, o, r = 0; r < i; r++) l ? (n = u ? (l[0] - 1) / 2 : d % l[0], o = u ? (l[1] - 1) / 2 : Math.floor(d / l[0]), s = n - r % l[0], n = o - Math.floor(r / l[0]), o = Math.sqrt(s * s + n * n), "x" === c && (o = -s), b.push(o = "y" === c ? -n : o)) : b.push(Math.abs(d - r)), w = Math.max.apply(Math, b);
                h && (b = b.map(function(t) {
                    return h(t / w) * w
                })), "reverse" === a && (b = b.map(function(t) {
                    return c ? t < 0 ? -1 * t : -t : Math.abs(w - t)
                }))
            }
            return _ + (g ? (f - v) / w : v) * (Math.round(100 * b[e]) / 100) + y
        }
    }, Ct.timeline = function(r) {
        var a = Ct(r = void 0 === r ? {} : r);
        return a.duration = 0, a.add = function(t, e) {
            var i = xt.indexOf(a),
                s = a.children;

            function n(t) {
                t.passThrough = !0
            } - 1 < i && xt.splice(i, 1);
            for (var o = 0; o < s.length; o++) n(s[o]);
            i = q(t, X(b, r));
            i.targets = i.targets || r.targets;
            t = a.duration;
            i.autoplay = !1, i.direction = a.direction, i.timelineOffset = L.und(e) ? t : nt(e, t), n(a), a.seek(i.timelineOffset);
            i = Ct(i);
            n(i), s.push(i);
            i = _t(s, r);
            return a.delay = i.delay, a.endDelay = i.endDelay, a.duration = i.duration, a.seek(0), a.reset(), a.autoplay && a.play(), a
        }, a
    }, Ct.easing = j, Ct.penner = V, Ct.random = function(t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t
    };
    class It extends t {
        constructor() {
            super(), this.sections = [], this.sectionsCount = 0, this._index = -1, this.indexes = [], this.currentSection = null, this.eventPrefix = "view", this._loop = !1, this._size = 0
        }
        get index() {
            return this._index
        }
        set index(t) {
            t !== this._index && (this._index = t, this.currentSection = this.sections[t], this.trigger("indexChange", [t], !0))
        }
        get loop() {
            return this._loop
        }
        set loop(t) {
            this._loop !== t && (this._loop = t, this.update())
        }
        get size() {
            return this._size
        }
        set size(t) {
            this._size !== t && (this._size = t, this.update())
        }
        get count() {
            return this.sectionsCount
        }
        appendSection(t, e = !0) {
            this.sections.push(t), this._afterSectionAdd(t, e)
        }
        prependSection(t, e = !0) {
            this.sections.unshift(t), this._afterSectionAdd(t, e)
        }
        insertSectionAfter(t, e, i = !0) {
            this.insertSectionAt(t, this.sections.indexOf(e), i)
        }
        insertSectionAt(t, e, i = !0) {
            e < 0 || (this.sections.splice(e, 0, t), this._afterSectionAdd(t, i))
        }
        removeSection(t, e = !0) {
            return this.removeSectionByIndex(this.section.indexOf(t), e)
        }
        removeSectionByIndex(t, e = !0) {
            if (t < 0) return !1;
            const i = this.sections.splice(t, 1);
            return i.unmount(), this.trigger("sectionRemove", i), e && this.update(), i[0]
        }
        update() {
            this.trigger("update", null, !0)
        }
        updateSectionsIndex() {
            this.sections.forEach((t, e) => {
                t.index = e
            })
        }
        _afterSectionAdd(t, e) {
            this.sectionsCount = this.sections.length, t.mount(this), this.updateSectionsIndex(), e && this.update(), this.trigger("sectionAdd", [t])
        }
    }
    class $t extends It {
        constructor() {
            super(), this.element = document.createElement("div"), this.element.classList.add(`${l}-view`), this.sectionsContainer = document.createElement("div"), this.sectionsContainer.classList.add(`${l}-sections`), this.element.appendChild(this.sectionsContainer), this.sizeProp = "width"
        }
        resize() {
            var t = this.element.offsetWidth,
                e = this.element.offsetHeight;
            return this.width = t, this.height = e, this.size = this[this.sizeProp], (t !== this.width || e !== this.height) && (this.trigger("resize", [t, e], !0), !0)
        }
        appendTo(t) {
            t.appendChild(this.element), this.resize(), this.trigger("elementAppend", [t], !0)
        }
        appendSection(t) {
            this.sectionsContainer.appendChild(t.element), super.appendSection(t)
        }
        prependSection(t) {
            this.sectionsContainer.hasChildNodes ? this.sectionsContainer.insertBefore(t.element, this.sectionsContainer.firstChild) : this.sectionsContainer.appendChild(t.element), super.prependSection(t)
        }
        insertSectionAt(t, e) {
            e < 0 || (this.sectionsContainer.insertBefore(t.element, this.sectionsContainer.childNodes[e]), super.insertSectionAt(t, e))
        }
        removeSectionByIndex(t) {
            return !(t < 0) && (this.sections[t].element.remove(), super.removeSectionByIndex(t))
        }
    }
    class Ot extends $t {
        constructor() {
            super(), this.activeEnteringSection = !1, this.activeFactor = .8, this.visibleIndex = 0, this.visibleIndexes = [], this.scrollable = !0, this._size = 0, this._position = 0, this._length = 0
        }
        get position() {
            return this._position
        }
        set position(t) {
            this._position !== t && (this.scrollDirection = t > this._position ? "forward" : "backward", this._loop ? this._position = this.normalizePosition(t) : this._position = t, this.update(!1), this.trigger("scroll", [this._position]))
        }
        get nominalLength() {
            return this._length - this._size
        }
        get length() {
            return this._length
        }
        get size() {
            return this._size
        }
        set size(t) {
            if (this._size !== t) {
                var e = this._size ? t / this._size : 1;
                this._size = t;
                let i = 0;
                this.sections.some((t, e) => !(e < this.visibleIndex) || (i += t.space, !1)), this._position = (this._position - i) * e + i
            }
            this.update()
        }
        arrange() {
            var t = this._length;
            this._length = 0, this.sections.forEach((t, e) => {
                t.index = e, t.position = this._length, t.offset = this._length, t.calculateSize(this.options.get("dir"), !0), this._length += t.size
            }), this._sectionsCount && !this._loop && (this._length -= this.sections[this._sectionsCount - 1].space), this.trigger("arrange", null, !0), this._length !== t && this.trigger("lengthChange", [this._length], this)
        }
        locateInLoop() {
            if (this._loop) {
                let e = 0,
                    i = -1,
                    s = 0,
                    n = 0,
                    o;
                if (this.sections.some(t => !!t.inRangeTest(this._position) && (o = t, !0)), o) {
                    for (let t = 0; t !== this._sectionsCount; t += 1) {
                        const r = this.sections[(t + o.index) % this._sectionsCount];
                        if (r.offset = o.position + e, e += r.size, -1 === i && r.inRangeTest((this._position + this._size) % this._length) && (i = (this._length - e) / 2), -1 !== i && r.inRangeTest((this._position + i + this._size) % this._length)) {
                            s = (t + 1 + o.index) % this._sectionsCount, n = this._sectionsCount - (t + 1);
                            break
                        }
                    }
                    e = 0;
                    for (let t = n - 1; 0 <= t; --t) {
                        const a = this.sections[(t + s) % this._sectionsCount];
                        e += a.size, a.offset = o.position - e
                    }
                    this.trigger("loopUpdate", null, !0)
                }
            }
        }
        update(t = !0) {
            this._sectionsCount = this.sections.length, t && this.arrange(), this.locateInLoop(), this.updateStatusAndIndex(), this.trigger("update", [this._position], !0)
        }
        updateStatusAndIndex() {
            let n = [],
                o = [],
                r;
            const a = Math.round(this._position);
            this.sections.forEach(t => {
                let e = "in";
                t.offset + t.size <= a ? e = "passed" : t.offset < a ? e = "forward" === this.scrollDirection ? "leaving" : "entering" : t.offset - t.space >= a + this._size ? e = "pending" : t.offset + t.size - t.space > a + this._size && (e = "forward" !== this.scrollDirection ? "leaving" : "entering"), t.inRangeTest(a) && (r = t.index), "passed" !== e && "pending" !== e && o.push(t.index), t.status = e;
                var i = t.offset - a,
                    s = t.offset + t.size - t.space - a - this._size;
                t.pendingOffset = i <= 0 ? i : Math.max(0, s), this.activeEnteringSection ? (s = t.size * this.activeFactor, t.active = t.offset + s >= a && t.offset + t.size - s <= a + this._size + t.space) : t.active = "in" === e, t.active && n.push(t.index)
            }), o = o.sort((t, e) => this.sections[t].offset - this.sections[e].offset), this.visibleIndexes.toString() !== o.toString() && (this.visibleIndexes = o, this.trigger("visibleIndexesChange", [this.visibleIndexes], !0)), this.visibleIndex !== r && (this.visibleIndex = r, this.trigger("visibleIndexChange", [this.visibleIndex], !0)), n = n.sort((t, e) => this.sections[t].offset - this.sections[e].offset), this.indexes.toString() !== n.toString() && (this.indexes = n, this.trigger("indexesChange", [this.indexes]));
            var t = this.indexes[0];
            this.index !== t && (this.index = t, this.trigger("indexChange", [this.index]))
        }
        normalizePositionByDirection(t, e = "auto") {
            t = this._loop ? this.normalizePosition(t) : Math.min(t, this._length - this._size);
            let i = 0;
            if (this._loop && "off" !== e) {
                var s = this._position,
                    n = t,
                    o = s < n ? n - s : this._length - s + n,
                    r = s < n ? n - this._length - s : n - s;
                switch (e) {
                    case "auto":
                        i = Math.abs(r) < Math.abs(o) ? r : o;
                        break;
                    case "backward":
                        i = r;
                        break;
                    default:
                        i = o
                }
                return this._position + i
            }
            return t
        }
        scrollTo(t, e = !0, i = 1, s = "auto", n) {
            this.killScrollAnimation(), t = this.normalizePositionByDirection(t, s), e ? ((n = x(x({
                easing: "easeOutExpo",
                duration: 1e3 * i
            }, n), {}, {
                complete: () => {
                    this.animating = !1, this.trigger("scrollToAnimationEnd", void 0, !0)
                }
            })).position = t, this.animating = !0, Ct(x({
                targets: this
            }, n))) : this.position = t
        }
        killScrollAnimation() {
            this.animating && (Ct.remove(this), this.animating = !1)
        }
        goToSection(t, e = !0, i = 1, s = "auto", n) {
            this.scrollTo(t.position, e, i, s, n)
        }
        goToIndex(t, e = !0, i = 1, s = "auto", n) {
            t >= this.sectionsCount || this.goToSection(this.sections[t], e, i, s, n)
        }
        getIndexAtPosition(i) {
            this._loop && (i = this.normalizePosition(i)), i %= this._length;
            let s = -1;
            return this.sections.some((t, e) => !!t.inRangeTest(i, this.activeEnteringSection ? this.activeFactor : 1) && (s = e, !0)), -1 === s ? this._loop ? 0 : this.sectionsCount - 1 : s
        }
        getIndexesAtPosition(t) {
            t = this._loop ? this.normalizePosition(t) : Math.min(t, this._length - this._size);
            var i = this.getIndexAtPosition(t),
                t = t + this._size,
                s = t > this._length ? t % this._length : t;
            const n = [];
            for (let e = 0; e !== this._sectionsCount; e += 1) {
                let t;
                if (this._loop) t = this.sections[(e + i) % this._sectionsCount];
                else {
                    if (e + i >= this._sectionsCount) return n;
                    t = this.sections[e + i]
                }
                if (n.push(t.index), t.inRangeTest(s)) return this.activeEnteringSection && (t.position + t.size - t.size * this.activeFactor < s || n.pop()), n
            }
            return n
        }
        normalizePosition(t) {
            return (t %= this._length) < 0 && (t += this.length), t
        }
    }
    class Tt {
        constructor(t) {
            this._drag = t, this._dragLog = Math.log(t), this._x = 0, this._v = 0, this._startTime = 0
        }
        set(t, e) {
            this._x = t, this._v = e, this._startTime = Date.now()
        }
        x(t) {
            return void 0 === t && (t = (Date.now() - this._startTime) / 1e3), this._x + this._v * this._drag ** t / this._dragLog - this._v / this._dragLog
        }
        dx() {
            var t = (Date.now() - this._startTime) / 1e3;
            return this._v * this._drag ** t
        }
        done() {
            return Math.abs(this.dx()) < 1
        }
    }
    const Pt = .001;

    function Mt(t, e, i) {
        return e - i < t && t < e + i
    }

    function Bt(t, e) {
        return Mt(t, 0, e)
    }
    class zt {
        constructor(t, e, i) {
            this._m = t, this._k = e, this._c = i, this._solution = null, this._endPosition = 0, this._startTime = 0
        }
        _solve(t, e) {
            var i = this._c,
                s = this._m,
                n = this._k,
                o = i * i - 4 * s * n;
            if (0 == o) {
                const a = -i / (2 * s),
                    h = t,
                    l = e / (a * t);
                return {
                    x(t) {
                        return (h + l * t) * Math.E ** (a * t)
                    },
                    dx(t) {
                        var e = Math.E ** (a * t);
                        return a * (h + l * t) * e + l * e
                    }
                }
            }
            if (0 < o) {
                const c = (-i - Math.sqrt(o)) / (2 * s),
                    d = (-i + Math.sqrt(o)) / (2 * s),
                    l = (e - c * t) / (d - c),
                    h = t - l;
                return {
                    x(t) {
                        return h * Math.E ** (c * t) + l * Math.E ** (d * t)
                    },
                    dx(t) {
                        return h * c * Math.E ** (c * t) + l * d * Math.E ** (d * t)
                    }
                }
            }
            const r = Math.sqrt(4 * s * n - i * i) / (2 * s),
                a = -i / 2 * s,
                h = t,
                l = (e - a * t) / r;
            return {
                x(t) {
                    return Math.E ** (a * t) * (h * Math.cos(r * t) + l * Math.sin(r * t))
                },
                dx(t) {
                    var e = Math.E ** (a * t),
                        i = Math.cos(r * t),
                        t = Math.sin(r * t);
                    return e * (l * r * i - h * r * t) + a * e * (l * t + h * i)
                }
            }
        }
        x(t) {
            return void 0 === t && (t = (Date.now() - this._startTime) / 1e3), this._solution ? this._endPosition + this._solution.x(t) : 0
        }
        dx(t) {
            return void 0 === t && (t = (Date.now() - this._startTime) / 1e3), this._solution ? this._solution.dx(t) : 0
        }
        setEnd(e, i, s) {
            if (s = s || Date.now(), e !== this._endPosition || !Bt(i, Pt)) {
                i = i || 0;
                let t = this._endPosition;
                this._solution && (Bt(i, Pt) && (i = this._solution.dx((s - this._startTime) / 1e3)), t = this._solution.x((s - this._startTime) / 1e3), Bt(i, Pt) && (i = 0), Bt(t, Pt) && (t = 0), t += this._endPosition), this._solution && Bt(t - e, Pt) && Bt(i, Pt) || (this._endPosition = e, this._solution = this._solve(t - this._endPosition, i), this._startTime = s)
            }
        }
        snap(t) {
            this._startTime = Date.now(), this._endPosition = t, this._solution = {
                x() {
                    return 0
                },
                dx() {
                    return 0
                }
            }
        }
        done(t) {
            return Mt(this.x(), this._endPosition, Pt) && Bt(this.dx(), Pt)
        }
        springConstant() {
            return this._k
        }
        damping() {
            return this._c
        }
    }
    class Dt {
        constructor(t) {
            this._f = t || 1e-4, this._endPosition = 0, this._x = 0, this._start = 0, this._minV = 700, this._maxV = 1e4
        }
        x(t) {
            return this.done() || t ? this._end : (this._x += this.dx(), this._x)
        }
        dx() {
            var t = Math.abs(this._start - this._end),
                e = .01 * this._v;
            return e -= e * this._f, t / Math.round(t / e)
        }
        setEnd(t, e) {
            this._end = t, this._v = e || 1e3 * Math.sign(this._end - this._start), Math.abs(this._v) > this._maxV && (this._v = this._maxV * Math.sign(this._v)), Math.abs(this._v) < this._minV && (this._v = this._minV * Math.sign(this._v))
        }
        snap(t) {
            this._x = t, this._start = t
        }
        done() {
            return Math.abs(this._x - this._end) < 2
        }
    }
    class Vt {
        constructor(t, e, i = {}) {
            this.value = e, this.operator = t, this.activeFactor = .5, (i = x({
                mass: 1,
                constant: 90,
                damping: 20,
                criticalDamping: !(this.priority = 10)
            }, i)).criticalDamping && (i.damping = Math.sqrt(4 * i.mass * i.constant)), this.spring = new zt(i.mass, i.constant, i.damping)
        }
        get motion() {
            return this.spring
        }
        isActive(t, e) {
            switch (this.operator) {
                case "<=":
                    return e <= this.value;
                case ">=":
                    return e >= this.value;
                case "<":
                    return e < this.value;
                default:
                    return e > this.value
            }
        }
        set(t, e, i, s) {
            this.spring.snap(e), this.spring.setEnd(this.value, s)
        }
        getPriority() {
            return this.priority
        }
    }
    class jt {
        constructor(t = [], e = {}) {
            this.activeFactor = 1, this.priority = 20, this.points = t, this._activeRange = null, this.options = x({
                mass: 1,
                constant: 90,
                damping: 20,
                criticalDamping: !1,
                paginate: !0,
                loop: !1,
                motionMode: "spring",
                linearFriction: .01
            }, e), (e = x({}, this.options)).criticalDamping && (e.damping = Math.sqrt(4 * e.mass * e.constant)), "spring" === e.motionMode ? this._motion = new zt(e.mass, e.constant, e.damping) : this._motion = new Dt(e.linearFriction)
        }
        get activeRange() {
            return this._activeRange
        }
        set activeRange(t) {
            this._activeRange = t, this.length = t[1] - t[0]
        }
        get motion() {
            return this._motion
        }
        findPoint(i) {
            i = this.normalizePosition(i);
            let s = -1;
            return this.points.some((t, e) => (s = e) === this.points.length - 1 || Math.abs(i - this.points[e + 1][0]) > Math.abs(i - t[0])), !this.options.loop || s !== this.points.length - 1 || Math.abs(i - this.activeRange[1]) > Math.abs(i - this.points[s][0]) ? s : "end"
        }
        normalizePosition(t) {
            return this.options.loop ? (t %= this.length || 1) < 0 && (t += this.length) : t = Math.max(0, Math.min(t, this.length)), t
        }
        isActive(t, e) {
            return !!this.activeRange && (!!this.options.loop || Math.max(t, e) > this._activeRange[0] && Math.min(t, e) < this._activeRange[1])
        }
        getPriority() {
            return this.priority
        }
        set(i, t, s, n) {
            let o = 0;
            if (null === s && (s = t), this.options.paginate && 0 !== n) {
                let e = this.findPoint(i);
                this.options.loop ? (o = Math.floor(i / this.length), "end" === e && (e = 0, o += 1)) : i = this.normalizePosition(i);
                i = this.points[e];
                if (0 < n) s = o * this.length + i[0] + i[1];
                else if (n < 0) {
                    let t = e - 1; - 1 === t && (t = this.points.length - 1), s = o * this.length + i[0] - this.points[t][1]
                }
                this.options.loop || (s = this.normalizePosition(s))
            } else {
                let t = this.findPoint(s);
                this.options.loop ? (o = Math.floor(s / this.length), "end" === t && (t = 0, o += 1)) : s = this.normalizePosition(s), s = o * this.length + this.points[t][0]
            }
            this._motion.snap(t), this._motion.setEnd(s, n)
        }
    }
    class Rt {
        constructor() {
            this._options = {}, this._defaults = {}, this._observers = {}, this._aliases = {}, this._waitings = {}
        }
        inject(e) {
            Object.keys(e).forEach(t => {
                this._options[t] instanceof Rt ? this._options[t].inject(e[t]) : this.set(t, e[t], !0) || (this._waitings[t] = e[t])
            })
        }
        register(e, t) {
            if ("object" != typeof e) return Array.isArray(t) || "object" != typeof t ? this._defaults[e] = t : (this._options[e] = new Rt, this._options[e].register(t)), this._checkWaitingList(e), e; {
                const i = Object.keys(e);
                return i.forEach(t => {
                    this.register(t, e[t])
                }), i
            }
        }
        chain(t, e) {
            this._aliases[t] && (t = this._aliases[t]);
            const i = this._isNested(t);
            if (i) i.options.chain(i.name, e);
            else {
                if (this._options[t] instanceof Rt) {
                    const s = this._options[t];
                    Object.assign(e._aliases, s._aliases), Object.assign(e._waitings, s._waitings), Object.assign(e._defaults, s._defaults), Object.keys(s._observers).forEach(t => {
                        Object.prototype.hasOwnProperty.call(e._observers, t) ? e._observers[t].concat(s._observers[t]) : e._observers[t] = s._observers[t]
                    }), Object.keys(s._options).forEach(t => {
                        s._options[t] instanceof Rt && e._options[t] ? s.chain(t, e._options[t]) : e._options[t] = s._options[t]
                    }), e.register(e._defaults)
                }
                this._options[t] = e
            }
        }
        alias(t, e) {
            if (this.has(t)) throw new Error(`"${t}" is already an option.`);
            if (this._aliases[t]) throw new Error(`"${t}" is already created.`);
            if (!this.has(e)) throw new Error(`"${t}" is not registered. Register the option before defining any alias.`);
            this._aliases[t] = e, this._checkWaitingList(t)
        }
        has(t) {
            const e = this._isNested(t);
            return e ? e.options.has(e.name) : c.call(this._options, t) || c.call(this._defaults, t)
        }
        is(t, e) {
            return this.get(t) === e
        }
        get(t) {
            if (Array.isArray(t)) {
                const i = {};
                return t.forEach(t => {
                    i[t] = this.get(t)
                }), i
            }
            this._aliases[t] && (t = this._aliases[t]);
            const e = this._isNested(t);
            return e ? e.options.get(e.name) : (c.call(this._options, t) ? this._options : this._defaults)[t]
        }
        set(e, i, s = !1) {
            if ("object" == typeof e) return Object.keys(e).forEach(t => this.set(t, e[t], s)), !0;
            this._aliases[e] && (e = this._aliases[e]);
            const t = this._isNested(e);
            return t ? t.options.set(t.name, i, s) : !!this.has(e) && ("object" == typeof i && this._options[e] instanceof Rt ? this._options[e].set(i) : this._options[e] = i, this._internalChange || s || (this._observers[e] && this._observers[e].forEach(t => t(e, i)), this._observers["*"] && this._observers["*"].forEach(t => t("*", i))), !0)
        }
        observe(t, e) {
            if (Array.isArray(t)) t.forEach(t => this.observe(t, e));
            else {
                if ("*" !== t && !this.has(t)) throw new Error(`This option: "${t}" is not registered.`);
                const i = this._isNested(t);
                if (i) i.options.observe(i.name, e);
                else {
                    const s = this.get(t);
                    s instanceof Rt && s.observe("*", e), this._observers[t] || (this._observers[t] = []), this._observers[t].push(e)
                }
            }
        }
        dontObserve(t, e) {
            if (Array.isArray(t)) t.forEach(t => this.dontObserve(t, e));
            else {
                const i = this._isNested(t);
                if (i) i.options.dontObserve(i.name, e);
                else {
                    const s = this._observers[t];
                    s.length && s.splice(s.indexOf(e), 1)
                }
            }
        }
        internalChange() {
            this._internalChange = !0
        }
        endInternalChange() {
            this._internalChange = !1
        }
        aliasesOf(e) {
            return Object.keys(this._aliases).filter(t => this._aliases[t] === e)
        }
        reset(t, e) {
            if ("*" !== t) {
                this._internalChange = e;
                const i = this._isNested(t);
                if (i) i.options.reset(i.name, e);
                else {
                    const s = this._options[t];
                    void 0 !== s && (s instanceof Rt ? s.reset("*", e) : this.set(t, this._defaults[t])), this._internalChange = !1
                }
            } else Object.keys(this._options).forEach(t => this.reset(t, e))
        }
        toObject() {
            const e = {};
            return Object.keys(x(x({}, this._defaults), this._options)).forEach(t => {
                this._options[t] instanceof Rt ? e[t] = this._options[t].toObject() : e[t] = this.get(t)
            }), e
        }
        list() {
            const e = [];
            return Object.keys(x(x({}, this._defaults), this._options)).forEach(t => {
                this._options[t] instanceof Rt ? e.push({
                    name: t,
                    value: this._options[t].list()
                }) : e.push({
                    name: t,
                    value: this._options[t],
                    default: this._defaults[t],
                    aliases: this.aliasesOf(t).toString(),
                    observers: this._observers[t]
                })
            }), e
        }
        _checkWaitingList(t) {
            void 0 !== this._waitings[t] && (this.set(t, this._waitings[t], !0), this._waitings[t] = void 0)
        }
        _isNested(t) {
            var e = t.indexOf(".");
            if (-1 === e) return !1;
            var i = this.get(t.slice(0, e));
            return i instanceof Rt && {
                name: t.slice(e + 1),
                options: i
            }
        }
    }
    class Wt extends t {
        constructor(t, e, i) {
            super(), this.view = e, this.composer = t, this.options = new Rt, this.options.register({
                animate: !0,
                duration: 1,
                easing: void 0,
                start: 0,
                checkLoop: !0
            }), this.options.inject(i), this.currentIndex = 0, this.targetIndex = 0, this.count = -1, this.currentSectionIndex = 0, this.targetSectionIndex = 0, this.currentSectionIndexes = [], this.targetSectionIndexes = []
        }
        init() {
            this.composer.on("init", () => {
                this.options.get("start") && this.goToIndex(this.options.get("start"), {
                    animate: !1
                }, !0)
            }, 1e3)
        }
        next(t) {
            t = x(x({}, this.options.toObject()), t), this.targetIndex + 1 >= this.count ? t.checkLoop && this.view.options.get("loop") ? this.goToIndex(0, t) : this.trigger("nextBlock") : this.goToIndex(this.targetIndex + 1, t)
        }
        previous(t) {
            t = x(x({}, this.options.toObject()), t), this.targetIndex - 1 < 0 ? t.checkLoop && this.view.options.get("loop") ? this.goToIndex(this.count - 1, t) : this.trigger("previousBlock") : this.goToIndex(this.targetIndex - 1, t)
        }
        goToIndex(t, e, i) {}
        update() {
            this.updateTargetIndex(this.view.index), this.updateCurrentIndex()
        }
        checkIndex(t, e = !0) {
            return -1 === this.count && this.updateCount(), e ? Math.max(0, Math.min(t, this.count - 1)) : 0 <= t && t < this.count
        }
        updateCount() {}
        updateTargetIndex(t) {
            [this.targetSectionIndex] = this.targetSectionIndexes, this.targetIndex !== t && (this.targetIndex = t, this.trigger("changeStart", [this.targetIndex]), this.trigger("targetIndexChange", [this.targetIndex]))
        }
        updateCurrentIndex() {
            this.currentSectionIndex = this.view.index, this.currentSectionIndexes = this.view.indexes, this.targetIndex !== this.currentIndex && (this.currentIndex = this.targetIndex, this.trigger("changeEnd", [this.currentIndex]), this.trigger("currentIndexChange", [this.currentIndex]))
        }
    }
    class Nt {
        constructor(t) {
            this._drag = t, this._x = 0, this._startTime = 0
        }
        set(t, e) {
            this._x = t, this._end = e
        }
        x(t) {
            return t ? this._end : (this._x += (this._end - this._x) * this._drag, this._x)
        }
        dx() {
            return this._x - this._end
        }
        done() {
            return Math.abs(this.dx()) < 1
        }
    }
    class Ft extends t {
        constructor(t = .01) {
            super(), this._position = 0, this.animating = !1, this._constraints = [], this._friction = new Tt(t), this._frictionVal = t, this.startPosition = null, this._tickerId = null, this._tick = this._tick.bind(this), this.disabled = !1, this.eventPrefix = "slicker"
        }
        get friction() {
            return this._frictionVal
        }
        set friction(t) {
            this.disabled || t === this._frictionVal || (this._friction = new Tt(t), this._frictionVal = t)
        }
        get position() {
            return this._position
        }
        set position(t) {
            this.disabled || t === this._position || (null === this.startPosition && (this.startPosition = t), this._currentConstraint = this.findConstraint(t), this._updatePosition(t))
        }
        moveToPosition(t, e = .5) {
            this.disabled || this._position === t || (null === this.startPosition && (this.startPosition = t), this._velocity = NaN, this._activeMotion = new Nt(e), this._activeMotion.set(this._position, t), this._startAnimation())
        }
        get velocity() {
            return this._activeMotion ? this._activeMotion.dx() : 0
        }
        set velocity(t) {
            if (!this.disabled && this._velocity !== t) {
                this._velocity = t, this._friction.set(this._position, this._velocity), this._activeMotion = this._friction;
                t = this._friction.x(120);
                if (this._targetConstraint = this.findConstraint(t) || null, this._targetConstraint) return this._currentConstraint = null, this._animToConstraint(this._targetConstraint, this._position, t, this._velocity), void(this.startPosition = null);
                this._startAnimation(), this.trigger("push", [this._velocity], !0)
            }
        }
        stop() {
            this.startPosition = this._position, this.animating = !1, this._tick(), this.trigger("motionInterrupt", null, !0)
        }
        release(t) {
            !this.disabled && this._currentConstraint && (t ? this._goToConstraint(this._currentConstraint, this._position, null, this._velocity) : (this._animToConstraint(this._currentConstraint, this._position, null, this._velocity), this.trigger("motionToConstraint", null, !0)))
        }
        addConstraint(t) {
            (t.slicker = this)._constraints.push(t)
        }
        removeConstraint(t) {
            t = this._constraints.indexOf(t); - 1 !== t && (this._constraints = this._constraints.splice(t, 1))
        }
        removeConstraints() {
            this._currentConstraint = null, this._constraints = []
        }
        findConstraint(n) {
            if (!this._constraints.length) return !1;
            const t = this._constraints.filter(t => t.isActive(this._position, n, this.velocity));
            return !!t.length && t.sort((t, e) => {
                var i = e.getPriority(this._position, n, this.velocity),
                    s = t.getPriority(this._position, n, this.velocity);
                return "important" === i ? 1 : "important" === s ? -1 : e.priority - t.priority
            })[0]
        }
        _updatePosition(t) {
            var e = t - this._position;
            this._position = t, this._currentConstraint && (this._position -= (1 - this._currentConstraint.activeFactor) * e), this.trigger("positionChange", [this._position], !0)
        }
        _startAnimation() {
            var t;
            this.animating || (this.animating = !0, this.trigger("animationStart", null, !0), this._activeMotion !== this._friction && this.trigger("constraintAnimationStart", null, !0), t = Math.round(100 * this._activeMotion.x(120)) / 100, this.endPosition !== t && this.trigger("endPositionChange", [t], !0), this._tick())
        }
        _tick() {
            if (this.animating) {
                if (this._activeMotion.done()) return this.animating = !1, this._updatePosition(Math.round(100 * this._position) / 100), this._tick(), this.trigger("animationEnd", null, !0), void(this._activeMotion !== this._friction && this.trigger("constraintAnimationEnd", null, !0));
                this._updatePosition(this._activeMotion.x()), this._tickerId = requestAnimationFrame(this._tick)
            } else cancelAnimationFrame(this._tickerId), this._velocity = 0, this._targetConstraint = null, this._currentConstraint = this.findConstraint(this._position)
        }
        _animToConstraint(t, e, i, s) {
            t.set(this.startPosition, e, i, s), this._activeMotion = t.motion, this._startAnimation()
        }
        _goToConstraint(t, e, i, s) {
            t.set(this.startPosition, e, i, s);
            t = Math.round(100 * t.motion.x(120)) / 100;
            this.trigger("endPositionChange", [t], !0), this.position = t, this.trigger("animationEnd", null, !0)
        }
    }
    class Ht extends Wt {
        constructor(t, e, i = {}) {
            super(t, e, i), this.options.register({
                direction: "auto",
                slicker: !0,
                slickerFriction: .01,
                updateIndexOnDrag: "auto",
                boundariesSpring: {
                    mass: 1,
                    constant: 90,
                    damping: 20,
                    criticalDamping: !1
                },
                snapping: {
                    mass: 1,
                    constant: 90,
                    damping: 20,
                    criticalDamping: !0
                }
            }), this.options.inject(i), this.updateCurrentIndex = this.updateCurrentIndex.bind(this), this.updateCount = this.updateCount.bind(this), this.view.on("arrange", this.updateCount, this)
        }
        setupSlicker() {
            this.options.get("slicker") && (this.updateSlicker = this.updateSlicker.bind(this), this.slicker = new Ft, this.slicker.on("positionChange", this._onSlickerValueChange, this), this.slicker.on("endPositionChange", this._onSlickerEndValueChange, this), this.slicker.on("animationEnd", this.updateCurrentIndex, this), this.slicker.on("push", () => this.trigger("slickChanged")), this.slicker.on("motionInterrupt", () => this.trigger("slickChanged")), this.options.observe(["slickType", "boundariesSpring", "snapping"], this.updateSlicker), this.options.observe("slickerFriction", (t, e) => {
                this.slicker.friction = e
            }), this.view.options.observe("loop", this.updateSlicker), this.view.on("resize, sectionAdd, sectionRemove, lengthChange", this.updateSlicker), this.view.on("scrollToAnimationEnd", this.updateCurrentIndex, this), !1 === this.view.isSafeForInteractions && (this.slicker.disabled = !0), this.view.on("unsafeInteractions", () => {
                this.slicker.disabled = !0
            }), this.view.on("safeInteractions", () => {
                this.slicker.disabled = !1
            }), this.updateSlicker())
        }
        next(t) {
            super.next(x({
                direction: "forward"
            }, t))
        }
        previous(t) {
            super.previous(x({
                direction: "backward"
            }, t))
        }
        drag(t) {
            this.slicker && (this.slicker.position += t * (this.view.dragFactor || 1), this._updateIndexesOnDrag && (this._onSlickerEndValueChange(null, this.slicker.position), this.updateCurrentIndex()))
        }
        push(t) {
            this.slicker && (this.slicker.velocity = t)
        }
        release(t) {
            this.slicker && (this.slicker.position = this.view.position, this.slicker.release(t))
        }
        hold() {
            var t;
            null !== (t = this.slicker) && void 0 !== t && t.stop()
        }
        goToPosition(t, e) {}
        update() {
            this.updateSlicker(), this.updateTargetIndex(this.view.index, this.slicker.position), this.updateCurrentIndex()
        }
        updateCount() {}
        updateSlicker() {}
        _onSlickerValueChange() {}
        _onSlickerEndValueChange(t, e) {}
    }
    class Yt extends Ht {
        constructor(t, e, i = {}) {
            super(t, e, i), this.options.register({
                slickType: "slide",
                paginate: !1
            }), this.options.inject(i), this.updateTargetIndex = this.updateTargetIndex.bind(this), this.options.observe("paginate", this.updateCount), this.updateCount(), this.setupSlicker()
        }
        setupSlicker() {
            this.options.get("slicker") && (this.updateSlicker = this.updateSlicker.bind(this), this.options.observe(["paginate", "slickerFriction"], this.updateSlicker), super.setupSlicker())
        }
        push(t) {
            this.view.killScrollAnimation(), super.push(t)
        }
        release(t) {
            this.view.killScrollAnimation(), super.release(t)
        }
        hold() {
            this.view.animating && (this.view.killScrollAnimation(), this.slicker && (this.slicker.position = this.view.position)), super.hold()
        }
        goToIndex(t, e, i = !1) {
            if (t = this.checkIndex(t), i || t !== this.targetIndex) {
                const s = {
                    index: t
                };
                (e = x(x({}, this.options.get(["animate", "direction", "duration", "paginate", "easing"])), e)).easing && (s.easing = e.easing);
                i = this.options.get("paginate") ? t * this.view.size : this.view.sections[t].position;
                !1 !== this.view.scrollTo(i, e.animate, e.duration, e.direction, s) && this.updateTargetIndex(t, i), e.animate || this.updateCurrentIndex()
            }
        }
        goToPosition(t, e) {
            var i = this.checkIndex(this.view.getIndexAtPosition(t));
            const s = {};
            if ((e = x(x({}, this.options.get(["animate", "direction", "duration", "paginate", "ease"])), e)).ease && (s.ease = e.ease), this.updateTargetIndex(i, t), e.useFriction) return this.slicker.position = this.view.normalizePositionByDirection(this.view.position), void this.slicker.moveToPosition(this.view.normalizePositionByDirection(t), e.friction);
            this.view.scrollTo(t, e.animate, e.duration, e.direction, s), e.animate || this.updateCurrentIndex()
        }
        update() {
            this.updateSlicker(), this.updateTargetIndex(this.view.index, this.slicker.position), this.updateCurrentIndex()
        }
        updateTargetIndex(t, e) {
            this.targetSectionIndexes = this.view.getIndexesAtPosition(e), super.updateTargetIndex(t)
        }
        updateCurrentIndex() {
            this.slicker && (this.slicker.position = this.view.position), super.updateCurrentIndex()
        }
        updateCount() {
            var t = this.options.get("paginate") ? Math.ceil(this.view.length / this.view.size) : this.view.count;
            t !== this.count && (this.count = t, this.trigger("countChange", [this.count]))
        }
        updateSlicker() {
            const i = this.options.get(["slickType", "slickerFriction", "boundariesSpring", "snapping", "paginate", "updateIndexOnDrag"]);
            var t, s = this.view.options.get("loop");
            if (this.slicker.stop(), this.slicker.removeConstraints(), this.slicker.friction = i.slickerFriction, this._updateIndexesOnDrag = i.updateIndexOnDrag, "auto" === this._updateIndexesOnDrag && (this._updateIndexesOnDrag = "scroll" === i.slickType), "scroll" !== i.slickType) {
                let e = [],
                    t;
                if (i.paginate) {
                    t = [0, this.count * this.view.size];
                    for (let t = 0; t !== this.count; t += 1) e.push([t * this.view.size, this.view.size])
                } else s ? (t = [0, this.view.length], e = this.view.sections.map(t => [t.position, t.size])) : (t = [0, this.view.nominalLength], this.view.sections.some(t => t.position < this.view.nominalLength ? (e.push([t.position, t.size]), !1) : (e.push([this.view.nominalLength, this.view.size]), !0)));
                var n = x(x({
                    loop: s,
                    paginate: "slide" === i.slickType
                }, i.snapping.toObject()), {}, {
                    linearFriction: i.slickerFriction,
                    motionMode: "animroll" === this.composer.options.get("view") ? "linear" : "spring"
                });
                const o = new jt(e, n);
                o.activeRange = t, this.slicker.addConstraint(o)
            }
            s || (t = i.boundariesSpring.toObject(), n = new Vt("<", 0, t), s = i.paginate ? (this.count - 1) * this.view.size : this.view.nominalLength, t = new Vt(">", s, t), this.slicker.addConstraint(n), this.slicker.addConstraint(t)), this.release(!0)
        }
        _onSlickerValueChange() {
            this.view.position = this.slicker.position
        }
        _onSlickerEndValueChange(t, e) {
            let i;
            i = this.options.get("paginate") ? Math.ceil(Math.round(e / this.view.size)) % this.count : this.view.getIndexAtPosition(e), this.updateTargetIndex(i, e)
        }
    }
    class Xt {
        constructor(t, e = !0) {
            this._dependencies = 1, this.action = t, this.noMoreExec = e
        }
        hold() {
            this._dependencies += 1
        }
        charge(t) {
            this._dependencies += t
        }
        exec() {
            if (this._executed) {
                if (!this.noMoreExec) return !0;
                console.warn("The action is triggered before.")
            }
            return --this._dependencies, this._dependencies <= 0 && (this._executed = !0, this.action(), !0)
        }
        isExecuted() {
            return this._executed
        }
    }
    const qt = [];
    const Zt = new Map,
        Gt = new Map,
        Ut = new Map,
        Kt = new Map;
    class Jt extends t {
        static registerView(t, e) {
            if (Zt.has(t)) throw new Error(`${t} is already registered.`);
            Zt.set(t, e)
        }
        static registerSection(t, e) {
            if (Kt.has(t)) throw new Error(`${t} is already registered.`);
            Kt.set(t, e)
        }
        static registerAddon(t, e) {
            if (Gt.has(t)) throw new Error(`${t} is already registered.`);
            Gt.set(t, e)
        }
        static registerControl(t, e) {
            if (Ut.has(t)) throw new Error(`${t} is already registered.`);
            Ut.set(t, e)
        }
        static get views() {
            return Zt
        }
        static get addons() {
            return Gt
        }
        static get controls() {
            return Ut
        }
        setup(t, e = {}) {
            this.element = t, this.element.classList.add(`${l}-content-composer`), this.options = new Rt, this.options.register({
                sectionSelector: `.${l}-section`,
                excludeAddons: [],
                navigator: {},
                viewOptions: {},
                view: "basic",
                sectionType: "block",
                sectionFit: "cover",
                disableAnimations: !1
            }), this.trigger("beforeOptions", [e]), this.options.inject(e), this.initTrigger = new Xt(this._init.bind(this)), this.readyTrigger = new Xt(this._ready.bind(this)), this.element.classList.add(`${l}-on-setup`), "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", this._domReady.bind(this)) : this._domReady()
        }
        _domReady() {
            this.trigger("beforeDomReady");
            var t = this["element"];
            "object" == typeof t && t.nodeName ? this.element = t : "string" == typeof t && (this.element = document.querySelector(t)), this.element && (this._domReady = !0, this.trigger("domReady", [this.element]), this._setupAddons(), this.element.classList.remove(`${l}-on-setup`), this.element.classList.add(`${l}-dom-ready`), this.initTrigger.exec())
        }
        _init() {
            this.trigger("beforeInit"), this._setupView(), this._setupLayout(), this._setupNavigator(), this._setupSections(), this.trigger("init"), this.element.classList.remove(`${l}-before-init`), this.element.classList.add(`${l}-init`), this.readyTrigger.exec()
        }
        _ready() {
            this.element.classList.add(`${l}-ready`)
        }
        _setupAddons() {
            this.addons = {};
            const i = this.options.get("excludeAddons");
            this.trigger("beforeSetupAddons"), Gt.forEach((t, e) => {
                -1 === i.indexOf(e) && (this.addons[e] = new t(this))
            }), this.trigger("afterSetupAddons")
        }
        _setupView() {
            this.trigger("beforeViewSetup");
            const t = Zt.get(this.options.get("view"));
            this.view = new t, this.options.chain("viewOptions", this.view.options), (this.view.parentEmitter = this).view.appendTo(this.element), this.trigger("viewSetup", [this.view])
        }
        _setupLayout() {
            this.trigger("beforeLayoutSetup"), this.layoutController = new y(this, this.view, this.options), (this.layoutController.parentEmitter = this).trigger("layoutSetup", [this.layoutController])
        }
        _setupNavigator() {
            this.trigger("beforeNavigatorSetup"), (this.view instanceof Ot || this.view.scrollable) && (this.hasScrollView = !0, this.navigator = new Yt(this, this.view), this.options.chain("navigator", this.navigator.options), (this.navigator.parentEmitter = this).navigator.init()), this.trigger("navigatorSetup", [this.navigator])
        }
        _setupSections() {
            this.trigger("beforeSectionsSetup");
            var t = this.options.get("sectionSelector");
            const i = Kt.get(this.options.get("sectionType"));
            this.element.querySelectorAll(`:scope > ${t}`).forEach(t => {
                const e = new i(t, this);
                (e.parentEmitter = this).view.appendSection(e, !1)
            }), this.view.sections.length && (1 === this.view.sections.length && this.options.set("viewOptions.loop", !1), this.view.update(), this.navigator.update()), this.trigger("sectionsSetup")
        }
    }
    n(Jt, "initAll", () => {
        const {
            depicterSetups: t = []
        } = window;
        t.length && t.forEach(t => {
            qt.includes(t) || (qt.push(t), t())
        })
    });
    var Qt = Object.freeze({
        __proto__: null,
        default: Jt
    });
    const te = ["type"],
        ee = ["type"],
        ie = ["type"],
        se = ["segmentBy", "staggerDirection", "delay", "duration", "overlap", "segmentAnimType"],
        ne = ["type"],
        oe = ["duration", "delay", "easing", "clipParams"],
        re = ["selector", "focalPoint", "set", "scale"],
        ae = (t, e) => {
            var i;
            return null !== (i = t.parentElement) && void 0 !== i && i.insertBefore(e, t), e.appendChild(t), e
        },
        he = t => {
            t.replaceWith(...t.childNodes)
        },
        le = t => Array.from(t.childNodes).reduce((t, e) => {
            var i;
            return e.nodeType !== Node.TEXT_NODE && null !== (i = e.childNodes) && void 0 !== i && i.length ? [...t, ...le(e)] : e.nodeType === Node.TEXT_NODE ? [...t, e] : t
        }, []),
        ce = (t, e) => {
            const i = new Range;
            return t.contains(e) ? t : e.contains(t) ? e : (i.setStartBefore(t), i.setEndAfter(e), i.collapsed && (i.setStartBefore(e), i.setEndAfter(t)), i.commonAncestorContainer)
        },
        de = (t, e) => {
            const i = window.getComputedStyle(t)[e];
            if (!i) return null;
            if (/px/.test(i.toString())) {
                var s = t.style.display;
                t.style.display = "none";
                e = window.getComputedStyle(t)[e];
                return t.style.display = s, e
            }
            return i
        },
        pe = t => {
            const e = t.style.cssText;
            return () => {
                t.style.cssText = e
            }
        },
        ue = {
            duration: 1e3,
            easing: "linear",
            delay: 0
        },
        me = (t, e = {}) => {
            var {
                duration: i,
                delay: s,
                easing: n,
                begin: o,
                complete: e
            } = x(x({}, ue), e);
            const r = pe(t);
            return {
                parts: {
                    offset: s,
                    params: {
                        targets: t,
                        duration: i,
                        easing: n,
                        begin: o,
                        complete: e
                    }
                },
                reset: () => {
                    r(), Ct.remove(t)
                }
            }
        };

    function ge(t, e) {
        return t.hasOwnProperty(e)
    }
    const ve = x(x({}, ue), {}, {
            movement: 100,
            direction: "left",
            fade: !0,
            perspective: 2e3,
            x: null,
            y: null,
            z: null
        }),
        fe = {
            top: "Y",
            bottom: "Y",
            left: "X",
            right: "X",
            front: "Z",
            back: "Z"
        },
        ye = u => (t, r = {}) => {
            var {
                movement: i,
                direction: s,
                fade: e,
                perspective: n
            } = x(x({}, ve), r), {
                parts: {
                    params: o,
                    offset: a
                },
                reset: h
            } = me(t, r);
            let l = {};
            var c = "in" === u;
            if ("custom" === s) {
                var {
                    x: d,
                    y: p,
                    z: r
                } = r;
                let t = d,
                    e = p,
                    i = r,
                    s = "px",
                    n = "px",
                    o = "px";
                d && ge(d, "value") && (t = d.value, s = d.unit), p && ge(p, "value") && (e = p.value, n = p.unit), r && ge(r, "value") && (i = r.value, o = r.unit), l = x(x(x({}, d && {
                    translateX: c ? [`${t}${s}`, 0] : `${t}${s}`
                }), p && {
                    translateY: c ? [`${e}${n}`, 0] : `${e}${n}`
                }), r && {
                    translateZ: c ? [`${i}${o}`, 0] : `${i}${o}`
                })
            } else {
                let t = i,
                    e = "px";
                ge(i, "value") && (t = i.value, e = i.unit);
                i = ["left", "top", "back"].includes(s) ? `-${t}${e}` : `${t}${e}`;
                l[`translate${fe[s]}`] = c ? [i, 0] : i
            }
            return l.translateZ && Ct.set(t, {
                perspective: n
            }), e && (l.opacity = c ? [0, 1] : 0), {
                parts: {
                    offset: a,
                    params: x(x({}, o), l)
                },
                reset: h
            }
        };
    var _e = ye("in"),
        be = ye("out"),
        we = x({}, ve);
    const xe = y => (t, e = {}) => {
        var {
            skew: i,
            scale: s,
            rotate: n,
            rotate3d: o,
            transformOrigin: r,
            skewX: a,
            skewY: h,
            rotateX: l,
            rotateY: c,
            rotateZ: d
        } = e, {
            reset: p,
            parts: {
                params: u,
                offset: m
            }
        } = ye(y)(t, e);
        let g = {};
        var v, f = "in" === y;
        return g = o ? ({
            x: t,
            y: e,
            z: o
        } = o, x(x(x(x({}, g), void 0 !== t && {
            rotateX: f ? [t, 0] : t
        }), void 0 !== e && {
            rotateY: f ? [e, 0] : e
        }), void 0 !== o && {
            rotateZ: f ? [o, 0] : o
        })) : ([l, c, d] = [l, c, d], x(x(x(x({}, g), void 0 !== l && {
            rotateX: f ? [l, 0] : l
        }), void 0 !== c && {
            rotateY: f ? [c, 0] : c
        }), void 0 !== d && {
            rotateZ: f ? [d, 0] : d
        })), void 0 !== n && (g.rotate = f ? [n, 0] : n), g = i ? ({
            x: n,
            y: i
        } = i, x(x(x({}, g), void 0 !== n && {
            skewX: f ? [n, 0] : n
        }), void 0 !== i && {
            skewY: f ? [i, 0] : i
        })) : x(x(x({}, g), void 0 !== a && {
            skewX: f ? [a, 0] : a
        }), void 0 !== h && {
            skewY: f ? [h, 0] : h
        }), s && ("number" == typeof s ? g.scale = f ? [s, 1] : s : ({
            x: s,
            y: v
        } = s, g = x(x(x({}, g), void 0 !== s && {
            scaleX: f ? [s, 1] : s
        }), void 0 !== v && {
            scaleY: f ? [v, 1] : v
        }))), r && ({
            x: f,
            y: v,
            z: r
        } = r, r = `${f||0} ${v||0} ${r||0}`, g.transformOrigin = [r, r]), {
            parts: {
                offset: m,
                params: x(x({}, u), g)
            },
            reset: p
        }
    };
    var Se = xe("in"),
        Ae = xe("out");
    x({}, ve);
    var Ee = h => (t, e = {}) => {
            const i = ae(t, document.createElement("div"));
            i.classList.add("animator-mask-container");
            var s = de(t, "width"),
                n = de(t, "height");
            null !== s && "auto" !== s && (t.style.width = "100%", i.style.width = s), null !== n && "auto" !== n && (t.style.height = "100%", i.style.height = n), i.style.overflow = "hidden";
            const {
                reset: o,
                parts: {
                    params: r,
                    offset: a
                }
            } = ye(h)(t, e);
            return {
                parts: {
                    offset: a,
                    params: r
                },
                reset: () => {
                    o(), he(i)
                }
            }
        },
        Ce = Ee("in"),
        ke = Ee("out");
    x({}, we);
    var Le = h => (t, e = {}) => {
            const i = ae(t, document.createElement("div"));
            i.classList.add("animator-mask-container");
            var s = de(t, "width"),
                n = de(t, "height");
            null !== s && "auto" !== s && (t.style.width = "100%", i.style.width = s), null !== n && "auto" !== n && (t.style.height = "100%", i.style.height = n), i.style.overflow = "hidden";
            const {
                reset: o,
                parts: {
                    params: r,
                    offset: a
                }
            } = xe(h)(t, e);
            return {
                parts: {
                    offset: a,
                    params: r
                },
                reset: () => {
                    o(), he(i)
                }
            }
        },
        Ie = Le("in"),
        $e = Le("out");
    const Oe = (t, e, i, s) => {
            i = xi[i];
            if (ge(i, t)) {
                const n = i[t];
                var {
                    parts: e,
                    reset: s
                } = n(e, s);
                return {
                    reset: s,
                    parts: e
                }
            }
            throw new Error("Animation type not found.")
        },
        Te = {
            coverInAnim: x({
                type: "moveAndTransform"
            }, we),
            coverOutAnim: x({
                type: "moveAndTransform"
            }, we),
            targetAnim: {
                type: "none"
            }
        };
    var Pe = b => (t, e) => {
            var i = x(x({}, Te), e),
                {
                    coverColor: s,
                    duration: n,
                    delay: o = 0,
                    coverInAnim: {
                        type: r
                    },
                    coverOutAnim: {
                        type: a
                    }
                } = i,
                h = S(i.coverInAnim, te),
                e = S(i.coverOutAnim, ee);
            const l = document.createElement("div"),
                c = document.createElement("div");
            l.classList.add("animator-mask-container"), ae(t, l), l.append(c), Object.assign(l.style, {
                position: "relative",
                overflow: "hidden",
                display: "inline-block",
                verticalAlign: "middle"
            }), Object.assign(c.style, {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                background: s
            });
            const {
                reset: d,
                parts: p
            } = Oe(r, c, "in", x(x({}, h), {}, {
                duration: n ? n / 2 : h.duration,
                delay: n ? o : h.delay
            }));
            var {
                offset: s = 0,
                params: r
            } = p, h = s + r.duration;
            let u = i["targetAnim"];
            s = "none" === u.type;
            s && (u = {
                type: "move",
                fade: !0,
                movement: 0,
                direction: "left"
            });
            var r = u["type"],
                i = S(u, ie);
            const {
                reset: m,
                parts: g
            } = Oe(r, t, b, x(x({}, i), {}, {
                duration: s ? 1 : n ? n / 2 : i.duration,
                delay: n ? o + n / 2 : h + (i.delay || 0)
            }));
            let v = [],
                f = null;
            i.fade || ({
                reset: s,
                parts: t
            } = Oe("fade", t, b, {
                fade: !0,
                movement: 0,
                direction: "left",
                duration: 1,
                delay: n ? o + n / 2 : h + (i.delay || 0)
            }), v = [t], f = s);
            const {
                reset: y,
                parts: _
            } = Oe(a, c, "out", x(x({}, e), {}, {
                duration: n ? n / 2 : i.duration,
                delay: n ? o + n / 2 : h + (e.delay || 0)
            }));
            return {
                parts: [p, ...v, g, _],
                reset: () => {
                    var t;
                    d(), y(), m(), null !== (t = f) && void 0 !== t && t(), c.remove(), he(l), l.remove(), console.log("reset")
                }
            }
        },
        Me = Pe("in"),
        Be = Pe("out");
    const ze = t => {
            const e = null == t ? void 0 : t.textContent;
            if (!t || !t.parentNode || 3 !== t.nodeType || !e) return [];
            const i = document.createRange(),
                s = [];
            i.setStart(t, 0);
            let n = i.getBoundingClientRect().bottom,
                o = 1,
                r = 0;
            for (var a; o <= e.length;) i.setStart(t, o), o < e.length - 1 && i.setEnd(t, o + 1), (a = i.getBoundingClientRect().bottom) > n && (s.push(e.substr(r, o - r)), n = a, r = o), o += 1;
            return s.push(e.substr(r)), s
        },
        De = t => t.split(/(\s+)/),
        Ve = t => t.split(""),
        je = (t, s, n, o, r) => t.map((t, e) => {
            var i = " " !== t;
            return r && !i || !t ? null : `<${s}${i&&n?` class="${n} ${0===e?"first":""}"`:""}${i&&o?` style="${o}"`:""}>${t}</${s}>`
        }).filter(t => null !== t),
        Re = x(x(x({
            segmentBy: "letter",
            staggerDirection: "left",
            overlap: .05,
            segmentAnimType: "moveAndTransform"
        }, ue), we), Te);
    var We = w => (t, e) => {
            const i = x(x({}, Re), e),
                {
                    segmentBy: s,
                    staggerDirection: n,
                    delay: o = 0,
                    duration: r = 1e3,
                    overlap: a = .05,
                    segmentAnimType: h
                } = i,
                l = S(i, se);
            let c = le(t).filter(t => " " !== t.textContent);
            const d = 1 < (t = c).length ? t.reduce((t, e) => t === e ? t : ce(t, e), t[0]) : t[0].parentElement;
            var p;
            const u = (t = d, p = document.createElement("div"), [...t.childNodes].forEach(t => p.appendChild(t)), t.appendChild(p), p),
                m = u.cloneNode(!0);
            d.appendChild(m), u.style.display = "none";
            t = window.getComputedStyle(d).textTransform;
            c = le(m).filter(t => " " !== t.textContent);
            const g = document.createElement("span");
            c.forEach(t => {
                g.innerHTML = ((t, e) => {
                    const i = ["letter", "word", "line"],
                        n = i.slice(i.indexOf(t)),
                        o = "word" === t,
                        r = "letter" === t,
                        a = [];
                    if (n.includes("line")) {
                        const h = ze(e);
                        let s = [];
                        n.includes("word") ? h.forEach(t => {
                            const e = De(t);
                            let i = [];
                            n.includes("letter") ? e.forEach(t => {
                                t = Ve(t), t = je(t, "span", r ? "animator-letter" : "", r ? "display:inline-block" : "").join("");
                                i.push(t)
                            }) : i = e, s.push(je(i, "span", o ? "animator-word" : "", o ? "display:inline-block" : "").join(""))
                        }) : s = h, a.push(je(s, "div", "animator-line", "white-space: nowrap; display: inline-block;").join(""))
                    }
                    return a.join("")
                })(s, t), t.replaceWith(...g.childNodes)
            }), g.remove();
            const v = [],
                f = [],
                y = [...m.querySelectorAll(`.animator-${s}`)];
            let _ = "left" === n ? y : y.reverse();
            "shuffle" === n && (_ = (t => {
                const e = t;
                let i = t.length;
                for (var s; 0 !== i;) s = Math.floor(Math.random() * i), --i, [e[i], e[s]] = [e[s], e[i]];
                return e
            })(_));
            const b = r / ((_.length - 1) * (1 - a) + 1);
            return _.forEach((t, e) => {
                var {
                    parts: t,
                    reset: e
                } = Oe(h, t, w, x(x({}, l), {}, {
                    delay: e * (1 - a) * b + o,
                    duration: b
                }));
                Array.isArray(t) ? v.push(...t) : v.push(t), f.push(e)
            }), m.querySelectorAll(".animator-mask-container").forEach(t => {
                t.style.verticalAlign = "sub", t.style.display = "inline-block"
            }), "capitalize" === t && "letter" === s && (m.style.textTransform = "initial", m.querySelectorAll(".animator-letter.first").forEach(t => {
                t.style.textTransform = "capitalize"
            })), {
                parts: v,
                reset: () => {
                    var e;
                    f.forEach(t => t()), m.remove(), [...(e = u).childNodes].forEach(t => e.parentElement.appendChild(t)), e.remove()
                }
            }
        },
        Ne = We("in"),
        Fe = We("out");
    x({}, ue);
    var He = n => (t, e = {}) => {
            var {
                parts: {
                    params: i,
                    offset: t
                },
                reset: e
            } = me(t, e);
            const s = {};
            return s.opacity = "in" === n ? [0, 1] : 0, {
                parts: {
                    offset: t,
                    params: x(x({}, i), s)
                },
                reset: e
            }
        },
        Ye = He("in"),
        Xe = He("out");
    const qe = t => "number" == typeof t ? `${t}px` : `${t.value}${t.unit}`,
        Ze = (t, e) => {
            var i = "number" == typeof t ? t : t.value,
                t = "number" == typeof t ? "px" : t.unit;
            return {
                from: qe({
                    value: "in" === e ? i : 0,
                    unit: t
                }),
                to: qe({
                    value: "in" === e ? 0 : i,
                    unit: t
                })
            }
        },
        Ge = {
            top: {
                bottom: {
                    value: 100,
                    unit: "%"
                },
                left: {
                    value: 0,
                    unit: "%"
                }
            },
            bottom: {
                top: {
                    value: 100,
                    unit: "%"
                },
                left: {
                    value: 0,
                    unit: "%"
                }
            },
            left: {
                top: {
                    value: 0,
                    unit: "%"
                },
                right: {
                    value: 100,
                    unit: "%"
                }
            },
            right: {
                top: {
                    value: 0,
                    unit: "%"
                },
                left: {
                    value: 100,
                    unit: "%"
                }
            }
        },
        Ue = x({}, ue),
        Ke = h => (t, e) => {
            var {
                direction: i,
                directionsValue: s = {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            } = x(x({}, Ue), e), s = i ? Ge[i] : s;
            const {
                parts: {
                    params: n,
                    offset: o
                },
                reset: r
            } = me(t, e), a = {};
            var {
                from: e,
                to: s
            } = ((i, s) => {
                const t = Object.keys(i),
                    n = {};
                t.forEach(t => {
                    var e = Ze(i[t], s);
                    n[t] = e
                });
                var {
                    top: e,
                    right: o,
                    bottom: r,
                    left: a
                } = n;
                return {
                    from: `inset(${(null==e?void 0:e.from)||0} ${(null==o?void 0:o.from)||0} ${(null==r?void 0:r.from)||0} ${(null==a?void 0:a.from)||0})`,
                    to: `inset(${(null==e?void 0:e.to)||0} ${(null==o?void 0:o.to)||0} ${(null==r?void 0:r.to)||0} ${(null==a?void 0:a.to)||0})`
                }
            })(s, h);
            return t.style.clipPath = e, a.clipPath = [e, s], {
                parts: {
                    offset: o,
                    params: x(x({}, n), a)
                },
                reset: () => {
                    t.style.removeProperty("clip-path"), r()
                }
            }
        };
    var Je = Ke("in"),
        Qe = Ke("out");
    const ti = {
            tl: "left top",
            tr: "right top",
            tc: "center top",
            ml: "left center",
            mc: "center center",
            mr: "right center",
            bl: "left bottom",
            br: "right bottom",
            bc: "center bottom"
        },
        ei = (t, e) => {
            switch (t) {
                case "mc":
                default:
                    return .5 * Math.sqrt(e.width ** 2 + e.height ** 2);
                case "tl":
                case "tr":
                case "bl":
                case "br":
                    return Math.sqrt(e.width ** 2 + e.height ** 2);
                case "tc":
                case "bc":
                    return Math.sqrt((e.width / 2) ** 2 + e.height ** 2);
                case "ml":
                case "mr":
                    return Math.sqrt(e.width ** 2 + (e.height / 2) ** 2)
            }
        },
        ii = x({}, ue),
        si = h => (t, e) => {
            var {
                circleOrigin: i = "mc",
                radius: s = {
                    value: 100,
                    unit: "%"
                }
            } = x(x({}, ii), e);
            const {
                parts: {
                    params: n,
                    offset: o
                },
                reset: r
            } = me(t, e), a = {};
            var {
                from: s,
                to: i
            } = ((t, e, i, s) => {
                let n = "number" == typeof t ? t : t.value;
                var o = "number" == typeof t ? "px" : t.unit,
                    [r, t] = ti[e].split(" ");
                return "%" === o && (n = ei(e, i) * n / 100), {
                    from: `circle(${qe({value:"in"===s?0:n,unit:"px"})} at ${r} ${t})`,
                    to: `circle(${qe({value:"in"===s?n:0,unit:"px"})} at ${r} ${t})`
                }
            })(s, i, {
                width: t.clientWidth,
                height: t.clientHeight
            }, h);
            return t.style.clipPath = s, a.clipPath = [s, i], {
                parts: {
                    offset: o,
                    params: x(x({}, n), a)
                },
                reset: () => {
                    t.style.removeProperty("clip-path"), r()
                }
            }
        };
    var ni = si("in"),
        oi = si("out");
    const ri = (t, e) => {
            const i = t.map(t => {
                var {
                    x: e,
                    y: i
                } = t.from, {
                    x: s,
                    y: t
                } = t.to;
                return {
                    from: `${qe(e)} ${qe(i)}`,
                    to: `${qe(s)} ${qe(t)}`
                }
            });
            var s = i.map(t => t.from).join(","),
                t = i.map(t => t.to).join(",");
            return {
                from: `polygon(${"in"===e?s:t})`,
                to: `polygon(${"in"===e?t:s})`
            }
        },
        ai = x(x({}, ue), {}, {
            direction: "tl",
            use45deg: !0
        }),
        hi = {
            tl: [{
                from: {
                    x: 0,
                    y: 0
                },
                to: {
                    x: 0,
                    y: 0
                }
            }, {
                from: {
                    x: 0,
                    y: 0
                },
                to: {
                    x: {
                        value: 200,
                        unit: "%"
                    },
                    y: 0
                }
            }, {
                from: {
                    x: 0,
                    y: 0
                },
                to: {
                    x: 0,
                    y: {
                        value: 200,
                        unit: "%"
                    }
                }
            }],
            tr: [{
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: 0
                },
                to: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: 0
                }
            }, {
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: 0
                },
                to: {
                    x: {
                        value: -200,
                        unit: "%"
                    },
                    y: 0
                }
            }, {
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: 0
                },
                to: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: 200,
                        unit: "%"
                    }
                }
            }],
            br: [{
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                }
            }, {
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: {
                        value: -200,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                }
            }, {
                from: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: {
                        value: 100,
                        unit: "%"
                    },
                    y: {
                        value: -200,
                        unit: "%"
                    }
                }
            }],
            bl: [{
                from: {
                    x: 0,
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: 0,
                    y: {
                        value: 100,
                        unit: "%"
                    }
                }
            }, {
                from: {
                    x: 0,
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: {
                        value: 200,
                        unit: "%"
                    },
                    y: {
                        value: 100,
                        unit: "%"
                    }
                }
            }, {
                from: {
                    x: 0,
                    y: {
                        value: 100,
                        unit: "%"
                    }
                },
                to: {
                    x: 0,
                    y: {
                        value: -200,
                        unit: "%"
                    }
                }
            }]
        },
        li = l => (t, e) => {
            var {
                direction: i,
                use45deg: s
            } = x(x({}, ai), e);
            const {
                parts: {
                    params: n,
                    offset: o
                },
                reset: r
            } = me(t, e), a = {};
            var {
                from: h,
                to: i
            } = s ? ri((h = t.clientWidth, s = t.clientHeight, {
                tl: [{
                    from: {
                        x: 0,
                        y: 0
                    },
                    to: {
                        x: 0,
                        y: 0
                    }
                }, {
                    from: {
                        x: 0,
                        y: 0
                    },
                    to: {
                        x: {
                            value: h + s,
                            unit: "px"
                        },
                        y: 0
                    }
                }, {
                    from: {
                        x: 0,
                        y: 0
                    },
                    to: {
                        x: 0,
                        y: {
                            value: h + s,
                            unit: "px"
                        }
                    }
                }],
                tr: [{
                    from: {
                        x: {
                            value: 100,
                            unit: "%"
                        },
                        y: 0
                    },
                    to: {
                        x: {
                            value: 100,
                            unit: "%"
                        },
                        y: 0
                    }
                }, {
                    from: {
                        x: {
                            value: h,
                            unit: "px"
                        },
                        y: 0
                    },
                    to: {
                        x: {
                            value: -s,
                            unit: "px"
                        },
                        y: 0
                    }
                }, {
                    from: {
                        x: {
                            value: 100,
                            unit: "%"
                        },
                        y: 0
                    },
                    to: {
                        x: {
                            value: 100,
                            unit: "%"
                        },
                        y: {
                            value: h + s,
                            unit: "px"
                        }
                    }
                }],
                br: [{
                    from: {
                        x: {
                            value: 100,
                            unit: "%"
                        },
                        y: {
                            value: 100,
                            unit: "%"
                        }
                    },
                    to: {
                        x: {
                            value: 100,
                            unit: "%"
                        },
                        y: {
                            value: 100,
                            unit: "%"
                        }
                    }
                }, {
                    from: {
                        x: {
                            value: h,
                            unit: "%"
                        },
                        y: {
                            value: 100,
                            unit: "%"
                        }
                    },
                    to: {
                        x: {
                            value: -s,
                            unit: "px"
                        },
                        y: {
                            value: 100,
                            unit: "%"
                        }
                    }
                }, {
                    from: {
                        x: {
                            value: 100,
                            unit: "%"
                        },
                        y: {
                            value: s,
                            unit: "%"
                        }
                    },
                    to: {
                        x: {
                            value: 100,
                            unit: "%"
                        },
                        y: {
                            value: -h,
                            unit: "px"
                        }
                    }
                }],
                bl: [{
                    from: {
                        x: 0,
                        y: {
                            value: 100,
                            unit: "%"
                        }
                    },
                    to: {
                        x: 0,
                        y: {
                            value: 100,
                            unit: "%"
                        }
                    }
                }, {
                    from: {
                        x: 0,
                        y: {
                            value: 100,
                            unit: "%"
                        }
                    },
                    to: {
                        x: {
                            value: s + h,
                            unit: "px"
                        },
                        y: {
                            value: 100,
                            unit: "%"
                        }
                    }
                }, {
                    from: {
                        x: 0,
                        y: {
                            value: s,
                            unit: "%"
                        }
                    },
                    to: {
                        x: 0,
                        y: {
                            value: -h,
                            unit: "px"
                        }
                    }
                }]
            })[i], l) : ri(hi[i], l);
            return t.style.clipPath = h, a.clipPath = [h, i], {
                parts: {
                    offset: o,
                    params: x(x({}, n), a)
                },
                reset: () => {
                    t.style.removeProperty("clip-path"), r()
                }
            }
        };
    var ci = li("in"),
        di = li("out");
    const pi = x({}, ue),
        ui = a => (t, e) => {
            var {
                points: i = []
            } = x(x({}, pi), e);
            const {
                parts: {
                    params: s,
                    offset: n
                },
                reset: o
            } = me(t, e), r = {};
            var {
                from: e,
                to: i
            } = ri(i, a);
            return console.log(e), t.style.clipPath = e, r.clipPath = [e, i], {
                parts: {
                    offset: n,
                    params: x(x({}, s), r)
                },
                reset: () => {
                    t.style.removeProperty("clip-path"), o()
                }
            }
        };
    var mi = ui("in"),
        Ee = ui("out");
    const gi = {
            type: "inset"
        },
        vi = a => (t, e) => {
            var i = x(x({}, gi), e),
                s = i["type"],
                n = S(i, ne);
            let o;
            switch (s) {
                case "circle":
                    o = si(a)(t, n);
                    break;
                case "inset":
                case "rect":
                default:
                    var {
                        direction: r = "left"
                    } = n;
                    o = (["left", "right", "top", "bottom"].includes(r) ? Ke : li)(a)(t, n);
                    break;
                case "diagonal":
                    o = li(a)(t, n);
                    break;
                case "polygon":
                    o = ui(a)(t, n)
            }
            var {
                reset: e,
                parts: {
                    params: i,
                    offset: s
                }
            } = o;
            return {
                parts: {
                    offset: s,
                    params: i
                },
                reset: e
            }
        };
    Le = vi("in"), Pe = vi("out");
    const fi = x(x({}, ue), {}, {
        clipParams: gi,
        moveAndTransformParams: we
    });
    We = u => (t, e) => {
        var i = x(x({}, fi), e),
            {
                duration: s,
                delay: n,
                easing: o,
                clipParams: r
            } = i,
            a = S(i, oe);
        const h = ae(t, document.createElement("div"));
        e = de(t, "width"), i = de(t, "height");
        null !== e && "auto" !== e && (t.style.width = "100%", h.style.width = e), null !== i && "auto" !== i && (t.style.height = "100%", h.style.height = i), h.style.overflow = "hidden";
        const {
            reset: l,
            parts: c
        } = vi(u)(h, x({
            duration: s,
            delay: n,
            easing: o
        }, r)), {
            reset: d,
            parts: p
        } = xe(u)(t, x({
            duration: s,
            delay: n,
            easing: o
        }, a));
        return {
            parts: [c, p],
            reset: () => {
                d(), l(), he(h)
            }
        }
    }, He = We("in"), we = We("out");
    const yi = (t, e = 1) => Math.round(t * 10 ** e) / 10 ** e,
        _i = (t, e, i, s, n, o = 0) => {
            e /= s, i /= n, i = "cover" === t ? Math.max(e, i) : Math.min(e, i);
            return void 0 !== o ? {
                width: yi(s * i, o),
                height: yi(n * i, o)
            } : {
                width: s * i,
                height: n * i
            }
        };

    function bi(t, e, i, s, n, o, r = !1) {
        (r || t < n || e < o) && ({
            width: t,
            height: e
        } = _i("cover", n, o, t, e));
        const a = {
            x: t * i - n / 2,
            y: e * s - o / 2
        };
        return a.x = Math.min(t - n, Math.max(0, a.x)), a.y = Math.min(e - o, Math.max(0, a.y)), {
            position: a,
            mediaSize: {
                width: t,
                height: e
            }
        }
    }
    const wi = x(x({}, ue), {}, {
        fade: !1,
        scale: 1,
        duration: 5e3
    });
    We = m => (t, e) => {
        var i = x(x({}, wi), e),
            {
                selector: s = "img",
                focalPoint: n = {
                    x: .5,
                    y: .5
                },
                set: o,
                scale: r
            } = i,
            a = S(i, re),
            {
                offsetWidth: e,
                offsetHeight: i
            } = t;
        const h = t.querySelector(s),
            l = o || {};
        o = {
            width: h.clientWidth,
            height: h.clientHeight
        };
        null !== l && void 0 !== l && l.focalPoint || ({
            left: c,
            top: d
        } = getComputedStyle(h), l.focalPoint = {
            x: (-parseFloat("auto" === c ? "0" : c) + e / 2) / o.width,
            y: (-parseFloat("auto" === d ? "0" : d) + i / 2) / o.height
        });
        var {
            position: c,
            mediaSize: d
        } = bi(o.width, o.height, l.focalPoint.x, l.focalPoint.y, e, i), {
            position: e,
            mediaSize: i
        } = bi(o.width * r, o.height * r, n.x, n.y, e, i);
        const p = h.style.transformOrigin,
            u = h.style.transform;
        Object.assign(h.style, {
            transformOrigin: "top left"
        });
        var d = xe(m)(h, x(x({}, a), {}, {
            direction: "custom",
            x: c.x - e.x,
            y: c.y - e.y,
            scale: i.width / d.width
        }))["parts"];
        return t.style.overflow = "hidden", {
            parts: d,
            reset: () => {
                h.style.transformOrigin = p, h.style.transform = u, Ct.remove(h)
            }
        }
    };
    const xi = { in: {
            move: _e,
            moveAndTransform: Se,
            mask: Ce,
            maskAndTransform: Ie,
            reveal: Me,
            text: Ne,
            revealText: Ne,
            fade: Ye,
            clipInset: Je,
            clipCircle: ni,
            clip: Le,
            clipAndTransform: He,
            clipPolygon: mi,
            clipDiagonal: ci,
            kenBurns: We("in")
        },
        out: {
            move: be,
            moveAndTransform: Ae,
            mask: ke,
            maskAndTransform: $e,
            reveal: Be,
            text: Fe,
            revealText: Fe,
            fade: Xe,
            clipInset: Qe,
            clipCircle: oi,
            clip: Pe,
            clipAndTransform: we,
            clipPolygon: Ee,
            clipDiagonal: di,
            kenBurns: We("out")
        }
    };
    var Si, Ai, Ei, Ci = (t, e, i, s, n, o, r = 0) => {
        const {
            parts: a,
            reset: h
        } = Oe(t, e, i, s);
        return n = n || Ct.timeline(o), Array.isArray(a) ? a.forEach(t => {
            var {
                offset: e = 0,
                params: t
            } = t;
            n.add(t, "string" == typeof e ? e : e + r)
        }) : ({
            offset: s = 0,
            params: o
        } = a, n.add(o, "string" == typeof s ? s : s + r)), {
            timeline: n,
            reset: h,
            parts: a,
            phase: i
        }
    };
    Oe, xi;
    const ki = (t, e) => {
            var i;
            return null !== (i = t.parentElement) && void 0 !== i && i.insertBefore(e, t), e.appendChild(t), e
        },
        Li = (t, e, i) => {
            let s = "";
            return t.hasAttribute(`data-${e}`) && (s = t.getAttribute(`data-${e}`), t.removeAttribute(`data-${e}`)), i && t.hasAttribute(`data-${i}`) && (s = t.getAttribute(`data-${i}`), t.removeAttribute(`data-${i}`)), !!s && (t.setAttribute(e, s), !0)
        },
        Ii = (t, e, i, s, n) => {
            e /= s, i /= n, i = "cover" === t ? Math.max(e, i) : Math.min(e, i);
            return {
                width: s * i,
                height: n * i
            }
        },
        $i = t => "object" == typeof t && 0 === Object.keys(t).length,
        Oi = t => "object" == typeof t ? t.value : t,
        Ti = (e, i) => {
            const s = {};
            return Object.keys(e).forEach(t => {
                s[t] = i(e[t], t)
            }), s
        },
        Pi = e => {
            try {
                return JSON.parse(e.replace(/'/g, '"'))
            } catch (t) {
                console.warn("Given data value is not a valid JSON, skipped. \n " + e)
            }
            return null
        },
        Mi = ["type"];
    class Bi {
        static isAnimative(t) {
            return function(t, e) {
                let i = !1;
                return [].some.call(t.attributes, t => (i = e.test(t.name), i)), i
            }(t, /^(data(-\w+)*-animation-(in|out))$/g)
        }
        constructor(i, s, n, t) {
            this.target = i, this.element = n, this.sourceElement = s;
            const o = v(this.sourceElement, "animation-in") || {},
                r = v(this.sourceElement, "animation-out") || {},
                a = !!t && {
                    type: "move",
                    duration: 1e3,
                    direction: "top",
                    movement: 0
                };
            this.animationsData = ["none", ...d].map(t => {
                var e = g(o, t),
                    t = g(r, t);
                return {
                    animationIn: e ? this.parseAnimationData(e) : a,
                    animationOut: t ? this.parseAnimationData(t) : a,
                    target: i,
                    sourceElement: s,
                    targetElement: n
                }
            }), this.animatorIsSet = !1, m.on("breakpointChange", this.setAnimator, this), i.animateInOut = (t, e = !1) => !!["in", "out"].includes(t) && this.startAnimation(t, e);
            const e = i.show;
            i.show = (t = !0) => {
                e ? e.call(i) : i.element.classList.remove(`${l}-is-hidden`), t && i.animateInOut("in")
            };
            const h = i.hide;
            i.hide = (t = !0) => {
                t && i.animateInOut("out") || (h ? h.call(i) : i.element.classList.add(`${l}-is-hidden`), this.status = "out-end")
            }, i.progressInOut = (t, e) => {
                ["in", "out"].includes(e) && this.progressAnimation(e, t)
            }, i.killInOutAnimation = () => {
                this.removeActiveAnimator()
            }
        }
        parseAnimationData(e) {
            e = e.replace(/'/g, '"');
            let t = "";
            try {
                t = JSON.parse(e)
            } catch (t) {
                return console.warn("Given animation data value is not a valid JSON, animation skipped. \n " + e), ""
            }
            return t
        }
        _animationBegin(t, e) {
            e && this._progressed || (this.status = t + "-start", this.target.show(!1), this.target.trigger("in" === t ? "animationInStart" : "animationOutStart", [this.target, this.status], !0))
        }
        _animationEnd(t, e) {
            e && this._progressed || (this.status = t + "-end", this.target.trigger("in" === t ? "animationInEnd" : "animationOutEnd", [this.target, this.status], !0), "in" === t ? this.removeActiveAnimator() : "out" === t && this.target.hide(!1))
        }
        removeActiveAnimator() {
            this.activeAnimator && (this.activeAnimator.reset(), this.activeAnimator = null)
        }
        generateNewAnimator(t) {
            var e = g(this.animationsData);
            if (!this.hasAnimation(t, e)) return null;
            var i = e["in" === t ? "animationIn" : "animationOut"],
                e = i["type"],
                i = S(i, Mi),
                i = Ci(e, this.element, t, i, null, {
                    autoplay: !1,
                    begin: () => this._animationBegin(t, !0),
                    complete: () => this._animationEnd(t, !0)
                });
            return this.status = t + "-init", this.activePhase = t, i
        }
        startAnimation(t, e = !1) {
            if (this._progressed = !1, this.animatorIsSet || this.setAnimator(), !e && t + "-end" === this.status) return !1;
            if (t === this.activePhase && this.activeAnimator || (this.removeActiveAnimator(), this.activeAnimator = this.generateNewAnimator(t)), !this.activeAnimator) return !1;
            const i = this.activeAnimator["timeline"];
            return (e || "in" === t && "in-init" === this.status || "out" === t && "out-init" === this.status) && (i.seek(0), i.play()), !0
        }
        progressAnimation(t, e) {
            if (this._progressed = !0, this.animatorIsSet || this.setAnimator(), t === this.activePhase && this.activeAnimator || (this.removeActiveAnimator(), this.activeAnimator = this.generateNewAnimator(t)), this.activeAnimator) {
                const i = this.activeAnimator["timeline"];
                i.seek(i.duration * e), 1 <= e && this.status !== `${t}-end` && this._animationEnd(t), (e < 1 && this.status === `${t}-end` || this.status === `${t}-init`) && this._animationBegin(t)
            }
        }
        setAnimator() {
            if (this.animatorIsSet = !0, "in-end" !== this.status) {
                let t = 0,
                    e = !1;
                var i;
                if (this.activePhase || (this.activePhase = "in"), this.activeAnimator && (i = this.activeAnimator["timeline"], t = i.progress, e = i.began && !i.paused, this.removeActiveAnimator()), this.activeAnimator = this.generateNewAnimator(this.activePhase), this.activeAnimator) {
                    const s = this.activeAnimator["timeline"];
                    t && s.seek(s.duration * (t / 100)), e && s.play()
                } else this.status = "in-end"
            }
        }
        hasAnimation(t, e) {
            return "in" === t ? !!e.animationIn : !!e.animationOut
        }
    }

    function zi(t, e, i, s, n, o, r = !1) {
        (r || t < n || e < o) && ({
            width: t,
            height: e
        } = Ii("cover", n, o, t, e));
        const a = {
            x: t * i - n / 2,
            y: e * s - o / 2
        };
        return a.x = Math.min(t - n, Math.max(0, a.x)), a.y = Math.min(e - o, Math.max(0, a.y)), {
            position: a,
            mediaSize: {
                width: t,
                height: e
            }
        }
    }
    "undefined" != typeof window && (Ss = (Ss = window.navigator.userAgent.match(/Edge\/(\d{2})\./)) ? parseInt(Ss[1], 10) : null, Si = !!Ss && 16 <= Ss && Ss <= 18, "objectFit" in document.documentElement.style == 0 || Si ? (Ai = function(t, e, i) {
        var s, n, o, r, a;
        if ((i = i.split(" ")).length < 2 && (i[1] = i[0]), "x" === t) s = i[0], n = i[1], o = "left", r = "right", a = e.clientWidth;
        else {
            if ("y" !== t) return;
            s = i[1], n = i[0], o = "top", r = "bottom", a = e.clientHeight
        }
        if (s !== o && n !== o) {
            if (s !== r && n !== r) return "center" === s || "50%" === s ? (e.style[o] = "50%", void(e.style["margin-" + o] = a / -2 + "px")) : void(0 <= s.indexOf("%") ? (s = parseInt(s, 10)) < 50 ? (e.style[o] = s + "%", e.style["margin-" + o] = a * (s / -100) + "px") : (e.style[r] = (s = 100 - s) + "%", e.style["margin-" + r] = a * (s / -100) + "px") : e.style[o] = s);
            e.style[r] = "0"
        } else e.style[o] = "0"
    }, Ei = function(t) {
        var e, i, s, n, o = (o = t.dataset ? t.dataset.objectFit : t.getAttribute("data-object-fit")) || "cover",
            r = (r = t.dataset ? t.dataset.objectPosition : t.getAttribute("data-object-position")) || "50% 50%",
            a = t.parentNode;
        return e = a, i = window.getComputedStyle(e, null), s = i.getPropertyValue("position"), n = i.getPropertyValue("overflow"), i = i.getPropertyValue("display"), s && "static" !== s || (e.style.position = "relative"), "hidden" !== n && (e.style.overflow = "hidden"), i && "inline" !== i || (e.style.display = "block"), 0 === e.clientHeight && (e.style.height = "100%"), -1 === e.className.indexOf("object-fit-polyfill") && (e.className = e.className + " object-fit-polyfill"),
            function(t) {
                var e, i = window.getComputedStyle(t, null),
                    s = {
                        "max-width": "none",
                        "max-height": "none",
                        "min-width": "0px",
                        "min-height": "0px",
                        top: "auto",
                        right: "auto",
                        bottom: "auto",
                        left: "auto",
                        "margin-top": "0px",
                        "margin-right": "0px",
                        "margin-bottom": "0px",
                        "margin-left": "0px"
                    };
                for (e in s) i.getPropertyValue(e) !== s[e] && (t.style[e] = s[e])
            }(t), t.style.position = "absolute", t.style.width = "auto", t.style.height = "auto", "none" === (o = "scale-down" === o ? t.clientWidth < a.clientWidth && t.clientHeight < a.clientHeight ? "none" : "contain" : o) ? (Ai("x", t, r), void Ai("y", t, r)) : "fill" === o ? (t.style.width = "100%", t.style.height = "100%", Ai("x", t, r), void Ai("y", t, r)) : (t.style.height = "100%", void("cover" === o && t.clientWidth > a.clientWidth || "contain" === o && t.clientWidth < a.clientWidth ? (t.style.top = "0", t.style.marginTop = "0", Ai("x", t, r)) : (t.style.width = "100%", t.style.height = "auto", t.style.left = "0", t.style.marginLeft = "0", Ai("y", t, r))))
    }, Ss = function(t) {
        if (void 0 === t || t instanceof Event) t = document.querySelectorAll("[data-object-fit]");
        else if (t && t.nodeName) t = [t];
        else if ("object" != typeof t || !t.length || !t[0].nodeName) return !1;
        for (var e = 0; e < t.length; e++)
            if (t[e].nodeName) {
                var i = t[e].nodeName.toLowerCase();
                if ("img" === i) {
                    if (Si) continue;
                    t[e].complete ? Ei(t[e]) : t[e].addEventListener("load", function() {
                        Ei(this)
                    })
                } else "video" !== i || 0 < t[e].readyState ? Ei(t[e]) : t[e].addEventListener("loadedmetadata", function() {
                    Ei(this)
                })
            }
        return !0
    }, "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", Ss) : Ss(), window.addEventListener("resize", Ss), window.objectFitPolyfill = Ss) : window.objectFitPolyfill = function() {
        return !1
    });
    const Di = (n, o, t, e = "50% 50%", r) => {
        const {
            objectFit: i = t,
            objectPosition: s = e
        } = n.dataset, a = i.split(",").map(t => t.trim()), h = s.split(",").map(t => t.trim());
        let l, c;
        const d = (t, e) => {
            var i, s;
            !e && l && "custom" !== l || (l = g(a, t), c = g(h, t), "custom" !== l ? (n.style.width = "", n.style.height = "", n.style.left = "", n.style.right = "", n.classList.remove(`${r}-cropped`), function(t, e, i, s, n) {
                if ("tile" === (e = s && t.hasAttribute("data-object-fit") ? t.getAttribute("data-object-fit") : e) && "IMG" === t.nodeName) return t.style.visibility = "hidden", t.parentElement.style.backgroundImage = `url( ${t.getAttribute("data-src")||t.src})`;
                t.hasAttribute("data-object-fit") && !n || t.setAttribute("data-object-fit", e), t.style.objectFit = e, (i = s && t.hasAttribute("data-object-position") ? t.getAttribute("data-object-position") : i) && (t.hasAttribute("data-object-position") && !n || t.setAttribute("data-object-position", i), t.style.objectPosition = i), window.objectFitPolyfill && window.objectFitPolyfill(t)
            }(n, l, c, !1, !0)) : ({
                offsetWidth: i,
                offsetHeight: s
            } = o || n.parentElement, e = n, e = Ti(v(e, "crop"), t => "false" !== t.trim() && Pi(t)), {
                focalPoint: e,
                mediaSize: t
            } = g(e, t), {
                position: i,
                mediaSize: s
            } = zi(t.width, t.height, e.x, e.y, i, s), n.style.objectFit = "", n.style.width = `${null==s?void 0:s.width}px`, n.style.height = `${null==s?void 0:s.height}px`, n.style.left = `-${null==i?void 0:i.x}px`, n.style.top = `-${null==i?void 0:i.y}px`, n.classList.add(`${r}-cropped`)))
        };
        return m.on("breakpointChange", (t, e) => d(e, !0)), d(m.activeBreakpoint), {
            update: () => d(m.activeBreakpoint),
            currentObjectFit: l,
            currentObjectFitPosition: c
        }
    };

    function Vi(t, e, i) {
        Li(t, "srcset"), Li(t, "src"), Li(t, "srcset", "depicter-srcset"), Li(t, "src", "depicter-src"), t.complete ? (e || i) && (t.naturalWidth && e ? e() : i && i()) : (e && t.addEventListener("load", e, !1), i && t.addEventListener("error", i, !1))
    }
    const ji = (t, e, i, s) => {
        const n = t.querySelector("img"),
            o = t.querySelectorAll("source");
        n || o.length ? (o.forEach(t => {
            Li(t, "srcset", "depicter-srcset")
        }), Li(n, "src", "depicter-src"), e && n.addEventListener("load", e, !1), i && n.addEventListener("error", i, !1), s && window.addEventListener("resize", () => {
            n.complete || s()
        })) : e()
    };
    class Ri extends t {
        constructor(t, e = !0) {
            super(), this.parentEmitter = t, this.section = t, this.container = document.createElement("div"), this.container.classList.add(`${l}-background-container`), this.container.classList.add(`${l}-bg-container`), this.element = document.createElement("div"), this.element.classList.add(`${l}-section-background`), this.animationWrap = document.createElement("div"), this.animationWrap.classList.add(`${l}-background-animation-wrap`), this.animationWrap.appendChild(this.element), this.container.appendChild(this.animationWrap), t.composer.options.get("disableAnimations") || (this.inOutAnimation = new Bi(this, t.element, this.animationWrap, e)), this._onBgImageLoad = this._onBgImageLoad.bind(this), this._onBgImageLoadError = this._onBgImageLoadError.bind(this)
        }
        appendTo(t) {
            t.appendChild(this.container)
        }
        appendBackground(t) {
            this.element.appendChild(t)
        }
        appendBackgroundImage(t, e) {
            this.backgroundImage = t, this.appendBackground(t), this.isPicture = "PICTURE" === t.tagName, this.targetImg = this.isPicture ? t.querySelector("img") : t;
            var e = Di(this.targetImg, this.element, e, void 0, l)["update"];
            this.section.on("resize", e, void 0, 100), this.updateBgImageFit = e
        }
        loadBackgroundImage() {
            this.backgroundImage && (this.isPicture ? ji : Vi)(this.backgroundImage, this._onBgImageLoad, this._onBgImageLoadError)
        }
        _onBgImageLoad(t) {
            this.updateBgImageFit(), this.trigger("backgroundImageLoad", [t, this.backgroundImage])
        }
        _onBgImageLoadError(t) {
            this.trigger("backgroundImageLoadError", [t, this.backgroundImage])
        }
    }
    class Wi extends t {
        constructor(t, e, i = !0) {
            super(), this.element = t, this.composer = e, this.view = e.view, this.id = t.id, this.eventPrefix = "section", this.parentEmitter = this.composer, this.readyTrigger = new Xt(this.ready.bind(this)), this.loadTrigger = new Xt(this.loadContent.bind(this), !1), this.targetHeight = t.dataset.wrapperHeight ? t.dataset.wrapperHeight.split(",") : e.options.get("height"), this._active = !1, this.addDefaultAnimation = i, this._setupBackground()
        }
        get active() {
            return this._active
        }
        set active(t) {
            this._active !== t && (this._active = t, this.isActivated = t, this.element.classList[t ? "add" : "remove"](`${l}-active`), this.trigger(t ? "activated" : "deactivated", [this], !0), this.isReady && this.trigger(t ? "readyAndActivated" : "readyAndDeactivated", [this], !0))
        }
        get status() {
            return this._status
        }
        set status(t) {
            var e;
            t !== this._status && (this.element.classList.add(`${l}-${t}`), this._status && this.element.classList.remove(`${l}-${this._status}`), e = this._status, this._status = t, this.trigger("statusChange", [this, t, e], !0))
        }
        reactive() {
            this.active && (this.active = !1, this.active = !0)
        }
        calculateSize() {}
        mount() {
            !1 !== this.firstMount ? this.firstMount = !0 : this.firstMount = !1, this.trigger("beforeMount", [this], !0), this.mounted = !0, this.isReady || this.isLoading || this.loadTrigger.exec(), this.trigger("afterMount", [this], !0)
        }
        unmount() {
            this.mounted = !1
        }
        ready() {
            this.element.classList.add(`${l}-ready`), this.isReady = !0, this.isLoading = !1, this.trigger("ready", [this], !0), this._active && this.trigger("readyAndActivated", [this], !0)
        }
        loadContent() {
            this.isLoading = !0, this.trigger("loadingStart", [this], !0), this.backgroundImage ? (this._onBgLoad = this._onBgLoad.bind(this), this.background.on("backgroundImageLoad, backgroundImageLoadError", this._onBgLoad), this.background.loadBackgroundImage()) : this.readyTrigger.exec()
        }
        checkResize(t) {
            var e = this.element.offsetWidth,
                i = this.element.offsetHeight;
            !t && this.height === i && this.width === e || (this.width = e, this.height = i, this.trigger("resize", [this, e, i], !0))
        }
        _setupBackground() {
            this.background = new Ri(this, this.addDefaultAnimation), this.background.appendTo(this.element), this.backgroundImage = this.element.querySelector(`:scope > img.${l}-bg,:scope > picture.${l}-bg`), this.backgroundImage && (this.background.appendBackgroundImage(this.backgroundImage, this.composer.options.get("sectionFit")), this.trigger("bgImageSetup", [this.backgroundImage], !0))
        }
        _onBgLoad() {
            this.trigger("bgImageLoad", [this], !0), this._bgLoaded || this.readyTrigger.exec(), this._bgLoaded = !0
        }
    }
    Jt.registerSection("block", class extends Wi {
        constructor(t, e) {
            super(t, e, !1), this.space = 0, this.merge = 1, this.position = -1, this.offset = -1, this.size = 0, this.element.hasAttribute("data-merge") && (this.merge = (t = this.element.getAttribute("data-merge"), e = !0, "string" != typeof t ? t : (t = t.replace(/\s+/g, "").split(","), e ? t.map(t => Number.parseInt(t, 10)) : t))), this.trigger("sectionCreate", [this], !0)
        }
        get pendingOffset() {
            return this._pendingOffset
        }
        set pendingOffset(t) {
            t !== this._pendingOffset && (this._pendingOffset = t, this.trigger("pendingOffsetChange", [this, t, t / this.size]))
        }
        triggerPendingOffsetChange() {
            this.trigger("pendingOffsetChange", [this, this._pendingOffset, this._pendingOffset / this.size])
        }
        get active() {
            return this._active
        }
        set active(t) {
            this._active !== t && this.isReady && this.background.inOutAnimation && this.background.inOutAnimation.startAnimation(t ? "in" : "out", !0), super.active = t
        }
        ready() {
            super.ready(), this._active && this.background.inOutAnimation && this.background.inOutAnimation.startAnimation("in")
        }
        calculateSize() {
            var t = this.composer.options.get("columns");
            let e = g(this.merge);
            var i, s = this.view.options.is("dir", "h");
            t ? (t = g(t), i = this.view.size - this.space * (t - 1), this.size = i / t + this.space, 1 < e && (e = Math.min(t, e), this.size = this.size * e + this.space * (e - 1), i += this.space * (e - 1))) : this.size = this.view.size + this.space, this.element.style.width = s ? this.size + "px" : this.view.width + "px", this.checkResize()
        }
        inRangeTest(t, e = 1) {
            return t >= this.position && t < this.position + this.size * e
        }
    });
    var Ni = new WeakMap;
    Jt.registerSection("animative", class extends Wi {
        constructor(t, e) {
            super(t, e), r(this, Ni, {
                writable: !0,
                value: ""
            }), this.inAnimation = {
                duration: 0,
                start: 0
            }, this.outAnimation = {
                duration: 0,
                start: 0
            }, this.appearDuration = 0, this.disappearDuration = 0, this.element.classList.add(`${l}-anim-section`), this.disableAnimationAdapterControl = !0, this.trigger("sectionCreate", [this], !0), this.once("readyAndActivated", () => {
                this.startInOutAnimation("in")
            })
        }
        get position() {
            return this.outAnimation.start
        }
        get size() {
            return this.disappearDuration
        }
        updateDurations() {
            var t = u;
            e(this, Ni) !== t && (i(this, Ni, t), this.inAnimation.duration = this.getInOutAnimationDuration("in"), this.outAnimation.duration = this.getInOutAnimationDuration("out"))
        }
        inRangeTest(t) {
            return t > this.inAnimation.start && t < this.inAnimation.start + this.appearDuration ? "in" : t > this.outAnimation.start && t < this.outAnimation.start + this.disappearDuration ? "out" : t === this.outAnimation.start && "in-end"
        }
        remaining(t, e) {
            e = e || this.inRangeTest(t);
            return "in" === e ? 1 - (t - this.inAnimation.start) / this.appearDuration : "out" === e || "in-end" === e ? 1 - (t - this.outAnimation.start) / this.disappearDuration : NaN
        }
        getLastAnimativeElement(t) {
            const i = "in" === t ? "animationIn" : "animationOut";
            let s, n = 0;
            return [...this.layersAnimations || [], this.background.inOutAnimation.animationsData].forEach(t => {
                var e;
                !t || (e = g(t))[i] && ((t = (e[i].duration || 0) + (e[i].delay || 0)) > n && (s = e.target), n = Math.max(t, n))
            }), {
                target: s,
                duration: n
            }
        }
        getInOutAnimationDuration(t, e) {
            var i;
            return Math.max(this.getLastAnimativeElement(t).duration, "in" === t && (null == e || null === (i = e.getInOutAnimationDuration) || void 0 === i ? void 0 : i.call(e, "out")) || 0)
        }
        startInOutAnimation(i) {
            var t, e;
            this.killInOutAnimation(), null == this || null !== (e = this.layersController) && void 0 !== e && e.layers.forEach(t => {
                var e;
                null == t || null !== (e = t.animateInOut) && void 0 !== e && e.call(t, i, !0)
            }), null === (t = this.background) || void 0 === t || null !== (e = t.animateInOut) && void 0 !== e && e.call(t, i, !0), this.getLastAnimativeElement(i).target.on("animationInEnd, animationOutEnd", () => {
                this.trigger("allInOutAnimationsEnd", [i])
            }, this)
        }
        progressInOutAnimation(i, s) {
            var t, e;
            this.killInOutAnimation(), s = Math.max(0, Math.min(1, s)), null == this || null !== (t = this.layersController) && void 0 !== t && t.layers.forEach(t => {
                var e;
                null == t || null !== (e = t.progressInOut) && void 0 !== e && e.call(t, s, i, !0)
            }), null !== (t = (e = this.background).progressInOut) && void 0 !== t && t.call(e, s, i, !0)
        }
        killInOutAnimation() {
            var t, e;
            this.getLastAnimativeElement("in").target.offOnContext(this), this.getLastAnimativeElement("out").target.offOnContext(this), null == this || null !== (t = this.layersController) && void 0 !== t && t.layers.forEach(t => {
                var e;
                null == t || null !== (e = t.killInOutAnimation) && void 0 !== e && e.call(t)
            }), null !== (t = (e = this.background).killInOutAnimation) && void 0 !== t && t.call(e)
        }
        calculateSize() {
            this.element.style.width = this.view.width + "px", this.checkResize()
        }
    });
    var di = window.getComputedStyle(document.documentElement, ""),
        We = (Array.prototype.slice.call(di).join("").match(/-(moz|webkit|ms)-/) || "" === di.OLink && ["", "o"])[1],
        Fi = {
            dom: "WebKit|Moz|MS|O".match(new RegExp("(" + We + ")", "i"))[1],
            lowercase: We,
            css: "-" + We + "-",
            js: {
                moz: "Moz",
                webkit: "Webkit",
                o: "O",
                ms: "ms"
            }[We]
        };
    class Hi extends Ot {
        constructor() {
            super(), this.options = new Rt, this.readOptions = this.readOptions.bind(this), this.options.observe(this.options.register({
                dir: "h",
                reverse: !1,
                space: 0,
                loop: !1,
                instantActive: !0
            }), this.readOptions), this.readOptions()
        }
        readOptions() {
            const e = this._positionProp;
            var t = this.options.get("reverse");
            this._space = this.options.get("space"), this._loop = this.options.get("loop"), this._reverseFactor = t ? 1 : -1, this.activeEnteringSection = this.options.get("instantActive"), "h" === this.options.get("dir") ? (this.sizeProp = "width", this.offsetProp = "offsetWidth", this._positionProp = t ? "right" : "left", this._transformProp = "X", this.element.classList.remove(`${l}-dir-v`), this.element.classList.add(`${l}-dir-h`)) : (this.sizeProp = "height", this.offsetProp = "offsetHeight", this._transformProp = "Y", this._positionProp = t ? "bottom" : "top", this.element.classList.remove(`${l}-dir-h`), this.element.classList.add(`${l}-dir-v`)), this.sections.forEach(t => {
                t.hasCustomSpace || (t.space = this._space), t.element.style[e] = "", t.sizeReference = this.offsetProp
            }), this.resize(), this.update()
        }
        update(t = !0) {
            super.update(t), this._paintScheduled || (this._paintScheduled = !0, requestAnimationFrame(() => {
                this.sections.forEach(t => this.locateSection(t)), this.sectionsContainer.style[`${Fi.js}Transform`] = "translate" + this._transformProp + "(" + this._position * this._reverseFactor + "px)", this._paintScheduled = !1
            }))
        }
        locateSection(t) {
            t.element.style[this._positionProp] = `${t.offset}px`
        }
        _afterSectionAdd(t) {
            t.customSpace || (t.space = this._space), super._afterSectionAdd(t)
        }
    }
    Jt.registerView("basic", Hi);
    const Yi = {
            transform: {
                translateX: [0, 0],
                translateY: [0, 0],
                translateZ: [0, 0],
                rotateX: [0, 0],
                rotateY: [0, 0],
                rotateZ: [0, 0],
                scale: [1, 1],
                skewX: [0, 0],
                skewY: [0, 0]
            },
            opacity: [1, 1],
            limitDistance: !1,
            limitOpacity: !1,
            ease: null
        },
        Xi = {
            translateX: "px",
            translateY: "px",
            translateZ: "px",
            rotateX: "deg",
            rotateY: "deg",
            rotateZ: "deg",
            skewY: "deg",
            skewX: "deg"
        },
        qi = {
            fadeBasic: {
                className: `${l}-fade-basic-view`,
                opacity: [.4, .4]
            },
            wave: {
                className: `${l}-wave-view`,
                transform: {
                    translateZ: [-300, -300]
                }
            },
            fadeWave: {
                className: `${l}-fade-wave-view`,
                opacity: [.6, .6],
                transform: {
                    scale: [.875, .875]
                }
            },
            flow(t) {
                return {
                    className: `${l}-flow-view`,
                    transform: x(x(x({}, "h" === t.dir && {
                        rotateY: [30, -30]
                    }), "v" === t.dir && {
                        rotateX: [-30, 30]
                    }), {}, {
                        translateZ: [-600, -600]
                    })
                }
            },
            fadeFlow(t) {
                return {
                    className: `${l}-fade-flow-view`,
                    opacity: [.6, .6],
                    transform: x(x(x({}, "h" === t.dir && {
                        rotateY: [50, -50]
                    }), "v" === t.dir && {
                        rotateX: [-50, 50]
                    }), {}, {
                        translateZ: [-100, 100]
                    })
                }
            }
        };
    Jt.registerView("transform", class extends Hi {
        constructor() {
            super(), this.options.register({
                transformStyle: "flow"
            }), this.on("elementAppend", () => {
                var t = this.options.toObject();
                this.transformOptions = "function" == typeof qi[t.transformStyle] ? qi[t.transformStyle](t) : qi[t.transformStyle], this.element.classList.add(`${l}-transform-view`), this.element.classList.add(this.transformOptions.className)
            })
        }
        locateSection(t) {
            t.element.style[this._positionProp] = `${t.offset}px`;
            var e = ((t, e) => {
                e = x(x(x({}, Yi), e), {}, {
                    transform: x(x({}, Yi.transform), e.transform)
                });
                let n = Math.abs(t),
                    o = "";
                e.limitDistance && (n = Math.min(n, 1));
                const r = t < 0 ? 0 : 1;
                let i = 1;
                return Object.entries(e.transform).forEach(([t, e]) => {
                    var i, s = Xi[t] || "";
                    "scale" === t ? 1 !== e[r] && (i = Math.abs(e[r] ** n), o += "scale(" + i + ") ") : e[r] && (o += t + "(" + n * e[r] + s + ") ")
                }), e.opacity[r] < 1 && (i = e.limitOpacity && 1 < n ? 0 : 1 - Math.min(n, 1 - e.opacity[r])), {
                    opacity: i,
                    transform: o
                }
            })(t.pendingOffset / this.size, this.transformOptions);
            t.element.style.transform = e.transform, t.element.style.opacity = e.opacity
        }
    });
    class Zi extends Hi {
        update(t = !0) {
            this._sectionsCount = this.sections.length, t && this.arrange(), this.locateInLoop(), this.updateStatusAndIndex(), this.trigger("update", [this._position], !0), this._paintScheduled = !0, requestAnimationFrame(() => {
                this.sections.forEach(t => this.locateSection(t)), this._paintScheduled = !1
            })
        }
        locateSection(t) {
            t.element.style.zIndex = this.count - Math.abs(Math.ceil(t.pendingOffset / this.size))
        }
    }
    Jt.registerView("baseStack", Zi);
    Jt.registerView("stack", class extends Zi {
        constructor() {
            super(), this.element.classList.add(`${l}-stack-view`), this.options.register({
                scaleFactor: .2
            }), this.on("elementAppend", () => {
                this.scaleFactor = this.options.get("scaleFactor")
            })
        }
        locateSection(t) {
            var e = t.pendingOffset / this.size,
                i = Math.abs(e);
            super.locateSection(t), i < 1 ? (t.element.style.visibility = "", e < 0 ? t.element.style.transform = "scale(" + (1 - i * this.scaleFactor) + ")" : (t.element.style.transform = `translate${this._transformProp}(${-i*this.size}px)`, t.element.style.zIndex = 1e3), t.element.classList.remove(`${l}-section-hidden`)) : t.element.classList.add(`${l}-section-hidden`)
        }
    });
    Jt.registerView("fade", class extends Zi {
        constructor() {
            super(), this.element.classList.add(`${l}-fade-view`)
        }
        locateSection(t) {
            var e = t.pendingOffset / this.size,
                e = Math.abs(e);
            super.locateSection(t), e < 1 ? (t.element.style.opacity = 1 - e, t.element.classList.remove(`${l}-section-hidden`)) : t.element.classList.add(`${l}-section-hidden`)
        }
    });
    Jt.registerView("mask", class extends Zi {
        constructor() {
            super(), this.element.classList.add(`${l}-mask-view`), this.options.register({
                maskParallax: 0
            }), this.on("elementAppend", () => {
                this.maskParallax = this.options.get("maskParallax")
            }), this.on("sectionAdd", this._wrapSection.bind(this))
        }
        _wrapSection(t, e) {
            const i = document.createElement("div");
            i.classList.add(`${l}-section-mask`), e.element.parentElement.insertBefore(i, e.element), i.appendChild(e.element), e.maskElement = i
        }
        locateSection(t) {
            var e = t.pendingOffset / this.size,
                i = Math.abs(e);
            super.locateSection(t), i < 1 ? (t.element.style.visibility = "", t.maskElement.style.transform = `translate${this._transformProp}(${e*this.size}px)`, t.element.style.transform = `translate${this._transformProp}(${-e*this.size*(1-this.maskParallax)}px)`, t.element.classList.remove(`${l}-section-hidden`)) : t.element.classList.add(`${l}-section-hidden`)
        }
    });
    Jt.registerView("cube", class extends Zi {
        constructor() {
            super(), this.element.classList.add(`${l}-cube-view`), this.options.register({
                shadow: .8,
                dolly: 500
            }), this.on("elementAppend", () => {
                this._rotateAxis = "h" === this.options.get("dir") ? "rotateY" : "rotateX", this._rotateDir = "h" === this.options.get("dir") ? -1 : 1, this._shadow = this.options.get("shadow"), this._dolly = this.options.get("dolly")
            })
        }
        update(t = !0) {
            this._sectionsCount = this.sections.length, t && this.arrange(), this.locateInLoop(), this.updateStatusAndIndex(), this.trigger("update", [this._position], !0), this._paintScheduled = !0, requestAnimationFrame(() => {
                this.sections.forEach(t => this.locateSection(t)), this._paintScheduled = !1
            })
        }
        locateSection(t) {
            var e = t.pendingOffset / this.size,
                i = Math.abs(e);
            super.locateSection(t), i < 1 ? (t.element.style.visibility = "", t.element.style.transform = this._rotateAxis + "(" + -e * this._rotateDir * 90 + "deg)", t.element.style.transformOrigin = "50% 50% -" + this.size / 2 + "px", this._shadow && (t.element.style.filter = `brightness(${1-i*this._shadow})`), t.element.classList.remove(`${l}-section-hidden`), this._dolly && 0 < e && (this.sectionsContainer.style.transform = `translateZ(${-this._dolly/2+Math.abs(i-.5)*this._dolly}px)`)) : t.element.classList.add(`${l}-section-hidden`)
        }
    });
    Jt.registerView("animroll", class extends $t {
        constructor() {
            super(), this.options = new Rt, this.options.register({
                loop: !0,
                dir: "h",
                reverse: !1,
                transitionType: "animation"
            }), this.element.classList.add(`${l}-animative-view`), this.isSafeForInteractions = !0, this.size = 0, this.scrollable = !0, this._position = 0
        }
        arrange() {
            var t = this._length;
            this._length = 0, this._loop = this.options.get("loop"), this.sections.forEach((t, e) => {
                t.index = e;
                const i = this.sections[this.normalizeVal(e + 1, this.sections.length)];
                t.calculateSize(this.options.get("dir")), t.updateDurations(), t.outAnimation.start = this._length, i.updateDurations(), i.inAnimation.start = this._length, i.appearDuration = Math.max(t.outAnimation.duration, i.inAnimation.duration), t.disappearDuration = i.appearDuration, this._length += i.appearDuration
            }), this.trigger("arrange", null, !0), this._length !== t && this.trigger("lengthChange", [this._length], this)
        }
        get nominalLength() {
            var t;
            return this._length - (!this._loop && (null === (t = this.sections[this.sectionsCount - 1]) || void 0 === t ? void 0 : t.disappearDuration) || 0)
        }
        get length() {
            return this._length
        }
        get dragFactor() {
            var t = "h" === this.options.get("dir") ? "clientWidth" : "clientHeight";
            return this.currentSection.size / this.element[t]
        }
        get position() {
            return this._position
        }
        set position(t) {
            this.isSafeForInteractions && (t = this._loop ? this.normalizeVal(t, this._length) : Math.max(0, Math.min(t, this.nominalLength)), this._position !== t && (this.scrollDirection = t > this._position ? "forward" : "backward", this._position = t, this.update(!1), this.trigger("scroll", [this._position])))
        }
        resize() {
            var t = super.resize();
            return this.size = this.length / (this.sections.length || 1), t
        }
        update(t = !0) {
            super.update(), t && this.arrange(), this.updateStatusAndIndex(), this.sections.forEach(t => this.updateSection(t))
        }
        updateStatusAndIndex() {
            if (this.sections.length) {
                const e = this.getIndexesAtPosition(this._position);
                var [t] = e;
                this.currentSectionAppearDuration = this.sections[e[0]].appearDuration, this.sections.forEach(t => {
                    let e = "neutral";
                    var i = t.inRangeTest(this._position);
                    "in" === i ? e = "in-progress" : "out" === i && (e = "out-progress"), t.status = e
                }), this.indexes.toString() !== e.toString() && (this.indexes = e, this.trigger("indexesChange", [this.indexes])), this.index !== t && (this.index = t, this.trigger("indexChange", [this.index]))
            }
        }
        updateStatusAndIndexByBetweenAnimation(i, s) {
            this.sections.forEach(t => {
                let e = "neutral";
                t.index === s ? e = "in-progress" : t.index === i && (e = "out-progress"), t.status = e, t.active = "neutral" !== e
            });
            const t = [s];
            this.indexes.toString() !== t.toString() && (this.indexes = t, this.trigger("indexesChange", [this.indexes])), this.index !== s && (this.index = s, this.trigger("indexChange", [this.index]))
        }
        updateSection(t) {
            var e, i = t.inRangeTest(this._position);
            i ? (t.active = !0, t.isReady && !this.betweenAnimation && ("in" === i ? (e = (this._position - t.inAnimation.start) / t.inAnimation.duration, t.progressInOutAnimation("in", e)) : (e = (this._position - t.outAnimation.start) / t.outAnimation.duration, t.progressInOutAnimation("out", e)))) : t.active = !1
        }
        getIndexAtPosition(e) {
            var t;
            let i = null;
            return this._loop && (e = this.normalizeVal(e, this._length)), this.sections.filter(t => t.inRangeTest(e)).forEach(t => {
                (!i || t.remaining(e) < .5) && (i = t)
            }), (null === (t = i) || void 0 === t ? void 0 : t.index) || 0
        }
        getIndexesAtPosition(t) {
            return [this.getIndexAtPosition(t)]
        }
        scrollTo(t, e = !0, i = 1, s = "auto", n) {
            if (t = this.normalizePositionByDirection(t, s), !this.isSafeForInteractions) return !1;
            if (e && (void 0 === n.index || n.useScrollAnimation || "scroll" === this.options.get("transitionType"))) return this.killScrollAnimation(), (n = x(x({
                easing: "easeOutExpo",
                duration: 1e3 * i
            }, n), {}, {
                complete: () => {
                    this.animating = !1, this.trigger("scrollToAnimationEnd", void 0, !0)
                }
            })).position = t, this.animating = !0, Ct(x({
                targets: this
            }, n)), !0;
            if (e) {
                if (this.betweenAnimation) return !1;
                const o = this.sections[n.index];
                if (this.currentSection === o) return !1;
                const r = this.currentSection.disappearDuration > o.appearDuration ? this.currentSection : o;
                return o.startInOutAnimation("in"), this.currentSection.startInOutAnimation("out"), this.updateStatusAndIndexByBetweenAnimation(this.index, n.index), this.betweenAnimation = !0, this.isSafeForInteractions = !1, this.trigger("betweenAnimationStart"), this.trigger("unsafeInteractions"), r.once("allInOutAnimationsEnd", () => {
                    this.betweenAnimation = !1, this.isSafeForInteractions = !0, this.position = o.position, this.trigger("betweenAnimationEnd"), this.trigger("safeInteractions"), this.trigger("scrollToAnimationEnd", void 0, !0)
                }, this), !0
            }
            return this.position = t, !0
        }
        killScrollAnimation() {
            this.animating && (Ct.remove(this), this.animating = !1)
        }
        normalizePositionByDirection(t, e = "auto") {
            t = this._loop ? this.normalizeVal(t, this._length) : Math.min(t, this._length - this._size);
            let i = 0;
            if (this._loop && "off" !== e) {
                var s = this._position,
                    n = t,
                    o = s < n ? n - s : this._length - s + n,
                    r = s < n ? n - this._length - s : n - s;
                switch (e) {
                    case "auto":
                        i = Math.abs(r) < Math.abs(o) ? r : o;
                        break;
                    case "backward":
                        i = r;
                        break;
                    default:
                        i = o
                }
                return this._position + i
            }
            return t
        }
        normalizeVal(t, e) {
            return (t %= e) < 0 && (t += e), t
        }
        _afterSectionAdd(t, e) {
            super._afterSectionAdd(t, e), t.on("ready", () => this.updateSection(t))
        }
    });
    Jt.registerAddon("autoHeight", class {
        constructor(t) {
            this.composer = t, this.composer.on("init", this._setup, this)
        }
        update(t) {
            let e = 0;
            this.composer.view.indexes.forEach(t => {
                e = Math.max(this.composer.view.sections[t].element.offsetHeight, e)
            }), "indexesChange" !== t ? this.composer.view.element.style.transitionDuration = "0ms" : e !== this.lastHeight && (this.composer.view.element.style.transitionDuration = "300ms"), this.lastHeight = e, this.composer.view.element.style.height = `${e}px`, "indexesChange" !== t && this._checkScrollbar()
        }
        _checkScrollbar() {
            var t = document.body.clientWidth - window.innerWidth;
            this.scrollbarWidth !== t && (this.scrollbarWidth = t, this.composer.layoutController.update())
        }
        _setup() {
            "fullscreen" !== this.composer.options.get("layout") && (this.composer.element.classList.add(`${l}-auto-height`), this.scrollbarWidth = document.body.clientWidth - window.innerWidth, this.composer.view.element.addEventListener("transitionend", t => {
                this.composer.view.element.style.transitionDuration = "0ms", t.target === this.composer.view.element && "height" === t.propertyName && this._checkScrollbar()
            }), this.composer.on("indexesChange, sectionResize, resize", this.update, this), this.update())
        }
    });
    const Gi = {};
    class Ui extends t {
        static registerLayer(t, e) {
            if (c.call(Gi, t)) throw new Error(`This layer (${t}) is already registered.`);
            Gi[t] = e
        }
        static get layers() {
            return Gi
        }
        constructor(t, e, i, s = !1) {
            super(), this.holder = t, (this.holder.layersController = this).wrapperWidth = e, this.wrapperHeight = i, this.keepWrapperAspectRatio = s, this.layers = [], this.container = document.createElement("div"), this.container.classList.add(`${l}-layers-container`), this.layersFold = document.createElement("div"), this.layersFold.classList.add(`${l}-layers-fold`), this.wrapper = document.createElement("div"), this.wrapper.classList.add(`${l}-layers-wrapper`), this.container.appendChild(this.wrapper), this.wrapper.appendChild(this.layersFold)
        }
        setupLayers(t, e) {
            this.container = document.createElement("div"), this.container.classList.add(`${l}-layers-container`), this.layersFold = document.createElement("div"), this.layersFold.classList.add(`${l}-layers-fold`), this.wrapper = document.createElement("div"), this.wrapper.classList.add(`${l}-layers-wrapper`), this.container.appendChild(this.wrapper), this.wrapper.appendChild(this.layersFold), this._initLayers(t, null, e), this.hasFixedLayers && this.holder.on("statusChange, activated, deactivated", this._setFixedContainerClass, this), this._updateWrapperSize(), m.on("breakpointChange", this._updateWrapperSize, this), this.keepWrapperAspectRatio && this.holder.on("resize", this._updateWrapperSize, this), this.trigger("layersSetup", [this])
        }
        changeWrapperSize(t, e) {
            this.wrapperWidth = t, this.wrapperHeight = e, this._updateWrapperSize()
        }
        _initLayers(t, r, a, h) {
            t.querySelectorAll(`:scope > .${l}-layer, :scope > a > .${l}-layer`).forEach((t, e) => {
                let i = !1;
                "A" === t.parentNode.nodeName && (i = !0);
                let s = t.getAttribute("data-type") || "custom";
                c.call(Gi, s) || (s = "custom");
                const n = Gi[s];
                if (n) {
                    const o = new n(t, s, this, this.holder, e, i, h);
                    e = "false" !== t.getAttribute("data-wrap");
                    o.positionType = t.getAttribute("data-position"), "static" === o.positionType ? o.frame.classList.add(`${l}-static`) : o.isFixed = !0 !== a && "fixed" === o.positionType, o.isFixed ? this._appendToFixedContainer(o, e) : r ? r.appendChild(o.frame) : this._appendToLayersContainer(o, e), o.init(), this.layers.push(o), o.nestable && this._initLayers(o.element, o.element, !0, o)
                }
            })
        }
        _updateWrapperSize() {
            var t = g(this.wrapperWidth),
                e = g(this.wrapperHeight);
            this.wrapper && (this.wrapper.style.maxWidth = t + "px", this.wrapper.style.height = e + "px"), this.keepWrapperAspectRatio && (this.wrapper.style.height = e * Math.min(1, this.wrapper.offsetWidth / t) + "px"), this.fixedWrapper && (this.fixedWrapper.style.maxWidth = t + "px", this.fixedWrapper.style.maxHeight = e + "px")
        }
        _setFixedContainerClass(t, e, i, s) {
            "activated" === t ? this.fixedContainer.classList.add(`${l}-active`) : "deactivated" === t ? this.fixedContainer.classList.remove(`${l}-active`) : (this.fixedContainer.classList.add(`${l}-${i}`), s && this.fixedContainer.classList.remove(`${l}-${s}`))
        }
        _appendToLayersContainer(t, e) {
            this.hasLayers = !0, (e ? this.layersFold : this.container).appendChild(t.frame)
        }
        _appendToFixedContainer(t, e) {
            this.hasFixedLayers || (this.hasFixedLayers = !0, this.fixedContainer = document.createElement("div"), this.fixedContainer.classList.add(`${l}-layers-container`), this.fixedContainer.classList.add(`${l}-fixed`), this.fixedLayersFold = document.createElement("div"), this.fixedLayersFold.classList.add(`${l}-layers-fold`), this.fixedWrapper = document.createElement("div"), this.fixedWrapper.classList.add(`${l}-layers-wrapper`), this.fixedContainer.appendChild(this.fixedWrapper), this.fixedWrapper.appendChild(this.fixedLayersFold)), (e ? this.fixedLayersFold : this.fixedContainer).appendChild(t.frame)
        }
    }
    var Ki = (t, i) => t.map((t, e) => (void 0 === t || "" === t) && Array.isArray(i) ? i[e] : t);
    Jt.registerAddon("layersAdapter", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                fadeLayers: !1
            }), this.composer.on("beforeSectionsSetup", this._init, this)
        }
        _init() {
            this.wrapperWidth = this.composer.options.get("width"), this.wrapperHeight = this.composer.options.get("height"), this.composer.options.get("fadeLayers") && this.composer.element.classList.add(`${l}-fade-layers`), this.composer.on("sectionBeforeMount", this.readLayers, this)
        }
        readLayers(t, e) {
            if (!e.layersController) {
                e.loadTrigger.hold(), this.wrapperWidth = this.composer.options.get("width"), e.element.dataset.wrapperWidth && (this.wrapperWidth = Ki(e.element.dataset.wrapperWidth.split(","), this.wrapperWidth)), this.wrapperHeight = this.composer.options.get("height"), e.element.dataset.wrapperHeight && (this.wrapperHeight = Ki(e.element.dataset.wrapperHeight.split(","), this.wrapperHeight));
                const i = new Ui(e, this.wrapperWidth, this.wrapperHeight, this.composer.options.get("keepAspectRatio"));
                if (i.composer = this.composer, i.parentEmitter = this.composer, e.layersController = i, i.setupLayers(e.element), e.element.appendChild(i.container), i.hasFixedLayers) {
                    if (!this.composer.fixedLayersContainer) {
                        const s = document.createElement("div");
                        s.classList.add(`${l}-fixed-layers`), this.composer.view.element.appendChild(s), this.composer.fixedLayersContainer = s, this.composer.trigger("fixedLayersContainer")
                    }
                    this.composer.fixedLayersContainer.appendChild(i.fixedContainer)
                }
                e.loadTrigger.exec()
            }
        }
    });
    Jt.registerAddon("layerSizing", class {
        constructor(t) {
            this.composer = t, this.composer.on("layerCreate", this._checkLayer, this), this.layersList = [], m.on("breakpointChange", this._update, this)
        }
        _checkLayer(t, e) {
            const i = e.element.getAttribute("data-width") || "",
                s = e.element.getAttribute("data-height") || "";
            var n;
            (i || s) && (n = {
                layer: e,
                height: s && s.split(","),
                width: i && i.split(",")
            }, this.layersList.push(n), this._updateLayer(e, n.width, n.height, p().name))
        }
        _updateLayer(t, e, i, s) {
            if (t.relativeSizing = !1, i) {
                const n = g(i, s);
                n.includes("%") ? (t.frame.classList.add(`${l}-relative-height`), t.frame.style.height = n, t.element.style.height = "", t.relativeSizing = !0) : (t.frame.classList.remove(`${l}-relative-height`), t.frame.style.height = "", t.element.style.height = n)
            }
            if (e) {
                const o = g(e, s);
                o.includes("%") ? (t.frame.classList.add(`${l}-relative-width`), t.frame.style.width = o, t.element.style.width = "", t.relativeSizing = !0) : (t.frame.classList.remove(`${l}-relative-width`), t.frame.style.width = "", t.element.style.width = o)
            }
        }
        _update(t, s) {
            this.layersList.forEach(({
                layer: t,
                height: e,
                width: i
            }) => this._updateLayer(t, i, e, s))
        }
    });
    class Ji extends t {
        constructor(t, e) {
            super(), this.composer = t, this.eventPrefix = "layersSurface", this.element = e, this.loadTrigger = new Xt(this.loadStart.bind(this)), this.readyTrigger = new Xt(this.ready.bind(this)), this.readyTrigger.hold(), this.composer.once("init", () => this.readyTrigger.exec())
        }
        setup() {
            this.trigger("beforeSetup", [this], !0), this.layersController.layers.forEach(t => {
                t.isOnSurface = !0, t.element.hasAttribute("data-show-on-sections") && (t.showOnSections = t.element.getAttribute("data-show-on-sections").replace(/\s+/g, "").split(",")), t.element.hasAttribute("data-hide-on-sections") && (t.hideOnSections = t.element.getAttribute("data-hide-on-sections").replace(/\s+/g, "").split(","))
            }, this), this.loadTrigger.exec(), this.composer.on("resize", () => this.trigger("resize", [this], !0), this)
        }
        _changeLayersState() {
            var t;
            null !== (t = this._startingSection) && void 0 !== t && t.off("readyAndActivated", this._changeLayersState, this), this._startingSection = null, this.layersController.layers.forEach(t => {
                this._checkForShow(t) ? t.show() : t.hide()
            })
        }
        loadStart() {
            this.trigger("loadingStart", [this], !0), this.readyTrigger.exec()
        }
        ready() {
            this.element.classList.add(`${l}-ready`), this.element.classList.add(`${l}-active`), this.isReady = !0, this.active = !0, this.isActivated = !0, this.ready = !0, this.composer.on("changeStart", this._changeLayersState, this);
            const t = this.composer.view["currentSection"];
            t.isReady ? this._changeLayersState() : (t.once("readyAndActivated", this._changeLayersState, this), this._startingSection = t), this.trigger("ready", [this], !0), this.trigger("readyAndActivated", [this], !0)
        }
        _checkForShow(t) {
            var e = this.composer.navigator.targetSectionIndex,
                e = this.composer.view.sections[e].id;
            const i = t.hideOnSections,
                s = t.showOnSections;
            return s ? !!e && -1 !== s.indexOf(e) : !e || !i || i.length && -1 === i.indexOf(e)
        }
    }
    Jt.registerAddon("overlayLayersAdapter", class {
        constructor(t) {
            this.composer = t, this.composer.on("beforeSectionsSetup", this._init, this)
        }
        _init() {
            if (this.wrapperWidth = this.composer.options.get("width"), this.wrapperHeight = this.composer.options.get("height"), this.layersContainer = this.composer.element.querySelector(`.${l}-overlay-layers`), this.layersContainer) {
                this.layersSurface = new Ji(this.composer, this.layersContainer), this.layersSurface.parentEmitter = this.composer, this.composer.view.element.appendChild(this.layersContainer);
                const t = new Ui(this.layersSurface, this.wrapperWidth, this.wrapperHeight, this.composer.options.get("keepAspectRatio"));
                t.parentEmitter = this.composer, t.composer = this.composer, this.layersController = t, t.setupLayers(this.layersContainer), this.composer.on("indexesChange", this._updateWrapperSize, this), t.hasLayers && this.layersSurface.element.appendChild(t.container), this.composer.overlayLayers = this.layersSurface, this.layersSurface.setup()
            }
        }
        _updateWrapperSize(t, e) {
            const i = this.composer.view.sections[e[0]];
            this.wrapperWidth = this.composer.options.get("width"), i.element.dataset.wrapperWidth && (this.wrapperWidth = Ki(i.element.dataset.wrapperWidth.split(","), this.wrapperWidth)), this.wrapperHeight = this.composer.options.get("height"), i.element.dataset.wrapperHeight && (this.wrapperHeight = Ki(i.element.dataset.wrapperHeight.split(","), this.wrapperHeight)), this.layersController.changeWrapperSize(this.wrapperWidth, this.wrapperHeight)
        }
    });
    class Qi {
        constructor(t, e = "") {
            this.element = t, this.segments = [], this.transform = e.length ? `${e}Transform` : "transform", this._id = 0
        }
        add(t, e = 0) {
            return this._id += 1, this.segments.push({
                transform: t,
                depth: e,
                id: this._id
            }), this._sort(), t && t.length && this._apply(), this._id
        }
        update(t, e, i) {
            e = this._find(e); - 1 !== e && (void 0 !== i && (this.segments[e].depth = i, this._sort()), null !== t && (this.segments[e].transform = t, this._apply()))
        }
        remove(t) {
            t = this._find(t); - 1 !== t && (this.segments.splice(t, 1), this._apply())
        }
        _apply() {
            if (0 !== this.segments.length) {
                let e = "";
                this.segments.forEach(t => {
                    t.transform && (e += t.transform + " ")
                }), this.element.style[this.transform] = e
            } else this.element.style[this.transform] = ""
        }
        _sort() {
            this.segments.sort((t, e) => t.depth - e.depth)
        }
        _find(i) {
            let s = -1;
            return this.segments.some((t, e) => (s = e, i === t.id)), s
        }
    }
    const ts = ["width", "height", "padding-bottom", "padding-top", "padding-left", "padding-right"],
        es = ["font-size"];
    class is {
        constructor(t, e, i) {
            this.layer = t, this.isEnabled = i, this.positionHandler = e, this.resizeType = t.element.getAttribute("data-resize-type") || "scale-relocate", this.resetResize = "false" !== t.element.getAttribute("data-reset-resize"), this.scaleType = t.element.getAttribute("data-scale-type") || "scale", this.upscale = "true" === t.element.getAttribute("data-upscale"), this.scale = -1 !== this.resizeType.indexOf("scale"), this.relocate = -1 !== this.resizeType.indexOf("relocate"), this._firstLocate = !0, this.scale && ("scale" === this.scaleType ? this.scaleTransform = t.frameTransform.add(null, 100) : this.layerInlineStyle = this.layer.element.getAttribute("style"), this.updateBaseStyle())
        }
        updateBaseStyle() {
            var e = this.scaleType.toLowerCase();
            if ("scale" !== e) {
                let t;
                switch (e) {
                    case "box":
                    default:
                        t = ts;
                        break;
                    case "typography-box":
                        t = [].concat(ts, es);
                        break;
                    case "typography":
                        t = es
                }
                this.baseStyle = {}, this.layer.element.setAttribute("style", this.layerInlineStyle), t.forEach(t => {
                    var e = getComputedStyle(this.layer.element)[t];
                    this.baseStyle[t] = e
                })
            }
        }
        update() {
            var t = p().name,
                e = g(this.layer.controller.wrapperWidth, t);
            let i = this.layer.composer.element.clientWidth / e;
            if (this.isEnabled && g(this.isEnabled, t) || (i = 1), this.scale)
                if (this.upscale || (i = Math.min(1, i)), "scale" === this.scaleType) {
                    if (this.layer.relativeSizing) return;
                    this.layer.frameTransform.update(`scale(${i})`, this.scaleTransform)
                } else {
                    const o = this["positionHandler"];
                    Object.keys(this.baseStyle).forEach(t => {
                        "width" === t && o.floatWidth || "height" === t && o.floatHeight || (this.layer.element.style[t] = parseFloat(this.baseStyle[t]) * i + "px")
                    })
                }
            if (this.relocate) {
                const r = this.positionHandler["activeOffset"],
                    a = r.origin || "tl";
                let t = i;
                const h = this.layer["frame"];
                if (this.upscale || (t = Math.min(1, t)), -1 === r.x.indexOf("%")) {
                    var s = parseInt(r.x, 10) * t;
                    switch (a.charAt(1)) {
                        case "l":
                        default:
                            h.style.left = s + "px";
                            break;
                        case "r":
                            h.style.right = s + "px";
                            break;
                        case "c":
                            h.style.left = 0 == s ? "50%" : "calc( 50% + " + s + "px )"
                    }
                }
                if (-1 === r.y.indexOf("%")) {
                    var n = parseInt(r.y, 10) * t;
                    switch (a.charAt(0)) {
                        case "t":
                        default:
                            h.style.top = n + "px";
                            break;
                        case "b":
                            h.style.bottom = n + "px";
                            break;
                        case "m":
                            h.style.top = 0 == n ? "50%" : "calc( 50% + " + n + "px )"
                    }
                }
            }
        }
    }
    const ss = {
        t: "top",
        m: "center",
        b: "bottom",
        l: "left",
        r: "right",
        c: "center"
    };
    class ns {
        constructor(t) {
            (this.layer = t).frame.classList.add(`${l}-pos-absolute`), this.layer.frame.style.zIndex = this.layer.index + 10;
            const e = x({
                none: {
                    x: "0px",
                    y: "0px",
                    origin: "tl"
                }
            }, v(t.element, "offset"));
            Object.keys(e).forEach(t => {
                "string" == typeof e[t] && (e[t] = this._getOffsetObject(e[t]))
            }), this.layer.offsets = e, this.layer.element.getAttribute("data-responsive-scale") && !this.layer.nested && (t = this.layer.element.getAttribute("data-responsive-scale").split(",").map(t => t.length ? "true" === t : ""), this.resizeHandler = new is(this.layer, this, t), this.layer.holder.on("resize", this.resizeHandler.update, this.resizeHandler)), m.on("breakpointChange", this.locate, this)
        }
        locate() {
            const t = this.layer["frame"],
                e = g(this.layer.offsets);
            this.activeOffset = e, void 0 !== e.width && (-1 === e.width.indexOf("%") ? (this.layer.element.style.width = e.width, t.classList.remove(`${l}-float-width`), this.floatWidth = !1) : (t.style.width = e.width, t.classList.add(`${l}-float-width`), this.floatWidth = !0)), void 0 !== e.height && (-1 === e.height.indexOf("%") ? (this.layer.element.style.height = e.height, t.classList.remove(`${l}-float-height`), this.floatHeight = !1) : (t.style.height = e.height, t.classList.add(`${l}-float-height`), this.floatHeight = !0)), t.style[`${Fi.js}Transform`] = "", this.layer.frameTransform.update("", this._transformSegment), t.style.top = "", t.style.left = "", t.style.bottom = "", t.style.right = "";
            const i = e.origin || "tl";
            var s = i.charAt(0),
                n = i.charAt(1);
            let o = "";
            t.style[`${Fi.js}TransformOrigin`] = ss[s] + " " + ss[n];
            var {
                width: r,
                height: a
            } = t.getBoundingClientRect();
            switch (s) {
                case "t":
                default:
                    t.style.top = e.y;
                    break;
                case "b":
                    t.style.bottom = e.y;
                    break;
                case "m":
                    "0" === e.y && (e.y = "0px"), o = `translateY(${a%2==0?"-50%":"calc(-50% + 0.5px)"})`, t.style.top = `calc(50% + ${e.y})`
            }
            switch (n) {
                case "l":
                default:
                    t.style.left = e.x;
                    break;
                case "r":
                    t.style.right = e.x;
                    break;
                case "c":
                    "0" === e.x && (e.x = "0px"), t.style.left = `calc(50% + ${e.x})`, o += ` translateX(${r%2==0?"-50%":"calc(-50% + 0.5px)"})`
            }
            this.layer.frameTransform.update(o, this.layer.transformSegment), this.resizeHandler && (this.resizeHandler.updateBaseStyle(), this.resizeHandler.update())
        }
        _getOffsetObject(t) {
            const e = {};
            return t.replace(/\s/g, "").split(";").forEach(t => {
                t = t.split(":"), e[t[0]] = t[1]
            }), e
        }
    }

    function os(t) {
        if (!t || 0 === t.length) return {};
        const e = {},
            i = t.toLowerCase().replace(/-(.)/g, (t, e) => e.toUpperCase()).replace(/;\s?$/g, "").split(/:|;/g);
        for (let t = 0; t < i.length; t += 2) e[i[t].replace(/\s/g, "")] = i[t + 1].replace(/^\s+|\s+$/g, "");
        return e
    }
    class rs {
        constructor(t, e) {
            this.element = t, e = e || v(t, "style");
            t = Object.keys(e).length;
            0 === t || 1 === t && c.call(e, "none") || (Object.keys(e).forEach(t => {
                "none" !== t && (e[t] = os(e[t]))
            }), e.none = {}, this.styles = e, m.on("breakpointChange", this.update, this), this.lastActivePoint = "none", this.updateBaseStyle(), this.update())
        }
        updateBaseStyle() {
            this.baseStyle = os(this.element.getAttribute("style"))
        }
        update() {
            const e = {};
            "none" !== this.lastActivePoint && Object.keys(this.lastStyle).forEach(t => {
                this.baseStyle[t] ? e[t] = this.baseStyle[t] : e[t] = ""
            }), this.lastActivePoint = m.activeBreakpoint;
            let i = g(this.styles, this.lastActivePoint);
            this.lastStyle = i, i = x(x({}, e), i), requestAnimationFrame(() => {
                Object.keys(i).forEach(t => {
                    this.element.style[t] = i[t]
                })
            })
        }
    }
    class as {
        constructor(t, e) {
            this.element = t, e = e || v(this.element, "class");
            t = Object.keys(e).length;
            0 === t || 1 === t && c.call(e, "none") || (Object.keys(e).forEach(t => {
                "none" !== t && (e[t] = e[t].replace(/(\s\s)+/g, " ").split(" "))
            }), this.classNames = e, this.classNames.none = [], m.on("breakpointChange", this.update, this), this.lastActivePoint = "none", this.update())
        }
        update() {
            "none" !== this.lastActivePoint && this.lastClasses.forEach(t => this.element.classList.remove(t)), this.lastActivePoint = m.activeBreakpoint;
            const t = g(this.classNames, this.lastActivePoint);
            this.lastClasses = t, t.forEach(t => this.element.classList.add(t))
        }
    }
    class hs extends t {
        constructor(t, e, i, s, n, o, r) {
            super(), this.type = e, this.element = t, this.controller = i, this.holder = s, this.index = n, this.isLinked = o, this.parent = r, this.composer = this.controller.composer, this.id = t.id, this.composer.layersById || (this.composer.layersById = {}), this.id && (this.composer.layersById[this.id] = this), this.parentEmitter = i, this.eventPrefix = "layer", o && (this.linkElement = t.parentElement), this.parent && (this.nested = !0), this.frame = document.createElement("div"), this.frame.classList.add(`${l}-layer-frame`), this.element.hasAttribute("data-frame-class") && this.frame.classList.add(this.element.getAttribute("data-frame-class")), this.element.hasAttribute("data-frame-id") && (this.frame.id = this.element.getAttribute("data-frame-id")), this.element.hasAttribute("data-frame-style") && this.frame.setAttribute("style", this.element.getAttribute("data-frame-style")), this.elementBreakpointStyle = new rs(this.element), this.elementBreakpointClass = new as(this.element), this.frameBreakpointStyle = new rs(this.frame, v(this.element, "frame-style")), this.frameBreakpointClass = new as(this.frame, v(this.element, "frame-class")), this.isLinked ? this.frame.appendChild(this.linkElement) : this.frame.appendChild(this.element), this.readyTrigger = new Xt(this._ready.bind(this)), this.offsets = {}, this.trigger("create", [this], !0)
        }
        init(t) {
            t || this.trigger("beforeInit", [this], !0), this.element.hasAttribute("data-id") && (this.id = this.element.getAttribute("data-id"), this.frame.classList.add(`${l}-id-${this.id}`)), this.frameTransform = new Qi(this.frame, Fi.js), this.transformSegment = this.frameTransform.add(), this.disablePositionHandler || this.element.hasAttribute("data-position-handler") && "absolute" !== this.element.getAttribute("data-position-handler") || (this.positionHandler = new ns(this));
            const e = this.element.getAttribute("data-hide-on");
            var i, s, n, o, r;
            this.bpVisible = !0, e && ([i, s, n, o = "depicter-hidden"] = [this.frame, e.split(","), t => {
                this.bpVisible = !t, this.trigger("visibilityChange", [this, t], !0)
            }, `${l}-layer-hidden`], (r = (t, e) => {
                s.includes(e = null === e ? "desktop" : e) ? (n && n(!0), i.classList.add(o)) : (n && n(!1), i.classList.remove(o))
            })(0, p().name), m.on("breakpointChange", r)), this._setupContent(), t || (this.trigger("afterInit", [this], !0), this.readyTrigger.exec())
        }
        show() {
            this.isHidden = !1, this.element.style.visibility = "", this.frame.classList.remove(`${l}-is-hidden`)
        }
        hide() {
            this.isHidden = !0, this.element.style.visibility = "hidden", this.frame.classList.add(`${l}-is-hidden`)
        }
        _setupContent() {}
        _ready() {
            this.ready = !0, this.positionHandler && this.positionHandler.locate(), this.trigger("ready", [this], !0)
        }
    }
    Ui.registerLayer("custom", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "custom", this.frame.classList.add(`${l}-${this.type}-layer`)
        }
    });
    Ui.registerLayer("text", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "text", this.frame.classList.add(`${l}-${this.type}-layer`)
        }
    });
    Ui.registerLayer("button", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "button", this.frame.classList.add(`${l}-${this.type}-layer`)
        }
    });
    Ui.registerLayer("shape", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "shape", this.frame.classList.add(`${l}-${this.type}-layer`)
        }
        _setupContent() {
            var t;
            null !== (t = this.element.querySelector("svg")) && void 0 !== t && t.setAttribute("preserveAspectRatio", "none")
        }
    });
    Ui.registerLayer("image", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "image", this.frame.classList.add(`${l}-${this.type}-layer`), this.picture = this.element, this.image = this.picture.querySelector("img"), this.isImageLoaded = !1, this.cropData = x({}, v(this.element, "crop"))
        }
        _setupContent() {
            this.picture && (this.mediaPosition = null, this.mediaSize = null, this.previousCropValue = null, this.cropData = this._getCropObject(this.cropData), this.holder.readyTrigger.hold(), this.holder.on("loadingStart", this._loadImages, this), this.holder.on("resize, readyAndActivated", this.locateImage, this), m.on("breakpointChange", () => {
                this.locateImage()
            }))
        }
        locateImage() {
            var t, e;
            this.isImageLoaded && ((t = g(this.cropData)) ? ({
                focalPoint: e,
                mediaSize: t
            } = t, {
                position: t,
                mediaSize: e
            } = zi(t.width, t.height, e.x, e.y, this.element.offsetWidth, this.element.offsetHeight), this.mediaSize = e, this.mediaPosition = t, this.image.style.width = `${null===(t=this.mediaSize)||void 0===t?void 0:t.width}px`, this.image.style.height = `${null===(t=this.mediaSize)||void 0===t?void 0:t.height}px`, this.image.style.left = `-${Math.round(null===(t=this.mediaPosition)||void 0===t?void 0:t.x)}px`, this.image.style.top = `-${Math.round(null===(t=this.mediaPosition)||void 0===t?void 0:t.y)}px`, this.picture.classList.add(`${l}-cropped`)) : (this.mediaSize = null, this.mediaPosition = null, this.image.removeAttribute("style"), this.picture.classList.remove(`${l}-cropped`)))
        }
        _loadImages() {
            ji(this.picture, this._loaded.bind(this), this._error.bind(this), this._srcChanged.bind(this))
        }
        _loaded() {
            this.image.classList.add(`${l}-loaded`), this.isImageLoaded = !0, this.locateImage(), this.holder.readyTrigger.isExecuted() || this.holder.readyTrigger.exec()
        }
        _error() {
            this.holder.readyTrigger.exec()
        }
        _srcChanged() {
            this.image.classList.remove(`${l}-loaded`), this.isImageLoaded = !1
        }
        _getCropObject(t) {
            const i = t;
            return Object.entries(t).forEach(([t, e]) => {
                if ("false" !== e.trim()) {
                    e = e.replace(/'/g, '"');
                    try {
                        i[t] = JSON.parse(e)
                    } catch (t) {
                        console.warn("Given crop data value is not a valid JSON, crop skipped. \n " + e)
                    }
                } else i[t] = !1
            }), i
        }
    });
    const ls = {},
        cs = {},
        ds = [],
        ps = Object.prototype.hasOwnProperty;
    class us {
        static registerPlayer(t, e) {
            ps.call(ls, t) || (ls[t] = e)
        }
        static get players() {
            return ls
        }
        constructor(t) {
            this.type = "custom", "string" == typeof t ? (this.videoSourceType = "embed", this.type = this._getTypeBySrc(t), ps.call(ls, this.type) && (this.player = new ls[this.type](this)), this.element = this._generateIframe(t), this.source = this.element) : "IFRAME" === t.tagName ? (this.videoSourceType = "embed", this.type = this._getTypeBySrc(t.getAttribute("src")), this.element = t, this.source = t, ps.call(ls, this.type) && (this.player = new ls[this.type](this))) : "VIDEO" === t.tagName && (this.videoSourceType = "self-hosted", this.element = t, t = (this.source = t).getAttribute("data-player-type") || "native", ps.call(ls, t) && (this.type = t, this.player = new ls[this.type](this)))
        }
        setup(t, e) {
            "custom" !== this.type && (this._readyCallback = t, this._errorCallback = e, this.player.init())
        }
        playerIsReady() {
            this.ready = !0, this._readyCallback && this._readyCallback()
        }
        loadScript(t, e) {
            if (cs[`${this.type}_isLoaded`]) e();
            else if (cs[this.type] ? cs[this.type].push(e) : cs[this.type] = [e], -1 === ds.indexOf(t)) {
                ds.push(t);
                const i = document.getElementsByTagName("head")[0],
                    s = document.createElement("script");
                s.type = "text/javascript", s.onload = () => {
                    cs[this.type].forEach(t => t()), cs[`${this.type}_isLoaded`] = !0
                }, s.onreadystatechange = s.onload, this._errorCallback && (s.onerror = this._errorCallback), s.src = t, i.appendChild(s)
            }
        }
        _getTypeBySrc(i) {
            let s = "custom";
            return Object.keys(ls).some(t => {
                const e = ls[t];
                return !(!e.iframeEmbed || !e.validate(i)) && (s = t, !0)
            }), s
        }
        _generateIframe(t) {
            this.player && this.player.beforeIframe && (t = this.player.beforeIframe(t));
            const e = document.createElement("iframe");
            return e.setAttribute("src", t), e.setAttribute("allowtransparency", "true"), e.setAttribute("frameborder", "0"), e.setAttribute("scrolling", "no"), e.setAttribute("allowfullscreen", ""), this.player && this.player.afterIframe && (t = this.player.afterIframe(t)), e
        }
    }
    us.registerPlayer("mejs", class {
        constructor(t) {
            this.ve = t
        }
        init() {
            if (!window.MediaElementPlayer) throw new Error("MediaElementJS not found.");
            this.api = new window.MediaElementPlayer(this.ve.element, {
                success: () => {
                    setTimeout(this._apiReady.bind(this), 0)
                }
            }), this.ve.element = this.api.container
        }
        setupInterface() {
            Object.assign(this.ve, {
                play: this.api.play.bind(this.api),
                pause: this.api.pause.bind(this.api),
                mute: () => {
                    this.api.setMuted(!0)
                },
                unmute: () => {
                    this.api.setMuted(!1)
                },
                stop: () => {
                    this.api.setCurrentTime(0), this.api.pause()
                },
                on: this.on.bind(this),
                off: this.off.bind(this)
            })
        }
        on(t, e) {
            this.ve.source.addEventListener(t = "play" === t ? "playing" : t, e, !1)
        }
        off(t, e) {
            this.ve.source.removeEventListener(t, e, !1)
        }
        _apiReady() {
            this.setupInterface(), this.ve.playerIsReady(this.api)
        }
    });
    us.registerPlayer("native", class {
        constructor(t) {
            this.ve = t
        }
        init() {
            this.api = this.ve.element, this.setupInterface(), this.ve.playerIsReady(this.api)
        }
        setupInterface() {
            Object.assign(this.ve, {
                play: this.api.play.bind(this.api),
                pause: this.api.pause.bind(this.api),
                mute: () => {
                    this.api.muted = !0
                },
                unmute: () => {
                    this.api.muted = !1
                },
                stop: () => {
                    this.api.currentTime = 0, this.api.pause()
                },
                on: this.on.bind(this),
                off: this.off.bind(this)
            })
        }
        on(t, e) {
            this.ve.element.addEventListener(t, e, !1)
        }
        off(t, e) {
            this.ve.element.removeEventListener(t, e, !1)
        }
    });
    const ms = /http(?:s?):\/\/(?:www\.)?\w*.?vimeo.com/,
        gs = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/;
    us.registerPlayer("vimeo", class {
        static validate(t) {
            return ms.test(t)
        }
        static get iframeEmbed() {
            return !0
        }
        constructor(t) {
            this.ve = t
        }
        beforeIframe(t) {
            return -1 === t.indexOf("/video/") ? `https://player.vimeo.com/video/${t.match(gs)[1]}` : t
        }
        init() {
            window.Vimeo ? (this.api = new window.Vimeo.Player(this.ve.element), this.setupInterface(), this.ve.playerIsReady(this.api)) : this.ve.loadScript("https://player.vimeo.com/api/player.js", () => {
                this.init()
            })
        }
        setupInterface() {
            Object.assign(this.ve, {
                play: this.api.play.bind(this.api),
                pause: this.api.pause.bind(this.api),
                mute: () => {
                    this._currentVol = this.api.getVolume(), this.api.setVolume(0)
                },
                unmute: () => {
                    this.api.setVolume(this._currentVol)
                },
                stop: () => {
                    this.api.setCurrentTime(0), this.api.pause()
                },
                on: this.api.on.bind(this.api),
                off: this.api.off.bind(this.api)
            })
        }
    });
    const vs = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com|\.be\/)/,
        fs = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
    us.registerPlayer("youtube", class {
        static validate(t) {
            return vs.test(t)
        }
        static get iframeEmbed() {
            return !0
        }
        constructor(t) {
            this.ve = t, this._apiReady = this._apiReady.bind(this), this._onAPIReloaded = this._onAPIReloaded.bind(this), this._onStateChange = this._onStateChange.bind(this), this._listeners = {}, this.ve.element.src = this.checkSrc(this.ve.element.src)
        }
        checkSrc(t) {
            return -1 === (t = -1 === t.indexOf("/embed/") ? `https://www.youtube.com/embed/${t.match(fs)[1]}` : t).indexOf("enablejsapi") && (t += `${-1===t.indexOf("?")?"?":"&"}enablejsapi=1`), t
        }
        beforeIframe(t) {
            return this.checkSrc(t)
        }
        init(t) {
            if (window.YT && window.YT.Player) this.api = new window.YT.Player(this.ve.element), this.api.addEventListener("onReady", this._apiReady, !1);
            else if (t) {
                let t;
                window.onYouTubeIframeAPIReady && (t = window.onYouTubeIframeAPIReady), window.onYouTubeIframeAPIReady = () => {
                    t && t(), this.init()
                }
            } else this.ve.loadScript("https://www.youtube.com/iframe_api", () => {
                this.init(!0)
            })
        }
        setupInterface() {
            Object.assign(this.ve, {
                play: this.api.playVideo.bind(this.api),
                pause: this.api.pauseVideo.bind(this.api),
                mute: this.api.mute.bind(this.api),
                unmute: this.api.unMute.bind(this.api),
                stop: () => {
                    this.api.seekTo(0), this.api.pauseVideo()
                },
                on: this.on.bind(this),
                off: this.off.bind(this)
            })
        }
        on(t, e) {
            this._eventAdded || (this._eventAdded = !0, this.api.addEventListener("onStateChange", this._onStateChange, !1)), this._listeners[t] ? this._listeners[t].push(e) : this._listeners[t] = [e]
        }
        off(t, e) {
            !this._listeners[t] || -1 !== (e = this._listeners[t].indexOf(e)) && this._listeners[t].splice(e, 1)
        }
        _apiReady() {
            this.setupInterface(), this.ve.playerIsReady(this.api), this.api.removeEventListener("onReady", this._apiReady, !1), this.api.addEventListener("onReady", this._onAPIReloaded, !1)
        }
        _onAPIReloaded() {
            "play" === this._state && this.ve.play()
        }
        _onStateChange(t) {
            let e;
            switch (t.data) {
                case 0:
                    e = "ended";
                    break;
                case 1:
                    e = "play";
                    break;
                case 2:
                    e = "pause";
                    break;
                default:
                    return
            }
            this._state = e, this._listeners[e] && this._listeners[e].forEach(t => {
                t()
            })
        }
    });
    us.registerPlayer("plyr", class {
        constructor(t) {
            this.ve = t
        }
        init() {
            if (!window.plyr) throw new Error("Plyr not found.");
            [this.api] = window.plyr.setup(this.ve.element), this.setupInterface(), this.ve.playerIsReady(this.api), this.ve.element = this.api.getContainer()
        }
        setupInterface() {
            Object.assign(this.ve, {
                play: this.api.play.bind(this.api),
                pause: this.api.pause.bind(this.api),
                stop: this.api.stop.bind(this.api),
                on: this.api.on.bind(this.api),
                mute: () => {
                    this.api.isMuted() || this.api.toggleMute()
                },
                unmute: () => {
                    this.api.isMuted() && this.api.toggleMute()
                }
            })
        }
    });
    class ys extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "video", this.frame.classList.add(`${l}-${this.type}-layer`), this.playVideo = this.playVideo.bind(this), this._videoState = "initial", this.holder.hasVideoLayer = !0
        }
        playVideo(t) {
            this.holder.active && "leaving" !== this.holder.status && "playing" !== this._videoState && this.videoElement.ready && this.bpVisible && (t && this.trigger("playByBtn", [this], !0), this.videoElement.play(), this.element.classList.add(`${l}-playing`))
        }
        stopVideo() {
            "stopped" !== this._videoState && this.videoElement.ready && (this.autoPause ? this.videoElement.pause() : this.videoElement.stop(), this.element.classList.remove(`${l}-playing`))
        }
        _setupContent() {
            var t;
            this.coverImage = this.element.querySelector("img"), this.videoSource = this.element.querySelector("iframe, video"), this.autoplay = "true" === this.element.getAttribute("data-autoplay"), this.autoPause = "true" === this.element.getAttribute("data-auto-pause"), this.videoSource && (this.looped = "false" !== this.videoSource.getAttribute("data-loop"), "IFRAME" === this.videoSource.tagName ? this.videoSource.src = this.videoSource.src.replace("autoplay=1", "") : "VIDEO" !== this.videoSource.tagName || this.videoSource.hasAttribute("data-player-type") || (t = this.videoSource.getAttribute("data-object-fit") || "cover", this.videoSource.style.objectFit = t, this.videoSource.setAttribute("data-object-fit", t), this.videoSource.hasAttribute("data-object-position") && (t = this.videoSource.getAttribute("data-object-position"), this.videoSource.style.objectPosition = t), this.videoSource.setAttribute("playsinline", ""), this.videoSource.setAttribute("webkit-playsinline", "")), this.videoElement = new us(this.videoSource), this.videoElement.setup(this._videoControllerReady.bind(this)), this.videoElement.element.classList.add(`${l}-video-player`), "mejs" === this.videoElement.type && (this.videoElement.player.api.options.stretching = "responsive"), this.coverImage && (this.playBtn = document.createElement("div"), this.playBtn.classList.add(`${l}-video-btn`), this.playBtn.addEventListener("click", this.playVideo, !1), this.element.appendChild(this.playBtn), this.holder.readyTrigger.hold()), this.autoplay && this.holder.on("activated", this.playVideo, this), this.holder.on("deactivated", this.stopVideo, this), this.holder.on("loadingStart", this._startLoading, this), this.on("visibilityChange", (t, e, i) => {
                i || !this.autoplay && !this.wasPlaying ? i && (this.wasPlaying = "playing" === this._videoState, this.stopVideo()) : this.playVideo()
            }), this.holder.composer.on("attach", () => {
                this.wasPlaying && this.playVideo()
            }))
        }
        _videoControllerReady() {
            this._onVideoPlay = this._onVideoPlay.bind(this), this._onVideoPause = this._onVideoPause.bind(this), this._onVideoEnded = this._onVideoEnded.bind(this), this.videoElement.on("play", this._onVideoPlay), this.videoElement.on("pause", this._onVideoPause), this.videoElement.on("ended", this._onVideoEnded), window.objectFitPolyfill && window.objectFitPolyfill(this.videoSource), this.autoplay && this.playVideo()
        }
        _startLoading() {
            this.coverImage && Vi(this.coverImage, this._loaded.bind(this), this._error.bind(this))
        }
        _loaded() {
            this.coverImage.classList.add(`${l}-loaded`), this.holder.readyTrigger.exec()
        }
        _error() {
            this.holder.readyTrigger.exec()
        }
        _onVideoPlay() {
            this._videoState = "playing", this.trigger("videoPlay", [this], !0)
        }
        _onVideoPause() {
            this._videoState = "stopped", this.trigger("videoPause", [this], !0)
        }
        _onVideoEnded() {
            this._videoState = "ended", this.looped && this.playVideo(), this.trigger("videoEnded", [this], !0)
        }
    }
    Ui.registerLayer("video", ys), Ui.registerLayer("embedVideo", ys);
    l, l, l, l;
    let _s;
    Ui.registerLayer("hotspot", class extends hs {
        constructor(t, e, i, s, n, o) {
            if (super(t, e, i, s, n, o), this.type = "hotspot", this._hidden = !0, this.frame.classList.add(`${l}-${this.type}-layer`), !_s) {
                const r = e.composer.element.querySelector(`.${l}-hotspot-point-template`);
                r ? (_s = r.outerHTML, r.remove()) : _s = '<div class="depicter-hotspot-point depicter-tooltip-point">\n                                <div class="depicter-point-center"></div>\n                                <div class="depicter-point-border"></div>\n                            </div>'
            }
        }
        _setupContent() {
            this._mouseX = 0, this._mouseY = 0, this.align = this.element.getAttribute("data-align") || "top", this.tooltipWidth = parseInt(this.element.getAttribute("data-width"), 10) || 200, this.transparent = "true" === this.element.getAttribute("data-transparent");
            let t = this.element.querySelector(`.${l}-hotspot-point`);
            t && t.parentElement.removeChild(t), this.content = this.element.innerHTML, this.element.innerHTML = "", this.transparent ? t = this.element : t ? this.element.appendChild(t) : (this.element.innerHTML = _s, t = this.element.querySelector(`.${l}-hotspot-point`)), this._mouseInteraction = this._mouseInteraction.bind(this), t.addEventListener("mouseenter", this._mouseInteraction, !1), t.addEventListener("mouseleave", this._mouseInteraction, !1);
            const e = document.createElement("div");
            e.classList.add(`${l}-hotspot-tooltip`), e.classList.add(`${l}-align-${this.align}`), this.element.hasAttribute("data-tooltip-class") && this.element.getAttribute("data-tooltip-class").split(" ").forEach(t => {
                e.classList.add(t)
            }), this.tooltipContainer = document.createElement("div"), this.tooltipContainer.classList.add(`${l}-tooltip-cont`), this.tooltipContainer.innerHTML = this.content, this.tooltipContainer.style.width = this.tooltipWidth + "px", "true" === this.element.getAttribute("data-stay-hover") && (this._tooltipMouseInteraction = this._tooltipMouseInteraction.bind(this), this.tooltipContainer.addEventListener("mouseenter", this._tooltipMouseInteraction, !1), this.tooltipContainer.addEventListener("mouseleave", this._tooltipMouseInteraction, !1)), e.appendChild(this.tooltipContainer), this.holder.composer.layoutController.primaryContainer.appendChild(e), this.tooltip = e, this.hotspotPoint = t
        }
        _mouseInteraction(t) {
            "mouseenter" === t.type ? (this._mouseX = t.clientX, this._mouseY = t.clientY, this._locateTooltip(), setTimeout(this._showTooltip.bind(this), 1)) : this._hideTooltip()
        }
        _tooltipMouseInteraction(t) {
            if ("mouseenter" === t.type) this._hidden || this._showTooltip();
            else this._hideTooltip()
        }
        _showTooltip() {
            clearTimeout(this._hideTimeout), this._hidden && (this.tooltip.classList.add(`${l}-tooltip-active`), this._hidden = !1)
        }
        _hideTooltip() {
            clearTimeout(this._hideTimeout), this._hideTimeout = setTimeout(() => {
                this._hidden = !0, this.tooltip.classList.remove(`${l}-tooltip-active`)
            }, 200)
        }
        _alignPolicy(t) {
            var e = this.tooltip.offsetHeight;
            switch (t) {
                case "top":
                default:
                    if (this.pointY - e < 0) return "bottom";
                    break;
                case "right":
                    if (this.pointX + this.tooltipWidth > window.innerWidth) return "bottom";
                    break;
                case "left":
                    if (this.pointX - this.tooltipWidth < 0) return "bottom"
            }
            return null
        }
        _locateTooltip(t) {
            t = t || this.align;
            let e, i;
            var s = this.frame.getBoundingClientRect();
            e = s.left + window.pageXOffset, i = s.top + window.pageYOffset, this.transparent && (e += this._mouseX - s.left, i += this._mouseY - s.top);
            var n = e;
            if (e -= this.composer.element.offsetLeft + this.composer.element.scrollLeft, i -= this.composer.element.offsetTop + this.composer.element.scrollTop, this.pointX = e, this.pointY = i, this.tooltipContainer.style.left = "", this.tooltipContainer.style.right = "", this.tooltipContainer.width = this.tooltipWidth + "px", this.tooltip.classList.add(`${l}-no-transition`), this._lastAlign && this.tooltip.classList.remove(`${l}-align-${this._lastAlign}`), this.tooltip.classList.add(`${l}-align-${t}`), "bottom" === (this._lastAlign = t) || "top" === t) {
                let t = this.tooltipWidth;
                this.tooltipWidth >= window.innerWidth ? (this.tooltipContainer.style.width = window.innerWidth - 40 + "px", t = window.innerWidth - 40) : this.tooltipContainer.style.width = t + "px";
                s = window.innerWidth - t / 2 - n;
                s < 0 ? this.tooltipContainer.style.right = -(s -= 20) + "px" : (n = n - t / 2, (n -= 20) < 0 && (this.tooltipContainer.style.left = -n + "px"))
            }
            t = this._alignPolicy(t);
            t ? this._locateTooltip(t) : (this.tooltip.style.left = e + "px", this.tooltip.style.top = i + "px", this.tooltip.classList.remove(`${l}-no-transition`))
        }
    });
    Ui.registerLayer("group", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "group", this.nestable = !0, this.frame.classList.add(`${l}-${this.type}-layer`)
        }
    });
    Ui.registerLayer("flex", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "flex", this.nestable = !0, this.frame.classList.add(`${l}-${this.type}-layer`), this.disablePositionHandler = !0
        }
    });
    Ui.registerLayer("arrow", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "arrow", this.frame.classList.add(`${l}-${this.type}-layer`)
        }
        _setupContent() {
            this.arrowIcon = this.element.querySelector("svg"), this.arrowIcon.classList.add(`${l}-arrow-icon`)
        }
    });
    Ui.registerLayer("bullet", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "bullet", this.frame.classList.add(`${l}-${this.type}-layer`), this.activeBulletItemClass = `${l}-bullet-active`
        }
        _setupContent() {
            this.bulletsCount = this.composer.navigator.count, this.generateBullets = this.generateBullets.bind(this), this.bulletItems = [], this.composer.on("countChange", (t, e) => {
                e !== this.bulletsCount && (this.bulletItems = [], this.element.replaceChildren(this.generateBullets(e)), this.handleIndexChange(this.composer.navigator.targetIndex), this.bulletsCount = e)
            }), this.composer.on("targetIndexChange", (t, e) => {
                this.handleIndexChange(e)
            })
        }
        generateBullets(t) {
            return this.bulletsWrapper = document.createElement("div"), this.bulletsWrapper.classList.add(`${l}-bullets-wrapper`), [...Array(t).keys()].forEach(t => {
                const e = document.createElement("span");
                e.classList.add(`${l}-bullet-item`), this.bulletItems.push(e), e.addEventListener("click", () => this.handleNavigate(t)), ki(e, this.bulletsWrapper)
            }), ki(this.bulletsWrapper, this.element), this.bulletsWrapper
        }
        handleNavigate(t) {
            this.composer.actions.gotoSection({
                type: "number",
                to: t
            })
        }
        handleIndexChange(i) {
            this.bulletItems.forEach((t, e) => {
                i !== e && t.classList.contains(this.activeBulletItemClass) ? t.classList.remove(this.activeBulletItemClass) : i === e && t.classList.add(this.activeBulletItemClass)
            })
        }
    });
    Ui.registerLayer("lineTimer", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "lineTimer", this.frame.classList.add(`${l}-${this.type}-layer`)
        }
        _setupContent() {
            this.timerBar = document.createElement("div"), this.timerBar.classList.add(`${l}-timer-bar`), ki(this.timerBar, this.element), this.composer.navigator.on("changeStart", () => setTimeout(this.handleTimerBarWidth.bind(this), 100, .001)), this.composer.on("slideshowTimerUpdate", (t, e) => this.handleTimerBarWidth(e))
        }
        handleTimerBarWidth(t) {
            0 !== t && (this.timerBar.style.width = `${t}%`)
        }
    });
    Ui.registerLayer("scroll", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "scroll", this.frame.classList.add(`${l}-${this.type}-layer`)
        }
        _setupContent() {
            this.arrowIcon = this.element.querySelector("svg"), this.arrowIcon.classList.add(`${l}-scroll-icon`)
        }
    });
    Ui.registerLayer("playAndPause", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "playAndPause", this.frame.classList.add(`${l}-${this.type}-layer`), this.activeClassName = `${l}-active`, this._isPause = !1
        }
        _setupContent() {
            this.playIcon = this.element.querySelector(`.${l}-play-icon`), this.pauseIcon = this.element.querySelector(`.${l}-pause-icon`), this.composer.on("slideshowInit", (t, e) => {
                this._isPause = e || !1
            }), this.composer.on("slideshowStatusChange", (t, e) => {
                this._isPause = e, this.toggleClassName(this._isPause)
            }), this.toggleClassName(this._isPause), this.element.addEventListener("click", this.toggleState.bind(this))
        }
        toggleClassName(t) {
            t ? (this.pauseIcon.classList.remove(this.activeClassName), this.playIcon.classList.add(this.activeClassName)) : (this.playIcon.classList.remove(this.activeClassName), this.pauseIcon.classList.add(this.activeClassName))
        }
        toggleState() {
            const {
                pause: t,
                resume: e
            } = this.composer.slideshow;
            this._isPause ? (e(), this.toggleClassName(!1)) : (t(), this.toggleClassName(!0))
        }
    });

    function bs(l) {
        const e = t => function(t, e) {
            "readyAndActivated" === t ? e.waitForAction || e.animateInOut("in", !0) : "readyAndDeactivated" === t && e.autoAnimateOut && e.animateInOut("out")
        }(t, l);
        let i;
        f([l.interactiveAnimationIn, l.interactiveAnimationOut], t => {
            const [a, h] = t.map(t => "true" === t);
            i && l.holder.off("pendingOffsetChange", i), a || h ? (i = (t, e, i, s) => {
                var n, o, r;
                n = l, o = s, r = a, s = h, 0 <= o && r ? n.progressInOut(Math.max(0, 1 - o), "in") : o < 0 && s && n.progressInOut(Math.min(1, -o), "out")
            }, l.disableAutoAnimateOut = !0, l.holder.on("pendingOffsetChange", i), l.holder.active && l.holder.triggerPendingOffsetChange()) : l.disableAutoAnimateOut = !1, a ? l.holder.off("readyAndActivated", e) : (l.holder.active && l.holder.isReady && e("readyAndActivated"), l.holder.on("readyAndActivated", e)), h ? l.holder.off("readyAndDeactivated", e) : l.holder.on("readyAndDeactivated", e)
        })
    }
    Jt.registerAddon("layerAnimationAdapter", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                hideLayers: !0,
                addDefaultAnimation: !0
            }), this._stepAnimationLayers = [], this.composer.options.get("disableAnimations") || t.on("layerBeforeInit", this._checkLayer, this)
        }
        _checkLayer(t, e) {
            var i, s, n;
            Bi.isAnimative(e.element) && (e.animationWrap = ((t, e) => {
                if (e && t.parentElement.classList.contains(`.${e}`)) return t.parentElement;
                const i = document.createElement("div");
                return i.classList.add(`${e}`), t.parentElement.insertBefore(i, t), i.appendChild(t), i
            })(e.element, `${l}-animation-wrap`), i = e, s = this.composer, n = this.composer.options.get("addDefaultAnimation"), i.inOutAnimation = new Bi(i, i.element, i.animationWrap, n), i.interactiveAnimationIn = i.element.getAttribute("data-animation-in-interactive"), i.interactiveAnimationOut = i.element.getAttribute("data-animation-out-interactive"), i.waitForAction = "true" === i.element.getAttribute("data-wait-for-action"), i.waitOnAnimationOut = "false" !== i.element.getAttribute("data-animation-out-wait"), i.autoAnimateOut = "true" === i.element.getAttribute("data-animation-out-on-change") || s.options.get("hideLayers"), s = i.holder instanceof Ji, void 0 === i.holder.layersAnimations && (i.holder.layersAnimations = []), i.holder.layersAnimations[i.index] = i.inOutAnimation.animationsData, i.waitForAction || s || i.holder.disableAnimationAdapterControl ? i.hide(!1) : bs(i), i.on("animationInEnd", () => setTimeout(() => {
                i.waitOnAnimationOut || i.disableAutoAnimateOut || i.waitForAction || i.animateInOut("out")
            })), this.composer.trigger("layerGetInOutAnimation", [e]))
        }
    });
    Ui.registerLayer("rating", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "rating", this.frame.classList.add(`${l}-${this.type}-layer`)
        }
        _setupContent() {
            this.symbolID = this.element.getAttribute("data-symbol"), this.rateValue = parseFloat(this.element.getAttribute("data-rate-value")), this.wrapper = document.createElement("div"), this.element.appendChild(this.wrapper), this._calcSymbolValue(this.rateValue).forEach(t => {
                this.wrapper.appendChild(this._generateSymbolContainers(t))
            })
        }
        _calcSymbolValue(i) {
            return [0, 0, 0, 0, 0].map((t, e) => {
                e = Math.max(Math.min(i - e, 1), 0);
                return [0, 1].includes(e) ? e : i % 1
            })
        }
        _generateSvg(t) {
            const e = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
                i = document.createElementNS("http://www.w3.org/2000/svg", "use");
            return e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), i.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${t}`), e.appendChild(i), e
        }
        _generateSymbolContainers(t) {
            var e = this._generateSvg(this.symbolID),
                i = this._generateSvg(this.symbolID);
            const s = document.createElement("div");
            s.appendChild(e);
            const n = document.createElement("div");
            n.appendChild(i), n.style.clipPath = `inset(0 ${100-100*t}% 0 0)`;
            const o = document.createElement("div");
            return o.classList.add(`${l}-rating-container`), o.appendChild(s).classList.add(`${l}-symbol-container`), o.appendChild(n).classList.add(`${l}-track-container`), this.element.appendChild(o)
        }
    });
    const ws = (t, e = {}) => {
        var {
            locale: i = "en-US",
            useRelative: s = !1,
            formatOptions: e
        } = e;
        if (!t) return null;
        const n = new Date(t);
        if (s) {
            s = (t, e = 2, i = "0") => `${t}`.padStart(e, i);
            return ((t, e = "en", i = {}) => {
                var s = Date.now() / 1e3;
                const [n, o] = t.trim().split(" ");
                t = [...n.split("-").map((t, e) => parseInt(t, 10) + (1 === e ? -1 : 0)), ...o.split(":").map(t => parseInt(t, 10))], t = Date.UTC(...t) / 1e3;
                const r = new Intl.RelativeTimeFormat(e, x({
                    numeric: "auto"
                }, i));
                var a = Math.round(t - s);
                switch (!0) {
                    case Math.abs(a) < 60:
                        return r.format(Math.round(a), "seconds");
                    case 60 < Math.abs(a) && Math.abs(a) < 3600:
                        return r.format(Math.round(a / 60), "minute");
                    case 3600 < Math.abs(a) && Math.abs(a) < 86400:
                        return r.format(Math.round(a / 3600), "hour");
                    case 86400 < Math.abs(a) && Math.abs(a) < 2592e3:
                        return r.format(Math.round(a / 86400), "day");
                    default:
                        return r.format(Math.round(a / 2592e3), "month")
                }
            })(`${n.getFullYear()}-${s(n.getDate())}-${s(n.getMonth()+1)} ${s(n.getHours())}:${s(n.getMinutes())}:${s(n.getSeconds())}`)
        }
        return new Intl.DateTimeFormat(i, e).format(n)
    };
    Ui.registerLayer("date", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "date", this.frame.classList.add(`${l}-${this.type}-layer`)
        }
        _setupContent() {
            this.useRelative = "true" === this.element.getAttribute("data-use-relative"), this.displayTime = "true" === this.element.getAttribute("data-display-time"), this.formatStyle = this.element.getAttribute("data-format-style") || "auto";
            var t = ws(this.element.dateTime, {
                useRelative: this.useRelative,
                formatOptions: ((t, e = !1) => {
                    let i = {};
                    return i = "auto" === t ? x({
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }, e ? {
                        hour12: !1,
                        minute: "numeric",
                        hour: "numeric"
                    } : {}) : x({
                        dateStyle: t
                    }, e ? {
                        timeStyle: t
                    } : {}), i
                })(this.formatStyle, this.displayTime)
            });
            this.element.innerHTML = t
        }
    });
    Ui.registerLayer("tagList", class extends hs {
        constructor(t, e, i, s, n, o) {
            super(t, e, i, s, n, o), this.type = "tagList", this.element.classList.add(`${l}-${this.type}-layer`)
        }
    });
    var xs, Ss = "ontouchstart" in document,
        di = window.PointerEvent,
        We = window.MSPointerEvent;
    const As = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
        Es = di ? "pointerdown" : We ? "MSPointerDown" : Ss ? "touchstart" : "mousedown",
        Cs = di ? "pointerup" : We ? "MSPointerUp" : Ss ? "touchend" : "mouseup",
        ks = di ? "pointermove" : We ? "MSPointerMove" : Ss ? "touchmove" : "mousemove",
        Ls = di ? "pointercancel" : We ? "MSPointerCancel" : Ss ? "touchcancel" : "";
    class Is {
        constructor(t) {
            this.element = t, this._direction = "horizontal", this.noSwipeSelector = "", this.preventDefault = "auto", this._lastStatus = {}, this._touchStart = this._touchStart.bind(this), this._touchEnd = this._touchEnd.bind(this), this._touchMove = this._touchMove.bind(this), this._touchCancel = this._touchCancel.bind(this), this._reset = this._reset.bind(this), this.enable()
        }
        get direction() {
            return this._direction
        }
        set direction(t) {
            let e = "both" !== (this._direction = t) ? "horizontal" === t ? "pan-y" : "pan-x" : "pan-x pan-y";
            this.element.style.msTouchAction = e, this.element.style.touchAction = e
        }
        _getDirection(t, e) {
            switch (this._direction) {
                case "horizontal":
                    return t <= this.startX ? "left" : "right";
                case "vertical":
                    return e <= this.startY ? "up" : "down";
                default:
                    return Math.abs(t - this.startX) > Math.abs(e - this.startY) ? t <= this.startX ? "left" : "right" : e <= this.startY ? "up" : "down"
            }
        }
        _preventDefaultEvent(t, e) {
            if ("auto" !== this.preventDefault) return this.preventDefault;
            if (this._preventLock) return !0;
            e = Math.abs(t - this.startX) > Math.abs(e - this.startY);
            return this._preventLock = "horizontal" === this._direction && e || "vertical" === this._direction && !e, this._preventLock
        }
        _createStatusObject(t) {
            const e = {};
            var i = this._lastStatus.distanceX || 0,
                s = this._lastStatus.distanceY || 0;
            if (e.distanceX = t.pageX - this.startX, e.distanceY = t.pageY - this.startY, e.moveX = e.distanceX - i, e.moveY = e.distanceY - s, 0 === e.moveX && 0 === e.moveY) return x({}, this._lastStatus);
            e.timeStamp = Date.now();
            s = e.timeStamp - this._lastStatus.timeStamp || 0;
            return s /= 1e3, 0 == (e.dt = s) || 0 === e.moveX && (t.pageX <= 2 || t.pageX >= window.screen.width - 2) ? e.velocityX = this._lastStatus.velocityX : e.velocityX = e.moveX / s, 0 == s || 0 === e.moveY && (t.pageY <= 2 || t.pageY >= window.screen.height - 2) ? e.velocityY = this._lastStatus.velocityY : e.velocityY = e.moveY / s, e.duration = e.timeStamp - this.startTime, e.direction = this._getDirection(t.pageX, t.pageY), e
        }
        _touchStart(t) {
            if (this.enabled && !this.touchStarted && !t.target.closest(this.noSwipeSelector, this.element)) {
                t.pointerType && "mouse" === t.pointerType && t.preventDefault();
                t = "touchstart" === t.type ? t.touches[0] : t;
                this.startX = t.pageX, this.startY = t.pageY, this.startTime = Date.now(), document.addEventListener(Cs, this._touchEnd, !1), As || document.addEventListener(ks, this._touchMove, {
                    passive: !1
                }), Ls.length && document.addEventListener(Ls, this._touchCancel, !1);
                const e = this._createStatusObject(t);
                e.phase = "start", this.onSwipe(e), this._lastStatus = e, this.touchStarted = !0
            }
        }
        _touchMove(t) {
            if (this.touchStarted) {
                var e = "touchmove" === t.type ? t.touches[0] : t;
                const i = this._createStatusObject(e);
                this._preventDefaultEvent(e.pageX, e.pageY) && (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), clearTimeout(this._autoResetTimeout), this._autoResetTimeout = setTimeout(this._reset, 60, e), i.phase = "move", this._lastStatus = i, this.onSwipe(i))
            }
        }
        _touchEnd(t) {
            const e = this._lastStatus;
            t.preventDefault(), document.removeEventListener(Cs, this._touchEnd, !1), As || document.addEventListener(ks, this._touchMove, {
                passive: !1
            }), Ls.length && document.removeEventListener(Ls, this._touchCancel, !1), clearTimeout(this._autoResetTimeout), this._autoResetTimeout = setTimeout(this._reset, 60), 200 < Date.now() - e.timeStamp && (e.velocityX = 0, e.velocityY = 0), e.phase = "end", this.touchStarted = !1, this.onSwipe(e)
        }
        _touchCancel(t) {
            this._touchEnd(t)
        }
        _reset(t) {
            this.reset = !1, this._lastStatus = {}, this.startTime = Date.now(), t ? (this.startX = t.pageX, this.startY = t.pageY) : (this.startX = null, this.startY = null), this._preventLock = !1
        }
        enable() {
            this.enabled || (this.enabled = !0, As && document.addEventListener(ks, this._touchMove, {
                passive: !1
            }), this.element.addEventListener(Es, this._touchStart, {
                passive: !1
            }), this.direction = this._direction)
        }
        disable() {
            this.enabled && (this.element.style.msTouchAction = "", this.element.style.touchAction = "", this.enabled = !1, this.element.removeEventListener(Es, this._touchStart, !1), document.removeEventListener(Cs, this._touchEnd, !1), document.removeEventListener(ks, this._touchMove, !1), Ls.length && document.removeEventListener(Ls, this._touchCancel, !1))
        }
    }
    class $s {
        constructor(t, e) {
            this.navigator = t, this.swipeDir = e, this.swipe = new Is(t.view.element), this.swipe.noSwipeSelector = `.${l}-no-swipe`, this._updateDirection = this._updateDirection.bind(this), this.navigator.view.options.observe("dir", this._updateDirection), this.navigator.view.options.observe("reverse", this._updateDirection), this._updateDirection(), this._scrollNavigatorAdapter = this._scrollNavigatorAdapter.bind(this), this.swipe.onSwipe = this._scrollNavigatorAdapter
        }
        enable() {
            this.swipe.enable()
        }
        disable() {
            this.swipe.disable()
        }
        _updateDirection() {
            var t = "auto" === this.swipeDir ? this.navigator.view.options.get("dir") : this.swipeDir,
                e = this.navigator.view.options.get("reverse");
            let i = "";
            this._reverseFactor = e ? 1 : -1, "h" === (this.direction = t) ? (i = "clientWidth", this._movement = "moveX", this._velocity = "velocityX", this.swipe.direction = "horizontal") : (i = "clientHeight", this._movement = "moveY", this._velocity = "velocityY", this.swipe.direction = "vertical"), this._moveFactor = this.navigator.view.size / this.navigator.view.element[i] || 1
        }
        _scrollNavigatorAdapter(t) {
            switch (t.phase) {
                case "start":
                    this.navigator.hold(), this.navigator.trigger("swipeStart", [this.navigator, this]);
                    break;
                case "move":
                    this.navigator.drag(t[this._movement] * this._reverseFactor * this._moveFactor), this.navigator.trigger("swipeMove", [this.navigator, this]);
                    break;
                default:
                    t[this._velocity] ? this.navigator.push(t[this._velocity] * this._reverseFactor) : this.navigator.release(), this.navigator.trigger("swipeEnd", [this.navigator, this])
            }
        }
    }
    Jt.registerAddon("swipeGesture", class {
        constructor(t) {
            this.composer = t, this.composer.options.observe(this.composer.options.register({
                mouseSwipe: !0,
                touchSwipe: !0,
                swipeDir: "auto"
            }), this.checkOptions.bind(this)), this.composer.once("navigatorSetup", (t, e) => {
                this.swipeHandler = new $s(e, this.composer.options.get("swipeDir")), this.enable = this.swipeHandler.enable.bind(this.swipeHandler), this.disable = this.swipeHandler.disable.bind(this.swipeHandler), this.checkOptions()
            }), this.composer.once("sectionsSetup", () => this.checkOptions())
        }
        checkOptions() {
            var t = this.composer.options.get(["mouseSwipe", "touchSwipe"]);
            (t.touchSwipe && a || t.mouseSwipe) && 1 < (null === (t = this.composer.view) || void 0 === t ? void 0 : t.sections.length) ? (this.enable(), this.composer.trigger("swipeGestureEnabled")) : (this.disable(), this.composer.trigger("swipeGestureDisabled"))
        }
    });
    class Os {
        constructor(t) {
            const e = t.element.querySelector(`.${l}-bg-video`);
            t.hasBackgroundVideo = !!e, t.hasBackgroundVideo && (this.videoSource = e, this.section = t, this.composer = t.composer, this.looped = "false" !== e.getAttribute("data-loop") || e.loop, e.muted = "false" !== e.getAttribute("data-muted"), this.goNext = "true" === e.getAttribute("data-goto-next"), e.removeAttribute("loop"), e.loop = !1, e.autoplay = !1, this.autoPause = "true" === e.getAttribute("data-auto-pause"), this.videoContainer = document.createElement("div"), this.videoContainer.classList.add("depicter-bg-video-container"), this.videoContainer.classList.add("depicter-background-video-container"), this.videoContainer.appendChild(e), t.background.element.appendChild(this.videoContainer), Di(e, void 0, "cover"), e.setAttribute("playsinline", ""), e.setAttribute("webkit-playsinline", ""), this._videoReady = this._videoReady.bind(this), e.addEventListener("loadstart", this._videoReady, !1), e.addEventListener("loadedmetadata", this._videoReady, !1), 0 < e.readyState && this._videoReady(), t.on("deactivated, readyAndActivated", this._sectionStateChange, this), this.composer.on("attach", () => {
                "playing" === this.videoState && this.videoSource.play()
            }))
        }
        _videoReady() {
            this.videoReady || (this.videoReady = !0, this._videoStateChange = this._videoStateChange.bind(this), this.videoSource.addEventListener("play", this._videoStateChange, !1), this.videoSource.addEventListener("pause", this._videoStateChange, !1), this.videoSource.addEventListener("ended", this._videoStateChange, !1), window.objectFitPolyfill && window.objectFitPolyfill(this.videoSource), this.section.active && this.section.isReady ? this.videoSource.play() : (this.videoSource.pause(), this.videoSource.currentTime = 0), this.section.trigger("backgroundVideoReady", [this.section], !0))
        }
        _videoStateChange(t) {
            switch (t.type) {
                case "play":
                default:
                    this.videoState = "playing", this.section.trigger("backgroundVideoPlay", [this.section], !0);
                    break;
                case "pause":
                    this.videoState = "stopped", this.section.trigger("backgroundVideoPause", [this.section], !0);
                    break;
                case "ended":
                    this.videoState = "ended", this.section.trigger("backgroundVideoEnded", [this.section], !0), this.goNext ? this.composer.navigator.next() : this.looped && this.videoSource.play()
            }
        }
        _sectionStateChange(t) {
            if (this.videoReady) switch (t) {
                case "readyAndActivated":
                default:
                    this.videoSource.play();
                    break;
                case "deactivated":
                    this.videoSource.pause(), this.autoPause || (this.videoSource.currentTime = 0)
            }
        }
    }
    Jt.registerAddon("sectionBackgroundVideo", class {
        constructor(t) {
            this.composer = t, this.activeSlides = [], this.composer.on("sectionBeforeMount", this._checkSection, this)
        }
        _checkSection(t, e) {
            e.firstMount && (e.backgroundVideoController = new Os(e), e.hasBackgroundVideo || this.activeSlides.push(e))
        }
    });
    const Ts = (t, e, i) => {
        if (!window.IntersectionObserver) return !1;
        const s = new IntersectionObserver(t => {
            t.forEach(t => {
                i(t.intersectionRatio, t)
            })
        }, {
            threshold: e || function(e) {
                const i = [];
                for (let t = 1; t <= e; t += 1) {
                    var s = t / e;
                    i.push(s)
                }
                return i.push(0), i
            }(25)
        });
        return s.observe(t), !0
    };
    Jt.registerAddon("inViewport", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                inViewportRatio: .25
            });
            const i = this.composer.options.get("inViewportRatio");
            Ts(this.composer.element, null, t => {
                var e = t >= i;
                this.composer.element.classList[e ? "add" : "remove"](`${l}-in-viewport`), e !== this.composer.inViewport && this.composer.trigger("inViewportStateChange", [e, t]), this.composer.trigger("inViewportRatioChange", [t]), this.composer.inViewport = e
            }) || (this.composer.inViewport = !0)
        }
    });
    Jt.registerAddon("loading", class {
        constructor(t) {
            if (this.composer = t, this.composer.options.register({
                    sectionLoading: "auto"
                }), this.loadingElement = t.element.querySelector(`.${l}-loading-container`), !this.loadingElement) {
                this.loadingElement = document.createElement("div"), this.loadingElement.classList.add(`${l}-loading-container`);
                const e = document.createElement("div");
                e.classList.add(`${l}-loading`), this.loadingElement.appendChild(e), this.composer.element.appendChild(this.loadingElement)
            }
            this.composer.on("init", this._afterInit, this)
        }
        _afterInit() {
            "off" !== this.composer.options.get("sectionLoading") && (this.sectionLoadingTemplate = this.composer.element.querySelector(`.${l}-section-loading`) || this.loadingElement.cloneNode(!0), this.sectionLoadingTemplate.remove(), this.composer.view.sections.forEach(this._setupLoadingOnSection, this))
        }
        _setupLoadingOnSection(t) {
            var e;
            t.isReady || (e = this.sectionLoadingTemplate.cloneNode(!0), t.element.appendChild(e))
        }
    });
    Jt.registerAddon("disableClicks", class {
        constructor(t) {
            this.composer = t, this.actions = t.actions, this.composer.on("init", this._init, this)
        }
        _init() {
            this._checkClick = this._checkClick.bind(this), this.composer.view.element.addEventListener("click", this._checkClick, !1), this.composer.on("swipeStart", this._swipeInteraction, this), this.composer.on("swipeMove", this._swipeInteraction, this), this.composer.on("swipeEnd", this._swipeInteraction, this)
        }
        _swipeInteraction(t) {
            clearTimeout(this._to), "swipeStart" === t ? (this._clickDisabled = !0, this._hadMove = !1) : "swipeMove" === t ? this._hadMove = !0 : this._hadMove ? (this._hadMove = !1, this._to = setTimeout(() => {
                this._clickDisabled = !1
            }, 5)) : this._clickDisabled = !1
        }
        _checkClick(t) {
            this._clickDisabled && (t.preventDefault(), t.stopPropagation())
        }
    });
    Jt.registerAddon("smartLoader", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                preload: 0
            }), this.composer.options.alias("lazyload", "preload"), this.composer.on("init", this._start, this, 100), this.composer.on("sectionBeforeMount", (t, e) => e.loadTrigger.hold(), this, 100), this.composer.on("layersSurfaceBeforeSetup", this._checkSurfaceLayers, this)
        }
        _start() {
            var t = this.composer.options.get("preload");
            0 === t ? this._loadSectionsInSequence() : "all" === t ? this._waitForAllSections() : "number" == typeof t && (this._loadNearby = t), this.composer.element.classList.add(`${l}-preload-${t}`), this.composer.on("targetIndexChange", this._checkCurrentSection, this), this._checkCurrentSection()
        }
        _checkSurfaceLayers(t, e) {
            "all" === this.composer.options.get("preload") && (e.loadTrigger.hold(), this.composer.readyTrigger.hold(), e.on("ready", () => this.composer.readyTrigger.exec(), this), e.loadTrigger.exec())
        }
        _checkCurrentSection() {
            this.composer.navigator.targetSectionIndexes.forEach(t => {
                this.composer.view.sections[t].loadTrigger.exec(), this._loadNearby && this._loadNearbySections(t, this._loadNearby)
            })
        }
        _loadNearbySections(e, i) {
            let s;
            const n = this.composer.view["sections"];
            var o = this.composer.view["loop"],
                r = n.length;
            for (let t = 1; t !== i + 1; t += 1) s = e + t, s >= r ? o && (s %= r, n[s].loadTrigger.exec()) : n[s].loadTrigger.exec(), s = e - t, s < 0 ? o && (s += r, n[s].loadTrigger.exec()) : n[s].loadTrigger.exec()
        }
        _loadSectionsInSequence(t) {
            if (t !== this.composer.view.sections.length) {
                void 0 === t && (t = 0);
                const e = this.composer.view.sections[t];
                e.isReady ? this._loadSectionsInSequence(t + 1) : (e.on("ready", () => {
                    this._loadSectionsInSequence(t + 1)
                }, this), e.loadTrigger.exec())
            }
        }
        _waitForAllSections() {
            this.composer.readyTrigger.charge(this.composer.view.sections.length), this.composer.view.sections.forEach(t => {
                t.isReady ? this.composer.readyTrigger.exec() : (t.on("ready", () => this.composer.readyTrigger.exec(), this), t.loadTrigger.exec())
            })
        }
    });
    class Ps {
        constructor(t) {
            let e = t.element.querySelector('.depicter-section-video, a[data-type="video"]');
            var i;
            e ? (this.section = t, this.composer = t.composer, (t.videoController = this).autoplay = "true" === e.getAttribute("data-autoplay"), this.goNext = "true" === e.getAttribute("data-goto-next"), "A" === e.tagName ? (i = e.getAttribute("href"), e.remove(), e = i) : "VIDEO" !== e.tagName || e.hasAttribute("data-player-type") || (e.hasAttribute("data-object-fit") && (e.style.objectFit = e.getAttribute("data-object-fit")), e.hasAttribute("data-object-position") && (e.style.objectPosition = e.getAttribute("data-object-position"))), this._videoElementReady = this._videoElementReady.bind(this), this.videoElement = new us(e), this.videoElement.setup(this._videoElementReady), "mejs" === this.videoElement.type && (this.videoElement.player.api.options.stretching = "responsive"), this.videoElement.source.classList.remove("depicter-section-video"), this.videoElement.element.classList.add("depicter-section-video"), "string" == typeof e && t.element.appendChild(this.videoElement.element), this.playBtn = document.createElement("div"), this.playBtn.classList.add("depicter-section-video-btn"), this.playBtn.addEventListener("click", this.playVideo.bind(this), !1), t.element.appendChild(this.playBtn), this.closeBtn = document.createElement("div"), this.closeBtn.classList.add("depicter-section-video-close-btn"), this.closeBtn.addEventListener("click", this.closeVideo.bind(this), !1), t.element.appendChild(this.closeBtn), t.on("activated, deactivated", this._sectionStateChange, this)) : this.noSource = !0
        }
        playVideo() {
            this.videoElement.ready && this.videoElement.play(), this.section.element.classList.add(`${l}-video-open`), this.section.trigger("videoOpen", [this.section, this], !0)
        }
        closeVideo() {
            this.videoElement.ready && this.videoElement.stop(), this.section.element.classList.remove(`${l}-video-open`), this.section.trigger("videoClose", [this.section, this], !0)
        }
        _videoElementReady() {
            this.section.active && this.autoplay && this.playVideo(), this._onVideoPlay = this._onVideoPlay.bind(this), this._onVideoPause = this._onVideoPause.bind(this), this._onVideoEnded = this._onVideoEnded.bind(this), this.videoElement.on("play", this._onVideoPlay), this.videoElement.on("pause", this._onVideoPause), this.videoElement.on("ended", this._onVideoEnded)
        }
        _onVideoPlay() {
            this._videoState = "playing", this.section.trigger("videoPlay", [this.section, this], !0)
        }
        _onVideoPause() {
            this._videoState = "stopped", this.section.trigger("videoPause", [this.section, this], !0)
        }
        _onVideoEnded() {
            this._videoState = "ended", this.section.trigger("videoEnded", [this.section, this], !0), this.goNext && this.composer.next && this.composer.next()
        }
        _sectionStateChange(t) {
            switch (t) {
                case "select":
                default:
                    this.autoplay && this.playVideo();
                    break;
                case "deselect":
                    this.closeVideo()
            }
        }
    }
    Jt.registerAddon("sectionVideo", class {
        constructor(t) {
            this.composer = t, this.actions = t.actions, this.options = t.options, this.activeSections = [], this.composer.on("init", () => {
                this.composer.view.sections.forEach(this._checkSection, this)
            })
        }
        _checkSection(t) {
            new Ps(t).noSource || this.activeSections.push(t)
        }
    });
    const Ms = new RegExp(`${l}-hide-on-(tablet|desktop|mobile)`, "g");
    Jt.registerAddon("hideOn", class {
        constructor(t) {
            var e;
            this.composer = t, this.composerElement = this.composer.element, this.hideBreakpoints = null === (e = this.composerElement.getAttribute("class").match(Ms)) || void 0 === e ? void 0 : e.map(t => t.split("-").slice(-1)[0]), null !== (e = this.hideBreakpoints) && void 0 !== e && e.includes(p().name || "desktop") && (this._contentIsOnHold = !0, this.composer.isHidden = !0, t.initTrigger.hold()), null !== (t = this.hideBreakpoints) && void 0 !== t && t.length && m.on("breakpointChange", this.update, this)
        }
        update(t, e) {
            var i;
            null !== (i = this.hideBreakpoints) && void 0 !== i && i.includes(e) ? (this.composer.isHidden = !0, this.composer.trigger("visibilityChange", [!0])) : (this.composer.isHidden = !1, this._contentIsOnHold && (this._contentIsOnHold = !1, this.composer.initTrigger.exec()), this.composer.trigger("visibilityChange", [!1]))
        }
    });
    Jt.registerAddon("keyboardNav", class {
        constructor(t) {
            this.composer = t, this.composerElement = this.composer.element, this.composer.options.register({
                keyboard: !1
            }), this.composer.on("init", this.setup, this)
        }
        setup() {
            var t = this.composer.options.get("keyboard");
            t && (this.activeOptions = x(x({}, {
                checkLoop: !0,
                activeOnHover: !1
            }), "object" == typeof t ? t : void 0), this._onKeydown = this._onKeydown.bind(this), this.activeOptions.activeOnHover ? (this.composerElement.tabIndex = 0, this._mouseInteraction = this._mouseInteraction.bind(this), this.composerElement.addEventListener("mouseenter", this._mouseInteraction, !1), this.composerElement.addEventListener("mouseleave", this._mouseInteraction, !1)) : (this.composer.on("inViewportStateChange", (t, e) => {
                e ? document.addEventListener("keydown", this._onKeydown) : document.removeEventListener("keydown", this._onKeydown)
            }), this.composer.inViewport && document.addEventListener("keydown", this._onKeydown)))
        }
        _mouseInteraction(t) {
            switch (t.type) {
                case "mouseenter":
                    this.composerElement.focus(), this.composerElement.addEventListener("keydown", this._onKeydown, !1);
                    break;
                case "mouseleave":
                    this.composerElement.blur(), this.composerElement.removeEventListener("keydown", this._onKeydown, !1)
            }
        }
        _onKeydown(t) {
            var e = t["key"],
                i = this.activeOptions["checkLoop"];
            "ArrowLeft" === e ? (this.composer.navigator.previous({
                checkLoop: i
            }), t.preventDefault()) : "ArrowRight" === e && (this.composer.navigator.next({
                checkLoop: i
            }), t.preventDefault())
        }
    });
    Jt.registerAddon("mouseWheelNav", class {
        constructor(t) {
            this.composer = t, this.composerElement = this.composer.element, this.composer.options.register({
                mouseWheel: !1
            }), this.composer.on("init", this.setup, this)
        }
        setup() {
            var t = this.composer.options.get("mouseWheel");
            this._slideByWheel = this._slideByWheel.bind(this), this._scrollByWheel = this._scrollByWheel.bind(this), this._wheelDeltaBuffer = 0, this._lastWheelTime = 0, t && (this.options = x(x({}, {
                activeOnAppear: !0,
                preventDefault: "auto",
                friction: .09
            }), "object" == typeof t ? t : void 0), t = this.composer.options.get("navigator.slickType"), this.view = this.composer.view, "scroll" === t ? (this._readViewPosition = !0, this.loop = this.composer.options.get("viewOptions.loop"), this.composer.navigator.on("slickChanged", () => {
                this._readViewPosition = !0
            }), this.composerElement.addEventListener("wheel", this._scrollByWheel, !1)) : this.composerElement.addEventListener("wheel", this._slideByWheel, !1))
        }
        _checkContentLocation(t) {
            var e = this.composerElement.getBoundingClientRect();
            return t < 0 && e.top < 0 || 0 < t && e.bottom > window.innerHeight
        }
        _slideByWheel(t) {
            let e = t.deltaY;
            this.options.activeOnAppear && this._checkContentLocation(e) || "auto" === this.options.preventDefault && (this.composer.navigator.currentIndex === this.composer.navigator.count - 1 && 1 < e || 0 === this.composer.navigator.currentIndex && e < 1) || (this.options.preventDefault && t.preventDefault(), t.timeStamp - this._lastWheelTime < 300 || (1 === t.deltaMode && (e *= 40), Math.abs(e) < 20 || (e < 0 ? this.composer.navigator.previous() : this.composer.navigator.next(), this._lastWheelTime = t.timeStamp)))
        }
        _scrollByWheel(t) {
            let e = t.deltaY;
            this.options.activeOnAppear && this._checkContentLocation(e) || (1 === t.deltaMode && (e *= 40), this.targetScrollPosition >= this.view.nominalLength && 1 < e && ("auto" === this.options.preventDefault || !this.options.preventDefault) || this.targetScrollPosition <= 0 && e < 1 && ("auto" === this.options.preventDefault || !this.options.preventDefault) || (this.options.preventDefault && t.preventDefault(), this._readViewPosition && (this._readViewPosition = !1, this.targetScrollPosition = this.view.position), this.targetScrollPosition += e, this.loop && "auto" !== this.options.preventDefault || (this.targetScrollPosition = Math.max(Math.min(this.view.nominalLength, this.targetScrollPosition), 0)), this.composer.navigator.goToPosition(this.targetScrollPosition, {
                useFriction: 0 !== this.options.friction,
                friction: this.options.friction
            }), this._lastWheelTime = t.timeStamp))
        }
    });
    Jt.registerAddon("grabCursor", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                useGrabCursor: !0
            }), this.composer.on("init", this._afterInit, this), this.composer.on("swipeGestureDisabled, swipeGestureEnabled", this._toggleEnable, this)
        }
        _toggleEnable(t) {
            ["betweenAnimationStart", "swipeGestureDisabled"].includes(t) ? (this.disabled = !0, this.composer.element.classList.remove(`${l}-cursor-grab`), this.composer.element.classList.remove(`${l}-cursor-grabbing`)) : (this.disabled = !1, this.composer.element.classList.add(`${l}-cursor-grab`))
        }
        _afterInit() {
            if (this.composer.view.on("betweenAnimationStart, betweenAnimationEnd", this._toggleEnable, this), this.composer.options.get("useGrabCursor") && !0 === this.composer.options.get("mouseSwipe")) {
                const t = this.composer["element"];
                t.classList.add(`${l}-cursor-grab`), this.composer.on("swipeStart", () => !this.disabled && t.classList.add(`${l}-cursor-grabbing`)), this.composer.on("swipeEnd", () => !this.disabled && t.classList.remove(`${l}-cursor-grabbing`))
            }
        }
    });
    const Bs = [];
    let zs = !0;
    const Ds = () => {
            zs || (Bs.forEach(t => t()), requestAnimationFrame(Ds))
        },
        Vs = t => (Bs.push(t), 1 === Bs.length && zs && (zs = !1, Ds()), Bs.length),
        js = t => {
            Bs.splice(Bs.indexOf(t), 1), 0 === Bs.length && (zs = !0)
        };
    class Rs {
        constructor(t, e) {
            this.delay = t, this.currentCount = 0, this.paused = !1, this.onTimer = null, e && this.start(), this.update = this.update.bind(this)
        }
        start() {
            this.paused = !1, this.lastTime = Date.now(), Vs(this.update)
        }
        stop() {
            this.paused = !0, js(this.update)
        }
        reset() {
            this.currentCount = 0, this.paused = !0, this.lastTime = Date.now()
        }
        update() {
            this.paused || Date.now() - this.lastTime < this.delay || (this.currentCount += 1, this.lastTime = Date.now(), this.onTimer && this.onTimer(this.getTime()))
        }
        getTime() {
            return this.delay * this.currentCount
        }
    }
    const Ws = {
        autostart: !1,
        duration: 3,
        autoStartAfterVideo: !0,
        pauseOnHover: !0,
        resetTimerOnBlur: !0,
        pauseAtEnd: "auto",
        navigatorParams: {
            animate: !0,
            duration: 1.5,
            easing: "easeOutExpo"
        }
    };

    function Ns(i) {
        if (i.__esModule) return i;
        var s = Object.defineProperty({}, "__esModule", {
            value: !0
        });
        return Object.keys(i).forEach(function(t) {
            var e = Object.getOwnPropertyDescriptor(i, t);
            Object.defineProperty(s, t, e.get ? e : {
                enumerable: !0,
                get: function() {
                    return i[t]
                }
            })
        }), s
    }
    Jt.registerAddon("slideshow", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                slideshow: !1
            }), this.timer = new Rs(100), this.timer.onTimer = this._onTimer.bind(this), this.mouseEntered = !1, this.composer.on("init", this.setup, this, 100)
        }
        setup() {
            var t = this.composer.options.get("slideshow");
            this.options = x(x({}, Ws), "object" == typeof t ? t : {
                autostart: !!t
            }), this._registerAutoPlayMethods(), this._readSectionSlideshowDataAttrs(), this.loop = this.composer.view.options.get("loop"), this.options.autostart ? (this._start(), this._waitForVideo()) : this.composer.slideshow.pause(), this.composer.on("changeStart", this._reset, this), this.composer.on("swipeStart", this._reset, this), this.composer.on("changeEnd", this._onChangeEnd, this), this.options.pauseOnHover && (this._mouseInteraction = this._mouseInteraction.bind(this), this.composer.element.addEventListener("mouseover", this._mouseInteraction, !1), this.composer.element.addEventListener("mouseenter", this._mouseInteraction, !1), this.composer.element.addEventListener("mouseleave", this._mouseInteraction, !1)), this.composer.on("sectionVideoOpen, detach", this._pause, this), this.composer.on("sectionVideoClose", this._start, this), this.composer.on("attach", () => {
                this._reset(), this._start()
            }), this.composer.trigger("slideshowInit", [this._hardPause])
        }
        _registerAutoPlayMethods() {
            this.composer.slideshow = {
                currentTime: () => this.durationProgress,
                resume: () => {
                    this._hardPause = !1, this.composer.paused = !1, this._start(), this.composer.trigger("slideshowStatusChange", [this._hardPause])
                },
                pause: () => {
                    this._hardPause = !0, this.composer.paused = !0, this._pause(), this.composer.trigger("slideshowStatusChange", [this._hardPause])
                },
                reset: () => this._reset,
                isPaused: () => this._hardPause
            }
        }
        _readSectionSlideshowDataAttrs() {
            this.duration = this.options.duration;
            var {
                slideshowDuration: t,
                slideshowPause: e
            } = this.composer.view.currentSection.element.dataset;
            t && (this.duration = t), e && this.composer.slideshow.pause(), this.duration *= 1e3
        }
        _start() {
            this._hardPause || (this._isPaused = !1, this.timer.start(), this.composer.trigger("slideshowStart"))
        }
        _pause() {
            this._isPaused = !0, this.timer.stop(), this.composer.trigger("slideshowPaused")
        }
        _reset() {
            this.timer.reset(), this.durationProgress = 0, this.composer.trigger("slideshowTimerUpdate", [this.durationProgress]), this.composer.trigger("slideshowTimerReset")
        }
        _onChangeEnd() {
            ("auto" !== this.options.pauseAtEnd || this.loop) && !0 !== this.options.pauseAtEnd || this.composer.navigator.targetIndex !== this.composer.navigator.count - 1 ? (this._readSectionSlideshowDataAttrs(), this.mouseEntered || (this._start(), this._waitForVideo())) : this.composer.slideshow.pause()
        }
        _onTimer() {
            this.durationProgress = this.timer.getTime() / this.duration * 100, this.composer.trigger("slideshowTimerUpdate", [this.durationProgress]), this.timer.getTime() >= this.duration && this.composer.navigator.next(this.options.navigatorParams)
        }
        _mouseInteraction(t) {
            switch (t.type) {
                case "mouseenter":
                case "mouseover":
                    this.mouseEntered = !0, this._pause();
                    break;
                case "mouseleave":
                    this.mouseEntered = !1, this.options.resetTimerOnBlur && this._reset(), this._start()
            }
        }
        _waitForVideo() {
            var t = this.options.autoStartAfterVideo,
                {
                    view: {
                        currentSection: {
                            backgroundVideoController: e,
                            hasBackgroundVideo: i
                        }
                    }
                } = this.composer;
            t && i && "playing" !== e.videoState && (this._reset(), this.composer.on("sectionBackgroundVideoPlay", this._start, this))
        }
    }), (function(t) {
        function e() {
            var t, s, a, h, i, e, l = window,
                c = document;

            function d(t, e) {
                this.scrollLeft = t, this.scrollTop = e
            }

            function n(t) {
                if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0;
                if ("object" == typeof t && "smooth" === t.behavior) return !1;
                throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.")
            }

            function o(t, e) {
                return "Y" === e ? t.clientHeight + i < t.scrollHeight : "X" === e ? t.clientWidth + i < t.scrollWidth : void 0
            }

            function r(t, e) {
                e = l.getComputedStyle(t, null)["overflow" + e];
                return "auto" === e || "scroll" === e
            }

            function p(t) {
                for (; t !== c.body && !1 === (i = void 0, i = o(e = t, "Y") && r(e, "Y"), e = o(e, "X") && r(e, "X"), i || e);) t = t.parentNode || t.host;
                var e, i;
                return t
            }

            function u(t) {
                var e, i = (h() - t.startTime) / s;
                e = i = 1 < i ? 1 : i, i = .5 * (1 - Math.cos(Math.PI * e)), e = t.startX + (t.x - t.startX) * i, i = t.startY + (t.y - t.startY) * i, t.method.call(t.scrollable, e, i), e === t.x && i === t.y || l.requestAnimationFrame(u.bind(l, t))
            }

            function m(t, e, i) {
                var s, n, o, r = h(),
                    t = t === c.body ? (n = (s = l).scrollX || l.pageXOffset, o = l.scrollY || l.pageYOffset, a.scroll) : (n = (s = t).scrollLeft, o = t.scrollTop, d);
                u({
                    scrollable: s,
                    method: t,
                    startTime: r,
                    startX: n,
                    startY: o,
                    x: e,
                    y: i
                })
            }
            "scrollBehavior" in c.documentElement.style && !0 !== l.__forceSmoothScrollPolyfill__ || (t = l.HTMLElement || l.Element, s = 468, a = {
                scroll: l.scroll || l.scrollTo,
                scrollBy: l.scrollBy,
                elementScroll: t.prototype.scroll || d,
                scrollIntoView: t.prototype.scrollIntoView
            }, h = l.performance && l.performance.now ? l.performance.now.bind(l.performance) : Date.now, e = l.navigator.userAgent, i = new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(e) ? 1 : 0, l.scroll = l.scrollTo = function() {
                void 0 !== arguments[0] && (!0 !== n(arguments[0]) ? m.call(l, c.body, void 0 !== arguments[0].left ? ~~arguments[0].left : l.scrollX || l.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : l.scrollY || l.pageYOffset) : a.scroll.call(l, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : l.scrollX || l.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : l.scrollY || l.pageYOffset))
            }, l.scrollBy = function() {
                void 0 !== arguments[0] && (n(arguments[0]) ? a.scrollBy.call(l, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : m.call(l, c.body, ~~arguments[0].left + (l.scrollX || l.pageXOffset), ~~arguments[0].top + (l.scrollY || l.pageYOffset)))
            }, t.prototype.scroll = t.prototype.scrollTo = function() {
                if (void 0 !== arguments[0])
                    if (!0 !== n(arguments[0])) {
                        var t = arguments[0].left,
                            e = arguments[0].top;
                        m.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e)
                    } else {
                        if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                        a.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                    }
            }, t.prototype.scrollBy = function() {
                void 0 !== arguments[0] && (!0 !== n(arguments[0]) ? this.scroll({
                    left: ~~arguments[0].left + this.scrollLeft,
                    top: ~~arguments[0].top + this.scrollTop,
                    behavior: arguments[0].behavior
                }) : a.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop))
            }, t.prototype.scrollIntoView = function() {
                var t, e, i;
                !0 !== n(arguments[0]) ? (e = (t = p(this)).getBoundingClientRect(), i = this.getBoundingClientRect(), t !== c.body ? (m.call(this, t, t.scrollLeft + i.left - e.left, t.scrollTop + i.top - e.top), "fixed" !== l.getComputedStyle(t).position && l.scrollBy({
                    left: e.left,
                    top: e.top,
                    behavior: "smooth"
                })) : l.scrollBy({
                    left: i.left,
                    top: i.top,
                    behavior: "smooth"
                })) : a.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
            })
        }
        t.exports = {
            polyfill: e
        }
    }(xs = {
        exports: {}
    }), xs.exports).polyfill();
    const Fs = ["click", "mouseenter", "mouseleave"],
        Hs = (t, e, i = 0) => {
            i ? setTimeout(() => {
                null != t && t(e)
            }, 1e3 * i) : null != t && t(e)
        },
        Ys = (n, o, r) => {
            const e = o.dataset.actions;
            if (e) {
                let t = [];
                try {
                    t = JSON.parse(e.replace(/'/g, '"'))
                } catch (t) {}
                t.forEach(([e, t, i, s]) => {
                    Fs.includes(t) ? (o.classList.add(`${l}-no-swipe`), o.classList.add(`${l}-has-mouse-action`), o.addEventListener(t, t => {
                        t.preventDefault(), t.stopPropagation(), Hs(n[e], s, i)
                    })) : (console.log(r, t), r.on(t, () => Hs(n[e], s, i)))
                })
            }
        };
    Jt.registerAddon("actions", class {
        constructor(t) {
            var n;
            this.composer = t, this.composer.on("init", this._afterInit, this), this.composer.on("layerCreate", this._setLayerActions, this), this.composer.actions = (n = t, {
                openURL({
                    path: t,
                    target: e
                }) {
                    window.open(t, e)
                },
                slideshow({
                    type: t
                }) {
                    var e, i;
                    ["resume", "pause", "reset"].includes(t) && null !== (e = (i = n.slideshow)[t]) && void 0 !== e && e.call(i)
                },
                gotoSection({
                    type: t,
                    to: e
                }) {
                    var i, s;
                    ["next", "previous"].includes(t) ? null !== (i = (s = n.navigator)[t]) && void 0 !== i && i.call(s, {
                        checkLoop: !0
                    }) : "number" !== t || Number.isNaN(e) ? 0 <= (t = n.view.sections.findIndex(t => t.element.id === n.element.id + "-" + e)) && n.navigator.goToIndex(t) : n.navigator.goToIndex(parseInt(e, 10))
                },
                scrollTo({
                    type: t,
                    to: e
                }) {
                    "below" === t ? window.scrollTo({
                        top: window.scrollY + n.element.getBoundingClientRect().bottom,
                        behavior: "smooth"
                    }) : null !== (e = document.querySelector(e)) && void 0 !== e && e.scrollIntoView({
                        behavior: "smooth"
                    })
                },
                backgroundVideo({
                    type: t
                }) {
                    var e, i;
                    const s = null === (e = n.view.currentSection) || void 0 === e || null === (i = e.backgroundVideoController) || void 0 === i ? void 0 : i.videoSource;
                    if (s) try {
                        switch (t) {
                            case "mute":
                                s.muted = !0;
                                break;
                            case "unmute":
                                s.muted = !1;
                                break;
                            case "toggleSound":
                                s.muted = !s.muted;
                                break;
                            case "toggle":
                                s.paused ? s.play() : s.pause();
                                break;
                            case "stop":
                                s.pause(), s.currentTime = 0;
                                break;
                            case "play":
                                s.play();
                                break;
                            case "pause":
                                s.pause();
                                break;
                            case "restart":
                                s.play(), s.currentTime = 0
                        }
                    } catch (t) {}
                },
                elements({
                    elements: t,
                    type: i
                }) {
                    t.forEach(t => {
                        const e = n.layersById[n.element.id + "-" + t];
                        if (e) switch (i) {
                            case "show":
                                null !== e && void 0 !== e && e.show();
                                break;
                            case "hide":
                                null !== e && void 0 !== e && e.hide();
                                break;
                            case "toggle":
                                null !== e && void 0 !== e && e.isHidden ? null !== e && void 0 !== e && e.show() : null !== e && void 0 !== e && e.hide()
                        }
                    })
                }
            })
        }
        _afterInit() {
            this.composer.view.sections.forEach(t => Ys(this.composer.actions, t.element, t))
        }
        _setLayerActions(t, e) {
            Ys(this.composer.actions, e.element, e)
        }
        _setupLoadingOnSection(t) {
            var e;
            t.isReady || (e = this.sectionLoadingTemplate.cloneNode(!0), t.element.appendChild(e))
        }
    });
    Jt.registerAddon("revertStyles", class {
        constructor(t) {
            this.composer = t, this.composer.options.register({
                useRevertStyles: !0
            }), this.composer.on("init", this._afterInit, this)
        }
        _afterInit() {
            var t, e;
            this.composer.options.get("useRevertStyles") && null !== (t = window) && void 0 !== t && null !== (e = t.CSS) && void 0 !== e && e.supports("all", "revert") && this.composer.element.classList.add(`${l}-revert`)
        }
    });
    Jt.registerAddon("hoverOff", class {
        constructor(t) {
            this.composer = t, this.composer.on("layerCreate", this._checkLayer, this), this.layersList = [], m.on("breakpointChange", this._update, this)
        }
        _checkLayer(t, e) {
            var i = (e.element.getAttribute("data-hover-off") || "").split(",").map(t => t.trim());
            i.length && (this.layersList.push({
                layer: e,
                hoverOffValue: i
            }), this._updateLayer(e, i, p().name))
        }
        _updateLayer(t, e, i) {
            e.includes(i || "desktop") ? t.element.classList.add(`${l}-hover-off`) : t.element.classList.remove(`${l}-hover-off`)
        }
        _update(t, i) {
            this.layersList.forEach(({
                layer: t,
                hoverOffValue: e
            }) => this._updateLayer(t, e, i))
        }
    });
    Jt.registerAddon("gotoNextVideoLayer", class {
        constructor(t) {
            this.composer = t, this.composer.on("layerCreate", this._checkLayer, this)
        }
        _checkLayer(t, e) {
            ["video", "embedVideo"].includes(e.type) && (this.goNext = "true" === e.element.getAttribute("data-goto-next"), this.goNext && e.on("videoEnded", () => {
                this.composer.navigator.next()
            }))
        }
    });
    Jt.registerAddon("layerAnimationsClassName", class {
        constructor(t) {
            this.composer = t, this.composer.on("layerGetInOutAnimation", this._checkLayer, this), this.layersList = [], m.on("breakpointChange", this._update, this)
        }
        _checkLayer(t, e) {
            this.layersList.push(e), this._updateLayer(e, p().name || "desktop")
        }
        _updateLayer(t, e) {
            var {
                inOutAnimation: {
                    animationsData: i
                }
            } = t;
            i && ((e = g(i, e)).animationIn ? t.frame.classList.add(`${l}-has-animation-in`) : t.frame.classList.remove(`${l}-has-animation-in`), e.animationOut ? t.frame.classList.add(`${l}-has-animation-out`) : t.frame.classList.remove(`${l}-has-animation-out`))
        }
        _update(t, e) {
            this.layersList.forEach(t => this._updateLayer(t, e))
        }
    });
    Jt.registerAddon("nearbySections", class {
        constructor(t) {
            this.composer = t, this.composer.on("init", this._setup, this)
        }
        _setup() {
            this.composer.view.options.register("nearbyVisibility", "hidden"), this.composer.view.options.register("nearbyVisibilityAmount", "10%");
            var t = this.composer.options.get("view"),
                e = this.composer.options.get("viewOptions.nearbyVisibility");
            "hidden" !== e && ["basic", "transform"].includes(t) && (this.nearbyAmount = this.composer.options.get("viewOptions.nearbyVisibilityAmount"), this.composer.element.classList.add(`${l}-nearby-sections-visible`), this.targetDimension = "v" === this.composer.options.get("viewOptions.dir") ? ["maxHeight", "height"] : ["maxWidth", "width"], this.composer.view.element.style[this.targetDimension[0]] = `calc(100% - ${this.nearbyAmount})`, this.composer.view.element.style[this.targetDimension[1]] = `calc(100% - ${this.nearbyAmount})`, "full" === e && this.composer.on("layoutUpdate", this._update, this), this.composer.layoutController.update())
        }
        _update() {
            var t = "maxHeight" === this.targetDimension[0] ? g(this.composer.options.get("height")) : this.composer.layoutController.activeBreakpointSize;
            this.composer.view.element.style[this.targetDimension[0]] = `${t}px`
        }
    });
    Jt.registerAddon("viewDir", class {
        constructor(t) {
            this.composer = t, this.composer.on("init", this._afterInit, this)
        }
        _afterInit() {
            var t = this.composer.options.get("viewOptions.dir");
            t && this.composer.element.classList.add(`${l}-view-dir-${t}`)
        }
    });
    Jt.registerAddon("slickerSpeed", class {
        constructor(t) {
            this.composer = t, this._update = this._update.bind(this), this.composer.on("navigatorSetup", this._setup, this)
        }
        _setup() {
            this.composer.navigator.options.register("slickerSpeed", .5), this.composer.navigator.options.observe("slickerSpeed", this._update), this._update()
        }
        _update() {
            var t = 100 * (this.composer.options.get("navigator.slickerSpeed") || .01);
            t <= 50 ? (this.composer.options.set("navigator.snapping.constant", 50 + 40 * (t / 50)), this.composer.options.set("navigator.slickerFriction", .01 + .19 * ((50 - t) / 50))) : (this.composer.options.set("navigator.snapping.constant", 90 + 910 * (t = (t - 50) / 50)), this.composer.options.set("navigator.slickerFriction", .01 - .01 * t))
        }
    });
    class Xs {
        constructor(t, e, i, s) {
            this.parallaxAddon = t, this.target = e, this.holder = i, this.refPoint = {
                x: 0,
                y: 0
            }, this.currentPoint = {
                x: 0,
                y: 0
            }, this.container = t.container, this._renderByMouse = this._renderByMouse.bind(this), this.options = s
        }
        _setupMouseInteractions() {
            this.holder.addEventListener("mousemove", this._renderByMouse), this.holder.addEventListener("mouseleave", this._renderByMouse)
        }
        _revokeMouseInteractions() {
            this.holder.removeEventListener("mousemove", this._renderByMouse), this.holder.removeEventListener("mouseleave", this._renderByMouse)
        }
        _renderByMouse(t) {
            let e, i;
            if ("mousemove" === t.type) {
                const o = t.currentTarget;
                var {
                    top: s,
                    left: n
                } = o.getBoundingClientRect();
                e = t.clientX - n - o.offsetWidth / 2, i = t.clientY - s - o.offsetHeight / 2
            } else e = 0, i = 0;
            this.refPoint = {
                x: e,
                y: i
            }
        }
        _calculate() {
            var t, e, i, s;
            !1 === this.options.smooth ? this.currentPoint = this.refPoint : ({
                x: t,
                y: e
            } = this.refPoint, {
                x: i,
                y: s
            } = this.currentPoint, this.currentPoint = {
                x: i + (i = t - i) / 12,
                y: s + (s = e - s) / 12
            }, Math.abs(i) < .019 && (this.currentPoint.x = t), Math.abs(s) < .019 && (this.currentPoint.y = e)), this.render(), requestAnimationFrame(() => this._calculate())
        }
        render() {
            var {
                x: t = .5,
                y: e = .5
            } = this.options, {
                x: i,
                y: s
            } = this.currentPoint, t = -i * Oi(t), e = -s * Oi(e);
            this.container.style.transform = "translateX(" + t + "px) translateY(" + e + "px) "
        }
        initiate() {
            var {
                use: t = "mouse"
            } = this.options;
            "mouse" === (this.lastActiveUseValue = t) && this._setupMouseInteractions(), this._calculate()
        }
        reset() {
            "mouse" === this.lastActiveUseValue && this._revokeMouseInteractions(), this.container.style.transform = ""
        }
    }
    const qs = new Map;
    qs.set("2d", Xs), qs.set("3d", class extends Xs {
        render() {
            var {
                x: t = 0,
                y: e = 0,
                rx: i = 30,
                ry: s = 30
            } = this.options, {
                x: n,
                y: o
            } = this.currentPoint, {
                offsetWidth: r,
                offsetHeight: a
            } = this.holder, t = -n * Oi(t), e = -o * Oi(e), i = n / (r / 2) * Oi(i), s = -o / (a / 2) * Oi(s);
            this.container.style.transform = "translateX(" + t + "px) translateY(" + e + "px) rotateY(" + i + "deg) rotateX(" + s + "deg)"
        }
        initiate() {
            var {
                use: t = "mouse",
                zOrigin: e = 0
            } = this.options;
            "mouse" === (this.lastActiveUseValue = t) && this._setupMouseInteractions(), this.container.style.transformStyle = "preserve-3d", this.container.style.transformOrigin = `center center ${Oi(e)}px`, this._calculate()
        }
        reset() {
            super.reset(), this.container.style.transformStyle = "", this.container.style.transformOrigin = ""
        }
    }), qs.set("scroll", class {
        constructor(t, e, i, s) {
            this.parallaxAddon = t, this.target = e, this.holder = i, this.refValue = 0, this.currentValue = 0, this.container = t.container, this._onScroll = this._onScroll.bind(this), this.options = s, this.alwaysEnabled = !0
        }
        _setupScrollInteractions() {
            document.addEventListener("scroll", this._onScroll)
        }
        _revokeScrollInteractions() {
            document.removeEventListener("scroll", this._onScroll)
        }
        _onScroll() {
            var {
                top: t,
                bottom: e,
                height: i
            } = this.holder.getBoundingClientRect(), {
                twoWay: s = !0
            } = this.options;
            t < 0 ? this.refValue = Math.max(-i, t) / i : e > window.innerHeight ? this.refValue = (s ? 1 : -1) * Math.min(i, e - window.innerHeight) / i : this.refValue = 0
        }
        _calculate() {
            var t;
            !1 === this.options.smooth ? this.currentValue = this.refValue : (t = this.refValue - this.currentValue, this.currentValue += t / 12, Math.abs(t) < .001 && (this.currentValue = this.refValue)), this.render(), requestAnimationFrame(() => this._calculate())
        }
        render() {
            var t, {
                dir: e = "bottom",
                movement: i = 300,
                fade: s = !1,
                rotate: n = 0,
                scale: o = 1
            } = this.options;
            let r = "",
                a = "";
            i && (t = ["top", "left"].includes(e), r += `translate${["bottom","top"].includes(e)?"Y":"X"}(${this.currentValue*Oi(i)*(t?1:-1)}px)`), n && (r += ` rotate(${Oi(n)*this.currentValue}deg)`), 1 !== o && (r += ` scale(${1+(1-Oi(o))*this.currentValue})`), s && (a = 1 - Math.abs(this.currentValue)), this.container.style.transform = r, this.container.style.opacity = a
        }
        initiate() {
            this._setupScrollInteractions(), this._onScroll(), this._calculate(), this.holder.classList.add(`${l}-scroll-parallax`)
        }
        reset() {
            this._revokeScrollInteractions(), this.container.style.transform = "", this.container.style.opacity = "", this.holder.classList.remove(`${l}-scroll-parallax`)
        }
    }), qs.set("viewScroll", class {
        constructor(t, e, i, s) {
            this.controller = t, this.target = e, this.holder = i, this.refValue = 0, this.currentValue = 0, this.container = t.container, this._onScroll = this._onScroll.bind(this), this.options = s, this.alwaysEnabled = !0
        }
        _setupScrollInteractions() {
            this.controller.holder.on("pendingOffsetChange", this._onScroll)
        }
        _revokeScrollInteractions() {
            this.controller.holder.on("pendingOffsetChange", this._onScroll)
        }
        _onScroll(t, e, i, s) {
            this.value = s, this.render()
        }
        render() {
            var t, {
                dir: e = "bottom",
                movement: i = 300,
                fade: s = !1,
                rotate: n = 0,
                scale: o = 1
            } = this.options;
            let r = "",
                a = "";
            i && (t = ["top", "left"].includes(e), r += `translate${["bottom","top"].includes(e)?"Y":"X"}(${this.value*Oi(i)*(t?1:-1)}px)`), n && (r += ` rotate(${Oi(n)*this.value}deg)`), 1 !== o && (r += ` scale(${1+(1-Oi(o))*this.value})`), s && (a = 1 - Math.abs(this.value)), this.container.style.transform = r, this.container.style.opacity = a
        }
        initiate() {
            this._setupScrollInteractions()
        }
        reset() {
            this._revokeScrollInteractions(), this.container.style.transform = "", this.container.style.opacity = ""
        }
    });
    const Zs = t => {
        try {
            var e = v(t, "parallax");
            if ($i(e)) return !1;
            const i = {};
            return Object.entries(e).forEach(([t, e]) => {
                i[t] = "false" !== e && JSON.parse(e.replace(/'/g, '"'))
            }), i
        } catch (t) {
            return console.log(t), !1
        }
    };
    class Gs {
        constructor(t, e, i, s, n = !0) {
            if (this.options = s, this.activeAreaElement = i, this.holder = e, this.targetElement = t, n) {
                const o = document.createElement("div");
                o.classList.add(`${l}-parallax-wrap`), this.container = o, ki(t, o)
            } else this.container = t;
            m.on("breakpointChange", (t, e) => this._update(e), this), this._update(p().name)
        }
        _update(t) {
            t = g(this.options, t);
            if (this.disable(), !t) return this.holder.off("readyAndActivated", this.enable, this), void this.holder.off("readyAndDeactivated", this.disable, this);
            this.activeOptions = t;
            var t = this.activeOptions["type"];
            const e = qs.get(t);
            e ? (this.activeHandler = new e(this, this.targetElement, this.activeAreaElement, this.activeOptions), this.activeHandler.alwaysEnabled ? (this.holder.off("readyAndActivated", this.enable, this), this.holder.off("readyAndDeactivated", this.disable, this), this.enable()) : (this.holder.on("readyAndActivated", this.enable, this), this.holder.on("readyAndDeactivated", this.disable, this), this.holder.isReady && this.holder.isActivated && this.enable())) : console.warn("No parallax handler found for " + t)
        }
        enable() {
            this.isEnabled || (this.isEnabled = !0, this.activeHandler.initiate())
        }
        disable() {
            var t;
            this.isEnabled = !1, null !== (t = this.activeHandler) && void 0 !== t && t.reset()
        }
    }
    Jt.registerAddon("parallax", class {
        constructor(t) {
            (this.composer = t).options.get("disableAnimations") || (this.composer.on("layerCreate", this._checkLayer, this), this.composer.on("sectionReady", this._checkSection, this), this.layersList = [])
        }
        _checkLayer(t, e) {
            var i = Zs(e.element);
            i && new Gs(e.element, e.holder, this.composer.element, i)
        }
        _checkSection(t, e) {
            var i, s = Zs(e.element);
            !s || (i = e.background.element) && new Gs(i, e, this.composer.element, s, !1)
        }
    });
    Jt.registerAddon("animrollOptionsController", class {
        constructor(t) {
            this.composer = t;
            t = this.composer.options.get("sectionType");
            "animroll" === this.composer.options.get("view") && "animative" !== t && this.composer.options.set("sectionType", "animative")
        }
    });
    Ss = Object.freeze({
        __proto__: null,
        default: class {
            constructor(t) {
                var e = null === (i = (this.section = t).background) || void 0 === i ? void 0 : i.targetImg,
                    t = e && v(e, "ken-burns"),
                    i = e && v(e, "crop");
                this.section.hasKenBurnsEffect = t && !$i(t) && i && !$i(i), this.enabled = this.section.hasKenBurnsEffect, this.enabled && (this.imageElement = e, this.kenBurnsAttrs = Ti(t, Pi), this.cropAttrs = Ti(i, Pi), this.section.on("readyAndActivated, resize", this.setAnimation, this), this.section.on("deactivated", this.removeAnimation, this), this.animTarget = this.section.background.element)
            }
            setAnimation(t) {
                if ("resize" !== t || this.section.active) {
                    const e = (null === (t = this.anim) || void 0 === t ? void 0 : t.timeline.progress) || 0;
                    if (null !== (t = this.anim) && void 0 !== t && t.reset(), cancelAnimationFrame(this.ram), this.imageElement.classList.contains(`${l}-cropped`)) {
                        const i = g(this.kenBurnsAttrs);
                        i && (i.set = g(this.cropAttrs), this.ram = requestAnimationFrame(() => {
                            if (this.anim = Ci("kenBurns", this.animTarget, "out", i), e) {
                                const t = this.anim["timeline"];
                                t.seek(t.duration * e / 100)
                            }
                        }))
                    }
                }
            }
            removeAnimation() {
                var t, e;
                null === (t = this.anim) || void 0 === t || null !== (e = t.reset) && void 0 !== e && e.call(t), this.anim = void 0
            }
        }
    });
    const Us = Ns(Qt)["default"],
        Ks = Ns(Ss)["default"];
    Us.registerAddon("kenBurns", class {
        constructor(t) {
            this.composer = t, this.activeSlides = [], t.options.get("disableAnimations") || this.composer.on("sectionReady", this._checkSection, this)
        }
        _checkSection(t, e) {
            e.firstMount && (e.kenBurnsController = new Ks(e), e.hasBackgroundVideo || this.activeSlides.push(e))
        }
    });
    Jt.registerAddon("detacher", class {
        constructor(t) {
            this.composer = t, this.composerElement = this.composer.element, this.composer.options.register({
                detachBeforeInit: !1,
                restartActiveSections: !0
            }), this._placeHolder = document.createElement("span"), this._placeHolder.style.display = "none", this._placeHolder.dataset.placeholder = this.composerElement.id, this.isDetached = !1, this.disableAutoInit = this.composer.options.get("detachBeforeInit"), this.restartActiveSections = this.composer.options.get("restartActiveSections"), this.disableAutoInit && (this.composer.initTrigger.hold(), this._detach()), this.composer.attach = this._attach.bind(this), this.composer.detach = this._detach.bind(this)
        }
        _detach() {
            this.isDetached || (this.isDetached = !0, this.composer.trigger("beforeDetach"), this.composerElement.parentElement.insertBefore(this._placeHolder, this.composerElement), this.composerElement.remove(), this.composer.trigger("detach"), this.composer.navigator.goToIndex(this.composer.navigator.targetIndex, {
                animate: !1
            }, !0))
        }
        _attach(t) {
            this.isDetached && (this.isDetached = !1, this.composer.trigger("beforeAttach"), t ? t.appendChild(this.composerElement) : (this._placeHolder.parentElement.insertBefore(this.composerElement, this._placeHolder), this._placeHolder.remove()), this.disableAutoInit ? (this.disableAutoInit = !1, this.composer.initTrigger.exec()) : (this.composer.layoutController.update(), this.restartActiveSections && this.composer.view.sections.forEach(t => {
                t.reactive()
            }), this.composer.trigger("attach")))
        }
    });
    class Js {
        constructor(t) {
            const e = t.element.querySelector(`.${l}-bg-embed`),
                i = null === e || void 0 === e ? void 0 : e.querySelector("iframe");
            var s;
            t.hasBackgroundVideo = !!i, t.hasBackgroundVideo && (i.dataset.src && i.setAttribute("src", i.dataset.src), s = e.querySelector("img"), this.videoWrapper = e, this.videoSource = i, this.videoPoster = s, this.section = t, this.composer = t.composer, this._videoState = "initial", this.looped = "false" !== i.getAttribute("data-loop"), this.videoWidth = i.getAttribute("data-width") || 100, this.videoHeight = i.getAttribute("data-height") || 100, this.autoPause = "true" === i.getAttribute("data-auto-pause"), t.background.appendBackground(this.videoWrapper), this.goNext = "true" === i.getAttribute("data-goto-next"), this.videoElement = new us(this.videoSource), this.videoElement.setup(this._videoControllerReady.bind(this)), this.section.readyTrigger.hold(), this.section.on("resize", this._locateBackground.bind(this), this), this.section.on("deactivated, readyAndActivated", this._sectionStateChange.bind(this), this))
        }
        _locateBackground() {
            var t = ((t, e, i) => {
                var s = t.width / e.width,
                    n = t.height / e.height,
                    n = Math.max(s, n);
                let o = e.height * n,
                    r = e.width * n;
                n = o - t.height;
                return n <= i && (t = r / o, o = o + i - n, r = (o + i - n) * t), {
                    width: r,
                    height: o
                }
            })(this.section.element.getBoundingClientRect(), {
                width: this.videoWidth,
                height: this.videoHeight
            }, "vimeo" === this.videoElement.type ? 0 : 120);
            this.videoWrapper.style.width = `${t.width}px`, this.videoWrapper.style.height = `${t.height}px`
        }
        _videoControllerReady() {
            this.videoReady || (this.videoReady = !0, this._onVideoPlay = this._onVideoPlay.bind(this), this._onVideoPause = this._onVideoPause.bind(this), this._onVideoEnded = this._onVideoEnded.bind(this), this.videoElement.on("play", this._onVideoPlay), this.videoElement.on("pause", this._onVideoPause), this.videoElement.on("ended", this._onVideoEnded), this._locateBackground(), this.section.readyTrigger.exec(), this.section.active && this.section.isReady ? this.videoElement.play() : this.videoElement.pause(), this.section.trigger("backgroundEmbedVideoReady", [this.section], !0), this.composer.on("attach", () => {
                "playing" === this._videoState && this.videoElement.play()
            }))
        }
        _sectionStateChange(t) {
            if (this.videoReady) switch (t) {
                case "readyAndActivated":
                default:
                    this.videoElement.play();
                    break;
                case "deactivated":
                    this.videoElement.pause(), this.autoPause || this.videoElement.stop()
            }
        }
        _onVideoPlay() {
            this._videoState = "playing", this.videoPoster && this.videoPoster.classList.remove(`.${l}-bg-embed-show-poster`), this.section.trigger("backgroundEmbedVideoPlay", [this], !0)
        }
        _onVideoPause() {
            this._videoState = "stopped", this.videoPoster && this.videoPoster.classList.add(`.${l}-bg-embed-show-poster`), this.section.trigger("backgroundEmbedVideoPause", [this], !0)
        }
        _onVideoEnded() {
            this._videoState = "ended", this.section.trigger("backgroundEmbedVideoEnded", [this], !0), this.goNext ? this.composer.navigator.next() : this.looped ? this.videoElement.play() : this.looped || (this.videoElement.play(), this.videoElement.pause())
        }
    }
    Jt.registerAddon("sectionBackgroundEmbedVideo", class {
        constructor(t) {
            this.composer = t, this.activeSlides = [], this.composer.on("sectionBeforeMount", this._checkSection, this)
        }
        _checkSection(t, e) {
            e.firstMount && (e.backgroundVideoController = new Js(e), e.hasBackgroundVideo || this.activeSlides.push(e))
        }
    });
    const Qs = [];
    window.depicterInstances = Qs;
    class tn extends Jt {
        static setup(t, i) {
            t = Array.from(document.querySelectorAll(t)).filter(e => !Qs.find(({
                element: t
            }) => t === e)).map(t => {
                const e = new tn;
                return e.setup(t, i), Qs.push(e), e
            });
            return null == t ? void 0 : t[0]
        }
        setup(t, e = {}) {
            super.setup(t, e), this.options.register({})
        }
    }

    function en() {
        window.DepicterDisableAutoInit || tn.initAll()
    }
    return tn.version = "1.9.4", tn.author = {
        name: "Averta",
        url: "https://averta.net"
    }, window.Depicter ? console.warn("Another instance of Depicter module found on the page.") : "complete" === document.readyState ? setTimeout(en, 20) : document.addEventListener("DOMContentLoaded", en), tn
});