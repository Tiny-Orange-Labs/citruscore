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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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
    if (!disabled && !isButton && typeof name === "string" && name.length > 0 && typeof value !== "undefined") {
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

// node_modules/@lit/reactive-element/css-tag.js
var t$7 = window;
var e$a = t$7.ShadowRoot && (void 0 === t$7.ShadyCSS || t$7.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s$a = Symbol();
var n$a = /* @__PURE__ */ new WeakMap();
var o$8 = class o {
  constructor(t3, e4, n5) {
    if (this._$cssResult$ = true, n5 !== s$a)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e4;
  }
  get styleSheet() {
    let t3 = this.o;
    const s5 = this.t;
    if (e$a && void 0 === t3) {
      const e4 = void 0 !== s5 && 1 === s5.length;
      e4 && (t3 = n$a.get(s5)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && n$a.set(s5, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r$6 = (t3) => new o$8("string" == typeof t3 ? t3 : t3 + "", void 0, s$a);
var i$7 = (t3, ...e4) => {
  const n5 = 1 === t3.length ? t3[0] : e4.reduce((e5, s5, n6) => e5 + ((t4) => {
    if (true === t4._$cssResult$)
      return t4.cssText;
    if ("number" == typeof t4)
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t3[n6 + 1], t3[0]);
  return new o$8(n5, t3, s$a);
};
var S$2 = (s5, n5) => {
  e$a ? s5.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((e4) => {
    const n6 = document.createElement("style"), o5 = t$7.litNonce;
    void 0 !== o5 && n6.setAttribute("nonce", o5), n6.textContent = e4.cssText, s5.appendChild(n6);
  });
};
var c$7 = e$a ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const s5 of t4.cssRules)
    e4 += s5.cssText;
  return r$6(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var s2$1;
var e2$2 = window;
var r2$1 = e2$2.trustedTypes;
var h$5 = r2$1 ? r2$1.emptyScript : "";
var o2$2 = e2$2.reactiveElementPolyfillSupport;
var n2$1 = { toAttribute(t3, i3) {
  switch (i3) {
    case Boolean:
      t3 = t3 ? h$5 : null;
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
var a$4 = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
var l$8 = { attribute: true, type: String, converter: n2$1, reflect: false, hasChanged: a$4 };
var d$3 = class d extends HTMLElement {
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
  static createProperty(t3, i3 = l$8) {
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
    return this.elementProperties.get(t3) || l$8;
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
        s5.unshift(c$7(i4));
    } else
      void 0 !== i3 && s5.push(c$7(i3));
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
  _$EO(t3, i3, s5 = l$8) {
    var e4;
    const r4 = this.constructor._$Ep(t3, s5);
    if (void 0 !== r4 && true === s5.reflect) {
      const h3 = (void 0 !== (null === (e4 = s5.converter) || void 0 === e4 ? void 0 : e4.toAttribute) ? s5.converter : n2$1).toAttribute(i3, s5.type);
      this._$El = t3, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
    }
  }
  _$AK(t3, i3) {
    var s5;
    const e4 = this.constructor, r4 = e4._$Ev.get(t3);
    if (void 0 !== r4 && this._$El !== r4) {
      const t4 = e4.getPropertyOptions(r4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== (null === (s5 = t4.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t4.converter : n2$1;
      this._$El = r4, this[r4] = h3.fromAttribute(i3, t4.type), this._$El = null;
    }
  }
  requestUpdate(t3, i3, s5) {
    let e4 = true;
    void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a$4)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), true === s5.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this._$E_ = this._$Ej());
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
d$3.finalized = true, d$3.elementProperties = /* @__PURE__ */ new Map(), d$3.elementStyles = [], d$3.shadowRootOptions = { mode: "open" }, null == o2$2 || o2$2({ ReactiveElement: d$3 }), (null !== (s2$1 = e2$2.reactiveElementVersions) && void 0 !== s2$1 ? s2$1 : e2$2.reactiveElementVersions = []).push("1.4.2");

// node_modules/lit-html/lit-html.js
var t2;
var i2$3 = window;
var s3 = i2$3.trustedTypes;
var e3$1 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var o3$1 = `lit$${(Math.random() + "").slice(9)}$`;
var n3 = "?" + o3$1;
var l2$2 = `<${n3}>`;
var h2$2 = document;
var r3 = (t3 = "") => h2$2.createComment(t3);
var d2$1 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var u$4 = Array.isArray;
var c2$1 = (t3) => u$4(t3) || "function" == typeof (null == t3 ? void 0 : t3[Symbol.iterator]);
var v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var a2$1 = /-->/g;
var f$4 = />/g;
var _$1 = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var m$3 = /'/g;
var p$3 = /"/g;
var $$1 = /^(?:script|style|textarea|title)$/i;
var g$2 = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
var y$1 = g$2(1);
var x$2 = Symbol.for("lit-noChange");
var b$2 = Symbol.for("lit-nothing");
var T$2 = /* @__PURE__ */ new WeakMap();
var A$2 = h2$2.createTreeWalker(h2$2, 129, null, false);
var E$1 = (t3, i3) => {
  const s5 = t3.length - 1, n5 = [];
  let h3, r4 = 2 === i3 ? "<svg>" : "", d3 = v$1;
  for (let i4 = 0; i4 < s5; i4++) {
    const s6 = t3[i4];
    let e4, u3, c3 = -1, g2 = 0;
    for (; g2 < s6.length && (d3.lastIndex = g2, u3 = d3.exec(s6), null !== u3); )
      g2 = d3.lastIndex, d3 === v$1 ? "!--" === u3[1] ? d3 = a2$1 : void 0 !== u3[1] ? d3 = f$4 : void 0 !== u3[2] ? ($$1.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d3 = _$1) : void 0 !== u3[3] && (d3 = _$1) : d3 === _$1 ? ">" === u3[0] ? (d3 = null != h3 ? h3 : v$1, c3 = -1) : void 0 === u3[1] ? c3 = -2 : (c3 = d3.lastIndex - u3[2].length, e4 = u3[1], d3 = void 0 === u3[3] ? _$1 : '"' === u3[3] ? p$3 : m$3) : d3 === p$3 || d3 === m$3 ? d3 = _$1 : d3 === a2$1 || d3 === f$4 ? d3 = v$1 : (d3 = _$1, h3 = void 0);
    const y2 = d3 === _$1 && t3[i4 + 1].startsWith("/>") ? " " : "";
    r4 += d3 === v$1 ? s6 + l2$2 : c3 >= 0 ? (n5.push(e4), s6.slice(0, c3) + "$lit$" + s6.slice(c3) + o3$1 + y2) : s6 + o3$1 + (-2 === c3 ? (n5.push(void 0), i4) : y2);
  }
  const u2 = r4 + (t3[s5] || "<?>") + (2 === i3 ? "</svg>" : "");
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e3$1 ? e3$1.createHTML(u2) : u2, n5];
};
var C$2 = class C {
  constructor({ strings: t3, _$litType$: i3 }, e4) {
    let l4;
    this.parts = [];
    let h3 = 0, d3 = 0;
    const u2 = t3.length - 1, c3 = this.parts, [v2, a3] = E$1(t3, i3);
    if (this.el = C$2.createElement(v2, e4), A$2.currentNode = this.el.content, 2 === i3) {
      const t4 = this.el.content, i4 = t4.firstChild;
      i4.remove(), t4.append(...i4.childNodes);
    }
    for (; null !== (l4 = A$2.nextNode()) && c3.length < u2; ) {
      if (1 === l4.nodeType) {
        if (l4.hasAttributes()) {
          const t4 = [];
          for (const i4 of l4.getAttributeNames())
            if (i4.endsWith("$lit$") || i4.startsWith(o3$1)) {
              const s5 = a3[d3++];
              if (t4.push(i4), void 0 !== s5) {
                const t5 = l4.getAttribute(s5.toLowerCase() + "$lit$").split(o3$1), i5 = /([.?@])?(.*)/.exec(s5);
                c3.push({ type: 1, index: h3, name: i5[2], strings: t5, ctor: "." === i5[1] ? M$1 : "?" === i5[1] ? k$2 : "@" === i5[1] ? H$2 : S2 });
              } else
                c3.push({ type: 6, index: h3 });
            }
          for (const i4 of t4)
            l4.removeAttribute(i4);
        }
        if ($$1.test(l4.tagName)) {
          const t4 = l4.textContent.split(o3$1), i4 = t4.length - 1;
          if (i4 > 0) {
            l4.textContent = s3 ? s3.emptyScript : "";
            for (let s5 = 0; s5 < i4; s5++)
              l4.append(t4[s5], r3()), A$2.nextNode(), c3.push({ type: 2, index: ++h3 });
            l4.append(t4[i4], r3());
          }
        }
      } else if (8 === l4.nodeType)
        if (l4.data === n3)
          c3.push({ type: 2, index: h3 });
        else {
          let t4 = -1;
          for (; -1 !== (t4 = l4.data.indexOf(o3$1, t4 + 1)); )
            c3.push({ type: 7, index: h3 }), t4 += o3$1.length - 1;
        }
      h3++;
    }
  }
  static createElement(t3, i3) {
    const s5 = h2$2.createElement("template");
    return s5.innerHTML = t3, s5;
  }
};
function P$1(t3, i3, s5 = t3, e4) {
  var o5, n5, l4, h3;
  if (i3 === x$2)
    return i3;
  let r4 = void 0 !== e4 ? null === (o5 = s5._$Co) || void 0 === o5 ? void 0 : o5[e4] : s5._$Cl;
  const u2 = d2$1(i3) ? void 0 : i3._$litDirective$;
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
    const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = (null !== (i3 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i3 ? i3 : h2$2).importNode(s5, true);
    A$2.currentNode = o5;
    let n5 = A$2.nextNode(), l4 = 0, r4 = 0, d3 = e4[0];
    for (; void 0 !== d3; ) {
      if (l4 === d3.index) {
        let i4;
        2 === d3.type ? i4 = new N$1(n5, n5.nextSibling, this, t3) : 1 === d3.type ? i4 = new d3.ctor(n5, d3.name, d3.strings, this, t3) : 6 === d3.type && (i4 = new I$1(n5, this, t3)), this.u.push(i4), d3 = e4[++r4];
      }
      l4 !== (null == d3 ? void 0 : d3.index) && (n5 = A$2.nextNode(), l4++);
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
    this.type = 2, this._$AH = b$2, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e4, this._$Cm = null === (o5 = null == e4 ? void 0 : e4.isConnected) || void 0 === o5 || o5;
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
    t3 = P$1(this, t3, i3), d2$1(t3) ? t3 === b$2 || null == t3 || "" === t3 ? (this._$AH !== b$2 && this._$AR(), this._$AH = b$2) : t3 !== this._$AH && t3 !== x$2 && this.g(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : c2$1(t3) ? this.k(t3) : this.g(t3);
  }
  O(t3, i3 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i3);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  g(t3) {
    this._$AH !== b$2 && d2$1(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(h2$2.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    var i3;
    const { values: s5, _$litType$: e4 } = t3, o5 = "number" == typeof e4 ? this._$AC(t3) : (void 0 === e4.el && (e4.el = C$2.createElement(e4.h, this.options)), e4);
    if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o5)
      this._$AH.p(s5);
    else {
      const t4 = new V$1(o5, this), i4 = t4.v(this.options);
      t4.p(s5), this.T(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = T$2.get(t3.strings);
    return void 0 === i3 && T$2.set(t3.strings, i3 = new C$2(t3)), i3;
  }
  k(t3) {
    u$4(this._$AH) || (this._$AH = [], this._$AR());
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
    this.type = 1, this._$AH = b$2, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = o5, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = b$2;
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
      t3 = P$1(this, t3, i3, 0), n5 = !d2$1(t3) || t3 !== this._$AH && t3 !== x$2, n5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l4, h3;
      for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
        h3 = P$1(this, e5[s5 + l4], i3, l4), h3 === x$2 && (h3 = this._$AH[l4]), n5 || (n5 = !d2$1(h3) || h3 !== this._$AH[l4]), h3 === b$2 ? t3 = b$2 : t3 !== b$2 && (t3 += (null != h3 ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
    }
    n5 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === b$2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
  }
};
var M$1 = class M extends S2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === b$2 ? void 0 : t3;
  }
};
var R$2 = s3 ? s3.emptyScript : "";
var k$2 = class k extends S2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    t3 && t3 !== b$2 ? this.element.setAttribute(this.name, R$2) : this.element.removeAttribute(this.name);
  }
};
var H$2 = class H extends S2 {
  constructor(t3, i3, s5, e4, o5) {
    super(t3, i3, s5, e4, o5), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s5;
    if ((t3 = null !== (s5 = P$1(this, t3, i3, 0)) && void 0 !== s5 ? s5 : b$2) === x$2)
      return;
    const e4 = this._$AH, o5 = t3 === b$2 && e4 !== b$2 || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== b$2 && (e4 === b$2 || o5);
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
var z$1 = i2$3.litHtmlPolyfillSupport;
null == z$1 || z$1(C$2, N$1), (null !== (t2 = i2$3.litHtmlVersions) && void 0 !== t2 ? t2 : i2$3.litHtmlVersions = []).push("2.4.0");
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
var s4 = class extends d$3 {
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
    return x$2;
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
var component_styles_default = i$7`
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
var button_styles_default = i$7`
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

// node_modules/lit-html/static.js
var e$9 = Symbol.for("");
var l$7 = (t) => {
  if ((null == t ? void 0 : t.r) === e$9)
    return null == t ? void 0 : t._$litStatic$;
};
var i$6 = (t, ...r) => ({ _$litStatic$: r.reduce((r2, e2, l2) => r2 + ((t2) => {
  if (void 0 !== t2._$litStatic$)
    return t2._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t2}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e2) + t[l2 + 1], t[0]), r: e$9 });
var s$9 = /* @__PURE__ */ new Map();
var a$3 = (t) => (r, ...e2) => {
  const o = e2.length;
  let i2, a2;
  const n2 = [], u2 = [];
  let c, $ = 0, f = false;
  for (; $ < o; ) {
    for (c = r[$]; $ < o && void 0 !== (a2 = e2[$], i2 = l$7(a2)); )
      c += i2 + r[++$], f = true;
    u2.push(a2), n2.push(c), $++;
  }
  if ($ === o && n2.push(r[o]), f) {
    const t2 = n2.join("$$lit$$");
    void 0 === (r = s$9.get(t2)) && (n2.raw = n2, s$9.set(t2, r = n2)), e2 = u2;
  }
  return t(r, ...e2);
};
var n$9 = a$3(y$1);
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
      return String(key);
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
  numOptionsSelected: (num) => {
    if (num === 0)
      return "No options selected";
    if (num === 1)
      return "1 option selected";
    return `${num} options selected`;
  },
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
function getTextContent(slot) {
  if (!slot) {
    return "";
  }
  const nodes = slot.assignedNodes({ flatten: true });
  let text = "";
  [...nodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  });
  return text;
}

// node_modules/lit-html/directives/if-defined.js
var l$6 = (l2) => null != l2 ? l2 : b$2;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/lit-html/directive.js
var t$6 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e$8 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
var i$5 = class i {
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
var o$7 = e$8(class extends i$5 {
  constructor(t2) {
    var i2;
    if (super(t2), t2.type !== t$6.ATTRIBUTE || "class" !== t2.name || (null === (i2 = t2.strings) || void 0 === i2 ? void 0 : i2.length) > 2)
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
    return x$2;
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
var e$7 = (e5) => (n2) => "function" == typeof n2 ? ((e6, n3) => (customElements.define(e6, n3), n3))(e5, n2) : ((e6, n3) => {
  const { kind: t2, elements: s2 } = n3;
  return { kind: t2, elements: s2, finisher(n4) {
    customElements.define(e6, n4);
  } };
})(e5, n2);

// node_modules/@lit/reactive-element/decorators/property.js
var i$4 = (i3, e5) => "method" === e5.kind && e5.descriptor && !("value" in e5.descriptor) ? __spreadProps(__spreadValues({}, e5), { finisher(n2) {
  n2.createProperty(e5.key, i3);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e5.key, initializer() {
  "function" == typeof e5.initializer && (this[e5.key] = e5.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e5.key, i3);
} };
function e2$1(e5) {
  return (n2, t2) => void 0 !== t2 ? ((i3, e6, n3) => {
    e6.constructor.createProperty(n3, i3);
  })(e5, n2, t2) : i$4(e5, n2);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t$5(t2) {
  return e2$1(__spreadProps(__spreadValues({}, t2), { state: true }));
}

// node_modules/@lit/reactive-element/decorators/base.js
var o$6 = ({ finisher: e5, descriptor: t2 }) => (o2, n2) => {
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
function i2$2(i3, n2) {
  return o$6({ descriptor: (o2) => {
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
var n$8;
null != (null === (n$8 = window.HTMLSlotElement) || void 0 === n$8 ? void 0 : n$8.prototype.assignedElements) ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);

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
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    if (this.isButton()) {
      this.button.disabled = this.disabled;
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
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i$6`a` : i$6`button`;
    return n$9`
      <${tag}
        part="base"
        class=${o$7({
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
        ?disabled=${l$6(isLink ? void 0 : this.disabled)}
        type=${l$6(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${l$6(isLink ? void 0 : this.name)}
        value=${l$6(isLink ? void 0 : this.value)}
        href=${l$6(isLink ? this.href : void 0)}
        target=${l$6(isLink ? this.target : void 0)}
        download=${l$6(isLink ? this.download : void 0)}
        rel=${l$6(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${l$6(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? n$9` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? n$9`<sl-spinner></sl-spinner>` : ""}
      </${tag}>
    `;
  }
};
SlButton.styles = button_styles_default;
__decorateClass([
  i2$2(".button")
], SlButton.prototype, "button", 2);
__decorateClass([
  t$5()
], SlButton.prototype, "hasFocus", 2);
__decorateClass([
  t$5()
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
  e$7("sl-button")
], SlButton);

// src/components/spinner/spinner.styles.ts
var spinner_styles_default = i$7`
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
  e$7("sl-spinner")
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
var registry$1 = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry$1.find((lib) => lib.name === name);
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
var icon_styles_default = i$7`
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
var e4 = class extends i$5 {
  constructor(i2) {
    if (super(i2), this.it = b$2, i2.type !== t$6.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r) {
    if (r === b$2 || null == r)
      return this._t = void 0, this.it = r;
    if (r === x$2)
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
var o$5 = e$8(e4);

// node_modules/lit-html/directives/unsafe-svg.js
var t3 = class extends e4 {
};
t3.directiveName = "unsafeSVG", t3.resultType = 2;
var o2$1 = e$8(t3);

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
  render() {
    return y$1` ${o2$1(this.svg)} `;
  }
};
SlIcon.styles = icon_styles_default;
__decorateClass([
  t$5()
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
  e$7("sl-icon")
], SlIcon);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/components/icon-button/icon-button.styles.ts
var icon_button_styles_default = i$7`
  ${component_styles_default}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;

// src/components/icon-button/icon-button.ts
var SlIconButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.label = "";
    this.disabled = false;
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
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
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
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? i$6`a` : i$6`button`;
    return n$9`
      <${tag}
        part="base"
        class=${o$7({
      "icon-button": true,
      "icon-button--disabled": !isLink && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${l$6(isLink ? void 0 : this.disabled)}
        type=${l$6(isLink ? void 0 : "button")}
        href=${l$6(isLink ? this.href : void 0)}
        target=${l$6(isLink ? this.target : void 0)}
        download=${l$6(isLink ? this.download : void 0)}
        rel=${l$6(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${l$6(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${l$6(this.name)}
          library=${l$6(this.library)}
          src=${l$6(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
  }
};
SlIconButton.styles = icon_button_styles_default;
__decorateClass([
  i2$2(".icon-button")
], SlIconButton.prototype, "button", 2);
__decorateClass([
  t$5()
], SlIconButton.prototype, "hasFocus", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "library", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "src", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "href", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "target", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "download", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "label", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlIconButton.prototype, "disabled", 2);
SlIconButton = __decorateClass([
  e$7("sl-icon-button")
], SlIconButton);

// src/styles/form-control.styles.ts
var form_control_styles_default = i$7`
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
var input_styles_default = i$7`
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
var f$3 = {};
var s$8 = (o, l3 = f$3) => o._$AH = l3;

// node_modules/lit-html/directives/live.js
var l2$1 = e$8(class extends i$5 {
  constructor(r) {
    if (super(r), r.type !== t$6.PROPERTY && r.type !== t$6.ATTRIBUTE && r.type !== t$6.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!e2(r))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(r) {
    return r;
  }
  update(i2, [t2]) {
    if (t2 === x$2 || t2 === b$2)
      return t2;
    const o = i2.element, l3 = i2.name;
    if (i2.type === t$6.PROPERTY) {
      if (t2 === o[l3])
        return x$2;
    } else if (i2.type === t$6.BOOLEAN_ATTRIBUTE) {
      if (!!t2 === o.hasAttribute(l3))
        return x$2;
    } else if (i2.type === t$6.ATTRIBUTE && o.getAttribute(l3) === t2 + "")
      return x$2;
    return s$8(i2), t2;
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
      const converter = options.converter || n2$1;
      const fromAttribute = typeof converter === "function" ? converter : (_a = converter == null ? void 0 : converter.fromAttribute) != null ? _a : n2$1.fromAttribute;
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
    this.name = "";
    this.value = "";
    this.defaultValue = "";
    this.size = "medium";
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.helpText = "";
    this.clearable = false;
    this.disabled = false;
    this.placeholder = "";
    this.readonly = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.noSpinButtons = false;
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
    this.invalid = !this.checkValidity();
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
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.invalid = !this.checkValidity();
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
  handleDisabledChange() {
    this.input.disabled = this.disabled;
    this.invalid = !this.checkValidity();
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.invalid = !this.checkValidity();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.invalid = !this.checkValidity();
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
    this.invalid = !this.checkValidity();
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
        class=${o$7({
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
            class=${o$7({
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
              name=${l$6(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${l$6(this.placeholder)}
              minlength=${l$6(this.minlength)}
              maxlength=${l$6(this.maxlength)}
              min=${l$6(this.min)}
              max=${l$6(this.max)}
              step=${l$6(this.step)}
              .value=${l2$1(this.value)}
              autocapitalize=${l$6(this.type === "password" ? "off" : this.autocapitalize)}
              autocomplete=${l$6(this.type === "password" ? "off" : this.autocomplete)}
              autocorrect=${l$6(this.type === "password" ? "off" : this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${l$6(this.pattern)}
              enterkeyhint=${l$6(this.enterkeyhint)}
              inputmode=${l$6(this.inputmode)}
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
  i2$2(".input__control")
], SlInput.prototype, "input", 2);
__decorateClass([
  t$5()
], SlInput.prototype, "hasFocus", 2);
__decorateClass([
  t$5()
], SlInput.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "title", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlInput.prototype, "type", 2);
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
  e2$1({ reflect: true })
], SlInput.prototype, "size", 2);
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
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "disabled", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "placeholder", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "readonly", 2);
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
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "required", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "pattern", 2);
__decorateClass([
  e2$1({ type: Number })
], SlInput.prototype, "minlength", 2);
__decorateClass([
  e2$1({ type: Number })
], SlInput.prototype, "maxlength", 2);
__decorateClass([
  e2$1({ type: Number })
], SlInput.prototype, "min", 2);
__decorateClass([
  e2$1({ type: Number })
], SlInput.prototype, "max", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "step", 2);
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
  e$7("sl-input")
], SlInput);

// src/components/rating/rating.styles.ts
var rating_styles_default = i$7`
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
var i2$1 = e$8(class extends i$5 {
  constructor(t2) {
    var e2;
    if (super(t2), t2.type !== t$6.ATTRIBUTE || "style" !== t2.name || (null === (e2 = t2.strings) || void 0 === e2 ? void 0 : e2.length) > 2)
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
    return x$2;
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
  focus(options) {
    this.rating.focus(options);
  }
  blur() {
    this.rating.blur();
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
        class=${o$7({
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
                class=${o$7({
        rating__symbol: true,
        "rating__symbol--hover": this.isHovering && Math.ceil(displayValue) === index + 1
      })}
                role="presentation"
                @mouseenter=${this.handleMouseEnter}
              >
                ${o$5(this.getSymbol(index + 1))}
              </span>
            `;
    })}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${counter.map((index) => {
      return y$1`
              <span
                class=${o$7({
        rating__symbol: true,
        "rating__symbol--hover": this.isHovering && Math.ceil(displayValue) === index + 1
      })}
                style=${i2$1({
        clipPath: displayValue > index + 1 ? "none" : isRtl ? `inset(0 0 0 ${100 - (displayValue - index) / 1 * 100}%)` : `inset(0 ${100 - (displayValue - index) / 1 * 100}% 0 0)`
      })}
                role="presentation"
              >
                ${o$5(this.getSymbol(index + 1))}
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
  i2$2(".rating")
], SlRating.prototype, "rating", 2);
__decorateClass([
  t$5()
], SlRating.prototype, "hoverValue", 2);
__decorateClass([
  t$5()
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
  e$7("sl-rating")
], SlRating);

// src/components/radio-group/radio-group.styles.ts
var radio_group_styles_default = i$7`
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
  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }
  firstUpdated() {
    this.invalid = !this.validity.valid;
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
  handleValueChange() {
    if (this.hasUpdated) {
      this.updateCheckedRadio();
    }
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
        class=${o$7({
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
  i2$2("slot:not([name])")
], SlRadioGroup.prototype, "defaultSlot", 2);
__decorateClass([
  i2$2(".radio-group__validation-input")
], SlRadioGroup.prototype, "input", 2);
__decorateClass([
  t$5()
], SlRadioGroup.prototype, "hasButtonGroup", 2);
__decorateClass([
  t$5()
], SlRadioGroup.prototype, "errorMessage", 2);
__decorateClass([
  t$5()
], SlRadioGroup.prototype, "customErrorMessage", 2);
__decorateClass([
  t$5()
], SlRadioGroup.prototype, "defaultValue", 2);
__decorateClass([
  t$5()
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
  e$7("sl-radio-group")
], SlRadioGroup);

// src/components/button-group/button-group.styles.ts
var button_group_styles_default = i$7`
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
  i2$2("slot")
], SlButtonGroup.prototype, "defaultSlot", 2);
__decorateClass([
  t$5()
], SlButtonGroup.prototype, "disableRole", 2);
__decorateClass([
  e2$1()
], SlButtonGroup.prototype, "label", 2);
SlButtonGroup = __decorateClass([
  e$7("sl-button-group")
], SlButtonGroup);
function findButton(el) {
  var _a;
  const selector = "sl-button, sl-radio-button";
  return (_a = el.closest(selector)) != null ? _a : el.querySelector(selector);
}

// src/components/radio-button/radio-button.styles.ts
var radio_button_styles_default = i$7`
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
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  render() {
    return n$9`
      <div part="base" role="presentation">
        <button
          part="${`button${this.checked ? " button--checked" : ""}`}"
          role="radio"
          aria-checked="${this.checked}"
          class=${o$7({
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
          value=${l$6(this.value)}
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
  i2$2(".button")
], SlRadioButton.prototype, "input", 2);
__decorateClass([
  i2$2(".hidden-input")
], SlRadioButton.prototype, "hiddenInput", 2);
__decorateClass([
  t$5()
], SlRadioButton.prototype, "hasFocus", 2);
__decorateClass([
  t$5()
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
  e$7("sl-radio-button")
], SlRadioButton);

// src/components/badge/badge.styles.ts
var badge_styles_default = i$7`
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
        class=${o$7({
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
  e$7("sl-badge")
], SlBadge);

// src/components/avatar/avatar.styles.ts
var avatar_styles_default = i$7`
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
        class=${o$7({
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
  t$5()
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
  e$7("sl-avatar")
], SlAvatar);

// src/internal/event.ts
function waitForEvent(el, eventName) {
  return new Promise((resolve) => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}

// src/internal/animate.ts
function animateTo(el, keyframes, options) {
  return new Promise((resolve) => {
    if ((options == null ? void 0 : options.duration) === Infinity) {
      throw new Error("Promise-based animations must be finite.");
    }
    const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
      duration: prefersReducedMotion() ? 0 : options.duration
    }));
    animation.addEventListener("cancel", resolve, { once: true });
    animation.addEventListener("finish", resolve, { once: true });
  });
}
function parseDuration(delay) {
  delay = delay.toString().toLowerCase();
  if (delay.indexOf("ms") > -1) {
    return parseFloat(delay);
  }
  if (delay.indexOf("s") > -1) {
    return parseFloat(delay) * 1e3;
  }
  return parseFloat(delay);
}
function prefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}
function stopAnimations(el) {
  return Promise.all(
    el.getAnimations().map((animation) => {
      return new Promise((resolve) => {
        const handleAnimationEvent = requestAnimationFrame(resolve);
        animation.addEventListener("cancel", () => handleAnimationEvent, { once: true });
        animation.addEventListener("finish", () => handleAnimationEvent, { once: true });
        animation.cancel();
      });
    })
  );
}

// src/utilities/animation-registry.ts
var defaultAnimationRegistry = /* @__PURE__ */ new Map();
var customAnimationRegistry = /* @__PURE__ */ new WeakMap();
function ensureAnimation(animation) {
  return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
}
function getLogicalAnimation(animation, dir) {
  if (dir.toLowerCase() === "rtl") {
    return {
      keyframes: animation.rtlKeyframes || animation.keyframes,
      options: animation.options
    };
  }
  return animation;
}
function setDefaultAnimation(animationName, animation) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}
function getAnimation(el, animationName, options) {
  const customAnimation = customAnimationRegistry.get(el);
  if (customAnimation == null ? void 0 : customAnimation[animationName]) {
    return getLogicalAnimation(customAnimation[animationName], options.dir);
  }
  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return getLogicalAnimation(defaultAnimation, options.dir);
  }
  return {
    keyframes: [],
    options: { duration: 0 }
  };
}

// src/components/alert/alert.styles.ts
var alert_styles_default = i$7`
  ${component_styles_default}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    padding-inline-end: var(--sl-spacing-medium);
  }
`;

// src/components/alert/alert.ts
var toastStack = Object.assign(document.createElement("div"), { className: "sl-toast-stack" });
var SlAlert = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "icon", "suffix");
    this.localize = new LocalizeController2(this);
    this.open = false;
    this.closable = false;
    this.variant = "primary";
    this.duration = Infinity;
  }
  firstUpdated() {
    this.base.hidden = !this.open;
  }
  restartAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = window.setTimeout(() => this.hide(), this.duration);
    }
  }
  handleCloseClick() {
    this.hide();
  }
  handleMouseMove() {
    this.restartAutoHide();
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show");
      if (this.duration < Infinity) {
        this.restartAutoHide();
      }
      await stopAnimations(this.base);
      this.base.hidden = false;
      const { keyframes, options } = getAnimation(this, "alert.show", { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      clearTimeout(this.autoHideTimeout);
      await stopAnimations(this.base);
      const { keyframes, options } = getAnimation(this, "alert.hide", { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);
      this.base.hidden = true;
      this.emit("sl-after-hide");
    }
  }
  handleDurationChange() {
    this.restartAutoHide();
  }
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  async toast() {
    return new Promise((resolve) => {
      if (toastStack.parentElement === null) {
        document.body.append(toastStack);
      }
      toastStack.appendChild(this);
      requestAnimationFrame(() => {
        this.clientWidth;
        this.show();
      });
      this.addEventListener(
        "sl-after-hide",
        () => {
          toastStack.removeChild(this);
          resolve();
          if (toastStack.querySelector("sl-alert") === null) {
            toastStack.remove();
          }
        },
        { once: true }
      );
    });
  }
  render() {
    return y$1`
      <div
        part="base"
        class=${o$7({
      alert: true,
      "alert--open": this.open,
      "alert--closable": this.closable,
      "alert--has-icon": this.hasSlotController.test("icon"),
      "alert--primary": this.variant === "primary",
      "alert--success": this.variant === "success",
      "alert--neutral": this.variant === "neutral",
      "alert--warning": this.variant === "warning",
      "alert--danger": this.variant === "danger"
    })}
        role="alert"
        aria-hidden=${this.open ? "false" : "true"}
        @mousemove=${this.handleMouseMove}
      >
        <slot name="icon" part="icon" class="alert__icon"></slot>

        <slot part="message" class="alert__message" aria-live="polite"></slot>

        ${this.closable ? y$1`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
  }
};
SlAlert.styles = alert_styles_default;
__decorateClass([
  i2$2('[part~="base"]')
], SlAlert.prototype, "base", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlAlert.prototype, "open", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlAlert.prototype, "closable", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlAlert.prototype, "variant", 2);
__decorateClass([
  e2$1({ type: Number })
], SlAlert.prototype, "duration", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlAlert.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("duration")
], SlAlert.prototype, "handleDurationChange", 1);
SlAlert = __decorateClass([
  e$7("sl-alert")
], SlAlert);
setDefaultAnimation("alert.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("alert.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 250, easing: "ease" }
});

// src/components/card/card.styles.ts
var card_styles_default = i$7`
  ${component_styles_default}

  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`;

// src/components/card/card.ts
var SlCard = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer", "header", "image");
  }
  render() {
    return y$1`
      <div
        part="base"
        class=${o$7({
      card: true,
      "card--has-footer": this.hasSlotController.test("footer"),
      "card--has-image": this.hasSlotController.test("image"),
      "card--has-header": this.hasSlotController.test("header")
    })}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `;
  }
};
SlCard.styles = card_styles_default;
SlCard = __decorateClass([
  e$7("sl-card")
], SlCard);

// src/components/divider/divider.styles.ts
var divider_styles_default = i$7`
  ${component_styles_default}

  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;

// src/components/divider/divider.ts
var SlDivider = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
};
SlDivider.styles = divider_styles_default;
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlDivider.prototype, "vertical", 2);
__decorateClass([
  watch("vertical")
], SlDivider.prototype, "handleVerticalChange", 1);
SlDivider = __decorateClass([
  e$7("sl-divider")
], SlDivider);

// src/components/textarea/textarea.styles.ts
var textarea_styles_default = i$7`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;

// src/components/textarea/textarea.ts
var SlTextarea = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this);
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.name = "";
    this.value = "";
    this.size = "medium";
    this.filled = false;
    this.label = "";
    this.helpText = "";
    this.placeholder = "";
    this.rows = 4;
    this.resize = "vertical";
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.spellcheck = true;
    this.defaultValue = "";
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
    this.updateComplete.then(() => {
      this.setTextareaHeight();
      this.resizeObserver.observe(this.input);
    });
  }
  firstUpdated() {
    this.invalid = !this.checkValidity();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this.input);
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.setTextareaHeight();
    this.emit("sl-change");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.emit("sl-input");
  }
  setTextareaHeight() {
    if (this.resize === "auto") {
      this.input.style.height = "auto";
      this.input.style.height = `${this.input.scrollHeight}px`;
    } else {
      this.input.style.height = void 0;
    }
  }
  handleDisabledChange() {
    this.input.disabled = this.disabled;
    this.invalid = !this.checkValidity();
  }
  handleRowsChange() {
    this.setTextareaHeight();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.invalid = !this.checkValidity();
    this.setTextareaHeight();
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
  scrollPosition(position) {
    if (position) {
      if (typeof position.top === "number")
        this.input.scrollTop = position.top;
      if (typeof position.left === "number")
        this.input.scrollLeft = position.left;
      return void 0;
    }
    return {
      top: this.input.scrollTop,
      left: this.input.scrollTop
    };
  }
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  setRangeText(replacement, start, end, selectMode) {
    this.input.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaHeight();
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
    this.invalid = !this.checkValidity();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    return y$1`
      <div
        part="form-control"
        class=${o$7({
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
            class=${o$7({
      textarea: true,
      "textarea--small": this.size === "small",
      "textarea--medium": this.size === "medium",
      "textarea--large": this.size === "large",
      "textarea--standard": !this.filled,
      "textarea--filled": this.filled,
      "textarea--disabled": this.disabled,
      "textarea--focused": this.hasFocus,
      "textarea--empty": !this.value,
      "textarea--invalid": this.invalid,
      "textarea--resize-none": this.resize === "none",
      "textarea--resize-vertical": this.resize === "vertical",
      "textarea--resize-auto": this.resize === "auto"
    })}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${l$6(this.name)}
              .value=${l2$1(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${l$6(this.placeholder)}
              rows=${l$6(this.rows)}
              minlength=${l$6(this.minlength)}
              maxlength=${l$6(this.maxlength)}
              autocapitalize=${l$6(this.autocapitalize)}
              autocorrect=${l$6(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${l$6(this.spellcheck)}
              enterkeyhint=${l$6(this.enterkeyhint)}
              inputmode=${l$6(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
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
    `;
  }
};
SlTextarea.styles = textarea_styles_default;
__decorateClass([
  i2$2(".textarea__control")
], SlTextarea.prototype, "input", 2);
__decorateClass([
  t$5()
], SlTextarea.prototype, "hasFocus", 2);
__decorateClass([
  t$5()
], SlTextarea.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "title", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "value", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlTextarea.prototype, "size", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTextarea.prototype, "filled", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "label", 2);
__decorateClass([
  e2$1({ attribute: "help-text" })
], SlTextarea.prototype, "helpText", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "placeholder", 2);
__decorateClass([
  e2$1({ type: Number })
], SlTextarea.prototype, "rows", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "resize", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTextarea.prototype, "disabled", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTextarea.prototype, "readonly", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTextarea.prototype, "required", 2);
__decorateClass([
  e2$1({ type: Number })
], SlTextarea.prototype, "minlength", 2);
__decorateClass([
  e2$1({ type: Number })
], SlTextarea.prototype, "maxlength", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "autocapitalize", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "autocorrect", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "autocomplete", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlTextarea.prototype, "autofocus", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "enterkeyhint", 2);
__decorateClass([
  e2$1({
    type: Boolean,
    converter: {
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], SlTextarea.prototype, "spellcheck", 2);
__decorateClass([
  e2$1()
], SlTextarea.prototype, "inputmode", 2);
__decorateClass([
  defaultValue()
], SlTextarea.prototype, "defaultValue", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlTextarea.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("rows", { waitUntilFirstUpdate: true })
], SlTextarea.prototype, "handleRowsChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlTextarea.prototype, "handleValueChange", 1);
SlTextarea = __decorateClass([
  e$7("sl-textarea")
], SlTextarea);

// src/components/select/select.styles.ts
var select_styles_default = i$7`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix */
  .select__prefix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  /* Clear button */
  .select__clear {
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

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox::slotted(small) {
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;

// src/internal/offset.ts
function getOffset(element, parent) {
  return {
    top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
    left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
  };
}

// src/internal/scroll.ts
var locks = /* @__PURE__ */ new Set();
function lockBodyScrolling(lockingEl) {
  locks.add(lockingEl);
  document.body.classList.add("sl-scroll-lock");
}
function unlockBodyScrolling(lockingEl) {
  locks.delete(lockingEl);
  if (locks.size === 0) {
    document.body.classList.remove("sl-scroll-lock");
  }
}
function scrollIntoView(element, container, direction = "vertical", behavior = "smooth") {
  const offset = getOffset(element, container);
  const offsetTop = offset.top + container.scrollTop;
  const offsetLeft = offset.left + container.scrollLeft;
  const minX = container.scrollLeft;
  const maxX = container.scrollLeft + container.offsetWidth;
  const minY = container.scrollTop;
  const maxY = container.scrollTop + container.offsetHeight;
  if (direction === "horizontal" || direction === "both") {
    if (offsetLeft < minX) {
      container.scrollTo({ left: offsetLeft, behavior });
    } else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior });
    }
  }
  if (direction === "vertical" || direction === "both") {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior });
    } else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior });
    }
  }
}

// src/components/select/select.ts
var SlSelect = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this);
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.localize = new LocalizeController2(this);
    this.typeToSelectString = "";
    this.hasFocus = false;
    this.displayLabel = "";
    this.selectedOptions = [];
    this.invalid = false;
    this.name = "";
    this.value = "";
    this.defaultValue = "";
    this.size = "medium";
    this.placeholder = "";
    this.multiple = false;
    this.maxOptionsVisible = 3;
    this.disabled = false;
    this.clearable = false;
    this.open = false;
    this.hoist = false;
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.placement = "bottom";
    this.helpText = "";
    this.required = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleDocumentFocusIn = this.handleDocumentFocusIn.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    this.open = false;
  }
  addOpenListeners() {
    document.addEventListener("focusin", this.handleDocumentFocusIn);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
  }
  removeOpenListeners() {
    document.removeEventListener("focusin", this.handleDocumentFocusIn);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
  }
  handleFocus() {
    this.hasFocus = true;
    this.displayInput.setSelectionRange(0, 0);
    this.emit("sl-focus");
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleDocumentFocusIn(event) {
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.hide();
    }
  }
  handleDocumentKeyDown(event) {
    const target = event.target;
    const isClearButton = target.closest(".select__clear") !== null;
    const isIconButton = target.closest("sl-icon-button") !== null;
    if (isClearButton || isIconButton) {
      return;
    }
    if (event.key === "Escape" && this.open) {
      event.preventDefault();
      event.stopPropagation();
      this.hide();
      this.displayInput.focus({ preventScroll: true });
    }
    if (event.key === "Enter" || event.key === " " && this.typeToSelectString === "") {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!this.open) {
        this.show();
        return;
      }
      if (this.currentOption && !this.currentOption.disabled) {
        if (this.multiple) {
          this.toggleOptionSelection(this.currentOption);
        } else {
          this.setSelectedOptions(this.currentOption);
        }
        this.emit("sl-input");
        this.emit("sl-change");
        if (!this.multiple) {
          this.hide();
          this.displayInput.focus({ preventScroll: true });
        }
      }
      return;
    }
    if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      const allOptions = this.getAllOptions();
      const currentIndex = allOptions.indexOf(this.currentOption);
      let newIndex = Math.max(0, currentIndex);
      event.preventDefault();
      if (!this.open) {
        this.show();
        if (this.currentOption) {
          return;
        }
      }
      if (event.key === "ArrowDown") {
        newIndex = currentIndex + 1;
        if (newIndex > allOptions.length - 1)
          newIndex = 0;
      } else if (event.key === "ArrowUp") {
        newIndex = currentIndex - 1;
        if (newIndex < 0)
          newIndex = allOptions.length - 1;
      } else if (event.key === "Home") {
        newIndex = 0;
      } else if (event.key === "End") {
        newIndex = allOptions.length - 1;
      }
      this.setCurrentOption(allOptions[newIndex]);
    }
    if (event.key.length === 1 || event.key === "Backspace") {
      const allOptions = this.getAllOptions();
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      if (!this.open) {
        if (event.key === "Backspace") {
          return;
        }
        this.show();
      }
      event.stopPropagation();
      event.preventDefault();
      clearTimeout(this.typeToSelectTimeout);
      this.typeToSelectTimeout = window.setTimeout(() => this.typeToSelectString = "", 1e3);
      if (event.key === "Backspace") {
        this.typeToSelectString = this.typeToSelectString.slice(0, -1);
      } else {
        this.typeToSelectString += event.key.toLowerCase();
      }
      for (const option of allOptions) {
        const label = option.getTextLabel().toLowerCase();
        if (label.startsWith(this.typeToSelectString)) {
          this.setCurrentOption(option);
          break;
        }
      }
    }
  }
  handleDocumentMouseDown(event) {
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      this.hide();
    }
  }
  handleLabelClick() {
    this.displayInput.focus();
  }
  handleComboboxMouseDown(event) {
    const path = event.composedPath();
    const isIconButton = path.some((el) => el instanceof Element && el.tagName.toLowerCase() === "sl-icon-button");
    if (this.disabled || isIconButton) {
      return;
    }
    event.preventDefault();
    this.displayInput.focus({ preventScroll: true });
    this.open = !this.open;
  }
  handleComboboxKeyDown(event) {
    event.stopPropagation();
    this.handleDocumentKeyDown(event);
  }
  handleClearClick(event) {
    event.stopPropagation();
    if (this.value !== "") {
      this.setSelectedOptions([]);
      this.displayInput.focus({ preventScroll: true });
      this.emit("sl-clear");
      this.emit("sl-input");
      this.emit("sl-change");
    }
  }
  handleClearMouseDown(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  handleOptionClick(event) {
    const target = event.target;
    const option = target.closest("sl-option");
    const oldValue = this.value;
    if (option && !option.disabled) {
      if (this.multiple) {
        this.toggleOptionSelection(option);
      } else {
        this.setSelectedOptions(option);
      }
      this.updateComplete.then(() => this.displayInput.focus({ preventScroll: true }));
      if (this.value !== oldValue) {
        this.emit("sl-input");
        this.emit("sl-change");
      }
      if (!this.multiple) {
        this.hide();
        this.displayInput.focus({ preventScroll: true });
      }
    }
  }
  handleDefaultSlotChange() {
    const allOptions = this.getAllOptions();
    const value = Array.isArray(this.value) ? this.value : [this.value];
    const values = [];
    allOptions.forEach((option) => {
      if (values.includes(option.value)) {
        console.error(
          `An option with duplicate values has been found in <sl-select>. All options must have unique values.`,
          option
        );
      }
      values.push(option.value);
    });
    this.setSelectedOptions(allOptions.filter((el) => value.includes(el.value)));
  }
  getAllOptions() {
    return [...this.querySelectorAll("sl-option")];
  }
  getFirstOption() {
    return this.querySelector("sl-option");
  }
  setCurrentOption(option) {
    const allOptions = this.getAllOptions();
    allOptions.forEach((el) => {
      el.current = false;
      el.tabIndex = -1;
    });
    if (option) {
      this.currentOption = option;
      option.current = true;
      option.tabIndex = 0;
      option.focus();
      scrollIntoView(option, this.listbox);
    }
  }
  setSelectedOptions(option) {
    const allOptions = this.getAllOptions();
    const newSelectedOptions = Array.isArray(option) ? option : [option];
    allOptions.forEach((el) => el.selected = false);
    if (newSelectedOptions.length) {
      newSelectedOptions.forEach((el) => el.selected = true);
      scrollIntoView(newSelectedOptions[0], this.listbox);
    }
    this.selectionChanged();
  }
  toggleOptionSelection(option, force) {
    if (force === true || force === false) {
      option.selected = force;
    } else {
      option.selected = !option.selected;
    }
    this.selectionChanged();
  }
  selectionChanged() {
    var _a, _b, _c, _d;
    this.selectedOptions = this.getAllOptions().filter((el) => el.selected);
    if (this.multiple) {
      this.value = this.selectedOptions.map((el) => el.value);
      this.displayLabel = this.localize.term("numOptionsSelected", this.selectedOptions.length);
    } else {
      this.value = (_b = (_a = this.selectedOptions[0]) == null ? void 0 : _a.value) != null ? _b : "";
      this.displayLabel = (_d = (_c = this.selectedOptions[0]) == null ? void 0 : _c.getTextLabel()) != null ? _d : "";
    }
    this.updateComplete.then(() => this.invalid = !this.checkValidity());
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.open = false;
      this.handleOpenChange();
    }
  }
  handleValueChange() {
    const allOptions = this.getAllOptions();
    const value = Array.isArray(this.value) ? this.value : [this.value];
    this.setSelectedOptions(allOptions.filter((el) => value.includes(el.value)));
  }
  async handleOpenChange() {
    if (this.open && !this.disabled) {
      this.setCurrentOption(this.selectedOptions[0] || this.getFirstOption());
      this.emit("sl-show");
      this.addOpenListeners();
      await stopAnimations(this);
      this.listbox.hidden = false;
      this.popup.active = true;
      requestAnimationFrame(() => {
        this.setCurrentOption(this.currentOption);
      });
      const { keyframes, options } = getAnimation(this, "select.show", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      if (this.currentOption) {
        scrollIntoView(this.currentOption, this.listbox, "vertical", "auto");
      }
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      this.removeOpenListeners();
      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, "select.hide", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.listbox.hidden = true;
      this.popup.active = false;
      this.emit("sl-after-hide");
    }
  }
  async show() {
    if (this.open || this.disabled) {
      this.open = false;
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open || this.disabled) {
      this.open = false;
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  checkValidity() {
    return this.valueInput.checkValidity();
  }
  reportValidity() {
    return this.valueInput.reportValidity();
  }
  setCustomValidity(message) {
    this.valueInput.setCustomValidity(message);
    this.invalid = !this.valueInput.checkValidity();
  }
  focus(options) {
    this.displayInput.focus(options);
  }
  blur() {
    this.displayInput.blur();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && this.value.length > 0;
    return y$1`
      <div
        part="form-control"
        class=${o$7({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${o$7({
      select: true,
      "select--standard": true,
      "select--filled": this.filled,
      "select--pill": this.pill,
      "select--open": this.open,
      "select--disabled": this.disabled,
      "select--multiple": this.multiple,
      "select--focused": this.hasFocus,
      "select--top": this.placement === "top",
      "select--bottom": this.placement === "bottom",
      "select--small": this.size === "small",
      "select--medium": this.size === "medium",
      "select--large": this.size === "large"
    })}
            placement=${this.placement}
            strategy=${this.hoist ? "fixed" : "absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open ? "true" : "false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple ? y$1`
                    <div part="tags" class="select__tags">
                      ${this.selectedOptions.map((option, index) => {
      if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
        return y$1`
                            <sl-tag
                              size=${this.size}
                              removable
                              @sl-remove=${(event) => {
          event.stopPropagation();
          if (!this.disabled) {
            this.toggleOptionSelection(option, false);
          }
        }}
                            >
                              ${option.getTextLabel()}
                            </sl-tag>
                          `;
      } else if (index === this.maxOptionsVisible) {
        return y$1` <sl-tag size=${this.size}> +${this.selectedOptions.length - index} </sl-tag> `;
      } else {
        return null;
      }
    })}
                    </div>
                  ` : ""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value) ? this.value.join(", ") : this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${() => this.focus()}
              />

              ${hasClearIcon ? y$1`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  ` : ""}

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <slot
              id="listbox"
              role="listbox"
              aria-expanded=${this.open ? "true" : "false"}
              aria-multiselectable=${this.multiple ? "true" : "false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            ></slot>
          </sl-popup>

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
SlSelect.styles = select_styles_default;
__decorateClass([
  i2$2(".select")
], SlSelect.prototype, "popup", 2);
__decorateClass([
  i2$2(".select__combobox")
], SlSelect.prototype, "combobox", 2);
__decorateClass([
  i2$2(".select__display-input")
], SlSelect.prototype, "displayInput", 2);
__decorateClass([
  i2$2(".select__value-input")
], SlSelect.prototype, "valueInput", 2);
__decorateClass([
  i2$2(".select__listbox")
], SlSelect.prototype, "listbox", 2);
__decorateClass([
  t$5()
], SlSelect.prototype, "hasFocus", 2);
__decorateClass([
  t$5()
], SlSelect.prototype, "displayLabel", 2);
__decorateClass([
  t$5()
], SlSelect.prototype, "currentOption", 2);
__decorateClass([
  t$5()
], SlSelect.prototype, "selectedOptions", 2);
__decorateClass([
  t$5()
], SlSelect.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlSelect.prototype, "name", 2);
__decorateClass([
  e2$1({
    converter: {
      fromAttribute: (value) => value.split(" "),
      toAttribute: (value) => value.join(" ")
    }
  })
], SlSelect.prototype, "value", 2);
__decorateClass([
  defaultValue()
], SlSelect.prototype, "defaultValue", 2);
__decorateClass([
  e2$1()
], SlSelect.prototype, "size", 2);
__decorateClass([
  e2$1()
], SlSelect.prototype, "placeholder", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSelect.prototype, "multiple", 2);
__decorateClass([
  e2$1({ attribute: "max-options-visible", type: Number })
], SlSelect.prototype, "maxOptionsVisible", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSelect.prototype, "disabled", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlSelect.prototype, "clearable", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSelect.prototype, "open", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlSelect.prototype, "hoist", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSelect.prototype, "filled", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSelect.prototype, "pill", 2);
__decorateClass([
  e2$1()
], SlSelect.prototype, "label", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlSelect.prototype, "placement", 2);
__decorateClass([
  e2$1({ attribute: "help-text" })
], SlSelect.prototype, "helpText", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSelect.prototype, "required", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleValueChange", 1);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleOpenChange", 1);
SlSelect = __decorateClass([
  e$7("sl-select")
], SlSelect);
setDefaultAnimation("select.show", {
  keyframes: [
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 100, easing: "ease" }
});
setDefaultAnimation("select.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.9 }
  ],
  options: { duration: 100, easing: "ease" }
});

// src/components/tag/tag.styles.ts
var tag_styles_default = i$7`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;

// src/components/tag/tag.ts
var SlTag = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.variant = "neutral";
    this.size = "medium";
    this.pill = false;
    this.removable = false;
  }
  handleRemoveClick() {
    this.emit("sl-remove");
  }
  render() {
    return y$1`
      <span
        part="base"
        class=${o$7({
      tag: true,
      "tag--primary": this.variant === "primary",
      "tag--success": this.variant === "success",
      "tag--neutral": this.variant === "neutral",
      "tag--warning": this.variant === "warning",
      "tag--danger": this.variant === "danger",
      "tag--text": this.variant === "text",
      "tag--small": this.size === "small",
      "tag--medium": this.size === "medium",
      "tag--large": this.size === "large",
      "tag--pill": this.pill,
      "tag--removable": this.removable
    })}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable ? y$1`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </span>
    `;
  }
};
SlTag.styles = tag_styles_default;
__decorateClass([
  e2$1({ reflect: true })
], SlTag.prototype, "variant", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlTag.prototype, "size", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTag.prototype, "pill", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlTag.prototype, "removable", 2);
SlTag = __decorateClass([
  e$7("sl-tag")
], SlTag);

// src/components/popup/popup.styles.ts
var popup_styles_default = i$7`
  ${component_styles_default}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }
`;

// node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs
function t$4(t2) {
  return t2.split("-")[0];
}
function e3(t2) {
  return t2.split("-")[1];
}
function n$7(e4) {
  return ["top", "bottom"].includes(t$4(e4)) ? "x" : "y";
}
function r$5(t2) {
  return "y" === t2 ? "height" : "width";
}
function i2(i4, o4, a3) {
  let { reference: l3, floating: s3 } = i4;
  const c3 = l3.x + l3.width / 2 - s3.width / 2, f3 = l3.y + l3.height / 2 - s3.height / 2, u3 = n$7(o4), m3 = r$5(u3), g3 = l3[m3] / 2 - s3[m3] / 2, d3 = "x" === u3;
  let p3;
  switch (t$4(o4)) {
    case "top":
      p3 = { x: c3, y: l3.y - s3.height };
      break;
    case "bottom":
      p3 = { x: c3, y: l3.y + l3.height };
      break;
    case "right":
      p3 = { x: l3.x + l3.width, y: f3 };
      break;
    case "left":
      p3 = { x: l3.x - s3.width, y: f3 };
      break;
    default:
      p3 = { x: l3.x, y: l3.y };
  }
  switch (e3(o4)) {
    case "start":
      p3[u3] -= g3 * (a3 && d3 ? -1 : 1);
      break;
    case "end":
      p3[u3] += g3 * (a3 && d3 ? -1 : 1);
  }
  return p3;
}
var o2 = async (t2, e4, n3) => {
  const { placement: r3 = "bottom", strategy: o4 = "absolute", middleware: a3 = [], platform: l3 } = n3, s3 = a3.filter(Boolean), c3 = await (null == l3.isRTL ? void 0 : l3.isRTL(e4));
  let f3 = await l3.getElementRects({ reference: t2, floating: e4, strategy: o4 }), { x: u3, y: m3 } = i2(f3, r3, c3), g3 = r3, d3 = {}, p3 = 0;
  for (let n4 = 0; n4 < s3.length; n4++) {
    const { name: a4, fn: h3 } = s3[n4], { x: y4, y: x3, data: w3, reset: v3 } = await h3({ x: u3, y: m3, initialPlacement: r3, placement: g3, strategy: o4, middlewareData: d3, rects: f3, platform: l3, elements: { reference: t2, floating: e4 } });
    u3 = null != y4 ? y4 : u3, m3 = null != x3 ? x3 : m3, d3 = __spreadProps(__spreadValues({}, d3), { [a4]: __spreadValues(__spreadValues({}, d3[a4]), w3) }), v3 && p3 <= 50 && (p3++, "object" == typeof v3 && (v3.placement && (g3 = v3.placement), v3.rects && (f3 = true === v3.rects ? await l3.getElementRects({ reference: t2, floating: e4, strategy: o4 }) : v3.rects), { x: u3, y: m3 } = i2(f3, g3, c3)), n4 = -1);
  }
  return { x: u3, y: m3, placement: g3, strategy: o4, middlewareData: d3 };
};
function a$2(t2) {
  return "number" != typeof t2 ? function(t3) {
    return __spreadValues({ top: 0, right: 0, bottom: 0, left: 0 }, t3);
  }(t2) : { top: t2, right: t2, bottom: t2, left: t2 };
}
function l$5(t2) {
  return __spreadProps(__spreadValues({}, t2), { top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height });
}
async function s$7(t2, e4) {
  var n3;
  void 0 === e4 && (e4 = {});
  const { x: r3, y: i4, platform: o4, rects: s3, elements: c3, strategy: f3 } = t2, { boundary: u3 = "clippingAncestors", rootBoundary: m3 = "viewport", elementContext: g3 = "floating", altBoundary: d3 = false, padding: p3 = 0 } = e4, h3 = a$2(p3), y4 = c3[d3 ? "floating" === g3 ? "reference" : "floating" : g3], x3 = l$5(await o4.getClippingRect({ element: null == (n3 = await (null == o4.isElement ? void 0 : o4.isElement(y4))) || n3 ? y4 : y4.contextElement || await (null == o4.getDocumentElement ? void 0 : o4.getDocumentElement(c3.floating)), boundary: u3, rootBoundary: m3, strategy: f3 })), w3 = l$5(o4.convertOffsetParentRelativeRectToViewportRelativeRect ? await o4.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: "floating" === g3 ? __spreadProps(__spreadValues({}, s3.floating), { x: r3, y: i4 }) : s3.reference, offsetParent: await (null == o4.getOffsetParent ? void 0 : o4.getOffsetParent(c3.floating)), strategy: f3 }) : s3[g3]);
  return { top: x3.top - w3.top + h3.top, bottom: w3.bottom - x3.bottom + h3.bottom, left: x3.left - w3.left + h3.left, right: w3.right - x3.right + h3.right };
}
var c$6 = Math.min;
var f$2 = Math.max;
function u$3(t2, e4, n3) {
  return f$2(t2, c$6(e4, n3));
}
var m$2 = (t2) => ({ name: "arrow", options: t2, async fn(i4) {
  const { element: o4, padding: l3 = 0 } = null != t2 ? t2 : {}, { x: s3, y: c3, placement: f3, rects: m3, platform: g3 } = i4;
  if (null == o4)
    return {};
  const d3 = a$2(l3), p3 = { x: s3, y: c3 }, h3 = n$7(f3), y4 = e3(f3), x3 = r$5(h3), w3 = await g3.getDimensions(o4), v3 = "y" === h3 ? "top" : "left", b3 = "y" === h3 ? "bottom" : "right", R2 = m3.reference[x3] + m3.reference[h3] - p3[h3] - m3.floating[x3], A2 = p3[h3] - m3.reference[h3], P2 = await (null == g3.getOffsetParent ? void 0 : g3.getOffsetParent(o4));
  let T3 = P2 ? "y" === h3 ? P2.clientHeight || 0 : P2.clientWidth || 0 : 0;
  0 === T3 && (T3 = m3.floating[x3]);
  const O3 = R2 / 2 - A2 / 2, L3 = d3[v3], D3 = T3 - w3[x3] - d3[b3], k2 = T3 / 2 - w3[x3] / 2 + O3, E3 = u$3(L3, k2, D3), B = ("start" === y4 ? d3[v3] : d3[b3]) > 0 && k2 !== E3 && m3.reference[x3] <= m3.floating[x3];
  return { [h3]: p3[h3] - (B ? k2 < L3 ? L3 - k2 : D3 - k2 : 0), data: { [h3]: E3, centerOffset: k2 - E3 } };
} });
var g$1 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function d$2(t2) {
  return t2.replace(/left|right|bottom|top/g, (t3) => g$1[t3]);
}
function p$2(t2, i4, o4) {
  void 0 === o4 && (o4 = false);
  const a3 = e3(t2), l3 = n$7(t2), s3 = r$5(l3);
  let c3 = "x" === l3 ? a3 === (o4 ? "end" : "start") ? "right" : "left" : "start" === a3 ? "bottom" : "top";
  return i4.reference[s3] > i4.floating[s3] && (c3 = d$2(c3)), { main: c3, cross: d$2(c3) };
}
var h$4 = { start: "end", end: "start" };
function y2(t2) {
  return t2.replace(/start|end/g, (t3) => h$4[t3]);
}
var x$1 = ["top", "right", "bottom", "left"];
x$1.reduce((t2, e4) => t2.concat(e4, e4 + "-start", e4 + "-end"), []);
var b$1 = function(e4) {
  return void 0 === e4 && (e4 = {}), { name: "flip", options: e4, async fn(n3) {
    var r3;
    const { placement: i4, middlewareData: o4, rects: a3, initialPlacement: l3, platform: c3, elements: f3 } = n3, _a = e4, { mainAxis: u3 = true, crossAxis: m3 = true, fallbackPlacements: g3, fallbackStrategy: h3 = "bestFit", flipAlignment: x3 = true } = _a, w3 = __objRest(_a, ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "flipAlignment"]), v3 = t$4(i4), b3 = g3 || (v3 === l3 || !x3 ? [d$2(l3)] : function(t2) {
      const e5 = d$2(t2);
      return [y2(t2), e5, y2(e5)];
    }(l3)), R2 = [l3, ...b3], A2 = await s$7(n3, w3), P2 = [];
    let T3 = (null == (r3 = o4.flip) ? void 0 : r3.overflows) || [];
    if (u3 && P2.push(A2[v3]), m3) {
      const { main: t2, cross: e5 } = p$2(i4, a3, await (null == c3.isRTL ? void 0 : c3.isRTL(f3.floating)));
      P2.push(A2[t2], A2[e5]);
    }
    if (T3 = [...T3, { placement: i4, overflows: P2 }], !P2.every((t2) => t2 <= 0)) {
      var O3, L3;
      const t2 = (null != (O3 = null == (L3 = o4.flip) ? void 0 : L3.index) ? O3 : 0) + 1, e5 = R2[t2];
      if (e5)
        return { data: { index: t2, overflows: T3 }, reset: { placement: e5 } };
      let n4 = "bottom";
      switch (h3) {
        case "bestFit": {
          var D3;
          const t3 = null == (D3 = T3.map((t4) => [t4, t4.overflows.filter((t5) => t5 > 0).reduce((t5, e6) => t5 + e6, 0)]).sort((t4, e6) => t4[1] - e6[1])[0]) ? void 0 : D3[0].placement;
          t3 && (n4 = t3);
          break;
        }
        case "initialPlacement":
          n4 = l3;
      }
      if (i4 !== n4)
        return { reset: { placement: n4 } };
    }
    return {};
  } };
};
var T$1 = function(r3) {
  return void 0 === r3 && (r3 = 0), { name: "offset", options: r3, async fn(i4) {
    const { x: o4, y: a3 } = i4, l3 = await async function(r4, i5) {
      const { placement: o5, platform: a4, elements: l4 } = r4, s3 = await (null == a4.isRTL ? void 0 : a4.isRTL(l4.floating)), c3 = t$4(o5), f3 = e3(o5), u3 = "x" === n$7(o5), m3 = ["left", "top"].includes(c3) ? -1 : 1, g3 = s3 && u3 ? -1 : 1, d3 = "function" == typeof i5 ? i5(r4) : i5;
      let { mainAxis: p3, crossAxis: h3, alignmentAxis: y4 } = "number" == typeof d3 ? { mainAxis: d3, crossAxis: 0, alignmentAxis: null } : __spreadValues({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, d3);
      return f3 && "number" == typeof y4 && (h3 = "end" === f3 ? -1 * y4 : y4), u3 ? { x: h3 * g3, y: p3 * m3 } : { x: p3 * m3, y: h3 * g3 };
    }(i4, r3);
    return { x: o4 + l3.x, y: a3 + l3.y, data: l3 };
  } };
};
function O(t2) {
  return "x" === t2 ? "y" : "x";
}
var L$1 = function(e4) {
  return void 0 === e4 && (e4 = {}), { name: "shift", options: e4, async fn(r3) {
    const { x: i4, y: o4, placement: a3 } = r3, _a = e4, { mainAxis: l3 = true, crossAxis: c3 = false, limiter: f3 = { fn: (t2) => {
      let { x: e5, y: n3 } = t2;
      return { x: e5, y: n3 };
    } } } = _a, m3 = __objRest(_a, ["mainAxis", "crossAxis", "limiter"]), g3 = { x: i4, y: o4 }, d3 = await s$7(r3, m3), p3 = n$7(t$4(a3)), h3 = O(p3);
    let y4 = g3[p3], x3 = g3[h3];
    if (l3) {
      const t2 = "y" === p3 ? "bottom" : "right";
      y4 = u$3(y4 + d3["y" === p3 ? "top" : "left"], y4, y4 - d3[t2]);
    }
    if (c3) {
      const t2 = "y" === h3 ? "bottom" : "right";
      x3 = u$3(x3 + d3["y" === h3 ? "top" : "left"], x3, x3 - d3[t2]);
    }
    const w3 = f3.fn(__spreadProps(__spreadValues({}, r3), { [p3]: y4, [h3]: x3 }));
    return __spreadProps(__spreadValues({}, w3), { data: { x: w3.x - i4, y: w3.y - o4 } });
  } };
};
var k$1 = function(n3) {
  return void 0 === n3 && (n3 = {}), { name: "size", options: n3, async fn(r3) {
    const { placement: i4, rects: o4, platform: a3, elements: l3 } = r3, _a = n3, { apply: c3 = () => {
    } } = _a, u3 = __objRest(_a, ["apply"]), m3 = await s$7(r3, u3), g3 = t$4(i4), d3 = e3(i4);
    let p3, h3;
    "top" === g3 || "bottom" === g3 ? (p3 = g3, h3 = d3 === (await (null == a3.isRTL ? void 0 : a3.isRTL(l3.floating)) ? "start" : "end") ? "left" : "right") : (h3 = g3, p3 = "end" === d3 ? "top" : "bottom");
    const y4 = f$2(m3.left, 0), x3 = f$2(m3.right, 0), w3 = f$2(m3.top, 0), v3 = f$2(m3.bottom, 0), b3 = { availableHeight: o4.floating.height - (["left", "right"].includes(i4) ? 2 * (0 !== w3 || 0 !== v3 ? w3 + v3 : f$2(m3.top, m3.bottom)) : m3[p3]), availableWidth: o4.floating.width - (["top", "bottom"].includes(i4) ? 2 * (0 !== y4 || 0 !== x3 ? y4 + x3 : f$2(m3.left, m3.right)) : m3[h3]) };
    await c3(__spreadValues(__spreadValues({}, r3), b3));
    const R2 = await a3.getDimensions(l3.floating);
    return o4.floating.width !== R2.width || o4.floating.height !== R2.height ? { reset: { rects: true } } : {};
  } };
};

// node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs
function n2(t2) {
  return t2 && t2.document && t2.location && t2.alert && t2.setInterval;
}
function o3(t2) {
  if (null == t2)
    return window;
  if (!n2(t2)) {
    const e4 = t2.ownerDocument;
    return e4 && e4.defaultView || window;
  }
  return t2;
}
function i3(t2) {
  return o3(t2).getComputedStyle(t2);
}
function r2(t2) {
  return n2(t2) ? "" : t2 ? (t2.nodeName || "").toLowerCase() : "";
}
function l2() {
  const t2 = navigator.userAgentData;
  return t2 && Array.isArray(t2.brands) ? t2.brands.map((t3) => t3.brand + "/" + t3.version).join(" ") : navigator.userAgent;
}
function c2(t2) {
  return t2 instanceof o3(t2).HTMLElement;
}
function s2(t2) {
  return t2 instanceof o3(t2).Element;
}
function f2(t2) {
  if ("undefined" == typeof ShadowRoot)
    return false;
  return t2 instanceof o3(t2).ShadowRoot || t2 instanceof ShadowRoot;
}
function u2(t2) {
  const { overflow: e4, overflowX: n3, overflowY: o4, display: r3 } = i3(t2);
  return /auto|scroll|overlay|hidden/.test(e4 + o4 + n3) && !["inline", "contents"].includes(r3);
}
function a2(t2) {
  return ["table", "td", "th"].includes(r2(t2));
}
function d2(t2) {
  const e4 = /firefox/i.test(l2()), n3 = i3(t2), o4 = n3.backdropFilter || n3.WebkitBackdropFilter;
  return "none" !== n3.transform || "none" !== n3.perspective || !!o4 && "none" !== o4 || e4 && "filter" === n3.willChange || e4 && !!n3.filter && "none" !== n3.filter || ["transform", "perspective"].some((t3) => n3.willChange.includes(t3)) || ["paint", "layout", "strict", "content"].some((t3) => {
    const e5 = n3.contain;
    return null != e5 && e5.includes(t3);
  });
}
function h2$1() {
  return !/^((?!chrome|android).)*safari/i.test(l2());
}
function g2(t2) {
  return ["html", "body", "#document"].includes(r2(t2));
}
var m2 = Math.min;
var p2 = Math.max;
var w2 = Math.round;
function v2(t2, e4, n3) {
  var i4, r3, l3, f3;
  void 0 === e4 && (e4 = false), void 0 === n3 && (n3 = false);
  const u3 = t2.getBoundingClientRect();
  let a3 = 1, d3 = 1;
  e4 && c2(t2) && (a3 = t2.offsetWidth > 0 && w2(u3.width) / t2.offsetWidth || 1, d3 = t2.offsetHeight > 0 && w2(u3.height) / t2.offsetHeight || 1);
  const g3 = s2(t2) ? o3(t2) : window, m3 = !h2$1() && n3, p3 = (u3.left + (m3 && null != (i4 = null == (r3 = g3.visualViewport) ? void 0 : r3.offsetLeft) ? i4 : 0)) / a3, v3 = (u3.top + (m3 && null != (l3 = null == (f3 = g3.visualViewport) ? void 0 : f3.offsetTop) ? l3 : 0)) / d3, y4 = u3.width / a3, x3 = u3.height / d3;
  return { width: y4, height: x3, top: v3, right: p3 + y4, bottom: v3 + x3, left: p3, x: p3, y: v3 };
}
function y3(t2) {
  return (e4 = t2, (e4 instanceof o3(e4).Node ? t2.ownerDocument : t2.document) || window.document).documentElement;
  var e4;
}
function x2(t2) {
  return s2(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
}
function b2(t2) {
  return v2(y3(t2)).left + x2(t2).scrollLeft;
}
function L2(t2, e4, n3) {
  const o4 = c2(e4), i4 = y3(e4), l3 = v2(t2, o4 && function(t3) {
    const e5 = v2(t3);
    return w2(e5.width) !== t3.offsetWidth || w2(e5.height) !== t3.offsetHeight;
  }(e4), "fixed" === n3);
  let s3 = { scrollLeft: 0, scrollTop: 0 };
  const f3 = { x: 0, y: 0 };
  if (o4 || !o4 && "fixed" !== n3)
    if (("body" !== r2(e4) || u2(i4)) && (s3 = x2(e4)), c2(e4)) {
      const t3 = v2(e4, true);
      f3.x = t3.x + e4.clientLeft, f3.y = t3.y + e4.clientTop;
    } else
      i4 && (f3.x = b2(i4));
  return { x: l3.left + s3.scrollLeft - f3.x, y: l3.top + s3.scrollTop - f3.y, width: l3.width, height: l3.height };
}
function E2(t2) {
  if ("html" === r2(t2))
    return t2;
  const e4 = t2.assignedSlot || t2.parentNode || (f2(t2) ? t2.host : null) || y3(t2);
  return f2(e4) ? e4.host : e4;
}
function R$1(t2) {
  return c2(t2) && "fixed" !== i3(t2).position ? t2.offsetParent : null;
}
function T2(t2) {
  const e4 = o3(t2);
  let n3 = R$1(t2);
  for (; n3 && a2(n3) && "static" === i3(n3).position; )
    n3 = R$1(n3);
  return n3 && ("html" === r2(n3) || "body" === r2(n3) && "static" === i3(n3).position && !d2(n3)) ? e4 : n3 || function(t3) {
    let e5 = E2(t3);
    for (; c2(e5) && !g2(e5); ) {
      if (d2(e5))
        return e5;
      e5 = E2(e5);
    }
    return null;
  }(t2) || e4;
}
function W(t2) {
  const e4 = E2(t2);
  return g2(e4) ? t2.ownerDocument.body : c2(e4) && u2(e4) ? e4 : W(e4);
}
function H$1(t2, e4) {
  var n3;
  void 0 === e4 && (e4 = []);
  const i4 = W(t2), r3 = i4 === (null == (n3 = t2.ownerDocument) ? void 0 : n3.body), l3 = o3(i4), c3 = r3 ? [l3].concat(l3.visualViewport || [], u2(i4) ? i4 : []) : i4, s3 = e4.concat(c3);
  return r3 ? s3 : s3.concat(H$1(c3));
}
function D2(e4, n3, r3) {
  return "viewport" === n3 ? l$5(function(t2, e5) {
    const n4 = o3(t2), i4 = y3(t2), r4 = n4.visualViewport;
    let l3 = i4.clientWidth, c3 = i4.clientHeight, s3 = 0, f3 = 0;
    if (r4) {
      l3 = r4.width, c3 = r4.height;
      const t3 = h2$1();
      (t3 || !t3 && "fixed" === e5) && (s3 = r4.offsetLeft, f3 = r4.offsetTop);
    }
    return { width: l3, height: c3, x: s3, y: f3 };
  }(e4, r3)) : s2(n3) ? function(t2, e5) {
    const n4 = v2(t2, false, "fixed" === e5), o4 = n4.top + t2.clientTop, i4 = n4.left + t2.clientLeft;
    return { top: o4, left: i4, x: i4, y: o4, right: i4 + t2.clientWidth, bottom: o4 + t2.clientHeight, width: t2.clientWidth, height: t2.clientHeight };
  }(n3, r3) : l$5(function(t2) {
    var e5;
    const n4 = y3(t2), o4 = x2(t2), r4 = null == (e5 = t2.ownerDocument) ? void 0 : e5.body, l3 = p2(n4.scrollWidth, n4.clientWidth, r4 ? r4.scrollWidth : 0, r4 ? r4.clientWidth : 0), c3 = p2(n4.scrollHeight, n4.clientHeight, r4 ? r4.scrollHeight : 0, r4 ? r4.clientHeight : 0);
    let s3 = -o4.scrollLeft + b2(t2);
    const f3 = -o4.scrollTop;
    return "rtl" === i3(r4 || n4).direction && (s3 += p2(n4.clientWidth, r4 ? r4.clientWidth : 0) - l3), { width: l3, height: c3, x: s3, y: f3 };
  }(y3(e4)));
}
var A$1 = { getClippingRect: function(t2) {
  let { element: e4, boundary: n3, rootBoundary: o4, strategy: l3 } = t2;
  const c3 = "clippingAncestors" === n3 ? function(t3) {
    let e5 = H$1(t3).filter((t4) => s2(t4) && "body" !== r2(t4)), n4 = null;
    const o5 = "fixed" === i3(t3).position;
    let l4 = o5 ? E2(t3) : t3;
    for (; s2(l4) && !g2(l4); ) {
      const t4 = i3(l4), r3 = d2(l4);
      (o5 ? r3 || n4 : r3 || "static" !== t4.position || !n4 || !["absolute", "fixed"].includes(n4.position)) ? n4 = t4 : e5 = e5.filter((t5) => t5 !== l4), l4 = E2(l4);
    }
    return e5;
  }(e4) : [].concat(n3), f3 = [...c3, o4], u3 = f3[0], a3 = f3.reduce((t3, n4) => {
    const o5 = D2(e4, n4, l3);
    return t3.top = p2(o5.top, t3.top), t3.right = m2(o5.right, t3.right), t3.bottom = m2(o5.bottom, t3.bottom), t3.left = p2(o5.left, t3.left), t3;
  }, D2(e4, u3, l3));
  return { width: a3.right - a3.left, height: a3.bottom - a3.top, x: a3.left, y: a3.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
  let { rect: e4, offsetParent: n3, strategy: o4 } = t2;
  const i4 = c2(n3), l3 = y3(n3);
  if (n3 === l3)
    return e4;
  let s3 = { scrollLeft: 0, scrollTop: 0 };
  const f3 = { x: 0, y: 0 };
  if ((i4 || !i4 && "fixed" !== o4) && (("body" !== r2(n3) || u2(l3)) && (s3 = x2(n3)), c2(n3))) {
    const t3 = v2(n3, true);
    f3.x = t3.x + n3.clientLeft, f3.y = t3.y + n3.clientTop;
  }
  return __spreadProps(__spreadValues({}, e4), { x: e4.x - s3.scrollLeft + f3.x, y: e4.y - s3.scrollTop + f3.y });
}, isElement: s2, getDimensions: function(t2) {
  if (c2(t2))
    return { width: t2.offsetWidth, height: t2.offsetHeight };
  const e4 = v2(t2);
  return { width: e4.width, height: e4.height };
}, getOffsetParent: T2, getDocumentElement: y3, async getElementRects(t2) {
  let { reference: e4, floating: n3, strategy: o4 } = t2;
  const i4 = this.getOffsetParent || T2, r3 = this.getDimensions;
  return { reference: L2(e4, await i4(n3), o4), floating: __spreadValues({ x: 0, y: 0 }, await r3(n3)) };
}, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => "rtl" === i3(t2).direction };
function C$1(t2, e4, n3, o4) {
  void 0 === o4 && (o4 = {});
  const { ancestorScroll: i4 = true, ancestorResize: r3 = true, elementResize: l3 = true, animationFrame: c3 = false } = o4, f3 = i4 && !c3, u3 = f3 || r3 ? [...s2(t2) ? H$1(t2) : t2.contextElement ? H$1(t2.contextElement) : [], ...H$1(e4)] : [];
  u3.forEach((t3) => {
    f3 && t3.addEventListener("scroll", n3, { passive: true }), r3 && t3.addEventListener("resize", n3);
  });
  let a3, d3 = null;
  if (l3) {
    let o5 = true;
    d3 = new ResizeObserver(() => {
      o5 || n3(), o5 = false;
    }), s2(t2) && !c3 && d3.observe(t2), s2(t2) || !t2.contextElement || c3 || d3.observe(t2.contextElement), d3.observe(e4);
  }
  let h3 = c3 ? v2(t2) : null;
  return c3 && function e5() {
    const o5 = v2(t2);
    !h3 || o5.x === h3.x && o5.y === h3.y && o5.width === h3.width && o5.height === h3.height || n3();
    h3 = o5, a3 = requestAnimationFrame(e5);
  }(), n3(), () => {
    var t3;
    u3.forEach((t4) => {
      f3 && t4.removeEventListener("scroll", n3), r3 && t4.removeEventListener("resize", n3);
    }), null == (t3 = d3) || t3.disconnect(), d3 = null, c3 && cancelAnimationFrame(a3);
  };
}
var O2 = (t2, n3, o4) => o2(t2, n3, __spreadValues({ platform: A$1 }, o4));

// src/components/popup/popup.ts
var SlPopup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.active = false;
    this.placement = "top";
    this.strategy = "absolute";
    this.distance = 0;
    this.skidding = 0;
    this.arrow = false;
    this.arrowPlacement = "anchor";
    this.arrowPadding = 10;
    this.flip = false;
    this.flipFallbackPlacements = "";
    this.flipFallbackStrategy = "best-fit";
    this.flipPadding = 0;
    this.shift = false;
    this.shiftPadding = 0;
    this.autoSizePadding = 0;
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.start();
  }
  disconnectedCallback() {
    this.stop();
  }
  async updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("active")) {
      if (this.active) {
        this.start();
      } else {
        this.stop();
      }
    }
    if (changedProps.has("anchor")) {
      this.handleAnchorChange();
    }
    if (this.active) {
      await this.updateComplete;
      this.reposition();
    }
  }
  async handleAnchorChange() {
    await this.stop();
    if (this.anchor && typeof this.anchor === "string") {
      const root = this.getRootNode();
      this.anchorEl = root.getElementById(this.anchor);
    } else if (this.anchor instanceof HTMLElement) {
      this.anchorEl = this.anchor;
    } else {
      this.anchorEl = this.querySelector('[slot="anchor"]');
    }
    if (this.anchorEl instanceof HTMLSlotElement) {
      this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
    }
    if (!this.anchorEl) {
      throw new Error(
        "Invalid anchor element: no anchor could be found using the anchor slot or the anchor attribute."
      );
    }
    this.start();
  }
  start() {
    if (!this.anchorEl) {
      return;
    }
    this.cleanup = C$1(this.anchorEl, this.popup, () => {
      this.reposition();
    });
  }
  async stop() {
    return new Promise((resolve) => {
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = void 0;
        this.removeAttribute("data-current-placement");
        this.style.removeProperty("--auto-size-available-width");
        this.style.removeProperty("--auto-size-available-height");
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }
  reposition() {
    if (!this.active || !this.anchorEl) {
      return;
    }
    const middleware = [
      T$1({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    if (this.sync) {
      middleware.push(
        k$1({
          apply: ({ rects }) => {
            const syncWidth = this.sync === "width" || this.sync === "both";
            const syncHeight = this.sync === "height" || this.sync === "both";
            this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
            this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
          }
        })
      );
    } else {
      this.popup.style.width = "";
      this.popup.style.height = "";
    }
    if (this.flip) {
      middleware.push(
        b$1({
          boundary: this.flipBoundary,
          fallbackPlacements: this.flipFallbackPlacements,
          fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
          padding: this.flipPadding
        })
      );
    }
    if (this.shift) {
      middleware.push(
        L$1({
          boundary: this.shiftBoundary,
          padding: this.shiftPadding
        })
      );
    }
    if (this.autoSize) {
      middleware.push(
        k$1({
          boundary: this.autoSizeBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            if (this.autoSize === "vertical" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
            } else {
              this.style.removeProperty("--auto-size-available-height");
            }
            if (this.autoSize === "horizontal" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
            } else {
              this.style.removeProperty("--auto-size-available-width");
            }
          }
        })
      );
    } else {
      this.style.removeProperty("--auto-size-available-width");
      this.style.removeProperty("--auto-size-available-height");
    }
    if (this.arrow) {
      middleware.push(
        m$2({
          element: this.arrowEl,
          padding: this.arrowPadding
        })
      );
    }
    O2(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware,
      strategy: this.strategy
    }).then(({ x: x3, y: y4, middlewareData, placement }) => {
      const isRtl = getComputedStyle(this).direction === "rtl";
      const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
      this.setAttribute("data-current-placement", placement);
      Object.assign(this.popup.style, {
        left: `${x3}px`,
        top: `${y4}px`
      });
      if (this.arrow) {
        const arrowX = middlewareData.arrow.x;
        const arrowY = middlewareData.arrow.y;
        let top = "";
        let right = "";
        let bottom = "";
        let left = "";
        if (this.arrowPlacement === "start") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? value : "";
          left = isRtl ? "" : value;
        } else if (this.arrowPlacement === "end") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? "" : value;
          left = isRtl ? value : "";
          bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else if (this.arrowPlacement === "center") {
          left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
          top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
        } else {
          left = typeof arrowX === "number" ? `${arrowX}px` : "";
          top = typeof arrowY === "number" ? `${arrowY}px` : "";
        }
        Object.assign(this.arrowEl.style, {
          top,
          right,
          bottom,
          left,
          [staticSide]: "calc(var(--arrow-size-diagonal) * -1)"
        });
      }
    });
    this.emit("sl-reposition");
  }
  render() {
    return y$1`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <div
        part="popup"
        class=${o$7({
      popup: true,
      "popup--active": this.active,
      "popup--fixed": this.strategy === "fixed",
      "popup--has-arrow": this.arrow
    })}
      >
        <slot></slot>
        ${this.arrow ? y$1`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
SlPopup.styles = popup_styles_default;
__decorateClass([
  i2$2(".popup")
], SlPopup.prototype, "popup", 2);
__decorateClass([
  i2$2(".popup__arrow")
], SlPopup.prototype, "arrowEl", 2);
__decorateClass([
  e2$1()
], SlPopup.prototype, "anchor", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlPopup.prototype, "active", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlPopup.prototype, "placement", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlPopup.prototype, "strategy", 2);
__decorateClass([
  e2$1({ type: Number })
], SlPopup.prototype, "distance", 2);
__decorateClass([
  e2$1({ type: Number })
], SlPopup.prototype, "skidding", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlPopup.prototype, "arrow", 2);
__decorateClass([
  e2$1({ attribute: "arrow-placement" })
], SlPopup.prototype, "arrowPlacement", 2);
__decorateClass([
  e2$1({ attribute: "arrow-padding", type: Number })
], SlPopup.prototype, "arrowPadding", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlPopup.prototype, "flip", 2);
__decorateClass([
  e2$1({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (value) => {
        return value.split(" ").map((p3) => p3.trim()).filter((p3) => p3 !== "");
      },
      toAttribute: (value) => {
        return value.join(" ");
      }
    }
  })
], SlPopup.prototype, "flipFallbackPlacements", 2);
__decorateClass([
  e2$1({ attribute: "flip-fallback-strategy" })
], SlPopup.prototype, "flipFallbackStrategy", 2);
__decorateClass([
  e2$1({ type: Object })
], SlPopup.prototype, "flipBoundary", 2);
__decorateClass([
  e2$1({ attribute: "flip-padding", type: Number })
], SlPopup.prototype, "flipPadding", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlPopup.prototype, "shift", 2);
__decorateClass([
  e2$1({ type: Object })
], SlPopup.prototype, "shiftBoundary", 2);
__decorateClass([
  e2$1({ attribute: "shift-padding", type: Number })
], SlPopup.prototype, "shiftPadding", 2);
__decorateClass([
  e2$1({ attribute: "auto-size" })
], SlPopup.prototype, "autoSize", 2);
__decorateClass([
  e2$1()
], SlPopup.prototype, "sync", 2);
__decorateClass([
  e2$1({ type: Object })
], SlPopup.prototype, "autoSizeBoundary", 2);
__decorateClass([
  e2$1({ attribute: "auto-size-padding", type: Number })
], SlPopup.prototype, "autoSizePadding", 2);
SlPopup = __decorateClass([
  e$7("sl-popup")
], SlPopup);

// src/components/menu/menu.styles.ts
var menu_styles_default = i$7`
  ${component_styles_default}

  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;

// src/components/menu/menu.ts
var SlMenu = class extends ShoelaceElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "menu");
  }
  getAllItems() {
    return [...this.defaultSlot.assignedElements({ flatten: true })].filter((el) => {
      if (!this.isMenuItem(el)) {
        return false;
      }
      return true;
    });
  }
  handleClick(event) {
    const target = event.target;
    const item = target.closest("sl-menu-item");
    if ((item == null ? void 0 : item.disabled) === false) {
      if (item.type === "checkbox") {
        item.checked = !item.checked;
      }
      this.emit("sl-select", { detail: { item } });
    }
  }
  handleKeyDown(event) {
    if (event.key === "Enter") {
      const item = this.getCurrentItem();
      event.preventDefault();
      item == null ? void 0 : item.click();
    }
    if (event.key === " ") {
      event.preventDefault();
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      const items = this.getAllItems();
      const activeItem = this.getCurrentItem();
      let index = activeItem ? items.indexOf(activeItem) : 0;
      if (items.length > 0) {
        event.preventDefault();
        if (event.key === "ArrowDown") {
          index++;
        } else if (event.key === "ArrowUp") {
          index--;
        } else if (event.key === "Home") {
          index = 0;
        } else if (event.key === "End") {
          index = items.length - 1;
        }
        if (index < 0) {
          index = items.length - 1;
        }
        if (index > items.length - 1) {
          index = 0;
        }
        this.setCurrentItem(items[index]);
        items[index].focus();
      }
    }
  }
  handleMouseDown(event) {
    const target = event.target;
    if (this.isMenuItem(target)) {
      this.setCurrentItem(target);
    }
  }
  handleSlotChange() {
    const items = this.getAllItems();
    if (items.length > 0) {
      this.setCurrentItem(items[0]);
    }
  }
  isMenuItem(item) {
    var _a;
    return item.tagName.toLowerCase() === "sl-menu-item" || ["menuitem", "menuitemcheckbox", "menuitemradio"].includes((_a = item.getAttribute("role")) != null ? _a : "");
  }
  getCurrentItem() {
    return this.getAllItems().find((i2) => i2.getAttribute("tabindex") === "0");
  }
  setCurrentItem(item) {
    const items = this.getAllItems();
    items.forEach((i2) => {
      i2.setAttribute("tabindex", i2 === item ? "0" : "-1");
    });
  }
  render() {
    return y$1`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `;
  }
};
SlMenu.styles = menu_styles_default;
__decorateClass([
  i2$2("slot")
], SlMenu.prototype, "defaultSlot", 2);
SlMenu = __decorateClass([
  e$7("sl-menu")
], SlMenu);

// src/components/menu-item/menu-item.styles.ts
var menu_item_styles_default = i$7`
  ${component_styles_default}

  :host {
    display: block;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:focus) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;

// src/components/menu-item/menu-item.ts
var SlMenuItem = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.type = "normal";
    this.checked = false;
    this.value = "";
    this.disabled = false;
  }
  handleDefaultSlotChange() {
    const textLabel = this.getTextLabel();
    if (typeof this.cachedTextLabel === "undefined") {
      this.cachedTextLabel = textLabel;
      return;
    }
    if (textLabel !== this.cachedTextLabel) {
      this.cachedTextLabel = textLabel;
      this.emit("slotchange", { bubbles: true, composed: false, cancelable: false });
    }
  }
  handleCheckedChange() {
    if (this.checked && this.type !== "checkbox") {
      this.checked = false;
      console.error('The checked attribute can only be used on menu items with type="checkbox"', this);
      return;
    }
    if (this.type === "checkbox") {
      this.setAttribute("aria-checked", this.checked ? "true" : "false");
    } else {
      this.removeAttribute("aria-checked");
    }
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleTypeChange() {
    if (this.type === "checkbox") {
      this.setAttribute("role", "menuitemcheckbox");
      this.setAttribute("aria-checked", this.checked ? "true" : "false");
    } else {
      this.setAttribute("role", "menuitem");
      this.removeAttribute("aria-checked");
    }
  }
  getTextLabel() {
    return getTextContent(this.defaultSlot);
  }
  render() {
    return y$1`
      <div
        part="base"
        class=${o$7({
      "menu-item": true,
      "menu-item--checked": this.checked,
      "menu-item--disabled": this.disabled,
      "menu-item--has-submenu": false
    })}
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span class="menu-item__chevron">
          <sl-icon name="chevron-right" library="system" aria-hidden="true"></sl-icon>
        </span>
      </div>
    `;
  }
};
SlMenuItem.styles = menu_item_styles_default;
__decorateClass([
  i2$2("slot:not([name])")
], SlMenuItem.prototype, "defaultSlot", 2);
__decorateClass([
  i2$2(".menu-item")
], SlMenuItem.prototype, "menuItem", 2);
__decorateClass([
  e2$1()
], SlMenuItem.prototype, "type", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "checked", 2);
__decorateClass([
  e2$1()
], SlMenuItem.prototype, "value", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "disabled", 2);
__decorateClass([
  watch("checked")
], SlMenuItem.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled")
], SlMenuItem.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("type")
], SlMenuItem.prototype, "handleTypeChange", 1);
SlMenuItem = __decorateClass([
  e$7("sl-menu-item")
], SlMenuItem);

// src/components/option/option.styles.ts
var option_styles_default = i$7`
  ${component_styles_default}

  :host {
    display: block;
    user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;

// src/components/option/option.ts
var SlOption = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.current = false;
    this.selected = false;
    this.hasHover = false;
    this.value = "";
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "option");
    this.setAttribute("aria-selected", "false");
  }
  handleDefaultSlotChange() {
    const textLabel = this.getTextLabel();
    if (typeof this.cachedTextLabel === "undefined") {
      this.cachedTextLabel = textLabel;
      return;
    }
    if (textLabel !== this.cachedTextLabel) {
      this.cachedTextLabel = textLabel;
      this.emit("slotchange", { bubbles: true, composed: false, cancelable: false });
    }
  }
  handleMouseEnter() {
    this.hasHover = true;
  }
  handleMouseLeave() {
    this.hasHover = false;
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleSelectedChange() {
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
  }
  handleValueChange() {
    if (this.value.includes(" ")) {
      console.error(`Option values cannot include a space. All spaces have been replaced with underscores.`, this);
      this.value = this.value.replace(/ /g, "_");
    }
  }
  getTextLabel() {
    var _a;
    return ((_a = this.textContent) != null ? _a : "").trim();
  }
  render() {
    return y$1`
      <div
        part="base"
        class=${o$7({
      option: true,
      "option--current": this.current,
      "option--disabled": this.disabled,
      "option--selected": this.selected,
      "option--hover": this.hasHover
    })}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `;
  }
};
SlOption.styles = option_styles_default;
__decorateClass([
  i2$2(".option__label")
], SlOption.prototype, "defaultSlot", 2);
__decorateClass([
  t$5()
], SlOption.prototype, "current", 2);
__decorateClass([
  t$5()
], SlOption.prototype, "selected", 2);
__decorateClass([
  t$5()
], SlOption.prototype, "hasHover", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlOption.prototype, "value", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlOption.prototype, "disabled", 2);
__decorateClass([
  watch("disabled")
], SlOption.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("selected")
], SlOption.prototype, "handleSelectedChange", 1);
__decorateClass([
  watch("value")
], SlOption.prototype, "handleValueChange", 1);
SlOption = __decorateClass([
  e$7("sl-option")
], SlOption);

// src/components/dropdown/dropdown.styles.ts
var dropdown_styles_default = i$7`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;

// src/internal/tabbable.ts
function isTabbable(el) {
  const tag = el.tagName.toLowerCase();
  if (el.getAttribute("tabindex") === "-1") {
    return false;
  }
  if (el.hasAttribute("disabled")) {
    return false;
  }
  if (el.hasAttribute("aria-disabled") && el.getAttribute("aria-disabled") !== "false") {
    return false;
  }
  if (tag === "input" && el.getAttribute("type") === "radio" && !el.hasAttribute("checked")) {
    return false;
  }
  if (el.offsetParent === null) {
    return false;
  }
  if (window.getComputedStyle(el).visibility === "hidden") {
    return false;
  }
  if ((tag === "audio" || tag === "video") && el.hasAttribute("controls")) {
    return true;
  }
  if (el.hasAttribute("tabindex")) {
    return true;
  }
  if (el.hasAttribute("contenteditable") && el.getAttribute("contenteditable") !== "false") {
    return true;
  }
  return ["button", "input", "select", "textarea", "a", "audio", "video", "summary"].includes(tag);
}
function getTabbableBoundary(root) {
  var _a, _b;
  const allElements = [];
  function walk(el) {
    if (el instanceof HTMLElement) {
      allElements.push(el);
      if (el.shadowRoot !== null && el.shadowRoot.mode === "open") {
        walk(el.shadowRoot);
      }
    }
    [...el.children].forEach((e) => walk(e));
  }
  walk(root);
  const start = (_a = allElements.find((el) => isTabbable(el))) != null ? _a : null;
  const end = (_b = allElements.reverse().find((el) => isTabbable(el))) != null ? _b : null;
  return { start, end };
}

// src/components/dropdown/dropdown.ts
var SlDropdown = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.open = false;
    this.placement = "bottom-start";
    this.disabled = false;
    this.stayOpenOnSelect = false;
    this.distance = 0;
    this.skidding = 0;
    this.hoist = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleMenuItemActivate = this.handleMenuItemActivate.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    if (!this.containingElement) {
      this.containingElement = this;
    }
  }
  firstUpdated() {
    this.panel.hidden = !this.open;
    if (this.open) {
      this.addOpenListeners();
      this.popup.active = true;
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeOpenListeners();
    this.hide();
  }
  focusOnTrigger() {
    const trigger = this.trigger.assignedElements({ flatten: true })[0];
    if (typeof (trigger == null ? void 0 : trigger.focus) === "function") {
      trigger.focus();
    }
  }
  getMenu() {
    return this.panel.assignedElements({ flatten: true }).find((el) => el.tagName.toLowerCase() === "sl-menu");
  }
  handleKeyDown(event) {
    if (this.open && event.key === "Escape") {
      event.stopPropagation();
      this.hide();
      this.focusOnTrigger();
    }
  }
  handleDocumentKeyDown(event) {
    var _a;
    if (event.key === "Tab") {
      if (this.open && ((_a = document.activeElement) == null ? void 0 : _a.tagName.toLowerCase()) === "sl-menu-item") {
        event.preventDefault();
        this.hide();
        this.focusOnTrigger();
        return;
      }
      setTimeout(() => {
        var _a2, _b, _c;
        const activeElement = ((_a2 = this.containingElement) == null ? void 0 : _a2.getRootNode()) instanceof ShadowRoot ? (_c = (_b = document.activeElement) == null ? void 0 : _b.shadowRoot) == null ? void 0 : _c.activeElement : document.activeElement;
        if (!this.containingElement || (activeElement == null ? void 0 : activeElement.closest(this.containingElement.tagName.toLowerCase())) !== this.containingElement) {
          this.hide();
        }
      });
    }
  }
  handleDocumentMouseDown(event) {
    const path = event.composedPath();
    if (this.containingElement && !path.includes(this.containingElement)) {
      this.hide();
    }
  }
  handleMenuItemActivate(event) {
    const item = event.target;
    scrollIntoView(item, this.panel);
  }
  handlePanelSelect(event) {
    const target = event.target;
    if (!this.stayOpenOnSelect && target.tagName.toLowerCase() === "sl-menu") {
      this.hide();
      this.focusOnTrigger();
    }
  }
  handleTriggerClick() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }
  handleTriggerKeyDown(event) {
    if (event.key === "Escape" && this.open) {
      event.stopPropagation();
      this.focusOnTrigger();
      this.hide();
      return;
    }
    if ([" ", "Enter"].includes(event.key)) {
      event.preventDefault();
      this.handleTriggerClick();
      return;
    }
    const menu = this.getMenu();
    if (menu) {
      const menuItems = menu.defaultSlot.assignedElements({ flatten: true });
      const firstMenuItem = menuItems[0];
      const lastMenuItem = menuItems[menuItems.length - 1];
      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (!this.open) {
          this.show();
        }
        if (menuItems.length > 0) {
          requestAnimationFrame(() => {
            if (event.key === "ArrowDown" || event.key === "Home") {
              menu.setCurrentItem(firstMenuItem);
              firstMenuItem.focus();
            }
            if (event.key === "ArrowUp" || event.key === "End") {
              menu.setCurrentItem(lastMenuItem);
              lastMenuItem.focus();
            }
          });
        }
      }
    }
  }
  handleTriggerKeyUp(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }
  handleTriggerSlotChange() {
    this.updateAccessibleTrigger();
  }
  updateAccessibleTrigger() {
    const assignedElements = this.trigger.assignedElements({ flatten: true });
    const accessibleTrigger = assignedElements.find((el) => getTabbableBoundary(el).start);
    let target;
    if (accessibleTrigger) {
      switch (accessibleTrigger.tagName.toLowerCase()) {
        case "sl-button":
        case "sl-icon-button":
          target = accessibleTrigger.button;
          break;
        default:
          target = accessibleTrigger;
      }
      target.setAttribute("aria-haspopup", "true");
      target.setAttribute("aria-expanded", this.open ? "true" : "false");
    }
  }
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  reposition() {
    this.popup.reposition();
  }
  addOpenListeners() {
    this.panel.addEventListener("sl-activate", this.handleMenuItemActivate);
    this.panel.addEventListener("sl-select", this.handlePanelSelect);
    this.panel.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
  }
  removeOpenListeners() {
    if (this.panel) {
      this.panel.removeEventListener("sl-activate", this.handleMenuItemActivate);
      this.panel.removeEventListener("sl-select", this.handlePanelSelect);
      this.panel.removeEventListener("keydown", this.handleKeyDown);
    }
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
  }
  async handleOpenChange() {
    if (this.disabled) {
      this.open = false;
      return;
    }
    this.updateAccessibleTrigger();
    if (this.open) {
      this.emit("sl-show");
      this.addOpenListeners();
      await stopAnimations(this);
      this.panel.hidden = false;
      this.popup.active = true;
      const { keyframes, options } = getAnimation(this, "dropdown.show", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      this.removeOpenListeners();
      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, "dropdown.hide", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.panel.hidden = true;
      this.popup.active = false;
      this.emit("sl-after-hide");
    }
  }
  render() {
    return y$1`
      <sl-popup
        part="base"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist ? "fixed" : "absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        class=${o$7({
      dropdown: true,
      "dropdown--open": this.open
    })}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <slot
          part="panel"
          class="dropdown__panel"
          aria-hidden=${this.open ? "false" : "true"}
          aria-labelledby="dropdown"
        ></slot>
      </sl-popup>
    `;
  }
};
SlDropdown.styles = dropdown_styles_default;
__decorateClass([
  i2$2(".dropdown")
], SlDropdown.prototype, "popup", 2);
__decorateClass([
  i2$2(".dropdown__trigger")
], SlDropdown.prototype, "trigger", 2);
__decorateClass([
  i2$2(".dropdown__panel")
], SlDropdown.prototype, "panel", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlDropdown.prototype, "open", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlDropdown.prototype, "placement", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlDropdown.prototype, "disabled", 2);
__decorateClass([
  e2$1({ attribute: "stay-open-on-select", type: Boolean, reflect: true })
], SlDropdown.prototype, "stayOpenOnSelect", 2);
__decorateClass([
  e2$1({ attribute: false })
], SlDropdown.prototype, "containingElement", 2);
__decorateClass([
  e2$1({ type: Number })
], SlDropdown.prototype, "distance", 2);
__decorateClass([
  e2$1({ type: Number })
], SlDropdown.prototype, "skidding", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlDropdown.prototype, "hoist", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDropdown.prototype, "handleOpenChange", 1);
SlDropdown = __decorateClass([
  e$7("sl-dropdown")
], SlDropdown);
setDefaultAnimation("dropdown.show", {
  keyframes: [
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 100, easing: "ease" }
});
setDefaultAnimation("dropdown.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.9 }
  ],
  options: { duration: 100, easing: "ease" }
});

// src/components/tab-group/tab-group.styles.ts
var tab_group_styles_default = i$7`
  ${component_styles_default}

  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition: var(--sl-transition-fast) translate ease, var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`;

// src/components/tab-group/tab-group.ts
var SlTabGroup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.tabs = [];
    this.panels = [];
    this.hasScrollControls = false;
    this.placement = "top";
    this.activation = "auto";
    this.noScrollControls = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => {
      this.repositionIndicator();
      this.updateScrollControls();
    });
    this.mutationObserver = new MutationObserver((mutations) => {
      if (mutations.some((m) => !["aria-labelledby", "aria-controls"].includes(m.attributeName))) {
        setTimeout(() => this.setAriaLabels());
      }
      if (mutations.some((m) => m.attributeName === "disabled")) {
        this.syncTabsAndPanels();
      }
    });
    this.updateComplete.then(() => {
      this.syncTabsAndPanels();
      this.mutationObserver.observe(this, { attributes: true, childList: true, subtree: true });
      this.resizeObserver.observe(this.nav);
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        var _a;
        if (entries[0].intersectionRatio > 0) {
          this.setAriaLabels();
          this.setActiveTab((_a = this.getActiveTab()) != null ? _a : this.tabs[0], { emitEvents: false });
          observer.unobserve(entries[0].target);
        }
      });
      intersectionObserver.observe(this.tabGroup);
    });
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.unobserve(this.nav);
  }
  getAllTabs(options = { includeDisabled: true }) {
    const slot = this.shadowRoot.querySelector('slot[name="nav"]');
    return [...slot.assignedElements()].filter((el) => {
      return options.includeDisabled ? el.tagName.toLowerCase() === "sl-tab" : el.tagName.toLowerCase() === "sl-tab" && !el.disabled;
    });
  }
  getAllPanels() {
    return [...this.body.assignedElements()].filter((el) => el.tagName.toLowerCase() === "sl-tab-panel");
  }
  getActiveTab() {
    return this.tabs.find((el) => el.active);
  }
  handleClick(event) {
    const target = event.target;
    const tab = target.closest("sl-tab");
    const tabGroup = tab == null ? void 0 : tab.closest("sl-tab-group");
    if (tabGroup !== this) {
      return;
    }
    if (tab !== null) {
      this.setActiveTab(tab, { scrollBehavior: "smooth" });
    }
  }
  handleKeyDown(event) {
    const target = event.target;
    const tab = target.closest("sl-tab");
    const tabGroup = tab == null ? void 0 : tab.closest("sl-tab-group");
    if (tabGroup !== this) {
      return;
    }
    if (["Enter", " "].includes(event.key)) {
      if (tab !== null) {
        this.setActiveTab(tab, { scrollBehavior: "smooth" });
        event.preventDefault();
      }
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      const activeEl = this.tabs.find((t2) => t2.matches(":focus"));
      const isRtl = this.localize.dir() === "rtl";
      if ((activeEl == null ? void 0 : activeEl.tagName.toLowerCase()) === "sl-tab") {
        let index = this.tabs.indexOf(activeEl);
        if (event.key === "Home") {
          index = 0;
        } else if (event.key === "End") {
          index = this.tabs.length - 1;
        } else if (["top", "bottom"].includes(this.placement) && event.key === (isRtl ? "ArrowRight" : "ArrowLeft") || ["start", "end"].includes(this.placement) && event.key === "ArrowUp") {
          index--;
        } else if (["top", "bottom"].includes(this.placement) && event.key === (isRtl ? "ArrowLeft" : "ArrowRight") || ["start", "end"].includes(this.placement) && event.key === "ArrowDown") {
          index++;
        }
        if (index < 0) {
          index = this.tabs.length - 1;
        }
        if (index > this.tabs.length - 1) {
          index = 0;
        }
        this.tabs[index].focus({ preventScroll: true });
        if (this.activation === "auto") {
          this.setActiveTab(this.tabs[index], { scrollBehavior: "smooth" });
        }
        if (["top", "bottom"].includes(this.placement)) {
          scrollIntoView(this.tabs[index], this.nav, "horizontal");
        }
        event.preventDefault();
      }
    }
  }
  handleScrollToStart() {
    this.nav.scroll({
      left: this.localize.dir() === "rtl" ? this.nav.scrollLeft + this.nav.clientWidth : this.nav.scrollLeft - this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  handleScrollToEnd() {
    this.nav.scroll({
      left: this.localize.dir() === "rtl" ? this.nav.scrollLeft - this.nav.clientWidth : this.nav.scrollLeft + this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  setActiveTab(tab, options) {
    options = __spreadValues({
      emitEvents: true,
      scrollBehavior: "auto"
    }, options);
    if (tab !== this.activeTab && !tab.disabled) {
      const previousTab = this.activeTab;
      this.activeTab = tab;
      this.tabs.map((el) => el.active = el === this.activeTab);
      this.panels.map((el) => {
        var _a;
        return el.active = el.name === ((_a = this.activeTab) == null ? void 0 : _a.panel);
      });
      this.syncIndicator();
      if (["top", "bottom"].includes(this.placement)) {
        scrollIntoView(this.activeTab, this.nav, "horizontal", options.scrollBehavior);
      }
      if (options.emitEvents) {
        if (previousTab) {
          this.emit("sl-tab-hide", { detail: { name: previousTab.panel } });
        }
        this.emit("sl-tab-show", { detail: { name: this.activeTab.panel } });
      }
    }
  }
  setAriaLabels() {
    this.tabs.forEach((tab) => {
      const panel = this.panels.find((el) => el.name === tab.panel);
      if (panel) {
        tab.setAttribute("aria-controls", panel.getAttribute("id"));
        panel.setAttribute("aria-labelledby", tab.getAttribute("id"));
      }
    });
  }
  repositionIndicator() {
    const currentTab = this.getActiveTab();
    if (!currentTab) {
      return;
    }
    const width = currentTab.clientWidth;
    const height = currentTab.clientHeight;
    const isRtl = this.localize.dir() === "rtl";
    const allTabs = this.getAllTabs();
    const precedingTabs = allTabs.slice(0, allTabs.indexOf(currentTab));
    const offset = precedingTabs.reduce(
      (previous, current) => ({
        left: previous.left + current.clientWidth,
        top: previous.top + current.clientHeight
      }),
      { left: 0, top: 0 }
    );
    switch (this.placement) {
      case "top":
      case "bottom":
        this.indicator.style.width = `${width}px`;
        this.indicator.style.height = "auto";
        this.indicator.style.translate = isRtl ? `${-1 * offset.left}px` : `${offset.left}px`;
        break;
      case "start":
      case "end":
        this.indicator.style.width = "auto";
        this.indicator.style.height = `${height}px`;
        this.indicator.style.translate = `0 ${offset.top}px`;
        break;
    }
  }
  syncTabsAndPanels() {
    this.tabs = this.getAllTabs({ includeDisabled: false });
    this.panels = this.getAllPanels();
    this.syncIndicator();
  }
  updateScrollControls() {
    if (this.noScrollControls) {
      this.hasScrollControls = false;
    } else {
      this.hasScrollControls = ["top", "bottom"].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth;
    }
  }
  syncIndicator() {
    const tab = this.getActiveTab();
    if (tab) {
      this.indicator.style.display = "block";
      this.repositionIndicator();
    } else {
      this.indicator.style.display = "none";
    }
  }
  show(panel) {
    const tab = this.tabs.find((el) => el.panel === panel);
    if (tab) {
      this.setActiveTab(tab, { scrollBehavior: "smooth" });
    }
  }
  render() {
    const isRtl = this.localize.dir() === "rtl";
    return y$1`
      <div
        part="base"
        class=${o$7({
      "tab-group": true,
      "tab-group--top": this.placement === "top",
      "tab-group--bottom": this.placement === "bottom",
      "tab-group--start": this.placement === "start",
      "tab-group--end": this.placement === "end",
      "tab-group--rtl": this.localize.dir() === "rtl",
      "tab-group--has-scroll-controls": this.hasScrollControls
    })}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls ? y$1`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name=${isRtl ? "chevron-right" : "chevron-left"}
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              ` : ""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls ? y$1`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name=${isRtl ? "chevron-left" : "chevron-right"}
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              ` : ""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `;
  }
};
SlTabGroup.styles = tab_group_styles_default;
__decorateClass([
  i2$2(".tab-group")
], SlTabGroup.prototype, "tabGroup", 2);
__decorateClass([
  i2$2(".tab-group__body")
], SlTabGroup.prototype, "body", 2);
__decorateClass([
  i2$2(".tab-group__nav")
], SlTabGroup.prototype, "nav", 2);
__decorateClass([
  i2$2(".tab-group__indicator")
], SlTabGroup.prototype, "indicator", 2);
__decorateClass([
  t$5()
], SlTabGroup.prototype, "hasScrollControls", 2);
__decorateClass([
  e2$1()
], SlTabGroup.prototype, "placement", 2);
__decorateClass([
  e2$1()
], SlTabGroup.prototype, "activation", 2);
__decorateClass([
  e2$1({ attribute: "no-scroll-controls", type: Boolean })
], SlTabGroup.prototype, "noScrollControls", 2);
__decorateClass([
  watch("noScrollControls", { waitUntilFirstUpdate: true })
], SlTabGroup.prototype, "updateScrollControls", 1);
__decorateClass([
  watch("placement", { waitUntilFirstUpdate: true })
], SlTabGroup.prototype, "syncIndicator", 1);
SlTabGroup = __decorateClass([
  e$7("sl-tab-group")
], SlTabGroup);

// src/components/tab-panel/tab-panel.styles.ts
var tab_panel_styles_default = i$7`
  ${component_styles_default}

  :host {
    --padding: 0;

    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }

  .tab-panel:not(.tab-panel--active) {
    display: none;
  }
`;

// src/components/tab-panel/tab-panel.ts
var id$1 = 0;
var SlTabPanel = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.attrId = ++id$1;
    this.componentId = `sl-tab-panel-${this.attrId}`;
    this.name = "";
    this.active = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = this.id.length > 0 ? this.id : this.componentId;
    this.setAttribute("role", "tabpanel");
  }
  handleActiveChange() {
    this.setAttribute("aria-hidden", this.active ? "false" : "true");
  }
  render() {
    return y$1`
      <slot
        part="base"
        class=${o$7({
      "tab-panel": true,
      "tab-panel--active": this.active
    })}
      ></slot>
    `;
  }
};
SlTabPanel.styles = tab_panel_styles_default;
__decorateClass([
  e2$1({ reflect: true })
], SlTabPanel.prototype, "name", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTabPanel.prototype, "active", 2);
__decorateClass([
  watch("active")
], SlTabPanel.prototype, "handleActiveChange", 1);
SlTabPanel = __decorateClass([
  e$7("sl-tab-panel")
], SlTabPanel);

// src/components/tab/tab.styles.ts
var tab_styles_default = i$7`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: var(--transition-speed) box-shadow, var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab:focus-visible:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`;

// src/components/tab/tab.ts
var id = 0;
var SlTab = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.attrId = ++id;
    this.componentId = `sl-tab-${this.attrId}`;
    this.panel = "";
    this.active = false;
    this.closable = false;
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tab");
  }
  handleCloseClick() {
    this.emit("sl-close");
  }
  handleActiveChange() {
    this.setAttribute("aria-selected", this.active ? "true" : "false");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  focus(options) {
    this.tab.focus(options);
  }
  blur() {
    this.tab.blur();
  }
  render() {
    this.id = this.id.length > 0 ? this.id : this.componentId;
    return y$1`
      <div
        part="base"
        class=${o$7({
      tab: true,
      "tab--active": this.active,
      "tab--closable": this.closable,
      "tab--disabled": this.disabled
    })}
        tabindex=${this.disabled ? "-1" : "0"}
      >
        <slot></slot>
        ${this.closable ? y$1`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
  }
};
SlTab.styles = tab_styles_default;
__decorateClass([
  i2$2(".tab")
], SlTab.prototype, "tab", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlTab.prototype, "panel", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTab.prototype, "active", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlTab.prototype, "closable", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTab.prototype, "disabled", 2);
__decorateClass([
  watch("active")
], SlTab.prototype, "handleActiveChange", 1);
__decorateClass([
  watch("disabled")
], SlTab.prototype, "handleDisabledChange", 1);
SlTab = __decorateClass([
  e$7("sl-tab")
], SlTab);

// src/components/tooltip/tooltip.styles.ts
var tooltip_styles_default = i$7`
  ${component_styles_default}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    pointer-events: none;
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
  }
`;

// src/components/tooltip/tooltip.ts
var SlTooltip = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.content = "";
    this.placement = "top";
    this.disabled = false;
    this.distance = 8;
    this.open = false;
    this.skidding = 0;
    this.trigger = "hover focus";
    this.hoist = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.updateComplete.then(() => {
      this.addEventListener("blur", this.handleBlur, true);
      this.addEventListener("focus", this.handleFocus, true);
      this.addEventListener("click", this.handleClick);
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("mouseover", this.handleMouseOver);
      this.addEventListener("mouseout", this.handleMouseOut);
    });
  }
  firstUpdated() {
    this.body.hidden = !this.open;
    if (this.open) {
      this.popup.active = true;
      this.popup.reposition();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("blur", this.handleBlur, true);
    this.removeEventListener("focus", this.handleFocus, true);
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("keydown", this.handleKeyDown);
    this.removeEventListener("mouseover", this.handleMouseOver);
    this.removeEventListener("mouseout", this.handleMouseOut);
  }
  handleBlur() {
    if (this.hasTrigger("focus")) {
      this.hide();
    }
  }
  handleClick() {
    if (this.hasTrigger("click")) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }
  }
  handleFocus() {
    if (this.hasTrigger("focus")) {
      this.show();
    }
  }
  handleKeyDown(event) {
    if (this.open && event.key === "Escape") {
      event.stopPropagation();
      this.hide();
    }
  }
  handleMouseOver() {
    if (this.hasTrigger("hover")) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue("--show-delay"));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => this.show(), delay);
    }
  }
  handleMouseOut() {
    if (this.hasTrigger("hover")) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue("--hide-delay"));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => this.hide(), delay);
    }
  }
  hasTrigger(triggerType) {
    const triggers = this.trigger.split(" ");
    return triggers.includes(triggerType);
  }
  async handleOpenChange() {
    if (this.open) {
      if (this.disabled) {
        return;
      }
      this.emit("sl-show");
      await stopAnimations(this.body);
      this.body.hidden = false;
      this.popup.active = true;
      const { keyframes, options } = getAnimation(this, "tooltip.show", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      await stopAnimations(this.body);
      const { keyframes, options } = getAnimation(this, "tooltip.hide", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.popup.active = false;
      this.body.hidden = true;
      this.emit("sl-after-hide");
    }
  }
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  render() {
    return y$1`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${o$7({
      tooltip: true,
      "tooltip--open": this.open
    })}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist ? "fixed" : "absolute"}
        flip
        shift
        arrow
      >
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        <slot
          name="content"
          part="body"
          id="tooltip"
          class="tooltip__body"
          role="tooltip"
          aria-live=${this.open ? "polite" : "off"}
        >
          ${this.content}
        </slot>
      </sl-popup>
    `;
  }
};
SlTooltip.styles = tooltip_styles_default;
__decorateClass([
  i2$2("slot:not([name])")
], SlTooltip.prototype, "defaultSlot", 2);
__decorateClass([
  i2$2(".tooltip__body")
], SlTooltip.prototype, "body", 2);
__decorateClass([
  i2$2("sl-popup")
], SlTooltip.prototype, "popup", 2);
__decorateClass([
  e2$1()
], SlTooltip.prototype, "content", 2);
__decorateClass([
  e2$1()
], SlTooltip.prototype, "placement", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTooltip.prototype, "disabled", 2);
__decorateClass([
  e2$1({ type: Number })
], SlTooltip.prototype, "distance", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTooltip.prototype, "open", 2);
__decorateClass([
  e2$1({ type: Number })
], SlTooltip.prototype, "skidding", 2);
__decorateClass([
  e2$1()
], SlTooltip.prototype, "trigger", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlTooltip.prototype, "hoist", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlTooltip.prototype, "handleOpenChange", 1);
__decorateClass([
  watch("content"),
  watch("distance"),
  watch("hoist"),
  watch("placement"),
  watch("skidding")
], SlTooltip.prototype, "handleOptionsChange", 1);
__decorateClass([
  watch("disabled")
], SlTooltip.prototype, "handleDisabledChange", 1);
SlTooltip = __decorateClass([
  e$7("sl-tooltip")
], SlTooltip);
setDefaultAnimation("tooltip.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 150, easing: "ease" }
});
setDefaultAnimation("tooltip.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 150, easing: "ease" }
});

// src/components/switch/switch.styles.ts
var switch_styles_default = i$7`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition: var(--sl-transition-fast) translate ease, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;

// src/components/switch/switch.ts
var SlSwitch = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      value: (control) => control.checked ? control.value || "on" : void 0,
      defaultValue: (control) => control.defaultChecked,
      setValue: (control, checked) => control.checked = checked
    });
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.name = "";
    this.size = "medium";
    this.disabled = false;
    this.required = false;
    this.checked = false;
    this.defaultChecked = false;
  }
  firstUpdated() {
    this.invalid = !this.checkValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleInput() {
    this.emit("sl-input");
  }
  handleClick() {
    this.checked = !this.checked;
    this.emit("sl-change");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.checked = false;
      this.emit("sl-change");
      this.emit("sl-input");
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.checked = true;
      this.emit("sl-change");
      this.emit("sl-input");
    }
  }
  handleCheckedChange() {
    this.input.checked = this.checked;
    this.invalid = !this.checkValidity();
  }
  handleDisabledChange() {
    this.input.disabled = this.disabled;
    this.invalid = !this.checkValidity();
  }
  click() {
    this.input.click();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  checkValidity() {
    return this.input.checkValidity();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.checkValidity();
  }
  render() {
    return y$1`
      <label
        part="base"
        class=${o$7({
      switch: true,
      "switch--checked": this.checked,
      "switch--disabled": this.disabled,
      "switch--focused": this.hasFocus,
      "switch--small": this.size === "small",
      "switch--medium": this.size === "medium",
      "switch--large": this.size === "large"
    })}
      >
        <input
          class="switch__input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${l$6(this.value)}
          .checked=${l2$1(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          @click=${this.handleClick}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <slot part="label" class="switch__label"></slot>
      </label>
    `;
  }
};
SlSwitch.styles = switch_styles_default;
__decorateClass([
  i2$2('input[type="checkbox"]')
], SlSwitch.prototype, "input", 2);
__decorateClass([
  t$5()
], SlSwitch.prototype, "hasFocus", 2);
__decorateClass([
  t$5()
], SlSwitch.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlSwitch.prototype, "title", 2);
__decorateClass([
  e2$1()
], SlSwitch.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlSwitch.prototype, "value", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlSwitch.prototype, "size", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSwitch.prototype, "disabled", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSwitch.prototype, "required", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSwitch.prototype, "checked", 2);
__decorateClass([
  defaultValue("checked")
], SlSwitch.prototype, "defaultChecked", 2);
__decorateClass([
  watch("checked", { waitUntilFirstUpdate: true })
], SlSwitch.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlSwitch.prototype, "handleDisabledChange", 1);
SlSwitch = __decorateClass([
  e$7("sl-switch")
], SlSwitch);

// src/internal/modal.ts
var activeModals = [];
var Modal = class {
  constructor(element) {
    this.tabDirection = "forward";
    this.element = element;
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  activate() {
    activeModals.push(this.element);
    document.addEventListener("focusin", this.handleFocusIn);
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }
  deactivate() {
    activeModals = activeModals.filter((modal) => modal !== this.element);
    document.removeEventListener("focusin", this.handleFocusIn);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }
  isActive() {
    return activeModals[activeModals.length - 1] === this.element;
  }
  checkFocus() {
    if (this.isActive()) {
      if (!this.element.matches(":focus-within")) {
        const { start, end } = getTabbableBoundary(this.element);
        const target = this.tabDirection === "forward" ? start : end;
        if (typeof (target == null ? void 0 : target.focus) === "function") {
          target.focus({ preventScroll: true });
        }
      }
    }
  }
  handleFocusIn() {
    this.checkFocus();
  }
  handleKeyDown(event) {
    if (event.key === "Tab" && event.shiftKey) {
      this.tabDirection = "backward";
      requestAnimationFrame(() => this.checkFocus());
    }
  }
  handleKeyUp() {
    this.tabDirection = "forward";
  }
};

// src/components/dialog/dialog.styles.ts
var dialog_styles_default = i$7`
  ${component_styles_default}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;

// src/components/dialog/dialog.ts
var SlDialog = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer");
    this.localize = new LocalizeController2(this);
    this.open = false;
    this.label = "";
    this.noHeader = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.modal = new Modal(this);
  }
  firstUpdated() {
    this.dialog.hidden = !this.open;
    if (this.open) {
      this.addOpenListeners();
      this.modal.activate();
      lockBodyScrolling(this);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unlockBodyScrolling(this);
  }
  requestClose(source) {
    const slRequestClose = this.emit("sl-request-close", {
      cancelable: true,
      detail: { source }
    });
    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "dialog.denyClose", { dir: this.localize.dir() });
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }
    this.hide();
  }
  addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
  }
  removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }
  handleDocumentKeyDown(event) {
    if (this.open && event.key === "Escape") {
      event.stopPropagation();
      this.requestClose("keyboard");
    }
  }
  async handleOpenChange() {
    if (this.open) {
      this.emit("sl-show");
      this.addOpenListeners();
      this.originalTrigger = document.activeElement;
      this.modal.activate();
      lockBodyScrolling(this);
      const autoFocusTarget = this.querySelector("[autofocus]");
      if (autoFocusTarget) {
        autoFocusTarget.removeAttribute("autofocus");
      }
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      this.dialog.hidden = false;
      requestAnimationFrame(() => {
        const slInitialFocus = this.emit("sl-initial-focus", { cancelable: true });
        if (!slInitialFocus.defaultPrevented) {
          if (autoFocusTarget) {
            autoFocusTarget.focus({ preventScroll: true });
          } else {
            this.panel.focus({ preventScroll: true });
          }
        }
        if (autoFocusTarget) {
          autoFocusTarget.setAttribute("autofocus", "");
        }
      });
      const panelAnimation = getAnimation(this, "dialog.show", { dir: this.localize.dir() });
      const overlayAnimation = getAnimation(this, "dialog.overlay.show", { dir: this.localize.dir() });
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      this.removeOpenListeners();
      this.modal.deactivate();
      await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, "dialog.hide", { dir: this.localize.dir() });
      const overlayAnimation = getAnimation(this, "dialog.overlay.hide", { dir: this.localize.dir() });
      await Promise.all([
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options).then(() => {
          this.overlay.hidden = true;
        }),
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options).then(() => {
          this.panel.hidden = true;
        })
      ]);
      this.dialog.hidden = true;
      this.overlay.hidden = false;
      this.panel.hidden = false;
      unlockBodyScrolling(this);
      const trigger = this.originalTrigger;
      if (typeof (trigger == null ? void 0 : trigger.focus) === "function") {
        setTimeout(() => trigger.focus());
      }
      this.emit("sl-after-hide");
    }
  }
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  render() {
    return y$1`
      <div
        part="base"
        class=${o$7({
      dialog: true,
      "dialog--open": this.open,
      "dialog--has-footer": this.hasSlotController.test("footer")
    })}
      >
        <div part="overlay" class="dialog__overlay" @click=${() => this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          aria-label=${l$6(this.noHeader ? this.label : void 0)}
          aria-labelledby=${l$6(!this.noHeader ? "title" : void 0)}
          tabindex="0"
        >
          ${!this.noHeader ? y$1`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length > 0 ? this.label : String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${() => this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              ` : ""}

          <slot part="body" class="dialog__body"></slot>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }
};
SlDialog.styles = dialog_styles_default;
__decorateClass([
  i2$2(".dialog")
], SlDialog.prototype, "dialog", 2);
__decorateClass([
  i2$2(".dialog__panel")
], SlDialog.prototype, "panel", 2);
__decorateClass([
  i2$2(".dialog__overlay")
], SlDialog.prototype, "overlay", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlDialog.prototype, "open", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlDialog.prototype, "label", 2);
__decorateClass([
  e2$1({ attribute: "no-header", type: Boolean, reflect: true })
], SlDialog.prototype, "noHeader", 2);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlDialog.prototype, "handleOpenChange", 1);
SlDialog = __decorateClass([
  e$7("sl-dialog")
], SlDialog);
setDefaultAnimation("dialog.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("dialog.denyClose", {
  keyframes: [{ scale: 1 }, { scale: 1.02 }, { scale: 1 }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});
setDefaultAnimation("dialog.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=window,e$6=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$6=Symbol(),n$6=new WeakMap;let o$4 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$6)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$6&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$6.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new o$4("string"==typeof t?t:t+"",void 0,s$6),S$1=(s,n)=>{e$6?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$5=e$6?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$5;const e$5=window,r$3=e$5.trustedTypes,h$3=r$3?r$3.emptyScript:"",o$3=e$5.reactiveElementPolyfillSupport,n$5={toAttribute(t,i){switch(i){case Boolean:t=t?h$3:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$4={attribute:!0,type:String,converter:n$5,reflect:!1,hasChanged:a$1};let d$1 = class d extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$4){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$4}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$5(i));}else void 0!==i&&s.push(c$5(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$4){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$5).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$5;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};d$1.finalized=!0,d$1.elementProperties=new Map,d$1.elementStyles=[],d$1.shadowRootOptions={mode:"open"},null==o$3||o$3({ReactiveElement:d$1}),(null!==(s$5=e$5.reactiveElementVersions)&&void 0!==s$5?s$5:e$5.reactiveElementVersions=[]).push("1.6.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$3=window,s$4=i$3.trustedTypes,e$4=s$4?s$4.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2=`lit$${(Math.random()+"").slice(9)}$`,n$4="?"+o$2,l$3=`<${n$4}>`,h$2=document,r$2=(t="")=>h$2.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u$2=Array.isArray,c$4=t=>u$2(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a=/-->/g,f$1=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m$1=/'/g,p$1=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=h$2.createTreeWalker(h$2,129,null,!1),E=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a:void 0!==u[1]?d=f$1:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p$1:m$1):d===p$1||d===m$1?d=_:d===a||d===f$1?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l$3:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$2+y):s+o$2+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$4?e$4.createHTML(u):u,n]};class C{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,i);if(this.el=C.createElement(v,e),A.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$2)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$2),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($.test(l.tagName)){const t=l.textContent.split(o$2),i=t.length-1;if(i>0){l.textContent=s$4?s$4.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r$2()),A.nextNode(),c.push({type:2,index:++h});l.append(t[i],r$2());}}}else if(8===l.nodeType)if(l.data===n$4)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$2,t+1));)c.push({type:7,index:h}),t+=o$2.length-1;}h++;}}static createElement(t,i){const s=h$2.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=P(t,r._$AS(t,i.values),r,e)),i}class V{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h$2).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.u.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=A.nextNode(),l++);}return o}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):c$4(t)?this.k(t):this.g(t);}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}g(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.T(h$2.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(s);else {const t=new V(o,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new C(t)),i}k(t){u$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.O(r$2()),this.O(r$2()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===b?void 0:t;}}const R=s$4?s$4.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==b?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const L={P:"$lit$",A:o$2,M:n$4,C:1,L:E,R:V,D:c$4,V:P,I:N,H:S,N:k,U:H,B:M,F:I},z=i$3.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t$2=i$3.litHtmlVersions)&&void 0!==t$2?t$2:i$3.litHtmlVersions=[]).push("2.6.1");const Z=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(r$2(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$2,o$1;let s$3 = class s extends d$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Z(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x}};s$3.finalized=!0,s$3._$litElement$=!0,null===(l$2=globalThis.litElementHydrateSupport)||void 0===l$2||l$2.call(globalThis,{LitElement:s$3});const n$3=globalThis.litElementPolyfillSupport;null==n$3||n$3({LitElement:s$3});(null!==(o$1=globalThis.litElementVersions)&&void 0!==o$1?o$1:globalThis.litElementVersions=[]).push("3.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$3=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$2(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$2(e,n)}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n$2;null!=(null===(n$2=window.HTMLSlotElement)||void 0===n$2?void 0:n$2.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$1=t=>(...e)=>({_$litDirective$:t,values:e});let i$1 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {I:l$1}=L,t=o=>null===o||"object"!=typeof o&&"function"!=typeof o,e=o=>void 0===o.strings,c$3=()=>document.createComment(""),r$1=(o,t,i)=>{var n;const d=o._$AA.parentNode,v=void 0===t?o._$AB:t._$AA;if(void 0===i){const t=d.insertBefore(c$3(),v),n=d.insertBefore(c$3(),v);i=new l$1(t,n,o,o.options);}else {const l=i._$AB.nextSibling,t=i._$AM,e=t!==o;if(e){let l;null===(n=i._$AQ)||void 0===n||n.call(i,o),i._$AM=o,void 0!==i._$AP&&(l=o._$AU)!==t._$AU&&i._$AP(l);}if(l!==v||e){let o=i._$AA;for(;o!==l;){const l=o.nextSibling;d.insertBefore(o,v),o=l;}}}return i},u$1=(o,l,t=o)=>(o._$AI(l,t),o),f={},s$2=(o,l=f)=>o._$AH=l,m=o=>o._$AH,p=o=>{var l;null===(l=o._$AP)||void 0===l||l.call(o,!1,!0);let t=o._$AA;const i=o._$AB.nextSibling;for(;t!==i;){const o=t.nextSibling;t.remove(),t=o;}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c$2=e$1(class extends i$1{constructor(e){if(super(e),e.type!==t$1.CHILD)throw Error("repeat() can only be used in text expressions")}ht(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.ht(e,s,t).values}update(s,[t,r,c]){var d;const a=m(s),{values:p$1,keys:v}=this.ht(t,r,c);if(!Array.isArray(a))return this.ut=v,p$1;const h=null!==(d=this.ut)&&void 0!==d?d:this.ut=[],m$1=[];let y,x$1,j=0,k=a.length-1,w=0,A=p$1.length-1;for(;j<=k&&w<=A;)if(null===a[j])j++;else if(null===a[k])k--;else if(h[j]===v[w])m$1[w]=u$1(a[j],p$1[w]),j++,w++;else if(h[k]===v[A])m$1[A]=u$1(a[k],p$1[A]),k--,A--;else if(h[j]===v[A])m$1[A]=u$1(a[j],p$1[A]),r$1(s,m$1[A+1],a[j]),j++,A--;else if(h[k]===v[w])m$1[w]=u$1(a[k],p$1[w]),r$1(s,a[j],a[k]),k--,w++;else if(void 0===y&&(y=u(v,w,A),x$1=u(h,j,k)),y.has(h[j]))if(y.has(h[k])){const e=x$1.get(v[w]),t=void 0!==e?a[e]:null;if(null===t){const e=r$1(s,a[j]);u$1(e,p$1[w]),m$1[w]=e;}else m$1[w]=u$1(t,p$1[w]),r$1(s,a[j],t),a[e]=null;w++;}else p(a[k]),k--;else p(a[j]),j++;for(;w<=A;){const e=r$1(s,m$1[A+1]);u$1(e,p$1[w]),m$1[w++]=e;}for(;j<=k;){const e=a[j++];null!==e&&p(e);}return this.ut=v,s$2(s,m$1),x}});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s$1=(i,t)=>{var e,o;const r=i._$AN;if(void 0===r)return !1;for(const i of r)null===(o=(e=i)._$AO)||void 0===o||o.call(e,t,!1),s$1(i,t);return !0},o=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t;}while(0===(null==e?void 0:e.size))},r=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),l(t);}};function n$1(i){void 0!==this._$AN?(o(this),this._$AM=i,r(this)):this._$AM=i;}function h$1(i,t=!1,e=0){const r=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(t)if(Array.isArray(r))for(let i=e;i<r.length;i++)s$1(r[i],!1),o(r[i]);else null!=r&&(s$1(r,!1),o(r));else s$1(this,i);}const l=i=>{var t,s,o,r;i.type==t$1.CHILD&&(null!==(t=(o=i)._$AP)&&void 0!==t||(o._$AP=h$1),null!==(s=(r=i)._$AQ)&&void 0!==s||(r._$AQ=n$1));};let c$1 = class c extends i$1{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,e){super._$AT(i,t,e),r(this),this.isConnected=i._$AU;}_$AO(i,t=!0){var e,r;i!==this.isConnected&&(this.isConnected=i,i?null===(e=this.reconnected)||void 0===e||e.call(this):null===(r=this.disconnected)||void 0===r||r.call(this)),t&&(s$1(this,i),o(this));}setValue(t){if(e(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}};

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class s{constructor(t){this.Y=t;}disconnect(){this.Y=void 0;}reconnect(t){this.Y=t;}deref(){return this.Y}}class i{constructor(){this.Z=void 0,this.q=void 0;}get(){return this.Z}pause(){var t;null!==(t=this.Z)&&void 0!==t||(this.Z=new Promise((t=>this.q=t)));}resume(){var t;null===(t=this.q)||void 0===t||t.call(this),this.Z=this.q=void 0;}}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n=t$1=>!t(t$1)&&"function"==typeof t$1.then;class h extends c$1{constructor(){super(...arguments),this._$Cwt=1073741823,this._$Cyt=[],this._$CK=new s(this),this._$CX=new i;}render(...s){var i;return null!==(i=s.find((t=>!n(t))))&&void 0!==i?i:x}update(s,i){const r=this._$Cyt;let e=r.length;this._$Cyt=i;const o=this._$CK,h=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<i.length&&!(t>this._$Cwt);t++){const s=i[t];if(!n(s))return this._$Cwt=t,s;t<e&&s===r[t]||(this._$Cwt=1073741823,e=0,Promise.resolve(s).then((async t=>{for(;h.get();)await h.get();const i=o.deref();if(void 0!==i){const r=i._$Cyt.indexOf(s);r>-1&&r<i._$Cwt&&(i._$Cwt=r,i.setValue(t));}})));}return x}disconnected(){this._$CK.disconnect(),this._$CX.pause();}reconnected(){this._$CK.reconnect(this),this._$CX.resume();}}const c=e$1(h);

const navElements = Object.freeze({
    logo: {
        src: 'logo_56x56.png',
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

const header = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
};

const imgs = Object.freeze({
    avatar: './assets/img/fallbacks/avatar.png',
});

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let MainNav = class MainNav extends s$3 {
    #activeClass = 'nav-elem-active';
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #clickOnNav(event) {
        if (event.key && event.key !== 'Enter') {
            return;
        }
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
        // Workaround for localized, because it only compiles statically
        const navStaticElements = Object.freeze({
            analytics: y `<span>${capitalize(msg('analytics'))}</span>`,
            dashboard: y `<span>${capitalize(msg('dashboard'))}</span>`,
            calendar: y `<span>${capitalize(msg('calendar'))}</span>`,
        });
        return c$2(navElements.items, (elem) => {
            if (!elem.viewable) {
                return;
            }
            return y `<div
                @click="${this.#clickOnNav}"
                @keyup="${this.#clickOnNav}"
                class="nav-element nav-element-click"
                name="${elem.name}"
                tabindex="0"
            >
                <sl-icon name="${elem.icon}"></sl-icon>&nbsp;&nbsp;${navStaticElements[elem.name]}
            </div>`;
        });
    }
    #renderNavFooter() {
        const hasFooter = !!navElements.items.find(elem => elem.isNavFooter);
        const content = fetch('/me', {
            method: 'GET',
            ...header,
        }).then(r => r.json());
        if (!hasFooter) {
            return;
        }
        return y `<footer class="nav-footer">
            <sl-avatar
                name="profile"
                @click="${this.#clickOnNav}"
                image="${c(content.then(function (data) {
            if (data.avatar) {
                return `${data.avatar}avatar_small.webp`;
            }
            return imgs.avatar;
        }), imgs.avatar)}"
                label="${msg('Your profile avatar')}"
            ></sl-avatar>
            <div isNavFooter="true" name="profile">
                <span
                    >${c(content.then(function (data) {
            return data.username;
        }), 'Loading...')}</span
                >
                <small
                    @click="${this.#clickOnNav}"
                    @keyup="${this.#clickOnNav}"
                    class="view-profile nav-element-click"
                    name="profile"
                    tabindex="0"
                >
                    ${msg('View Profile')}
                </small>
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
MainNav = __decorate$5([
    localized(),
    e$3('main-nav')
], MainNav);

/*!
 * @kurkle/color v0.3.2
 * https://github.com/kurkle/color#readme
 * (c) 2023 Jukka Kurkela
 * Released under the MIT License
 */
function round(v) {
  return v + 0.5 | 0;
}
const lim = (v, l, h) => Math.max(Math.min(v, h), l);
function p2b(v) {
  return lim(round(v * 2.55), 0, 255);
}
function n2b(v) {
  return lim(round(v * 255), 0, 255);
}
function b2n(v) {
  return lim(round(v / 2.55) / 100, 0, 1);
}
function n2p(v) {
  return lim(round(v * 100), 0, 100);
}

const map$1 = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15};
const hex = [...'0123456789ABCDEF'];
const h1 = b => hex[b & 0xF];
const h2 = b => hex[(b & 0xF0) >> 4] + hex[b & 0xF];
const eq = b => ((b & 0xF0) >> 4) === (b & 0xF);
const isShort = v => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
function hexParse(str) {
  var len = str.length;
  var ret;
  if (str[0] === '#') {
    if (len === 4 || len === 5) {
      ret = {
        r: 255 & map$1[str[1]] * 17,
        g: 255 & map$1[str[2]] * 17,
        b: 255 & map$1[str[3]] * 17,
        a: len === 5 ? map$1[str[4]] * 17 : 255
      };
    } else if (len === 7 || len === 9) {
      ret = {
        r: map$1[str[1]] << 4 | map$1[str[2]],
        g: map$1[str[3]] << 4 | map$1[str[4]],
        b: map$1[str[5]] << 4 | map$1[str[6]],
        a: len === 9 ? (map$1[str[7]] << 4 | map$1[str[8]]) : 255
      };
    }
  }
  return ret;
}
const alpha = (a, f) => a < 255 ? f(a) : '';
function hexString(v) {
  var f = isShort(v) ? h1 : h2;
  return v
    ? '#' + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f)
    : undefined;
}

const HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function hsl2rgbn(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
}
function hsv2rgbn(h, s, v) {
  const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5), f(3), f(1)];
}
function hwb2rgbn(h, w, b) {
  const rgb = hsl2rgbn(h, 1, 0.5);
  let i;
  if (w + b > 1) {
    i = 1 / (w + b);
    w *= i;
    b *= i;
  }
  for (i = 0; i < 3; i++) {
    rgb[i] *= 1 - w - b;
    rgb[i] += w;
  }
  return rgb;
}
function hueValue(r, g, b, d, max) {
  if (r === max) {
    return ((g - b) / d) + (g < b ? 6 : 0);
  }
  if (g === max) {
    return (b - r) / d + 2;
  }
  return (r - g) / d + 4;
}
function rgb2hsl(v) {
  const range = 255;
  const r = v.r / range;
  const g = v.g / range;
  const b = v.b / range;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h, s, d;
  if (max !== min) {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = hueValue(r, g, b, d, max);
    h = h * 60 + 0.5;
  }
  return [h | 0, s || 0, l];
}
function calln(f, a, b, c) {
  return (
    Array.isArray(a)
      ? f(a[0], a[1], a[2])
      : f(a, b, c)
  ).map(n2b);
}
function hsl2rgb(h, s, l) {
  return calln(hsl2rgbn, h, s, l);
}
function hwb2rgb(h, w, b) {
  return calln(hwb2rgbn, h, w, b);
}
function hsv2rgb(h, s, v) {
  return calln(hsv2rgbn, h, s, v);
}
function hue(h) {
  return (h % 360 + 360) % 360;
}
function hueParse(str) {
  const m = HUE_RE.exec(str);
  let a = 255;
  let v;
  if (!m) {
    return;
  }
  if (m[5] !== v) {
    a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
  }
  const h = hue(+m[2]);
  const p1 = +m[3] / 100;
  const p2 = +m[4] / 100;
  if (m[1] === 'hwb') {
    v = hwb2rgb(h, p1, p2);
  } else if (m[1] === 'hsv') {
    v = hsv2rgb(h, p1, p2);
  } else {
    v = hsl2rgb(h, p1, p2);
  }
  return {
    r: v[0],
    g: v[1],
    b: v[2],
    a: a
  };
}
function rotate(v, deg) {
  var h = rgb2hsl(v);
  h[0] = hue(h[0] + deg);
  h = hsl2rgb(h);
  v.r = h[0];
  v.g = h[1];
  v.b = h[2];
}
function hslString(v) {
  if (!v) {
    return;
  }
  const a = rgb2hsl(v);
  const h = a[0];
  const s = n2p(a[1]);
  const l = n2p(a[2]);
  return v.a < 255
    ? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})`
    : `hsl(${h}, ${s}%, ${l}%)`;
}

const map$2 = {
  x: 'dark',
  Z: 'light',
  Y: 're',
  X: 'blu',
  W: 'gr',
  V: 'medium',
  U: 'slate',
  A: 'ee',
  T: 'ol',
  S: 'or',
  B: 'ra',
  C: 'lateg',
  D: 'ights',
  R: 'in',
  Q: 'turquois',
  E: 'hi',
  P: 'ro',
  O: 'al',
  N: 'le',
  M: 'de',
  L: 'yello',
  F: 'en',
  K: 'ch',
  G: 'arks',
  H: 'ea',
  I: 'ightg',
  J: 'wh'
};
const names$1 = {
  OiceXe: 'f0f8ff',
  antiquewEte: 'faebd7',
  aqua: 'ffff',
  aquamarRe: '7fffd4',
  azuY: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '0',
  blanKedOmond: 'ffebcd',
  Xe: 'ff',
  XeviTet: '8a2be2',
  bPwn: 'a52a2a',
  burlywood: 'deb887',
  caMtXe: '5f9ea0',
  KartYuse: '7fff00',
  KocTate: 'd2691e',
  cSO: 'ff7f50',
  cSnflowerXe: '6495ed',
  cSnsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: 'ffff',
  xXe: '8b',
  xcyan: '8b8b',
  xgTMnPd: 'b8860b',
  xWay: 'a9a9a9',
  xgYF: '6400',
  xgYy: 'a9a9a9',
  xkhaki: 'bdb76b',
  xmagFta: '8b008b',
  xTivegYF: '556b2f',
  xSange: 'ff8c00',
  xScEd: '9932cc',
  xYd: '8b0000',
  xsOmon: 'e9967a',
  xsHgYF: '8fbc8f',
  xUXe: '483d8b',
  xUWay: '2f4f4f',
  xUgYy: '2f4f4f',
  xQe: 'ced1',
  xviTet: '9400d3',
  dAppRk: 'ff1493',
  dApskyXe: 'bfff',
  dimWay: '696969',
  dimgYy: '696969',
  dodgerXe: '1e90ff',
  fiYbrick: 'b22222',
  flSOwEte: 'fffaf0',
  foYstWAn: '228b22',
  fuKsia: 'ff00ff',
  gaRsbSo: 'dcdcdc',
  ghostwEte: 'f8f8ff',
  gTd: 'ffd700',
  gTMnPd: 'daa520',
  Way: '808080',
  gYF: '8000',
  gYFLw: 'adff2f',
  gYy: '808080',
  honeyMw: 'f0fff0',
  hotpRk: 'ff69b4',
  RdianYd: 'cd5c5c',
  Rdigo: '4b0082',
  ivSy: 'fffff0',
  khaki: 'f0e68c',
  lavFMr: 'e6e6fa',
  lavFMrXsh: 'fff0f5',
  lawngYF: '7cfc00',
  NmoncEffon: 'fffacd',
  ZXe: 'add8e6',
  ZcSO: 'f08080',
  Zcyan: 'e0ffff',
  ZgTMnPdLw: 'fafad2',
  ZWay: 'd3d3d3',
  ZgYF: '90ee90',
  ZgYy: 'd3d3d3',
  ZpRk: 'ffb6c1',
  ZsOmon: 'ffa07a',
  ZsHgYF: '20b2aa',
  ZskyXe: '87cefa',
  ZUWay: '778899',
  ZUgYy: '778899',
  ZstAlXe: 'b0c4de',
  ZLw: 'ffffe0',
  lime: 'ff00',
  limegYF: '32cd32',
  lRF: 'faf0e6',
  magFta: 'ff00ff',
  maPon: '800000',
  VaquamarRe: '66cdaa',
  VXe: 'cd',
  VScEd: 'ba55d3',
  VpurpN: '9370db',
  VsHgYF: '3cb371',
  VUXe: '7b68ee',
  VsprRggYF: 'fa9a',
  VQe: '48d1cc',
  VviTetYd: 'c71585',
  midnightXe: '191970',
  mRtcYam: 'f5fffa',
  mistyPse: 'ffe4e1',
  moccasR: 'ffe4b5',
  navajowEte: 'ffdead',
  navy: '80',
  Tdlace: 'fdf5e6',
  Tive: '808000',
  TivedBb: '6b8e23',
  Sange: 'ffa500',
  SangeYd: 'ff4500',
  ScEd: 'da70d6',
  pOegTMnPd: 'eee8aa',
  pOegYF: '98fb98',
  pOeQe: 'afeeee',
  pOeviTetYd: 'db7093',
  papayawEp: 'ffefd5',
  pHKpuff: 'ffdab9',
  peru: 'cd853f',
  pRk: 'ffc0cb',
  plum: 'dda0dd',
  powMrXe: 'b0e0e6',
  purpN: '800080',
  YbeccapurpN: '663399',
  Yd: 'ff0000',
  Psybrown: 'bc8f8f',
  PyOXe: '4169e1',
  saddNbPwn: '8b4513',
  sOmon: 'fa8072',
  sandybPwn: 'f4a460',
  sHgYF: '2e8b57',
  sHshell: 'fff5ee',
  siFna: 'a0522d',
  silver: 'c0c0c0',
  skyXe: '87ceeb',
  UXe: '6a5acd',
  UWay: '708090',
  UgYy: '708090',
  snow: 'fffafa',
  sprRggYF: 'ff7f',
  stAlXe: '4682b4',
  tan: 'd2b48c',
  teO: '8080',
  tEstN: 'd8bfd8',
  tomato: 'ff6347',
  Qe: '40e0d0',
  viTet: 'ee82ee',
  JHt: 'f5deb3',
  wEte: 'ffffff',
  wEtesmoke: 'f5f5f5',
  Lw: 'ffff00',
  LwgYF: '9acd32'
};
function unpack() {
  const unpacked = {};
  const keys = Object.keys(names$1);
  const tkeys = Object.keys(map$2);
  let i, j, k, ok, nk;
  for (i = 0; i < keys.length; i++) {
    ok = nk = keys[i];
    for (j = 0; j < tkeys.length; j++) {
      k = tkeys[j];
      nk = nk.replace(k, map$2[k]);
    }
    k = parseInt(names$1[ok], 16);
    unpacked[nk] = [k >> 16 & 0xFF, k >> 8 & 0xFF, k & 0xFF];
  }
  return unpacked;
}

let names;
function nameParse(str) {
  if (!names) {
    names = unpack();
    names.transparent = [0, 0, 0, 0];
  }
  const a = names[str.toLowerCase()];
  return a && {
    r: a[0],
    g: a[1],
    b: a[2],
    a: a.length === 4 ? a[3] : 255
  };
}

const RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function rgbParse(str) {
  const m = RGB_RE.exec(str);
  let a = 255;
  let r, g, b;
  if (!m) {
    return;
  }
  if (m[7] !== r) {
    const v = +m[7];
    a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
  }
  r = +m[1];
  g = +m[3];
  b = +m[5];
  r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
  g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
  b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
function rgbString(v) {
  return v && (
    v.a < 255
      ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})`
      : `rgb(${v.r}, ${v.g}, ${v.b})`
  );
}

const to = v => v <= 0.0031308 ? v * 12.92 : Math.pow(v, 1.0 / 2.4) * 1.055 - 0.055;
const from = v => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
function interpolate$1(rgb1, rgb2, t) {
  const r = from(b2n(rgb1.r));
  const g = from(b2n(rgb1.g));
  const b = from(b2n(rgb1.b));
  return {
    r: n2b(to(r + t * (from(b2n(rgb2.r)) - r))),
    g: n2b(to(g + t * (from(b2n(rgb2.g)) - g))),
    b: n2b(to(b + t * (from(b2n(rgb2.b)) - b))),
    a: rgb1.a + t * (rgb2.a - rgb1.a)
  };
}

function modHSL(v, i, ratio) {
  if (v) {
    let tmp = rgb2hsl(v);
    tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
    tmp = hsl2rgb(tmp);
    v.r = tmp[0];
    v.g = tmp[1];
    v.b = tmp[2];
  }
}
function clone$1(v, proto) {
  return v ? Object.assign(proto || {}, v) : v;
}
function fromObject(input) {
  var v = {r: 0, g: 0, b: 0, a: 255};
  if (Array.isArray(input)) {
    if (input.length >= 3) {
      v = {r: input[0], g: input[1], b: input[2], a: 255};
      if (input.length > 3) {
        v.a = n2b(input[3]);
      }
    }
  } else {
    v = clone$1(input, {r: 0, g: 0, b: 0, a: 1});
    v.a = n2b(v.a);
  }
  return v;
}
function functionParse(str) {
  if (str.charAt(0) === 'r') {
    return rgbParse(str);
  }
  return hueParse(str);
}
class Color {
  constructor(input) {
    if (input instanceof Color) {
      return input;
    }
    const type = typeof input;
    let v;
    if (type === 'object') {
      v = fromObject(input);
    } else if (type === 'string') {
      v = hexParse(input) || nameParse(input) || functionParse(input);
    }
    this._rgb = v;
    this._valid = !!v;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var v = clone$1(this._rgb);
    if (v) {
      v.a = b2n(v.a);
    }
    return v;
  }
  set rgb(obj) {
    this._rgb = fromObject(obj);
  }
  rgbString() {
    return this._valid ? rgbString(this._rgb) : undefined;
  }
  hexString() {
    return this._valid ? hexString(this._rgb) : undefined;
  }
  hslString() {
    return this._valid ? hslString(this._rgb) : undefined;
  }
  mix(color, weight) {
    if (color) {
      const c1 = this.rgb;
      const c2 = color.rgb;
      let w2;
      const p = weight === w2 ? 0.5 : weight;
      const w = 2 * p - 1;
      const a = c1.a - c2.a;
      const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
      w2 = 1 - w1;
      c1.r = 0xFF & w1 * c1.r + w2 * c2.r + 0.5;
      c1.g = 0xFF & w1 * c1.g + w2 * c2.g + 0.5;
      c1.b = 0xFF & w1 * c1.b + w2 * c2.b + 0.5;
      c1.a = p * c1.a + (1 - p) * c2.a;
      this.rgb = c1;
    }
    return this;
  }
  interpolate(color, t) {
    if (color) {
      this._rgb = interpolate$1(this._rgb, color._rgb, t);
    }
    return this;
  }
  clone() {
    return new Color(this.rgb);
  }
  alpha(a) {
    this._rgb.a = n2b(a);
    return this;
  }
  clearer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 - ratio;
    return this;
  }
  greyscale() {
    const rgb = this._rgb;
    const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
    rgb.r = rgb.g = rgb.b = val;
    return this;
  }
  opaquer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 + ratio;
    return this;
  }
  negate() {
    const v = this._rgb;
    v.r = 255 - v.r;
    v.g = 255 - v.g;
    v.b = 255 - v.b;
    return this;
  }
  lighten(ratio) {
    modHSL(this._rgb, 2, ratio);
    return this;
  }
  darken(ratio) {
    modHSL(this._rgb, 2, -ratio);
    return this;
  }
  saturate(ratio) {
    modHSL(this._rgb, 1, ratio);
    return this;
  }
  desaturate(ratio) {
    modHSL(this._rgb, 1, -ratio);
    return this;
  }
  rotate(deg) {
    rotate(this._rgb, deg);
    return this;
  }
}

/*!
 * Chart.js v4.1.2
 * https://www.chartjs.org
 * (c) 2023 Chart.js Contributors
 * Released under the MIT License
 */

/**
 * @namespace Chart.helpers
 */ /**
 * An empty function that can be used, for example, for optional callback.
 */ function noop() {
/* noop */ }
/**
 * Returns a unique id, sequentially generated from a global variable.
 */ const uid = (()=>{
    let id = 0;
    return ()=>id++;
})();
/**
 * Returns true if `value` is neither null nor undefined, else returns false.
 * @param value - The value to test.
 * @since 2.7.0
 */ function isNullOrUndef(value) {
    return value === null || typeof value === 'undefined';
}
/**
 * Returns true if `value` is an array (including typed arrays), else returns false.
 * @param value - The value to test.
 * @function
 */ function isArray(value) {
    if (Array.isArray && Array.isArray(value)) {
        return true;
    }
    const type = Object.prototype.toString.call(value);
    if (type.slice(0, 7) === '[object' && type.slice(-6) === 'Array]') {
        return true;
    }
    return false;
}
/**
 * Returns true if `value` is an object (excluding null), else returns false.
 * @param value - The value to test.
 * @since 2.7.0
 */ function isObject(value) {
    return value !== null && Object.prototype.toString.call(value) === '[object Object]';
}
/**
 * Returns true if `value` is a finite number, else returns false
 * @param value  - The value to test.
 */ function isNumberFinite(value) {
    return (typeof value === 'number' || value instanceof Number) && isFinite(+value);
}
/**
 * Returns `value` if finite, else returns `defaultValue`.
 * @param value - The value to return if defined.
 * @param defaultValue - The value to return if `value` is not finite.
 */ function finiteOrDefault(value, defaultValue) {
    return isNumberFinite(value) ? value : defaultValue;
}
/**
 * Returns `value` if defined, else returns `defaultValue`.
 * @param value - The value to return if defined.
 * @param defaultValue - The value to return if `value` is undefined.
 */ function valueOrDefault(value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
}
const toPercentage = (value, dimension)=>typeof value === 'string' && value.endsWith('%') ? parseFloat(value) / 100 : +value / dimension;
const toDimension = (value, dimension)=>typeof value === 'string' && value.endsWith('%') ? parseFloat(value) / 100 * dimension : +value;
/**
 * Calls `fn` with the given `args` in the scope defined by `thisArg` and returns the
 * value returned by `fn`. If `fn` is not a function, this method returns undefined.
 * @param fn - The function to call.
 * @param args - The arguments with which `fn` should be called.
 * @param [thisArg] - The value of `this` provided for the call to `fn`.
 */ function callback(fn, args, thisArg) {
    if (fn && typeof fn.call === 'function') {
        return fn.apply(thisArg, args);
    }
}
function each(loopable, fn, thisArg, reverse) {
    let i, len, keys;
    if (isArray(loopable)) {
        len = loopable.length;
        if (reverse) {
            for(i = len - 1; i >= 0; i--){
                fn.call(thisArg, loopable[i], i);
            }
        } else {
            for(i = 0; i < len; i++){
                fn.call(thisArg, loopable[i], i);
            }
        }
    } else if (isObject(loopable)) {
        keys = Object.keys(loopable);
        len = keys.length;
        for(i = 0; i < len; i++){
            fn.call(thisArg, loopable[keys[i]], keys[i]);
        }
    }
}
/**
 * Returns true if the `a0` and `a1` arrays have the same content, else returns false.
 * @param a0 - The array to compare
 * @param a1 - The array to compare
 * @private
 */ function _elementsEqual(a0, a1) {
    let i, ilen, v0, v1;
    if (!a0 || !a1 || a0.length !== a1.length) {
        return false;
    }
    for(i = 0, ilen = a0.length; i < ilen; ++i){
        v0 = a0[i];
        v1 = a1[i];
        if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
            return false;
        }
    }
    return true;
}
/**
 * Returns a deep copy of `source` without keeping references on objects and arrays.
 * @param source - The value to clone.
 */ function clone(source) {
    if (isArray(source)) {
        return source.map(clone);
    }
    if (isObject(source)) {
        const target = Object.create(null);
        const keys = Object.keys(source);
        const klen = keys.length;
        let k = 0;
        for(; k < klen; ++k){
            target[keys[k]] = clone(source[keys[k]]);
        }
        return target;
    }
    return source;
}
function isValidKey(key) {
    return [
        '__proto__',
        'prototype',
        'constructor'
    ].indexOf(key) === -1;
}
/**
 * The default merger when Chart.helpers.merge is called without merger option.
 * Note(SB): also used by mergeConfig and mergeScaleConfig as fallback.
 * @private
 */ function _merger(key, target, source, options) {
    if (!isValidKey(key)) {
        return;
    }
    const tval = target[key];
    const sval = source[key];
    if (isObject(tval) && isObject(sval)) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        merge(tval, sval, options);
    } else {
        target[key] = clone(sval);
    }
}
function merge(target, source, options) {
    const sources = isArray(source) ? source : [
        source
    ];
    const ilen = sources.length;
    if (!isObject(target)) {
        return target;
    }
    options = options || {};
    const merger = options.merger || _merger;
    let current;
    for(let i = 0; i < ilen; ++i){
        current = sources[i];
        if (!isObject(current)) {
            continue;
        }
        const keys = Object.keys(current);
        for(let k = 0, klen = keys.length; k < klen; ++k){
            merger(keys[k], target, current, options);
        }
    }
    return target;
}
function mergeIf(target, source) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return merge(target, source, {
        merger: _mergerIf
    });
}
/**
 * Merges source[key] in target[key] only if target[key] is undefined.
 * @private
 */ function _mergerIf(key, target, source) {
    if (!isValidKey(key)) {
        return;
    }
    const tval = target[key];
    const sval = source[key];
    if (isObject(tval) && isObject(sval)) {
        mergeIf(tval, sval);
    } else if (!Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = clone(sval);
    }
}
// resolveObjectKey resolver cache
const keyResolvers = {
    // Chart.helpers.core resolveObjectKey should resolve empty key to root object
    '': (v)=>v,
    // default resolvers
    x: (o)=>o.x,
    y: (o)=>o.y
};
/**
 * @private
 */ function _splitKey(key) {
    const parts = key.split('.');
    const keys = [];
    let tmp = '';
    for (const part of parts){
        tmp += part;
        if (tmp.endsWith('\\')) {
            tmp = tmp.slice(0, -1) + '.';
        } else {
            keys.push(tmp);
            tmp = '';
        }
    }
    return keys;
}
function _getKeyResolver(key) {
    const keys = _splitKey(key);
    return (obj)=>{
        for (const k of keys){
            if (k === '') {
                break;
            }
            obj = obj && obj[k];
        }
        return obj;
    };
}
function resolveObjectKey(obj, key) {
    const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
    return resolver(obj);
}
/**
 * @private
 */ function _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const defined = (value)=>typeof value !== 'undefined';
const isFunction = (value)=>typeof value === 'function';
// Adapted from https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality#31129384
const setsEqual = (a, b)=>{
    if (a.size !== b.size) {
        return false;
    }
    for (const item of a){
        if (!b.has(item)) {
            return false;
        }
    }
    return true;
};
/**
 * @param e - The event
 * @private
 */ function _isClickEvent(e) {
    return e.type === 'mouseup' || e.type === 'click' || e.type === 'contextmenu';
}

/**
 * @alias Chart.helpers.math
 * @namespace
 */ const PI = Math.PI;
const TAU = 2 * PI;
const PITAU = TAU + PI;
const INFINITY = Number.POSITIVE_INFINITY;
const RAD_PER_DEG = PI / 180;
const HALF_PI = PI / 2;
const QUARTER_PI = PI / 4;
const TWO_THIRDS_PI = PI * 2 / 3;
const log10 = Math.log10;
const sign = Math.sign;
function almostEquals(x, y, epsilon) {
    return Math.abs(x - y) < epsilon;
}
/**
 * Implementation of the nice number algorithm used in determining where axis labels will go
 */ function niceNum(range) {
    const roundedRange = Math.round(range);
    range = almostEquals(range, roundedRange, range / 1000) ? roundedRange : range;
    const niceRange = Math.pow(10, Math.floor(log10(range)));
    const fraction = range / niceRange;
    const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
    return niceFraction * niceRange;
}
/**
 * Returns an array of factors sorted from 1 to sqrt(value)
 * @private
 */ function _factorize(value) {
    const result = [];
    const sqrt = Math.sqrt(value);
    let i;
    for(i = 1; i < sqrt; i++){
        if (value % i === 0) {
            result.push(i);
            result.push(value / i);
        }
    }
    if (sqrt === (sqrt | 0)) {
        result.push(sqrt);
    }
    result.sort((a, b)=>a - b).pop();
    return result;
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function almostWhole(x, epsilon) {
    const rounded = Math.round(x);
    return rounded - epsilon <= x && rounded + epsilon >= x;
}
/**
 * @private
 */ function _setMinAndMaxByKey(array, target, property) {
    let i, ilen, value;
    for(i = 0, ilen = array.length; i < ilen; i++){
        value = array[i][property];
        if (!isNaN(value)) {
            target.min = Math.min(target.min, value);
            target.max = Math.max(target.max, value);
        }
    }
}
function toRadians(degrees) {
    return degrees * (PI / 180);
}
function toDegrees(radians) {
    return radians * (180 / PI);
}
/**
 * Returns the number of decimal places
 * i.e. the number of digits after the decimal point, of the value of this Number.
 * @param x - A number.
 * @returns The number of decimal places.
 * @private
 */ function _decimalPlaces(x) {
    if (!isNumberFinite(x)) {
        return;
    }
    let e = 1;
    let p = 0;
    while(Math.round(x * e) / e !== x){
        e *= 10;
        p++;
    }
    return p;
}
// Gets the angle from vertical upright to the point about a centre.
function getAngleFromPoint(centrePoint, anglePoint) {
    const distanceFromXCenter = anglePoint.x - centrePoint.x;
    const distanceFromYCenter = anglePoint.y - centrePoint.y;
    const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
    let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
    if (angle < -0.5 * PI) {
        angle += TAU; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
    }
    return {
        angle,
        distance: radialDistanceFromCenter
    };
}
function distanceBetweenPoints(pt1, pt2) {
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
/**
 * Shortest distance between angles, in either direction.
 * @private
 */ function _angleDiff(a, b) {
    return (a - b + PITAU) % TAU - PI;
}
/**
 * Normalize angle to be between 0 and 2*PI
 * @private
 */ function _normalizeAngle(a) {
    return (a % TAU + TAU) % TAU;
}
/**
 * @private
 */ function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
    const a = _normalizeAngle(angle);
    const s = _normalizeAngle(start);
    const e = _normalizeAngle(end);
    const angleToStart = _normalizeAngle(s - a);
    const angleToEnd = _normalizeAngle(e - a);
    const startToAngle = _normalizeAngle(a - s);
    const endToAngle = _normalizeAngle(a - e);
    return a === s || a === e || sameAngleIsFullCircle && s === e || angleToStart > angleToEnd && startToAngle < endToAngle;
}
/**
 * Limit `value` between `min` and `max`
 * @param value
 * @param min
 * @param max
 * @private
 */ function _limitValue(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
/**
 * @param {number} value
 * @private
 */ function _int16Range(value) {
    return _limitValue(value, -32768, 32767);
}
/**
 * @param value
 * @param start
 * @param end
 * @param [epsilon]
 * @private
 */ function _isBetween(value, start, end, epsilon = 1e-6) {
    return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
}

function _lookup(table, value, cmp) {
    cmp = cmp || ((index)=>table[index] < value);
    let hi = table.length - 1;
    let lo = 0;
    let mid;
    while(hi - lo > 1){
        mid = lo + hi >> 1;
        if (cmp(mid)) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return {
        lo,
        hi
    };
}
/**
 * Binary search
 * @param table - the table search. must be sorted!
 * @param key - property name for the value in each entry
 * @param value - value to find
 * @param last - lookup last index
 * @private
 */ const _lookupByKey = (table, key, value, last)=>_lookup(table, value, last ? (index)=>{
        const ti = table[index][key];
        return ti < value || ti === value && table[index + 1][key] === value;
    } : (index)=>table[index][key] < value);
/**
 * Reverse binary search
 * @param table - the table search. must be sorted!
 * @param key - property name for the value in each entry
 * @param value - value to find
 * @private
 */ const _rlookupByKey = (table, key, value)=>_lookup(table, value, (index)=>table[index][key] >= value);
/**
 * Return subset of `values` between `min` and `max` inclusive.
 * Values are assumed to be in sorted order.
 * @param values - sorted array of values
 * @param min - min value
 * @param max - max value
 */ function _filterBetween(values, min, max) {
    let start = 0;
    let end = values.length;
    while(start < end && values[start] < min){
        start++;
    }
    while(end > start && values[end - 1] > max){
        end--;
    }
    return start > 0 || end < values.length ? values.slice(start, end) : values;
}
const arrayEvents = [
    'push',
    'pop',
    'shift',
    'splice',
    'unshift'
];
function listenArrayEvents(array, listener) {
    if (array._chartjs) {
        array._chartjs.listeners.push(listener);
        return;
    }
    Object.defineProperty(array, '_chartjs', {
        configurable: true,
        enumerable: false,
        value: {
            listeners: [
                listener
            ]
        }
    });
    arrayEvents.forEach((key)=>{
        const method = '_onData' + _capitalize(key);
        const base = array[key];
        Object.defineProperty(array, key, {
            configurable: true,
            enumerable: false,
            value (...args) {
                const res = base.apply(this, args);
                array._chartjs.listeners.forEach((object)=>{
                    if (typeof object[method] === 'function') {
                        object[method](...args);
                    }
                });
                return res;
            }
        });
    });
}
function unlistenArrayEvents(array, listener) {
    const stub = array._chartjs;
    if (!stub) {
        return;
    }
    const listeners = stub.listeners;
    const index = listeners.indexOf(listener);
    if (index !== -1) {
        listeners.splice(index, 1);
    }
    if (listeners.length > 0) {
        return;
    }
    arrayEvents.forEach((key)=>{
        delete array[key];
    });
    delete array._chartjs;
}
/**
 * @param items
 */ function _arrayUnique(items) {
    const set = new Set();
    let i, ilen;
    for(i = 0, ilen = items.length; i < ilen; ++i){
        set.add(items[i]);
    }
    if (set.size === ilen) {
        return items;
    }
    return Array.from(set);
}
/**
* Request animation polyfill
*/ const requestAnimFrame = function() {
    if (typeof window === 'undefined') {
        return function(callback) {
            return callback();
        };
    }
    return window.requestAnimationFrame;
}();
/**
 * Throttles calling `fn` once per animation frame
 * Latest arguments are used on the actual call
 */ function throttled(fn, thisArg) {
    let argsToUse = [];
    let ticking = false;
    return function(...args) {
        // Save the args for use later
        argsToUse = args;
        if (!ticking) {
            ticking = true;
            requestAnimFrame.call(window, ()=>{
                ticking = false;
                fn.apply(thisArg, argsToUse);
            });
        }
    };
}
/**
 * Debounces calling `fn` for `delay` ms
 */ function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        if (delay) {
            clearTimeout(timeout);
            timeout = setTimeout(fn, delay, args);
        } else {
            fn.apply(this, args);
        }
        return delay;
    };
}
/**
 * Converts 'start' to 'left', 'end' to 'right' and others to 'center'
 * @private
 */ const _toLeftRightCenter = (align)=>align === 'start' ? 'left' : align === 'end' ? 'right' : 'center';
/**
 * Returns `start`, `end` or `(start + end) / 2` depending on `align`. Defaults to `center`
 * @private
 */ const _alignStartEnd = (align, start, end)=>align === 'start' ? start : align === 'end' ? end : (start + end) / 2;
/**
 * Returns `left`, `right` or `(left + right) / 2` depending on `align`. Defaults to `left`
 * @private
 */ const _textX = (align, left, right, rtl)=>{
    const check = rtl ? 'left' : 'right';
    return align === check ? right : align === 'center' ? (left + right) / 2 : left;
};
/**
 * Return start and count of visible points.
 * @private
 */ function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
    const pointCount = points.length;
    let start = 0;
    let count = pointCount;
    if (meta._sorted) {
        const { iScale , _parsed  } = meta;
        const axis = iScale.axis;
        const { min , max , minDefined , maxDefined  } = iScale.getUserBounds();
        if (minDefined) {
            start = _limitValue(Math.min(// @ts-expect-error Need to type _parsed
            _lookupByKey(_parsed, iScale.axis, min).lo, // @ts-expect-error Need to fix types on _lookupByKey
            animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo), 0, pointCount - 1);
        }
        if (maxDefined) {
            count = _limitValue(Math.max(// @ts-expect-error Need to type _parsed
            _lookupByKey(_parsed, iScale.axis, max, true).hi + 1, // @ts-expect-error Need to fix types on _lookupByKey
            animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max), true).hi + 1), start, pointCount) - start;
        } else {
            count = pointCount - start;
        }
    }
    return {
        start,
        count
    };
}
/**
 * Checks if the scale ranges have changed.
 * @param {object} meta - dataset meta.
 * @returns {boolean}
 * @private
 */ function _scaleRangesChanged(meta) {
    const { xScale , yScale , _scaleRanges  } = meta;
    const newRanges = {
        xmin: xScale.min,
        xmax: xScale.max,
        ymin: yScale.min,
        ymax: yScale.max
    };
    if (!_scaleRanges) {
        meta._scaleRanges = newRanges;
        return true;
    }
    const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
    Object.assign(_scaleRanges, newRanges);
    return changed;
}

const atEdge = (t)=>t === 0 || t === 1;
const elasticIn = (t, s, p)=>-(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * TAU / p));
const elasticOut = (t, s, p)=>Math.pow(2, -10 * t) * Math.sin((t - s) * TAU / p) + 1;
/**
 * Easing functions adapted from Robert Penner's easing equations.
 * @namespace Chart.helpers.easing.effects
 * @see http://www.robertpenner.com/easing/
 */ const effects = {
    linear: (t)=>t,
    easeInQuad: (t)=>t * t,
    easeOutQuad: (t)=>-t * (t - 2),
    easeInOutQuad: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
    easeInCubic: (t)=>t * t * t,
    easeOutCubic: (t)=>(t -= 1) * t * t + 1,
    easeInOutCubic: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
    easeInQuart: (t)=>t * t * t * t,
    easeOutQuart: (t)=>-((t -= 1) * t * t * t - 1),
    easeInOutQuart: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
    easeInQuint: (t)=>t * t * t * t * t,
    easeOutQuint: (t)=>(t -= 1) * t * t * t * t + 1,
    easeInOutQuint: (t)=>(t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
    easeInSine: (t)=>-Math.cos(t * HALF_PI) + 1,
    easeOutSine: (t)=>Math.sin(t * HALF_PI),
    easeInOutSine: (t)=>-0.5 * (Math.cos(PI * t) - 1),
    easeInExpo: (t)=>t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
    easeOutExpo: (t)=>t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
    easeInOutExpo: (t)=>atEdge(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
    easeInCirc: (t)=>t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
    easeOutCirc: (t)=>Math.sqrt(1 - (t -= 1) * t),
    easeInOutCirc: (t)=>(t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
    easeInElastic: (t)=>atEdge(t) ? t : elasticIn(t, 0.075, 0.3),
    easeOutElastic: (t)=>atEdge(t) ? t : elasticOut(t, 0.075, 0.3),
    easeInOutElastic (t) {
        const s = 0.1125;
        const p = 0.45;
        return atEdge(t) ? t : t < 0.5 ? 0.5 * elasticIn(t * 2, s, p) : 0.5 + 0.5 * elasticOut(t * 2 - 1, s, p);
    },
    easeInBack (t) {
        const s = 1.70158;
        return t * t * ((s + 1) * t - s);
    },
    easeOutBack (t) {
        const s = 1.70158;
        return (t -= 1) * t * ((s + 1) * t + s) + 1;
    },
    easeInOutBack (t) {
        let s = 1.70158;
        if ((t /= 0.5) < 1) {
            return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
        }
        return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    },
    easeInBounce: (t)=>1 - effects.easeOutBounce(1 - t),
    easeOutBounce (t) {
        const m = 7.5625;
        const d = 2.75;
        if (t < 1 / d) {
            return m * t * t;
        }
        if (t < 2 / d) {
            return m * (t -= 1.5 / d) * t + 0.75;
        }
        if (t < 2.5 / d) {
            return m * (t -= 2.25 / d) * t + 0.9375;
        }
        return m * (t -= 2.625 / d) * t + 0.984375;
    },
    easeInOutBounce: (t)=>t < 0.5 ? effects.easeInBounce(t * 2) * 0.5 : effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
};

function isPatternOrGradient(value) {
    if (value && typeof value === 'object') {
        const type = value.toString();
        return type === '[object CanvasPattern]' || type === '[object CanvasGradient]';
    }
    return false;
}
function color(value) {
    return isPatternOrGradient(value) ? value : new Color(value);
}
function getHoverColor(value) {
    return isPatternOrGradient(value) ? value : new Color(value).saturate(0.5).darken(0.1).hexString();
}

const numbers = [
    'x',
    'y',
    'borderWidth',
    'radius',
    'tension'
];
const colors = [
    'color',
    'borderColor',
    'backgroundColor'
];
function applyAnimationsDefaults(defaults) {
    defaults.set('animation', {
        delay: undefined,
        duration: 1000,
        easing: 'easeOutQuart',
        fn: undefined,
        from: undefined,
        loop: undefined,
        to: undefined,
        type: undefined
    });
    defaults.describe('animation', {
        _fallback: false,
        _indexable: false,
        _scriptable: (name)=>name !== 'onProgress' && name !== 'onComplete' && name !== 'fn'
    });
    defaults.set('animations', {
        colors: {
            type: 'color',
            properties: colors
        },
        numbers: {
            type: 'number',
            properties: numbers
        }
    });
    defaults.describe('animations', {
        _fallback: 'animation'
    });
    defaults.set('transitions', {
        active: {
            animation: {
                duration: 400
            }
        },
        resize: {
            animation: {
                duration: 0
            }
        },
        show: {
            animations: {
                colors: {
                    from: 'transparent'
                },
                visible: {
                    type: 'boolean',
                    duration: 0
                }
            }
        },
        hide: {
            animations: {
                colors: {
                    to: 'transparent'
                },
                visible: {
                    type: 'boolean',
                    easing: 'linear',
                    fn: (v)=>v | 0
                }
            }
        }
    });
}

function applyLayoutsDefaults(defaults) {
    defaults.set('layout', {
        autoPadding: true,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    });
}

const intlCache = new Map();
function getNumberFormat(locale, options) {
    options = options || {};
    const cacheKey = locale + JSON.stringify(options);
    let formatter = intlCache.get(cacheKey);
    if (!formatter) {
        formatter = new Intl.NumberFormat(locale, options);
        intlCache.set(cacheKey, formatter);
    }
    return formatter;
}
function formatNumber(num, locale, options) {
    return getNumberFormat(locale, options).format(num);
}

const formatters = {
 values (value) {
        return isArray(value) ?  value : '' + value;
    },
 numeric (tickValue, index, ticks) {
        if (tickValue === 0) {
            return '0';
        }
        const locale = this.chart.options.locale;
        let notation;
        let delta = tickValue;
        if (ticks.length > 1) {
            const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
            if (maxTick < 1e-4 || maxTick > 1e+15) {
                notation = 'scientific';
            }
            delta = calculateDelta(tickValue, ticks);
        }
        const logDelta = log10(Math.abs(delta));
        const numDecimal = Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
        const options = {
            notation,
            minimumFractionDigits: numDecimal,
            maximumFractionDigits: numDecimal
        };
        Object.assign(options, this.options.ticks.format);
        return formatNumber(tickValue, locale, options);
    },
 logarithmic (tickValue, index, ticks) {
        if (tickValue === 0) {
            return '0';
        }
        const remain = ticks[index].significand || tickValue / Math.pow(10, Math.floor(log10(tickValue)));
        if ([
            1,
            2,
            3,
            5,
            10,
            15
        ].includes(remain) || index > 0.8 * ticks.length) {
            return formatters.numeric.call(this, tickValue, index, ticks);
        }
        return '';
    }
};
function calculateDelta(tickValue, ticks) {
    let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
    if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
        delta = tickValue - Math.floor(tickValue);
    }
    return delta;
}
 var Ticks = {
    formatters
};

function applyScaleDefaults(defaults) {
    defaults.set('scale', {
        display: true,
        offset: false,
        reverse: false,
        beginAtZero: false,
 bounds: 'ticks',
 grace: 0,
        grid: {
            display: true,
            lineWidth: 1,
            drawOnChartArea: true,
            drawTicks: true,
            tickLength: 8,
            tickWidth: (_ctx, options)=>options.lineWidth,
            tickColor: (_ctx, options)=>options.color,
            offset: false
        },
        border: {
            display: true,
            dash: [],
            dashOffset: 0.0,
            width: 1
        },
        title: {
            display: false,
            text: '',
            padding: {
                top: 4,
                bottom: 4
            }
        },
        ticks: {
            minRotation: 0,
            maxRotation: 50,
            mirror: false,
            textStrokeWidth: 0,
            textStrokeColor: '',
            padding: 3,
            display: true,
            autoSkip: true,
            autoSkipPadding: 3,
            labelOffset: 0,
            callback: Ticks.formatters.values,
            minor: {},
            major: {},
            align: 'center',
            crossAlign: 'near',
            showLabelBackdrop: false,
            backdropColor: 'rgba(255, 255, 255, 0.75)',
            backdropPadding: 2
        }
    });
    defaults.route('scale.ticks', 'color', '', 'color');
    defaults.route('scale.grid', 'color', '', 'borderColor');
    defaults.route('scale.border', 'color', '', 'borderColor');
    defaults.route('scale.title', 'color', '', 'color');
    defaults.describe('scale', {
        _fallback: false,
        _scriptable: (name)=>!name.startsWith('before') && !name.startsWith('after') && name !== 'callback' && name !== 'parser',
        _indexable: (name)=>name !== 'borderDash' && name !== 'tickBorderDash' && name !== 'dash'
    });
    defaults.describe('scales', {
        _fallback: 'scale'
    });
    defaults.describe('scale.ticks', {
        _scriptable: (name)=>name !== 'backdropPadding' && name !== 'callback',
        _indexable: (name)=>name !== 'backdropPadding'
    });
}

const overrides = Object.create(null);
const descriptors = Object.create(null);
 function getScope$1(node, key) {
    if (!key) {
        return node;
    }
    const keys = key.split('.');
    for(let i = 0, n = keys.length; i < n; ++i){
        const k = keys[i];
        node = node[k] || (node[k] = Object.create(null));
    }
    return node;
}
function set(root, scope, values) {
    if (typeof scope === 'string') {
        return merge(getScope$1(root, scope), values);
    }
    return merge(getScope$1(root, ''), scope);
}
 class Defaults {
    constructor(_descriptors, _appliers){
        this.animation = undefined;
        this.backgroundColor = 'rgba(0,0,0,0.1)';
        this.borderColor = 'rgba(0,0,0,0.1)';
        this.color = '#666';
        this.datasets = {};
        this.devicePixelRatio = (context)=>context.chart.platform.getDevicePixelRatio();
        this.elements = {};
        this.events = [
            'mousemove',
            'mouseout',
            'click',
            'touchstart',
            'touchmove'
        ];
        this.font = {
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: 12,
            style: 'normal',
            lineHeight: 1.2,
            weight: null
        };
        this.hover = {};
        this.hoverBackgroundColor = (ctx, options)=>getHoverColor(options.backgroundColor);
        this.hoverBorderColor = (ctx, options)=>getHoverColor(options.borderColor);
        this.hoverColor = (ctx, options)=>getHoverColor(options.color);
        this.indexAxis = 'x';
        this.interaction = {
            mode: 'nearest',
            intersect: true,
            includeInvisible: false
        };
        this.maintainAspectRatio = true;
        this.onHover = null;
        this.onClick = null;
        this.parsing = true;
        this.plugins = {};
        this.responsive = true;
        this.scale = undefined;
        this.scales = {};
        this.showLine = true;
        this.drawActiveElementsOnTop = true;
        this.describe(_descriptors);
        this.apply(_appliers);
    }
 set(scope, values) {
        return set(this, scope, values);
    }
 get(scope) {
        return getScope$1(this, scope);
    }
 describe(scope, values) {
        return set(descriptors, scope, values);
    }
    override(scope, values) {
        return set(overrides, scope, values);
    }
 route(scope, name, targetScope, targetName) {
        const scopeObject = getScope$1(this, scope);
        const targetScopeObject = getScope$1(this, targetScope);
        const privateName = '_' + name;
        Object.defineProperties(scopeObject, {
            [privateName]: {
                value: scopeObject[name],
                writable: true
            },
            [name]: {
                enumerable: true,
                get () {
                    const local = this[privateName];
                    const target = targetScopeObject[targetName];
                    if (isObject(local)) {
                        return Object.assign({}, target, local);
                    }
                    return valueOrDefault(local, target);
                },
                set (value) {
                    this[privateName] = value;
                }
            }
        });
    }
    apply(appliers) {
        appliers.forEach((apply)=>apply(this));
    }
}
var defaults = /* #__PURE__ */ new Defaults({
    _scriptable: (name)=>!name.startsWith('on'),
    _indexable: (name)=>name !== 'events',
    hover: {
        _fallback: 'interaction'
    },
    interaction: {
        _scriptable: false,
        _indexable: false
    }
}, [
    applyAnimationsDefaults,
    applyLayoutsDefaults,
    applyScaleDefaults
]);

function toFontString(font) {
    if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
        return null;
    }
    return (font.style ? font.style + ' ' : '') + (font.weight ? font.weight + ' ' : '') + font.size + 'px ' + font.family;
}
 function _measureText(ctx, data, gc, longest, string) {
    let textWidth = data[string];
    if (!textWidth) {
        textWidth = data[string] = ctx.measureText(string).width;
        gc.push(string);
    }
    if (textWidth > longest) {
        longest = textWidth;
    }
    return longest;
}
 function _longestText(ctx, font, arrayOfThings, cache) {
    cache = cache || {};
    let data = cache.data = cache.data || {};
    let gc = cache.garbageCollect = cache.garbageCollect || [];
    if (cache.font !== font) {
        data = cache.data = {};
        gc = cache.garbageCollect = [];
        cache.font = font;
    }
    ctx.save();
    ctx.font = font;
    let longest = 0;
    const ilen = arrayOfThings.length;
    let i, j, jlen, thing, nestedThing;
    for(i = 0; i < ilen; i++){
        thing = arrayOfThings[i];
        if (thing !== undefined && thing !== null && isArray(thing) !== true) {
            longest = _measureText(ctx, data, gc, longest, thing);
        } else if (isArray(thing)) {
            for(j = 0, jlen = thing.length; j < jlen; j++){
                nestedThing = thing[j];
                if (nestedThing !== undefined && nestedThing !== null && !isArray(nestedThing)) {
                    longest = _measureText(ctx, data, gc, longest, nestedThing);
                }
            }
        }
    }
    ctx.restore();
    const gcLen = gc.length / 2;
    if (gcLen > arrayOfThings.length) {
        for(i = 0; i < gcLen; i++){
            delete data[gc[i]];
        }
        gc.splice(0, gcLen);
    }
    return longest;
}
 function _alignPixel(chart, pixel, width) {
    const devicePixelRatio = chart.currentDevicePixelRatio;
    const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
    return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
}
 function clearCanvas(canvas, ctx) {
    ctx = ctx || canvas.getContext('2d');
    ctx.save();
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}
function drawPoint(ctx, options, x, y) {
    drawPointLegend(ctx, options, x, y, null);
}
function drawPointLegend(ctx, options, x, y, w) {
    let type, xOffset, yOffset, size, cornerRadius, width, xOffsetW, yOffsetW;
    const style = options.pointStyle;
    const rotation = options.rotation;
    const radius = options.radius;
    let rad = (rotation || 0) * RAD_PER_DEG;
    if (style && typeof style === 'object') {
        type = style.toString();
        if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rad);
            ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
            ctx.restore();
            return;
        }
    }
    if (isNaN(radius) || radius <= 0) {
        return;
    }
    ctx.beginPath();
    switch(style){
        default:
            if (w) {
                ctx.ellipse(x, y, w / 2, radius, 0, 0, TAU);
            } else {
                ctx.arc(x, y, radius, 0, TAU);
            }
            ctx.closePath();
            break;
        case 'triangle':
            width = w ? w / 2 : radius;
            ctx.moveTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            rad += TWO_THIRDS_PI;
            ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            rad += TWO_THIRDS_PI;
            ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
            ctx.closePath();
            break;
        case 'rectRounded':
            cornerRadius = radius * 0.516;
            size = radius - cornerRadius;
            xOffset = Math.cos(rad + QUARTER_PI) * size;
            xOffsetW = Math.cos(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
            yOffset = Math.sin(rad + QUARTER_PI) * size;
            yOffsetW = Math.sin(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
            ctx.arc(x - xOffsetW, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
            ctx.arc(x + yOffsetW, y - xOffset, cornerRadius, rad - HALF_PI, rad);
            ctx.arc(x + xOffsetW, y + yOffset, cornerRadius, rad, rad + HALF_PI);
            ctx.arc(x - yOffsetW, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
            ctx.closePath();
            break;
        case 'rect':
            if (!rotation) {
                size = Math.SQRT1_2 * radius;
                width = w ? w / 2 : size;
                ctx.rect(x - width, y - size, 2 * width, 2 * size);
                break;
            }
            rad += QUARTER_PI;
         case 'rectRot':
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            ctx.closePath();
            break;
        case 'crossRot':
            rad += QUARTER_PI;
         case 'cross':
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            break;
        case 'star':
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            rad += QUARTER_PI;
            xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
            xOffset = Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
            ctx.moveTo(x - xOffsetW, y - yOffset);
            ctx.lineTo(x + xOffsetW, y + yOffset);
            ctx.moveTo(x + yOffsetW, y - xOffset);
            ctx.lineTo(x - yOffsetW, y + xOffset);
            break;
        case 'line':
            xOffset = w ? w / 2 : Math.cos(rad) * radius;
            yOffset = Math.sin(rad) * radius;
            ctx.moveTo(x - xOffset, y - yOffset);
            ctx.lineTo(x + xOffset, y + yOffset);
            break;
        case 'dash':
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(rad) * (w ? w / 2 : radius), y + Math.sin(rad) * radius);
            break;
        case false:
            ctx.closePath();
            break;
    }
    ctx.fill();
    if (options.borderWidth > 0) {
        ctx.stroke();
    }
}
 function _isPointInArea(point, area, margin) {
    margin = margin || 0.5;
    return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
}
function clipArea(ctx, area) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
    ctx.clip();
}
function unclipArea(ctx) {
    ctx.restore();
}
 function _steppedLineTo(ctx, previous, target, flip, mode) {
    if (!previous) {
        return ctx.lineTo(target.x, target.y);
    }
    if (mode === 'middle') {
        const midpoint = (previous.x + target.x) / 2.0;
        ctx.lineTo(midpoint, previous.y);
        ctx.lineTo(midpoint, target.y);
    } else if (mode === 'after' !== !!flip) {
        ctx.lineTo(previous.x, target.y);
    } else {
        ctx.lineTo(target.x, previous.y);
    }
    ctx.lineTo(target.x, target.y);
}
 function _bezierCurveTo(ctx, previous, target, flip) {
    if (!previous) {
        return ctx.lineTo(target.x, target.y);
    }
    ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
}
 function renderText(ctx, text, x, y, font, opts = {}) {
    const lines = isArray(text) ? text : [
        text
    ];
    const stroke = opts.strokeWidth > 0 && opts.strokeColor !== '';
    let i, line;
    ctx.save();
    ctx.font = font.string;
    setRenderOpts(ctx, opts);
    for(i = 0; i < lines.length; ++i){
        line = lines[i];
        if (opts.backdrop) {
            drawBackdrop(ctx, opts.backdrop);
        }
        if (stroke) {
            if (opts.strokeColor) {
                ctx.strokeStyle = opts.strokeColor;
            }
            if (!isNullOrUndef(opts.strokeWidth)) {
                ctx.lineWidth = opts.strokeWidth;
            }
            ctx.strokeText(line, x, y, opts.maxWidth);
        }
        ctx.fillText(line, x, y, opts.maxWidth);
        decorateText(ctx, x, y, line, opts);
        y += font.lineHeight;
    }
    ctx.restore();
}
function setRenderOpts(ctx, opts) {
    if (opts.translation) {
        ctx.translate(opts.translation[0], opts.translation[1]);
    }
    if (!isNullOrUndef(opts.rotation)) {
        ctx.rotate(opts.rotation);
    }
    if (opts.color) {
        ctx.fillStyle = opts.color;
    }
    if (opts.textAlign) {
        ctx.textAlign = opts.textAlign;
    }
    if (opts.textBaseline) {
        ctx.textBaseline = opts.textBaseline;
    }
}
function decorateText(ctx, x, y, line, opts) {
    if (opts.strikethrough || opts.underline) {
 const metrics = ctx.measureText(line);
        const left = x - metrics.actualBoundingBoxLeft;
        const right = x + metrics.actualBoundingBoxRight;
        const top = y - metrics.actualBoundingBoxAscent;
        const bottom = y + metrics.actualBoundingBoxDescent;
        const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.beginPath();
        ctx.lineWidth = opts.decorationWidth || 2;
        ctx.moveTo(left, yDecoration);
        ctx.lineTo(right, yDecoration);
        ctx.stroke();
    }
}
function drawBackdrop(ctx, opts) {
    const oldColor = ctx.fillStyle;
    ctx.fillStyle = opts.color;
    ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
    ctx.fillStyle = oldColor;
}
 function addRoundedRectPath(ctx, rect) {
    const { x , y , w , h , radius  } = rect;
    ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, -HALF_PI, PI, true);
    ctx.lineTo(x, y + h - radius.bottomLeft);
    ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
    ctx.lineTo(x + w - radius.bottomRight, y + h);
    ctx.arc(x + w - radius.bottomRight, y + h - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
    ctx.lineTo(x + w, y + radius.topRight);
    ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
    ctx.lineTo(x + radius.topLeft, y);
}

const LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
const FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
/**
 * @alias Chart.helpers.options
 * @namespace
 */ /**
 * Converts the given line height `value` in pixels for a specific font `size`.
 * @param value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
 * @param size - The font size (in pixels) used to resolve relative `value`.
 * @returns The effective line height in pixels (size * 1.2 if value is invalid).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
 * @since 2.7.0
 */ function toLineHeight(value, size) {
    const matches = ('' + value).match(LINE_HEIGHT);
    if (!matches || matches[1] === 'normal') {
        return size * 1.2;
    }
    value = +matches[2];
    switch(matches[3]){
        case 'px':
            return value;
        case '%':
            value /= 100;
            break;
    }
    return size * value;
}
const numberOrZero = (v)=>+v || 0;
function _readValueToProps(value, props) {
    const ret = {};
    const objProps = isObject(props);
    const keys = objProps ? Object.keys(props) : props;
    const read = isObject(value) ? objProps ? (prop)=>valueOrDefault(value[prop], value[props[prop]]) : (prop)=>value[prop] : ()=>value;
    for (const prop of keys){
        ret[prop] = numberOrZero(read(prop));
    }
    return ret;
}
/**
 * Converts the given value into a TRBL object.
 * @param value - If a number, set the value to all TRBL component,
 *  else, if an object, use defined properties and sets undefined ones to 0.
 *  x / y are shorthands for same value for left/right and top/bottom.
 * @returns The padding values (top, right, bottom, left)
 * @since 3.0.0
 */ function toTRBL(value) {
    return _readValueToProps(value, {
        top: 'y',
        right: 'x',
        bottom: 'y',
        left: 'x'
    });
}
/**
 * Converts the given value into a TRBL corners object (similar with css border-radius).
 * @param value - If a number, set the value to all TRBL corner components,
 *  else, if an object, use defined properties and sets undefined ones to 0.
 * @returns The TRBL corner values (topLeft, topRight, bottomLeft, bottomRight)
 * @since 3.0.0
 */ function toTRBLCorners(value) {
    return _readValueToProps(value, [
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight'
    ]);
}
/**
 * Converts the given value into a padding object with pre-computed width/height.
 * @param value - If a number, set the value to all TRBL component,
 *  else, if an object, use defined properties and sets undefined ones to 0.
 *  x / y are shorthands for same value for left/right and top/bottom.
 * @returns The padding values (top, right, bottom, left, width, height)
 * @since 2.7.0
 */ function toPadding(value) {
    const obj = toTRBL(value);
    obj.width = obj.left + obj.right;
    obj.height = obj.top + obj.bottom;
    return obj;
}
/**
 * Parses font options and returns the font object.
 * @param options - A object that contains font options to be parsed.
 * @param fallback - A object that contains fallback font options.
 * @return The font object.
 * @private
 */ function toFont(options, fallback) {
    options = options || {};
    fallback = fallback || defaults.font;
    let size = valueOrDefault(options.size, fallback.size);
    if (typeof size === 'string') {
        size = parseInt(size, 10);
    }
    let style = valueOrDefault(options.style, fallback.style);
    if (style && !('' + style).match(FONT_STYLE)) {
        console.warn('Invalid font style specified: "' + style + '"');
        style = undefined;
    }
    const font = {
        family: valueOrDefault(options.family, fallback.family),
        lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
        size,
        style,
        weight: valueOrDefault(options.weight, fallback.weight),
        string: ''
    };
    font.string = toFontString(font);
    return font;
}
/**
 * Evaluates the given `inputs` sequentially and returns the first defined value.
 * @param inputs - An array of values, falling back to the last value.
 * @param context - If defined and the current value is a function, the value
 * is called with `context` as first argument and the result becomes the new input.
 * @param index - If defined and the current value is an array, the value
 * at `index` become the new input.
 * @param info - object to return information about resolution in
 * @param info.cacheable - Will be set to `false` if option is not cacheable.
 * @since 2.7.0
 */ function resolve(inputs, context, index, info) {
    let cacheable = true;
    let i, ilen, value;
    for(i = 0, ilen = inputs.length; i < ilen; ++i){
        value = inputs[i];
        if (value === undefined) {
            continue;
        }
        if (context !== undefined && typeof value === 'function') {
            value = value(context);
            cacheable = false;
        }
        if (index !== undefined && isArray(value)) {
            value = value[index % value.length];
            cacheable = false;
        }
        if (value !== undefined) {
            if (info && !cacheable) {
                info.cacheable = false;
            }
            return value;
        }
    }
}
/**
 * @param minmax
 * @param grace
 * @param beginAtZero
 * @private
 */ function _addGrace(minmax, grace, beginAtZero) {
    const { min , max  } = minmax;
    const change = toDimension(grace, (max - min) / 2);
    const keepZero = (value, add)=>beginAtZero && value === 0 ? 0 : value + add;
    return {
        min: keepZero(min, -Math.abs(change)),
        max: keepZero(max, change)
    };
}
function createContext(parentContext, context) {
    return Object.assign(Object.create(parentContext), context);
}

function _createResolver(scopes, prefixes = [
    ''
], rootScopes = scopes, fallback, getTarget = ()=>scopes[0]) {
    if (!defined(fallback)) {
        fallback = _resolve('_fallback', scopes);
    }
    const cache = {
        [Symbol.toStringTag]: 'Object',
        _cacheable: true,
        _scopes: scopes,
        _rootScopes: rootScopes,
        _fallback: fallback,
        _getTarget: getTarget,
        override: (scope)=>_createResolver([
                scope,
                ...scopes
            ], prefixes, rootScopes, fallback)
    };
    return new Proxy(cache, {
 deleteProperty (target, prop) {
            delete target[prop];
            delete target._keys;
            delete scopes[0][prop];
            return true;
        },
 get (target, prop) {
            return _cached(target, prop, ()=>_resolveWithPrefixes(prop, prefixes, scopes, target));
        },
 getOwnPropertyDescriptor (target, prop) {
            return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
        },
 getPrototypeOf () {
            return Reflect.getPrototypeOf(scopes[0]);
        },
 has (target, prop) {
            return getKeysFromAllScopes(target).includes(prop);
        },
 ownKeys (target) {
            return getKeysFromAllScopes(target);
        },
 set (target, prop, value) {
            const storage = target._storage || (target._storage = getTarget());
            target[prop] = storage[prop] = value;
            delete target._keys;
            return true;
        }
    });
}
 function _attachContext(proxy, context, subProxy, descriptorDefaults) {
    const cache = {
        _cacheable: false,
        _proxy: proxy,
        _context: context,
        _subProxy: subProxy,
        _stack: new Set(),
        _descriptors: _descriptors(proxy, descriptorDefaults),
        setContext: (ctx)=>_attachContext(proxy, ctx, subProxy, descriptorDefaults),
        override: (scope)=>_attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
    };
    return new Proxy(cache, {
 deleteProperty (target, prop) {
            delete target[prop];
            delete proxy[prop];
            return true;
        },
 get (target, prop, receiver) {
            return _cached(target, prop, ()=>_resolveWithContext(target, prop, receiver));
        },
 getOwnPropertyDescriptor (target, prop) {
            return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
                enumerable: true,
                configurable: true
            } : undefined : Reflect.getOwnPropertyDescriptor(proxy, prop);
        },
 getPrototypeOf () {
            return Reflect.getPrototypeOf(proxy);
        },
 has (target, prop) {
            return Reflect.has(proxy, prop);
        },
 ownKeys () {
            return Reflect.ownKeys(proxy);
        },
 set (target, prop, value) {
            proxy[prop] = value;
            delete target[prop];
            return true;
        }
    });
}
 function _descriptors(proxy, defaults = {
    scriptable: true,
    indexable: true
}) {
    const { _scriptable =defaults.scriptable , _indexable =defaults.indexable , _allKeys =defaults.allKeys  } = proxy;
    return {
        allKeys: _allKeys,
        scriptable: _scriptable,
        indexable: _indexable,
        isScriptable: isFunction(_scriptable) ? _scriptable : ()=>_scriptable,
        isIndexable: isFunction(_indexable) ? _indexable : ()=>_indexable
    };
}
const readKey = (prefix, name)=>prefix ? prefix + _capitalize(name) : name;
const needsSubResolver = (prop, value)=>isObject(value) && prop !== 'adapters' && (Object.getPrototypeOf(value) === null || value.constructor === Object);
function _cached(target, prop, resolve) {
    if (Object.prototype.hasOwnProperty.call(target, prop)) {
        return target[prop];
    }
    const value = resolve();
    target[prop] = value;
    return value;
}
function _resolveWithContext(target, prop, receiver) {
    const { _proxy , _context , _subProxy , _descriptors: descriptors  } = target;
    let value = _proxy[prop];
    if (isFunction(value) && descriptors.isScriptable(prop)) {
        value = _resolveScriptable(prop, value, target, receiver);
    }
    if (isArray(value) && value.length) {
        value = _resolveArray(prop, value, target, descriptors.isIndexable);
    }
    if (needsSubResolver(prop, value)) {
        value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors);
    }
    return value;
}
function _resolveScriptable(prop, value, target, receiver) {
    const { _proxy , _context , _subProxy , _stack  } = target;
    if (_stack.has(prop)) {
        throw new Error('Recursion detected: ' + Array.from(_stack).join('->') + '->' + prop);
    }
    _stack.add(prop);
    value = value(_context, _subProxy || receiver);
    _stack.delete(prop);
    if (needsSubResolver(prop, value)) {
        value = createSubResolver(_proxy._scopes, _proxy, prop, value);
    }
    return value;
}
function _resolveArray(prop, value, target, isIndexable) {
    const { _proxy , _context , _subProxy , _descriptors: descriptors  } = target;
    if (defined(_context.index) && isIndexable(prop)) {
        value = value[_context.index % value.length];
    } else if (isObject(value[0])) {
        const arr = value;
        const scopes = _proxy._scopes.filter((s)=>s !== arr);
        value = [];
        for (const item of arr){
            const resolver = createSubResolver(scopes, _proxy, prop, item);
            value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors));
        }
    }
    return value;
}
function resolveFallback(fallback, prop, value) {
    return isFunction(fallback) ? fallback(prop, value) : fallback;
}
const getScope = (key, parent)=>key === true ? parent : typeof key === 'string' ? resolveObjectKey(parent, key) : undefined;
function addScopes(set, parentScopes, key, parentFallback, value) {
    for (const parent of parentScopes){
        const scope = getScope(key, parent);
        if (scope) {
            set.add(scope);
            const fallback = resolveFallback(scope._fallback, key, value);
            if (defined(fallback) && fallback !== key && fallback !== parentFallback) {
                return fallback;
            }
        } else if (scope === false && defined(parentFallback) && key !== parentFallback) {
            return null;
        }
    }
    return false;
}
function createSubResolver(parentScopes, resolver, prop, value) {
    const rootScopes = resolver._rootScopes;
    const fallback = resolveFallback(resolver._fallback, prop, value);
    const allScopes = [
        ...parentScopes,
        ...rootScopes
    ];
    const set = new Set();
    set.add(value);
    let key = addScopesFromKey(set, allScopes, prop, fallback || prop, value);
    if (key === null) {
        return false;
    }
    if (defined(fallback) && fallback !== prop) {
        key = addScopesFromKey(set, allScopes, fallback, key, value);
        if (key === null) {
            return false;
        }
    }
    return _createResolver(Array.from(set), [
        ''
    ], rootScopes, fallback, ()=>subGetTarget(resolver, prop, value));
}
function addScopesFromKey(set, allScopes, key, fallback, item) {
    while(key){
        key = addScopes(set, allScopes, key, fallback, item);
    }
    return key;
}
function subGetTarget(resolver, prop, value) {
    const parent = resolver._getTarget();
    if (!(prop in parent)) {
        parent[prop] = {};
    }
    const target = parent[prop];
    if (isArray(target) && isObject(value)) {
        return value;
    }
    return target || {};
}
function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
    let value;
    for (const prefix of prefixes){
        value = _resolve(readKey(prefix, prop), scopes);
        if (defined(value)) {
            return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
        }
    }
}
function _resolve(key, scopes) {
    for (const scope of scopes){
        if (!scope) {
            continue;
        }
        const value = scope[key];
        if (defined(value)) {
            return value;
        }
    }
}
function getKeysFromAllScopes(target) {
    let keys = target._keys;
    if (!keys) {
        keys = target._keys = resolveKeysFromAllScopes(target._scopes);
    }
    return keys;
}
function resolveKeysFromAllScopes(scopes) {
    const set = new Set();
    for (const scope of scopes){
        for (const key of Object.keys(scope).filter((k)=>!k.startsWith('_'))){
            set.add(key);
        }
    }
    return Array.from(set);
}
function _parseObjectDataRadialScale(meta, data, start, count) {
    const { iScale  } = meta;
    const { key ='r'  } = this._parsing;
    const parsed = new Array(count);
    let i, ilen, index, item;
    for(i = 0, ilen = count; i < ilen; ++i){
        index = i + start;
        item = data[index];
        parsed[i] = {
            r: iScale.parse(resolveObjectKey(item, key), index)
        };
    }
    return parsed;
}

const EPSILON = Number.EPSILON || 1e-14;
const getPoint = (points, i)=>i < points.length && !points[i].skip && points[i];
const getValueAxis = (indexAxis)=>indexAxis === 'x' ? 'y' : 'x';
function splineCurve(firstPoint, middlePoint, afterPoint, t) {
    // Props to Rob Spencer at scaled innovation for his post on splining between points
    // http://scaledinnovation.com/analytics/splines/aboutSplines.html
    // This function must also respect "skipped" points
    const previous = firstPoint.skip ? middlePoint : firstPoint;
    const current = middlePoint;
    const next = afterPoint.skip ? middlePoint : afterPoint;
    const d01 = distanceBetweenPoints(current, previous);
    const d12 = distanceBetweenPoints(next, current);
    let s01 = d01 / (d01 + d12);
    let s12 = d12 / (d01 + d12);
    // If all points are the same, s01 & s02 will be inf
    s01 = isNaN(s01) ? 0 : s01;
    s12 = isNaN(s12) ? 0 : s12;
    const fa = t * s01; // scaling factor for triangle Ta
    const fb = t * s12;
    return {
        previous: {
            x: current.x - fa * (next.x - previous.x),
            y: current.y - fa * (next.y - previous.y)
        },
        next: {
            x: current.x + fb * (next.x - previous.x),
            y: current.y + fb * (next.y - previous.y)
        }
    };
}
/**
 * Adjust tangents to ensure monotonic properties
 */ function monotoneAdjust(points, deltaK, mK) {
    const pointsLen = points.length;
    let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
    let pointAfter = getPoint(points, 0);
    for(let i = 0; i < pointsLen - 1; ++i){
        pointCurrent = pointAfter;
        pointAfter = getPoint(points, i + 1);
        if (!pointCurrent || !pointAfter) {
            continue;
        }
        if (almostEquals(deltaK[i], 0, EPSILON)) {
            mK[i] = mK[i + 1] = 0;
            continue;
        }
        alphaK = mK[i] / deltaK[i];
        betaK = mK[i + 1] / deltaK[i];
        squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
        if (squaredMagnitude <= 9) {
            continue;
        }
        tauK = 3 / Math.sqrt(squaredMagnitude);
        mK[i] = alphaK * tauK * deltaK[i];
        mK[i + 1] = betaK * tauK * deltaK[i];
    }
}
function monotoneCompute(points, mK, indexAxis = 'x') {
    const valueAxis = getValueAxis(indexAxis);
    const pointsLen = points.length;
    let delta, pointBefore, pointCurrent;
    let pointAfter = getPoint(points, 0);
    for(let i = 0; i < pointsLen; ++i){
        pointBefore = pointCurrent;
        pointCurrent = pointAfter;
        pointAfter = getPoint(points, i + 1);
        if (!pointCurrent) {
            continue;
        }
        const iPixel = pointCurrent[indexAxis];
        const vPixel = pointCurrent[valueAxis];
        if (pointBefore) {
            delta = (iPixel - pointBefore[indexAxis]) / 3;
            pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
            pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
        }
        if (pointAfter) {
            delta = (pointAfter[indexAxis] - iPixel) / 3;
            pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
            pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
        }
    }
}
/**
 * This function calculates Bézier control points in a similar way than |splineCurve|,
 * but preserves monotonicity of the provided data and ensures no local extremums are added
 * between the dataset discrete points due to the interpolation.
 * See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation
 */ function splineCurveMonotone(points, indexAxis = 'x') {
    const valueAxis = getValueAxis(indexAxis);
    const pointsLen = points.length;
    const deltaK = Array(pointsLen).fill(0);
    const mK = Array(pointsLen);
    // Calculate slopes (deltaK) and initialize tangents (mK)
    let i, pointBefore, pointCurrent;
    let pointAfter = getPoint(points, 0);
    for(i = 0; i < pointsLen; ++i){
        pointBefore = pointCurrent;
        pointCurrent = pointAfter;
        pointAfter = getPoint(points, i + 1);
        if (!pointCurrent) {
            continue;
        }
        if (pointAfter) {
            const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
            // In the case of two points that appear at the same x pixel, slopeDeltaX is 0
            deltaK[i] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
        }
        mK[i] = !pointBefore ? deltaK[i] : !pointAfter ? deltaK[i - 1] : sign(deltaK[i - 1]) !== sign(deltaK[i]) ? 0 : (deltaK[i - 1] + deltaK[i]) / 2;
    }
    monotoneAdjust(points, deltaK, mK);
    monotoneCompute(points, mK, indexAxis);
}
function capControlPoint(pt, min, max) {
    return Math.max(Math.min(pt, max), min);
}
function capBezierPoints(points, area) {
    let i, ilen, point, inArea, inAreaPrev;
    let inAreaNext = _isPointInArea(points[0], area);
    for(i = 0, ilen = points.length; i < ilen; ++i){
        inAreaPrev = inArea;
        inArea = inAreaNext;
        inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
        if (!inArea) {
            continue;
        }
        point = points[i];
        if (inAreaPrev) {
            point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
            point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
        }
        if (inAreaNext) {
            point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
            point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
        }
    }
}
/**
 * @private
 */ function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
    let i, ilen, point, controlPoints;
    // Only consider points that are drawn in case the spanGaps option is used
    if (options.spanGaps) {
        points = points.filter((pt)=>!pt.skip);
    }
    if (options.cubicInterpolationMode === 'monotone') {
        splineCurveMonotone(points, indexAxis);
    } else {
        let prev = loop ? points[points.length - 1] : points[0];
        for(i = 0, ilen = points.length; i < ilen; ++i){
            point = points[i];
            controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
            point.cp1x = controlPoints.previous.x;
            point.cp1y = controlPoints.previous.y;
            point.cp2x = controlPoints.next.x;
            point.cp2y = controlPoints.next.y;
            prev = point;
        }
    }
    if (options.capBezierPoints) {
        capBezierPoints(points, area);
    }
}

/**
 * Note: typedefs are auto-exported, so use a made-up `dom` namespace where
 * necessary to avoid duplicates with `export * from './helpers`; see
 * https://github.com/microsoft/TypeScript/issues/46011
 * @typedef { import('../core/core.controller.js').default } dom.Chart
 * @typedef { import('../../types').ChartEvent } ChartEvent
 */ /**
 * @private
 */ function _isDomSupported() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * @private
 */ function _getParentNode(domNode) {
    let parent = domNode.parentNode;
    if (parent && parent.toString() === '[object ShadowRoot]') {
        parent = parent.host;
    }
    return parent;
}
/**
 * convert max-width/max-height values that may be percentages into a number
 * @private
 */ function parseMaxStyle(styleValue, node, parentProperty) {
    let valueInPixels;
    if (typeof styleValue === 'string') {
        valueInPixels = parseInt(styleValue, 10);
        if (styleValue.indexOf('%') !== -1) {
            // percentage * size in dimension
            valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
        }
    } else {
        valueInPixels = styleValue;
    }
    return valueInPixels;
}
const getComputedStyle$1 = (element)=>element.ownerDocument.defaultView.getComputedStyle(element, null);
function getStyle(el, property) {
    return getComputedStyle$1(el).getPropertyValue(property);
}
const positions = [
    'top',
    'right',
    'bottom',
    'left'
];
function getPositionedStyle(styles, style, suffix) {
    const result = {};
    suffix = suffix ? '-' + suffix : '';
    for(let i = 0; i < 4; i++){
        const pos = positions[i];
        result[pos] = parseFloat(styles[style + '-' + pos + suffix]) || 0;
    }
    result.width = result.left + result.right;
    result.height = result.top + result.bottom;
    return result;
}
const useOffsetPos = (x, y, target)=>(x > 0 || y > 0) && (!target || !target.shadowRoot);
/**
 * @param e
 * @param canvas
 * @returns Canvas position
 */ function getCanvasPosition(e, canvas) {
    const touches = e.touches;
    const source = touches && touches.length ? touches[0] : e;
    const { offsetX , offsetY  } = source;
    let box = false;
    let x, y;
    if (useOffsetPos(offsetX, offsetY, e.target)) {
        x = offsetX;
        y = offsetY;
    } else {
        const rect = canvas.getBoundingClientRect();
        x = source.clientX - rect.left;
        y = source.clientY - rect.top;
        box = true;
    }
    return {
        x,
        y,
        box
    };
}
/**
 * Gets an event's x, y coordinates, relative to the chart area
 * @param event
 * @param chart
 * @returns x and y coordinates of the event
 */ function getRelativePosition(event, chart) {
    if ('native' in event) {
        return event;
    }
    const { canvas , currentDevicePixelRatio  } = chart;
    const style = getComputedStyle$1(canvas);
    const borderBox = style.boxSizing === 'border-box';
    const paddings = getPositionedStyle(style, 'padding');
    const borders = getPositionedStyle(style, 'border', 'width');
    const { x , y , box  } = getCanvasPosition(event, canvas);
    const xOffset = paddings.left + (box && borders.left);
    const yOffset = paddings.top + (box && borders.top);
    let { width , height  } = chart;
    if (borderBox) {
        width -= paddings.width + borders.width;
        height -= paddings.height + borders.height;
    }
    return {
        x: Math.round((x - xOffset) / width * canvas.width / currentDevicePixelRatio),
        y: Math.round((y - yOffset) / height * canvas.height / currentDevicePixelRatio)
    };
}
function getContainerSize(canvas, width, height) {
    let maxWidth, maxHeight;
    if (width === undefined || height === undefined) {
        const container = _getParentNode(canvas);
        if (!container) {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
        } else {
            const rect = container.getBoundingClientRect(); // this is the border box of the container
            const containerStyle = getComputedStyle$1(container);
            const containerBorder = getPositionedStyle(containerStyle, 'border', 'width');
            const containerPadding = getPositionedStyle(containerStyle, 'padding');
            width = rect.width - containerPadding.width - containerBorder.width;
            height = rect.height - containerPadding.height - containerBorder.height;
            maxWidth = parseMaxStyle(containerStyle.maxWidth, container, 'clientWidth');
            maxHeight = parseMaxStyle(containerStyle.maxHeight, container, 'clientHeight');
        }
    }
    return {
        width,
        height,
        maxWidth: maxWidth || INFINITY,
        maxHeight: maxHeight || INFINITY
    };
}
const round1 = (v)=>Math.round(v * 10) / 10;
// eslint-disable-next-line complexity
function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
    const style = getComputedStyle$1(canvas);
    const margins = getPositionedStyle(style, 'margin');
    const maxWidth = parseMaxStyle(style.maxWidth, canvas, 'clientWidth') || INFINITY;
    const maxHeight = parseMaxStyle(style.maxHeight, canvas, 'clientHeight') || INFINITY;
    const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
    let { width , height  } = containerSize;
    if (style.boxSizing === 'content-box') {
        const borders = getPositionedStyle(style, 'border', 'width');
        const paddings = getPositionedStyle(style, 'padding');
        width -= paddings.width + borders.width;
        height -= paddings.height + borders.height;
    }
    width = Math.max(0, width - margins.width);
    height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
    width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
    height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
    if (width && !height) {
        // https://github.com/chartjs/Chart.js/issues/4659
        // If the canvas has width, but no height, default to aspectRatio of 2 (canvas default)
        height = round1(width / 2);
    }
    const maintainHeight = bbWidth !== undefined || bbHeight !== undefined;
    if (maintainHeight && aspectRatio && containerSize.height && height > containerSize.height) {
        height = containerSize.height;
        width = round1(Math.floor(height * aspectRatio));
    }
    return {
        width,
        height
    };
}
/**
 * @param chart
 * @param forceRatio
 * @param forceStyle
 * @returns True if the canvas context size or transformation has changed.
 */ function retinaScale(chart, forceRatio, forceStyle) {
    const pixelRatio = forceRatio || 1;
    const deviceHeight = Math.floor(chart.height * pixelRatio);
    const deviceWidth = Math.floor(chart.width * pixelRatio);
    chart.height = Math.floor(chart.height);
    chart.width = Math.floor(chart.width);
    const canvas = chart.canvas;
    // If no style has been set on the canvas, the render size is used as display size,
    // making the chart visually bigger, so let's enforce it to the "correct" values.
    // See https://github.com/chartjs/Chart.js/issues/3575
    if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
        canvas.style.height = `${chart.height}px`;
        canvas.style.width = `${chart.width}px`;
    }
    if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
        chart.currentDevicePixelRatio = pixelRatio;
        canvas.height = deviceHeight;
        canvas.width = deviceWidth;
        chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        return true;
    }
    return false;
}
/**
 * Detects support for options object argument in addEventListener.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 * @private
 */ const supportsEventListenerOptions = function() {
    let passiveSupported = false;
    try {
        const options = {
            get passive () {
                passiveSupported = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (e) {
    // continue regardless of error
    }
    return passiveSupported;
}();
/**
 * The "used" size is the final value of a dimension property after all calculations have
 * been performed. This method uses the computed style of `element` but returns undefined
 * if the computed style is not expressed in pixels. That can happen in some cases where
 * `element` has a size relative to its parent and this last one is not yet displayed,
 * for example because of `display: none` on a parent node.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/used_value
 * @returns Size in pixels or undefined if unknown.
 */ function readUsedSize(element, property) {
    const value = getStyle(element, property);
    const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
    return matches ? +matches[1] : undefined;
}

/**
 * @private
 */ function _pointInLine(p1, p2, t, mode) {
    return {
        x: p1.x + t * (p2.x - p1.x),
        y: p1.y + t * (p2.y - p1.y)
    };
}
/**
 * @private
 */ function _steppedInterpolation(p1, p2, t, mode) {
    return {
        x: p1.x + t * (p2.x - p1.x),
        y: mode === 'middle' ? t < 0.5 ? p1.y : p2.y : mode === 'after' ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
    };
}
/**
 * @private
 */ function _bezierInterpolation(p1, p2, t, mode) {
    const cp1 = {
        x: p1.cp2x,
        y: p1.cp2y
    };
    const cp2 = {
        x: p2.cp1x,
        y: p2.cp1y
    };
    const a = _pointInLine(p1, cp1, t);
    const b = _pointInLine(cp1, cp2, t);
    const c = _pointInLine(cp2, p2, t);
    const d = _pointInLine(a, b, t);
    const e = _pointInLine(b, c, t);
    return _pointInLine(d, e, t);
}

const getRightToLeftAdapter = function(rectX, width) {
    return {
        x (x) {
            return rectX + rectX + width - x;
        },
        setWidth (w) {
            width = w;
        },
        textAlign (align) {
            if (align === 'center') {
                return align;
            }
            return align === 'right' ? 'left' : 'right';
        },
        xPlus (x, value) {
            return x - value;
        },
        leftForLtr (x, itemWidth) {
            return x - itemWidth;
        }
    };
};
const getLeftToRightAdapter = function() {
    return {
        x (x) {
            return x;
        },
        setWidth (w) {},
        textAlign (align) {
            return align;
        },
        xPlus (x, value) {
            return x + value;
        },
        leftForLtr (x, _itemWidth) {
            return x;
        }
    };
};
function getRtlAdapter(rtl, rectX, width) {
    return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
}
function overrideTextDirection(ctx, direction) {
    let style, original;
    if (direction === 'ltr' || direction === 'rtl') {
        style = ctx.canvas.style;
        original = [
            style.getPropertyValue('direction'),
            style.getPropertyPriority('direction')
        ];
        style.setProperty('direction', direction, 'important');
        ctx.prevTextDirection = original;
    }
}
function restoreTextDirection(ctx, original) {
    if (original !== undefined) {
        delete ctx.prevTextDirection;
        ctx.canvas.style.setProperty('direction', original[0], original[1]);
    }
}

function propertyFn(property) {
    if (property === 'angle') {
        return {
            between: _angleBetween,
            compare: _angleDiff,
            normalize: _normalizeAngle
        };
    }
    return {
        between: _isBetween,
        compare: (a, b)=>a - b,
        normalize: (x)=>x
    };
}
function normalizeSegment({ start , end , count , loop , style  }) {
    return {
        start: start % count,
        end: end % count,
        loop: loop && (end - start + 1) % count === 0,
        style
    };
}
function getSegment(segment, points, bounds) {
    const { property , start: startBound , end: endBound  } = bounds;
    const { between , normalize  } = propertyFn(property);
    const count = points.length;
    let { start , end , loop  } = segment;
    let i, ilen;
    if (loop) {
        start += count;
        end += count;
        for(i = 0, ilen = count; i < ilen; ++i){
            if (!between(normalize(points[start % count][property]), startBound, endBound)) {
                break;
            }
            start--;
            end--;
        }
        start %= count;
        end %= count;
    }
    if (end < start) {
        end += count;
    }
    return {
        start,
        end,
        loop,
        style: segment.style
    };
}
 function _boundSegment(segment, points, bounds) {
    if (!bounds) {
        return [
            segment
        ];
    }
    const { property , start: startBound , end: endBound  } = bounds;
    const count = points.length;
    const { compare , between , normalize  } = propertyFn(property);
    const { start , end , loop , style  } = getSegment(segment, points, bounds);
    const result = [];
    let inside = false;
    let subStart = null;
    let value, point, prevValue;
    const startIsBefore = ()=>between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
    const endIsBefore = ()=>compare(endBound, value) === 0 || between(endBound, prevValue, value);
    const shouldStart = ()=>inside || startIsBefore();
    const shouldStop = ()=>!inside || endIsBefore();
    for(let i = start, prev = start; i <= end; ++i){
        point = points[i % count];
        if (point.skip) {
            continue;
        }
        value = normalize(point[property]);
        if (value === prevValue) {
            continue;
        }
        inside = between(value, startBound, endBound);
        if (subStart === null && shouldStart()) {
            subStart = compare(value, startBound) === 0 ? i : prev;
        }
        if (subStart !== null && shouldStop()) {
            result.push(normalizeSegment({
                start: subStart,
                end: i,
                loop,
                count,
                style
            }));
            subStart = null;
        }
        prev = i;
        prevValue = value;
    }
    if (subStart !== null) {
        result.push(normalizeSegment({
            start: subStart,
            end,
            loop,
            count,
            style
        }));
    }
    return result;
}
 function _boundSegments(line, bounds) {
    const result = [];
    const segments = line.segments;
    for(let i = 0; i < segments.length; i++){
        const sub = _boundSegment(segments[i], line.points, bounds);
        if (sub.length) {
            result.push(...sub);
        }
    }
    return result;
}
 function findStartAndEnd(points, count, loop, spanGaps) {
    let start = 0;
    let end = count - 1;
    if (loop && !spanGaps) {
        while(start < count && !points[start].skip){
            start++;
        }
    }
    while(start < count && points[start].skip){
        start++;
    }
    start %= count;
    if (loop) {
        end += start;
    }
    while(end > start && points[end % count].skip){
        end--;
    }
    end %= count;
    return {
        start,
        end
    };
}
 function solidSegments(points, start, max, loop) {
    const count = points.length;
    const result = [];
    let last = start;
    let prev = points[start];
    let end;
    for(end = start + 1; end <= max; ++end){
        const cur = points[end % count];
        if (cur.skip || cur.stop) {
            if (!prev.skip) {
                loop = false;
                result.push({
                    start: start % count,
                    end: (end - 1) % count,
                    loop
                });
                start = last = cur.stop ? end : null;
            }
        } else {
            last = end;
            if (prev.skip) {
                start = end;
            }
        }
        prev = cur;
    }
    if (last !== null) {
        result.push({
            start: start % count,
            end: last % count,
            loop
        });
    }
    return result;
}
 function _computeSegments(line, segmentOptions) {
    const points = line.points;
    const spanGaps = line.options.spanGaps;
    const count = points.length;
    if (!count) {
        return [];
    }
    const loop = !!line._loop;
    const { start , end  } = findStartAndEnd(points, count, loop, spanGaps);
    if (spanGaps === true) {
        return splitByStyles(line, [
            {
                start,
                end,
                loop
            }
        ], points, segmentOptions);
    }
    const max = end < start ? end + count : end;
    const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
    return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
}
 function splitByStyles(line, segments, points, segmentOptions) {
    if (!segmentOptions || !segmentOptions.setContext || !points) {
        return segments;
    }
    return doSplitByStyles(line, segments, points, segmentOptions);
}
 function doSplitByStyles(line, segments, points, segmentOptions) {
    const chartContext = line._chart.getContext();
    const baseStyle = readStyle(line.options);
    const { _datasetIndex: datasetIndex , options: { spanGaps  }  } = line;
    const count = points.length;
    const result = [];
    let prevStyle = baseStyle;
    let start = segments[0].start;
    let i = start;
    function addStyle(s, e, l, st) {
        const dir = spanGaps ? -1 : 1;
        if (s === e) {
            return;
        }
        s += count;
        while(points[s % count].skip){
            s -= dir;
        }
        while(points[e % count].skip){
            e += dir;
        }
        if (s % count !== e % count) {
            result.push({
                start: s % count,
                end: e % count,
                loop: l,
                style: st
            });
            prevStyle = st;
            start = e % count;
        }
    }
    for (const segment of segments){
        start = spanGaps ? start : segment.start;
        let prev = points[start % count];
        let style;
        for(i = start + 1; i <= segment.end; i++){
            const pt = points[i % count];
            style = readStyle(segmentOptions.setContext(createContext(chartContext, {
                type: 'segment',
                p0: prev,
                p1: pt,
                p0DataIndex: (i - 1) % count,
                p1DataIndex: i % count,
                datasetIndex
            })));
            if (styleChanged(style, prevStyle)) {
                addStyle(start, i - 1, segment.loop, prevStyle);
            }
            prev = pt;
            prevStyle = style;
        }
        if (start < i - 1) {
            addStyle(start, i - 1, segment.loop, prevStyle);
        }
    }
    return result;
}
function readStyle(options) {
    return {
        backgroundColor: options.backgroundColor,
        borderCapStyle: options.borderCapStyle,
        borderDash: options.borderDash,
        borderDashOffset: options.borderDashOffset,
        borderJoinStyle: options.borderJoinStyle,
        borderWidth: options.borderWidth,
        borderColor: options.borderColor
    };
}
function styleChanged(style, prevStyle) {
    return prevStyle && JSON.stringify(style) !== JSON.stringify(prevStyle);
}

/*!
 * Chart.js v4.1.2
 * https://www.chartjs.org
 * (c) 2023 Chart.js Contributors
 * Released under the MIT License
 */

class Animator {
    constructor(){
        this._request = null;
        this._charts = new Map();
        this._running = false;
        this._lastDate = undefined;
    }
 _notify(chart, anims, date, type) {
        const callbacks = anims.listeners[type];
        const numSteps = anims.duration;
        callbacks.forEach((fn)=>fn({
                chart,
                initial: anims.initial,
                numSteps,
                currentStep: Math.min(date - anims.start, numSteps)
            }));
    }
 _refresh() {
        if (this._request) {
            return;
        }
        this._running = true;
        this._request = requestAnimFrame.call(window, ()=>{
            this._update();
            this._request = null;
            if (this._running) {
                this._refresh();
            }
        });
    }
 _update(date = Date.now()) {
        let remaining = 0;
        this._charts.forEach((anims, chart)=>{
            if (!anims.running || !anims.items.length) {
                return;
            }
            const items = anims.items;
            let i = items.length - 1;
            let draw = false;
            let item;
            for(; i >= 0; --i){
                item = items[i];
                if (item._active) {
                    if (item._total > anims.duration) {
                        anims.duration = item._total;
                    }
                    item.tick(date);
                    draw = true;
                } else {
                    items[i] = items[items.length - 1];
                    items.pop();
                }
            }
            if (draw) {
                chart.draw();
                this._notify(chart, anims, date, 'progress');
            }
            if (!items.length) {
                anims.running = false;
                this._notify(chart, anims, date, 'complete');
                anims.initial = false;
            }
            remaining += items.length;
        });
        this._lastDate = date;
        if (remaining === 0) {
            this._running = false;
        }
    }
 _getAnims(chart) {
        const charts = this._charts;
        let anims = charts.get(chart);
        if (!anims) {
            anims = {
                running: false,
                initial: true,
                items: [],
                listeners: {
                    complete: [],
                    progress: []
                }
            };
            charts.set(chart, anims);
        }
        return anims;
    }
 listen(chart, event, cb) {
        this._getAnims(chart).listeners[event].push(cb);
    }
 add(chart, items) {
        if (!items || !items.length) {
            return;
        }
        this._getAnims(chart).items.push(...items);
    }
 has(chart) {
        return this._getAnims(chart).items.length > 0;
    }
 start(chart) {
        const anims = this._charts.get(chart);
        if (!anims) {
            return;
        }
        anims.running = true;
        anims.start = Date.now();
        anims.duration = anims.items.reduce((acc, cur)=>Math.max(acc, cur._duration), 0);
        this._refresh();
    }
    running(chart) {
        if (!this._running) {
            return false;
        }
        const anims = this._charts.get(chart);
        if (!anims || !anims.running || !anims.items.length) {
            return false;
        }
        return true;
    }
 stop(chart) {
        const anims = this._charts.get(chart);
        if (!anims || !anims.items.length) {
            return;
        }
        const items = anims.items;
        let i = items.length - 1;
        for(; i >= 0; --i){
            items[i].cancel();
        }
        anims.items = [];
        this._notify(chart, anims, Date.now(), 'complete');
    }
 remove(chart) {
        return this._charts.delete(chart);
    }
}
var animator = /* #__PURE__ */ new Animator();

const transparent = 'transparent';
const interpolators = {
    boolean (from, to, factor) {
        return factor > 0.5 ? to : from;
    },
 color (from, to, factor) {
        const c0 = color(from || transparent);
        const c1 = c0.valid && color(to || transparent);
        return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to;
    },
    number (from, to, factor) {
        return from + (to - from) * factor;
    }
};
class Animation {
    constructor(cfg, target, prop, to){
        const currentValue = target[prop];
        to = resolve([
            cfg.to,
            to,
            currentValue,
            cfg.from
        ]);
        const from = resolve([
            cfg.from,
            currentValue,
            to
        ]);
        this._active = true;
        this._fn = cfg.fn || interpolators[cfg.type || typeof from];
        this._easing = effects[cfg.easing] || effects.linear;
        this._start = Math.floor(Date.now() + (cfg.delay || 0));
        this._duration = this._total = Math.floor(cfg.duration);
        this._loop = !!cfg.loop;
        this._target = target;
        this._prop = prop;
        this._from = from;
        this._to = to;
        this._promises = undefined;
    }
    active() {
        return this._active;
    }
    update(cfg, to, date) {
        if (this._active) {
            this._notify(false);
            const currentValue = this._target[this._prop];
            const elapsed = date - this._start;
            const remain = this._duration - elapsed;
            this._start = date;
            this._duration = Math.floor(Math.max(remain, cfg.duration));
            this._total += elapsed;
            this._loop = !!cfg.loop;
            this._to = resolve([
                cfg.to,
                to,
                currentValue,
                cfg.from
            ]);
            this._from = resolve([
                cfg.from,
                currentValue,
                to
            ]);
        }
    }
    cancel() {
        if (this._active) {
            this.tick(Date.now());
            this._active = false;
            this._notify(false);
        }
    }
    tick(date) {
        const elapsed = date - this._start;
        const duration = this._duration;
        const prop = this._prop;
        const from = this._from;
        const loop = this._loop;
        const to = this._to;
        let factor;
        this._active = from !== to && (loop || elapsed < duration);
        if (!this._active) {
            this._target[prop] = to;
            this._notify(true);
            return;
        }
        if (elapsed < 0) {
            this._target[prop] = from;
            return;
        }
        factor = elapsed / duration % 2;
        factor = loop && factor > 1 ? 2 - factor : factor;
        factor = this._easing(Math.min(1, Math.max(0, factor)));
        this._target[prop] = this._fn(from, to, factor);
    }
    wait() {
        const promises = this._promises || (this._promises = []);
        return new Promise((res, rej)=>{
            promises.push({
                res,
                rej
            });
        });
    }
    _notify(resolved) {
        const method = resolved ? 'res' : 'rej';
        const promises = this._promises || [];
        for(let i = 0; i < promises.length; i++){
            promises[i][method]();
        }
    }
}

class Animations {
    constructor(chart, config){
        this._chart = chart;
        this._properties = new Map();
        this.configure(config);
    }
    configure(config) {
        if (!isObject(config)) {
            return;
        }
        const animationOptions = Object.keys(defaults.animation);
        const animatedProps = this._properties;
        Object.getOwnPropertyNames(config).forEach((key)=>{
            const cfg = config[key];
            if (!isObject(cfg)) {
                return;
            }
            const resolved = {};
            for (const option of animationOptions){
                resolved[option] = cfg[option];
            }
            (isArray(cfg.properties) && cfg.properties || [
                key
            ]).forEach((prop)=>{
                if (prop === key || !animatedProps.has(prop)) {
                    animatedProps.set(prop, resolved);
                }
            });
        });
    }
 _animateOptions(target, values) {
        const newOptions = values.options;
        const options = resolveTargetOptions(target, newOptions);
        if (!options) {
            return [];
        }
        const animations = this._createAnimations(options, newOptions);
        if (newOptions.$shared) {
            awaitAll(target.options.$animations, newOptions).then(()=>{
                target.options = newOptions;
            }, ()=>{
            });
        }
        return animations;
    }
 _createAnimations(target, values) {
        const animatedProps = this._properties;
        const animations = [];
        const running = target.$animations || (target.$animations = {});
        const props = Object.keys(values);
        const date = Date.now();
        let i;
        for(i = props.length - 1; i >= 0; --i){
            const prop = props[i];
            if (prop.charAt(0) === '$') {
                continue;
            }
            if (prop === 'options') {
                animations.push(...this._animateOptions(target, values));
                continue;
            }
            const value = values[prop];
            let animation = running[prop];
            const cfg = animatedProps.get(prop);
            if (animation) {
                if (cfg && animation.active()) {
                    animation.update(cfg, value, date);
                    continue;
                } else {
                    animation.cancel();
                }
            }
            if (!cfg || !cfg.duration) {
                target[prop] = value;
                continue;
            }
            running[prop] = animation = new Animation(cfg, target, prop, value);
            animations.push(animation);
        }
        return animations;
    }
 update(target, values) {
        if (this._properties.size === 0) {
            Object.assign(target, values);
            return;
        }
        const animations = this._createAnimations(target, values);
        if (animations.length) {
            animator.add(this._chart, animations);
            return true;
        }
    }
}
function awaitAll(animations, properties) {
    const running = [];
    const keys = Object.keys(properties);
    for(let i = 0; i < keys.length; i++){
        const anim = animations[keys[i]];
        if (anim && anim.active()) {
            running.push(anim.wait());
        }
    }
    return Promise.all(running);
}
function resolveTargetOptions(target, newOptions) {
    if (!newOptions) {
        return;
    }
    let options = target.options;
    if (!options) {
        target.options = newOptions;
        return;
    }
    if (options.$shared) {
        target.options = options = Object.assign({}, options, {
            $shared: false,
            $animations: {}
        });
    }
    return options;
}

function scaleClip(scale, allowedOverflow) {
    const opts = scale && scale.options || {};
    const reverse = opts.reverse;
    const min = opts.min === undefined ? allowedOverflow : 0;
    const max = opts.max === undefined ? allowedOverflow : 0;
    return {
        start: reverse ? max : min,
        end: reverse ? min : max
    };
}
function defaultClip(xScale, yScale, allowedOverflow) {
    if (allowedOverflow === false) {
        return false;
    }
    const x = scaleClip(xScale, allowedOverflow);
    const y = scaleClip(yScale, allowedOverflow);
    return {
        top: y.end,
        right: x.end,
        bottom: y.start,
        left: x.start
    };
}
function toClip(value) {
    let t, r, b, l;
    if (isObject(value)) {
        t = value.top;
        r = value.right;
        b = value.bottom;
        l = value.left;
    } else {
        t = r = b = l = value;
    }
    return {
        top: t,
        right: r,
        bottom: b,
        left: l,
        disabled: value === false
    };
}
function getSortedDatasetIndices(chart, filterVisible) {
    const keys = [];
    const metasets = chart._getSortedDatasetMetas(filterVisible);
    let i, ilen;
    for(i = 0, ilen = metasets.length; i < ilen; ++i){
        keys.push(metasets[i].index);
    }
    return keys;
}
function applyStack(stack, value, dsIndex, options = {}) {
    const keys = stack.keys;
    const singleMode = options.mode === 'single';
    let i, ilen, datasetIndex, otherValue;
    if (value === null) {
        return;
    }
    for(i = 0, ilen = keys.length; i < ilen; ++i){
        datasetIndex = +keys[i];
        if (datasetIndex === dsIndex) {
            if (options.all) {
                continue;
            }
            break;
        }
        otherValue = stack.values[datasetIndex];
        if (isNumberFinite(otherValue) && (singleMode || value === 0 || sign(value) === sign(otherValue))) {
            value += otherValue;
        }
    }
    return value;
}
function convertObjectDataToArray(data) {
    const keys = Object.keys(data);
    const adata = new Array(keys.length);
    let i, ilen, key;
    for(i = 0, ilen = keys.length; i < ilen; ++i){
        key = keys[i];
        adata[i] = {
            x: key,
            y: data[key]
        };
    }
    return adata;
}
function isStacked(scale, meta) {
    const stacked = scale && scale.options.stacked;
    return stacked || stacked === undefined && meta.stack !== undefined;
}
function getStackKey(indexScale, valueScale, meta) {
    return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
}
function getUserBounds(scale) {
    const { min , max , minDefined , maxDefined  } = scale.getUserBounds();
    return {
        min: minDefined ? min : Number.NEGATIVE_INFINITY,
        max: maxDefined ? max : Number.POSITIVE_INFINITY
    };
}
function getOrCreateStack(stacks, stackKey, indexValue) {
    const subStack = stacks[stackKey] || (stacks[stackKey] = {});
    return subStack[indexValue] || (subStack[indexValue] = {});
}
function getLastIndexInStack(stack, vScale, positive, type) {
    for (const meta of vScale.getMatchingVisibleMetas(type).reverse()){
        const value = stack[meta.index];
        if (positive && value > 0 || !positive && value < 0) {
            return meta.index;
        }
    }
    return null;
}
function updateStacks(controller, parsed) {
    const { chart , _cachedMeta: meta  } = controller;
    const stacks = chart._stacks || (chart._stacks = {});
    const { iScale , vScale , index: datasetIndex  } = meta;
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const key = getStackKey(iScale, vScale, meta);
    const ilen = parsed.length;
    let stack;
    for(let i = 0; i < ilen; ++i){
        const item = parsed[i];
        const { [iAxis]: index , [vAxis]: value  } = item;
        const itemStacks = item._stacks || (item._stacks = {});
        stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
        stack[datasetIndex] = value;
        stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
        stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
        const visualValues = stack._visualValues || (stack._visualValues = {});
        visualValues[datasetIndex] = value;
    }
}
function getFirstScaleId(chart, axis) {
    const scales = chart.scales;
    return Object.keys(scales).filter((key)=>scales[key].axis === axis).shift();
}
function createDatasetContext(parent, index) {
    return createContext(parent, {
        active: false,
        dataset: undefined,
        datasetIndex: index,
        index,
        mode: 'default',
        type: 'dataset'
    });
}
function createDataContext(parent, index, element) {
    return createContext(parent, {
        active: false,
        dataIndex: index,
        parsed: undefined,
        raw: undefined,
        element,
        index,
        mode: 'default',
        type: 'data'
    });
}
function clearStacks(meta, items) {
    const datasetIndex = meta.controller.index;
    const axis = meta.vScale && meta.vScale.axis;
    if (!axis) {
        return;
    }
    items = items || meta._parsed;
    for (const parsed of items){
        const stacks = parsed._stacks;
        if (!stacks || stacks[axis] === undefined || stacks[axis][datasetIndex] === undefined) {
            return;
        }
        delete stacks[axis][datasetIndex];
        if (stacks[axis]._visualValues !== undefined && stacks[axis]._visualValues[datasetIndex] !== undefined) {
            delete stacks[axis]._visualValues[datasetIndex];
        }
    }
}
const isDirectUpdateMode = (mode)=>mode === 'reset' || mode === 'none';
const cloneIfNotShared = (cached, shared)=>shared ? cached : Object.assign({}, cached);
const createStack = (canStack, meta, chart)=>canStack && !meta.hidden && meta._stacked && {
        keys: getSortedDatasetIndices(chart, true),
        values: null
    };
class DatasetController {
 static defaults = {};
 static datasetElementType = null;
 static dataElementType = null;
 constructor(chart, datasetIndex){
        this.chart = chart;
        this._ctx = chart.ctx;
        this.index = datasetIndex;
        this._cachedDataOpts = {};
        this._cachedMeta = this.getMeta();
        this._type = this._cachedMeta.type;
        this.options = undefined;
         this._parsing = false;
        this._data = undefined;
        this._objectData = undefined;
        this._sharedOptions = undefined;
        this._drawStart = undefined;
        this._drawCount = undefined;
        this.enableOptionSharing = false;
        this.supportsDecimation = false;
        this.$context = undefined;
        this._syncList = [];
        this.datasetElementType = new.target.datasetElementType;
        this.dataElementType = new.target.dataElementType;
        this.initialize();
    }
    initialize() {
        const meta = this._cachedMeta;
        this.configure();
        this.linkScales();
        meta._stacked = isStacked(meta.vScale, meta);
        this.addElements();
        if (this.options.fill && !this.chart.isPluginEnabled('filler')) {
            console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
        }
    }
    updateIndex(datasetIndex) {
        if (this.index !== datasetIndex) {
            clearStacks(this._cachedMeta);
        }
        this.index = datasetIndex;
    }
    linkScales() {
        const chart = this.chart;
        const meta = this._cachedMeta;
        const dataset = this.getDataset();
        const chooseId = (axis, x, y, r)=>axis === 'x' ? x : axis === 'r' ? r : y;
        const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, 'x'));
        const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, 'y'));
        const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, 'r'));
        const indexAxis = meta.indexAxis;
        const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
        const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
        meta.xScale = this.getScaleForId(xid);
        meta.yScale = this.getScaleForId(yid);
        meta.rScale = this.getScaleForId(rid);
        meta.iScale = this.getScaleForId(iid);
        meta.vScale = this.getScaleForId(vid);
    }
    getDataset() {
        return this.chart.data.datasets[this.index];
    }
    getMeta() {
        return this.chart.getDatasetMeta(this.index);
    }
 getScaleForId(scaleID) {
        return this.chart.scales[scaleID];
    }
 _getOtherScale(scale) {
        const meta = this._cachedMeta;
        return scale === meta.iScale ? meta.vScale : meta.iScale;
    }
    reset() {
        this._update('reset');
    }
 _destroy() {
        const meta = this._cachedMeta;
        if (this._data) {
            unlistenArrayEvents(this._data, this);
        }
        if (meta._stacked) {
            clearStacks(meta);
        }
    }
 _dataCheck() {
        const dataset = this.getDataset();
        const data = dataset.data || (dataset.data = []);
        const _data = this._data;
        if (isObject(data)) {
            this._data = convertObjectDataToArray(data);
        } else if (_data !== data) {
            if (_data) {
                unlistenArrayEvents(_data, this);
                const meta = this._cachedMeta;
                clearStacks(meta);
                meta._parsed = [];
            }
            if (data && Object.isExtensible(data)) {
                listenArrayEvents(data, this);
            }
            this._syncList = [];
            this._data = data;
        }
    }
    addElements() {
        const meta = this._cachedMeta;
        this._dataCheck();
        if (this.datasetElementType) {
            meta.dataset = new this.datasetElementType();
        }
    }
    buildOrUpdateElements(resetNewElements) {
        const meta = this._cachedMeta;
        const dataset = this.getDataset();
        let stackChanged = false;
        this._dataCheck();
        const oldStacked = meta._stacked;
        meta._stacked = isStacked(meta.vScale, meta);
        if (meta.stack !== dataset.stack) {
            stackChanged = true;
            clearStacks(meta);
            meta.stack = dataset.stack;
        }
        this._resyncElements(resetNewElements);
        if (stackChanged || oldStacked !== meta._stacked) {
            updateStacks(this, meta._parsed);
        }
    }
 configure() {
        const config = this.chart.config;
        const scopeKeys = config.datasetScopeKeys(this._type);
        const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
        this.options = config.createResolver(scopes, this.getContext());
        this._parsing = this.options.parsing;
        this._cachedDataOpts = {};
    }
 parse(start, count) {
        const { _cachedMeta: meta , _data: data  } = this;
        const { iScale , _stacked  } = meta;
        const iAxis = iScale.axis;
        let sorted = start === 0 && count === data.length ? true : meta._sorted;
        let prev = start > 0 && meta._parsed[start - 1];
        let i, cur, parsed;
        if (this._parsing === false) {
            meta._parsed = data;
            meta._sorted = true;
            parsed = data;
        } else {
            if (isArray(data[start])) {
                parsed = this.parseArrayData(meta, data, start, count);
            } else if (isObject(data[start])) {
                parsed = this.parseObjectData(meta, data, start, count);
            } else {
                parsed = this.parsePrimitiveData(meta, data, start, count);
            }
            const isNotInOrderComparedToPrev = ()=>cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
            for(i = 0; i < count; ++i){
                meta._parsed[i + start] = cur = parsed[i];
                if (sorted) {
                    if (isNotInOrderComparedToPrev()) {
                        sorted = false;
                    }
                    prev = cur;
                }
            }
            meta._sorted = sorted;
        }
        if (_stacked) {
            updateStacks(this, parsed);
        }
    }
 parsePrimitiveData(meta, data, start, count) {
        const { iScale , vScale  } = meta;
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const labels = iScale.getLabels();
        const singleScale = iScale === vScale;
        const parsed = new Array(count);
        let i, ilen, index;
        for(i = 0, ilen = count; i < ilen; ++i){
            index = i + start;
            parsed[i] = {
                [iAxis]: singleScale || iScale.parse(labels[index], index),
                [vAxis]: vScale.parse(data[index], index)
            };
        }
        return parsed;
    }
 parseArrayData(meta, data, start, count) {
        const { xScale , yScale  } = meta;
        const parsed = new Array(count);
        let i, ilen, index, item;
        for(i = 0, ilen = count; i < ilen; ++i){
            index = i + start;
            item = data[index];
            parsed[i] = {
                x: xScale.parse(item[0], index),
                y: yScale.parse(item[1], index)
            };
        }
        return parsed;
    }
 parseObjectData(meta, data, start, count) {
        const { xScale , yScale  } = meta;
        const { xAxisKey ='x' , yAxisKey ='y'  } = this._parsing;
        const parsed = new Array(count);
        let i, ilen, index, item;
        for(i = 0, ilen = count; i < ilen; ++i){
            index = i + start;
            item = data[index];
            parsed[i] = {
                x: xScale.parse(resolveObjectKey(item, xAxisKey), index),
                y: yScale.parse(resolveObjectKey(item, yAxisKey), index)
            };
        }
        return parsed;
    }
 getParsed(index) {
        return this._cachedMeta._parsed[index];
    }
 getDataElement(index) {
        return this._cachedMeta.data[index];
    }
 applyStack(scale, parsed, mode) {
        const chart = this.chart;
        const meta = this._cachedMeta;
        const value = parsed[scale.axis];
        const stack = {
            keys: getSortedDatasetIndices(chart, true),
            values: parsed._stacks[scale.axis]._visualValues
        };
        return applyStack(stack, value, meta.index, {
            mode
        });
    }
 updateRangeFromParsed(range, scale, parsed, stack) {
        const parsedValue = parsed[scale.axis];
        let value = parsedValue === null ? NaN : parsedValue;
        const values = stack && parsed._stacks[scale.axis];
        if (stack && values) {
            stack.values = values;
            value = applyStack(stack, parsedValue, this._cachedMeta.index);
        }
        range.min = Math.min(range.min, value);
        range.max = Math.max(range.max, value);
    }
 getMinMax(scale, canStack) {
        const meta = this._cachedMeta;
        const _parsed = meta._parsed;
        const sorted = meta._sorted && scale === meta.iScale;
        const ilen = _parsed.length;
        const otherScale = this._getOtherScale(scale);
        const stack = createStack(canStack, meta, this.chart);
        const range = {
            min: Number.POSITIVE_INFINITY,
            max: Number.NEGATIVE_INFINITY
        };
        const { min: otherMin , max: otherMax  } = getUserBounds(otherScale);
        let i, parsed;
        function _skip() {
            parsed = _parsed[i];
            const otherValue = parsed[otherScale.axis];
            return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
        }
        for(i = 0; i < ilen; ++i){
            if (_skip()) {
                continue;
            }
            this.updateRangeFromParsed(range, scale, parsed, stack);
            if (sorted) {
                break;
            }
        }
        if (sorted) {
            for(i = ilen - 1; i >= 0; --i){
                if (_skip()) {
                    continue;
                }
                this.updateRangeFromParsed(range, scale, parsed, stack);
                break;
            }
        }
        return range;
    }
    getAllParsedValues(scale) {
        const parsed = this._cachedMeta._parsed;
        const values = [];
        let i, ilen, value;
        for(i = 0, ilen = parsed.length; i < ilen; ++i){
            value = parsed[i][scale.axis];
            if (isNumberFinite(value)) {
                values.push(value);
            }
        }
        return values;
    }
 getMaxOverflow() {
        return false;
    }
 getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const iScale = meta.iScale;
        const vScale = meta.vScale;
        const parsed = this.getParsed(index);
        return {
            label: iScale ? '' + iScale.getLabelForValue(parsed[iScale.axis]) : '',
            value: vScale ? '' + vScale.getLabelForValue(parsed[vScale.axis]) : ''
        };
    }
 _update(mode) {
        const meta = this._cachedMeta;
        this.update(mode || 'default');
        meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
    }
 update(mode) {}
    draw() {
        const ctx = this._ctx;
        const chart = this.chart;
        const meta = this._cachedMeta;
        const elements = meta.data || [];
        const area = chart.chartArea;
        const active = [];
        const start = this._drawStart || 0;
        const count = this._drawCount || elements.length - start;
        const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
        let i;
        if (meta.dataset) {
            meta.dataset.draw(ctx, area, start, count);
        }
        for(i = start; i < start + count; ++i){
            const element = elements[i];
            if (element.hidden) {
                continue;
            }
            if (element.active && drawActiveElementsOnTop) {
                active.push(element);
            } else {
                element.draw(ctx, area);
            }
        }
        for(i = 0; i < active.length; ++i){
            active[i].draw(ctx, area);
        }
    }
 getStyle(index, active) {
        const mode = active ? 'active' : 'default';
        return index === undefined && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index || 0, mode);
    }
 getContext(index, active, mode) {
        const dataset = this.getDataset();
        let context;
        if (index >= 0 && index < this._cachedMeta.data.length) {
            const element = this._cachedMeta.data[index];
            context = element.$context || (element.$context = createDataContext(this.getContext(), index, element));
            context.parsed = this.getParsed(index);
            context.raw = dataset.data[index];
            context.index = context.dataIndex = index;
        } else {
            context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
            context.dataset = dataset;
            context.index = context.datasetIndex = this.index;
        }
        context.active = !!active;
        context.mode = mode;
        return context;
    }
 resolveDatasetElementOptions(mode) {
        return this._resolveElementOptions(this.datasetElementType.id, mode);
    }
 resolveDataElementOptions(index, mode) {
        return this._resolveElementOptions(this.dataElementType.id, mode, index);
    }
 _resolveElementOptions(elementType, mode = 'default', index) {
        const active = mode === 'active';
        const cache = this._cachedDataOpts;
        const cacheKey = elementType + '-' + mode;
        const cached = cache[cacheKey];
        const sharing = this.enableOptionSharing && defined(index);
        if (cached) {
            return cloneIfNotShared(cached, sharing);
        }
        const config = this.chart.config;
        const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
        const prefixes = active ? [
            `${elementType}Hover`,
            'hover',
            elementType,
            ''
        ] : [
            elementType,
            ''
        ];
        const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
        const names = Object.keys(defaults.elements[elementType]);
        const context = ()=>this.getContext(index, active, mode);
        const values = config.resolveNamedOptions(scopes, names, context, prefixes);
        if (values.$shared) {
            values.$shared = sharing;
            cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
        }
        return values;
    }
 _resolveAnimations(index, transition, active) {
        const chart = this.chart;
        const cache = this._cachedDataOpts;
        const cacheKey = `animation-${transition}`;
        const cached = cache[cacheKey];
        if (cached) {
            return cached;
        }
        let options;
        if (chart.options.animation !== false) {
            const config = this.chart.config;
            const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
            const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
            options = config.createResolver(scopes, this.getContext(index, active, transition));
        }
        const animations = new Animations(chart, options && options.animations);
        if (options && options._cacheable) {
            cache[cacheKey] = Object.freeze(animations);
        }
        return animations;
    }
 getSharedOptions(options) {
        if (!options.$shared) {
            return;
        }
        return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
    }
 includeOptions(mode, sharedOptions) {
        return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
    }
 _getSharedOptions(start, mode) {
        const firstOpts = this.resolveDataElementOptions(start, mode);
        const previouslySharedOptions = this._sharedOptions;
        const sharedOptions = this.getSharedOptions(firstOpts);
        const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
        this.updateSharedOptions(sharedOptions, mode, firstOpts);
        return {
            sharedOptions,
            includeOptions
        };
    }
 updateElement(element, index, properties, mode) {
        if (isDirectUpdateMode(mode)) {
            Object.assign(element, properties);
        } else {
            this._resolveAnimations(index, mode).update(element, properties);
        }
    }
 updateSharedOptions(sharedOptions, mode, newOptions) {
        if (sharedOptions && !isDirectUpdateMode(mode)) {
            this._resolveAnimations(undefined, mode).update(sharedOptions, newOptions);
        }
    }
 _setStyle(element, index, mode, active) {
        element.active = active;
        const options = this.getStyle(index, active);
        this._resolveAnimations(index, mode, active).update(element, {
            options: !active && this.getSharedOptions(options) || options
        });
    }
    removeHoverStyle(element, datasetIndex, index) {
        this._setStyle(element, index, 'active', false);
    }
    setHoverStyle(element, datasetIndex, index) {
        this._setStyle(element, index, 'active', true);
    }
 _removeDatasetHoverStyle() {
        const element = this._cachedMeta.dataset;
        if (element) {
            this._setStyle(element, undefined, 'active', false);
        }
    }
 _setDatasetHoverStyle() {
        const element = this._cachedMeta.dataset;
        if (element) {
            this._setStyle(element, undefined, 'active', true);
        }
    }
 _resyncElements(resetNewElements) {
        const data = this._data;
        const elements = this._cachedMeta.data;
        for (const [method, arg1, arg2] of this._syncList){
            this[method](arg1, arg2);
        }
        this._syncList = [];
        const numMeta = elements.length;
        const numData = data.length;
        const count = Math.min(numData, numMeta);
        if (count) {
            this.parse(0, count);
        }
        if (numData > numMeta) {
            this._insertElements(numMeta, numData - numMeta, resetNewElements);
        } else if (numData < numMeta) {
            this._removeElements(numData, numMeta - numData);
        }
    }
 _insertElements(start, count, resetNewElements = true) {
        const meta = this._cachedMeta;
        const data = meta.data;
        const end = start + count;
        let i;
        const move = (arr)=>{
            arr.length += count;
            for(i = arr.length - 1; i >= end; i--){
                arr[i] = arr[i - count];
            }
        };
        move(data);
        for(i = start; i < end; ++i){
            data[i] = new this.dataElementType();
        }
        if (this._parsing) {
            move(meta._parsed);
        }
        this.parse(start, count);
        if (resetNewElements) {
            this.updateElements(data, start, count, 'reset');
        }
    }
    updateElements(element, start, count, mode) {}
 _removeElements(start, count) {
        const meta = this._cachedMeta;
        if (this._parsing) {
            const removed = meta._parsed.splice(start, count);
            if (meta._stacked) {
                clearStacks(meta, removed);
            }
        }
        meta.data.splice(start, count);
    }
 _sync(args) {
        if (this._parsing) {
            this._syncList.push(args);
        } else {
            const [method, arg1, arg2] = args;
            this[method](arg1, arg2);
        }
        this.chart._dataChanges.push([
            this.index,
            ...args
        ]);
    }
    _onDataPush() {
        const count = arguments.length;
        this._sync([
            '_insertElements',
            this.getDataset().data.length - count,
            count
        ]);
    }
    _onDataPop() {
        this._sync([
            '_removeElements',
            this._cachedMeta.data.length - 1,
            1
        ]);
    }
    _onDataShift() {
        this._sync([
            '_removeElements',
            0,
            1
        ]);
    }
    _onDataSplice(start, count) {
        if (count) {
            this._sync([
                '_removeElements',
                start,
                count
            ]);
        }
        const newCount = arguments.length - 2;
        if (newCount) {
            this._sync([
                '_insertElements',
                start,
                newCount
            ]);
        }
    }
    _onDataUnshift() {
        this._sync([
            '_insertElements',
            0,
            arguments.length
        ]);
    }
}

function getAllScaleValues(scale, type) {
    if (!scale._cache.$bar) {
        const visibleMetas = scale.getMatchingVisibleMetas(type);
        let values = [];
        for(let i = 0, ilen = visibleMetas.length; i < ilen; i++){
            values = values.concat(visibleMetas[i].controller.getAllParsedValues(scale));
        }
        scale._cache.$bar = _arrayUnique(values.sort((a, b)=>a - b));
    }
    return scale._cache.$bar;
}
 function computeMinSampleSize(meta) {
    const scale = meta.iScale;
    const values = getAllScaleValues(scale, meta.type);
    let min = scale._length;
    let i, ilen, curr, prev;
    const updateMinAndPrev = ()=>{
        if (curr === 32767 || curr === -32768) {
            return;
        }
        if (defined(prev)) {
            min = Math.min(min, Math.abs(curr - prev) || min);
        }
        prev = curr;
    };
    for(i = 0, ilen = values.length; i < ilen; ++i){
        curr = scale.getPixelForValue(values[i]);
        updateMinAndPrev();
    }
    prev = undefined;
    for(i = 0, ilen = scale.ticks.length; i < ilen; ++i){
        curr = scale.getPixelForTick(i);
        updateMinAndPrev();
    }
    return min;
}
 function computeFitCategoryTraits(index, ruler, options, stackCount) {
    const thickness = options.barThickness;
    let size, ratio;
    if (isNullOrUndef(thickness)) {
        size = ruler.min * options.categoryPercentage;
        ratio = options.barPercentage;
    } else {
        size = thickness * stackCount;
        ratio = 1;
    }
    return {
        chunk: size / stackCount,
        ratio,
        start: ruler.pixels[index] - size / 2
    };
}
 function computeFlexCategoryTraits(index, ruler, options, stackCount) {
    const pixels = ruler.pixels;
    const curr = pixels[index];
    let prev = index > 0 ? pixels[index - 1] : null;
    let next = index < pixels.length - 1 ? pixels[index + 1] : null;
    const percent = options.categoryPercentage;
    if (prev === null) {
        prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
    }
    if (next === null) {
        next = curr + curr - prev;
    }
    const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
    const size = Math.abs(next - prev) / 2 * percent;
    return {
        chunk: size / stackCount,
        ratio: options.barPercentage,
        start
    };
}
function parseFloatBar(entry, item, vScale, i) {
    const startValue = vScale.parse(entry[0], i);
    const endValue = vScale.parse(entry[1], i);
    const min = Math.min(startValue, endValue);
    const max = Math.max(startValue, endValue);
    let barStart = min;
    let barEnd = max;
    if (Math.abs(min) > Math.abs(max)) {
        barStart = max;
        barEnd = min;
    }
    item[vScale.axis] = barEnd;
    item._custom = {
        barStart,
        barEnd,
        start: startValue,
        end: endValue,
        min,
        max
    };
}
function parseValue(entry, item, vScale, i) {
    if (isArray(entry)) {
        parseFloatBar(entry, item, vScale, i);
    } else {
        item[vScale.axis] = vScale.parse(entry, i);
    }
    return item;
}
function parseArrayOrPrimitive(meta, data, start, count) {
    const iScale = meta.iScale;
    const vScale = meta.vScale;
    const labels = iScale.getLabels();
    const singleScale = iScale === vScale;
    const parsed = [];
    let i, ilen, item, entry;
    for(i = start, ilen = start + count; i < ilen; ++i){
        entry = data[i];
        item = {};
        item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
        parsed.push(parseValue(entry, item, vScale, i));
    }
    return parsed;
}
function isFloatBar(custom) {
    return custom && custom.barStart !== undefined && custom.barEnd !== undefined;
}
function barSign(size, vScale, actualBase) {
    if (size !== 0) {
        return sign(size);
    }
    return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
}
function borderProps(properties) {
    let reverse, start, end, top, bottom;
    if (properties.horizontal) {
        reverse = properties.base > properties.x;
        start = 'left';
        end = 'right';
    } else {
        reverse = properties.base < properties.y;
        start = 'bottom';
        end = 'top';
    }
    if (reverse) {
        top = 'end';
        bottom = 'start';
    } else {
        top = 'start';
        bottom = 'end';
    }
    return {
        start,
        end,
        reverse,
        top,
        bottom
    };
}
function setBorderSkipped(properties, options, stack, index) {
    let edge = options.borderSkipped;
    const res = {};
    if (!edge) {
        properties.borderSkipped = res;
        return;
    }
    if (edge === true) {
        properties.borderSkipped = {
            top: true,
            right: true,
            bottom: true,
            left: true
        };
        return;
    }
    const { start , end , reverse , top , bottom  } = borderProps(properties);
    if (edge === 'middle' && stack) {
        properties.enableBorderRadius = true;
        if ((stack._top || 0) === index) {
            edge = top;
        } else if ((stack._bottom || 0) === index) {
            edge = bottom;
        } else {
            res[parseEdge(bottom, start, end, reverse)] = true;
            edge = top;
        }
    }
    res[parseEdge(edge, start, end, reverse)] = true;
    properties.borderSkipped = res;
}
function parseEdge(edge, a, b, reverse) {
    if (reverse) {
        edge = swap(edge, a, b);
        edge = startEnd(edge, b, a);
    } else {
        edge = startEnd(edge, a, b);
    }
    return edge;
}
function swap(orig, v1, v2) {
    return orig === v1 ? v2 : orig === v2 ? v1 : orig;
}
function startEnd(v, start, end) {
    return v === 'start' ? start : v === 'end' ? end : v;
}
function setInflateAmount(properties, { inflateAmount  }, ratio) {
    properties.inflateAmount = inflateAmount === 'auto' ? ratio === 1 ? 0.33 : 0 : inflateAmount;
}
class BarController extends DatasetController {
    static id = 'bar';
 static defaults = {
        datasetElementType: false,
        dataElementType: 'bar',
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        grouped: true,
        animations: {
            numbers: {
                type: 'number',
                properties: [
                    'x',
                    'y',
                    'base',
                    'width',
                    'height'
                ]
            }
        }
    };
 static overrides = {
        scales: {
            _index_: {
                type: 'category',
                offset: true,
                grid: {
                    offset: true
                }
            },
            _value_: {
                type: 'linear',
                beginAtZero: true
            }
        }
    };
 parsePrimitiveData(meta, data, start, count) {
        return parseArrayOrPrimitive(meta, data, start, count);
    }
 parseArrayData(meta, data, start, count) {
        return parseArrayOrPrimitive(meta, data, start, count);
    }
 parseObjectData(meta, data, start, count) {
        const { iScale , vScale  } = meta;
        const { xAxisKey ='x' , yAxisKey ='y'  } = this._parsing;
        const iAxisKey = iScale.axis === 'x' ? xAxisKey : yAxisKey;
        const vAxisKey = vScale.axis === 'x' ? xAxisKey : yAxisKey;
        const parsed = [];
        let i, ilen, item, obj;
        for(i = start, ilen = start + count; i < ilen; ++i){
            obj = data[i];
            item = {};
            item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i);
            parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i));
        }
        return parsed;
    }
 updateRangeFromParsed(range, scale, parsed, stack) {
        super.updateRangeFromParsed(range, scale, parsed, stack);
        const custom = parsed._custom;
        if (custom && scale === this._cachedMeta.vScale) {
            range.min = Math.min(range.min, custom.min);
            range.max = Math.max(range.max, custom.max);
        }
    }
 getMaxOverflow() {
        return 0;
    }
 getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const { iScale , vScale  } = meta;
        const parsed = this.getParsed(index);
        const custom = parsed._custom;
        const value = isFloatBar(custom) ? '[' + custom.start + ', ' + custom.end + ']' : '' + vScale.getLabelForValue(parsed[vScale.axis]);
        return {
            label: '' + iScale.getLabelForValue(parsed[iScale.axis]),
            value
        };
    }
    initialize() {
        this.enableOptionSharing = true;
        super.initialize();
        const meta = this._cachedMeta;
        meta.stack = this.getDataset().stack;
    }
    update(mode) {
        const meta = this._cachedMeta;
        this.updateElements(meta.data, 0, meta.data.length, mode);
    }
    updateElements(bars, start, count, mode) {
        const reset = mode === 'reset';
        const { index , _cachedMeta: { vScale  }  } = this;
        const base = vScale.getBasePixel();
        const horizontal = vScale.isHorizontal();
        const ruler = this._getRuler();
        const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
        for(let i = start; i < start + count; i++){
            const parsed = this.getParsed(i);
            const vpixels = reset || isNullOrUndef(parsed[vScale.axis]) ? {
                base,
                head: base
            } : this._calculateBarValuePixels(i);
            const ipixels = this._calculateBarIndexPixels(i, ruler);
            const stack = (parsed._stacks || {})[vScale.axis];
            const properties = {
                horizontal,
                base: vpixels.base,
                enableBorderRadius: !stack || isFloatBar(parsed._custom) || index === stack._top || index === stack._bottom,
                x: horizontal ? vpixels.head : ipixels.center,
                y: horizontal ? ipixels.center : vpixels.head,
                height: horizontal ? ipixels.size : Math.abs(vpixels.size),
                width: horizontal ? Math.abs(vpixels.size) : ipixels.size
            };
            if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, bars[i].active ? 'active' : mode);
            }
            const options = properties.options || bars[i].options;
            setBorderSkipped(properties, options, stack, index);
            setInflateAmount(properties, options, ruler.ratio);
            this.updateElement(bars[i], i, properties, mode);
        }
    }
 _getStacks(last, dataIndex) {
        const { iScale  } = this._cachedMeta;
        const metasets = iScale.getMatchingVisibleMetas(this._type).filter((meta)=>meta.controller.options.grouped);
        const stacked = iScale.options.stacked;
        const stacks = [];
        const skipNull = (meta)=>{
            const parsed = meta.controller.getParsed(dataIndex);
            const val = parsed && parsed[meta.vScale.axis];
            if (isNullOrUndef(val) || isNaN(val)) {
                return true;
            }
        };
        for (const meta of metasets){
            if (dataIndex !== undefined && skipNull(meta)) {
                continue;
            }
            if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === undefined && meta.stack === undefined) {
                stacks.push(meta.stack);
            }
            if (meta.index === last) {
                break;
            }
        }
        if (!stacks.length) {
            stacks.push(undefined);
        }
        return stacks;
    }
 _getStackCount(index) {
        return this._getStacks(undefined, index).length;
    }
 _getStackIndex(datasetIndex, name, dataIndex) {
        const stacks = this._getStacks(datasetIndex, dataIndex);
        const index = name !== undefined ? stacks.indexOf(name) : -1;
        return index === -1 ? stacks.length - 1 : index;
    }
 _getRuler() {
        const opts = this.options;
        const meta = this._cachedMeta;
        const iScale = meta.iScale;
        const pixels = [];
        let i, ilen;
        for(i = 0, ilen = meta.data.length; i < ilen; ++i){
            pixels.push(iScale.getPixelForValue(this.getParsed(i)[iScale.axis], i));
        }
        const barThickness = opts.barThickness;
        const min = barThickness || computeMinSampleSize(meta);
        return {
            min,
            pixels,
            start: iScale._startPixel,
            end: iScale._endPixel,
            stackCount: this._getStackCount(),
            scale: iScale,
            grouped: opts.grouped,
            ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
        };
    }
 _calculateBarValuePixels(index) {
        const { _cachedMeta: { vScale , _stacked , index: datasetIndex  } , options: { base: baseValue , minBarLength  }  } = this;
        const actualBase = baseValue || 0;
        const parsed = this.getParsed(index);
        const custom = parsed._custom;
        const floating = isFloatBar(custom);
        let value = parsed[vScale.axis];
        let start = 0;
        let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
        let head, size;
        if (length !== value) {
            start = length - value;
            length = value;
        }
        if (floating) {
            value = custom.barStart;
            length = custom.barEnd - custom.barStart;
            if (value !== 0 && sign(value) !== sign(custom.barEnd)) {
                start = 0;
            }
            start += value;
        }
        const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
        let base = vScale.getPixelForValue(startValue);
        if (this.chart.getDataVisibility(index)) {
            head = vScale.getPixelForValue(start + length);
        } else {
            head = base;
        }
        size = head - base;
        if (Math.abs(size) < minBarLength) {
            size = barSign(size, vScale, actualBase) * minBarLength;
            if (value === actualBase) {
                base -= size / 2;
            }
            const startPixel = vScale.getPixelForDecimal(0);
            const endPixel = vScale.getPixelForDecimal(1);
            const min = Math.min(startPixel, endPixel);
            const max = Math.max(startPixel, endPixel);
            base = Math.max(Math.min(base, max), min);
            head = base + size;
            if (_stacked && !floating) {
                parsed._stacks[vScale.axis]._visualValues[datasetIndex] = vScale.getValueForPixel(head) - vScale.getValueForPixel(base);
            }
        }
        if (base === vScale.getPixelForValue(actualBase)) {
            const halfGrid = sign(size) * vScale.getLineWidthForValue(actualBase) / 2;
            base += halfGrid;
            size -= halfGrid;
        }
        return {
            size,
            base,
            head,
            center: head + size / 2
        };
    }
 _calculateBarIndexPixels(index, ruler) {
        const scale = ruler.scale;
        const options = this.options;
        const skipNull = options.skipNull;
        const maxBarThickness = valueOrDefault(options.maxBarThickness, Infinity);
        let center, size;
        if (ruler.grouped) {
            const stackCount = skipNull ? this._getStackCount(index) : ruler.stackCount;
            const range = options.barThickness === 'flex' ? computeFlexCategoryTraits(index, ruler, options, stackCount) : computeFitCategoryTraits(index, ruler, options, stackCount);
            const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index : undefined);
            center = range.start + range.chunk * stackIndex + range.chunk / 2;
            size = Math.min(maxBarThickness, range.chunk * range.ratio);
        } else {
            center = scale.getPixelForValue(this.getParsed(index)[scale.axis], index);
            size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
        }
        return {
            base: center - size / 2,
            head: center + size / 2,
            center,
            size
        };
    }
    draw() {
        const meta = this._cachedMeta;
        const vScale = meta.vScale;
        const rects = meta.data;
        const ilen = rects.length;
        let i = 0;
        for(; i < ilen; ++i){
            if (this.getParsed(i)[vScale.axis] !== null) {
                rects[i].draw(this._ctx);
            }
        }
    }
}

class BubbleController extends DatasetController {
    static id = 'bubble';
 static defaults = {
        datasetElementType: false,
        dataElementType: 'point',
        animations: {
            numbers: {
                type: 'number',
                properties: [
                    'x',
                    'y',
                    'borderWidth',
                    'radius'
                ]
            }
        }
    };
 static overrides = {
        scales: {
            x: {
                type: 'linear'
            },
            y: {
                type: 'linear'
            }
        }
    };
    initialize() {
        this.enableOptionSharing = true;
        super.initialize();
    }
 parsePrimitiveData(meta, data, start, count) {
        const parsed = super.parsePrimitiveData(meta, data, start, count);
        for(let i = 0; i < parsed.length; i++){
            parsed[i]._custom = this.resolveDataElementOptions(i + start).radius;
        }
        return parsed;
    }
 parseArrayData(meta, data, start, count) {
        const parsed = super.parseArrayData(meta, data, start, count);
        for(let i = 0; i < parsed.length; i++){
            const item = data[start + i];
            parsed[i]._custom = valueOrDefault(item[2], this.resolveDataElementOptions(i + start).radius);
        }
        return parsed;
    }
 parseObjectData(meta, data, start, count) {
        const parsed = super.parseObjectData(meta, data, start, count);
        for(let i = 0; i < parsed.length; i++){
            const item = data[start + i];
            parsed[i]._custom = valueOrDefault(item && item.r && +item.r, this.resolveDataElementOptions(i + start).radius);
        }
        return parsed;
    }
 getMaxOverflow() {
        const data = this._cachedMeta.data;
        let max = 0;
        for(let i = data.length - 1; i >= 0; --i){
            max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
        }
        return max > 0 && max;
    }
 getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const labels = this.chart.data.labels || [];
        const { xScale , yScale  } = meta;
        const parsed = this.getParsed(index);
        const x = xScale.getLabelForValue(parsed.x);
        const y = yScale.getLabelForValue(parsed.y);
        const r = parsed._custom;
        return {
            label: labels[index] || '',
            value: '(' + x + ', ' + y + (r ? ', ' + r : '') + ')'
        };
    }
    update(mode) {
        const points = this._cachedMeta.data;
        this.updateElements(points, 0, points.length, mode);
    }
    updateElements(points, start, count, mode) {
        const reset = mode === 'reset';
        const { iScale , vScale  } = this._cachedMeta;
        const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        for(let i = start; i < start + count; i++){
            const point = points[i];
            const parsed = !reset && this.getParsed(i);
            const properties = {};
            const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(0.5) : iScale.getPixelForValue(parsed[iAxis]);
            const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
            properties.skip = isNaN(iPixel) || isNaN(vPixel);
            if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? 'active' : mode);
                if (reset) {
                    properties.options.radius = 0;
                }
            }
            this.updateElement(point, i, properties, mode);
        }
    }
 resolveDataElementOptions(index, mode) {
        const parsed = this.getParsed(index);
        let values = super.resolveDataElementOptions(index, mode);
        if (values.$shared) {
            values = Object.assign({}, values, {
                $shared: false
            });
        }
        const radius = values.radius;
        if (mode !== 'active') {
            values.radius = 0;
        }
        values.radius += valueOrDefault(parsed && parsed._custom, radius);
        return values;
    }
}

function getRatioAndOffset(rotation, circumference, cutout) {
    let ratioX = 1;
    let ratioY = 1;
    let offsetX = 0;
    let offsetY = 0;
    if (circumference < TAU) {
        const startAngle = rotation;
        const endAngle = startAngle + circumference;
        const startX = Math.cos(startAngle);
        const startY = Math.sin(startAngle);
        const endX = Math.cos(endAngle);
        const endY = Math.sin(endAngle);
        const calcMax = (angle, a, b)=>_angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a, a * cutout, b, b * cutout);
        const calcMin = (angle, a, b)=>_angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a, a * cutout, b, b * cutout);
        const maxX = calcMax(0, startX, endX);
        const maxY = calcMax(HALF_PI, startY, endY);
        const minX = calcMin(PI, startX, endX);
        const minY = calcMin(PI + HALF_PI, startY, endY);
        ratioX = (maxX - minX) / 2;
        ratioY = (maxY - minY) / 2;
        offsetX = -(maxX + minX) / 2;
        offsetY = -(maxY + minY) / 2;
    }
    return {
        ratioX,
        ratioY,
        offsetX,
        offsetY
    };
}
class DoughnutController extends DatasetController {
    static id = 'doughnut';
 static defaults = {
        datasetElementType: false,
        dataElementType: 'arc',
        animation: {
            animateRotate: true,
            animateScale: false
        },
        animations: {
            numbers: {
                type: 'number',
                properties: [
                    'circumference',
                    'endAngle',
                    'innerRadius',
                    'outerRadius',
                    'startAngle',
                    'x',
                    'y',
                    'offset',
                    'borderWidth',
                    'spacing'
                ]
            }
        },
        cutout: '50%',
        rotation: 0,
        circumference: 360,
        radius: '100%',
        spacing: 0,
        indexAxis: 'r'
    };
    static descriptors = {
        _scriptable: (name)=>name !== 'spacing',
        _indexable: (name)=>name !== 'spacing'
    };
 static overrides = {
        aspectRatio: 1,
        plugins: {
            legend: {
                labels: {
                    generateLabels (chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            const { labels: { pointStyle , color  }  } = chart.legend.options;
                            return data.labels.map((label, i)=>{
                                const meta = chart.getDatasetMeta(0);
                                const style = meta.controller.getStyle(i);
                                return {
                                    text: label,
                                    fillStyle: style.backgroundColor,
                                    strokeStyle: style.borderColor,
                                    fontColor: color,
                                    lineWidth: style.borderWidth,
                                    pointStyle: pointStyle,
                                    hidden: !chart.getDataVisibility(i),
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                },
                onClick (e, legendItem, legend) {
                    legend.chart.toggleDataVisibility(legendItem.index);
                    legend.chart.update();
                }
            }
        }
    };
    constructor(chart, datasetIndex){
        super(chart, datasetIndex);
        this.enableOptionSharing = true;
        this.innerRadius = undefined;
        this.outerRadius = undefined;
        this.offsetX = undefined;
        this.offsetY = undefined;
    }
    linkScales() {}
 parse(start, count) {
        const data = this.getDataset().data;
        const meta = this._cachedMeta;
        if (this._parsing === false) {
            meta._parsed = data;
        } else {
            let getter = (i)=>+data[i];
            if (isObject(data[start])) {
                const { key ='value'  } = this._parsing;
                getter = (i)=>+resolveObjectKey(data[i], key);
            }
            let i, ilen;
            for(i = start, ilen = start + count; i < ilen; ++i){
                meta._parsed[i] = getter(i);
            }
        }
    }
 _getRotation() {
        return toRadians(this.options.rotation - 90);
    }
 _getCircumference() {
        return toRadians(this.options.circumference);
    }
 _getRotationExtents() {
        let min = TAU;
        let max = -TAU;
        for(let i = 0; i < this.chart.data.datasets.length; ++i){
            if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
                const controller = this.chart.getDatasetMeta(i).controller;
                const rotation = controller._getRotation();
                const circumference = controller._getCircumference();
                min = Math.min(min, rotation);
                max = Math.max(max, rotation + circumference);
            }
        }
        return {
            rotation: min,
            circumference: max - min
        };
    }
 update(mode) {
        const chart = this.chart;
        const { chartArea  } = chart;
        const meta = this._cachedMeta;
        const arcs = meta.data;
        const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
        const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
        const cutout = Math.min(toPercentage(this.options.cutout, maxSize), 1);
        const chartWeight = this._getRingWeight(this.index);
        const { circumference , rotation  } = this._getRotationExtents();
        const { ratioX , ratioY , offsetX , offsetY  } = getRatioAndOffset(rotation, circumference, cutout);
        const maxWidth = (chartArea.width - spacing) / ratioX;
        const maxHeight = (chartArea.height - spacing) / ratioY;
        const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
        const outerRadius = toDimension(this.options.radius, maxRadius);
        const innerRadius = Math.max(outerRadius * cutout, 0);
        const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
        this.offsetX = offsetX * outerRadius;
        this.offsetY = offsetY * outerRadius;
        meta.total = this.calculateTotal();
        this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
        this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
        this.updateElements(arcs, 0, arcs.length, mode);
    }
 _circumference(i, reset) {
        const opts = this.options;
        const meta = this._cachedMeta;
        const circumference = this._getCircumference();
        if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i) || meta._parsed[i] === null || meta.data[i].hidden) {
            return 0;
        }
        return this.calculateCircumference(meta._parsed[i] * circumference / TAU);
    }
    updateElements(arcs, start, count, mode) {
        const reset = mode === 'reset';
        const chart = this.chart;
        const chartArea = chart.chartArea;
        const opts = chart.options;
        const animationOpts = opts.animation;
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;
        const animateScale = reset && animationOpts.animateScale;
        const innerRadius = animateScale ? 0 : this.innerRadius;
        const outerRadius = animateScale ? 0 : this.outerRadius;
        const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
        let startAngle = this._getRotation();
        let i;
        for(i = 0; i < start; ++i){
            startAngle += this._circumference(i, reset);
        }
        for(i = start; i < start + count; ++i){
            const circumference = this._circumference(i, reset);
            const arc = arcs[i];
            const properties = {
                x: centerX + this.offsetX,
                y: centerY + this.offsetY,
                startAngle,
                endAngle: startAngle + circumference,
                circumference,
                outerRadius,
                innerRadius
            };
            if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, arc.active ? 'active' : mode);
            }
            startAngle += circumference;
            this.updateElement(arc, i, properties, mode);
        }
    }
    calculateTotal() {
        const meta = this._cachedMeta;
        const metaData = meta.data;
        let total = 0;
        let i;
        for(i = 0; i < metaData.length; i++){
            const value = meta._parsed[i];
            if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i) && !metaData[i].hidden) {
                total += Math.abs(value);
            }
        }
        return total;
    }
    calculateCircumference(value) {
        const total = this._cachedMeta.total;
        if (total > 0 && !isNaN(value)) {
            return TAU * (Math.abs(value) / total);
        }
        return 0;
    }
    getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const chart = this.chart;
        const labels = chart.data.labels || [];
        const value = formatNumber(meta._parsed[index], chart.options.locale);
        return {
            label: labels[index] || '',
            value
        };
    }
    getMaxBorderWidth(arcs) {
        let max = 0;
        const chart = this.chart;
        let i, ilen, meta, controller, options;
        if (!arcs) {
            for(i = 0, ilen = chart.data.datasets.length; i < ilen; ++i){
                if (chart.isDatasetVisible(i)) {
                    meta = chart.getDatasetMeta(i);
                    arcs = meta.data;
                    controller = meta.controller;
                    break;
                }
            }
        }
        if (!arcs) {
            return 0;
        }
        for(i = 0, ilen = arcs.length; i < ilen; ++i){
            options = controller.resolveDataElementOptions(i);
            if (options.borderAlign !== 'inner') {
                max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
            }
        }
        return max;
    }
    getMaxOffset(arcs) {
        let max = 0;
        for(let i = 0, ilen = arcs.length; i < ilen; ++i){
            const options = this.resolveDataElementOptions(i);
            max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
        }
        return max;
    }
 _getRingWeightOffset(datasetIndex) {
        let ringWeightOffset = 0;
        for(let i = 0; i < datasetIndex; ++i){
            if (this.chart.isDatasetVisible(i)) {
                ringWeightOffset += this._getRingWeight(i);
            }
        }
        return ringWeightOffset;
    }
 _getRingWeight(datasetIndex) {
        return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
    }
 _getVisibleDatasetWeightTotal() {
        return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
    }
}

class LineController extends DatasetController {
    static id = 'line';
 static defaults = {
        datasetElementType: 'line',
        dataElementType: 'point',
        showLine: true,
        spanGaps: false
    };
 static overrides = {
        scales: {
            _index_: {
                type: 'category'
            },
            _value_: {
                type: 'linear'
            }
        }
    };
    initialize() {
        this.enableOptionSharing = true;
        this.supportsDecimation = true;
        super.initialize();
    }
    update(mode) {
        const meta = this._cachedMeta;
        const { dataset: line , data: points = [] , _dataset  } = meta;
        const animationsDisabled = this.chart._animationsDisabled;
        let { start , count  } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
        this._drawStart = start;
        this._drawCount = count;
        if (_scaleRangesChanged(meta)) {
            start = 0;
            count = points.length;
        }
        line._chart = this.chart;
        line._datasetIndex = this.index;
        line._decimated = !!_dataset._decimated;
        line.points = points;
        const options = this.resolveDatasetElementOptions(mode);
        if (!this.options.showLine) {
            options.borderWidth = 0;
        }
        options.segment = this.options.segment;
        this.updateElement(line, undefined, {
            animated: !animationsDisabled,
            options
        }, mode);
        this.updateElements(points, start, count, mode);
    }
    updateElements(points, start, count, mode) {
        const reset = mode === 'reset';
        const { iScale , vScale , _stacked , _dataset  } = this._cachedMeta;
        const { sharedOptions , includeOptions  } = this._getSharedOptions(start, mode);
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const { spanGaps , segment  } = this.options;
        const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
        const directUpdate = this.chart._animationsDisabled || reset || mode === 'none';
        const end = start + count;
        const pointsCount = points.length;
        let prevParsed = start > 0 && this.getParsed(start - 1);
        for(let i = 0; i < pointsCount; ++i){
            const point = points[i];
            const properties = directUpdate ? point : {};
            if (i < start || i >= end) {
                properties.skip = true;
                continue;
            }
            const parsed = this.getParsed(i);
            const nullData = isNullOrUndef(parsed[vAxis]);
            const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
            const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
            properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
            properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
            if (segment) {
                properties.parsed = parsed;
                properties.raw = _dataset.data[i];
            }
            if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? 'active' : mode);
            }
            if (!directUpdate) {
                this.updateElement(point, i, properties, mode);
            }
            prevParsed = parsed;
        }
    }
 getMaxOverflow() {
        const meta = this._cachedMeta;
        const dataset = meta.dataset;
        const border = dataset.options && dataset.options.borderWidth || 0;
        const data = meta.data || [];
        if (!data.length) {
            return border;
        }
        const firstPoint = data[0].size(this.resolveDataElementOptions(0));
        const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
        return Math.max(border, firstPoint, lastPoint) / 2;
    }
    draw() {
        const meta = this._cachedMeta;
        meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
        super.draw();
    }
}

class PolarAreaController extends DatasetController {
    static id = 'polarArea';
 static defaults = {
        dataElementType: 'arc',
        animation: {
            animateRotate: true,
            animateScale: true
        },
        animations: {
            numbers: {
                type: 'number',
                properties: [
                    'x',
                    'y',
                    'startAngle',
                    'endAngle',
                    'innerRadius',
                    'outerRadius'
                ]
            }
        },
        indexAxis: 'r',
        startAngle: 0
    };
 static overrides = {
        aspectRatio: 1,
        plugins: {
            legend: {
                labels: {
                    generateLabels (chart) {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            const { labels: { pointStyle , color  }  } = chart.legend.options;
                            return data.labels.map((label, i)=>{
                                const meta = chart.getDatasetMeta(0);
                                const style = meta.controller.getStyle(i);
                                return {
                                    text: label,
                                    fillStyle: style.backgroundColor,
                                    strokeStyle: style.borderColor,
                                    fontColor: color,
                                    lineWidth: style.borderWidth,
                                    pointStyle: pointStyle,
                                    hidden: !chart.getDataVisibility(i),
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                },
                onClick (e, legendItem, legend) {
                    legend.chart.toggleDataVisibility(legendItem.index);
                    legend.chart.update();
                }
            }
        },
        scales: {
            r: {
                type: 'radialLinear',
                angleLines: {
                    display: false
                },
                beginAtZero: true,
                grid: {
                    circular: true
                },
                pointLabels: {
                    display: false
                },
                startAngle: 0
            }
        }
    };
    constructor(chart, datasetIndex){
        super(chart, datasetIndex);
        this.innerRadius = undefined;
        this.outerRadius = undefined;
    }
    getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const chart = this.chart;
        const labels = chart.data.labels || [];
        const value = formatNumber(meta._parsed[index].r, chart.options.locale);
        return {
            label: labels[index] || '',
            value
        };
    }
    parseObjectData(meta, data, start, count) {
        return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
    }
    update(mode) {
        const arcs = this._cachedMeta.data;
        this._updateRadius();
        this.updateElements(arcs, 0, arcs.length, mode);
    }
 getMinMax() {
        const meta = this._cachedMeta;
        const range = {
            min: Number.POSITIVE_INFINITY,
            max: Number.NEGATIVE_INFINITY
        };
        meta.data.forEach((element, index)=>{
            const parsed = this.getParsed(index).r;
            if (!isNaN(parsed) && this.chart.getDataVisibility(index)) {
                if (parsed < range.min) {
                    range.min = parsed;
                }
                if (parsed > range.max) {
                    range.max = parsed;
                }
            }
        });
        return range;
    }
 _updateRadius() {
        const chart = this.chart;
        const chartArea = chart.chartArea;
        const opts = chart.options;
        const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        const outerRadius = Math.max(minSize / 2, 0);
        const innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
        const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
        this.outerRadius = outerRadius - radiusLength * this.index;
        this.innerRadius = this.outerRadius - radiusLength;
    }
    updateElements(arcs, start, count, mode) {
        const reset = mode === 'reset';
        const chart = this.chart;
        const opts = chart.options;
        const animationOpts = opts.animation;
        const scale = this._cachedMeta.rScale;
        const centerX = scale.xCenter;
        const centerY = scale.yCenter;
        const datasetStartAngle = scale.getIndexAngle(0) - 0.5 * PI;
        let angle = datasetStartAngle;
        let i;
        const defaultAngle = 360 / this.countVisibleElements();
        for(i = 0; i < start; ++i){
            angle += this._computeAngle(i, mode, defaultAngle);
        }
        for(i = start; i < start + count; i++){
            const arc = arcs[i];
            let startAngle = angle;
            let endAngle = angle + this._computeAngle(i, mode, defaultAngle);
            let outerRadius = chart.getDataVisibility(i) ? scale.getDistanceFromCenterForValue(this.getParsed(i).r) : 0;
            angle = endAngle;
            if (reset) {
                if (animationOpts.animateScale) {
                    outerRadius = 0;
                }
                if (animationOpts.animateRotate) {
                    startAngle = endAngle = datasetStartAngle;
                }
            }
            const properties = {
                x: centerX,
                y: centerY,
                innerRadius: 0,
                outerRadius,
                startAngle,
                endAngle,
                options: this.resolveDataElementOptions(i, arc.active ? 'active' : mode)
            };
            this.updateElement(arc, i, properties, mode);
        }
    }
    countVisibleElements() {
        const meta = this._cachedMeta;
        let count = 0;
        meta.data.forEach((element, index)=>{
            if (!isNaN(this.getParsed(index).r) && this.chart.getDataVisibility(index)) {
                count++;
            }
        });
        return count;
    }
 _computeAngle(index, mode, defaultAngle) {
        return this.chart.getDataVisibility(index) ? toRadians(this.resolveDataElementOptions(index, mode).angle || defaultAngle) : 0;
    }
}

class PieController extends DoughnutController {
    static id = 'pie';
 static defaults = {
        cutout: 0,
        rotation: 0,
        circumference: 360,
        radius: '100%'
    };
}

class RadarController extends DatasetController {
    static id = 'radar';
 static defaults = {
        datasetElementType: 'line',
        dataElementType: 'point',
        indexAxis: 'r',
        showLine: true,
        elements: {
            line: {
                fill: 'start'
            }
        }
    };
 static overrides = {
        aspectRatio: 1,
        scales: {
            r: {
                type: 'radialLinear'
            }
        }
    };
 getLabelAndValue(index) {
        const vScale = this._cachedMeta.vScale;
        const parsed = this.getParsed(index);
        return {
            label: vScale.getLabels()[index],
            value: '' + vScale.getLabelForValue(parsed[vScale.axis])
        };
    }
    parseObjectData(meta, data, start, count) {
        return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
    }
    update(mode) {
        const meta = this._cachedMeta;
        const line = meta.dataset;
        const points = meta.data || [];
        const labels = meta.iScale.getLabels();
        line.points = points;
        if (mode !== 'resize') {
            const options = this.resolveDatasetElementOptions(mode);
            if (!this.options.showLine) {
                options.borderWidth = 0;
            }
            const properties = {
                _loop: true,
                _fullLoop: labels.length === points.length,
                options
            };
            this.updateElement(line, undefined, properties, mode);
        }
        this.updateElements(points, 0, points.length, mode);
    }
    updateElements(points, start, count, mode) {
        const scale = this._cachedMeta.rScale;
        const reset = mode === 'reset';
        for(let i = start; i < start + count; i++){
            const point = points[i];
            const options = this.resolveDataElementOptions(i, point.active ? 'active' : mode);
            const pointPosition = scale.getPointPositionForValue(i, this.getParsed(i).r);
            const x = reset ? scale.xCenter : pointPosition.x;
            const y = reset ? scale.yCenter : pointPosition.y;
            const properties = {
                x,
                y,
                angle: pointPosition.angle,
                skip: isNaN(x) || isNaN(y),
                options
            };
            this.updateElement(point, i, properties, mode);
        }
    }
}

class ScatterController extends DatasetController {
    static id = 'scatter';
 static defaults = {
        datasetElementType: false,
        dataElementType: 'point',
        showLine: false,
        fill: false
    };
 static overrides = {
        interaction: {
            mode: 'point'
        },
        scales: {
            x: {
                type: 'linear'
            },
            y: {
                type: 'linear'
            }
        }
    };
 getLabelAndValue(index) {
        const meta = this._cachedMeta;
        const labels = this.chart.data.labels || [];
        const { xScale , yScale  } = meta;
        const parsed = this.getParsed(index);
        const x = xScale.getLabelForValue(parsed.x);
        const y = yScale.getLabelForValue(parsed.y);
        return {
            label: labels[index] || '',
            value: '(' + x + ', ' + y + ')'
        };
    }
    update(mode) {
        const meta = this._cachedMeta;
        const { data: points = []  } = meta;
        const animationsDisabled = this.chart._animationsDisabled;
        let { start , count  } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
        this._drawStart = start;
        this._drawCount = count;
        if (_scaleRangesChanged(meta)) {
            start = 0;
            count = points.length;
        }
        if (this.options.showLine) {
            const { dataset: line , _dataset  } = meta;
            line._chart = this.chart;
            line._datasetIndex = this.index;
            line._decimated = !!_dataset._decimated;
            line.points = points;
            const options = this.resolveDatasetElementOptions(mode);
            options.segment = this.options.segment;
            this.updateElement(line, undefined, {
                animated: !animationsDisabled,
                options
            }, mode);
        }
        this.updateElements(points, start, count, mode);
    }
    addElements() {
        const { showLine  } = this.options;
        if (!this.datasetElementType && showLine) {
            this.datasetElementType = this.chart.registry.getElement('line');
        }
        super.addElements();
    }
    updateElements(points, start, count, mode) {
        const reset = mode === 'reset';
        const { iScale , vScale , _stacked , _dataset  } = this._cachedMeta;
        const firstOpts = this.resolveDataElementOptions(start, mode);
        const sharedOptions = this.getSharedOptions(firstOpts);
        const includeOptions = this.includeOptions(mode, sharedOptions);
        const iAxis = iScale.axis;
        const vAxis = vScale.axis;
        const { spanGaps , segment  } = this.options;
        const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
        const directUpdate = this.chart._animationsDisabled || reset || mode === 'none';
        let prevParsed = start > 0 && this.getParsed(start - 1);
        for(let i = start; i < start + count; ++i){
            const point = points[i];
            const parsed = this.getParsed(i);
            const properties = directUpdate ? point : {};
            const nullData = isNullOrUndef(parsed[vAxis]);
            const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i);
            const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i);
            properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
            properties.stop = i > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
            if (segment) {
                properties.parsed = parsed;
                properties.raw = _dataset.data[i];
            }
            if (includeOptions) {
                properties.options = sharedOptions || this.resolveDataElementOptions(i, point.active ? 'active' : mode);
            }
            if (!directUpdate) {
                this.updateElement(point, i, properties, mode);
            }
            prevParsed = parsed;
        }
        this.updateSharedOptions(sharedOptions, mode, firstOpts);
    }
 getMaxOverflow() {
        const meta = this._cachedMeta;
        const data = meta.data || [];
        if (!this.options.showLine) {
            let max = 0;
            for(let i = data.length - 1; i >= 0; --i){
                max = Math.max(max, data[i].size(this.resolveDataElementOptions(i)) / 2);
            }
            return max > 0 && max;
        }
        const dataset = meta.dataset;
        const border = dataset.options && dataset.options.borderWidth || 0;
        if (!data.length) {
            return border;
        }
        const firstPoint = data[0].size(this.resolveDataElementOptions(0));
        const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
        return Math.max(border, firstPoint, lastPoint) / 2;
    }
}

var controllers = /*#__PURE__*/Object.freeze({
__proto__: null,
BarController: BarController,
BubbleController: BubbleController,
DoughnutController: DoughnutController,
LineController: LineController,
PolarAreaController: PolarAreaController,
PieController: PieController,
RadarController: RadarController,
ScatterController: ScatterController
});

/**
 * @namespace Chart._adapters
 * @since 2.8.0
 * @private
 */ function abstract() {
    throw new Error('This method is not implemented: Check that a complete date adapter is provided.');
}
/**
 * Date adapter (current used by the time scale)
 * @namespace Chart._adapters._date
 * @memberof Chart._adapters
 * @private
 */ class DateAdapterBase {
    /**
   * Override default date adapter methods.
   * Accepts type parameter to define options type.
   * @example
   * Chart._adapters._date.override<{myAdapterOption: string}>({
   *   init() {
   *     console.log(this.options.myAdapterOption);
   *   }
   * })
   */ static override(members) {
        Object.assign(DateAdapterBase.prototype, members);
    }
    constructor(options){
        this.options = options || {};
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    init() {}
    formats() {
        return abstract();
    }
    parse() {
        return abstract();
    }
    format() {
        return abstract();
    }
    add() {
        return abstract();
    }
    diff() {
        return abstract();
    }
    startOf() {
        return abstract();
    }
    endOf() {
        return abstract();
    }
}
var adapters = {
    _date: DateAdapterBase
};

function binarySearch(metaset, axis, value, intersect) {
    const { controller , data , _sorted  } = metaset;
    const iScale = controller._cachedMeta.iScale;
    if (iScale && axis === iScale.axis && axis !== 'r' && _sorted && data.length) {
        const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
        if (!intersect) {
            return lookupMethod(data, axis, value);
        } else if (controller._sharedOptions) {
            const el = data[0];
            const range = typeof el.getRange === 'function' && el.getRange(axis);
            if (range) {
                const start = lookupMethod(data, axis, value - range);
                const end = lookupMethod(data, axis, value + range);
                return {
                    lo: start.lo,
                    hi: end.hi
                };
            }
        }
    }
    return {
        lo: 0,
        hi: data.length - 1
    };
}
 function evaluateInteractionItems(chart, axis, position, handler, intersect) {
    const metasets = chart.getSortedVisibleDatasetMetas();
    const value = position[axis];
    for(let i = 0, ilen = metasets.length; i < ilen; ++i){
        const { index , data  } = metasets[i];
        const { lo , hi  } = binarySearch(metasets[i], axis, value, intersect);
        for(let j = lo; j <= hi; ++j){
            const element = data[j];
            if (!element.skip) {
                handler(element, index, j);
            }
        }
    }
}
 function getDistanceMetricForAxis(axis) {
    const useX = axis.indexOf('x') !== -1;
    const useY = axis.indexOf('y') !== -1;
    return function(pt1, pt2) {
        const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
        const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
        return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    };
}
 function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
    const items = [];
    if (!includeInvisible && !chart.isPointInArea(position)) {
        return items;
    }
    const evaluationFunc = function(element, datasetIndex, index) {
        if (!includeInvisible && !_isPointInArea(element, chart.chartArea, 0)) {
            return;
        }
        if (element.inRange(position.x, position.y, useFinalPosition)) {
            items.push({
                element,
                datasetIndex,
                index
            });
        }
    };
    evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
    return items;
}
 function getNearestRadialItems(chart, position, axis, useFinalPosition) {
    let items = [];
    function evaluationFunc(element, datasetIndex, index) {
        const { startAngle , endAngle  } = element.getProps([
            'startAngle',
            'endAngle'
        ], useFinalPosition);
        const { angle  } = getAngleFromPoint(element, {
            x: position.x,
            y: position.y
        });
        if (_angleBetween(angle, startAngle, endAngle)) {
            items.push({
                element,
                datasetIndex,
                index
            });
        }
    }
    evaluateInteractionItems(chart, axis, position, evaluationFunc);
    return items;
}
 function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
    let items = [];
    const distanceMetric = getDistanceMetricForAxis(axis);
    let minDistance = Number.POSITIVE_INFINITY;
    function evaluationFunc(element, datasetIndex, index) {
        const inRange = element.inRange(position.x, position.y, useFinalPosition);
        if (intersect && !inRange) {
            return;
        }
        const center = element.getCenterPoint(useFinalPosition);
        const pointInArea = !!includeInvisible || chart.isPointInArea(center);
        if (!pointInArea && !inRange) {
            return;
        }
        const distance = distanceMetric(position, center);
        if (distance < minDistance) {
            items = [
                {
                    element,
                    datasetIndex,
                    index
                }
            ];
            minDistance = distance;
        } else if (distance === minDistance) {
            items.push({
                element,
                datasetIndex,
                index
            });
        }
    }
    evaluateInteractionItems(chart, axis, position, evaluationFunc);
    return items;
}
 function getNearestItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
    if (!includeInvisible && !chart.isPointInArea(position)) {
        return [];
    }
    return axis === 'r' && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible);
}
 function getAxisItems(chart, position, axis, intersect, useFinalPosition) {
    const items = [];
    const rangeMethod = axis === 'x' ? 'inXRange' : 'inYRange';
    let intersectsItem = false;
    evaluateInteractionItems(chart, axis, position, (element, datasetIndex, index)=>{
        if (element[rangeMethod](position[axis], useFinalPosition)) {
            items.push({
                element,
                datasetIndex,
                index
            });
            intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
        }
    });
    if (intersect && !intersectsItem) {
        return [];
    }
    return items;
}
 var Interaction = {
    evaluateInteractionItems,
    modes: {
 index (chart, e, options, useFinalPosition) {
            const position = getRelativePosition(e, chart);
            const axis = options.axis || 'x';
            const includeInvisible = options.includeInvisible || false;
            const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
            const elements = [];
            if (!items.length) {
                return [];
            }
            chart.getSortedVisibleDatasetMetas().forEach((meta)=>{
                const index = items[0].index;
                const element = meta.data[index];
                if (element && !element.skip) {
                    elements.push({
                        element,
                        datasetIndex: meta.index,
                        index
                    });
                }
            });
            return elements;
        },
 dataset (chart, e, options, useFinalPosition) {
            const position = getRelativePosition(e, chart);
            const axis = options.axis || 'xy';
            const includeInvisible = options.includeInvisible || false;
            let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
            if (items.length > 0) {
                const datasetIndex = items[0].datasetIndex;
                const data = chart.getDatasetMeta(datasetIndex).data;
                items = [];
                for(let i = 0; i < data.length; ++i){
                    items.push({
                        element: data[i],
                        datasetIndex,
                        index: i
                    });
                }
            }
            return items;
        },
 point (chart, e, options, useFinalPosition) {
            const position = getRelativePosition(e, chart);
            const axis = options.axis || 'xy';
            const includeInvisible = options.includeInvisible || false;
            return getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible);
        },
 nearest (chart, e, options, useFinalPosition) {
            const position = getRelativePosition(e, chart);
            const axis = options.axis || 'xy';
            const includeInvisible = options.includeInvisible || false;
            return getNearestItems(chart, position, axis, options.intersect, useFinalPosition, includeInvisible);
        },
 x (chart, e, options, useFinalPosition) {
            const position = getRelativePosition(e, chart);
            return getAxisItems(chart, position, 'x', options.intersect, useFinalPosition);
        },
 y (chart, e, options, useFinalPosition) {
            const position = getRelativePosition(e, chart);
            return getAxisItems(chart, position, 'y', options.intersect, useFinalPosition);
        }
    }
};

const STATIC_POSITIONS = [
    'left',
    'top',
    'right',
    'bottom'
];
function filterByPosition(array, position) {
    return array.filter((v)=>v.pos === position);
}
function filterDynamicPositionByAxis(array, axis) {
    return array.filter((v)=>STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
}
function sortByWeight(array, reverse) {
    return array.sort((a, b)=>{
        const v0 = reverse ? b : a;
        const v1 = reverse ? a : b;
        return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
    });
}
function wrapBoxes(boxes) {
    const layoutBoxes = [];
    let i, ilen, box, pos, stack, stackWeight;
    for(i = 0, ilen = (boxes || []).length; i < ilen; ++i){
        box = boxes[i];
        ({ position: pos , options: { stack , stackWeight =1  }  } = box);
        layoutBoxes.push({
            index: i,
            box,
            pos,
            horizontal: box.isHorizontal(),
            weight: box.weight,
            stack: stack && pos + stack,
            stackWeight
        });
    }
    return layoutBoxes;
}
function buildStacks(layouts) {
    const stacks = {};
    for (const wrap of layouts){
        const { stack , pos , stackWeight  } = wrap;
        if (!stack || !STATIC_POSITIONS.includes(pos)) {
            continue;
        }
        const _stack = stacks[stack] || (stacks[stack] = {
            count: 0,
            placed: 0,
            weight: 0,
            size: 0
        });
        _stack.count++;
        _stack.weight += stackWeight;
    }
    return stacks;
}
 function setLayoutDims(layouts, params) {
    const stacks = buildStacks(layouts);
    const { vBoxMaxWidth , hBoxMaxHeight  } = params;
    let i, ilen, layout;
    for(i = 0, ilen = layouts.length; i < ilen; ++i){
        layout = layouts[i];
        const { fullSize  } = layout.box;
        const stack = stacks[layout.stack];
        const factor = stack && layout.stackWeight / stack.weight;
        if (layout.horizontal) {
            layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
            layout.height = hBoxMaxHeight;
        } else {
            layout.width = vBoxMaxWidth;
            layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
        }
    }
    return stacks;
}
function buildLayoutBoxes(boxes) {
    const layoutBoxes = wrapBoxes(boxes);
    const fullSize = sortByWeight(layoutBoxes.filter((wrap)=>wrap.box.fullSize), true);
    const left = sortByWeight(filterByPosition(layoutBoxes, 'left'), true);
    const right = sortByWeight(filterByPosition(layoutBoxes, 'right'));
    const top = sortByWeight(filterByPosition(layoutBoxes, 'top'), true);
    const bottom = sortByWeight(filterByPosition(layoutBoxes, 'bottom'));
    const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, 'x');
    const centerVertical = filterDynamicPositionByAxis(layoutBoxes, 'y');
    return {
        fullSize,
        leftAndTop: left.concat(top),
        rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
        chartArea: filterByPosition(layoutBoxes, 'chartArea'),
        vertical: left.concat(right).concat(centerVertical),
        horizontal: top.concat(bottom).concat(centerHorizontal)
    };
}
function getCombinedMax(maxPadding, chartArea, a, b) {
    return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
}
function updateMaxPadding(maxPadding, boxPadding) {
    maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
    maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
    maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
    maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
}
function updateDims(chartArea, params, layout, stacks) {
    const { pos , box  } = layout;
    const maxPadding = chartArea.maxPadding;
    if (!isObject(pos)) {
        if (layout.size) {
            chartArea[pos] -= layout.size;
        }
        const stack = stacks[layout.stack] || {
            size: 0,
            count: 1
        };
        stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
        layout.size = stack.size / stack.count;
        chartArea[pos] += layout.size;
    }
    if (box.getPadding) {
        updateMaxPadding(maxPadding, box.getPadding());
    }
    const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, 'left', 'right'));
    const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, 'top', 'bottom'));
    const widthChanged = newWidth !== chartArea.w;
    const heightChanged = newHeight !== chartArea.h;
    chartArea.w = newWidth;
    chartArea.h = newHeight;
    return layout.horizontal ? {
        same: widthChanged,
        other: heightChanged
    } : {
        same: heightChanged,
        other: widthChanged
    };
}
function handleMaxPadding(chartArea) {
    const maxPadding = chartArea.maxPadding;
    function updatePos(pos) {
        const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
        chartArea[pos] += change;
        return change;
    }
    chartArea.y += updatePos('top');
    chartArea.x += updatePos('left');
    updatePos('right');
    updatePos('bottom');
}
function getMargins(horizontal, chartArea) {
    const maxPadding = chartArea.maxPadding;
    function marginForPositions(positions) {
        const margin = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        positions.forEach((pos)=>{
            margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
        });
        return margin;
    }
    return horizontal ? marginForPositions([
        'left',
        'right'
    ]) : marginForPositions([
        'top',
        'bottom'
    ]);
}
function fitBoxes(boxes, chartArea, params, stacks) {
    const refitBoxes = [];
    let i, ilen, layout, box, refit, changed;
    for(i = 0, ilen = boxes.length, refit = 0; i < ilen; ++i){
        layout = boxes[i];
        box = layout.box;
        box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
        const { same , other  } = updateDims(chartArea, params, layout, stacks);
        refit |= same && refitBoxes.length;
        changed = changed || other;
        if (!box.fullSize) {
            refitBoxes.push(layout);
        }
    }
    return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
}
function setBoxDims(box, left, top, width, height) {
    box.top = top;
    box.left = left;
    box.right = left + width;
    box.bottom = top + height;
    box.width = width;
    box.height = height;
}
function placeBoxes(boxes, chartArea, params, stacks) {
    const userPadding = params.padding;
    let { x , y  } = chartArea;
    for (const layout of boxes){
        const box = layout.box;
        const stack = stacks[layout.stack] || {
            count: 1,
            placed: 0,
            weight: 1
        };
        const weight = layout.stackWeight / stack.weight || 1;
        if (layout.horizontal) {
            const width = chartArea.w * weight;
            const height = stack.size || box.height;
            if (defined(stack.start)) {
                y = stack.start;
            }
            if (box.fullSize) {
                setBoxDims(box, userPadding.left, y, params.outerWidth - userPadding.right - userPadding.left, height);
            } else {
                setBoxDims(box, chartArea.left + stack.placed, y, width, height);
            }
            stack.start = y;
            stack.placed += width;
            y = box.bottom;
        } else {
            const height1 = chartArea.h * weight;
            const width1 = stack.size || box.width;
            if (defined(stack.start)) {
                x = stack.start;
            }
            if (box.fullSize) {
                setBoxDims(box, x, userPadding.top, width1, params.outerHeight - userPadding.bottom - userPadding.top);
            } else {
                setBoxDims(box, x, chartArea.top + stack.placed, width1, height1);
            }
            stack.start = x;
            stack.placed += height1;
            x = box.right;
        }
    }
    chartArea.x = x;
    chartArea.y = y;
}
var layouts = {
 addBox (chart, item) {
        if (!chart.boxes) {
            chart.boxes = [];
        }
        item.fullSize = item.fullSize || false;
        item.position = item.position || 'top';
        item.weight = item.weight || 0;
        item._layers = item._layers || function() {
            return [
                {
                    z: 0,
                    draw (chartArea) {
                        item.draw(chartArea);
                    }
                }
            ];
        };
        chart.boxes.push(item);
    },
 removeBox (chart, layoutItem) {
        const index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
        if (index !== -1) {
            chart.boxes.splice(index, 1);
        }
    },
 configure (chart, item, options) {
        item.fullSize = options.fullSize;
        item.position = options.position;
        item.weight = options.weight;
    },
 update (chart, width, height, minPadding) {
        if (!chart) {
            return;
        }
        const padding = toPadding(chart.options.layout.padding);
        const availableWidth = Math.max(width - padding.width, 0);
        const availableHeight = Math.max(height - padding.height, 0);
        const boxes = buildLayoutBoxes(chart.boxes);
        const verticalBoxes = boxes.vertical;
        const horizontalBoxes = boxes.horizontal;
        each(chart.boxes, (box)=>{
            if (typeof box.beforeLayout === 'function') {
                box.beforeLayout();
            }
        });
        const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap)=>wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
        const params = Object.freeze({
            outerWidth: width,
            outerHeight: height,
            padding,
            availableWidth,
            availableHeight,
            vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
            hBoxMaxHeight: availableHeight / 2
        });
        const maxPadding = Object.assign({}, padding);
        updateMaxPadding(maxPadding, toPadding(minPadding));
        const chartArea = Object.assign({
            maxPadding,
            w: availableWidth,
            h: availableHeight,
            x: padding.left,
            y: padding.top
        }, padding);
        const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
        fitBoxes(boxes.fullSize, chartArea, params, stacks);
        fitBoxes(verticalBoxes, chartArea, params, stacks);
        if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) {
            fitBoxes(verticalBoxes, chartArea, params, stacks);
        }
        handleMaxPadding(chartArea);
        placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
        chartArea.x += chartArea.w;
        chartArea.y += chartArea.h;
        placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
        chart.chartArea = {
            left: chartArea.left,
            top: chartArea.top,
            right: chartArea.left + chartArea.w,
            bottom: chartArea.top + chartArea.h,
            height: chartArea.h,
            width: chartArea.w
        };
        each(boxes.chartArea, (layout)=>{
            const box = layout.box;
            Object.assign(box, chart.chartArea);
            box.update(chartArea.w, chartArea.h, {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            });
        });
    }
};

class BasePlatform {
 acquireContext(canvas, aspectRatio) {}
 releaseContext(context) {
        return false;
    }
 addEventListener(chart, type, listener) {}
 removeEventListener(chart, type, listener) {}
 getDevicePixelRatio() {
        return 1;
    }
 getMaximumSize(element, width, height, aspectRatio) {
        width = Math.max(0, width || element.width);
        height = height || element.height;
        return {
            width,
            height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
        };
    }
 isAttached(canvas) {
        return true;
    }
 updateConfig(config) {
    }
}

class BasicPlatform extends BasePlatform {
    acquireContext(item) {
        return item && item.getContext && item.getContext('2d') || null;
    }
    updateConfig(config) {
        config.options.animation = false;
    }
}

const EXPANDO_KEY = '$chartjs';
 const EVENT_TYPES = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup',
    pointerenter: 'mouseenter',
    pointerdown: 'mousedown',
    pointermove: 'mousemove',
    pointerup: 'mouseup',
    pointerleave: 'mouseout',
    pointerout: 'mouseout'
};
const isNullOrEmpty = (value)=>value === null || value === '';
 function initCanvas(canvas, aspectRatio) {
    const style = canvas.style;
    const renderHeight = canvas.getAttribute('height');
    const renderWidth = canvas.getAttribute('width');
    canvas[EXPANDO_KEY] = {
        initial: {
            height: renderHeight,
            width: renderWidth,
            style: {
                display: style.display,
                height: style.height,
                width: style.width
            }
        }
    };
    style.display = style.display || 'block';
    style.boxSizing = style.boxSizing || 'border-box';
    if (isNullOrEmpty(renderWidth)) {
        const displayWidth = readUsedSize(canvas, 'width');
        if (displayWidth !== undefined) {
            canvas.width = displayWidth;
        }
    }
    if (isNullOrEmpty(renderHeight)) {
        if (canvas.style.height === '') {
            canvas.height = canvas.width / (aspectRatio || 2);
        } else {
            const displayHeight = readUsedSize(canvas, 'height');
            if (displayHeight !== undefined) {
                canvas.height = displayHeight;
            }
        }
    }
    return canvas;
}
const eventListenerOptions = supportsEventListenerOptions ? {
    passive: true
} : false;
function addListener(node, type, listener) {
    node.addEventListener(type, listener, eventListenerOptions);
}
function removeListener(chart, type, listener) {
    chart.canvas.removeEventListener(type, listener, eventListenerOptions);
}
function fromNativeEvent(event, chart) {
    const type = EVENT_TYPES[event.type] || event.type;
    const { x , y  } = getRelativePosition(event, chart);
    return {
        type,
        chart,
        native: event,
        x: x !== undefined ? x : null,
        y: y !== undefined ? y : null
    };
}
function nodeListContains(nodeList, canvas) {
    for (const node of nodeList){
        if (node === canvas || node.contains(canvas)) {
            return true;
        }
    }
}
function createAttachObserver(chart, type, listener) {
    const canvas = chart.canvas;
    const observer = new MutationObserver((entries)=>{
        let trigger = false;
        for (const entry of entries){
            trigger = trigger || nodeListContains(entry.addedNodes, canvas);
            trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
        }
        if (trigger) {
            listener();
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
    return observer;
}
function createDetachObserver(chart, type, listener) {
    const canvas = chart.canvas;
    const observer = new MutationObserver((entries)=>{
        let trigger = false;
        for (const entry of entries){
            trigger = trigger || nodeListContains(entry.removedNodes, canvas);
            trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
        }
        if (trigger) {
            listener();
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
    return observer;
}
const drpListeningCharts = new Map();
let oldDevicePixelRatio = 0;
function onWindowResize() {
    const dpr = window.devicePixelRatio;
    if (dpr === oldDevicePixelRatio) {
        return;
    }
    oldDevicePixelRatio = dpr;
    drpListeningCharts.forEach((resize, chart)=>{
        if (chart.currentDevicePixelRatio !== dpr) {
            resize();
        }
    });
}
function listenDevicePixelRatioChanges(chart, resize) {
    if (!drpListeningCharts.size) {
        window.addEventListener('resize', onWindowResize);
    }
    drpListeningCharts.set(chart, resize);
}
function unlistenDevicePixelRatioChanges(chart) {
    drpListeningCharts.delete(chart);
    if (!drpListeningCharts.size) {
        window.removeEventListener('resize', onWindowResize);
    }
}
function createResizeObserver(chart, type, listener) {
    const canvas = chart.canvas;
    const container = canvas && _getParentNode(canvas);
    if (!container) {
        return;
    }
    const resize = throttled((width, height)=>{
        const w = container.clientWidth;
        listener(width, height);
        if (w < container.clientWidth) {
            listener();
        }
    }, window);
    const observer = new ResizeObserver((entries)=>{
        const entry = entries[0];
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        if (width === 0 && height === 0) {
            return;
        }
        resize(width, height);
    });
    observer.observe(container);
    listenDevicePixelRatioChanges(chart, resize);
    return observer;
}
function releaseObserver(chart, type, observer) {
    if (observer) {
        observer.disconnect();
    }
    if (type === 'resize') {
        unlistenDevicePixelRatioChanges(chart);
    }
}
function createProxyAndListen(chart, type, listener) {
    const canvas = chart.canvas;
    const proxy = throttled((event)=>{
        if (chart.ctx !== null) {
            listener(fromNativeEvent(event, chart));
        }
    }, chart);
    addListener(canvas, type, proxy);
    return proxy;
}
 class DomPlatform extends BasePlatform {
 acquireContext(canvas, aspectRatio) {
        const context = canvas && canvas.getContext && canvas.getContext('2d');
        if (context && context.canvas === canvas) {
            initCanvas(canvas, aspectRatio);
            return context;
        }
        return null;
    }
 releaseContext(context) {
        const canvas = context.canvas;
        if (!canvas[EXPANDO_KEY]) {
            return false;
        }
        const initial = canvas[EXPANDO_KEY].initial;
        [
            'height',
            'width'
        ].forEach((prop)=>{
            const value = initial[prop];
            if (isNullOrUndef(value)) {
                canvas.removeAttribute(prop);
            } else {
                canvas.setAttribute(prop, value);
            }
        });
        const style = initial.style || {};
        Object.keys(style).forEach((key)=>{
            canvas.style[key] = style[key];
        });
        canvas.width = canvas.width;
        delete canvas[EXPANDO_KEY];
        return true;
    }
 addEventListener(chart, type, listener) {
        this.removeEventListener(chart, type);
        const proxies = chart.$proxies || (chart.$proxies = {});
        const handlers = {
            attach: createAttachObserver,
            detach: createDetachObserver,
            resize: createResizeObserver
        };
        const handler = handlers[type] || createProxyAndListen;
        proxies[type] = handler(chart, type, listener);
    }
 removeEventListener(chart, type) {
        const proxies = chart.$proxies || (chart.$proxies = {});
        const proxy = proxies[type];
        if (!proxy) {
            return;
        }
        const handlers = {
            attach: releaseObserver,
            detach: releaseObserver,
            resize: releaseObserver
        };
        const handler = handlers[type] || removeListener;
        handler(chart, type, proxy);
        proxies[type] = undefined;
    }
    getDevicePixelRatio() {
        return window.devicePixelRatio;
    }
 getMaximumSize(canvas, width, height, aspectRatio) {
        return getMaximumSize(canvas, width, height, aspectRatio);
    }
 isAttached(canvas) {
        const container = _getParentNode(canvas);
        return !!(container && container.isConnected);
    }
}

function _detectPlatform(canvas) {
    if (!_isDomSupported() || typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas) {
        return BasicPlatform;
    }
    return DomPlatform;
}

let Element$1 = class Element {
    static defaults = {};
    static defaultRoutes = undefined;
    active = false;
    tooltipPosition(useFinalPosition) {
        const { x , y  } = this.getProps([
            'x',
            'y'
        ], useFinalPosition);
        return {
            x,
            y
        };
    }
    hasValue() {
        return isNumber(this.x) && isNumber(this.y);
    }
    getProps(props, final) {
        const anims = this.$animations;
        if (!final || !anims) {
            // let's not create an object, if not needed
            return this;
        }
        const ret = {};
        props.forEach((prop)=>{
            ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
        });
        return ret;
    }
};

function autoSkip(scale, ticks) {
    const tickOpts = scale.options.ticks;
    const determinedMaxTicks = determineMaxTicks(scale);
    const ticksLimit = Math.min(tickOpts.maxTicksLimit || determinedMaxTicks, determinedMaxTicks);
    const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
    const numMajorIndices = majorIndices.length;
    const first = majorIndices[0];
    const last = majorIndices[numMajorIndices - 1];
    const newTicks = [];
    if (numMajorIndices > ticksLimit) {
        skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
        return newTicks;
    }
    const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
    if (numMajorIndices > 0) {
        let i, ilen;
        const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
        skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
        for(i = 0, ilen = numMajorIndices - 1; i < ilen; i++){
            skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
        }
        skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
        return newTicks;
    }
    skip(ticks, newTicks, spacing);
    return newTicks;
}
function determineMaxTicks(scale) {
    const offset = scale.options.offset;
    const tickLength = scale._tickSize();
    const maxScale = scale._length / tickLength + (offset ? 0 : 1);
    const maxChart = scale._maxLength / tickLength;
    return Math.floor(Math.min(maxScale, maxChart));
}
 function calculateSpacing(majorIndices, ticks, ticksLimit) {
    const evenMajorSpacing = getEvenSpacing(majorIndices);
    const spacing = ticks.length / ticksLimit;
    if (!evenMajorSpacing) {
        return Math.max(spacing, 1);
    }
    const factors = _factorize(evenMajorSpacing);
    for(let i = 0, ilen = factors.length - 1; i < ilen; i++){
        const factor = factors[i];
        if (factor > spacing) {
            return factor;
        }
    }
    return Math.max(spacing, 1);
}
 function getMajorIndices(ticks) {
    const result = [];
    let i, ilen;
    for(i = 0, ilen = ticks.length; i < ilen; i++){
        if (ticks[i].major) {
            result.push(i);
        }
    }
    return result;
}
 function skipMajors(ticks, newTicks, majorIndices, spacing) {
    let count = 0;
    let next = majorIndices[0];
    let i;
    spacing = Math.ceil(spacing);
    for(i = 0; i < ticks.length; i++){
        if (i === next) {
            newTicks.push(ticks[i]);
            count++;
            next = majorIndices[count * spacing];
        }
    }
}
 function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
    const start = valueOrDefault(majorStart, 0);
    const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
    let count = 0;
    let length, i, next;
    spacing = Math.ceil(spacing);
    if (majorEnd) {
        length = majorEnd - majorStart;
        spacing = length / Math.floor(length / spacing);
    }
    next = start;
    while(next < 0){
        count++;
        next = Math.round(start + count * spacing);
    }
    for(i = Math.max(start, 0); i < end; i++){
        if (i === next) {
            newTicks.push(ticks[i]);
            count++;
            next = Math.round(start + count * spacing);
        }
    }
}
 function getEvenSpacing(arr) {
    const len = arr.length;
    let i, diff;
    if (len < 2) {
        return false;
    }
    for(diff = arr[0], i = 1; i < len; ++i){
        if (arr[i] - arr[i - 1] !== diff) {
            return false;
        }
    }
    return diff;
}

const reverseAlign = (align)=>align === 'left' ? 'right' : align === 'right' ? 'left' : align;
const offsetFromEdge = (scale, edge, offset)=>edge === 'top' || edge === 'left' ? scale[edge] + offset : scale[edge] - offset;
 function sample(arr, numItems) {
    const result = [];
    const increment = arr.length / numItems;
    const len = arr.length;
    let i = 0;
    for(; i < len; i += increment){
        result.push(arr[Math.floor(i)]);
    }
    return result;
}
 function getPixelForGridLine(scale, index, offsetGridLines) {
    const length = scale.ticks.length;
    const validIndex = Math.min(index, length - 1);
    const start = scale._startPixel;
    const end = scale._endPixel;
    const epsilon = 1e-6;
    let lineValue = scale.getPixelForTick(validIndex);
    let offset;
    if (offsetGridLines) {
        if (length === 1) {
            offset = Math.max(lineValue - start, end - lineValue);
        } else if (index === 0) {
            offset = (scale.getPixelForTick(1) - lineValue) / 2;
        } else {
            offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
        }
        lineValue += validIndex < index ? offset : -offset;
        if (lineValue < start - epsilon || lineValue > end + epsilon) {
            return;
        }
    }
    return lineValue;
}
 function garbageCollect(caches, length) {
    each(caches, (cache)=>{
        const gc = cache.gc;
        const gcLen = gc.length / 2;
        let i;
        if (gcLen > length) {
            for(i = 0; i < gcLen; ++i){
                delete cache.data[gc[i]];
            }
            gc.splice(0, gcLen);
        }
    });
}
 function getTickMarkLength(options) {
    return options.drawTicks ? options.tickLength : 0;
}
 function getTitleHeight(options, fallback) {
    if (!options.display) {
        return 0;
    }
    const font = toFont(options.font, fallback);
    const padding = toPadding(options.padding);
    const lines = isArray(options.text) ? options.text.length : 1;
    return lines * font.lineHeight + padding.height;
}
function createScaleContext(parent, scale) {
    return createContext(parent, {
        scale,
        type: 'scale'
    });
}
function createTickContext(parent, index, tick) {
    return createContext(parent, {
        tick,
        index,
        type: 'tick'
    });
}
function titleAlign(align, position, reverse) {
    let ret = _toLeftRightCenter(align);
    if (reverse && position !== 'right' || !reverse && position === 'right') {
        ret = reverseAlign(ret);
    }
    return ret;
}
function titleArgs(scale, offset, position, align) {
    const { top , left , bottom , right , chart  } = scale;
    const { chartArea , scales  } = chart;
    let rotation = 0;
    let maxWidth, titleX, titleY;
    const height = bottom - top;
    const width = right - left;
    if (scale.isHorizontal()) {
        titleX = _alignStartEnd(align, left, right);
        if (isObject(position)) {
            const positionAxisID = Object.keys(position)[0];
            const value = position[positionAxisID];
            titleY = scales[positionAxisID].getPixelForValue(value) + height - offset;
        } else if (position === 'center') {
            titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset;
        } else {
            titleY = offsetFromEdge(scale, position, offset);
        }
        maxWidth = right - left;
    } else {
        if (isObject(position)) {
            const positionAxisID1 = Object.keys(position)[0];
            const value1 = position[positionAxisID1];
            titleX = scales[positionAxisID1].getPixelForValue(value1) - width + offset;
        } else if (position === 'center') {
            titleX = (chartArea.left + chartArea.right) / 2 - width + offset;
        } else {
            titleX = offsetFromEdge(scale, position, offset);
        }
        titleY = _alignStartEnd(align, bottom, top);
        rotation = position === 'left' ? -HALF_PI : HALF_PI;
    }
    return {
        titleX,
        titleY,
        maxWidth,
        rotation
    };
}
class Scale extends Element$1 {
    constructor(cfg){
        super();
         this.id = cfg.id;
         this.type = cfg.type;
         this.options = undefined;
         this.ctx = cfg.ctx;
         this.chart = cfg.chart;
         this.top = undefined;
         this.bottom = undefined;
         this.left = undefined;
         this.right = undefined;
         this.width = undefined;
         this.height = undefined;
        this._margins = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
         this.maxWidth = undefined;
         this.maxHeight = undefined;
         this.paddingTop = undefined;
         this.paddingBottom = undefined;
         this.paddingLeft = undefined;
         this.paddingRight = undefined;
         this.axis = undefined;
         this.labelRotation = undefined;
        this.min = undefined;
        this.max = undefined;
        this._range = undefined;
         this.ticks = [];
         this._gridLineItems = null;
         this._labelItems = null;
         this._labelSizes = null;
        this._length = 0;
        this._maxLength = 0;
        this._longestTextCache = {};
         this._startPixel = undefined;
         this._endPixel = undefined;
        this._reversePixels = false;
        this._userMax = undefined;
        this._userMin = undefined;
        this._suggestedMax = undefined;
        this._suggestedMin = undefined;
        this._ticksLength = 0;
        this._borderValue = 0;
        this._cache = {};
        this._dataLimitsCached = false;
        this.$context = undefined;
    }
 init(options) {
        this.options = options.setContext(this.getContext());
        this.axis = options.axis;
        this._userMin = this.parse(options.min);
        this._userMax = this.parse(options.max);
        this._suggestedMin = this.parse(options.suggestedMin);
        this._suggestedMax = this.parse(options.suggestedMax);
    }
 parse(raw, index) {
        return raw;
    }
 getUserBounds() {
        let { _userMin , _userMax , _suggestedMin , _suggestedMax  } = this;
        _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
        _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
        _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
        _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
        return {
            min: finiteOrDefault(_userMin, _suggestedMin),
            max: finiteOrDefault(_userMax, _suggestedMax),
            minDefined: isNumberFinite(_userMin),
            maxDefined: isNumberFinite(_userMax)
        };
    }
 getMinMax(canStack) {
        let { min , max , minDefined , maxDefined  } = this.getUserBounds();
        let range;
        if (minDefined && maxDefined) {
            return {
                min,
                max
            };
        }
        const metas = this.getMatchingVisibleMetas();
        for(let i = 0, ilen = metas.length; i < ilen; ++i){
            range = metas[i].controller.getMinMax(this, canStack);
            if (!minDefined) {
                min = Math.min(min, range.min);
            }
            if (!maxDefined) {
                max = Math.max(max, range.max);
            }
        }
        min = maxDefined && min > max ? max : min;
        max = minDefined && min > max ? min : max;
        return {
            min: finiteOrDefault(min, finiteOrDefault(max, min)),
            max: finiteOrDefault(max, finiteOrDefault(min, max))
        };
    }
 getPadding() {
        return {
            left: this.paddingLeft || 0,
            top: this.paddingTop || 0,
            right: this.paddingRight || 0,
            bottom: this.paddingBottom || 0
        };
    }
 getTicks() {
        return this.ticks;
    }
 getLabels() {
        const data = this.chart.data;
        return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
    }
 getLabelItems(chartArea = this.chart.chartArea) {
        const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
        return items;
    }
    beforeLayout() {
        this._cache = {};
        this._dataLimitsCached = false;
    }
    beforeUpdate() {
        callback(this.options.beforeUpdate, [
            this
        ]);
    }
 update(maxWidth, maxHeight, margins) {
        const { beginAtZero , grace , ticks: tickOpts  } = this.options;
        const sampleSize = tickOpts.sampleSize;
        this.beforeUpdate();
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this._margins = margins = Object.assign({
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, margins);
        this.ticks = null;
        this._labelSizes = null;
        this._gridLineItems = null;
        this._labelItems = null;
        this.beforeSetDimensions();
        this.setDimensions();
        this.afterSetDimensions();
        this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
        if (!this._dataLimitsCached) {
            this.beforeDataLimits();
            this.determineDataLimits();
            this.afterDataLimits();
            this._range = _addGrace(this, grace, beginAtZero);
            this._dataLimitsCached = true;
        }
        this.beforeBuildTicks();
        this.ticks = this.buildTicks() || [];
        this.afterBuildTicks();
        const samplingEnabled = sampleSize < this.ticks.length;
        this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
        this.configure();
        this.beforeCalculateLabelRotation();
        this.calculateLabelRotation();
        this.afterCalculateLabelRotation();
        if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === 'auto')) {
            this.ticks = autoSkip(this, this.ticks);
            this._labelSizes = null;
            this.afterAutoSkip();
        }
        if (samplingEnabled) {
            this._convertTicksToLabels(this.ticks);
        }
        this.beforeFit();
        this.fit();
        this.afterFit();
        this.afterUpdate();
    }
 configure() {
        let reversePixels = this.options.reverse;
        let startPixel, endPixel;
        if (this.isHorizontal()) {
            startPixel = this.left;
            endPixel = this.right;
        } else {
            startPixel = this.top;
            endPixel = this.bottom;
            reversePixels = !reversePixels;
        }
        this._startPixel = startPixel;
        this._endPixel = endPixel;
        this._reversePixels = reversePixels;
        this._length = endPixel - startPixel;
        this._alignToPixels = this.options.alignToPixels;
    }
    afterUpdate() {
        callback(this.options.afterUpdate, [
            this
        ]);
    }
    beforeSetDimensions() {
        callback(this.options.beforeSetDimensions, [
            this
        ]);
    }
    setDimensions() {
        if (this.isHorizontal()) {
            this.width = this.maxWidth;
            this.left = 0;
            this.right = this.width;
        } else {
            this.height = this.maxHeight;
            this.top = 0;
            this.bottom = this.height;
        }
        this.paddingLeft = 0;
        this.paddingTop = 0;
        this.paddingRight = 0;
        this.paddingBottom = 0;
    }
    afterSetDimensions() {
        callback(this.options.afterSetDimensions, [
            this
        ]);
    }
    _callHooks(name) {
        this.chart.notifyPlugins(name, this.getContext());
        callback(this.options[name], [
            this
        ]);
    }
    beforeDataLimits() {
        this._callHooks('beforeDataLimits');
    }
    determineDataLimits() {}
    afterDataLimits() {
        this._callHooks('afterDataLimits');
    }
    beforeBuildTicks() {
        this._callHooks('beforeBuildTicks');
    }
 buildTicks() {
        return [];
    }
    afterBuildTicks() {
        this._callHooks('afterBuildTicks');
    }
    beforeTickToLabelConversion() {
        callback(this.options.beforeTickToLabelConversion, [
            this
        ]);
    }
 generateTickLabels(ticks) {
        const tickOpts = this.options.ticks;
        let i, ilen, tick;
        for(i = 0, ilen = ticks.length; i < ilen; i++){
            tick = ticks[i];
            tick.label = callback(tickOpts.callback, [
                tick.value,
                i,
                ticks
            ], this);
        }
    }
    afterTickToLabelConversion() {
        callback(this.options.afterTickToLabelConversion, [
            this
        ]);
    }
    beforeCalculateLabelRotation() {
        callback(this.options.beforeCalculateLabelRotation, [
            this
        ]);
    }
    calculateLabelRotation() {
        const options = this.options;
        const tickOpts = options.ticks;
        const numTicks = this.ticks.length;
        const minRotation = tickOpts.minRotation || 0;
        const maxRotation = tickOpts.maxRotation;
        let labelRotation = minRotation;
        let tickWidth, maxHeight, maxLabelDiagonal;
        if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
            this.labelRotation = minRotation;
            return;
        }
        const labelSizes = this._getLabelSizes();
        const maxLabelWidth = labelSizes.widest.width;
        const maxLabelHeight = labelSizes.highest.height;
        const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
        tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
        if (maxLabelWidth + 6 > tickWidth) {
            tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
            maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
            maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
            labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
            labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
        }
        this.labelRotation = labelRotation;
    }
    afterCalculateLabelRotation() {
        callback(this.options.afterCalculateLabelRotation, [
            this
        ]);
    }
    afterAutoSkip() {}
    beforeFit() {
        callback(this.options.beforeFit, [
            this
        ]);
    }
    fit() {
        const minSize = {
            width: 0,
            height: 0
        };
        const { chart , options: { ticks: tickOpts , title: titleOpts , grid: gridOpts  }  } = this;
        const display = this._isVisible();
        const isHorizontal = this.isHorizontal();
        if (display) {
            const titleHeight = getTitleHeight(titleOpts, chart.options.font);
            if (isHorizontal) {
                minSize.width = this.maxWidth;
                minSize.height = getTickMarkLength(gridOpts) + titleHeight;
            } else {
                minSize.height = this.maxHeight;
                minSize.width = getTickMarkLength(gridOpts) + titleHeight;
            }
            if (tickOpts.display && this.ticks.length) {
                const { first , last , widest , highest  } = this._getLabelSizes();
                const tickPadding = tickOpts.padding * 2;
                const angleRadians = toRadians(this.labelRotation);
                const cos = Math.cos(angleRadians);
                const sin = Math.sin(angleRadians);
                if (isHorizontal) {
                    const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
                    minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
                } else {
                    const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
                    minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
                }
                this._calculatePadding(first, last, sin, cos);
            }
        }
        this._handleMargins();
        if (isHorizontal) {
            this.width = this._length = chart.width - this._margins.left - this._margins.right;
            this.height = minSize.height;
        } else {
            this.width = minSize.width;
            this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
        }
    }
    _calculatePadding(first, last, sin, cos) {
        const { ticks: { align , padding  } , position  } = this.options;
        const isRotated = this.labelRotation !== 0;
        const labelsBelowTicks = position !== 'top' && this.axis === 'x';
        if (this.isHorizontal()) {
            const offsetLeft = this.getPixelForTick(0) - this.left;
            const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
            let paddingLeft = 0;
            let paddingRight = 0;
            if (isRotated) {
                if (labelsBelowTicks) {
                    paddingLeft = cos * first.width;
                    paddingRight = sin * last.height;
                } else {
                    paddingLeft = sin * first.height;
                    paddingRight = cos * last.width;
                }
            } else if (align === 'start') {
                paddingRight = last.width;
            } else if (align === 'end') {
                paddingLeft = first.width;
            } else if (align !== 'inner') {
                paddingLeft = first.width / 2;
                paddingRight = last.width / 2;
            }
            this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
            this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
        } else {
            let paddingTop = last.height / 2;
            let paddingBottom = first.height / 2;
            if (align === 'start') {
                paddingTop = 0;
                paddingBottom = first.height;
            } else if (align === 'end') {
                paddingTop = last.height;
                paddingBottom = 0;
            }
            this.paddingTop = paddingTop + padding;
            this.paddingBottom = paddingBottom + padding;
        }
    }
 _handleMargins() {
        if (this._margins) {
            this._margins.left = Math.max(this.paddingLeft, this._margins.left);
            this._margins.top = Math.max(this.paddingTop, this._margins.top);
            this._margins.right = Math.max(this.paddingRight, this._margins.right);
            this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
        }
    }
    afterFit() {
        callback(this.options.afterFit, [
            this
        ]);
    }
 isHorizontal() {
        const { axis , position  } = this.options;
        return position === 'top' || position === 'bottom' || axis === 'x';
    }
 isFullSize() {
        return this.options.fullSize;
    }
 _convertTicksToLabels(ticks) {
        this.beforeTickToLabelConversion();
        this.generateTickLabels(ticks);
        let i, ilen;
        for(i = 0, ilen = ticks.length; i < ilen; i++){
            if (isNullOrUndef(ticks[i].label)) {
                ticks.splice(i, 1);
                ilen--;
                i--;
            }
        }
        this.afterTickToLabelConversion();
    }
 _getLabelSizes() {
        let labelSizes = this._labelSizes;
        if (!labelSizes) {
            const sampleSize = this.options.ticks.sampleSize;
            let ticks = this.ticks;
            if (sampleSize < ticks.length) {
                ticks = sample(ticks, sampleSize);
            }
            this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length);
        }
        return labelSizes;
    }
 _computeLabelSizes(ticks, length) {
        const { ctx , _longestTextCache: caches  } = this;
        const widths = [];
        const heights = [];
        let widestLabelSize = 0;
        let highestLabelSize = 0;
        let i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
        for(i = 0; i < length; ++i){
            label = ticks[i].label;
            tickFont = this._resolveTickFontOptions(i);
            ctx.font = fontString = tickFont.string;
            cache = caches[fontString] = caches[fontString] || {
                data: {},
                gc: []
            };
            lineHeight = tickFont.lineHeight;
            width = height = 0;
            if (!isNullOrUndef(label) && !isArray(label)) {
                width = _measureText(ctx, cache.data, cache.gc, width, label);
                height = lineHeight;
            } else if (isArray(label)) {
                for(j = 0, jlen = label.length; j < jlen; ++j){
                    nestedLabel = label[j];
                    if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
                        width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
                        height += lineHeight;
                    }
                }
            }
            widths.push(width);
            heights.push(height);
            widestLabelSize = Math.max(width, widestLabelSize);
            highestLabelSize = Math.max(height, highestLabelSize);
        }
        garbageCollect(caches, length);
        const widest = widths.indexOf(widestLabelSize);
        const highest = heights.indexOf(highestLabelSize);
        const valueAt = (idx)=>({
                width: widths[idx] || 0,
                height: heights[idx] || 0
            });
        return {
            first: valueAt(0),
            last: valueAt(length - 1),
            widest: valueAt(widest),
            highest: valueAt(highest),
            widths,
            heights
        };
    }
 getLabelForValue(value) {
        return value;
    }
 getPixelForValue(value, index) {
        return NaN;
    }
 getValueForPixel(pixel) {}
 getPixelForTick(index) {
        const ticks = this.ticks;
        if (index < 0 || index > ticks.length - 1) {
            return null;
        }
        return this.getPixelForValue(ticks[index].value);
    }
 getPixelForDecimal(decimal) {
        if (this._reversePixels) {
            decimal = 1 - decimal;
        }
        const pixel = this._startPixel + decimal * this._length;
        return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
    }
 getDecimalForPixel(pixel) {
        const decimal = (pixel - this._startPixel) / this._length;
        return this._reversePixels ? 1 - decimal : decimal;
    }
 getBasePixel() {
        return this.getPixelForValue(this.getBaseValue());
    }
 getBaseValue() {
        const { min , max  } = this;
        return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
    }
 getContext(index) {
        const ticks = this.ticks || [];
        if (index >= 0 && index < ticks.length) {
            const tick = ticks[index];
            return tick.$context || (tick.$context = createTickContext(this.getContext(), index, tick));
        }
        return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
    }
 _tickSize() {
        const optionTicks = this.options.ticks;
        const rot = toRadians(this.labelRotation);
        const cos = Math.abs(Math.cos(rot));
        const sin = Math.abs(Math.sin(rot));
        const labelSizes = this._getLabelSizes();
        const padding = optionTicks.autoSkipPadding || 0;
        const w = labelSizes ? labelSizes.widest.width + padding : 0;
        const h = labelSizes ? labelSizes.highest.height + padding : 0;
        return this.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
    }
 _isVisible() {
        const display = this.options.display;
        if (display !== 'auto') {
            return !!display;
        }
        return this.getMatchingVisibleMetas().length > 0;
    }
 _computeGridLineItems(chartArea) {
        const axis = this.axis;
        const chart = this.chart;
        const options = this.options;
        const { grid , position , border  } = options;
        const offset = grid.offset;
        const isHorizontal = this.isHorizontal();
        const ticks = this.ticks;
        const ticksLength = ticks.length + (offset ? 1 : 0);
        const tl = getTickMarkLength(grid);
        const items = [];
        const borderOpts = border.setContext(this.getContext());
        const axisWidth = borderOpts.display ? borderOpts.width : 0;
        const axisHalfWidth = axisWidth / 2;
        const alignBorderValue = function(pixel) {
            return _alignPixel(chart, pixel, axisWidth);
        };
        let borderValue, i, lineValue, alignedLineValue;
        let tx1, ty1, tx2, ty2, x1, y1, x2, y2;
        if (position === 'top') {
            borderValue = alignBorderValue(this.bottom);
            ty1 = this.bottom - tl;
            ty2 = borderValue - axisHalfWidth;
            y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
            y2 = chartArea.bottom;
        } else if (position === 'bottom') {
            borderValue = alignBorderValue(this.top);
            y1 = chartArea.top;
            y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
            ty1 = borderValue + axisHalfWidth;
            ty2 = this.top + tl;
        } else if (position === 'left') {
            borderValue = alignBorderValue(this.right);
            tx1 = this.right - tl;
            tx2 = borderValue - axisHalfWidth;
            x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
            x2 = chartArea.right;
        } else if (position === 'right') {
            borderValue = alignBorderValue(this.left);
            x1 = chartArea.left;
            x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
            tx1 = borderValue + axisHalfWidth;
            tx2 = this.left + tl;
        } else if (axis === 'x') {
            if (position === 'center') {
                borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
            } else if (isObject(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
            }
            y1 = chartArea.top;
            y2 = chartArea.bottom;
            ty1 = borderValue + axisHalfWidth;
            ty2 = ty1 + tl;
        } else if (axis === 'y') {
            if (position === 'center') {
                borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
            } else if (isObject(position)) {
                const positionAxisID1 = Object.keys(position)[0];
                const value1 = position[positionAxisID1];
                borderValue = alignBorderValue(this.chart.scales[positionAxisID1].getPixelForValue(value1));
            }
            tx1 = borderValue - axisHalfWidth;
            tx2 = tx1 - tl;
            x1 = chartArea.left;
            x2 = chartArea.right;
        }
        const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
        const step = Math.max(1, Math.ceil(ticksLength / limit));
        for(i = 0; i < ticksLength; i += step){
            const context = this.getContext(i);
            const optsAtIndex = grid.setContext(context);
            const optsAtIndexBorder = border.setContext(context);
            const lineWidth = optsAtIndex.lineWidth;
            const lineColor = optsAtIndex.color;
            const borderDash = optsAtIndexBorder.dash || [];
            const borderDashOffset = optsAtIndexBorder.dashOffset;
            const tickWidth = optsAtIndex.tickWidth;
            const tickColor = optsAtIndex.tickColor;
            const tickBorderDash = optsAtIndex.tickBorderDash || [];
            const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
            lineValue = getPixelForGridLine(this, i, offset);
            if (lineValue === undefined) {
                continue;
            }
            alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
            if (isHorizontal) {
                tx1 = tx2 = x1 = x2 = alignedLineValue;
            } else {
                ty1 = ty2 = y1 = y2 = alignedLineValue;
            }
            items.push({
                tx1,
                ty1,
                tx2,
                ty2,
                x1,
                y1,
                x2,
                y2,
                width: lineWidth,
                color: lineColor,
                borderDash,
                borderDashOffset,
                tickWidth,
                tickColor,
                tickBorderDash,
                tickBorderDashOffset
            });
        }
        this._ticksLength = ticksLength;
        this._borderValue = borderValue;
        return items;
    }
 _computeLabelItems(chartArea) {
        const axis = this.axis;
        const options = this.options;
        const { position , ticks: optionTicks  } = options;
        const isHorizontal = this.isHorizontal();
        const ticks = this.ticks;
        const { align , crossAlign , padding , mirror  } = optionTicks;
        const tl = getTickMarkLength(options.grid);
        const tickAndPadding = tl + padding;
        const hTickAndPadding = mirror ? -padding : tickAndPadding;
        const rotation = -toRadians(this.labelRotation);
        const items = [];
        let i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
        let textBaseline = 'middle';
        if (position === 'top') {
            y = this.bottom - hTickAndPadding;
            textAlign = this._getXAxisLabelAlignment();
        } else if (position === 'bottom') {
            y = this.top + hTickAndPadding;
            textAlign = this._getXAxisLabelAlignment();
        } else if (position === 'left') {
            const ret = this._getYAxisLabelAlignment(tl);
            textAlign = ret.textAlign;
            x = ret.x;
        } else if (position === 'right') {
            const ret1 = this._getYAxisLabelAlignment(tl);
            textAlign = ret1.textAlign;
            x = ret1.x;
        } else if (axis === 'x') {
            if (position === 'center') {
                y = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
            } else if (isObject(position)) {
                const positionAxisID = Object.keys(position)[0];
                const value = position[positionAxisID];
                y = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
            }
            textAlign = this._getXAxisLabelAlignment();
        } else if (axis === 'y') {
            if (position === 'center') {
                x = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
            } else if (isObject(position)) {
                const positionAxisID1 = Object.keys(position)[0];
                const value1 = position[positionAxisID1];
                x = this.chart.scales[positionAxisID1].getPixelForValue(value1);
            }
            textAlign = this._getYAxisLabelAlignment(tl).textAlign;
        }
        if (axis === 'y') {
            if (align === 'start') {
                textBaseline = 'top';
            } else if (align === 'end') {
                textBaseline = 'bottom';
            }
        }
        const labelSizes = this._getLabelSizes();
        for(i = 0, ilen = ticks.length; i < ilen; ++i){
            tick = ticks[i];
            label = tick.label;
            const optsAtIndex = optionTicks.setContext(this.getContext(i));
            pixel = this.getPixelForTick(i) + optionTicks.labelOffset;
            font = this._resolveTickFontOptions(i);
            lineHeight = font.lineHeight;
            lineCount = isArray(label) ? label.length : 1;
            const halfCount = lineCount / 2;
            const color = optsAtIndex.color;
            const strokeColor = optsAtIndex.textStrokeColor;
            const strokeWidth = optsAtIndex.textStrokeWidth;
            let tickTextAlign = textAlign;
            if (isHorizontal) {
                x = pixel;
                if (textAlign === 'inner') {
                    if (i === ilen - 1) {
                        tickTextAlign = !this.options.reverse ? 'right' : 'left';
                    } else if (i === 0) {
                        tickTextAlign = !this.options.reverse ? 'left' : 'right';
                    } else {
                        tickTextAlign = 'center';
                    }
                }
                if (position === 'top') {
                    if (crossAlign === 'near' || rotation !== 0) {
                        textOffset = -lineCount * lineHeight + lineHeight / 2;
                    } else if (crossAlign === 'center') {
                        textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
                    } else {
                        textOffset = -labelSizes.highest.height + lineHeight / 2;
                    }
                } else {
                    if (crossAlign === 'near' || rotation !== 0) {
                        textOffset = lineHeight / 2;
                    } else if (crossAlign === 'center') {
                        textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
                    } else {
                        textOffset = labelSizes.highest.height - lineCount * lineHeight;
                    }
                }
                if (mirror) {
                    textOffset *= -1;
                }
                if (rotation !== 0 && !optsAtIndex.showLabelBackdrop) {
                    x += lineHeight / 2 * Math.sin(rotation);
                }
            } else {
                y = pixel;
                textOffset = (1 - lineCount) * lineHeight / 2;
            }
            let backdrop;
            if (optsAtIndex.showLabelBackdrop) {
                const labelPadding = toPadding(optsAtIndex.backdropPadding);
                const height = labelSizes.heights[i];
                const width = labelSizes.widths[i];
                let top = textOffset - labelPadding.top;
                let left = 0 - labelPadding.left;
                switch(textBaseline){
                    case 'middle':
                        top -= height / 2;
                        break;
                    case 'bottom':
                        top -= height;
                        break;
                }
                switch(textAlign){
                    case 'center':
                        left -= width / 2;
                        break;
                    case 'right':
                        left -= width;
                        break;
                }
                backdrop = {
                    left,
                    top,
                    width: width + labelPadding.width,
                    height: height + labelPadding.height,
                    color: optsAtIndex.backdropColor
                };
            }
            items.push({
                label,
                font,
                textOffset,
                options: {
                    rotation,
                    color,
                    strokeColor,
                    strokeWidth,
                    textAlign: tickTextAlign,
                    textBaseline,
                    translation: [
                        x,
                        y
                    ],
                    backdrop
                }
            });
        }
        return items;
    }
    _getXAxisLabelAlignment() {
        const { position , ticks  } = this.options;
        const rotation = -toRadians(this.labelRotation);
        if (rotation) {
            return position === 'top' ? 'left' : 'right';
        }
        let align = 'center';
        if (ticks.align === 'start') {
            align = 'left';
        } else if (ticks.align === 'end') {
            align = 'right';
        } else if (ticks.align === 'inner') {
            align = 'inner';
        }
        return align;
    }
    _getYAxisLabelAlignment(tl) {
        const { position , ticks: { crossAlign , mirror , padding  }  } = this.options;
        const labelSizes = this._getLabelSizes();
        const tickAndPadding = tl + padding;
        const widest = labelSizes.widest.width;
        let textAlign;
        let x;
        if (position === 'left') {
            if (mirror) {
                x = this.right + padding;
                if (crossAlign === 'near') {
                    textAlign = 'left';
                } else if (crossAlign === 'center') {
                    textAlign = 'center';
                    x += widest / 2;
                } else {
                    textAlign = 'right';
                    x += widest;
                }
            } else {
                x = this.right - tickAndPadding;
                if (crossAlign === 'near') {
                    textAlign = 'right';
                } else if (crossAlign === 'center') {
                    textAlign = 'center';
                    x -= widest / 2;
                } else {
                    textAlign = 'left';
                    x = this.left;
                }
            }
        } else if (position === 'right') {
            if (mirror) {
                x = this.left + padding;
                if (crossAlign === 'near') {
                    textAlign = 'right';
                } else if (crossAlign === 'center') {
                    textAlign = 'center';
                    x -= widest / 2;
                } else {
                    textAlign = 'left';
                    x -= widest;
                }
            } else {
                x = this.left + tickAndPadding;
                if (crossAlign === 'near') {
                    textAlign = 'left';
                } else if (crossAlign === 'center') {
                    textAlign = 'center';
                    x += widest / 2;
                } else {
                    textAlign = 'right';
                    x = this.right;
                }
            }
        } else {
            textAlign = 'right';
        }
        return {
            textAlign,
            x
        };
    }
 _computeLabelArea() {
        if (this.options.ticks.mirror) {
            return;
        }
        const chart = this.chart;
        const position = this.options.position;
        if (position === 'left' || position === 'right') {
            return {
                top: 0,
                left: this.left,
                bottom: chart.height,
                right: this.right
            };
        }
        if (position === 'top' || position === 'bottom') {
            return {
                top: this.top,
                left: 0,
                bottom: this.bottom,
                right: chart.width
            };
        }
    }
 drawBackground() {
        const { ctx , options: { backgroundColor  } , left , top , width , height  } = this;
        if (backgroundColor) {
            ctx.save();
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(left, top, width, height);
            ctx.restore();
        }
    }
    getLineWidthForValue(value) {
        const grid = this.options.grid;
        if (!this._isVisible() || !grid.display) {
            return 0;
        }
        const ticks = this.ticks;
        const index = ticks.findIndex((t)=>t.value === value);
        if (index >= 0) {
            const opts = grid.setContext(this.getContext(index));
            return opts.lineWidth;
        }
        return 0;
    }
 drawGrid(chartArea) {
        const grid = this.options.grid;
        const ctx = this.ctx;
        const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
        let i, ilen;
        const drawLine = (p1, p2, style)=>{
            if (!style.width || !style.color) {
                return;
            }
            ctx.save();
            ctx.lineWidth = style.width;
            ctx.strokeStyle = style.color;
            ctx.setLineDash(style.borderDash || []);
            ctx.lineDashOffset = style.borderDashOffset;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
        };
        if (grid.display) {
            for(i = 0, ilen = items.length; i < ilen; ++i){
                const item = items[i];
                if (grid.drawOnChartArea) {
                    drawLine({
                        x: item.x1,
                        y: item.y1
                    }, {
                        x: item.x2,
                        y: item.y2
                    }, item);
                }
                if (grid.drawTicks) {
                    drawLine({
                        x: item.tx1,
                        y: item.ty1
                    }, {
                        x: item.tx2,
                        y: item.ty2
                    }, {
                        color: item.tickColor,
                        width: item.tickWidth,
                        borderDash: item.tickBorderDash,
                        borderDashOffset: item.tickBorderDashOffset
                    });
                }
            }
        }
    }
 drawBorder() {
        const { chart , ctx , options: { border , grid  }  } = this;
        const borderOpts = border.setContext(this.getContext());
        const axisWidth = border.display ? borderOpts.width : 0;
        if (!axisWidth) {
            return;
        }
        const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
        const borderValue = this._borderValue;
        let x1, x2, y1, y2;
        if (this.isHorizontal()) {
            x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
            x2 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
            y1 = y2 = borderValue;
        } else {
            y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
            y2 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
            x1 = x2 = borderValue;
        }
        ctx.save();
        ctx.lineWidth = borderOpts.width;
        ctx.strokeStyle = borderOpts.color;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
    }
 drawLabels(chartArea) {
        const optionTicks = this.options.ticks;
        if (!optionTicks.display) {
            return;
        }
        const ctx = this.ctx;
        const area = this._computeLabelArea();
        if (area) {
            clipArea(ctx, area);
        }
        const items = this.getLabelItems(chartArea);
        for (const item of items){
            const renderTextOptions = item.options;
            const tickFont = item.font;
            const label = item.label;
            const y = item.textOffset;
            renderText(ctx, label, 0, y, tickFont, renderTextOptions);
        }
        if (area) {
            unclipArea(ctx);
        }
    }
 drawTitle() {
        const { ctx , options: { position , title , reverse  }  } = this;
        if (!title.display) {
            return;
        }
        const font = toFont(title.font);
        const padding = toPadding(title.padding);
        const align = title.align;
        let offset = font.lineHeight / 2;
        if (position === 'bottom' || position === 'center' || isObject(position)) {
            offset += padding.bottom;
            if (isArray(title.text)) {
                offset += font.lineHeight * (title.text.length - 1);
            }
        } else {
            offset += padding.top;
        }
        const { titleX , titleY , maxWidth , rotation  } = titleArgs(this, offset, position, align);
        renderText(ctx, title.text, 0, 0, font, {
            color: title.color,
            maxWidth,
            rotation,
            textAlign: titleAlign(align, position, reverse),
            textBaseline: 'middle',
            translation: [
                titleX,
                titleY
            ]
        });
    }
    draw(chartArea) {
        if (!this._isVisible()) {
            return;
        }
        this.drawBackground();
        this.drawGrid(chartArea);
        this.drawBorder();
        this.drawTitle();
        this.drawLabels(chartArea);
    }
 _layers() {
        const opts = this.options;
        const tz = opts.ticks && opts.ticks.z || 0;
        const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
        const bz = valueOrDefault(opts.border && opts.border.z, 0);
        if (!this._isVisible() || this.draw !== Scale.prototype.draw) {
            return [
                {
                    z: tz,
                    draw: (chartArea)=>{
                        this.draw(chartArea);
                    }
                }
            ];
        }
        return [
            {
                z: gz,
                draw: (chartArea)=>{
                    this.drawBackground();
                    this.drawGrid(chartArea);
                    this.drawTitle();
                }
            },
            {
                z: bz,
                draw: ()=>{
                    this.drawBorder();
                }
            },
            {
                z: tz,
                draw: (chartArea)=>{
                    this.drawLabels(chartArea);
                }
            }
        ];
    }
 getMatchingVisibleMetas(type) {
        const metas = this.chart.getSortedVisibleDatasetMetas();
        const axisID = this.axis + 'AxisID';
        const result = [];
        let i, ilen;
        for(i = 0, ilen = metas.length; i < ilen; ++i){
            const meta = metas[i];
            if (meta[axisID] === this.id && (!type || meta.type === type)) {
                result.push(meta);
            }
        }
        return result;
    }
 _resolveTickFontOptions(index) {
        const opts = this.options.ticks.setContext(this.getContext(index));
        return toFont(opts.font);
    }
 _maxDigits() {
        const fontSize = this._resolveTickFontOptions(0).lineHeight;
        return (this.isHorizontal() ? this.width : this.height) / fontSize;
    }
}

class TypedRegistry {
    constructor(type, scope, override){
        this.type = type;
        this.scope = scope;
        this.override = override;
        this.items = Object.create(null);
    }
    isForType(type) {
        return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
    }
 register(item) {
        const proto = Object.getPrototypeOf(item);
        let parentScope;
        if (isIChartComponent(proto)) {
            parentScope = this.register(proto);
        }
        const items = this.items;
        const id = item.id;
        const scope = this.scope + '.' + id;
        if (!id) {
            throw new Error('class does not have id: ' + item);
        }
        if (id in items) {
            return scope;
        }
        items[id] = item;
        registerDefaults(item, scope, parentScope);
        if (this.override) {
            defaults.override(item.id, item.overrides);
        }
        return scope;
    }
 get(id) {
        return this.items[id];
    }
 unregister(item) {
        const items = this.items;
        const id = item.id;
        const scope = this.scope;
        if (id in items) {
            delete items[id];
        }
        if (scope && id in defaults[scope]) {
            delete defaults[scope][id];
            if (this.override) {
                delete overrides[id];
            }
        }
    }
}
function registerDefaults(item, scope, parentScope) {
    const itemDefaults = merge(Object.create(null), [
        parentScope ? defaults.get(parentScope) : {},
        defaults.get(scope),
        item.defaults
    ]);
    defaults.set(scope, itemDefaults);
    if (item.defaultRoutes) {
        routeDefaults(scope, item.defaultRoutes);
    }
    if (item.descriptors) {
        defaults.describe(scope, item.descriptors);
    }
}
function routeDefaults(scope, routes) {
    Object.keys(routes).forEach((property)=>{
        const propertyParts = property.split('.');
        const sourceName = propertyParts.pop();
        const sourceScope = [
            scope
        ].concat(propertyParts).join('.');
        const parts = routes[property].split('.');
        const targetName = parts.pop();
        const targetScope = parts.join('.');
        defaults.route(sourceScope, sourceName, targetScope, targetName);
    });
}
function isIChartComponent(proto) {
    return 'id' in proto && 'defaults' in proto;
}

class Registry {
    constructor(){
        this.controllers = new TypedRegistry(DatasetController, 'datasets', true);
        this.elements = new TypedRegistry(Element$1, 'elements');
        this.plugins = new TypedRegistry(Object, 'plugins');
        this.scales = new TypedRegistry(Scale, 'scales');
        this._typedRegistries = [
            this.controllers,
            this.scales,
            this.elements
        ];
    }
 add(...args) {
        this._each('register', args);
    }
    remove(...args) {
        this._each('unregister', args);
    }
 addControllers(...args) {
        this._each('register', args, this.controllers);
    }
 addElements(...args) {
        this._each('register', args, this.elements);
    }
 addPlugins(...args) {
        this._each('register', args, this.plugins);
    }
 addScales(...args) {
        this._each('register', args, this.scales);
    }
 getController(id) {
        return this._get(id, this.controllers, 'controller');
    }
 getElement(id) {
        return this._get(id, this.elements, 'element');
    }
 getPlugin(id) {
        return this._get(id, this.plugins, 'plugin');
    }
 getScale(id) {
        return this._get(id, this.scales, 'scale');
    }
 removeControllers(...args) {
        this._each('unregister', args, this.controllers);
    }
 removeElements(...args) {
        this._each('unregister', args, this.elements);
    }
 removePlugins(...args) {
        this._each('unregister', args, this.plugins);
    }
 removeScales(...args) {
        this._each('unregister', args, this.scales);
    }
 _each(method, args, typedRegistry) {
        [
            ...args
        ].forEach((arg)=>{
            const reg = typedRegistry || this._getRegistryForType(arg);
            if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) {
                this._exec(method, reg, arg);
            } else {
                each(arg, (item)=>{
                    const itemReg = typedRegistry || this._getRegistryForType(item);
                    this._exec(method, itemReg, item);
                });
            }
        });
    }
 _exec(method, registry, component) {
        const camelMethod = _capitalize(method);
        callback(component['before' + camelMethod], [], component);
        registry[method](component);
        callback(component['after' + camelMethod], [], component);
    }
 _getRegistryForType(type) {
        for(let i = 0; i < this._typedRegistries.length; i++){
            const reg = this._typedRegistries[i];
            if (reg.isForType(type)) {
                return reg;
            }
        }
        return this.plugins;
    }
 _get(id, typedRegistry, type) {
        const item = typedRegistry.get(id);
        if (item === undefined) {
            throw new Error('"' + id + '" is not a registered ' + type + '.');
        }
        return item;
    }
}
var registry = /* #__PURE__ */ new Registry();

class PluginService {
    constructor(){
        this._init = [];
    }
 notify(chart, hook, args, filter) {
        if (hook === 'beforeInit') {
            this._init = this._createDescriptors(chart, true);
            this._notify(this._init, chart, 'install');
        }
        const descriptors = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
        const result = this._notify(descriptors, chart, hook, args);
        if (hook === 'afterDestroy') {
            this._notify(descriptors, chart, 'stop');
            this._notify(this._init, chart, 'uninstall');
        }
        return result;
    }
 _notify(descriptors, chart, hook, args) {
        args = args || {};
        for (const descriptor of descriptors){
            const plugin = descriptor.plugin;
            const method = plugin[hook];
            const params = [
                chart,
                args,
                descriptor.options
            ];
            if (callback(method, params, plugin) === false && args.cancelable) {
                return false;
            }
        }
        return true;
    }
    invalidate() {
        if (!isNullOrUndef(this._cache)) {
            this._oldCache = this._cache;
            this._cache = undefined;
        }
    }
 _descriptors(chart) {
        if (this._cache) {
            return this._cache;
        }
        const descriptors = this._cache = this._createDescriptors(chart);
        this._notifyStateChanges(chart);
        return descriptors;
    }
    _createDescriptors(chart, all) {
        const config = chart && chart.config;
        const options = valueOrDefault(config.options && config.options.plugins, {});
        const plugins = allPlugins(config);
        return options === false && !all ? [] : createDescriptors(chart, plugins, options, all);
    }
 _notifyStateChanges(chart) {
        const previousDescriptors = this._oldCache || [];
        const descriptors = this._cache;
        const diff = (a, b)=>a.filter((x)=>!b.some((y)=>x.plugin.id === y.plugin.id));
        this._notify(diff(previousDescriptors, descriptors), chart, 'stop');
        this._notify(diff(descriptors, previousDescriptors), chart, 'start');
    }
}
 function allPlugins(config) {
    const localIds = {};
    const plugins = [];
    const keys = Object.keys(registry.plugins.items);
    for(let i = 0; i < keys.length; i++){
        plugins.push(registry.getPlugin(keys[i]));
    }
    const local = config.plugins || [];
    for(let i1 = 0; i1 < local.length; i1++){
        const plugin = local[i1];
        if (plugins.indexOf(plugin) === -1) {
            plugins.push(plugin);
            localIds[plugin.id] = true;
        }
    }
    return {
        plugins,
        localIds
    };
}
function getOpts(options, all) {
    if (!all && options === false) {
        return null;
    }
    if (options === true) {
        return {};
    }
    return options;
}
function createDescriptors(chart, { plugins , localIds  }, options, all) {
    const result = [];
    const context = chart.getContext();
    for (const plugin of plugins){
        const id = plugin.id;
        const opts = getOpts(options[id], all);
        if (opts === null) {
            continue;
        }
        result.push({
            plugin,
            options: pluginOpts(chart.config, {
                plugin,
                local: localIds[id]
            }, opts, context)
        });
    }
    return result;
}
function pluginOpts(config, { plugin , local  }, opts, context) {
    const keys = config.pluginScopeKeys(plugin);
    const scopes = config.getOptionScopes(opts, keys);
    if (local && plugin.defaults) {
        scopes.push(plugin.defaults);
    }
    return config.createResolver(scopes, context, [
        ''
    ], {
        scriptable: false,
        indexable: false,
        allKeys: true
    });
}

function getIndexAxis(type, options) {
    const datasetDefaults = defaults.datasets[type] || {};
    const datasetOptions = (options.datasets || {})[type] || {};
    return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || 'x';
}
function getAxisFromDefaultScaleID(id, indexAxis) {
    let axis = id;
    if (id === '_index_') {
        axis = indexAxis;
    } else if (id === '_value_') {
        axis = indexAxis === 'x' ? 'y' : 'x';
    }
    return axis;
}
function getDefaultScaleIDFromAxis(axis, indexAxis) {
    return axis === indexAxis ? '_index_' : '_value_';
}
function axisFromPosition(position) {
    if (position === 'top' || position === 'bottom') {
        return 'x';
    }
    if (position === 'left' || position === 'right') {
        return 'y';
    }
}
function determineAxis(id, scaleOptions) {
    if (id === 'x' || id === 'y' || id === 'r') {
        return id;
    }
    id = scaleOptions.axis || axisFromPosition(scaleOptions.position) || id.length > 1 && determineAxis(id[0].toLowerCase(), scaleOptions);
    if (id) {
        return id;
    }
    throw new Error(`Cannot determine type of '${name}' axis. Please provide 'axis' or 'position' option.`);
}
function mergeScaleConfig(config, options) {
    const chartDefaults = overrides[config.type] || {
        scales: {}
    };
    const configScales = options.scales || {};
    const chartIndexAxis = getIndexAxis(config.type, options);
    const scales = Object.create(null);
    Object.keys(configScales).forEach((id)=>{
        const scaleConf = configScales[id];
        if (!isObject(scaleConf)) {
            return console.error(`Invalid scale configuration for scale: ${id}`);
        }
        if (scaleConf._proxy) {
            return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
        }
        const axis = determineAxis(id, scaleConf);
        const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
        const defaultScaleOptions = chartDefaults.scales || {};
        scales[id] = mergeIf(Object.create(null), [
            {
                axis
            },
            scaleConf,
            defaultScaleOptions[axis],
            defaultScaleOptions[defaultId]
        ]);
    });
    config.data.datasets.forEach((dataset)=>{
        const type = dataset.type || config.type;
        const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
        const datasetDefaults = overrides[type] || {};
        const defaultScaleOptions = datasetDefaults.scales || {};
        Object.keys(defaultScaleOptions).forEach((defaultID)=>{
            const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
            const id = dataset[axis + 'AxisID'] || axis;
            scales[id] = scales[id] || Object.create(null);
            mergeIf(scales[id], [
                {
                    axis
                },
                configScales[id],
                defaultScaleOptions[defaultID]
            ]);
        });
    });
    Object.keys(scales).forEach((key)=>{
        const scale = scales[key];
        mergeIf(scale, [
            defaults.scales[scale.type],
            defaults.scale
        ]);
    });
    return scales;
}
function initOptions(config) {
    const options = config.options || (config.options = {});
    options.plugins = valueOrDefault(options.plugins, {});
    options.scales = mergeScaleConfig(config, options);
}
function initData(data) {
    data = data || {};
    data.datasets = data.datasets || [];
    data.labels = data.labels || [];
    return data;
}
function initConfig(config) {
    config = config || {};
    config.data = initData(config.data);
    initOptions(config);
    return config;
}
const keyCache = new Map();
const keysCached = new Set();
function cachedKeys(cacheKey, generate) {
    let keys = keyCache.get(cacheKey);
    if (!keys) {
        keys = generate();
        keyCache.set(cacheKey, keys);
        keysCached.add(keys);
    }
    return keys;
}
const addIfFound = (set, obj, key)=>{
    const opts = resolveObjectKey(obj, key);
    if (opts !== undefined) {
        set.add(opts);
    }
};
class Config {
    constructor(config){
        this._config = initConfig(config);
        this._scopeCache = new Map();
        this._resolverCache = new Map();
    }
    get platform() {
        return this._config.platform;
    }
    get type() {
        return this._config.type;
    }
    set type(type) {
        this._config.type = type;
    }
    get data() {
        return this._config.data;
    }
    set data(data) {
        this._config.data = initData(data);
    }
    get options() {
        return this._config.options;
    }
    set options(options) {
        this._config.options = options;
    }
    get plugins() {
        return this._config.plugins;
    }
    update() {
        const config = this._config;
        this.clearCache();
        initOptions(config);
    }
    clearCache() {
        this._scopeCache.clear();
        this._resolverCache.clear();
    }
 datasetScopeKeys(datasetType) {
        return cachedKeys(datasetType, ()=>[
                [
                    `datasets.${datasetType}`,
                    ''
                ]
            ]);
    }
 datasetAnimationScopeKeys(datasetType, transition) {
        return cachedKeys(`${datasetType}.transition.${transition}`, ()=>[
                [
                    `datasets.${datasetType}.transitions.${transition}`,
                    `transitions.${transition}`
                ],
                [
                    `datasets.${datasetType}`,
                    ''
                ]
            ]);
    }
 datasetElementScopeKeys(datasetType, elementType) {
        return cachedKeys(`${datasetType}-${elementType}`, ()=>[
                [
                    `datasets.${datasetType}.elements.${elementType}`,
                    `datasets.${datasetType}`,
                    `elements.${elementType}`,
                    ''
                ]
            ]);
    }
 pluginScopeKeys(plugin) {
        const id = plugin.id;
        const type = this.type;
        return cachedKeys(`${type}-plugin-${id}`, ()=>[
                [
                    `plugins.${id}`,
                    ...plugin.additionalOptionScopes || []
                ]
            ]);
    }
 _cachedScopes(mainScope, resetCache) {
        const _scopeCache = this._scopeCache;
        let cache = _scopeCache.get(mainScope);
        if (!cache || resetCache) {
            cache = new Map();
            _scopeCache.set(mainScope, cache);
        }
        return cache;
    }
 getOptionScopes(mainScope, keyLists, resetCache) {
        const { options , type  } = this;
        const cache = this._cachedScopes(mainScope, resetCache);
        const cached = cache.get(keyLists);
        if (cached) {
            return cached;
        }
        const scopes = new Set();
        keyLists.forEach((keys)=>{
            if (mainScope) {
                scopes.add(mainScope);
                keys.forEach((key)=>addIfFound(scopes, mainScope, key));
            }
            keys.forEach((key)=>addIfFound(scopes, options, key));
            keys.forEach((key)=>addIfFound(scopes, overrides[type] || {}, key));
            keys.forEach((key)=>addIfFound(scopes, defaults, key));
            keys.forEach((key)=>addIfFound(scopes, descriptors, key));
        });
        const array = Array.from(scopes);
        if (array.length === 0) {
            array.push(Object.create(null));
        }
        if (keysCached.has(keyLists)) {
            cache.set(keyLists, array);
        }
        return array;
    }
 chartOptionScopes() {
        const { options , type  } = this;
        return [
            options,
            overrides[type] || {},
            defaults.datasets[type] || {},
            {
                type
            },
            defaults,
            descriptors
        ];
    }
 resolveNamedOptions(scopes, names, context, prefixes = [
        ''
    ]) {
        const result = {
            $shared: true
        };
        const { resolver , subPrefixes  } = getResolver(this._resolverCache, scopes, prefixes);
        let options = resolver;
        if (needContext(resolver, names)) {
            result.$shared = false;
            context = isFunction(context) ? context() : context;
            const subResolver = this.createResolver(scopes, context, subPrefixes);
            options = _attachContext(resolver, context, subResolver);
        }
        for (const prop of names){
            result[prop] = options[prop];
        }
        return result;
    }
 createResolver(scopes, context, prefixes = [
        ''
    ], descriptorDefaults) {
        const { resolver  } = getResolver(this._resolverCache, scopes, prefixes);
        return isObject(context) ? _attachContext(resolver, context, undefined, descriptorDefaults) : resolver;
    }
}
function getResolver(resolverCache, scopes, prefixes) {
    let cache = resolverCache.get(scopes);
    if (!cache) {
        cache = new Map();
        resolverCache.set(scopes, cache);
    }
    const cacheKey = prefixes.join();
    let cached = cache.get(cacheKey);
    if (!cached) {
        const resolver = _createResolver(scopes, prefixes);
        cached = {
            resolver,
            subPrefixes: prefixes.filter((p)=>!p.toLowerCase().includes('hover'))
        };
        cache.set(cacheKey, cached);
    }
    return cached;
}
const hasFunction = (value)=>isObject(value) && Object.getOwnPropertyNames(value).reduce((acc, key)=>acc || isFunction(value[key]), false);
function needContext(proxy, names) {
    const { isScriptable , isIndexable  } = _descriptors(proxy);
    for (const prop of names){
        const scriptable = isScriptable(prop);
        const indexable = isIndexable(prop);
        const value = (indexable || scriptable) && proxy[prop];
        if (scriptable && (isFunction(value) || hasFunction(value)) || indexable && isArray(value)) {
            return true;
        }
    }
    return false;
}

var version = "4.1.2";

const KNOWN_POSITIONS = [
    'top',
    'bottom',
    'left',
    'right',
    'chartArea'
];
function positionIsHorizontal(position, axis) {
    return position === 'top' || position === 'bottom' || KNOWN_POSITIONS.indexOf(position) === -1 && axis === 'x';
}
function compare2Level(l1, l2) {
    return function(a, b) {
        return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
    };
}
function onAnimationsComplete(context) {
    const chart = context.chart;
    const animationOptions = chart.options.animation;
    chart.notifyPlugins('afterRender');
    callback(animationOptions && animationOptions.onComplete, [
        context
    ], chart);
}
function onAnimationProgress(context) {
    const chart = context.chart;
    const animationOptions = chart.options.animation;
    callback(animationOptions && animationOptions.onProgress, [
        context
    ], chart);
}
 function getCanvas(item) {
    if (_isDomSupported() && typeof item === 'string') {
        item = document.getElementById(item);
    } else if (item && item.length) {
        item = item[0];
    }
    if (item && item.canvas) {
        item = item.canvas;
    }
    return item;
}
const instances = {};
const getChart = (key)=>{
    const canvas = getCanvas(key);
    return Object.values(instances).filter((c)=>c.canvas === canvas).pop();
};
function moveNumericKeys(obj, start, move) {
    const keys = Object.keys(obj);
    for (const key of keys){
        const intKey = +key;
        if (intKey >= start) {
            const value = obj[key];
            delete obj[key];
            if (move > 0 || intKey > start) {
                obj[intKey + move] = value;
            }
        }
    }
}
 function determineLastEvent(e, lastEvent, inChartArea, isClick) {
    if (!inChartArea || e.type === 'mouseout') {
        return null;
    }
    if (isClick) {
        return lastEvent;
    }
    return e;
}
function getDatasetArea(meta) {
    const { xScale , yScale  } = meta;
    if (xScale && yScale) {
        return {
            left: xScale.left,
            right: xScale.right,
            top: yScale.top,
            bottom: yScale.bottom
        };
    }
}
let Chart$1 = class Chart {
    static defaults = defaults;
    static instances = instances;
    static overrides = overrides;
    static registry = registry;
    static version = version;
    static getChart = getChart;
    static register(...items) {
        registry.add(...items);
        invalidatePlugins();
    }
    static unregister(...items) {
        registry.remove(...items);
        invalidatePlugins();
    }
    constructor(item, userConfig){
        const config = this.config = new Config(userConfig);
        const initialCanvas = getCanvas(item);
        const existingChart = getChart(initialCanvas);
        if (existingChart) {
            throw new Error('Canvas is already in use. Chart with ID \'' + existingChart.id + '\'' + ' must be destroyed before the canvas with ID \'' + existingChart.canvas.id + '\' can be reused.');
        }
        const options = config.createResolver(config.chartOptionScopes(), this.getContext());
        this.platform = new (config.platform || _detectPlatform(initialCanvas))();
        this.platform.updateConfig(config);
        const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
        const canvas = context && context.canvas;
        const height = canvas && canvas.height;
        const width = canvas && canvas.width;
        this.id = uid();
        this.ctx = context;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this._options = options;
        this._aspectRatio = this.aspectRatio;
        this._layers = [];
        this._metasets = [];
        this._stacks = undefined;
        this.boxes = [];
        this.currentDevicePixelRatio = undefined;
        this.chartArea = undefined;
        this._active = [];
        this._lastEvent = undefined;
        this._listeners = {};
         this._responsiveListeners = undefined;
        this._sortedMetasets = [];
        this.scales = {};
        this._plugins = new PluginService();
        this.$proxies = {};
        this._hiddenIndices = {};
        this.attached = false;
        this._animationsDisabled = undefined;
        this.$context = undefined;
        this._doResize = debounce((mode)=>this.update(mode), options.resizeDelay || 0);
        this._dataChanges = [];
        instances[this.id] = this;
        if (!context || !canvas) {
            console.error("Failed to create chart: can't acquire context from the given item");
            return;
        }
        animator.listen(this, 'complete', onAnimationsComplete);
        animator.listen(this, 'progress', onAnimationProgress);
        this._initialize();
        if (this.attached) {
            this.update();
        }
    }
    get aspectRatio() {
        const { options: { aspectRatio , maintainAspectRatio  } , width , height , _aspectRatio  } = this;
        if (!isNullOrUndef(aspectRatio)) {
            return aspectRatio;
        }
        if (maintainAspectRatio && _aspectRatio) {
            return _aspectRatio;
        }
        return height ? width / height : null;
    }
    get data() {
        return this.config.data;
    }
    set data(data) {
        this.config.data = data;
    }
    get options() {
        return this._options;
    }
    set options(options) {
        this.config.options = options;
    }
    get registry() {
        return registry;
    }
 _initialize() {
        this.notifyPlugins('beforeInit');
        if (this.options.responsive) {
            this.resize();
        } else {
            retinaScale(this, this.options.devicePixelRatio);
        }
        this.bindEvents();
        this.notifyPlugins('afterInit');
        return this;
    }
    clear() {
        clearCanvas(this.canvas, this.ctx);
        return this;
    }
    stop() {
        animator.stop(this);
        return this;
    }
 resize(width, height) {
        if (!animator.running(this)) {
            this._resize(width, height);
        } else {
            this._resizeBeforeDraw = {
                width,
                height
            };
        }
    }
    _resize(width, height) {
        const options = this.options;
        const canvas = this.canvas;
        const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
        const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
        const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
        const mode = this.width ? 'resize' : 'attach';
        this.width = newSize.width;
        this.height = newSize.height;
        this._aspectRatio = this.aspectRatio;
        if (!retinaScale(this, newRatio, true)) {
            return;
        }
        this.notifyPlugins('resize', {
            size: newSize
        });
        callback(options.onResize, [
            this,
            newSize
        ], this);
        if (this.attached) {
            if (this._doResize(mode)) {
                this.render();
            }
        }
    }
    ensureScalesHaveIDs() {
        const options = this.options;
        const scalesOptions = options.scales || {};
        each(scalesOptions, (axisOptions, axisID)=>{
            axisOptions.id = axisID;
        });
    }
 buildOrUpdateScales() {
        const options = this.options;
        const scaleOpts = options.scales;
        const scales = this.scales;
        const updated = Object.keys(scales).reduce((obj, id)=>{
            obj[id] = false;
            return obj;
        }, {});
        let items = [];
        if (scaleOpts) {
            items = items.concat(Object.keys(scaleOpts).map((id)=>{
                const scaleOptions = scaleOpts[id];
                const axis = determineAxis(id, scaleOptions);
                const isRadial = axis === 'r';
                const isHorizontal = axis === 'x';
                return {
                    options: scaleOptions,
                    dposition: isRadial ? 'chartArea' : isHorizontal ? 'bottom' : 'left',
                    dtype: isRadial ? 'radialLinear' : isHorizontal ? 'category' : 'linear'
                };
            }));
        }
        each(items, (item)=>{
            const scaleOptions = item.options;
            const id = scaleOptions.id;
            const axis = determineAxis(id, scaleOptions);
            const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
            if (scaleOptions.position === undefined || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
                scaleOptions.position = item.dposition;
            }
            updated[id] = true;
            let scale = null;
            if (id in scales && scales[id].type === scaleType) {
                scale = scales[id];
            } else {
                const scaleClass = registry.getScale(scaleType);
                scale = new scaleClass({
                    id,
                    type: scaleType,
                    ctx: this.ctx,
                    chart: this
                });
                scales[scale.id] = scale;
            }
            scale.init(scaleOptions, options);
        });
        each(updated, (hasUpdated, id)=>{
            if (!hasUpdated) {
                delete scales[id];
            }
        });
        each(scales, (scale)=>{
            layouts.configure(this, scale, scale.options);
            layouts.addBox(this, scale);
        });
    }
 _updateMetasets() {
        const metasets = this._metasets;
        const numData = this.data.datasets.length;
        const numMeta = metasets.length;
        metasets.sort((a, b)=>a.index - b.index);
        if (numMeta > numData) {
            for(let i = numData; i < numMeta; ++i){
                this._destroyDatasetMeta(i);
            }
            metasets.splice(numData, numMeta - numData);
        }
        this._sortedMetasets = metasets.slice(0).sort(compare2Level('order', 'index'));
    }
 _removeUnreferencedMetasets() {
        const { _metasets: metasets , data: { datasets  }  } = this;
        if (metasets.length > datasets.length) {
            delete this._stacks;
        }
        metasets.forEach((meta, index)=>{
            if (datasets.filter((x)=>x === meta._dataset).length === 0) {
                this._destroyDatasetMeta(index);
            }
        });
    }
    buildOrUpdateControllers() {
        const newControllers = [];
        const datasets = this.data.datasets;
        let i, ilen;
        this._removeUnreferencedMetasets();
        for(i = 0, ilen = datasets.length; i < ilen; i++){
            const dataset = datasets[i];
            let meta = this.getDatasetMeta(i);
            const type = dataset.type || this.config.type;
            if (meta.type && meta.type !== type) {
                this._destroyDatasetMeta(i);
                meta = this.getDatasetMeta(i);
            }
            meta.type = type;
            meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
            meta.order = dataset.order || 0;
            meta.index = i;
            meta.label = '' + dataset.label;
            meta.visible = this.isDatasetVisible(i);
            if (meta.controller) {
                meta.controller.updateIndex(i);
                meta.controller.linkScales();
            } else {
                const ControllerClass = registry.getController(type);
                const { datasetElementType , dataElementType  } = defaults.datasets[type];
                Object.assign(ControllerClass, {
                    dataElementType: registry.getElement(dataElementType),
                    datasetElementType: datasetElementType && registry.getElement(datasetElementType)
                });
                meta.controller = new ControllerClass(this, i);
                newControllers.push(meta.controller);
            }
        }
        this._updateMetasets();
        return newControllers;
    }
 _resetElements() {
        each(this.data.datasets, (dataset, datasetIndex)=>{
            this.getDatasetMeta(datasetIndex).controller.reset();
        }, this);
    }
 reset() {
        this._resetElements();
        this.notifyPlugins('reset');
    }
    update(mode) {
        const config = this.config;
        config.update();
        const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
        const animsDisabled = this._animationsDisabled = !options.animation;
        this._updateScales();
        this._checkEventBindings();
        this._updateHiddenIndices();
        this._plugins.invalidate();
        if (this.notifyPlugins('beforeUpdate', {
            mode,
            cancelable: true
        }) === false) {
            return;
        }
        const newControllers = this.buildOrUpdateControllers();
        this.notifyPlugins('beforeElementsUpdate');
        let minPadding = 0;
        for(let i = 0, ilen = this.data.datasets.length; i < ilen; i++){
            const { controller  } = this.getDatasetMeta(i);
            const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
            controller.buildOrUpdateElements(reset);
            minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
        }
        minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
        this._updateLayout(minPadding);
        if (!animsDisabled) {
            each(newControllers, (controller)=>{
                controller.reset();
            });
        }
        this._updateDatasets(mode);
        this.notifyPlugins('afterUpdate', {
            mode
        });
        this._layers.sort(compare2Level('z', '_idx'));
        const { _active , _lastEvent  } = this;
        if (_lastEvent) {
            this._eventHandler(_lastEvent, true);
        } else if (_active.length) {
            this._updateHoverStyles(_active, _active, true);
        }
        this.render();
    }
 _updateScales() {
        each(this.scales, (scale)=>{
            layouts.removeBox(this, scale);
        });
        this.ensureScalesHaveIDs();
        this.buildOrUpdateScales();
    }
 _checkEventBindings() {
        const options = this.options;
        const existingEvents = new Set(Object.keys(this._listeners));
        const newEvents = new Set(options.events);
        if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
            this.unbindEvents();
            this.bindEvents();
        }
    }
 _updateHiddenIndices() {
        const { _hiddenIndices  } = this;
        const changes = this._getUniformDataChanges() || [];
        for (const { method , start , count  } of changes){
            const move = method === '_removeElements' ? -count : count;
            moveNumericKeys(_hiddenIndices, start, move);
        }
    }
 _getUniformDataChanges() {
        const _dataChanges = this._dataChanges;
        if (!_dataChanges || !_dataChanges.length) {
            return;
        }
        this._dataChanges = [];
        const datasetCount = this.data.datasets.length;
        const makeSet = (idx)=>new Set(_dataChanges.filter((c)=>c[0] === idx).map((c, i)=>i + ',' + c.splice(1).join(',')));
        const changeSet = makeSet(0);
        for(let i = 1; i < datasetCount; i++){
            if (!setsEqual(changeSet, makeSet(i))) {
                return;
            }
        }
        return Array.from(changeSet).map((c)=>c.split(',')).map((a)=>({
                method: a[1],
                start: +a[2],
                count: +a[3]
            }));
    }
 _updateLayout(minPadding) {
        if (this.notifyPlugins('beforeLayout', {
            cancelable: true
        }) === false) {
            return;
        }
        layouts.update(this, this.width, this.height, minPadding);
        const area = this.chartArea;
        const noArea = area.width <= 0 || area.height <= 0;
        this._layers = [];
        each(this.boxes, (box)=>{
            if (noArea && box.position === 'chartArea') {
                return;
            }
            if (box.configure) {
                box.configure();
            }
            this._layers.push(...box._layers());
        }, this);
        this._layers.forEach((item, index)=>{
            item._idx = index;
        });
        this.notifyPlugins('afterLayout');
    }
 _updateDatasets(mode) {
        if (this.notifyPlugins('beforeDatasetsUpdate', {
            mode,
            cancelable: true
        }) === false) {
            return;
        }
        for(let i = 0, ilen = this.data.datasets.length; i < ilen; ++i){
            this.getDatasetMeta(i).controller.configure();
        }
        for(let i1 = 0, ilen1 = this.data.datasets.length; i1 < ilen1; ++i1){
            this._updateDataset(i1, isFunction(mode) ? mode({
                datasetIndex: i1
            }) : mode);
        }
        this.notifyPlugins('afterDatasetsUpdate', {
            mode
        });
    }
 _updateDataset(index, mode) {
        const meta = this.getDatasetMeta(index);
        const args = {
            meta,
            index,
            mode,
            cancelable: true
        };
        if (this.notifyPlugins('beforeDatasetUpdate', args) === false) {
            return;
        }
        meta.controller._update(mode);
        args.cancelable = false;
        this.notifyPlugins('afterDatasetUpdate', args);
    }
    render() {
        if (this.notifyPlugins('beforeRender', {
            cancelable: true
        }) === false) {
            return;
        }
        if (animator.has(this)) {
            if (this.attached && !animator.running(this)) {
                animator.start(this);
            }
        } else {
            this.draw();
            onAnimationsComplete({
                chart: this
            });
        }
    }
    draw() {
        let i;
        if (this._resizeBeforeDraw) {
            const { width , height  } = this._resizeBeforeDraw;
            this._resize(width, height);
            this._resizeBeforeDraw = null;
        }
        this.clear();
        if (this.width <= 0 || this.height <= 0) {
            return;
        }
        if (this.notifyPlugins('beforeDraw', {
            cancelable: true
        }) === false) {
            return;
        }
        const layers = this._layers;
        for(i = 0; i < layers.length && layers[i].z <= 0; ++i){
            layers[i].draw(this.chartArea);
        }
        this._drawDatasets();
        for(; i < layers.length; ++i){
            layers[i].draw(this.chartArea);
        }
        this.notifyPlugins('afterDraw');
    }
 _getSortedDatasetMetas(filterVisible) {
        const metasets = this._sortedMetasets;
        const result = [];
        let i, ilen;
        for(i = 0, ilen = metasets.length; i < ilen; ++i){
            const meta = metasets[i];
            if (!filterVisible || meta.visible) {
                result.push(meta);
            }
        }
        return result;
    }
 getSortedVisibleDatasetMetas() {
        return this._getSortedDatasetMetas(true);
    }
 _drawDatasets() {
        if (this.notifyPlugins('beforeDatasetsDraw', {
            cancelable: true
        }) === false) {
            return;
        }
        const metasets = this.getSortedVisibleDatasetMetas();
        for(let i = metasets.length - 1; i >= 0; --i){
            this._drawDataset(metasets[i]);
        }
        this.notifyPlugins('afterDatasetsDraw');
    }
 _drawDataset(meta) {
        const ctx = this.ctx;
        const clip = meta._clip;
        const useClip = !clip.disabled;
        const area = getDatasetArea(meta) || this.chartArea;
        const args = {
            meta,
            index: meta.index,
            cancelable: true
        };
        if (this.notifyPlugins('beforeDatasetDraw', args) === false) {
            return;
        }
        if (useClip) {
            clipArea(ctx, {
                left: clip.left === false ? 0 : area.left - clip.left,
                right: clip.right === false ? this.width : area.right + clip.right,
                top: clip.top === false ? 0 : area.top - clip.top,
                bottom: clip.bottom === false ? this.height : area.bottom + clip.bottom
            });
        }
        meta.controller.draw();
        if (useClip) {
            unclipArea(ctx);
        }
        args.cancelable = false;
        this.notifyPlugins('afterDatasetDraw', args);
    }
 isPointInArea(point) {
        return _isPointInArea(point, this.chartArea, this._minPadding);
    }
    getElementsAtEventForMode(e, mode, options, useFinalPosition) {
        const method = Interaction.modes[mode];
        if (typeof method === 'function') {
            return method(this, e, options, useFinalPosition);
        }
        return [];
    }
    getDatasetMeta(datasetIndex) {
        const dataset = this.data.datasets[datasetIndex];
        const metasets = this._metasets;
        let meta = metasets.filter((x)=>x && x._dataset === dataset).pop();
        if (!meta) {
            meta = {
                type: null,
                data: [],
                dataset: null,
                controller: null,
                hidden: null,
                xAxisID: null,
                yAxisID: null,
                order: dataset && dataset.order || 0,
                index: datasetIndex,
                _dataset: dataset,
                _parsed: [],
                _sorted: false
            };
            metasets.push(meta);
        }
        return meta;
    }
    getContext() {
        return this.$context || (this.$context = createContext(null, {
            chart: this,
            type: 'chart'
        }));
    }
    getVisibleDatasetCount() {
        return this.getSortedVisibleDatasetMetas().length;
    }
    isDatasetVisible(datasetIndex) {
        const dataset = this.data.datasets[datasetIndex];
        if (!dataset) {
            return false;
        }
        const meta = this.getDatasetMeta(datasetIndex);
        return typeof meta.hidden === 'boolean' ? !meta.hidden : !dataset.hidden;
    }
    setDatasetVisibility(datasetIndex, visible) {
        const meta = this.getDatasetMeta(datasetIndex);
        meta.hidden = !visible;
    }
    toggleDataVisibility(index) {
        this._hiddenIndices[index] = !this._hiddenIndices[index];
    }
    getDataVisibility(index) {
        return !this._hiddenIndices[index];
    }
 _updateVisibility(datasetIndex, dataIndex, visible) {
        const mode = visible ? 'show' : 'hide';
        const meta = this.getDatasetMeta(datasetIndex);
        const anims = meta.controller._resolveAnimations(undefined, mode);
        if (defined(dataIndex)) {
            meta.data[dataIndex].hidden = !visible;
            this.update();
        } else {
            this.setDatasetVisibility(datasetIndex, visible);
            anims.update(meta, {
                visible
            });
            this.update((ctx)=>ctx.datasetIndex === datasetIndex ? mode : undefined);
        }
    }
    hide(datasetIndex, dataIndex) {
        this._updateVisibility(datasetIndex, dataIndex, false);
    }
    show(datasetIndex, dataIndex) {
        this._updateVisibility(datasetIndex, dataIndex, true);
    }
 _destroyDatasetMeta(datasetIndex) {
        const meta = this._metasets[datasetIndex];
        if (meta && meta.controller) {
            meta.controller._destroy();
        }
        delete this._metasets[datasetIndex];
    }
    _stop() {
        let i, ilen;
        this.stop();
        animator.remove(this);
        for(i = 0, ilen = this.data.datasets.length; i < ilen; ++i){
            this._destroyDatasetMeta(i);
        }
    }
    destroy() {
        this.notifyPlugins('beforeDestroy');
        const { canvas , ctx  } = this;
        this._stop();
        this.config.clearCache();
        if (canvas) {
            this.unbindEvents();
            clearCanvas(canvas, ctx);
            this.platform.releaseContext(ctx);
            this.canvas = null;
            this.ctx = null;
        }
        delete instances[this.id];
        this.notifyPlugins('afterDestroy');
    }
    toBase64Image(...args) {
        return this.canvas.toDataURL(...args);
    }
 bindEvents() {
        this.bindUserEvents();
        if (this.options.responsive) {
            this.bindResponsiveEvents();
        } else {
            this.attached = true;
        }
    }
 bindUserEvents() {
        const listeners = this._listeners;
        const platform = this.platform;
        const _add = (type, listener)=>{
            platform.addEventListener(this, type, listener);
            listeners[type] = listener;
        };
        const listener = (e, x, y)=>{
            e.offsetX = x;
            e.offsetY = y;
            this._eventHandler(e);
        };
        each(this.options.events, (type)=>_add(type, listener));
    }
 bindResponsiveEvents() {
        if (!this._responsiveListeners) {
            this._responsiveListeners = {};
        }
        const listeners = this._responsiveListeners;
        const platform = this.platform;
        const _add = (type, listener)=>{
            platform.addEventListener(this, type, listener);
            listeners[type] = listener;
        };
        const _remove = (type, listener)=>{
            if (listeners[type]) {
                platform.removeEventListener(this, type, listener);
                delete listeners[type];
            }
        };
        const listener = (width, height)=>{
            if (this.canvas) {
                this.resize(width, height);
            }
        };
        let detached;
        const attached = ()=>{
            _remove('attach', attached);
            this.attached = true;
            this.resize();
            _add('resize', listener);
            _add('detach', detached);
        };
        detached = ()=>{
            this.attached = false;
            _remove('resize', listener);
            this._stop();
            this._resize(0, 0);
            _add('attach', attached);
        };
        if (platform.isAttached(this.canvas)) {
            attached();
        } else {
            detached();
        }
    }
 unbindEvents() {
        each(this._listeners, (listener, type)=>{
            this.platform.removeEventListener(this, type, listener);
        });
        this._listeners = {};
        each(this._responsiveListeners, (listener, type)=>{
            this.platform.removeEventListener(this, type, listener);
        });
        this._responsiveListeners = undefined;
    }
    updateHoverStyle(items, mode, enabled) {
        const prefix = enabled ? 'set' : 'remove';
        let meta, item, i, ilen;
        if (mode === 'dataset') {
            meta = this.getDatasetMeta(items[0].datasetIndex);
            meta.controller['_' + prefix + 'DatasetHoverStyle']();
        }
        for(i = 0, ilen = items.length; i < ilen; ++i){
            item = items[i];
            const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
            if (controller) {
                controller[prefix + 'HoverStyle'](item.element, item.datasetIndex, item.index);
            }
        }
    }
 getActiveElements() {
        return this._active || [];
    }
 setActiveElements(activeElements) {
        const lastActive = this._active || [];
        const active = activeElements.map(({ datasetIndex , index  })=>{
            const meta = this.getDatasetMeta(datasetIndex);
            if (!meta) {
                throw new Error('No dataset found at index ' + datasetIndex);
            }
            return {
                datasetIndex,
                element: meta.data[index],
                index
            };
        });
        const changed = !_elementsEqual(active, lastActive);
        if (changed) {
            this._active = active;
            this._lastEvent = null;
            this._updateHoverStyles(active, lastActive);
        }
    }
 notifyPlugins(hook, args, filter) {
        return this._plugins.notify(this, hook, args, filter);
    }
 isPluginEnabled(pluginId) {
        return this._plugins._cache.filter((p)=>p.plugin.id === pluginId).length === 1;
    }
 _updateHoverStyles(active, lastActive, replay) {
        const hoverOptions = this.options.hover;
        const diff = (a, b)=>a.filter((x)=>!b.some((y)=>x.datasetIndex === y.datasetIndex && x.index === y.index));
        const deactivated = diff(lastActive, active);
        const activated = replay ? active : diff(active, lastActive);
        if (deactivated.length) {
            this.updateHoverStyle(deactivated, hoverOptions.mode, false);
        }
        if (activated.length && hoverOptions.mode) {
            this.updateHoverStyle(activated, hoverOptions.mode, true);
        }
    }
 _eventHandler(e, replay) {
        const args = {
            event: e,
            replay,
            cancelable: true,
            inChartArea: this.isPointInArea(e)
        };
        const eventFilter = (plugin)=>(plugin.options.events || this.options.events).includes(e.native.type);
        if (this.notifyPlugins('beforeEvent', args, eventFilter) === false) {
            return;
        }
        const changed = this._handleEvent(e, replay, args.inChartArea);
        args.cancelable = false;
        this.notifyPlugins('afterEvent', args, eventFilter);
        if (changed || args.changed) {
            this.render();
        }
        return this;
    }
 _handleEvent(e, replay, inChartArea) {
        const { _active: lastActive = [] , options  } = this;
        const useFinalPosition = replay;
        const active = this._getActiveElements(e, lastActive, inChartArea, useFinalPosition);
        const isClick = _isClickEvent(e);
        const lastEvent = determineLastEvent(e, this._lastEvent, inChartArea, isClick);
        if (inChartArea) {
            this._lastEvent = null;
            callback(options.onHover, [
                e,
                active,
                this
            ], this);
            if (isClick) {
                callback(options.onClick, [
                    e,
                    active,
                    this
                ], this);
            }
        }
        const changed = !_elementsEqual(active, lastActive);
        if (changed || replay) {
            this._active = active;
            this._updateHoverStyles(active, lastActive, replay);
        }
        this._lastEvent = lastEvent;
        return changed;
    }
 _getActiveElements(e, lastActive, inChartArea, useFinalPosition) {
        if (e.type === 'mouseout') {
            return [];
        }
        if (!inChartArea) {
            return lastActive;
        }
        const hoverOptions = this.options.hover;
        return this.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
    }
};
function invalidatePlugins() {
    return each(Chart$1.instances, (chart)=>chart._plugins.invalidate());
}

function clipArc(ctx, element, endAngle) {
    const { startAngle , pixelMargin , x , y , outerRadius , innerRadius  } = element;
    let angleMargin = pixelMargin / outerRadius;
    // Draw an inner border by clipping the arc and drawing a double-width border
    // Enlarge the clipping arc by 0.33 pixels to eliminate glitches between borders
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
    if (innerRadius > pixelMargin) {
        angleMargin = pixelMargin / innerRadius;
        ctx.arc(x, y, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
    } else {
        ctx.arc(x, y, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
    }
    ctx.closePath();
    ctx.clip();
}
function toRadiusCorners(value) {
    return _readValueToProps(value, [
        'outerStart',
        'outerEnd',
        'innerStart',
        'innerEnd'
    ]);
}
/**
 * Parse border radius from the provided options
 */ function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
    const o = toRadiusCorners(arc.options.borderRadius);
    const halfThickness = (outerRadius - innerRadius) / 2;
    const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
    // Outer limits are complicated. We want to compute the available angular distance at
    // a radius of outerRadius - borderRadius because for small angular distances, this term limits.
    // We compute at r = outerRadius - borderRadius because this circle defines the center of the border corners.
    //
    // If the borderRadius is large, that value can become negative.
    // This causes the outer borders to lose their radius entirely, which is rather unexpected. To solve that, if borderRadius > outerRadius
    // we know that the thickness term will dominate and compute the limits at that point
    const computeOuterLimit = (val)=>{
        const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
        return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
    };
    return {
        outerStart: computeOuterLimit(o.outerStart),
        outerEnd: computeOuterLimit(o.outerEnd),
        innerStart: _limitValue(o.innerStart, 0, innerLimit),
        innerEnd: _limitValue(o.innerEnd, 0, innerLimit)
    };
}
/**
 * Convert (r, 𝜃) to (x, y)
 */ function rThetaToXY(r, theta, x, y) {
    return {
        x: x + r * Math.cos(theta),
        y: y + r * Math.sin(theta)
    };
}
/**
 * Path the arc, respecting border radius by separating into left and right halves.
 *
 *   Start      End
 *
 *    1--->a--->2    Outer
 *   /           \
 *   8           3
 *   |           |
 *   |           |
 *   7           4
 *   \           /
 *    6<---b<---5    Inner
 */ function pathArc(ctx, element, offset, spacing, end, circular) {
    const { x , y , startAngle: start , pixelMargin , innerRadius: innerR  } = element;
    const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
    const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
    let spacingOffset = 0;
    const alpha = end - start;
    if (spacing) {
        // When spacing is present, it is the same for all items
        // So we adjust the start and end angle of the arc such that
        // the distance is the same as it would be without the spacing
        const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
        const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
        const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
        const adjustedAngle = avNogSpacingRadius !== 0 ? alpha * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha;
        spacingOffset = (alpha - adjustedAngle) / 2;
    }
    const beta = Math.max(0.001, alpha * outerRadius - offset / PI) / outerRadius;
    const angleOffset = (alpha - beta) / 2;
    const startAngle = start + angleOffset + spacingOffset;
    const endAngle = end - angleOffset - spacingOffset;
    const { outerStart , outerEnd , innerStart , innerEnd  } = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
    const outerStartAdjustedRadius = outerRadius - outerStart;
    const outerEndAdjustedRadius = outerRadius - outerEnd;
    const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
    const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
    const innerStartAdjustedRadius = innerRadius + innerStart;
    const innerEndAdjustedRadius = innerRadius + innerEnd;
    const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
    const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
    ctx.beginPath();
    if (circular) {
        // The first arc segments from point 1 to point a to point 2
        const outerMidAdjustedAngle = (outerStartAdjustedAngle + outerEndAdjustedAngle) / 2;
        ctx.arc(x, y, outerRadius, outerStartAdjustedAngle, outerMidAdjustedAngle);
        ctx.arc(x, y, outerRadius, outerMidAdjustedAngle, outerEndAdjustedAngle);
        // The corner segment from point 2 to point 3
        if (outerEnd > 0) {
            const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x, y);
            ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
        }
        // The line from point 3 to point 4
        const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x, y);
        ctx.lineTo(p4.x, p4.y);
        // The corner segment from point 4 to point 5
        if (innerEnd > 0) {
            const pCenter1 = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x, y);
            ctx.arc(pCenter1.x, pCenter1.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
        }
        // The inner arc from point 5 to point b to point 6
        const innerMidAdjustedAngle = (endAngle - innerEnd / innerRadius + (startAngle + innerStart / innerRadius)) / 2;
        ctx.arc(x, y, innerRadius, endAngle - innerEnd / innerRadius, innerMidAdjustedAngle, true);
        ctx.arc(x, y, innerRadius, innerMidAdjustedAngle, startAngle + innerStart / innerRadius, true);
        // The corner segment from point 6 to point 7
        if (innerStart > 0) {
            const pCenter2 = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x, y);
            ctx.arc(pCenter2.x, pCenter2.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
        }
        // The line from point 7 to point 8
        const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x, y);
        ctx.lineTo(p8.x, p8.y);
        // The corner segment from point 8 to point 1
        if (outerStart > 0) {
            const pCenter3 = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x, y);
            ctx.arc(pCenter3.x, pCenter3.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
        }
    } else {
        ctx.moveTo(x, y);
        const outerStartX = Math.cos(outerStartAdjustedAngle) * outerRadius + x;
        const outerStartY = Math.sin(outerStartAdjustedAngle) * outerRadius + y;
        ctx.lineTo(outerStartX, outerStartY);
        const outerEndX = Math.cos(outerEndAdjustedAngle) * outerRadius + x;
        const outerEndY = Math.sin(outerEndAdjustedAngle) * outerRadius + y;
        ctx.lineTo(outerEndX, outerEndY);
    }
    ctx.closePath();
}
function drawArc(ctx, element, offset, spacing, circular) {
    const { fullCircles , startAngle , circumference  } = element;
    let endAngle = element.endAngle;
    if (fullCircles) {
        pathArc(ctx, element, offset, spacing, endAngle, circular);
        for(let i = 0; i < fullCircles; ++i){
            ctx.fill();
        }
        if (!isNaN(circumference)) {
            endAngle = startAngle + (circumference % TAU || TAU);
        }
    }
    pathArc(ctx, element, offset, spacing, endAngle, circular);
    ctx.fill();
    return endAngle;
}
function drawBorder(ctx, element, offset, spacing, circular) {
    const { fullCircles , startAngle , circumference , options  } = element;
    const { borderWidth , borderJoinStyle  } = options;
    const inner = options.borderAlign === 'inner';
    if (!borderWidth) {
        return;
    }
    if (inner) {
        ctx.lineWidth = borderWidth * 2;
        ctx.lineJoin = borderJoinStyle || 'round';
    } else {
        ctx.lineWidth = borderWidth;
        ctx.lineJoin = borderJoinStyle || 'bevel';
    }
    let endAngle = element.endAngle;
    if (fullCircles) {
        pathArc(ctx, element, offset, spacing, endAngle, circular);
        for(let i = 0; i < fullCircles; ++i){
            ctx.stroke();
        }
        if (!isNaN(circumference)) {
            endAngle = startAngle + (circumference % TAU || TAU);
        }
    }
    if (inner) {
        clipArc(ctx, element, endAngle);
    }
    if (!fullCircles) {
        pathArc(ctx, element, offset, spacing, endAngle, circular);
        ctx.stroke();
    }
}
class ArcElement extends Element$1 {
    static id = 'arc';
    static defaults = {
        borderAlign: 'center',
        borderColor: '#fff',
        borderJoinStyle: undefined,
        borderRadius: 0,
        borderWidth: 2,
        offset: 0,
        spacing: 0,
        angle: undefined,
        circular: true
    };
    static defaultRoutes = {
        backgroundColor: 'backgroundColor'
    };
    constructor(cfg){
        super();
        this.options = undefined;
        this.circumference = undefined;
        this.startAngle = undefined;
        this.endAngle = undefined;
        this.innerRadius = undefined;
        this.outerRadius = undefined;
        this.pixelMargin = 0;
        this.fullCircles = 0;
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    inRange(chartX, chartY, useFinalPosition) {
        const point = this.getProps([
            'x',
            'y'
        ], useFinalPosition);
        const { angle , distance  } = getAngleFromPoint(point, {
            x: chartX,
            y: chartY
        });
        const { startAngle , endAngle , innerRadius , outerRadius , circumference  } = this.getProps([
            'startAngle',
            'endAngle',
            'innerRadius',
            'outerRadius',
            'circumference'
        ], useFinalPosition);
        const rAdjust = this.options.spacing / 2;
        const _circumference = valueOrDefault(circumference, endAngle - startAngle);
        const betweenAngles = _circumference >= TAU || _angleBetween(angle, startAngle, endAngle);
        const withinRadius = _isBetween(distance, innerRadius + rAdjust, outerRadius + rAdjust);
        return betweenAngles && withinRadius;
    }
    getCenterPoint(useFinalPosition) {
        const { x , y , startAngle , endAngle , innerRadius , outerRadius  } = this.getProps([
            'x',
            'y',
            'startAngle',
            'endAngle',
            'innerRadius',
            'outerRadius',
            'circumference'
        ], useFinalPosition);
        const { offset , spacing  } = this.options;
        const halfAngle = (startAngle + endAngle) / 2;
        const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
        return {
            x: x + Math.cos(halfAngle) * halfRadius,
            y: y + Math.sin(halfAngle) * halfRadius
        };
    }
    tooltipPosition(useFinalPosition) {
        return this.getCenterPoint(useFinalPosition);
    }
    draw(ctx) {
        const { options , circumference  } = this;
        const offset = (options.offset || 0) / 4;
        const spacing = (options.spacing || 0) / 2;
        const circular = options.circular;
        this.pixelMargin = options.borderAlign === 'inner' ? 0.33 : 0;
        this.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;
        if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) {
            return;
        }
        ctx.save();
        const halfAngle = (this.startAngle + this.endAngle) / 2;
        ctx.translate(Math.cos(halfAngle) * offset, Math.sin(halfAngle) * offset);
        const fix = 1 - Math.sin(Math.min(PI, circumference || 0));
        const radiusOffset = offset * fix;
        ctx.fillStyle = options.backgroundColor;
        ctx.strokeStyle = options.borderColor;
        drawArc(ctx, this, radiusOffset, spacing, circular);
        drawBorder(ctx, this, radiusOffset, spacing, circular);
        ctx.restore();
    }
}

function setStyle(ctx, options, style = options) {
    ctx.lineCap = valueOrDefault(style.borderCapStyle, options.borderCapStyle);
    ctx.setLineDash(valueOrDefault(style.borderDash, options.borderDash));
    ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options.borderDashOffset);
    ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options.borderJoinStyle);
    ctx.lineWidth = valueOrDefault(style.borderWidth, options.borderWidth);
    ctx.strokeStyle = valueOrDefault(style.borderColor, options.borderColor);
}
function lineTo(ctx, previous, target) {
    ctx.lineTo(target.x, target.y);
}
function getLineMethod(options) {
    if (options.stepped) {
        return _steppedLineTo;
    }
    if (options.tension || options.cubicInterpolationMode === 'monotone') {
        return _bezierCurveTo;
    }
    return lineTo;
}
function pathVars(points, segment, params = {}) {
    const count = points.length;
    const { start: paramsStart = 0 , end: paramsEnd = count - 1  } = params;
    const { start: segmentStart , end: segmentEnd  } = segment;
    const start = Math.max(paramsStart, segmentStart);
    const end = Math.min(paramsEnd, segmentEnd);
    const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
    return {
        count,
        start,
        loop: segment.loop,
        ilen: end < start && !outside ? count + end - start : end - start
    };
}
 function pathSegment(ctx, line, segment, params) {
    const { points , options  } = line;
    const { count , start , loop , ilen  } = pathVars(points, segment, params);
    const lineMethod = getLineMethod(options);
    let { move =true , reverse  } = params || {};
    let i, point, prev;
    for(i = 0; i <= ilen; ++i){
        point = points[(start + (reverse ? ilen - i : i)) % count];
        if (point.skip) {
            continue;
        } else if (move) {
            ctx.moveTo(point.x, point.y);
            move = false;
        } else {
            lineMethod(ctx, prev, point, reverse, options.stepped);
        }
        prev = point;
    }
    if (loop) {
        point = points[(start + (reverse ? ilen : 0)) % count];
        lineMethod(ctx, prev, point, reverse, options.stepped);
    }
    return !!loop;
}
 function fastPathSegment(ctx, line, segment, params) {
    const points = line.points;
    const { count , start , ilen  } = pathVars(points, segment, params);
    const { move =true , reverse  } = params || {};
    let avgX = 0;
    let countX = 0;
    let i, point, prevX, minY, maxY, lastY;
    const pointIndex = (index)=>(start + (reverse ? ilen - index : index)) % count;
    const drawX = ()=>{
        if (minY !== maxY) {
            ctx.lineTo(avgX, maxY);
            ctx.lineTo(avgX, minY);
            ctx.lineTo(avgX, lastY);
        }
    };
    if (move) {
        point = points[pointIndex(0)];
        ctx.moveTo(point.x, point.y);
    }
    for(i = 0; i <= ilen; ++i){
        point = points[pointIndex(i)];
        if (point.skip) {
            continue;
        }
        const x = point.x;
        const y = point.y;
        const truncX = x | 0;
        if (truncX === prevX) {
            if (y < minY) {
                minY = y;
            } else if (y > maxY) {
                maxY = y;
            }
            avgX = (countX * avgX + x) / ++countX;
        } else {
            drawX();
            ctx.lineTo(x, y);
            prevX = truncX;
            countX = 0;
            minY = maxY = y;
        }
        lastY = y;
    }
    drawX();
}
 function _getSegmentMethod(line) {
    const opts = line.options;
    const borderDash = opts.borderDash && opts.borderDash.length;
    const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== 'monotone' && !opts.stepped && !borderDash;
    return useFastPath ? fastPathSegment : pathSegment;
}
 function _getInterpolationMethod(options) {
    if (options.stepped) {
        return _steppedInterpolation;
    }
    if (options.tension || options.cubicInterpolationMode === 'monotone') {
        return _bezierInterpolation;
    }
    return _pointInLine;
}
function strokePathWithCache(ctx, line, start, count) {
    let path = line._path;
    if (!path) {
        path = line._path = new Path2D();
        if (line.path(path, start, count)) {
            path.closePath();
        }
    }
    setStyle(ctx, line.options);
    ctx.stroke(path);
}
function strokePathDirect(ctx, line, start, count) {
    const { segments , options  } = line;
    const segmentMethod = _getSegmentMethod(line);
    for (const segment of segments){
        setStyle(ctx, options, segment.style);
        ctx.beginPath();
        if (segmentMethod(ctx, line, segment, {
            start,
            end: start + count - 1
        })) {
            ctx.closePath();
        }
        ctx.stroke();
    }
}
const usePath2D = typeof Path2D === 'function';
function draw(ctx, line, start, count) {
    if (usePath2D && !line.options.segment) {
        strokePathWithCache(ctx, line, start, count);
    } else {
        strokePathDirect(ctx, line, start, count);
    }
}
class LineElement extends Element$1 {
    static id = 'line';
 static defaults = {
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: 'miter',
        borderWidth: 3,
        capBezierPoints: true,
        cubicInterpolationMode: 'default',
        fill: false,
        spanGaps: false,
        stepped: false,
        tension: 0
    };
 static defaultRoutes = {
        backgroundColor: 'backgroundColor',
        borderColor: 'borderColor'
    };
    static descriptors = {
        _scriptable: true,
        _indexable: (name)=>name !== 'borderDash' && name !== 'fill'
    };
    constructor(cfg){
        super();
        this.animated = true;
        this.options = undefined;
        this._chart = undefined;
        this._loop = undefined;
        this._fullLoop = undefined;
        this._path = undefined;
        this._points = undefined;
        this._segments = undefined;
        this._decimated = false;
        this._pointsUpdated = false;
        this._datasetIndex = undefined;
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    updateControlPoints(chartArea, indexAxis) {
        const options = this.options;
        if ((options.tension || options.cubicInterpolationMode === 'monotone') && !options.stepped && !this._pointsUpdated) {
            const loop = options.spanGaps ? this._loop : this._fullLoop;
            _updateBezierControlPoints(this._points, options, chartArea, loop, indexAxis);
            this._pointsUpdated = true;
        }
    }
    set points(points) {
        this._points = points;
        delete this._segments;
        delete this._path;
        this._pointsUpdated = false;
    }
    get points() {
        return this._points;
    }
    get segments() {
        return this._segments || (this._segments = _computeSegments(this, this.options.segment));
    }
 first() {
        const segments = this.segments;
        const points = this.points;
        return segments.length && points[segments[0].start];
    }
 last() {
        const segments = this.segments;
        const points = this.points;
        const count = segments.length;
        return count && points[segments[count - 1].end];
    }
 interpolate(point, property) {
        const options = this.options;
        const value = point[property];
        const points = this.points;
        const segments = _boundSegments(this, {
            property,
            start: value,
            end: value
        });
        if (!segments.length) {
            return;
        }
        const result = [];
        const _interpolate = _getInterpolationMethod(options);
        let i, ilen;
        for(i = 0, ilen = segments.length; i < ilen; ++i){
            const { start , end  } = segments[i];
            const p1 = points[start];
            const p2 = points[end];
            if (p1 === p2) {
                result.push(p1);
                continue;
            }
            const t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
            const interpolated = _interpolate(p1, p2, t, options.stepped);
            interpolated[property] = point[property];
            result.push(interpolated);
        }
        return result.length === 1 ? result[0] : result;
    }
 pathSegment(ctx, segment, params) {
        const segmentMethod = _getSegmentMethod(this);
        return segmentMethod(ctx, this, segment, params);
    }
 path(ctx, start, count) {
        const segments = this.segments;
        const segmentMethod = _getSegmentMethod(this);
        let loop = this._loop;
        start = start || 0;
        count = count || this.points.length - start;
        for (const segment of segments){
            loop &= segmentMethod(ctx, this, segment, {
                start,
                end: start + count - 1
            });
        }
        return !!loop;
    }
 draw(ctx, chartArea, start, count) {
        const options = this.options || {};
        const points = this.points || [];
        if (points.length && options.borderWidth) {
            ctx.save();
            draw(ctx, this, start, count);
            ctx.restore();
        }
        if (this.animated) {
            this._pointsUpdated = false;
            this._path = undefined;
        }
    }
}

function inRange$1(el, pos, axis, useFinalPosition) {
    const options = el.options;
    const { [axis]: value  } = el.getProps([
        axis
    ], useFinalPosition);
    return Math.abs(pos - value) < options.radius + options.hitRadius;
}
class PointElement extends Element$1 {
    static id = 'point';
    /**
   * @type {any}
   */ static defaults = {
        borderWidth: 1,
        hitRadius: 1,
        hoverBorderWidth: 1,
        hoverRadius: 4,
        pointStyle: 'circle',
        radius: 3,
        rotation: 0
    };
    /**
   * @type {any}
   */ static defaultRoutes = {
        backgroundColor: 'backgroundColor',
        borderColor: 'borderColor'
    };
    constructor(cfg){
        super();
        this.options = undefined;
        this.parsed = undefined;
        this.skip = undefined;
        this.stop = undefined;
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    inRange(mouseX, mouseY, useFinalPosition) {
        const options = this.options;
        const { x , y  } = this.getProps([
            'x',
            'y'
        ], useFinalPosition);
        return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
    }
    inXRange(mouseX, useFinalPosition) {
        return inRange$1(this, mouseX, 'x', useFinalPosition);
    }
    inYRange(mouseY, useFinalPosition) {
        return inRange$1(this, mouseY, 'y', useFinalPosition);
    }
    getCenterPoint(useFinalPosition) {
        const { x , y  } = this.getProps([
            'x',
            'y'
        ], useFinalPosition);
        return {
            x,
            y
        };
    }
    size(options) {
        options = options || this.options || {};
        let radius = options.radius || 0;
        radius = Math.max(radius, radius && options.hoverRadius || 0);
        const borderWidth = radius && options.borderWidth || 0;
        return (radius + borderWidth) * 2;
    }
    draw(ctx, area) {
        const options = this.options;
        if (this.skip || options.radius < 0.1 || !_isPointInArea(this, area, this.size(options) / 2)) {
            return;
        }
        ctx.strokeStyle = options.borderColor;
        ctx.lineWidth = options.borderWidth;
        ctx.fillStyle = options.backgroundColor;
        drawPoint(ctx, options, this.x, this.y);
    }
    getRange() {
        const options = this.options || {};
        // @ts-expect-error Fallbacks should never be hit in practice
        return options.radius + options.hitRadius;
    }
}

function getBarBounds(bar, useFinalPosition) {
    const { x , y , base , width , height  } =  bar.getProps([
        'x',
        'y',
        'base',
        'width',
        'height'
    ], useFinalPosition);
    let left, right, top, bottom, half;
    if (bar.horizontal) {
        half = height / 2;
        left = Math.min(x, base);
        right = Math.max(x, base);
        top = y - half;
        bottom = y + half;
    } else {
        half = width / 2;
        left = x - half;
        right = x + half;
        top = Math.min(y, base);
        bottom = Math.max(y, base);
    }
    return {
        left,
        top,
        right,
        bottom
    };
}
function skipOrLimit(skip, value, min, max) {
    return skip ? 0 : _limitValue(value, min, max);
}
function parseBorderWidth(bar, maxW, maxH) {
    const value = bar.options.borderWidth;
    const skip = bar.borderSkipped;
    const o = toTRBL(value);
    return {
        t: skipOrLimit(skip.top, o.top, 0, maxH),
        r: skipOrLimit(skip.right, o.right, 0, maxW),
        b: skipOrLimit(skip.bottom, o.bottom, 0, maxH),
        l: skipOrLimit(skip.left, o.left, 0, maxW)
    };
}
function parseBorderRadius(bar, maxW, maxH) {
    const { enableBorderRadius  } = bar.getProps([
        'enableBorderRadius'
    ]);
    const value = bar.options.borderRadius;
    const o = toTRBLCorners(value);
    const maxR = Math.min(maxW, maxH);
    const skip = bar.borderSkipped;
    const enableBorder = enableBorderRadius || isObject(value);
    return {
        topLeft: skipOrLimit(!enableBorder || skip.top || skip.left, o.topLeft, 0, maxR),
        topRight: skipOrLimit(!enableBorder || skip.top || skip.right, o.topRight, 0, maxR),
        bottomLeft: skipOrLimit(!enableBorder || skip.bottom || skip.left, o.bottomLeft, 0, maxR),
        bottomRight: skipOrLimit(!enableBorder || skip.bottom || skip.right, o.bottomRight, 0, maxR)
    };
}
function boundingRects(bar) {
    const bounds = getBarBounds(bar);
    const width = bounds.right - bounds.left;
    const height = bounds.bottom - bounds.top;
    const border = parseBorderWidth(bar, width / 2, height / 2);
    const radius = parseBorderRadius(bar, width / 2, height / 2);
    return {
        outer: {
            x: bounds.left,
            y: bounds.top,
            w: width,
            h: height,
            radius
        },
        inner: {
            x: bounds.left + border.l,
            y: bounds.top + border.t,
            w: width - border.l - border.r,
            h: height - border.t - border.b,
            radius: {
                topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
                topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
                bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
                bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
            }
        }
    };
}
function inRange(bar, x, y, useFinalPosition) {
    const skipX = x === null;
    const skipY = y === null;
    const skipBoth = skipX && skipY;
    const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
    return bounds && (skipX || _isBetween(x, bounds.left, bounds.right)) && (skipY || _isBetween(y, bounds.top, bounds.bottom));
}
function hasRadius(radius) {
    return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
}
 function addNormalRectPath(ctx, rect) {
    ctx.rect(rect.x, rect.y, rect.w, rect.h);
}
function inflateRect(rect, amount, refRect = {}) {
    const x = rect.x !== refRect.x ? -amount : 0;
    const y = rect.y !== refRect.y ? -amount : 0;
    const w = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x;
    const h = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y;
    return {
        x: rect.x + x,
        y: rect.y + y,
        w: rect.w + w,
        h: rect.h + h,
        radius: rect.radius
    };
}
class BarElement extends Element$1 {
    static id = 'bar';
 static defaults = {
        borderSkipped: 'start',
        borderWidth: 0,
        borderRadius: 0,
        inflateAmount: 'auto',
        pointStyle: undefined
    };
 static defaultRoutes = {
        backgroundColor: 'backgroundColor',
        borderColor: 'borderColor'
    };
    constructor(cfg){
        super();
        this.options = undefined;
        this.horizontal = undefined;
        this.base = undefined;
        this.width = undefined;
        this.height = undefined;
        this.inflateAmount = undefined;
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    draw(ctx) {
        const { inflateAmount , options: { borderColor , backgroundColor  }  } = this;
        const { inner , outer  } = boundingRects(this);
        const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
        ctx.save();
        if (outer.w !== inner.w || outer.h !== inner.h) {
            ctx.beginPath();
            addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
            ctx.clip();
            addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
            ctx.fillStyle = borderColor;
            ctx.fill('evenodd');
        }
        ctx.beginPath();
        addRectPath(ctx, inflateRect(inner, inflateAmount));
        ctx.fillStyle = backgroundColor;
        ctx.fill();
        ctx.restore();
    }
    inRange(mouseX, mouseY, useFinalPosition) {
        return inRange(this, mouseX, mouseY, useFinalPosition);
    }
    inXRange(mouseX, useFinalPosition) {
        return inRange(this, mouseX, null, useFinalPosition);
    }
    inYRange(mouseY, useFinalPosition) {
        return inRange(this, null, mouseY, useFinalPosition);
    }
    getCenterPoint(useFinalPosition) {
        const { x , y , base , horizontal  } =  this.getProps([
            'x',
            'y',
            'base',
            'horizontal'
        ], useFinalPosition);
        return {
            x: horizontal ? (x + base) / 2 : x,
            y: horizontal ? y : (y + base) / 2
        };
    }
    getRange(axis) {
        return axis === 'x' ? this.width / 2 : this.height / 2;
    }
}

var elements = /*#__PURE__*/Object.freeze({
__proto__: null,
ArcElement: ArcElement,
LineElement: LineElement,
PointElement: PointElement,
BarElement: BarElement
});

const BORDER_COLORS = [
    'rgb(54, 162, 235)',
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)' // grey
];
// Border colors with 50% transparency
const BACKGROUND_COLORS = /* #__PURE__ */ BORDER_COLORS.map((color)=>color.replace('rgb(', 'rgba(').replace(')', ', 0.5)'));
function getBorderColor(i) {
    return BORDER_COLORS[i % BORDER_COLORS.length];
}
function getBackgroundColor(i) {
    return BACKGROUND_COLORS[i % BACKGROUND_COLORS.length];
}
function colorizeDefaultDataset(dataset, i) {
    dataset.borderColor = getBorderColor(i);
    dataset.backgroundColor = getBackgroundColor(i);
    return ++i;
}
function colorizeDoughnutDataset(dataset, i) {
    dataset.backgroundColor = dataset.data.map(()=>getBorderColor(i++));
    return i;
}
function colorizePolarAreaDataset(dataset, i) {
    dataset.backgroundColor = dataset.data.map(()=>getBackgroundColor(i++));
    return i;
}
function getColorizer(chart) {
    let i = 0;
    return (dataset, datasetIndex)=>{
        const controller = chart.getDatasetMeta(datasetIndex).controller;
        if (controller instanceof DoughnutController) {
            i = colorizeDoughnutDataset(dataset, i);
        } else if (controller instanceof PolarAreaController) {
            i = colorizePolarAreaDataset(dataset, i);
        } else if (controller) {
            i = colorizeDefaultDataset(dataset, i);
        }
    };
}
function containsColorsDefinitions(descriptors) {
    let k;
    for(k in descriptors){
        if (descriptors[k].borderColor || descriptors[k].backgroundColor) {
            return true;
        }
    }
    return false;
}
var plugin_colors = {
    id: 'colors',
    defaults: {
        enabled: true,
        forceOverride: false
    },
    beforeLayout (chart, _args, options) {
        if (!options.enabled) {
            return;
        }
        const { options: { elements  } , data: { datasets  }  } = chart.config;
        if (!options.forceOverride && (containsColorsDefinitions(datasets) || elements && containsColorsDefinitions(elements))) {
            return;
        }
        const colorizer = getColorizer(chart);
        datasets.forEach(colorizer);
    }
};

function lttbDecimation(data, start, count, availableWidth, options) {
 const samples = options.samples || availableWidth;
    if (samples >= count) {
        return data.slice(start, start + count);
    }
    const decimated = [];
    const bucketWidth = (count - 2) / (samples - 2);
    let sampledIndex = 0;
    const endIndex = start + count - 1;
    let a = start;
    let i, maxAreaPoint, maxArea, area, nextA;
    decimated[sampledIndex++] = data[a];
    for(i = 0; i < samples - 2; i++){
        let avgX = 0;
        let avgY = 0;
        let j;
        const avgRangeStart = Math.floor((i + 1) * bucketWidth) + 1 + start;
        const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketWidth) + 1, count) + start;
        const avgRangeLength = avgRangeEnd - avgRangeStart;
        for(j = avgRangeStart; j < avgRangeEnd; j++){
            avgX += data[j].x;
            avgY += data[j].y;
        }
        avgX /= avgRangeLength;
        avgY /= avgRangeLength;
        const rangeOffs = Math.floor(i * bucketWidth) + 1 + start;
        const rangeTo = Math.min(Math.floor((i + 1) * bucketWidth) + 1, count) + start;
        const { x: pointAx , y: pointAy  } = data[a];
        maxArea = area = -1;
        for(j = rangeOffs; j < rangeTo; j++){
            area = 0.5 * Math.abs((pointAx - avgX) * (data[j].y - pointAy) - (pointAx - data[j].x) * (avgY - pointAy));
            if (area > maxArea) {
                maxArea = area;
                maxAreaPoint = data[j];
                nextA = j;
            }
        }
        decimated[sampledIndex++] = maxAreaPoint;
        a = nextA;
    }
    decimated[sampledIndex++] = data[endIndex];
    return decimated;
}
function minMaxDecimation(data, start, count, availableWidth) {
    let avgX = 0;
    let countX = 0;
    let i, point, x, y, prevX, minIndex, maxIndex, startIndex, minY, maxY;
    const decimated = [];
    const endIndex = start + count - 1;
    const xMin = data[start].x;
    const xMax = data[endIndex].x;
    const dx = xMax - xMin;
    for(i = start; i < start + count; ++i){
        point = data[i];
        x = (point.x - xMin) / dx * availableWidth;
        y = point.y;
        const truncX = x | 0;
        if (truncX === prevX) {
            if (y < minY) {
                minY = y;
                minIndex = i;
            } else if (y > maxY) {
                maxY = y;
                maxIndex = i;
            }
            avgX = (countX * avgX + point.x) / ++countX;
        } else {
            const lastIndex = i - 1;
            if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
                const intermediateIndex1 = Math.min(minIndex, maxIndex);
                const intermediateIndex2 = Math.max(minIndex, maxIndex);
                if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) {
                    decimated.push({
                        ...data[intermediateIndex1],
                        x: avgX
                    });
                }
                if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) {
                    decimated.push({
                        ...data[intermediateIndex2],
                        x: avgX
                    });
                }
            }
            if (i > 0 && lastIndex !== startIndex) {
                decimated.push(data[lastIndex]);
            }
            decimated.push(point);
            prevX = truncX;
            countX = 0;
            minY = maxY = y;
            minIndex = maxIndex = startIndex = i;
        }
    }
    return decimated;
}
function cleanDecimatedDataset(dataset) {
    if (dataset._decimated) {
        const data = dataset._data;
        delete dataset._decimated;
        delete dataset._data;
        Object.defineProperty(dataset, 'data', {
            value: data
        });
    }
}
function cleanDecimatedData(chart) {
    chart.data.datasets.forEach((dataset)=>{
        cleanDecimatedDataset(dataset);
    });
}
function getStartAndCountOfVisiblePointsSimplified(meta, points) {
    const pointCount = points.length;
    let start = 0;
    let count;
    const { iScale  } = meta;
    const { min , max , minDefined , maxDefined  } = iScale.getUserBounds();
    if (minDefined) {
        start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
    }
    if (maxDefined) {
        count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start;
    } else {
        count = pointCount - start;
    }
    return {
        start,
        count
    };
}
var plugin_decimation = {
    id: 'decimation',
    defaults: {
        algorithm: 'min-max',
        enabled: false
    },
    beforeElementsUpdate: (chart, args, options)=>{
        if (!options.enabled) {
            cleanDecimatedData(chart);
            return;
        }
        const availableWidth = chart.width;
        chart.data.datasets.forEach((dataset, datasetIndex)=>{
            const { _data , indexAxis  } = dataset;
            const meta = chart.getDatasetMeta(datasetIndex);
            const data = _data || dataset.data;
            if (resolve([
                indexAxis,
                chart.options.indexAxis
            ]) === 'y') {
                return;
            }
            if (!meta.controller.supportsDecimation) {
                return;
            }
            const xAxis = chart.scales[meta.xAxisID];
            if (xAxis.type !== 'linear' && xAxis.type !== 'time') {
                return;
            }
            if (chart.options.parsing) {
                return;
            }
            let { start , count  } = getStartAndCountOfVisiblePointsSimplified(meta, data);
            const threshold = options.threshold || 4 * availableWidth;
            if (count <= threshold) {
                cleanDecimatedDataset(dataset);
                return;
            }
            if (isNullOrUndef(_data)) {
                dataset._data = data;
                delete dataset.data;
                Object.defineProperty(dataset, 'data', {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        return this._decimated;
                    },
                    set: function(d) {
                        this._data = d;
                    }
                });
            }
            let decimated;
            switch(options.algorithm){
                case 'lttb':
                    decimated = lttbDecimation(data, start, count, availableWidth, options);
                    break;
                case 'min-max':
                    decimated = minMaxDecimation(data, start, count, availableWidth);
                    break;
                default:
                    throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
            }
            dataset._decimated = decimated;
        });
    },
    destroy (chart) {
        cleanDecimatedData(chart);
    }
};

function _segments(line, target, property) {
    const segments = line.segments;
    const points = line.points;
    const tpoints = target.points;
    const parts = [];
    for (const segment of segments){
        let { start , end  } = segment;
        end = _findSegmentEnd(start, end, points);
        const bounds = _getBounds(property, points[start], points[end], segment.loop);
        if (!target.segments) {
            parts.push({
                source: segment,
                target: bounds,
                start: points[start],
                end: points[end]
            });
            continue;
        }
        const targetSegments = _boundSegments(target, bounds);
        for (const tgt of targetSegments){
            const subBounds = _getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
            const fillSources = _boundSegment(segment, points, subBounds);
            for (const fillSource of fillSources){
                parts.push({
                    source: fillSource,
                    target: tgt,
                    start: {
                        [property]: _getEdge(bounds, subBounds, 'start', Math.max)
                    },
                    end: {
                        [property]: _getEdge(bounds, subBounds, 'end', Math.min)
                    }
                });
            }
        }
    }
    return parts;
}
function _getBounds(property, first, last, loop) {
    if (loop) {
        return;
    }
    let start = first[property];
    let end = last[property];
    if (property === 'angle') {
        start = _normalizeAngle(start);
        end = _normalizeAngle(end);
    }
    return {
        property,
        start,
        end
    };
}
function _pointsFromSegments(boundary, line) {
    const { x =null , y =null  } = boundary || {};
    const linePoints = line.points;
    const points = [];
    line.segments.forEach(({ start , end  })=>{
        end = _findSegmentEnd(start, end, linePoints);
        const first = linePoints[start];
        const last = linePoints[end];
        if (y !== null) {
            points.push({
                x: first.x,
                y
            });
            points.push({
                x: last.x,
                y
            });
        } else if (x !== null) {
            points.push({
                x,
                y: first.y
            });
            points.push({
                x,
                y: last.y
            });
        }
    });
    return points;
}
function _findSegmentEnd(start, end, points) {
    for(; end > start; end--){
        const point = points[end];
        if (!isNaN(point.x) && !isNaN(point.y)) {
            break;
        }
    }
    return end;
}
function _getEdge(a, b, prop, fn) {
    if (a && b) {
        return fn(a[prop], b[prop]);
    }
    return a ? a[prop] : b ? b[prop] : 0;
}

function _createBoundaryLine(boundary, line) {
    let points = [];
    let _loop = false;
    if (isArray(boundary)) {
        _loop = true;
        points = boundary;
    } else {
        points = _pointsFromSegments(boundary, line);
    }
    return points.length ? new LineElement({
        points,
        options: {
            tension: 0
        },
        _loop,
        _fullLoop: _loop
    }) : null;
}
function _shouldApplyFill(source) {
    return source && source.fill !== false;
}

function _resolveTarget(sources, index, propagate) {
    const source = sources[index];
    let fill = source.fill;
    const visited = [
        index
    ];
    let target;
    if (!propagate) {
        return fill;
    }
    while(fill !== false && visited.indexOf(fill) === -1){
        if (!isNumberFinite(fill)) {
            return fill;
        }
        target = sources[fill];
        if (!target) {
            return false;
        }
        if (target.visible) {
            return fill;
        }
        visited.push(fill);
        fill = target.fill;
    }
    return false;
}
 function _decodeFill(line, index, count) {
     const fill = parseFillOption(line);
    if (isObject(fill)) {
        return isNaN(fill.value) ? false : fill;
    }
    let target = parseFloat(fill);
    if (isNumberFinite(target) && Math.floor(target) === target) {
        return decodeTargetIndex(fill[0], index, target, count);
    }
    return [
        'origin',
        'start',
        'end',
        'stack',
        'shape'
    ].indexOf(fill) >= 0 && fill;
}
function decodeTargetIndex(firstCh, index, target, count) {
    if (firstCh === '-' || firstCh === '+') {
        target = index + target;
    }
    if (target === index || target < 0 || target >= count) {
        return false;
    }
    return target;
}
 function _getTargetPixel(fill, scale) {
    let pixel = null;
    if (fill === 'start') {
        pixel = scale.bottom;
    } else if (fill === 'end') {
        pixel = scale.top;
    } else if (isObject(fill)) {
        pixel = scale.getPixelForValue(fill.value);
    } else if (scale.getBasePixel) {
        pixel = scale.getBasePixel();
    }
    return pixel;
}
 function _getTargetValue(fill, scale, startValue) {
    let value;
    if (fill === 'start') {
        value = startValue;
    } else if (fill === 'end') {
        value = scale.options.reverse ? scale.min : scale.max;
    } else if (isObject(fill)) {
        value = fill.value;
    } else {
        value = scale.getBaseValue();
    }
    return value;
}
 function parseFillOption(line) {
    const options = line.options;
    const fillOption = options.fill;
    let fill = valueOrDefault(fillOption && fillOption.target, fillOption);
    if (fill === undefined) {
        fill = !!options.backgroundColor;
    }
    if (fill === false || fill === null) {
        return false;
    }
    if (fill === true) {
        return 'origin';
    }
    return fill;
}

function _buildStackLine(source) {
    const { scale , index , line  } = source;
    const points = [];
    const segments = line.segments;
    const sourcePoints = line.points;
    const linesBelow = getLinesBelow(scale, index);
    linesBelow.push(_createBoundaryLine({
        x: null,
        y: scale.bottom
    }, line));
    for(let i = 0; i < segments.length; i++){
        const segment = segments[i];
        for(let j = segment.start; j <= segment.end; j++){
            addPointsBelow(points, sourcePoints[j], linesBelow);
        }
    }
    return new LineElement({
        points,
        options: {}
    });
}
 function getLinesBelow(scale, index) {
    const below = [];
    const metas = scale.getMatchingVisibleMetas('line');
    for(let i = 0; i < metas.length; i++){
        const meta = metas[i];
        if (meta.index === index) {
            break;
        }
        if (!meta.hidden) {
            below.unshift(meta.dataset);
        }
    }
    return below;
}
 function addPointsBelow(points, sourcePoint, linesBelow) {
    const postponed = [];
    for(let j = 0; j < linesBelow.length; j++){
        const line = linesBelow[j];
        const { first , last , point  } = findPoint(line, sourcePoint, 'x');
        if (!point || first && last) {
            continue;
        }
        if (first) {
            postponed.unshift(point);
        } else {
            points.push(point);
            if (!last) {
                break;
            }
        }
    }
    points.push(...postponed);
}
 function findPoint(line, sourcePoint, property) {
    const point = line.interpolate(sourcePoint, property);
    if (!point) {
        return {};
    }
    const pointValue = point[property];
    const segments = line.segments;
    const linePoints = line.points;
    let first = false;
    let last = false;
    for(let i = 0; i < segments.length; i++){
        const segment = segments[i];
        const firstValue = linePoints[segment.start][property];
        const lastValue = linePoints[segment.end][property];
        if (_isBetween(pointValue, firstValue, lastValue)) {
            first = pointValue === firstValue;
            last = pointValue === lastValue;
            break;
        }
    }
    return {
        first,
        last,
        point
    };
}

class simpleArc {
    constructor(opts){
        this.x = opts.x;
        this.y = opts.y;
        this.radius = opts.radius;
    }
    pathSegment(ctx, bounds, opts) {
        const { x , y , radius  } = this;
        bounds = bounds || {
            start: 0,
            end: TAU
        };
        ctx.arc(x, y, radius, bounds.end, bounds.start, true);
        return !opts.bounds;
    }
    interpolate(point) {
        const { x , y , radius  } = this;
        const angle = point.angle;
        return {
            x: x + Math.cos(angle) * radius,
            y: y + Math.sin(angle) * radius,
            angle
        };
    }
}

function _getTarget(source) {
    const { chart , fill , line  } = source;
    if (isNumberFinite(fill)) {
        return getLineByIndex(chart, fill);
    }
    if (fill === 'stack') {
        return _buildStackLine(source);
    }
    if (fill === 'shape') {
        return true;
    }
    const boundary = computeBoundary(source);
    if (boundary instanceof simpleArc) {
        return boundary;
    }
    return _createBoundaryLine(boundary, line);
}
 function getLineByIndex(chart, index) {
    const meta = chart.getDatasetMeta(index);
    const visible = meta && chart.isDatasetVisible(index);
    return visible ? meta.dataset : null;
}
function computeBoundary(source) {
    const scale = source.scale || {};
    if (scale.getPointPositionForValue) {
        return computeCircularBoundary(source);
    }
    return computeLinearBoundary(source);
}
function computeLinearBoundary(source) {
    const { scale ={} , fill  } = source;
    const pixel = _getTargetPixel(fill, scale);
    if (isNumberFinite(pixel)) {
        const horizontal = scale.isHorizontal();
        return {
            x: horizontal ? pixel : null,
            y: horizontal ? null : pixel
        };
    }
    return null;
}
function computeCircularBoundary(source) {
    const { scale , fill  } = source;
    const options = scale.options;
    const length = scale.getLabels().length;
    const start = options.reverse ? scale.max : scale.min;
    const value = _getTargetValue(fill, scale, start);
    const target = [];
    if (options.grid.circular) {
        const center = scale.getPointPositionForValue(0, start);
        return new simpleArc({
            x: center.x,
            y: center.y,
            radius: scale.getDistanceFromCenterForValue(value)
        });
    }
    for(let i = 0; i < length; ++i){
        target.push(scale.getPointPositionForValue(i, value));
    }
    return target;
}

function _drawfill(ctx, source, area) {
    const target = _getTarget(source);
    const { line , scale , axis  } = source;
    const lineOpts = line.options;
    const fillOption = lineOpts.fill;
    const color = lineOpts.backgroundColor;
    const { above =color , below =color  } = fillOption || {};
    if (target && line.points.length) {
        clipArea(ctx, area);
        doFill(ctx, {
            line,
            target,
            above,
            below,
            area,
            scale,
            axis
        });
        unclipArea(ctx);
    }
}
function doFill(ctx, cfg) {
    const { line , target , above , below , area , scale  } = cfg;
    const property = line._loop ? 'angle' : cfg.axis;
    ctx.save();
    if (property === 'x' && below !== above) {
        clipVertical(ctx, target, area.top);
        fill(ctx, {
            line,
            target,
            color: above,
            scale,
            property
        });
        ctx.restore();
        ctx.save();
        clipVertical(ctx, target, area.bottom);
    }
    fill(ctx, {
        line,
        target,
        color: below,
        scale,
        property
    });
    ctx.restore();
}
function clipVertical(ctx, target, clipY) {
    const { segments , points  } = target;
    let first = true;
    let lineLoop = false;
    ctx.beginPath();
    for (const segment of segments){
        const { start , end  } = segment;
        const firstPoint = points[start];
        const lastPoint = points[_findSegmentEnd(start, end, points)];
        if (first) {
            ctx.moveTo(firstPoint.x, firstPoint.y);
            first = false;
        } else {
            ctx.lineTo(firstPoint.x, clipY);
            ctx.lineTo(firstPoint.x, firstPoint.y);
        }
        lineLoop = !!target.pathSegment(ctx, segment, {
            move: lineLoop
        });
        if (lineLoop) {
            ctx.closePath();
        } else {
            ctx.lineTo(lastPoint.x, clipY);
        }
    }
    ctx.lineTo(target.first().x, clipY);
    ctx.closePath();
    ctx.clip();
}
function fill(ctx, cfg) {
    const { line , target , property , color , scale  } = cfg;
    const segments = _segments(line, target, property);
    for (const { source: src , target: tgt , start , end  } of segments){
        const { style: { backgroundColor =color  } = {}  } = src;
        const notShape = target !== true;
        ctx.save();
        ctx.fillStyle = backgroundColor;
        clipBounds(ctx, scale, notShape && _getBounds(property, start, end));
        ctx.beginPath();
        const lineLoop = !!line.pathSegment(ctx, src);
        let loop;
        if (notShape) {
            if (lineLoop) {
                ctx.closePath();
            } else {
                interpolatedLineTo(ctx, target, end, property);
            }
            const targetLoop = !!target.pathSegment(ctx, tgt, {
                move: lineLoop,
                reverse: true
            });
            loop = lineLoop && targetLoop;
            if (!loop) {
                interpolatedLineTo(ctx, target, start, property);
            }
        }
        ctx.closePath();
        ctx.fill(loop ? 'evenodd' : 'nonzero');
        ctx.restore();
    }
}
function clipBounds(ctx, scale, bounds) {
    const { top , bottom  } = scale.chart.chartArea;
    const { property , start , end  } = bounds || {};
    if (property === 'x') {
        ctx.beginPath();
        ctx.rect(start, top, end - start, bottom - top);
        ctx.clip();
    }
}
function interpolatedLineTo(ctx, target, point, property) {
    const interpolatedPoint = target.interpolate(point, property);
    if (interpolatedPoint) {
        ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
    }
}

var index = {
    id: 'filler',
    afterDatasetsUpdate (chart, _args, options) {
        const count = (chart.data.datasets || []).length;
        const sources = [];
        let meta, i, line, source;
        for(i = 0; i < count; ++i){
            meta = chart.getDatasetMeta(i);
            line = meta.dataset;
            source = null;
            if (line && line.options && line instanceof LineElement) {
                source = {
                    visible: chart.isDatasetVisible(i),
                    index: i,
                    fill: _decodeFill(line, i, count),
                    chart,
                    axis: meta.controller.options.indexAxis,
                    scale: meta.vScale,
                    line
                };
            }
            meta.$filler = source;
            sources.push(source);
        }
        for(i = 0; i < count; ++i){
            source = sources[i];
            if (!source || source.fill === false) {
                continue;
            }
            source.fill = _resolveTarget(sources, i, options.propagate);
        }
    },
    beforeDraw (chart, _args, options) {
        const draw = options.drawTime === 'beforeDraw';
        const metasets = chart.getSortedVisibleDatasetMetas();
        const area = chart.chartArea;
        for(let i = metasets.length - 1; i >= 0; --i){
            const source = metasets[i].$filler;
            if (!source) {
                continue;
            }
            source.line.updateControlPoints(area, source.axis);
            if (draw && source.fill) {
                _drawfill(chart.ctx, source, area);
            }
        }
    },
    beforeDatasetsDraw (chart, _args, options) {
        if (options.drawTime !== 'beforeDatasetsDraw') {
            return;
        }
        const metasets = chart.getSortedVisibleDatasetMetas();
        for(let i = metasets.length - 1; i >= 0; --i){
            const source = metasets[i].$filler;
            if (_shouldApplyFill(source)) {
                _drawfill(chart.ctx, source, chart.chartArea);
            }
        }
    },
    beforeDatasetDraw (chart, args, options) {
        const source = args.meta.$filler;
        if (!_shouldApplyFill(source) || options.drawTime !== 'beforeDatasetDraw') {
            return;
        }
        _drawfill(chart.ctx, source, chart.chartArea);
    },
    defaults: {
        propagate: true,
        drawTime: 'beforeDatasetDraw'
    }
};

const getBoxSize = (labelOpts, fontSize)=>{
    let { boxHeight =fontSize , boxWidth =fontSize  } = labelOpts;
    if (labelOpts.usePointStyle) {
        boxHeight = Math.min(boxHeight, fontSize);
        boxWidth = labelOpts.pointStyleWidth || Math.min(boxWidth, fontSize);
    }
    return {
        boxWidth,
        boxHeight,
        itemHeight: Math.max(fontSize, boxHeight)
    };
};
const itemsEqual = (a, b)=>a !== null && b !== null && a.datasetIndex === b.datasetIndex && a.index === b.index;
class Legend extends Element$1 {
 constructor(config){
        super();
        this._added = false;
        this.legendHitBoxes = [];
 this._hoveredItem = null;
        this.doughnutMode = false;
        this.chart = config.chart;
        this.options = config.options;
        this.ctx = config.ctx;
        this.legendItems = undefined;
        this.columnSizes = undefined;
        this.lineWidths = undefined;
        this.maxHeight = undefined;
        this.maxWidth = undefined;
        this.top = undefined;
        this.bottom = undefined;
        this.left = undefined;
        this.right = undefined;
        this.height = undefined;
        this.width = undefined;
        this._margins = undefined;
        this.position = undefined;
        this.weight = undefined;
        this.fullSize = undefined;
    }
    update(maxWidth, maxHeight, margins) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this._margins = margins;
        this.setDimensions();
        this.buildLabels();
        this.fit();
    }
    setDimensions() {
        if (this.isHorizontal()) {
            this.width = this.maxWidth;
            this.left = this._margins.left;
            this.right = this.width;
        } else {
            this.height = this.maxHeight;
            this.top = this._margins.top;
            this.bottom = this.height;
        }
    }
    buildLabels() {
        const labelOpts = this.options.labels || {};
        let legendItems = callback(labelOpts.generateLabels, [
            this.chart
        ], this) || [];
        if (labelOpts.filter) {
            legendItems = legendItems.filter((item)=>labelOpts.filter(item, this.chart.data));
        }
        if (labelOpts.sort) {
            legendItems = legendItems.sort((a, b)=>labelOpts.sort(a, b, this.chart.data));
        }
        if (this.options.reverse) {
            legendItems.reverse();
        }
        this.legendItems = legendItems;
    }
    fit() {
        const { options , ctx  } = this;
        if (!options.display) {
            this.width = this.height = 0;
            return;
        }
        const labelOpts = options.labels;
        const labelFont = toFont(labelOpts.font);
        const fontSize = labelFont.size;
        const titleHeight = this._computeTitleHeight();
        const { boxWidth , itemHeight  } = getBoxSize(labelOpts, fontSize);
        let width, height;
        ctx.font = labelFont.string;
        if (this.isHorizontal()) {
            width = this.maxWidth;
            height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
        } else {
            height = this.maxHeight;
            width = this._fitCols(titleHeight, labelFont, boxWidth, itemHeight) + 10;
        }
        this.width = Math.min(width, options.maxWidth || this.maxWidth);
        this.height = Math.min(height, options.maxHeight || this.maxHeight);
    }
 _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
        const { ctx , maxWidth , options: { labels: { padding  }  }  } = this;
        const hitboxes = this.legendHitBoxes = [];
        const lineWidths = this.lineWidths = [
            0
        ];
        const lineHeight = itemHeight + padding;
        let totalHeight = titleHeight;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        let row = -1;
        let top = -lineHeight;
        this.legendItems.forEach((legendItem, i)=>{
            const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
            if (i === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
                totalHeight += lineHeight;
                lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
                top += lineHeight;
                row++;
            }
            hitboxes[i] = {
                left: 0,
                top,
                row,
                width: itemWidth,
                height: itemHeight
            };
            lineWidths[lineWidths.length - 1] += itemWidth + padding;
        });
        return totalHeight;
    }
    _fitCols(titleHeight, labelFont, boxWidth, _itemHeight) {
        const { ctx , maxHeight , options: { labels: { padding  }  }  } = this;
        const hitboxes = this.legendHitBoxes = [];
        const columnSizes = this.columnSizes = [];
        const heightLimit = maxHeight - titleHeight;
        let totalWidth = padding;
        let currentColWidth = 0;
        let currentColHeight = 0;
        let left = 0;
        let col = 0;
        this.legendItems.forEach((legendItem, i)=>{
            const { itemWidth , itemHeight  } = calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight);
            if (i > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
                totalWidth += currentColWidth + padding;
                columnSizes.push({
                    width: currentColWidth,
                    height: currentColHeight
                });
                left += currentColWidth + padding;
                col++;
                currentColWidth = currentColHeight = 0;
            }
            hitboxes[i] = {
                left,
                top: currentColHeight,
                col,
                width: itemWidth,
                height: itemHeight
            };
            currentColWidth = Math.max(currentColWidth, itemWidth);
            currentColHeight += itemHeight + padding;
        });
        totalWidth += currentColWidth;
        columnSizes.push({
            width: currentColWidth,
            height: currentColHeight
        });
        return totalWidth;
    }
    adjustHitBoxes() {
        if (!this.options.display) {
            return;
        }
        const titleHeight = this._computeTitleHeight();
        const { legendHitBoxes: hitboxes , options: { align , labels: { padding  } , rtl  }  } = this;
        const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
        if (this.isHorizontal()) {
            let row = 0;
            let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
            for (const hitbox of hitboxes){
                if (row !== hitbox.row) {
                    row = hitbox.row;
                    left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
                }
                hitbox.top += this.top + titleHeight + padding;
                hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
                left += hitbox.width + padding;
            }
        } else {
            let col = 0;
            let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
            for (const hitbox1 of hitboxes){
                if (hitbox1.col !== col) {
                    col = hitbox1.col;
                    top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
                }
                hitbox1.top = top;
                hitbox1.left += this.left + padding;
                hitbox1.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox1.left), hitbox1.width);
                top += hitbox1.height + padding;
            }
        }
    }
    isHorizontal() {
        return this.options.position === 'top' || this.options.position === 'bottom';
    }
    draw() {
        if (this.options.display) {
            const ctx = this.ctx;
            clipArea(ctx, this);
            this._draw();
            unclipArea(ctx);
        }
    }
 _draw() {
        const { options: opts , columnSizes , lineWidths , ctx  } = this;
        const { align , labels: labelOpts  } = opts;
        const defaultColor = defaults.color;
        const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
        const labelFont = toFont(labelOpts.font);
        const { padding  } = labelOpts;
        const fontSize = labelFont.size;
        const halfFontSize = fontSize / 2;
        let cursor;
        this.drawTitle();
        ctx.textAlign = rtlHelper.textAlign('left');
        ctx.textBaseline = 'middle';
        ctx.lineWidth = 0.5;
        ctx.font = labelFont.string;
        const { boxWidth , boxHeight , itemHeight  } = getBoxSize(labelOpts, fontSize);
        const drawLegendBox = function(x, y, legendItem) {
            if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) {
                return;
            }
            ctx.save();
            const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
            ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
            ctx.lineCap = valueOrDefault(legendItem.lineCap, 'butt');
            ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
            ctx.lineJoin = valueOrDefault(legendItem.lineJoin, 'miter');
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
            ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
            if (labelOpts.usePointStyle) {
                const drawOptions = {
                    radius: boxHeight * Math.SQRT2 / 2,
                    pointStyle: legendItem.pointStyle,
                    rotation: legendItem.rotation,
                    borderWidth: lineWidth
                };
                const centerX = rtlHelper.xPlus(x, boxWidth / 2);
                const centerY = y + halfFontSize;
                drawPointLegend(ctx, drawOptions, centerX, centerY, labelOpts.pointStyleWidth && boxWidth);
            } else {
                const yBoxTop = y + Math.max((fontSize - boxHeight) / 2, 0);
                const xBoxLeft = rtlHelper.leftForLtr(x, boxWidth);
                const borderRadius = toTRBLCorners(legendItem.borderRadius);
                ctx.beginPath();
                if (Object.values(borderRadius).some((v)=>v !== 0)) {
                    addRoundedRectPath(ctx, {
                        x: xBoxLeft,
                        y: yBoxTop,
                        w: boxWidth,
                        h: boxHeight,
                        radius: borderRadius
                    });
                } else {
                    ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
                }
                ctx.fill();
                if (lineWidth !== 0) {
                    ctx.stroke();
                }
            }
            ctx.restore();
        };
        const fillText = function(x, y, legendItem) {
            renderText(ctx, legendItem.text, x, y + itemHeight / 2, labelFont, {
                strikethrough: legendItem.hidden,
                textAlign: rtlHelper.textAlign(legendItem.textAlign)
            });
        };
        const isHorizontal = this.isHorizontal();
        const titleHeight = this._computeTitleHeight();
        if (isHorizontal) {
            cursor = {
                x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
                y: this.top + padding + titleHeight,
                line: 0
            };
        } else {
            cursor = {
                x: this.left + padding,
                y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
                line: 0
            };
        }
        overrideTextDirection(this.ctx, opts.textDirection);
        const lineHeight = itemHeight + padding;
        this.legendItems.forEach((legendItem, i)=>{
            ctx.strokeStyle = legendItem.fontColor;
            ctx.fillStyle = legendItem.fontColor;
            const textWidth = ctx.measureText(legendItem.text).width;
            const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
            const width = boxWidth + halfFontSize + textWidth;
            let x = cursor.x;
            let y = cursor.y;
            rtlHelper.setWidth(this.width);
            if (isHorizontal) {
                if (i > 0 && x + width + padding > this.right) {
                    y = cursor.y += lineHeight;
                    cursor.line++;
                    x = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
                }
            } else if (i > 0 && y + lineHeight > this.bottom) {
                x = cursor.x = x + columnSizes[cursor.line].width + padding;
                cursor.line++;
                y = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
            }
            const realX = rtlHelper.x(x);
            drawLegendBox(realX, y, legendItem);
            x = _textX(textAlign, x + boxWidth + halfFontSize, isHorizontal ? x + width : this.right, opts.rtl);
            fillText(rtlHelper.x(x), y, legendItem);
            if (isHorizontal) {
                cursor.x += width + padding;
            } else if (typeof legendItem.text !== 'string') {
                const fontLineHeight = labelFont.lineHeight;
                cursor.y += calculateLegendItemHeight(legendItem, fontLineHeight);
            } else {
                cursor.y += lineHeight;
            }
        });
        restoreTextDirection(this.ctx, opts.textDirection);
    }
 drawTitle() {
        const opts = this.options;
        const titleOpts = opts.title;
        const titleFont = toFont(titleOpts.font);
        const titlePadding = toPadding(titleOpts.padding);
        if (!titleOpts.display) {
            return;
        }
        const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
        const ctx = this.ctx;
        const position = titleOpts.position;
        const halfFontSize = titleFont.size / 2;
        const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
        let y;
        let left = this.left;
        let maxWidth = this.width;
        if (this.isHorizontal()) {
            maxWidth = Math.max(...this.lineWidths);
            y = this.top + topPaddingPlusHalfFontSize;
            left = _alignStartEnd(opts.align, left, this.right - maxWidth);
        } else {
            const maxHeight = this.columnSizes.reduce((acc, size)=>Math.max(acc, size.height), 0);
            y = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
        }
        const x = _alignStartEnd(position, left, left + maxWidth);
        ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = titleOpts.color;
        ctx.fillStyle = titleOpts.color;
        ctx.font = titleFont.string;
        renderText(ctx, titleOpts.text, x, y, titleFont);
    }
 _computeTitleHeight() {
        const titleOpts = this.options.title;
        const titleFont = toFont(titleOpts.font);
        const titlePadding = toPadding(titleOpts.padding);
        return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
    }
 _getLegendItemAt(x, y) {
        let i, hitBox, lh;
        if (_isBetween(x, this.left, this.right) && _isBetween(y, this.top, this.bottom)) {
            lh = this.legendHitBoxes;
            for(i = 0; i < lh.length; ++i){
                hitBox = lh[i];
                if (_isBetween(x, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y, hitBox.top, hitBox.top + hitBox.height)) {
                    return this.legendItems[i];
                }
            }
        }
        return null;
    }
 handleEvent(e) {
        const opts = this.options;
        if (!isListened(e.type, opts)) {
            return;
        }
        const hoveredItem = this._getLegendItemAt(e.x, e.y);
        if (e.type === 'mousemove' || e.type === 'mouseout') {
            const previous = this._hoveredItem;
            const sameItem = itemsEqual(previous, hoveredItem);
            if (previous && !sameItem) {
                callback(opts.onLeave, [
                    e,
                    previous,
                    this
                ], this);
            }
            this._hoveredItem = hoveredItem;
            if (hoveredItem && !sameItem) {
                callback(opts.onHover, [
                    e,
                    hoveredItem,
                    this
                ], this);
            }
        } else if (hoveredItem) {
            callback(opts.onClick, [
                e,
                hoveredItem,
                this
            ], this);
        }
    }
}
function calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight) {
    const itemWidth = calculateItemWidth(legendItem, boxWidth, labelFont, ctx);
    const itemHeight = calculateItemHeight(_itemHeight, legendItem, labelFont.lineHeight);
    return {
        itemWidth,
        itemHeight
    };
}
function calculateItemWidth(legendItem, boxWidth, labelFont, ctx) {
    let legendItemText = legendItem.text;
    if (legendItemText && typeof legendItemText !== 'string') {
        legendItemText = legendItemText.reduce((a, b)=>a.length > b.length ? a : b);
    }
    return boxWidth + labelFont.size / 2 + ctx.measureText(legendItemText).width;
}
function calculateItemHeight(_itemHeight, legendItem, fontLineHeight) {
    let itemHeight = _itemHeight;
    if (typeof legendItem.text !== 'string') {
        itemHeight = calculateLegendItemHeight(legendItem, fontLineHeight);
    }
    return itemHeight;
}
function calculateLegendItemHeight(legendItem, fontLineHeight) {
    const labelHeight = legendItem.text ? legendItem.text.length + 0.5 : 0;
    return fontLineHeight * labelHeight;
}
function isListened(type, opts) {
    if ((type === 'mousemove' || type === 'mouseout') && (opts.onHover || opts.onLeave)) {
        return true;
    }
    if (opts.onClick && (type === 'click' || type === 'mouseup')) {
        return true;
    }
    return false;
}
var plugin_legend = {
    id: 'legend',
 _element: Legend,
    start (chart, _args, options) {
        const legend = chart.legend = new Legend({
            ctx: chart.ctx,
            options,
            chart
        });
        layouts.configure(chart, legend, options);
        layouts.addBox(chart, legend);
    },
    stop (chart) {
        layouts.removeBox(chart, chart.legend);
        delete chart.legend;
    },
    beforeUpdate (chart, _args, options) {
        const legend = chart.legend;
        layouts.configure(chart, legend, options);
        legend.options = options;
    },
    afterUpdate (chart) {
        const legend = chart.legend;
        legend.buildLabels();
        legend.adjustHitBoxes();
    },
    afterEvent (chart, args) {
        if (!args.replay) {
            chart.legend.handleEvent(args.event);
        }
    },
    defaults: {
        display: true,
        position: 'top',
        align: 'center',
        fullSize: true,
        reverse: false,
        weight: 1000,
        onClick (e, legendItem, legend) {
            const index = legendItem.datasetIndex;
            const ci = legend.chart;
            if (ci.isDatasetVisible(index)) {
                ci.hide(index);
                legendItem.hidden = true;
            } else {
                ci.show(index);
                legendItem.hidden = false;
            }
        },
        onHover: null,
        onLeave: null,
        labels: {
            color: (ctx)=>ctx.chart.options.color,
            boxWidth: 40,
            padding: 10,
            generateLabels (chart) {
                const datasets = chart.data.datasets;
                const { labels: { usePointStyle , pointStyle , textAlign , color , useBorderRadius , borderRadius  }  } = chart.legend.options;
                return chart._getSortedDatasetMetas().map((meta)=>{
                    const style = meta.controller.getStyle(usePointStyle ? 0 : undefined);
                    const borderWidth = toPadding(style.borderWidth);
                    return {
                        text: datasets[meta.index].label,
                        fillStyle: style.backgroundColor,
                        fontColor: color,
                        hidden: !meta.visible,
                        lineCap: style.borderCapStyle,
                        lineDash: style.borderDash,
                        lineDashOffset: style.borderDashOffset,
                        lineJoin: style.borderJoinStyle,
                        lineWidth: (borderWidth.width + borderWidth.height) / 4,
                        strokeStyle: style.borderColor,
                        pointStyle: pointStyle || style.pointStyle,
                        rotation: style.rotation,
                        textAlign: textAlign || style.textAlign,
                        borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
                        datasetIndex: meta.index
                    };
                }, this);
            }
        },
        title: {
            color: (ctx)=>ctx.chart.options.color,
            display: false,
            position: 'center',
            text: ''
        }
    },
    descriptors: {
        _scriptable: (name)=>!name.startsWith('on'),
        labels: {
            _scriptable: (name)=>![
                    'generateLabels',
                    'filter',
                    'sort'
                ].includes(name)
        }
    }
};

class Title extends Element$1 {
 constructor(config){
        super();
        this.chart = config.chart;
        this.options = config.options;
        this.ctx = config.ctx;
        this._padding = undefined;
        this.top = undefined;
        this.bottom = undefined;
        this.left = undefined;
        this.right = undefined;
        this.width = undefined;
        this.height = undefined;
        this.position = undefined;
        this.weight = undefined;
        this.fullSize = undefined;
    }
    update(maxWidth, maxHeight) {
        const opts = this.options;
        this.left = 0;
        this.top = 0;
        if (!opts.display) {
            this.width = this.height = this.right = this.bottom = 0;
            return;
        }
        this.width = this.right = maxWidth;
        this.height = this.bottom = maxHeight;
        const lineCount = isArray(opts.text) ? opts.text.length : 1;
        this._padding = toPadding(opts.padding);
        const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
        if (this.isHorizontal()) {
            this.height = textSize;
        } else {
            this.width = textSize;
        }
    }
    isHorizontal() {
        const pos = this.options.position;
        return pos === 'top' || pos === 'bottom';
    }
    _drawArgs(offset) {
        const { top , left , bottom , right , options  } = this;
        const align = options.align;
        let rotation = 0;
        let maxWidth, titleX, titleY;
        if (this.isHorizontal()) {
            titleX = _alignStartEnd(align, left, right);
            titleY = top + offset;
            maxWidth = right - left;
        } else {
            if (options.position === 'left') {
                titleX = left + offset;
                titleY = _alignStartEnd(align, bottom, top);
                rotation = PI * -0.5;
            } else {
                titleX = right - offset;
                titleY = _alignStartEnd(align, top, bottom);
                rotation = PI * 0.5;
            }
            maxWidth = bottom - top;
        }
        return {
            titleX,
            titleY,
            maxWidth,
            rotation
        };
    }
    draw() {
        const ctx = this.ctx;
        const opts = this.options;
        if (!opts.display) {
            return;
        }
        const fontOpts = toFont(opts.font);
        const lineHeight = fontOpts.lineHeight;
        const offset = lineHeight / 2 + this._padding.top;
        const { titleX , titleY , maxWidth , rotation  } = this._drawArgs(offset);
        renderText(ctx, opts.text, 0, 0, fontOpts, {
            color: opts.color,
            maxWidth,
            rotation,
            textAlign: _toLeftRightCenter(opts.align),
            textBaseline: 'middle',
            translation: [
                titleX,
                titleY
            ]
        });
    }
}
function createTitle(chart, titleOpts) {
    const title = new Title({
        ctx: chart.ctx,
        options: titleOpts,
        chart
    });
    layouts.configure(chart, title, titleOpts);
    layouts.addBox(chart, title);
    chart.titleBlock = title;
}
var plugin_title = {
    id: 'title',
 _element: Title,
    start (chart, _args, options) {
        createTitle(chart, options);
    },
    stop (chart) {
        const titleBlock = chart.titleBlock;
        layouts.removeBox(chart, titleBlock);
        delete chart.titleBlock;
    },
    beforeUpdate (chart, _args, options) {
        const title = chart.titleBlock;
        layouts.configure(chart, title, options);
        title.options = options;
    },
    defaults: {
        align: 'center',
        display: false,
        font: {
            weight: 'bold'
        },
        fullSize: true,
        padding: 10,
        position: 'top',
        text: '',
        weight: 2000
    },
    defaultRoutes: {
        color: 'color'
    },
    descriptors: {
        _scriptable: true,
        _indexable: false
    }
};

const map = new WeakMap();
var plugin_subtitle = {
    id: 'subtitle',
    start (chart, _args, options) {
        const title = new Title({
            ctx: chart.ctx,
            options,
            chart
        });
        layouts.configure(chart, title, options);
        layouts.addBox(chart, title);
        map.set(chart, title);
    },
    stop (chart) {
        layouts.removeBox(chart, map.get(chart));
        map.delete(chart);
    },
    beforeUpdate (chart, _args, options) {
        const title = map.get(chart);
        layouts.configure(chart, title, options);
        title.options = options;
    },
    defaults: {
        align: 'center',
        display: false,
        font: {
            weight: 'normal'
        },
        fullSize: true,
        padding: 0,
        position: 'top',
        text: '',
        weight: 1500
    },
    defaultRoutes: {
        color: 'color'
    },
    descriptors: {
        _scriptable: true,
        _indexable: false
    }
};

const positioners = {
 average (items) {
        if (!items.length) {
            return false;
        }
        let i, len;
        let x = 0;
        let y = 0;
        let count = 0;
        for(i = 0, len = items.length; i < len; ++i){
            const el = items[i].element;
            if (el && el.hasValue()) {
                const pos = el.tooltipPosition();
                x += pos.x;
                y += pos.y;
                ++count;
            }
        }
        return {
            x: x / count,
            y: y / count
        };
    },
 nearest (items, eventPosition) {
        if (!items.length) {
            return false;
        }
        let x = eventPosition.x;
        let y = eventPosition.y;
        let minDistance = Number.POSITIVE_INFINITY;
        let i, len, nearestElement;
        for(i = 0, len = items.length; i < len; ++i){
            const el = items[i].element;
            if (el && el.hasValue()) {
                const center = el.getCenterPoint();
                const d = distanceBetweenPoints(eventPosition, center);
                if (d < minDistance) {
                    minDistance = d;
                    nearestElement = el;
                }
            }
        }
        if (nearestElement) {
            const tp = nearestElement.tooltipPosition();
            x = tp.x;
            y = tp.y;
        }
        return {
            x,
            y
        };
    }
};
function pushOrConcat(base, toPush) {
    if (toPush) {
        if (isArray(toPush)) {
            Array.prototype.push.apply(base, toPush);
        } else {
            base.push(toPush);
        }
    }
    return base;
}
 function splitNewlines(str) {
    if ((typeof str === 'string' || str instanceof String) && str.indexOf('\n') > -1) {
        return str.split('\n');
    }
    return str;
}
 function createTooltipItem(chart, item) {
    const { element , datasetIndex , index  } = item;
    const controller = chart.getDatasetMeta(datasetIndex).controller;
    const { label , value  } = controller.getLabelAndValue(index);
    return {
        chart,
        label,
        parsed: controller.getParsed(index),
        raw: chart.data.datasets[datasetIndex].data[index],
        formattedValue: value,
        dataset: controller.getDataset(),
        dataIndex: index,
        datasetIndex,
        element
    };
}
 function getTooltipSize(tooltip, options) {
    const ctx = tooltip.chart.ctx;
    const { body , footer , title  } = tooltip;
    const { boxWidth , boxHeight  } = options;
    const bodyFont = toFont(options.bodyFont);
    const titleFont = toFont(options.titleFont);
    const footerFont = toFont(options.footerFont);
    const titleLineCount = title.length;
    const footerLineCount = footer.length;
    const bodyLineItemCount = body.length;
    const padding = toPadding(options.padding);
    let height = padding.height;
    let width = 0;
    let combinedBodyLength = body.reduce((count, bodyItem)=>count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
    combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
    if (titleLineCount) {
        height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
    }
    if (combinedBodyLength) {
        const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
        height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
    }
    if (footerLineCount) {
        height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
    }
    let widthPadding = 0;
    const maxLineWidth = function(line) {
        width = Math.max(width, ctx.measureText(line).width + widthPadding);
    };
    ctx.save();
    ctx.font = titleFont.string;
    each(tooltip.title, maxLineWidth);
    ctx.font = bodyFont.string;
    each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
    widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
    each(body, (bodyItem)=>{
        each(bodyItem.before, maxLineWidth);
        each(bodyItem.lines, maxLineWidth);
        each(bodyItem.after, maxLineWidth);
    });
    widthPadding = 0;
    ctx.font = footerFont.string;
    each(tooltip.footer, maxLineWidth);
    ctx.restore();
    width += padding.width;
    return {
        width,
        height
    };
}
function determineYAlign(chart, size) {
    const { y , height  } = size;
    if (y < height / 2) {
        return 'top';
    } else if (y > chart.height - height / 2) {
        return 'bottom';
    }
    return 'center';
}
function doesNotFitWithAlign(xAlign, chart, options, size) {
    const { x , width  } = size;
    const caret = options.caretSize + options.caretPadding;
    if (xAlign === 'left' && x + width + caret > chart.width) {
        return true;
    }
    if (xAlign === 'right' && x - width - caret < 0) {
        return true;
    }
}
function determineXAlign(chart, options, size, yAlign) {
    const { x , width  } = size;
    const { width: chartWidth , chartArea: { left , right  }  } = chart;
    let xAlign = 'center';
    if (yAlign === 'center') {
        xAlign = x <= (left + right) / 2 ? 'left' : 'right';
    } else if (x <= width / 2) {
        xAlign = 'left';
    } else if (x >= chartWidth - width / 2) {
        xAlign = 'right';
    }
    if (doesNotFitWithAlign(xAlign, chart, options, size)) {
        xAlign = 'center';
    }
    return xAlign;
}
 function determineAlignment(chart, options, size) {
    const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
    return {
        xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
        yAlign
    };
}
function alignX(size, xAlign) {
    let { x , width  } = size;
    if (xAlign === 'right') {
        x -= width;
    } else if (xAlign === 'center') {
        x -= width / 2;
    }
    return x;
}
function alignY(size, yAlign, paddingAndSize) {
    let { y , height  } = size;
    if (yAlign === 'top') {
        y += paddingAndSize;
    } else if (yAlign === 'bottom') {
        y -= height + paddingAndSize;
    } else {
        y -= height / 2;
    }
    return y;
}
 function getBackgroundPoint(options, size, alignment, chart) {
    const { caretSize , caretPadding , cornerRadius  } = options;
    const { xAlign , yAlign  } = alignment;
    const paddingAndSize = caretSize + caretPadding;
    const { topLeft , topRight , bottomLeft , bottomRight  } = toTRBLCorners(cornerRadius);
    let x = alignX(size, xAlign);
    const y = alignY(size, yAlign, paddingAndSize);
    if (yAlign === 'center') {
        if (xAlign === 'left') {
            x += paddingAndSize;
        } else if (xAlign === 'right') {
            x -= paddingAndSize;
        }
    } else if (xAlign === 'left') {
        x -= Math.max(topLeft, bottomLeft) + caretSize;
    } else if (xAlign === 'right') {
        x += Math.max(topRight, bottomRight) + caretSize;
    }
    return {
        x: _limitValue(x, 0, chart.width - size.width),
        y: _limitValue(y, 0, chart.height - size.height)
    };
}
function getAlignedX(tooltip, align, options) {
    const padding = toPadding(options.padding);
    return align === 'center' ? tooltip.x + tooltip.width / 2 : align === 'right' ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
}
 function getBeforeAfterBodyLines(callback) {
    return pushOrConcat([], splitNewlines(callback));
}
function createTooltipContext(parent, tooltip, tooltipItems) {
    return createContext(parent, {
        tooltip,
        tooltipItems,
        type: 'tooltip'
    });
}
function overrideCallbacks(callbacks, context) {
    const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
    return override ? callbacks.override(override) : callbacks;
}
const defaultCallbacks = {
    beforeTitle: noop,
    title (tooltipItems) {
        if (tooltipItems.length > 0) {
            const item = tooltipItems[0];
            const labels = item.chart.data.labels;
            const labelCount = labels ? labels.length : 0;
            if (this && this.options && this.options.mode === 'dataset') {
                return item.dataset.label || '';
            } else if (item.label) {
                return item.label;
            } else if (labelCount > 0 && item.dataIndex < labelCount) {
                return labels[item.dataIndex];
            }
        }
        return '';
    },
    afterTitle: noop,
    beforeBody: noop,
    beforeLabel: noop,
    label (tooltipItem) {
        if (this && this.options && this.options.mode === 'dataset') {
            return tooltipItem.label + ': ' + tooltipItem.formattedValue || tooltipItem.formattedValue;
        }
        let label = tooltipItem.dataset.label || '';
        if (label) {
            label += ': ';
        }
        const value = tooltipItem.formattedValue;
        if (!isNullOrUndef(value)) {
            label += value;
        }
        return label;
    },
    labelColor (tooltipItem) {
        const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
        const options = meta.controller.getStyle(tooltipItem.dataIndex);
        return {
            borderColor: options.borderColor,
            backgroundColor: options.backgroundColor,
            borderWidth: options.borderWidth,
            borderDash: options.borderDash,
            borderDashOffset: options.borderDashOffset,
            borderRadius: 0
        };
    },
    labelTextColor () {
        return this.options.bodyColor;
    },
    labelPointStyle (tooltipItem) {
        const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
        const options = meta.controller.getStyle(tooltipItem.dataIndex);
        return {
            pointStyle: options.pointStyle,
            rotation: options.rotation
        };
    },
    afterLabel: noop,
    afterBody: noop,
    beforeFooter: noop,
    footer: noop,
    afterFooter: noop
};
 function invokeCallbackWithFallback(callbacks, name, ctx, arg) {
    const result = callbacks[name].call(ctx, arg);
    if (typeof result === 'undefined') {
        return defaultCallbacks[name].call(ctx, arg);
    }
    return result;
}
class Tooltip extends Element$1 {
 static positioners = positioners;
    constructor(config){
        super();
        this.opacity = 0;
        this._active = [];
        this._eventPosition = undefined;
        this._size = undefined;
        this._cachedAnimations = undefined;
        this._tooltipItems = [];
        this.$animations = undefined;
        this.$context = undefined;
        this.chart = config.chart;
        this.options = config.options;
        this.dataPoints = undefined;
        this.title = undefined;
        this.beforeBody = undefined;
        this.body = undefined;
        this.afterBody = undefined;
        this.footer = undefined;
        this.xAlign = undefined;
        this.yAlign = undefined;
        this.x = undefined;
        this.y = undefined;
        this.height = undefined;
        this.width = undefined;
        this.caretX = undefined;
        this.caretY = undefined;
        this.labelColors = undefined;
        this.labelPointStyles = undefined;
        this.labelTextColors = undefined;
    }
    initialize(options) {
        this.options = options;
        this._cachedAnimations = undefined;
        this.$context = undefined;
    }
 _resolveAnimations() {
        const cached = this._cachedAnimations;
        if (cached) {
            return cached;
        }
        const chart = this.chart;
        const options = this.options.setContext(this.getContext());
        const opts = options.enabled && chart.options.animation && options.animations;
        const animations = new Animations(this.chart, opts);
        if (opts._cacheable) {
            this._cachedAnimations = Object.freeze(animations);
        }
        return animations;
    }
 getContext() {
        return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
    }
    getTitle(context, options) {
        const { callbacks  } = options;
        const beforeTitle = invokeCallbackWithFallback(callbacks, 'beforeTitle', this, context);
        const title = invokeCallbackWithFallback(callbacks, 'title', this, context);
        const afterTitle = invokeCallbackWithFallback(callbacks, 'afterTitle', this, context);
        let lines = [];
        lines = pushOrConcat(lines, splitNewlines(beforeTitle));
        lines = pushOrConcat(lines, splitNewlines(title));
        lines = pushOrConcat(lines, splitNewlines(afterTitle));
        return lines;
    }
    getBeforeBody(tooltipItems, options) {
        return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, 'beforeBody', this, tooltipItems));
    }
    getBody(tooltipItems, options) {
        const { callbacks  } = options;
        const bodyItems = [];
        each(tooltipItems, (context)=>{
            const bodyItem = {
                before: [],
                lines: [],
                after: []
            };
            const scoped = overrideCallbacks(callbacks, context);
            pushOrConcat(bodyItem.before, splitNewlines(invokeCallbackWithFallback(scoped, 'beforeLabel', this, context)));
            pushOrConcat(bodyItem.lines, invokeCallbackWithFallback(scoped, 'label', this, context));
            pushOrConcat(bodyItem.after, splitNewlines(invokeCallbackWithFallback(scoped, 'afterLabel', this, context)));
            bodyItems.push(bodyItem);
        });
        return bodyItems;
    }
    getAfterBody(tooltipItems, options) {
        return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, 'afterBody', this, tooltipItems));
    }
    getFooter(tooltipItems, options) {
        const { callbacks  } = options;
        const beforeFooter = invokeCallbackWithFallback(callbacks, 'beforeFooter', this, tooltipItems);
        const footer = invokeCallbackWithFallback(callbacks, 'footer', this, tooltipItems);
        const afterFooter = invokeCallbackWithFallback(callbacks, 'afterFooter', this, tooltipItems);
        let lines = [];
        lines = pushOrConcat(lines, splitNewlines(beforeFooter));
        lines = pushOrConcat(lines, splitNewlines(footer));
        lines = pushOrConcat(lines, splitNewlines(afterFooter));
        return lines;
    }
 _createItems(options) {
        const active = this._active;
        const data = this.chart.data;
        const labelColors = [];
        const labelPointStyles = [];
        const labelTextColors = [];
        let tooltipItems = [];
        let i, len;
        for(i = 0, len = active.length; i < len; ++i){
            tooltipItems.push(createTooltipItem(this.chart, active[i]));
        }
        if (options.filter) {
            tooltipItems = tooltipItems.filter((element, index, array)=>options.filter(element, index, array, data));
        }
        if (options.itemSort) {
            tooltipItems = tooltipItems.sort((a, b)=>options.itemSort(a, b, data));
        }
        each(tooltipItems, (context)=>{
            const scoped = overrideCallbacks(options.callbacks, context);
            labelColors.push(invokeCallbackWithFallback(scoped, 'labelColor', this, context));
            labelPointStyles.push(invokeCallbackWithFallback(scoped, 'labelPointStyle', this, context));
            labelTextColors.push(invokeCallbackWithFallback(scoped, 'labelTextColor', this, context));
        });
        this.labelColors = labelColors;
        this.labelPointStyles = labelPointStyles;
        this.labelTextColors = labelTextColors;
        this.dataPoints = tooltipItems;
        return tooltipItems;
    }
    update(changed, replay) {
        const options = this.options.setContext(this.getContext());
        const active = this._active;
        let properties;
        let tooltipItems = [];
        if (!active.length) {
            if (this.opacity !== 0) {
                properties = {
                    opacity: 0
                };
            }
        } else {
            const position = positioners[options.position].call(this, active, this._eventPosition);
            tooltipItems = this._createItems(options);
            this.title = this.getTitle(tooltipItems, options);
            this.beforeBody = this.getBeforeBody(tooltipItems, options);
            this.body = this.getBody(tooltipItems, options);
            this.afterBody = this.getAfterBody(tooltipItems, options);
            this.footer = this.getFooter(tooltipItems, options);
            const size = this._size = getTooltipSize(this, options);
            const positionAndSize = Object.assign({}, position, size);
            const alignment = determineAlignment(this.chart, options, positionAndSize);
            const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
            this.xAlign = alignment.xAlign;
            this.yAlign = alignment.yAlign;
            properties = {
                opacity: 1,
                x: backgroundPoint.x,
                y: backgroundPoint.y,
                width: size.width,
                height: size.height,
                caretX: position.x,
                caretY: position.y
            };
        }
        this._tooltipItems = tooltipItems;
        this.$context = undefined;
        if (properties) {
            this._resolveAnimations().update(this, properties);
        }
        if (changed && options.external) {
            options.external.call(this, {
                chart: this.chart,
                tooltip: this,
                replay
            });
        }
    }
    drawCaret(tooltipPoint, ctx, size, options) {
        const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
        ctx.lineTo(caretPosition.x1, caretPosition.y1);
        ctx.lineTo(caretPosition.x2, caretPosition.y2);
        ctx.lineTo(caretPosition.x3, caretPosition.y3);
    }
    getCaretPosition(tooltipPoint, size, options) {
        const { xAlign , yAlign  } = this;
        const { caretSize , cornerRadius  } = options;
        const { topLeft , topRight , bottomLeft , bottomRight  } = toTRBLCorners(cornerRadius);
        const { x: ptX , y: ptY  } = tooltipPoint;
        const { width , height  } = size;
        let x1, x2, x3, y1, y2, y3;
        if (yAlign === 'center') {
            y2 = ptY + height / 2;
            if (xAlign === 'left') {
                x1 = ptX;
                x2 = x1 - caretSize;
                y1 = y2 + caretSize;
                y3 = y2 - caretSize;
            } else {
                x1 = ptX + width;
                x2 = x1 + caretSize;
                y1 = y2 - caretSize;
                y3 = y2 + caretSize;
            }
            x3 = x1;
        } else {
            if (xAlign === 'left') {
                x2 = ptX + Math.max(topLeft, bottomLeft) + caretSize;
            } else if (xAlign === 'right') {
                x2 = ptX + width - Math.max(topRight, bottomRight) - caretSize;
            } else {
                x2 = this.caretX;
            }
            if (yAlign === 'top') {
                y1 = ptY;
                y2 = y1 - caretSize;
                x1 = x2 - caretSize;
                x3 = x2 + caretSize;
            } else {
                y1 = ptY + height;
                y2 = y1 + caretSize;
                x1 = x2 + caretSize;
                x3 = x2 - caretSize;
            }
            y3 = y1;
        }
        return {
            x1,
            x2,
            x3,
            y1,
            y2,
            y3
        };
    }
    drawTitle(pt, ctx, options) {
        const title = this.title;
        const length = title.length;
        let titleFont, titleSpacing, i;
        if (length) {
            const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
            pt.x = getAlignedX(this, options.titleAlign, options);
            ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
            ctx.textBaseline = 'middle';
            titleFont = toFont(options.titleFont);
            titleSpacing = options.titleSpacing;
            ctx.fillStyle = options.titleColor;
            ctx.font = titleFont.string;
            for(i = 0; i < length; ++i){
                ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
                pt.y += titleFont.lineHeight + titleSpacing;
                if (i + 1 === length) {
                    pt.y += options.titleMarginBottom - titleSpacing;
                }
            }
        }
    }
 _drawColorBox(ctx, pt, i, rtlHelper, options) {
        const labelColors = this.labelColors[i];
        const labelPointStyle = this.labelPointStyles[i];
        const { boxHeight , boxWidth , boxPadding  } = options;
        const bodyFont = toFont(options.bodyFont);
        const colorX = getAlignedX(this, 'left', options);
        const rtlColorX = rtlHelper.x(colorX);
        const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
        const colorY = pt.y + yOffSet;
        if (options.usePointStyle) {
            const drawOptions = {
                radius: Math.min(boxWidth, boxHeight) / 2,
                pointStyle: labelPointStyle.pointStyle,
                rotation: labelPointStyle.rotation,
                borderWidth: 1
            };
            const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
            const centerY = colorY + boxHeight / 2;
            ctx.strokeStyle = options.multiKeyBackground;
            ctx.fillStyle = options.multiKeyBackground;
            drawPoint(ctx, drawOptions, centerX, centerY);
            ctx.strokeStyle = labelColors.borderColor;
            ctx.fillStyle = labelColors.backgroundColor;
            drawPoint(ctx, drawOptions, centerX, centerY);
        } else {
            ctx.lineWidth = isObject(labelColors.borderWidth) ? Math.max(...Object.values(labelColors.borderWidth)) : labelColors.borderWidth || 1;
            ctx.strokeStyle = labelColors.borderColor;
            ctx.setLineDash(labelColors.borderDash || []);
            ctx.lineDashOffset = labelColors.borderDashOffset || 0;
            const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth - boxPadding);
            const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - boxPadding - 2);
            const borderRadius = toTRBLCorners(labelColors.borderRadius);
            if (Object.values(borderRadius).some((v)=>v !== 0)) {
                ctx.beginPath();
                ctx.fillStyle = options.multiKeyBackground;
                addRoundedRectPath(ctx, {
                    x: outerX,
                    y: colorY,
                    w: boxWidth,
                    h: boxHeight,
                    radius: borderRadius
                });
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = labelColors.backgroundColor;
                ctx.beginPath();
                addRoundedRectPath(ctx, {
                    x: innerX,
                    y: colorY + 1,
                    w: boxWidth - 2,
                    h: boxHeight - 2,
                    radius: borderRadius
                });
                ctx.fill();
            } else {
                ctx.fillStyle = options.multiKeyBackground;
                ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
                ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
                ctx.fillStyle = labelColors.backgroundColor;
                ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
            }
        }
        ctx.fillStyle = this.labelTextColors[i];
    }
    drawBody(pt, ctx, options) {
        const { body  } = this;
        const { bodySpacing , bodyAlign , displayColors , boxHeight , boxWidth , boxPadding  } = options;
        const bodyFont = toFont(options.bodyFont);
        let bodyLineHeight = bodyFont.lineHeight;
        let xLinePadding = 0;
        const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
        const fillLineOfText = function(line) {
            ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
            pt.y += bodyLineHeight + bodySpacing;
        };
        const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
        let bodyItem, textColor, lines, i, j, ilen, jlen;
        ctx.textAlign = bodyAlign;
        ctx.textBaseline = 'middle';
        ctx.font = bodyFont.string;
        pt.x = getAlignedX(this, bodyAlignForCalculation, options);
        ctx.fillStyle = options.bodyColor;
        each(this.beforeBody, fillLineOfText);
        xLinePadding = displayColors && bodyAlignForCalculation !== 'right' ? bodyAlign === 'center' ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
        for(i = 0, ilen = body.length; i < ilen; ++i){
            bodyItem = body[i];
            textColor = this.labelTextColors[i];
            ctx.fillStyle = textColor;
            each(bodyItem.before, fillLineOfText);
            lines = bodyItem.lines;
            if (displayColors && lines.length) {
                this._drawColorBox(ctx, pt, i, rtlHelper, options);
                bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
            }
            for(j = 0, jlen = lines.length; j < jlen; ++j){
                fillLineOfText(lines[j]);
                bodyLineHeight = bodyFont.lineHeight;
            }
            each(bodyItem.after, fillLineOfText);
        }
        xLinePadding = 0;
        bodyLineHeight = bodyFont.lineHeight;
        each(this.afterBody, fillLineOfText);
        pt.y -= bodySpacing;
    }
    drawFooter(pt, ctx, options) {
        const footer = this.footer;
        const length = footer.length;
        let footerFont, i;
        if (length) {
            const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
            pt.x = getAlignedX(this, options.footerAlign, options);
            pt.y += options.footerMarginTop;
            ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
            ctx.textBaseline = 'middle';
            footerFont = toFont(options.footerFont);
            ctx.fillStyle = options.footerColor;
            ctx.font = footerFont.string;
            for(i = 0; i < length; ++i){
                ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
                pt.y += footerFont.lineHeight + options.footerSpacing;
            }
        }
    }
    drawBackground(pt, ctx, tooltipSize, options) {
        const { xAlign , yAlign  } = this;
        const { x , y  } = pt;
        const { width , height  } = tooltipSize;
        const { topLeft , topRight , bottomLeft , bottomRight  } = toTRBLCorners(options.cornerRadius);
        ctx.fillStyle = options.backgroundColor;
        ctx.strokeStyle = options.borderColor;
        ctx.lineWidth = options.borderWidth;
        ctx.beginPath();
        ctx.moveTo(x + topLeft, y);
        if (yAlign === 'top') {
            this.drawCaret(pt, ctx, tooltipSize, options);
        }
        ctx.lineTo(x + width - topRight, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + topRight);
        if (yAlign === 'center' && xAlign === 'right') {
            this.drawCaret(pt, ctx, tooltipSize, options);
        }
        ctx.lineTo(x + width, y + height - bottomRight);
        ctx.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
        if (yAlign === 'bottom') {
            this.drawCaret(pt, ctx, tooltipSize, options);
        }
        ctx.lineTo(x + bottomLeft, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
        if (yAlign === 'center' && xAlign === 'left') {
            this.drawCaret(pt, ctx, tooltipSize, options);
        }
        ctx.lineTo(x, y + topLeft);
        ctx.quadraticCurveTo(x, y, x + topLeft, y);
        ctx.closePath();
        ctx.fill();
        if (options.borderWidth > 0) {
            ctx.stroke();
        }
    }
 _updateAnimationTarget(options) {
        const chart = this.chart;
        const anims = this.$animations;
        const animX = anims && anims.x;
        const animY = anims && anims.y;
        if (animX || animY) {
            const position = positioners[options.position].call(this, this._active, this._eventPosition);
            if (!position) {
                return;
            }
            const size = this._size = getTooltipSize(this, options);
            const positionAndSize = Object.assign({}, position, this._size);
            const alignment = determineAlignment(chart, options, positionAndSize);
            const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
            if (animX._to !== point.x || animY._to !== point.y) {
                this.xAlign = alignment.xAlign;
                this.yAlign = alignment.yAlign;
                this.width = size.width;
                this.height = size.height;
                this.caretX = position.x;
                this.caretY = position.y;
                this._resolveAnimations().update(this, point);
            }
        }
    }
 _willRender() {
        return !!this.opacity;
    }
    draw(ctx) {
        const options = this.options.setContext(this.getContext());
        let opacity = this.opacity;
        if (!opacity) {
            return;
        }
        this._updateAnimationTarget(options);
        const tooltipSize = {
            width: this.width,
            height: this.height
        };
        const pt = {
            x: this.x,
            y: this.y
        };
        opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
        const padding = toPadding(options.padding);
        const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
        if (options.enabled && hasTooltipContent) {
            ctx.save();
            ctx.globalAlpha = opacity;
            this.drawBackground(pt, ctx, tooltipSize, options);
            overrideTextDirection(ctx, options.textDirection);
            pt.y += padding.top;
            this.drawTitle(pt, ctx, options);
            this.drawBody(pt, ctx, options);
            this.drawFooter(pt, ctx, options);
            restoreTextDirection(ctx, options.textDirection);
            ctx.restore();
        }
    }
 getActiveElements() {
        return this._active || [];
    }
 setActiveElements(activeElements, eventPosition) {
        const lastActive = this._active;
        const active = activeElements.map(({ datasetIndex , index  })=>{
            const meta = this.chart.getDatasetMeta(datasetIndex);
            if (!meta) {
                throw new Error('Cannot find a dataset at index ' + datasetIndex);
            }
            return {
                datasetIndex,
                element: meta.data[index],
                index
            };
        });
        const changed = !_elementsEqual(lastActive, active);
        const positionChanged = this._positionChanged(active, eventPosition);
        if (changed || positionChanged) {
            this._active = active;
            this._eventPosition = eventPosition;
            this._ignoreReplayEvents = true;
            this.update(true);
        }
    }
 handleEvent(e, replay, inChartArea = true) {
        if (replay && this._ignoreReplayEvents) {
            return false;
        }
        this._ignoreReplayEvents = false;
        const options = this.options;
        const lastActive = this._active || [];
        const active = this._getActiveElements(e, lastActive, replay, inChartArea);
        const positionChanged = this._positionChanged(active, e);
        const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
        if (changed) {
            this._active = active;
            if (options.enabled || options.external) {
                this._eventPosition = {
                    x: e.x,
                    y: e.y
                };
                this.update(true, replay);
            }
        }
        return changed;
    }
 _getActiveElements(e, lastActive, replay, inChartArea) {
        const options = this.options;
        if (e.type === 'mouseout') {
            return [];
        }
        if (!inChartArea) {
            return lastActive;
        }
        const active = this.chart.getElementsAtEventForMode(e, options.mode, options, replay);
        if (options.reverse) {
            active.reverse();
        }
        return active;
    }
 _positionChanged(active, e) {
        const { caretX , caretY , options  } = this;
        const position = positioners[options.position].call(this, active, e);
        return position !== false && (caretX !== position.x || caretY !== position.y);
    }
}
var plugin_tooltip = {
    id: 'tooltip',
    _element: Tooltip,
    positioners,
    afterInit (chart, _args, options) {
        if (options) {
            chart.tooltip = new Tooltip({
                chart,
                options
            });
        }
    },
    beforeUpdate (chart, _args, options) {
        if (chart.tooltip) {
            chart.tooltip.initialize(options);
        }
    },
    reset (chart, _args, options) {
        if (chart.tooltip) {
            chart.tooltip.initialize(options);
        }
    },
    afterDraw (chart) {
        const tooltip = chart.tooltip;
        if (tooltip && tooltip._willRender()) {
            const args = {
                tooltip
            };
            if (chart.notifyPlugins('beforeTooltipDraw', {
                ...args,
                cancelable: true
            }) === false) {
                return;
            }
            tooltip.draw(chart.ctx);
            chart.notifyPlugins('afterTooltipDraw', args);
        }
    },
    afterEvent (chart, args) {
        if (chart.tooltip) {
            const useFinalPosition = args.replay;
            if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) {
                args.changed = true;
            }
        }
    },
    defaults: {
        enabled: true,
        external: null,
        position: 'average',
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        titleFont: {
            weight: 'bold'
        },
        titleSpacing: 2,
        titleMarginBottom: 6,
        titleAlign: 'left',
        bodyColor: '#fff',
        bodySpacing: 2,
        bodyFont: {},
        bodyAlign: 'left',
        footerColor: '#fff',
        footerSpacing: 2,
        footerMarginTop: 6,
        footerFont: {
            weight: 'bold'
        },
        footerAlign: 'left',
        padding: 6,
        caretPadding: 2,
        caretSize: 5,
        cornerRadius: 6,
        boxHeight: (ctx, opts)=>opts.bodyFont.size,
        boxWidth: (ctx, opts)=>opts.bodyFont.size,
        multiKeyBackground: '#fff',
        displayColors: true,
        boxPadding: 0,
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        animation: {
            duration: 400,
            easing: 'easeOutQuart'
        },
        animations: {
            numbers: {
                type: 'number',
                properties: [
                    'x',
                    'y',
                    'width',
                    'height',
                    'caretX',
                    'caretY'
                ]
            },
            opacity: {
                easing: 'linear',
                duration: 200
            }
        },
        callbacks: defaultCallbacks
    },
    defaultRoutes: {
        bodyFont: 'font',
        footerFont: 'font',
        titleFont: 'font'
    },
    descriptors: {
        _scriptable: (name)=>name !== 'filter' && name !== 'itemSort' && name !== 'external',
        _indexable: false,
        callbacks: {
            _scriptable: false,
            _indexable: false
        },
        animation: {
            _fallback: false
        },
        animations: {
            _fallback: 'animation'
        }
    },
    additionalOptionScopes: [
        'interaction'
    ]
};

var plugins = /*#__PURE__*/Object.freeze({
__proto__: null,
Colors: plugin_colors,
Decimation: plugin_decimation,
Filler: index,
Legend: plugin_legend,
SubTitle: plugin_subtitle,
Title: plugin_title,
Tooltip: plugin_tooltip
});

const addIfString = (labels, raw, index, addedLabels)=>{
    if (typeof raw === 'string') {
        index = labels.push(raw) - 1;
        addedLabels.unshift({
            index,
            label: raw
        });
    } else if (isNaN(raw)) {
        index = null;
    }
    return index;
};
function findOrAddLabel(labels, raw, index, addedLabels) {
    const first = labels.indexOf(raw);
    if (first === -1) {
        return addIfString(labels, raw, index, addedLabels);
    }
    const last = labels.lastIndexOf(raw);
    return first !== last ? index : first;
}
const validIndex = (index, max)=>index === null ? null : _limitValue(Math.round(index), 0, max);
function _getLabelForValue(value) {
    const labels = this.getLabels();
    if (value >= 0 && value < labels.length) {
        return labels[value];
    }
    return value;
}
class CategoryScale extends Scale {
    static id = 'category';
 static defaults = {
        ticks: {
            callback: _getLabelForValue
        }
    };
    constructor(cfg){
        super(cfg);
         this._startValue = undefined;
        this._valueRange = 0;
        this._addedLabels = [];
    }
    init(scaleOptions) {
        const added = this._addedLabels;
        if (added.length) {
            const labels = this.getLabels();
            for (const { index , label  } of added){
                if (labels[index] === label) {
                    labels.splice(index, 1);
                }
            }
            this._addedLabels = [];
        }
        super.init(scaleOptions);
    }
    parse(raw, index) {
        if (isNullOrUndef(raw)) {
            return null;
        }
        const labels = this.getLabels();
        index = isFinite(index) && labels[index] === raw ? index : findOrAddLabel(labels, raw, valueOrDefault(index, raw), this._addedLabels);
        return validIndex(index, labels.length - 1);
    }
    determineDataLimits() {
        const { minDefined , maxDefined  } = this.getUserBounds();
        let { min , max  } = this.getMinMax(true);
        if (this.options.bounds === 'ticks') {
            if (!minDefined) {
                min = 0;
            }
            if (!maxDefined) {
                max = this.getLabels().length - 1;
            }
        }
        this.min = min;
        this.max = max;
    }
    buildTicks() {
        const min = this.min;
        const max = this.max;
        const offset = this.options.offset;
        const ticks = [];
        let labels = this.getLabels();
        labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
        this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
        this._startValue = this.min - (offset ? 0.5 : 0);
        for(let value = min; value <= max; value++){
            ticks.push({
                value
            });
        }
        return ticks;
    }
    getLabelForValue(value) {
        return _getLabelForValue.call(this, value);
    }
 configure() {
        super.configure();
        if (!this.isHorizontal()) {
            this._reversePixels = !this._reversePixels;
        }
    }
    getPixelForValue(value) {
        if (typeof value !== 'number') {
            value = this.parse(value);
        }
        return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
    }
    getPixelForTick(index) {
        const ticks = this.ticks;
        if (index < 0 || index > ticks.length - 1) {
            return null;
        }
        return this.getPixelForValue(ticks[index].value);
    }
    getValueForPixel(pixel) {
        return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
    }
    getBasePixel() {
        return this.bottom;
    }
}

function generateTicks$1(generationOptions, dataRange) {
    const ticks = [];
    const MIN_SPACING = 1e-14;
    const { bounds , step , min , max , precision , count , maxTicks , maxDigits , includeBounds  } = generationOptions;
    const unit = step || 1;
    const maxSpaces = maxTicks - 1;
    const { min: rmin , max: rmax  } = dataRange;
    const minDefined = !isNullOrUndef(min);
    const maxDefined = !isNullOrUndef(max);
    const countDefined = !isNullOrUndef(count);
    const minSpacing = (rmax - rmin) / (maxDigits + 1);
    let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
    let factor, niceMin, niceMax, numSpaces;
    if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
        return [
            {
                value: rmin
            },
            {
                value: rmax
            }
        ];
    }
    numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
    if (numSpaces > maxSpaces) {
        spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
    }
    if (!isNullOrUndef(precision)) {
        factor = Math.pow(10, precision);
        spacing = Math.ceil(spacing * factor) / factor;
    }
    if (bounds === 'ticks') {
        niceMin = Math.floor(rmin / spacing) * spacing;
        niceMax = Math.ceil(rmax / spacing) * spacing;
    } else {
        niceMin = rmin;
        niceMax = rmax;
    }
    if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1000)) {
        numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
        spacing = (max - min) / numSpaces;
        niceMin = min;
        niceMax = max;
    } else if (countDefined) {
        niceMin = minDefined ? min : niceMin;
        niceMax = maxDefined ? max : niceMax;
        numSpaces = count - 1;
        spacing = (niceMax - niceMin) / numSpaces;
    } else {
        numSpaces = (niceMax - niceMin) / spacing;
        if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
            numSpaces = Math.round(numSpaces);
        } else {
            numSpaces = Math.ceil(numSpaces);
        }
    }
    const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
    factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
    niceMin = Math.round(niceMin * factor) / factor;
    niceMax = Math.round(niceMax * factor) / factor;
    let j = 0;
    if (minDefined) {
        if (includeBounds && niceMin !== min) {
            ticks.push({
                value: min
            });
            if (niceMin < min) {
                j++;
            }
            if (almostEquals(Math.round((niceMin + j * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) {
                j++;
            }
        } else if (niceMin < min) {
            j++;
        }
    }
    for(; j < numSpaces; ++j){
        ticks.push({
            value: Math.round((niceMin + j * spacing) * factor) / factor
        });
    }
    if (maxDefined && includeBounds && niceMax !== max) {
        if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) {
            ticks[ticks.length - 1].value = max;
        } else {
            ticks.push({
                value: max
            });
        }
    } else if (!maxDefined || niceMax === max) {
        ticks.push({
            value: niceMax
        });
    }
    return ticks;
}
function relativeLabelSize(value, minSpacing, { horizontal , minRotation  }) {
    const rad = toRadians(minRotation);
    const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 0.001;
    const length = 0.75 * minSpacing * ('' + value).length;
    return Math.min(minSpacing / ratio, length);
}
class LinearScaleBase extends Scale {
    constructor(cfg){
        super(cfg);
         this.start = undefined;
         this.end = undefined;
         this._startValue = undefined;
         this._endValue = undefined;
        this._valueRange = 0;
    }
    parse(raw, index) {
        if (isNullOrUndef(raw)) {
            return null;
        }
        if ((typeof raw === 'number' || raw instanceof Number) && !isFinite(+raw)) {
            return null;
        }
        return +raw;
    }
    handleTickRangeOptions() {
        const { beginAtZero  } = this.options;
        const { minDefined , maxDefined  } = this.getUserBounds();
        let { min , max  } = this;
        const setMin = (v)=>min = minDefined ? min : v;
        const setMax = (v)=>max = maxDefined ? max : v;
        if (beginAtZero) {
            const minSign = sign(min);
            const maxSign = sign(max);
            if (minSign < 0 && maxSign < 0) {
                setMax(0);
            } else if (minSign > 0 && maxSign > 0) {
                setMin(0);
            }
        }
        if (min === max) {
            let offset = max === 0 ? 1 : Math.abs(max * 0.05);
            setMax(max + offset);
            if (!beginAtZero) {
                setMin(min - offset);
            }
        }
        this.min = min;
        this.max = max;
    }
    getTickLimit() {
        const tickOpts = this.options.ticks;
        let { maxTicksLimit , stepSize  } = tickOpts;
        let maxTicks;
        if (stepSize) {
            maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
            if (maxTicks > 1000) {
                console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
                maxTicks = 1000;
            }
        } else {
            maxTicks = this.computeTickLimit();
            maxTicksLimit = maxTicksLimit || 11;
        }
        if (maxTicksLimit) {
            maxTicks = Math.min(maxTicksLimit, maxTicks);
        }
        return maxTicks;
    }
 computeTickLimit() {
        return Number.POSITIVE_INFINITY;
    }
    buildTicks() {
        const opts = this.options;
        const tickOpts = opts.ticks;
        let maxTicks = this.getTickLimit();
        maxTicks = Math.max(2, maxTicks);
        const numericGeneratorOptions = {
            maxTicks,
            bounds: opts.bounds,
            min: opts.min,
            max: opts.max,
            precision: tickOpts.precision,
            step: tickOpts.stepSize,
            count: tickOpts.count,
            maxDigits: this._maxDigits(),
            horizontal: this.isHorizontal(),
            minRotation: tickOpts.minRotation || 0,
            includeBounds: tickOpts.includeBounds !== false
        };
        const dataRange = this._range || this;
        const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
        if (opts.bounds === 'ticks') {
            _setMinAndMaxByKey(ticks, this, 'value');
        }
        if (opts.reverse) {
            ticks.reverse();
            this.start = this.max;
            this.end = this.min;
        } else {
            this.start = this.min;
            this.end = this.max;
        }
        return ticks;
    }
 configure() {
        const ticks = this.ticks;
        let start = this.min;
        let end = this.max;
        super.configure();
        if (this.options.offset && ticks.length) {
            const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
            start -= offset;
            end += offset;
        }
        this._startValue = start;
        this._endValue = end;
        this._valueRange = end - start;
    }
    getLabelForValue(value) {
        return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
    }
}

class LinearScale extends LinearScaleBase {
    static id = 'linear';
 static defaults = {
        ticks: {
            callback: Ticks.formatters.numeric
        }
    };
    determineDataLimits() {
        const { min , max  } = this.getMinMax(true);
        this.min = isNumberFinite(min) ? min : 0;
        this.max = isNumberFinite(max) ? max : 1;
        this.handleTickRangeOptions();
    }
 computeTickLimit() {
        const horizontal = this.isHorizontal();
        const length = horizontal ? this.width : this.height;
        const minRotation = toRadians(this.options.ticks.minRotation);
        const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 0.001;
        const tickFont = this._resolveTickFontOptions(0);
        return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
    }
    getPixelForValue(value) {
        return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
    }
    getValueForPixel(pixel) {
        return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
    }
}

const log10Floor = (v)=>Math.floor(log10(v));
const changeExponent = (v, m)=>Math.pow(10, log10Floor(v) + m);
function isMajor(tickVal) {
    const remain = tickVal / Math.pow(10, log10Floor(tickVal));
    return remain === 1;
}
function steps(min, max, rangeExp) {
    const rangeStep = Math.pow(10, rangeExp);
    const start = Math.floor(min / rangeStep);
    const end = Math.ceil(max / rangeStep);
    return end - start;
}
function startExp(min, max) {
    const range = max - min;
    let rangeExp = log10Floor(range);
    while(steps(min, max, rangeExp) > 10){
        rangeExp++;
    }
    while(steps(min, max, rangeExp) < 10){
        rangeExp--;
    }
    return Math.min(rangeExp, log10Floor(min));
}
 function generateTicks(generationOptions, { min , max  }) {
    min = finiteOrDefault(generationOptions.min, min);
    const ticks = [];
    const minExp = log10Floor(min);
    let exp = startExp(min, max);
    let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
    const stepSize = Math.pow(10, exp);
    const base = minExp > exp ? Math.pow(10, minExp) : 0;
    const start = Math.round((min - base) * precision) / precision;
    const offset = Math.floor((min - base) / stepSize / 10) * stepSize * 10;
    let significand = Math.floor((start - offset) / Math.pow(10, exp));
    let value = finiteOrDefault(generationOptions.min, Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision);
    while(value < max){
        ticks.push({
            value,
            major: isMajor(value),
            significand
        });
        if (significand >= 10) {
            significand = significand < 15 ? 15 : 20;
        } else {
            significand++;
        }
        if (significand >= 20) {
            exp++;
            significand = 2;
            precision = exp >= 0 ? 1 : precision;
        }
        value = Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision;
    }
    const lastTick = finiteOrDefault(generationOptions.max, value);
    ticks.push({
        value: lastTick,
        major: isMajor(lastTick),
        significand
    });
    return ticks;
}
class LogarithmicScale extends Scale {
    static id = 'logarithmic';
 static defaults = {
        ticks: {
            callback: Ticks.formatters.logarithmic,
            major: {
                enabled: true
            }
        }
    };
    constructor(cfg){
        super(cfg);
         this.start = undefined;
         this.end = undefined;
         this._startValue = undefined;
        this._valueRange = 0;
    }
    parse(raw, index) {
        const value = LinearScaleBase.prototype.parse.apply(this, [
            raw,
            index
        ]);
        if (value === 0) {
            this._zero = true;
            return undefined;
        }
        return isNumberFinite(value) && value > 0 ? value : null;
    }
    determineDataLimits() {
        const { min , max  } = this.getMinMax(true);
        this.min = isNumberFinite(min) ? Math.max(0, min) : null;
        this.max = isNumberFinite(max) ? Math.max(0, max) : null;
        if (this.options.beginAtZero) {
            this._zero = true;
        }
        if (this._zero && this.min !== this._suggestedMin && !isNumberFinite(this._userMin)) {
            this.min = min === changeExponent(this.min, 0) ? changeExponent(this.min, -1) : changeExponent(this.min, 0);
        }
        this.handleTickRangeOptions();
    }
    handleTickRangeOptions() {
        const { minDefined , maxDefined  } = this.getUserBounds();
        let min = this.min;
        let max = this.max;
        const setMin = (v)=>min = minDefined ? min : v;
        const setMax = (v)=>max = maxDefined ? max : v;
        if (min === max) {
            if (min <= 0) {
                setMin(1);
                setMax(10);
            } else {
                setMin(changeExponent(min, -1));
                setMax(changeExponent(max, +1));
            }
        }
        if (min <= 0) {
            setMin(changeExponent(max, -1));
        }
        if (max <= 0) {
            setMax(changeExponent(min, +1));
        }
        this.min = min;
        this.max = max;
    }
    buildTicks() {
        const opts = this.options;
        const generationOptions = {
            min: this._userMin,
            max: this._userMax
        };
        const ticks = generateTicks(generationOptions, this);
        if (opts.bounds === 'ticks') {
            _setMinAndMaxByKey(ticks, this, 'value');
        }
        if (opts.reverse) {
            ticks.reverse();
            this.start = this.max;
            this.end = this.min;
        } else {
            this.start = this.min;
            this.end = this.max;
        }
        return ticks;
    }
 getLabelForValue(value) {
        return value === undefined ? '0' : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
    }
 configure() {
        const start = this.min;
        super.configure();
        this._startValue = log10(start);
        this._valueRange = log10(this.max) - log10(start);
    }
    getPixelForValue(value) {
        if (value === undefined || value === 0) {
            value = this.min;
        }
        if (value === null || isNaN(value)) {
            return NaN;
        }
        return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
    }
    getValueForPixel(pixel) {
        const decimal = this.getDecimalForPixel(pixel);
        return Math.pow(10, this._startValue + decimal * this._valueRange);
    }
}

function getTickBackdropHeight(opts) {
    const tickOpts = opts.ticks;
    if (tickOpts.display && opts.display) {
        const padding = toPadding(tickOpts.backdropPadding);
        return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + padding.height;
    }
    return 0;
}
function measureLabelSize(ctx, font, label) {
    label = isArray(label) ? label : [
        label
    ];
    return {
        w: _longestText(ctx, font.string, label),
        h: label.length * font.lineHeight
    };
}
function determineLimits(angle, pos, size, min, max) {
    if (angle === min || angle === max) {
        return {
            start: pos - size / 2,
            end: pos + size / 2
        };
    } else if (angle < min || angle > max) {
        return {
            start: pos - size,
            end: pos
        };
    }
    return {
        start: pos,
        end: pos + size
    };
}
 function fitWithPointLabels(scale) {
    const orig = {
        l: scale.left + scale._padding.left,
        r: scale.right - scale._padding.right,
        t: scale.top + scale._padding.top,
        b: scale.bottom - scale._padding.bottom
    };
    const limits = Object.assign({}, orig);
    const labelSizes = [];
    const padding = [];
    const valueCount = scale._pointLabels.length;
    const pointLabelOpts = scale.options.pointLabels;
    const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
    for(let i = 0; i < valueCount; i++){
        const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i));
        padding[i] = opts.padding;
        const pointPosition = scale.getPointPosition(i, scale.drawingArea + padding[i], additionalAngle);
        const plFont = toFont(opts.font);
        const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i]);
        labelSizes[i] = textSize;
        const angleRadians = _normalizeAngle(scale.getIndexAngle(i) + additionalAngle);
        const angle = Math.round(toDegrees(angleRadians));
        const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
        const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
        updateLimits(limits, orig, angleRadians, hLimits, vLimits);
    }
    scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
    scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
}
function updateLimits(limits, orig, angle, hLimits, vLimits) {
    const sin = Math.abs(Math.sin(angle));
    const cos = Math.abs(Math.cos(angle));
    let x = 0;
    let y = 0;
    if (hLimits.start < orig.l) {
        x = (orig.l - hLimits.start) / sin;
        limits.l = Math.min(limits.l, orig.l - x);
    } else if (hLimits.end > orig.r) {
        x = (hLimits.end - orig.r) / sin;
        limits.r = Math.max(limits.r, orig.r + x);
    }
    if (vLimits.start < orig.t) {
        y = (orig.t - vLimits.start) / cos;
        limits.t = Math.min(limits.t, orig.t - y);
    } else if (vLimits.end > orig.b) {
        y = (vLimits.end - orig.b) / cos;
        limits.b = Math.max(limits.b, orig.b + y);
    }
}
function buildPointLabelItems(scale, labelSizes, padding) {
    const items = [];
    const valueCount = scale._pointLabels.length;
    const opts = scale.options;
    const extra = getTickBackdropHeight(opts) / 2;
    const outerDistance = scale.drawingArea;
    const additionalAngle = opts.pointLabels.centerPointLabels ? PI / valueCount : 0;
    for(let i = 0; i < valueCount; i++){
        const pointLabelPosition = scale.getPointPosition(i, outerDistance + extra + padding[i], additionalAngle);
        const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
        const size = labelSizes[i];
        const y = yForAngle(pointLabelPosition.y, size.h, angle);
        const textAlign = getTextAlignForAngle(angle);
        const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
        items.push({
            x: pointLabelPosition.x,
            y,
            textAlign,
            left,
            top: y,
            right: left + size.w,
            bottom: y + size.h
        });
    }
    return items;
}
function getTextAlignForAngle(angle) {
    if (angle === 0 || angle === 180) {
        return 'center';
    } else if (angle < 180) {
        return 'left';
    }
    return 'right';
}
function leftForTextAlign(x, w, align) {
    if (align === 'right') {
        x -= w;
    } else if (align === 'center') {
        x -= w / 2;
    }
    return x;
}
function yForAngle(y, h, angle) {
    if (angle === 90 || angle === 270) {
        y -= h / 2;
    } else if (angle > 270 || angle < 90) {
        y -= h;
    }
    return y;
}
function drawPointLabels(scale, labelCount) {
    const { ctx , options: { pointLabels  }  } = scale;
    for(let i = labelCount - 1; i >= 0; i--){
        const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
        const plFont = toFont(optsAtIndex.font);
        const { x , y , textAlign , left , top , right , bottom  } = scale._pointLabelItems[i];
        const { backdropColor  } = optsAtIndex;
        if (!isNullOrUndef(backdropColor)) {
            const borderRadius = toTRBLCorners(optsAtIndex.borderRadius);
            const padding = toPadding(optsAtIndex.backdropPadding);
            ctx.fillStyle = backdropColor;
            const backdropLeft = left - padding.left;
            const backdropTop = top - padding.top;
            const backdropWidth = right - left + padding.width;
            const backdropHeight = bottom - top + padding.height;
            if (Object.values(borderRadius).some((v)=>v !== 0)) {
                ctx.beginPath();
                addRoundedRectPath(ctx, {
                    x: backdropLeft,
                    y: backdropTop,
                    w: backdropWidth,
                    h: backdropHeight,
                    radius: borderRadius
                });
                ctx.fill();
            } else {
                ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
            }
        }
        renderText(ctx, scale._pointLabels[i], x, y + plFont.lineHeight / 2, plFont, {
            color: optsAtIndex.color,
            textAlign: textAlign,
            textBaseline: 'middle'
        });
    }
}
function pathRadiusLine(scale, radius, circular, labelCount) {
    const { ctx  } = scale;
    if (circular) {
        ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
    } else {
        let pointPosition = scale.getPointPosition(0, radius);
        ctx.moveTo(pointPosition.x, pointPosition.y);
        for(let i = 1; i < labelCount; i++){
            pointPosition = scale.getPointPosition(i, radius);
            ctx.lineTo(pointPosition.x, pointPosition.y);
        }
    }
}
function drawRadiusLine(scale, gridLineOpts, radius, labelCount, borderOpts) {
    const ctx = scale.ctx;
    const circular = gridLineOpts.circular;
    const { color , lineWidth  } = gridLineOpts;
    if (!circular && !labelCount || !color || !lineWidth || radius < 0) {
        return;
    }
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(borderOpts.dash);
    ctx.lineDashOffset = borderOpts.dashOffset;
    ctx.beginPath();
    pathRadiusLine(scale, radius, circular, labelCount);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}
function createPointLabelContext(parent, index, label) {
    return createContext(parent, {
        label,
        index,
        type: 'pointLabel'
    });
}
class RadialLinearScale extends LinearScaleBase {
    static id = 'radialLinear';
 static defaults = {
        display: true,
        animate: true,
        position: 'chartArea',
        angleLines: {
            display: true,
            lineWidth: 1,
            borderDash: [],
            borderDashOffset: 0.0
        },
        grid: {
            circular: false
        },
        startAngle: 0,
        ticks: {
            showLabelBackdrop: true,
            callback: Ticks.formatters.numeric
        },
        pointLabels: {
            backdropColor: undefined,
            backdropPadding: 2,
            display: true,
            font: {
                size: 10
            },
            callback (label) {
                return label;
            },
            padding: 5,
            centerPointLabels: false
        }
    };
    static defaultRoutes = {
        'angleLines.color': 'borderColor',
        'pointLabels.color': 'color',
        'ticks.color': 'color'
    };
    static descriptors = {
        angleLines: {
            _fallback: 'grid'
        }
    };
    constructor(cfg){
        super(cfg);
         this.xCenter = undefined;
         this.yCenter = undefined;
         this.drawingArea = undefined;
         this._pointLabels = [];
        this._pointLabelItems = [];
    }
    setDimensions() {
        const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
        const w = this.width = this.maxWidth - padding.width;
        const h = this.height = this.maxHeight - padding.height;
        this.xCenter = Math.floor(this.left + w / 2 + padding.left);
        this.yCenter = Math.floor(this.top + h / 2 + padding.top);
        this.drawingArea = Math.floor(Math.min(w, h) / 2);
    }
    determineDataLimits() {
        const { min , max  } = this.getMinMax(false);
        this.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
        this.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
        this.handleTickRangeOptions();
    }
 computeTickLimit() {
        return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
    }
    generateTickLabels(ticks) {
        LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
        this._pointLabels = this.getLabels().map((value, index)=>{
            const label = callback(this.options.pointLabels.callback, [
                value,
                index
            ], this);
            return label || label === 0 ? label : '';
        }).filter((v, i)=>this.chart.getDataVisibility(i));
    }
    fit() {
        const opts = this.options;
        if (opts.display && opts.pointLabels.display) {
            fitWithPointLabels(this);
        } else {
            this.setCenterPoint(0, 0, 0, 0);
        }
    }
    setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
        this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
        this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
        this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
    }
    getIndexAngle(index) {
        const angleMultiplier = TAU / (this._pointLabels.length || 1);
        const startAngle = this.options.startAngle || 0;
        return _normalizeAngle(index * angleMultiplier + toRadians(startAngle));
    }
    getDistanceFromCenterForValue(value) {
        if (isNullOrUndef(value)) {
            return NaN;
        }
        const scalingFactor = this.drawingArea / (this.max - this.min);
        if (this.options.reverse) {
            return (this.max - value) * scalingFactor;
        }
        return (value - this.min) * scalingFactor;
    }
    getValueForDistanceFromCenter(distance) {
        if (isNullOrUndef(distance)) {
            return NaN;
        }
        const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
        return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
    }
    getPointLabelContext(index) {
        const pointLabels = this._pointLabels || [];
        if (index >= 0 && index < pointLabels.length) {
            const pointLabel = pointLabels[index];
            return createPointLabelContext(this.getContext(), index, pointLabel);
        }
    }
    getPointPosition(index, distanceFromCenter, additionalAngle = 0) {
        const angle = this.getIndexAngle(index) - HALF_PI + additionalAngle;
        return {
            x: Math.cos(angle) * distanceFromCenter + this.xCenter,
            y: Math.sin(angle) * distanceFromCenter + this.yCenter,
            angle
        };
    }
    getPointPositionForValue(index, value) {
        return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
    }
    getBasePosition(index) {
        return this.getPointPositionForValue(index || 0, this.getBaseValue());
    }
    getPointLabelPosition(index) {
        const { left , top , right , bottom  } = this._pointLabelItems[index];
        return {
            left,
            top,
            right,
            bottom
        };
    }
 drawBackground() {
        const { backgroundColor , grid: { circular  }  } = this.options;
        if (backgroundColor) {
            const ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
            ctx.closePath();
            ctx.fillStyle = backgroundColor;
            ctx.fill();
            ctx.restore();
        }
    }
 drawGrid() {
        const ctx = this.ctx;
        const opts = this.options;
        const { angleLines , grid , border  } = opts;
        const labelCount = this._pointLabels.length;
        let i, offset, position;
        if (opts.pointLabels.display) {
            drawPointLabels(this, labelCount);
        }
        if (grid.display) {
            this.ticks.forEach((tick, index)=>{
                if (index !== 0) {
                    offset = this.getDistanceFromCenterForValue(tick.value);
                    const context = this.getContext(index);
                    const optsAtIndex = grid.setContext(context);
                    const optsAtIndexBorder = border.setContext(context);
                    drawRadiusLine(this, optsAtIndex, offset, labelCount, optsAtIndexBorder);
                }
            });
        }
        if (angleLines.display) {
            ctx.save();
            for(i = labelCount - 1; i >= 0; i--){
                const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
                const { color , lineWidth  } = optsAtIndex;
                if (!lineWidth || !color) {
                    continue;
                }
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = color;
                ctx.setLineDash(optsAtIndex.borderDash);
                ctx.lineDashOffset = optsAtIndex.borderDashOffset;
                offset = this.getDistanceFromCenterForValue(opts.ticks.reverse ? this.min : this.max);
                position = this.getPointPosition(i, offset);
                ctx.beginPath();
                ctx.moveTo(this.xCenter, this.yCenter);
                ctx.lineTo(position.x, position.y);
                ctx.stroke();
            }
            ctx.restore();
        }
    }
 drawBorder() {}
 drawLabels() {
        const ctx = this.ctx;
        const opts = this.options;
        const tickOpts = opts.ticks;
        if (!tickOpts.display) {
            return;
        }
        const startAngle = this.getIndexAngle(0);
        let offset, width;
        ctx.save();
        ctx.translate(this.xCenter, this.yCenter);
        ctx.rotate(startAngle);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        this.ticks.forEach((tick, index)=>{
            if (index === 0 && !opts.reverse) {
                return;
            }
            const optsAtIndex = tickOpts.setContext(this.getContext(index));
            const tickFont = toFont(optsAtIndex.font);
            offset = this.getDistanceFromCenterForValue(this.ticks[index].value);
            if (optsAtIndex.showLabelBackdrop) {
                ctx.font = tickFont.string;
                width = ctx.measureText(tick.label).width;
                ctx.fillStyle = optsAtIndex.backdropColor;
                const padding = toPadding(optsAtIndex.backdropPadding);
                ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
            }
            renderText(ctx, tick.label, 0, -offset, tickFont, {
                color: optsAtIndex.color
            });
        });
        ctx.restore();
    }
 drawTitle() {}
}

const INTERVALS = {
    millisecond: {
        common: true,
        size: 1,
        steps: 1000
    },
    second: {
        common: true,
        size: 1000,
        steps: 60
    },
    minute: {
        common: true,
        size: 60000,
        steps: 60
    },
    hour: {
        common: true,
        size: 3600000,
        steps: 24
    },
    day: {
        common: true,
        size: 86400000,
        steps: 30
    },
    week: {
        common: false,
        size: 604800000,
        steps: 4
    },
    month: {
        common: true,
        size: 2.628e9,
        steps: 12
    },
    quarter: {
        common: false,
        size: 7.884e9,
        steps: 4
    },
    year: {
        common: true,
        size: 3.154e10
    }
};
 const UNITS =  /* #__PURE__ */ Object.keys(INTERVALS);
 function sorter(a, b) {
    return a - b;
}
 function parse(scale, input) {
    if (isNullOrUndef(input)) {
        return null;
    }
    const adapter = scale._adapter;
    const { parser , round , isoWeekday  } = scale._parseOpts;
    let value = input;
    if (typeof parser === 'function') {
        value = parser(value);
    }
    if (!isNumberFinite(value)) {
        value = typeof parser === 'string' ? adapter.parse(value,  parser) : adapter.parse(value);
    }
    if (value === null) {
        return null;
    }
    if (round) {
        value = round === 'week' && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, 'isoWeek', isoWeekday) : adapter.startOf(value, round);
    }
    return +value;
}
 function determineUnitForAutoTicks(minUnit, min, max, capacity) {
    const ilen = UNITS.length;
    for(let i = UNITS.indexOf(minUnit); i < ilen - 1; ++i){
        const interval = INTERVALS[UNITS[i]];
        const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
        if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
            return UNITS[i];
        }
    }
    return UNITS[ilen - 1];
}
 function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
    for(let i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--){
        const unit = UNITS[i];
        if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
            return unit;
        }
    }
    return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
}
 function determineMajorUnit(unit) {
    for(let i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i){
        if (INTERVALS[UNITS[i]].common) {
            return UNITS[i];
        }
    }
}
 function addTick(ticks, time, timestamps) {
    if (!timestamps) {
        ticks[time] = true;
    } else if (timestamps.length) {
        const { lo , hi  } = _lookup(timestamps, time);
        const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
        ticks[timestamp] = true;
    }
}
 function setMajorTicks(scale, ticks, map, majorUnit) {
    const adapter = scale._adapter;
    const first = +adapter.startOf(ticks[0].value, majorUnit);
    const last = ticks[ticks.length - 1].value;
    let major, index;
    for(major = first; major <= last; major = +adapter.add(major, 1, majorUnit)){
        index = map[major];
        if (index >= 0) {
            ticks[index].major = true;
        }
    }
    return ticks;
}
 function ticksFromTimestamps(scale, values, majorUnit) {
    const ticks = [];
     const map = {};
    const ilen = values.length;
    let i, value;
    for(i = 0; i < ilen; ++i){
        value = values[i];
        map[value] = i;
        ticks.push({
            value,
            major: false
        });
    }
    return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
}
class TimeScale extends Scale {
    static id = 'time';
 static defaults = {
 bounds: 'data',
        adapters: {},
        time: {
            parser: false,
            unit: false,
            round: false,
            isoWeekday: false,
            minUnit: 'millisecond',
            displayFormats: {}
        },
        ticks: {
 source: 'auto',
            callback: false,
            major: {
                enabled: false
            }
        }
    };
 constructor(props){
        super(props);
         this._cache = {
            data: [],
            labels: [],
            all: []
        };
         this._unit = 'day';
         this._majorUnit = undefined;
        this._offsets = {};
        this._normalized = false;
        this._parseOpts = undefined;
    }
    init(scaleOpts, opts = {}) {
        const time = scaleOpts.time || (scaleOpts.time = {});
         const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
        adapter.init(opts);
        mergeIf(time.displayFormats, adapter.formats());
        this._parseOpts = {
            parser: time.parser,
            round: time.round,
            isoWeekday: time.isoWeekday
        };
        super.init(scaleOpts);
        this._normalized = opts.normalized;
    }
 parse(raw, index) {
        if (raw === undefined) {
            return null;
        }
        return parse(this, raw);
    }
    beforeLayout() {
        super.beforeLayout();
        this._cache = {
            data: [],
            labels: [],
            all: []
        };
    }
    determineDataLimits() {
        const options = this.options;
        const adapter = this._adapter;
        const unit = options.time.unit || 'day';
        let { min , max , minDefined , maxDefined  } = this.getUserBounds();
 function _applyBounds(bounds) {
            if (!minDefined && !isNaN(bounds.min)) {
                min = Math.min(min, bounds.min);
            }
            if (!maxDefined && !isNaN(bounds.max)) {
                max = Math.max(max, bounds.max);
            }
        }
        if (!minDefined || !maxDefined) {
            _applyBounds(this._getLabelBounds());
            if (options.bounds !== 'ticks' || options.ticks.source !== 'labels') {
                _applyBounds(this.getMinMax(false));
            }
        }
        min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
        max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
        this.min = Math.min(min, max - 1);
        this.max = Math.max(min + 1, max);
    }
 _getLabelBounds() {
        const arr = this.getLabelTimestamps();
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;
        if (arr.length) {
            min = arr[0];
            max = arr[arr.length - 1];
        }
        return {
            min,
            max
        };
    }
 buildTicks() {
        const options = this.options;
        const timeOpts = options.time;
        const tickOpts = options.ticks;
        const timestamps = tickOpts.source === 'labels' ? this.getLabelTimestamps() : this._generate();
        if (options.bounds === 'ticks' && timestamps.length) {
            this.min = this._userMin || timestamps[0];
            this.max = this._userMax || timestamps[timestamps.length - 1];
        }
        const min = this.min;
        const max = this.max;
        const ticks = _filterBetween(timestamps, min, max);
        this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
        this._majorUnit = !tickOpts.major.enabled || this._unit === 'year' ? undefined : determineMajorUnit(this._unit);
        this.initOffsets(timestamps);
        if (options.reverse) {
            ticks.reverse();
        }
        return ticksFromTimestamps(this, ticks, this._majorUnit);
    }
    afterAutoSkip() {
        if (this.options.offsetAfterAutoskip) {
            this.initOffsets(this.ticks.map((tick)=>+tick.value));
        }
    }
 initOffsets(timestamps = []) {
        let start = 0;
        let end = 0;
        let first, last;
        if (this.options.offset && timestamps.length) {
            first = this.getDecimalForValue(timestamps[0]);
            if (timestamps.length === 1) {
                start = 1 - first;
            } else {
                start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
            }
            last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
            if (timestamps.length === 1) {
                end = last;
            } else {
                end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
            }
        }
        const limit = timestamps.length < 3 ? 0.5 : 0.25;
        start = _limitValue(start, 0, limit);
        end = _limitValue(end, 0, limit);
        this._offsets = {
            start,
            end,
            factor: 1 / (start + 1 + end)
        };
    }
 _generate() {
        const adapter = this._adapter;
        const min = this.min;
        const max = this.max;
        const options = this.options;
        const timeOpts = options.time;
        const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
        const stepSize = valueOrDefault(options.ticks.stepSize, 1);
        const weekday = minor === 'week' ? timeOpts.isoWeekday : false;
        const hasWeekday = isNumber(weekday) || weekday === true;
        const ticks = {};
        let first = min;
        let time, count;
        if (hasWeekday) {
            first = +adapter.startOf(first, 'isoWeek', weekday);
        }
        first = +adapter.startOf(first, hasWeekday ? 'day' : minor);
        if (adapter.diff(max, min, minor) > 100000 * stepSize) {
            throw new Error(min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor);
        }
        const timestamps = options.ticks.source === 'data' && this.getDataTimestamps();
        for(time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++){
            addTick(ticks, time, timestamps);
        }
        if (time === max || options.bounds === 'ticks' || count === 1) {
            addTick(ticks, time, timestamps);
        }
        return Object.keys(ticks).sort((a, b)=>a - b).map((x)=>+x);
    }
 getLabelForValue(value) {
        const adapter = this._adapter;
        const timeOpts = this.options.time;
        if (timeOpts.tooltipFormat) {
            return adapter.format(value, timeOpts.tooltipFormat);
        }
        return adapter.format(value, timeOpts.displayFormats.datetime);
    }
 _tickFormatFunction(time, index, ticks, format) {
        const options = this.options;
        const formatter = options.ticks.callback;
        if (formatter) {
            return callback(formatter, [
                time,
                index,
                ticks
            ], this);
        }
        const formats = options.time.displayFormats;
        const unit = this._unit;
        const majorUnit = this._majorUnit;
        const minorFormat = unit && formats[unit];
        const majorFormat = majorUnit && formats[majorUnit];
        const tick = ticks[index];
        const major = majorUnit && majorFormat && tick && tick.major;
        return this._adapter.format(time, format || (major ? majorFormat : minorFormat));
    }
 generateTickLabels(ticks) {
        let i, ilen, tick;
        for(i = 0, ilen = ticks.length; i < ilen; ++i){
            tick = ticks[i];
            tick.label = this._tickFormatFunction(tick.value, i, ticks);
        }
    }
 getDecimalForValue(value) {
        return value === null ? NaN : (value - this.min) / (this.max - this.min);
    }
 getPixelForValue(value) {
        const offsets = this._offsets;
        const pos = this.getDecimalForValue(value);
        return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
    }
 getValueForPixel(pixel) {
        const offsets = this._offsets;
        const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
        return this.min + pos * (this.max - this.min);
    }
 _getLabelSize(label) {
        const ticksOpts = this.options.ticks;
        const tickLabelWidth = this.ctx.measureText(label).width;
        const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
        const cosRotation = Math.cos(angle);
        const sinRotation = Math.sin(angle);
        const tickFontSize = this._resolveTickFontOptions(0).size;
        return {
            w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
            h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
        };
    }
 _getLabelCapacity(exampleTime) {
        const timeOpts = this.options.time;
        const displayFormats = timeOpts.displayFormats;
        const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
        const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [
            exampleTime
        ], this._majorUnit), format);
        const size = this._getLabelSize(exampleLabel);
        const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
        return capacity > 0 ? capacity : 1;
    }
 getDataTimestamps() {
        let timestamps = this._cache.data || [];
        let i, ilen;
        if (timestamps.length) {
            return timestamps;
        }
        const metas = this.getMatchingVisibleMetas();
        if (this._normalized && metas.length) {
            return this._cache.data = metas[0].controller.getAllParsedValues(this);
        }
        for(i = 0, ilen = metas.length; i < ilen; ++i){
            timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(this));
        }
        return this._cache.data = this.normalize(timestamps);
    }
 getLabelTimestamps() {
        const timestamps = this._cache.labels || [];
        let i, ilen;
        if (timestamps.length) {
            return timestamps;
        }
        const labels = this.getLabels();
        for(i = 0, ilen = labels.length; i < ilen; ++i){
            timestamps.push(parse(this, labels[i]));
        }
        return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
    }
 normalize(values) {
        return _arrayUnique(values.sort(sorter));
    }
}

function interpolate(table, val, reverse) {
    let lo = 0;
    let hi = table.length - 1;
    let prevSource, nextSource, prevTarget, nextTarget;
    if (reverse) {
        if (val >= table[lo].pos && val <= table[hi].pos) {
            ({ lo , hi  } = _lookupByKey(table, 'pos', val));
        }
        ({ pos: prevSource , time: prevTarget  } = table[lo]);
        ({ pos: nextSource , time: nextTarget  } = table[hi]);
    } else {
        if (val >= table[lo].time && val <= table[hi].time) {
            ({ lo , hi  } = _lookupByKey(table, 'time', val));
        }
        ({ time: prevSource , pos: prevTarget  } = table[lo]);
        ({ time: nextSource , pos: nextTarget  } = table[hi]);
    }
    const span = nextSource - prevSource;
    return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
}
class TimeSeriesScale extends TimeScale {
    static id = 'timeseries';
 static defaults = TimeScale.defaults;
 constructor(props){
        super(props);
         this._table = [];
         this._minPos = undefined;
         this._tableRange = undefined;
    }
 initOffsets() {
        const timestamps = this._getTimestampsForTable();
        const table = this._table = this.buildLookupTable(timestamps);
        this._minPos = interpolate(table, this.min);
        this._tableRange = interpolate(table, this.max) - this._minPos;
        super.initOffsets(timestamps);
    }
 buildLookupTable(timestamps) {
        const { min , max  } = this;
        const items = [];
        const table = [];
        let i, ilen, prev, curr, next;
        for(i = 0, ilen = timestamps.length; i < ilen; ++i){
            curr = timestamps[i];
            if (curr >= min && curr <= max) {
                items.push(curr);
            }
        }
        if (items.length < 2) {
            return [
                {
                    time: min,
                    pos: 0
                },
                {
                    time: max,
                    pos: 1
                }
            ];
        }
        for(i = 0, ilen = items.length; i < ilen; ++i){
            next = items[i + 1];
            prev = items[i - 1];
            curr = items[i];
            if (Math.round((next + prev) / 2) !== curr) {
                table.push({
                    time: curr,
                    pos: i / (ilen - 1)
                });
            }
        }
        return table;
    }
 _getTimestampsForTable() {
        let timestamps = this._cache.all || [];
        if (timestamps.length) {
            return timestamps;
        }
        const data = this.getDataTimestamps();
        const label = this.getLabelTimestamps();
        if (data.length && label.length) {
            timestamps = this.normalize(data.concat(label));
        } else {
            timestamps = data.length ? data : label;
        }
        timestamps = this._cache.all = timestamps;
        return timestamps;
    }
 getDecimalForValue(value) {
        return (interpolate(this._table, value) - this._minPos) / this._tableRange;
    }
 getValueForPixel(pixel) {
        const offsets = this._offsets;
        const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
        return interpolate(this._table, decimal * this._tableRange + this._minPos, true);
    }
}

var scales = /*#__PURE__*/Object.freeze({
__proto__: null,
CategoryScale: CategoryScale,
LinearScale: LinearScale,
LogarithmicScale: LogarithmicScale,
RadialLinearScale: RadialLinearScale,
TimeScale: TimeScale,
TimeSeriesScale: TimeSeriesScale
});

const registerables = [
    controllers,
    elements,
    plugins,
    scales
];

Chart$1.register(...registerables);
var Chart = Chart$1;

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let GraphCard = class GraphCard extends s$3 {
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    fill() {
        const canvas = this.querySelector('canvas');
        const data = {
            labels: ['januar', 'february', 'march', 'april,', 'may', 'juni', 'juli', 'august'],
            datasets: [
                {
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        };
        const ctx = canvas.getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                onClick: e => { },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }
    render() {
        return y `<sl-card class="card-overview graph-cards">
            <div>
                <canvas></canvas>
            </div>

            <div slot="footer">data in a chart</div>
        </sl-card>`;
    }
};
GraphCard = __decorate$4([
    localized(),
    e$3('graph-card')
], GraphCard);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ViewLayout = class ViewLayout extends s$3 {
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
    // triggers after some one click on the menu
    setActive() { }
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
    e$2({ attribute: true, reflect: true })
], ViewLayout.prototype, "name", void 0);
ViewLayout = __decorate$3([
    localized(),
    e$3('view-layout')
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

const browserName = (function (agent) {
    switch (true) {
        case agent.indexOf('edge') > -1:
            return 'MS Edge';
        case agent.indexOf('edg/') > -1:
            return 'Edge ( chromium based)';
        case agent.indexOf('opr') > -1 && !!window?.opr:
            return 'Opera';
        case agent.indexOf('chrome') > -1 && !!window?.chrome:
            return 'Chrome';
        case agent.indexOf('trident') > -1:
            return 'MS IE';
        case agent.indexOf('firefox') > -1:
            return 'Mozilla Firefox';
        case agent.indexOf('safari') > -1:
            return 'Safari';
        default:
            return 'other';
    }
})(window.navigator.userAgent.toLowerCase());
const isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
navigator.userAgent.indexOf('Firefox') !== -1;
const isDesktop = !isPhone;
const client = {
    ua: navigator.userAgent,
    timezone: new Date().getTimezoneOffset() / 60,
    screen: {
        width: screen.width,
        height: screen.height,
    },
    browser: {
        name: browserName,
    },
    user: {
        language: localStorage.getItem('language') || navigator.language,
    },
    system: {
        language: navigator.language,
        platform: navigator.platform,
        isDesktop,
        isIOS,
        isPhone,
    },
};

const toasts = {
    primary: 'info-circle',
    success: 'check2-circle',
    neutral: 'gear',
    warning: 'exclamation-triangle',
    danger: 'exclamation-octagon',
};
function toast (variant, title, text) {
    const alert = Object.assign(document.createElement('sl-alert'), {
        variant,
        closable: true,
        duration: 3000,
        innerHTML: `
          <sl-icon name="${toasts[variant]}" slot="icon"></sl-icon>
          <strong>${title}</strong><br />${text}
        `,
    });
    document.body.append(alert);
    alert.toast();
}

const avatarSizes = Object.freeze({
    resolution: {
        large: 224,
        medium: 128,
        small: 44,
    },
    file: {
        maxSize: 1024 * 1024 * 4, // 4MBs
    },
});

function transRights(key) {
    if (key === 'addTeamMember') {
        return msg('Add Team Member');
    }
    if (key === 'removeTeamMember') {
        return msg('Remove Team Member');
    }
    if (key === 'changeTeamMemberRole') {
        return msg('Change Team Member Role');
    }
    if (key === 'changeTeamMemberRights') {
        return msg('Change Team Member Rights');
    }
    if (key === 'createRole') {
        return msg('Team member can create roles');
    }
    return msg('Unknown');
}
function transRightsInfo(key) {
    if (key === 'addTeamMember') {
        return msg('Team member can add other team members');
    }
    if (key === 'removeTeamMember') {
        return msg('Team member can remove other team members');
    }
    if (key === 'changeTeamMemberRole') {
        return msg('Team member can change the role of other team members');
    }
    if (key === 'changeTeamMemberRights') {
        return msg('Team member can change the rights of other team members');
    }
    if (key === 'createRole') {
        return msg('Team member can create new roles for other team member');
    }
    return msg('Unknown Rights, please add them to frontent/src/ts/utililties/trans/');
}

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const passwordMinLength = 8;
const passwordMaxLength = 35;
const maxLengthAbout = 560;
const activeMemberClass = 'team-member-active';
const fallbackUser = {
    _id: '',
    username: '',
    role: '',
    roleName: '',
    email: '',
    about: '',
    avatar: '',
    member: undefined,
    isSuperAdmin: false,
};
let ProfileView = class ProfileView extends ViewLayout$1 {
    rights = {
        _id: '',
        name: '',
        addTeamMember: false,
        removeTeamMember: false,
        changeTeamMemberRole: false,
        changeTeamMemberRights: false,
        createRole: false,
    };
    me = structuredClone(fallbackUser);
    user = structuredClone(fallbackUser);
    team = {
        _id: '',
        maxMembers: 0,
        name: 'loading…',
        members: [structuredClone(fallbackUser)],
    };
    roles = [
        {
            _id: '',
            name: 'member',
            teamId: '',
            __v: 0,
        },
    ];
    activeSearchResults = '0';
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
    async connectedCallback() {
        const request = await fetch('/me');
        const json = await request.json();
        super.connectedCallback();
        this.#getUserData();
        await this.#getRole();
        this.me = json;
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    async #getRole() {
        const request = await fetch('/role/getRole', {
            method: 'GET',
            ...header,
        });
        const role = await request.json();
        this.rights = role;
        return role;
    }
    async #getUserData() {
        const request = await fetch('/me', {
            method: 'GET',
            ...header,
        });
        const me = await request.json();
        this.me = me;
        return me;
    }
    async #hasUserDataChanged(newData) {
        const user = await this.#getUserData();
        const sameUsername = newData.username === user.username.toLowerCase();
        const sameEmail = newData.email === user.email;
        const sameAbout = newData.about === (user.about || '');
        if (sameUsername && sameEmail && sameAbout) {
            return false;
        }
        return true;
    }
    async #saveAccountChanges() {
        const usernameElem = this.querySelector('#username');
        const emailElem = this.querySelector('#mail');
        const aboutElem = this.querySelector('#about');
        const newData = {
            username: usernameElem.value.trim().toLowerCase(),
            email: emailElem.value,
            about: aboutElem.value.trim(),
        };
        const hasDataChanged = await this.#hasUserDataChanged(newData);
        if (!hasDataChanged) {
            return toast('neutral', msg('User Update'), msg('Change user details to trigger an update'));
        }
        const request = await fetch('/user', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                client,
                data: newData,
            }),
        });
        const json = await request.json();
        if (json.acknowledged) {
            toast('success', msg('User Update'), msg('Changes saved'));
        }
        if (json.refresh) {
            console.log('refreshing…');
            setTimeout(() => {
                location.reload();
            }, 2500);
        }
    }
    async #logout() {
        await fetch('/logout', {
            method: 'GET',
            ...header,
        });
        return location.reload();
    }
    #changeLangEvent({ target: { value } }) {
        setLocale(value);
        localStorage.setItem('lang', value);
        document.querySelector('html')?.setAttribute('lang', value);
    }
    #renderLanguageSelect() {
        const lang = localStorage.getItem('lang') || languages[0].code;
        return y `<sl-select
            size="small"
            @click="${this.#changeLangEvent}"
            label="${capitalize(msg('language'))}"
            value="${lang}"
            class="md:w-1/4"
        >
            ${c$2(languages, function ({ name, code }) {
            return y `<sl-option size="small" value="${code}">${name}</sl-option>`;
        })}
        </sl-select>`;
    }
    async #sendCheckPassword(oldPassword) {
        const request = await fetch('/checkPassword', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                data: {
                    password: oldPassword,
                },
                client,
            }),
        });
        const { auth } = await request.json();
        return auth;
    }
    async #sendChangePassword(newPassword) {
        const request = await fetch('/changePassword', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                data: {
                    password: newPassword,
                },
                client,
            }),
        });
        const json = await request.json();
        return json.status.acknowledged;
    }
    async #changePassword() {
        const oldPasswordElem = this.querySelector('#oldpassword');
        const newPasswordElem = this.querySelector('#newpassword');
        const newPasswordconfirmElem = this.querySelector('#newpasswordconfirm');
        const oldPassword = oldPasswordElem.value;
        const newPassword = newPasswordElem.value;
        const newPasswordConfirm = newPasswordconfirmElem.value;
        const samePassword = newPassword === newPasswordConfirm;
        const user = await this.#getUserData();
        if (oldPassword === '' || newPassword === '' || newPasswordConfirm === '') {
            return toast('warning', msg('New Password'), msg('Please fill out all fields'));
        }
        if (!samePassword) {
            return toast('warning', msg('New Password'), msg("New password doesn't match"));
        }
        if (oldPassword === newPassword) {
            return toast('warning', msg('New Password'), msg('Old password and new password are the same'));
        }
        if (!(await this.#sendCheckPassword(oldPassword))) {
            return toast('warning', msg('New Password'), msg('Old password is wrong'));
        }
        if (newPassword.length < passwordMinLength) {
            return toast('warning', msg('New Password'), msg('New password is too short, min 8 characterss'));
        }
        if (newPassword.length > passwordMaxLength) {
            return toast('warning', msg('New Password'), msg('New password is too long, max 35 characters'));
        }
        if (newPassword.includes(' ')) {
            return toast('warning', msg('New Password'), msg('New password cannot contain spaces'));
        }
        if (user.username === newPassword) {
            return toast('warning', msg('New Password'), msg('New password cannot be the same as your username'));
        }
        if (!/\d/.test(newPassword)) {
            return toast('warning', msg('New Password'), msg('New password must contain at least one number'));
        }
        if (!/[a-z]/.test(newPassword)) {
            return toast('warning', msg('New Password'), msg('New password must contain at least one lowercase letter'));
        }
        if (!/[A-Z]/.test(newPassword)) {
            return toast('warning', msg('New Password'), msg('New password must contain at least one uppercase letter'));
        }
        if (await this.#sendChangePassword(newPassword)) {
            setTimeout(() => location.reload(), 4000);
            return toast('success', msg('New Password'), msg('Password changed successfully, refresh in 5 seconds'));
        }
        return toast('danger', msg('New Password'), msg('Something went wrong'));
    }
    async #sendAvatar(file, imgTag, e) {
        const request = await fetch('/changeAvatar', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                data: {
                    type: file.type,
                    name: file.name,
                    size: file.size,
                    lastModified: file.lastModified,
                    width: imgTag.width,
                    height: imgTag.height,
                    file: e.target?.result,
                },
                client,
            }),
        });
        await request.json();
        return toast('success', msg('avatar'), msg('Avatar changed successfully, refresh to see changes'));
    }
    async #changeAvatarEvent(e) {
        const reader = new FileReader();
        const file = e.target.files[0];
        const imgTag = document.createElement('img');
        const url = URL.createObjectURL(file);
        reader.onload = (event) => {
            imgTag.src = url;
            imgTag.onload = () => {
                if (file.size > avatarSizes.file.maxSize) {
                    return toast('warning', msg('avatar'), msg('Image is too big, max 4mb'));
                }
                if (imgTag.width < avatarSizes.resolution.large || imgTag.height < avatarSizes.resolution.large) {
                    return toast('warning', msg('avatar'), msg('Image is too small, min 224x224'));
                }
                this.#sendAvatar(file, imgTag, event);
                URL.revokeObjectURL(url);
            };
        };
        reader.readAsDataURL(file);
    }
    #clickUploadAvatar() {
        const input = this.querySelector('input[type="file"]');
        input.click();
    }
    #renderAccountSection() {
        return y `<div class="account-section">
                <div>
                    <div class="grid grid-rows-1 md:grid-cols-2 md:gap-4">
                        <sl-input
                            id="username"
                            minlength="3"
                            maxlength="20"
                            label="${capitalize(msg('username'))}"
                            size="small"
                            value="${this.me.username}"
                        ></sl-input>
                        <sl-input
                            id="mail"
                            label="${capitalize(msg('Email address'))}"
                            type="email"
                            size="small"
                            value="${this.me.email}"
                        >
                            <sl-icon name="envelope-at" slot="prefix"></sl-icon>
                        </sl-input>
                    </div>

                    <sl-textarea
                        id="about"
                        maxlength="${maxLengthAbout}"
                        resize="none"
                        size="small"
                        rows="7"
                        help-text="${msg('write something about you')}"
                        label="${capitalize(msg('about'))}"
                        value="${this.me.about}"
                    ></sl-textarea>
                </div>
                <div>
                    <p>${capitalize(msg('photo'))}</p>
                    <sl-tooltip content="${msg('click to upload new avatar')}" placement="top">
                        <sl-avatar
                            @click="${this.#clickUploadAvatar}"
                            style="--size: 14rem;"
                            image="${this.me.avatar ? `${this.me.avatar}avatar_large.webp` : imgs.avatar}"
                            )}"
                        ></sl-avatar>
                        <input
                            @change="${this.#changeAvatarEvent}"
                            type="file"
                            class="hidden"
                            accept="image/jpeg,image/jpg,image/webp,image/png"
                        />
                    </sl-tooltip>
                </div>
            </div>
            <sl-divider style="--width: 2px;"></sl-divider>
            ${this.#renderLanguageSelect()}
            <sl-divider style="--width: 2px;"></sl-divider>
            <div>
                <sl-button size="small" variant="danger" @click="${this.#logout}">logout</sl-button>
                <sl-button size="small" variant="primary" class="float-right" @click="${this.#saveAccountChanges}"
                    >${msg('save')}</sl-button
                >
            </div>`;
    }
    #renderPasswordSection() {
        return y `<div class="password-section">
            <sl-input
                id="oldpassword"
                size="small"
                label="${capitalize(msg('Old Password'))}:"
                type="password"
                password-toggle
            >
            </sl-input>
            <sl-input
                id="newpassword"
                size="small"
                minlength="${passwordMinLength}"
                maxlength="${passwordMaxLength}"
                label="${capitalize(msg('New Password'))}:"
                type="password"
                password-toggle
            ></sl-input>
            <sl-input
                id="newpasswordconfirm"
                size="small"
                minlength="${passwordMinLength}"
                maxlength="${passwordMaxLength}"
                label="${capitalize(msg('Confirm New Password'))}:"
                type="password"
                password-toggle
            ></sl-input>
            <sl-button @click="${this.#changePassword}" class="mt-4" size="small" variant="danger"
                >${msg('update password')}</sl-button
            >
        </div>`;
    }
    #bootstrapFirstClickOnTeamTab() {
        const hasActive = this.querySelector(`.team-member.${activeMemberClass}`);
        if (!hasActive) {
            const memberElem = this?.querySelector('.team-member');
            const _id = memberElem?.getAttribute('data-id');
            const member = this.team.members.find((member) => member._id === _id);
            if (member) {
                return this.#clickOnteamMember(member);
            }
        }
    }
    async #getRoles() {
        const rolesRequest = await fetch('/role/getRoles', {
            method: 'GET',
            ...header,
        });
        return await rolesRequest.json();
    }
    async #switchToTeamTab() {
        const teamRequest = await fetch('/team', {
            method: 'GET',
            ...header,
        });
        const team = await teamRequest.json();
        const membersRequest = await fetch('/getUsers', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                data: {
                    ids: team.members,
                },
                client,
            }),
        });
        const unsortMembers = await membersRequest.json();
        const members = unsortMembers.sort((a, b) => a.username.localeCompare(b.username));
        const roles = await this.#getRoles();
        this.roles = roles;
        this.team = team;
        this.team.members = this.team.members.map((member, i) => {
            return {
                member,
                ...members[i],
            };
        });
        if (this.activeSearchResults === '0') {
            this.activeSearchResults = this.team.members.length + '';
        }
        this.requestUpdate();
        requestAnimationFrame(() => {
            this.#bootstrapFirstClickOnTeamTab();
        });
    }
    async #switchToRoleTab() {
        const roles = await this.#getRoles();
        this.roles = roles;
        this.requestUpdate();
    }
    async #tabSwitchEvent({ detail: { name } }) {
        if (name === 'team') {
            return await this.#switchToTeamTab();
        }
        if (name === 'role') {
            return await this.#switchToRoleTab();
        }
    }
    #clickOnteamMember(member) {
        const hasActive = this.querySelector(`.team-member.${activeMemberClass}`);
        const active_id = hasActive?.getAttribute('data-id');
        this.user = member;
        if (active_id !== member._id) {
            const newActive = this?.querySelector(`.team-member[data-id="${member._id}"]`);
            hasActive?.classList.remove(activeMemberClass);
            newActive.classList.add(activeMemberClass);
            return this.requestUpdate();
        }
    }
    #closeRemoveTeamMemberDialog() {
        const dialog = this.querySelector('#remove-team-member-dialog');
        dialog?.hide();
    }
    #closeAddMemberDialog() {
        const dialog = this.querySelector('#add-member-dialog');
        dialog?.hide();
    }
    #openRemoveTeamMemberDialog() {
        const dialog = this.querySelector('#remove-team-member-dialog');
        dialog?.show();
    }
    async #removeTeamMember() {
        const request = await fetch('/team/removeMember', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                data: {
                    member: this.user,
                },
                client,
            }),
        });
        await request.json();
        await this.#tabSwitchEvent({ detail: { name: 'team' } });
        this.#closeRemoveTeamMemberDialog();
        return toast('success', msg('team'), msg('member removed successfully'));
    }
    async #changeRoleEvent({ target }) {
        const role = target.value;
        const member = this.team.members.find((member) => member._id === this.user._id);
        if (!role || !member || role === this.user.roleName) {
            return;
        }
        const request = await fetch('/team/changeRole', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                data: {
                    member: this.user,
                    role,
                },
                client,
            }),
        });
        await request.json();
        member.roleName = role;
        this.user.roleName = role;
        this.requestUpdate();
        return toast('success', msg('role'), msg('role changed successfully'));
    }
    async #addNewTeamMember() {
        const emailInput = this.querySelector('#add-member-email');
        const dialog = this.querySelector('#add-member-dialog');
        const roleInput = this.querySelector('#add-member-role');
        if (!emailInput.checkValidity()) {
            return;
        }
        const request = await fetch('/team/addMember', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                data: {
                    member: this.user,
                    email: emailInput.value,
                    roleName: roleInput.value,
                },
                client,
            }),
        });
        const json = await request.json();
        if (json.error) {
            return toast('warning', msg('team'), json.error);
        }
        dialog?.hide();
        this.#switchToTeamTab();
        return toast('success', msg('team'), msg('member added successfully'));
    }
    #openAddNewTeamMember() {
        const dialog = this.querySelector('#add-member-dialog');
        const emailInput = this.querySelector('#add-member-email');
        dialog?.show();
        return setTimeout(() => emailInput.focus(), 400);
    }
    #renderRemoveMemberDialog() {
        const dialogText = msg('Are you sure you want to remove {{1}} from {{2}}?')
            .replace('{{1}}', this.user.username)
            .replace('{{2}}', this.team.name);
        return y `<sl-dialog
            label="${capitalize(msg('attention'))}"
            class="dialog-overview"
            id="remove-team-member-dialog"
        >
            ${dialogText}
            <sl-button @click="${this.#removeTeamMember}" class="float-left" slot="footer" variant="danger"
                >${msg('yes')}</sl-button
            >
            <sl-button @click="${this.#closeRemoveTeamMemberDialog}" slot="footer" variant="neutral"
                >${msg('no')}</sl-button
            >
        </sl-dialog>`;
    }
    #renderAddMemberDialog(roleOptions) {
        return y `<sl-dialog
            label="${msg('Add a new member to the team')}"
            class="dialog-overview"
            id="add-member-dialog"
        >
            <p class="text-gray-600 select-none">${msg('New member role')}</p>
            <sl-select class="w-1/2" size="small" value="${this.roles[0].name}" id="add-member-role" hoist
                >${roleOptions}</sl-select
            >
            <sl-input
                class="w-full"
                size="small"
                type="email"
                label="${capitalize(msg('E-Mail'))}"
                id="add-member-email"
            >
                <sl-icon name="envelope-at" type="text" slot="prefix"></sl-icon>
            </sl-input>
            <sl-button @click="${this.#addNewTeamMember}" class="float-left" slot="footer" variant="danger"
                >${msg('yes')}</sl-button
            >
            <sl-button @click="${this.#closeAddMemberDialog}" slot="footer" variant="neutral">${msg('no')}</sl-button>
        </sl-dialog>`;
    }
    #searchForUser({ target }) {
        const search = target.value.toLowerCase();
        const users = this.team.members.filter((user) => user.username.toLowerCase().includes(search));
        const ids = users.map((user) => user._id);
        const usersList = [...this.querySelectorAll('.team-member')];
        if (search === '') {
            this.activeSearchResults = this.team.members.length + '';
            usersList.forEach((user) => user.classList.remove('!hidden'));
            return this.requestUpdate();
        }
        usersList.forEach((user) => {
            if (ids.includes(user.getAttribute('data-id'))) {
                return user.classList.remove('!hidden');
            }
            return user.classList.add('!hidden');
        });
        this.activeSearchResults = ids.length + '';
        return this.requestUpdate();
    }
    #renderTeamSection() {
        const activeButton = y `<sl-button
            variant="danger"
            size="small"
            class="float-right"
            @click="${this.#openRemoveTeamMemberDialog}"
        >
            <sl-icon slot="prefix" name="x-lg"></sl-icon>Remove</sl-button
        >`;
        const disabledButton = y `<sl-button variant="danger" size="small" class="float-right" disabled>
            <sl-icon slot="prefix" name="x-lg"></sl-icon>Remove</sl-button
        >`;
        const isSuperAdmin = y `<div>
            <p class="text-gray-600 select-none">${capitalize(msg('Super Admin'))}</p>
            <sl-icon name="check2-all"></sl-icon>
        </div>`;
        const roleOptions = c$2(this.roles, role => role._id, role => {
            return y `<sl-option value="${role.name}">${role.name}</sl-option>`;
        });
        return y `<div class="team-section">
                <div class="overflow-hidden md:h-[calc(100vh - 175px)]">
                    <div class="flex items-end gap-2">
                        <sl-input
                            @keyup="${this.#searchForUser}"
                            class="w-full"
                            size="small"
                            label="${capitalize(msg('search'))} ${msg('team members')}  ${this
            .activeSearchResults} / ${this.team.members.length}"
                        >
                            <sl-icon name="search" type="text" slot="prefix"></sl-icon>
                        </sl-input>
                        ${this.rights.addTeamMember
            ? y `<sl-button variant="success" size="small" @click="${this.#openAddNewTeamMember}">
                                  <sl-icon slot="prefix" name="plus-lg"></sl-icon>
                              </sl-button>`
            : y `<sl-button variant="success" size="small" disabled>
                                  <sl-icon slot="prefix" name="plus-lg"></sl-icon>
                              </sl-button>`}
                    </div>
                    <div class="team-section-members">
                        ${c$2(this.team.members, member => member._id, member => {
            return y `<div
                                    class="team-member"
                                    @click="${() => this.#clickOnteamMember(member)}"
                                    @keyup="${() => this.#clickOnteamMember(member)}"
                                    data-id="${member._id}"
                                    tabindex="0"
                                >
                                    <sl-avatar
                                        image="${member.avatar ? `${member.avatar}avatar_small.webp` : imgs.avatar}"
                                    ></sl-avatar>
                                    <div>
                                        <p>${member.username}</p>
                                        <p>${msg('role')}: ${member.roleName}</p>
                                    </div>
                                </div>`;
        })}
                    </div>
                </div>
                <div class="selected-team-section">
                    <div>
                        <sl-avatar
                            style="--size: 8rem;"
                            image="${this.user.avatar ? `${this.user.avatar}avatar_medium.webp` : imgs.avatar}"
                        ></sl-avatar>
                        ${this.me._id === this.user._id || !this.rights.removeTeamMember
            ? disabledButton
            : activeButton}
                    </div>
                    <sl-divider style="--width: 2px;"></sl-divider>
                    <div class="selected-team-section-stats">
                        <div>
                            <p class="text-gray-600 select-none">${capitalize(msg('role'))}</p>

                            ${this.rights.changeTeamMemberRole && this.me._id !== this.user._id
            ? y `<sl-select
                                      class="w-1/2"
                                      size="small"
                                      value="${this.user.roleName}"
                                      @click="${this.#changeRoleEvent}"
                                  >
                                      ${roleOptions}
                                  </sl-select>`
            : y `<sl-select class="w-1/2" size="small" value="${this.user.roleName}" disabled>
                                      ${roleOptions}
                                  </sl-select>`}
                        </div>
                        <div>
                            <p class="text-gray-600 select-none">${capitalize(msg('name'))}</p>
                            <p>${this.user.username}</p>
                        </div>
                        <div>
                            <p class="text-gray-600 select-none">${msg('Email address')}</p>
                            <a href="mailto:${this.user.email}">${this.user.email}</a>
                        </div>
                        <div>
                            <p class="text-gray-600 select-none">${capitalize(msg('team'))}</p>
                            <p>${this.team.name}</p>
                        </div>

                        ${this.user.isSuperAdmin ? isSuperAdmin : ''}
                    </div>

                    <div>
                        <p class="text-gray-600 select-none">${capitalize(msg('about'))}</p>
                        <p>${this.user.about}</p>
                    </div>
                    <br />
                </div>
            </div>
            ${this.#renderRemoveMemberDialog()} ${this.#renderAddMemberDialog(roleOptions)}`;
    }
    async #removeRole() {
        const selectedRoleElem = this.querySelector('#remove-role-select');
        const selectedRole = selectedRoleElem.value;
        if (selectedRole !== 'member' && selectedRole !== 'admin') {
            const request = await fetch('/role/removeRole', {
                method: 'POST',
                ...header,
                body: JSON.stringify({ roleName: selectedRole }),
            });
            await request.json();
            return toast('neutral', msg('role'), msg('You have successfully removed the role {{1}}').replace('{{1}}', selectedRole));
        }
        else {
            return toast('warning', msg('role'), msg('You cannot remove member or admin role'));
        }
    }
    #removeRoleEvent() {
        const removeRoleDialog = this.querySelector('#remove-role-dialog');
        removeRoleDialog.show();
    }
    #addRoleEvent() {
        const addRoleDialog = this.querySelector('#add-new-role-dialog');
        addRoleDialog.show();
    }
    #renderRoleSection() {
        const defaultRole = this.roles.find(role => role.name === 'member') || this.roles[0];
        const { __v, _id, name, teamId, ...rights } = defaultRole;
        const rightsArray = Object.entries(rights);
        return y `<div class="roles-settings">
                <div class="flex flex-col gap-2">
                    <sl-select label="${capitalize(msg('role'))}" size="small" value="${defaultRole?.name}" hoist>
                        ${c$2(this.roles, role => role._id, function (role) {
            return y `<sl-option value="${role.name}">${role.name}</sl-option>`;
        })}</sl-select
                    >

                    <sl-button @click="${this.#addRoleEvent}" variant="success" size="small">
                        <sl-icon slot="prefix" name="plus-lg"></sl-icon>
                        ${capitalize(msg('add role'))}</sl-button
                    >
                    <sl-button @click="${this.#removeRoleEvent}" variant="danger" size="small"
                        ><sl-icon slot="prefix" name="trash"></sl-icon>${capitalize(msg('remove role'))}</sl-button
                    >
                </div>
                <div class="rights-settings">
                    ${c$2(rightsArray, role => role[0], ([key, value]) => {
            const switchSL = value
                ? y `<sl-switch label="${key}" checked></sl-switch>`
                : y `<sl-switch label="${key}"></sl-switch>`;
            return y ` <p>${transRights(key)}</p>
                                ${switchSL}
                                <p class="text-gray-600 select-none mb-4">${transRightsInfo(key)}</p>
                                <i></i>`;
        })}
                </div>
            </div>
            <sl-dialog id="add-new-role-dialog" label="${capitalize(msg('role'))}">
                >
                <sl-input label="${msg('New role name')}" size="small"></sl-input>
                <sl-button class="float-left" slot="footer" variant="success">${msg('accept')}</sl-button>
                <sl-button slot="footer" variant="neutral">${msg('cancel')}</sl-button>
            </sl-dialog>
            <sl-dialog id="remove-role-dialog" label="${capitalize(msg('role'))}">
                <p>${msg('Are you sure you want to remove this role?')}</p>
                <sl-button class="float-left" slot="footer" variant="danger">${msg('yes')}</sl-button>
                <sl-button slot="footer" variant="neutral">${msg('no')}</sl-button>
            </sl-dialog>`;
    }
    #renderRows() {
        const row1 = y `<sl-tab-group @sl-tab-show="${this.#tabSwitchEvent}">
            <sl-tab slot="nav" panel="account">${capitalize(msg('account'))}</sl-tab>
            <sl-tab slot="nav" panel="password">${capitalize(msg('password'))}</sl-tab>
            <sl-tab slot="nav" panel="team">${capitalize(msg('team'))}</sl-tab>
            <sl-tab slot="nav" panel="role">${capitalize(msg('role'))}</sl-tab>

            <sl-tab-panel class="mt-8" name="account">${this.#renderAccountSection()}</sl-tab-panel>
            <sl-tab-panel class="mt-8" name="password">${this.#renderPasswordSection()}</sl-tab-panel>
            <sl-tab-panel class="mt-8" name="team">${this.#renderTeamSection()}</sl-tab-panel>
            <sl-tab-panel class="mt-8" name="role">${this.#renderRoleSection()}</sl-tab-panel>
        </sl-tab-group> `;
        return [row1];
    }
    render() {
        const rows = this.#renderRows();
        return super.render(rows);
    }
};
__decorate$2([
    e$2()
], ProfileView.prototype, "rights", void 0);
__decorate$2([
    e$2()
], ProfileView.prototype, "me", void 0);
__decorate$2([
    e$2()
], ProfileView.prototype, "user", void 0);
__decorate$2([
    e$2({ type: Object, reflect: true })
], ProfileView.prototype, "team", void 0);
__decorate$2([
    e$2()
], ProfileView.prototype, "roles", void 0);
__decorate$2([
    e$2()
], ProfileView.prototype, "activeSearchResults", void 0);
ProfileView = __decorate$2([
    localized(),
    e$3('profile-layout')
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
    setActive() {
        const gc = this.querySelector('graph-card');
        gc?.fill();
        console.log('settingsclick');
    }
    #renderRows() {
        const row1 = y `<graph-card></graph-card>

            <sl-button variant="default">Default</sl-button>
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
    e$3('dashboard-layout')
], DashboardView);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let AppLayout = class AppLayout extends s$3 {
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    bootstrapActiveMenu() {
        const fallBackFirstTimeUse = navElements.items[0].name;
        const activeView = localStorage.getItem('active-view') || fallBackFirstTimeUse;
        const view = this.querySelector(`.nav-element-click[name="${activeView}"]`);
        if (view) {
            view.click();
        }
    }
    #viewSwitch({ detail: { name } }) {
        const active = this.querySelector('.view[active="true"]');
        const view = this.querySelector(`.view[name="${name}"]`);
        if (active) {
            active.setAttribute('active', 'false');
        }
        localStorage.setItem('active-view', name);
        view.setAttribute('active', 'true');
        view.setActive();
    }
    #clickMobileHamburger() {
        const nav = this.querySelector('.nav');
        const closed = nav.getAttribute('closed') === 'true';
        return nav.setAttribute('closed', !closed + '');
    }
    render() {
        return y `<main-nav class="nav" closed="true" @viewSwitch="${this.#viewSwitch}"></main-nav>
            <main>
                <div class="view-header">
                    <i
                        closed="true"
                        @click="${this.#clickMobileHamburger}"
                        class="fa fa-solid fa-fw fa-bars fa-2x hamburger-menu"
                    ></i>
                </div>
                ${c$2(navElements.items, (elem) => {
            if (elem.name === 'dashboard') {
                return y `<dashboard-layout
                            name="${elem.name}"
                            class="view"
                            active="false"
                        ></dashboard-layout>`;
            }
            if (elem.name === 'profile') {
                return y `<profile-layout name="${elem.name}" class="view" active="false"></profile-layout>`;
            }
            return y `<view-layout name="${elem.name}" class="view" active="false"></view-layout>`;
        })}
            </main>`;
    }
};
AppLayout = __decorate([
    e$3('app-layout')
], AppLayout);

document.addEventListener('DOMContentLoaded', function () {
    const app = document.querySelector('app-layout');
    app.bootstrapActiveMenu();
    console.log('v:0.0.1 at: "2023-01-24T12:24:10.113Z" ');
});

/* CSS */
// Set the base path to the folder you copied Shoelace's assets to
setBasePath('/assets/shoelace');
