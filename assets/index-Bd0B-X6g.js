(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t){if(e.match(/^[a-z]+:\/\//i))return e;if(e.match(/^\/\//))return window.location.protocol+e;if(e.match(/^[a-z]+:/i))return e;let n=document.implementation.createHTMLDocument(),r=n.createElement(`base`),i=n.createElement(`a`);return n.head.appendChild(r),n.body.appendChild(i),t&&(r.href=t),i.href=e,i.href}var t=(()=>{let e=0,t=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(e+=1,`u${t()}${e}`)})();function n(e){let t=[];for(let n=0,r=e.length;n<r;n++)t.push(e[n]);return t}var r=null;function i(e={}){return r||(e.includeStyleProperties?(r=e.includeStyleProperties,r):(r=n(window.getComputedStyle(document.documentElement)),r))}function a(e,t){let n=(e.ownerDocument.defaultView||window).getComputedStyle(e).getPropertyValue(t);return n?parseFloat(n.replace(`px`,``)):0}function o(e){let t=a(e,`border-left-width`),n=a(e,`border-right-width`);return e.clientWidth+t+n}function s(e){let t=a(e,`border-top-width`),n=a(e,`border-bottom-width`);return e.clientHeight+t+n}function c(e,t={}){return{width:t.width||o(e),height:t.height||s(e)}}function l(){let e,t;try{t=process}catch{}let n=t&&t.env?t.env.devicePixelRatio:null;return n&&(e=parseInt(n,10),Number.isNaN(e)&&(e=1)),e||window.devicePixelRatio||1}var u=16384;function ee(e){(e.width>u||e.height>u)&&(e.width>u&&e.height>u?e.width>e.height?(e.height*=u/e.width,e.width=u):(e.width*=u/e.height,e.height=u):e.width>u?(e.height*=u/e.width,e.width=u):(e.width*=u/e.height,e.height=u))}function d(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>{r.decode().then(()=>{requestAnimationFrame(()=>t(r))})},r.onerror=n,r.crossOrigin=`anonymous`,r.decoding=`async`,r.src=e})}async function f(e){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then(e=>`data:image/svg+xml;charset=utf-8,${e}`)}async function p(e,t,n){let r=`http://www.w3.org/2000/svg`,i=document.createElementNS(r,`svg`),a=document.createElementNS(r,`foreignObject`);return i.setAttribute(`width`,`${t}`),i.setAttribute(`height`,`${n}`),i.setAttribute(`viewBox`,`0 0 ${t} ${n}`),a.setAttribute(`width`,`100%`),a.setAttribute(`height`,`100%`),a.setAttribute(`x`,`0`),a.setAttribute(`y`,`0`),a.setAttribute(`externalResourcesRequired`,`true`),i.appendChild(a),a.appendChild(e),f(i)}var m=(e,t)=>{if(e instanceof t)return!0;let n=Object.getPrototypeOf(e);return n===null?!1:n.constructor.name===t.name||m(n,t)};function te(e){let t=e.getPropertyValue(`content`);return`${e.cssText} content: '${t.replace(/'|"/g,``)}';`}function h(e,t){return i(t).map(t=>`${t}: ${e.getPropertyValue(t)}${e.getPropertyPriority(t)?` !important`:``};`).join(` `)}function ne(e,t,n,r){let i=`.${e}:${t}`,a=n.cssText?te(n):h(n,r);return document.createTextNode(`${i}{${a}}`)}function g(e,n,r,i){let a=window.getComputedStyle(e,r),o=a.getPropertyValue(`content`);if(o===``||o===`none`)return;let s=t();try{n.className=`${n.className} ${s}`}catch{return}let c=document.createElement(`style`);c.appendChild(ne(s,r,a,i)),n.appendChild(c)}function re(e,t,n){g(e,t,`:before`,n),g(e,t,`:after`,n)}var _=`application/font-woff`,v=`image/jpeg`,ie={woff:_,woff2:_,ttf:`application/font-truetype`,eot:`application/vnd.ms-fontobject`,png:`image/png`,jpg:v,jpeg:v,gif:`image/gif`,tiff:`image/tiff`,svg:`image/svg+xml`,webp:`image/webp`};function y(e){let t=/\.([^./]*?)$/g.exec(e);return t?t[1]:``}function b(e){return ie[y(e).toLowerCase()]||``}function ae(e){return e.split(/,/)[1]}function x(e){return e.search(/^(data:)/)!==-1}function S(e,t){return`data:${t};base64,${e}`}async function C(e,t,n){let r=await fetch(e,t);if(r.status===404)throw Error(`Resource "${r.url}" not found`);let i=await r.blob();return new Promise((e,t)=>{let a=new FileReader;a.onerror=t,a.onloadend=()=>{try{e(n({res:r,result:a.result}))}catch(e){t(e)}},a.readAsDataURL(i)})}var w={};function T(e,t,n){let r=e.replace(/\?.*/,``);return n&&(r=e),/ttf|otf|eot|woff2?/i.test(r)&&(r=r.replace(/.*\//,``)),t?`[${t}]${r}`:r}async function E(e,t,n){let r=T(e,t,n.includeQueryParams);if(w[r]!=null)return w[r];n.cacheBust&&(e+=(/\?/.test(e)?`&`:`?`)+new Date().getTime());let i;try{i=S(await C(e,n.fetchRequestInit,({res:e,result:n})=>(t||=e.headers.get(`Content-Type`)||``,ae(n))),t)}catch(t){i=n.imagePlaceholder||``;let r=`Failed to fetch resource: ${e}`;t&&(r=typeof t==`string`?t:t.message),r&&console.warn(r)}return w[r]=i,i}async function oe(e){let t=e.toDataURL();return t===`data:,`?e.cloneNode(!1):d(t)}async function se(e,t){if(e.currentSrc){let t=document.createElement(`canvas`),n=t.getContext(`2d`);return t.width=e.clientWidth,t.height=e.clientHeight,n?.drawImage(e,0,0,t.width,t.height),d(t.toDataURL())}let n=e.poster;return d(await E(n,b(n),t))}async function ce(e,t){try{if(e?.contentDocument?.body)return await j(e.contentDocument.body,t,!0)}catch{}return e.cloneNode(!1)}async function le(e,t){return m(e,HTMLCanvasElement)?oe(e):m(e,HTMLVideoElement)?se(e,t):m(e,HTMLIFrameElement)?ce(e,t):e.cloneNode(D(e))}var ue=e=>e.tagName!=null&&e.tagName.toUpperCase()===`SLOT`,D=e=>e.tagName!=null&&e.tagName.toUpperCase()===`SVG`;async function de(e,t,r){if(D(t))return t;let i=[];return i=ue(e)&&e.assignedNodes?n(e.assignedNodes()):m(e,HTMLIFrameElement)&&e.contentDocument?.body?n(e.contentDocument.body.childNodes):n((e.shadowRoot??e).childNodes),i.length===0||m(e,HTMLVideoElement)||await i.reduce((e,n)=>e.then(()=>j(n,r)).then(e=>{e&&t.appendChild(e)}),Promise.resolve()),t}function fe(e,t,n){let r=t.style;if(!r)return;let a=window.getComputedStyle(e);a.cssText?(r.cssText=a.cssText,r.transformOrigin=a.transformOrigin):i(n).forEach(n=>{let i=a.getPropertyValue(n);n===`font-size`&&i.endsWith(`px`)&&(i=`${Math.floor(parseFloat(i.substring(0,i.length-2)))-.1}px`),m(e,HTMLIFrameElement)&&n===`display`&&i===`inline`&&(i=`block`),n===`d`&&t.getAttribute(`d`)&&(i=`path(${t.getAttribute(`d`)})`),r.setProperty(n,i,a.getPropertyPriority(n))})}function pe(e,t){m(e,HTMLTextAreaElement)&&(t.innerHTML=e.value),m(e,HTMLInputElement)&&t.setAttribute(`value`,e.value)}function O(e,t){if(m(e,HTMLSelectElement)){let n=t,r=Array.from(n.children).find(t=>e.value===t.getAttribute(`value`));r&&r.setAttribute(`selected`,``)}}function k(e,t,n){return m(t,Element)&&(fe(e,t,n),re(e,t,n),pe(e,t),O(e,t)),t}async function A(e,t){let n=e.querySelectorAll?e.querySelectorAll(`use`):[];if(n.length===0)return e;let r={};for(let i=0;i<n.length;i++){let a=n[i].getAttribute(`xlink:href`);if(a){let n=e.querySelector(a),i=document.querySelector(a);!n&&i&&!r[a]&&(r[a]=await j(i,t,!0))}}let i=Object.values(r);if(i.length){let t=`http://www.w3.org/1999/xhtml`,n=document.createElementNS(t,`svg`);n.setAttribute(`xmlns`,t),n.style.position=`absolute`,n.style.width=`0`,n.style.height=`0`,n.style.overflow=`hidden`,n.style.display=`none`;let r=document.createElementNS(t,`defs`);n.appendChild(r);for(let e=0;e<i.length;e++)r.appendChild(i[e]);e.appendChild(n)}return e}async function j(e,t,n){return!n&&t.filter&&!t.filter(e)?null:Promise.resolve(e).then(e=>le(e,t)).then(n=>de(e,n,t)).then(n=>k(e,n,t)).then(e=>A(e,t))}var M=/url\((['"]?)([^'"]+?)\1\)/g,N=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,P=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function F(e){let t=e.replace(/([.*+?^${}()|\[\]\/\\])/g,`\\$1`);return RegExp(`(url\\(['"]?)(${t})(['"]?\\))`,`g`)}function I(e){let t=[];return e.replace(M,(e,n,r)=>(t.push(r),e)),t.filter(e=>!x(e))}async function L(t,n,r,i,a){try{let o=r?e(n,r):n,s=b(n),c;return c=a?S(await a(o),s):await E(o,s,i),t.replace(F(n),`$1${c}$3`)}catch{}return t}function R(e,{preferredFontFormat:t}){return t?e.replace(P,e=>{for(;;){let[n,,r]=N.exec(e)||[];if(!r)return``;if(r===t)return`src: ${n};`}}):e}function z(e){return e.search(M)!==-1}async function B(e,t,n){if(!z(e))return e;let r=R(e,n);return I(r).reduce((e,r)=>e.then(e=>L(e,r,t,n)),Promise.resolve(r))}async function V(e,t,n){let r=t.style?.getPropertyValue(e);if(r){let i=await B(r,null,n);return t.style.setProperty(e,i,t.style.getPropertyPriority(e)),!0}return!1}async function me(e,t){await V(`background`,e,t)||await V(`background-image`,e,t),await V(`mask`,e,t)||await V(`-webkit-mask`,e,t)||await V(`mask-image`,e,t)||await V(`-webkit-mask-image`,e,t)}async function he(e,t){let n=m(e,HTMLImageElement);if(!(n&&!x(e.src))&&!(m(e,SVGImageElement)&&!x(e.href.baseVal)))return;let r=n?e.src:e.href.baseVal,i=await E(r,b(r),t);await new Promise((r,a)=>{e.onload=r,e.onerror=t.onImageErrorHandler?(...e)=>{try{r(t.onImageErrorHandler(...e))}catch(e){a(e)}}:a;let o=e;o.decode&&=r,o.loading===`lazy`&&(o.loading=`eager`),n?(e.srcset=``,e.src=i):e.href.baseVal=i})}async function ge(e,t){let r=n(e.childNodes).map(e=>H(e,t));await Promise.all(r).then(()=>e)}async function H(e,t){m(e,Element)&&(await me(e,t),await he(e,t),await ge(e,t))}function _e(e,t){let{style:n}=e;t.backgroundColor&&(n.backgroundColor=t.backgroundColor),t.width&&(n.width=`${t.width}px`),t.height&&(n.height=`${t.height}px`);let r=t.style;return r!=null&&Object.keys(r).forEach(e=>{n[e]=r[e]}),e}var U={};async function W(e){let t=U[e];return t??(t={url:e,cssText:await(await fetch(e)).text()},U[e]=t,t)}async function G(e,t){let n=e.cssText,r=/url\(["']?([^"')]+)["']?\)/g,i=(n.match(/url\([^)]+\)/g)||[]).map(async i=>{let a=i.replace(r,`$1`);return a.startsWith(`https://`)||(a=new URL(a,e.url).href),C(a,t.fetchRequestInit,({result:e})=>(n=n.replace(i,`url(${e})`),[i,e]))});return Promise.all(i).then(()=>n)}function K(e){if(e==null)return[];let t=[],n=e.replace(/(\/\*[\s\S]*?\*\/)/gi,``),r=RegExp(`((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})`,`gi`);for(;;){let e=r.exec(n);if(e===null)break;t.push(e[0])}n=n.replace(r,``);let i=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,a=RegExp(`((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})`,`gi`);for(;;){let e=i.exec(n);if(e===null){if(e=a.exec(n),e===null)break;i.lastIndex=a.lastIndex}else a.lastIndex=i.lastIndex;t.push(e[0])}return t}async function ve(e,t){let r=[],i=[];return e.forEach(r=>{if(`cssRules`in r)try{n(r.cssRules||[]).forEach((e,n)=>{if(e.type===CSSRule.IMPORT_RULE){let a=n+1,o=e.href,s=W(o).then(e=>G(e,t)).then(e=>K(e).forEach(e=>{try{r.insertRule(e,e.startsWith(`@import`)?a+=1:r.cssRules.length)}catch(t){console.error(`Error inserting rule from remote css`,{rule:e,error:t})}})).catch(e=>{console.error(`Error loading remote css`,e.toString())});i.push(s)}})}catch(n){let a=e.find(e=>e.href==null)||document.styleSheets[0];r.href!=null&&i.push(W(r.href).then(e=>G(e,t)).then(e=>K(e).forEach(e=>{a.insertRule(e,a.cssRules.length)})).catch(e=>{console.error(`Error loading remote stylesheet`,e)})),console.error(`Error inlining remote css file`,n)}}),Promise.all(i).then(()=>(e.forEach(e=>{if(`cssRules`in e)try{n(e.cssRules||[]).forEach(e=>{r.push(e)})}catch(t){console.error(`Error while reading CSS rules from ${e.href}`,t)}}),r))}function ye(e){return e.filter(e=>e.type===CSSRule.FONT_FACE_RULE).filter(e=>z(e.style.getPropertyValue(`src`)))}async function be(e,t){if(e.ownerDocument==null)throw Error(`Provided element is not within a Document`);return ye(await ve(n(e.ownerDocument.styleSheets),t))}function q(e){return e.trim().replace(/["']/g,``)}function xe(e){let t=new Set;function n(e){(e.style.fontFamily||getComputedStyle(e).fontFamily).split(`,`).forEach(e=>{t.add(q(e))}),Array.from(e.children).forEach(e=>{e instanceof HTMLElement&&n(e)})}return n(e),t}async function Se(e,t){let n=await be(e,t),r=xe(e);return(await Promise.all(n.filter(e=>r.has(q(e.style.fontFamily))).map(e=>{let n=e.parentStyleSheet?e.parentStyleSheet.href:null;return B(e.cssText,n,t)}))).join(`
`)}async function Ce(e,t){let n=t.fontEmbedCSS==null?t.skipFonts?null:await Se(e,t):t.fontEmbedCSS;if(n){let t=document.createElement(`style`),r=document.createTextNode(n);t.appendChild(r),e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t)}}async function we(e,t={}){let{width:n,height:r}=c(e,t),i=await j(e,t,!0);return await Ce(i,t),await H(i,t),_e(i,t),await p(i,n,r)}async function Te(e,t={}){let{width:n,height:r}=c(e,t),i=await d(await we(e,t)),a=document.createElement(`canvas`),o=a.getContext(`2d`),s=t.pixelRatio||l(),u=t.canvasWidth||n,f=t.canvasHeight||r;return a.width=u*s,a.height=f*s,t.skipAutoScale||ee(a),a.style.width=`${u}`,a.style.height=`${f}`,t.backgroundColor&&(o.fillStyle=t.backgroundColor,o.fillRect(0,0,a.width,a.height)),o.drawImage(i,0,0,a.width,a.height),a}async function J(e,t={}){return(await Te(e,t)).toDataURL()}var Y={theme:`light`,cardText:`The best way to predict
the future is to create it.`,cardAuthor:``,template:`minimal-dark`,activeTool:`json`,jsonOutput:``,base64Mode:`encode`,base64Output:``,urlMode:`encode`,urlOutput:``},Ee=[{id:`minimal-dark`,name:`Minimal Dark`,colors:[`#1a1a2e`,`#6366f1`]},{id:`sunset`,name:`Sunset`,colors:[`#f97316`,`#ec4899`]},{id:`ocean`,name:`Ocean`,colors:[`#0ea5e9`,`#0891b2`]},{id:`clean`,name:`Clean White`,colors:[`#ffffff`,`#e5e7eb`]},{id:`forest`,name:`Forest`,colors:[`#166534`,`#14532d`]},{id:`midnight`,name:`Midnight`,colors:[`#020617`,`#6366f1`]},{id:`pastel`,name:`Pastel`,colors:[`#fce7f3`,`#d1fae5`]}];function X(e){let t=document.getElementById(`toast`);t.textContent=e,t.classList.add(`show`),clearTimeout(t._timeout),t._timeout=setTimeout(()=>t.classList.remove(`show`),2e3)}async function De(){let e=document.getElementById(`card-preview`);if(e)try{let t=await J(e,{quality:1,pixelRatio:2,backgroundColor:null}),n=document.createElement(`a`);n.download=`cardcraft-`+Date.now()+`.png`,n.href=t,n.click(),X(`Card downloaded! ✨`)}catch(e){console.error(e),X(`Download failed. Try a different browser.`)}}async function Oe(){let e=document.getElementById(`card-preview`);if(e)try{let t=await J(e,{quality:1,pixelRatio:2}),n=await(await fetch(t)).blob();await navigator.clipboard.write([new ClipboardItem({"image/png":n})]),X(`Copied to clipboard! 📋`)}catch(e){console.error(e),X(`Copy failed. Try downloading instead.`)}}function ke(e){try{return JSON.stringify(JSON.parse(e),null,2)}catch(e){return`Invalid JSON: `+e.message}}function Ae(e,t){try{if(t===`encode`){let t=new TextEncoder().encode(e),n=Array.from(t,e=>String.fromCharCode(e)).join(``);return btoa(n)}else{let t=atob(e.trim()),n=Uint8Array.from(t,e=>e.charCodeAt(0));return new TextDecoder().decode(n)}}catch(e){return`Error: `+e.message}}function je(e,t){try{return t===`encode`?encodeURIComponent(e):decodeURIComponent(e)}catch(e){return`Error: `+e.message}}function Z(){let e=document.getElementById(`app`),t=Y.template;e.innerHTML=`
  <!-- Header -->
  <header class="flex items-center justify-between px-6 py-4 border-b" style="border-color: var(--color-border);">
    <div class="flex items-center gap-3">
      <span class="text-2xl">✨</span>
      <span class="font-bold text-lg" style="color: var(--color-text);">CardCraft</span>
    </div>
    <div class="flex items-center gap-3">
      <button id="theme-toggle" class="btn-secondary text-sm !px-3 !py-2">
        ${Y.theme===`light`?`🌙`:`☀️`}
      </button>
      <a href="#support" class="btn-primary text-sm !px-4 !py-2" style="background: #ffdd00; color: #000;">
        ☕ Support
      </a>
    </div>
  </header>

  <!-- Hero -->
  <section class="text-center px-6 pt-12 pb-4">
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight" style="color: var(--color-text);">
      Beautiful Cards in Seconds
    </h1>
    <p class="mt-3 text-lg" style="color: var(--color-text-dim);">
      Create stunning social media graphics. No signup. Free to use.
    </p>
  </section>

  <!-- Card Generator -->
  <section class="max-w-6xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left: Controls -->
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-semibold mb-1.5" style="color: var(--color-text);">Your Text</label>
          <textarea id="card-text" rows="4" class="w-full" placeholder="Type something inspiring...">${$(Y.cardText)}</textarea>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1.5" style="color: var(--color-text);">Attribution (optional)</label>
          <input id="card-author" class="w-full" placeholder="@yourhandle" value="${$(Y.cardAuthor)}" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2" style="color: var(--color-text);">Template</label>
          <div class="flex gap-3 flex-wrap" id="template-selector">
            ${Ee.map(e=>`
              <button class="template-dot ${e.id===t?`active`:``}"
                      data-template="${e.id}"
                      title="${e.name}"
                      style="background: linear-gradient(135deg, ${e.colors[0]}, ${e.colors[1]});">
              </button>
            `).join(``)}
          </div>
        </div>
        <div class="flex gap-3 pt-2">
          <button id="btn-download" class="btn-primary !px-6 !py-3 !text-base">
            ⬇ Download PNG
          </button>
          <button id="btn-copy" class="btn-secondary !px-6 !py-3 !text-base">
            📋 Copy
          </button>
        </div>
      </div>

      <!-- Right: Preview -->
      <div class="preview-container rounded-xl border" style="border-color: var(--color-border); background: var(--color-surface-alt);">
        <div id="card-preview" class="card-preview template-${t}">
          <p class="card-text">${$(Y.cardText).replace(/\n/g,`<br>`)}</p>
          ${Y.cardAuthor?`<p class="card-author">— ${$(Y.cardAuthor)}</p>`:``}
          <span class="card-watermark">Made with CardCraft</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Dev Tools -->
  <section class="max-w-4xl mx-auto px-4 py-12">
    <h2 class="text-2xl font-bold text-center mb-6" style="color: var(--color-text);">Free Developer Tools</h2>
    <div class="flex justify-center gap-2 mb-6 flex-wrap">
      <button class="tool-tab ${Y.activeTool===`json`?`active`:``}" data-tool="json">JSON Formatter</button>
      <button class="tool-tab ${Y.activeTool===`base64`?`active`:``}" data-tool="base64">Base64</button>
      <button class="tool-tab ${Y.activeTool===`url`?`active`:``}" data-tool="url">URL Encode</button>
    </div>

    <!-- JSON Tool -->
    <div id="tool-json" class="space-y-3 ${Y.activeTool===`json`?``:`hidden`}">
      <textarea id="json-input" rows="6" class="w-full" placeholder='Paste JSON here...'></textarea>
      <button id="btn-format-json" class="btn-primary">Format JSON</button>
      <pre id="json-output" class="output-area">${Y.jsonOutput?$(Y.jsonOutput):`Formatted JSON will appear here...`}</pre>
    </div>

    <!-- Base64 Tool -->
    <div id="tool-base64" class="space-y-3 ${Y.activeTool===`base64`?``:`hidden`}">
      <div class="flex gap-3">
        <button id="btn-base64-encode" class="btn-primary ${Y.base64Mode===`encode`?``:`!opacity-50`}">Encode</button>
        <button id="btn-base64-decode" class="btn-primary ${Y.base64Mode===`decode`?``:`!opacity-50`}">Decode</button>
      </div>
      <textarea id="base64-input" rows="4" class="w-full" placeholder="${Y.base64Mode===`encode`?`Enter text to encode...`:`Enter Base64 to decode...`}"></textarea>
      <button id="btn-process-base64" class="btn-primary">${Y.base64Mode===`encode`?`Encode`:`Decode`}</button>
      <pre id="base64-output" class="output-area">${Y.base64Output||`Result will appear here...`}</pre>
    </div>

    <!-- URL Tool -->
    <div id="tool-url" class="space-y-3 ${Y.activeTool===`url`?``:`hidden`}">
      <div class="flex gap-3">
        <button id="btn-url-encode" class="btn-primary ${Y.urlMode===`encode`?``:`!opacity-50`}">Encode</button>
        <button id="btn-url-decode" class="btn-primary ${Y.urlMode===`decode`?``:`!opacity-50`}">Decode</button>
      </div>
      <textarea id="url-input" rows="4" class="w-full" placeholder="${Y.urlMode===`encode`?`Enter URL or text to encode...`:`Enter URL-encoded text to decode...`}"></textarea>
      <button id="btn-process-url" class="btn-primary">${Y.urlMode===`encode`?`Encode`:`Decode`}</button>
      <pre id="url-output" class="output-area">${Y.urlOutput||`Result will appear here...`}</pre>
    </div>
  </section>

  <!-- Support -->
  <section id="support" class="max-w-2xl mx-auto px-4 py-12">
    <div class="support-card">
      <h2 class="text-2xl font-bold mb-3">Enjoy CardCraft?</h2>
      <p class="text-white/80 mb-6">
        If this tool saves you time or helps you create something beautiful,
        consider buying me a coffee to keep the tools free and ad-free.
      </p>
      <a href="https://www.buymeacoffee.com/YOUR_USERNAME" target="_blank" rel="noopener" class="bmc-btn">
        🟡 Buy me a coffee — \$5
      </a>
      <p class="text-sm text-white/50 mt-4">
        (Replace YOUR_USERNAME with your Buy Me a Coffee handle to start accepting tips!)
      </p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="text-center py-8 px-4" style="color: var(--color-text-dim); font-size: 13px;">
    <p>Built with ✨ CardCraft — Free & Open Source</p>
  </footer>
  `,Me()}function Me(){document.getElementById(`theme-toggle`)?.addEventListener(`click`,()=>{Y.theme=Y.theme===`light`?`dark`:`light`,document.documentElement.setAttribute(`data-theme`,Y.theme),Z()}),document.getElementById(`card-text`)?.addEventListener(`input`,e=>{Y.cardText=e.target.value,Q()}),document.getElementById(`card-author`)?.addEventListener(`input`,e=>{Y.cardAuthor=e.target.value,Q()}),document.querySelectorAll(`[data-template]`).forEach(e=>{e.addEventListener(`click`,()=>{Y.template=e.dataset.template,Z()})}),document.getElementById(`btn-download`)?.addEventListener(`click`,De),document.getElementById(`btn-copy`)?.addEventListener(`click`,Oe),document.querySelectorAll(`[data-tool]`).forEach(e=>{e.addEventListener(`click`,()=>{Y.activeTool=e.dataset.tool,Z()})}),document.getElementById(`btn-format-json`)?.addEventListener(`click`,()=>{let e=document.getElementById(`json-input`).value;Y.jsonOutput=ke(e),document.getElementById(`json-output`).textContent=Y.jsonOutput}),document.getElementById(`btn-base64-encode`)?.addEventListener(`click`,()=>{Y.base64Mode=`encode`,Z()}),document.getElementById(`btn-base64-decode`)?.addEventListener(`click`,()=>{Y.base64Mode=`decode`,Z()}),document.getElementById(`btn-process-base64`)?.addEventListener(`click`,()=>{let e=document.getElementById(`base64-input`).value;Y.base64Output=Ae(e,Y.base64Mode),document.getElementById(`base64-output`).textContent=Y.base64Output}),document.getElementById(`btn-url-encode`)?.addEventListener(`click`,()=>{Y.urlMode=`encode`,Z()}),document.getElementById(`btn-url-decode`)?.addEventListener(`click`,()=>{Y.urlMode=`decode`,Z()}),document.getElementById(`btn-process-url`)?.addEventListener(`click`,()=>{let e=document.getElementById(`url-input`).value;Y.urlOutput=je(e,Y.urlMode),document.getElementById(`url-output`).textContent=Y.urlOutput})}function Q(){let e=document.getElementById(`card-preview`);if(!e)return;let t=e.querySelector(`.card-text`),n=e.querySelector(`.card-author`);t&&(t.innerHTML=$(Y.cardText).replace(/\n/g,`<br>`)||`Your text here...`),n&&(Y.cardAuthor?(n.innerHTML=`— `+$(Y.cardAuthor),n.style.display=``):n.style.display=`none`)}function $(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}document.documentElement.setAttribute(`data-theme`,Y.theme),Z();