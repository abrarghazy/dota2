/**
 * @module       RD Parallax
 * @author       Evgeniy Gusarov
 * @see          https://ua.linkedin.com/pub/evgeniy-gusarov/8a/a40/54a
 * @version      3.0.3
 */
(function () {
    (function (e, r, p) {
        var n, q, k, l;
        l = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        q = (k = -1 !== navigator.appVersion.indexOf("MSIE")) ? parseInt(navigator.appVersion.split("MSIE")[1]) : null;
        n = function () {
            function b(a, d) {
                this.options = e.extend(!0, {}, this.Defaults, d);
                this.$element = e(a);
                this.$win = e(p);
                this.$doc = e(r);
                this.initialize()
            }

            b.prototype.Defaults = {
                blur: !0, direction: "inverse", speed: 1, duration: 200, easing: "linear", screenAliases: {
                    0: "", 480: "xs", 768: "sm",
                    992: "md", 1200: "lg"
                }
            };
            b.prototype.initialize = function () {
                var a;
                a = this;
                a.$element.wrapInner(e("<div/>", {"class": "rd-parallax-inner"})).find(".rd-parallax-layer[data-type]").each(function () {
                    var d, c;
                    d = e(this);
                    switch (d.attr("data-type").toLowerCase()) {
                        case "media":
                            if (c = this.getAttribute("data-url"))d.css({"background-image": a.url(c)}), ("true" === this.getAttribute("data-blur") || a.options.blur) && e("<img/>", {src: c}).load(function () {
                                d.attr("data-media-width", this.width);
                                d.attr("data-media-height", this.height);
                                a.$win.on("resize", e.proxy(a.blurMedia, d[0], a));
                                return e.proxy(a.blurMedia, d[0], a)()
                            });
                            l || (a.$element.on("resize", e.proxy(a.resizeMedia, this, a)), a.$element.on("resize", e.proxy(a.moveLayer, this, a)), a.$win.on("resize", e.proxy(a.resizeMedia, this, a)))
                    }
                    if (!l) {
                        a.$doc.on("scroll", e.proxy(a.moveLayer, this, a));
                        a.$doc.on("resize", e.proxy(a.moveLayer, this, a));
                        if ("true" === this.getAttribute("data-fade") && !k)a.$doc.on("scroll", e.proxy(a.fadeLayer, this, a));
                        if ("true" === this.getAttribute("data-fade") && !k)a.$doc.on("resize",
                            e.proxy(a.fadeLayer, this, a))
                    }
                });
                a.$win.trigger("resize");
                a.$doc.trigger("scroll")
            };
            b.prototype.moveLayer = function (a) {
                var d, c, h, f, m, b;
                f = a.$win.scrollTop();
                h = a.$element.offset().top;
                b = a.$win.height();
                d = a.$element.height();
                c = this.offsetHeight;
                parseFloat(m);
                m = ("inverse" === a.getAttribute(this, "direction") ? -1 : 1) * Math.min(parseFloat(a.getAttribute(this, "speed")), 2);
                d = -(h - f) * m + (d - c) / 2 + (b - d) / 2 * m;
                return e(this).css(a.transform(d, a))
            };
            b.prototype.fadeLayer = function (a, d) {
                var c, h, f, b, g;
                f = e(this);
                c = a.$element.height();
                h = a.$element.offset().top + c / 2;
                b = f.offset().top + f.height() / 2;
                g = c / 6;
                if (h + g > b && h - g < b)return f.css({opacity: 1});
                c = h - g < b ? 1 + (h + g - b) / c / 3 * 10 : 1 - (h - g - b) / c / 3 * 10;
                return f.css({opacity: 0 > c ? 0 : 1 < c ? 1 : c.toFixed(2)})
            };
            b.prototype.blurMedia = function (a) {
                var d, c, b, f;
                d = this.offsetHeight;
                f = this.offsetWidth;
                c = parseFloat(this.getAttribute("data-media-height"));
                b = parseFloat(this.getAttribute("data-media-width"));
                d = Math.ceil(Math.max(d / c, f / b));
                return e(this).css(a.blur(d))
            };
            b.prototype.resizeMedia = function (a) {
                return this.style.height =
                    a.px(a.getMediaHeight(a.$win.height(), a.$element.height(), a.getAttribute(this, "speed"), "inverse" === a.getAttribute(this, "direction") ? -1 : 1))
            };
            b.prototype.getMediaHeight = function (a, d, c, b) {
                var f;
                c = Math.max(parseFloat(c), 0);
                c = Math.min(parseFloat(c), 2);
                f = 0;
                -1 === b && (f = (d + a) * c);
                return d + f + (1 >= c ? (a - d) * c : a * c)
            };
            b.prototype.url = function (a) {
                return "url(" + a + ")"
            };
            b.prototype.px = function (a) {
                return a + "px"
            };
            b.prototype.transform = function (a, d) {
                return k && 10 > q ? {transform: "translate(0," + a + "px)"} : {
                    "-webkit-transform": "translate3d(0," +
                    a + "px, 0)",
                    transform: "translate3d(0," + a + "px, 0)",
                    transition: l ? "" + d.options.duration + "ms transform " + d.options.easing : "none"
                }
            };
            b.prototype.blur = function (a) {
                return 3 < a ? {"-webkit-filter": "blur(" + a + "px)", filter: "blur(" + a + "px)"} : {
                    filter: "none",
                    "-webkit-filter": "none"
                }
            };
            b.prototype.getAttribute = function (a, d) {
                var c, b, f, e, g;
                if (null != this.options.screenAliases)for (b = Object.keys(this.options.screenAliases).reverse(), f = e = 0, g = b.length - 1; (0 <= g ? e <= g : e >= g) && !(c = "" !== this.options.screenAliases[b[f]] ? "-" + this.options.screenAliases[b[f]] :
                    this.options.screenAliases[b[f]], c = a.getAttribute("data" + c + "-" + d), b[f] <= this.$win.width() && null != c); f = 0 <= g ? ++e : --e);
                return null != c ? c : this.options[d]
            };
            return b
        }();
        e.fn.extend({
            RDParallax: function (b) {
                return this.each(function () {
                    var a;
                    a = e(this);
                    if (!a.data("RDParallax"))return a.data("RDParallax", new n(this, b))
                })
            }
        });
        return p.RDParallax = n
    })(window.jQuery, document, window);
    "undefined" !== typeof module && null !== module ? module.exports = window.RDParallax : "function" === typeof define && define.amd && define(["jquery"],
        function () {
            return window.RDParallax
        })
}).call(this);
