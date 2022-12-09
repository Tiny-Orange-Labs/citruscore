!function(){"use strict";
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;const r=t=>new class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}}("string"==typeof t?t:t+"",void 0,s),n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var o;const l=window,a=l.trustedTypes,c=a?a.emptyScript:"",h=l.reactiveElementPolyfillSupport,d={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},u=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:u};let v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var s;const i=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{e?s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=p){var i;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const n=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:d).toAttribute(e,s.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,r=i._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=i.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:d;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var f;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:v}),(null!==(o=l.reactiveElementVersions)&&void 0!==o?o:l.reactiveElementVersions=[]).push("1.5.0");const $=window,m=$.trustedTypes,g=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,_="?"+y,b=`<${_}>`,A=document,w=(t="")=>A.createComment(t),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,C=t=>E(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,P=/>/g,j=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),O=/'/g,U=/"/g,k=/^(?:script|style|textarea|title)$/i,N=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),H=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),M=new WeakMap,T=A.createTreeWalker(A,129,null,!1),z=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":"",o=x;for(let e=0;e<s;e++){const s=t[e];let l,a,c=-1,h=0;for(;h<s.length&&(o.lastIndex=h,a=o.exec(s),null!==a);)h=o.lastIndex,o===x?"!--"===a[1]?o=R:void 0!==a[1]?o=P:void 0!==a[2]?(k.test(a[2])&&(r=RegExp("</"+a[2],"g")),o=j):void 0!==a[3]&&(o=j):o===j?">"===a[0]?(o=null!=r?r:x,c=-1):void 0===a[1]?c=-2:(c=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?j:'"'===a[3]?U:O):o===U||o===O?o=j:o===R||o===P?o=x:(o=j,r=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";n+=o===x?s+b:c>=0?(i.push(l),s.slice(0,c)+"$lit$"+s.slice(c)+y+d):s+y+(-2===c?(i.push(void 0),e):d)}const l=n+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==g?g.createHTML(l):l,i]};class I{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,l=this.parts,[a,c]=z(t,e);if(this.el=I.createElement(a,s),T.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=T.nextNode())&&l.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(y)){const s=c[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(y),e=/([.?@])?(.*)/.exec(s);l.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?V:"?"===e[1]?K:"@"===e[1]?J:F})}else l.push({type:6,index:r})}for(const e of t)i.removeAttribute(e)}if(k.test(i.tagName)){const t=i.textContent.split(y),e=t.length-1;if(e>0){i.textContent=m?m.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],w()),T.nextNode(),l.push({type:2,index:++r});i.append(t[e],w())}}}else if(8===i.nodeType)if(i.data===_)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(y,t+1));)l.push({type:7,index:r}),t+=y.length-1}r++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function D(t,e,s=t,i){var r,n,o,l;if(e===H)return e;let a=void 0!==i?null===(r=s._$Co)||void 0===r?void 0:r[i]:s._$Cl;const c=S(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==c&&(null===(n=null==a?void 0:a._$AO)||void 0===n||n.call(a,!1),void 0===c?a=void 0:(a=new c(t),a._$AT(t,s,i)),void 0!==i?(null!==(o=(l=s)._$Co)&&void 0!==o?o:l._$Co=[])[i]=a:s._$Cl=a),void 0!==a&&(e=D(t,a._$AS(t,e.values),a,i)),e}class B{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:s},parts:i}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(s,!0);T.currentNode=r;let n=T.nextNode(),o=0,l=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new Y(n,this,t)),this.u.push(e),a=i[++l]}o!==(null==a?void 0:a.index)&&(n=T.nextNode(),o++)}return r}p(t){let e=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class q{constructor(t,e,s,i){var r;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cm=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),S(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==H&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):C(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==L&&S(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=I.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.p(s);else{const t=new B(r,this),e=t.v(this.options);t.p(s),this.T(e),this._$AH=t}}_$AC(t){let e=M.get(t.strings);return void 0===e&&M.set(t.strings,e=new I(t)),e}k(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new q(this.O(w()),this.O(w()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class F{constructor(t,e,s,i,r){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=D(this,t,e,0),n=!S(t)||t!==this._$AH&&t!==H,n&&(this._$AH=t);else{const i=t;let o,l;for(t=r[0],o=0;o<r.length-1;o++)l=D(this,i[s+o],e,o),l===H&&(l=this._$AH[o]),n||(n=!S(l)||l!==this._$AH[o]),l===L?t=L:t!==L&&(t+=(null!=l?l:"")+r[o+1]),this._$AH[o]=l}n&&!i&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class V extends F{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}const W=m?m.emptyScript:"";class K extends F{constructor(){super(...arguments),this.type=4}j(t){t&&t!==L?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class J extends F{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=D(this,t,e,0))&&void 0!==s?s:L)===H)return;const i=this._$AH,r=t===L&&i!==L||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==L&&(i===L||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class Y{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}}const Z={P:"$lit$",A:y,M:_,C:1,L:z,R:B,D:C,V:D,I:q,H:F,N:K,U:J,B:V,F:Y},G=$.litHtmlPolyfillSupport;null==G||G(I,q),(null!==(f=$.litHtmlVersions)&&void 0!==f?f:$.litHtmlVersions=[]).push("2.5.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var Q,X;let tt=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,r;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let o=n._$litPart$;if(void 0===o){const t=null!==(r=null==s?void 0:s.renderBefore)&&void 0!==r?r:null;n._$litPart$=o=new q(e.insertBefore(w(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return H}};tt.finalized=!0,tt._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const st=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){customElements.define(t,e)}}})(t,e)
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */,it=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(s){s.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function rt(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):it(t,e)
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}var nt;null===(nt=window.HTMLSlotElement)||void 0===nt||nt.prototype.assignedElements;
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const ot=(t,e,s)=>{let i=t[0];for(let r=1;r<t.length;r++)i+=e[s?s[r-1]:r-1],i+=t[r];return i},lt=t=>{return"string"!=typeof(e=t)&&"strTag"in e?ot(t.strings,t.values):t;var e},at="lit-localize-status";
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
class ct{constructor(t){this.__litLocalizeEventHandler=t=>{"ready"===t.detail.status&&this.host.requestUpdate()},this.host=t}hostConnected(){window.addEventListener(at,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(at,this.__litLocalizeEventHandler)}}const ht=t=>t.addController(new ct(t)),dt=()=>t=>"function"==typeof t?pt(t):ut(t),ut=({kind:t,elements:e})=>({kind:t,elements:e,finisher(t){t.addInitializer(ht)}}),pt=t=>(t.addInitializer(ht),t);
/**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
class vt{constructor(){this.settled=!1,this.promise=new Promise(((t,e)=>{this._resolve=t,this._reject=e}))}resolve(t){this.settled=!0,this._resolve(t)}reject(t){this.settled=!0,this._reject(t)}}
/**
     * @license
     * Copyright 2014 Travis Webb
     * SPDX-License-Identifier: MIT
     */const ft=[];for(let t=0;t<256;t++)ft[t]=(t>>4&15).toString(16)+(15&t).toString(16);function $t(t,e){return(e?"h":"s")+function(t){let e=0,s=8997,i=0,r=33826,n=0,o=40164,l=0,a=52210;for(let c=0;c<t.length;c++)s^=t.charCodeAt(c),e=435*s,i=435*r,n=435*o,l=435*a,n+=s<<8,l+=r<<8,i+=e>>>16,s=65535&e,n+=i>>>16,r=65535&i,a=l+(n>>>16)&65535,o=65535&n;return ft[a>>8]+ft[255&a]+ft[o>>8]+ft[255&o]+ft[r>>8]+ft[255&r]+ft[s>>8]+ft[255&s]}
/**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */("string"==typeof t?t:t.join(""))}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const mt=new WeakMap,gt=new Map;function yt(t,e,s){var i;if(t){const r=null!==(i=null==s?void 0:s.id)&&void 0!==i?i:function(t){const e="string"==typeof t?t:t.strings;let s=gt.get(e);void 0===s&&(s=$t(e,"string"!=typeof t&&!("strTag"in t)),gt.set(e,s));return s}
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */(e),n=t[r];if(n){if("string"==typeof n)return n;if("strTag"in n)return ot(n.strings,e.values,n.values);{let t=mt.get(n);return void 0===t&&(t=n.values,mt.set(n,t)),{...n,values:t.map((t=>e.values[t]))}}}}return lt(e)}function _t(t){window.dispatchEvent(new CustomEvent(at,{detail:t}))}let bt,At,wt,St,Et,Ct="",xt=new vt;xt.resolve();let Rt=0;const Pt=()=>Ct,jt=t=>{if(t===(null!=bt?bt:Ct))return xt.promise;if(!wt||!St)throw new Error("Internal error");if(!wt.has(t))throw new Error("Invalid locale code");Rt++;const e=Rt;bt=t,xt.settled&&(xt=new vt),_t({status:"loading",loadingLocale:t});return(t===At?Promise.resolve({templates:void 0}):St(t)).then((s=>{Rt===e&&(Ct=t,bt=void 0,Et=s.templates,_t({status:"ready",readyLocale:t}),xt.resolve())}),(s=>{Rt===e&&(_t({status:"error",errorLocale:t,errorMessage:s.toString()}),xt.reject(s))})),xt.promise};
/**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
let Ot=lt,Ut=!1;var kt=function(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o};let Nt=class extends tt{icon="none";content="";type="normal";constructor(){super()}createRenderRoot(){return this}render(){return"none"!==this.icon?N`<button class="${this.type}-button">
                <i class="fa fa-solid fa-fw fa-${this.icon}"></i>&nbsp;&nbsp;${this.content}
            </button>`:N`<button class="${this.type}-button">${this.content}</button>`}};function Ht(t){const[e,...s]=t;return e.toUpperCase()+s.join("")}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */kt([rt({attribute:!0})],Nt.prototype,"icon",void 0),kt([rt({attribute:!0,reflect:!0})],Nt.prototype,"content",void 0),kt([rt({attribute:!0})],Nt.prototype,"type",void 0),Nt=kt([dt(),st("project-button")],Nt);const Lt=2;class Mt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
     * @license
     * Copyright 2020 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const{I:Tt}=Z,zt=()=>document.createComment(""),It=(t,e,s)=>{var i;const r=t._$AA.parentNode,n=void 0===e?t._$AB:e._$AA;if(void 0===s){const e=r.insertBefore(zt(),n),i=r.insertBefore(zt(),n);s=new Tt(e,i,t,t.options)}else{const e=s._$AB.nextSibling,o=s._$AM,l=o!==t;if(l){let e;null===(i=s._$AQ)||void 0===i||i.call(s,t),s._$AM=t,void 0!==s._$AP&&(e=t._$AU)!==o._$AU&&s._$AP(e)}if(e!==n||l){let t=s._$AA;for(;t!==e;){const e=t.nextSibling;r.insertBefore(t,n),t=e}}}return s},Dt=(t,e,s=t)=>(t._$AI(e,s),t),Bt={},qt=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let s=t._$AA;const i=t._$AB.nextSibling;for(;s!==i;){const t=s.nextSibling;s.remove(),s=t}},Ft=(t,e,s)=>{const i=new Map;for(let r=e;r<=s;r++)i.set(t[r],r);return i},Vt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Mt{constructor(t){if(super(t),t.type!==Lt)throw Error("repeat() can only be used in text expressions")}ht(t,e,s){let i;void 0===s?s=e:void 0!==e&&(i=e);const r=[],n=[];let o=0;for(const e of t)r[o]=i?i(e,o):o,n[o]=s(e,o),o++;return{values:n,keys:r}}render(t,e,s){return this.ht(t,e,s).values}update(t,[e,s,i]){var r;const n=(t=>t._$AH)(t),{values:o,keys:l}=this.ht(e,s,i);if(!Array.isArray(n))return this.ut=l,o;const a=null!==(r=this.ut)&&void 0!==r?r:this.ut=[],c=[];let h,d,u=0,p=n.length-1,v=0,f=o.length-1;for(;u<=p&&v<=f;)if(null===n[u])u++;else if(null===n[p])p--;else if(a[u]===l[v])c[v]=Dt(n[u],o[v]),u++,v++;else if(a[p]===l[f])c[f]=Dt(n[p],o[f]),p--,f--;else if(a[u]===l[f])c[f]=Dt(n[u],o[f]),It(t,c[f+1],n[u]),u++,f--;else if(a[p]===l[v])c[v]=Dt(n[p],o[v]),It(t,n[u],n[p]),p--,v++;else if(void 0===h&&(h=Ft(l,v,f),d=Ft(a,u,p)),h.has(a[u]))if(h.has(a[p])){const e=d.get(l[v]),s=void 0!==e?n[e]:null;if(null===s){const e=It(t,n[u]);Dt(e,o[v]),c[v]=e}else c[v]=Dt(s,o[v]),It(t,n[u],s),n[e]=null;v++}else qt(n[p]),p--;else qt(n[u]),u++;for(;v<=f;){const e=It(t,c[f+1]);Dt(e,o[v]),c[v++]=e}for(;u<=p;){const t=n[u++];null!==t&&qt(t)}return this.ut=l,((t,e=Bt)=>{t._$AH=e})(t,c),H}});
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var Wt=function(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o};let Kt=class extends tt{prefix="";label="";options=[];type="text";optional=!1;placeholder="";get value(){const t=this.querySelector("input")?.value;return 0!==this.options.length?{option:this.querySelector("select")?.value,value:t}:t}constructor(){super()}createRenderRoot(){return this}#t(){if(0!==this.options.length)return N`<div class="absolute inset-y-0 right-0 flex items-center">
            <label for="currency" class="sr-only">Currency</label>
            <select
                id="currency"
                name="currency"
                class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                ${Vt(this.options,(t=>N`<option value="${t}">${t}</option>`))}
            </select>
        </div>`}#e(){if(this.prefix)return N`<div class="pointer-events-none absolute inset-y-0 left-0 p-2 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">${this.prefix}</span>
        </div>`}#s(){const t=Ht(this.label);return this.optional?N`<label for="${this.label}" class="input-label">
                ${t}
                <span class="input-label-optional">optional</span>
            </label>`:N`<label for="${this.label}" class="input-label">${t}</label>`}render(){return N`${this.#s()}
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
            </div>`}};Wt([rt({attribute:!0})],Kt.prototype,"prefix",void 0),Wt([rt({attribute:!0})],Kt.prototype,"label",void 0),Wt([rt({attribute:!0,type:Array})],Kt.prototype,"options",void 0),Wt([rt({attribute:!0})],Kt.prototype,"type",void 0),Wt([rt({attribute:!0})],Kt.prototype,"optional",void 0),Wt([rt({attribute:!0})],Kt.prototype,"placeholder",void 0),Kt=Wt([dt(),st("project-input")],Kt);var Jt=function(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o};let Yt=class extends tt{label="";selected="";options=[];values=[];set value(t){const e=this.querySelector("select");e&&(e.value=t)}get value(){return this.querySelector("select")?.value||""}constructor(){super()}createRenderRoot(){return this}render(){const t=Vt(this.options,((t,e)=>this.values[e]===this.selected?N`<option value="${this.values[e]}" selected>${t}</option>`:N`<option value="${this.values[e]}">${t}</option>`));return this.label?N`<label class="input-label">${this.label}</label
                ><select class="select">
                    ${t}
                </select> `:N`<select class="select">
            ${t}
        </select> `}};Jt([rt({attribute:!0})],Yt.prototype,"label",void 0),Jt([rt({attribute:!0})],Yt.prototype,"selected",void 0),Jt([rt({attribute:!0,type:Array})],Yt.prototype,"options",void 0),Jt([rt({attribute:!0,type:Array})],Yt.prototype,"values",void 0),Yt=Jt([dt(),st("project-select")],Yt);const Zt=Object.freeze({logo:{src:"tailwind.png"},items:[{name:"dashboard",icon:"house",rows:2,viewable:!0,isNavFooter:!1},{name:"analytics",icon:"chart-column",rows:3,viewable:!0,isNavFooter:!1},{name:"calendar",icon:"calendar",rows:4,viewable:!0,isNavFooter:!1},{name:"profile",icon:"",rows:1,viewable:!1,isNavFooter:!0}]});let Gt=class extends tt{#i="nav-elem-active";constructor(){super()}createRenderRoot(){return this}#r(t){const e=t.target,s=e.parentNode,i=e.classList.contains("nav-element")?e:s,r=document.querySelector(`.${this.#i}`),n="true"===i.getAttribute("isNavFooter"),o=new CustomEvent("viewSwitch",{detail:{name:i.getAttribute("name")}});return r&&r.classList.remove(this.#i),n||i.classList.add(this.#i),this.setAttribute("closed","true"),this.dispatchEvent(o)}#n(){const t="true"===this.getAttribute("closed");return this.setAttribute("closed",!t+"")}#o(){const t=Zt.items[0].name,e=localStorage.getItem("active-view")||t,s=Object.freeze({analytics:N`<span>${Ht(Ot("analytics"))}</span>`,dashboard:N`<span>${Ht(Ot("dashboard"))}</span>`,calendar:N`<span>${Ht(Ot("calendar"))}</span>`});return Vt(Zt.items,(t=>{const i=e===t.name?this.#i:"";if(t.viewable)return N`<div @click="${this.#r}" class="nav-element ${i}" name="${t.name}">
                <i class="fa-solid fa-${t.icon} fa-fw mr-2"></i>
                ${s[t.name]}
            </div>`}))}#l(){if(!!Zt.items.find((t=>t.isNavFooter)))return N`<footer class="nav-footer">
            <img src="./assets/img/fallbacks/avatar.png" class="avatar" />
            <div name="profile" isNavFooter="true">
                <span>${Ot("Username")}</span>
                <small @click="${this.#r}" class="view-profile">${Ot("View Profile")}</small>
            </div>
        </footer>`}#a(){return N`<header class="nav-header">
            <img class="nav-logo" src="./assets/img/logos/${Zt.logo.src}" />
            <i @click="${this.#n}" class="fa fa-solid fa-times fa-fw close-mobil-nav"></i>
        </header>`}render(){const t=this.#a(),e=this.#l(),s=this.#o();return N`${t}${s}${e}`}};Gt=function(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}([dt(),st("main-nav")],Gt);var Qt=function(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o};let Xt=class extends tt{name="";constructor(){super()}createRenderRoot(){return this}#c({rows:t},e){return[...new Array(t)].map((function(t,s){return N`<div class="view-row">${e[s]}</div>`}))}render(t=""){const e=Zt.items.find((t=>t.name===this.name)),s=Object.freeze({analytics:N`<h1 class="view-headline">${Ht(Ot("analytics"))}</h1>`,dashboard:N`<h1 class="view-headline">${Ht(Ot("dashboard"))}</h1>`,calendar:N`<h1 class="view-headline">${Ht(Ot("calendar"))}</h1>`,profile:N`<h1 class="view-headline">${Ht(Ot("profile"))}</h1>`});return N`<div class="view-container">
            <header>${s[this.name]}</header>
            <div class="view-content grid-cols-${e.rows}">${this.#c(e,t)}</div>
        </div>`}};Qt([rt({attribute:!0,reflect:!0})],Xt.prototype,"name",void 0),Xt=Qt([dt(),st("view-layout")],Xt);var te=Xt;const ee=["de-CH-1901"],{getLocale:se,setLocale:ie}=(re={sourceLocale:"en",targetLocales:ee,loadLocale:t=>import(`/js/locales/${t}.js`)},function(t){if(Ut)throw new Error("lit-localize can only be configured once");Ot=t,Ut=!0}(((t,e)=>yt(Et,t,e))),Ct=At=re.sourceLocale,wt=new Set(re.targetLocales),wt.add(re.sourceLocale),St=re.loadLocale,{getLocale:Pt,setLocale:jt});var re;let ne=class extends te{constructor(){super()}updated(){const t=localStorage.getItem("lang");t&&"en"!==t&&ie(t)}createRenderRoot(){return this}#h({target:{value:t}}){ie(t),localStorage.setItem("lang",t)}#c(){const t=localStorage.getItem("lang");return[N`
            <project-select
                @change="${this.#h}"
                selected="${t||"en"}"
                label="${Ht(Ot("language"))}"
                values='["en", "de-CH-1901"]'
                options='["${Ot("English")}", "${Ot("German")}"]'
            ></project-select>
        `]}render(){const t=this.#c();return super.render(t)}};ne=function(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}([dt(),st("profile-layout")],ne);let oe=class extends te{constructor(){super()}createRenderRoot(){return this}#d(){}#c(){return[N`
            <project-input
                label="email"
                placeholder="max.mustermann"
                options='["@gmail.com","@yahoo.com","@gmx.net"]'
            ></project-input>
            <project-input optional="true" prefix="€" label="Preis" options='["USD","YEN","EURO"]'></project-input>
            <project-button content="${Ot("Accept")}" icon="check"></project-button>
            <project-button
                @click="${this.#d}"
                content="${Ot("Settings")}"
                type="highlight"
                icon="gear"
            ></project-button>
        `,N`
            <project-input
                label="email"
                placeholder="max.mustermann"
                options='["@gmail.com","@yahoo.com","@gmx.net"]'
            ></project-input>
            <project-input optional="true" prefix="€" label="Preis" options='["USD","YEN","EURO"]'></project-input>
            <project-button content="Search" icon="magnifying-glass"></project-button>
            <project-button content="Setting" type="highlight" icon="gear"></project-button>
        `]}render(){const t=this.#c();return super.render(t)}};oe=function(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}([dt(),st("dashboard-layout")],oe);let le=class extends tt{constructor(){super()}createRenderRoot(){return this}#u({detail:{name:t}}){const e=this.querySelector('.view[active="true"]'),s=this.querySelector(`.view[name="${t}"]`);e&&e.setAttribute("active","false"),localStorage.setItem("active-view",t),s.setAttribute("active","true")}#p(){const t=this.querySelector(".nav"),e="true"===t.getAttribute("closed");return t.setAttribute("closed",!e+"")}render(){const t=Zt.items[0].name,e=localStorage.getItem("active-view")||t;return N`<main-nav class="nav" closed="true" @viewSwitch="${this.#u}"></main-nav>
            <main>
                <div class="view-header">
                    <i
                        closed="true"
                        @click="${this.#p}"
                        class="fa fa-solid fa-fw fa-bars fa-2x hamburger-menu"
                    ></i>
                </div>
                ${Vt(Zt.items,(t=>{const s=t.name===e;return"dashboard"===t.name?N`<dashboard-layout
                            name="${t.name}"
                            active="${s}"
                            class="view"
                        ></dashboard-layout>`:"profile"===t.name?N`<profile-layout
                            name="${t.name}"
                            active="${s}"
                            class="view"
                        ></profile-layout>`:N`<view-layout name="${t.name}" active="${s}" class="view"></view-layout>`}))}
            </main>`}};le=function(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}([st("app-layout")],le),document.addEventListener("DOMContentLoaded",(function(){}))}();
