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

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ProjectButton = class ProjectButton extends s$1 {
    icon = 'none';
    content = '';
    type = 'normal';
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    render() {
        if (this.icon !== 'none') {
            return y `<button class="${this.type}-button">
                <i class="fa fa-solid fa-fw fa-${this.icon}"></i>&nbsp;&nbsp;${this.content}
            </button>`;
        }
        return y `<button class="${this.type}-button">${this.content}</button>`;
    }
};
__decorate$7([
    e$1({ attribute: true })
], ProjectButton.prototype, "icon", void 0);
__decorate$7([
    e$1({ attribute: true, reflect: true })
], ProjectButton.prototype, "content", void 0);
__decorate$7([
    e$1({ attribute: true })
], ProjectButton.prototype, "type", void 0);
ProjectButton = __decorate$7([
    localized(),
    e$2('project-button')
], ProjectButton);

function capitalize(input) {
    const [first, ...rest] = input;
    return first.toUpperCase() + rest.join('');
}

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

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let InputButton = class InputButton extends s$1 {
    prefix = '';
    label = '';
    options = [];
    type = 'text';
    optional = false;
    placeholder = '';
    get value() {
        const inputValue = this.querySelector('input')?.value;
        const hasPostFix = this.options.length !== 0;
        if (hasPostFix) {
            return {
                option: this.querySelector('select')?.value,
                value: inputValue,
            };
        }
        return inputValue;
    }
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #renderPostFix() {
        if (this.options.length === 0) {
            return;
        }
        return y `<div class="absolute inset-y-0 right-0 flex items-center">
            <label for="currency" class="sr-only">Currency</label>
            <select
                id="currency"
                name="currency"
                class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                ${c(this.options, (elem) => {
            return y `<option value="${elem}">${elem}</option>`;
        })}
            </select>
        </div>`;
    }
    #renderPrefix() {
        if (!this.prefix) {
            return;
        }
        return y `<div class="pointer-events-none absolute inset-y-0 left-0 p-2 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">${this.prefix}</span>
        </div>`;
    }
    #renderLabel() {
        const labelText = capitalize(this.label);
        if (this.optional) {
            return y `<label for="${this.label}" class="input-label">
                ${labelText}
                <span class="input-label-optional">optional</span>
            </label>`;
        }
        return y `<label for="${this.label}" class="input-label">${labelText}</label>`;
    }
    render() {
        return y `${this.#renderLabel()}
            <div class="relative mt-1 rounded-md shadow-sm">
                ${this.#renderPrefix()}
                <input
                    type="text"
                    name="${this.label}"
                    id="${this.label}"
                    class="block w-full rounded-md border-gray-300 p-2 ${this.prefix
            ? 'pl-7'
            : ''} pr-12 focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="${this.placeholder}"
                />
                ${this.#renderPostFix()}
            </div>`;
    }
};
__decorate$6([
    e$1({ attribute: true })
], InputButton.prototype, "prefix", void 0);
__decorate$6([
    e$1({ attribute: true })
], InputButton.prototype, "label", void 0);
__decorate$6([
    e$1({ attribute: true, type: Array })
], InputButton.prototype, "options", void 0);
__decorate$6([
    e$1({ attribute: true })
], InputButton.prototype, "type", void 0);
__decorate$6([
    e$1({ attribute: true })
], InputButton.prototype, "optional", void 0);
__decorate$6([
    e$1({ attribute: true })
], InputButton.prototype, "placeholder", void 0);
InputButton = __decorate$6([
    localized(),
    e$2('project-input')
], InputButton);

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ProjectSelect = class ProjectSelect extends s$1 {
    label = '';
    selected = '';
    options = [];
    values = [];
    set value(value) {
        const select = this.querySelector('select');
        if (select) {
            select.value = value;
        }
    }
    get value() {
        const select = this.querySelector('select');
        return select?.value || '';
    }
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    render() {
        const options = c(this.options, (item, i) => {
            if (this.values[i] === this.selected) {
                return y `<option value="${this.values[i]}" selected>${item}</option>`;
            }
            return y `<option value="${this.values[i]}">${item}</option>`;
        });
        if (this.label) {
            return y `<label class="input-label">${this.label}</label
                ><select class="select">
                    ${options}
                </select> `;
        }
        return y `<select class="select">
            ${options}
        </select> `;
    }
};
__decorate$5([
    e$1({ attribute: true })
], ProjectSelect.prototype, "label", void 0);
__decorate$5([
    e$1({ attribute: true })
], ProjectSelect.prototype, "selected", void 0);
__decorate$5([
    e$1({ attribute: true, type: Array })
], ProjectSelect.prototype, "options", void 0);
__decorate$5([
    e$1({ attribute: true, type: Array })
], ProjectSelect.prototype, "values", void 0);
ProjectSelect = __decorate$5([
    localized(),
    e$2('project-select')
], ProjectSelect);

const navElements = Object.freeze({
    logo: {
        src: 'logo.png',
    },
    items: [
        {
            name: 'dashboard',
            icon: 'house',
            rows: 2,
            viewable: true,
            isNavFooter: false,
        },
        {
            name: 'analytics',
            icon: 'chart-column',
            rows: 3,
            viewable: true,
            isNavFooter: false,
        },
        {
            name: 'calendar',
            icon: 'calendar',
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
                <i class="fa-solid fa-${elem.icon} fa-fw mr-2"></i>
                ${navStaticElements[elem.name]}
            </div>`;
        });
    }
    #renderNavFooter() {
        const hasFooter = !!navElements.items.find(elem => elem.isNavFooter);
        if (!hasFooter) {
            return;
        }
        return y `<footer class="nav-footer">
            <img src="./assets/img/fallbacks/avatar.png" class="avatar" />
            <div name="profile" isNavFooter="true">
                <span>${msg('Username')}</span>
                <small @click="${this.#click}" class="view-profile">${msg('View Profile')}</small>
            </div>
        </footer>`;
    }
    #renderNavLogoBar() {
        return y `<header class="nav-header">
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
        const lang = localStorage.getItem('lang');
        const row1 = y `
            <project-select
                @change="${this.#changeEvent}"
                selected="${lang || 'en'}"
                label="${capitalize(msg('language'))}"
                values='["en", "de-CH-1901"]'
                options='["${msg('English')}", "${msg('German')}"]'
            ></project-select>
        `;
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
        const row1 = y `
            <project-input
                label="email"
                placeholder="max.mustermann"
                options='["@gmail.com","@yahoo.com","@gmx.net"]'
            ></project-input>
            <project-input optional="true" prefix="€" label="Preis" options='["USD","YEN","EURO"]'></project-input>
            <project-button content="${msg('Accept')}" icon="check"></project-button>
            <project-button
                @click="${this.#settingsClick}"
                content="${msg('Settings')}"
                type="highlight"
                icon="gear"
            ></project-button>
        `;
        const row2 = y `
            <project-input
                label="email"
                placeholder="max.mustermann"
                options='["@gmail.com","@yahoo.com","@gmx.net"]'
            ></project-input>
            <project-input optional="true" prefix="€" label="Preis" options='["USD","YEN","EURO"]'></project-input>
            <project-button content="Search" icon="magnifying-glass"></project-button>
            <project-button content="Setting" type="highlight" icon="gear"></project-button>
        `;
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
    console.log('v:0.0.1 at: "2022-12-11T21:03:32.913Z" ');
});
