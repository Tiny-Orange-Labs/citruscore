!function(){"use strict";var t,e,i=window,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap,r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}},a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new r(i,t,o)},l=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,c=window,h=c.trustedTypes,d=h?h.emptyScript:"",u=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:g},m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{s?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const s=document.createElement("style"),o=i.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,t.appendChild(s)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=f){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};m.finalized=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:m}),(null!==(t=c.reactiveElementVersions)&&void 0!==t?t:c.reactiveElementVersions=[]).push("1.6.1");var b=window,v=b.trustedTypes,y=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,x=`lit$${(Math.random()+"").slice(9)}$`,_="?"+x,w=`<${_}>`,k=document,$=(t="")=>k.createComment(t),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,A=Array.isArray,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,E=/>/g,P=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),T=/'/g,O=/"/g,D=/^(?:script|style|textarea|title)$/i,z=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),I=new WeakMap,F=k.createTreeWalker(k,129,null,!1),V=class{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=S;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===S?"!--"===l[1]?r=M:void 0!==l[1]?r=E:void 0!==l[2]?(D.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=P):void 0!==l[3]&&(r=P):r===P?">"===l[0]?(r=null!=o?o:S,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?P:'"'===l[3]?O:T):r===O||r===T?r=P:r===M||r===E?r=S:(r=P,o=void 0);const d=r===P&&t[e+1].startsWith("/>")?" ":"";n+=r===S?i+w:c>=0?(s.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+x+d):i+x+(-2===c?(s.push(void 0),e):d)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(a):a,s]})(t,e);if(this.el=V.createElement(l,i),F.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=F.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(x)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(x),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?j:"?"===e[1]?W:"@"===e[1]?q:H})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(D.test(s.tagName)){const t=s.textContent.split(x),e=t.length-1;if(e>0){s.textContent=v?v.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],$()),F.nextNode(),a.push({type:2,index:++o});s.append(t[e],$())}}}else if(8===s.nodeType)if(s.data===_)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(x,t+1));)a.push({type:7,index:o}),t+=x.length-1}o++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}};function B(t,e,i=t,s){var o,n,r,a;if(e===L)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=C(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=B(t,l._$AS(t,e.values),l,s)),e}var N=class{constructor(t,e,i,s){var o;this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=B(this,t,e),C(t)?t===R||null==t||""===t?(this._$AH!==R&&this._$AR(),this._$AH=R):t!==this._$AH&&t!==L&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>A(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==R&&C(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=V.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.p(i);else{const t=new class{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:k).importNode(i,!0);F.currentNode=o;let n=F.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new N(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new K(n,this,t)),this.u.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=F.nextNode(),r++)}return o}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}(o,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new V(t)),e}k(t){A(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new N(this.O($()),this.O($()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},H=class{constructor(t,e,i,s,o){this.type=1,this._$AH=R,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=R}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=B(this,t,e,0),n=!C(t)||t!==this._$AH&&t!==L,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=B(this,s[i+r],e,r),a===L&&(a=this._$AH[r]),n||(n=!C(a)||a!==this._$AH[r]),a===R?t=R:t!==R&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},j=class extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===R?void 0:t}},U=v?v.emptyScript:"",W=class extends H{constructor(){super(...arguments),this.type=4}j(t){t&&t!==R?this.element.setAttribute(this.name,U):this.element.removeAttribute(this.name)}},q=class extends H{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=B(this,t,e,0))&&void 0!==i?i:R)===L)return;const s=this._$AH,o=t===R&&s!==R||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==R&&(s===R||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}},K=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}},Y=b.litHtmlPolyfillSupport;null==Y||Y(V,N),(null!==(e=b.litHtmlVersions)&&void 0!==e?e:b.litHtmlVersions=[]).push("2.6.1");var X,G,J=class extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new N(e.insertBefore($(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return L}};J.finalized=!0,J._$litElement$=!0,null===(X=globalThis.litElementHydrateSupport)||void 0===X||X.call(globalThis,{LitElement:J});var Z=globalThis.litElementPolyfillSupport;null==Z||Z({LitElement:J}),(null!==(G=globalThis.litElementVersions)&&void 0!==G?G:globalThis.litElementVersions=[]).push("3.2.0");
/*! Bundled license information:

  @lit/reactive-element/css-tag.js:
    (**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/reactive-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  lit-html/lit-html.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  lit-element/lit-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  lit-html/is-server.js:
    (**
     * @license
     * Copyright 2022 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  */
var Q,tt=a`
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
`,et=a`
  ${tt}

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

  /* When disabled, prevent mouse events from bubbling up from children */
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
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
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
`,it=Object.defineProperty,st=Object.defineProperties,ot=Object.getOwnPropertyDescriptor,nt=Object.getOwnPropertyDescriptors,rt=Object.getOwnPropertySymbols,at=Object.prototype.hasOwnProperty,lt=Object.prototype.propertyIsEnumerable,ct=(t,e,i)=>e in t?it(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,ht=(t,e)=>{for(var i in e||(e={}))at.call(e,i)&&ct(t,i,e[i]);if(rt)for(var i of rt(e))lt.call(e,i)&&ct(t,i,e[i]);return t},dt=(t,e)=>st(t,nt(e)),ut=(t,e)=>{var i={};for(var s in t)at.call(t,s)&&e.indexOf(s)<0&&(i[s]=t[s]);if(null!=t&&rt)for(var s of rt(t))e.indexOf(s)<0&&lt.call(t,s)&&(i[s]=t[s]);return i},pt=(t,e,i,s)=>{for(var o,n=s>1?void 0:s?ot(e,i):e,r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s?o(e,i,n):o(n))||n);return s&&n&&it(e,i,n),n},gt=new WeakMap,ft=new WeakMap,mt=new Set,bt=new WeakMap,vt=class{constructor(t,e){(this.host=t).addController(this),this.options=ht({form:t=>{if(t.hasAttribute("form")&&""!==t.getAttribute("form")){const e=t.getRootNode(),i=t.getAttribute("form");if(i)return e.getElementById(i)}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var e;return null!=(e=t.disabled)&&e},reportValidity:t=>"function"!=typeof t.reportValidity||t.reportValidity(),setValue:(t,e)=>t.value=e,assumeInteractionOn:["sl-input"]},e),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleFormReset=this.handleFormReset.bind(this),this.reportFormValidity=this.reportFormValidity.bind(this),this.handleInteraction=this.handleInteraction.bind(this)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),bt.set(this.host,[]),this.options.assumeInteractionOn.forEach((t=>{this.host.addEventListener(t,this.handleInteraction)}))}hostDisconnected(){this.detachForm(),bt.delete(this.host),this.options.assumeInteractionOn.forEach((t=>{this.host.removeEventListener(t,this.handleInteraction)}))}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,gt.has(this.form)?gt.get(this.form).add(this.host):gt.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),ft.has(this.form)||(ft.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity())):this.form=void 0}detachForm(){var t;this.form&&(null==(t=gt.get(this.form))||t.delete(this.host),this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),ft.has(this.form)&&(this.form.reportValidity=ft.get(this.form),ft.delete(this.form))),this.form=void 0}handleFormData(t){const e=this.options.disabled(this.host),i=this.options.name(this.host),s=this.options.value(this.host),o="sl-button"===this.host.tagName.toLowerCase();!e&&!o&&"string"==typeof i&&i.length>0&&void 0!==s&&(Array.isArray(s)?s.forEach((e=>{t.formData.append(i,e.toString())})):t.formData.append(i,s.toString()))}handleFormSubmit(t){var e;const i=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(e=gt.get(this.form))||e.forEach((t=>{this.setUserInteracted(t,!0)}))),!this.form||this.form.noValidate||i||s(this.host)||(t.preventDefault(),t.stopImmediatePropagation())}handleFormReset(){this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),bt.set(this.host,[])}handleInteraction(t){const e=bt.get(this.host);e.includes(t.type)||e.push(t.type),e.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)}reportFormValidity(){if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.reportValidity&&!e.reportValidity())return!1}return!0}setUserInteracted(t,e){e?mt.add(t):mt.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const i=document.createElement("button");i.type=t,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",e&&(i.name=e.name,i.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach((t=>{e.hasAttribute(t)&&i.setAttribute(t,e.getAttribute(t))}))),this.form.append(i),i.click(),i.remove()}}getForm(){var t;return null!=(t=this.form)?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,i=Boolean(mt.has(e)),s=Boolean(e.required);e.toggleAttribute("data-required",s),e.toggleAttribute("data-optional",!s),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&i),e.toggleAttribute("data-user-valid",t&&i)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0});t||e.preventDefault(),this.host.dispatchEvent(e)||null==t||t.preventDefault()}},yt=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),xt=Object.freeze(dt(ht({},yt),{valid:!1,valueMissing:!0})),_t=Object.freeze(dt(ht({},yt),{valid:!1,customError:!0})),wt=Symbol.for(""),kt=t=>{if((null==t?void 0:t.r)===wt)return null==t?void 0:t._$litStatic$},$t=(t,...e)=>({_$litStatic$:e.reduce(((e,i,s)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1]),t[0]),r:wt}),Ct=new Map,At=(t=>(e,...i)=>{const s=i.length;let o,n;const r=[],a=[];let l,c=0,h=!1;for(;c<s;){for(l=e[c];c<s&&void 0!==(n=i[c],o=kt(n));)l+=o+e[++c],h=!0;a.push(n),r.push(l),c++}if(c===s&&r.push(e[s]),h){const t=r.join("$$lit$$");void 0===(e=Ct.get(t))&&(r.raw=r,Ct.set(t,e=r)),i=a}return t(e,...i)})(z),St=new Set,Mt=new MutationObserver(Ot),Et=new Map,Pt=document.documentElement.dir||"ltr",Tt=document.documentElement.lang||navigator.language;function Ot(){Pt=document.documentElement.dir||"ltr",Tt=document.documentElement.lang||navigator.language,[...St.keys()].map((t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()}))}Mt.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});var Dt=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){St.add(this.host)}hostDisconnected(){St.delete(this.host)}dir(){return`${this.host.dir||Pt}`.toLowerCase()}lang(){return`${this.host.lang||Tt}`.toLowerCase()}term(t,...e){var i,s;const o=new Intl.Locale(this.lang()),n=null==o?void 0:o.language.toLowerCase(),r=null!==(s=null===(i=null==o?void 0:o.region)||void 0===i?void 0:i.toLowerCase())&&void 0!==s?s:"",a=Et.get(`${n}-${r}`),l=Et.get(n);let c;if(a&&a[t])c=a[t];else if(l&&l[t])c=l[t];else{if(!Q||!Q[t])return String(t);c=Q[t]}return"function"==typeof c?c(...e):c}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(t,e)}},zt=class extends Dt{};!function(...t){t.map((t=>{const e=t.$code.toLowerCase();Et.has(e)?Et.set(e,Object.assign(Object.assign({},Et.get(e)),t)):Et.set(e,t),Q||(Q=t)})),Ot()}({$code:"en",$name:"English",$dir:"ltr",clearEntry:"Clear entry",close:"Close",copy:"Copy",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,currentValue:"Current value",hidePassword:"Hide password",loading:"Loading",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",toggleColorFormat:"Toggle color format"});var Lt=class{constructor(t,...e){this.slotNames=[],(this.host=t).addController(this),this.slotNames=e,this.handleSlotChange=this.handleSlotChange.bind(this)}hasDefaultSlot(){return[...this.host.childNodes].some((t=>{if(t.nodeType===t.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if("sl-visually-hidden"===e.tagName.toLowerCase())return!1;if(!e.hasAttribute("slot"))return!0}return!1}))}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}handleSlotChange(t){const e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()}};var Rt=t=>null!=t?t:R
/*! Bundled license information:

  lit-html/directives/if-defined.js:
    (**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  */,It=1,Ft=2,Vt=3,Bt=4,Nt=t=>(...e)=>({_$litDirective$:t,values:e}),Ht=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}},jt=Nt(class extends Ht{constructor(t){var e;if(super(t),t.type!==It||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,s;if(void 0===this.nt){this.nt=new Set,void 0!==t.strings&&(this.st=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.st)||void 0===i?void 0:i.has(t))&&this.nt.add(t);return this.render(e)}const o=t.element.classList;this.nt.forEach((t=>{t in e||(o.remove(t),this.nt.delete(t))}));for(const t in e){const i=!!e[t];i===this.nt.has(t)||(null===(s=this.st)||void 0===s?void 0:s.has(t))||(i?(o.add(t),this.nt.add(t)):(o.remove(t),this.nt.delete(t)))}return L}});
/*! Bundled license information:

  lit-html/directives/class-map.js:
    (**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  */
function Ut(t,e){const i=ht({waitUntilFirstUpdate:!1},e);return(e,s)=>{const{update:o}=e,n=Array.isArray(t)?t:[t];e.update=function(t){n.forEach((e=>{const o=e;if(t.has(o)){const e=t.get(o),n=this[o];e!==n&&(i.waitUntilFirstUpdate&&!this.hasUpdated||this[s](e,n))}})),o.call(this,t)}}}var Wt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e),qt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?dt(ht({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function Kt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):qt(t,e)}function Yt(t){return Kt(dt(ht({},t),{state:!0}))}var Xt,Gt=({finisher:t,descriptor:e})=>(i,s)=>{var o;if(void 0===s){const s=null!==(o=i.originalKey)&&void 0!==o?o:i.key,n=null!=e?{kind:"method",placement:"prototype",key:s,descriptor:e(i.key)}:dt(ht({},i),{key:s});return null!=t&&(n.finisher=function(e){t(e,s)}),n}{const o=i.constructor;void 0!==e&&Object.defineProperty(i,s,e(s)),null==t||t(o,s)}};function Jt(t,e){return Gt({descriptor:i=>{const s={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[e]&&(this[e]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==s?s:null),this[e]}}return s}})}null===(Xt=window.HTMLSlotElement)||void 0===Xt||Xt.prototype.assignedElements;var Zt=class extends J{emit(t,e){const i=new CustomEvent(t,ht({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(i),i}};pt([Kt()],Zt.prototype,"dir",2),pt([Kt()],Zt.prototype,"lang",2);
/*! Bundled license information:

  @lit/reactive-element/decorators/custom-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/property.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/state.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/base.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/query.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/query-async.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/event-options.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/query-all.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/query-assigned-elements.js:
    (**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  @lit/reactive-element/decorators/query-assigned-nodes.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  */
var Qt=class extends Zt{constructor(){super(...arguments),this.formControlController=new vt(this,{form:t=>{if(t.hasAttribute("form")){const e=t.getRootNode(),i=t.getAttribute("form");return e.getElementById(i)}return t.closest("form")},assumeInteractionOn:["click"]}),this.hasSlotController=new Lt(this,"[default]","prefix","suffix"),this.localize=new zt(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:yt}get validationMessage(){return this.isButton()?this.button.validationMessage:""}connectedCallback(){super.connectedCallback(),this.handleHostClick=this.handleHostClick.bind(this),this.addEventListener("click",this.handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick)}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){"submit"===this.type&&this.formControlController.submit(this),"reset"===this.type&&this.formControlController.reset(this)}handleHostClick(t){(this.disabled||this.loading)&&(t.preventDefault(),t.stopImmediatePropagation())}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return!this.isButton()||this.button.checkValidity()}reportValidity(){return!this.isButton()||this.button.reportValidity()}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?$t`a`:$t`button`;return At`
      <${e}
        part="base"
        class=${jt({button:!0,"button--default":"default"===this.variant,"button--primary":"primary"===this.variant,"button--success":"success"===this.variant,"button--neutral":"neutral"===this.variant,"button--warning":"warning"===this.variant,"button--danger":"danger"===this.variant,"button--text":"text"===this.variant,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":"rtl"===this.localize.dir(),"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${Rt(t?void 0:this.disabled)}
        type=${Rt(t?void 0:this.type)}
        title=${this.title}
        name=${Rt(t?void 0:this.name)}
        value=${Rt(t?void 0:this.value)}
        href=${Rt(t?this.href:void 0)}
        target=${Rt(t?this.target:void 0)}
        download=${Rt(t?this.download:void 0)}
        rel=${Rt(t?this.rel:void 0)}
        role=${Rt(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?At` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?At`<sl-spinner></sl-spinner>`:""}
      </${e}>
    `}};Qt.styles=et,pt([Jt(".button")],Qt.prototype,"button",2),pt([Yt()],Qt.prototype,"hasFocus",2),pt([Yt()],Qt.prototype,"invalid",2),pt([Kt()],Qt.prototype,"title",2),pt([Kt({reflect:!0})],Qt.prototype,"variant",2),pt([Kt({reflect:!0})],Qt.prototype,"size",2),pt([Kt({type:Boolean,reflect:!0})],Qt.prototype,"caret",2),pt([Kt({type:Boolean,reflect:!0})],Qt.prototype,"disabled",2),pt([Kt({type:Boolean,reflect:!0})],Qt.prototype,"loading",2),pt([Kt({type:Boolean,reflect:!0})],Qt.prototype,"outline",2),pt([Kt({type:Boolean,reflect:!0})],Qt.prototype,"pill",2),pt([Kt({type:Boolean,reflect:!0})],Qt.prototype,"circle",2),pt([Kt()],Qt.prototype,"type",2),pt([Kt()],Qt.prototype,"name",2),pt([Kt()],Qt.prototype,"value",2),pt([Kt()],Qt.prototype,"href",2),pt([Kt()],Qt.prototype,"target",2),pt([Kt()],Qt.prototype,"rel",2),pt([Kt()],Qt.prototype,"download",2),pt([Kt()],Qt.prototype,"form",2),pt([Kt({attribute:"formaction"})],Qt.prototype,"formAction",2),pt([Kt({attribute:"formenctype"})],Qt.prototype,"formEnctype",2),pt([Kt({attribute:"formmethod"})],Qt.prototype,"formMethod",2),pt([Kt({attribute:"formnovalidate",type:Boolean})],Qt.prototype,"formNoValidate",2),pt([Kt({attribute:"formtarget"})],Qt.prototype,"formTarget",2),pt([Ut("disabled",{waitUntilFirstUpdate:!0})],Qt.prototype,"handleDisabledChange",1),Qt=pt([Wt("sl-button")],Qt);var te=a`
  ${tt}

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
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`,ee=class extends Zt{constructor(){super(...arguments),this.localize=new zt(this)}render(){return z`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};ee.styles=te,ee=pt([Wt("sl-spinner")],ee);var ie="";function se(t){ie=t}var oe={name:"default",resolver:t=>`${function(){if(!ie){const t=[...document.getElementsByTagName("script")],e=t.find((t=>t.hasAttribute("data-shoelace")));if(e)se(e.getAttribute("data-shoelace"));else{const e=t.find((t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)));let i="";e&&(i=e.getAttribute("src")),se(i.split("/").slice(0,-1).join("/"))}}return ie.replace(/\/$/,"")}()}/assets/icons/${t}.svg`},ne={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},re=[oe,{name:"system",resolver:t=>t in ne?`data:image/svg+xml,${encodeURIComponent(ne[t])}`:""}],ae=[];function le(t){return re.find((e=>e.name===t))}var ce=new Map;var he=new Map;async function de(t){if(he.has(t))return he.get(t);const e=await function(t,e="cors"){if(ce.has(t))return ce.get(t);const i=fetch(t,{mode:e}).then((async t=>({ok:t.ok,status:t.status,html:await t.text()})));return ce.set(t,i),i}(t),i={ok:e.ok,status:e.status,svg:null};if(e.ok){const t=document.createElement("div");t.innerHTML=e.html;const s=t.firstElementChild;i.svg="svg"===(null==s?void 0:s.tagName.toLowerCase())?s.outerHTML:""}return he.set(t,i),i}var ue=a`
  ${tt}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,pe=class extends Ht{constructor(t){if(super(t),this.it=R,t.type!==Ft)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===R||null==t)return this._t=void 0,this.it=t;if(t===L)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};pe.directiveName="unsafeHTML",pe.resultType=1;var ge=Nt(pe),fe=class extends pe{};fe.directiveName="unsafeSVG",fe.resultType=2;var me,be=Nt(fe),ve=class extends Zt{constructor(){super(...arguments),this.svg="",this.label="",this.library="default"}connectedCallback(){var t;super.connectedCallback(),t=this,ae.push(t)}firstUpdated(){this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,ae=ae.filter((e=>e!==t))}getUrl(){const t=le(this.library);return this.name&&t?t.resolver(this.name):this.src}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const e=le(this.library),i=this.getUrl();if(me||(me=new DOMParser),i)try{const s=await de(i);if(i!==this.getUrl())return;if(s.ok){const i=me.parseFromString(s.svg,"text/html").body.querySelector("svg");null!==i?(null==(t=null==e?void 0:e.mutator)||t.call(e,i),this.svg=i.outerHTML,this.emit("sl-load")):(this.svg="",this.emit("sl-error"))}else this.svg="",this.emit("sl-error")}catch(t){this.emit("sl-error")}else this.svg.length>0&&(this.svg="")}render(){return z` ${be(this.svg)} `}};ve.styles=ue,pt([Yt()],ve.prototype,"svg",2),pt([Kt({reflect:!0})],ve.prototype,"name",2),pt([Kt()],ve.prototype,"src",2),pt([Kt()],ve.prototype,"label",2),pt([Kt({reflect:!0})],ve.prototype,"library",2),pt([Ut("label")],ve.prototype,"handleLabelChange",1),pt([Ut(["name","src","library"])],ve.prototype,"setIcon",1),ve=pt([Wt("sl-icon")],ve);
/*! Bundled license information:

  lit-html/directives/unsafe-html.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)

  lit-html/directives/unsafe-svg.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  */
var ye=a`
  ${tt}

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
`,xe=class extends Zt{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=!!this.href,e=t?$t`a`:$t`button`;return At`
      <${e}
        part="base"
        class=${jt({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${Rt(t?void 0:this.disabled)}
        type=${Rt(t?void 0:"button")}
        href=${Rt(t?this.href:void 0)}
        target=${Rt(t?this.target:void 0)}
        download=${Rt(t?this.download:void 0)}
        rel=${Rt(t&&this.target?"noreferrer noopener":void 0)}
        role=${Rt(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${Rt(this.name)}
          library=${Rt(this.library)}
          src=${Rt(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};xe.styles=ye,pt([Jt(".icon-button")],xe.prototype,"button",2),pt([Yt()],xe.prototype,"hasFocus",2),pt([Kt()],xe.prototype,"name",2),pt([Kt()],xe.prototype,"library",2),pt([Kt()],xe.prototype,"src",2),pt([Kt()],xe.prototype,"href",2),pt([Kt()],xe.prototype,"target",2),pt([Kt()],xe.prototype,"download",2),pt([Kt()],xe.prototype,"label",2),pt([Kt({type:Boolean,reflect:!0})],xe.prototype,"disabled",2),xe=pt([Wt("sl-icon-button")],xe);var _e,we=a`
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

  .form-control--has-label.form-control--large .form-control__label {
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
`,ke=a`
  ${tt}
  ${we}

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
`,$e={},Ce=Nt(class extends Ht{constructor(t){if(super(t),t.type!==Vt&&t.type!==It&&t.type!==Bt)throw Error("The `live` directive is not allowed on child or event bindings");if(!(t=>void 0===t.strings)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===L||e===R)return e;const i=t.element,s=t.name;if(t.type===Vt){if(e===i[s])return L}else if(t.type===Bt){if(!!e===i.hasAttribute(s))return L}else if(t.type===It&&i.getAttribute(s)===e+"")return L;return((t,e=$e)=>{t._$AH=e})(t),e}}),Ae=(t="value")=>(e,i)=>{const s=e.constructor,o=s.prototype.attributeChangedCallback;s.prototype.attributeChangedCallback=function(e,n,r){var a;const l=s.getPropertyOptions(t);if(e===("string"==typeof l.attribute?l.attribute:t)){const e=l.converter||p,s=("function"==typeof e?e:null!=(a=null==e?void 0:e.fromAttribute)?a:p.fromAttribute)(r,l.type);this[t]!==s&&(this[i]=s)}o.call(this,e,n,r)}},Se=null==(_e=navigator.userAgentData)?void 0:_e.brands.some((t=>t.brand.includes("Chromium"))),Me=!Se&&navigator.userAgent.includes("Firefox"),Ee=class extends Zt{constructor(){super(...arguments),this.formControlController=new vt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Lt(this,"help-text","label"),this.localize=new zt(this),this.hasFocus=!1,this.title="",this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t,e;return null!=(e=null==(t=this.input)?void 0:t.valueAsDate)?e:null}set valueAsDate(t){const e=document.createElement("input");e.type="date",e.valueAsDate=t,this.value=e.value}get valueAsNumber(){var t,e;return null!=(e=null==(t=this.input)?void 0:t.valueAsNumber)?e:parseFloat(this.value)}set valueAsNumber(t){const e=document.createElement("input");e.type="number",e.valueAsNumber=t,this.value=e.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change"),this.input.focus(),t.stopPropagation()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){const e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;"Enter"!==t.key||e||setTimeout((()=>{t.defaultPrevented||t.isComposing||this.formControlController.submit()}))}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,i="none"){this.input.setSelectionRange(t,e,i)}setRangeText(t,e,i,s){this.input.setRangeText(t,e,i,s),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=!!this.label||!!t,s=!!this.helpText||!!e,o=this.clearable&&!this.disabled&&!this.readonly&&("number"==typeof this.value||this.value.length>0);return z`
      <div
        part="form-control"
        class=${jt({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${jt({input:!0,"input--small":"small"===this.size,"input--medium":"medium"===this.size,"input--large":"large"===this.size,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons,"input--is-firefox":Me})}
          >
            <slot name="prefix" part="prefix" class="input__prefix"></slot>
            <input
              part="input"
              id="input"
              class="input__control"
              type=${"password"===this.type&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${Rt(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${Rt(this.placeholder)}
              minlength=${Rt(this.minlength)}
              maxlength=${Rt(this.maxlength)}
              min=${Rt(this.min)}
              max=${Rt(this.max)}
              step=${Rt(this.step)}
              .value=${Ce(this.value)}
              autocapitalize=${Rt("password"===this.type?"off":this.autocapitalize)}
              autocomplete=${Rt("password"===this.type?"off":this.autocomplete)}
              autocorrect=${Rt("password"===this.type?"off":this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${Rt(this.pattern)}
              enterkeyhint=${Rt(this.enterkeyhint)}
              inputmode=${Rt(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${o?z`
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
                  `:""}
            ${this.passwordToggle&&!this.disabled?z`
                    <button
                      part="password-toggle-button"
                      class="input__password-toggle"
                      type="button"
                      aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                      @click=${this.handlePasswordToggle}
                      tabindex="-1"
                    >
                      ${this.passwordVisible?z`
                            <slot name="show-password-icon">
                              <sl-icon name="eye-slash" library="system"></sl-icon>
                            </slot>
                          `:z`
                            <slot name="hide-password-icon">
                              <sl-icon name="eye" library="system"></sl-icon>
                            </slot>
                          `}
                    </button>
                  `:""}

            <slot name="suffix" part="suffix" class="input__suffix"></slot>
          </div>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          ${this.helpText}
        </slot>
        </div>
      </div>
    `}};Ee.styles=ke,pt([Jt(".input__control")],Ee.prototype,"input",2),pt([Yt()],Ee.prototype,"hasFocus",2),pt([Kt()],Ee.prototype,"title",2),pt([Kt({reflect:!0})],Ee.prototype,"type",2),pt([Kt()],Ee.prototype,"name",2),pt([Kt()],Ee.prototype,"value",2),pt([Ae()],Ee.prototype,"defaultValue",2),pt([Kt({reflect:!0})],Ee.prototype,"size",2),pt([Kt({type:Boolean,reflect:!0})],Ee.prototype,"filled",2),pt([Kt({type:Boolean,reflect:!0})],Ee.prototype,"pill",2),pt([Kt()],Ee.prototype,"label",2),pt([Kt({attribute:"help-text"})],Ee.prototype,"helpText",2),pt([Kt({type:Boolean})],Ee.prototype,"clearable",2),pt([Kt({type:Boolean,reflect:!0})],Ee.prototype,"disabled",2),pt([Kt()],Ee.prototype,"placeholder",2),pt([Kt({type:Boolean,reflect:!0})],Ee.prototype,"readonly",2),pt([Kt({attribute:"password-toggle",type:Boolean})],Ee.prototype,"passwordToggle",2),pt([Kt({attribute:"password-visible",type:Boolean})],Ee.prototype,"passwordVisible",2),pt([Kt({attribute:"no-spin-buttons",type:Boolean})],Ee.prototype,"noSpinButtons",2),pt([Kt({reflect:!0})],Ee.prototype,"form",2),pt([Kt({type:Boolean,reflect:!0})],Ee.prototype,"required",2),pt([Kt()],Ee.prototype,"pattern",2),pt([Kt({type:Number})],Ee.prototype,"minlength",2),pt([Kt({type:Number})],Ee.prototype,"maxlength",2),pt([Kt({type:Number})],Ee.prototype,"min",2),pt([Kt({type:Number})],Ee.prototype,"max",2),pt([Kt()],Ee.prototype,"step",2),pt([Kt()],Ee.prototype,"autocapitalize",2),pt([Kt()],Ee.prototype,"autocorrect",2),pt([Kt()],Ee.prototype,"autocomplete",2),pt([Kt({type:Boolean})],Ee.prototype,"autofocus",2),pt([Kt()],Ee.prototype,"enterkeyhint",2),pt([Kt({type:Boolean,converter:{fromAttribute:t=>!(!t||"false"===t),toAttribute:t=>t?"true":"false"}})],Ee.prototype,"spellcheck",2),pt([Kt()],Ee.prototype,"inputmode",2),pt([Ut("disabled",{waitUntilFirstUpdate:!0})],Ee.prototype,"handleDisabledChange",1),pt([Ut("step",{waitUntilFirstUpdate:!0})],Ee.prototype,"handleStepChange",1),pt([Ut("value",{waitUntilFirstUpdate:!0})],Ee.prototype,"handleValueChange",1),Ee=pt([Wt("sl-input")],Ee);var Pe=a`
  ${tt}

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
`;var Te=Nt(class extends Ht{constructor(t){var e;if(super(t),t.type!==It||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.vt){this.vt=new Set;for(const t in e)this.vt.add(t);return this.render(e)}this.vt.forEach((t=>{null==e[t]&&(this.vt.delete(t),t.includes("-")?i.removeProperty(t):i[t]="")}));for(const t in e){const s=e[t];null!=s&&(this.vt.add(t),t.includes("-")?i.setProperty(t,s):i[t]=s)}return L}}),Oe=class extends Zt{constructor(){super(...arguments),this.localize=new zt(this),this.hoverValue=0,this.isHovering=!1,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=!1,this.disabled=!1,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>'}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){const e="rtl"===this.localize.dir(),{left:i,right:s,width:o}=this.rating.getBoundingClientRect();return function(t,e,i){const s=t=>Object.is(t,-0)?0:t;return s(t<e?e:t>i?i:t)}(e?this.roundToPrecision((s-t)/o*this.max,this.precision):this.roundToPrecision((t-i)/o*this.max,this.precision),0,this.max)}handleClick(t){this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change")}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=!1)}handleKeyDown(t){const e="ltr"===this.localize.dir(),i="rtl"===this.localize.dir(),s=this.value;if(!this.disabled&&!this.readonly){if("ArrowDown"===t.key||e&&"ArrowLeft"===t.key||i&&"ArrowRight"===t.key){const e=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-e),t.preventDefault()}if("ArrowUp"===t.key||e&&"ArrowRight"===t.key||i&&"ArrowLeft"===t.key){const e=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+e),t.preventDefault()}"Home"===t.key&&(this.value=0,t.preventDefault()),"End"===t.key&&(this.value=this.max,t.preventDefault()),this.value!==s&&this.emit("sl-change")}}handleMouseEnter(t){this.isHovering=!0,this.hoverValue=this.getValueFromMousePosition(t)}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t)}handleMouseLeave(){this.isHovering=!1}handleTouchStart(t){this.isHovering=!0,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault()}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t)}handleTouchEnd(t){this.isHovering=!1,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault()}roundToPrecision(t,e=.5){const i=1/e;return Math.ceil(t*i)/i}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}})}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}})}focus(t){this.rating.focus(t)}blur(){this.rating.blur()}render(){const t="rtl"===this.localize.dir(),e=Array.from(Array(this.max).keys());let i=0;return i=this.disabled||this.readonly?this.value:this.isHovering?this.hoverValue:this.value,z`
      <div
        part="base"
        class=${jt({rating:!0,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":t})}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled?"-1":"0"}
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
          ${e.map((t=>z`
              <span
                class=${jt({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===t+1})}
                role="presentation"
                @mouseenter=${this.handleMouseEnter}
              >
                ${ge(this.getSymbol(t+1))}
              </span>
            `))}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${e.map((e=>z`
              <span
                class=${jt({rating__symbol:!0,"rating__symbol--hover":this.isHovering&&Math.ceil(i)===e+1})}
                style=${Te({clipPath:i>e+1?"none":t?`inset(0 0 0 ${100-(i-e)/1*100}%)`:`inset(0 ${100-(i-e)/1*100}% 0 0)`})}
                role="presentation"
              >
                ${ge(this.getSymbol(e+1))}
              </span>
            `))}
        </span>
      </div>
    `}};
/*! Bundled license information:

  lit-html/directives/style-map.js:
    (**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  */Oe.styles=Pe,pt([Jt(".rating")],Oe.prototype,"rating",2),pt([Yt()],Oe.prototype,"hoverValue",2),pt([Yt()],Oe.prototype,"isHovering",2),pt([Kt()],Oe.prototype,"label",2),pt([Kt({type:Number})],Oe.prototype,"value",2),pt([Kt({type:Number})],Oe.prototype,"max",2),pt([Kt({type:Number})],Oe.prototype,"precision",2),pt([Kt({type:Boolean,reflect:!0})],Oe.prototype,"readonly",2),pt([Kt({type:Boolean,reflect:!0})],Oe.prototype,"disabled",2),pt([Kt()],Oe.prototype,"getSymbol",2),pt([Ut("hoverValue")],Oe.prototype,"handleHoverValueChange",1),pt([Ut("isHovering")],Oe.prototype,"handleIsHoveringChange",1),Oe=pt([Wt("sl-rating")],Oe);var De=a`
  ${tt}
  ${we}

  :host {
    display: block;
  }

  .form-control {
    border: none;
    padding: 0;
    margin: 0;
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
`,ze=class extends Zt{constructor(){super(...arguments),this.formControlController=new vt(this),this.hasSlotController=new Lt(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=!1,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.form="",this.required=!1}get validity(){const t=this.required&&!this.value;return""!==this.customValidityMessage?_t:t?xt:yt}get validationMessage(){const t=this.required&&!this.value;return""!==this.customValidityMessage?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){const e=t.target.closest("sl-radio, sl-radio-button"),i=this.getAllRadios(),s=this.value;e.disabled||(this.value=e.value,i.forEach((t=>t.checked=t===e)),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(t){var e;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;const i=this.getAllRadios().filter((t=>!t.disabled)),s=null!=(e=i.find((t=>t.checked)))?e:i[0],o=" "===t.key?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,n=this.value;let r=i.indexOf(s)+o;r<0&&(r=i.length-1),r>i.length-1&&(r=0),this.getAllRadios().forEach((t=>{t.checked=!1,this.hasButtonGroup||(t.tabIndex=-1)})),this.value=i[r].value,i[r].checked=!0,this.hasButtonGroup?i[r].shadowRoot.querySelector("button").focus():(i[r].tabIndex=0,i[r].focus()),this.value!==n&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault()}handleLabelClick(){const t=this.getAllRadios(),e=t.find((t=>t.checked))||t[0];e&&e.focus()}handleSlotChange(){var t;const e=this.getAllRadios();if(e.forEach((t=>t.checked=t.value===this.value)),this.hasButtonGroup=e.some((t=>"sl-radio-button"===t.tagName.toLowerCase())),!e.some((t=>t.checked)))if(this.hasButtonGroup){e[0].shadowRoot.querySelector("button").tabIndex=0}else e[0].tabIndex=0;if(this.hasButtonGroup){const e=null==(t=this.shadowRoot)?void 0:t.querySelector("sl-button-group");e&&(e.disableRole=!0)}}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}updateCheckedRadio(){this.getAllRadios().forEach((t=>t.checked=t.value===this.value)),this.formControlController.setValidity(this.validity.valid)}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){const t=this.required&&!this.value,e=""!==this.customValidityMessage;return!t&&!e||(this.formControlController.emitInvalidEvent(),!1)}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity()}reportValidity(){const t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout((()=>this.validationInput.hidden=!0),1e4)),t}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=!!this.label||!!t,s=!!this.helpText||!!e,o=z`
      <slot
        @click=${this.handleRadioClick}
        @keydown=${this.handleKeyDown}
        @slotchange=${this.handleSlotChange}
        role="presentation"
      ></slot>
    `;return z`
      <fieldset
        part="form-control"
        class=${jt({"form-control":!0,"form-control--medium":!0,"form-control--radio-group":!0,"form-control--has-label":i,"form-control--has-help-text":s})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${i?"false":"true"}
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
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?z`
                <sl-button-group part="button-group" exportparts="base:button-group__base">
                  ${o}
                </sl-button-group>
              `:o}
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          ${this.helpText}
        </slot>
      </fieldset>
    `}};ze.styles=De,pt([Jt("slot:not([name])")],ze.prototype,"defaultSlot",2),pt([Jt(".radio-group__validation-input")],ze.prototype,"validationInput",2),pt([Yt()],ze.prototype,"hasButtonGroup",2),pt([Yt()],ze.prototype,"errorMessage",2),pt([Yt()],ze.prototype,"defaultValue",2),pt([Kt()],ze.prototype,"label",2),pt([Kt({attribute:"help-text"})],ze.prototype,"helpText",2),pt([Kt()],ze.prototype,"name",2),pt([Kt({reflect:!0})],ze.prototype,"value",2),pt([Kt({reflect:!0})],ze.prototype,"form",2),pt([Kt({type:Boolean,reflect:!0})],ze.prototype,"required",2),pt([Ut("value")],ze.prototype,"handleValueChange",1),ze=pt([Wt("sl-radio-group")],ze);var Le=a`
  ${tt}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,Re=class extends Zt{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){const e=Ie(t.target);null==e||e.classList.add("sl-button-group__button--focus")}handleBlur(t){const e=Ie(t.target);null==e||e.classList.remove("sl-button-group__button--focus")}handleMouseOver(t){const e=Ie(t.target);null==e||e.classList.add("sl-button-group__button--hover")}handleMouseOut(t){const e=Ie(t.target);null==e||e.classList.remove("sl-button-group__button--hover")}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach((e=>{const i=t.indexOf(e),s=Ie(e);null!==s&&(s.classList.add("sl-button-group__button"),s.classList.toggle("sl-button-group__button--first",0===i),s.classList.toggle("sl-button-group__button--inner",i>0&&i<t.length-1),s.classList.toggle("sl-button-group__button--last",i===t.length-1),s.classList.toggle("sl-button-group__button--radio","sl-radio-button"===s.tagName.toLowerCase()))}))}render(){return z`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `}};function Ie(t){var e;const i="sl-button, sl-radio-button";return null!=(e=t.closest(i))?e:t.querySelector(i)}Re.styles=Le,pt([Jt("slot")],Re.prototype,"defaultSlot",2),pt([Yt()],Re.prototype,"disableRole",2),pt([Kt()],Re.prototype,"label",2),Re=pt([Wt("sl-button-group")],Re);var Fe=a`
  ${et}

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
`,Ve=class extends Zt{constructor(){super(...arguments),this.hasSlotController=new Lt(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.checked=!1,this.disabled=!1,this.size="medium",this.pill=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleClick(t){if(this.disabled)return t.preventDefault(),void t.stopPropagation();this.checked=!0}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){return At`
      <div part="base" role="presentation">
        <button
          part="${"button"+(this.checked?" button--checked":"")}"
          role="radio"
          aria-checked="${this.checked}"
          class=${jt({button:!0,"button--default":!0,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":!0,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${Rt(this.value)}
          tabindex="${this.checked?"0":"-1"}"
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};Ve.styles=Fe,pt([Jt(".button")],Ve.prototype,"input",2),pt([Jt(".hidden-input")],Ve.prototype,"hiddenInput",2),pt([Yt()],Ve.prototype,"hasFocus",2),pt([Kt({type:Boolean,reflect:!0})],Ve.prototype,"checked",2),pt([Kt()],Ve.prototype,"value",2),pt([Kt({type:Boolean,reflect:!0})],Ve.prototype,"disabled",2),pt([Kt({reflect:!0})],Ve.prototype,"size",2),pt([Kt({type:Boolean,reflect:!0})],Ve.prototype,"pill",2),pt([Ut("disabled",{waitUntilFirstUpdate:!0})],Ve.prototype,"handleDisabledChange",1),Ve=pt([Wt("sl-radio-button")],Ve);var Be=a`
  ${tt}

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
`,Ne=class extends Zt{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return z`
      <slot
        part="base"
        class=${jt({badge:!0,"badge--primary":"primary"===this.variant,"badge--success":"success"===this.variant,"badge--neutral":"neutral"===this.variant,"badge--warning":"warning"===this.variant,"badge--danger":"danger"===this.variant,"badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      ></slot>
    `}};Ne.styles=Be,pt([Kt({reflect:!0})],Ne.prototype,"variant",2),pt([Kt({type:Boolean,reflect:!0})],Ne.prototype,"pill",2),pt([Kt({type:Boolean,reflect:!0})],Ne.prototype,"pulse",2),Ne=pt([Wt("sl-badge")],Ne);var He=a`
  ${tt}

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
`,je=class extends Zt{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}render(){return z`
      <div
        part="base"
        class=${jt({avatar:!0,"avatar--circle":"circle"===this.shape,"avatar--rounded":"rounded"===this.shape,"avatar--square":"square"===this.shape})}
        role="img"
        aria-label=${this.label}
      >
        ${this.initials?z` <div part="initials" class="avatar__initials">${this.initials}</div> `:z`
              <slot name="icon" part="icon" class="avatar__icon" aria-hidden="true">
                <sl-icon name="person-fill" library="system"></sl-icon>
              </slot>
            `}
        ${this.image&&!this.hasError?z`
              <img
                part="image"
                class="avatar__image"
                src="${this.image}"
                loading="${this.loading}"
                alt=""
                @error="${()=>this.hasError=!0}"
              />
            `:""}
      </div>
    `}};function Ue(t,e){return new Promise((i=>{t.addEventListener(e,(function s(o){o.target===t&&(t.removeEventListener(e,s),i())}))}))}function We(t,e,i){return new Promise((s=>{if((null==i?void 0:i.duration)===1/0)throw new Error("Promise-based animations must be finite.");const o=t.animate(e,dt(ht({},i),{duration:Ke()?0:i.duration}));o.addEventListener("cancel",s,{once:!0}),o.addEventListener("finish",s,{once:!0})}))}function qe(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function Ke(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Ye(t){return Promise.all(t.getAnimations().map((t=>new Promise((e=>{const i=requestAnimationFrame(e);t.addEventListener("cancel",(()=>i),{once:!0}),t.addEventListener("finish",(()=>i),{once:!0}),t.cancel()})))))}je.styles=He,pt([Yt()],je.prototype,"hasError",2),pt([Kt()],je.prototype,"image",2),pt([Kt()],je.prototype,"label",2),pt([Kt()],je.prototype,"initials",2),pt([Kt()],je.prototype,"loading",2),pt([Kt({reflect:!0})],je.prototype,"shape",2),pt([Ut("image")],je.prototype,"handleImageChange",1),je=pt([Wt("sl-avatar")],je);var Xe=new Map,Ge=new WeakMap;function Je(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Ze(t,e){Xe.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(e))}function Qe(t,e,i){const s=Ge.get(t);if(null==s?void 0:s[e])return Je(s[e],i.dir);const o=Xe.get(e);return o?Je(o,i.dir):{keyframes:[],options:{duration:0}}}var ti=a`
  ${tt}

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
`,ei=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),ii=class extends Zt{constructor(){super(...arguments),this.hasSlotController=new Lt(this,"icon","suffix"),this.localize=new zt(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout((()=>this.hide()),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await Ye(this.base),this.base.hidden=!1;const{keyframes:t,options:e}=Qe(this,"alert.show",{dir:this.localize.dir()});await We(this.base,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),await Ye(this.base);const{keyframes:t,options:e}=Qe(this,"alert.hide",{dir:this.localize.dir()});await We(this.base,t,e),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,Ue(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ue(this,"sl-after-hide")}async toast(){return new Promise((t=>{null===ei.parentElement&&document.body.append(ei),ei.appendChild(this),requestAnimationFrame((()=>{this.clientWidth,this.show()})),this.addEventListener("sl-after-hide",(()=>{ei.removeChild(this),t(),null===ei.querySelector("sl-alert")&&ei.remove()}),{once:!0})}))}render(){return z`
      <div
        part="base"
        class=${jt({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":"primary"===this.variant,"alert--success":"success"===this.variant,"alert--neutral":"neutral"===this.variant,"alert--warning":"warning"===this.variant,"alert--danger":"danger"===this.variant})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <slot name="icon" part="icon" class="alert__icon"></slot>

        <slot part="message" class="alert__message" aria-live="polite"></slot>

        ${this.closable?z`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}
      </div>
    `}};ii.styles=ti,pt([Jt('[part~="base"]')],ii.prototype,"base",2),pt([Kt({type:Boolean,reflect:!0})],ii.prototype,"open",2),pt([Kt({type:Boolean,reflect:!0})],ii.prototype,"closable",2),pt([Kt({reflect:!0})],ii.prototype,"variant",2),pt([Kt({type:Number})],ii.prototype,"duration",2),pt([Ut("open",{waitUntilFirstUpdate:!0})],ii.prototype,"handleOpenChange",1),pt([Ut("duration")],ii.prototype,"handleDurationChange",1),ii=pt([Wt("sl-alert")],ii),Ze("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),Ze("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});var si=a`
  ${tt}

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
`,oi=class extends Zt{constructor(){super(...arguments),this.hasSlotController=new Lt(this,"footer","header","image")}render(){return z`
      <div
        part="base"
        class=${jt({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};oi.styles=si,oi=pt([Wt("sl-card")],oi);var ni=a`
  ${tt}

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
`,ri=class extends Zt{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};ri.styles=ni,pt([Kt({type:Boolean,reflect:!0})],ri.prototype,"vertical",2),pt([Ut("vertical")],ri.prototype,"handleVerticalChange",1),ri=pt([Wt("sl-divider")],ri);var ai=a`
  ${tt}
  ${we}

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
`,li=class extends Zt{constructor(){super(...arguments),this.formControlController=new vt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Lt(this,"help-text","label"),this.hasFocus=!1,this.title="",this.name="",this.value="",this.size="medium",this.filled=!1,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.form="",this.required=!1,this.spellcheck=!0,this.defaultValue=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver((()=>this.setTextareaHeight())),this.updateComplete.then((()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)}))}firstUpdated(){this.formControlController.updateValidity()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this.input)}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}setTextareaHeight(){"auto"===this.resize?(this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=void 0}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleRowsChange(){this.setTextareaHeight()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){return t?("number"==typeof t.top&&(this.input.scrollTop=t.top),void("number"==typeof t.left&&(this.input.scrollLeft=t.left))):{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,i="none"){this.input.setSelectionRange(t,e,i)}setRangeText(t,e,i,s){this.input.setRangeText(t,e,i,s),this.value!==this.input.value&&(this.value=this.input.value),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight())}checkValidity(){return this.input.checkValidity()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=!!this.label||!!t,s=!!this.helpText||!!e;return z`
      <div
        part="form-control"
        class=${jt({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${jt({textarea:!0,"textarea--small":"small"===this.size,"textarea--medium":"medium"===this.size,"textarea--large":"large"===this.size,"textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":"none"===this.resize,"textarea--resize-vertical":"vertical"===this.resize,"textarea--resize-auto":"auto"===this.resize})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${Rt(this.name)}
              .value=${Ce(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${Rt(this.placeholder)}
              rows=${Rt(this.rows)}
              minlength=${Rt(this.minlength)}
              maxlength=${Rt(this.maxlength)}
              autocapitalize=${Rt(this.autocapitalize)}
              autocorrect=${Rt(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${Rt(this.spellcheck)}
              enterkeyhint=${Rt(this.enterkeyhint)}
              inputmode=${Rt(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
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
          aria-hidden=${s?"false":"true"}
        >
          ${this.helpText}
        </slot>
      </div>
    `}};li.styles=ai,pt([Jt(".textarea__control")],li.prototype,"input",2),pt([Yt()],li.prototype,"hasFocus",2),pt([Kt()],li.prototype,"title",2),pt([Kt()],li.prototype,"name",2),pt([Kt()],li.prototype,"value",2),pt([Kt({reflect:!0})],li.prototype,"size",2),pt([Kt({type:Boolean,reflect:!0})],li.prototype,"filled",2),pt([Kt()],li.prototype,"label",2),pt([Kt({attribute:"help-text"})],li.prototype,"helpText",2),pt([Kt()],li.prototype,"placeholder",2),pt([Kt({type:Number})],li.prototype,"rows",2),pt([Kt()],li.prototype,"resize",2),pt([Kt({type:Boolean,reflect:!0})],li.prototype,"disabled",2),pt([Kt({type:Boolean,reflect:!0})],li.prototype,"readonly",2),pt([Kt({reflect:!0})],li.prototype,"form",2),pt([Kt({type:Boolean,reflect:!0})],li.prototype,"required",2),pt([Kt({type:Number})],li.prototype,"minlength",2),pt([Kt({type:Number})],li.prototype,"maxlength",2),pt([Kt()],li.prototype,"autocapitalize",2),pt([Kt()],li.prototype,"autocorrect",2),pt([Kt()],li.prototype,"autocomplete",2),pt([Kt({type:Boolean})],li.prototype,"autofocus",2),pt([Kt()],li.prototype,"enterkeyhint",2),pt([Kt({type:Boolean,converter:{fromAttribute:t=>!(!t||"false"===t),toAttribute:t=>t?"true":"false"}})],li.prototype,"spellcheck",2),pt([Kt()],li.prototype,"inputmode",2),pt([Ae()],li.prototype,"defaultValue",2),pt([Ut("disabled",{waitUntilFirstUpdate:!0})],li.prototype,"handleDisabledChange",1),pt([Ut("rows",{waitUntilFirstUpdate:!0})],li.prototype,"handleRowsChange",1),pt([Ut("value",{waitUntilFirstUpdate:!0})],li.prototype,"handleValueChange",1),li=pt([Wt("sl-textarea")],li);var ci=a`
  ${tt}
  ${we}

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
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
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

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
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

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
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

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
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
`;var hi=new Set;function di(t){if(hi.add(t),!document.body.classList.contains("sl-scroll-lock")){const t=function(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}();document.body.classList.add("sl-scroll-lock"),document.body.style.setProperty("--sl-scroll-lock-size",`${t}px`)}}function ui(t){hi.delete(t),0===hi.size&&(document.body.classList.remove("sl-scroll-lock"),document.body.style.removeProperty("--sl-scrollbar-width"))}function pi(t,e,i="vertical",s="smooth"){const o=function(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}(t,e),n=o.top+e.scrollTop,r=o.left+e.scrollLeft,a=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,c=e.scrollTop,h=e.scrollTop+e.offsetHeight;"horizontal"!==i&&"both"!==i||(r<a?e.scrollTo({left:r,behavior:s}):r+t.clientWidth>l&&e.scrollTo({left:r-e.offsetWidth+t.clientWidth,behavior:s})),"vertical"!==i&&"both"!==i||(n<c?e.scrollTo({top:n,behavior:s}):n+t.clientHeight>h&&e.scrollTo({top:n-e.offsetHeight+t.clientHeight,behavior:s}))}var gi=class extends Zt{constructor(){super(...arguments),this.formControlController=new vt(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Lt(this,"help-text","label"),this.localize=new zt(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this.value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),this.handleDocumentFocusIn=this.handleDocumentFocusIn.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.handleDocumentMouseDown=this.handleDocumentMouseDown.bind(this),this.open=!1}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleDocumentFocusIn(t){const e=t.composedPath();this&&!e.includes(this)&&this.hide()}handleDocumentKeyDown(t){const e=t.target,i=null!==e.closest(".select__clear"),s=null!==e.closest("sl-icon-button");if(!i&&!s){if("Escape"===t.key&&this.open&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),"Enter"===t.key||" "===t.key&&""===this.typeToSelectString)return t.preventDefault(),t.stopImmediatePropagation(),this.open?void(this.currentOption&&!this.currentOption.disabled&&(this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.emit("sl-input"),this.emit("sl-change"),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))):void this.show();if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=this.getAllOptions(),i=e.indexOf(this.currentOption);let s=Math.max(0,i);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;"ArrowDown"===t.key?(s=i+1,s>e.length-1&&(s=0)):"ArrowUp"===t.key?(s=i-1,s<0&&(s=e.length-1)):"Home"===t.key?s=0:"End"===t.key&&(s=e.length-1),this.setCurrentOption(e[s])}if(1===t.key.length||"Backspace"===t.key){const e=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if("Backspace"===t.key)return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout((()=>this.typeToSelectString=""),1e3),"Backspace"===t.key?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const t of e){if(t.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(t);break}}}}}handleDocumentMouseDown(t){const e=t.composedPath();this&&!e.includes(this)&&this.hide()}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){const e=t.composedPath().some((t=>t instanceof Element&&"sl-icon-button"===t.tagName.toLowerCase()));this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),""!==this.value&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change"))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const e=t.target.closest("sl-option"),i=this.value;e&&!e.disabled&&(this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then((()=>this.displayInput.focus({preventScroll:!0}))),this.value!==i&&(this.emit("sl-input"),this.emit("sl-change")),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],i=[];t.forEach((t=>{i.includes(t.value),i.push(t.value)})),this.setSelectedOptions(t.filter((t=>e.includes(t.value))))}handleTagRemove(t,e){t.stopPropagation(),this.disabled||(this.toggleOptionSelection(e,!1),this.emit("sl-input"),this.emit("sl-change"))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach((t=>{t.current=!1,t.tabIndex=-1})),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),i=Array.isArray(t)?t:[t];e.forEach((t=>t.selected=!1)),i.length&&i.forEach((t=>t.selected=!0)),this.selectionChanged()}toggleOptionSelection(t,e){t.selected=!0===e||!1===e?e:!t.selected,this.selectionChanged()}selectionChanged(){var t,e,i,s;this.selectedOptions=this.getAllOptions().filter((t=>t.selected)),this.multiple?(this.value=this.selectedOptions.map((t=>t.value)),this.placeholder&&0===this.value.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length)):(this.value=null!=(e=null==(t=this.selectedOptions[0])?void 0:t.value)?e:"",this.displayLabel=null!=(s=null==(i=this.selectedOptions[0])?void 0:i.getTextLabel())?s:""),this.updateComplete.then((()=>{this.formControlController.updateValidity()}))}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter((t=>e.includes(t.value))))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await Ye(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame((()=>{this.setCurrentOption(this.currentOption)}));const{keyframes:t,options:e}=Qe(this,"select.show",{dir:this.localize.dir()});await We(this.popup.popup,t,e),this.currentOption&&pi(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Ye(this);const{keyframes:t,options:e}=Qe(this,"select.hide",{dir:this.localize.dir()});await We(this.popup.popup,t,e),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(!this.open&&!this.disabled)return this.open=!0,Ue(this,"sl-after-show");this.open=!1}async hide(){if(this.open&&!this.disabled)return this.open=!1,Ue(this,"sl-after-hide");this.open=!1}checkValidity(){return this.valueInput.checkValidity()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),i=!!this.label||!!t,s=!!this.helpText||!!e,o=this.clearable&&!this.disabled&&this.value.length>0,n=this.placeholder&&0===this.value.length;return z`
      <div
        part="form-control"
        class=${jt({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":i,"form-control--has-help-text":s})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${i?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${jt({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":n,"select--top":"top"===this.placement,"select--bottom":"bottom"===this.placement,"select--small":"small"===this.size,"select--medium":"medium"===this.size,"select--large":"large"===this.size})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
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
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?z`
                    <div part="tags" class="select__tags">
                      ${this.selectedOptions.map(((t,e)=>e<this.maxOptionsVisible||this.maxOptionsVisible<=0?z`
                            <sl-tag
                              part="tag"
                              ?pill=${this.pill}
                              size=${this.size}
                              removable
                              @sl-remove=${e=>this.handleTagRemove(e,t)}
                            >
                              ${t.getTextLabel()}
                            </sl-tag>
                          `:e===this.maxOptionsVisible?z` <sl-tag size=${this.size}> +${this.selectedOptions.length-e} </sl-tag> `:null))}
                    </div>
                  `:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${o?z`
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
                  `:""}

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <slot
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            ></slot>
          </sl-popup>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${s?"false":"true"}
        >
          ${this.helpText}
        </slot>
      </div>
    `}};gi.styles=ci,pt([Jt(".select")],gi.prototype,"popup",2),pt([Jt(".select__combobox")],gi.prototype,"combobox",2),pt([Jt(".select__display-input")],gi.prototype,"displayInput",2),pt([Jt(".select__value-input")],gi.prototype,"valueInput",2),pt([Jt(".select__listbox")],gi.prototype,"listbox",2),pt([Yt()],gi.prototype,"hasFocus",2),pt([Yt()],gi.prototype,"displayLabel",2),pt([Yt()],gi.prototype,"currentOption",2),pt([Yt()],gi.prototype,"selectedOptions",2),pt([Kt()],gi.prototype,"name",2),pt([Kt({converter:{fromAttribute:t=>t.split(" "),toAttribute:t=>t.join(" ")}})],gi.prototype,"value",2),pt([Ae()],gi.prototype,"defaultValue",2),pt([Kt()],gi.prototype,"size",2),pt([Kt()],gi.prototype,"placeholder",2),pt([Kt({type:Boolean,reflect:!0})],gi.prototype,"multiple",2),pt([Kt({attribute:"max-options-visible",type:Number})],gi.prototype,"maxOptionsVisible",2),pt([Kt({type:Boolean,reflect:!0})],gi.prototype,"disabled",2),pt([Kt({type:Boolean})],gi.prototype,"clearable",2),pt([Kt({type:Boolean,reflect:!0})],gi.prototype,"open",2),pt([Kt({type:Boolean})],gi.prototype,"hoist",2),pt([Kt({type:Boolean,reflect:!0})],gi.prototype,"filled",2),pt([Kt({type:Boolean,reflect:!0})],gi.prototype,"pill",2),pt([Kt()],gi.prototype,"label",2),pt([Kt({reflect:!0})],gi.prototype,"placement",2),pt([Kt({attribute:"help-text"})],gi.prototype,"helpText",2),pt([Kt({reflect:!0})],gi.prototype,"form",2),pt([Kt({type:Boolean,reflect:!0})],gi.prototype,"required",2),pt([Ut("disabled",{waitUntilFirstUpdate:!0})],gi.prototype,"handleDisabledChange",1),pt([Ut("value",{waitUntilFirstUpdate:!0})],gi.prototype,"handleValueChange",1),pt([Ut("open",{waitUntilFirstUpdate:!0})],gi.prototype,"handleOpenChange",1),gi=pt([Wt("sl-select")],gi),Ze("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),Ze("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var fi=a`
  ${tt}

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
`,mi=class extends Zt{constructor(){super(...arguments),this.localize=new zt(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return z`
      <span
        part="base"
        class=${jt({tag:!0,"tag--primary":"primary"===this.variant,"tag--success":"success"===this.variant,"tag--neutral":"neutral"===this.variant,"tag--warning":"warning"===this.variant,"tag--danger":"danger"===this.variant,"tag--text":"text"===this.variant,"tag--small":"small"===this.size,"tag--medium":"medium"===this.size,"tag--large":"large"===this.size,"tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?z`
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
            `:""}
      </span>
    `}};mi.styles=fi,pt([Kt({reflect:!0})],mi.prototype,"variant",2),pt([Kt({reflect:!0})],mi.prototype,"size",2),pt([Kt({type:Boolean,reflect:!0})],mi.prototype,"pill",2),pt([Kt({type:Boolean})],mi.prototype,"removable",2),mi=pt([Wt("sl-tag")],mi);var bi=a`
  ${tt}

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
`;function vi(t){return t.split("-")[1]}function yi(t){return"y"===t?"height":"width"}function xi(t){return t.split("-")[0]}function _i(t){return["top","bottom"].includes(xi(t))?"x":"y"}function wi(t,e,i){let{reference:s,floating:o}=t;const n=s.x+s.width/2-o.width/2,r=s.y+s.height/2-o.height/2,a=_i(e),l=yi(a),c=s[l]/2-o[l]/2,h="x"===a;let d;switch(xi(e)){case"top":d={x:n,y:s.y-o.height};break;case"bottom":d={x:n,y:s.y+s.height};break;case"right":d={x:s.x+s.width,y:r};break;case"left":d={x:s.x-o.width,y:r};break;default:d={x:s.x,y:s.y}}switch(vi(e)){case"start":d[a]-=c*(i&&h?-1:1);break;case"end":d[a]+=c*(i&&h?-1:1)}return d}function ki(t){return"number"!=typeof t?function(t){return ht({top:0,right:0,bottom:0,left:0},t)}(t):{top:t,right:t,bottom:t,left:t}}function $i(t){return dt(ht({},t),{top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height})}async function Ci(t,e){var i;void 0===e&&(e={});const{x:s,y:o,platform:n,rects:r,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:u=!1,padding:p=0}=e,g=ki(p),f=a[u?"floating"===d?"reference":"floating":d],m=$i(await n.getClippingRect({element:null==(i=await(null==n.isElement?void 0:n.isElement(f)))||i?f:f.contextElement||await(null==n.getDocumentElement?void 0:n.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),b="floating"===d?dt(ht({},r.floating),{x:s,y:o}):r.reference,v=await(null==n.getOffsetParent?void 0:n.getOffsetParent(a.floating)),y=await(null==n.isElement?void 0:n.isElement(v))&&await(null==n.getScale?void 0:n.getScale(v))||{x:1,y:1},x=$i(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({rect:b,offsetParent:v,strategy:l}):b);return{top:(m.top-x.top+g.top)/y.y,bottom:(x.bottom-m.bottom+g.bottom)/y.y,left:(m.left-x.left+g.left)/y.x,right:(x.right-m.right+g.right)/y.x}}var Ai=Math.min,Si=Math.max;function Mi(t,e,i){return Si(t,Ai(e,i))}["top","right","bottom","left"].reduce(((t,e)=>t.concat(e,e+"-start",e+"-end")),[]);var Ei={left:"right",right:"left",bottom:"top",top:"bottom"};function Pi(t){return t.replace(/left|right|bottom|top/g,(t=>Ei[t]))}var Ti={start:"end",end:"start"};function Oi(t){return t.replace(/start|end/g,(t=>Ti[t]))}var Di=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var i;const{placement:s,middlewareData:o,rects:n,initialPlacement:r,platform:a,elements:l}=e,c=t,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:u,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:f=!0}=c,m=ut(c,["mainAxis","crossAxis","fallbackPlacements","fallbackStrategy","fallbackAxisSideDirection","flipAlignment"]),b=xi(s),v=xi(r)===r,y=await(null==a.isRTL?void 0:a.isRTL(l.floating)),x=u||(v||!f?[Pi(r)]:function(t){const e=Pi(t);return[Oi(t),e,Oi(e)]}(r));u||"none"===g||x.push(...function(t,e,i,s){const o=vi(t);let n=function(t,e,i){const s=["left","right"],o=["right","left"],n=["top","bottom"],r=["bottom","top"];switch(t){case"top":case"bottom":return i?e?o:s:e?s:o;case"left":case"right":return e?n:r;default:return[]}}(xi(t),"start"===i,s);return o&&(n=n.map((t=>t+"-"+o)),e&&(n=n.concat(n.map(Oi)))),n}(r,f,g,y));const _=[r,...x],w=await Ci(e,m),k=[];let $=(null==(i=o.flip)?void 0:i.overflows)||[];if(h&&k.push(w[b]),d){const{main:t,cross:e}=function(t,e,i){void 0===i&&(i=!1);const s=vi(t),o=_i(t),n=yi(o);let r="x"===o?s===(i?"end":"start")?"right":"left":"start"===s?"bottom":"top";return e.reference[n]>e.floating[n]&&(r=Pi(r)),{main:r,cross:Pi(r)}}(s,n,y);k.push(w[t],w[e])}if($=[...$,{placement:s,overflows:k}],!k.every((t=>t<=0))){var C;const t=((null==(C=o.flip)?void 0:C.index)||0)+1,e=_[t];if(e)return{data:{index:t,overflows:$},reset:{placement:e}};let i="bottom";switch(p){case"bestFit":{var A;const t=null==(A=$.map((t=>[t,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:A[0].placement;t&&(i=t);break}case"initialPlacement":i=r}if(s!==i)return{reset:{placement:i}}}return{}}}},zi=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){const{x:i,y:s}=e,o=await async function(t,e){const{placement:i,platform:s,elements:o}=t,n=await(null==s.isRTL?void 0:s.isRTL(o.floating)),r=xi(i),a=vi(i),l="x"===_i(i),c=["left","top"].includes(r)?-1:1,h=n&&l?-1:1,d="function"==typeof e?e(t):e;let{mainAxis:u,crossAxis:p,alignmentAxis:g}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:ht({mainAxis:0,crossAxis:0,alignmentAxis:null},d);return a&&"number"==typeof g&&(p="end"===a?-1*g:g),l?{x:p*h,y:u*c}:{x:u*c,y:p*h}}(e,t);return{x:i+o.x,y:s+o.y,data:o}}}};var Li,Ri=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){const{placement:i,rects:s,platform:o,elements:n}=e,r=t,{apply:a=(()=>{})}=r,l=ut(r,["apply"]),c=await Ci(e,l),h=xi(i),d=vi(i);let u,p;"top"===h||"bottom"===h?(u=h,p=d===(await(null==o.isRTL?void 0:o.isRTL(n.floating))?"start":"end")?"left":"right"):(p=h,u="end"===d?"top":"bottom");const g=Si(c.left,0),f=Si(c.right,0),m=Si(c.top,0),b=Si(c.bottom,0),v={availableHeight:s.floating.height-(["left","right"].includes(i)?2*(0!==m||0!==b?m+b:Si(c.top,c.bottom)):c[u]),availableWidth:s.floating.width-(["top","bottom"].includes(i)?2*(0!==g||0!==f?g+f:Si(c.left,c.right)):c[p])};await a(ht(ht({},e),v));const y=await o.getDimensions(n.floating);return s.floating.width!==y.width||s.floating.height!==y.height?{reset:{rects:!0}}:{}}}};function Ii(t){var e;return(null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function Fi(t){return Ii(t).getComputedStyle(t)}function Vi(t){return ji(t)?(t.nodeName||"").toLowerCase():""}function Bi(){if(Li)return Li;const t=navigator.userAgentData;return t&&Array.isArray(t.brands)?(Li=t.brands.map((t=>t.brand+"/"+t.version)).join(" "),Li):navigator.userAgent}function Ni(t){return t instanceof Ii(t).HTMLElement}function Hi(t){return t instanceof Ii(t).Element}function ji(t){return t instanceof Ii(t).Node}function Ui(t){return"undefined"!=typeof ShadowRoot&&(t instanceof Ii(t).ShadowRoot||t instanceof ShadowRoot)}function Wi(t){const{overflow:e,overflowX:i,overflowY:s,display:o}=Fi(t);return/auto|scroll|overlay|hidden|clip/.test(e+s+i)&&!["inline","contents"].includes(o)}function qi(t){return["table","td","th"].includes(Vi(t))}function Ki(t){const e=/firefox/i.test(Bi()),i=Fi(t),s=i.backdropFilter||i.WebkitBackdropFilter;return"none"!==i.transform||"none"!==i.perspective||!!s&&"none"!==s||e&&"filter"===i.willChange||e&&!!i.filter&&"none"!==i.filter||["transform","perspective"].some((t=>i.willChange.includes(t)))||["paint","layout","strict","content"].some((t=>{const e=i.contain;return null!=e&&e.includes(t)}))}function Yi(){return!/^((?!chrome|android).)*safari/i.test(Bi())}function Xi(t){return["html","body","#document"].includes(Vi(t))}var Gi=Math.min,Ji=Math.max,Zi=Math.round;function Qi(t){const e=Fi(t);let i=parseFloat(e.width),s=parseFloat(e.height);const o=t.offsetWidth,n=t.offsetHeight,r=Zi(i)!==o||Zi(s)!==n;return r&&(i=o,s=n),{width:i,height:s,fallback:r}}function ts(t){return Hi(t)?t:t.contextElement}var es={x:1,y:1};function is(t){const e=ts(t);if(!Ni(e))return es;const i=e.getBoundingClientRect(),{width:s,height:o,fallback:n}=Qi(e);let r=(n?Zi(i.width):i.width)/s,a=(n?Zi(i.height):i.height)/o;return r&&Number.isFinite(r)||(r=1),a&&Number.isFinite(a)||(a=1),{x:r,y:a}}function ss(t,e,i,s){var o,n;void 0===e&&(e=!1),void 0===i&&(i=!1);const r=t.getBoundingClientRect(),a=ts(t);let l=es;e&&(s?Hi(s)&&(l=is(s)):l=is(t));const c=a?Ii(a):window,h=!Yi()&&i;let d=(r.left+(h&&(null==(o=c.visualViewport)?void 0:o.offsetLeft)||0))/l.x,u=(r.top+(h&&(null==(n=c.visualViewport)?void 0:n.offsetTop)||0))/l.y,p=r.width/l.x,g=r.height/l.y;if(a){const t=Ii(a),e=s&&Hi(s)?Ii(s):s;let i=t.frameElement;for(;i&&s&&e!==t;){const t=is(i),e=i.getBoundingClientRect(),s=getComputedStyle(i);e.x+=(i.clientLeft+parseFloat(s.paddingLeft))*t.x,e.y+=(i.clientTop+parseFloat(s.paddingTop))*t.y,d*=t.x,u*=t.y,p*=t.x,g*=t.y,d+=e.x,u+=e.y,i=Ii(i).frameElement}}return{width:p,height:g,top:u,right:d+p,bottom:u+g,left:d,x:d,y:u}}function os(t){return((ji(t)?t.ownerDocument:t.document)||window.document).documentElement}function ns(t){return Hi(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function rs(t){return ss(os(t)).left+ns(t).scrollLeft}function as(t,e,i){const s=Ni(e),o=os(e),n=ss(t,!0,"fixed"===i,e);let r={scrollLeft:0,scrollTop:0};const a={x:0,y:0};if(s||!s&&"fixed"!==i)if(("body"!==Vi(e)||Wi(o))&&(r=ns(e)),Ni(e)){const t=ss(e,!0);a.x=t.x+e.clientLeft,a.y=t.y+e.clientTop}else o&&(a.x=rs(o));return{x:n.left+r.scrollLeft-a.x,y:n.top+r.scrollTop-a.y,width:n.width,height:n.height}}function ls(t){if("html"===Vi(t))return t;const e=t.assignedSlot||t.parentNode||(Ui(t)?t.host:null)||os(t);return Ui(e)?e.host:e}function cs(t){return Ni(t)&&"fixed"!==Fi(t).position?t.offsetParent:null}function hs(t){const e=Ii(t);let i=cs(t);for(;i&&qi(i)&&"static"===Fi(i).position;)i=cs(i);return i&&("html"===Vi(i)||"body"===Vi(i)&&"static"===Fi(i).position&&!Ki(i))?e:i||function(t){let e=ls(t);for(;Ni(e)&&!Xi(e);){if(Ki(e))return e;e=ls(e)}return null}(t)||e}function ds(t){const e=ls(t);return Xi(e)?t.ownerDocument.body:Ni(e)&&Wi(e)?e:ds(e)}function us(t,e){var i;void 0===e&&(e=[]);const s=ds(t),o=s===(null==(i=t.ownerDocument)?void 0:i.body),n=Ii(s);return o?e.concat(n,n.visualViewport||[],Wi(s)?s:[]):e.concat(s,us(s))}function ps(t,e,i){return"viewport"===e?$i(function(t,e){const i=Ii(t),s=os(t),o=i.visualViewport;let n=s.clientWidth,r=s.clientHeight,a=0,l=0;if(o){n=o.width,r=o.height;const t=Yi();(t||!t&&"fixed"===e)&&(a=o.offsetLeft,l=o.offsetTop)}return{width:n,height:r,x:a,y:l}}(t,i)):Hi(e)?function(t,e){const i=ss(t,!0,"fixed"===e),s=i.top+t.clientTop,o=i.left+t.clientLeft,n=Ni(t)?is(t):{x:1,y:1},r=t.clientWidth*n.x,a=t.clientHeight*n.y,l=o*n.x,c=s*n.y;return{top:c,left:l,right:l+r,bottom:c+a,x:l,y:c,width:r,height:a}}(e,i):$i(function(t){var e;const i=os(t),s=ns(t),o=null==(e=t.ownerDocument)?void 0:e.body,n=Ji(i.scrollWidth,i.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),r=Ji(i.scrollHeight,i.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0);let a=-s.scrollLeft+rs(t);const l=-s.scrollTop;return"rtl"===Fi(o||i).direction&&(a+=Ji(i.clientWidth,o?o.clientWidth:0)-n),{width:n,height:r,x:a,y:l}}(os(t)))}var gs={getClippingRect:function(t){let{element:e,boundary:i,rootBoundary:s,strategy:o}=t;const n="clippingAncestors"===i?function(t,e){const i=e.get(t);if(i)return i;let s=us(t).filter((t=>Hi(t)&&"body"!==Vi(t))),o=null;const n="fixed"===Fi(t).position;let r=n?ls(t):t;for(;Hi(r)&&!Xi(r);){const t=Fi(r),e=Ki(r);(n?e||o:e||"static"!==t.position||!o||!["absolute","fixed"].includes(o.position))?o=t:s=s.filter((t=>t!==r)),r=ls(r)}return e.set(t,s),s}(e,this._c):[].concat(i),r=[...n,s],a=r[0],l=r.reduce(((t,i)=>{const s=ps(e,i,o);return t.top=Ji(s.top,t.top),t.right=Gi(s.right,t.right),t.bottom=Gi(s.bottom,t.bottom),t.left=Ji(s.left,t.left),t}),ps(e,a,o));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:i,strategy:s}=t;const o=Ni(i),n=os(i);if(i===n)return e;let r={scrollLeft:0,scrollTop:0},a={x:1,y:1};const l={x:0,y:0};if((o||!o&&"fixed"!==s)&&(("body"!==Vi(i)||Wi(n))&&(r=ns(i)),Ni(i))){const t=ss(i);a=is(i),l.x=t.x+i.clientLeft,l.y=t.y+i.clientTop}return{width:e.width*a.x,height:e.height*a.y,x:e.x*a.x-r.scrollLeft*a.x+l.x,y:e.y*a.y-r.scrollTop*a.y+l.y}},isElement:Hi,getDimensions:function(t){return Qi(t)},getOffsetParent:hs,getDocumentElement:os,getScale:is,async getElementRects(t){let{reference:e,floating:i,strategy:s}=t;const o=this.getOffsetParent||hs,n=this.getDimensions;return{reference:as(e,await o(i),s),floating:ht({x:0,y:0},await n(i))}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>"rtl"===Fi(t).direction};var fs=(t,e,i)=>{const s=new Map,o=ht({platform:gs},i),n=dt(ht({},o.platform),{_c:s});return(async(t,e,i)=>{const{placement:s="bottom",strategy:o="absolute",middleware:n=[],platform:r}=i,a=n.filter(Boolean),l=await(null==r.isRTL?void 0:r.isRTL(e));let c=await r.getElementRects({reference:t,floating:e,strategy:o}),{x:h,y:d}=wi(c,s,l),u=s,p={},g=0;for(let i=0;i<a.length;i++){const{name:n,fn:f}=a[i],{x:m,y:b,data:v,reset:y}=await f({x:h,y:d,initialPlacement:s,placement:u,strategy:o,middlewareData:p,rects:c,platform:r,elements:{reference:t,floating:e}});h=null!=m?m:h,d=null!=b?b:d,p=dt(ht({},p),{[n]:ht(ht({},p[n]),v)}),y&&g<=50&&(g++,"object"==typeof y&&(y.placement&&(u=y.placement),y.rects&&(c=!0===y.rects?await r.getElementRects({reference:t,floating:e,strategy:o}):y.rects),({x:h,y:d}=wi(c,u,l))),i=-1)}return{x:h,y:d,placement:u,strategy:o,middlewareData:p}})(t,e,dt(ht({},o),{platform:n}))},ms=class extends Zt{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');if(this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),!this.anchorEl)throw new Error("Invalid anchor element: no anchor could be found using the anchor slot or the anchor attribute.");this.start()}start(){this.anchorEl&&(this.cleanup=function(t,e,i,s){void 0===s&&(s={});const{ancestorScroll:o=!0,ancestorResize:n=!0,elementResize:r=!0,animationFrame:a=!1}=s,l=o&&!a,c=l||n?[...Hi(t)?us(t):t.contextElement?us(t.contextElement):[],...us(e)]:[];c.forEach((t=>{l&&t.addEventListener("scroll",i,{passive:!0}),n&&t.addEventListener("resize",i)}));let h,d=null;if(r){let s=!0;d=new ResizeObserver((()=>{s||i(),s=!1})),Hi(t)&&!a&&d.observe(t),Hi(t)||!t.contextElement||a||d.observe(t.contextElement),d.observe(e)}let u=a?ss(t):null;return a&&function e(){const s=ss(t);!u||s.x===u.x&&s.y===u.y&&s.width===u.width&&s.height===u.height||i(),u=s,h=requestAnimationFrame(e)}(),i(),()=>{var t;c.forEach((t=>{l&&t.removeEventListener("scroll",i),n&&t.removeEventListener("resize",i)})),null==(t=d)||t.disconnect(),d=null,a&&cancelAnimationFrame(h)}}(this.anchorEl,this.popup,(()=>{this.reposition()})))}async stop(){return new Promise((t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame((()=>t()))):t()}))}reposition(){if(!this.active||!this.anchorEl)return;const t=[zi({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Ri({apply:({rects:t})=>{const e="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=i?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Di({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:i,y:s,placement:o}=e,n=t,{mainAxis:r=!0,crossAxis:a=!1,limiter:l={fn:t=>{let{x:e,y:i}=t;return{x:e,y:i}}}}=n,c=ut(n,["mainAxis","crossAxis","limiter"]),h={x:i,y:s},d=await Ci(e,c),u=_i(xi(o)),p=function(t){return"x"===t?"y":"x"}(u);let g=h[u],f=h[p];if(r){const t="y"===u?"bottom":"right";g=Mi(g+d["y"===u?"top":"left"],g,g-d[t])}if(a){const t="y"===p?"bottom":"right";f=Mi(f+d["y"===p?"top":"left"],f,f-d[t])}const m=l.fn(dt(ht({},e),{[u]:g,[p]:f}));return dt(ht({},m),{data:{x:m.x-i,y:m.y-s}})}}}({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Ri({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push((t=>({name:"arrow",options:t,async fn(e){const{element:i,padding:s=0}=t||{},{x:o,y:n,placement:r,rects:a,platform:l}=e;if(null==i)return{};const c=ki(s),h={x:o,y:n},d=_i(r),u=yi(d),p=await l.getDimensions(i),g="y"===d?"top":"left",f="y"===d?"bottom":"right",m=a.reference[u]+a.reference[d]-h[d]-a.floating[u],b=h[d]-a.reference[d],v=await(null==l.getOffsetParent?void 0:l.getOffsetParent(i));let y=v?"y"===d?v.clientHeight||0:v.clientWidth||0:0;0===y&&(y=a.floating[u]);const x=m/2-b/2,_=c[g],w=y-p[u]-c[f],k=y/2-p[u]/2+x,$=Mi(_,k,w),C=null!=vi(r)&&k!=$&&a.reference[u]/2-(k<_?c[g]:c[f])-p[u]/2<0;return{[d]:h[d]-(C?k<_?_-k:w-k:0),data:{[d]:$,centerOffset:k-$}}}}))({element:this.arrowEl,padding:this.arrowPadding})),fs(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy}).then((({x:t,y:e,middlewareData:i,placement:s})=>{const o="rtl"===getComputedStyle(this).direction,n={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){const t=i.arrow.x,e=i.arrow.y;let s="",r="",a="",l="";if("start"===this.arrowPlacement){const i="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";s="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",r=o?i:"",l=o?"":i}else if("end"===this.arrowPlacement){const i="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";r=o?"":i,l=o?i:"",a="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",s="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",s="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:s,right:r,bottom:a,left:l,[n]:"calc(var(--arrow-size-diagonal) * -1)"})}})),this.emit("sl-reposition")}render(){return z`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <div
        part="popup"
        class=${jt({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?z`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};ms.styles=bi,pt([Jt(".popup")],ms.prototype,"popup",2),pt([Jt(".popup__arrow")],ms.prototype,"arrowEl",2),pt([Kt()],ms.prototype,"anchor",2),pt([Kt({type:Boolean,reflect:!0})],ms.prototype,"active",2),pt([Kt({reflect:!0})],ms.prototype,"placement",2),pt([Kt({reflect:!0})],ms.prototype,"strategy",2),pt([Kt({type:Number})],ms.prototype,"distance",2),pt([Kt({type:Number})],ms.prototype,"skidding",2),pt([Kt({type:Boolean})],ms.prototype,"arrow",2),pt([Kt({attribute:"arrow-placement"})],ms.prototype,"arrowPlacement",2),pt([Kt({attribute:"arrow-padding",type:Number})],ms.prototype,"arrowPadding",2),pt([Kt({type:Boolean})],ms.prototype,"flip",2),pt([Kt({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map((t=>t.trim())).filter((t=>""!==t)),toAttribute:t=>t.join(" ")}})],ms.prototype,"flipFallbackPlacements",2),pt([Kt({attribute:"flip-fallback-strategy"})],ms.prototype,"flipFallbackStrategy",2),pt([Kt({type:Object})],ms.prototype,"flipBoundary",2),pt([Kt({attribute:"flip-padding",type:Number})],ms.prototype,"flipPadding",2),pt([Kt({type:Boolean})],ms.prototype,"shift",2),pt([Kt({type:Object})],ms.prototype,"shiftBoundary",2),pt([Kt({attribute:"shift-padding",type:Number})],ms.prototype,"shiftPadding",2),pt([Kt({attribute:"auto-size"})],ms.prototype,"autoSize",2),pt([Kt()],ms.prototype,"sync",2),pt([Kt({type:Object})],ms.prototype,"autoSizeBoundary",2),pt([Kt({attribute:"auto-size-padding",type:Number})],ms.prototype,"autoSizePadding",2),ms=pt([Wt("sl-popup")],ms);var bs=a`
  ${tt}

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
`,vs=class extends Zt{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(t){const e=t.target.closest("sl-menu-item");!e||e.disabled||e.inert||("checkbox"===e.type&&(e.checked=!e.checked),this.emit("sl-select",{detail:{item:e}}))}handleKeyDown(t){if("Enter"===t.key){const e=this.getCurrentItem();t.preventDefault(),null==e||e.click()}if(" "===t.key&&t.preventDefault(),["ArrowDown","ArrowUp","Home","End"].includes(t.key)){const e=this.getAllItems(),i=this.getCurrentItem();let s=i?e.indexOf(i):0;e.length>0&&(t.preventDefault(),"ArrowDown"===t.key?s++:"ArrowUp"===t.key?s--:"Home"===t.key?s=0:"End"===t.key&&(s=e.length-1),s<0&&(s=e.length-1),s>e.length-1&&(s=0),this.setCurrentItem(e[s]),e[s].focus())}}handleMouseDown(t){const e=t.target;this.isMenuItem(e)&&this.setCurrentItem(e)}handleSlotChange(){const t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0])}isMenuItem(t){var e;return"sl-menu-item"===t.tagName.toLowerCase()||["menuitem","menuitemcheckbox","menuitemradio"].includes(null!=(e=t.getAttribute("role"))?e:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter((t=>!(t.inert||!this.isMenuItem(t))))}getCurrentItem(){return this.getAllItems().find((t=>"0"===t.getAttribute("tabindex")))}setCurrentItem(t){this.getAllItems().forEach((e=>{e.setAttribute("tabindex",e===t?"0":"-1")}))}render(){return z`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};vs.styles=bs,pt([Jt("slot")],vs.prototype,"defaultSlot",2),vs=pt([Wt("sl-menu")],vs);var ys=a`
  ${tt}

  :host {
    display: block;
  }

  :host([inert]) {
    display: none;
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

  :host(:focus) .menu-item {
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
    :host(:focus) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,xs=class extends Zt{constructor(){super(...arguments),this.type="normal",this.checked=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.handleHostClick=this.handleHostClick.bind(this),this.addEventListener("click",this.handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick)}handleDefaultSlotChange(){const t=this.getTextLabel();void 0!==this.cachedTextLabel?t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1})):this.cachedTextLabel=t}handleHostClick(t){this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}handleCheckedChange(){this.checked&&"checkbox"!==this.type?this.checked=!1:"checkbox"===this.type?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){"checkbox"===this.type?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return function(t){if(!t)return"";const e=t.assignedNodes({flatten:!0});let i="";return[...e].forEach((t=>{t.nodeType===Node.TEXT_NODE&&(i+=t.textContent)})),i}(this.defaultSlot)}render(){return z`
      <div
        part="base"
        class=${jt({"menu-item":!0,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--has-submenu":!1})}
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
    `}};xs.styles=ys,pt([Jt("slot:not([name])")],xs.prototype,"defaultSlot",2),pt([Jt(".menu-item")],xs.prototype,"menuItem",2),pt([Kt()],xs.prototype,"type",2),pt([Kt({type:Boolean,reflect:!0})],xs.prototype,"checked",2),pt([Kt()],xs.prototype,"value",2),pt([Kt({type:Boolean,reflect:!0})],xs.prototype,"disabled",2),pt([Ut("checked")],xs.prototype,"handleCheckedChange",1),pt([Ut("disabled")],xs.prototype,"handleDisabledChange",1),pt([Ut("type")],xs.prototype,"handleTypeChange",1),xs=pt([Wt("sl-menu-item")],xs);var _s=a`
  ${tt}

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
`,ws=class extends Zt{constructor(){super(...arguments),this.localize=new zt(this),this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){const t=this.getTextLabel();void 0!==this.cachedTextLabel?t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1})):this.cachedTextLabel=t}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){this.value.includes(" ")&&(this.value=this.value.replace(/ /g,"_"))}getTextLabel(){var t;return(null!=(t=this.textContent)?t:"").trim()}render(){return z`
      <div
        part="base"
        class=${jt({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};ws.styles=_s,pt([Jt(".option__label")],ws.prototype,"defaultSlot",2),pt([Yt()],ws.prototype,"current",2),pt([Yt()],ws.prototype,"selected",2),pt([Yt()],ws.prototype,"hasHover",2),pt([Kt({reflect:!0})],ws.prototype,"value",2),pt([Kt({type:Boolean,reflect:!0})],ws.prototype,"disabled",2),pt([Ut("disabled")],ws.prototype,"handleDisabledChange",1),pt([Ut("selected")],ws.prototype,"handleSelectedChange",1),pt([Ut("value")],ws.prototype,"handleValueChange",1),ws=pt([Wt("sl-option")],ws);var ks=a`
  ${tt}

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
`;function $s(t){const e=t.tagName.toLowerCase();return"-1"!==t.getAttribute("tabindex")&&(!t.hasAttribute("disabled")&&((!t.hasAttribute("aria-disabled")||"false"===t.getAttribute("aria-disabled"))&&(!("input"===e&&"radio"===t.getAttribute("type")&&!t.hasAttribute("checked"))&&(null!==t.offsetParent&&("hidden"!==window.getComputedStyle(t).visibility&&(!("audio"!==e&&"video"!==e||!t.hasAttribute("controls"))||(!!t.hasAttribute("tabindex")||(!(!t.hasAttribute("contenteditable")||"false"===t.getAttribute("contenteditable"))||["button","input","select","textarea","a","audio","video","summary"].includes(e)))))))))}function Cs(t){var e,i;const s=[];!function t(e){e instanceof HTMLElement&&(s.push(e),null!==e.shadowRoot&&"open"===e.shadowRoot.mode&&t(e.shadowRoot)),[...e.children].forEach((e=>t(e)))}(t);return{start:null!=(e=s.find((t=>$s(t))))?e:null,end:null!=(i=s.reverse().find((t=>$s(t))))?i:null}}var As=class extends Zt{constructor(){super(...arguments),this.localize=new zt(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleMenuItemActivate=this.handleMenuItemActivate.bind(this),this.handlePanelSelect=this.handlePanelSelect.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.handleDocumentMouseDown=this.handleDocumentMouseDown.bind(this),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const t=this.trigger.assignedElements({flatten:!0})[0];"function"==typeof(null==t?void 0:t.focus)&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find((t=>"sl-menu"===t.tagName.toLowerCase()))}handleKeyDown(t){this.open&&"Escape"===t.key&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())}handleDocumentKeyDown(t){var e;if("Escape"===t.key&&this.open)return t.stopPropagation(),this.focusOnTrigger(),void this.hide();if("Tab"===t.key){if(this.open&&"sl-menu-item"===(null==(e=document.activeElement)?void 0:e.tagName.toLowerCase()))return t.preventDefault(),this.hide(),void this.focusOnTrigger();setTimeout((()=>{var t,e,i;const s=(null==(t=this.containingElement)?void 0:t.getRootNode())instanceof ShadowRoot?null==(i=null==(e=document.activeElement)?void 0:e.shadowRoot)?void 0:i.activeElement:document.activeElement;this.containingElement&&(null==s?void 0:s.closest(this.containingElement.tagName.toLowerCase()))===this.containingElement||this.hide()}))}}handleDocumentMouseDown(t){const e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()}handleMenuItemActivate(t){pi(t.target,this.panel)}handlePanelSelect(t){const e=t.target;this.stayOpenOnSelect||"sl-menu"!==e.tagName.toLowerCase()||(this.hide(),this.focusOnTrigger())}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key))return t.preventDefault(),void this.handleTriggerClick();const e=this.getMenu();if(e){const i=e.getAllItems(),s=i[0],o=i[i.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||this.show(),i.length>0&&this.updateComplete.then((()=>{"ArrowDown"!==t.key&&"Home"!==t.key||(e.setCurrentItem(s),s.focus()),"ArrowUp"!==t.key&&"End"!==t.key||(e.setCurrentItem(o),o.focus())})))}}handleTriggerKeyUp(t){" "===t.key&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:!0}).find((t=>Cs(t).start));let e;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":e=t.button;break;default:e=t}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,Ue(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ue(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){this.panel.addEventListener("sl-activate",this.handleMenuItemActivate),this.panel.addEventListener("sl-select",this.handlePanelSelect),this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){this.panel&&(this.panel.removeEventListener("sl-activate",this.handleMenuItemActivate),this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown)}async handleOpenChange(){if(this.disabled)this.open=!1;else if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Ye(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:t,options:e}=Qe(this,"dropdown.show",{dir:this.localize.dir()});await We(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Ye(this);const{keyframes:t,options:e}=Qe(this,"dropdown.hide",{dir:this.localize.dir()});await We(this.popup.popup,t,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return z`
      <sl-popup
        part="base"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        class=${jt({dropdown:!0,"dropdown--open":this.open})}
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
          aria-hidden=${this.open?"false":"true"}
          aria-labelledby="dropdown"
        ></slot>
      </sl-popup>
    `}};As.styles=ks,pt([Jt(".dropdown")],As.prototype,"popup",2),pt([Jt(".dropdown__trigger")],As.prototype,"trigger",2),pt([Jt(".dropdown__panel")],As.prototype,"panel",2),pt([Kt({type:Boolean,reflect:!0})],As.prototype,"open",2),pt([Kt({reflect:!0})],As.prototype,"placement",2),pt([Kt({type:Boolean,reflect:!0})],As.prototype,"disabled",2),pt([Kt({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],As.prototype,"stayOpenOnSelect",2),pt([Kt({attribute:!1})],As.prototype,"containingElement",2),pt([Kt({type:Number})],As.prototype,"distance",2),pt([Kt({type:Number})],As.prototype,"skidding",2),pt([Kt({type:Boolean})],As.prototype,"hoist",2),pt([Ut("open",{waitUntilFirstUpdate:!0})],As.prototype,"handleOpenChange",1),As=pt([Wt("sl-dropdown")],As),Ze("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),Ze("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});var Ss=a`
  ${tt}

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
`,Ms=class extends Zt{constructor(){super(...arguments),this.localize=new zt(this),this.tabs=[],this.panels=[],this.hasScrollControls=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver((()=>{this.repositionIndicator(),this.updateScrollControls()})),this.mutationObserver=new MutationObserver((t=>{t.some((t=>!["aria-labelledby","aria-controls"].includes(t.attributeName)))&&setTimeout((()=>this.setAriaLabels())),t.some((t=>"disabled"===t.attributeName))&&this.syncTabsAndPanels()})),this.updateComplete.then((()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav);const t=new IntersectionObserver(((t,e)=>{var i;t[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab(null!=(i=this.getActiveTab())?i:this.tabs[0],{emitEvents:!1}),e.unobserve(t[0].target))}));t.observe(this.tabGroup)}))}disconnectedCallback(){this.mutationObserver.disconnect(),this.resizeObserver.unobserve(this.nav)}getAllTabs(t={includeDisabled:!0}){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter((e=>t.includeDisabled?"sl-tab"===e.tagName.toLowerCase():"sl-tab"===e.tagName.toLowerCase()&&!e.disabled))}getAllPanels(){return[...this.body.assignedElements()].filter((t=>"sl-tab-panel"===t.tagName.toLowerCase()))}getActiveTab(){return this.tabs.find((t=>t.active))}handleClick(t){const e=t.target.closest("sl-tab");(null==e?void 0:e.closest("sl-tab-group"))===this&&null!==e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}handleKeyDown(t){const e=t.target.closest("sl-tab");if((null==e?void 0:e.closest("sl-tab-group"))===this&&(["Enter"," "].includes(t.key)&&null!==e&&(this.setActiveTab(e,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){const e=this.tabs.find((t=>t.matches(":focus"))),i="rtl"===this.localize.dir();if("sl-tab"===(null==e?void 0:e.tagName.toLowerCase())){let s=this.tabs.indexOf(e);"Home"===t.key?s=0:"End"===t.key?s=this.tabs.length-1:["top","bottom"].includes(this.placement)&&t.key===(i?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&"ArrowUp"===t.key?s--:(["top","bottom"].includes(this.placement)&&t.key===(i?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&"ArrowDown"===t.key)&&s++,s<0&&(s=this.tabs.length-1),s>this.tabs.length-1&&(s=0),this.tabs[s].focus({preventScroll:!0}),"auto"===this.activation&&this.setActiveTab(this.tabs[s],{scrollBehavior:"smooth"}),["top","bottom"].includes(this.placement)&&pi(this.tabs[s],this.nav,"horizontal"),t.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e=ht({emitEvents:!0,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){const i=this.activeTab;this.activeTab=t,this.tabs.map((t=>t.active=t===this.activeTab)),this.panels.map((t=>{var e;return t.active=t.name===(null==(e=this.activeTab)?void 0:e.panel)})),this.syncIndicator(),["top","bottom"].includes(this.placement)&&pi(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(i&&this.emit("sl-tab-hide",{detail:{name:i.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach((t=>{const e=this.panels.find((e=>e.name===t.panel));e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))}))}repositionIndicator(){const t=this.getActiveTab();if(!t)return;const e=t.clientWidth,i=t.clientHeight,s="rtl"===this.localize.dir(),o=this.getAllTabs(),n=o.slice(0,o.indexOf(t)).reduce(((t,e)=>({left:t.left+e.clientWidth,top:t.top+e.clientHeight})),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.translate=s?-1*n.left+"px":`${n.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${i}px`,this.indicator.style.translate=`0 ${n.top}px`}}syncTabsAndPanels(){this.tabs=this.getAllTabs({includeDisabled:!1}),this.panels=this.getAllPanels(),this.syncIndicator()}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(t){const e=this.tabs.find((e=>e.panel===t));e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}render(){const t="rtl"===this.localize.dir();return z`
      <div
        part="base"
        class=${jt({"tab-group":!0,"tab-group--top":"top"===this.placement,"tab-group--bottom":"bottom"===this.placement,"tab-group--start":"start"===this.placement,"tab-group--end":"end"===this.placement,"tab-group--rtl":"rtl"===this.localize.dir(),"tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?z`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name=${t?"chevron-right":"chevron-left"}
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?z`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name=${t?"chevron-left":"chevron-right"}
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};Ms.styles=Ss,pt([Jt(".tab-group")],Ms.prototype,"tabGroup",2),pt([Jt(".tab-group__body")],Ms.prototype,"body",2),pt([Jt(".tab-group__nav")],Ms.prototype,"nav",2),pt([Jt(".tab-group__indicator")],Ms.prototype,"indicator",2),pt([Yt()],Ms.prototype,"hasScrollControls",2),pt([Kt()],Ms.prototype,"placement",2),pt([Kt()],Ms.prototype,"activation",2),pt([Kt({attribute:"no-scroll-controls",type:Boolean})],Ms.prototype,"noScrollControls",2),pt([Ut("noScrollControls",{waitUntilFirstUpdate:!0})],Ms.prototype,"updateScrollControls",1),pt([Ut("placement",{waitUntilFirstUpdate:!0})],Ms.prototype,"syncIndicator",1),Ms=pt([Wt("sl-tab-group")],Ms);var Es=a`
  ${tt}

  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,Ps=0,Ts=class extends Zt{constructor(){super(...arguments),this.attrId=++Ps,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return z`
      <slot
        part="base"
        class=${jt({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};Ts.styles=Es,pt([Kt({reflect:!0})],Ts.prototype,"name",2),pt([Kt({type:Boolean,reflect:!0})],Ts.prototype,"active",2),pt([Ut("active")],Ts.prototype,"handleActiveChange",1),Ts=pt([Wt("sl-tab-panel")],Ts);var Os=a`
  ${tt}

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
`,Ds=0,zs=class extends Zt{constructor(){super(...arguments),this.localize=new zt(this),this.attrId=++Ds,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(){this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.tab.focus(t)}blur(){this.tab.blur()}render(){return this.id=this.id.length>0?this.id:this.componentId,z`
      <div
        part="base"
        class=${jt({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
        tabindex=${this.disabled?"-1":"0"}
      >
        <slot></slot>
        ${this.closable?z`
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
            `:""}
      </div>
    `}};zs.styles=Os,pt([Jt(".tab")],zs.prototype,"tab",2),pt([Kt({reflect:!0})],zs.prototype,"panel",2),pt([Kt({type:Boolean,reflect:!0})],zs.prototype,"active",2),pt([Kt({type:Boolean})],zs.prototype,"closable",2),pt([Kt({type:Boolean,reflect:!0})],zs.prototype,"disabled",2),pt([Ut("active")],zs.prototype,"handleActiveChange",1),pt([Ut("disabled")],zs.prototype,"handleDisabledChange",1),zs=pt([Wt("sl-tab")],zs);var Ls=a`
  ${tt}

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
`,Rs=class extends Zt{constructor(){super(...arguments),this.localize=new zt(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleBlur=this.handleBlur.bind(this),this.handleClick=this.handleClick.bind(this),this.handleFocus=this.handleFocus.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleMouseOver=this.handleMouseOver.bind(this),this.handleMouseOut=this.handleMouseOut.bind(this),this.updateComplete.then((()=>{this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}))}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("blur",this.handleBlur,!0),this.removeEventListener("focus",this.handleFocus,!0),this.removeEventListener("click",this.handleClick),this.removeEventListener("keydown",this.handleKeyDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut)}handleBlur(){this.hasTrigger("focus")&&this.hide()}handleClick(){this.hasTrigger("click")&&(this.open?this.hide():this.show())}handleFocus(){this.hasTrigger("focus")&&this.show()}handleKeyDown(t){this.open&&"Escape"===t.key&&(t.stopPropagation(),this.hide())}handleMouseOver(){if(this.hasTrigger("hover")){const t=qe(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.show()),t)}}handleMouseOut(){if(this.hasTrigger("hover")){const t=qe(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.hide()),t)}}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){if(this.open){if(this.disabled)return;this.emit("sl-show"),await Ye(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:t,options:e}=Qe(this,"tooltip.show",{dir:this.localize.dir()});await We(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),await Ye(this.body);const{keyframes:t,options:e}=Qe(this,"tooltip.hide",{dir:this.localize.dir()});await We(this.popup.popup,t,e),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Ue(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ue(this,"sl-after-hide")}render(){return z`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${jt({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
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
          aria-live=${this.open?"polite":"off"}
        >
          ${this.content}
        </slot>
      </sl-popup>
    `}};Rs.styles=Ls,pt([Jt("slot:not([name])")],Rs.prototype,"defaultSlot",2),pt([Jt(".tooltip__body")],Rs.prototype,"body",2),pt([Jt("sl-popup")],Rs.prototype,"popup",2),pt([Kt()],Rs.prototype,"content",2),pt([Kt()],Rs.prototype,"placement",2),pt([Kt({type:Boolean,reflect:!0})],Rs.prototype,"disabled",2),pt([Kt({type:Number})],Rs.prototype,"distance",2),pt([Kt({type:Boolean,reflect:!0})],Rs.prototype,"open",2),pt([Kt({type:Number})],Rs.prototype,"skidding",2),pt([Kt()],Rs.prototype,"trigger",2),pt([Kt({type:Boolean})],Rs.prototype,"hoist",2),pt([Ut("open",{waitUntilFirstUpdate:!0})],Rs.prototype,"handleOpenChange",1),pt([Ut(["content","distance","hoist","placement","skidding"])],Rs.prototype,"handleOptionsChange",1),pt([Ut("disabled")],Rs.prototype,"handleDisabledChange",1),Rs=pt([Wt("sl-tooltip")],Rs),Ze("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),Ze("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});var Is=a`
  ${tt}

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
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
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

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`,Fs=class extends Zt{constructor(){super(...arguments),this.formControlController=new vt(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.defaultChecked=!1,this.form="",this.required=!1}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleKeyDown(t){"ArrowLeft"===t.key&&(t.preventDefault(),this.checked=!1,this.emit("sl-change"),this.emit("sl-input")),"ArrowRight"===t.key&&(t.preventDefault(),this.checked=!0,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(!0)}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){return z`
      <label
        part="base"
        class=${jt({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":"small"===this.size,"switch--medium":"medium"===this.size,"switch--large":"large"===this.size})}
      >
        <input
          class="switch__input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${Rt(this.value)}
          .checked=${Ce(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @input=${this.handleInput}
          @invalid=${this.handleInvalid}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <slot part="label" class="switch__label"></slot>
      </label>
    `}};Fs.styles=Is,pt([Jt('input[type="checkbox"]')],Fs.prototype,"input",2),pt([Yt()],Fs.prototype,"hasFocus",2),pt([Kt()],Fs.prototype,"title",2),pt([Kt()],Fs.prototype,"name",2),pt([Kt()],Fs.prototype,"value",2),pt([Kt({reflect:!0})],Fs.prototype,"size",2),pt([Kt({type:Boolean,reflect:!0})],Fs.prototype,"disabled",2),pt([Kt({type:Boolean,reflect:!0})],Fs.prototype,"checked",2),pt([Ae("checked")],Fs.prototype,"defaultChecked",2),pt([Kt({reflect:!0})],Fs.prototype,"form",2),pt([Kt({type:Boolean,reflect:!0})],Fs.prototype,"required",2),pt([Ut("checked",{waitUntilFirstUpdate:!0})],Fs.prototype,"handleCheckedChange",1),pt([Ut("disabled",{waitUntilFirstUpdate:!0})],Fs.prototype,"handleDisabledChange",1),Fs=pt([Wt("sl-switch")],Fs);var Vs=[],Bs=a`
  ${tt}

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
`,Ns=class extends Zt{constructor(){super(...arguments),this.hasSlotController=new Lt(this,"footer"),this.localize=new zt(this),this.open=!1,this.label="",this.noHeader=!1}connectedCallback(){super.connectedCallback(),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.modal=new class{constructor(t){this.tabDirection="forward",this.element=t,this.handleFocusIn=this.handleFocusIn.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this)}activate(){Vs.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){Vs=Vs.filter((t=>t!==this.element)),document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return Vs[Vs.length-1]===this.element}checkFocus(){if(this.isActive()&&!this.element.matches(":focus-within")){const{start:t,end:e}=Cs(this.element),i="forward"===this.tabDirection?t:e;"function"==typeof(null==i?void 0:i.focus)&&i.focus({preventScroll:!0})}}handleFocusIn(){this.checkFocus()}handleKeyDown(t){"Tab"===t.key&&t.shiftKey&&(this.tabDirection="backward",requestAnimationFrame((()=>this.checkFocus())))}handleKeyUp(){this.tabDirection="forward"}}(this)}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),di(this))}disconnectedCallback(){super.disconnectedCallback(),ui(this)}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const t=Qe(this,"dialog.denyClose",{dir:this.localize.dir()});We(this.panel,t.keyframes,t.options)}else this.hide()}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}handleDocumentKeyDown(t){this.open&&"Escape"===t.key&&(t.stopPropagation(),this.requestClose("keyboard"))}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),di(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([Ye(this.dialog),Ye(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame((()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")}));const e=Qe(this,"dialog.show",{dir:this.localize.dir()}),i=Qe(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([We(this.panel,e.keyframes,e.options),We(this.overlay,i.keyframes,i.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([Ye(this.dialog),Ye(this.overlay)]);const t=Qe(this,"dialog.hide",{dir:this.localize.dir()}),e=Qe(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([We(this.overlay,e.keyframes,e.options).then((()=>{this.overlay.hidden=!0})),We(this.panel,t.keyframes,t.options).then((()=>{this.panel.hidden=!0}))]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,ui(this);const i=this.originalTrigger;"function"==typeof(null==i?void 0:i.focus)&&setTimeout((()=>i.focus())),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,Ue(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ue(this,"sl-after-hide")}render(){return z`
      <div
        part="base"
        class=${jt({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${Rt(this.noHeader?this.label:void 0)}
          aria-labelledby=${Rt(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":z`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
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
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="dialog__body"></slot>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Ns.styles=Bs,pt([Jt(".dialog")],Ns.prototype,"dialog",2),pt([Jt(".dialog__panel")],Ns.prototype,"panel",2),pt([Jt(".dialog__overlay")],Ns.prototype,"overlay",2),pt([Kt({type:Boolean,reflect:!0})],Ns.prototype,"open",2),pt([Kt({reflect:!0})],Ns.prototype,"label",2),pt([Kt({attribute:"no-header",type:Boolean,reflect:!0})],Ns.prototype,"noHeader",2),pt([Ut("open",{waitUntilFirstUpdate:!0})],Ns.prototype,"handleOpenChange",1),Ns=pt([Wt("sl-dialog")],Ns),Ze("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),Ze("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}}),Ze("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}}),Ze("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),Ze("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});
/**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const Hs=window,js=Hs.ShadowRoot&&(void 0===Hs.ShadyCSS||Hs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Us=Symbol(),Ws=new WeakMap;const qs=t=>new class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Us)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(js&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=Ws.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Ws.set(e,t))}return t}toString(){return this.cssText}}("string"==typeof t?t:t+"",void 0,Us),Ks=js?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return qs(e)})(t):t
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */;var Ys;const Xs=window,Gs=Xs.trustedTypes,Js=Gs?Gs.emptyScript:"",Zs=Xs.reactiveElementPolyfillSupport,Qs={toAttribute(t,e){switch(e){case Boolean:t=t?Js:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},to=(t,e)=>e!==t&&(e==e||t==t),eo={attribute:!0,type:String,converter:Qs,reflect:!1,hasChanged:to};let io=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=eo){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||eo}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(Ks(t))}else void 0!==t&&e.push(Ks(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{js?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=Hs.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=eo){var s;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:Qs).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=s.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:Qs;this._$El=o,this[o]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||to)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
var so;io.finalized=!0,io.elementProperties=new Map,io.elementStyles=[],io.shadowRootOptions={mode:"open"},null==Zs||Zs({ReactiveElement:io}),(null!==(Ys=Xs.reactiveElementVersions)&&void 0!==Ys?Ys:Xs.reactiveElementVersions=[]).push("1.6.1");const oo=window,no=oo.trustedTypes,ro=no?no.createPolicy("lit-html",{createHTML:t=>t}):void 0,ao=`lit$${(Math.random()+"").slice(9)}$`,lo="?"+ao,co=`<${lo}>`,ho=document,uo=(t="")=>ho.createComment(t),po=t=>null===t||"object"!=typeof t&&"function"!=typeof t,go=Array.isArray,fo=t=>go(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),mo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bo=/-->/g,vo=/>/g,yo=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),xo=/'/g,_o=/"/g,wo=/^(?:script|style|textarea|title)$/i,ko=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),$o=Symbol.for("lit-noChange"),Co=Symbol.for("lit-nothing"),Ao=new WeakMap,So=ho.createTreeWalker(ho,129,null,!1),Mo=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=mo;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===mo?"!--"===l[1]?r=bo:void 0!==l[1]?r=vo:void 0!==l[2]?(wo.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=yo):void 0!==l[3]&&(r=yo):r===yo?">"===l[0]?(r=null!=o?o:mo,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?yo:'"'===l[3]?_o:xo):r===_o||r===xo?r=yo:r===bo||r===vo?r=mo:(r=yo,o=void 0);const d=r===yo&&t[e+1].startsWith("/>")?" ":"";n+=r===mo?i+co:c>=0?(s.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+ao+d):i+ao+(-2===c?(s.push(void 0),e):d)}const a=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==ro?ro.createHTML(a):a,s]};class Eo{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,c]=Mo(t,e);if(this.el=Eo.createElement(l,i),So.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=So.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(ao)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(ao),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?zo:"?"===e[1]?Ro:"@"===e[1]?Io:Do})}else a.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(wo.test(s.tagName)){const t=s.textContent.split(ao),e=t.length-1;if(e>0){s.textContent=no?no.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],uo()),So.nextNode(),a.push({type:2,index:++o});s.append(t[e],uo())}}}else if(8===s.nodeType)if(s.data===lo)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(ao,t+1));)a.push({type:7,index:o}),t+=ao.length-1}o++}}static createElement(t,e){const i=ho.createElement("template");return i.innerHTML=t,i}}function Po(t,e,i=t,s){var o,n,r,a;if(e===$o)return e;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const c=po(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=Po(t,l._$AS(t,e.values),l,s)),e}class To{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:ho).importNode(i,!0);So.currentNode=o;let n=So.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new Oo(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new Fo(n,this,t)),this.u.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=So.nextNode(),r++)}return o}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Oo{constructor(t,e,i,s){var o;this.type=2,this._$AH=Co,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Po(this,t,e),po(t)?t===Co||null==t||""===t?(this._$AH!==Co&&this._$AR(),this._$AH=Co):t!==this._$AH&&t!==$o&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):fo(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==Co&&po(this._$AH)?this._$AA.nextSibling.data=t:this.T(ho.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Eo.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.p(i);else{const t=new To(o,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=Ao.get(t.strings);return void 0===e&&Ao.set(t.strings,e=new Eo(t)),e}k(t){go(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Oo(this.O(uo()),this.O(uo()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Do{constructor(t,e,i,s,o){this.type=1,this._$AH=Co,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Co}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Po(this,t,e,0),n=!po(t)||t!==this._$AH&&t!==$o,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Po(this,s[i+r],e,r),a===$o&&(a=this._$AH[r]),n||(n=!po(a)||a!==this._$AH[r]),a===Co?t=Co:t!==Co&&(t+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===Co?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class zo extends Do{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Co?void 0:t}}const Lo=no?no.emptyScript:"";class Ro extends Do{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Co?this.element.setAttribute(this.name,Lo):this.element.removeAttribute(this.name)}}class Io extends Do{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Po(this,t,e,0))&&void 0!==i?i:Co)===$o)return;const s=this._$AH,o=t===Co&&s!==Co||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==Co&&(s===Co||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Fo{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Po(this,t)}}const Vo={P:"$lit$",A:ao,M:lo,C:1,L:Mo,R:To,D:fo,V:Po,I:Oo,H:Do,N:Ro,U:Io,B:zo,F:Fo},Bo=oo.litHtmlPolyfillSupport;null==Bo||Bo(Eo,Oo),(null!==(so=oo.litHtmlVersions)&&void 0!==so?so:oo.litHtmlVersions=[]).push("2.6.1");
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
var No,Ho;let jo=class extends io{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new Oo(e.insertBefore(uo(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return $o}};jo.finalized=!0,jo._$litElement$=!0,null===(No=globalThis.litElementHydrateSupport)||void 0===No||No.call(globalThis,{LitElement:jo});const Uo=globalThis.litElementPolyfillSupport;null==Uo||Uo({LitElement:jo}),(null!==(Ho=globalThis.litElementVersions)&&void 0!==Ho?Ho:globalThis.litElementVersions=[]).push("3.2.2");
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const Wo=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e)
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */,qo=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function Ko(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):qo(t,e)
/**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */}var Yo;null===(Yo=window.HTMLSlotElement)||void 0===Yo||Yo.prototype.assignedElements;
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const Xo=2,Go=t=>(...e)=>({_$litDirective$:t,values:e});let Jo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const{I:Zo}=Vo,Qo=()=>document.createComment(""),tn=(t,e,i)=>{var s;const o=t._$AA.parentNode,n=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=o.insertBefore(Qo(),n),s=o.insertBefore(Qo(),n);i=new Zo(e,s,t,t.options)}else{const e=i._$AB.nextSibling,r=i._$AM,a=r!==t;if(a){let e;null===(s=i._$AQ)||void 0===s||s.call(i,t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==r._$AU&&i._$AP(e)}if(e!==n||a){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;o.insertBefore(t,n),t=e}}}return i},en=(t,e,i=t)=>(t._$AI(e,i),t),sn={},on=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let i=t._$AA;const s=t._$AB.nextSibling;for(;i!==s;){const t=i.nextSibling;i.remove(),i=t}},nn=(t,e,i)=>{const s=new Map;for(let o=e;o<=i;o++)s.set(t[o],o);return s},rn=Go(class extends Jo{constructor(t){if(super(t),t.type!==Xo)throw Error("repeat() can only be used in text expressions")}ht(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const o=[],n=[];let r=0;for(const e of t)o[r]=s?s(e,r):r,n[r]=i(e,r),r++;return{values:n,keys:o}}render(t,e,i){return this.ht(t,e,i).values}update(t,[e,i,s]){var o;const n=(t=>t._$AH)(t),{values:r,keys:a}=this.ht(e,i,s);if(!Array.isArray(n))return this.ut=a,r;const l=null!==(o=this.ut)&&void 0!==o?o:this.ut=[],c=[];let h,d,u=0,p=n.length-1,g=0,f=r.length-1;for(;u<=p&&g<=f;)if(null===n[u])u++;else if(null===n[p])p--;else if(l[u]===a[g])c[g]=en(n[u],r[g]),u++,g++;else if(l[p]===a[f])c[f]=en(n[p],r[f]),p--,f--;else if(l[u]===a[f])c[f]=en(n[u],r[f]),tn(t,c[f+1],n[u]),u++,f--;else if(l[p]===a[g])c[g]=en(n[p],r[g]),tn(t,n[u],n[p]),p--,g++;else if(void 0===h&&(h=nn(a,g,f),d=nn(l,u,p)),h.has(l[u]))if(h.has(l[p])){const e=d.get(a[g]),i=void 0!==e?n[e]:null;if(null===i){const e=tn(t,n[u]);en(e,r[g]),c[g]=e}else c[g]=en(i,r[g]),tn(t,n[u],i),n[e]=null;g++}else on(n[p]),p--;else on(n[u]),u++;for(;g<=f;){const e=tn(t,c[f+1]);en(e,r[g]),c[g++]=e}for(;u<=p;){const t=n[u++];null!==t&&on(t)}return this.ut=a,((t,e=sn)=>{t._$AH=e})(t,c),$o}}),an=(t,e)=>{var i,s;const o=t._$AN;if(void 0===o)return!1;for(const t of o)null===(s=(i=t)._$AO)||void 0===s||s.call(i,e,!1),an(t,e);return!0},ln=t=>{let e,i;do{if(void 0===(e=t._$AM))break;i=e._$AN,i.delete(t),t=e}while(0===(null==i?void 0:i.size))},cn=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),un(e)}};
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */function hn(t){void 0!==this._$AN?(ln(this),this._$AM=t,cn(this)):this._$AM=t}function dn(t,e=!1,i=0){const s=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(e)if(Array.isArray(s))for(let t=i;t<s.length;t++)an(s[t],!1),ln(s[t]);else null!=s&&(an(s,!1),ln(s));else an(this,t)}const un=t=>{var e,i,s,o;t.type==Xo&&(null!==(e=(s=t)._$AP)&&void 0!==e||(s._$AP=dn),null!==(i=(o=t)._$AQ)&&void 0!==i||(o._$AQ=hn))};let pn=class extends Jo{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),cn(this),this.isConnected=t._$AU}_$AO(t,e=!0){var i,s;t!==this.isConnected&&(this.isConnected=t,t?null===(i=this.reconnected)||void 0===i||i.call(this):null===(s=this.disconnected)||void 0===s||s.call(this)),e&&(an(this,t),ln(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};
/**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */class gn{constructor(t){this.Y=t}disconnect(){this.Y=void 0}reconnect(t){this.Y=t}deref(){return this.Y}}class fn{constructor(){this.Z=void 0,this.q=void 0}get(){return this.Z}pause(){var t;null!==(t=this.Z)&&void 0!==t||(this.Z=new Promise((t=>this.q=t)))}resume(){var t;null===(t=this.q)||void 0===t||t.call(this),this.Z=this.q=void 0}}
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const mn=t=>!(t=>null===t||"object"!=typeof t&&"function"!=typeof t)(t)&&"function"==typeof t.then;const bn=Go(class extends pn{constructor(){super(...arguments),this._$Cwt=1073741823,this._$Cyt=[],this._$CK=new gn(this),this._$CX=new fn}render(...t){var e;return null!==(e=t.find((t=>!mn(t))))&&void 0!==e?e:$o}update(t,e){const i=this._$Cyt;let s=i.length;this._$Cyt=e;const o=this._$CK,n=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<e.length&&!(t>this._$Cwt);t++){const r=e[t];if(!mn(r))return this._$Cwt=t,r;t<s&&r===i[t]||(this._$Cwt=1073741823,s=0,Promise.resolve(r).then((async t=>{for(;n.get();)await n.get();const e=o.deref();if(void 0!==e){const i=e._$Cyt.indexOf(r);i>-1&&i<e._$Cwt&&(e._$Cwt=i,e.setValue(t))}})))}return $o}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}),vn=Object.freeze({logo:{src:"logo_56x56.png"},items:[{name:"dashboard",icon:"house-heart",rows:2,viewable:!0,isNavFooter:!1},{name:"analytics",icon:"bar-chart-line",rows:3,viewable:!0,isNavFooter:!1},{name:"calendar",icon:"calendar-day",rows:4,viewable:!0,isNavFooter:!1},{name:"profile",icon:"",rows:1,viewable:!1,isNavFooter:!0}]}),yn=(t,e,i)=>{let s=t[0];for(let o=1;o<t.length;o++)s+=e[i?i[o-1]:o-1],s+=t[o];return s},xn=t=>{return"string"!=typeof(e=t)&&"strTag"in e?yn(t.strings,t.values):t;var e},_n="lit-localize-status";
/**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
class wn{constructor(t){this.__litLocalizeEventHandler=t=>{"ready"===t.detail.status&&this.host.requestUpdate()},this.host=t}hostConnected(){window.addEventListener(_n,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(_n,this.__litLocalizeEventHandler)}}const kn=t=>t.addController(new wn(t)),$n=()=>t=>"function"==typeof t?An(t):Cn(t),Cn=({kind:t,elements:e})=>({kind:t,elements:e,finisher(t){t.addInitializer(kn)}}),An=t=>(t.addInitializer(kn),t);
/**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
class Sn{constructor(){this.settled=!1,this.promise=new Promise(((t,e)=>{this._resolve=t,this._reject=e}))}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}
/**
   * @license
   * Copyright 2014 Travis Webb
   * SPDX-License-Identifier: MIT
   */const Mn=[];for(let t=0;t<256;t++)Mn[t]=(t>>4&15).toString(16)+(15&t).toString(16);
/**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const En="",Pn="h",Tn="s";function On(t,e){return(e?Pn:Tn)+function(t){let e=0,i=8997,s=0,o=33826,n=0,r=40164,a=0,l=52210;for(let c=0;c<t.length;c++)i^=t.charCodeAt(c),e=435*i,s=435*o,n=435*r,a=435*l,n+=i<<8,a+=o<<8,s+=e>>>16,i=65535&e,n+=s>>>16,o=65535&s,l=a+(n>>>16)&65535,r=65535&n;return Mn[l>>8]+Mn[255&l]+Mn[r>>8]+Mn[255&r]+Mn[o>>8]+Mn[255&o]+Mn[i>>8]+Mn[255&i]}("string"==typeof t?t:t.join(En))}
/**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const Dn=new WeakMap,zn=new Map;function Ln(t,e,i){var s;if(t){const o=null!==(s=null==i?void 0:i.id)&&void 0!==s?s:function(t){const e="string"==typeof t?t:t.strings;let i=zn.get(e);void 0===i&&(i=On(e,"string"!=typeof t&&!("strTag"in t)),zn.set(e,i));return i}
/**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */(e),n=t[o];if(n){if("string"==typeof n)return n;if("strTag"in n)return yn(n.strings,e.values,n.values);{let t=Dn.get(n);return void 0===t&&(t=n.values,Dn.set(n,t)),{...n,values:t.map((t=>e.values[t]))}}}}return xn(e)}function Rn(t){window.dispatchEvent(new CustomEvent(_n,{detail:t}))}let In,Fn,Vn,Bn,Nn,Hn="",jn=new Sn;jn.resolve();let Un=0;const Wn=()=>Hn,qn=t=>{if(t===(null!=In?In:Hn))return jn.promise;if(!Vn||!Bn)throw new Error("Internal error");if(!Vn.has(t))throw new Error("Invalid locale code");Un++;const e=Un;In=t,jn.settled&&(jn=new Sn),Rn({status:"loading",loadingLocale:t});return(t===Fn?Promise.resolve({templates:void 0}):Bn(t)).then((i=>{Un===e&&(Hn=t,In=void 0,Nn=i.templates,Rn({status:"ready",readyLocale:t}),jn.resolve())}),(i=>{Un===e&&(Rn({status:"error",errorLocale:t,errorMessage:i.toString()}),jn.reject(i))})),jn.promise};
/**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
let Kn=xn,Yn=!1;function Xn(t){const[e,...i]=t;return e.toUpperCase()+i.join("")}const Gn={mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"}},Jn=Object.freeze({avatar:"./assets/img/fallbacks/avatar.png"});let Zn=class extends jo{#t="nav-elem-active";constructor(){super()}createRenderRoot(){return this}#e(t){if(t.key&&"Enter"!==t.key)return;const e=t.target,i=e.parentNode,s=e.classList.contains("nav-element")?e:i,o=document.querySelector(`.${this.#t}`),n="true"===s.getAttribute("isNavFooter"),r=new CustomEvent("viewSwitch",{detail:{name:s.getAttribute("name")}});return o&&o.classList.remove(this.#t),n||s.classList.add(this.#t),this.setAttribute("closed","true"),this.dispatchEvent(r)}#i(){const t="true"===this.getAttribute("closed");return this.setAttribute("closed",!t+"")}#s(){const t=Object.freeze({analytics:ko`<span>${Xn(Kn("analytics"))}</span>`,dashboard:ko`<span>${Xn(Kn("dashboard"))}</span>`,calendar:ko`<span>${Xn(Kn("calendar"))}</span>`});return rn(vn.items,(e=>{if(e.viewable)return ko`<div
                @click="${this.#e}"
                @keyup="${this.#e}"
                class="nav-element nav-element-click"
                name="${e.name}"
                tabindex="0"
            >
                <sl-icon name="${e.icon}"></sl-icon>&nbsp;&nbsp;${t[e.name]}
            </div>`}))}#o(){const t=!!vn.items.find((t=>t.isNavFooter)),e=fetch("/v1/user/me",{method:"GET",...Gn}).then((t=>t.json()));if(t)return ko`<footer class="nav-footer">
            <sl-avatar
                name="profile"
                @click="${this.#e}"
                image="${bn(e.then((function(t){return t.avatar?`${t.avatar}avatar_small.webp`:Jn.avatar})),Jn.avatar)}"
                label="${Kn("Your profile avatar")}"
            ></sl-avatar>
            <div isNavFooter="true" name="profile">
                <span
                    >${bn(e.then((function(t){return t.username})),"Loading...")}</span
                >
                <small
                    @click="${this.#e}"
                    @keyup="${this.#e}"
                    class="view-profile nav-element-click"
                    name="profile"
                    tabindex="0"
                >
                    ${Kn("View Profile")}
                </small>
            </div>
        </footer>`}#n(){return ko`<header class="nav-header mb-4">
            <img class="nav-logo" src="./assets/img/logos/${vn.logo.src}" />
            <i @click="${this.#i}" class="fa fa-solid fa-times fa-fw close-mobil-nav"></i>
        </header>`}render(){const t=this.#n(),e=this.#o(),i=this.#s();return ko`${t}${i}${e}`}};
/*!
   * @kurkle/color v0.3.2
   * https://github.com/kurkle/color#readme
   * (c) 2023 Jukka Kurkela
   * Released under the MIT License
   */
function Qn(t){return t+.5|0}Zn=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}([$n(),Wo("main-nav")],Zn);const tr=(t,e,i)=>Math.max(Math.min(t,i),e);function er(t){return tr(Qn(2.55*t),0,255)}function ir(t){return tr(Qn(255*t),0,255)}function sr(t){return tr(Qn(t/2.55)/100,0,1)}function or(t){return tr(Qn(100*t),0,100)}const nr={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},rr=[..."0123456789ABCDEF"],ar=t=>rr[15&t],lr=t=>rr[(240&t)>>4]+rr[15&t],cr=t=>(240&t)>>4==(15&t),hr=t=>cr(t.r)&&cr(t.g)&&cr(t.b)&&cr(t.a);const dr=(t,e)=>t<255?e(t):"";const ur=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function pr(t,e,i){const s=e*Math.min(i,1-i),o=(e,o=(e+t/30)%12)=>i-s*Math.max(Math.min(o-3,9-o,1),-1);return[o(0),o(8),o(4)]}function gr(t,e,i){const s=(s,o=(s+t/60)%6)=>i-i*e*Math.max(Math.min(o,4-o,1),0);return[s(5),s(3),s(1)]}function fr(t,e,i){const s=pr(t,1,.5);let o;for(e+i>1&&(o=1/(e+i),e*=o,i*=o),o=0;o<3;o++)s[o]*=1-e-i,s[o]+=e;return s}function mr(t){const e=t.r/255,i=t.g/255,s=t.b/255,o=Math.max(e,i,s),n=Math.min(e,i,s),r=(o+n)/2;let a,l,c;return o!==n&&(c=o-n,l=r>.5?c/(2-o-n):c/(o+n),a=function(t,e,i,s,o){return t===o?(e-i)/s+(e<i?6:0):e===o?(i-t)/s+2:(t-e)/s+4}(e,i,s,c,o),a=60*a+.5),[0|a,l||0,r]}function br(t,e,i,s){return(Array.isArray(e)?t(e[0],e[1],e[2]):t(e,i,s)).map(ir)}function vr(t,e,i){return br(pr,t,e,i)}function yr(t){return(t%360+360)%360}function xr(t){const e=ur.exec(t);let i,s=255;if(!e)return;e[5]!==i&&(s=e[6]?er(+e[5]):ir(+e[5]));const o=yr(+e[2]),n=+e[3]/100,r=+e[4]/100;return i="hwb"===e[1]?function(t,e,i){return br(fr,t,e,i)}(o,n,r):"hsv"===e[1]?function(t,e,i){return br(gr,t,e,i)}(o,n,r):vr(o,n,r),{r:i[0],g:i[1],b:i[2],a:s}}const _r={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},wr={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};let kr;function $r(t){kr||(kr=function(){const t={},e=Object.keys(wr),i=Object.keys(_r);let s,o,n,r,a;for(s=0;s<e.length;s++){for(r=a=e[s],o=0;o<i.length;o++)n=i[o],a=a.replace(n,_r[n]);n=parseInt(wr[r],16),t[a]=[n>>16&255,n>>8&255,255&n]}return t}(),kr.transparent=[0,0,0,0]);const e=kr[t.toLowerCase()];return e&&{r:e[0],g:e[1],b:e[2],a:4===e.length?e[3]:255}}const Cr=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;const Ar=t=>t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055,Sr=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4);function Mr(t,e,i){if(t){let s=mr(t);s[e]=Math.max(0,Math.min(s[e]+s[e]*i,0===e?360:1)),s=vr(s),t.r=s[0],t.g=s[1],t.b=s[2]}}function Er(t,e){return t?Object.assign(e||{},t):t}function Pr(t){var e={r:0,g:0,b:0,a:255};return Array.isArray(t)?t.length>=3&&(e={r:t[0],g:t[1],b:t[2],a:255},t.length>3&&(e.a=ir(t[3]))):(e=Er(t,{r:0,g:0,b:0,a:1})).a=ir(e.a),e}function Tr(t){return"r"===t.charAt(0)?function(t){const e=Cr.exec(t);let i,s,o,n=255;if(e){if(e[7]!==i){const t=+e[7];n=e[8]?er(t):tr(255*t,0,255)}return i=+e[1],s=+e[3],o=+e[5],i=255&(e[2]?er(i):tr(i,0,255)),s=255&(e[4]?er(s):tr(s,0,255)),o=255&(e[6]?er(o):tr(o,0,255)),{r:i,g:s,b:o,a:n}}}(t):xr(t)}class Or{constructor(t){if(t instanceof Or)return t;const e=typeof t;let i;var s,o,n;"object"===e?i=Pr(t):"string"===e&&(n=(s=t).length,"#"===s[0]&&(4===n||5===n?o={r:255&17*nr[s[1]],g:255&17*nr[s[2]],b:255&17*nr[s[3]],a:5===n?17*nr[s[4]]:255}:7!==n&&9!==n||(o={r:nr[s[1]]<<4|nr[s[2]],g:nr[s[3]]<<4|nr[s[4]],b:nr[s[5]]<<4|nr[s[6]],a:9===n?nr[s[7]]<<4|nr[s[8]]:255})),i=o||$r(t)||Tr(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=Er(this._rgb);return t&&(t.a=sr(t.a)),t}set rgb(t){this._rgb=Pr(t)}rgbString(){return this._valid?function(t){return t&&(t.a<255?`rgba(${t.r}, ${t.g}, ${t.b}, ${sr(t.a)})`:`rgb(${t.r}, ${t.g}, ${t.b})`)}(this._rgb):void 0}hexString(){return this._valid?function(t){var e=hr(t)?ar:lr;return t?"#"+e(t.r)+e(t.g)+e(t.b)+dr(t.a,e):void 0}(this._rgb):void 0}hslString(){return this._valid?function(t){if(!t)return;const e=mr(t),i=e[0],s=or(e[1]),o=or(e[2]);return t.a<255?`hsla(${i}, ${s}%, ${o}%, ${sr(t.a)})`:`hsl(${i}, ${s}%, ${o}%)`}(this._rgb):void 0}mix(t,e){if(t){const i=this.rgb,s=t.rgb;let o;const n=e===o?.5:e,r=2*n-1,a=i.a-s.a,l=((r*a==-1?r:(r+a)/(1+r*a))+1)/2;o=1-l,i.r=255&l*i.r+o*s.r+.5,i.g=255&l*i.g+o*s.g+.5,i.b=255&l*i.b+o*s.b+.5,i.a=n*i.a+(1-n)*s.a,this.rgb=i}return this}interpolate(t,e){return t&&(this._rgb=function(t,e,i){const s=Sr(sr(t.r)),o=Sr(sr(t.g)),n=Sr(sr(t.b));return{r:ir(Ar(s+i*(Sr(sr(e.r))-s))),g:ir(Ar(o+i*(Sr(sr(e.g))-o))),b:ir(Ar(n+i*(Sr(sr(e.b))-n))),a:t.a+i*(e.a-t.a)}}(this._rgb,t._rgb,e)),this}clone(){return new Or(this.rgb)}alpha(t){return this._rgb.a=ir(t),this}clearer(t){return this._rgb.a*=1-t,this}greyscale(){const t=this._rgb,e=Qn(.3*t.r+.59*t.g+.11*t.b);return t.r=t.g=t.b=e,this}opaquer(t){return this._rgb.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Mr(this._rgb,2,t),this}darken(t){return Mr(this._rgb,2,-t),this}saturate(t){return Mr(this._rgb,1,t),this}desaturate(t){return Mr(this._rgb,1,-t),this}rotate(t){return function(t,e){var i=mr(t);i[0]=yr(i[0]+e),i=vr(i),t.r=i[0],t.g=i[1],t.b=i[2]}(this._rgb,t),this}}
/*!
   * Chart.js v4.2.1
   * https://www.chartjs.org
   * (c) 2023 Chart.js Contributors
   * Released under the MIT License
   */function Dr(){}const zr=(()=>{let t=0;return()=>t++})();function Lr(t){return null==t}function Rr(t){if(Array.isArray&&Array.isArray(t))return!0;const e=Object.prototype.toString.call(t);return"[object"===e.slice(0,7)&&"Array]"===e.slice(-6)}function Ir(t){return null!==t&&"[object Object]"===Object.prototype.toString.call(t)}function Fr(t){return("number"==typeof t||t instanceof Number)&&isFinite(+t)}function Vr(t,e){return Fr(t)?t:e}function Br(t,e){return void 0===t?e:t}const Nr=(t,e)=>"string"==typeof t&&t.endsWith("%")?parseFloat(t)/100*e:+t;function Hr(t,e,i){if(t&&"function"==typeof t.call)return t.apply(i,e)}function jr(t,e,i,s){let o,n,r;if(Rr(t))if(n=t.length,s)for(o=n-1;o>=0;o--)e.call(i,t[o],o);else for(o=0;o<n;o++)e.call(i,t[o],o);else if(Ir(t))for(r=Object.keys(t),n=r.length,o=0;o<n;o++)e.call(i,t[r[o]],r[o])}function Ur(t,e){let i,s,o,n;if(!t||!e||t.length!==e.length)return!1;for(i=0,s=t.length;i<s;++i)if(o=t[i],n=e[i],o.datasetIndex!==n.datasetIndex||o.index!==n.index)return!1;return!0}function Wr(t){if(Rr(t))return t.map(Wr);if(Ir(t)){const e=Object.create(null),i=Object.keys(t),s=i.length;let o=0;for(;o<s;++o)e[i[o]]=Wr(t[i[o]]);return e}return t}function qr(t){return-1===["__proto__","prototype","constructor"].indexOf(t)}function Kr(t,e,i,s){if(!qr(t))return;const o=e[t],n=i[t];Ir(o)&&Ir(n)?Yr(o,n,s):e[t]=Wr(n)}function Yr(t,e,i){const s=Rr(e)?e:[e],o=s.length;if(!Ir(t))return t;const n=(i=i||{}).merger||Kr;let r;for(let e=0;e<o;++e){if(r=s[e],!Ir(r))continue;const o=Object.keys(r);for(let e=0,s=o.length;e<s;++e)n(o[e],t,r,i)}return t}function Xr(t,e){return Yr(t,e,{merger:Gr})}function Gr(t,e,i){if(!qr(t))return;const s=e[t],o=i[t];Ir(s)&&Ir(o)?Xr(s,o):Object.prototype.hasOwnProperty.call(e,t)||(e[t]=Wr(o))}const Jr={"":t=>t,x:t=>t.x,y:t=>t.y};function Zr(t,e){const i=Jr[e]||(Jr[e]=function(t){const e=function(t){const e=t.split("."),i=[];let s="";for(const t of e)s+=t,s.endsWith("\\")?s=s.slice(0,-1)+".":(i.push(s),s="");return i}(t);return t=>{for(const i of e){if(""===i)break;t=t&&t[i]}return t}}(e));return i(t)}function Qr(t){return t.charAt(0).toUpperCase()+t.slice(1)}const ta=t=>void 0!==t,ea=t=>"function"==typeof t,ia=(t,e)=>{if(t.size!==e.size)return!1;for(const i of t)if(!e.has(i))return!1;return!0};const sa=Math.PI,oa=2*sa,na=oa+sa,ra=Number.POSITIVE_INFINITY,aa=sa/180,la=sa/2,ca=sa/4,ha=2*sa/3,da=Math.log10,ua=Math.sign;function pa(t,e,i){return Math.abs(t-e)<i}function ga(t){const e=Math.round(t);t=pa(t,e,t/1e3)?e:t;const i=Math.pow(10,Math.floor(da(t))),s=t/i;return(s<=1?1:s<=2?2:s<=5?5:10)*i}function fa(t){return!isNaN(parseFloat(t))&&isFinite(t)}function ma(t,e,i){let s,o,n;for(s=0,o=t.length;s<o;s++)n=t[s][i],isNaN(n)||(e.min=Math.min(e.min,n),e.max=Math.max(e.max,n))}function ba(t){return t*(sa/180)}function va(t){return t*(180/sa)}function ya(t){if(!Fr(t))return;let e=1,i=0;for(;Math.round(t*e)/e!==t;)e*=10,i++;return i}function xa(t,e){const i=e.x-t.x,s=e.y-t.y,o=Math.sqrt(i*i+s*s);let n=Math.atan2(s,i);return n<-.5*sa&&(n+=oa),{angle:n,distance:o}}function _a(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function wa(t,e){return(t-e+na)%oa-sa}function ka(t){return(t%oa+oa)%oa}function $a(t,e,i,s){const o=ka(t),n=ka(e),r=ka(i),a=ka(n-o),l=ka(r-o),c=ka(o-n),h=ka(o-r);return o===n||o===r||s&&n===r||a>l&&c<h}function Ca(t,e,i){return Math.max(e,Math.min(i,t))}function Aa(t,e,i,s=1e-6){return t>=Math.min(e,i)-s&&t<=Math.max(e,i)+s}function Sa(t,e,i){i=i||(i=>t[i]<e);let s,o=t.length-1,n=0;for(;o-n>1;)s=n+o>>1,i(s)?n=s:o=s;return{lo:n,hi:o}}const Ma=(t,e,i,s)=>Sa(t,i,s?s=>{const o=t[s][e];return o<i||o===i&&t[s+1][e]===i}:s=>t[s][e]<i),Ea=(t,e,i)=>Sa(t,i,(s=>t[s][e]>=i));const Pa=["push","pop","shift","splice","unshift"];function Ta(t,e){const i=t._chartjs;if(!i)return;const s=i.listeners,o=s.indexOf(e);-1!==o&&s.splice(o,1),s.length>0||(Pa.forEach((e=>{delete t[e]})),delete t._chartjs)}function Oa(t){const e=new Set;let i,s;for(i=0,s=t.length;i<s;++i)e.add(t[i]);return e.size===s?t:Array.from(e)}const Da="undefined"==typeof window?function(t){return t()}:window.requestAnimationFrame;function za(t,e){let i=[],s=!1;return function(...o){i=o,s||(s=!0,Da.call(window,(()=>{s=!1,t.apply(e,i)})))}}const La=t=>"start"===t?"left":"end"===t?"right":"center",Ra=(t,e,i)=>"start"===t?e:"end"===t?i:(e+i)/2;function Ia(t,e,i){const s=e.length;let o=0,n=s;if(t._sorted){const{iScale:r,_parsed:a}=t,l=r.axis,{min:c,max:h,minDefined:d,maxDefined:u}=r.getUserBounds();d&&(o=Ca(Math.min(Ma(a,r.axis,c).lo,i?s:Ma(e,l,r.getPixelForValue(c)).lo),0,s-1)),n=u?Ca(Math.max(Ma(a,r.axis,h,!0).hi+1,i?0:Ma(e,l,r.getPixelForValue(h),!0).hi+1),o,s)-o:s-o}return{start:o,count:n}}function Fa(t){const{xScale:e,yScale:i,_scaleRanges:s}=t,o={xmin:e.min,xmax:e.max,ymin:i.min,ymax:i.max};if(!s)return t._scaleRanges=o,!0;const n=s.xmin!==e.min||s.xmax!==e.max||s.ymin!==i.min||s.ymax!==i.max;return Object.assign(s,o),n}const Va=t=>0===t||1===t,Ba=(t,e,i)=>-Math.pow(2,10*(t-=1))*Math.sin((t-e)*oa/i),Na=(t,e,i)=>Math.pow(2,-10*t)*Math.sin((t-e)*oa/i)+1,Ha={linear:t=>t,easeInQuad:t=>t*t,easeOutQuad:t=>-t*(t-2),easeInOutQuad:t=>(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1),easeInCubic:t=>t*t*t,easeOutCubic:t=>(t-=1)*t*t+1,easeInOutCubic:t=>(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2),easeInQuart:t=>t*t*t*t,easeOutQuart:t=>-((t-=1)*t*t*t-1),easeInOutQuart:t=>(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2),easeInQuint:t=>t*t*t*t*t,easeOutQuint:t=>(t-=1)*t*t*t*t+1,easeInOutQuint:t=>(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2),easeInSine:t=>1-Math.cos(t*la),easeOutSine:t=>Math.sin(t*la),easeInOutSine:t=>-.5*(Math.cos(sa*t)-1),easeInExpo:t=>0===t?0:Math.pow(2,10*(t-1)),easeOutExpo:t=>1===t?1:1-Math.pow(2,-10*t),easeInOutExpo:t=>Va(t)?t:t<.5?.5*Math.pow(2,10*(2*t-1)):.5*(2-Math.pow(2,-10*(2*t-1))),easeInCirc:t=>t>=1?t:-(Math.sqrt(1-t*t)-1),easeOutCirc:t=>Math.sqrt(1-(t-=1)*t),easeInOutCirc:t=>(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1),easeInElastic:t=>Va(t)?t:Ba(t,.075,.3),easeOutElastic:t=>Va(t)?t:Na(t,.075,.3),easeInOutElastic(t){const e=.1125;return Va(t)?t:t<.5?.5*Ba(2*t,e,.45):.5+.5*Na(2*t-1,e,.45)},easeInBack(t){const e=1.70158;return t*t*((e+1)*t-e)},easeOutBack(t){const e=1.70158;return(t-=1)*t*((e+1)*t+e)+1},easeInOutBack(t){let e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)},easeInBounce:t=>1-Ha.easeOutBounce(1-t),easeOutBounce(t){const e=7.5625,i=2.75;return t<1/i?e*t*t:t<2/i?e*(t-=1.5/i)*t+.75:t<2.5/i?e*(t-=2.25/i)*t+.9375:e*(t-=2.625/i)*t+.984375},easeInOutBounce:t=>t<.5?.5*Ha.easeInBounce(2*t):.5*Ha.easeOutBounce(2*t-1)+.5};function ja(t){if(t&&"object"==typeof t){const e=t.toString();return"[object CanvasPattern]"===e||"[object CanvasGradient]"===e}return!1}function Ua(t){return ja(t)?t:new Or(t)}function Wa(t){return ja(t)?t:new Or(t).saturate(.5).darken(.1).hexString()}const qa=["x","y","borderWidth","radius","tension"],Ka=["color","borderColor","backgroundColor"];const Ya=new Map;function Xa(t,e,i){return function(t,e){e=e||{};const i=t+JSON.stringify(e);let s=Ya.get(i);return s||(s=new Intl.NumberFormat(t,e),Ya.set(i,s)),s}(e,i).format(t)}const Ga={values:t=>Rr(t)?t:""+t,numeric(t,e,i){if(0===t)return"0";const s=this.chart.options.locale;let o,n=t;if(i.length>1){const e=Math.max(Math.abs(i[0].value),Math.abs(i[i.length-1].value));(e<1e-4||e>1e15)&&(o="scientific"),n=function(t,e){let i=e.length>3?e[2].value-e[1].value:e[1].value-e[0].value;Math.abs(i)>=1&&t!==Math.floor(t)&&(i=t-Math.floor(t));return i}(t,i)}const r=da(Math.abs(n)),a=Math.max(Math.min(-1*Math.floor(r),20),0),l={notation:o,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(l,this.options.ticks.format),Xa(t,s,l)},logarithmic(t,e,i){if(0===t)return"0";const s=i[e].significand||t/Math.pow(10,Math.floor(da(t)));return[1,2,3,5,10,15].includes(s)||e>.8*i.length?Ga.numeric.call(this,t,e,i):""}};var Ja={formatters:Ga};const Za=Object.create(null),Qa=Object.create(null);function tl(t,e){if(!e)return t;const i=e.split(".");for(let e=0,s=i.length;e<s;++e){const s=i[e];t=t[s]||(t[s]=Object.create(null))}return t}function el(t,e,i){return"string"==typeof e?Yr(tl(t,e),i):Yr(tl(t,""),e)}class il{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=t=>t.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(t,e)=>Wa(e.backgroundColor),this.hoverBorderColor=(t,e)=>Wa(e.borderColor),this.hoverColor=(t,e)=>Wa(e.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return el(this,t,e)}get(t){return tl(this,t)}describe(t,e){return el(Qa,t,e)}override(t,e){return el(Za,t,e)}route(t,e,i,s){const o=tl(this,t),n=tl(this,i),r="_"+e;Object.defineProperties(o,{[r]:{value:o[e],writable:!0},[e]:{enumerable:!0,get(){const t=this[r],e=n[s];return Ir(t)?Object.assign({},e,t):Br(t,e)},set(t){this[r]=t}}})}apply(t){t.forEach((t=>t(this)))}}var sl=new il({_scriptable:t=>!t.startsWith("on"),_indexable:t=>"events"!==t,hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[function(t){t.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),t.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>"onProgress"!==t&&"onComplete"!==t&&"fn"!==t}),t.set("animations",{colors:{type:"color",properties:Ka},numbers:{type:"number",properties:qa}}),t.describe("animations",{_fallback:"animation"}),t.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>0|t}}}})},function(t){t.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})},function(t){t.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Ja.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),t.route("scale.ticks","color","","color"),t.route("scale.grid","color","","borderColor"),t.route("scale.border","color","","borderColor"),t.route("scale.title","color","","color"),t.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&"callback"!==t&&"parser"!==t,_indexable:t=>"borderDash"!==t&&"tickBorderDash"!==t&&"dash"!==t}),t.describe("scales",{_fallback:"scale"}),t.describe("scale.ticks",{_scriptable:t=>"backdropPadding"!==t&&"callback"!==t,_indexable:t=>"backdropPadding"!==t})}]);function ol(t,e,i,s,o){let n=e[o];return n||(n=e[o]=t.measureText(o).width,i.push(o)),n>s&&(s=n),s}function nl(t,e,i,s){let o=(s=s||{}).data=s.data||{},n=s.garbageCollect=s.garbageCollect||[];s.font!==e&&(o=s.data={},n=s.garbageCollect=[],s.font=e),t.save(),t.font=e;let r=0;const a=i.length;let l,c,h,d,u;for(l=0;l<a;l++)if(d=i[l],null!=d&&!0!==Rr(d))r=ol(t,o,n,r,d);else if(Rr(d))for(c=0,h=d.length;c<h;c++)u=d[c],null==u||Rr(u)||(r=ol(t,o,n,r,u));t.restore();const p=n.length/2;if(p>i.length){for(l=0;l<p;l++)delete o[n[l]];n.splice(0,p)}return r}function rl(t,e,i){const s=t.currentDevicePixelRatio,o=0!==i?Math.max(i/2,.5):0;return Math.round((e-o)*s)/s+o}function al(t,e){(e=e||t.getContext("2d")).save(),e.resetTransform(),e.clearRect(0,0,t.width,t.height),e.restore()}function ll(t,e,i,s){cl(t,e,i,s,null)}function cl(t,e,i,s,o){let n,r,a,l,c,h,d,u;const p=e.pointStyle,g=e.rotation,f=e.radius;let m=(g||0)*aa;if(p&&"object"==typeof p&&(n=p.toString(),"[object HTMLImageElement]"===n||"[object HTMLCanvasElement]"===n))return t.save(),t.translate(i,s),t.rotate(m),t.drawImage(p,-p.width/2,-p.height/2,p.width,p.height),void t.restore();if(!(isNaN(f)||f<=0)){switch(t.beginPath(),p){default:o?t.ellipse(i,s,o/2,f,0,0,oa):t.arc(i,s,f,0,oa),t.closePath();break;case"triangle":h=o?o/2:f,t.moveTo(i+Math.sin(m)*h,s-Math.cos(m)*f),m+=ha,t.lineTo(i+Math.sin(m)*h,s-Math.cos(m)*f),m+=ha,t.lineTo(i+Math.sin(m)*h,s-Math.cos(m)*f),t.closePath();break;case"rectRounded":c=.516*f,l=f-c,r=Math.cos(m+ca)*l,d=Math.cos(m+ca)*(o?o/2-c:l),a=Math.sin(m+ca)*l,u=Math.sin(m+ca)*(o?o/2-c:l),t.arc(i-d,s-a,c,m-sa,m-la),t.arc(i+u,s-r,c,m-la,m),t.arc(i+d,s+a,c,m,m+la),t.arc(i-u,s+r,c,m+la,m+sa),t.closePath();break;case"rect":if(!g){l=Math.SQRT1_2*f,h=o?o/2:l,t.rect(i-h,s-l,2*h,2*l);break}m+=ca;case"rectRot":d=Math.cos(m)*(o?o/2:f),r=Math.cos(m)*f,a=Math.sin(m)*f,u=Math.sin(m)*(o?o/2:f),t.moveTo(i-d,s-a),t.lineTo(i+u,s-r),t.lineTo(i+d,s+a),t.lineTo(i-u,s+r),t.closePath();break;case"crossRot":m+=ca;case"cross":d=Math.cos(m)*(o?o/2:f),r=Math.cos(m)*f,a=Math.sin(m)*f,u=Math.sin(m)*(o?o/2:f),t.moveTo(i-d,s-a),t.lineTo(i+d,s+a),t.moveTo(i+u,s-r),t.lineTo(i-u,s+r);break;case"star":d=Math.cos(m)*(o?o/2:f),r=Math.cos(m)*f,a=Math.sin(m)*f,u=Math.sin(m)*(o?o/2:f),t.moveTo(i-d,s-a),t.lineTo(i+d,s+a),t.moveTo(i+u,s-r),t.lineTo(i-u,s+r),m+=ca,d=Math.cos(m)*(o?o/2:f),r=Math.cos(m)*f,a=Math.sin(m)*f,u=Math.sin(m)*(o?o/2:f),t.moveTo(i-d,s-a),t.lineTo(i+d,s+a),t.moveTo(i+u,s-r),t.lineTo(i-u,s+r);break;case"line":r=o?o/2:Math.cos(m)*f,a=Math.sin(m)*f,t.moveTo(i-r,s-a),t.lineTo(i+r,s+a);break;case"dash":t.moveTo(i,s),t.lineTo(i+Math.cos(m)*(o?o/2:f),s+Math.sin(m)*f);break;case!1:t.closePath()}t.fill(),e.borderWidth>0&&t.stroke()}}function hl(t,e,i){return i=i||.5,!e||t&&t.x>e.left-i&&t.x<e.right+i&&t.y>e.top-i&&t.y<e.bottom+i}function dl(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()}function ul(t){t.restore()}function pl(t,e,i,s,o){if(!e)return t.lineTo(i.x,i.y);if("middle"===o){const s=(e.x+i.x)/2;t.lineTo(s,e.y),t.lineTo(s,i.y)}else"after"===o!=!!s?t.lineTo(e.x,i.y):t.lineTo(i.x,e.y);t.lineTo(i.x,i.y)}function gl(t,e,i,s){if(!e)return t.lineTo(i.x,i.y);t.bezierCurveTo(s?e.cp1x:e.cp2x,s?e.cp1y:e.cp2y,s?i.cp2x:i.cp1x,s?i.cp2y:i.cp1y,i.x,i.y)}function fl(t,e,i,s,o,n={}){const r=Rr(e)?e:[e],a=n.strokeWidth>0&&""!==n.strokeColor;let l,c;for(t.save(),t.font=o.string,function(t,e){e.translation&&t.translate(e.translation[0],e.translation[1]);Lr(e.rotation)||t.rotate(e.rotation);e.color&&(t.fillStyle=e.color);e.textAlign&&(t.textAlign=e.textAlign);e.textBaseline&&(t.textBaseline=e.textBaseline)}(t,n),l=0;l<r.length;++l)c=r[l],n.backdrop&&bl(t,n.backdrop),a&&(n.strokeColor&&(t.strokeStyle=n.strokeColor),Lr(n.strokeWidth)||(t.lineWidth=n.strokeWidth),t.strokeText(c,i,s,n.maxWidth)),t.fillText(c,i,s,n.maxWidth),ml(t,i,s,c,n),s+=o.lineHeight;t.restore()}function ml(t,e,i,s,o){if(o.strikethrough||o.underline){const n=t.measureText(s),r=e-n.actualBoundingBoxLeft,a=e+n.actualBoundingBoxRight,l=i-n.actualBoundingBoxAscent,c=i+n.actualBoundingBoxDescent,h=o.strikethrough?(l+c)/2:c;t.strokeStyle=t.fillStyle,t.beginPath(),t.lineWidth=o.decorationWidth||2,t.moveTo(r,h),t.lineTo(a,h),t.stroke()}}function bl(t,e){const i=t.fillStyle;t.fillStyle=e.color,t.fillRect(e.left,e.top,e.width,e.height),t.fillStyle=i}function vl(t,e){const{x:i,y:s,w:o,h:n,radius:r}=e;t.arc(i+r.topLeft,s+r.topLeft,r.topLeft,-la,sa,!0),t.lineTo(i,s+n-r.bottomLeft),t.arc(i+r.bottomLeft,s+n-r.bottomLeft,r.bottomLeft,sa,la,!0),t.lineTo(i+o-r.bottomRight,s+n),t.arc(i+o-r.bottomRight,s+n-r.bottomRight,r.bottomRight,la,0,!0),t.lineTo(i+o,s+r.topRight),t.arc(i+o-r.topRight,s+r.topRight,r.topRight,0,-la,!0),t.lineTo(i+r.topLeft,s)}const yl=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,xl=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function _l(t,e){const i=(""+t).match(yl);if(!i||"normal"===i[1])return 1.2*e;switch(t=+i[2],i[3]){case"px":return t;case"%":t/=100}return e*t}const wl=t=>+t||0;function kl(t,e){const i={},s=Ir(e),o=s?Object.keys(e):e,n=Ir(t)?s?i=>Br(t[i],t[e[i]]):e=>t[e]:()=>t;for(const t of o)i[t]=wl(n(t));return i}function $l(t){return kl(t,{top:"y",right:"x",bottom:"y",left:"x"})}function Cl(t){return kl(t,["topLeft","topRight","bottomLeft","bottomRight"])}function Al(t){const e=$l(t);return e.width=e.left+e.right,e.height=e.top+e.bottom,e}function Sl(t,e){t=t||{},e=e||sl.font;let i=Br(t.size,e.size);"string"==typeof i&&(i=parseInt(i,10));let s=Br(t.style,e.style);s&&!(""+s).match(xl)&&(s=void 0);const o={family:Br(t.family,e.family),lineHeight:_l(Br(t.lineHeight,e.lineHeight),i),size:i,style:s,weight:Br(t.weight,e.weight),string:""};return o.string=function(t){return!t||Lr(t.size)||Lr(t.family)?null:(t.style?t.style+" ":"")+(t.weight?t.weight+" ":"")+t.size+"px "+t.family}(o),o}function Ml(t,e,i,s){let o,n,r,a=!0;for(o=0,n=t.length;o<n;++o)if(r=t[o],void 0!==r&&(void 0!==e&&"function"==typeof r&&(r=r(e),a=!1),void 0!==i&&Rr(r)&&(r=r[i%r.length],a=!1),void 0!==r))return s&&!a&&(s.cacheable=!1),r}function El(t,e){return Object.assign(Object.create(t),e)}function Pl(t,e=[""],i=t,s,o=(()=>t[0])){ta(s)||(s=Nl("_fallback",t));const n={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:t,_rootScopes:i,_fallback:s,_getTarget:o,override:o=>Pl([o,...t],e,i,s)};return new Proxy(n,{deleteProperty:(e,i)=>(delete e[i],delete e._keys,delete t[0][i],!0),get:(i,s)=>Ll(i,s,(()=>function(t,e,i,s){let o;for(const n of e)if(o=Nl(Dl(n,t),i),ta(o))return zl(t,o)?Vl(i,s,t,o):o}(s,e,t,i))),getOwnPropertyDescriptor:(t,e)=>Reflect.getOwnPropertyDescriptor(t._scopes[0],e),getPrototypeOf:()=>Reflect.getPrototypeOf(t[0]),has:(t,e)=>Hl(t).includes(e),ownKeys:t=>Hl(t),set(t,e,i){const s=t._storage||(t._storage=o());return t[e]=s[e]=i,delete t._keys,!0}})}function Tl(t,e,i,s){const o={_cacheable:!1,_proxy:t,_context:e,_subProxy:i,_stack:new Set,_descriptors:Ol(t,s),setContext:e=>Tl(t,e,i,s),override:o=>Tl(t.override(o),e,i,s)};return new Proxy(o,{deleteProperty:(e,i)=>(delete e[i],delete t[i],!0),get:(t,e,i)=>Ll(t,e,(()=>function(t,e,i){const{_proxy:s,_context:o,_subProxy:n,_descriptors:r}=t;let a=s[e];ea(a)&&r.isScriptable(e)&&(a=function(t,e,i,s){const{_proxy:o,_context:n,_subProxy:r,_stack:a}=i;if(a.has(t))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+t);a.add(t),e=e(n,r||s),a.delete(t),zl(t,e)&&(e=Vl(o._scopes,o,t,e));return e}(e,a,t,i));Rr(a)&&a.length&&(a=function(t,e,i,s){const{_proxy:o,_context:n,_subProxy:r,_descriptors:a}=i;if(ta(n.index)&&s(t))e=e[n.index%e.length];else if(Ir(e[0])){const i=e,s=o._scopes.filter((t=>t!==i));e=[];for(const l of i){const i=Vl(s,o,t,l);e.push(Tl(i,n,r&&r[t],a))}}return e}(e,a,t,r.isIndexable));zl(e,a)&&(a=Tl(a,o,n&&n[e],r));return a}(t,e,i))),getOwnPropertyDescriptor:(e,i)=>e._descriptors.allKeys?Reflect.has(t,i)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(t,i),getPrototypeOf:()=>Reflect.getPrototypeOf(t),has:(e,i)=>Reflect.has(t,i),ownKeys:()=>Reflect.ownKeys(t),set:(e,i,s)=>(t[i]=s,delete e[i],!0)})}function Ol(t,e={scriptable:!0,indexable:!0}){const{_scriptable:i=e.scriptable,_indexable:s=e.indexable,_allKeys:o=e.allKeys}=t;return{allKeys:o,scriptable:i,indexable:s,isScriptable:ea(i)?i:()=>i,isIndexable:ea(s)?s:()=>s}}const Dl=(t,e)=>t?t+Qr(e):e,zl=(t,e)=>Ir(e)&&"adapters"!==t&&(null===Object.getPrototypeOf(e)||e.constructor===Object);function Ll(t,e,i){if(Object.prototype.hasOwnProperty.call(t,e))return t[e];const s=i();return t[e]=s,s}function Rl(t,e,i){return ea(t)?t(e,i):t}const Il=(t,e)=>!0===t?e:"string"==typeof t?Zr(e,t):void 0;function Fl(t,e,i,s,o){for(const n of e){const e=Il(i,n);if(e){t.add(e);const n=Rl(e._fallback,i,o);if(ta(n)&&n!==i&&n!==s)return n}else if(!1===e&&ta(s)&&i!==s)return null}return!1}function Vl(t,e,i,s){const o=e._rootScopes,n=Rl(e._fallback,i,s),r=[...t,...o],a=new Set;a.add(s);let l=Bl(a,r,i,n||i,s);return null!==l&&((!ta(n)||n===i||(l=Bl(a,r,n,l,s),null!==l))&&Pl(Array.from(a),[""],o,n,(()=>function(t,e,i){const s=t._getTarget();e in s||(s[e]={});const o=s[e];if(Rr(o)&&Ir(i))return i;return o||{}}(e,i,s))))}function Bl(t,e,i,s,o){for(;i;)i=Fl(t,e,i,s,o);return i}function Nl(t,e){for(const i of e){if(!i)continue;const e=i[t];if(ta(e))return e}}function Hl(t){let e=t._keys;return e||(e=t._keys=function(t){const e=new Set;for(const i of t)for(const t of Object.keys(i).filter((t=>!t.startsWith("_"))))e.add(t);return Array.from(e)}(t._scopes)),e}function jl(t,e,i,s){const{iScale:o}=t,{key:n="r"}=this._parsing,r=new Array(s);let a,l,c,h;for(a=0,l=s;a<l;++a)c=a+i,h=e[c],r[a]={r:o.parse(Zr(h,n),c)};return r}const Ul=Number.EPSILON||1e-14,Wl=(t,e)=>e<t.length&&!t[e].skip&&t[e],ql=t=>"x"===t?"y":"x";function Kl(t,e,i,s){const o=t.skip?e:t,n=e,r=i.skip?e:i,a=_a(n,o),l=_a(r,n);let c=a/(a+l),h=l/(a+l);c=isNaN(c)?0:c,h=isNaN(h)?0:h;const d=s*c,u=s*h;return{previous:{x:n.x-d*(r.x-o.x),y:n.y-d*(r.y-o.y)},next:{x:n.x+u*(r.x-o.x),y:n.y+u*(r.y-o.y)}}}function Yl(t,e="x"){const i=ql(e),s=t.length,o=Array(s).fill(0),n=Array(s);let r,a,l,c=Wl(t,0);for(r=0;r<s;++r)if(a=l,l=c,c=Wl(t,r+1),l){if(c){const t=c[e]-l[e];o[r]=0!==t?(c[i]-l[i])/t:0}n[r]=a?c?ua(o[r-1])!==ua(o[r])?0:(o[r-1]+o[r])/2:o[r-1]:o[r]}!function(t,e,i){const s=t.length;let o,n,r,a,l,c=Wl(t,0);for(let h=0;h<s-1;++h)l=c,c=Wl(t,h+1),l&&c&&(pa(e[h],0,Ul)?i[h]=i[h+1]=0:(o=i[h]/e[h],n=i[h+1]/e[h],a=Math.pow(o,2)+Math.pow(n,2),a<=9||(r=3/Math.sqrt(a),i[h]=o*r*e[h],i[h+1]=n*r*e[h])))}(t,o,n),function(t,e,i="x"){const s=ql(i),o=t.length;let n,r,a,l=Wl(t,0);for(let c=0;c<o;++c){if(r=a,a=l,l=Wl(t,c+1),!a)continue;const o=a[i],h=a[s];r&&(n=(o-r[i])/3,a[`cp1${i}`]=o-n,a[`cp1${s}`]=h-n*e[c]),l&&(n=(l[i]-o)/3,a[`cp2${i}`]=o+n,a[`cp2${s}`]=h+n*e[c])}}(t,n,e)}function Xl(t,e,i){return Math.max(Math.min(t,i),e)}function Gl(t,e,i,s,o){let n,r,a,l;if(e.spanGaps&&(t=t.filter((t=>!t.skip))),"monotone"===e.cubicInterpolationMode)Yl(t,o);else{let i=s?t[t.length-1]:t[0];for(n=0,r=t.length;n<r;++n)a=t[n],l=Kl(i,a,t[Math.min(n+1,r-(s?0:1))%r],e.tension),a.cp1x=l.previous.x,a.cp1y=l.previous.y,a.cp2x=l.next.x,a.cp2y=l.next.y,i=a}e.capBezierPoints&&function(t,e){let i,s,o,n,r,a=hl(t[0],e);for(i=0,s=t.length;i<s;++i)r=n,n=a,a=i<s-1&&hl(t[i+1],e),n&&(o=t[i],r&&(o.cp1x=Xl(o.cp1x,e.left,e.right),o.cp1y=Xl(o.cp1y,e.top,e.bottom)),a&&(o.cp2x=Xl(o.cp2x,e.left,e.right),o.cp2y=Xl(o.cp2y,e.top,e.bottom)))}(t,i)}function Jl(){return"undefined"!=typeof window&&"undefined"!=typeof document}function Zl(t){let e=t.parentNode;return e&&"[object ShadowRoot]"===e.toString()&&(e=e.host),e}function Ql(t,e,i){let s;return"string"==typeof t?(s=parseInt(t,10),-1!==t.indexOf("%")&&(s=s/100*e.parentNode[i])):s=t,s}const tc=t=>t.ownerDocument.defaultView.getComputedStyle(t,null);const ec=["top","right","bottom","left"];function ic(t,e,i){const s={};i=i?"-"+i:"";for(let o=0;o<4;o++){const n=ec[o];s[n]=parseFloat(t[e+"-"+n+i])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const sc=(t,e,i)=>(t>0||e>0)&&(!i||!i.shadowRoot);function oc(t,e){if("native"in t)return t;const{canvas:i,currentDevicePixelRatio:s}=e,o=tc(i),n="border-box"===o.boxSizing,r=ic(o,"padding"),a=ic(o,"border","width"),{x:l,y:c,box:h}=function(t,e){const i=t.touches,s=i&&i.length?i[0]:t,{offsetX:o,offsetY:n}=s;let r,a,l=!1;if(sc(o,n,t.target))r=o,a=n;else{const t=e.getBoundingClientRect();r=s.clientX-t.left,a=s.clientY-t.top,l=!0}return{x:r,y:a,box:l}}(t,i),d=r.left+(h&&a.left),u=r.top+(h&&a.top);let{width:p,height:g}=e;return n&&(p-=r.width+a.width,g-=r.height+a.height),{x:Math.round((l-d)/p*i.width/s),y:Math.round((c-u)/g*i.height/s)}}const nc=t=>Math.round(10*t)/10;function rc(t,e,i,s){const o=tc(t),n=ic(o,"margin"),r=Ql(o.maxWidth,t,"clientWidth")||ra,a=Ql(o.maxHeight,t,"clientHeight")||ra,l=function(t,e,i){let s,o;if(void 0===e||void 0===i){const n=Zl(t);if(n){const t=n.getBoundingClientRect(),r=tc(n),a=ic(r,"border","width"),l=ic(r,"padding");e=t.width-l.width-a.width,i=t.height-l.height-a.height,s=Ql(r.maxWidth,n,"clientWidth"),o=Ql(r.maxHeight,n,"clientHeight")}else e=t.clientWidth,i=t.clientHeight}return{width:e,height:i,maxWidth:s||ra,maxHeight:o||ra}}(t,e,i);let{width:c,height:h}=l;if("content-box"===o.boxSizing){const t=ic(o,"border","width"),e=ic(o,"padding");c-=e.width+t.width,h-=e.height+t.height}c=Math.max(0,c-n.width),h=Math.max(0,s?c/s:h-n.height),c=nc(Math.min(c,r,l.maxWidth)),h=nc(Math.min(h,a,l.maxHeight)),c&&!h&&(h=nc(c/2));return(void 0!==e||void 0!==i)&&s&&l.height&&h>l.height&&(h=l.height,c=nc(Math.floor(h*s))),{width:c,height:h}}function ac(t,e,i){const s=e||1,o=Math.floor(t.height*s),n=Math.floor(t.width*s);t.height=Math.floor(t.height),t.width=Math.floor(t.width);const r=t.canvas;return r.style&&(i||!r.style.height&&!r.style.width)&&(r.style.height=`${t.height}px`,r.style.width=`${t.width}px`),(t.currentDevicePixelRatio!==s||r.height!==o||r.width!==n)&&(t.currentDevicePixelRatio=s,r.height=o,r.width=n,t.ctx.setTransform(s,0,0,s,0,0),!0)}const lc=function(){let t=!1;try{const e={get passive(){return t=!0,!1}};window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(t){}return t}();function cc(t,e){const i=function(t,e){return tc(t).getPropertyValue(e)}(t,e),s=i&&i.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function hc(t,e,i,s){return{x:t.x+i*(e.x-t.x),y:t.y+i*(e.y-t.y)}}function dc(t,e,i,s){return{x:t.x+i*(e.x-t.x),y:"middle"===s?i<.5?t.y:e.y:"after"===s?i<1?t.y:e.y:i>0?e.y:t.y}}function uc(t,e,i,s){const o={x:t.cp2x,y:t.cp2y},n={x:e.cp1x,y:e.cp1y},r=hc(t,o,i),a=hc(o,n,i),l=hc(n,e,i),c=hc(r,a,i),h=hc(a,l,i);return hc(c,h,i)}const pc=function(t,e){return{x:i=>t+t+e-i,setWidth(t){e=t},textAlign:t=>"center"===t?t:"right"===t?"left":"right",xPlus:(t,e)=>t-e,leftForLtr:(t,e)=>t-e}},gc=function(){return{x:t=>t,setWidth(t){},textAlign:t=>t,xPlus:(t,e)=>t+e,leftForLtr:(t,e)=>t}};function fc(t,e,i){return t?pc(e,i):gc()}function mc(t,e){let i,s;"ltr"!==e&&"rtl"!==e||(i=t.canvas.style,s=[i.getPropertyValue("direction"),i.getPropertyPriority("direction")],i.setProperty("direction",e,"important"),t.prevTextDirection=s)}function bc(t,e){void 0!==e&&(delete t.prevTextDirection,t.canvas.style.setProperty("direction",e[0],e[1]))}function vc(t){return"angle"===t?{between:$a,compare:wa,normalize:ka}:{between:Aa,compare:(t,e)=>t-e,normalize:t=>t}}function yc({start:t,end:e,count:i,loop:s,style:o}){return{start:t%i,end:e%i,loop:s&&(e-t+1)%i==0,style:o}}function xc(t,e,i){if(!i)return[t];const{property:s,start:o,end:n}=i,r=e.length,{compare:a,between:l,normalize:c}=vc(s),{start:h,end:d,loop:u,style:p}=function(t,e,i){const{property:s,start:o,end:n}=i,{between:r,normalize:a}=vc(s),l=e.length;let c,h,{start:d,end:u,loop:p}=t;if(p){for(d+=l,u+=l,c=0,h=l;c<h&&r(a(e[d%l][s]),o,n);++c)d--,u--;d%=l,u%=l}return u<d&&(u+=l),{start:d,end:u,loop:p,style:t.style}}(t,e,i),g=[];let f,m,b,v=!1,y=null;const x=()=>v||l(o,b,f)&&0!==a(o,b),_=()=>!v||0===a(n,f)||l(n,b,f);for(let t=h,i=h;t<=d;++t)m=e[t%r],m.skip||(f=c(m[s]),f!==b&&(v=l(f,o,n),null===y&&x()&&(y=0===a(f,o)?t:i),null!==y&&_()&&(g.push(yc({start:y,end:t,loop:u,count:r,style:p})),y=null),i=t,b=f));return null!==y&&g.push(yc({start:y,end:d,loop:u,count:r,style:p})),g}function _c(t,e){const i=[],s=t.segments;for(let o=0;o<s.length;o++){const n=xc(s[o],t.points,e);n.length&&i.push(...n)}return i}function wc(t,e,i,s){return s&&s.setContext&&i?function(t,e,i,s){const o=t._chart.getContext(),n=kc(t.options),{_datasetIndex:r,options:{spanGaps:a}}=t,l=i.length,c=[];let h=n,d=e[0].start,u=d;function p(t,e,s,o){const n=a?-1:1;if(t!==e){for(t+=l;i[t%l].skip;)t-=n;for(;i[e%l].skip;)e+=n;t%l!=e%l&&(c.push({start:t%l,end:e%l,loop:s,style:o}),h=o,d=e%l)}}for(const t of e){d=a?d:t.start;let e,n=i[d%l];for(u=d+1;u<=t.end;u++){const a=i[u%l];e=kc(s.setContext(El(o,{type:"segment",p0:n,p1:a,p0DataIndex:(u-1)%l,p1DataIndex:u%l,datasetIndex:r}))),$c(e,h)&&p(d,u-1,t.loop,h),n=a,h=e}d<u-1&&p(d,u-1,t.loop,h)}return c}(t,e,i,s):e}function kc(t){return{backgroundColor:t.backgroundColor,borderCapStyle:t.borderCapStyle,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderJoinStyle:t.borderJoinStyle,borderWidth:t.borderWidth,borderColor:t.borderColor}}function $c(t,e){return e&&JSON.stringify(t)!==JSON.stringify(e)}
/*!
   * Chart.js v4.2.1
   * https://www.chartjs.org
   * (c) 2023 Chart.js Contributors
   * Released under the MIT License
   */class Cc{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,i,s){const o=e.listeners[s],n=e.duration;o.forEach((s=>s({chart:t,initial:e.initial,numSteps:n,currentStep:Math.min(i-e.start,n)})))}_refresh(){this._request||(this._running=!0,this._request=Da.call(window,(()=>{this._update(),this._request=null,this._running&&this._refresh()})))}_update(t=Date.now()){let e=0;this._charts.forEach(((i,s)=>{if(!i.running||!i.items.length)return;const o=i.items;let n,r=o.length-1,a=!1;for(;r>=0;--r)n=o[r],n._active?(n._total>i.duration&&(i.duration=n._total),n.tick(t),a=!0):(o[r]=o[o.length-1],o.pop());a&&(s.draw(),this._notify(s,i,t,"progress")),o.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),e+=o.length})),this._lastDate=t,0===e&&(this._running=!1)}_getAnims(t){const e=this._charts;let i=e.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,i)),i}listen(t,e,i){this._getAnims(t).listeners[e].push(i)}add(t,e){e&&e.length&&this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce(((t,e)=>Math.max(t,e._duration)),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!!(e&&e.running&&e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const i=e.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Ac=new Cc;const Sc="transparent",Mc={boolean:(t,e,i)=>i>.5?e:t,color(t,e,i){const s=Ua(t||Sc),o=s.valid&&Ua(e||Sc);return o&&o.valid?o.mix(s,i).hexString():e},number:(t,e,i)=>t+(e-t)*i};class Ec{constructor(t,e,i,s){const o=e[i];s=Ml([t.to,s,o,t.from]);const n=Ml([t.from,o,s]);this._active=!0,this._fn=t.fn||Mc[t.type||typeof n],this._easing=Ha[t.easing]||Ha.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=i,this._from=n,this._to=s,this._promises=void 0}active(){return this._active}update(t,e,i){if(this._active){this._notify(!1);const s=this._target[this._prop],o=i-this._start,n=this._duration-o;this._start=i,this._duration=Math.floor(Math.max(n,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=Ml([t.to,e,s,t.from]),this._from=Ml([t.from,s,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,i=this._duration,s=this._prop,o=this._from,n=this._loop,r=this._to;let a;if(this._active=o!==r&&(n||e<i),!this._active)return this._target[s]=r,void this._notify(!0);e<0?this._target[s]=o:(a=e/i%2,a=n&&a>1?2-a:a,a=this._easing(Math.min(1,Math.max(0,a))),this._target[s]=this._fn(o,r,a))}wait(){const t=this._promises||(this._promises=[]);return new Promise(((e,i)=>{t.push({res:e,rej:i})}))}_notify(t){const e=t?"res":"rej",i=this._promises||[];for(let t=0;t<i.length;t++)i[t][e]()}}class Pc{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!Ir(t))return;const e=Object.keys(sl.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach((s=>{const o=t[s];if(!Ir(o))return;const n={};for(const t of e)n[t]=o[t];(Rr(o.properties)&&o.properties||[s]).forEach((t=>{t!==s&&i.has(t)||i.set(t,n)}))}))}_animateOptions(t,e){const i=e.options,s=function(t,e){if(!e)return;let i=t.options;if(!i)return void(t.options=e);i.$shared&&(t.options=i=Object.assign({},i,{$shared:!1,$animations:{}}));return i}(t,i);if(!s)return[];const o=this._createAnimations(s,i);return i.$shared&&function(t,e){const i=[],s=Object.keys(e);for(let e=0;e<s.length;e++){const o=t[s[e]];o&&o.active()&&i.push(o.wait())}return Promise.all(i)}(t.options.$animations,i).then((()=>{t.options=i}),(()=>{})),o}_createAnimations(t,e){const i=this._properties,s=[],o=t.$animations||(t.$animations={}),n=Object.keys(e),r=Date.now();let a;for(a=n.length-1;a>=0;--a){const l=n[a];if("$"===l.charAt(0))continue;if("options"===l){s.push(...this._animateOptions(t,e));continue}const c=e[l];let h=o[l];const d=i.get(l);if(h){if(d&&h.active()){h.update(d,c,r);continue}h.cancel()}d&&d.duration?(o[l]=h=new Ec(d,t,l,c),s.push(h)):t[l]=c}return s}update(t,e){if(0===this._properties.size)return void Object.assign(t,e);const i=this._createAnimations(t,e);return i.length?(Ac.add(this._chart,i),!0):void 0}}function Tc(t,e){const i=t&&t.options||{},s=i.reverse,o=void 0===i.min?e:0,n=void 0===i.max?e:0;return{start:s?n:o,end:s?o:n}}function Oc(t,e){const i=[],s=t._getSortedDatasetMetas(e);let o,n;for(o=0,n=s.length;o<n;++o)i.push(s[o].index);return i}function Dc(t,e,i,s={}){const o=t.keys,n="single"===s.mode;let r,a,l,c;if(null!==e){for(r=0,a=o.length;r<a;++r){if(l=+o[r],l===i){if(s.all)continue;break}c=t.values[l],Fr(c)&&(n||0===e||ua(e)===ua(c))&&(e+=c)}return e}}function zc(t,e){const i=t&&t.options.stacked;return i||void 0===i&&void 0!==e.stack}function Lc(t,e,i){const s=t[e]||(t[e]={});return s[i]||(s[i]={})}function Rc(t,e,i,s){for(const o of e.getMatchingVisibleMetas(s).reverse()){const e=t[o.index];if(i&&e>0||!i&&e<0)return o.index}return null}function Ic(t,e){const{chart:i,_cachedMeta:s}=t,o=i._stacks||(i._stacks={}),{iScale:n,vScale:r,index:a}=s,l=n.axis,c=r.axis,h=function(t,e,i){return`${t.id}.${e.id}.${i.stack||i.type}`}(n,r,s),d=e.length;let u;for(let t=0;t<d;++t){const i=e[t],{[l]:n,[c]:d}=i;u=(i._stacks||(i._stacks={}))[c]=Lc(o,h,n),u[a]=d,u._top=Rc(u,r,!0,s.type),u._bottom=Rc(u,r,!1,s.type);(u._visualValues||(u._visualValues={}))[a]=d}}function Fc(t,e){const i=t.scales;return Object.keys(i).filter((t=>i[t].axis===e)).shift()}function Vc(t,e){const i=t.controller.index,s=t.vScale&&t.vScale.axis;if(s){e=e||t._parsed;for(const t of e){const e=t._stacks;if(!e||void 0===e[s]||void 0===e[s][i])return;delete e[s][i],void 0!==e[s]._visualValues&&void 0!==e[s]._visualValues[i]&&delete e[s]._visualValues[i]}}}const Bc=t=>"reset"===t||"none"===t,Nc=(t,e)=>e?t:Object.assign({},t);class Hc{static defaults={};static datasetElementType=null;static dataElementType=null;constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=zc(t.vScale,t),this.addElements(),this.options.fill&&this.chart.isPluginEnabled("filler")}updateIndex(t){this.index!==t&&Vc(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,i=this.getDataset(),s=(t,e,i,s)=>"x"===t?e:"r"===t?s:i,o=e.xAxisID=Br(i.xAxisID,Fc(t,"x")),n=e.yAxisID=Br(i.yAxisID,Fc(t,"y")),r=e.rAxisID=Br(i.rAxisID,Fc(t,"r")),a=e.indexAxis,l=e.iAxisID=s(a,o,n,r),c=e.vAxisID=s(a,n,o,r);e.xScale=this.getScaleForId(o),e.yScale=this.getScaleForId(n),e.rScale=this.getScaleForId(r),e.iScale=this.getScaleForId(l),e.vScale=this.getScaleForId(c)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Ta(this._data,this),t._stacked&&Vc(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),i=this._data;if(Ir(e))this._data=function(t){const e=Object.keys(t),i=new Array(e.length);let s,o,n;for(s=0,o=e.length;s<o;++s)n=e[s],i[s]={x:n,y:t[n]};return i}(e);else if(i!==e){if(i){Ta(i,this);const t=this._cachedMeta;Vc(t),t._parsed=[]}e&&Object.isExtensible(e)&&(o=this,(s=e)._chartjs?s._chartjs.listeners.push(o):(Object.defineProperty(s,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[o]}}),Pa.forEach((t=>{const e="_onData"+Qr(t),i=s[t];Object.defineProperty(s,t,{configurable:!0,enumerable:!1,value(...t){const o=i.apply(this,t);return s._chartjs.listeners.forEach((i=>{"function"==typeof i[e]&&i[e](...t)})),o}})})))),this._syncList=[],this._data=e}var s,o}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const o=e._stacked;e._stacked=zc(e.vScale,e),e.stack!==i.stack&&(s=!0,Vc(e),e.stack=i.stack),this._resyncElements(t),(s||o!==e._stacked)&&Ic(this,e._parsed)}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:i,_data:s}=this,{iScale:o,_stacked:n}=i,r=o.axis;let a,l,c,h=0===t&&e===s.length||i._sorted,d=t>0&&i._parsed[t-1];if(!1===this._parsing)i._parsed=s,i._sorted=!0,c=s;else{c=Rr(s[t])?this.parseArrayData(i,s,t,e):Ir(s[t])?this.parseObjectData(i,s,t,e):this.parsePrimitiveData(i,s,t,e);const o=()=>null===l[r]||d&&l[r]<d[r];for(a=0;a<e;++a)i._parsed[a+t]=l=c[a],h&&(o()&&(h=!1),d=l);i._sorted=h}n&&Ic(this,c)}parsePrimitiveData(t,e,i,s){const{iScale:o,vScale:n}=t,r=o.axis,a=n.axis,l=o.getLabels(),c=o===n,h=new Array(s);let d,u,p;for(d=0,u=s;d<u;++d)p=d+i,h[d]={[r]:c||o.parse(l[p],p),[a]:n.parse(e[p],p)};return h}parseArrayData(t,e,i,s){const{xScale:o,yScale:n}=t,r=new Array(s);let a,l,c,h;for(a=0,l=s;a<l;++a)c=a+i,h=e[c],r[a]={x:o.parse(h[0],c),y:n.parse(h[1],c)};return r}parseObjectData(t,e,i,s){const{xScale:o,yScale:n}=t,{xAxisKey:r="x",yAxisKey:a="y"}=this._parsing,l=new Array(s);let c,h,d,u;for(c=0,h=s;c<h;++c)d=c+i,u=e[d],l[c]={x:o.parse(Zr(u,r),d),y:n.parse(Zr(u,a),d)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,i){const s=this.chart,o=this._cachedMeta,n=e[t.axis];return Dc({keys:Oc(s,!0),values:e._stacks[t.axis]._visualValues},n,o.index,{mode:i})}updateRangeFromParsed(t,e,i,s){const o=i[e.axis];let n=null===o?NaN:o;const r=s&&i._stacks[e.axis];s&&r&&(s.values=r,n=Dc(s,o,this._cachedMeta.index)),t.min=Math.min(t.min,n),t.max=Math.max(t.max,n)}getMinMax(t,e){const i=this._cachedMeta,s=i._parsed,o=i._sorted&&t===i.iScale,n=s.length,r=this._getOtherScale(t),a=((t,e,i)=>t&&!e.hidden&&e._stacked&&{keys:Oc(i,!0),values:null})(e,i,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:c,max:h}=function(t){const{min:e,max:i,minDefined:s,maxDefined:o}=t.getUserBounds();return{min:s?e:Number.NEGATIVE_INFINITY,max:o?i:Number.POSITIVE_INFINITY}}(r);let d,u;function p(){u=s[d];const e=u[r.axis];return!Fr(u[t.axis])||c>e||h<e}for(d=0;d<n&&(p()||(this.updateRangeFromParsed(l,t,u,a),!o));++d);if(o)for(d=n-1;d>=0;--d)if(!p()){this.updateRangeFromParsed(l,t,u,a);break}return l}getAllParsedValues(t){const e=this._cachedMeta._parsed,i=[];let s,o,n;for(s=0,o=e.length;s<o;++s)n=e[s][t.axis],Fr(n)&&i.push(n);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,i=e.iScale,s=e.vScale,o=this.getParsed(t);return{label:i?""+i.getLabelForValue(o[i.axis]):"",value:s?""+s.getLabelForValue(o[s.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=function(t){let e,i,s,o;return Ir(t)?(e=t.top,i=t.right,s=t.bottom,o=t.left):e=i=s=o=t,{top:e,right:i,bottom:s,left:o,disabled:!1===t}}(Br(this.options.clip,function(t,e,i){if(!1===i)return!1;const s=Tc(t,i),o=Tc(e,i);return{top:o.end,right:s.end,bottom:o.start,left:s.start}}(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,i=this._cachedMeta,s=i.data||[],o=e.chartArea,n=[],r=this._drawStart||0,a=this._drawCount||s.length-r,l=this.options.drawActiveElementsOnTop;let c;for(i.dataset&&i.dataset.draw(t,o,r,a),c=r;c<r+a;++c){const e=s[c];e.hidden||(e.active&&l?n.push(e):e.draw(t,o))}for(c=0;c<n.length;++c)n[c].draw(t,o)}getStyle(t,e){const i=e?"active":"default";return void 0===t&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,e,i){const s=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const e=this._cachedMeta.data[t];o=e.$context||(e.$context=function(t,e,i){return El(t,{active:!1,dataIndex:e,parsed:void 0,raw:void 0,element:i,index:e,mode:"default",type:"data"})}(this.getContext(),t,e)),o.parsed=this.getParsed(t),o.raw=s.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=function(t,e){return El(t,{active:!1,dataset:void 0,datasetIndex:e,index:e,mode:"default",type:"dataset"})}(this.chart.getContext(),this.index)),o.dataset=s,o.index=o.datasetIndex=this.index;return o.active=!!e,o.mode=i,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",i){const s="active"===e,o=this._cachedDataOpts,n=t+"-"+e,r=o[n],a=this.enableOptionSharing&&ta(i);if(r)return Nc(r,a);const l=this.chart.config,c=l.datasetElementScopeKeys(this._type,t),h=s?[`${t}Hover`,"hover",t,""]:[t,""],d=l.getOptionScopes(this.getDataset(),c),u=Object.keys(sl.elements[t]),p=l.resolveNamedOptions(d,u,(()=>this.getContext(i,s,e)),h);return p.$shared&&(p.$shared=a,o[n]=Object.freeze(Nc(p,a))),p}_resolveAnimations(t,e,i){const s=this.chart,o=this._cachedDataOpts,n=`animation-${e}`,r=o[n];if(r)return r;let a;if(!1!==s.options.animation){const s=this.chart.config,o=s.datasetAnimationScopeKeys(this._type,e),n=s.getOptionScopes(this.getDataset(),o);a=s.createResolver(n,this.getContext(t,i,e))}const l=new Pc(s,a&&a.animations);return a&&a._cacheable&&(o[n]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Bc(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const i=this.resolveDataElementOptions(t,e),s=this._sharedOptions,o=this.getSharedOptions(i),n=this.includeOptions(e,o)||o!==s;return this.updateSharedOptions(o,e,i),{sharedOptions:o,includeOptions:n}}updateElement(t,e,i,s){Bc(s)?Object.assign(t,i):this._resolveAnimations(e,s).update(t,i)}updateSharedOptions(t,e,i){t&&!Bc(e)&&this._resolveAnimations(void 0,e).update(t,i)}_setStyle(t,e,i,s){t.active=s;const o=this.getStyle(e,s);this._resolveAnimations(e,i,s).update(t,{options:!s&&this.getSharedOptions(o)||o})}removeHoverStyle(t,e,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,e,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,i=this._cachedMeta.data;for(const[t,e,i]of this._syncList)this[t](e,i);this._syncList=[];const s=i.length,o=e.length,n=Math.min(o,s);n&&this.parse(0,n),o>s?this._insertElements(s,o-s,t):o<s&&this._removeElements(o,s-o)}_insertElements(t,e,i=!0){const s=this._cachedMeta,o=s.data,n=t+e;let r;const a=t=>{for(t.length+=e,r=t.length-1;r>=n;r--)t[r]=t[r-e]};for(a(o),r=t;r<n;++r)o[r]=new this.dataElementType;this._parsing&&a(s._parsed),this.parse(t,e),i&&this.updateElements(o,t,e,"reset")}updateElements(t,e,i,s){}_removeElements(t,e){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,e);i._stacked&&Vc(i,s)}i.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,i,s]=t;this[e](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}function jc(t){const e=t.iScale,i=function(t,e){if(!t._cache.$bar){const i=t.getMatchingVisibleMetas(e);let s=[];for(let e=0,o=i.length;e<o;e++)s=s.concat(i[e].controller.getAllParsedValues(t));t._cache.$bar=Oa(s.sort(((t,e)=>t-e)))}return t._cache.$bar}(e,t.type);let s,o,n,r,a=e._length;const l=()=>{32767!==n&&-32768!==n&&(ta(r)&&(a=Math.min(a,Math.abs(n-r)||a)),r=n)};for(s=0,o=i.length;s<o;++s)n=e.getPixelForValue(i[s]),l();for(r=void 0,s=0,o=e.ticks.length;s<o;++s)n=e.getPixelForTick(s),l();return a}function Uc(t,e,i,s){return Rr(t)?function(t,e,i,s){const o=i.parse(t[0],s),n=i.parse(t[1],s),r=Math.min(o,n),a=Math.max(o,n);let l=r,c=a;Math.abs(r)>Math.abs(a)&&(l=a,c=r),e[i.axis]=c,e._custom={barStart:l,barEnd:c,start:o,end:n,min:r,max:a}}(t,e,i,s):e[i.axis]=i.parse(t,s),e}function Wc(t,e,i,s){const o=t.iScale,n=t.vScale,r=o.getLabels(),a=o===n,l=[];let c,h,d,u;for(c=i,h=i+s;c<h;++c)u=e[c],d={},d[o.axis]=a||o.parse(r[c],c),l.push(Uc(u,d,n,c));return l}function qc(t){return t&&void 0!==t.barStart&&void 0!==t.barEnd}function Kc(t,e,i,s){let o=e.borderSkipped;const n={};if(!o)return void(t.borderSkipped=n);if(!0===o)return void(t.borderSkipped={top:!0,right:!0,bottom:!0,left:!0});const{start:r,end:a,reverse:l,top:c,bottom:h}=function(t){let e,i,s,o,n;return t.horizontal?(e=t.base>t.x,i="left",s="right"):(e=t.base<t.y,i="bottom",s="top"),e?(o="end",n="start"):(o="start",n="end"),{start:i,end:s,reverse:e,top:o,bottom:n}}(t);"middle"===o&&i&&(t.enableBorderRadius=!0,(i._top||0)===s?o=c:(i._bottom||0)===s?o=h:(n[Yc(h,r,a,l)]=!0,o=c)),n[Yc(o,r,a,l)]=!0,t.borderSkipped=n}function Yc(t,e,i,s){return s?(t=function(t,e,i){return t===e?i:t===i?e:t}(t,e,i),t=Xc(t,i,e)):t=Xc(t,e,i),t}function Xc(t,e,i){return"start"===t?e:"end"===t?i:t}function Gc(t,{inflateAmount:e},i){t.inflateAmount="auto"===e?1===i?.33:0:e}class Jc extends Hc{static id="doughnut";static defaults={datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"};static descriptors={_scriptable:t=>"spacing"!==t,_indexable:t=>"spacing"!==t};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return e.labels.map(((e,o)=>{const n=t.getDatasetMeta(0).controller.getStyle(o);return{text:e,fillStyle:n.backgroundColor,strokeStyle:n.borderColor,fontColor:s,lineWidth:n.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(o),index:o}}))}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}}};constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const i=this.getDataset().data,s=this._cachedMeta;if(!1===this._parsing)s._parsed=i;else{let o,n,r=t=>+i[t];if(Ir(i[t])){const{key:t="value"}=this._parsing;r=e=>+Zr(i[e],t)}for(o=t,n=t+e;o<n;++o)s._parsed[o]=r(o)}}_getRotation(){return ba(this.options.rotation-90)}_getCircumference(){return ba(this.options.circumference)}_getRotationExtents(){let t=oa,e=-oa;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const s=this.chart.getDatasetMeta(i).controller,o=s._getRotation(),n=s._getCircumference();t=Math.min(t,o),e=Math.max(e,o+n)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:i}=e,s=this._cachedMeta,o=s.data,n=this.getMaxBorderWidth()+this.getMaxOffset(o)+this.options.spacing,r=Math.max((Math.min(i.width,i.height)-n)/2,0),a=Math.min((l=this.options.cutout,c=r,"string"==typeof l&&l.endsWith("%")?parseFloat(l)/100:+l/c),1);var l,c;const h=this._getRingWeight(this.index),{circumference:d,rotation:u}=this._getRotationExtents(),{ratioX:p,ratioY:g,offsetX:f,offsetY:m}=function(t,e,i){let s=1,o=1,n=0,r=0;if(e<oa){const a=t,l=a+e,c=Math.cos(a),h=Math.sin(a),d=Math.cos(l),u=Math.sin(l),p=(t,e,s)=>$a(t,a,l,!0)?1:Math.max(e,e*i,s,s*i),g=(t,e,s)=>$a(t,a,l,!0)?-1:Math.min(e,e*i,s,s*i),f=p(0,c,d),m=p(la,h,u),b=g(sa,c,d),v=g(sa+la,h,u);s=(f-b)/2,o=(m-v)/2,n=-(f+b)/2,r=-(m+v)/2}return{ratioX:s,ratioY:o,offsetX:n,offsetY:r}}(u,d,a),b=(i.width-n)/p,v=(i.height-n)/g,y=Math.max(Math.min(b,v)/2,0),x=Nr(this.options.radius,y),_=(x-Math.max(x*a,0))/this._getVisibleDatasetWeightTotal();this.offsetX=f*x,this.offsetY=m*x,s.total=this.calculateTotal(),this.outerRadius=x-_*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-_*h,0),this.updateElements(o,0,o.length,t)}_circumference(t,e){const i=this.options,s=this._cachedMeta,o=this._getCircumference();return e&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||null===s._parsed[t]||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*o/oa)}updateElements(t,e,i,s){const o="reset"===s,n=this.chart,r=n.chartArea,a=n.options.animation,l=(r.left+r.right)/2,c=(r.top+r.bottom)/2,h=o&&a.animateScale,d=h?0:this.innerRadius,u=h?0:this.outerRadius,{sharedOptions:p,includeOptions:g}=this._getSharedOptions(e,s);let f,m=this._getRotation();for(f=0;f<e;++f)m+=this._circumference(f,o);for(f=e;f<e+i;++f){const e=this._circumference(f,o),i=t[f],n={x:l+this.offsetX,y:c+this.offsetY,startAngle:m,endAngle:m+e,circumference:e,outerRadius:u,innerRadius:d};g&&(n.options=p||this.resolveDataElementOptions(f,i.active?"active":s)),m+=e,this.updateElement(i,f,n,s)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let i,s=0;for(i=0;i<e.length;i++){const o=t._parsed[i];null===o||isNaN(o)||!this.chart.getDataVisibility(i)||e[i].hidden||(s+=Math.abs(o))}return s}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?oa*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],o=Xa(e._parsed[t],i.options.locale);return{label:s[t]||"",value:o}}getMaxBorderWidth(t){let e=0;const i=this.chart;let s,o,n,r,a;if(!t)for(s=0,o=i.data.datasets.length;s<o;++s)if(i.isDatasetVisible(s)){n=i.getDatasetMeta(s),t=n.data,r=n.controller;break}if(!t)return 0;for(s=0,o=t.length;s<o;++s)a=r.resolveDataElementOptions(s),"inner"!==a.borderAlign&&(e=Math.max(e,a.borderWidth||0,a.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let i=0,s=t.length;i<s;++i){const t=this.resolveDataElementOptions(i);e=Math.max(e,t.offset||0,t.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e}_getRingWeight(t){return Math.max(Br(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}class Zc extends Hc{static id="polarArea";static defaults={dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0};static overrides={aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return e.labels.map(((e,o)=>{const n=t.getDatasetMeta(0).controller.getStyle(o);return{text:e,fillStyle:n.backgroundColor,strokeStyle:n.borderColor,fontColor:s,lineWidth:n.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(o),index:o}}))}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}};constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],o=Xa(e._parsed[t].r,i.options.locale);return{label:s[t]||"",value:o}}parseObjectData(t,e,i,s){return jl.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach(((t,i)=>{const s=this.getParsed(i).r;!isNaN(s)&&this.chart.getDataVisibility(i)&&(s<e.min&&(e.min=s),s>e.max&&(e.max=s))})),e}_updateRadius(){const t=this.chart,e=t.chartArea,i=t.options,s=Math.min(e.right-e.left,e.bottom-e.top),o=Math.max(s/2,0),n=(o-Math.max(i.cutoutPercentage?o/100*i.cutoutPercentage:1,0))/t.getVisibleDatasetCount();this.outerRadius=o-n*this.index,this.innerRadius=this.outerRadius-n}updateElements(t,e,i,s){const o="reset"===s,n=this.chart,r=n.options.animation,a=this._cachedMeta.rScale,l=a.xCenter,c=a.yCenter,h=a.getIndexAngle(0)-.5*sa;let d,u=h;const p=360/this.countVisibleElements();for(d=0;d<e;++d)u+=this._computeAngle(d,s,p);for(d=e;d<e+i;d++){const e=t[d];let i=u,g=u+this._computeAngle(d,s,p),f=n.getDataVisibility(d)?a.getDistanceFromCenterForValue(this.getParsed(d).r):0;u=g,o&&(r.animateScale&&(f=0),r.animateRotate&&(i=g=h));const m={x:l,y:c,innerRadius:0,outerRadius:f,startAngle:i,endAngle:g,options:this.resolveDataElementOptions(d,e.active?"active":s)};this.updateElement(e,d,m,s)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach(((t,i)=>{!isNaN(this.getParsed(i).r)&&this.chart.getDataVisibility(i)&&e++})),e}_computeAngle(t,e,i){return this.chart.getDataVisibility(t)?ba(this.resolveDataElementOptions(t,e).angle||i):0}}var Qc=Object.freeze({__proto__:null,BarController:class extends Hc{static id="bar";static defaults={datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}};static overrides={scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}};parsePrimitiveData(t,e,i,s){return Wc(t,e,i,s)}parseArrayData(t,e,i,s){return Wc(t,e,i,s)}parseObjectData(t,e,i,s){const{iScale:o,vScale:n}=t,{xAxisKey:r="x",yAxisKey:a="y"}=this._parsing,l="x"===o.axis?r:a,c="x"===n.axis?r:a,h=[];let d,u,p,g;for(d=i,u=i+s;d<u;++d)g=e[d],p={},p[o.axis]=o.parse(Zr(g,l),d),h.push(Uc(Zr(g,c),p,n,d));return h}updateRangeFromParsed(t,e,i,s){super.updateRangeFromParsed(t,e,i,s);const o=i._custom;o&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,o.min),t.max=Math.max(t.max,o.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:i,vScale:s}=e,o=this.getParsed(t),n=o._custom,r=qc(n)?"["+n.start+", "+n.end+"]":""+s.getLabelForValue(o[s.axis]);return{label:""+i.getLabelForValue(o[i.axis]),value:r}}initialize(){this.enableOptionSharing=!0,super.initialize();this._cachedMeta.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,i,s){const o="reset"===s,{index:n,_cachedMeta:{vScale:r}}=this,a=r.getBasePixel(),l=r.isHorizontal(),c=this._getRuler(),{sharedOptions:h,includeOptions:d}=this._getSharedOptions(e,s);for(let u=e;u<e+i;u++){const e=this.getParsed(u),i=o||Lr(e[r.axis])?{base:a,head:a}:this._calculateBarValuePixels(u),p=this._calculateBarIndexPixels(u,c),g=(e._stacks||{})[r.axis],f={horizontal:l,base:i.base,enableBorderRadius:!g||qc(e._custom)||n===g._top||n===g._bottom,x:l?i.head:p.center,y:l?p.center:i.head,height:l?p.size:Math.abs(i.size),width:l?Math.abs(i.size):p.size};d&&(f.options=h||this.resolveDataElementOptions(u,t[u].active?"active":s));const m=f.options||t[u].options;Kc(f,m,g,n),Gc(f,m,c.ratio),this.updateElement(t[u],u,f,s)}}_getStacks(t,e){const{iScale:i}=this._cachedMeta,s=i.getMatchingVisibleMetas(this._type).filter((t=>t.controller.options.grouped)),o=i.options.stacked,n=[],r=t=>{const i=t.controller.getParsed(e),s=i&&i[t.vScale.axis];if(Lr(s)||isNaN(s))return!0};for(const i of s)if((void 0===e||!r(i))&&((!1===o||-1===n.indexOf(i.stack)||void 0===o&&void 0===i.stack)&&n.push(i.stack),i.index===t))break;return n.length||n.push(void 0),n}_getStackCount(t){return this._getStacks(void 0,t).length}_getStackIndex(t,e,i){const s=this._getStacks(t,i),o=void 0!==e?s.indexOf(e):-1;return-1===o?s.length-1:o}_getRuler(){const t=this.options,e=this._cachedMeta,i=e.iScale,s=[];let o,n;for(o=0,n=e.data.length;o<n;++o)s.push(i.getPixelForValue(this.getParsed(o)[i.axis],o));const r=t.barThickness;return{min:r||jc(e),pixels:s,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:r?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:i,index:s},options:{base:o,minBarLength:n}}=this,r=o||0,a=this.getParsed(t),l=a._custom,c=qc(l);let h,d,u=a[e.axis],p=0,g=i?this.applyStack(e,a,i):u;g!==u&&(p=g-u,g=u),c&&(u=l.barStart,g=l.barEnd-l.barStart,0!==u&&ua(u)!==ua(l.barEnd)&&(p=0),p+=u);const f=Lr(o)||c?p:o;let m=e.getPixelForValue(f);if(h=this.chart.getDataVisibility(t)?e.getPixelForValue(p+g):m,d=h-m,Math.abs(d)<n){d=function(t,e,i){return 0!==t?ua(t):(e.isHorizontal()?1:-1)*(e.min>=i?1:-1)}(d,e,r)*n,u===r&&(m-=d/2);const t=e.getPixelForDecimal(0),o=e.getPixelForDecimal(1),l=Math.min(t,o),p=Math.max(t,o);m=Math.max(Math.min(m,p),l),h=m+d,i&&!c&&(a._stacks[e.axis]._visualValues[s]=e.getValueForPixel(h)-e.getValueForPixel(m))}if(m===e.getPixelForValue(r)){const t=ua(d)*e.getLineWidthForValue(r)/2;m+=t,d-=t}return{size:d,base:m,head:h,center:h+d/2}}_calculateBarIndexPixels(t,e){const i=e.scale,s=this.options,o=s.skipNull,n=Br(s.maxBarThickness,1/0);let r,a;if(e.grouped){const i=o?this._getStackCount(t):e.stackCount,l="flex"===s.barThickness?function(t,e,i,s){const o=e.pixels,n=o[t];let r=t>0?o[t-1]:null,a=t<o.length-1?o[t+1]:null;const l=i.categoryPercentage;null===r&&(r=n-(null===a?e.end-e.start:a-n)),null===a&&(a=n+n-r);const c=n-(n-Math.min(r,a))/2*l;return{chunk:Math.abs(a-r)/2*l/s,ratio:i.barPercentage,start:c}}(t,e,s,i):function(t,e,i,s){const o=i.barThickness;let n,r;return Lr(o)?(n=e.min*i.categoryPercentage,r=i.barPercentage):(n=o*s,r=1),{chunk:n/s,ratio:r,start:e.pixels[t]-n/2}}(t,e,s,i),c=this._getStackIndex(this.index,this._cachedMeta.stack,o?t:void 0);r=l.start+l.chunk*c+l.chunk/2,a=Math.min(n,l.chunk*l.ratio)}else r=i.getPixelForValue(this.getParsed(t)[i.axis],t),a=Math.min(n,e.min*e.ratio);return{base:r-a/2,head:r+a/2,center:r,size:a}}draw(){const t=this._cachedMeta,e=t.vScale,i=t.data,s=i.length;let o=0;for(;o<s;++o)null!==this.getParsed(o)[e.axis]&&i[o].draw(this._ctx)}},BubbleController:class extends Hc{static id="bubble";static defaults={datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}};static overrides={scales:{x:{type:"linear"},y:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,i,s){const o=super.parsePrimitiveData(t,e,i,s);for(let t=0;t<o.length;t++)o[t]._custom=this.resolveDataElementOptions(t+i).radius;return o}parseArrayData(t,e,i,s){const o=super.parseArrayData(t,e,i,s);for(let t=0;t<o.length;t++){const s=e[i+t];o[t]._custom=Br(s[2],this.resolveDataElementOptions(t+i).radius)}return o}parseObjectData(t,e,i,s){const o=super.parseObjectData(t,e,i,s);for(let t=0;t<o.length;t++){const s=e[i+t];o[t]._custom=Br(s&&s.r&&+s.r,this.resolveDataElementOptions(t+i).radius)}return o}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let i=t.length-1;i>=0;--i)e=Math.max(e,t[i].size(this.resolveDataElementOptions(i))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:o}=e,n=this.getParsed(t),r=s.getLabelForValue(n.x),a=o.getLabelForValue(n.y),l=n._custom;return{label:i[t]||"",value:"("+r+", "+a+(l?", "+l:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,i,s){const o="reset"===s,{iScale:n,vScale:r}=this._cachedMeta,{sharedOptions:a,includeOptions:l}=this._getSharedOptions(e,s),c=n.axis,h=r.axis;for(let d=e;d<e+i;d++){const e=t[d],i=!o&&this.getParsed(d),u={},p=u[c]=o?n.getPixelForDecimal(.5):n.getPixelForValue(i[c]),g=u[h]=o?r.getBasePixel():r.getPixelForValue(i[h]);u.skip=isNaN(p)||isNaN(g),l&&(u.options=a||this.resolveDataElementOptions(d,e.active?"active":s),o&&(u.options.radius=0)),this.updateElement(e,d,u,s)}}resolveDataElementOptions(t,e){const i=this.getParsed(t);let s=super.resolveDataElementOptions(t,e);s.$shared&&(s=Object.assign({},s,{$shared:!1}));const o=s.radius;return"active"!==e&&(s.radius=0),s.radius+=Br(i&&i._custom,o),s}},DoughnutController:Jc,LineController:class extends Hc{static id="line";static defaults={datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1};static overrides={scales:{_index_:{type:"category"},_value_:{type:"linear"}}};initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:i,data:s=[],_dataset:o}=e,n=this.chart._animationsDisabled;let{start:r,count:a}=Ia(e,s,n);this._drawStart=r,this._drawCount=a,Fa(e)&&(r=0,a=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!o._decimated,i.points=s;const l=this.resolveDatasetElementOptions(t);this.options.showLine||(l.borderWidth=0),l.segment=this.options.segment,this.updateElement(i,void 0,{animated:!n,options:l},t),this.updateElements(s,r,a,t)}updateElements(t,e,i,s){const o="reset"===s,{iScale:n,vScale:r,_stacked:a,_dataset:l}=this._cachedMeta,{sharedOptions:c,includeOptions:h}=this._getSharedOptions(e,s),d=n.axis,u=r.axis,{spanGaps:p,segment:g}=this.options,f=fa(p)?p:Number.POSITIVE_INFINITY,m=this.chart._animationsDisabled||o||"none"===s,b=e+i,v=t.length;let y=e>0&&this.getParsed(e-1);for(let i=0;i<v;++i){const p=t[i],v=m?p:{};if(i<e||i>=b){v.skip=!0;continue}const x=this.getParsed(i),_=Lr(x[u]),w=v[d]=n.getPixelForValue(x[d],i),k=v[u]=o||_?r.getBasePixel():r.getPixelForValue(a?this.applyStack(r,x,a):x[u],i);v.skip=isNaN(w)||isNaN(k)||_,v.stop=i>0&&Math.abs(x[d]-y[d])>f,g&&(v.parsed=x,v.raw=l.data[i]),h&&(v.options=c||this.resolveDataElementOptions(i,p.active?"active":s)),m||this.updateElement(p,i,v,s),y=x}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,i=e.options&&e.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const o=s[0].size(this.resolveDataElementOptions(0)),n=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,o,n)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}},PolarAreaController:Zc,PieController:class extends Jc{static id="pie";static defaults={cutout:0,rotation:0,circumference:360,radius:"100%"}},RadarController:class extends Hc{static id="radar";static defaults={datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}};static overrides={aspectRatio:1,scales:{r:{type:"radialLinear"}}};getLabelAndValue(t){const e=this._cachedMeta.vScale,i=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(i[e.axis])}}parseObjectData(t,e,i,s){return jl.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta,i=e.dataset,s=e.data||[],o=e.iScale.getLabels();if(i.points=s,"resize"!==t){const e=this.resolveDatasetElementOptions(t);this.options.showLine||(e.borderWidth=0);const n={_loop:!0,_fullLoop:o.length===s.length,options:e};this.updateElement(i,void 0,n,t)}this.updateElements(s,0,s.length,t)}updateElements(t,e,i,s){const o=this._cachedMeta.rScale,n="reset"===s;for(let r=e;r<e+i;r++){const e=t[r],i=this.resolveDataElementOptions(r,e.active?"active":s),a=o.getPointPositionForValue(r,this.getParsed(r).r),l=n?o.xCenter:a.x,c=n?o.yCenter:a.y,h={x:l,y:c,angle:a.angle,skip:isNaN(l)||isNaN(c),options:i};this.updateElement(e,r,h,s)}}},ScatterController:class extends Hc{static id="scatter";static defaults={datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1};static overrides={interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}};getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:o}=e,n=this.getParsed(t),r=s.getLabelForValue(n.x),a=o.getLabelForValue(n.y);return{label:i[t]||"",value:"("+r+", "+a+")"}}update(t){const e=this._cachedMeta,{data:i=[]}=e,s=this.chart._animationsDisabled;let{start:o,count:n}=Ia(e,i,s);if(this._drawStart=o,this._drawCount=n,Fa(e)&&(o=0,n=i.length),this.options.showLine){const{dataset:o,_dataset:n}=e;o._chart=this.chart,o._datasetIndex=this.index,o._decimated=!!n._decimated,o.points=i;const r=this.resolveDatasetElementOptions(t);r.segment=this.options.segment,this.updateElement(o,void 0,{animated:!s,options:r},t)}this.updateElements(i,o,n,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,i,s){const o="reset"===s,{iScale:n,vScale:r,_stacked:a,_dataset:l}=this._cachedMeta,c=this.resolveDataElementOptions(e,s),h=this.getSharedOptions(c),d=this.includeOptions(s,h),u=n.axis,p=r.axis,{spanGaps:g,segment:f}=this.options,m=fa(g)?g:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||o||"none"===s;let v=e>0&&this.getParsed(e-1);for(let c=e;c<e+i;++c){const e=t[c],i=this.getParsed(c),g=b?e:{},y=Lr(i[p]),x=g[u]=n.getPixelForValue(i[u],c),_=g[p]=o||y?r.getBasePixel():r.getPixelForValue(a?this.applyStack(r,i,a):i[p],c);g.skip=isNaN(x)||isNaN(_)||y,g.stop=c>0&&Math.abs(i[u]-v[u])>m,f&&(g.parsed=i,g.raw=l.data[c]),d&&(g.options=h||this.resolveDataElementOptions(c,e.active?"active":s)),b||this.updateElement(e,c,g,s),v=i}this.updateSharedOptions(h,s,c)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let t=0;for(let i=e.length-1;i>=0;--i)t=Math.max(t,e[i].size(this.resolveDataElementOptions(i))/2);return t>0&&t}const i=t.dataset,s=i.options&&i.options.borderWidth||0;if(!e.length)return s;const o=e[0].size(this.resolveDataElementOptions(0)),n=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(s,o,n)/2}}});function th(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class eh{static override(t){Object.assign(eh.prototype,t)}constructor(t){this.options=t||{}}init(){}formats(){return th()}parse(){return th()}format(){return th()}add(){return th()}diff(){return th()}startOf(){return th()}endOf(){return th()}}var ih=eh;function sh(t,e,i,s){const{controller:o,data:n,_sorted:r}=t,a=o._cachedMeta.iScale;if(a&&e===a.axis&&"r"!==e&&r&&n.length){const t=a._reversePixels?Ea:Ma;if(!s)return t(n,e,i);if(o._sharedOptions){const s=n[0],o="function"==typeof s.getRange&&s.getRange(e);if(o){const s=t(n,e,i-o),r=t(n,e,i+o);return{lo:s.lo,hi:r.hi}}}}return{lo:0,hi:n.length-1}}function oh(t,e,i,s,o){const n=t.getSortedVisibleDatasetMetas(),r=i[e];for(let t=0,i=n.length;t<i;++t){const{index:i,data:a}=n[t],{lo:l,hi:c}=sh(n[t],e,r,o);for(let t=l;t<=c;++t){const e=a[t];e.skip||s(e,i,t)}}}function nh(t,e,i,s,o){const n=[];if(!o&&!t.isPointInArea(e))return n;return oh(t,i,e,(function(i,r,a){(o||hl(i,t.chartArea,0))&&i.inRange(e.x,e.y,s)&&n.push({element:i,datasetIndex:r,index:a})}),!0),n}function rh(t,e,i,s,o,n){let r=[];const a=function(t){const e=-1!==t.indexOf("x"),i=-1!==t.indexOf("y");return function(t,s){const o=e?Math.abs(t.x-s.x):0,n=i?Math.abs(t.y-s.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(n,2))}}(i);let l=Number.POSITIVE_INFINITY;return oh(t,i,e,(function(i,c,h){const d=i.inRange(e.x,e.y,o);if(s&&!d)return;const u=i.getCenterPoint(o);if(!(!!n||t.isPointInArea(u))&&!d)return;const p=a(e,u);p<l?(r=[{element:i,datasetIndex:c,index:h}],l=p):p===l&&r.push({element:i,datasetIndex:c,index:h})})),r}function ah(t,e,i,s,o,n){return n||t.isPointInArea(e)?"r"!==i||s?rh(t,e,i,s,o,n):function(t,e,i,s){let o=[];return oh(t,i,e,(function(t,i,n){const{startAngle:r,endAngle:a}=t.getProps(["startAngle","endAngle"],s),{angle:l}=xa(t,{x:e.x,y:e.y});$a(l,r,a)&&o.push({element:t,datasetIndex:i,index:n})})),o}(t,e,i,o):[]}function lh(t,e,i,s,o){const n=[],r="x"===i?"inXRange":"inYRange";let a=!1;return oh(t,i,e,((t,s,l)=>{t[r](e[i],o)&&(n.push({element:t,datasetIndex:s,index:l}),a=a||t.inRange(e.x,e.y,o))})),s&&!a?[]:n}var ch={evaluateInteractionItems:oh,modes:{index(t,e,i,s){const o=oc(e,t),n=i.axis||"x",r=i.includeInvisible||!1,a=i.intersect?nh(t,o,n,s,r):ah(t,o,n,!1,s,r),l=[];return a.length?(t.getSortedVisibleDatasetMetas().forEach((t=>{const e=a[0].index,i=t.data[e];i&&!i.skip&&l.push({element:i,datasetIndex:t.index,index:e})})),l):[]},dataset(t,e,i,s){const o=oc(e,t),n=i.axis||"xy",r=i.includeInvisible||!1;let a=i.intersect?nh(t,o,n,s,r):ah(t,o,n,!1,s,r);if(a.length>0){const e=a[0].datasetIndex,i=t.getDatasetMeta(e).data;a=[];for(let t=0;t<i.length;++t)a.push({element:i[t],datasetIndex:e,index:t})}return a},point:(t,e,i,s)=>nh(t,oc(e,t),i.axis||"xy",s,i.includeInvisible||!1),nearest(t,e,i,s){const o=oc(e,t),n=i.axis||"xy",r=i.includeInvisible||!1;return ah(t,o,n,i.intersect,s,r)},x:(t,e,i,s)=>lh(t,oc(e,t),"x",i.intersect,s),y:(t,e,i,s)=>lh(t,oc(e,t),"y",i.intersect,s)}};const hh=["left","top","right","bottom"];function dh(t,e){return t.filter((t=>t.pos===e))}function uh(t,e){return t.filter((t=>-1===hh.indexOf(t.pos)&&t.box.axis===e))}function ph(t,e){return t.sort(((t,i)=>{const s=e?i:t,o=e?t:i;return s.weight===o.weight?s.index-o.index:s.weight-o.weight}))}function gh(t,e){const i=function(t){const e={};for(const i of t){const{stack:t,pos:s,stackWeight:o}=i;if(!t||!hh.includes(s))continue;const n=e[t]||(e[t]={count:0,placed:0,weight:0,size:0});n.count++,n.weight+=o}return e}(t),{vBoxMaxWidth:s,hBoxMaxHeight:o}=e;let n,r,a;for(n=0,r=t.length;n<r;++n){a=t[n];const{fullSize:r}=a.box,l=i[a.stack],c=l&&a.stackWeight/l.weight;a.horizontal?(a.width=c?c*s:r&&e.availableWidth,a.height=o):(a.width=s,a.height=c?c*o:r&&e.availableHeight)}return i}function fh(t,e,i,s){return Math.max(t[i],e[i])+Math.max(t[s],e[s])}function mh(t,e){t.top=Math.max(t.top,e.top),t.left=Math.max(t.left,e.left),t.bottom=Math.max(t.bottom,e.bottom),t.right=Math.max(t.right,e.right)}function bh(t,e,i,s){const{pos:o,box:n}=i,r=t.maxPadding;if(!Ir(o)){i.size&&(t[o]-=i.size);const e=s[i.stack]||{size:0,count:1};e.size=Math.max(e.size,i.horizontal?n.height:n.width),i.size=e.size/e.count,t[o]+=i.size}n.getPadding&&mh(r,n.getPadding());const a=Math.max(0,e.outerWidth-fh(r,t,"left","right")),l=Math.max(0,e.outerHeight-fh(r,t,"top","bottom")),c=a!==t.w,h=l!==t.h;return t.w=a,t.h=l,i.horizontal?{same:c,other:h}:{same:h,other:c}}function vh(t,e){const i=e.maxPadding;function s(t){const s={left:0,top:0,right:0,bottom:0};return t.forEach((t=>{s[t]=Math.max(e[t],i[t])})),s}return s(t?["left","right"]:["top","bottom"])}function yh(t,e,i,s){const o=[];let n,r,a,l,c,h;for(n=0,r=t.length,c=0;n<r;++n){a=t[n],l=a.box,l.update(a.width||e.w,a.height||e.h,vh(a.horizontal,e));const{same:r,other:d}=bh(e,i,a,s);c|=r&&o.length,h=h||d,l.fullSize||o.push(a)}return c&&yh(o,e,i,s)||h}function xh(t,e,i,s,o){t.top=i,t.left=e,t.right=e+s,t.bottom=i+o,t.width=s,t.height=o}function _h(t,e,i,s){const o=i.padding;let{x:n,y:r}=e;for(const a of t){const t=a.box,l=s[a.stack]||{count:1,placed:0,weight:1},c=a.stackWeight/l.weight||1;if(a.horizontal){const s=e.w*c,n=l.size||t.height;ta(l.start)&&(r=l.start),t.fullSize?xh(t,o.left,r,i.outerWidth-o.right-o.left,n):xh(t,e.left+l.placed,r,s,n),l.start=r,l.placed+=s,r=t.bottom}else{const s=e.h*c,r=l.size||t.width;ta(l.start)&&(n=l.start),t.fullSize?xh(t,n,o.top,r,i.outerHeight-o.bottom-o.top):xh(t,n,e.top+l.placed,r,s),l.start=n,l.placed+=s,n=t.right}}e.x=n,e.y=r}var wh={addBox(t,e){t.boxes||(t.boxes=[]),e.fullSize=e.fullSize||!1,e.position=e.position||"top",e.weight=e.weight||0,e._layers=e._layers||function(){return[{z:0,draw(t){e.draw(t)}}]},t.boxes.push(e)},removeBox(t,e){const i=t.boxes?t.boxes.indexOf(e):-1;-1!==i&&t.boxes.splice(i,1)},configure(t,e,i){e.fullSize=i.fullSize,e.position=i.position,e.weight=i.weight},update(t,e,i,s){if(!t)return;const o=Al(t.options.layout.padding),n=Math.max(e-o.width,0),r=Math.max(i-o.height,0),a=function(t){const e=function(t){const e=[];let i,s,o,n,r,a;for(i=0,s=(t||[]).length;i<s;++i)o=t[i],({position:n,options:{stack:r,stackWeight:a=1}}=o),e.push({index:i,box:o,pos:n,horizontal:o.isHorizontal(),weight:o.weight,stack:r&&n+r,stackWeight:a});return e}(t),i=ph(e.filter((t=>t.box.fullSize)),!0),s=ph(dh(e,"left"),!0),o=ph(dh(e,"right")),n=ph(dh(e,"top"),!0),r=ph(dh(e,"bottom")),a=uh(e,"x"),l=uh(e,"y");return{fullSize:i,leftAndTop:s.concat(n),rightAndBottom:o.concat(l).concat(r).concat(a),chartArea:dh(e,"chartArea"),vertical:s.concat(o).concat(l),horizontal:n.concat(r).concat(a)}}(t.boxes),l=a.vertical,c=a.horizontal;jr(t.boxes,(t=>{"function"==typeof t.beforeLayout&&t.beforeLayout()}));const h=l.reduce(((t,e)=>e.box.options&&!1===e.box.options.display?t:t+1),0)||1,d=Object.freeze({outerWidth:e,outerHeight:i,padding:o,availableWidth:n,availableHeight:r,vBoxMaxWidth:n/2/h,hBoxMaxHeight:r/2}),u=Object.assign({},o);mh(u,Al(s));const p=Object.assign({maxPadding:u,w:n,h:r,x:o.left,y:o.top},o),g=gh(l.concat(c),d);yh(a.fullSize,p,d,g),yh(l,p,d,g),yh(c,p,d,g)&&yh(l,p,d,g),function(t){const e=t.maxPadding;function i(i){const s=Math.max(e[i]-t[i],0);return t[i]+=s,s}t.y+=i("top"),t.x+=i("left"),i("right"),i("bottom")}(p),_h(a.leftAndTop,p,d,g),p.x+=p.w,p.y+=p.h,_h(a.rightAndBottom,p,d,g),t.chartArea={left:p.left,top:p.top,right:p.left+p.w,bottom:p.top+p.h,height:p.h,width:p.w},jr(a.chartArea,(e=>{const i=e.box;Object.assign(i,t.chartArea),i.update(p.w,p.h,{left:0,top:0,right:0,bottom:0})}))}};class kh{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,i){}removeEventListener(t,e,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,i,s){return e=Math.max(0,e||t.width),i=i||t.height,{width:e,height:Math.max(0,s?Math.floor(e/s):i)}}isAttached(t){return!0}updateConfig(t){}}class $h extends kh{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const Ch="$chartjs",Ah={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Sh=t=>null===t||""===t;const Mh=!!lc&&{passive:!0};function Eh(t,e,i){t.canvas.removeEventListener(e,i,Mh)}function Ph(t,e){for(const i of t)if(i===e||i.contains(e))return!0}function Th(t,e,i){const s=t.canvas,o=new MutationObserver((t=>{let e=!1;for(const i of t)e=e||Ph(i.addedNodes,s),e=e&&!Ph(i.removedNodes,s);e&&i()}));return o.observe(document,{childList:!0,subtree:!0}),o}function Oh(t,e,i){const s=t.canvas,o=new MutationObserver((t=>{let e=!1;for(const i of t)e=e||Ph(i.removedNodes,s),e=e&&!Ph(i.addedNodes,s);e&&i()}));return o.observe(document,{childList:!0,subtree:!0}),o}const Dh=new Map;let zh=0;function Lh(){const t=window.devicePixelRatio;t!==zh&&(zh=t,Dh.forEach(((e,i)=>{i.currentDevicePixelRatio!==t&&e()})))}function Rh(t,e,i){const s=t.canvas,o=s&&Zl(s);if(!o)return;const n=za(((t,e)=>{const s=o.clientWidth;i(t,e),s<o.clientWidth&&i()}),window),r=new ResizeObserver((t=>{const e=t[0],i=e.contentRect.width,s=e.contentRect.height;0===i&&0===s||n(i,s)}));return r.observe(o),function(t,e){Dh.size||window.addEventListener("resize",Lh),Dh.set(t,e)}(t,n),r}function Ih(t,e,i){i&&i.disconnect(),"resize"===e&&function(t){Dh.delete(t),Dh.size||window.removeEventListener("resize",Lh)}(t)}function Fh(t,e,i){const s=t.canvas,o=za((e=>{null!==t.ctx&&i(function(t,e){const i=Ah[t.type]||t.type,{x:s,y:o}=oc(t,e);return{type:i,chart:e,native:t,x:void 0!==s?s:null,y:void 0!==o?o:null}}(e,t))}),t);return function(t,e,i){t.addEventListener(e,i,Mh)}(s,e,o),o}class Vh extends kh{acquireContext(t,e){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(function(t,e){const i=t.style,s=t.getAttribute("height"),o=t.getAttribute("width");if(t[Ch]={initial:{height:s,width:o,style:{display:i.display,height:i.height,width:i.width}}},i.display=i.display||"block",i.boxSizing=i.boxSizing||"border-box",Sh(o)){const e=cc(t,"width");void 0!==e&&(t.width=e)}if(Sh(s))if(""===t.style.height)t.height=t.width/(e||2);else{const e=cc(t,"height");void 0!==e&&(t.height=e)}}(t,e),i):null}releaseContext(t){const e=t.canvas;if(!e[Ch])return!1;const i=e[Ch].initial;["height","width"].forEach((t=>{const s=i[t];Lr(s)?e.removeAttribute(t):e.setAttribute(t,s)}));const s=i.style||{};return Object.keys(s).forEach((t=>{e.style[t]=s[t]})),e.width=e.width,delete e[Ch],!0}addEventListener(t,e,i){this.removeEventListener(t,e);const s=t.$proxies||(t.$proxies={}),o={attach:Th,detach:Oh,resize:Rh}[e]||Fh;s[e]=o(t,e,i)}removeEventListener(t,e){const i=t.$proxies||(t.$proxies={}),s=i[e];if(!s)return;({attach:Ih,detach:Ih,resize:Ih}[e]||Eh)(t,e,s),i[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,i,s){return rc(t,e,i,s)}isAttached(t){const e=Zl(t);return!(!e||!e.isConnected)}}let Bh=class{static defaults={};static defaultRoutes=void 0;active=!1;tooltipPosition(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}hasValue(){return fa(this.x)&&fa(this.y)}getProps(t,e){const i=this.$animations;if(!e||!i)return this;const s={};return t.forEach((t=>{s[t]=i[t]&&i[t].active()?i[t]._to:this[t]})),s}};function Nh(t,e){const i=t.options.ticks,s=function(t){const e=t.options.offset,i=t._tickSize(),s=t._length/i+(e?0:1),o=t._maxLength/i;return Math.floor(Math.min(s,o))}(t),o=Math.min(i.maxTicksLimit||s,s),n=i.major.enabled?function(t){const e=[];let i,s;for(i=0,s=t.length;i<s;i++)t[i].major&&e.push(i);return e}(e):[],r=n.length,a=n[0],l=n[r-1],c=[];if(r>o)return function(t,e,i,s){let o,n=0,r=i[0];for(s=Math.ceil(s),o=0;o<t.length;o++)o===r&&(e.push(t[o]),n++,r=i[n*s])}(e,c,n,r/o),c;const h=function(t,e,i){const s=function(t){const e=t.length;let i,s;if(e<2)return!1;for(s=t[0],i=1;i<e;++i)if(t[i]-t[i-1]!==s)return!1;return s}(t),o=e.length/i;if(!s)return Math.max(o,1);const n=function(t){const e=[],i=Math.sqrt(t);let s;for(s=1;s<i;s++)t%s==0&&(e.push(s),e.push(t/s));return i===(0|i)&&e.push(i),e.sort(((t,e)=>t-e)).pop(),e}(s);for(let t=0,e=n.length-1;t<e;t++){const e=n[t];if(e>o)return e}return Math.max(o,1)}(n,e,o);if(r>0){let t,i;const s=r>1?Math.round((l-a)/(r-1)):null;for(Hh(e,c,h,Lr(s)?0:a-s,a),t=0,i=r-1;t<i;t++)Hh(e,c,h,n[t],n[t+1]);return Hh(e,c,h,l,Lr(s)?e.length:l+s),c}return Hh(e,c,h),c}function Hh(t,e,i,s,o){const n=Br(s,0),r=Math.min(Br(o,t.length),t.length);let a,l,c,h=0;for(i=Math.ceil(i),o&&(a=o-s,i=a/Math.floor(a/i)),c=n;c<0;)h++,c=Math.round(n+h*i);for(l=Math.max(n,0);l<r;l++)l===c&&(e.push(t[l]),h++,c=Math.round(n+h*i))}const jh=t=>"left"===t?"right":"right"===t?"left":t,Uh=(t,e,i)=>"top"===e||"left"===e?t[e]+i:t[e]-i,Wh=(t,e)=>Math.min(e||t,t);function qh(t,e){const i=[],s=t.length/e,o=t.length;let n=0;for(;n<o;n+=s)i.push(t[Math.floor(n)]);return i}function Kh(t,e,i){const s=t.ticks.length,o=Math.min(e,s-1),n=t._startPixel,r=t._endPixel,a=1e-6;let l,c=t.getPixelForTick(o);if(!(i&&(l=1===s?Math.max(c-n,r-c):0===e?(t.getPixelForTick(1)-c)/2:(c-t.getPixelForTick(o-1))/2,c+=o<e?l:-l,c<n-a||c>r+a)))return c}function Yh(t){return t.drawTicks?t.tickLength:0}function Xh(t,e){if(!t.display)return 0;const i=Sl(t.font,e),s=Al(t.padding);return(Rr(t.text)?t.text.length:1)*i.lineHeight+s.height}function Gh(t,e,i){let s=La(t);return(i&&"right"!==e||!i&&"right"===e)&&(s=jh(s)),s}class Jh extends Bh{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:i,_suggestedMax:s}=this;return t=Vr(t,Number.POSITIVE_INFINITY),e=Vr(e,Number.NEGATIVE_INFINITY),i=Vr(i,Number.POSITIVE_INFINITY),s=Vr(s,Number.NEGATIVE_INFINITY),{min:Vr(t,i),max:Vr(e,s),minDefined:Fr(t),maxDefined:Fr(e)}}getMinMax(t){let e,{min:i,max:s,minDefined:o,maxDefined:n}=this.getUserBounds();if(o&&n)return{min:i,max:s};const r=this.getMatchingVisibleMetas();for(let a=0,l=r.length;a<l;++a)e=r[a].controller.getMinMax(this,t),o||(i=Math.min(i,e.min)),n||(s=Math.max(s,e.max));return i=n&&i>s?s:i,s=o&&i>s?i:s,{min:Vr(i,Vr(s,i)),max:Vr(s,Vr(i,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){Hr(this.options.beforeUpdate,[this])}update(t,e,i){const{beginAtZero:s,grace:o,ticks:n}=this.options,r=n.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=function(t,e,i){const{min:s,max:o}=t,n=Nr(e,(o-s)/2),r=(t,e)=>i&&0===t?0:t+e;return{min:r(s,-Math.abs(n)),max:r(o,n)}}(this,o,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const a=r<this.ticks.length;this._convertTicksToLabels(a?qh(this.ticks,r):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),n.display&&(n.autoSkip||"auto"===n.source)&&(this.ticks=Nh(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),a&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t,e,i=this.options.reverse;this.isHorizontal()?(t=this.left,e=this.right):(t=this.top,e=this.bottom,i=!i),this._startPixel=t,this._endPixel=e,this._reversePixels=i,this._length=e-t,this._alignToPixels=this.options.alignToPixels}afterUpdate(){Hr(this.options.afterUpdate,[this])}beforeSetDimensions(){Hr(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){Hr(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),Hr(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){Hr(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let i,s,o;for(i=0,s=t.length;i<s;i++)o=t[i],o.label=Hr(e.callback,[o.value,i,t],this)}afterTickToLabelConversion(){Hr(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){Hr(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,i=Wh(this.ticks.length,t.ticks.maxTicksLimit),s=e.minRotation||0,o=e.maxRotation;let n,r,a,l=s;if(!this._isVisible()||!e.display||s>=o||i<=1||!this.isHorizontal())return void(this.labelRotation=s);const c=this._getLabelSizes(),h=c.widest.width,d=c.highest.height,u=Ca(this.chart.width-h,0,this.maxWidth);n=t.offset?this.maxWidth/i:u/(i-1),h+6>n&&(n=u/(i-(t.offset?.5:1)),r=this.maxHeight-Yh(t.grid)-e.padding-Xh(t.title,this.chart.options.font),a=Math.sqrt(h*h+d*d),l=va(Math.min(Math.asin(Ca((c.highest.height+6)/n,-1,1)),Math.asin(Ca(r/a,-1,1))-Math.asin(Ca(d/a,-1,1)))),l=Math.max(s,Math.min(o,l))),this.labelRotation=l}afterCalculateLabelRotation(){Hr(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){Hr(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:i,title:s,grid:o}}=this,n=this._isVisible(),r=this.isHorizontal();if(n){const n=Xh(s,e.options.font);if(r?(t.width=this.maxWidth,t.height=Yh(o)+n):(t.height=this.maxHeight,t.width=Yh(o)+n),i.display&&this.ticks.length){const{first:e,last:s,widest:o,highest:n}=this._getLabelSizes(),a=2*i.padding,l=ba(this.labelRotation),c=Math.cos(l),h=Math.sin(l);if(r){const e=i.mirror?0:h*o.width+c*n.height;t.height=Math.min(this.maxHeight,t.height+e+a)}else{const e=i.mirror?0:c*o.width+h*n.height;t.width=Math.min(this.maxWidth,t.width+e+a)}this._calculatePadding(e,s,h,c)}}this._handleMargins(),r?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,i,s){const{ticks:{align:o,padding:n},position:r}=this.options,a=0!==this.labelRotation,l="top"!==r&&"x"===this.axis;if(this.isHorizontal()){const r=this.getPixelForTick(0)-this.left,c=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,d=0;a?l?(h=s*t.width,d=i*e.height):(h=i*t.height,d=s*e.width):"start"===o?d=e.width:"end"===o?h=t.width:"inner"!==o&&(h=t.width/2,d=e.width/2),this.paddingLeft=Math.max((h-r+n)*this.width/(this.width-r),0),this.paddingRight=Math.max((d-c+n)*this.width/(this.width-c),0)}else{let i=e.height/2,s=t.height/2;"start"===o?(i=0,s=t.height):"end"===o&&(i=e.height,s=0),this.paddingTop=i+n,this.paddingBottom=s+n}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){Hr(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return"top"===e||"bottom"===e||"x"===t}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){let e,i;for(this.beforeTickToLabelConversion(),this.generateTickLabels(t),e=0,i=t.length;e<i;e++)Lr(t[e].label)&&(t.splice(e,1),i--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let i=this.ticks;e<i.length&&(i=qh(i,e)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,i){const{ctx:s,_longestTextCache:o}=this,n=[],r=[],a=Math.floor(e/Wh(e,i));let l,c,h,d,u,p,g,f,m,b,v,y=0,x=0;for(l=0;l<e;l+=a){if(d=t[l].label,u=this._resolveTickFontOptions(l),s.font=p=u.string,g=o[p]=o[p]||{data:{},gc:[]},f=u.lineHeight,m=b=0,Lr(d)||Rr(d)){if(Rr(d))for(c=0,h=d.length;c<h;++c)v=d[c],Lr(v)||Rr(v)||(m=ol(s,g.data,g.gc,m,v),b+=f)}else m=ol(s,g.data,g.gc,m,d),b=f;n.push(m),r.push(b),y=Math.max(m,y),x=Math.max(b,x)}!function(t,e){jr(t,(t=>{const i=t.gc,s=i.length/2;let o;if(s>e){for(o=0;o<s;++o)delete t.data[i[o]];i.splice(0,s)}}))}(o,e);const _=n.indexOf(y),w=r.indexOf(x),k=t=>({width:n[t]||0,height:r[t]||0});return{first:k(0),last:k(e-1),widest:k(_),highest:k(w),widths:n,heights:r}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return Ca(this._alignToPixels?rl(this.chart,e,0):e,-32768,32767)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const i=e[t];return i.$context||(i.$context=function(t,e,i){return El(t,{tick:i,index:e,type:"tick"})}(this.getContext(),t,i))}return this.$context||(this.$context=El(this.chart.getContext(),{scale:this,type:"scale"}))}_tickSize(){const t=this.options.ticks,e=ba(this.labelRotation),i=Math.abs(Math.cos(e)),s=Math.abs(Math.sin(e)),o=this._getLabelSizes(),n=t.autoSkipPadding||0,r=o?o.widest.width+n:0,a=o?o.highest.height+n:0;return this.isHorizontal()?a*i>r*s?r/i:a/s:a*s<r*i?a/i:r/s}_isVisible(){const t=this.options.display;return"auto"!==t?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,i=this.chart,s=this.options,{grid:o,position:n,border:r}=s,a=o.offset,l=this.isHorizontal(),c=this.ticks.length+(a?1:0),h=Yh(o),d=[],u=r.setContext(this.getContext()),p=u.display?u.width:0,g=p/2,f=function(t){return rl(i,t,p)};let m,b,v,y,x,_,w,k,$,C,A,S;if("top"===n)m=f(this.bottom),_=this.bottom-h,k=m-g,C=f(t.top)+g,S=t.bottom;else if("bottom"===n)m=f(this.top),C=t.top,S=f(t.bottom)-g,_=m+g,k=this.top+h;else if("left"===n)m=f(this.right),x=this.right-h,w=m-g,$=f(t.left)+g,A=t.right;else if("right"===n)m=f(this.left),$=t.left,A=f(t.right)-g,x=m+g,w=this.left+h;else if("x"===e){if("center"===n)m=f((t.top+t.bottom)/2+.5);else if(Ir(n)){const t=Object.keys(n)[0],e=n[t];m=f(this.chart.scales[t].getPixelForValue(e))}C=t.top,S=t.bottom,_=m+g,k=_+h}else if("y"===e){if("center"===n)m=f((t.left+t.right)/2);else if(Ir(n)){const t=Object.keys(n)[0],e=n[t];m=f(this.chart.scales[t].getPixelForValue(e))}x=m-g,w=x-h,$=t.left,A=t.right}const M=Br(s.ticks.maxTicksLimit,c),E=Math.max(1,Math.ceil(c/M));for(b=0;b<c;b+=E){const t=this.getContext(b),e=o.setContext(t),s=r.setContext(t),n=e.lineWidth,c=e.color,h=s.dash||[],u=s.dashOffset,p=e.tickWidth,g=e.tickColor,f=e.tickBorderDash||[],m=e.tickBorderDashOffset;v=Kh(this,b,a),void 0!==v&&(y=rl(i,v,n),l?x=w=$=A=y:_=k=C=S=y,d.push({tx1:x,ty1:_,tx2:w,ty2:k,x1:$,y1:C,x2:A,y2:S,width:n,color:c,borderDash:h,borderDashOffset:u,tickWidth:p,tickColor:g,tickBorderDash:f,tickBorderDashOffset:m}))}return this._ticksLength=c,this._borderValue=m,d}_computeLabelItems(t){const e=this.axis,i=this.options,{position:s,ticks:o}=i,n=this.isHorizontal(),r=this.ticks,{align:a,crossAlign:l,padding:c,mirror:h}=o,d=Yh(i.grid),u=d+c,p=h?-c:u,g=-ba(this.labelRotation),f=[];let m,b,v,y,x,_,w,k,$,C,A,S,M="middle";if("top"===s)_=this.bottom-p,w=this._getXAxisLabelAlignment();else if("bottom"===s)_=this.top+p,w=this._getXAxisLabelAlignment();else if("left"===s){const t=this._getYAxisLabelAlignment(d);w=t.textAlign,x=t.x}else if("right"===s){const t=this._getYAxisLabelAlignment(d);w=t.textAlign,x=t.x}else if("x"===e){if("center"===s)_=(t.top+t.bottom)/2+u;else if(Ir(s)){const t=Object.keys(s)[0],e=s[t];_=this.chart.scales[t].getPixelForValue(e)+u}w=this._getXAxisLabelAlignment()}else if("y"===e){if("center"===s)x=(t.left+t.right)/2-u;else if(Ir(s)){const t=Object.keys(s)[0],e=s[t];x=this.chart.scales[t].getPixelForValue(e)}w=this._getYAxisLabelAlignment(d).textAlign}"y"===e&&("start"===a?M="top":"end"===a&&(M="bottom"));const E=this._getLabelSizes();for(m=0,b=r.length;m<b;++m){v=r[m],y=v.label;const t=o.setContext(this.getContext(m));k=this.getPixelForTick(m)+o.labelOffset,$=this._resolveTickFontOptions(m),C=$.lineHeight,A=Rr(y)?y.length:1;const e=A/2,i=t.color,a=t.textStrokeColor,c=t.textStrokeWidth;let d,u=w;if(n?(x=k,"inner"===w&&(u=m===b-1?this.options.reverse?"left":"right":0===m?this.options.reverse?"right":"left":"center"),S="top"===s?"near"===l||0!==g?-A*C+C/2:"center"===l?-E.highest.height/2-e*C+C:-E.highest.height+C/2:"near"===l||0!==g?C/2:"center"===l?E.highest.height/2-e*C:E.highest.height-A*C,h&&(S*=-1),0===g||t.showLabelBackdrop||(x+=C/2*Math.sin(g))):(_=k,S=(1-A)*C/2),t.showLabelBackdrop){const e=Al(t.backdropPadding),i=E.heights[m],s=E.widths[m];let o=S-e.top,n=0-e.left;switch(M){case"middle":o-=i/2;break;case"bottom":o-=i}switch(w){case"center":n-=s/2;break;case"right":n-=s}d={left:n,top:o,width:s+e.width,height:i+e.height,color:t.backdropColor}}f.push({label:y,font:$,textOffset:S,options:{rotation:g,color:i,strokeColor:a,strokeWidth:c,textAlign:u,textBaseline:M,translation:[x,_],backdrop:d}})}return f}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-ba(this.labelRotation))return"top"===t?"left":"right";let i="center";return"start"===e.align?i="left":"end"===e.align?i="right":"inner"===e.align&&(i="inner"),i}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:i,mirror:s,padding:o}}=this.options,n=t+o,r=this._getLabelSizes().widest.width;let a,l;return"left"===e?s?(l=this.right+o,"near"===i?a="left":"center"===i?(a="center",l+=r/2):(a="right",l+=r)):(l=this.right-n,"near"===i?a="right":"center"===i?(a="center",l-=r/2):(a="left",l=this.left)):"right"===e?s?(l=this.left+o,"near"===i?a="right":"center"===i?(a="center",l-=r/2):(a="left",l-=r)):(l=this.left+n,"near"===i?a="left":"center"===i?(a="center",l+=r/2):(a="right",l=this.right)):a="right",{textAlign:a,x:l}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;return"left"===e||"right"===e?{top:0,left:this.left,bottom:t.height,right:this.right}:"top"===e||"bottom"===e?{top:this.top,left:0,bottom:this.bottom,right:t.width}:void 0}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:i,top:s,width:o,height:n}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(i,s,o,n),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const i=this.ticks.findIndex((e=>e.value===t));if(i>=0){return e.setContext(this.getContext(i)).lineWidth}return 0}drawGrid(t){const e=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,n;const r=(t,e,s)=>{s.width&&s.color&&(i.save(),i.lineWidth=s.width,i.strokeStyle=s.color,i.setLineDash(s.borderDash||[]),i.lineDashOffset=s.borderDashOffset,i.beginPath(),i.moveTo(t.x,t.y),i.lineTo(e.x,e.y),i.stroke(),i.restore())};if(e.display)for(o=0,n=s.length;o<n;++o){const t=s[o];e.drawOnChartArea&&r({x:t.x1,y:t.y1},{x:t.x2,y:t.y2},t),e.drawTicks&&r({x:t.tx1,y:t.ty1},{x:t.tx2,y:t.ty2},{color:t.tickColor,width:t.tickWidth,borderDash:t.tickBorderDash,borderDashOffset:t.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:i,grid:s}}=this,o=i.setContext(this.getContext()),n=i.display?o.width:0;if(!n)return;const r=s.setContext(this.getContext(0)).lineWidth,a=this._borderValue;let l,c,h,d;this.isHorizontal()?(l=rl(t,this.left,n)-n/2,c=rl(t,this.right,r)+r/2,h=d=a):(h=rl(t,this.top,n)-n/2,d=rl(t,this.bottom,r)+r/2,l=c=a),e.save(),e.lineWidth=o.width,e.strokeStyle=o.color,e.beginPath(),e.moveTo(l,h),e.lineTo(c,d),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const e=this.ctx,i=this._computeLabelArea();i&&dl(e,i);const s=this.getLabelItems(t);for(const t of s){const i=t.options,s=t.font;fl(e,t.label,0,t.textOffset,s,i)}i&&ul(e)}drawTitle(){const{ctx:t,options:{position:e,title:i,reverse:s}}=this;if(!i.display)return;const o=Sl(i.font),n=Al(i.padding),r=i.align;let a=o.lineHeight/2;"bottom"===e||"center"===e||Ir(e)?(a+=n.bottom,Rr(i.text)&&(a+=o.lineHeight*(i.text.length-1))):a+=n.top;const{titleX:l,titleY:c,maxWidth:h,rotation:d}=function(t,e,i,s){const{top:o,left:n,bottom:r,right:a,chart:l}=t,{chartArea:c,scales:h}=l;let d,u,p,g=0;const f=r-o,m=a-n;if(t.isHorizontal()){if(u=Ra(s,n,a),Ir(i)){const t=Object.keys(i)[0],s=i[t];p=h[t].getPixelForValue(s)+f-e}else p="center"===i?(c.bottom+c.top)/2+f-e:Uh(t,i,e);d=a-n}else{if(Ir(i)){const t=Object.keys(i)[0],s=i[t];u=h[t].getPixelForValue(s)-m+e}else u="center"===i?(c.left+c.right)/2-m+e:Uh(t,i,e);p=Ra(s,r,o),g="left"===i?-la:la}return{titleX:u,titleY:p,maxWidth:d,rotation:g}}(this,a,e,r);fl(t,i.text,0,0,o,{color:i.color,maxWidth:h,rotation:d,textAlign:Gh(r,e,s),textBaseline:"middle",translation:[l,c]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,i=Br(t.grid&&t.grid.z,-1),s=Br(t.border&&t.border.z,0);return this._isVisible()&&this.draw===Jh.prototype.draw?[{z:i,draw:t=>{this.drawBackground(),this.drawGrid(t),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:e,draw:t=>{this.drawLabels(t)}}]:[{z:e,draw:t=>{this.draw(t)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let o,n;for(o=0,n=e.length;o<n;++o){const n=e[o];n[i]!==this.id||t&&n.type!==t||s.push(n)}return s}_resolveTickFontOptions(t){return Sl(this.options.ticks.setContext(this.getContext(t)).font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Zh{constructor(t,e,i){this.type=t,this.scope=e,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let i;(function(t){return"id"in t&&"defaults"in t})(e)&&(i=this.register(e));const s=this.items,o=t.id,n=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in s||(s[o]=t,function(t,e,i){const s=Yr(Object.create(null),[i?sl.get(i):{},sl.get(e),t.defaults]);sl.set(e,s),t.defaultRoutes&&function(t,e){Object.keys(e).forEach((i=>{const s=i.split("."),o=s.pop(),n=[t].concat(s).join("."),r=e[i].split("."),a=r.pop(),l=r.join(".");sl.route(n,o,l,a)}))}(e,t.defaultRoutes);t.descriptors&&sl.describe(e,t.descriptors)}(t,n,i),this.override&&sl.override(t.id,t.overrides)),n}get(t){return this.items[t]}unregister(t){const e=this.items,i=t.id,s=this.scope;i in e&&delete e[i],s&&i in sl[s]&&(delete sl[s][i],this.override&&delete Za[i])}}class Qh{constructor(){this.controllers=new Zh(Hc,"datasets",!0),this.elements=new Zh(Bh,"elements"),this.plugins=new Zh(Object,"plugins"),this.scales=new Zh(Jh,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,i){[...e].forEach((e=>{const s=i||this._getRegistryForType(e);i||s.isForType(e)||s===this.plugins&&e.id?this._exec(t,s,e):jr(e,(e=>{const s=i||this._getRegistryForType(e);this._exec(t,s,e)}))}))}_exec(t,e,i){const s=Qr(t);Hr(i["before"+s],[],i),e[t](i),Hr(i["after"+s],[],i)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const i=this._typedRegistries[e];if(i.isForType(t))return i}return this.plugins}_get(t,e,i){const s=e.get(t);if(void 0===s)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var td=new Qh;class ed{constructor(){this._init=[]}notify(t,e,i,s){"beforeInit"===e&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install"));const o=s?this._descriptors(t).filter(s):this._descriptors(t),n=this._notify(o,t,e,i);return"afterDestroy"===e&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall")),n}_notify(t,e,i,s){s=s||{};for(const o of t){const t=o.plugin;if(!1===Hr(t[i],[e,s,o.options],t)&&s.cancelable)return!1}return!0}invalidate(){Lr(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const i=t&&t.config,s=Br(i.options&&i.options.plugins,{}),o=function(t){const e={},i=[],s=Object.keys(td.plugins.items);for(let t=0;t<s.length;t++)i.push(td.getPlugin(s[t]));const o=t.plugins||[];for(let t=0;t<o.length;t++){const s=o[t];-1===i.indexOf(s)&&(i.push(s),e[s.id]=!0)}return{plugins:i,localIds:e}}(i);return!1!==s||e?function(t,{plugins:e,localIds:i},s,o){const n=[],r=t.getContext();for(const a of e){const e=a.id,l=id(s[e],o);null!==l&&n.push({plugin:a,options:sd(t.config,{plugin:a,local:i[e]},l,r)})}return n}(t,o,s,e):[]}_notifyStateChanges(t){const e=this._oldCache||[],i=this._cache,s=(t,e)=>t.filter((t=>!e.some((e=>t.plugin.id===e.plugin.id))));this._notify(s(e,i),t,"stop"),this._notify(s(i,e),t,"start")}}function id(t,e){return e||!1!==t?!0===t?{}:t:null}function sd(t,{plugin:e,local:i},s,o){const n=t.pluginScopeKeys(e),r=t.getOptionScopes(s,n);return i&&e.defaults&&r.push(e.defaults),t.createResolver(r,o,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function od(t,e){const i=sl.datasets[t]||{};return((e.datasets||{})[t]||{}).indexAxis||e.indexAxis||i.indexAxis||"x"}function nd(t,e){if("x"===t||"y"===t||"r"===t)return t;var i;if(t=e.axis||("top"===(i=e.position)||"bottom"===i?"x":"left"===i||"right"===i?"y":void 0)||t.length>1&&nd(t[0].toLowerCase(),e))return t;throw new Error(`Cannot determine type of '${name}' axis. Please provide 'axis' or 'position' option.`)}function rd(t){const e=t.options||(t.options={});e.plugins=Br(e.plugins,{}),e.scales=function(t,e){const i=Za[t.type]||{scales:{}},s=e.scales||{},o=od(t.type,e),n=Object.create(null);return Object.keys(s).forEach((t=>{const e=s[t];if(!Ir(e))return;if(e._proxy)return;const r=nd(t,e),a=function(t,e){return t===e?"_index_":"_value_"}(r,o),l=i.scales||{};n[t]=Xr(Object.create(null),[{axis:r},e,l[r],l[a]])})),t.data.datasets.forEach((i=>{const o=i.type||t.type,r=i.indexAxis||od(o,e),a=(Za[o]||{}).scales||{};Object.keys(a).forEach((t=>{const e=function(t,e){let i=t;return"_index_"===t?i=e:"_value_"===t&&(i="x"===e?"y":"x"),i}(t,r),o=i[e+"AxisID"]||e;n[o]=n[o]||Object.create(null),Xr(n[o],[{axis:e},s[o],a[t]])}))})),Object.keys(n).forEach((t=>{const e=n[t];Xr(e,[sl.scales[e.type],sl.scale])})),n}(t,e)}function ad(t){return(t=t||{}).datasets=t.datasets||[],t.labels=t.labels||[],t}const ld=new Map,cd=new Set;function hd(t,e){let i=ld.get(t);return i||(i=e(),ld.set(t,i),cd.add(i)),i}const dd=(t,e,i)=>{const s=Zr(e,i);void 0!==s&&t.add(s)};class ud{constructor(t){this._config=function(t){return(t=t||{}).data=ad(t.data),rd(t),t}(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=ad(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),rd(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return hd(t,(()=>[[`datasets.${t}`,""]]))}datasetAnimationScopeKeys(t,e){return hd(`${t}.transition.${e}`,(()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]]))}datasetElementScopeKeys(t,e){return hd(`${t}-${e}`,(()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]]))}pluginScopeKeys(t){const e=t.id;return hd(`${this.type}-plugin-${e}`,(()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]]))}_cachedScopes(t,e){const i=this._scopeCache;let s=i.get(t);return s&&!e||(s=new Map,i.set(t,s)),s}getOptionScopes(t,e,i){const{options:s,type:o}=this,n=this._cachedScopes(t,i),r=n.get(e);if(r)return r;const a=new Set;e.forEach((e=>{t&&(a.add(t),e.forEach((e=>dd(a,t,e)))),e.forEach((t=>dd(a,s,t))),e.forEach((t=>dd(a,Za[o]||{},t))),e.forEach((t=>dd(a,sl,t))),e.forEach((t=>dd(a,Qa,t)))}));const l=Array.from(a);return 0===l.length&&l.push(Object.create(null)),cd.has(e)&&n.set(e,l),l}chartOptionScopes(){const{options:t,type:e}=this;return[t,Za[e]||{},sl.datasets[e]||{},{type:e},sl,Qa]}resolveNamedOptions(t,e,i,s=[""]){const o={$shared:!0},{resolver:n,subPrefixes:r}=pd(this._resolverCache,t,s);let a=n;if(function(t,e){const{isScriptable:i,isIndexable:s}=Ol(t);for(const o of e){const e=i(o),n=s(o),r=(n||e)&&t[o];if(e&&(ea(r)||gd(r))||n&&Rr(r))return!0}return!1}(n,e)){o.$shared=!1;a=Tl(n,i=ea(i)?i():i,this.createResolver(t,i,r))}for(const t of e)o[t]=a[t];return o}createResolver(t,e,i=[""],s){const{resolver:o}=pd(this._resolverCache,t,i);return Ir(e)?Tl(o,e,void 0,s):o}}function pd(t,e,i){let s=t.get(e);s||(s=new Map,t.set(e,s));const o=i.join();let n=s.get(o);if(!n){n={resolver:Pl(e,i),subPrefixes:i.filter((t=>!t.toLowerCase().includes("hover")))},s.set(o,n)}return n}const gd=t=>Ir(t)&&Object.getOwnPropertyNames(t).reduce(((e,i)=>e||ea(t[i])),!1);const fd=["top","bottom","left","right","chartArea"];function md(t,e){return"top"===t||"bottom"===t||-1===fd.indexOf(t)&&"x"===e}function bd(t,e){return function(i,s){return i[t]===s[t]?i[e]-s[e]:i[t]-s[t]}}function vd(t){const e=t.chart,i=e.options.animation;e.notifyPlugins("afterRender"),Hr(i&&i.onComplete,[t],e)}function yd(t){const e=t.chart,i=e.options.animation;Hr(i&&i.onProgress,[t],e)}function xd(t){return Jl()&&"string"==typeof t?t=document.getElementById(t):t&&t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas),t}const _d={},wd=t=>{const e=xd(t);return Object.values(_d).filter((t=>t.canvas===e)).pop()};function kd(t,e,i){const s=Object.keys(t);for(const o of s){const s=+o;if(s>=e){const n=t[o];delete t[o],(i>0||s>e)&&(t[s+i]=n)}}}class $d{static defaults=sl;static instances=_d;static overrides=Za;static registry=td;static version="4.2.1";static getChart=wd;static register(...t){td.add(...t),Cd()}static unregister(...t){td.remove(...t),Cd()}constructor(t,e){const i=this.config=new ud(e),s=xd(t),o=wd(s);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const n=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||function(t){return!Jl()||"undefined"!=typeof OffscreenCanvas&&t instanceof OffscreenCanvas?$h:Vh}(s)),this.platform.updateConfig(i);const r=this.platform.acquireContext(s,n.aspectRatio),a=r&&r.canvas,l=a&&a.height,c=a&&a.width;this.id=zr(),this.ctx=r,this.canvas=a,this.width=c,this.height=l,this._options=n,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new ed,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=function(t,e){let i;return function(...s){return e?(clearTimeout(i),i=setTimeout(t,e,s)):t.apply(this,s),e}}((t=>this.update(t)),n.resizeDelay||0),this._dataChanges=[],_d[this.id]=this,r&&a&&(Ac.listen(this,"complete",vd),Ac.listen(this,"progress",yd),this._initialize(),this.attached&&this.update())}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:i,height:s,_aspectRatio:o}=this;return Lr(t)?e&&o?o:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return td}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():ac(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return al(this.canvas,this.ctx),this}stop(){return Ac.stop(this),this}resize(t,e){Ac.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const i=this.options,s=this.canvas,o=i.maintainAspectRatio&&this.aspectRatio,n=this.platform.getMaximumSize(s,t,e,o),r=i.devicePixelRatio||this.platform.getDevicePixelRatio(),a=this.width?"resize":"attach";this.width=n.width,this.height=n.height,this._aspectRatio=this.aspectRatio,ac(this,r,!0)&&(this.notifyPlugins("resize",{size:n}),Hr(i.onResize,[this,n],this),this.attached&&this._doResize(a)&&this.render())}ensureScalesHaveIDs(){jr(this.options.scales||{},((t,e)=>{t.id=e}))}buildOrUpdateScales(){const t=this.options,e=t.scales,i=this.scales,s=Object.keys(i).reduce(((t,e)=>(t[e]=!1,t)),{});let o=[];e&&(o=o.concat(Object.keys(e).map((t=>{const i=e[t],s=nd(t,i),o="r"===s,n="x"===s;return{options:i,dposition:o?"chartArea":n?"bottom":"left",dtype:o?"radialLinear":n?"category":"linear"}})))),jr(o,(e=>{const o=e.options,n=o.id,r=nd(n,o),a=Br(o.type,e.dtype);void 0!==o.position&&md(o.position,r)===md(e.dposition)||(o.position=e.dposition),s[n]=!0;let l=null;if(n in i&&i[n].type===a)l=i[n];else{l=new(td.getScale(a))({id:n,type:a,ctx:this.ctx,chart:this}),i[l.id]=l}l.init(o,t)})),jr(s,((t,e)=>{t||delete i[e]})),jr(i,(t=>{wh.configure(this,t,t.options),wh.addBox(this,t)}))}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,i=t.length;if(t.sort(((t,e)=>t.index-e.index)),i>e){for(let t=e;t<i;++t)this._destroyDatasetMeta(t);t.splice(e,i-e)}this._sortedMetasets=t.slice(0).sort(bd("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach(((t,i)=>{0===e.filter((e=>e===t._dataset)).length&&this._destroyDatasetMeta(i)}))}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=e.length;i<s;i++){const s=e[i];let o=this.getDatasetMeta(i);const n=s.type||this.config.type;if(o.type&&o.type!==n&&(this._destroyDatasetMeta(i),o=this.getDatasetMeta(i)),o.type=n,o.indexAxis=s.indexAxis||od(n,this.options),o.order=s.order||0,o.index=i,o.label=""+s.label,o.visible=this.isDatasetVisible(i),o.controller)o.controller.updateIndex(i),o.controller.linkScales();else{const e=td.getController(n),{datasetElementType:s,dataElementType:r}=sl.datasets[n];Object.assign(e,{dataElementType:td.getElement(r),datasetElementType:s&&td.getElement(s)}),o.controller=new e(this,i),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){jr(this.data.datasets,((t,e)=>{this.getDatasetMeta(e).controller.reset()}),this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const i=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),!1===this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0}))return;const o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let n=0;for(let t=0,e=this.data.datasets.length;t<e;t++){const{controller:e}=this.getDatasetMeta(t),i=!s&&-1===o.indexOf(e);e.buildOrUpdateElements(i),n=Math.max(+e.getMaxOverflow(),n)}n=this._minPadding=i.layout.autoPadding?n:0,this._updateLayout(n),s||jr(o,(t=>{t.reset()})),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(bd("z","_idx"));const{_active:r,_lastEvent:a}=this;a?this._eventHandler(a,!0):r.length&&this._updateHoverStyles(r,r,!0),this.render()}_updateScales(){jr(this.scales,(t=>{wh.removeBox(this,t)})),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),i=new Set(t.events);ia(e,i)&&!!this._responsiveListeners===t.responsive||(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:o}of e){kd(t,s,"_removeElements"===i?-o:o)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,i=e=>new Set(t.filter((t=>t[0]===e)).map(((t,e)=>e+","+t.splice(1).join(",")))),s=i(0);for(let t=1;t<e;t++)if(!ia(s,i(t)))return;return Array.from(s).map((t=>t.split(","))).map((t=>({method:t[1],start:+t[2],count:+t[3]})))}_updateLayout(t){if(!1===this.notifyPlugins("beforeLayout",{cancelable:!0}))return;wh.update(this,this.width,this.height,t);const e=this.chartArea,i=e.width<=0||e.height<=0;this._layers=[],jr(this.boxes,(t=>{i&&"chartArea"===t.position||(t.configure&&t.configure(),this._layers.push(...t._layers()))}),this),this._layers.forEach(((t,e)=>{t._idx=e})),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(!1!==this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})){for(let t=0,e=this.data.datasets.length;t<e;++t)this.getDatasetMeta(t).controller.configure();for(let e=0,i=this.data.datasets.length;e<i;++e)this._updateDataset(e,ea(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:e,cancelable:!0};!1!==this.notifyPlugins("beforeDatasetUpdate",s)&&(i.controller._update(e),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){!1!==this.notifyPlugins("beforeRender",{cancelable:!0})&&(Ac.has(this)?this.attached&&!Ac.running(this)&&Ac.start(this):(this.draw(),vd({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:t,height:e}=this._resizeBeforeDraw;this._resize(t,e),this._resizeBeforeDraw=null}if(this.clear(),this.width<=0||this.height<=0)return;if(!1===this.notifyPlugins("beforeDraw",{cancelable:!0}))return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,i=[];let s,o;for(s=0,o=e.length;s<o;++s){const o=e[s];t&&!o.visible||i.push(o)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(!1===this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0}))return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,i=t._clip,s=!i.disabled,o=function(t){const{xScale:e,yScale:i}=t;if(e&&i)return{left:e.left,right:e.right,top:i.top,bottom:i.bottom}}(t)||this.chartArea,n={meta:t,index:t.index,cancelable:!0};!1!==this.notifyPlugins("beforeDatasetDraw",n)&&(s&&dl(e,{left:!1===i.left?0:o.left-i.left,right:!1===i.right?this.width:o.right+i.right,top:!1===i.top?0:o.top-i.top,bottom:!1===i.bottom?this.height:o.bottom+i.bottom}),t.controller.draw(),s&&ul(e),n.cancelable=!1,this.notifyPlugins("afterDatasetDraw",n))}isPointInArea(t){return hl(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,i,s){const o=ch.modes[e];return"function"==typeof o?o(this,t,i,s):[]}getDatasetMeta(t){const e=this.data.datasets[t],i=this._metasets;let s=i.filter((t=>t&&t._dataset===e)).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=El(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const i=this.getDatasetMeta(t);return"boolean"==typeof i.hidden?!i.hidden:!e.hidden}setDatasetVisibility(t,e){this.getDatasetMeta(t).hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,i){const s=i?"show":"hide",o=this.getDatasetMeta(t),n=o.controller._resolveAnimations(void 0,s);ta(e)?(o.data[e].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),n.update(o,{visible:i}),this.update((e=>e.datasetIndex===t?s:void 0)))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),Ac.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),al(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete _d[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,i=(i,s)=>{e.addEventListener(this,i,s),t[i]=s},s=(t,e,i)=>{t.offsetX=e,t.offsetY=i,this._eventHandler(t)};jr(this.options.events,(t=>i(t,s)))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,i=(i,s)=>{e.addEventListener(this,i,s),t[i]=s},s=(i,s)=>{t[i]&&(e.removeEventListener(this,i,s),delete t[i])},o=(t,e)=>{this.canvas&&this.resize(t,e)};let n;const r=()=>{s("attach",r),this.attached=!0,this.resize(),i("resize",o),i("detach",n)};n=()=>{this.attached=!1,s("resize",o),this._stop(),this._resize(0,0),i("attach",r)},e.isAttached(this.canvas)?r():n()}unbindEvents(){jr(this._listeners,((t,e)=>{this.platform.removeEventListener(this,e,t)})),this._listeners={},jr(this._responsiveListeners,((t,e)=>{this.platform.removeEventListener(this,e,t)})),this._responsiveListeners=void 0}updateHoverStyle(t,e,i){const s=i?"set":"remove";let o,n,r,a;for("dataset"===e&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+s+"DatasetHoverStyle"]()),r=0,a=t.length;r<a;++r){n=t[r];const e=n&&this.getDatasetMeta(n.datasetIndex).controller;e&&e[s+"HoverStyle"](n.element,n.datasetIndex,n.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],i=t.map((({datasetIndex:t,index:e})=>{const i=this.getDatasetMeta(t);if(!i)throw new Error("No dataset found at index "+t);return{datasetIndex:t,element:i.data[e],index:e}}));!Ur(i,e)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,e))}notifyPlugins(t,e,i){return this._plugins.notify(this,t,e,i)}isPluginEnabled(t){return 1===this._plugins._cache.filter((e=>e.plugin.id===t)).length}_updateHoverStyles(t,e,i){const s=this.options.hover,o=(t,e)=>t.filter((t=>!e.some((e=>t.datasetIndex===e.datasetIndex&&t.index===e.index)))),n=o(e,t),r=i?t:o(t,e);n.length&&this.updateHoverStyle(n,s.mode,!1),r.length&&s.mode&&this.updateHoverStyle(r,s.mode,!0)}_eventHandler(t,e){const i={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},s=e=>(e.options.events||this.options.events).includes(t.native.type);if(!1===this.notifyPlugins("beforeEvent",i,s))return;const o=this._handleEvent(t,e,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(o||i.changed)&&this.render(),this}_handleEvent(t,e,i){const{_active:s=[],options:o}=this,n=e,r=this._getActiveElements(t,s,i,n),a=function(t){return"mouseup"===t.type||"click"===t.type||"contextmenu"===t.type}(t),l=function(t,e,i,s){return i&&"mouseout"!==t.type?s?e:t:null}(t,this._lastEvent,i,a);i&&(this._lastEvent=null,Hr(o.onHover,[t,r,this],this),a&&Hr(o.onClick,[t,r,this],this));const c=!Ur(r,s);return(c||e)&&(this._active=r,this._updateHoverStyles(r,s,e)),this._lastEvent=l,c}_getActiveElements(t,e,i,s){if("mouseout"===t.type)return[];if(!i)return e;const o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,s)}}function Cd(){return jr($d.instances,(t=>t._plugins.invalidate()))}function Ad(t,e,i,s){const o=kl(t.options.borderRadius,["outerStart","outerEnd","innerStart","innerEnd"]);const n=(i-e)/2,r=Math.min(n,s*e/2),a=t=>{const e=(i-Math.min(n,t))*s/2;return Ca(t,0,Math.min(n,e))};return{outerStart:a(o.outerStart),outerEnd:a(o.outerEnd),innerStart:Ca(o.innerStart,0,r),innerEnd:Ca(o.innerEnd,0,r)}}function Sd(t,e,i,s){return{x:i+t*Math.cos(e),y:s+t*Math.sin(e)}}function Md(t,e,i,s,o,n){const{x:r,y:a,startAngle:l,pixelMargin:c,innerRadius:h}=e,d=Math.max(e.outerRadius+s+i-c,0),u=h>0?h+s+i+c:0;let p=0;const g=o-l;if(s){const t=((h>0?h-s:0)+(d>0?d-s:0))/2;p=(g-(0!==t?g*t/(t+s):g))/2}const f=(g-Math.max(.001,g*d-i/sa)/d)/2,m=l+f+p,b=o-f-p,{outerStart:v,outerEnd:y,innerStart:x,innerEnd:_}=Ad(e,u,d,b-m),w=d-v,k=d-y,$=m+v/w,C=b-y/k,A=u+x,S=u+_,M=m+x/A,E=b-_/S;if(t.beginPath(),n){const e=($+C)/2;if(t.arc(r,a,d,$,e),t.arc(r,a,d,e,C),y>0){const e=Sd(k,C,r,a);t.arc(e.x,e.y,y,C,b+la)}const i=Sd(S,b,r,a);if(t.lineTo(i.x,i.y),_>0){const e=Sd(S,E,r,a);t.arc(e.x,e.y,_,b+la,E+Math.PI)}const s=(b-_/u+(m+x/u))/2;if(t.arc(r,a,u,b-_/u,s,!0),t.arc(r,a,u,s,m+x/u,!0),x>0){const e=Sd(A,M,r,a);t.arc(e.x,e.y,x,M+Math.PI,m-la)}const o=Sd(w,m,r,a);if(t.lineTo(o.x,o.y),v>0){const e=Sd(w,$,r,a);t.arc(e.x,e.y,v,m-la,$)}}else{t.moveTo(r,a);const e=Math.cos($)*d+r,i=Math.sin($)*d+a;t.lineTo(e,i);const s=Math.cos(C)*d+r,o=Math.sin(C)*d+a;t.lineTo(s,o)}t.closePath()}function Ed(t,e,i,s,o){const{fullCircles:n,startAngle:r,circumference:a,options:l}=e,{borderWidth:c,borderJoinStyle:h}=l,d="inner"===l.borderAlign;if(!c)return;d?(t.lineWidth=2*c,t.lineJoin=h||"round"):(t.lineWidth=c,t.lineJoin=h||"bevel");let u=e.endAngle;if(n){Md(t,e,i,s,u,o);for(let e=0;e<n;++e)t.stroke();isNaN(a)||(u=r+(a%oa||oa))}d&&function(t,e,i){const{startAngle:s,pixelMargin:o,x:n,y:r,outerRadius:a,innerRadius:l}=e;let c=o/a;t.beginPath(),t.arc(n,r,a,s-c,i+c),l>o?(c=o/l,t.arc(n,r,l,i+c,s-c,!0)):t.arc(n,r,o,i+la,s-la),t.closePath(),t.clip()}(t,e,u),n||(Md(t,e,i,s,u,o),t.stroke())}function Pd(t,e,i=e){t.lineCap=Br(i.borderCapStyle,e.borderCapStyle),t.setLineDash(Br(i.borderDash,e.borderDash)),t.lineDashOffset=Br(i.borderDashOffset,e.borderDashOffset),t.lineJoin=Br(i.borderJoinStyle,e.borderJoinStyle),t.lineWidth=Br(i.borderWidth,e.borderWidth),t.strokeStyle=Br(i.borderColor,e.borderColor)}function Td(t,e,i){t.lineTo(i.x,i.y)}function Od(t,e,i={}){const s=t.length,{start:o=0,end:n=s-1}=i,{start:r,end:a}=e,l=Math.max(o,r),c=Math.min(n,a),h=o<r&&n<r||o>a&&n>a;return{count:s,start:l,loop:e.loop,ilen:c<l&&!h?s+c-l:c-l}}function Dd(t,e,i,s){const{points:o,options:n}=e,{count:r,start:a,loop:l,ilen:c}=Od(o,i,s),h=function(t){return t.stepped?pl:t.tension||"monotone"===t.cubicInterpolationMode?gl:Td}(n);let d,u,p,{move:g=!0,reverse:f}=s||{};for(d=0;d<=c;++d)u=o[(a+(f?c-d:d))%r],u.skip||(g?(t.moveTo(u.x,u.y),g=!1):h(t,p,u,f,n.stepped),p=u);return l&&(u=o[(a+(f?c:0))%r],h(t,p,u,f,n.stepped)),!!l}function zd(t,e,i,s){const o=e.points,{count:n,start:r,ilen:a}=Od(o,i,s),{move:l=!0,reverse:c}=s||{};let h,d,u,p,g,f,m=0,b=0;const v=t=>(r+(c?a-t:t))%n,y=()=>{p!==g&&(t.lineTo(m,g),t.lineTo(m,p),t.lineTo(m,f))};for(l&&(d=o[v(0)],t.moveTo(d.x,d.y)),h=0;h<=a;++h){if(d=o[v(h)],d.skip)continue;const e=d.x,i=d.y,s=0|e;s===u?(i<p?p=i:i>g&&(g=i),m=(b*m+e)/++b):(y(),t.lineTo(e,i),u=s,b=0,p=g=i),f=i}y()}function Ld(t){const e=t.options,i=e.borderDash&&e.borderDash.length;return!(t._decimated||t._loop||e.tension||"monotone"===e.cubicInterpolationMode||e.stepped||i)?zd:Dd}const Rd="function"==typeof Path2D;function Id(t,e,i,s){Rd&&!e.options.segment?function(t,e,i,s){let o=e._path;o||(o=e._path=new Path2D,e.path(o,i,s)&&o.closePath()),Pd(t,e.options),t.stroke(o)}(t,e,i,s):function(t,e,i,s){const{segments:o,options:n}=e,r=Ld(e);for(const a of o)Pd(t,n,a.style),t.beginPath(),r(t,e,a,{start:i,end:i+s-1})&&t.closePath(),t.stroke()}(t,e,i,s)}class Fd extends Bh{static id="line";static defaults={borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};static descriptors={_scriptable:!0,_indexable:t=>"borderDash"!==t&&"fill"!==t};constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const i=this.options;if((i.tension||"monotone"===i.cubicInterpolationMode)&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;Gl(this._points,i,t,s,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=function(t,e){const i=t.points,s=t.options.spanGaps,o=i.length;if(!o)return[];const n=!!t._loop,{start:r,end:a}=function(t,e,i,s){let o=0,n=e-1;if(i&&!s)for(;o<e&&!t[o].skip;)o++;for(;o<e&&t[o].skip;)o++;for(o%=e,i&&(n+=o);n>o&&t[n%e].skip;)n--;return n%=e,{start:o,end:n}}(i,o,n,s);return wc(t,!0===s?[{start:r,end:a,loop:n}]:function(t,e,i,s){const o=t.length,n=[];let r,a=e,l=t[e];for(r=e+1;r<=i;++r){const i=t[r%o];i.skip||i.stop?l.skip||(s=!1,n.push({start:e%o,end:(r-1)%o,loop:s}),e=a=i.stop?r:null):(a=r,l.skip&&(e=r)),l=i}return null!==a&&n.push({start:e%o,end:a%o,loop:s}),n}(i,r,a<r?a+o:a,!!t._fullLoop&&0===r&&a===o-1),i,e)}(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,i=t.length;return i&&e[t[i-1].end]}interpolate(t,e){const i=this.options,s=t[e],o=this.points,n=_c(this,{property:e,start:s,end:s});if(!n.length)return;const r=[],a=function(t){return t.stepped?dc:t.tension||"monotone"===t.cubicInterpolationMode?uc:hc}(i);let l,c;for(l=0,c=n.length;l<c;++l){const{start:c,end:h}=n[l],d=o[c],u=o[h];if(d===u){r.push(d);continue}const p=a(d,u,Math.abs((s-d[e])/(u[e]-d[e])),i.stepped);p[e]=t[e],r.push(p)}return 1===r.length?r[0]:r}pathSegment(t,e,i){return Ld(this)(t,this,e,i)}path(t,e,i){const s=this.segments,o=Ld(this);let n=this._loop;e=e||0,i=i||this.points.length-e;for(const r of s)n&=o(t,this,r,{start:e,end:e+i-1});return!!n}draw(t,e,i,s){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),Id(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}function Vd(t,e,i,s){const o=t.options,{[i]:n}=t.getProps([i],s);return Math.abs(e-n)<o.radius+o.hitRadius}function Bd(t,e){const{x:i,y:s,base:o,width:n,height:r}=t.getProps(["x","y","base","width","height"],e);let a,l,c,h,d;return t.horizontal?(d=r/2,a=Math.min(i,o),l=Math.max(i,o),c=s-d,h=s+d):(d=n/2,a=i-d,l=i+d,c=Math.min(s,o),h=Math.max(s,o)),{left:a,top:c,right:l,bottom:h}}function Nd(t,e,i,s){return t?0:Ca(e,i,s)}function Hd(t){const e=Bd(t),i=e.right-e.left,s=e.bottom-e.top,o=function(t,e,i){const s=t.options.borderWidth,o=t.borderSkipped,n=$l(s);return{t:Nd(o.top,n.top,0,i),r:Nd(o.right,n.right,0,e),b:Nd(o.bottom,n.bottom,0,i),l:Nd(o.left,n.left,0,e)}}(t,i/2,s/2),n=function(t,e,i){const{enableBorderRadius:s}=t.getProps(["enableBorderRadius"]),o=t.options.borderRadius,n=Cl(o),r=Math.min(e,i),a=t.borderSkipped,l=s||Ir(o);return{topLeft:Nd(!l||a.top||a.left,n.topLeft,0,r),topRight:Nd(!l||a.top||a.right,n.topRight,0,r),bottomLeft:Nd(!l||a.bottom||a.left,n.bottomLeft,0,r),bottomRight:Nd(!l||a.bottom||a.right,n.bottomRight,0,r)}}(t,i/2,s/2);return{outer:{x:e.left,y:e.top,w:i,h:s,radius:n},inner:{x:e.left+o.l,y:e.top+o.t,w:i-o.l-o.r,h:s-o.t-o.b,radius:{topLeft:Math.max(0,n.topLeft-Math.max(o.t,o.l)),topRight:Math.max(0,n.topRight-Math.max(o.t,o.r)),bottomLeft:Math.max(0,n.bottomLeft-Math.max(o.b,o.l)),bottomRight:Math.max(0,n.bottomRight-Math.max(o.b,o.r))}}}}function jd(t,e,i,s){const o=null===e,n=null===i,r=t&&!(o&&n)&&Bd(t,s);return r&&(o||Aa(e,r.left,r.right))&&(n||Aa(i,r.top,r.bottom))}function Ud(t,e){t.rect(e.x,e.y,e.w,e.h)}function Wd(t,e,i={}){const s=t.x!==i.x?-e:0,o=t.y!==i.y?-e:0,n=(t.x+t.w!==i.x+i.w?e:0)-s,r=(t.y+t.h!==i.y+i.h?e:0)-o;return{x:t.x+s,y:t.y+o,w:t.w+n,h:t.h+r,radius:t.radius}}var qd=Object.freeze({__proto__:null,ArcElement:class extends Bh{static id="arc";static defaults={borderAlign:"center",borderColor:"#fff",borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0};static defaultRoutes={backgroundColor:"backgroundColor"};constructor(t){super(),this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,t&&Object.assign(this,t)}inRange(t,e,i){const s=this.getProps(["x","y"],i),{angle:o,distance:n}=xa(s,{x:t,y:e}),{startAngle:r,endAngle:a,innerRadius:l,outerRadius:c,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),d=this.options.spacing/2,u=Br(h,a-r)>=oa||$a(o,r,a),p=Aa(n,l+d,c+d);return u&&p}getCenterPoint(t){const{x:e,y:i,startAngle:s,endAngle:o,innerRadius:n,outerRadius:r}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],t),{offset:a,spacing:l}=this.options,c=(s+o)/2,h=(n+r+l+a)/2;return{x:e+Math.cos(c)*h,y:i+Math.sin(c)*h}}tooltipPosition(t){return this.getCenterPoint(t)}draw(t){const{options:e,circumference:i}=this,s=(e.offset||0)/4,o=(e.spacing||0)/2,n=e.circular;if(this.pixelMargin="inner"===e.borderAlign?.33:0,this.fullCircles=i>oa?Math.floor(i/oa):0,0===i||this.innerRadius<0||this.outerRadius<0)return;t.save();const r=(this.startAngle+this.endAngle)/2;t.translate(Math.cos(r)*s,Math.sin(r)*s);const a=s*(1-Math.sin(Math.min(sa,i||0)));t.fillStyle=e.backgroundColor,t.strokeStyle=e.borderColor,function(t,e,i,s,o){const{fullCircles:n,startAngle:r,circumference:a}=e;let l=e.endAngle;if(n){Md(t,e,i,s,l,o);for(let e=0;e<n;++e)t.fill();isNaN(a)||(l=r+(a%oa||oa))}Md(t,e,i,s,l,o),t.fill()}(t,this,a,o,n),Ed(t,this,a,o,n),t.restore()}},LineElement:Fd,PointElement:class extends Bh{static id="point";static defaults={borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,t&&Object.assign(this,t)}inRange(t,e,i){const s=this.options,{x:o,y:n}=this.getProps(["x","y"],i);return Math.pow(t-o,2)+Math.pow(e-n,2)<Math.pow(s.hitRadius+s.radius,2)}inXRange(t,e){return Vd(this,t,"x",e)}inYRange(t,e){return Vd(this,t,"y",e)}getCenterPoint(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}size(t){let e=(t=t||this.options||{}).radius||0;e=Math.max(e,e&&t.hoverRadius||0);return 2*(e+(e&&t.borderWidth||0))}draw(t,e){const i=this.options;this.skip||i.radius<.1||!hl(this,e,this.size(i)/2)||(t.strokeStyle=i.borderColor,t.lineWidth=i.borderWidth,t.fillStyle=i.backgroundColor,ll(t,i,this.x,this.y))}getRange(){const t=this.options||{};return t.radius+t.hitRadius}},BarElement:class extends Bh{static id="bar";static defaults={borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0};static defaultRoutes={backgroundColor:"backgroundColor",borderColor:"borderColor"};constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:i,backgroundColor:s}}=this,{inner:o,outer:n}=Hd(this),r=(a=n.radius).topLeft||a.topRight||a.bottomLeft||a.bottomRight?vl:Ud;var a;t.save(),n.w===o.w&&n.h===o.h||(t.beginPath(),r(t,Wd(n,e,o)),t.clip(),r(t,Wd(o,-e,n)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),r(t,Wd(o,e)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,e,i){return jd(this,t,e,i)}inXRange(t,e){return jd(this,t,null,e)}inYRange(t,e){return jd(this,null,t,e)}getCenterPoint(t){const{x:e,y:i,base:s,horizontal:o}=this.getProps(["x","y","base","horizontal"],t);return{x:o?(e+s)/2:e,y:o?i:(i+s)/2}}getRange(t){return"x"===t?this.width/2:this.height/2}}});const Kd=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Yd=Kd.map((t=>t.replace("rgb(","rgba(").replace(")",", 0.5)")));function Xd(t){return Kd[t%Kd.length]}function Gd(t){return Yd[t%Yd.length]}function Jd(t){let e=0;return(i,s)=>{const o=t.getDatasetMeta(s).controller;o instanceof Jc?e=function(t,e){return t.backgroundColor=t.data.map((()=>Xd(e++))),e}(i,e):o instanceof Zc?e=function(t,e){return t.backgroundColor=t.data.map((()=>Gd(e++))),e}(i,e):o&&(e=function(t,e){return t.borderColor=Xd(e),t.backgroundColor=Gd(e),++e}(i,e))}}function Zd(t){let e;for(e in t)if(t[e].borderColor||t[e].backgroundColor)return!0;return!1}var Qd={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(t,e,i){if(!i.enabled)return;const{data:{datasets:s},options:o}=t.config,{elements:n}=o;if(!i.forceOverride&&(Zd(s)||(r=o)&&(r.borderColor||r.backgroundColor)||n&&Zd(n)))return;var r;const a=Jd(t);s.forEach(a)}};function tu(t){if(t._decimated){const e=t._data;delete t._decimated,delete t._data,Object.defineProperty(t,"data",{configurable:!0,enumerable:!0,writable:!0,value:e})}}function eu(t){t.data.datasets.forEach((t=>{tu(t)}))}var iu={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(t,e,i)=>{if(!i.enabled)return void eu(t);const s=t.width;t.data.datasets.forEach(((e,o)=>{const{_data:n,indexAxis:r}=e,a=t.getDatasetMeta(o),l=n||e.data;if("y"===Ml([r,t.options.indexAxis]))return;if(!a.controller.supportsDecimation)return;const c=t.scales[a.xAxisID];if("linear"!==c.type&&"time"!==c.type)return;if(t.options.parsing)return;let{start:h,count:d}=function(t,e){const i=e.length;let s,o=0;const{iScale:n}=t,{min:r,max:a,minDefined:l,maxDefined:c}=n.getUserBounds();return l&&(o=Ca(Ma(e,n.axis,r).lo,0,i-1)),s=c?Ca(Ma(e,n.axis,a).hi+1,o,i)-o:i-o,{start:o,count:s}}(a,l);if(d<=(i.threshold||4*s))return void tu(e);let u;switch(Lr(n)&&(e._data=l,delete e.data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(t){this._data=t}})),i.algorithm){case"lttb":u=function(t,e,i,s,o){const n=o.samples||s;if(n>=i)return t.slice(e,e+i);const r=[],a=(i-2)/(n-2);let l=0;const c=e+i-1;let h,d,u,p,g,f=e;for(r[l++]=t[f],h=0;h<n-2;h++){let s,o=0,n=0;const c=Math.floor((h+1)*a)+1+e,m=Math.min(Math.floor((h+2)*a)+1,i)+e,b=m-c;for(s=c;s<m;s++)o+=t[s].x,n+=t[s].y;o/=b,n/=b;const v=Math.floor(h*a)+1+e,y=Math.min(Math.floor((h+1)*a)+1,i)+e,{x:x,y:_}=t[f];for(u=p=-1,s=v;s<y;s++)p=.5*Math.abs((x-o)*(t[s].y-_)-(x-t[s].x)*(n-_)),p>u&&(u=p,d=t[s],g=s);r[l++]=d,f=g}return r[l++]=t[c],r}(l,h,d,s,i);break;case"min-max":u=function(t,e,i,s){let o,n,r,a,l,c,h,d,u,p,g=0,f=0;const m=[],b=e+i-1,v=t[e].x,y=t[b].x-v;for(o=e;o<e+i;++o){n=t[o],r=(n.x-v)/y*s,a=n.y;const e=0|r;if(e===l)a<u?(u=a,c=o):a>p&&(p=a,h=o),g=(f*g+n.x)/++f;else{const i=o-1;if(!Lr(c)&&!Lr(h)){const e=Math.min(c,h),s=Math.max(c,h);e!==d&&e!==i&&m.push({...t[e],x:g}),s!==d&&s!==i&&m.push({...t[s],x:g})}o>0&&i!==d&&m.push(t[i]),m.push(n),l=e,f=0,u=p=a,c=h=d=o}}return m}(l,h,d,s);break;default:throw new Error(`Unsupported decimation algorithm '${i.algorithm}'`)}e._decimated=u}))},destroy(t){eu(t)}};function su(t,e,i,s){if(s)return;let o=e[t],n=i[t];return"angle"===t&&(o=ka(o),n=ka(n)),{property:t,start:o,end:n}}function ou(t,e,i){for(;e>t;e--){const t=i[e];if(!isNaN(t.x)&&!isNaN(t.y))break}return e}function nu(t,e,i,s){return t&&e?s(t[i],e[i]):t?t[i]:e?e[i]:0}function ru(t,e){let i=[],s=!1;return Rr(t)?(s=!0,i=t):i=function(t,e){const{x:i=null,y:s=null}=t||{},o=e.points,n=[];return e.segments.forEach((({start:t,end:e})=>{e=ou(t,e,o);const r=o[t],a=o[e];null!==s?(n.push({x:r.x,y:s}),n.push({x:a.x,y:s})):null!==i&&(n.push({x:i,y:r.y}),n.push({x:i,y:a.y}))})),n}(t,e),i.length?new Fd({points:i,options:{tension:0},_loop:s,_fullLoop:s}):null}function au(t){return t&&!1!==t.fill}function lu(t,e,i){let s=t[e].fill;const o=[e];let n;if(!i)return s;for(;!1!==s&&-1===o.indexOf(s);){if(!Fr(s))return s;if(n=t[s],!n)return!1;if(n.visible)return s;o.push(s),s=n.fill}return!1}function cu(t,e,i){const s=function(t){const e=t.options,i=e.fill;let s=Br(i&&i.target,i);void 0===s&&(s=!!e.backgroundColor);if(!1===s||null===s)return!1;if(!0===s)return"origin";return s}(t);if(Ir(s))return!isNaN(s.value)&&s;let o=parseFloat(s);return Fr(o)&&Math.floor(o)===o?function(t,e,i,s){"-"!==t&&"+"!==t||(i=e+i);if(i===e||i<0||i>=s)return!1;return i}(s[0],e,o,i):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}function hu(t,e,i){const s=[];for(let o=0;o<i.length;o++){const n=i[o],{first:r,last:a,point:l}=du(n,e,"x");if(!(!l||r&&a))if(r)s.unshift(l);else if(t.push(l),!a)break}t.push(...s)}function du(t,e,i){const s=t.interpolate(e,i);if(!s)return{};const o=s[i],n=t.segments,r=t.points;let a=!1,l=!1;for(let t=0;t<n.length;t++){const e=n[t],s=r[e.start][i],c=r[e.end][i];if(Aa(o,s,c)){a=o===s,l=o===c;break}}return{first:a,last:l,point:s}}class uu{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,i){const{x:s,y:o,radius:n}=this;return e=e||{start:0,end:oa},t.arc(s,o,n,e.end,e.start,!0),!i.bounds}interpolate(t){const{x:e,y:i,radius:s}=this,o=t.angle;return{x:e+Math.cos(o)*s,y:i+Math.sin(o)*s,angle:o}}}function pu(t){const{chart:e,fill:i,line:s}=t;if(Fr(i))return function(t,e){const i=t.getDatasetMeta(e),s=i&&t.isDatasetVisible(e);return s?i.dataset:null}(e,i);if("stack"===i)return function(t){const{scale:e,index:i,line:s}=t,o=[],n=s.segments,r=s.points,a=function(t,e){const i=[],s=t.getMatchingVisibleMetas("line");for(let t=0;t<s.length;t++){const o=s[t];if(o.index===e)break;o.hidden||i.unshift(o.dataset)}return i}(e,i);a.push(ru({x:null,y:e.bottom},s));for(let t=0;t<n.length;t++){const e=n[t];for(let t=e.start;t<=e.end;t++)hu(o,r[t],a)}return new Fd({points:o,options:{}})}(t);if("shape"===i)return!0;const o=function(t){const e=t.scale||{};if(e.getPointPositionForValue)return function(t){const{scale:e,fill:i}=t,s=e.options,o=e.getLabels().length,n=s.reverse?e.max:e.min,r=function(t,e,i){let s;return s="start"===t?i:"end"===t?e.options.reverse?e.min:e.max:Ir(t)?t.value:e.getBaseValue(),s}(i,e,n),a=[];if(s.grid.circular){const t=e.getPointPositionForValue(0,n);return new uu({x:t.x,y:t.y,radius:e.getDistanceFromCenterForValue(r)})}for(let t=0;t<o;++t)a.push(e.getPointPositionForValue(t,r));return a}(t);return function(t){const{scale:e={},fill:i}=t,s=function(t,e){let i=null;return"start"===t?i=e.bottom:"end"===t?i=e.top:Ir(t)?i=e.getPixelForValue(t.value):e.getBasePixel&&(i=e.getBasePixel()),i}(i,e);if(Fr(s)){const t=e.isHorizontal();return{x:t?s:null,y:t?null:s}}return null}(t)}(t);return o instanceof uu?o:ru(o,s)}function gu(t,e,i){const s=pu(e),{line:o,scale:n,axis:r}=e,a=o.options,l=a.fill,c=a.backgroundColor,{above:h=c,below:d=c}=l||{};s&&o.points.length&&(dl(t,i),function(t,e){const{line:i,target:s,above:o,below:n,area:r,scale:a}=e,l=i._loop?"angle":e.axis;t.save(),"x"===l&&n!==o&&(fu(t,s,r.top),mu(t,{line:i,target:s,color:o,scale:a,property:l}),t.restore(),t.save(),fu(t,s,r.bottom));mu(t,{line:i,target:s,color:n,scale:a,property:l}),t.restore()}(t,{line:o,target:s,above:h,below:d,area:i,scale:n,axis:r}),ul(t))}function fu(t,e,i){const{segments:s,points:o}=e;let n=!0,r=!1;t.beginPath();for(const a of s){const{start:s,end:l}=a,c=o[s],h=o[ou(s,l,o)];n?(t.moveTo(c.x,c.y),n=!1):(t.lineTo(c.x,i),t.lineTo(c.x,c.y)),r=!!e.pathSegment(t,a,{move:r}),r?t.closePath():t.lineTo(h.x,i)}t.lineTo(e.first().x,i),t.closePath(),t.clip()}function mu(t,e){const{line:i,target:s,property:o,color:n,scale:r}=e,a=function(t,e,i){const s=t.segments,o=t.points,n=e.points,r=[];for(const t of s){let{start:s,end:a}=t;a=ou(s,a,o);const l=su(i,o[s],o[a],t.loop);if(!e.segments){r.push({source:t,target:l,start:o[s],end:o[a]});continue}const c=_c(e,l);for(const e of c){const s=su(i,n[e.start],n[e.end],e.loop),a=xc(t,o,s);for(const t of a)r.push({source:t,target:e,start:{[i]:nu(l,s,"start",Math.max)},end:{[i]:nu(l,s,"end",Math.min)}})}}return r}(i,s,o);for(const{source:e,target:l,start:c,end:h}of a){const{style:{backgroundColor:a=n}={}}=e,d=!0!==s;t.save(),t.fillStyle=a,bu(t,r,d&&su(o,c,h)),t.beginPath();const u=!!i.pathSegment(t,e);let p;if(d){u?t.closePath():vu(t,s,h,o);const e=!!s.pathSegment(t,l,{move:u,reverse:!0});p=u&&e,p||vu(t,s,c,o)}t.closePath(),t.fill(p?"evenodd":"nonzero"),t.restore()}}function bu(t,e,i){const{top:s,bottom:o}=e.chart.chartArea,{property:n,start:r,end:a}=i||{};"x"===n&&(t.beginPath(),t.rect(r,s,a-r,o-s),t.clip())}function vu(t,e,i,s){const o=e.interpolate(i,s);o&&t.lineTo(o.x,o.y)}var yu={id:"filler",afterDatasetsUpdate(t,e,i){const s=(t.data.datasets||[]).length,o=[];let n,r,a,l;for(r=0;r<s;++r)n=t.getDatasetMeta(r),a=n.dataset,l=null,a&&a.options&&a instanceof Fd&&(l={visible:t.isDatasetVisible(r),index:r,fill:cu(a,r,s),chart:t,axis:n.controller.options.indexAxis,scale:n.vScale,line:a}),n.$filler=l,o.push(l);for(r=0;r<s;++r)l=o[r],l&&!1!==l.fill&&(l.fill=lu(o,r,i.propagate))},beforeDraw(t,e,i){const s="beforeDraw"===i.drawTime,o=t.getSortedVisibleDatasetMetas(),n=t.chartArea;for(let e=o.length-1;e>=0;--e){const i=o[e].$filler;i&&(i.line.updateControlPoints(n,i.axis),s&&i.fill&&gu(t.ctx,i,n))}},beforeDatasetsDraw(t,e,i){if("beforeDatasetsDraw"!==i.drawTime)return;const s=t.getSortedVisibleDatasetMetas();for(let e=s.length-1;e>=0;--e){const i=s[e].$filler;au(i)&&gu(t.ctx,i,t.chartArea)}},beforeDatasetDraw(t,e,i){const s=e.meta.$filler;au(s)&&"beforeDatasetDraw"===i.drawTime&&gu(t.ctx,s,t.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const xu=(t,e)=>{let{boxHeight:i=e,boxWidth:s=e}=t;return t.usePointStyle&&(i=Math.min(i,e),s=t.pointStyleWidth||Math.min(s,e)),{boxWidth:s,boxHeight:i,itemHeight:Math.max(e,i)}};class _u extends Bh{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,i){this.maxWidth=t,this.maxHeight=e,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=Hr(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter((e=>t.filter(e,this.chart.data)))),t.sort&&(e=e.sort(((e,i)=>t.sort(e,i,this.chart.data)))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display)return void(this.width=this.height=0);const i=t.labels,s=Sl(i.font),o=s.size,n=this._computeTitleHeight(),{boxWidth:r,itemHeight:a}=xu(i,o);let l,c;e.font=s.string,this.isHorizontal()?(l=this.maxWidth,c=this._fitRows(n,o,r,a)+10):(c=this.maxHeight,l=this._fitCols(n,s,r,a)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(c,t.maxHeight||this.maxHeight)}_fitRows(t,e,i,s){const{ctx:o,maxWidth:n,options:{labels:{padding:r}}}=this,a=this.legendHitBoxes=[],l=this.lineWidths=[0],c=s+r;let h=t;o.textAlign="left",o.textBaseline="middle";let d=-1,u=-c;return this.legendItems.forEach(((t,p)=>{const g=i+e/2+o.measureText(t.text).width;(0===p||l[l.length-1]+g+2*r>n)&&(h+=c,l[l.length-(p>0?0:1)]=0,u+=c,d++),a[p]={left:0,top:u,row:d,width:g,height:s},l[l.length-1]+=g+r})),h}_fitCols(t,e,i,s){const{ctx:o,maxHeight:n,options:{labels:{padding:r}}}=this,a=this.legendHitBoxes=[],l=this.columnSizes=[],c=n-t;let h=r,d=0,u=0,p=0,g=0;return this.legendItems.forEach(((t,n)=>{const{itemWidth:f,itemHeight:m}=function(t,e,i,s,o){const n=function(t,e,i,s){let o=t.text;o&&"string"!=typeof o&&(o=o.reduce(((t,e)=>t.length>e.length?t:e)));return e+i.size/2+s.measureText(o).width}(s,t,e,i),r=function(t,e,i){let s=t;"string"!=typeof e.text&&(s=wu(e,i));return s}(o,s,e.lineHeight);return{itemWidth:n,itemHeight:r}}(i,e,o,t,s);n>0&&u+m+2*r>c&&(h+=d+r,l.push({width:d,height:u}),p+=d+r,g++,d=u=0),a[n]={left:p,top:u,col:g,width:f,height:m},d=Math.max(d,f),u+=m+r})),h+=d,l.push({width:d,height:u}),h}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:i,labels:{padding:s},rtl:o}}=this,n=fc(o,this.left,this.width);if(this.isHorizontal()){let o=0,r=Ra(i,this.left+s,this.right-this.lineWidths[o]);for(const a of e)o!==a.row&&(o=a.row,r=Ra(i,this.left+s,this.right-this.lineWidths[o])),a.top+=this.top+t+s,a.left=n.leftForLtr(n.x(r),a.width),r+=a.width+s}else{let o=0,r=Ra(i,this.top+t+s,this.bottom-this.columnSizes[o].height);for(const a of e)a.col!==o&&(o=a.col,r=Ra(i,this.top+t+s,this.bottom-this.columnSizes[o].height)),a.top=r,a.left+=this.left+s,a.left=n.leftForLtr(n.x(a.left),a.width),r+=a.height+s}}isHorizontal(){return"top"===this.options.position||"bottom"===this.options.position}draw(){if(this.options.display){const t=this.ctx;dl(t,this),this._draw(),ul(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:i,ctx:s}=this,{align:o,labels:n}=t,r=sl.color,a=fc(t.rtl,this.left,this.width),l=Sl(n.font),{padding:c}=n,h=l.size,d=h/2;let u;this.drawTitle(),s.textAlign=a.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=l.string;const{boxWidth:p,boxHeight:g,itemHeight:f}=xu(n,h),m=this.isHorizontal(),b=this._computeTitleHeight();u=m?{x:Ra(o,this.left+c,this.right-i[0]),y:this.top+c+b,line:0}:{x:this.left+c,y:Ra(o,this.top+b+c,this.bottom-e[0].height),line:0},mc(this.ctx,t.textDirection);const v=f+c;this.legendItems.forEach(((y,x)=>{s.strokeStyle=y.fontColor,s.fillStyle=y.fontColor;const _=s.measureText(y.text).width,w=a.textAlign(y.textAlign||(y.textAlign=n.textAlign)),k=p+d+_;let $=u.x,C=u.y;a.setWidth(this.width),m?x>0&&$+k+c>this.right&&(C=u.y+=v,u.line++,$=u.x=Ra(o,this.left+c,this.right-i[u.line])):x>0&&C+v>this.bottom&&($=u.x=$+e[u.line].width+c,u.line++,C=u.y=Ra(o,this.top+b+c,this.bottom-e[u.line].height));if(function(t,e,i){if(isNaN(p)||p<=0||isNaN(g)||g<0)return;s.save();const o=Br(i.lineWidth,1);if(s.fillStyle=Br(i.fillStyle,r),s.lineCap=Br(i.lineCap,"butt"),s.lineDashOffset=Br(i.lineDashOffset,0),s.lineJoin=Br(i.lineJoin,"miter"),s.lineWidth=o,s.strokeStyle=Br(i.strokeStyle,r),s.setLineDash(Br(i.lineDash,[])),n.usePointStyle){const r={radius:g*Math.SQRT2/2,pointStyle:i.pointStyle,rotation:i.rotation,borderWidth:o},l=a.xPlus(t,p/2);cl(s,r,l,e+d,n.pointStyleWidth&&p)}else{const n=e+Math.max((h-g)/2,0),r=a.leftForLtr(t,p),l=Cl(i.borderRadius);s.beginPath(),Object.values(l).some((t=>0!==t))?vl(s,{x:r,y:n,w:p,h:g,radius:l}):s.rect(r,n,p,g),s.fill(),0!==o&&s.stroke()}s.restore()}(a.x($),C,y),$=((t,e,i,s)=>t===(s?"left":"right")?i:"center"===t?(e+i)/2:e)(w,$+p+d,m?$+k:this.right,t.rtl),function(t,e,i){fl(s,i.text,t,e+f/2,l,{strikethrough:i.hidden,textAlign:a.textAlign(i.textAlign)})}(a.x($),C,y),m)u.x+=k+c;else if("string"!=typeof y.text){const t=l.lineHeight;u.y+=wu(y,t)}else u.y+=v})),bc(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,i=Sl(e.font),s=Al(e.padding);if(!e.display)return;const o=fc(t.rtl,this.left,this.width),n=this.ctx,r=e.position,a=i.size/2,l=s.top+a;let c,h=this.left,d=this.width;if(this.isHorizontal())d=Math.max(...this.lineWidths),c=this.top+l,h=Ra(t.align,h,this.right-d);else{const e=this.columnSizes.reduce(((t,e)=>Math.max(t,e.height)),0);c=l+Ra(t.align,this.top,this.bottom-e-t.labels.padding-this._computeTitleHeight())}const u=Ra(r,h,h+d);n.textAlign=o.textAlign(La(r)),n.textBaseline="middle",n.strokeStyle=e.color,n.fillStyle=e.color,n.font=i.string,fl(n,e.text,u,c,i)}_computeTitleHeight(){const t=this.options.title,e=Sl(t.font),i=Al(t.padding);return t.display?e.lineHeight+i.height:0}_getLegendItemAt(t,e){let i,s,o;if(Aa(t,this.left,this.right)&&Aa(e,this.top,this.bottom))for(o=this.legendHitBoxes,i=0;i<o.length;++i)if(s=o[i],Aa(t,s.left,s.left+s.width)&&Aa(e,s.top,s.top+s.height))return this.legendItems[i];return null}handleEvent(t){const e=this.options;if(!function(t,e){if(("mousemove"===t||"mouseout"===t)&&(e.onHover||e.onLeave))return!0;if(e.onClick&&("click"===t||"mouseup"===t))return!0;return!1}(t.type,e))return;const i=this._getLegendItemAt(t.x,t.y);if("mousemove"===t.type||"mouseout"===t.type){const s=this._hoveredItem,o=((t,e)=>null!==t&&null!==e&&t.datasetIndex===e.datasetIndex&&t.index===e.index)(s,i);s&&!o&&Hr(e.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!o&&Hr(e.onHover,[t,i,this],this)}else i&&Hr(e.onClick,[t,i,this],this)}}function wu(t,e){return e*(t.text?t.text.length+.5:0)}var ku={id:"legend",_element:_u,start(t,e,i){const s=t.legend=new _u({ctx:t.ctx,options:i,chart:t});wh.configure(t,s,i),wh.addBox(t,s)},stop(t){wh.removeBox(t,t.legend),delete t.legend},beforeUpdate(t,e,i){const s=t.legend;wh.configure(t,s,i),s.options=i},afterUpdate(t){const e=t.legend;e.buildLabels(),e.adjustHitBoxes()},afterEvent(t,e){e.replay||t.legend.handleEvent(e.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(t,e,i){const s=e.datasetIndex,o=i.chart;o.isDatasetVisible(s)?(o.hide(s),e.hidden=!0):(o.show(s),e.hidden=!1)},onHover:null,onLeave:null,labels:{color:t=>t.chart.options.color,boxWidth:40,padding:10,generateLabels(t){const e=t.data.datasets,{labels:{usePointStyle:i,pointStyle:s,textAlign:o,color:n,useBorderRadius:r,borderRadius:a}}=t.legend.options;return t._getSortedDatasetMetas().map((t=>{const l=t.controller.getStyle(i?0:void 0),c=Al(l.borderWidth);return{text:e[t.index].label,fillStyle:l.backgroundColor,fontColor:n,hidden:!t.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(c.width+c.height)/4,strokeStyle:l.borderColor,pointStyle:s||l.pointStyle,rotation:l.rotation,textAlign:o||l.textAlign,borderRadius:r&&(a||l.borderRadius),datasetIndex:t.index}}),this)}},title:{color:t=>t.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:t=>!t.startsWith("on"),labels:{_scriptable:t=>!["generateLabels","filter","sort"].includes(t)}}};class $u extends Bh{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const i=this.options;if(this.left=0,this.top=0,!i.display)return void(this.width=this.height=this.right=this.bottom=0);this.width=this.right=t,this.height=this.bottom=e;const s=Rr(i.text)?i.text.length:1;this._padding=Al(i.padding);const o=s*Sl(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=o:this.width=o}isHorizontal(){const t=this.options.position;return"top"===t||"bottom"===t}_drawArgs(t){const{top:e,left:i,bottom:s,right:o,options:n}=this,r=n.align;let a,l,c,h=0;return this.isHorizontal()?(l=Ra(r,i,o),c=e+t,a=o-i):("left"===n.position?(l=i+t,c=Ra(r,s,e),h=-.5*sa):(l=o-t,c=Ra(r,e,s),h=.5*sa),a=s-e),{titleX:l,titleY:c,maxWidth:a,rotation:h}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const i=Sl(e.font),s=i.lineHeight/2+this._padding.top,{titleX:o,titleY:n,maxWidth:r,rotation:a}=this._drawArgs(s);fl(t,e.text,0,0,i,{color:e.color,maxWidth:r,rotation:a,textAlign:La(e.align),textBaseline:"middle",translation:[o,n]})}}var Cu={id:"title",_element:$u,start(t,e,i){!function(t,e){const i=new $u({ctx:t.ctx,options:e,chart:t});wh.configure(t,i,e),wh.addBox(t,i),t.titleBlock=i}(t,i)},stop(t){const e=t.titleBlock;wh.removeBox(t,e),delete t.titleBlock},beforeUpdate(t,e,i){const s=t.titleBlock;wh.configure(t,s,i),s.options=i},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Au=new WeakMap;var Su={id:"subtitle",start(t,e,i){const s=new $u({ctx:t.ctx,options:i,chart:t});wh.configure(t,s,i),wh.addBox(t,s),Au.set(t,s)},stop(t){wh.removeBox(t,Au.get(t)),Au.delete(t)},beforeUpdate(t,e,i){const s=Au.get(t);wh.configure(t,s,i),s.options=i},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Mu={average(t){if(!t.length)return!1;let e,i,s=0,o=0,n=0;for(e=0,i=t.length;e<i;++e){const i=t[e].element;if(i&&i.hasValue()){const t=i.tooltipPosition();s+=t.x,o+=t.y,++n}}return{x:s/n,y:o/n}},nearest(t,e){if(!t.length)return!1;let i,s,o,n=e.x,r=e.y,a=Number.POSITIVE_INFINITY;for(i=0,s=t.length;i<s;++i){const s=t[i].element;if(s&&s.hasValue()){const t=_a(e,s.getCenterPoint());t<a&&(a=t,o=s)}}if(o){const t=o.tooltipPosition();n=t.x,r=t.y}return{x:n,y:r}}};function Eu(t,e){return e&&(Rr(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function Pu(t){return("string"==typeof t||t instanceof String)&&t.indexOf("\n")>-1?t.split("\n"):t}function Tu(t,e){const{element:i,datasetIndex:s,index:o}=e,n=t.getDatasetMeta(s).controller,{label:r,value:a}=n.getLabelAndValue(o);return{chart:t,label:r,parsed:n.getParsed(o),raw:t.data.datasets[s].data[o],formattedValue:a,dataset:n.getDataset(),dataIndex:o,datasetIndex:s,element:i}}function Ou(t,e){const i=t.chart.ctx,{body:s,footer:o,title:n}=t,{boxWidth:r,boxHeight:a}=e,l=Sl(e.bodyFont),c=Sl(e.titleFont),h=Sl(e.footerFont),d=n.length,u=o.length,p=s.length,g=Al(e.padding);let f=g.height,m=0,b=s.reduce(((t,e)=>t+e.before.length+e.lines.length+e.after.length),0);if(b+=t.beforeBody.length+t.afterBody.length,d&&(f+=d*c.lineHeight+(d-1)*e.titleSpacing+e.titleMarginBottom),b){f+=p*(e.displayColors?Math.max(a,l.lineHeight):l.lineHeight)+(b-p)*l.lineHeight+(b-1)*e.bodySpacing}u&&(f+=e.footerMarginTop+u*h.lineHeight+(u-1)*e.footerSpacing);let v=0;const y=function(t){m=Math.max(m,i.measureText(t).width+v)};return i.save(),i.font=c.string,jr(t.title,y),i.font=l.string,jr(t.beforeBody.concat(t.afterBody),y),v=e.displayColors?r+2+e.boxPadding:0,jr(s,(t=>{jr(t.before,y),jr(t.lines,y),jr(t.after,y)})),v=0,i.font=h.string,jr(t.footer,y),i.restore(),m+=g.width,{width:m,height:f}}function Du(t,e,i,s){const{x:o,width:n}=i,{width:r,chartArea:{left:a,right:l}}=t;let c="center";return"center"===s?c=o<=(a+l)/2?"left":"right":o<=n/2?c="left":o>=r-n/2&&(c="right"),function(t,e,i,s){const{x:o,width:n}=s,r=i.caretSize+i.caretPadding;return"left"===t&&o+n+r>e.width||"right"===t&&o-n-r<0||void 0}(c,t,e,i)&&(c="center"),c}function zu(t,e,i){const s=i.yAlign||e.yAlign||function(t,e){const{y:i,height:s}=e;return i<s/2?"top":i>t.height-s/2?"bottom":"center"}(t,i);return{xAlign:i.xAlign||e.xAlign||Du(t,e,i,s),yAlign:s}}function Lu(t,e,i,s){const{caretSize:o,caretPadding:n,cornerRadius:r}=t,{xAlign:a,yAlign:l}=i,c=o+n,{topLeft:h,topRight:d,bottomLeft:u,bottomRight:p}=Cl(r);let g=function(t,e){let{x:i,width:s}=t;return"right"===e?i-=s:"center"===e&&(i-=s/2),i}(e,a);const f=function(t,e,i){let{y:s,height:o}=t;return"top"===e?s+=i:s-="bottom"===e?o+i:o/2,s}(e,l,c);return"center"===l?"left"===a?g+=c:"right"===a&&(g-=c):"left"===a?g-=Math.max(h,u)+o:"right"===a&&(g+=Math.max(d,p)+o),{x:Ca(g,0,s.width-e.width),y:Ca(f,0,s.height-e.height)}}function Ru(t,e,i){const s=Al(i.padding);return"center"===e?t.x+t.width/2:"right"===e?t.x+t.width-s.right:t.x+s.left}function Iu(t){return Eu([],Pu(t))}function Fu(t,e){const i=e&&e.dataset&&e.dataset.tooltip&&e.dataset.tooltip.callbacks;return i?t.override(i):t}const Vu={beforeTitle:Dr,title(t){if(t.length>0){const e=t[0],i=e.chart.data.labels,s=i?i.length:0;if(this&&this.options&&"dataset"===this.options.mode)return e.dataset.label||"";if(e.label)return e.label;if(s>0&&e.dataIndex<s)return i[e.dataIndex]}return""},afterTitle:Dr,beforeBody:Dr,beforeLabel:Dr,label(t){if(this&&this.options&&"dataset"===this.options.mode)return t.label+": "+t.formattedValue||t.formattedValue;let e=t.dataset.label||"";e&&(e+=": ");const i=t.formattedValue;return Lr(i)||(e+=i),e},labelColor(t){const e=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(t){const e=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:Dr,afterBody:Dr,beforeFooter:Dr,footer:Dr,afterFooter:Dr};function Bu(t,e,i,s){const o=t[e].call(i,s);return void 0===o?Vu[e].call(i,s):o}class Nu extends Bh{static positioners=Mu;constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&e.options.animation&&i.animations,o=new Pc(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=(t=this.chart.getContext(),e=this,i=this._tooltipItems,El(t,{tooltip:e,tooltipItems:i,type:"tooltip"})));var t,e,i}getTitle(t,e){const{callbacks:i}=e,s=Bu(i,"beforeTitle",this,t),o=Bu(i,"title",this,t),n=Bu(i,"afterTitle",this,t);let r=[];return r=Eu(r,Pu(s)),r=Eu(r,Pu(o)),r=Eu(r,Pu(n)),r}getBeforeBody(t,e){return Iu(Bu(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:i}=e,s=[];return jr(t,(t=>{const e={before:[],lines:[],after:[]},o=Fu(i,t);Eu(e.before,Pu(Bu(o,"beforeLabel",this,t))),Eu(e.lines,Bu(o,"label",this,t)),Eu(e.after,Pu(Bu(o,"afterLabel",this,t))),s.push(e)})),s}getAfterBody(t,e){return Iu(Bu(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:i}=e,s=Bu(i,"beforeFooter",this,t),o=Bu(i,"footer",this,t),n=Bu(i,"afterFooter",this,t);let r=[];return r=Eu(r,Pu(s)),r=Eu(r,Pu(o)),r=Eu(r,Pu(n)),r}_createItems(t){const e=this._active,i=this.chart.data,s=[],o=[],n=[];let r,a,l=[];for(r=0,a=e.length;r<a;++r)l.push(Tu(this.chart,e[r]));return t.filter&&(l=l.filter(((e,s,o)=>t.filter(e,s,o,i)))),t.itemSort&&(l=l.sort(((e,s)=>t.itemSort(e,s,i)))),jr(l,(e=>{const i=Fu(t.callbacks,e);s.push(Bu(i,"labelColor",this,e)),o.push(Bu(i,"labelPointStyle",this,e)),n.push(Bu(i,"labelTextColor",this,e))})),this.labelColors=s,this.labelPointStyles=o,this.labelTextColors=n,this.dataPoints=l,l}update(t,e){const i=this.options.setContext(this.getContext()),s=this._active;let o,n=[];if(s.length){const t=Mu[i.position].call(this,s,this._eventPosition);n=this._createItems(i),this.title=this.getTitle(n,i),this.beforeBody=this.getBeforeBody(n,i),this.body=this.getBody(n,i),this.afterBody=this.getAfterBody(n,i),this.footer=this.getFooter(n,i);const e=this._size=Ou(this,i),r=Object.assign({},t,e),a=zu(this.chart,i,r),l=Lu(i,r,a,this.chart);this.xAlign=a.xAlign,this.yAlign=a.yAlign,o={opacity:1,x:l.x,y:l.y,width:e.width,height:e.height,caretX:t.x,caretY:t.y}}else 0!==this.opacity&&(o={opacity:0});this._tooltipItems=n,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,i,s){const o=this.getCaretPosition(t,i,s);e.lineTo(o.x1,o.y1),e.lineTo(o.x2,o.y2),e.lineTo(o.x3,o.y3)}getCaretPosition(t,e,i){const{xAlign:s,yAlign:o}=this,{caretSize:n,cornerRadius:r}=i,{topLeft:a,topRight:l,bottomLeft:c,bottomRight:h}=Cl(r),{x:d,y:u}=t,{width:p,height:g}=e;let f,m,b,v,y,x;return"center"===o?(y=u+g/2,"left"===s?(f=d,m=f-n,v=y+n,x=y-n):(f=d+p,m=f+n,v=y-n,x=y+n),b=f):(m="left"===s?d+Math.max(a,c)+n:"right"===s?d+p-Math.max(l,h)-n:this.caretX,"top"===o?(v=u,y=v-n,f=m-n,b=m+n):(v=u+g,y=v+n,f=m+n,b=m-n),x=v),{x1:f,x2:m,x3:b,y1:v,y2:y,y3:x}}drawTitle(t,e,i){const s=this.title,o=s.length;let n,r,a;if(o){const l=fc(i.rtl,this.x,this.width);for(t.x=Ru(this,i.titleAlign,i),e.textAlign=l.textAlign(i.titleAlign),e.textBaseline="middle",n=Sl(i.titleFont),r=i.titleSpacing,e.fillStyle=i.titleColor,e.font=n.string,a=0;a<o;++a)e.fillText(s[a],l.x(t.x),t.y+n.lineHeight/2),t.y+=n.lineHeight+r,a+1===o&&(t.y+=i.titleMarginBottom-r)}}_drawColorBox(t,e,i,s,o){const n=this.labelColors[i],r=this.labelPointStyles[i],{boxHeight:a,boxWidth:l,boxPadding:c}=o,h=Sl(o.bodyFont),d=Ru(this,"left",o),u=s.x(d),p=a<h.lineHeight?(h.lineHeight-a)/2:0,g=e.y+p;if(o.usePointStyle){const e={radius:Math.min(l,a)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},i=s.leftForLtr(u,l)+l/2,c=g+a/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,ll(t,e,i,c),t.strokeStyle=n.borderColor,t.fillStyle=n.backgroundColor,ll(t,e,i,c)}else{t.lineWidth=Ir(n.borderWidth)?Math.max(...Object.values(n.borderWidth)):n.borderWidth||1,t.strokeStyle=n.borderColor,t.setLineDash(n.borderDash||[]),t.lineDashOffset=n.borderDashOffset||0;const e=s.leftForLtr(u,l-c),i=s.leftForLtr(s.xPlus(u,1),l-c-2),r=Cl(n.borderRadius);Object.values(r).some((t=>0!==t))?(t.beginPath(),t.fillStyle=o.multiKeyBackground,vl(t,{x:e,y:g,w:l,h:a,radius:r}),t.fill(),t.stroke(),t.fillStyle=n.backgroundColor,t.beginPath(),vl(t,{x:i,y:g+1,w:l-2,h:a-2,radius:r}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(e,g,l,a),t.strokeRect(e,g,l,a),t.fillStyle=n.backgroundColor,t.fillRect(i,g+1,l-2,a-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,e,i){const{body:s}=this,{bodySpacing:o,bodyAlign:n,displayColors:r,boxHeight:a,boxWidth:l,boxPadding:c}=i,h=Sl(i.bodyFont);let d=h.lineHeight,u=0;const p=fc(i.rtl,this.x,this.width),g=function(i){e.fillText(i,p.x(t.x+u),t.y+d/2),t.y+=d+o},f=p.textAlign(n);let m,b,v,y,x,_,w;for(e.textAlign=n,e.textBaseline="middle",e.font=h.string,t.x=Ru(this,f,i),e.fillStyle=i.bodyColor,jr(this.beforeBody,g),u=r&&"right"!==f?"center"===n?l/2+c:l+2+c:0,y=0,_=s.length;y<_;++y){for(m=s[y],b=this.labelTextColors[y],e.fillStyle=b,jr(m.before,g),v=m.lines,r&&v.length&&(this._drawColorBox(e,t,y,p,i),d=Math.max(h.lineHeight,a)),x=0,w=v.length;x<w;++x)g(v[x]),d=h.lineHeight;jr(m.after,g)}u=0,d=h.lineHeight,jr(this.afterBody,g),t.y-=o}drawFooter(t,e,i){const s=this.footer,o=s.length;let n,r;if(o){const a=fc(i.rtl,this.x,this.width);for(t.x=Ru(this,i.footerAlign,i),t.y+=i.footerMarginTop,e.textAlign=a.textAlign(i.footerAlign),e.textBaseline="middle",n=Sl(i.footerFont),e.fillStyle=i.footerColor,e.font=n.string,r=0;r<o;++r)e.fillText(s[r],a.x(t.x),t.y+n.lineHeight/2),t.y+=n.lineHeight+i.footerSpacing}}drawBackground(t,e,i,s){const{xAlign:o,yAlign:n}=this,{x:r,y:a}=t,{width:l,height:c}=i,{topLeft:h,topRight:d,bottomLeft:u,bottomRight:p}=Cl(s.cornerRadius);e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.beginPath(),e.moveTo(r+h,a),"top"===n&&this.drawCaret(t,e,i,s),e.lineTo(r+l-d,a),e.quadraticCurveTo(r+l,a,r+l,a+d),"center"===n&&"right"===o&&this.drawCaret(t,e,i,s),e.lineTo(r+l,a+c-p),e.quadraticCurveTo(r+l,a+c,r+l-p,a+c),"bottom"===n&&this.drawCaret(t,e,i,s),e.lineTo(r+u,a+c),e.quadraticCurveTo(r,a+c,r,a+c-u),"center"===n&&"left"===o&&this.drawCaret(t,e,i,s),e.lineTo(r,a+h),e.quadraticCurveTo(r,a,r+h,a),e.closePath(),e.fill(),s.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,i=this.$animations,s=i&&i.x,o=i&&i.y;if(s||o){const i=Mu[t.position].call(this,this._active,this._eventPosition);if(!i)return;const n=this._size=Ou(this,t),r=Object.assign({},i,this._size),a=zu(e,t,r),l=Lu(t,r,a,e);s._to===l.x&&o._to===l.y||(this.xAlign=a.xAlign,this.yAlign=a.yAlign,this.width=n.width,this.height=n.height,this.caretX=i.x,this.caretY=i.y,this._resolveAnimations().update(this,l))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(e);const s={width:this.width,height:this.height},o={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const n=Al(e.padding),r=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&r&&(t.save(),t.globalAlpha=i,this.drawBackground(o,t,s,e),mc(t,e.textDirection),o.y+=n.top,this.drawTitle(o,t,e),this.drawBody(o,t,e),this.drawFooter(o,t,e),bc(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const i=this._active,s=t.map((({datasetIndex:t,index:e})=>{const i=this.chart.getDatasetMeta(t);if(!i)throw new Error("Cannot find a dataset at index "+t);return{datasetIndex:t,element:i.data[e],index:e}})),o=!Ur(i,s),n=this._positionChanged(s,e);(o||n)&&(this._active=s,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,i=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,o=this._active||[],n=this._getActiveElements(t,o,e,i),r=this._positionChanged(n,t),a=e||!Ur(n,o)||r;return a&&(this._active=n,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),a}_getActiveElements(t,e,i,s){const o=this.options;if("mouseout"===t.type)return[];if(!s)return e;const n=this.chart.getElementsAtEventForMode(t,o.mode,o,i);return o.reverse&&n.reverse(),n}_positionChanged(t,e){const{caretX:i,caretY:s,options:o}=this,n=Mu[o.position].call(this,t,e);return!1!==n&&(i!==n.x||s!==n.y)}}var Hu={id:"tooltip",_element:Nu,positioners:Mu,afterInit(t,e,i){i&&(t.tooltip=new Nu({chart:t,options:i}))},beforeUpdate(t,e,i){t.tooltip&&t.tooltip.initialize(i)},reset(t,e,i){t.tooltip&&t.tooltip.initialize(i)},afterDraw(t){const e=t.tooltip;if(e&&e._willRender()){const i={tooltip:e};if(!1===t.notifyPlugins("beforeTooltipDraw",{...i,cancelable:!0}))return;e.draw(t.ctx),t.notifyPlugins("afterTooltipDraw",i)}},afterEvent(t,e){if(t.tooltip){const i=e.replay;t.tooltip.handleEvent(e.event,i,e.inChartArea)&&(e.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(t,e)=>e.bodyFont.size,boxWidth:(t,e)=>e.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Vu},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:t=>"filter"!==t&&"itemSort"!==t&&"external"!==t,_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},ju=Object.freeze({__proto__:null,Colors:Qd,Decimation:iu,Filler:yu,Legend:ku,SubTitle:Su,Title:Cu,Tooltip:Hu});const Uu=(t,e,i,s)=>("string"==typeof e?(i=t.push(e)-1,s.unshift({index:i,label:e})):isNaN(e)&&(i=null),i);function Wu(t){const e=this.getLabels();return t>=0&&t<e.length?e[t]:t}function qu(t,e){const i=[],{bounds:s,step:o,min:n,max:r,precision:a,count:l,maxTicks:c,maxDigits:h,includeBounds:d}=t,u=o||1,p=c-1,{min:g,max:f}=e,m=!Lr(n),b=!Lr(r),v=!Lr(l),y=(f-g)/(h+1);let x,_,w,k,$=ga((f-g)/p/u)*u;if($<1e-14&&!m&&!b)return[{value:g},{value:f}];k=Math.ceil(f/$)-Math.floor(g/$),k>p&&($=ga(k*$/p/u)*u),Lr(a)||(x=Math.pow(10,a),$=Math.ceil($*x)/x),"ticks"===s?(_=Math.floor(g/$)*$,w=Math.ceil(f/$)*$):(_=g,w=f),m&&b&&o&&function(t,e){const i=Math.round(t);return i-e<=t&&i+e>=t}((r-n)/o,$/1e3)?(k=Math.round(Math.min((r-n)/$,c)),$=(r-n)/k,_=n,w=r):v?(_=m?n:_,w=b?r:w,k=l-1,$=(w-_)/k):(k=(w-_)/$,k=pa(k,Math.round(k),$/1e3)?Math.round(k):Math.ceil(k));const C=Math.max(ya($),ya(_));x=Math.pow(10,Lr(a)?C:a),_=Math.round(_*x)/x,w=Math.round(w*x)/x;let A=0;for(m&&(d&&_!==n?(i.push({value:n}),_<n&&A++,pa(Math.round((_+A*$)*x)/x,n,Ku(n,y,t))&&A++):_<n&&A++);A<k;++A)i.push({value:Math.round((_+A*$)*x)/x});return b&&d&&w!==r?i.length&&pa(i[i.length-1].value,r,Ku(r,y,t))?i[i.length-1].value=r:i.push({value:r}):b&&w!==r||i.push({value:w}),i}function Ku(t,e,{horizontal:i,minRotation:s}){const o=ba(s),n=(i?Math.sin(o):Math.cos(o))||.001,r=.75*e*(""+t).length;return Math.min(e/n,r)}class Yu extends Jh{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return Lr(t)||("number"==typeof t||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:i}=this.getUserBounds();let{min:s,max:o}=this;const n=t=>s=e?s:t,r=t=>o=i?o:t;if(t){const t=ua(s),e=ua(o);t<0&&e<0?r(0):t>0&&e>0&&n(0)}if(s===o){let e=0===o?1:Math.abs(.05*o);r(o+e),t||n(s-e)}this.min=s,this.max=o}getTickLimit(){const t=this.options.ticks;let e,{maxTicksLimit:i,stepSize:s}=t;return s?(e=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,e>1e3&&(e=1e3)):(e=this.computeTickLimit(),i=i||11),i&&(e=Math.min(i,e)),e}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s=qu({maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:!1!==e.includeBounds},this._range||this);return"ticks"===t.bounds&&ma(s,this,"value"),t.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}configure(){const t=this.ticks;let e=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-e)/Math.max(t.length-1,1)/2;e-=s,i+=s}this._startValue=e,this._endValue=i,this._valueRange=i-e}getLabelForValue(t){return Xa(t,this.chart.options.locale,this.options.ticks.format)}}class Xu extends Yu{static id="linear";static defaults={ticks:{callback:Ja.formatters.numeric}};determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=Fr(t)?t:0,this.max=Fr(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,i=ba(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,o.lineHeight/s))}getPixelForValue(t){return null===t?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}const Gu=t=>Math.floor(da(t)),Ju=(t,e)=>Math.pow(10,Gu(t)+e);function Zu(t){return 1===t/Math.pow(10,Gu(t))}function Qu(t,e,i){const s=Math.pow(10,i),o=Math.floor(t/s);return Math.ceil(e/s)-o}function tp(t,{min:e,max:i}){e=Vr(t.min,e);const s=[],o=Gu(e);let n=function(t,e){let i=Gu(e-t);for(;Qu(t,e,i)>10;)i++;for(;Qu(t,e,i)<10;)i--;return Math.min(i,Gu(t))}(e,i),r=n<0?Math.pow(10,Math.abs(n)):1;const a=Math.pow(10,n),l=o>n?Math.pow(10,o):0,c=Math.round((e-l)*r)/r,h=Math.floor((e-l)/a/10)*a*10;let d=Math.floor((c-h)/Math.pow(10,n)),u=Vr(t.min,Math.round((l+h+d*Math.pow(10,n))*r)/r);for(;u<i;)s.push({value:u,major:Zu(u),significand:d}),d>=10?d=d<15?15:20:d++,d>=20&&(n++,d=2,r=n>=0?1:r),u=Math.round((l+h+d*Math.pow(10,n))*r)/r;const p=Vr(t.max,u);return s.push({value:p,major:Zu(p),significand:d}),s}class ep extends Jh{static id="logarithmic";static defaults={ticks:{callback:Ja.formatters.logarithmic,major:{enabled:!0}}};constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const i=Yu.prototype.parse.apply(this,[t,e]);if(0!==i)return Fr(i)&&i>0?i:null;this._zero=!0}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=Fr(t)?Math.max(0,t):null,this.max=Fr(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!Fr(this._userMin)&&(this.min=t===Ju(this.min,0)?Ju(this.min,-1):Ju(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let i=this.min,s=this.max;const o=e=>i=t?i:e,n=t=>s=e?s:t;i===s&&(i<=0?(o(1),n(10)):(o(Ju(i,-1)),n(Ju(s,1)))),i<=0&&o(Ju(s,-1)),s<=0&&n(Ju(i,1)),this.min=i,this.max=s}buildTicks(){const t=this.options,e=tp({min:this._userMin,max:this._userMax},this);return"ticks"===t.bounds&&ma(e,this,"value"),t.reverse?(e.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),e}getLabelForValue(t){return void 0===t?"0":Xa(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=da(t),this._valueRange=da(this.max)-da(t)}getPixelForValue(t){return void 0!==t&&0!==t||(t=this.min),null===t||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(da(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}function ip(t){const e=t.ticks;if(e.display&&t.display){const t=Al(e.backdropPadding);return Br(e.font&&e.font.size,sl.font.size)+t.height}return 0}function sp(t,e,i,s,o){return t===s||t===o?{start:e-i/2,end:e+i/2}:t<s||t>o?{start:e-i,end:e}:{start:e,end:e+i}}function op(t){const e={l:t.left+t._padding.left,r:t.right-t._padding.right,t:t.top+t._padding.top,b:t.bottom-t._padding.bottom},i=Object.assign({},e),s=[],o=[],n=t._pointLabels.length,r=t.options.pointLabels,a=r.centerPointLabels?sa/n:0;for(let d=0;d<n;d++){const n=r.setContext(t.getPointLabelContext(d));o[d]=n.padding;const u=t.getPointPosition(d,t.drawingArea+o[d],a),p=Sl(n.font),g=(l=t.ctx,c=p,h=Rr(h=t._pointLabels[d])?h:[h],{w:nl(l,c.string,h),h:h.length*c.lineHeight});s[d]=g;const f=ka(t.getIndexAngle(d)+a),m=Math.round(va(f));np(i,e,f,sp(m,u.x,g.w,0,180),sp(m,u.y,g.h,90,270))}var l,c,h;t.setCenterPoint(e.l-i.l,i.r-e.r,e.t-i.t,i.b-e.b),t._pointLabelItems=function(t,e,i){const s=[],o=t._pointLabels.length,n=t.options,r=ip(n)/2,a=t.drawingArea,l=n.pointLabels.centerPointLabels?sa/o:0;for(let n=0;n<o;n++){const o=t.getPointPosition(n,a+r+i[n],l),c=Math.round(va(ka(o.angle+la))),h=e[n],d=lp(o.y,h.h,c),u=rp(c),p=ap(o.x,h.w,u);s.push({x:o.x,y:d,textAlign:u,left:p,top:d,right:p+h.w,bottom:d+h.h})}return s}(t,s,o)}function np(t,e,i,s,o){const n=Math.abs(Math.sin(i)),r=Math.abs(Math.cos(i));let a=0,l=0;s.start<e.l?(a=(e.l-s.start)/n,t.l=Math.min(t.l,e.l-a)):s.end>e.r&&(a=(s.end-e.r)/n,t.r=Math.max(t.r,e.r+a)),o.start<e.t?(l=(e.t-o.start)/r,t.t=Math.min(t.t,e.t-l)):o.end>e.b&&(l=(o.end-e.b)/r,t.b=Math.max(t.b,e.b+l))}function rp(t){return 0===t||180===t?"center":t<180?"left":"right"}function ap(t,e,i){return"right"===i?t-=e:"center"===i&&(t-=e/2),t}function lp(t,e,i){return 90===i||270===i?t-=e/2:(i>270||i<90)&&(t-=e),t}function cp(t,e,i,s){const{ctx:o}=t;if(i)o.arc(t.xCenter,t.yCenter,e,0,oa);else{let i=t.getPointPosition(0,e);o.moveTo(i.x,i.y);for(let n=1;n<s;n++)i=t.getPointPosition(n,e),o.lineTo(i.x,i.y)}}class hp extends Yu{static id="radialLinear";static defaults={display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Ja.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback:t=>t,padding:5,centerPointLabels:!1}};static defaultRoutes={"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"};static descriptors={angleLines:{_fallback:"grid"}};constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=Al(ip(this.options)/2),e=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(e,i)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=Fr(t)&&!isNaN(t)?t:0,this.max=Fr(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/ip(this.options))}generateTickLabels(t){Yu.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map(((t,e)=>{const i=Hr(this.options.pointLabels.callback,[t,e],this);return i||0===i?i:""})).filter(((t,e)=>this.chart.getDataVisibility(e)))}fit(){const t=this.options;t.display&&t.pointLabels.display?op(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,i,s){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,i,s))}getIndexAngle(t){return ka(t*(oa/(this._pointLabels.length||1))+ba(this.options.startAngle||0))}getDistanceFromCenterForValue(t){if(Lr(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(Lr(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const i=e[t];return function(t,e,i){return El(t,{label:i,index:e,type:"pointLabel"})}(this.getContext(),t,i)}}getPointPosition(t,e,i=0){const s=this.getIndexAngle(t)-la+i;return{x:Math.cos(s)*e+this.xCenter,y:Math.sin(s)*e+this.yCenter,angle:s}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:i,right:s,bottom:o}=this._pointLabelItems[t];return{left:e,top:i,right:s,bottom:o}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),cp(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:i,grid:s,border:o}=e,n=this._pointLabels.length;let r,a,l;if(e.pointLabels.display&&function(t,e){const{ctx:i,options:{pointLabels:s}}=t;for(let o=e-1;o>=0;o--){const e=s.setContext(t.getPointLabelContext(o)),n=Sl(e.font),{x:r,y:a,textAlign:l,left:c,top:h,right:d,bottom:u}=t._pointLabelItems[o],{backdropColor:p}=e;if(!Lr(p)){const t=Cl(e.borderRadius),s=Al(e.backdropPadding);i.fillStyle=p;const o=c-s.left,n=h-s.top,r=d-c+s.width,a=u-h+s.height;Object.values(t).some((t=>0!==t))?(i.beginPath(),vl(i,{x:o,y:n,w:r,h:a,radius:t}),i.fill()):i.fillRect(o,n,r,a)}fl(i,t._pointLabels[o],r,a+n.lineHeight/2,n,{color:e.color,textAlign:l,textBaseline:"middle"})}}(this,n),s.display&&this.ticks.forEach(((t,e)=>{if(0!==e){a=this.getDistanceFromCenterForValue(t.value);const i=this.getContext(e),r=s.setContext(i),l=o.setContext(i);!function(t,e,i,s,o){const n=t.ctx,r=e.circular,{color:a,lineWidth:l}=e;!r&&!s||!a||!l||i<0||(n.save(),n.strokeStyle=a,n.lineWidth=l,n.setLineDash(o.dash),n.lineDashOffset=o.dashOffset,n.beginPath(),cp(t,i,r,s),n.closePath(),n.stroke(),n.restore())}(this,r,a,n,l)}})),i.display){for(t.save(),r=n-1;r>=0;r--){const s=i.setContext(this.getPointLabelContext(r)),{color:o,lineWidth:n}=s;n&&o&&(t.lineWidth=n,t.strokeStyle=o,t.setLineDash(s.borderDash),t.lineDashOffset=s.borderDashOffset,a=this.getDistanceFromCenterForValue(e.ticks.reverse?this.min:this.max),l=this.getPointPosition(r,a),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(l.x,l.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,i=e.ticks;if(!i.display)return;const s=this.getIndexAngle(0);let o,n;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach(((s,r)=>{if(0===r&&!e.reverse)return;const a=i.setContext(this.getContext(r)),l=Sl(a.font);if(o=this.getDistanceFromCenterForValue(this.ticks[r].value),a.showLabelBackdrop){t.font=l.string,n=t.measureText(s.label).width,t.fillStyle=a.backdropColor;const e=Al(a.backdropPadding);t.fillRect(-n/2-e.left,-o-l.size/2-e.top,n+e.width,l.size+e.height)}fl(t,s.label,0,-o,l,{color:a.color})})),t.restore()}drawTitle(){}}const dp={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},up=Object.keys(dp);function pp(t,e){return t-e}function gp(t,e){if(Lr(e))return null;const i=t._adapter,{parser:s,round:o,isoWeekday:n}=t._parseOpts;let r=e;return"function"==typeof s&&(r=s(r)),Fr(r)||(r="string"==typeof s?i.parse(r,s):i.parse(r)),null===r?null:(o&&(r="week"!==o||!fa(n)&&!0!==n?i.startOf(r,o):i.startOf(r,"isoWeek",n)),+r)}function fp(t,e,i,s){const o=up.length;for(let n=up.indexOf(t);n<o-1;++n){const t=dp[up[n]],o=t.steps?t.steps:Number.MAX_SAFE_INTEGER;if(t.common&&Math.ceil((i-e)/(o*t.size))<=s)return up[n]}return up[o-1]}function mp(t,e,i){if(i){if(i.length){const{lo:s,hi:o}=Sa(i,e);t[i[s]>=e?i[s]:i[o]]=!0}}else t[e]=!0}function bp(t,e,i){const s=[],o={},n=e.length;let r,a;for(r=0;r<n;++r)a=e[r],o[a]=r,s.push({value:a,major:!1});return 0!==n&&i?function(t,e,i,s){const o=t._adapter,n=+o.startOf(e[0].value,s),r=e[e.length-1].value;let a,l;for(a=n;a<=r;a=+o.add(a,1,s))l=i[a],l>=0&&(e[l].major=!0);return e}(t,s,o,i):s}class vp extends Jh{static id="time";static defaults={bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}};constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const i=t.time||(t.time={}),s=this._adapter=new ih(t.adapters.date);s.init(e),Xr(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return void 0===t?null:gp(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,i=t.time.unit||"day";let{min:s,max:o,minDefined:n,maxDefined:r}=this.getUserBounds();function a(t){n||isNaN(t.min)||(s=Math.min(s,t.min)),r||isNaN(t.max)||(o=Math.max(o,t.max))}n&&r||(a(this._getLabelBounds()),"ticks"===t.bounds&&"labels"===t.ticks.source||a(this.getMinMax(!1))),s=Fr(s)&&!isNaN(s)?s:+e.startOf(Date.now(),i),o=Fr(o)&&!isNaN(o)?o:+e.endOf(Date.now(),i)+1,this.min=Math.min(s,o-1),this.max=Math.max(s+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],i=t[t.length-1]),{min:e,max:i}}buildTicks(){const t=this.options,e=t.time,i=t.ticks,s="labels"===i.source?this.getLabelTimestamps():this._generate();"ticks"===t.bounds&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const o=this.min,n=function(t,e,i){let s=0,o=t.length;for(;s<o&&t[s]<e;)s++;for(;o>s&&t[o-1]>i;)o--;return s>0||o<t.length?t.slice(s,o):t}(s,o,this.max);return this._unit=e.unit||(i.autoSkip?fp(e.minUnit,this.min,this.max,this._getLabelCapacity(o)):function(t,e,i,s,o){for(let n=up.length-1;n>=up.indexOf(i);n--){const i=up[n];if(dp[i].common&&t._adapter.diff(o,s,i)>=e-1)return i}return up[i?up.indexOf(i):0]}(this,n.length,e.minUnit,this.min,this.max)),this._majorUnit=i.major.enabled&&"year"!==this._unit?function(t){for(let e=up.indexOf(t)+1,i=up.length;e<i;++e)if(dp[up[e]].common)return up[e]}(this._unit):void 0,this.initOffsets(s),t.reverse&&n.reverse(),bp(this,n,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map((t=>+t.value)))}initOffsets(t=[]){let e,i,s=0,o=0;this.options.offset&&t.length&&(e=this.getDecimalForValue(t[0]),s=1===t.length?1-e:(this.getDecimalForValue(t[1])-e)/2,i=this.getDecimalForValue(t[t.length-1]),o=1===t.length?i:(i-this.getDecimalForValue(t[t.length-2]))/2);const n=t.length<3?.5:.25;s=Ca(s,0,n),o=Ca(o,0,n),this._offsets={start:s,end:o,factor:1/(s+1+o)}}_generate(){const t=this._adapter,e=this.min,i=this.max,s=this.options,o=s.time,n=o.unit||fp(o.minUnit,e,i,this._getLabelCapacity(e)),r=Br(s.ticks.stepSize,1),a="week"===n&&o.isoWeekday,l=fa(a)||!0===a,c={};let h,d,u=e;if(l&&(u=+t.startOf(u,"isoWeek",a)),u=+t.startOf(u,l?"day":n),t.diff(i,e,n)>1e5*r)throw new Error(e+" and "+i+" are too far apart with stepSize of "+r+" "+n);const p="data"===s.ticks.source&&this.getDataTimestamps();for(h=u,d=0;h<i;h=+t.add(h,r,n),d++)mp(c,h,p);return h!==i&&"ticks"!==s.bounds&&1!==d||mp(c,h,p),Object.keys(c).sort(((t,e)=>t-e)).map((t=>+t))}getLabelForValue(t){const e=this._adapter,i=this.options.time;return i.tooltipFormat?e.format(t,i.tooltipFormat):e.format(t,i.displayFormats.datetime)}format(t,e){const i=this.options.time.displayFormats,s=this._unit,o=e||i[s];return this._adapter.format(t,o)}_tickFormatFunction(t,e,i,s){const o=this.options,n=o.ticks.callback;if(n)return Hr(n,[t,e,i],this);const r=o.time.displayFormats,a=this._unit,l=this._majorUnit,c=a&&r[a],h=l&&r[l],d=i[e],u=l&&h&&d&&d.major;return this._adapter.format(t,s||(u?h:c))}generateTickLabels(t){let e,i,s;for(e=0,i=t.length;e<i;++e)s=t[e],s.label=this._tickFormatFunction(s.value,e,t)}getDecimalForValue(t){return null===t?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+i)*e.factor)}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,i=this.ctx.measureText(t).width,s=ba(this.isHorizontal()?e.maxRotation:e.minRotation),o=Math.cos(s),n=Math.sin(s),r=this._resolveTickFontOptions(0).size;return{w:i*o+r*n,h:i*n+r*o}}_getLabelCapacity(t){const e=this.options.time,i=e.displayFormats,s=i[e.unit]||i.millisecond,o=this._tickFormatFunction(t,0,bp(this,[t],this._majorUnit),s),n=this._getLabelSize(o),r=Math.floor(this.isHorizontal()?this.width/n.w:this.height/n.h)-1;return r>0?r:1}getDataTimestamps(){let t,e,i=this._cache.data||[];if(i.length)return i;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(t=0,e=s.length;t<e;++t)i=i.concat(s[t].controller.getAllParsedValues(this));return this._cache.data=this.normalize(i)}getLabelTimestamps(){const t=this._cache.labels||[];let e,i;if(t.length)return t;const s=this.getLabels();for(e=0,i=s.length;e<i;++e)t.push(gp(this,s[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Oa(t.sort(pp))}}function yp(t,e,i){let s,o,n,r,a=0,l=t.length-1;i?(e>=t[a].pos&&e<=t[l].pos&&({lo:a,hi:l}=Ma(t,"pos",e)),({pos:s,time:n}=t[a]),({pos:o,time:r}=t[l])):(e>=t[a].time&&e<=t[l].time&&({lo:a,hi:l}=Ma(t,"time",e)),({time:s,pos:n}=t[a]),({time:o,pos:r}=t[l]));const c=o-s;return c?n+(r-n)*(e-s)/c:n}var xp=Object.freeze({__proto__:null,CategoryScale:class extends Jh{static id="category";static defaults={ticks:{callback:Wu}};constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const t=this.getLabels();for(const{index:i,label:s}of e)t[i]===s&&t.splice(i,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(Lr(t))return null;const i=this.getLabels();return e=isFinite(e)&&i[e]===t?e:function(t,e,i,s){const o=t.indexOf(e);return-1===o?Uu(t,e,i,s):o!==t.lastIndexOf(e)?i:o}(i,t,Br(e,t),this._addedLabels),((t,e)=>null===t?null:Ca(Math.round(t),0,e))(e,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);"ticks"===this.options.bounds&&(t||(i=0),e||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,e=this.max,i=this.options.offset,s=[];let o=this.getLabels();o=0===t&&e===o.length-1?o:o.slice(t,e+1),this._valueRange=Math.max(o.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let i=t;i<=e;i++)s.push({value:i});return s}getLabelForValue(t){return Wu.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return"number"!=typeof t&&(t=this.parse(t)),null===t?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}},LinearScale:Xu,LogarithmicScale:ep,RadialLinearScale:hp,TimeScale:vp,TimeSeriesScale:class extends vp{static id="timeseries";static defaults=vp.defaults;constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=yp(e,this.min),this._tableRange=yp(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:i}=this,s=[],o=[];let n,r,a,l,c;for(n=0,r=t.length;n<r;++n)l=t[n],l>=e&&l<=i&&s.push(l);if(s.length<2)return[{time:e,pos:0},{time:i,pos:1}];for(n=0,r=s.length;n<r;++n)c=s[n+1],a=s[n-1],l=s[n],Math.round((c+a)/2)!==l&&o.push({time:l,pos:n/(r-1)});return o}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),i=this.getLabelTimestamps();return t=e.length&&i.length?this.normalize(e.concat(i)):e.length?e:i,t=this._cache.all=t,t}getDecimalForValue(t){return(yp(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return yp(this._table,i*this._tableRange+this._minPos,!0)}}});const _p=[Qc,qd,ju,xp];$d.register(..._p);let wp=class extends jo{constructor(){super()}createRenderRoot(){return this}fill(){const t=this.querySelector("canvas").getContext("2d");return new $d(t,{type:"line",data:{labels:["januar","february","march","april,","may","juni","juli","august"],datasets:[{label:"My First Dataset",data:[65,59,80,81,56,55,40],fill:!1,borderColor:"rgb(75, 192, 192)",tension:.1}]},options:{onClick:t=>{},plugins:{legend:{display:!1}}}})}render(){return ko`<sl-card class="card-overview graph-cards">
            <div>
                <canvas></canvas>
            </div>

            <div slot="footer">data in a chart</div>
        </sl-card>`}};wp=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}([$n(),Wo("graph-card")],wp);var kp=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let $p=class extends jo{name="";constructor(){super()}createRenderRoot(){return this}#r({rows:t},e){return[...new Array(t)].map((function(t,i){return ko`<div class="view-row">${e[i]}</div>`}))}setActive(){}render(t=""){const e=vn.items.find((t=>t.name===this.name)),i=Object.freeze({analytics:ko`<h1 class="view-headline">${Xn(Kn("analytics"))}</h1>`,dashboard:ko`<h1 class="view-headline">${Xn(Kn("dashboard"))}</h1>`,calendar:ko`<h1 class="view-headline">${Xn(Kn("calendar"))}</h1>`,profile:ko`<h1 class="view-headline">${Xn(Kn("profile"))}</h1>`});return ko`<div class="view-container">
            <header>${i[this.name]}</header>
            <div class="view-content grid-cols-${e.rows}">${this.#r(e,t)}</div>
        </div>`}};kp([Ko({attribute:!0,reflect:!0})],$p.prototype,"name",void 0),$p=kp([$n(),Wo("view-layout")],$p);var Cp=$p;const Ap=["de-CH-1901"],{getLocale:Sp,setLocale:Mp}=(Ep={sourceLocale:"en",targetLocales:Ap,loadLocale:t=>import(`/js/locales/${t}.js`)},function(t){if(Yn)throw new Error("lit-localize can only be configured once");Kn=t,Yn=!0}(((t,e)=>Ln(Nn,t,e))),Hn=Fn=Ep.sourceLocale,Vn=new Set(Ep.targetLocales),Vn.add(Ep.sourceLocale),Bn=Ep.loadLocale,{getLocale:Wn,setLocale:qn});var Ep;const Pp=[{code:"en",name:"English"},{code:"de-CH-1901",name:"German"}],Tp=function(t){switch(!0){case t.indexOf("edge")>-1:return"MS Edge";case t.indexOf("edg/")>-1:return"Edge ( chromium based)";case t.indexOf("opr")>-1&&!!window?.opr:return"Opera";case t.indexOf("chrome")>-1&&!!window?.chrome:return"Chrome";case t.indexOf("trident")>-1:return"MS IE";case t.indexOf("firefox")>-1:return"Mozilla Firefox";case t.indexOf("safari")>-1:return"Safari";default:return"other"}}(window.navigator.userAgent.toLowerCase()),Op=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),Dp=/iPad|iPhone|iPod/.test(navigator.userAgent)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1;navigator.userAgent.indexOf("Firefox");const zp=!Op,Lp={ua:navigator.userAgent,timezone:(new Date).getTimezoneOffset()/60,screen:{width:screen.width,height:screen.height},browser:{name:Tp},user:{language:localStorage.getItem("language")||navigator.language},system:{language:navigator.language,platform:navigator.platform,isDesktop:zp,isIOS:Dp,isPhone:Op}},Rp={primary:"info-circle",success:"check2-circle",neutral:"gear",warning:"exclamation-triangle",danger:"exclamation-octagon"};function Ip(t,e,i){const s=Object.assign(document.createElement("sl-alert"),{variant:t,closable:!0,duration:3e3,innerHTML:`\n          <sl-icon name="${Rp[t]}" slot="icon"></sl-icon>\n          <strong>${e}</strong><br />${i}\n        `});document.body.append(s),s.toast()}const Fp=Object.freeze({resolution:{large:224,medium:128,small:44},file:{maxSize:4194304}});var Vp=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};const Bp="team-member-active",Np={_id:"",username:"",role:"",roleName:"",email:"",about:"",avatar:"",member:void 0,isSuperAdmin:!1};let Hp=class extends Cp{rights={_id:"",name:"",addTeamMember:!1,removeTeamMember:!1,changeTeamMemberRole:!1,changeTeamMemberRights:!1,createRole:!1};me=structuredClone(Np);user=structuredClone(Np);team={_id:"",maxMembers:0,name:"loading…",members:[structuredClone(Np)]};roles=[{_id:"",name:"member",teamId:"",__v:0}];activeSearchResults="0";constructor(){super()}updated(){const t=localStorage.getItem("lang");t&&"en"!==t&&Mp(t)}async connectedCallback(){const t=await fetch("/v1/user/me"),e=await t.json(),i=await this.#a(),s=await this.#l();super.connectedCallback(),this.#c(),this.rights=s,this.team=i,this.me=e}createRenderRoot(){return this}async#l(){const t=await fetch("/v1/role/getRole",{method:"GET",...Gn});return await t.json()}async#c(){const t=await fetch("/v1/user/me",{method:"GET",...Gn}),e=await t.json();return this.me=e,e}async#h(t){const e=await this.#c(),i=t.username===e.username.toLowerCase(),s=t.email===e.email,o=t.about===(e.about||"");return!(i&&s&&o)}async#d(){const t=this.querySelector("#username"),e=this.querySelector("#mail"),i=this.querySelector("#about"),s={username:t.value.trim().toLowerCase(),email:e.value,about:i.value.trim()};if(!await this.#h(s))return Ip("neutral",Kn("User Update"),Kn("Change user details to trigger an update"));const o=await fetch("/v1/user/getUser",{method:"POST",...Gn,body:JSON.stringify({client:Lp,data:s})}),n=await o.json();n.acknowledged&&Ip("success",Kn("User Update"),Kn("Changes saved")),n.refresh&&setTimeout((()=>{location.reload()}),2500)}async#u(){return await fetch("/logout",{method:"GET",...Gn}),location.reload()}#p({target:{value:t}}){Mp(t),localStorage.setItem("lang",t),document.querySelector("html")?.setAttribute("lang",t)}#g(){const t=localStorage.getItem("lang")||Pp[0].code;return ko`<sl-select
            size="small"
            @sl-change="${this.#p}"
            label="${Xn(Kn("language"))}"
            value="${t}"
            class="md:w-1/4"
        >
            ${rn(Pp,(function({name:t,code:e}){return ko`<sl-option size="small" value="${e}">${t}</sl-option>`}))}
        </sl-select>`}async#f(t){const e=await fetch("/checkPassword",{method:"POST",...Gn,body:JSON.stringify({data:{password:t},client:Lp})}),{auth:i}=await e.json();return i}async#m(t){const e=await fetch("/changePassword",{method:"POST",...Gn,body:JSON.stringify({data:{password:t},client:Lp})});return(await e.json()).status.acknowledged}async#b(){const t=this.querySelector("#oldpassword"),e=this.querySelector("#newpassword"),i=this.querySelector("#newpasswordconfirm"),s=t.value,o=e.value,n=i.value,r=o===n,a=await this.#c();return""===s||""===o||""===n?Ip("warning",Kn("New Password"),Kn("Please fill out all fields")):r?s===o?Ip("warning",Kn("New Password"),Kn("Old password and new password are the same")):await this.#f(s)?o.length<8?Ip("warning",Kn("New Password"),Kn("New password is too short, min 8 characterss")):o.length>35?Ip("warning",Kn("New Password"),Kn("New password is too long, max 35 characters")):o.includes(" ")?Ip("warning",Kn("New Password"),Kn("New password cannot contain spaces")):a.username===o?Ip("warning",Kn("New Password"),Kn("New password cannot be the same as your username")):/\d/.test(o)?/[a-z]/.test(o)?/[A-Z]/.test(o)?await this.#m(o)?(setTimeout((()=>location.reload()),4e3),Ip("success",Kn("New Password"),Kn("Password changed successfully, refresh in 5 seconds"))):Ip("danger",Kn("New Password"),Kn("Something went wrong")):Ip("warning",Kn("New Password"),Kn("New password must contain at least one uppercase letter")):Ip("warning",Kn("New Password"),Kn("New password must contain at least one lowercase letter")):Ip("warning",Kn("New Password"),Kn("New password must contain at least one number")):Ip("warning",Kn("New Password"),Kn("Old password is wrong")):Ip("warning",Kn("New Password"),Kn("New password doesn't match"))}async#v(t,e,i){const s=await fetch("/v1/user/changeAvatar",{method:"POST",...Gn,body:JSON.stringify({data:{type:t.type,name:t.name,size:t.size,lastModified:t.lastModified,width:e.width,height:e.height,file:i.target?.result},client:Lp})});return await s.json(),Ip("success",Kn("avatar"),Kn("Avatar changed successfully, refresh to see changes"))}async#y(t){const e=new FileReader,i=t.target.files[0],s=document.createElement("img"),o=URL.createObjectURL(i);e.onload=t=>{s.src=o,s.onload=()=>i.size>Fp.file.maxSize?Ip("warning",Kn("avatar"),Kn("Image is too big, max 4mb")):s.width<Fp.resolution.large||s.height<Fp.resolution.large?Ip("warning",Kn("avatar"),Kn("Image is too small, min 224x224")):(this.#v(i,s,t),void URL.revokeObjectURL(o))},e.readAsDataURL(i)}#x(){this.querySelector('input[type="file"]').click()}#_(){return ko`<div class="account-section">
                <div>
                    <div class="grid grid-rows-1 md:grid-cols-2 md:gap-4">
                        <sl-input
                            id="username"
                            minlength="3"
                            maxlength="20"
                            label="${Xn(Kn("username"))}"
                            size="small"
                            value="${this.me.username}"
                        ></sl-input>
                        <sl-input
                            id="mail"
                            label="${Xn(Kn("Email address"))}"
                            type="email"
                            size="small"
                            value="${this.me.email}"
                        >
                            <sl-icon name="envelope-at" slot="prefix"></sl-icon>
                        </sl-input>
                    </div>

                    <sl-textarea
                        id="about"
                        maxlength="${560}"
                        resize="none"
                        size="small"
                        rows="7"
                        help-text="${Kn("write something about you")}"
                        label="${Xn(Kn("about"))}"
                        value="${this.me.about}"
                    ></sl-textarea>
                </div>
                <div>
                    <p>${Xn(Kn("photo"))}</p>
                    <sl-tooltip content="${Kn("click to upload new avatar")}" placement="top">
                        <sl-avatar
                            @click="${this.#x}"
                            style="--size: 14rem;"
                            image="${this.me.avatar?`${this.me.avatar}avatar_large.webp`:Jn.avatar}"
                            )}"
                        ></sl-avatar>
                        <input
                            @change="${this.#y}"
                            type="file"
                            class="hidden"
                            accept="image/jpeg,image/jpg,image/webp,image/png"
                        />
                    </sl-tooltip>
                </div>
            </div>
            <sl-divider style="--width: 2px;"></sl-divider>
            ${this.#g()}
            <sl-divider style="--width: 2px;"></sl-divider>
            <div>
                <sl-button size="small" variant="danger" @click="${this.#u}">logout</sl-button>
                <sl-button size="small" variant="primary" class="float-right" @click="${this.#d}"
                    >${Kn("save")}</sl-button
                >
            </div>`}#w(){return ko`<div class="password-section">
            <sl-input
                id="oldpassword"
                size="small"
                label="${Xn(Kn("Old Password"))}:"
                type="password"
                password-toggle
            >
            </sl-input>
            <sl-input
                id="newpassword"
                size="small"
                minlength="${8}"
                maxlength="${35}"
                label="${Xn(Kn("New Password"))}:"
                type="password"
                password-toggle
            ></sl-input>
            <sl-input
                id="newpasswordconfirm"
                size="small"
                minlength="${8}"
                maxlength="${35}"
                label="${Xn(Kn("Confirm New Password"))}:"
                type="password"
                password-toggle
            ></sl-input>
            <sl-button @click="${this.#b}" class="mt-4" size="small" variant="danger"
                >${Kn("update password")}</sl-button
            >
        </div>`}#k(){if(!this.querySelector(`.team-member.${Bp}`)){const t=this?.querySelector(".team-member"),e=t?.getAttribute("data-id"),i=this.team.members.find((t=>t._id===e));if(i)return this.#$(i)}}async#C(){const t=await fetch("/v1/role/getRoles",{method:"GET",...Gn});return await t.json()}async#a(){const t=await fetch("/v1/team",{method:"GET",...Gn});return await t.json()}async#A(){this.team=await this.#a();const t=await fetch("/v1/user/getUsers",{method:"POST",...Gn,body:JSON.stringify({data:{ids:this.team.members},client:Lp})}),e=(await t.json()).sort(((t,e)=>t.username.localeCompare(e.username))),i=await this.#C();this.roles=i,this.team.members=this.team.members.map(((t,i)=>({member:t,...e[i]}))),"0"===this.activeSearchResults&&(this.activeSearchResults=this.team.members.length+""),this.requestUpdate(),requestAnimationFrame((()=>{this.#k()}))}async#S(){this.roles=await this.#C(),this.requestUpdate()}async#M({detail:{name:t}}){return"team"===t?await this.#A():"role"===t?await this.#S():void 0}#$(t){const e=this.querySelector(`.team-member.${Bp}`),i=e?.getAttribute("data-id");if(this.user=t,i!==t._id){const i=this?.querySelector(`.team-member[data-id="${t._id}"]`);return e?.classList.remove(Bp),i.classList.add(Bp),this.requestUpdate()}}#E(){const t=this.querySelector("#remove-team-member-dialog");t?.hide()}#P(){const t=this.querySelector("#add-member-dialog");t?.hide()}#T(){const t=this.querySelector("#remove-team-member-dialog");t?.show()}async#O(){const t=this.querySelector("#remove-team-member");t.disabled=!0;const e=await fetch("/v1/team/removeMember",{method:"POST",...Gn,body:JSON.stringify({data:{member:this.user},client:Lp})});return await e.json(),await this.#M({detail:{name:"team"}}),this.#E(),this.activeSearchResults=parseInt(this.activeSearchResults)-1+"",t.disabled=!1,Ip("success",Kn("team"),Kn("member removed successfully"))}async#D({target:t}){const e=t.value,i=this.team.members.find((t=>t._id===this.user._id));if(!e||!i||e===this.user.roleName)return;const s=await fetch("/v1/team/changeRole",{method:"POST",...Gn,body:JSON.stringify({data:{member:this.user,role:e},client:Lp})});return await s.json(),i.roleName=e,this.user.roleName=e,this.requestUpdate(),Ip("success",Kn("role"),Kn("role changed successfully"))}async#z(){const t=this.querySelector("#add-member-email"),e=this.querySelector("#add-member-dialog"),i=this.querySelector("#add-member-role");if(!t.checkValidity())return;const s=await fetch("/v1/team/addMember",{method:"POST",...Gn,body:JSON.stringify({data:{member:this.user,email:t.value,roleName:i.value},client:Lp})}),o=await s.json();return o.error?Ip("warning",Kn("team"),o.error):(e?.hide(),this.#A(),Ip("success",Kn("team"),Kn("member added successfully")))}#L(){const t=this.querySelector("#add-member-dialog"),e=this.querySelector("#add-member-email");return t?.show(),setTimeout((()=>e.focus()),400)}#R(){const t=Kn("Are you sure you want to remove {{1}} from {{2}}?").replace("{{1}}",this.user.username).replace("{{2}}",this.team.name);return ko`<sl-dialog
            label="${Xn(Kn("attention"))}"
            class="dialog-overview"
            id="remove-team-member-dialog"
        >
            ${t}
            <sl-button
                @click="${this.#O}"
                id="remove-team-member"
                class="float-left"
                slot="footer"
                variant="danger"
                >${Kn("yes")}</sl-button
            >
            <sl-button @click="${this.#E}" slot="footer" variant="neutral"
                >${Kn("no")}</sl-button
            >
        </sl-dialog>`}#I(t){return ko`<sl-dialog
            label="${Kn("Add a new member to the team")}"
            class="dialog-overview"
            id="add-member-dialog"
        >
            <p class="text-gray-600 select-none">${Kn("New member role")}</p>
            <sl-select class="w-1/2" size="small" value="${this.roles[0].name}" id="add-member-role" hoist
                >${t}</sl-select
            >
            <sl-input
                class="w-full"
                size="small"
                type="email"
                label="${Xn(Kn("E-Mail"))}"
                id="add-member-email"
            >
                <sl-icon name="envelope-at" type="text" slot="prefix"></sl-icon>
            </sl-input>
            <sl-button @click="${this.#z}" class="float-left" slot="footer" variant="danger"
                >${Kn("yes")}</sl-button
            >
            <sl-button @click="${this.#P}" slot="footer" variant="neutral">${Kn("no")}</sl-button>
        </sl-dialog>`}#F({target:t}){const e=t.value.toLowerCase(),i=this.team.members.filter((t=>t.username.toLowerCase().includes(e))).map((t=>t._id)),s=[...this.querySelectorAll(".team-member")];return""===e?(this.activeSearchResults=this.team.members.length+"",s.forEach((t=>t.classList.remove("!hidden"))),this.requestUpdate()):(s.forEach((t=>i.includes(t.getAttribute("data-id"))?t.classList.remove("!hidden"):t.classList.add("!hidden"))),this.activeSearchResults=i.length+"",this.requestUpdate())}#V(){const t=ko`<sl-button
            variant="danger"
            size="small"
            class="float-right"
            @click="${this.#T}"
        >
            <sl-icon slot="prefix" name="x-lg"></sl-icon>Remove</sl-button
        >`,e=ko`<sl-button variant="danger" size="small" class="float-right" disabled>
            <sl-icon slot="prefix" name="x-lg"></sl-icon>Remove</sl-button
        >`,i=ko`<div>
            <p class="text-gray-600 select-none">${Xn(Kn("Super Admin"))}</p>
            <sl-icon name="check2-all"></sl-icon>
        </div>`,s=rn(this.roles,(t=>t._id),(t=>ko`<sl-option value="${t.name}">${t.name}</sl-option>`));return ko`<div class="team-section">
                <div class="team-section-inner">
                    <div class="flex items-end gap-2">
                        <sl-input
                            @keyup="${this.#F}"
                            class="w-full"
                            size="small"
                            label="${Xn(Kn("search"))} ${Kn("team members")}  ${this.activeSearchResults} / ${this.team.members.length}"
                        >
                            <sl-icon name="search" type="text" slot="prefix"></sl-icon>
                        </sl-input>
                        ${this.rights.addTeamMember?ko`<sl-button variant="success" size="small" @click="${this.#L}">
                                  <sl-icon slot="prefix" name="plus-lg"></sl-icon>
                              </sl-button>`:ko`<sl-button variant="success" size="small" disabled>
                                  <sl-icon slot="prefix" name="plus-lg"></sl-icon>
                              </sl-button>`}
                    </div>
                    <div class="team-section-members">
                        ${rn(this.team.members,(t=>t._id),(t=>ko`<div
                                    class="team-member"
                                    @click="${()=>this.#$(t)}"
                                    @keyup="${()=>this.#$(t)}"
                                    data-id="${t._id}"
                                    tabindex="0"
                                >
                                    <sl-avatar
                                        image="${t.avatar?`${t.avatar}avatar_small.webp`:Jn.avatar}"
                                    ></sl-avatar>
                                    <div>
                                        <p>${t.username}</p>
                                        <p>${Kn("role")}: ${t.roleName}</p>
                                    </div>
                                </div>`))}
                    </div>
                </div>
                <div class="selected-team-section">
                    <div>
                        <sl-avatar
                            style="--size: 8rem;"
                            image="${this.user.avatar?`${this.user.avatar}avatar_medium.webp`:Jn.avatar}"
                        ></sl-avatar>
                        ${this.me._id!==this.user._id&&this.rights.removeTeamMember?t:e}
                    </div>
                    <sl-divider style="--width: 2px;"></sl-divider>
                    <div class="selected-team-section-stats grid-cols-2">
                        <div>
                            <p class="text-gray-600 select-none">${Xn(Kn("role"))}</p>

                            ${this.rights.changeTeamMemberRole&&this.me._id!==this.user._id?ko`<sl-select
                                      class="w-1/2"
                                      size="small"
                                      value="${this.user.roleName}"
                                      @sl-change="${this.#D}"
                                  >
                                      ${s}
                                  </sl-select>`:ko`<sl-select class="w-1/2" size="small" value="${this.user.roleName}" disabled>
                                      ${s}
                                  </sl-select>`}
                        </div>
                        <div>
                            <p class="text-gray-600 select-none">${Xn(Kn("name"))}</p>
                            <p>${this.user.username}</p>
                        </div>
                        <div>
                            <p class="text-gray-600 select-none">${Kn("Email address")}</p>
                            <a href="mailto:${this.user.email}">${this.user.email}</a>
                        </div>
                        <div>
                            <p class="text-gray-600 select-none">${Xn(Kn("team"))}</p>
                            <p>${this.team.name}</p>
                        </div>

                        ${this.user.isSuperAdmin?i:""}
                    </div>

                    <div>
                        <p class="text-gray-600 select-none">${Xn(Kn("about"))}</p>
                        <p>${this.user.about}</p>
                    </div>
                    <br />
                </div>
            </div>
            ${this.#R()} ${this.#I(s)}`}async#B(){const t=this.querySelector("#selected-role").value,e=this.querySelector("#selected-role");if("member"===t||"admin"===t)return Ip("warning",Kn("role"),Kn("You cannot remove member or admin role"));const i=await fetch("/v1/role/removeRole",{method:"POST",...Gn,body:JSON.stringify({data:{name:t},client:Lp})}),s=await i.json();return s.success?(this.#N(),Ip("success",Kn("role"),Kn("You have successfully removed the role {{1}}").replace("{{1}}",t)),e?.setAttribute("value","member"),this.#S()):"ROLE_IN_USE"===s.problem?Ip("warning",Kn("role"),Kn("This role is still in use. Edit all the role of the following user(s): {{1}}.").replace("{{1}}",s.userThatHasRole.join(","))):void 0}#H(){this.querySelector("#remove-role-dialog").show()}#N(){this.querySelector("#remove-role-dialog").hide()}#j(){this.querySelector("#add-new-role-dialog").hide()}async#U(){const t=this.querySelector("#add-new-role-dialog sl-input").value.trim(),e=await this.#C();if(t.length<3)return Ip("warning",Kn("role"),Kn("Role name has to be at least 3 characters long"));if(e.includes(t))return Ip("warning",Kn("role"),Kn("Role already exists"));const i=await fetch("/v1/role/createRole",{method:"POST",...Gn,body:JSON.stringify({data:{name:t,teamId:this.team._id},client:Lp})});return(await i.json()).success?(this.#j(),Ip("success",Kn("role"),Kn("You have successfully created a new role")),this.#S()):void 0}#W(){const t=this.querySelector("#add-new-role-dialog"),e=this.querySelector("#add-new-role-dialog sl-input");t.show(),setTimeout((()=>e.focus()),400)}#q(){const t=this.querySelector("#selected-role").value,e=this.roles.find((e=>e.name===t));if(e){const{__v:t,_id:i,name:s,teamId:o,...n}=e;Object.entries(n).forEach((([t,e])=>{this.querySelector(`#role-${t.toLocaleLowerCase()}`).checked=e})),this.requestUpdate()}}async#K({target:t}){const e=t.checked,i=t.dataset.key,s=this.querySelector("#selected-role").value,o=await fetch("/v1/role/updateRole",{method:"POST",...Gn,body:JSON.stringify({data:{name:s,update:{[i]:e}},client:Lp})}),n=await o.json(),r=await this.#C();1===n.modifiedCount?(this.roles=r,Ip("success",Kn("role"),Kn("You have successfully updated the role"))):Ip("warning",Kn("role"),Kn("Something went wrong"))}#Y(){const t=this.roles.find((t=>"member"===t.name))||this.roles[0],{__v:e,_id:i,name:s,teamId:o,...n}=t,r=Object.entries(n);return ko`<div class="roles-settings">
                <div class="flex flex-col gap-2">
                    <sl-select
                        @sl-change="${this.#q}"
                        id="selected-role"
                        label="${Xn(Kn("role"))}"
                        size="small"
                        value="member"
                        hoist
                    >
                        ${rn(this.roles,(t=>t._id),(function(t){return ko`<sl-option value="${t.name}">${t.name}</sl-option>`}))}</sl-select
                    >

                    <sl-button @click="${this.#W}" variant="success" size="small">
                        <sl-icon slot="prefix" name="plus-lg"></sl-icon>
                        ${Xn(Kn("add role"))}</sl-button
                    >
                    <sl-button @click="${this.#H}" variant="danger" size="small"
                        ><sl-icon slot="prefix" name="trash"></sl-icon>${Xn(Kn("remove role"))}</sl-button
                    >
                </div>
                <div class="rights-settings">
                    ${rn(r,(t=>t[0]),(([t,e])=>{const i=t.toLocaleLowerCase(),s=e?ko`<sl-switch
                                      @sl-change="${this.#K}"
                                      data-key="${t}"
                                      id="role-${i}"
                                      label="${t}"
                                      checked
                                  ></sl-switch>`:ko`<sl-switch
                                      @sl-change="${this.#K}"
                                      data-key="${t}"
                                      id="role-${i}"
                                      label="${t}"
                                  ></sl-switch>`;return ko` <p>${function(t){return Kn("addTeamMember"===t?"Add Team Member":"removeTeamMember"===t?"Remove Team Member":"changeTeamMemberRole"===t?"Change Team Member Role":"changeTeamMemberRights"===t?"Change Team Member Rights":"createRole"===t?"Team member can create roles":"Unknown")}(t)}</p>
                                ${s}
                                <p class="text-gray-600 select-none mb-4">${function(t){return Kn("addTeamMember"===t?"Team member can add other team members":"removeTeamMember"===t?"Team member can remove other team members":"changeTeamMemberRole"===t?"Team member can change the role of other team members":"changeTeamMemberRights"===t?"Team member can change the rights of other team members":"createRole"===t?"Team member can create new roles for other team member":"Unknown Rights, please add them to frontent/src/ts/utililties/trans/")}(t)}</p>
                                <i></i>`}))}
                </div>
            </div>
            <sl-dialog id="add-new-role-dialog" label="${Xn(Kn("role"))}">
                <sl-input label="${Kn("New role name")}" size="small"></sl-input>
                <sl-button @click="${this.#U}" class="float-left" slot="footer" variant="success"
                    >${Kn("accept")}</sl-button
                >
                <sl-button @click="${this.#j}" slot="footer" variant="neutral"
                    >${Kn("cancel")}</sl-button
                >
            </sl-dialog>
            <sl-dialog id="remove-role-dialog" label="${Xn(Kn("role"))}">
                <p>${Kn("Are you sure you want to remove this role?")}</p>
                <sl-button @click="${this.#B}" class="float-left" slot="footer" variant="danger"
                    >${Kn("yes")}</sl-button
                >
                <sl-button @click="${this.#N}" slot="footer" variant="neutral"
                    >${Kn("no")}</sl-button
                >
            </sl-dialog>`}#r(){const t=this.rights.createRole?ko`<sl-tab slot="nav" panel="role">${Xn(Kn("role"))}</sl-tab>`:ko`<sl-tab slot="nav" panel="role" disabled>${Xn(Kn("role"))}</sl-tab>`;return[ko`<sl-tab-group @sl-tab-show="${this.#M}">
            <sl-tab slot="nav" panel="account">${Xn(Kn("account"))}</sl-tab>
            <sl-tab slot="nav" panel="password">${Xn(Kn("password"))}</sl-tab>
            <sl-tab slot="nav" panel="team">${Xn(Kn("team"))}</sl-tab>
            ${t}
            <sl-tab-panel class="mt-8" name="account">${this.#_()}</sl-tab-panel>
            <sl-tab-panel class="mt-8" name="password">${this.#w()}</sl-tab-panel>
            <sl-tab-panel class="mt-8" name="team">${this.#V()}</sl-tab-panel>
            <sl-tab-panel class="mt-8" name="role">${this.#Y()}</sl-tab-panel>
        </sl-tab-group> `]}render(){const t=this.#r();return super.render(t)}};Vp([Ko()],Hp.prototype,"rights",void 0),Vp([Ko()],Hp.prototype,"me",void 0),Vp([Ko()],Hp.prototype,"user",void 0),Vp([Ko({type:Object,reflect:!0})],Hp.prototype,"team",void 0),Vp([Ko()],Hp.prototype,"roles",void 0),Vp([Ko()],Hp.prototype,"activeSearchResults",void 0),Hp=Vp([$n(),Wo("profile-layout")],Hp);let jp=class extends Cp{constructor(){super()}createRenderRoot(){return this}setActive(){const t=this.querySelector("graph-card");t?.fill()}#r(){return[ko`<graph-card></graph-card>

            <sl-button variant="default">Default</sl-button>
            <sl-button variant="primary">Primary</sl-button>
            <sl-button variant="success">Success</sl-button>
            <sl-button variant="neutral">Neutral</sl-button>
            <sl-button variant="warning">Warning</sl-button>
            <sl-button variant="danger">Danger</sl-button>`,ko`<sl-button-group label="Alignment">
            <sl-button>Left</sl-button>
            <sl-button>Center</sl-button>
            <sl-button>Right</sl-button>
        </sl-button-group>`]}render(){const t=this.#r();return super.render(t)}};jp=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}([$n(),Wo("dashboard-layout")],jp);let Up=class extends jo{constructor(){super()}createRenderRoot(){return this}bootstrapActiveMenu(){const t=vn.items[0].name,e=localStorage.getItem("active-view")||t,i=this.querySelector(`.nav-element-click[name="${e}"]`);i&&i.click()}#X({detail:{name:t}}){const e=this.querySelector('.view[active="true"]'),i=this.querySelector(`.view[name="${t}"]`);e&&e.setAttribute("active","false"),localStorage.setItem("active-view",t),i.setAttribute("active","true"),i.setActive()}#G(){const t=this.querySelector(".nav"),e="true"===t.getAttribute("closed");return t.setAttribute("closed",!e+"")}render(){return ko`<main-nav class="nav" closed="true" @viewSwitch="${this.#X}"></main-nav>
            <main>
                <div class="view-header">
                    <i
                        closed="true"
                        @click="${this.#G}"
                        class="fa fa-solid fa-fw fa-bars fa-2x hamburger-menu"
                    ></i>
                </div>
                ${rn(vn.items,(t=>"dashboard"===t.name?ko`<dashboard-layout
                            name="${t.name}"
                            class="view"
                            active="false"
                        ></dashboard-layout>`:"profile"===t.name?ko`<profile-layout name="${t.name}" class="view" active="false"></profile-layout>`:ko`<view-layout name="${t.name}" class="view" active="false"></view-layout>`))}
            </main>`}};Up=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}([Wo("app-layout")],Up),document.addEventListener("DOMContentLoaded",(function(){document.querySelector("app-layout").bootstrapActiveMenu()})),se("/assets/shoelace")}();
