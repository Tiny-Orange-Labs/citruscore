// node_modules/@lit/reactive-element/css-tag.js
var t$5 = window;
var e$9 = t$5.ShadowRoot && (void 0 === t$5.ShadyCSS || t$5.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s$7 = Symbol();
var n$7 = /* @__PURE__ */ new WeakMap();
var o$7 = class o {
  constructor(t3, e4, n5) {
    if (this._$cssResult$ = true, n5 !== s$7)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e4;
  }
  get styleSheet() {
    let t3 = this.o;
    const s5 = this.t;
    if (e$9 && void 0 === t3) {
      const e4 = void 0 !== s5 && 1 === s5.length;
      e4 && (t3 = n$7.get(s5)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && n$7.set(s5, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r$4 = (t3) => new o$7("string" == typeof t3 ? t3 : t3 + "", void 0, s$7);
var i$6 = (t3, ...e4) => {
  const n5 = 1 === t3.length ? t3[0] : e4.reduce((e5, s5, n6) => e5 + ((t4) => {
    if (true === t4._$cssResult$)
      return t4.cssText;
    if ("number" == typeof t4)
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t3[n6 + 1], t3[0]);
  return new o$7(n5, t3, s$7);
};
var S$2 = (s5, n5) => {
  e$9 ? s5.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((e4) => {
    const n6 = document.createElement("style"), o5 = t$5.litNonce;
    void 0 !== o5 && n6.setAttribute("nonce", o5), n6.textContent = e4.cssText, s5.appendChild(n6);
  });
};
var c$4 = e$9 ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const s5 of t4.cssRules)
    e4 += s5.cssText;
  return r$4(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2$2 = window;
var r2 = e2$2.trustedTypes;
var h$2 = r2 ? r2.emptyScript : "";
var o2$1 = e2$2.reactiveElementPolyfillSupport;
var n2 = { toAttribute(t3, i3) {
  switch (i3) {
    case Boolean:
      t3 = t3 ? h$2 : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i3) {
  let s5 = t3;
  switch (i3) {
    case Boolean:
      s5 = null !== t3;
      break;
    case Number:
      s5 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t3);
      } catch (t4) {
        s5 = null;
      }
  }
  return s5;
} };
var a$3 = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
var l$6 = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a$3 };
var d$2 = class d extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t3) {
    var i3;
    this.finalize(), (null !== (i3 = this.h) && void 0 !== i3 ? i3 : this.h = []).push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i3, s5) => {
      const e4 = this._$Ep(s5, i3);
      void 0 !== e4 && (this._$Ev.set(e4, s5), t3.push(e4));
    }), t3;
  }
  static createProperty(t3, i3 = l$6) {
    if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s5 = "symbol" == typeof t3 ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i3);
      void 0 !== e4 && Object.defineProperty(this.prototype, t3, e4);
    }
  }
  static getPropertyDescriptor(t3, i3, s5) {
    return { get() {
      return this[i3];
    }, set(e4) {
      const r4 = this[t3];
      this[i3] = e4, this.requestUpdate(t3, r4, s5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l$6;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), void 0 !== t3.h && (this.h = [...t3.h]), this.elementProperties = new Map(t3.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s5 of i3)
        this.createProperty(s5, t4[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i3) {
    const s5 = [];
    if (Array.isArray(i3)) {
      const e4 = new Set(i3.flat(1 / 0).reverse());
      for (const i4 of e4)
        s5.unshift(c$4(i4));
    } else
      void 0 !== i3 && s5.push(c$4(i3));
    return s5;
  }
  static _$Ep(t3, i3) {
    const s5 = i3.attribute;
    return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  u() {
    var t3;
    this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t3 = this.constructor.h) || void 0 === t3 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i3, s5;
    (null !== (i3 = this._$ES) && void 0 !== i3 ? i3 : this._$ES = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t3.hostConnected) || void 0 === s5 || s5.call(t3));
  }
  removeController(t3) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.splice(this._$ES.indexOf(t3) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t3, i3) => {
      this.hasOwnProperty(i3) && (this._$Ei.set(i3, this[i3]), delete this[i3]);
    });
  }
  createRenderRoot() {
    var t3;
    const s5 = null !== (t3 = this.shadowRoot) && void 0 !== t3 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return S$2(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t3;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
      var i3;
      return null === (i3 = t4.hostConnected) || void 0 === i3 ? void 0 : i3.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
      var i3;
      return null === (i3 = t4.hostDisconnected) || void 0 === i3 ? void 0 : i3.call(t4);
    });
  }
  attributeChangedCallback(t3, i3, s5) {
    this._$AK(t3, s5);
  }
  _$EO(t3, i3, s5 = l$6) {
    var e4;
    const r4 = this.constructor._$Ep(t3, s5);
    if (void 0 !== r4 && true === s5.reflect) {
      const h3 = (void 0 !== (null === (e4 = s5.converter) || void 0 === e4 ? void 0 : e4.toAttribute) ? s5.converter : n2).toAttribute(i3, s5.type);
      this._$El = t3, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
    }
  }
  _$AK(t3, i3) {
    var s5;
    const e4 = this.constructor, r4 = e4._$Ev.get(t3);
    if (void 0 !== r4 && this._$El !== r4) {
      const t4 = e4.getPropertyOptions(r4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== (null === (s5 = t4.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t4.converter : n2;
      this._$El = r4, this[r4] = h3.fromAttribute(i3, t4.type), this._$El = null;
    }
  }
  requestUpdate(t3, i3, s5) {
    let e4 = true;
    void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a$3)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), true === s5.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i4) => this[i4] = t4), this._$Ei = void 0);
    let i3 = false;
    const s5 = this._$AL;
    try {
      i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostUpdate) || void 0 === i4 ? void 0 : i4.call(t4);
      }), this.update(s5)) : this._$Ek();
    } catch (t4) {
      throw i3 = false, this._$Ek(), t4;
    }
    i3 && this._$AE(s5);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.forEach((t4) => {
      var i4;
      return null === (i4 = t4.hostUpdated) || void 0 === i4 ? void 0 : i4.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    void 0 !== this._$EC && (this._$EC.forEach((t4, i3) => this._$EO(i3, this[i3], t4)), this._$EC = void 0), this._$Ek();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
d$2.finalized = true, d$2.elementProperties = /* @__PURE__ */ new Map(), d$2.elementStyles = [], d$2.shadowRootOptions = { mode: "open" }, null == o2$1 || o2$1({ ReactiveElement: d$2 }), (null !== (s2 = e2$2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2$2.reactiveElementVersions = []).push("1.4.2");

// node_modules/lit-html/lit-html.js
var t2;
var i2$2 = window;
var s3 = i2$2.trustedTypes;
var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var o3 = `lit$${(Math.random() + "").slice(9)}$`;
var n3 = "?" + o3;
var l2$1 = `<${n3}>`;
var h2 = document;
var r3 = (t3 = "") => h2.createComment(t3);
var d2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var u$3 = Array.isArray;
var c2 = (t3) => u$3(t3) || "function" == typeof (null == t3 ? void 0 : t3[Symbol.iterator]);
var v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var a2 = /-->/g;
var f$3 = />/g;
var _$1 = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var m$2 = /'/g;
var p$2 = /"/g;
var $$1 = /^(?:script|style|textarea|title)$/i;
var g$1 = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
var y$1 = g$1(1);
var x$1 = Symbol.for("lit-noChange");
var b$1 = Symbol.for("lit-nothing");
var T$1 = /* @__PURE__ */ new WeakMap();
var A$1 = h2.createTreeWalker(h2, 129, null, false);
var E$1 = (t3, i3) => {
  const s5 = t3.length - 1, n5 = [];
  let h3, r4 = 2 === i3 ? "<svg>" : "", d3 = v$1;
  for (let i4 = 0; i4 < s5; i4++) {
    const s6 = t3[i4];
    let e4, u3, c3 = -1, g2 = 0;
    for (; g2 < s6.length && (d3.lastIndex = g2, u3 = d3.exec(s6), null !== u3); )
      g2 = d3.lastIndex, d3 === v$1 ? "!--" === u3[1] ? d3 = a2 : void 0 !== u3[1] ? d3 = f$3 : void 0 !== u3[2] ? ($$1.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d3 = _$1) : void 0 !== u3[3] && (d3 = _$1) : d3 === _$1 ? ">" === u3[0] ? (d3 = null != h3 ? h3 : v$1, c3 = -1) : void 0 === u3[1] ? c3 = -2 : (c3 = d3.lastIndex - u3[2].length, e4 = u3[1], d3 = void 0 === u3[3] ? _$1 : '"' === u3[3] ? p$2 : m$2) : d3 === p$2 || d3 === m$2 ? d3 = _$1 : d3 === a2 || d3 === f$3 ? d3 = v$1 : (d3 = _$1, h3 = void 0);
    const y2 = d3 === _$1 && t3[i4 + 1].startsWith("/>") ? " " : "";
    r4 += d3 === v$1 ? s6 + l2$1 : c3 >= 0 ? (n5.push(e4), s6.slice(0, c3) + "$lit$" + s6.slice(c3) + o3 + y2) : s6 + o3 + (-2 === c3 ? (n5.push(void 0), i4) : y2);
  }
  const u2 = r4 + (t3[s5] || "<?>") + (2 === i3 ? "</svg>" : "");
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e3 ? e3.createHTML(u2) : u2, n5];
};
var C$1 = class C {
  constructor({ strings: t3, _$litType$: i3 }, e4) {
    let l4;
    this.parts = [];
    let h3 = 0, d3 = 0;
    const u2 = t3.length - 1, c3 = this.parts, [v2, a3] = E$1(t3, i3);
    if (this.el = C$1.createElement(v2, e4), A$1.currentNode = this.el.content, 2 === i3) {
      const t4 = this.el.content, i4 = t4.firstChild;
      i4.remove(), t4.append(...i4.childNodes);
    }
    for (; null !== (l4 = A$1.nextNode()) && c3.length < u2; ) {
      if (1 === l4.nodeType) {
        if (l4.hasAttributes()) {
          const t4 = [];
          for (const i4 of l4.getAttributeNames())
            if (i4.endsWith("$lit$") || i4.startsWith(o3)) {
              const s5 = a3[d3++];
              if (t4.push(i4), void 0 !== s5) {
                const t5 = l4.getAttribute(s5.toLowerCase() + "$lit$").split(o3), i5 = /([.?@])?(.*)/.exec(s5);
                c3.push({ type: 1, index: h3, name: i5[2], strings: t5, ctor: "." === i5[1] ? M$1 : "?" === i5[1] ? k$1 : "@" === i5[1] ? H$1 : S2 });
              } else
                c3.push({ type: 6, index: h3 });
            }
          for (const i4 of t4)
            l4.removeAttribute(i4);
        }
        if ($$1.test(l4.tagName)) {
          const t4 = l4.textContent.split(o3), i4 = t4.length - 1;
          if (i4 > 0) {
            l4.textContent = s3 ? s3.emptyScript : "";
            for (let s5 = 0; s5 < i4; s5++)
              l4.append(t4[s5], r3()), A$1.nextNode(), c3.push({ type: 2, index: ++h3 });
            l4.append(t4[i4], r3());
          }
        }
      } else if (8 === l4.nodeType)
        if (l4.data === n3)
          c3.push({ type: 2, index: h3 });
        else {
          let t4 = -1;
          for (; -1 !== (t4 = l4.data.indexOf(o3, t4 + 1)); )
            c3.push({ type: 7, index: h3 }), t4 += o3.length - 1;
        }
      h3++;
    }
  }
  static createElement(t3, i3) {
    const s5 = h2.createElement("template");
    return s5.innerHTML = t3, s5;
  }
};
function P$1(t3, i3, s5 = t3, e4) {
  var o5, n5, l4, h3;
  if (i3 === x$1)
    return i3;
  let r4 = void 0 !== e4 ? null === (o5 = s5._$Co) || void 0 === o5 ? void 0 : o5[e4] : s5._$Cl;
  const u2 = d2(i3) ? void 0 : i3._$litDirective$;
  return (null == r4 ? void 0 : r4.constructor) !== u2 && (null === (n5 = null == r4 ? void 0 : r4._$AO) || void 0 === n5 || n5.call(r4, false), void 0 === u2 ? r4 = void 0 : (r4 = new u2(t3), r4._$AT(t3, s5, e4)), void 0 !== e4 ? (null !== (l4 = (h3 = s5)._$Co) && void 0 !== l4 ? l4 : h3._$Co = [])[e4] = r4 : s5._$Cl = r4), void 0 !== r4 && (i3 = P$1(t3, r4._$AS(t3, i3.values), r4, e4)), i3;
}
var V$1 = class V {
  constructor(t3, i3) {
    this.u = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t3) {
    var i3;
    const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = (null !== (i3 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i3 ? i3 : h2).importNode(s5, true);
    A$1.currentNode = o5;
    let n5 = A$1.nextNode(), l4 = 0, r4 = 0, d3 = e4[0];
    for (; void 0 !== d3; ) {
      if (l4 === d3.index) {
        let i4;
        2 === d3.type ? i4 = new N$1(n5, n5.nextSibling, this, t3) : 1 === d3.type ? i4 = new d3.ctor(n5, d3.name, d3.strings, this, t3) : 6 === d3.type && (i4 = new I$1(n5, this, t3)), this.u.push(i4), d3 = e4[++r4];
      }
      l4 !== (null == d3 ? void 0 : d3.index) && (n5 = A$1.nextNode(), l4++);
    }
    return o5;
  }
  p(t3) {
    let i3 = 0;
    for (const s5 of this.u)
      void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
  }
};
var N$1 = class N {
  constructor(t3, i3, s5, e4) {
    var o5;
    this.type = 2, this._$AH = b$1, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e4, this._$Cm = null === (o5 = null == e4 ? void 0 : e4.isConnected) || void 0 === o5 || o5;
  }
  get _$AU() {
    var t3, i3;
    return null !== (i3 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i3 ? i3 : this._$Cm;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === t3.nodeType && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = P$1(this, t3, i3), d2(t3) ? t3 === b$1 || null == t3 || "" === t3 ? (this._$AH !== b$1 && this._$AR(), this._$AH = b$1) : t3 !== this._$AH && t3 !== x$1 && this.g(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : c2(t3) ? this.k(t3) : this.g(t3);
  }
  O(t3, i3 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i3);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  g(t3) {
    this._$AH !== b$1 && d2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(h2.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    var i3;
    const { values: s5, _$litType$: e4 } = t3, o5 = "number" == typeof e4 ? this._$AC(t3) : (void 0 === e4.el && (e4.el = C$1.createElement(e4.h, this.options)), e4);
    if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o5)
      this._$AH.p(s5);
    else {
      const t4 = new V$1(o5, this), i4 = t4.v(this.options);
      t4.p(s5), this.T(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = T$1.get(t3.strings);
    return void 0 === i3 && T$1.set(t3.strings, i3 = new C$1(t3)), i3;
  }
  k(t3) {
    u$3(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s5, e4 = 0;
    for (const o5 of t3)
      e4 === i3.length ? i3.push(s5 = new N$1(this.O(r3()), this.O(r3()), this, this.options)) : s5 = i3[e4], s5._$AI(o5), e4++;
    e4 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e4), i3.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s5;
    for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    void 0 === this._$AM && (this._$Cm = t3, null === (i3 = this._$AP) || void 0 === i3 || i3.call(this, t3));
  }
};
var S2 = class {
  constructor(t3, i3, s5, e4, o5) {
    this.type = 1, this._$AH = b$1, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = o5, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = b$1;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s5, e4) {
    const o5 = this.strings;
    let n5 = false;
    if (void 0 === o5)
      t3 = P$1(this, t3, i3, 0), n5 = !d2(t3) || t3 !== this._$AH && t3 !== x$1, n5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l4, h3;
      for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
        h3 = P$1(this, e5[s5 + l4], i3, l4), h3 === x$1 && (h3 = this._$AH[l4]), n5 || (n5 = !d2(h3) || h3 !== this._$AH[l4]), h3 === b$1 ? t3 = b$1 : t3 !== b$1 && (t3 += (null != h3 ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
    }
    n5 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === b$1 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
  }
};
var M$1 = class M extends S2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === b$1 ? void 0 : t3;
  }
};
var R$1 = s3 ? s3.emptyScript : "";
var k$1 = class k extends S2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    t3 && t3 !== b$1 ? this.element.setAttribute(this.name, R$1) : this.element.removeAttribute(this.name);
  }
};
var H$1 = class H extends S2 {
  constructor(t3, i3, s5, e4, o5) {
    super(t3, i3, s5, e4, o5), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s5;
    if ((t3 = null !== (s5 = P$1(this, t3, i3, 0)) && void 0 !== s5 ? s5 : b$1) === x$1)
      return;
    const e4 = this._$AH, o5 = t3 === b$1 && e4 !== b$1 || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== b$1 && (e4 === b$1 || o5);
    o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s5;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i3 = this.options) || void 0 === i3 ? void 0 : i3.host) && void 0 !== s5 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var I$1 = class I {
  constructor(t3, i3, s5) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    P$1(this, t3);
  }
};
var z$1 = i2$2.litHtmlPolyfillSupport;
null == z$1 || z$1(C$1, N$1), (null !== (t2 = i2$2.litHtmlVersions) && void 0 !== t2 ? t2 : i2$2.litHtmlVersions = []).push("2.4.0");
var Z$1 = (t3, i3, s5) => {
  var e4, o5;
  const n5 = null !== (e4 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e4 ? e4 : i3;
  let l4 = n5._$litPart$;
  if (void 0 === l4) {
    const t4 = null !== (o5 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o5 ? o5 : null;
    n5._$litPart$ = l4 = new N$1(i3.insertBefore(r3(), t4), t4, void 0, null != s5 ? s5 : {});
  }
  return l4._$AI(t3), l4;
};

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends d$2 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e4;
    const i3 = super.createRenderRoot();
    return null !== (t3 = (e4 = this.renderOptions).renderBefore) && void 0 !== t3 || (e4.renderBefore = i3.firstChild), i3;
  }
  update(t3) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = Z$1(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), null === (t3 = this._$Dt) || void 0 === t3 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), null === (t3 = this._$Dt) || void 0 === t3 || t3.setConnected(false);
  }
  render() {
    return x$1;
  }
};
s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s4 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/styles/component.styles.ts
var component_styles_default = i$6`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

// src/components/button/button.styles.ts
var button_styles_default = i$6`
  ${component_styles_default}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(.sl-button-group__button:not(.sl-button-group__button--first, .sl-button-group__button--radio, [variant='default']):not(:hover))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`;

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/internal/form.ts
var formCollections = /* @__PURE__ */ new WeakMap();
var userInteractedControls = /* @__PURE__ */ new WeakMap();
var reportValidityOverloads = /* @__PURE__ */ new WeakMap();
var FormSubmitController = class {
  constructor(host, options) {
    (this.host = host).addController(this);
    this.options = __spreadValues({
      form: (input) => input.closest("form"),
      name: (input) => input.name,
      value: (input) => input.value,
      defaultValue: (input) => input.defaultValue,
      disabled: (input) => {
        var _a;
        return (_a = input.disabled) != null ? _a : false;
      },
      reportValidity: (input) => typeof input.reportValidity === "function" ? input.reportValidity() : true,
      setValue: (input, value) => input.value = value
    }, options);
    this.handleFormData = this.handleFormData.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
    this.reportFormValidity = this.reportFormValidity.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }
  hostConnected() {
    this.form = this.options.form(this.host);
    if (this.form) {
      if (formCollections.has(this.form)) {
        formCollections.get(this.form).add(this.host);
      } else {
        formCollections.set(this.form, /* @__PURE__ */ new Set([this.host]));
      }
      this.form.addEventListener("formdata", this.handleFormData);
      this.form.addEventListener("submit", this.handleFormSubmit);
      this.form.addEventListener("reset", this.handleFormReset);
      if (!reportValidityOverloads.has(this.form)) {
        reportValidityOverloads.set(this.form, this.form.reportValidity);
        this.form.reportValidity = () => this.reportFormValidity();
      }
    }
    this.host.addEventListener("sl-input", this.handleUserInput);
  }
  hostDisconnected() {
    var _a;
    if (this.form) {
      (_a = formCollections.get(this.form)) == null ? void 0 : _a.delete(this.host);
      this.form.removeEventListener("formdata", this.handleFormData);
      this.form.removeEventListener("submit", this.handleFormSubmit);
      this.form.removeEventListener("reset", this.handleFormReset);
      if (reportValidityOverloads.has(this.form)) {
        this.form.reportValidity = reportValidityOverloads.get(this.form);
        reportValidityOverloads.delete(this.form);
      }
      this.form = void 0;
    }
    this.host.removeEventListener("sl-input", this.handleUserInput);
  }
  hostUpdated() {
    var _a;
    const host = this.host;
    const hasInteracted = Boolean(userInteractedControls.get(host));
    const invalid = Boolean(host.invalid);
    const required = Boolean(host.required);
    if ((_a = this.form) == null ? void 0 : _a.noValidate) {
      host.removeAttribute("data-required");
      host.removeAttribute("data-optional");
      host.removeAttribute("data-invalid");
      host.removeAttribute("data-valid");
      host.removeAttribute("data-user-invalid");
      host.removeAttribute("data-user-valid");
    } else {
      host.toggleAttribute("data-required", required);
      host.toggleAttribute("data-optional", !required);
      host.toggleAttribute("data-invalid", invalid);
      host.toggleAttribute("data-valid", !invalid);
      host.toggleAttribute("data-user-invalid", invalid && hasInteracted);
      host.toggleAttribute("data-user-valid", !invalid && hasInteracted);
    }
  }
  handleFormData(event) {
    const disabled = this.options.disabled(this.host);
    const name = this.options.name(this.host);
    const value = this.options.value(this.host);
    const isButton = this.host.tagName.toLowerCase() === "sl-button";
    if (!disabled && !isButton && typeof name === "string" && typeof value !== "undefined") {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          event.formData.append(name, val.toString());
        });
      } else {
        event.formData.append(name, value.toString());
      }
    }
  }
  handleFormSubmit(event) {
    var _a;
    const disabled = this.options.disabled(this.host);
    const reportValidity = this.options.reportValidity;
    if (this.form && !this.form.noValidate) {
      (_a = formCollections.get(this.form)) == null ? void 0 : _a.forEach((control) => {
        this.setUserInteracted(control, true);
      });
    }
    if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  handleFormReset() {
    this.options.setValue(this.host, this.options.defaultValue(this.host));
    this.setUserInteracted(this.host, false);
  }
  async handleUserInput() {
    await this.host.updateComplete;
    this.setUserInteracted(this.host, true);
  }
  reportFormValidity() {
    if (this.form && !this.form.noValidate) {
      const elements = this.form.querySelectorAll("*");
      for (const element of elements) {
        if (typeof element.reportValidity === "function") {
          if (!element.reportValidity()) {
            return false;
          }
        }
      }
    }
    return true;
  }
  setUserInteracted(el, hasInteracted) {
    userInteractedControls.set(el, hasInteracted);
    el.requestUpdate();
  }
  doAction(type, invoker) {
    if (this.form) {
      const button = document.createElement("button");
      button.type = type;
      button.style.position = "absolute";
      button.style.width = "0";
      button.style.height = "0";
      button.style.clipPath = "inset(50%)";
      button.style.overflow = "hidden";
      button.style.whiteSpace = "nowrap";
      if (invoker) {
        button.name = invoker.name;
        button.value = invoker.value;
        ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((attr) => {
          if (invoker.hasAttribute(attr)) {
            button.setAttribute(attr, invoker.getAttribute(attr));
          }
        });
      }
      this.form.append(button);
      button.click();
      button.remove();
    }
  }
  reset(invoker) {
    this.doAction("reset", invoker);
  }
  submit(invoker) {
    this.doAction("submit", invoker);
  }
};

// node_modules/lit-html/static.js
var e$8 = Symbol.for("");
var l$5 = (t) => {
  if ((null == t ? void 0 : t.r) === e$8)
    return null == t ? void 0 : t._$litStatic$;
};
var i$5 = (t, ...r) => ({ _$litStatic$: r.reduce((r2, e2, l2) => r2 + ((t2) => {
  if (void 0 !== t2._$litStatic$)
    return t2._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t2}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e2) + t[l2 + 1], t[0]), r: e$8 });
var s$6 = /* @__PURE__ */ new Map();
var a$2 = (t) => (r, ...e2) => {
  const o = e2.length;
  let i2, a2;
  const n2 = [], u2 = [];
  let c, $ = 0, f = false;
  for (; $ < o; ) {
    for (c = r[$]; $ < o && void 0 !== (a2 = e2[$], i2 = l$5(a2)); )
      c += i2 + r[++$], f = true;
    u2.push(a2), n2.push(c), $++;
  }
  if ($ === o && n2.push(r[o]), f) {
    const t2 = n2.join("$$lit$$");
    void 0 === (r = s$6.get(t2)) && (n2.raw = n2, s$6.set(t2, r = n2)), e2 = u2;
  }
  return t(r, ...e2);
};
var n$6 = a$2(y$1);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/@shoelace-style/localize/dist/index.js
var connectedElements = /* @__PURE__ */ new Set();
var documentElementObserver = new MutationObserver(update);
var translations = /* @__PURE__ */ new Map();
var documentDirection = document.documentElement.dir || "ltr";
var documentLanguage = document.documentElement.lang || navigator.language;
var fallback;
documentElementObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["dir", "lang"]
});
function registerTranslation(...translation2) {
  translation2.map((t) => {
    const code = t.$code.toLowerCase();
    if (translations.has(code)) {
      translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t));
    } else {
      translations.set(code, t);
    }
    if (!fallback) {
      fallback = t;
    }
  });
  update();
}
function update() {
  documentDirection = document.documentElement.dir || "ltr";
  documentLanguage = document.documentElement.lang || navigator.language;
  [...connectedElements.keys()].map((el) => {
    if (typeof el.requestUpdate === "function") {
      el.requestUpdate();
    }
  });
}
var LocalizeController$1 = class LocalizeController {
  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    connectedElements.add(this.host);
  }
  hostDisconnected() {
    connectedElements.delete(this.host);
  }
  dir() {
    return `${this.host.dir || documentDirection}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || documentLanguage}`.toLowerCase();
  }
  term(key, ...args) {
    var _a, _b;
    const locale = new Intl.Locale(this.lang());
    const language = locale === null || locale === void 0 ? void 0 : locale.language.toLowerCase();
    const region = (_b = (_a = locale === null || locale === void 0 ? void 0 : locale.region) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "";
    const primary = translations.get(`${language}-${region}`);
    const secondary = translations.get(language);
    let term;
    if (primary && primary[key]) {
      term = primary[key];
    } else if (secondary && secondary[key]) {
      term = secondary[key];
    } else if (fallback && fallback[key]) {
      term = fallback[key];
    } else {
      console.error(`No translation found for: ${String(key)}`);
      return key;
    }
    if (typeof term === "function") {
      return term(...args);
    }
    return term;
  }
  date(dateToFormat, options) {
    dateToFormat = new Date(dateToFormat);
    return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
  }
  number(numberToFormat, options) {
    numberToFormat = Number(numberToFormat);
    return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
  }
  relativeTime(value, unit, options) {
    return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
  }
};

// src/utilities/localize.ts
var LocalizeController2 = class extends LocalizeController$1 {
};

// src/translations/en.ts
var translation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  clearEntry: "Clear entry",
  close: "Close",
  copy: "Copy",
  currentValue: "Current value",
  hidePassword: "Hide password",
  loading: "Loading",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  toggleColorFormat: "Toggle color format"
};
registerTranslation(translation);

// src/internal/slot.ts
var HasSlotController = class {
  constructor(host, ...slotNames) {
    this.slotNames = [];
    (this.host = host).addController(this);
    this.slotNames = slotNames;
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((node) => {
      if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
        return true;
      }
      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node;
        const tagName = el.tagName.toLowerCase();
        if (tagName === "sl-visually-hidden") {
          return false;
        }
        if (!el.hasAttribute("slot")) {
          return true;
        }
      }
      return false;
    });
  }
  hasNamedSlot(name) {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
  }
  test(slotName) {
    return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  handleSlotChange(event) {
    const slot = event.target;
    if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
      this.host.requestUpdate();
    }
  }
};

// node_modules/lit-html/directives/if-defined.js
var l$4 = (l2) => null != l2 ? l2 : b$1;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/lit-html/directive.js
var t$4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e$7 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
var i$4 = class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/lit-html/directives/class-map.js
var o$6 = e$7(class extends i$4 {
  constructor(t2) {
    var i2;
    if (super(t2), t2.type !== t$4.ATTRIBUTE || "class" !== t2.name || (null === (i2 = t2.strings) || void 0 === i2 ? void 0 : i2.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((i2) => t2[i2]).join(" ") + " ";
  }
  update(i2, [s]) {
    var r, o2;
    if (void 0 === this.nt) {
      this.nt = /* @__PURE__ */ new Set(), void 0 !== i2.strings && (this.st = new Set(i2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in s)
        s[t2] && !(null === (r = this.st) || void 0 === r ? void 0 : r.has(t2)) && this.nt.add(t2);
      return this.render(s);
    }
    const e2 = i2.element.classList;
    this.nt.forEach((t2) => {
      t2 in s || (e2.remove(t2), this.nt.delete(t2));
    });
    for (const t2 in s) {
      const i3 = !!s[t2];
      i3 === this.nt.has(t2) || (null === (o2 = this.st) || void 0 === o2 ? void 0 : o2.has(t2)) || (i3 ? (e2.add(t2), this.nt.add(t2)) : (e2.remove(t2), this.nt.delete(t2)));
    }
    return x$1;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/internal/watch.ts
function watch(propName, options) {
  const resolvedOptions = __spreadValues({
    waitUntilFirstUpdate: false
  }, options);
  return (proto, decoratedFnName) => {
    const { update } = proto;
    if (propName in proto) {
      const propNameKey = propName;
      proto.update = function(changedProps) {
        if (changedProps.has(propNameKey)) {
          const oldValue = changedProps.get(propNameKey);
          const newValue = this[propNameKey];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
        update.call(this, changedProps);
      };
    }
  };
}

// node_modules/@lit/reactive-element/decorators/custom-element.js
var e$6 = (e5) => (n2) => "function" == typeof n2 ? ((e6, n3) => (customElements.define(e6, n3), n3))(e5, n2) : ((e6, n3) => {
  const { kind: t2, elements: s2 } = n3;
  return { kind: t2, elements: s2, finisher(n4) {
    customElements.define(e6, n4);
  } };
})(e5, n2);

// node_modules/@lit/reactive-element/decorators/property.js
var i$3 = (i3, e5) => "method" === e5.kind && e5.descriptor && !("value" in e5.descriptor) ? __spreadProps(__spreadValues({}, e5), { finisher(n2) {
  n2.createProperty(e5.key, i3);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e5.key, initializer() {
  "function" == typeof e5.initializer && (this[e5.key] = e5.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e5.key, i3);
} };
function e2$1(e5) {
  return (n2, t2) => void 0 !== t2 ? ((i3, e6, n3) => {
    e6.constructor.createProperty(n3, i3);
  })(e5, n2, t2) : i$3(e5, n2);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t$3(t2) {
  return e2$1(__spreadProps(__spreadValues({}, t2), { state: true }));
}

// node_modules/@lit/reactive-element/decorators/base.js
var o$5 = ({ finisher: e5, descriptor: t2 }) => (o2, n2) => {
  var r;
  if (void 0 === n2) {
    const n3 = null !== (r = o2.originalKey) && void 0 !== r ? r : o2.key, i3 = null != t2 ? { kind: "method", placement: "prototype", key: n3, descriptor: t2(o2.key) } : __spreadProps(__spreadValues({}, o2), { key: n3 });
    return null != e5 && (i3.finisher = function(t3) {
      e5(t3, n3);
    }), i3;
  }
  {
    const r2 = o2.constructor;
    void 0 !== t2 && Object.defineProperty(o2, n2, t2(n2)), null == e5 || e5(r2, n2);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function i2$1(i3, n2) {
  return o$5({ descriptor: (o2) => {
    const t2 = { get() {
      var o3, n3;
      return null !== (n3 = null === (o3 = this.renderRoot) || void 0 === o3 ? void 0 : o3.querySelector(i3)) && void 0 !== n3 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = "symbol" == typeof o2 ? Symbol() : "__" + o2;
      t2.get = function() {
        var o3, t3;
        return void 0 === this[n3] && (this[n3] = null !== (t3 = null === (o3 = this.renderRoot) || void 0 === o3 ? void 0 : o3.querySelector(i3)) && void 0 !== t3 ? t3 : null), this[n3];
      };
    }
    return t2;
  } });
}

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n$5;
null != (null === (n$5 = window.HTMLSlotElement) || void 0 === n$5 ? void 0 : n$5.prototype.assignedElements) ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);

// src/internal/shoelace-element.ts
var ShoelaceElement = class extends s4 {
  emit(name, options) {
    const event = new CustomEvent(name, __spreadValues({
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {}
    }, options));
    this.dispatchEvent(event);
    return event;
  }
};
__decorateClass([
  e2$1()
], ShoelaceElement.prototype, "dir", 2);
__decorateClass([
  e2$1()
], ShoelaceElement.prototype, "lang", 2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/components/button/button.ts
var SlButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      form: (input) => {
        if (input.hasAttribute("form")) {
          const doc = input.getRootNode();
          const formId = input.getAttribute("form");
          return doc.getElementById(formId);
        }
        return input.closest("form");
      }
    });
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.localize = new LocalizeController2(this);
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.variant = "default";
    this.size = "medium";
    this.caret = false;
    this.disabled = false;
    this.loading = false;
    this.outline = false;
    this.pill = false;
    this.circle = false;
    this.type = "button";
    this.name = "";
    this.value = "";
    this.href = "";
  }
  firstUpdated() {
    if (this.isButton()) {
      this.invalid = !this.button.checkValidity();
    }
  }
  click() {
    this.button.click();
  }
  focus(options) {
    this.button.focus(options);
  }
  blur() {
    this.button.blur();
  }
  checkValidity() {
    if (this.isButton()) {
      return this.button.checkValidity();
    }
    return true;
  }
  reportValidity() {
    if (this.isButton()) {
      return this.button.reportValidity();
    }
    return true;
  }
  setCustomValidity(message) {
    if (this.isButton()) {
      this.button.setCustomValidity(message);
      this.invalid = !this.button.checkValidity();
    }
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.type === "submit") {
      this.formSubmitController.submit(this);
    }
    if (this.type === "reset") {
      this.formSubmitController.reset(this);
    }
  }
  handleDisabledChange() {
    if (this.isButton()) {
      this.button.disabled = this.disabled;
      this.invalid = !this.button.checkValidity();
    }
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i$5`a` : i$5`button`;
    return n$6`
      <${tag}
        part="base"
        class=${o$6({
      button: true,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--text": this.variant === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--rtl": this.localize.dir() === "rtl",
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
        ?disabled=${l$4(isLink ? void 0 : this.disabled)}
        type=${l$4(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${l$4(isLink ? void 0 : this.name)}
        value=${l$4(isLink ? void 0 : this.value)}
        href=${l$4(isLink ? this.href : void 0)}
        target=${l$4(isLink ? this.target : void 0)}
        download=${l$4(isLink ? this.download : void 0)}
        rel=${l$4(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${l$4(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? n$6` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? n$6`<sl-spinner></sl-spinner>` : ""}
      </${tag}>
    `;
  }
};
SlButton.styles = button_styles_default;
__decorateClass([
  i2$1(".button")
], SlButton.prototype, "button", 2);
__decorateClass([
  t$3()
], SlButton.prototype, "hasFocus", 2);
__decorateClass([
  t$3()
], SlButton.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "title", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlButton.prototype, "variant", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlButton.prototype, "size", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "caret", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "disabled", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "loading", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "outline", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "pill", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "circle", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "type", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "value", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "href", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "target", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "download", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "form", 2);
__decorateClass([
  e2$1({ attribute: "formaction" })
], SlButton.prototype, "formAction", 2);
__decorateClass([
  e2$1({ attribute: "formenctype" })
], SlButton.prototype, "formEnctype", 2);
__decorateClass([
  e2$1({ attribute: "formmethod" })
], SlButton.prototype, "formMethod", 2);
__decorateClass([
  e2$1({ attribute: "formnovalidate", type: Boolean })
], SlButton.prototype, "formNoValidate", 2);
__decorateClass([
  e2$1({ attribute: "formtarget" })
], SlButton.prototype, "formTarget", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlButton.prototype, "handleDisabledChange", 1);
SlButton = __decorateClass([
  e$6("sl-button")
], SlButton);

// src/components/spinner/spinner.styles.ts
var spinner_styles_default = i$6`
  ${component_styles_default}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      rotate: 0deg;
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      rotate: 450deg;
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      rotate: 1080deg;
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`;

// src/components/spinner/spinner.ts
var SlSpinner = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
  }
  render() {
    return y$1`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
SlSpinner.styles = spinner_styles_default;
SlSpinner = __decorateClass([
  e$6("sl-spinner")
], SlSpinner);

// src/utilities/base-path.ts
var basePath = "";
function setBasePath(path) {
  basePath = path;
}
function getBasePath() {
  if (!basePath) {
    const scripts = [...document.getElementsByTagName("script")];
    const configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
    if (configScript) {
      setBasePath(configScript.getAttribute("data-shoelace"));
    } else {
      const fallbackScript = scripts.find((s) => /shoelace(\.min)?\.js($|\?)/.test(s.src));
      let path = "";
      if (fallbackScript) {
        path = fallbackScript.getAttribute("src");
      }
      setBasePath(path.split("/").slice(0, -1).join("/"));
    }
  }
  return basePath.replace(/\/$/, "");
}

// src/components/icon/library.default.ts
var library = {
  name: "default",
  resolver: (name) => `${getBasePath()}/assets/icons/${name}.svg`
};
var library_default_default = library;

// src/components/icon/library.system.ts
var icons = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
  indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
};
var systemLibrary = {
  name: "system",
  resolver: (name) => {
    if (name in icons) {
      return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
    }
    return "";
  }
};
var library_system_default = systemLibrary;

// src/components/icon/library.ts
var registry = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}

// src/components/include/request.ts
var includeFiles = /* @__PURE__ */ new Map();
function requestInclude(src, mode = "cors") {
  if (includeFiles.has(src)) {
    return includeFiles.get(src);
  }
  const fileDataPromise = fetch(src, { mode }).then(async (response) => {
    return {
      ok: response.ok,
      status: response.status,
      html: await response.text()
    };
  });
  includeFiles.set(src, fileDataPromise);
  return fileDataPromise;
}

// src/components/icon/request.ts
var iconFiles = /* @__PURE__ */ new Map();
async function requestIcon(url) {
  if (iconFiles.has(url)) {
    return iconFiles.get(url);
  }
  const fileData = await requestInclude(url);
  const iconFileData = {
    ok: fileData.ok,
    status: fileData.status,
    svg: null
  };
  if (fileData.ok) {
    const div = document.createElement("div");
    div.innerHTML = fileData.html;
    const svg = div.firstElementChild;
    iconFileData.svg = (svg == null ? void 0 : svg.tagName.toLowerCase()) === "svg" ? svg.outerHTML : "";
  }
  iconFiles.set(url, iconFileData);
  return iconFileData;
}

// src/components/icon/icon.styles.ts
var icon_styles_default = i$6`
  ${component_styles_default}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

// node_modules/lit-html/directives/unsafe-html.js
var e4 = class extends i$4 {
  constructor(i2) {
    if (super(i2), this.it = b$1, i2.type !== t$4.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r) {
    if (r === b$1 || null == r)
      return this._t = void 0, this.it = r;
    if (r === x$1)
      return r;
    if ("string" != typeof r)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r === this.it)
      return this._t;
    this.it = r;
    const s = [r];
    return s.raw = s, this._t = { _$litType$: this.constructor.resultType, strings: s, values: [] };
  }
};
e4.directiveName = "unsafeHTML", e4.resultType = 1;
var o$4 = e$7(e4);

// node_modules/lit-html/directives/unsafe-svg.js
var t3 = class extends e4 {
};
t3.directiveName = "unsafeSVG", t3.resultType = 2;
var o2 = e$7(t3);

// src/components/icon/icon.ts
var parser;
var SlIcon = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.svg = "";
    this.label = "";
    this.library = "default";
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated() {
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getUrl() {
    const library = getIconLibrary(this.library);
    if (this.name && library) {
      return library.resolver(this.name);
    }
    return this.src;
  }
  redraw() {
    this.setIcon();
  }
  handleLabelChange() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    if (hasLabel) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
      this.removeAttribute("aria-hidden");
    } else {
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
      this.setAttribute("aria-hidden", "true");
    }
  }
  async setIcon() {
    var _a;
    const library = getIconLibrary(this.library);
    const url = this.getUrl();
    if (!parser) {
      parser = new DOMParser();
    }
    if (url) {
      try {
        const file = await requestIcon(url);
        if (url !== this.getUrl()) {
          return;
        } else if (file.ok) {
          const doc = parser.parseFromString(file.svg, "text/html");
          const svgEl = doc.body.querySelector("svg");
          if (svgEl !== null) {
            (_a = library == null ? void 0 : library.mutator) == null ? void 0 : _a.call(library, svgEl);
            this.svg = svgEl.outerHTML;
            this.emit("sl-load");
          } else {
            this.svg = "";
            this.emit("sl-error");
          }
        } else {
          this.svg = "";
          this.emit("sl-error");
        }
      } catch (e5) {
        this.emit("sl-error");
      }
    } else if (this.svg.length > 0) {
      this.svg = "";
    }
  }
  handleChange() {
    this.setIcon();
  }
  render() {
    return y$1` ${o2(this.svg)} `;
  }
};
SlIcon.styles = icon_styles_default;
__decorateClass([
  t$3()
], SlIcon.prototype, "svg", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlIcon.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlIcon.prototype, "src", 2);
__decorateClass([
  e2$1()
], SlIcon.prototype, "label", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlIcon.prototype, "library", 2);
__decorateClass([
  watch("label")
], SlIcon.prototype, "handleLabelChange", 1);
__decorateClass([
  watch("name"),
  watch("src"),
  watch("library")
], SlIcon.prototype, "setIcon", 1);
SlIcon = __decorateClass([
  e$6("sl-icon")
], SlIcon);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/styles/form-control.styles.ts
var form_control_styles_default = i$6`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control_label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;

// src/components/input/input.styles.ts
var input_styles_default = i$6`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix::slotted(sl-icon),
  .input__suffix::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide Firefox's clear button on date and time inputs */
  .input--is-firefox input[type='date'],
  .input--is-firefox input[type='time'] {
    clip-path: inset(0 2em 0 0);
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;

var e2 = (o) => void 0 === o.strings;
var f$2 = {};
var s$5 = (o, l3 = f$2) => o._$AH = l3;

// node_modules/lit-html/directives/live.js
var l2 = e$7(class extends i$4 {
  constructor(r) {
    if (super(r), r.type !== t$4.PROPERTY && r.type !== t$4.ATTRIBUTE && r.type !== t$4.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!e2(r))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(r) {
    return r;
  }
  update(i2, [t2]) {
    if (t2 === x$1 || t2 === b$1)
      return t2;
    const o = i2.element, l3 = i2.name;
    if (i2.type === t$4.PROPERTY) {
      if (t2 === o[l3])
        return x$1;
    } else if (i2.type === t$4.BOOLEAN_ATTRIBUTE) {
      if (!!t2 === o.hasAttribute(l3))
        return x$1;
    } else if (i2.type === t$4.ATTRIBUTE && o.getAttribute(l3) === t2 + "")
      return x$1;
    return s$5(i2), t2;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/internal/default-value.ts
var defaultValue = (propertyName = "value") => (proto, key) => {
  const ctor = proto.constructor;
  const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
  ctor.prototype.attributeChangedCallback = function(name, old, value) {
    var _a;
    const options = ctor.getPropertyOptions(propertyName);
    const attributeName = typeof options.attribute === "string" ? options.attribute : propertyName;
    if (name === attributeName) {
      const converter = options.converter || n2;
      const fromAttribute = typeof converter === "function" ? converter : (_a = converter == null ? void 0 : converter.fromAttribute) != null ? _a : n2.fromAttribute;
      const newValue = fromAttribute(value, options.type);
      if (this[propertyName] !== newValue) {
        this[key] = newValue;
      }
    }
    attributeChangedCallback.call(this, name, old, value);
  };
};

// src/components/input/input.ts
var _a;
var isChromium = (_a = navigator.userAgentData) == null ? void 0 : _a.brands.some((b) => b.brand.includes("Chromium"));
var isFirefox = isChromium ? false : navigator.userAgent.includes("Firefox");
var SlInput = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this);
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.localize = new LocalizeController2(this);
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.type = "text";
    this.size = "medium";
    this.name = "";
    this.value = "";
    this.defaultValue = "";
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.helpText = "";
    this.clearable = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.noSpinButtons = false;
    this.placeholder = "";
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.spellcheck = true;
  }
  get valueAsDate() {
    var _a2, _b;
    return (_b = (_a2 = this.input) == null ? void 0 : _a2.valueAsDate) != null ? _b : null;
  }
  set valueAsDate(newValue) {
    const input = document.createElement("input");
    input.type = "date";
    input.valueAsDate = newValue;
    this.value = input.value;
  }
  get valueAsNumber() {
    var _a2, _b;
    return (_b = (_a2 = this.input) == null ? void 0 : _a2.valueAsNumber) != null ? _b : parseFloat(this.value);
  }
  set valueAsNumber(newValue) {
    const input = document.createElement("input");
    input.type = "number";
    input.valueAsNumber = newValue;
    this.value = input.value;
  }
  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  select() {
    this.input.select();
  }
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  setRangeText(replacement, start, end, selectMode) {
    this.input.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  checkValidity() {
    return this.input.checkValidity();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.emit("sl-change");
  }
  handleClearClick(event) {
    this.value = "";
    this.emit("sl-clear");
    this.emit("sl-input");
    this.emit("sl-change");
    this.input.focus();
    event.stopPropagation();
  }
  handleDisabledChange() {
    this.input.disabled = this.disabled;
    this.invalid = !this.input.checkValidity();
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.invalid = !this.input.checkValidity();
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.emit("sl-input");
  }
  handleInvalid() {
    this.invalid = true;
  }
  handleKeyDown(event) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      setTimeout(() => {
        if (!event.defaultPrevented && !event.isComposing) {
          this.formSubmitController.submit();
        }
      });
    }
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  handleValueChange() {
    this.input.value = this.value;
    this.invalid = !this.input.checkValidity();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && !this.readonly && (typeof this.value === "number" || this.value.length > 0);
    return y$1`
      <div
        part="form-control"
        class=${o$6({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${o$6({
      input: true,
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      "input--pill": this.pill,
      "input--standard": !this.filled,
      "input--filled": this.filled,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": !this.value,
      "input--invalid": this.invalid,
      "input--no-spin-buttons": this.noSpinButtons,
      "input--is-firefox": isFirefox
    })}
          >
            <slot name="prefix" part="prefix" class="input__prefix"></slot>
            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${l$4(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${l$4(this.placeholder)}
              minlength=${l$4(this.minlength)}
              maxlength=${l$4(this.maxlength)}
              min=${l$4(this.min)}
              max=${l$4(this.max)}
              step=${l$4(this.step)}
              .value=${l2(this.value)}
              autocapitalize=${l$4(this.type === "password" ? "off" : this.autocapitalize)}
              autocomplete=${l$4(this.type === "password" ? "off" : this.autocomplete)}
              autocorrect=${l$4(this.type === "password" ? "off" : this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${l$4(this.pattern)}
              enterkeyhint=${l$4(this.enterkeyhint)}
              inputmode=${l$4(this.inputmode)}
              aria-describedby="help-text"
              aria-invalid=${this.invalid ? "true" : "false"}
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${hasClearIcon ? y$1`
                    <button
                      part="clear-button"
                      class="input__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  ` : ""}
            ${this.passwordToggle && !this.disabled ? y$1`
                    <button
                      part="password-toggle-button"
                      class="input__password-toggle"
                      type="button"
                      aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                      @click=${this.handlePasswordToggle}
                      tabindex="-1"
                    >
                      ${this.passwordVisible ? y$1`
                            <slot name="show-password-icon">
                              <sl-icon name="eye-slash" library="system"></sl-icon>
                            </slot>
                          ` : y$1`
                            <slot name="hide-password-icon">
                              <sl-icon name="eye" library="system"></sl-icon>
                            </slot>
                          `}
                    </button>
                  ` : ""}

            <slot name="suffix" part="suffix" class="input__suffix"></slot>
          </div>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          ${this.helpText}
        </slot>
        </div>
      </div>
    `;
  }
};
SlInput.styles = input_styles_default;
__decorateClass([
  i2$1(".input__control")
], SlInput.prototype, "input", 2);
__decorateClass([
  t$3()
], SlInput.prototype, "hasFocus", 2);
__decorateClass([
  t$3()
], SlInput.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "title", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlInput.prototype, "type", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlInput.prototype, "size", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "value", 2);
__decorateClass([
  defaultValue()
], SlInput.prototype, "defaultValue", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "filled", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "pill", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "label", 2);
__decorateClass([
  e2$1({ attribute: "help-text" })
], SlInput.prototype, "helpText", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlInput.prototype, "clearable", 2);
__decorateClass([
  e2$1({ attribute: "password-toggle", type: Boolean })
], SlInput.prototype, "passwordToggle", 2);
__decorateClass([
  e2$1({ attribute: "password-visible", type: Boolean })
], SlInput.prototype, "passwordVisible", 2);
__decorateClass([
  e2$1({ attribute: "no-spin-buttons", type: Boolean })
], SlInput.prototype, "noSpinButtons", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "placeholder", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "disabled", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "readonly", 2);
__decorateClass([
  e2$1({ type: Number })
], SlInput.prototype, "minlength", 2);
__decorateClass([
  e2$1({ type: Number })
], SlInput.prototype, "maxlength", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "min", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "max", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "step", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "pattern", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "required", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "autocapitalize", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "autocorrect", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "autocomplete", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlInput.prototype, "autofocus", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "enterkeyhint", 2);
__decorateClass([
  e2$1({
    type: Boolean,
    converter: {
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], SlInput.prototype, "spellcheck", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "inputmode", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("step", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleStepChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleValueChange", 1);
SlInput = __decorateClass([
  e$6("sl-input")
], SlInput);

// src/components/rating/rating.styles.ts
var rating_styles_default = i$6`
  ${component_styles_default}

  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbols--indicator {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--symbol-color-active);
    pointer-events: none;
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) scale;
  }

  .rating__symbol--hover {
    scale: 1.2;
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    scale: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    .rating__symbols--indicator {
      color: SelectedItem;
    }
  }
`;

// src/internal/math.ts
function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

// node_modules/lit-html/directives/style-map.js
var i2 = e$7(class extends i$4 {
  constructor(t2) {
    var e2;
    if (super(t2), t2.type !== t$4.ATTRIBUTE || "style" !== t2.name || (null === (e2 = t2.strings) || void 0 === e2 ? void 0 : e2.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r) => {
      const s = t2[r];
      return null == s ? e2 : e2 + `${r = r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(e2, [r]) {
    const { style: s } = e2.element;
    if (void 0 === this.vt) {
      this.vt = /* @__PURE__ */ new Set();
      for (const t2 in r)
        this.vt.add(t2);
      return this.render(r);
    }
    this.vt.forEach((t2) => {
      null == r[t2] && (this.vt.delete(t2), t2.includes("-") ? s.removeProperty(t2) : s[t2] = "");
    });
    for (const t2 in r) {
      const e3 = r[t2];
      null != e3 && (this.vt.add(t2), t2.includes("-") ? s.setProperty(t2, e3) : s[t2] = e3);
    }
    return x$1;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/components/rating/rating.ts
var SlRating = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.hoverValue = 0;
    this.isHovering = false;
    this.label = "";
    this.value = 0;
    this.max = 5;
    this.precision = 1;
    this.readonly = false;
    this.disabled = false;
    this.getSymbol = () => '<sl-icon name="star-fill" library="system"></sl-icon>';
  }
  focus(options) {
    this.rating.focus(options);
  }
  blur() {
    this.rating.blur();
  }
  getValueFromMousePosition(event) {
    return this.getValueFromXCoordinate(event.clientX);
  }
  getValueFromTouchPosition(event) {
    return this.getValueFromXCoordinate(event.touches[0].clientX);
  }
  getValueFromXCoordinate(coordinate) {
    const isRtl = this.localize.dir() === "rtl";
    const { left, right, width } = this.rating.getBoundingClientRect();
    const value = isRtl ? this.roundToPrecision((right - coordinate) / width * this.max, this.precision) : this.roundToPrecision((coordinate - left) / width * this.max, this.precision);
    return clamp(value, 0, this.max);
  }
  handleClick(event) {
    this.setValue(this.getValueFromMousePosition(event));
    this.emit("sl-change");
  }
  setValue(newValue) {
    if (this.disabled || this.readonly) {
      return;
    }
    this.value = newValue === this.value ? 0 : newValue;
    this.isHovering = false;
  }
  handleKeyDown(event) {
    const isLtr = this.localize.dir() === "ltr";
    const isRtl = this.localize.dir() === "rtl";
    const oldValue = this.value;
    if (this.disabled || this.readonly) {
      return;
    }
    if (event.key === "ArrowDown" || isLtr && event.key === "ArrowLeft" || isRtl && event.key === "ArrowRight") {
      const decrement = event.shiftKey ? 1 : this.precision;
      this.value = Math.max(0, this.value - decrement);
      event.preventDefault();
    }
    if (event.key === "ArrowUp" || isLtr && event.key === "ArrowRight" || isRtl && event.key === "ArrowLeft") {
      const increment = event.shiftKey ? 1 : this.precision;
      this.value = Math.min(this.max, this.value + increment);
      event.preventDefault();
    }
    if (event.key === "Home") {
      this.value = 0;
      event.preventDefault();
    }
    if (event.key === "End") {
      this.value = this.max;
      event.preventDefault();
    }
    if (this.value !== oldValue) {
      this.emit("sl-change");
    }
  }
  handleMouseEnter() {
    this.isHovering = true;
  }
  handleMouseMove(event) {
    this.hoverValue = this.getValueFromMousePosition(event);
  }
  handleMouseLeave() {
    this.isHovering = false;
  }
  handleTouchStart(event) {
    this.hoverValue = this.getValueFromTouchPosition(event);
    event.preventDefault();
  }
  handleTouchMove(event) {
    this.isHovering = true;
    this.hoverValue = this.getValueFromTouchPosition(event);
  }
  handleTouchEnd(event) {
    this.isHovering = false;
    this.setValue(this.hoverValue);
    this.emit("sl-change");
    event.preventDefault();
  }
  roundToPrecision(numberToRound, precision = 0.5) {
    const multiplier = 1 / precision;
    return Math.ceil(numberToRound * multiplier) / multiplier;
  }
  render() {
    const isRtl = this.localize.dir() === "rtl";
    const counter = Array.from(Array(this.max).keys());
    let displayValue = 0;
    if (this.disabled || this.readonly) {
      displayValue = this.value;
    } else {
      displayValue = this.isHovering ? this.hoverValue : this.value;
    }
    return y$1`
      <div
        part="base"
        class=${o$6({
      rating: true,
      "rating--readonly": this.readonly,
      "rating--disabled": this.disabled,
      "rating--rtl": isRtl
    })}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-readonly=${this.readonly ? "true" : "false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols rating__symbols--inactive">
          ${counter.map((index) => {
      return y$1`
              <span
                class=${o$6({
        rating__symbol: true,
        "rating__symbol--hover": this.isHovering && Math.ceil(displayValue) === index + 1
      })}
                role="presentation"
                @mouseenter=${this.handleMouseEnter}
              >
                ${o$4(this.getSymbol(index + 1))}
              </span>
            `;
    })}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${counter.map((index) => {
      return y$1`
              <span
                class=${o$6({
        rating__symbol: true,
        "rating__symbol--hover": this.isHovering && Math.ceil(displayValue) === index + 1
      })}
                style=${i2({
        clipPath: displayValue > index + 1 ? "none" : isRtl ? `inset(0 0 0 ${100 - (displayValue - index) / 1 * 100}%)` : `inset(0 ${100 - (displayValue - index) / 1 * 100}% 0 0)`
      })}
                role="presentation"
              >
                ${o$4(this.getSymbol(index + 1))}
              </span>
            `;
    })}
        </span>
      </div>
    `;
  }
};
SlRating.styles = rating_styles_default;
__decorateClass([
  i2$1(".rating")
], SlRating.prototype, "rating", 2);
__decorateClass([
  t$3()
], SlRating.prototype, "hoverValue", 2);
__decorateClass([
  t$3()
], SlRating.prototype, "isHovering", 2);
__decorateClass([
  e2$1()
], SlRating.prototype, "label", 2);
__decorateClass([
  e2$1({ type: Number })
], SlRating.prototype, "value", 2);
__decorateClass([
  e2$1({ type: Number })
], SlRating.prototype, "max", 2);
__decorateClass([
  e2$1({ type: Number })
], SlRating.prototype, "precision", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlRating.prototype, "readonly", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlRating.prototype, "disabled", 2);
__decorateClass([
  e2$1()
], SlRating.prototype, "getSymbol", 2);
SlRating = __decorateClass([
  e$6("sl-rating")
], SlRating);

// src/components/button-group/button-group.styles.ts
var button_group_styles_default = i$6`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;

// src/components/button-group/button-group.ts
var SlButtonGroup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.disableRole = false;
    this.label = "";
  }
  handleFocus(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--focus");
  }
  handleBlur(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--focus");
  }
  handleMouseOver(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--hover");
  }
  handleMouseOut(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--hover");
  }
  handleSlotChange() {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })];
    slottedElements.forEach((el) => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);
      if (button !== null) {
        button.classList.add("sl-button-group__button");
        button.classList.toggle("sl-button-group__button--first", index === 0);
        button.classList.toggle("sl-button-group__button--inner", index > 0 && index < slottedElements.length - 1);
        button.classList.toggle("sl-button-group__button--last", index === slottedElements.length - 1);
        button.classList.toggle("sl-button-group__button--radio", button.tagName.toLowerCase() === "sl-radio-button");
      }
    });
  }
  render() {
    return y$1`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole ? "presentation" : "group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `;
  }
};
SlButtonGroup.styles = button_group_styles_default;
__decorateClass([
  i2$1("slot")
], SlButtonGroup.prototype, "defaultSlot", 2);
__decorateClass([
  t$3()
], SlButtonGroup.prototype, "disableRole", 2);
__decorateClass([
  e2$1()
], SlButtonGroup.prototype, "label", 2);
SlButtonGroup = __decorateClass([
  e$6("sl-button-group")
], SlButtonGroup);
function findButton(el) {
  var _a;
  const selector = "sl-button, sl-radio-button";
  return (_a = el.closest(selector)) != null ? _a : el.querySelector(selector);
}

// src/components/radio-group/radio-group.styles.ts
var radio_group_styles_default = i$6`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .form-control {
    border: none;
    padding: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

// src/components/radio-group/radio-group.ts
var SlRadioGroup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      defaultValue: (control) => control.defaultValue
    });
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.hasButtonGroup = false;
    this.errorMessage = "";
    this.customErrorMessage = "";
    this.defaultValue = "";
    this.invalid = false;
    this.label = "";
    this.helpText = "";
    this.name = "option";
    this.value = "";
    this.required = false;
  }
  handleValueChange() {
    if (this.hasUpdated) {
      this.updateCheckedRadio();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }
  firstUpdated() {
    this.invalid = !this.validity.valid;
  }
  checkValidity() {
    return this.validity.valid;
  }
  setCustomValidity(message = "") {
    this.customErrorMessage = message;
    this.errorMessage = message;
    if (!message) {
      this.invalid = false;
    } else {
      this.invalid = true;
      this.input.setCustomValidity(message);
    }
  }
  get validity() {
    const hasMissingData = !(this.value && this.required || !this.required);
    const hasCustomError = this.customErrorMessage !== "";
    return {
      badInput: false,
      customError: hasCustomError,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: hasMissingData || hasCustomError ? false : true,
      valueMissing: !hasMissingData
    };
  }
  reportValidity() {
    const validity = this.validity;
    this.errorMessage = this.customErrorMessage || validity.valid ? "" : this.input.validationMessage;
    this.invalid = !validity.valid;
    if (!validity.valid) {
      this.showNativeErrorMessage();
    }
    return !this.invalid;
  }
  getAllRadios() {
    return [...this.querySelectorAll("sl-radio, sl-radio-button")];
  }
  handleRadioClick(event) {
    const target = event.target;
    const radios = this.getAllRadios();
    const oldValue = this.value;
    if (target.disabled) {
      return;
    }
    this.value = target.value;
    radios.forEach((radio) => radio.checked = radio === target);
    if (this.value !== oldValue) {
      this.emit("sl-change");
      this.emit("sl-input");
    }
  }
  handleKeyDown(event) {
    var _a;
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
      return;
    }
    const radios = this.getAllRadios().filter((radio) => !radio.disabled);
    const checkedRadio = (_a = radios.find((radio) => radio.checked)) != null ? _a : radios[0];
    const incr = event.key === " " ? 0 : ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
    const oldValue = this.value;
    let index = radios.indexOf(checkedRadio) + incr;
    if (index < 0) {
      index = radios.length - 1;
    }
    if (index > radios.length - 1) {
      index = 0;
    }
    this.getAllRadios().forEach((radio) => {
      radio.checked = false;
      if (!this.hasButtonGroup) {
        radio.tabIndex = -1;
      }
    });
    this.value = radios[index].value;
    radios[index].checked = true;
    if (!this.hasButtonGroup) {
      radios[index].tabIndex = 0;
      radios[index].focus();
    } else {
      radios[index].shadowRoot.querySelector("button").focus();
    }
    if (this.value !== oldValue) {
      this.emit("sl-change");
      this.emit("sl-input");
    }
    event.preventDefault();
  }
  handleLabelClick() {
    const radios = this.getAllRadios();
    const checked = radios.find((radio) => radio.checked);
    const radioToFocus = checked || radios[0];
    if (radioToFocus) {
      radioToFocus.focus();
    }
  }
  handleSlotChange() {
    var _a;
    const radios = this.getAllRadios();
    radios.forEach((radio) => radio.checked = radio.value === this.value);
    this.hasButtonGroup = radios.some((radio) => radio.tagName.toLowerCase() === "sl-radio-button");
    if (!radios.some((radio) => radio.checked)) {
      if (this.hasButtonGroup) {
        const buttonRadio = radios[0].shadowRoot.querySelector("button");
        buttonRadio.tabIndex = 0;
      } else {
        radios[0].tabIndex = 0;
      }
    }
    if (this.hasButtonGroup) {
      const buttonGroup = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("sl-button-group");
      if (buttonGroup) {
        buttonGroup.disableRole = true;
      }
    }
  }
  showNativeErrorMessage() {
    this.input.hidden = false;
    this.input.reportValidity();
    setTimeout(() => this.input.hidden = true, 1e4);
  }
  updateCheckedRadio() {
    const radios = this.getAllRadios();
    radios.forEach((radio) => radio.checked = radio.value === this.value);
    this.invalid = !this.validity.valid;
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const defaultSlot = y$1`
      <slot
        @click=${this.handleRadioClick}
        @keydown=${this.handleKeyDown}
        @slotchange=${this.handleSlotChange}
        role="presentation"
      ></slot>
    `;
    return y$1`
      <fieldset
        part="form-control"
        class=${o$6({
      "form-control": true,
      "form-control--medium": true,
      "form-control--radio-group": true,
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
              />
            </label>
          </div>

          ${this.hasButtonGroup ? y$1`
                <sl-button-group part="button-group" exportparts="base:button-group__base">
                  ${defaultSlot}
                </sl-button-group>
              ` : defaultSlot}
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          ${this.helpText}
        </slot>
      </fieldset>
    `;
  }
};
SlRadioGroup.styles = radio_group_styles_default;
__decorateClass([
  i2$1("slot:not([name])")
], SlRadioGroup.prototype, "defaultSlot", 2);
__decorateClass([
  i2$1(".radio-group__validation-input")
], SlRadioGroup.prototype, "input", 2);
__decorateClass([
  t$3()
], SlRadioGroup.prototype, "hasButtonGroup", 2);
__decorateClass([
  t$3()
], SlRadioGroup.prototype, "errorMessage", 2);
__decorateClass([
  t$3()
], SlRadioGroup.prototype, "customErrorMessage", 2);
__decorateClass([
  t$3()
], SlRadioGroup.prototype, "defaultValue", 2);
__decorateClass([
  t$3()
], SlRadioGroup.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlRadioGroup.prototype, "label", 2);
__decorateClass([
  e2$1({ attribute: "help-text" })
], SlRadioGroup.prototype, "helpText", 2);
__decorateClass([
  e2$1()
], SlRadioGroup.prototype, "name", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlRadioGroup.prototype, "value", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlRadioGroup.prototype, "required", 2);
__decorateClass([
  watch("value")
], SlRadioGroup.prototype, "handleValueChange", 1);
SlRadioGroup = __decorateClass([
  e$6("sl-radio-group")
], SlRadioGroup);

// src/components/radio-button/radio-button.styles.ts
var radio_button_styles_default = i$6`
  ${button_styles_default}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`;

// src/components/radio-button/radio-button.ts
var SlRadioButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.hasFocus = false;
    this.checked = false;
    this.disabled = false;
    this.size = "medium";
    this.pill = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "presentation");
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleClick(e3) {
    if (this.disabled) {
      e3.preventDefault();
      e3.stopPropagation();
      return;
    }
    this.checked = true;
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  render() {
    return n$6`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked ? " button--checked" : ""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${o$6({
      button: true,
      "button--default": true,
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--checked": this.checked,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--outline": true,
      "button--pill": this.pill,
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
          aria-disabled=${this.disabled}
          type="button"
          value=${l$4(this.value)}
          tabindex="${this.checked ? "0" : "-1"}"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `;
  }
};
SlRadioButton.styles = radio_button_styles_default;
__decorateClass([
  i2$1(".button")
], SlRadioButton.prototype, "input", 2);
__decorateClass([
  i2$1(".hidden-input")
], SlRadioButton.prototype, "hiddenInput", 2);
__decorateClass([
  t$3()
], SlRadioButton.prototype, "hasFocus", 2);
__decorateClass([
  t$3()
], SlRadioButton.prototype, "checked", 2);
__decorateClass([
  e2$1()
], SlRadioButton.prototype, "value", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlRadioButton.prototype, "disabled", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlRadioButton.prototype, "size", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlRadioButton.prototype, "pill", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlRadioButton.prototype, "handleDisabledChange", 1);
SlRadioButton = __decorateClass([
  e$6("sl-radio-button")
], SlRadioButton);

// src/components/badge/badge.styles.ts
var badge_styles_default = i$6`
  ${component_styles_default}

  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`;

// src/components/badge/badge.ts
var SlBadge = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.variant = "primary";
    this.pill = false;
    this.pulse = false;
  }
  render() {
    return y$1`
      <slot
        part="base"
        class=${o$6({
      badge: true,
      "badge--primary": this.variant === "primary",
      "badge--success": this.variant === "success",
      "badge--neutral": this.variant === "neutral",
      "badge--warning": this.variant === "warning",
      "badge--danger": this.variant === "danger",
      "badge--pill": this.pill,
      "badge--pulse": this.pulse
    })}
        role="status"
      ></slot>
    `;
  }
};
SlBadge.styles = badge_styles_default;
__decorateClass([
  e2$1({ reflect: true })
], SlBadge.prototype, "variant", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlBadge.prototype, "pill", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlBadge.prototype, "pulse", 2);
SlBadge = __decorateClass([
  e$6("sl-badge")
], SlBadge);

// src/components/avatar/avatar.styles.ts
var avatar_styles_default = i$6`
  ${component_styles_default}

  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`;

// src/components/avatar/avatar.ts
var SlAvatar = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasError = false;
    this.image = "";
    this.label = "";
    this.initials = "";
    this.loading = "eager";
    this.shape = "circle";
  }
  handleImageChange() {
    this.hasError = false;
  }
  render() {
    return y$1`
      <div
        part="base"
        class=${o$6({
      avatar: true,
      "avatar--circle": this.shape === "circle",
      "avatar--rounded": this.shape === "rounded",
      "avatar--square": this.shape === "square"
    })}
        role="img"
        aria-label=${this.label}
      >
        ${this.initials ? y$1` <div part="initials" class="avatar__initials">${this.initials}</div> ` : y$1`
              <slot name="icon" part="icon" class="avatar__icon" aria-hidden="true">
                <sl-icon name="person-fill" library="system"></sl-icon>
              </slot>
            `}
        ${this.image && !this.hasError ? y$1`
              <img
                part="image"
                class="avatar__image"
                src="${this.image}"
                loading="${this.loading}"
                alt=""
                @error="${() => this.hasError = true}"
              />
            ` : ""}
      </div>
    `;
  }
};
SlAvatar.styles = avatar_styles_default;
__decorateClass([
  t$3()
], SlAvatar.prototype, "hasError", 2);
__decorateClass([
  e2$1()
], SlAvatar.prototype, "image", 2);
__decorateClass([
  e2$1()
], SlAvatar.prototype, "label", 2);
__decorateClass([
  e2$1()
], SlAvatar.prototype, "initials", 2);
__decorateClass([
  e2$1()
], SlAvatar.prototype, "loading", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlAvatar.prototype, "shape", 2);
__decorateClass([
  watch("image")
], SlAvatar.prototype, "handleImageChange", 1);
SlAvatar = __decorateClass([
  e$6("sl-avatar")
], SlAvatar);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window,e$5=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$4=Symbol(),n$4=new WeakMap;let o$3 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$4)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$5&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$4.set(s,t));}return t}toString(){return this.cssText}};const r$3=t=>new o$3("string"==typeof t?t:t+"",void 0,s$4),S$1=(s,n)=>{e$5?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$3=e$5?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$3;const e$4=window,r$2=e$4.trustedTypes,h$1=r$2?r$2.emptyScript:"",o$2=e$4.reactiveElementPolyfillSupport,n$3={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$3={attribute:!0,type:String,converter:n$3,reflect:!1,hasChanged:a$1};let d$1 = class d extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$3){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$3}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$3(i));}else void 0!==i&&s.push(c$3(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$3){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$3).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$3;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};d$1.finalized=!0,d$1.elementProperties=new Map,d$1.elementStyles=[],d$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:d$1}),(null!==(s$3=e$4.reactiveElementVersions)&&void 0!==s$3?s$3:e$4.reactiveElementVersions=[]).push("1.5.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$2=window,s$2=i$2.trustedTypes,e$3=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1=`lit$${(Math.random()+"").slice(9)}$`,n$2="?"+o$1,l$2=`<${n$2}>`,h=document,r$1=(t="")=>h.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u$2=Array.isArray,c$2=t=>u$2(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a=/-->/g,f$1=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m$1=/'/g,p$1=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=h.createTreeWalker(h,129,null,!1),E=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a:void 0!==u[1]?d=f$1:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p$1:m$1):d===p$1||d===m$1?d=_:d===a||d===f$1?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l$2:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$1+y):s+o$1+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$3?e$3.createHTML(u):u,n]};class C{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,i);if(this.el=C.createElement(v,e),A.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$1)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$1),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($.test(l.tagName)){const t=l.textContent.split(o$1),i=t.length-1;if(i>0){l.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r$1()),A.nextNode(),c.push({type:2,index:++h});l.append(t[i],r$1());}}}else if(8===l.nodeType)if(l.data===n$2)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$1,t+1));)c.push({type:7,index:h}),t+=o$1.length-1;}h++;}}static createElement(t,i){const s=h.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=P(t,r._$AS(t,i.values),r,e)),i}class V{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.u.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=A.nextNode(),l++);}return o}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):c$2(t)?this.k(t):this.g(t);}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}g(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.T(h.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(s);else {const t=new V(o,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new C(t)),i}k(t){u$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.O(r$1()),this.O(r$1()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===b?void 0:t;}}const R=s$2?s$2.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==b?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const L={P:"$lit$",A:o$1,M:n$2,C:1,L:E,R:V,D:c$2,V:P,I:N,H:S,N:k,U:H,B:M,F:I},z=i$2.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t$1=i$2.litHtmlVersions)&&void 0!==t$1?t$1:i$2.litHtmlVersions=[]).push("2.5.0");const Z=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(r$1(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$1,o;let s$1 = class s extends d$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Z(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x}};s$1.finalized=!0,s$1._$litElement$=!0,null===(l$1=globalThis.litElementHydrateSupport)||void 0===l$1||l$1.call(globalThis,{LitElement:s$1});const n$1=globalThis.litElementPolyfillSupport;null==n$1||n$1({LitElement:s$1});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$2=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$1=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$1(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$1(e,n)}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n;null!=(null===(n=window.HTMLSlotElement)||void 0===n?void 0:n.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {I:l}=L,c$1=()=>document.createComment(""),r=(o,t,i)=>{var n;const d=o._$AA.parentNode,v=void 0===t?o._$AB:t._$AA;if(void 0===i){const t=d.insertBefore(c$1(),v),n=d.insertBefore(c$1(),v);i=new l(t,n,o,o.options);}else {const l=i._$AB.nextSibling,t=i._$AM,e=t!==o;if(e){let l;null===(n=i._$AQ)||void 0===n||n.call(i,o),i._$AM=o,void 0!==i._$AP&&(l=o._$AU)!==t._$AU&&i._$AP(l);}if(l!==v||e){let o=i._$AA;for(;o!==l;){const l=o.nextSibling;d.insertBefore(o,v),o=l;}}}return i},u$1=(o,l,t=o)=>(o._$AI(l,t),o),f={},s=(o,l=f)=>o._$AH=l,m=o=>o._$AH,p=o=>{var l;null===(l=o._$AP)||void 0===l||l.call(o,!1,!0);let t=o._$AA;const i=o._$AB.nextSibling;for(;t!==i;){const o=t.nextSibling;t.remove(),t=o;}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c=e(class extends i{constructor(e){if(super(e),e.type!==t.CHILD)throw Error("repeat() can only be used in text expressions")}ht(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.ht(e,s,t).values}update(s$1,[t,r$1,c]){var d;const a=m(s$1),{values:p$1,keys:v}=this.ht(t,r$1,c);if(!Array.isArray(a))return this.ut=v,p$1;const h=null!==(d=this.ut)&&void 0!==d?d:this.ut=[],m$1=[];let y,x$1,j=0,k=a.length-1,w=0,A=p$1.length-1;for(;j<=k&&w<=A;)if(null===a[j])j++;else if(null===a[k])k--;else if(h[j]===v[w])m$1[w]=u$1(a[j],p$1[w]),j++,w++;else if(h[k]===v[A])m$1[A]=u$1(a[k],p$1[A]),k--,A--;else if(h[j]===v[A])m$1[A]=u$1(a[j],p$1[A]),r(s$1,m$1[A+1],a[j]),j++,A--;else if(h[k]===v[w])m$1[w]=u$1(a[k],p$1[w]),r(s$1,a[j],a[k]),k--,w++;else if(void 0===y&&(y=u(v,w,A),x$1=u(h,j,k)),y.has(h[j]))if(y.has(h[k])){const e=x$1.get(v[w]),t=void 0!==e?a[e]:null;if(null===t){const e=r(s$1,a[j]);u$1(e,p$1[w]),m$1[w]=e;}else m$1[w]=u$1(t,p$1[w]),r(s$1,a[j],t),a[e]=null;w++;}else p(a[k]),k--;else p(a[j]),j++;for(;w<=A;){const e=r(s$1,m$1[A+1]);u$1(e,p$1[w]),m$1[w++]=e;}for(;j<=k;){const e=a[j++];null!==e&&p(e);}return this.ut=v,s(s$1,m$1),x}});

const navElements = Object.freeze({
    logo: {
        src: 'logo.png',
    },
    items: [
        {
            name: 'dashboard',
            icon: 'house-heart',
            rows: 2,
            viewable: true,
            isNavFooter: false,
        },
        {
            name: 'analytics',
            icon: 'bar-chart-line',
            rows: 3,
            viewable: true,
            isNavFooter: false,
        },
        {
            name: 'calendar',
            icon: 'calendar-day',
            rows: 4,
            viewable: true,
            isNavFooter: false,
        },
        {
            name: 'profile',
            icon: '',
            rows: 1,
            viewable: false,
            isNavFooter: true, // flip or remove all isNavFooter elements to not create any navFooter
        },
    ],
});

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const isStrTagged = (val) => typeof val !== 'string' && 'strTag' in val;
/**
 * Render the result of a `str` tagged template to a string. Note we don't need
 * to do this for Lit templates, since Lit itself handles rendering.
 */
const joinStringsAndValues = (strings, values, valueOrder) => {
    let concat = strings[0];
    for (let i = 1; i < strings.length; i++) {
        concat += values[valueOrder ? valueOrder[i - 1] : i - 1];
        concat += strings[i];
    }
    return concat;
};

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Default identity msg implementation. Simply returns the input template with
 * no awareness of translations. If the template is str-tagged, returns it in
 * string form.
 */
const defaultMsg = ((template) => isStrTagged(template)
    ? joinStringsAndValues(template.strings, template.values)
    : template);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Name of the event dispatched to `window` whenever a locale change starts,
 * finishes successfully, or fails. Only relevant to runtime mode.
 *
 * The `detail` of this event is an object with a `status` string that can be:
 * "loading", "ready", or "error", along with the relevant locale code, and
 * error message if applicable.
 *
 * You can listen for this event to know when your application should be
 * re-rendered following a locale change. See also the Localized mixin, which
 * automatically re-renders LitElement classes using this event.
 */
const LOCALE_STATUS_EVENT = 'lit-localize-status';

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class LocalizeController {
    constructor(host) {
        this.__litLocalizeEventHandler = (event) => {
            if (event.detail.status === 'ready') {
                this.host.requestUpdate();
            }
        };
        this.host = host;
    }
    hostConnected() {
        window.addEventListener(LOCALE_STATUS_EVENT, this.__litLocalizeEventHandler);
    }
    hostDisconnected() {
        window.removeEventListener(LOCALE_STATUS_EVENT, this.__litLocalizeEventHandler);
    }
}
/**
 * Re-render the given LitElement whenever a new active locale has loaded.
 *
 * See also {@link localized} for the same functionality as a decorator.
 *
 * When using lit-localize in transform mode, calls to this function are
 * replaced with undefined.
 *
 * Usage:
 *
 *   import {LitElement, html} from 'lit';
 *   import {msg, updateWhenLocaleChanges} from '@lit/localize';
 *
 *   class MyElement extends LitElement {
 *     constructor() {
 *       super();
 *       updateWhenLocaleChanges(this);
 *     }
 *
 *     render() {
 *       return html`<b>${msg('Hello World')}</b>`;
 *     }
 *   }
 */
const _updateWhenLocaleChanges = (host) => host.addController(new LocalizeController(host));
const updateWhenLocaleChanges = _updateWhenLocaleChanges;

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Class decorator to enable re-rendering the given LitElement whenever a new
 * active locale has loaded.
 *
 * See also {@link updateWhenLocaleChanges} for the same functionality without
 * the use of decorators.
 *
 * When using lit-localize in transform mode, applications of this decorator are
 * removed.
 *
 * Usage:
 *
 *   import {LitElement, html} from 'lit';
 *   import {customElement} from 'lit/decorators.js';
 *   import {msg, localized} from '@lit/localize';
 *
 *   @localized()
 *   @customElement('my-element')
 *   class MyElement extends LitElement {
 *     render() {
 *       return html`<b>${msg('Hello World')}</b>`;
 *     }
 *   }
 */
const _localized = () => (classOrDescriptor) => typeof classOrDescriptor === 'function'
    ? legacyLocalized(classOrDescriptor)
    : standardLocalized(classOrDescriptor);
const localized = _localized;
const standardLocalized = ({ kind, elements }) => {
    return {
        kind,
        elements,
        finisher(clazz) {
            clazz.addInitializer(updateWhenLocaleChanges);
        },
    };
};
const legacyLocalized = (clazz) => {
    clazz.addInitializer(updateWhenLocaleChanges);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return clazz;
};

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Deferred {
    constructor() {
        this.settled = false;
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    resolve(value) {
        this.settled = true;
        this._resolve(value);
    }
    reject(error) {
        this.settled = true;
        this._reject(error);
    }
}

/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */
// This module is derived from the file:
// https://github.com/tjwebb/fnv-plus/blob/1e2ce68a07cb7dd4c3c85364f3d8d96c95919474/index.js#L309
//
// Changes:
// - Only the _hash64_1a_fast function is included.
// - Removed loop unrolling.
// - Converted to TypeScript ES module.
// - var -> let/const
//
// TODO(aomarks) Upstream improvements to https://github.com/tjwebb/fnv-plus/.
const hl = [];
for (let i = 0; i < 256; i++) {
    hl[i] = ((i >> 4) & 15).toString(16) + (i & 15).toString(16);
}
/**
 * Perform a FNV-1A 64-bit hash of the given string (as UTF-16 code units), and
 * return a hexadecimal digest (left zero padded to 16 characters).
 *
 * @see {@link http://tools.ietf.org/html/draft-eastlake-fnv-06}
 */
function fnv1a64(str) {
    let t0 = 0, v0 = 0x2325, t1 = 0, v1 = 0x8422, t2 = 0, v2 = 0x9ce4, t3 = 0, v3 = 0xcbf2;
    for (let i = 0; i < str.length; i++) {
        v0 ^= str.charCodeAt(i);
        t0 = v0 * 435;
        t1 = v1 * 435;
        t2 = v2 * 435;
        t3 = v3 * 435;
        t2 += v0 << 8;
        t3 += v1 << 8;
        t1 += t0 >>> 16;
        v0 = t0 & 65535;
        t2 += t1 >>> 16;
        v1 = t1 & 65535;
        v3 = (t3 + (t2 >>> 16)) & 65535;
        v2 = t2 & 65535;
    }
    return (hl[v3 >> 8] +
        hl[v3 & 255] +
        hl[v2 >> 8] +
        hl[v2 & 255] +
        hl[v1 >> 8] +
        hl[v1 & 255] +
        hl[v0 >> 8] +
        hl[v0 & 255]);
}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Delimiter used between each template string component before hashing. Used to
 * prevent e.g. "foobar" and "foo${baz}bar" from sharing a hash.
 *
 * This is the "record separator" ASCII character.
 */
const HASH_DELIMITER = '\x1e';
/**
 * Id prefix on html-tagged templates to distinguish e.g. `<b>x</b>` from
 * html`<b>x</b>`.
 */
const HTML_PREFIX = 'h';
/**
 * Id prefix on plain string templates to distinguish e.g. `<b>x</b>` from
 * html`<b>x</b>`.
 */
const STRING_PREFIX = 's';
/**
 * Generate a unique ID for a lit-localize message.
 *
 * Example:
 *   Template: html`Hello <b>${who}</b>!`
 *     Params: ["Hello <b>", "</b>!"], true
 *     Output: h82ccc38d4d46eaa9
 *
 * The ID is constructed as:
 *
 *   [0]    Kind of template: [h]tml or [s]tring.
 *   [1,16] 64-bit FNV-1a hash hex digest of the template strings, as UTF-16
 *          code points, delineated by an ASCII "record separator" character.
 *
 * We choose FNV-1a because:
 *
 *   1. It's pretty fast (e.g. much faster than SHA-1).
 *   2. It's pretty small (0.25 KiB minified + brotli).
 *   3. We don't require cryptographic security, and 64 bits should give
 *      sufficient collision resistance for any one application. Worst
 *      case, we will always detect collisions during analysis.
 *   4. We can't use Web Crypto API (e.g. SHA-1), because it's asynchronous.
 *   5. It's a well known non-cryptographic hash with implementations in many
 *      languages.
 *   6. There was an existing JavaScript implementation that doesn't require
 *      BigInt, for IE11 compatibility.
 */
function generateMsgId(strings, isHtmlTagged) {
    return ((isHtmlTagged ? HTML_PREFIX : STRING_PREFIX) +
        fnv1a64(typeof strings === 'string' ? strings : strings.join(HASH_DELIMITER)));
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const expressionOrders = new WeakMap();
const hashCache = new Map();
function runtimeMsg(templates, template, options) {
    var _a;
    if (templates) {
        const id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : generateId(template);
        const localized = templates[id];
        if (localized) {
            if (typeof localized === 'string') {
                // E.g. "Hello World!"
                return localized;
            }
            else if ('strTag' in localized) {
                // E.g. str`Hello ${name}!`
                //
                // Localized templates have ${number} in place of real template
                // expressions. They can't have real template values, because the
                // variable scope would be wrong. The number tells us the index of the
                // source value to substitute in its place, because expressions can be
                // moved to a different position during translation.
                return joinStringsAndValues(localized.strings, 
                // Cast `template` because its type wasn't automatically narrowed (but
                // we know it must be the same type as `localized`).
                template.values, localized.values);
            }
            else {
                // E.g. html`Hello <b>${name}</b>!`
                //
                // We have to keep our own mapping of expression ordering because we do
                // an in-place update of `values`, and otherwise we'd lose ordering for
                // subsequent renders.
                let order = expressionOrders.get(localized);
                if (order === undefined) {
                    order = localized.values;
                    expressionOrders.set(localized, order);
                }
                return {
                    ...localized,
                    values: order.map((i) => template.values[i]),
                };
            }
        }
    }
    return defaultMsg(template);
}
function generateId(template) {
    const strings = typeof template === 'string' ? template : template.strings;
    let id = hashCache.get(strings);
    if (id === undefined) {
        id = generateMsgId(strings, typeof template !== 'string' && !('strTag' in template));
        hashCache.set(strings, id);
    }
    return id;
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Dispatch a "lit-localize-status" event to `window` with the given detail.
 */
function dispatchStatusEvent(detail) {
    window.dispatchEvent(new CustomEvent(LOCALE_STATUS_EVENT, { detail }));
}
let activeLocale = '';
let loadingLocale;
let sourceLocale$1;
let validLocales;
let loadLocale;
let templates;
let loading = new Deferred();
// The loading promise must be initially resolved, because that's what we should
// return if the user immediately calls setLocale(sourceLocale).
loading.resolve();
let requestId = 0;
/**
 * Set configuration parameters for lit-localize when in runtime mode. Returns
 * an object with functions:
 *
 * - `getLocale`: Return the active locale code.
 * - `setLocale`: Set the active locale code.
 *
 * Throws if called more than once.
 */
const configureLocalization = (config) => {
    _installMsgImplementation(((template, options) => runtimeMsg(templates, template, options)));
    activeLocale = sourceLocale$1 = config.sourceLocale;
    validLocales = new Set(config.targetLocales);
    validLocales.add(config.sourceLocale);
    loadLocale = config.loadLocale;
    return { getLocale: getLocale$1, setLocale: setLocale$1 };
};
/**
 * Return the active locale code.
 */
const getLocale$1 = () => {
    return activeLocale;
};
/**
 * Set the active locale code, and begin loading templates for that locale using
 * the `loadLocale` function that was passed to `configureLocalization`. Returns
 * a promise that resolves when the next locale is ready to be rendered.
 *
 * Note that if a second call to `setLocale` is made while the first requested
 * locale is still loading, then the second call takes precedence, and the
 * promise returned from the first call will resolve when second locale is
 * ready. If you need to know whether a particular locale was loaded, check
 * `getLocale` after the promise resolves.
 *
 * Throws if the given locale is not contained by the configured `sourceLocale`
 * or `targetLocales`.
 */
const setLocale$1 = (newLocale) => {
    if (newLocale === (loadingLocale !== null && loadingLocale !== void 0 ? loadingLocale : activeLocale)) {
        return loading.promise;
    }
    if (!validLocales || !loadLocale) {
        throw new Error('Internal error');
    }
    if (!validLocales.has(newLocale)) {
        throw new Error('Invalid locale code');
    }
    requestId++;
    const thisRequestId = requestId;
    loadingLocale = newLocale;
    if (loading.settled) {
        loading = new Deferred();
    }
    dispatchStatusEvent({ status: 'loading', loadingLocale: newLocale });
    const localePromise = newLocale === sourceLocale$1
        ? // We could switch to the source locale synchronously, but we prefer to
            // queue it on a microtask so that switching locales is consistently
            // asynchronous.
            Promise.resolve({ templates: undefined })
        : loadLocale(newLocale);
    localePromise.then((mod) => {
        if (requestId === thisRequestId) {
            activeLocale = newLocale;
            loadingLocale = undefined;
            templates = mod.templates;
            dispatchStatusEvent({ status: 'ready', readyLocale: newLocale });
            loading.resolve();
        }
        // Else another locale was requested in the meantime. Don't resolve or
        // reject, because the newer load call is going to use the same promise.
        // Note the user can call getLocale() after the promise resolves if they
        // need to check if the locale is still the one they expected to load.
    }, (err) => {
        if (requestId === thisRequestId) {
            dispatchStatusEvent({
                status: 'error',
                errorLocale: newLocale,
                errorMessage: err.toString(),
            });
            loading.reject(err);
        }
    });
    return loading.promise;
};

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Make a string or lit-html template localizable.
 *
 * @param template A string, a lit-html template, or a function that returns
 * either a string or lit-html template.
 * @param options Optional configuration object with the following properties:
 *   - id: Optional project-wide unique identifier for this template. If
 *     omitted, an id will be automatically generated from the template strings.
 *   - desc: Optional description
 */
let msg = defaultMsg;
let installed = false;
/**
 * Internal only. Do not use this function.
 *
 * Installs an implementation of the msg function to replace the default
 * identity function. Throws if called more than once.
 *
 * @internal
 */
function _installMsgImplementation(impl) {
    if (installed) {
        throw new Error('lit-localize can only be configured once');
    }
    msg = impl;
    installed = true;
}

function capitalize(input) {
    const [first, ...rest] = input;
    return first.toUpperCase() + rest.join('');
}

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let MainNav = class MainNav extends s$1 {
    #activeClass = 'nav-elem-active';
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #click(event) {
        const target = event.target;
        const parent = target.parentNode;
        const isNav = target.classList.contains('nav-element');
        const element = isNav ? target : parent;
        const active = document.querySelector(`.${this.#activeClass}`);
        const isFooterElement = element.getAttribute('isNavFooter') === 'true';
        const clickViewEvent = new CustomEvent('viewSwitch', {
            detail: {
                name: element.getAttribute('name'),
            },
        });
        if (active) {
            active.classList.remove(this.#activeClass);
        }
        if (!isFooterElement) {
            element.classList.add(this.#activeClass);
        }
        this.setAttribute('closed', 'true');
        return this.dispatchEvent(clickViewEvent);
    }
    #clickOnCloseMobile() {
        const closed = this.getAttribute('closed') === 'true';
        return this.setAttribute('closed', !closed + '');
    }
    #renderNavItems() {
        const fallBackFirstTimeUse = navElements.items[0].name;
        const activeView = localStorage.getItem('active-view') || fallBackFirstTimeUse;
        // Workaround for localized, because it only compiles statically
        const navStaticElements = Object.freeze({
            analytics: y `<span>${capitalize(msg('analytics'))}</span>`,
            dashboard: y `<span>${capitalize(msg('dashboard'))}</span>`,
            calendar: y `<span>${capitalize(msg('calendar'))}</span>`,
        });
        return c(navElements.items, (elem) => {
            const classes = activeView === elem.name ? this.#activeClass : '';
            if (!elem.viewable) {
                return;
            }
            return y `<div @click="${this.#click}" class="nav-element ${classes}" name="${elem.name}">
                <sl-icon name="${elem.icon}"></sl-icon>&nbsp; ${navStaticElements[elem.name]}
            </div>`;
        });
    }
    #renderNavFooter() {
        const hasFooter = !!navElements.items.find(elem => elem.isNavFooter);
        if (!hasFooter) {
            return;
        }
        return y `<footer class="nav-footer">
            <sl-avatar image="./assets/img/fallbacks/avatar.png" label="${msg('Your profile avatar')}"></sl-avatar>
            <div name="profile" isNavFooter="true">
                <span>${msg('Username')}</span>
                <small @click="${this.#click}" class="view-profile">${msg('View Profile')}</small>
            </div>
        </footer>`;
    }
    #renderNavLogoBar() {
        return y `<header class="nav-header mb-4">
            <img class="nav-logo" src="./assets/img/logos/${navElements.logo.src}" />
            <i @click="${this.#clickOnCloseMobile}" class="fa fa-solid fa-times fa-fw close-mobil-nav"></i>
        </header>`;
    }
    render() {
        const navLogoBar = this.#renderNavLogoBar();
        const bottom = this.#renderNavFooter();
        const elements = this.#renderNavItems();
        return y `${navLogoBar}${elements}${bottom}`;
    }
};
MainNav = __decorate$4([
    localized(),
    e$2('main-nav')
], MainNav);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ViewLayout = class ViewLayout extends s$1 {
    name = '';
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #renderRows({ rows }, ROWS) {
        return [...new Array(rows)].map(function (_, i) {
            return y `<div class="view-row">${ROWS[i]}</div>`;
        });
    }
    render(ROWS = '') {
        const viewData = navElements.items.find(i => i.name === this.name);
        // Workaround for localized, because it only compiles statically
        const hlStaticElements = Object.freeze({
            analytics: y `<h1 class="view-headline">${capitalize(msg('analytics'))}</h1>`,
            dashboard: y `<h1 class="view-headline">${capitalize(msg('dashboard'))}</h1>`,
            calendar: y `<h1 class="view-headline">${capitalize(msg('calendar'))}</h1>`,
            profile: y `<h1 class="view-headline">${capitalize(msg('profile'))}</h1>`,
        });
        return y `<div class="view-container">
            <header>${hlStaticElements[this.name]}</header>
            <div class="view-content grid-cols-${viewData.rows}">${this.#renderRows(viewData, ROWS)}</div>
        </div>`;
    }
};
__decorate$3([
    e$1({ attribute: true, reflect: true })
], ViewLayout.prototype, "name", void 0);
ViewLayout = __decorate$3([
    localized(),
    e$2('view-layout')
], ViewLayout);
var ViewLayout$1 = ViewLayout;

// Do not modify this file by hand!
// Re-generate this file by running lit-localize.
/**
 * The locale code that templates in this source code are written in.
 */
const sourceLocale = `en`;
/**
 * The other locale codes that this application is localized into. Sorted
 * lexicographically.
 */
const targetLocales = [
    `de-CH-1901`,
];

const { getLocale, setLocale } = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: locale => import(`/js/locales/${locale}.js`),
});

const languages = [
    {
        code: 'en',
        name: 'English',
    },
    {
        code: 'de-CH-1901',
        name: 'German',
    },
];

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ProfileView = class ProfileView extends ViewLayout$1 {
    constructor() {
        super();
    }
    // Bootstraping any other lang than english
    updated() {
        const lang = localStorage.getItem('lang');
        if (lang && lang !== 'en') {
            setLocale(lang);
        }
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #changeEvent({ target: { value } }) {
        setLocale(value);
        localStorage.setItem('lang', value);
    }
    #renderRows() {
        const lang = localStorage.getItem('lang') || languages[0].code;
        const row1 = y `<sl-radio-group
            @click="${this.#changeEvent}"
            label="${capitalize(msg('language'))}"
            value="${lang}"
        >
            ${c(languages, function ({ name, code }) {
            return y ` <sl-radio-button value="${code}">${name}</sl-radio-button>`;
        })}
        </sl-radio-group>`;
        return [row1];
    }
    render() {
        const rows = this.#renderRows();
        return super.render(rows);
    }
};
ProfileView = __decorate$2([
    localized(),
    e$2('profile-layout')
], ProfileView);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let DashboardView = class DashboardView extends ViewLayout$1 {
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #settingsClick() {
        console.log('settingsclick');
    }
    #renderRows() {
        const row1 = y `<sl-button variant="default">Default</sl-button>
            <sl-button variant="primary">Primary</sl-button>
            <sl-button variant="success">Success</sl-button>
            <sl-button variant="neutral">Neutral</sl-button>
            <sl-button variant="warning">Warning</sl-button>
            <sl-button variant="danger">Danger</sl-button>`;
        const row2 = y `<sl-button-group label="Alignment">
            <sl-button>Left</sl-button>
            <sl-button>Center</sl-button>
            <sl-button>Right</sl-button>
        </sl-button-group>`;
        return [row1, row2];
    }
    render() {
        const rows = this.#renderRows();
        return super.render(rows);
    }
};
DashboardView = __decorate$1([
    localized(),
    e$2('dashboard-layout')
], DashboardView);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let AppLayout = class AppLayout extends s$1 {
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #viewSwitch({ detail: { name } }) {
        const active = this.querySelector('.view[active="true"]');
        const view = this.querySelector(`.view[name="${name}"]`);
        if (active) {
            active.setAttribute('active', 'false');
        }
        localStorage.setItem('active-view', name);
        view.setAttribute('active', 'true');
    }
    #clickMobileHamburger() {
        const nav = this.querySelector('.nav');
        const closed = nav.getAttribute('closed') === 'true';
        return nav.setAttribute('closed', !closed + '');
    }
    render() {
        const fallBackFirstTimeUse = navElements.items[0].name;
        const activeView = localStorage.getItem('active-view') || fallBackFirstTimeUse;
        return y `<main-nav class="nav" closed="true" @viewSwitch="${this.#viewSwitch}"></main-nav>
            <main>
                <div class="view-header">
                    <i
                        closed="true"
                        @click="${this.#clickMobileHamburger}"
                        class="fa fa-solid fa-fw fa-bars fa-2x hamburger-menu"
                    ></i>
                </div>
                ${c(navElements.items, (elem) => {
            const active = elem.name === activeView;
            if (elem.name === 'dashboard') {
                return y `<dashboard-layout
                            name="${elem.name}"
                            active="${active}"
                            class="view"
                        ></dashboard-layout>`;
            }
            if (elem.name === 'profile') {
                return y `<profile-layout
                            name="${elem.name}"
                            active="${active}"
                            class="view"
                        ></profile-layout>`;
            }
            return y `<view-layout name="${elem.name}" active="${active}" class="view"></view-layout>`;
        })}
            </main>`;
    }
};
AppLayout = __decorate([
    e$2('app-layout')
], AppLayout);

document.addEventListener('DOMContentLoaded', function () {
    console.log('v:0.0.1 at: "2022-12-15T13:19:27.049Z" ');
});

/* CSS */
// Set the base path to the folder you copied Shoelace's assets to
setBasePath('/assets/shoelace');
