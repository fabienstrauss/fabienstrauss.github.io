import{h as A,$ as F}from"./index-BxG-wGSt.js";/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class g{constructor(t,e,i,n,l="div"){this.parent=t,this.object=e,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(l),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),g.nextNameID=g.nextNameID||0,this.$name.id=`lil-gui-name-${++g.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",r=>r.stopPropagation()),this.domElement.addEventListener("keyup",r=>r.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class k extends g{constructor(t,e,i){super(t,e,i,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function S(o){let t,e;return(t=o.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=o.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=o.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const O={isPrimitive:!0,match:o=>typeof o=="string",fromHexString:S,toHexString:S},C={isPrimitive:!0,match:o=>typeof o=="number",fromHexString:o=>parseInt(o.substring(1),16),toHexString:o=>"#"+o.toString(16).padStart(6,0)},I={isPrimitive:!1,match:o=>Array.isArray(o)||ArrayBuffer.isView(o),fromHexString(o,t,e=1){const i=C.fromHexString(o);t[0]=(i>>16&255)/255*e,t[1]=(i>>8&255)/255*e,t[2]=(i&255)/255*e},toHexString([o,t,e],i=1){i=255/i;const n=o*i<<16^t*i<<8^e*i<<0;return C.toHexString(n)}},R={isPrimitive:!1,match:o=>Object(o)===o,fromHexString(o,t,e=1){const i=C.fromHexString(o);t.r=(i>>16&255)/255*e,t.g=(i>>8&255)/255*e,t.b=(i&255)/255*e},toHexString({r:o,g:t,b:e},i=1){i=255/i;const n=o*i<<16^t*i<<8^e*i<<0;return C.toHexString(n)}},V=[O,C,I,R];function D(o){return V.find(t=>t.match(o))}class M extends g{constructor(t,e,i,n){super(t,e,i,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=D(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const l=S(this.$text.value);l&&this._setValueFromHexString(l)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class x extends g{constructor(t,e,i){super(t,e,i,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class U extends g{constructor(t,e,i,n,l,r){super(t,e,i,"lil-number"),this._initInput(),this.min(n),this.max(l);const a=r!==void 0;this.step(a?r:this._getImplicitStep(),a),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let s=parseFloat(this.$input.value);isNaN(s)||(this._stepExplicit&&(s=this._snap(s)),this.setValue(this._clamp(s)))},e=s=>{const h=parseFloat(this.$input.value);isNaN(h)||(this._snapClampSetValue(h+s),this.$input.value=this.getValue())},i=s=>{s.key==="Enter"&&this.$input.blur(),s.code==="ArrowUp"&&(s.preventDefault(),e(this._step*this._arrowKeyMultiplier(s))),s.code==="ArrowDown"&&(s.preventDefault(),e(this._step*this._arrowKeyMultiplier(s)*-1))},n=s=>{this._inputFocused&&(s.preventDefault(),e(this._step*this._normalizeMouseWheel(s)))};let l=!1,r,a,c,d,u;const p=5,f=s=>{r=s.clientX,a=c=s.clientY,l=!0,d=this.getValue(),u=0,window.addEventListener("mousemove",v),window.addEventListener("mouseup",b)},v=s=>{if(l){const h=s.clientX-r,m=s.clientY-a;Math.abs(m)>p?(s.preventDefault(),this.$input.blur(),l=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(h)>p&&b()}if(!l){const h=s.clientY-c;u-=h*this._step*this._arrowKeyMultiplier(s),d+u>this._max?u=this._max-d:d+u<this._min&&(u=this._min-d),this._snapClampSetValue(d+u)}c=s.clientY},b=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",v),window.removeEventListener("mouseup",b)},y=()=>{this._inputFocused=!0},w=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",i),this.$input.addEventListener("wheel",n,{passive:!1}),this.$input.addEventListener("mousedown",f),this.$input.addEventListener("focus",y),this.$input.addEventListener("blur",w)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(s,h,m,$,E)=>(s-h)/(m-h)*(E-$)+$,e=s=>{const h=this.$slider.getBoundingClientRect();let m=t(s,h.left,h.right,this._min,this._max);this._snapClampSetValue(m)},i=s=>{this._setDraggingStyle(!0),e(s.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",l)},n=s=>{e(s.clientX)},l=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",l)};let r=!1,a,c;const d=s=>{s.preventDefault(),this._setDraggingStyle(!0),e(s.touches[0].clientX),r=!1},u=s=>{s.touches.length>1||(this._hasScrollBar?(a=s.touches[0].clientX,c=s.touches[0].clientY,r=!0):d(s),window.addEventListener("touchmove",p,{passive:!1}),window.addEventListener("touchend",f))},p=s=>{if(r){const h=s.touches[0].clientX-a,m=s.touches[0].clientY-c;Math.abs(h)>Math.abs(m)?d(s):(window.removeEventListener("touchmove",p),window.removeEventListener("touchend",f))}else s.preventDefault(),e(s.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",p),window.removeEventListener("touchend",f)},v=this._callOnFinishChange.bind(this),b=400;let y;const w=s=>{if(Math.abs(s.deltaX)<Math.abs(s.deltaY)&&this._hasScrollBar)return;s.preventDefault();const h=this._normalizeMouseWheel(s)*this._step;this._snapClampSetValue(this.getValue()+h),this.$input.value=this.getValue(),clearTimeout(y),y=setTimeout(v,b)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",w,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,i=-t.wheelDelta/120,i*=this._stepExplicit?1:10),e+-i}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class P extends g{constructor(t,e,i,n){super(t,e,i,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(n)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const i=document.createElement("option");i.textContent=e,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class H extends g{constructor(t,e,i){super(t,e,i,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var z=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function G(o){const t=document.createElement("style");t.innerHTML=o;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let L=!1;class _{constructor({parent:t,autoPlace:e=t===void 0,container:i,width:n,title:l="Controls",closeFolders:r=!1,injectStyles:a=!0,touchStyles:c=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(l),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),c&&this.domElement.classList.add("lil-allow-touch-styles"),!L&&a&&(G(z),L=!0),i?i.appendChild(this.domElement):e&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=r}add(t,e,i,n,l){if(Object(i)===i)return new P(this,t,e,i);const r=t[e];switch(typeof r){case"number":return new U(this,t,e,i,n,l);case"boolean":return new k(this,t,e);case"string":return new H(this,t,e);case"function":return new x(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,r)}addColor(t,e,i=1){return new M(this,t,e,i)}addFolder(t){const e=new _({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(i=>{i instanceof x||i._name in t.controllers&&i.load(t.controllers[i._name])}),e&&t.folders&&this.folders.forEach(i=>{i._title in t.folders&&i.load(t.folders[i._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof x)){if(i._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);e.controllers[i._name]=i.save()}}),t&&this.folders.forEach(i=>{if(i._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);e.folders[i._title]=i.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("lil-transition");const i=l=>{l.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const n=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(e=>e.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}class B{constructor(t,e,i,n={}){this.scene=t,this.renderer=e,this.globeGroup=i,this.handlers=n,this.gui=new _,this.gui.title("Globe Settings"),this.settings={highlightColor:"#ffffff",defaultColor:"#000000",outlineColor:"#ffffff",outlineOpacity:1,baseSphereColor:"#00050a",baseSphereOpacity:1,globalOpacity:1,gridColor:"#ffffff",backgroundColor:"#0a0a0f",transparentBackground:!1,haloColor:"#4040ff",ambientColor:"#101020",dirLightColor:"#ffffff",rimLightColor:"#4444ff",ambientEnabled:!0,dirLightEnabled:!0,rimLightEnabled:!0,fillLightEnabled:!0,fillLightSkyColor:"#000000",fillLightGroundColor:"#111133",ambientIntensity:.5,dirLightIntensity:1.2,rimLightIntensity:2,fillLightIntensity:.5,showHalo:!0,haloIntensity:.7,haloPower:15,showGrid:!0,gridOpacity:.35,gridSpacing:20,gridRadius:1.001,gridSegmentSize:1,geoJsonResolution:"110m",progressiveLoading:!0,batchSize:20,qualityPreset:"high",rendererPixelRatioMax:2,sphereSegments:128,countryFillDetail:1,outlineDetail:1,globeScale:1,showCameraOutline:!1,cameraOutlineColor:"#ffffff",cameraOutlineWidth:.02,cameraOutlineRadiusFactor:1,autoRotate:!1,autoRotateSpeed:1,inertia:!0,inertiaFriction:.95,lockRotationX:!1,countrySearch:"",selectedCodes:["DEU","FRA","ESP"],clearAllSelected:()=>this.clearAllSelected(),exportConfig:()=>this.exportConfig(),importConfig:()=>this.importConfig()},this.countryList=[],this.configImportInput=this.createConfigImportInput(),this.setupGUI()}setupGUI(){const t=this.gui.addFolder("Countries");t.addColor(this.settings,"highlightColor").name("Visited Color").onChange(()=>this.reloadCountries()),t.addColor(this.settings,"defaultColor").name("Base Country Color").onChange(()=>this.reloadCountries()),t.addColor(this.settings,"outlineColor").name("Outline Color").onChange(()=>this.reloadCountries()),t.add(this.settings,"outlineOpacity",0,1,.05).name("Outline Opacity").onChange(()=>this.reloadCountries());const e=this.gui.addFolder("Scene");e.addColor(this.settings,"baseSphereColor").name("Sphere Color").onChange(()=>this.updateSceneVisuals()),e.add(this.settings,"baseSphereOpacity",0,1,.05).name("Sphere Opacity").onChange(()=>this.updateSceneVisuals()),e.add(this.settings,"globalOpacity",0,1,.05).name("Global Opacity").onChange(()=>this.updateSceneVisuals()),e.addColor(this.settings,"backgroundColor").name("Background").onChange(()=>this.updateSceneVisuals()),e.add(this.settings,"transparentBackground").name("Transparent BG").onChange(()=>this.updateSceneVisuals());const i=this.gui.addFolder("Grid");i.add(this.settings,"showGrid").name("Show Grid").onChange(()=>this.reloadGrid()),i.addColor(this.settings,"gridColor").name("Grid Color").onChange(()=>this.reloadGrid()),i.add(this.settings,"gridOpacity",0,1,.05).name("Grid Opacity").onChange(()=>this.reloadGrid()),i.add(this.settings,"gridSpacing",5,45,5).name("Spacing").onChange(()=>this.reloadGrid()),i.add(this.settings,"gridRadius",1,1.02,.001).name("Height").onChange(()=>this.reloadGrid()),i.add(this.settings,"gridSegmentSize",1,10,1).name("Segment Size").onChange(()=>this.reloadGrid());const n=this.gui.addFolder("Atmosphere");n.addColor(this.settings,"haloColor").name("Color").onChange(()=>this.updateEffects()),n.add(this.settings,"showHalo").name("Visible").onChange(()=>this.updateEffects()),n.add(this.settings,"haloIntensity",0,1).name("Glow").onChange(()=>this.updateEffects()),n.add(this.settings,"haloPower",1,50).name("Falloff").onChange(()=>this.updateEffects());const l=this.gui.addFolder("Lights");l.addColor(this.settings,"ambientColor").name("Ambient Color").onChange(()=>this.updateLighting()),l.add(this.settings,"ambientIntensity",0,2).name("Ambient Intensity").onChange(()=>this.updateLighting()),l.add(this.settings,"ambientEnabled").name("Ambient On").onChange(()=>this.updateLighting()),l.addColor(this.settings,"dirLightColor").name("Main Color").onChange(()=>this.updateLighting()),l.add(this.settings,"dirLightIntensity",0,5).name("Main Intensity").onChange(()=>this.updateLighting()),l.add(this.settings,"dirLightEnabled").name("Main On").onChange(()=>this.updateLighting()),l.addColor(this.settings,"rimLightColor").name("Rim Color").onChange(()=>this.updateLighting()),l.add(this.settings,"rimLightIntensity",0,10).name("Rim Intensity").onChange(()=>this.updateLighting()),l.add(this.settings,"rimLightEnabled").name("Rim On").onChange(()=>this.updateLighting()),l.addColor(this.settings,"fillLightSkyColor").name("Fill Sky Color").onChange(()=>this.updateLighting()),l.addColor(this.settings,"fillLightGroundColor").name("Fill Ground Color").onChange(()=>this.updateLighting()),l.add(this.settings,"fillLightIntensity",0,3).name("Fill Intensity").onChange(()=>this.updateLighting()),l.add(this.settings,"fillLightEnabled").name("Fill On").onChange(()=>this.updateLighting()),this.selectionFolder=this.gui.addFolder("Country Selection"),this.countrySearchController=this.selectionFolder.add(this.settings,"countrySearch").name("Search").onChange(p=>this.updateSearchSuggestions(p)),this.suggestionsFolder=this.selectionFolder.addFolder("Suggestions"),this.selectedListFolder=this.selectionFolder.addFolder("Selected List"),this.selectionFolder.add(this.settings,"clearAllSelected").name("Clear All"),this.refreshSelectedListUI();const r=this.gui.addFolder("Data");r.add(this.settings,"progressiveLoading").name("Progressive").onChange(()=>this.reloadCountries()),r.add(this.settings,"batchSize",5,100,5).name("Batch Size").onChange(()=>this.reloadCountries());const a=this.gui.addFolder("Performance");a.add(this.settings,"qualityPreset",["low","medium","high"]).name("Quality Preset").onChange(()=>this.updatePerformance()),a.add(this.settings,"rendererPixelRatioMax",.5,3,.1).name("Pixel Ratio Max").onChange(()=>this.updatePerformance()),a.add(this.settings,"sphereSegments",16,256,16).name("Sphere Segments").onChange(()=>this.updatePerformance()),a.add(this.settings,"countryFillDetail",.5,3,.1).name("Fill Detail").onChange(()=>this.updatePerformance()),a.add(this.settings,"outlineDetail",.5,3,.1).name("Outline Detail").onChange(()=>this.updatePerformance());const c=this.gui.addFolder("Layout");c.add(this.settings,"globeScale",.25,4,.01).name("Globe Scale").onChange(()=>this.updateSceneVisuals()),c.add(this.settings,"showCameraOutline").name("Screen Ring").onChange(()=>this.updateSceneVisuals()),c.addColor(this.settings,"cameraOutlineColor").name("Screen Ring Color").onChange(()=>this.updateSceneVisuals()),c.add(this.settings,"cameraOutlineWidth",.001,.2,.001).name("Screen Ring Width").onChange(()=>this.updateSceneVisuals()),c.add(this.settings,"cameraOutlineRadiusFactor",.5,2,.01).name("Screen Ring Size").onChange(()=>this.updateSceneVisuals());const d=this.gui.addFolder("Interaction");d.add(this.settings,"autoRotate").name("Auto Rotate").onChange(()=>this.updateRotation()),d.add(this.settings,"autoRotateSpeed",0,5,.1).name("Speed").onChange(()=>this.updateRotation()),d.add(this.settings,"inertia").name("Inertia").onChange(()=>this.updateRotation()),d.add(this.settings,"inertiaFriction",.8,.999,.001).name("Friction").onChange(()=>this.updateRotation()),d.add(this.settings,"lockRotationX").name("Lock X Axis").onChange(()=>this.updateRotation());const u=this.gui.addFolder("Config");u.add(this.settings,"exportConfig").name("Export JSON"),u.add(this.settings,"importConfig").name("Import JSON")}updateRotation(){this.handlers.onUpdateRotationSettings&&this.handlers.onUpdateRotationSettings(this.settings)}updatePerformance(){this.handlers.onUpdatePerformance&&this.handlers.onUpdatePerformance(this.settings)}updateSceneVisuals(){this.handlers.onUpdateSceneVisuals&&this.handlers.onUpdateSceneVisuals(this.settings)}applySettings(t){const e=A(t),i=[...e.highlightCodes];Object.assign(this.settings,{highlightColor:e.highlightColor,defaultColor:e.defaultColor,outlineColor:e.outlineColor,outlineOpacity:e.outlineOpacity,baseSphereColor:e.baseSphereColor,baseSphereOpacity:e.baseSphereOpacity,globalOpacity:e.globalOpacity,gridColor:e.gridColor,backgroundColor:e.backgroundColor,transparentBackground:e.transparentBackground,haloColor:e.haloColor,ambientColor:e.ambientColor,dirLightColor:e.dirLightColor,rimLightColor:e.rimLightColor,ambientEnabled:e.ambientEnabled,dirLightEnabled:e.dirLightEnabled,rimLightEnabled:e.rimLightEnabled,fillLightEnabled:e.fillLightEnabled,fillLightSkyColor:e.fillLightSkyColor,fillLightGroundColor:e.fillLightGroundColor,ambientIntensity:e.ambientIntensity,dirLightIntensity:e.dirLightIntensity,rimLightIntensity:e.rimLightIntensity,fillLightIntensity:e.fillLightIntensity,showHalo:e.showHalo,haloIntensity:e.haloIntensity,haloPower:e.haloPower,showGrid:e.showGrid,gridOpacity:e.gridOpacity,gridSpacing:e.gridSpacing,gridRadius:e.gridRadius,gridSegmentSize:e.gridSegmentSize,geoJsonResolution:e.geoJsonResolution,progressiveLoading:e.progressiveLoading,batchSize:e.batchSize,qualityPreset:e.qualityPreset,rendererPixelRatioMax:e.rendererPixelRatioMax,sphereSegments:e.sphereSegments,countryFillDetail:e.countryFillDetail,outlineDetail:e.outlineDetail,globeScale:e.globeScale,showCameraOutline:e.showCameraOutline,cameraOutlineColor:e.cameraOutlineColor,cameraOutlineWidth:e.cameraOutlineWidth,cameraOutlineRadiusFactor:e.cameraOutlineRadiusFactor,autoRotate:e.autoRotate,autoRotateSpeed:e.autoRotateSpeed,inertia:e.inertia,inertiaFriction:e.inertiaFriction,lockRotationX:e.lockRotationX,selectedCodes:i}),this.gui.controllersRecursive().forEach(n=>n.updateDisplay()),this.refreshSelectedListUI(),this.updateSearchSuggestions(this.settings.countrySearch)}setGeojsonData(t){this.geojsonData=t,this.countryList=t.features.map(e=>({name:e.properties.NAME,code:e.properties.ADM0_A3||e.properties.ISO_A3||e.properties.SOV_A3})).sort((e,i)=>e.name.localeCompare(i.name)),this.countryList=this.countryList.filter((e,i,n)=>n.findIndex(l=>l.code===e.code)===i),this.updateSearchSuggestions(this.settings.countrySearch),this.refreshSelectedListUI()}updateSearchSuggestions(t){if(!this.suggestionsFolder)return;if([...this.suggestionsFolder.controllers].forEach(i=>i.destroy()),!t||t.length<2){this.suggestionsFolder.close();return}const e=this.countryList.filter(i=>i.name.toLowerCase().includes(t.toLowerCase())||i.code.toLowerCase().includes(t.toLowerCase())).slice(0,10);e.forEach(i=>{const n={};n[`Add ${i.name}`]=()=>{this.addCountry(i.code),this.settings.countrySearch="",this.countrySearchController&&this.countrySearchController.updateDisplay(),this.updateSearchSuggestions("")},this.suggestionsFolder.add(n,`Add ${i.name}`)}),e.length>0?this.suggestionsFolder.open():this.suggestionsFolder.close()}addCountry(t){this.settings.selectedCodes.includes(t)||(this.settings.selectedCodes.push(t),this.notifySelectionChange(),this.refreshSelectedListUI())}removeCountry(t){const e=this.settings.selectedCodes.indexOf(t);e>-1&&(this.settings.selectedCodes.splice(e,1),this.notifySelectionChange(),this.refreshSelectedListUI())}clearAllSelected(){this.settings.selectedCodes=[],this.notifySelectionChange(),this.refreshSelectedListUI()}updateLighting(){this.handlers.onUpdateLighting&&this.handlers.onUpdateLighting(this.settings)}updateEffects(){this.handlers.onUpdateEffects&&this.handlers.onUpdateEffects(this.settings)}notifySelectionChange(){this.handlers.onUpdateSelectedCountries&&this.handlers.onUpdateSelectedCountries({selectedCountries:this.settings.selectedCodes})}refreshSelectedListUI(){this.selectedListFolder&&([...this.selectedListFolder.controllers].forEach(t=>t.destroy()),[...this.selectedListFolder.folders].forEach(t=>t.destroy()),this.settings.selectedCodes.forEach(t=>{const e=this.countryList.find(l=>l.code===t),i=e?e.name:t,n={};n[`Remove ${i}`]=()=>this.removeCountry(t),this.selectedListFolder.add(n,`Remove ${i}`)}),this.settings.selectedCodes.length>0&&this.selectedListFolder.open())}reloadCountries(){this.handlers.onReloadCountries&&this.handlers.onReloadCountries({resolution:this.settings.geoJsonResolution,progressiveLoading:this.settings.progressiveLoading,batchSize:this.settings.batchSize,highlightColor:this.settings.highlightColor,defaultColor:this.settings.defaultColor,outlineColor:this.settings.outlineColor,outlineOpacity:this.settings.outlineOpacity,selectedCountries:this.settings.selectedCodes})}reloadGrid(){this.handlers.onReloadGrid&&this.handlers.onReloadGrid({showGrid:this.settings.showGrid,gridColor:this.settings.gridColor,gridSpacing:this.settings.gridSpacing,gridRadius:this.settings.gridRadius,gridSegmentSize:this.settings.gridSegmentSize,gridOpacity:this.settings.gridOpacity})}exportConfig(){const t=this.handlers.onRequestRuntimeState?this.handlers.onRequestRuntimeState():{rotationX:0,rotationY:0},e=F({...this.settings,...t,highlightCodes:[...this.settings.selectedCodes]}),i=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(i),l=document.createElement("a");l.href=n,l.download="globe-config.json",document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(n)}importConfig(){this.configImportInput.value="",this.configImportInput.click()}createConfigImportInput(){const t=document.createElement("input");return t.type="file",t.accept="application/json,.json",t.style.display="none",t.addEventListener("change",async e=>{const i=e.target.files&&e.target.files[0];if(i)try{const n=await i.text(),l=JSON.parse(n);this.handlers.onImportConfig&&this.handlers.onImportConfig(l)}catch(n){console.error("Failed to import config:",n)}}),document.body.appendChild(t),t}destroy(){this.gui.destroy(),this.configImportInput&&this.configImportInput.parentNode&&this.configImportInput.parentNode.removeChild(this.configImportInput)}getSettings(){return this.settings}}export{B as DebugControls};
