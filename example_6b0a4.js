!function(e){function t(t){for(var r,o,n=t[0],l=t[1],d=t[2],m=0,u=[];m<n.length;m++)o=n[m],i[o]&&u.push(i[o][0]),i[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(c&&c(t);u.length;)u.shift()();return s.push.apply(s,d||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],r=!0,n=1;n<a.length;n++){var l=a[n];0!==i[l]&&(r=!1)}r&&(s.splice(t--,1),e=o(o.s=a[0]))}return e}var r={},i={1:0,2:0},s=[];function o(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=r,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(a,r,function(t){return e[t]}.bind(null,r));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var n=window.webpackJsonp=window.webpackJsonp||[],l=n.push.bind(n);n.push=t,n=n.slice();for(var d=0;d<n.length;d++)t(n[d]);var c=l;s.push(["JKdDR",0]),a()}({Al628:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.checkIfImageCached=(e=>{const t=document.createElement("img");return t.src=e,t.complete}),t.loadImage=((e,t)=>{const a=new Image;a.addEventListener("load",t),a.addEventListener("error",t),a.src=e})},JKdDR:function(e,t,a){"use strict";var r=a("q1tIB"),i=d(r),s=a("i8i4L"),o=d(a("tjUo5")),n=a("RTJm3"),l=d(n);function d(e){return e&&e.__esModule?e:{default:e}}const c=()=>i.default.createElement("div",{className:`overlay ${l.default.overlay} is--indicator`},i.default.createElement("svg",{className:"overlay__icon"},i.default.createElement("use",{xmlnsXlink:"http://www.w3.org/1999/xlink",xlinkHref:"#dog-icon"}))),m=()=>i.default.createElement("div",{className:`overlay ${l.default.overlay} is--error`},i.default.createElement("div",{className:"overlay__msg"},"Ruh-Roh!"),i.default.createElement("svg",{className:"overlay__icon"},i.default.createElement("use",{xmlnsXlink:"http://www.w3.org/1999/xlink",xlinkHref:"#sad-dog-icon"}))),u={highRes:{BANNER:"./imgs/corgi-hi-res-banner.jpg",FULL:"./imgs/corgi-hi-res-full.jpg",PORTRAIT:"./imgs/corgi-hi-res-portrait.jpg"},lowRes:{BANNER:"./imgs/corgi-low-res-banner.jpg",FULL:"./imgs/corgi-low-res-full.jpg",MISSING:"./imgs/missing-image.jpg",PORTRAIT:"./imgs/corgi-low-res-portrait.jpg"}};(0,s.render)(i.default.createElement(class extends r.Component{constructor(){super(),this.state={mobileDevice:!1,mounted:!1},this.determineDevice=this.determineDevice.bind(this),this.handleResize=this.handleResize.bind(this)}componentDidMount(){this.determineDevice(),window.addEventListener("resize",this.handleResize),this.setState({mounted:!0})}handleResize(e){this.debounce&&clearTimeout(this.debounce),this.debounce=setTimeout(this.determineDevice,50)}determineDevice(){window.matchMedia(n.MOBILE_BP).matches?this.setState({mobileDevice:!0}):this.state.mobileDevice&&this.setState({mobileDevice:!1})}render(){const{mobileDevice:e,mounted:t}=this.state;if(!t)return null;const a=e?"banner":"full",s=a.toUpperCase();return i.default.createElement(r.Fragment,null,i.default.createElement("div",{className:`images-wrapper ${l.default.imagesWrapper}`},i.default.createElement("div",{className:`${l.default.exampleWrapper}`},i.default.createElement("div",{className:`image-wrapper ${l.default.imageWrapper} is--${a}`},i.default.createElement(o.default,{LoadingIndicator:c,sources:[{media:n.BREAKPOINT_DESKTOP_LOW_RES,srcSet:u.highRes[s]},{media:n.BREAKPOINT_MOBILE_HIGH_RES,srcSet:u.highRes[s]},{media:n.BREAKPOINT_MOBILE_LOW_RES,srcSet:u.lowRes[s]}],src:u.lowRes[s]})),i.default.createElement("div",{className:`description ${l.default.description} for--header-image`},"The first example is utilizing the ",i.default.createElement("code",null,"picture")," tag so that on devices with ",i.default.createElement("code",null,"2.0")," DPR (or higher) or a ",i.default.createElement("code",null,"1024px")," viewing width, a high-resolution image will be used. On devices with ",i.default.createElement("code",null,"1.0")," DPR, or a max viewing width of ",i.default.createElement("code",null,"1023px")," a low-resoltuion image will be used.")),i.default.createElement("div",{className:`row ${l.default.row}`},i.default.createElement("div",{className:`row__item image-wrapper ${l.default.imageWrapper} is--portrait`},i.default.createElement(o.default,{LoadingIndicator:c,src:e?u.lowRes.PORTRAIT:u.highRes.PORTRAIT})),i.default.createElement("div",{className:`row__item image-wrapper ${l.default.imageWrapper} is--portrait`},i.default.createElement(o.default,{ErrorOverlay:m,LoadingIndicator:c,src:u.lowRes.MISSING}))),i.default.createElement("div",{className:`description ${l.default.description}`},"The second example is using an ",i.default.createElement("code",null,"img")," tag and swapping the source based on CSS breakpoints via Javascript. The third example shows what happens if an image fails to load and you pass in an ",i.default.createElement("code",null,"ErrorOverlay"),".")))}},null),document.getElementById("root"))},RTJm3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.BREAKPOINT_DESKTOP_LOW_RES=t.BREAKPOINT_MOBILE_LOW_RES=t.BREAKPOINT_MOBILE_HIGH_RES=t.DESKTOP_BP=t.MOBILE_BP=void 0;var r=a("Ad6oS");const i=t.MOBILE_BP="(max-width: 1023px)",s=t.DESKTOP_BP="(min-width: 1024px)",o=(t.BREAKPOINT_MOBILE_HIGH_RES=`${i} and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)`,t.BREAKPOINT_MOBILE_LOW_RES=i,t.BREAKPOINT_DESKTOP_LOW_RES=s,r.css.keyframes({"0%":{transform:"translate(-50%, -50%) scale(0.9)",opacity:0},"50%":{transform:"translate(-50%, -50%) scale(1)",opacity:1},"100%":{transform:"translate(-50%, -50%) scale(0.9)",opacity:0}})),n=r.css.keyframes({"0%":{transform:"translate(-50%, -50%)"},"24%,26%":{transform:"translate(-50%, -50%) rotate(20deg)"},"48%,51%":{transform:"translate(-50%, -50%)"},"74%,76%":{transform:"translate(-50%, -50%) rotate(-20deg)"},"100%":{transform:"translate(-50%, -50%)"}}),l=r.css.keyframes({"0%":{opacity:0},"100%":{opacity:1}});t.default={row:(0,r.css)({display:"flex",flexDirection:"row"," .row__item":{width:"50%",":nth-child(odd)":{marginRight:"0.25em"},":nth-child(even)":{marginLeft:"0.25em"}}}),description:(0,r.css)({lineHeight:"1.3em",padding:"0.5em",borderRadius:"0.25em",marginTop:"0.4em",boxShadow:"0 2px 2px 0 #00000050",background:"#fff",[`@media${s}`]:{fontSize:"1.5rem",".for--header-image":{[`@media${s}`]:{borderRadius:"0.25em 0.25em 0.5em 0.5em",margin:"0.25em",background:"#ffffffcf",position:"absolute",bottom:0,left:0}}}}),exampleWrapper:(0,r.css)({position:"relative"}),imagesWrapper:(0,r.css)({maxWidth:"1050px",margin:"0 auto"}),imageWrapper:(0,r.css)({border:"solid 1px #a0a0a0",borderRadius:"1em",marginTop:"0.5em",overflow:"hidden",position:"relative","::before":{content:'""',width:"100%",display:"block"},".is--full":{maxWidth:"1364px","::before":{paddingTop:"80%"}},".is--banner":{maxWidth:"1384px","::before":{paddingTop:"49%"}},".is--portrait":{maxWidth:"633px","::before":{paddingTop:"100%"}},"> .image-loader":{position:"absolute",top:0,left:0,right:0,bottom:0}}),imgLoader:(0,r.css)({" img":{width:"100%"}}),overlay:(0,r.css)({background:"#eee",position:"absolute",top:0,left:0,bottom:0,right:0,pointerEvents:"none",animation:`${l} 1s forwards`," .overlay__icon":{width:"30%",maxWidth:"100px",position:"absolute",top:"50%",left:"50%",transformOrigin:"center"},".is--indicator .overlay__icon":{animation:`${o} 2s infinite`},".is--error":{" .overlay__msg":{color:"#b50d00",fontWeight:"bold",position:"absolute",top:"32%",left:"50%",transform:"rotate(10deg)"}," .overlay__icon":{fill:"#b50d00",animation:`${n} 6s infinite`}}})}},nndFe:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Ad6oS");const i={imgLoader:(0,r.css)({position:"relative",":not(.is--mounted)":{" noscript + img, noscript + picture":{display:"none"}}}),img:(0,r.css)({width:"100%",display:"block",opacity:0,transition:"opacity 0.5s",position:"relative",".is--loaded":{opacity:1}}),overlayWrapper:(0,r.css)({position:"absolute",top:0,left:0,bottom:0,right:0,pointerEvents:"none"})};t.default=i},tjUo5:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.tempImg=void 0;var r=a("q1tIB"),i=l(r),s=a("17x9q"),o=a("Al628"),n=l(a("nndFe"));function l(e){return e&&e.__esModule?e:{default:e}}const d="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";class c extends r.Component{static getDerivedStateFromProps(e,t){const a={};return JSON.stringify(t.sources)!==JSON.stringify(e.sources)&&(a.sources=e.sources),t.src!==e.src&&(a.src=e.src),(a.src||a.sources)&&(a.loaded=!1,a.revealImage=!1),Object.keys(a).length?a:null}constructor(e){super(),this.state={error:!1,loaded:!1,mounted:!1,revealImage:!1,showIndicator:!1,sources:e.sources,src:e.src}}componentDidMount(){this.mounted=!0,this.loadSources(),this.setMountState()}componentDidUpdate(e,t){JSON.stringify(this.state.sources)===JSON.stringify(t.sources)&&this.state.src===t.src||this.loadSources()}shouldComponentUpdate(e,t){return this.state.error!==t.error||this.state.loaded!==t.loaded||this.state.src!==e.src||this.state.showIndicator!==t.showIndicator||this.state.revealImage!==t.revealImage}componentWillUnmount(){this.mounted=!1}setMountState(){this.setState({mounted:this.mounted})}loadSources(){const{sources:e,src:t}=this.state;let a=t;if(e)for(let t=0;t<e.length;t++){const r=e[t];if(window.matchMedia(r.media).matches){a=r.srcSet,this.updateSourceFromQuery(a);break}}(0,o.checkIfImageCached)(a)?this.handleLoadedImage():this.startLoadingImage(a)}updateSourceFromQuery(e){this.setState({src:e})}startLoadingImage(e){(0,o.loadImage)(e,this.handleLoadedImage.bind(this)),this.indicatorDelay=setTimeout(()=>{this.state.loaded||this.setState({showIndicator:!0})},this.props.indicatorDelay)}handleLoadedImage(e){this.mounted&&(e&&"load"!==e.type?this.setState({error:!0}):this.setState({loaded:!0},()=>{window.requestAnimationFrame(()=>{this.mounted&&this.setState({revealImage:!0})})}))}renderImg({alt:e,imgClass:t,noscriptImgClass:a,noscriptSrc:s,src:o}){const n=(t,a)=>i.default.createElement("img",{className:t,src:a,alt:e});return i.default.createElement(r.Fragment,null,i.default.createElement("noscript",null,n(a,s)),n(t,o))}renderPicture({alt:e,imgClass:t,noscriptImgClass:a,noscriptSrc:s,sources:o,src:n}){const l=(t,a)=>i.default.createElement("picture",null,o.map(({media:e,srcSet:t})=>i.default.createElement("source",{key:e,srcSet:t,media:e})),i.default.createElement("img",{className:t,src:a,alt:e}));return i.default.createElement(r.Fragment,null,i.default.createElement("noscript",null,l(a,s)),l(t,n))}render(){const{error:e,loaded:t,mounted:a,revealImage:r,showIndicator:s}=this.state,{alt:o,className:l,ErrorOverlay:c,LoadingIndicator:m,sources:u,src:p}=this.props,f=t?p:d,g=`image-loader__image ${n.default.img}`,h=`${g}${r?" is--loaded":""}`,v=`${g} is--loaded`,E=l?` ${l}`:"",_=m&&s,w=c&&e,b=a?"is--mounted":"";return i.default.createElement("div",{className:`image-loader ${n.default.imgLoader}${E} ${b}`},_&&i.default.createElement("div",{className:`image-loader__indicator-wrapper ${n.default.overlayWrapper}`},i.default.createElement(m,null)),w&&i.default.createElement("div",{className:`image-loader__error-wrapper ${n.default.overlayWrapper}`},i.default.createElement(c,null)),u&&this.renderPicture({alt:o,imgClass:h,noscriptImgClass:v,sources:u,src:f}),!u&&this.renderImg({alt:o,imgClass:h,noscriptImgClass:v,noscriptSrc:p,src:f}))}}c.defaultProps={indicatorDelay:300},c.propTypes={alt:s.string,className:s.string,ErrorOverlay:s.func,LoadingIndicator:s.func,indicatorDelay:s.number,sources:(0,s.arrayOf)((0,s.shape)({media:s.string,srcSet:s.string})),src:s.string},t.default=c,t.tempImg=d}});