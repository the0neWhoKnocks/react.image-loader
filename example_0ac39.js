!function(e){function t(t){for(var a,o,n=t[0],l=t[1],d=t[2],u=0,m=[];u<n.length;u++)o=n[u],i[o]&&m.push(i[o][0]),i[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(c&&c(t);m.length;)m.shift()();return s.push.apply(s,d||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],a=!0,n=1;n<r.length;n++){var l=r[n];0!==i[l]&&(a=!1)}a&&(s.splice(t--,1),e=o(o.s=r[0]))}return e}var a={},i={1:0,2:0},s=[];function o(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=a,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(r,a,function(t){return e[t]}.bind(null,a));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var n=window.webpackJsonp=window.webpackJsonp||[],l=n.push.bind(n);n.push=t,n=n.slice();for(var d=0;d<n.length;d++)t(n[d]);var c=l;s.push(["JKdDR",0]),r()}({Al628:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.loadImage=t.checkIfImageCached=void 0;t.checkIfImageCached=(e=>{const t=document.createElement("img");return t.src=e,t.complete});t.loadImage=((e,t)=>{const r=new Image;r.addEventListener("load",t),r.addEventListener("error",t),r.src=e})},JKdDR:function(e,t,r){"use strict";var a=o(r("cDcdf")),i=r("faye7"),s=o(r("ruhDg"));function o(e){return e&&e.__esModule?e:{default:e}}(0,i.render)(a.default.createElement(s.default,null),document.getElementById("root"))},RTJm3:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.BREAKPOINT_DESKTOP_LOW_RES=t.BREAKPOINT_MOBILE_LOW_RES=t.BREAKPOINT_MOBILE_HIGH_RES=t.DESKTOP_BP=t.MOBILE_BP=void 0;var a=r("kDDqW");const i="(max-width: 1023px)";t.MOBILE_BP=i;const s="(min-width: 1024px)";t.DESKTOP_BP=s;const o=`${i} and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)`;t.BREAKPOINT_MOBILE_HIGH_RES=o;t.BREAKPOINT_MOBILE_LOW_RES="(max-width: 1023px)";t.BREAKPOINT_DESKTOP_LOW_RES="(min-width: 1024px)";const n=(0,a.keyframes)({name:"1l8vjtw-pulse",styles:"0%{transform:translate(-50%,-50%) scale(0.9);opacity:0;}50%{transform:translate(-50%,-50%) scale(1);opacity:1;}100%{transform:translate(-50%,-50%) scale(0.9);opacity:0;}label:pulse;"}),l=(0,a.keyframes)({name:"v8661q-tiltHead",styles:"0%{transform:translate(-50%,-50%);}24%,26%{transform:translate(-50%,-50%) rotate(20deg);}48%,51%{transform:translate(-50%,-50%);}74%,76%{transform:translate(-50%,-50%) rotate(-20deg);}100%{transform:translate(-50%,-50%);}label:tiltHead;"}),d=(0,a.keyframes)({name:"15uttix-fadeIn",styles:"0%{opacity:0;}100%{opacity:1;}label:fadeIn;"});var c={description:(0,a.css)("line-height:1.3em;padding:0.5em;border-radius:0.25em;margin-top:0.4em;box-shadow:0 2px 2px 0 #00000050;background:#fff;@media",s,"{font-size:1.5rem;&.for--header-image{@media",s,"{border-radius:0.25em 0.25em 0.5em 0.5em;margin:0.25em;background:#ffffffcf;position:absolute;bottom:0;left:0;}}}label:description;"),exampleWrapper:(0,a.css)({name:"vtylzy-exampleWrapper",styles:"position:relative;label:exampleWrapper;"}),imagesWrapper:(0,a.css)({name:"1g2egtq-imagesWrapper",styles:"max-width:1050px;margin:0 auto;label:imagesWrapper;"}),imageWrapper:(0,a.css)({name:"1saakmy-imageWrapper",styles:"border:solid 1px #a0a0a0;border-radius:1em;margin-top:0.5em;overflow:hidden;position:relative;&::before{content:'';width:100%;display:block;}&.is--full{max-width:1364px;&::before{padding-top:80%;}}&.is--banner{max-width:1384px;&::before{padding-top:49%;}}&.is--portrait{max-width:633px;&::before{padding-top:100%;}}.image-loader{position:absolute;top:0;left:0;right:0;bottom:0;&.has--error{.overlay__icon{fill:#b50d00;}}}label:imageWrapper;"}),overlay:(0,a.css)("background:#eee;position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none;animation:",d," 1s forwards;.overlay__icon{width:30%;max-width:100px;position:absolute;top:50%;left:50%;transform-origin:center;}&.is--indicator .overlay__icon{animation:",n," 2s infinite;}&.is--error{.overlay__msg{color:#b50d00;font-weight:bold;position:absolute;top:32%;left:50%;transform:rotate(10deg);}.overlay__icon{fill:#b50d00;animation:",l," 6s infinite;}}label:overlay;"),row:(0,a.css)({name:"1qfjsfh-row",styles:"display:flex;flex-direction:row;.row__item{width:50%;&:nth-of-type(odd){margin-right:0.25em;}&:nth-of-type(even){margin-left:0.25em;}}label:row;"})};t.default=c},cDcdf:function(e,t){e.exports=React},faye7:function(e,t){e.exports=ReactDOM},nndFe:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.ROOT_CLASS=t.MODIFIER__LOADED=t.MODIFIER__ERROR=void 0;var a=r("kDDqW");t.MODIFIER__ERROR="has--error";t.MODIFIER__LOADED="is--loaded";t.ROOT_CLASS="image-loader";var i=(0,a.css)("position:relative;.","image-loader","{&__image{width:100%;display:block;opacity:0;transition:opacity 0.5s;position:relative;&.is--loaded{opacity:1;}}&__indicator-wrapper,&__error-wrapper{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none;}}&.","is--loaded","{.","image-loader","{&__image{opacity:1;}}}");t.default=i},rf6OM:function(e,t){e.exports=PropTypes},ruhDg:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(r("cDcdf")),i=function(e){return e&&e.__esModule?e:{default:e}}(r("tjUo5")),s=o(r("RTJm3"));function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};a.get||a.set?Object.defineProperty(t,r,a):t[r]=e[r]}return t.default=e,t}const n=()=>a.default.createElement("div",{className:`overlay ${s.default.overlay} is--indicator`},a.default.createElement("svg",{className:"overlay__icon"},a.default.createElement("use",{xmlnsXlink:"http://www.w3.org/1999/xlink",xlinkHref:"#dog-icon"}))),l=()=>a.default.createElement("div",{className:`overlay ${s.default.overlay} is--error`},a.default.createElement("div",{className:"overlay__msg"},"Ruh-Roh!"),a.default.createElement("svg",{className:"overlay__icon"},a.default.createElement("use",{xmlnsXlink:"http://www.w3.org/1999/xlink",xlinkHref:"#sad-dog-icon"}))),d={highRes:{BANNER:"./imgs/corgi-hi-res-banner.jpg",FULL:"./imgs/corgi-hi-res-full.jpg",PORTRAIT:"./imgs/corgi-hi-res-portrait.jpg"},lowRes:{BANNER:"./imgs/corgi-low-res-banner.jpg",FULL:"./imgs/corgi-low-res-full.jpg",MISSING:"./imgs/missing-image.jpg",PORTRAIT:"./imgs/corgi-low-res-portrait.jpg"}};t.default=class extends a.Component{constructor(){super(),this.state={mobileDevice:!1,mounted:!1},this.determineDevice=this.determineDevice.bind(this),this.handleResize=this.handleResize.bind(this)}componentDidMount(){this.determineDevice(),window.addEventListener("resize",this.handleResize),this.setState({mounted:!0})}handleResize(e){this.debounce&&clearTimeout(this.debounce),this.debounce=setTimeout(this.determineDevice,50)}determineDevice(){window.matchMedia(s.MOBILE_BP).matches?this.setState({mobileDevice:!0}):this.state.mobileDevice&&this.setState({mobileDevice:!1})}render(){const{mobileDevice:e}=this.state,t=e?"banner":"full",r=t.toUpperCase();return a.default.createElement(a.Fragment,null,a.default.createElement("div",{className:`images-wrapper ${s.default.imagesWrapper}`},a.default.createElement("div",{className:`${s.default.exampleWrapper}`},a.default.createElement("div",{className:`image-wrapper ${s.default.imageWrapper} is--${t}`},a.default.createElement(i.default,{LoadingIndicator:n,sources:[{media:s.BREAKPOINT_DESKTOP_LOW_RES,srcSet:d.highRes[r]},{media:s.BREAKPOINT_MOBILE_HIGH_RES,srcSet:d.highRes[r]},{media:s.BREAKPOINT_MOBILE_LOW_RES,srcSet:d.lowRes[r]}],src:d.lowRes[r]})),a.default.createElement("div",{className:`description ${s.default.description} for--header-image`},"The first example is utilizing the ",a.default.createElement("code",null,"picture")," tag so that on devices with ",a.default.createElement("code",null,"2.0")," DPR (or higher) or a ",a.default.createElement("code",null,"1024px")," viewing width, a high-resolution image will be used. On devices with ",a.default.createElement("code",null,"1.0")," DPR, or a max viewing width of ",a.default.createElement("code",null,"1023px")," a low-resoltuion image will be used.")),a.default.createElement("div",{className:`row ${s.default.row}`},a.default.createElement("div",{className:`row__item image-wrapper ${s.default.imageWrapper} is--portrait`},a.default.createElement(i.default,{LoadingIndicator:n,src:e?d.lowRes.PORTRAIT:d.highRes.PORTRAIT})),a.default.createElement("div",{className:`row__item image-wrapper ${s.default.imageWrapper} is--portrait`},a.default.createElement(i.default,{ErrorOverlay:l,LoadingIndicator:n,src:d.lowRes.MISSING}))),a.default.createElement("div",{className:`description ${s.default.description}`},"The second example is using an ",a.default.createElement("code",null,"img")," tag and swapping the source based on CSS breakpoints via Javascript. The third example shows what happens if an image fails to load and you pass in an ",a.default.createElement("code",null,"ErrorOverlay"),".")))}}},tjUo5:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.tempImg=t.default=void 0;var a=l(r("cDcdf")),i=r("KAy6d"),s=r("rf6OM"),o=r("Al628"),n=l(r("nndFe"));function l(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};a.get||a.set?Object.defineProperty(t,r,a):t[r]=e[r]}return t.default=e,t}const d="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";t.tempImg=d;const c=({children:e})=>a.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:(0,i.renderToStaticMarkup)(e)}});class u extends a.Component{static buildEmptySources(e){return e.map((e,t)=>({media:t,srcSet:""}))}static getMatchedSource(e,t){let r=e;for(let e=0;e<t.length;e++){const a=t[e];if(window.matchMedia(a.media).matches){r=a.srcSet;break}}return r}constructor({sources:e,src:t}){super(),this.state={error:!1,loaded:!1,mounted:!1,revealImage:!1,showIndicator:!1,src:t},this.emptySources=u.buildEmptySources(e)}componentDidMount(){this.mounted=!0,this.updateState({src:u.getMatchedSource(this.state.src,this.props.sources)},this.loadSources)}componentDidUpdate(e,t){const{sources:r,src:a}=this.props,i=e.src,s=e.sources,o=JSON.stringify(s)===JSON.stringify(r),n={};i!==a&&(n.src=a),o||(n.sources=r,this.emptySources=u.buildEmptySources(r),n.src=u.getMatchedSource(a,r)),(n.src||n.sources)&&(n.loaded=!1,n.revealImage=!1),Object.keys(n).length&&this.updateState(n,this.loadSources)}shouldComponentUpdate(e,t){return this.state.error!==t.error||this.state.loaded!==t.loaded||this.state.src!==e.src||this.state.showIndicator!==t.showIndicator||this.state.revealImage!==t.revealImage}componentWillUnmount(){this.mounted=!1}loadSources(){const{src:e}=this.state;(0,o.checkIfImageCached)(e)?this.handleLoadedImage():this.startLoadingImage(e)}updateState(e,t){this.setState(e,t)}startLoadingImage(e){(0,o.loadImage)(e,this.handleLoadedImage.bind(this)),this.indicatorDelay=setTimeout(()=>{this.state.loaded||this.setState({showIndicator:!0})},this.props.indicatorDelay)}handleLoadedImage(e){this.mounted&&(e&&"load"!==e.type?this.setState({error:!0}):this.setState({loaded:!0},()=>{window.requestAnimationFrame(()=>{this.mounted&&this.setState({revealImage:!0})})}))}renderImg({alt:e,imgClass:t,noscriptImgClass:r,noscriptSrc:i,src:s}){const o=(t,r)=>a.default.createElement("img",{className:t,src:r,alt:e});return a.default.createElement(a.Fragment,null,a.default.createElement(c,null,o(r,i)),o(t,s))}renderPicture({alt:e,imgClass:t,noscriptImgClass:r,noscriptSources:i,noscriptSrc:s,sources:o,src:n}){const l=(t,r,i)=>a.default.createElement("picture",null,i.map(({media:e,srcSet:t})=>a.default.createElement("source",{key:e,srcSet:t,media:e})),a.default.createElement("img",{className:t,src:r,alt:e}));return a.default.createElement(a.Fragment,null,a.default.createElement(c,null,l(r,s,i)),l(t,n,o))}render(){const{error:e,loaded:t,revealImage:r,showIndicator:i}=this.state,{alt:s,className:o,ErrorOverlay:l,LoadingIndicator:c,sources:u,src:m}=this.props,p=t?m:d,f=`${n.ROOT_CLASS}__image`,g=`${f}${r?` ${n.MODIFIER__LOADED}`:""}`,h=`${f} ${n.MODIFIER__LOADED}`,_=c&&i,v=l&&e,E={alt:s,imgClass:g,noscriptImgClass:h,noscriptSrc:m,src:p};let O="",y=this.emptySources;return r&&(O=n.MODIFIER__LOADED),e&&(O+=` ${n.MODIFIER__ERROR}`),t&&(y=u),a.default.createElement("div",{className:`${n.ROOT_CLASS} ${n.default} ${o} ${O}`},_&&a.default.createElement("div",{className:`${n.ROOT_CLASS}__indicator-wrapper`},a.default.createElement(c,null)),v&&a.default.createElement("div",{className:`${n.ROOT_CLASS}__error-wrapper`},a.default.createElement(l,null)),!!y.length&&this.renderPicture({...E,noscriptSources:u,sources:y}),!y.length&&this.renderImg({...E}))}}u.defaultProps={className:"",indicatorDelay:300,sources:[]},u.propTypes={alt:s.string,className:s.string,ErrorOverlay:s.func,LoadingIndicator:s.func,indicatorDelay:s.number,sources:(0,s.arrayOf)((0,s.shape)({media:s.string,srcSet:s.string})),src:s.string};var m=u;t.default=m}});