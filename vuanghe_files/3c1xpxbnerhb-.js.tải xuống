;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="cd5503df-10db-7b6c-203f-a190d4b36b73")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,689469,996208,504778,598973,e=>{"use strict";var t=e.i(909592),r=e.i(942705);e.s(["useRendererVisibility",0,function(e,o,a){let n,l,s=(0,t.c)(5),i=(0,r.useRef)(null),c=(0,r.useRef)(!1);s[0]!==e||s[1]!==a||s[2]!==o?(n=()=>{let t,r=e.current;if(null==r||null==o)return;try{t=a()}catch{return}i.current=t.register(o),c.current=!1;let n=new IntersectionObserver(e=>{let[r]=e;null!=r&&null!=i.current&&(r.isIntersecting?c.current&&(t.resume(i.current,o),c.current=!1):c.current||(t.suspend(i.current),c.current=!0))},{threshold:0});return n.observe(r),()=>{n.disconnect(),null!=i.current&&(t.unregister(i.current),i.current=null,c.current=!1)}},l=[e,o,a],s[0]=e,s[1]=a,s[2]=o,s[3]=n,s[4]=l):(n=s[3],l=s[4]),(0,r.useEffect)(n,l)}],689469);let o=null;function a(){if(null==o)try{o=null!=document.createElement("canvas").getContext("bitmaprenderer")}catch{o=!1}return o}function n(){return()=>{}}function l(){return!0}e.s(["useBitmapRendererSupport",0,function(){return(0,r.useSyncExternalStore)(n,a,l)}],996208),(0,e.i(840387).createClientLogger)("OffscreenRenderer");class s{active=new Map;suspended=new Map;state;createState;frameRoundRobinOffset=0;constructor(e,t){this.createState=e,this.state=e(t)}getGL(){return u().getGL()}getState(){return this.state}get size(){return this.active.size+this.suspended.size}register(e){let t=u().nextHandle();return this.active.set(t,e),u().onGroupChanged(),t}suspend(e){let t=this.active.get(e);null!=t&&(this.active.delete(e),this.suspended.set(e,t)),u().onGroupChanged()}resume(e,t){this.suspended.delete(e),this.active.set(e,t),u().onGroupChanged()}unregister(e){let t=u().getGL(),r=this.active.get(e);null!=r&&(r.cleanup(t),this.active.delete(e));let o=this.suspended.get(e);null!=o&&(o.cleanup(t),this.suspended.delete(e)),u().onGroupChanged()}tickAll(e){for(let t of this.active.values())t.tick(e);for(let t of this.suspended.values())t.tick(e)}renderBatch(e,t){let r=Array.from(this.active.values()),o=r.length;if(0===o)return;let a=Math.min(o,8),n=this.frameRoundRobinOffset%o;for(let l=0;l<a;l++){let a=r[(n+l)%o],{width:s,height:i}=a.getDesiredSize();if(!(s<=0)&&!(i<=0)&&((t.width!==s||t.height!==i)&&(t.width=s,t.height=i),e.viewport(0,0,s,i),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),a.render(e,this.state)))try{let e=t.transferToImageBitmap();a.bitmapCtx.transferFromImageBitmap(e)}catch{break}}this.frameRoundRobinOffset=(n+a)%o}handleContextRestored(e){for(let t of(this.state=this.createState(e),this.active.values()))t.contextRestored(e);for(let t of this.suspended.values())t.contextRestored(e)}cleanupAll(e){for(let t of this.active.values())t.cleanup(e);for(let t of this.suspended.values())t.cleanup(e);this.active.clear(),this.suspended.clear()}}class i{offscreen;gl;groups=new Set;animation=null;handleCounter=0;contextLost=!1;constructor(){this.offscreen=new OffscreenCanvas(2,2);const e=this.offscreen.getContext("webgl2",{alpha:!1,antialias:!1,premultipliedAlpha:!0});if(null==e)throw Error("WebGL2 not supported on OffscreenCanvas");this.gl=e,this.offscreen.addEventListener("webglcontextlost",e=>{e.preventDefault(),this.contextLost=!0,this.stopLoop()}),this.offscreen.addEventListener("webglcontextrestored",()=>{for(let e of(this.contextLost=!1,this.groups))e.handleContextRestored(this.gl);this.totalInstances()>0&&this.startLoop()})}getGL(){return this.gl}nextHandle(){return++this.handleCounter}addGroup(e){this.groups.add(e)}onGroupChanged(){this.totalInstances()>0?this.startLoop():this.stopLoop()}totalInstances(){let e=0;for(let t of this.groups)e+=t.size;return e}startLoop(){null==this.animation&&(this.animation=window.requestAnimationFrame(this.loop))}stopLoop(){null!=this.animation&&(window.cancelAnimationFrame(this.animation),this.animation=null)}loop=e=>{for(let t of(this.animation=window.requestAnimationFrame(this.loop),this.groups))t.tickAll(e);if(!this.contextLost)for(let e of this.groups)e.renderBatch(this.gl,this.offscreen)}}let c=null;function u(){return null==c&&(c=new i),c}let f=new Map;e.s(["getOrCreateRenderer",0,function(e,t){let r=f.get(e);if(null==r){let o=u();r=new s(t,o.getGL()),f.set(e,r),o.addGroup(r)}return r}],504778);let d=`
const float NOISE_OFFSET_1 = 100.0;
const float NOISE_OFFSET_2 = 50.0;
const float NOISE_OFFSET_4 = 25.0;
const float TRANSITION_NOISE_SCALE = 0.433;
const float TRANSITION_NOISE_OFFSET = 100.0;
const float WAVE_AMPLITUDE = 0.8;
const float NOISE_SCALE = 0.6;
const float LARGE_FLOW_WEIGHT = 0.77;
const float MEDIUM_FLOW_WEIGHT = 0.06;
const float SMALL_FLOW_WEIGHT = 0.71;
const float LARGE_FLOW_SCALE = 1.54;
const float MEDIUM_FLOW_SCALE = 0.20;
const float SMALL_FLOW_SCALE = 1.5;
const float TAPER_RANDOM_VARIATION = 0.1;
const float RANDOM_MOTION_AMPLITUDE = 0.086;
const float RANDOM_SEED_1 = 123.456;
const float RANDOM_SEED_2 = 789.012;
const float FBM_SCALE_DEFAULT = 1.2;
const float TRANSITION_STAGGER_RANGE = 0.2;
const float TRANSITION_INDIVIDUAL_DURATION = 0.5;
`,m=`
float randomParticle(vec2 st) { return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123); }

float noiseParticle(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomParticle(i);
  float b = randomParticle(i + vec2(1.0, 0.0));
  float c = randomParticle(i + vec2(0.0, 1.0));
  float d = randomParticle(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbmParticle(vec2 st, float scale) {
  vec2 pos = st * scale; float value = 0.0; float amplitude = 0.5; float frequency = 1.0;
  value += amplitude * noiseParticle(pos * frequency);
  frequency *= 2.0; amplitude *= 0.5; value += amplitude * noiseParticle(pos * frequency);
  frequency *= 2.0; amplitude *= 0.5; value += amplitude * noiseParticle(pos * frequency);
  return value * 1.12;
}

float fbmGrid(vec2 st, float scale) {
  vec2 pos = st * scale; float value = 0.0; float amplitude = 0.5;
  value += amplitude * noiseParticle(pos); amplitude *= 0.5; value += amplitude * noiseParticle(pos * 2.0);
  return value * 1.3;
}

vec2 calculateFlowScale(vec2 pos, float time, float scale, float timeSpeed, float offsetX, float offsetY, float fbmScale, float aspectRatio, bool useGrid) {
  float ar = aspectRatio; vec2 aspectScale = vec2(max(ar, 1.0), max(1.0/ar, 1.0)); vec2 aspectPos = pos * aspectScale;
  float s1 = sin(time * timeSpeed); float c2 = cos(time * timeSpeed * 0.7); vec2 timeOffset = vec2(s1, c2) * 10.0;
  vec2 scaledPos = aspectPos * NOISE_SCALE * scale + timeOffset;
  float angle = time * 0.1; float sr = sin(angle); float cr = cos(angle); mat2 rot = mat2(cr, -sr, sr, cr);
  scaledPos = rot * scaledPos;
  if (useGrid) {
    vec2 noise1 = vec2(fbmGrid(scaledPos + vec2(offsetX, offsetY), fbmScale), fbmGrid(scaledPos + vec2(offsetX + NOISE_OFFSET_1, offsetY), fbmScale));
    return (noise1 - 0.375) * 1.33;
  } else {
    return vec2(fbmParticle(scaledPos + vec2(offsetX, offsetY), fbmScale) - 0.5, fbmParticle(scaledPos + vec2(offsetX + NOISE_OFFSET_1, offsetY), fbmScale) - 0.5);
  }
}

vec2 getFlowFieldParticle(vec2 pos, float time, float aspectRatio, bool useGrid) {
  vec2 flow = vec2(0.0);
  if (useGrid) {
    flow += calculateFlowScale(pos, time, 1.54, 0.5, 0.0, 0.0, 1.2, aspectRatio, true) * 0.77;
    flow += calculateFlowScale(pos, time, 1.5,  1.2, 25.0, 0.0, 1.2, aspectRatio, true) * 0.71;
  } else {
    flow += calculateFlowScale(pos, time, 1.54, 0.5, 0.0, 0.0, 1.2, aspectRatio, false) * 0.77;
    flow += calculateFlowScale(pos, time, 0.20, 0.8, 50.0, 0.0, 1.2, aspectRatio, false) * 0.06;
    flow += calculateFlowScale(pos, time, 1.5,  1.2, 25.0, 0.0, 1.2, aspectRatio, false) * 0.71;
  }
  return flow;
}

float calculateTransitionNoise(vec2 position, float aspectRatio, bool useGrid) {
  float ar = aspectRatio; vec2 aspectScale = vec2(max(ar, 1.0), max(1.0/ar, 1.0)); vec2 aspectPos = position * aspectScale;
  vec2 noisePos = aspectPos * TRANSITION_NOISE_SCALE + vec2(TRANSITION_NOISE_OFFSET);
  return useGrid ? fbmGrid(noisePos, 1.0) : fbmParticle(noisePos, 1.0);
}
`,v=`
const float PARTICLE_EDGE_FADE = 0.2;
const float TRANSITION_INDIVIDUAL_DURATION = 0.5;
const float TRANSITION_STAGGER_RANGE = 0.2;
const float GRADIENT_ZOOM = 0.35;
const float GRADIENT_NOISE_SCALE = 2.0;
const float PARTICLE_RANDOM_BRIGHTNESS = 0.09;

float randomParticle(vec2 st) { return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123); }
float noiseParticle(vec2 st) {
  vec2 i = floor(st); vec2 f = fract(st); float a = randomParticle(i); float b = randomParticle(i + vec2(1.0, 0.0)); float c = randomParticle(i + vec2(0.0, 1.0)); float d = randomParticle(i + vec2(1.0, 1.0)); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec4 generateBlobbyGradient(vec2 uv01, float seed) {
  vec2 zoomedUV = uv01 * GRADIENT_ZOOM; vec2 offset = vec2(sin(seed * 0.5), cos(seed * 0.7)) * 0.1; zoomedUV += offset;
  float n = noiseParticle(zoomedUV * GRADIENT_NOISE_SCALE * 3.0 + vec2(seed * 10.0));
  n += noiseParticle(zoomedUV * GRADIENT_NOISE_SCALE * 7.0 + vec2(seed * 20.0 + 100.0)) * 0.4;
  n *= 0.71; float finalNoise = smoothstep(0.1, 0.9, n);
  return mix(u_gradientColorLow, u_gradientColorHigh, finalNoise);
}
`,p=`#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv01;
void main() { v_uv01 = (a_pos * 0.5 + 0.5) * vec2(1.0, -1.0) + vec2(0.0, 1.0); gl_Position = vec4(a_pos, 0.0, 1.0); }
`,h=`
const float TRANSITION_INDIVIDUAL_DURATION = 0.5; const float TRANSITION_STAGGER_RANGE = 0.2; const float BACKGROUND_DARKNESS_DEFAULT = 0.12; const float TRANSITION_NOISE_SCALE = 0.433; const float TRANSITION_NOISE_OFFSET = 100.0;

float randomParticle(vec2 st) { return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123); }
float noiseParticle(vec2 st) { vec2 i=floor(st), f=fract(st); float a=randomParticle(i), b=randomParticle(i+vec2(1,0)), c=randomParticle(i+vec2(0,1)), d=randomParticle(i+vec2(1,1)); vec2 u=f*f*(3.0-2.0*f); return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y; }
float fbmGrid(vec2 st, float scale){ vec2 pos=st*scale; float value=0.0, amplitude=0.5; value+=amplitude*noiseParticle(pos); amplitude*=0.5; value+=amplitude*noiseParticle(pos*2.0); return value*1.3; }
float fbmParticle(vec2 st, float scale){ vec2 pos=st*scale; float value=0.0, amplitude=0.5, frequency=1.0; value+=amplitude*noiseParticle(pos*frequency); frequency*=2.0; amplitude*=0.5; value+=amplitude*noiseParticle(pos*frequency); frequency*=2.0; amplitude*=0.5; value+=amplitude*noiseParticle(pos*frequency); return value*1.12; }
float calculateTransitionNoise(vec2 position, float aspectRatio, bool useGrid){ float ar=aspectRatio; vec2 aspectScale=vec2(max(ar,1.0),max(1.0/ar,1.0)); vec2 aspectPos=position*aspectScale; vec2 noisePos=aspectPos*TRANSITION_NOISE_SCALE+vec2(TRANSITION_NOISE_OFFSET); return useGrid?fbmGrid(noisePos,1.0):fbmParticle(noisePos,1.0);}
vec4 generateBlobbyGradient(vec2 uv01,float seed,vec4 lowC,vec4 highC){ vec2 zoomedUV=uv01*0.35; vec2 offset=vec2(sin(seed*0.5),cos(seed*0.7))*0.1; zoomedUV+=offset; float n=noiseParticle(zoomedUV*2.0*3.0+vec2(seed*10.0)); n+=noiseParticle(zoomedUV*2.0*7.0+vec2(seed*20.0+100.0))*0.4; n*=0.71; float finalNoise=smoothstep(0.1,0.9,n); return mix(lowC,highC,finalNoise);}
`;function S(e,t,r){let o=null,a=null,n=null;try{if(o=e.createShader(e.VERTEX_SHADER),null==o)throw Error("Error initializing vertex shader");if(e.shaderSource(o,t),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(o)||"VS compile error");if(a=e.createShader(e.FRAGMENT_SHADER),null==a)throw Error("Error initializing fragment shader");if(e.shaderSource(a,r),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(a)||"FS compile error");if(n=e.createProgram(),null==n)throw Error("Error creating program");if(e.attachShader(n,o),e.attachShader(n,a),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS))throw Error(e.getProgramInfoLog(n)||"Link error");return e.deleteShader(o),e.deleteShader(a),n}catch(t){throw null!=o&&e.deleteShader(o),null!=a&&e.deleteShader(a),null!=n&&e.deleteProgram(n),t}}e.s(["GLSL_BG_FRAG_HELPERS",0,h,"GLSL_PARTICLE_FRAG_HELPERS",0,v,"GLSL_PARTICLE_VERT_CONSTANTS",0,d,"GLSL_PARTICLE_VERT_HELPERS",0,m,"VERT_BG",0,p,"aspectFillUVTransform",0,function(e,t,r,o,a=!1){let n=e/t,l=r/o,s=1,i=1,c=0,u=0;return l>n?c=(1-(s=n/l))*.5:u=(1-(i=l/n))*.5,new Float32Array([s,0,0,0,a?-i:i,0,c,a?i+u:u,1])},"createSandLoaderRendererState",0,function(e,t){let r=S(e,t.vertBg,t.fragBg),o=S(e,t.vertParticles,t.fragParticles),a=e.createVertexArray(),n=e.createBuffer();if(null==a||null==n)throw Error("Failed to create bg VAO/VBO");e.bindVertexArray(a),e.bindBuffer(e.ARRAY_BUFFER,n);let l=new Float32Array([-1,-1,1,-1,-1,1,1,1]);return e.bufferData(e.ARRAY_BUFFER,l,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),{bgProgram:r,particleProgram:o,bgVao:a,bgVbo:n}},"getRandomNumber",0,function(e=1){return Math.random()*e}],598973)},510729,e=>{"use strict";var t=e.i(208679),r=e.i(909592),o=e.i(942705);let a=(0,o.createContext)({averageProgress:0,setProgress:()=>{}});function n(e,t){return e+t}e.s(["MediaGenerationProgressProvider",0,function(e){let l,s,i,c,u,f,d,m,v=(0,r.c)(11),{children:p}=e;v[0]===Symbol.for("react.memo_cache_sentinel")?(l=new Map,v[0]=l):l=v[0];let h=(0,o.useRef)(l),[S,A]=(0,o.useState)(0),E=(0,o.useRef)(null);v[1]===Symbol.for("react.memo_cache_sentinel")?(s=()=>{let e=Array.from(h.current.values());0===e.length?A(0):A(e.reduce(n,0)/e.length)},v[1]=s):s=v[1];let _=s;v[2]===Symbol.for("react.memo_cache_sentinel")?(i=()=>{null==E.current&&(E.current=window.setTimeout(()=>{E.current=null,_()},100))},v[2]=i):i=v[2];let g=i;v[3]===Symbol.for("react.memo_cache_sentinel")?(c=(e,t)=>{h.current.get(e)!==t&&(h.current.set(e,t),g())},v[3]=c):c=v[3];let R=c;v[4]===Symbol.for("react.memo_cache_sentinel")?(u=()=>()=>{null!=E.current&&(window.clearTimeout(E.current),E.current=null)},f=[],v[4]=u,v[5]=f):(u=v[4],f=v[5]),(0,o.useEffect)(u,f),v[6]!==S?(d={averageProgress:S,setProgress:R},v[6]=S,v[7]=d):d=v[7];let I=d;return v[8]!==p||v[9]!==I?(m=(0,t.jsx)(a.Provider,{value:I,children:p}),v[8]=p,v[9]=I,v[10]=m):m=v[10],m},"useMediaGenerationProgress",0,function(){return(0,o.useContext)(a)}])},314382,e=>{"use strict";var t=e.i(909592),r=e.i(168991),o=e.i(942705);let a=new Map,n=(0,r.createListenerRegistry)();function l(e){return a.has(e)}function s(){return!1}e.s(["isAttachmentImageFailed",0,l,"isAttachmentImageProxyUrl",0,function(e){return e.includes("/api/attachment-image/")},"markAttachmentImageFailed",0,function(e){let t=a.get(e);void 0!==t&&clearTimeout(t);let r=setTimeout(()=>{a.delete(e),n.emit()},6e4);a.set(e,r),void 0===t&&n.emit()},"useIsAttachmentImageFailed",0,function(e){let r,a=(0,t.c)(2);a[0]!==e?(r=()=>null!=e&&l(e),a[0]=e,a[1]=r):r=a[1];let i=r;return(0,o.useSyncExternalStore)(n.subscribe,i,s)}])},803534,508324,e=>{"use strict";var t=e.i(964355),r=e.i(942705),o=e.i(451347),a=e.i(900893);function n(e){let n=(0,a.useConstant)(()=>(0,t.motionValue)(e)),{isStatic:l}=(0,r.useContext)(o.MotionConfigContext);if(l){let[,t]=(0,r.useState)(e);(0,r.useEffect)(()=>n.on("change",t),[])}return n}e.s(["useMotionValue",0,n],803534);var l=e.i(562667),s=e.i(907953),i=e.i(478146);function c(e,t){let r=n(t()),o=()=>r.set(t());return o(),(0,i.useIsomorphicLayoutEffect)(()=>{let t=()=>s.frame.preRender(o,!1,!0),r=e.map(e=>e.on("change",t));return()=>{r.forEach(e=>e()),(0,s.cancelFrame)(o)}}),r}function u(e,t){let r=(0,a.useConstant)(()=>[]);return c(e,()=>{r.length=0;let o=e.length;for(let t=0;t<o;t++)r[t]=e[t].get();return t(r)})}e.s(["useTransform",0,function e(r,o,n,s){if("function"==typeof r){let e;return t.collectMotionValues.current=[],r(),e=c(t.collectMotionValues.current,r),t.collectMotionValues.current=void 0,e}if(void 0!==n&&!Array.isArray(n)&&"function"!=typeof o){var i=r,f=o,d=n,m=s;let t=(0,a.useConstant)(()=>Object.keys(d)),l=(0,a.useConstant)(()=>({}));for(let r of t)l[r]=e(i,f,d[r],m);return l}let v="function"==typeof o?o:function(...e){let t=!Array.isArray(e[0]),r=t?0:-1,o=e[0+r],a=e[1+r],n=e[2+r],s=e[3+r],i=(0,l.interpolate)(a,n,s);return t?i(o):i}(o,n,s),p=Array.isArray(r)?u(r,v):u([r],([e])=>v(e)),h=Array.isArray(r)?void 0:r.accelerate;return h&&!h.isTransformed&&"function"!=typeof o&&Array.isArray(n)&&s?.clamp!==!1&&(p.accelerate={...h,times:o,keyframes:n,isTransformed:!0,...s?.ease?{ease:s.ease}:{}}),p}],508324)}]);

//# debugId=cd5503df-10db-7b6c-203f-a190d4b36b73