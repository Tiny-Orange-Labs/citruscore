!function(){"use strict";
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;const r=t=>new class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}("string"==typeof t?t:t+"",void 0,i),n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return r(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var o;const l=window,a=l.trustedTypes,c=a?a.emptyScript:"",h=l.reactiveElementPolyfillSupport,d={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:u};let v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const r=this[t];this[e]=s,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((e=>{const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=p){var s;const r=this.constructor._$Ep(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:d).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,r=s._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=s.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:d;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var f;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:v}),(null!==(o=l.reactiveElementVersions)&&void 0!==o?o:l.reactiveElementVersions=[]).push("1.4.2");const $=window,m=$.trustedTypes,y=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,_=`lit$${(Math.random()+"").slice(9)}$`,g="?"+_,b=`<${g}>`,A=document,w=(t="")=>A.createComment(t),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,S=Array.isArray,x=t=>S(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,R=/>/g,O=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),j=/'/g,U=/"/g,N=/^(?:script|style|textarea|title)$/i,k=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),T=new WeakMap,L=A.createTreeWalker(A,129,null,!1),z=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":"",o=C;for(let e=0;e<i;e++){const i=t[e];let l,a,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,a=o.exec(i),null!==a);)h=o.lastIndex,o===C?"!--"===a[1]?o=P:void 0!==a[1]?o=R:void 0!==a[2]?(N.test(a[2])&&(r=RegExp("</"+a[2],"g")),o=O):void 0!==a[3]&&(o=O):o===O?">"===a[0]?(o=null!=r?r:C,c=-1):void 0===a[1]?c=-2:(c=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?O:'"'===a[3]?U:j):o===U||o===j?o=O:o===P||o===R?o=C:(o=O,r=void 0);const d=o===O&&t[e+1].startsWith("/>")?" ":"";n+=o===C?i+b:c>=0?(s.push(l),i.slice(0,c)+"$lit$"+i.slice(c)+_+d):i+_+(-2===c?(s.push(void 0),e):d)}const l=n+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(l):l,s]};class D{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,l=this.parts,[a,c]=z(t,e);if(this.el=D.createElement(a,i),L.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=L.nextNode())&&l.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(_)){const i=c[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(_),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?V:"?"===e[1]?K:"@"===e[1]?J:q})}else l.push({type:6,index:r})}for(const e of t)s.removeAttribute(e)}if(N.test(s.tagName)){const t=s.textContent.split(_),e=t.length-1;if(e>0){s.textContent=m?m.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],w()),L.nextNode(),l.push({type:2,index:++r});s.append(t[e],w())}}}else if(8===s.nodeType)if(s.data===g)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(_,t+1));)l.push({type:7,index:r}),t+=_.length-1}r++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function B(t,e,i=t,s){var r,n,o,l;if(e===H)return e;let a=void 0!==s?null===(r=i._$Co)||void 0===r?void 0:r[s]:i._$Cl;const c=E(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==c&&(null===(n=null==a?void 0:a._$AO)||void 0===n||n.call(a,!1),void 0===c?a=void 0:(a=new c(t),a._$AT(t,i,s)),void 0!==s?(null!==(o=(l=i)._$Co)&&void 0!==o?o:l._$Co=[])[s]=a:i._$Cl=a),void 0!==a&&(e=B(t,a._$AS(t,e.values),a,s)),e}class I{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(i,!0);L.currentNode=r;let n=L.nextNode(),o=0,l=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new F(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new Y(n,this,t)),this.u.push(e),a=s[++l]}o!==(null==a?void 0:a.index)&&(n=L.nextNode(),o++)}return r}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class F{constructor(t,e,i,s){var r;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(r=null==s?void 0:s.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=B(this,t,e),E(t)?t===M||null==t||""===t?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==H&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):x(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==M&&E(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,r="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=D.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.p(i);else{const t=new I(r,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=T.get(t.strings);return void 0===e&&T.set(t.strings,e=new D(t)),e}k(t){S(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new F(this.O(w()),this.O(w()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class q{constructor(t,e,i,s,r){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=B(this,t,e,0),n=!E(t)||t!==this._$AH&&t!==H,n&&(this._$AH=t);else{const s=t;let o,l;for(t=r[0],o=0;o<r.length-1;o++)l=B(this,s[i+o],e,o),l===H&&(l=this._$AH[o]),n||(n=!E(l)||l!==this._$AH[o]),l===M?t=M:t!==M&&(t+=(null!=l?l:"")+r[o+1]),this._$AH[o]=l}n&&!s&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class V extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}const W=m?m.emptyScript:"";class K extends q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==M?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class J extends q{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=B(this,t,e,0))&&void 0!==i?i:M)===H)return;const s=this._$AH,r=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==M&&(s===M||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Y{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}}const Z={P:"$lit$",A:_,M:g,C:1,L:z,R:I,D:x,V:B,I:F,H:q,N:K,U:J,B:V,F:Y},Q=$.litHtmlPolyfillSupport;null==Q||Q(D,F),(null!==(f=$.litHtmlVersions)&&void 0!==f?f:$.litHtmlVersions=[]).push("2.4.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var G,X;let tt=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,r;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=n._$litPart$;if(void 0===o){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;n._$litPart$=o=new F(e.insertBefore(w(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return H}};tt.finalized=!0,tt._$litElement$=!0,null===(G=globalThis.litElementHydrateSupport)||void 0===G||G.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const it=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */,st=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function rt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):st(t,e)
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}var nt;null===(nt=window.HTMLSlotElement)||void 0===nt||nt.prototype.assignedElements;var ot=function(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o};let lt=class extends tt{icon="none";content="";type="normal";constructor(){super()}createRenderRoot(){return this}render(){return"none"!==this.icon?k`<button class="${this.type}-button">
                <i class="fa fa-solid fa-fw fa-${this.icon}"></i>&nbsp;&nbsp;${this.content}
            </button>`:k`<button class="${this.type}-button">${this.content}</button>`}};ot([rt({attribute:!0})],lt.prototype,"icon",void 0),ot([rt({attribute:!0})],lt.prototype,"content",void 0),ot([rt({attribute:!0})],lt.prototype,"type",void 0),lt=ot([it("project-button")],lt);
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const at=2,ct=t=>(...e)=>({_$litDirective$:t,values:e});class ht{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const{I:dt}=Z,ut=()=>document.createComment(""),pt=(t,e,i)=>{var s;const r=t._$AA.parentNode,n=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=r.insertBefore(ut(),n),s=r.insertBefore(ut(),n);i=new dt(e,s,t,t.options)}else{const e=i._$AB.nextSibling,o=i._$AM,l=o!==t;if(l){let e;null===(s=i._$AQ)||void 0===s||s.call(i,t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==o._$AU&&i._$AP(e)}if(e!==n||l){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;r.insertBefore(t,n),t=e}}}return i},vt=(t,e,i=t)=>(t._$AI(e,i),t),ft={},$t=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let i=t._$AA;const s=t._$AB.nextSibling;for(;i!==s;){const t=i.nextSibling;i.remove(),i=t}},mt=(t,e,i)=>{const s=new Map;for(let r=e;r<=i;r++)s.set(t[r],r);return s},yt=ct(class extends ht{constructor(t){if(super(t),t.type!==at)throw Error("repeat() can only be used in text expressions")}ht(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const r=[],n=[];let o=0;for(const e of t)r[o]=s?s(e,o):o,n[o]=i(e,o),o++;return{values:n,keys:r}}render(t,e,i){return this.ht(t,e,i).values}update(t,[e,i,s]){var r;const n=(t=>t._$AH)(t),{values:o,keys:l}=this.ht(e,i,s);if(!Array.isArray(n))return this.ut=l,o;const a=null!==(r=this.ut)&&void 0!==r?r:this.ut=[],c=[];let h,d,u=0,p=n.length-1,v=0,f=o.length-1;for(;u<=p&&v<=f;)if(null===n[u])u++;else if(null===n[p])p--;else if(a[u]===l[v])c[v]=vt(n[u],o[v]),u++,v++;else if(a[p]===l[f])c[f]=vt(n[p],o[f]),p--,f--;else if(a[u]===l[f])c[f]=vt(n[u],o[f]),pt(t,c[f+1],n[u]),u++,f--;else if(a[p]===l[v])c[v]=vt(n[p],o[v]),pt(t,n[u],n[p]),p--,v++;else if(void 0===h&&(h=mt(l,v,f),d=mt(a,u,p)),h.has(a[u]))if(h.has(a[p])){const e=d.get(l[v]),i=void 0!==e?n[e]:null;if(null===i){const e=pt(t,n[u]);vt(e,o[v]),c[v]=e}else c[v]=vt(i,o[v]),pt(t,n[u],i),n[e]=null;v++}else $t(n[p]),p--;else $t(n[u]),u++;for(;v<=f;){const e=pt(t,c[f+1]);vt(e,o[v]),c[v++]=e}for(;u<=p;){const t=n[u++];null!==t&&$t(t)}return this.ut=l,((t,e=ft)=>{t._$AH=e})(t,c),H}});
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var _t=function(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o};let gt=class extends tt{prefix="";label="";options=[];type="text";optional=!1;placeholder="";get value(){const t=this.querySelector("input")?.value;return 0!==this.options.length?{option:this.querySelector("select")?.value,value:t}:t}constructor(){super()}createRenderRoot(){return this}#t(){if(0!==this.options.length)return k`<div class="absolute inset-y-0 right-0 flex items-center">
            <label for="currency" class="sr-only">Currency</label>
            <select
                id="currency"
                name="currency"
                class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                ${yt(this.options,(t=>k`<option value="${t}">${t}</option>`))}
            </select>
        </div>`}#e(){if(this.prefix)return k`<div class="pointer-events-none absolute inset-y-0 left-0 p-2 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">${this.prefix}</span>
        </div>`}#i(){const t=function(t){const[e,...i]=t;return e.toUpperCase()+i.join("")}(this.label);return this.optional?k`<label for="${this.label}" class="input-label">
                ${t}
                <span class="input-label-optional">optional</span>
            </label>`:k`<label for="${this.label}" class="input-label">${t}</label>`}render(){return k`${this.#i()}
            <div class="relative mt-1 rounded-md shadow-sm">
                ${this.#e()}
                <input
                    type="text"
                    name="${this.label}"
                    id="${this.label}"
                    class="block w-full rounded-md border-gray-300 p-2 ${this.prefix?"pl-7":""} pr-12 focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="${this.placeholder}"
                />
                ${this.#t()}
            </div>`}};_t([rt({attribute:!0})],gt.prototype,"prefix",void 0),_t([rt({attribute:!0})],gt.prototype,"label",void 0),_t([rt({attribute:!0,type:Array})],gt.prototype,"options",void 0),_t([rt({attribute:!0})],gt.prototype,"type",void 0),_t([rt({attribute:!0})],gt.prototype,"optional",void 0),_t([rt({attribute:!0})],gt.prototype,"placeholder",void 0),gt=_t([it("project-input")],gt);const bt=Object.freeze({logo:{src:"tailwind.png"},items:[{name:"dashboard",icon:"house",rows:2,viewable:!0,isNavFooter:!1},{name:"analytics",icon:"chart-column",rows:3,viewable:!0,isNavFooter:!1},{name:"calendar",icon:"calendar",rows:4,viewable:!0,isNavFooter:!1},{name:"profile",icon:"",rows:2,viewable:!1,isNavFooter:!0}]});let At=class extends tt{#s="nav-elem-active";constructor(){super()}createRenderRoot(){return this}#r(t){const e=t.target,i=e.parentNode,s=e.classList.contains("nav-element")?e:i,r=document.querySelector(`.${this.#s}`),n="true"===s.getAttribute("isNavFooter"),o=new CustomEvent("viewSwitch",{detail:{name:s.getAttribute("name")}});return r&&r.classList.remove(this.#s),n||s.classList.add(this.#s),this.setAttribute("closed","true"),this.dispatchEvent(o)}#n(){const t="true"===this.getAttribute("closed");return this.setAttribute("closed",!t+"")}#o(){const t=bt.items[0].name,e=localStorage.getItem("active-view")||t;return yt(bt.items,(t=>{const[i,...s]=t.name,r=e===t.name?this.#s:"";if(t.viewable)return k`<div @click="${this.#r}" class="nav-element ${r}" name="${t.name}">
                <i class="fa-solid fa-${t.icon} fa-fw mr-2"></i>
                <span>${i.toLocaleUpperCase()}${s.join("")}</span>
            </div>`}))}#l(){if(!!bt.items.find((t=>t.isNavFooter)))return k`<footer class="nav-footer">
            <img src="./assets/img/fallbacks/avatar.png" />
            <div name="profile" isNavFooter="true">
                <span>User Name</span>
                <small @click="${this.#r}" class="view-profile">View Profile</small>
            </div>
        </footer>`}#a(){return k`<header class="nav-header">
            <img class="nav-logo" src="./assets/img/logos/${bt.logo.src}" />
            <i @click="${this.#n}" class="fa fa-solid fa-times fa-fw close-mobil-nav"></i>
        </header>`}render(){const t=this.#a(),e=this.#l(),i=this.#o();return k`${t}${i}${e}`}};At=function(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}([it("main-nav")],At);var wt=function(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o};let Et=class extends tt{name="";constructor(){super()}createRenderRoot(){return this}#c({rows:t},e){return[...new Array(t)].map((function(t,i){return k`<div class="view-row">${e[i]}</div>`}))}render(t=""){const e=bt.items.find((t=>t.name===this.name));return k`<div class="view-container">
            <header>
                <h1 class="text-xl my-3">${this.name?.toLocaleUpperCase()}</h1>
            </header>
            <div class="view-content grid-cols-${e.rows}">${this.#c(e,t)}</div>
        </div>`}};wt([rt({attribute:!0,reflect:!0})],Et.prototype,"name",void 0),Et=wt([it("view-layout")],Et);var St=Et;
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const xt="lit-localize-status";
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
class Ct{constructor(t){this.__litLocalizeEventHandler=t=>{"ready"===t.detail.status&&this.host.requestUpdate()},this.host=t}hostConnected(){window.addEventListener(xt,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(xt,this.__litLocalizeEventHandler)}}const Pt=t=>t.addController(new Ct(t)),Rt=()=>t=>"function"==typeof t?jt(t):Ot(t),Ot=({kind:t,elements:e})=>({kind:t,elements:e,finisher(t){t.addInitializer(Pt)}}),jt=t=>(t.addInitializer(Pt),t);
/**
     * @license
     * Copyright 2014 Travis Webb
     * SPDX-License-Identifier: MIT
     */
for(let t=0;t<256;t++)(t>>4&15).toString(16),(15&t).toString(16);
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */(new
/**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
class{constructor(){this.settled=!1,this.promise=new Promise(((t,e)=>{this._resolve=t,this._reject=e}))}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}).resolve();
/**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
let Ut=t=>{return"string"!=typeof(e=t)&&"strTag"in e?((t,e,i)=>{let s=t[0];for(let r=1;r<t.length;r++)s+=e[i?i[r-1]:r-1],s+=t[r];return s})(t.strings,t.values):t;var e};let Nt=class extends St{constructor(){super()}createRenderRoot(){return this}#h(){}#c(){return[k`
            <project-input
                label="email"
                placeholder="max.mustermann"
                options='["@gmail.com","@yahoo.com","@gmx.net"]'
            ></project-input>
            <project-input optional="true" prefix="€" label="Preis" options='["USD","YEN","EURO"]'></project-input>
            <project-button content="${Ut("Accept")}" icon="check"></project-button>
            <project-button
                @click="${this.#h}"
                content="${Ut("Settings")}"
                type="highlight"
                icon="gear"
            ></project-button>
        `,k`
            <project-input
                label="email"
                placeholder="max.mustermann"
                options='["@gmail.com","@yahoo.com","@gmx.net"]'
            ></project-input>
            <project-input optional="true" prefix="€" label="Preis" options='["USD","YEN","EURO"]'></project-input>
            <project-button content="Search" icon="magnifying-glass"></project-button>
            <project-button content="Setting" type="highlight" icon="gear"></project-button>
        `]}render(){const t=this.#c();return super.render(t)}};Nt=function(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}([Rt(),it("dashboard-layout")],Nt);
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
class kt extends ht{constructor(t){if(super(t),this.it=M,t.type!==at)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===M||null==t)return this._t=void 0,this.it=t;if(t===H)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}kt.directiveName="unsafeHTML",kt.resultType=1;const Ht=ct(kt);let Mt=class extends tt{constructor(){super()}createRenderRoot(){return this}#d({detail:{name:t}}){const e=this.querySelector('.view[active="true"]'),i=this.querySelector(`.view[name="${t}"]`);e&&e.setAttribute("active","false"),localStorage.setItem("active-view",t),i.setAttribute("active","true")}#u(){const t=this.querySelector(".nav"),e="true"===t.getAttribute("closed");return t.setAttribute("closed",!e+"")}render(){const t=bt.items[0].name,e=localStorage.getItem("active-view")||t;return k`<main-nav class="nav" closed="true" @viewSwitch="${this.#d}"></main-nav>
            <main>
                <div class="view-header">
                    <i
                        closed="true"
                        @click="${this.#u}"
                        class="fa fa-solid fa-fw fa-bars fa-2x hamburger-menu"
                    ></i>
                </div>
                ${yt(bt.items,(t=>{const i=t.name===e;return Ht(t.name),"dashboard"===t.name?k`<dashboard-layout
                            name="${t.name}"
                            active="${i}"
                            class="view"
                        ></dashboard-layout>`:k`<view-layout name="${t.name}" active="${i}" class="view"></view-layout>`}))}
            </main>`}};Mt=function(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}([it("app-layout")],Mt),document.addEventListener("DOMContentLoaded",(function(){}))}();
