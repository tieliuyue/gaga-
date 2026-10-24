var background=(function(){function e(e){return e==null||typeof e==`function`?{main:e}:e}var t=globalThis.browser?.runtime?.id?globalThis.browser:globalThis.chrome,n=`https://ai.nextoffer.net`,r=`https://api.next.aioffer999.com`,i=`nextoffer_install_id`,a=`NEXTOFFER_RESUMES_CHANGED`,o=`NEXTOFFER_AUTH_CHANGED`,s={log:(...e)=>{},warn:(...e)=>{console.warn(typeof e[0]==`string`?e[0]:`[NextOffer] 运行警告`)},error:(...e)=>{console.error(typeof e[0]==`string`?e[0]:`[NextOffer] 运行异常`)}},c,l=Object.freeze({status:`aborted`});function u(e,t,n){function r(n,r){if(n._zod||Object.defineProperty(n,"_zod",{value:{def:r,constr:o,traits:new Set},enumerable:!1}),n._zod.traits.has(e))return;n._zod.traits.add(e),t(n,r);let i=o.prototype,a=Object.keys(i);for(let e=0;e<a.length;e++){let t=a[e];t in n||(n[t]=i[t].bind(n))}}let i=n?.Parent??Object;class a extends i{}Object.defineProperty(a,"name",{value:e});function o(e){var t;let i=n?.Parent?new a:this;r(i,e),(t=i._zod).deferred??(t.deferred=[]);for(let e of i._zod.deferred)e();return i}return Object.defineProperty(o,"init",{value:r}),Object.defineProperty(o,Symbol.hasInstance,{value:t=>n?.Parent&&t instanceof n.Parent?!0:t?._zod?.traits?.has(e)}),Object.defineProperty(o,"name",{value:e}),o}var d=class extends Error{constructor(){super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`)}},f=class extends Error{constructor(e){super(`Encountered unidirectional transform during encode: ${e}`),this.name=`ZodEncodeError`}};(c=globalThis).__zod_globalConfig??(c.__zod_globalConfig={});var p=globalThis.__zod_globalConfig;function m(e){return e&&Object.assign(p,e),p}function ee(e){let t=Object.values(e).filter(e=>typeof e==`number`);return Object.entries(e).filter(([e,n])=>t.indexOf(+e)===-1).map(([e,t])=>t)}function te(e,t){return typeof t==`bigint`?t.toString():t}function ne(e){return{get value(){{let t=e();return Object.defineProperty(this,"value",{value:t}),t}throw Error(`cached value already set`)}}}function re(e){return e==null}function ie(e){let t=+!!e.startsWith(`^`),n=e.endsWith(`$`)?e.length-1:e.length;return e.slice(t,n)}function ae(e,t){let n=e/t,r=Math.round(n),i=2**-52*Math.max(Math.abs(n),1);return Math.abs(n-r)<i?0:n-r}var oe=Symbol(`evaluating`);function h(e,t,n){let r;Object.defineProperty(e,t,{get(){if(r!==oe)return r===void 0&&(r=oe,r=n()),r},set(n){Object.defineProperty(e,t,{value:n})},configurable:!0})}function g(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function _(...e){let t={};for(let n of e){let e=Object.getOwnPropertyDescriptors(n);Object.assign(t,e)}return Object.defineProperties({},t)}function se(e){return JSON.stringify(e)}function ce(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,``).replace(/[\s_-]+/g,`-`).replace(/^-+|-+$/g,``)}var le=`captureStackTrace`in Error?Error.captureStackTrace:(...e)=>{};function v(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}var ue=ne(()=>{if(p.jitless||typeof navigator<`u`&&navigator?.userAgent?.includes(`Cloudflare`))return!1;try{return Function(``),!0}catch{return!1}});function y(e){if(v(e)===!1)return!1;let t=e.constructor;if(t===void 0||typeof t!=`function`)return!0;let n=t.prototype;return!(v(n)===!1||Object.prototype.hasOwnProperty.call(n,`isPrototypeOf`)===!1)}function de(e){return y(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}var fe=new Set([`string`,`number`,`symbol`]);function b(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function x(e,t,n){let r=new e._zod.constr(t??e._zod.def);return(!t||n?.parent)&&(r._zod.parent=e),r}function S(e){let t=e;if(!t)return{};if(typeof t==`string`)return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error==`string`?{...t,error:()=>t.error}:t}function pe(e){return Object.keys(e).filter(t=>e[t]._zod.optin===`optional`&&e[t]._zod.optout===`optional`)}var me={safeint:[-(2**53-1),2**53-1],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function he(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(`.pick() cannot be used on object schemas containing refinements`);return x(e,_(e._zod.def,{get shape(){let e={};for(let r in t){if(!(r in n.shape))throw Error(`Unrecognized key: "${r}"`);t[r]&&(e[r]=n.shape[r])}return g(this,`shape`,e),e},checks:[]}))}function ge(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(`.omit() cannot be used on object schemas containing refinements`);return x(e,_(e._zod.def,{get shape(){let r={...e._zod.def.shape};for(let e in t){if(!(e in n.shape))throw Error(`Unrecognized key: "${e}"`);t[e]&&delete r[e]}return g(this,`shape`,r),r},checks:[]}))}function _e(e,t){if(!y(t))throw Error(`Invalid input to extend: expected a plain object`);let n=e._zod.def.checks;if(n&&n.length>0){let n=e._zod.def.shape;for(let e in t)if(Object.getOwnPropertyDescriptor(n,e)!==void 0)throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return x(e,_(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t};return g(this,`shape`,n),n}}))}function ve(e,t){if(!y(t))throw Error(`Invalid input to safeExtend: expected a plain object`);return x(e,_(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t};return g(this,`shape`,n),n}}))}function ye(e,t){if(e._zod.def.checks?.length)throw Error(`.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.`);return x(e,_(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t._zod.def.shape};return g(this,`shape`,n),n},get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]}))}function be(e,t,n){let r=t._zod.def.checks;if(r&&r.length>0)throw Error(`.partial() cannot be used on object schemas containing refinements`);return x(t,_(t._zod.def,{get shape(){let r=t._zod.def.shape,i={...r};if(n)for(let t in n){if(!(t in r))throw Error(`Unrecognized key: "${t}"`);n[t]&&(i[t]=e?new e({type:`optional`,innerType:r[t]}):r[t])}else for(let t in r)i[t]=e?new e({type:`optional`,innerType:r[t]}):r[t];return g(this,`shape`,i),i},checks:[]}))}function xe(e,t,n){return x(t,_(t._zod.def,{get shape(){let r=t._zod.def.shape,i={...r};if(n)for(let t in n){if(!(t in i))throw Error(`Unrecognized key: "${t}"`);n[t]&&(i[t]=new e({type:`nonoptional`,innerType:r[t]}))}else for(let t in r)i[t]=new e({type:`nonoptional`,innerType:r[t]});return g(this,`shape`,i),i}}))}function C(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function Se(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue===!1)return!0;return!1}function Ce(e,t){return t.map(t=>{var n;return(n=t).path??(n.path=[]),t.path.unshift(e),t})}function we(e){return typeof e==`string`?e:e?.message}function w(e,t,n){let r=e.message?e.message:we(e.inst?._zod.def?.error?.(e))??we(t?.error?.(e))??we(n.customError?.(e))??we(n.localeError?.(e))??`Invalid input`,{inst:i,continue:a,input:o,...s}=e;return s.path??=[],s.message=r,t?.reportInput&&(s.input=o),s}function Te(e){return Array.isArray(e)?`array`:typeof e==`string`?`string`:`unknown`}function T(...e){let[t,n,r]=e;return typeof t==`string`?{message:t,code:`custom`,input:n,inst:r}:{...t}}var Ee=(e,t)=>{e.name=`$ZodError`,Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,te,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},De=u(`$ZodError`,Ee),Oe=u(`$ZodError`,Ee,{Parent:Error});function ke(e,t=e=>e.message){let n={},r=[];for(let i of e.issues)i.path.length>0?(n[i.path[0]]=n[i.path[0]]||[],n[i.path[0]].push(t(i))):r.push(t(i));return{formErrors:r,fieldErrors:n}}function Ae(e,t=e=>e.message){let n={_errors:[]},r=(e,i=[])=>{for(let a of e.issues)if(a.code===`invalid_union`&&a.errors.length)a.errors.map(e=>r({issues:e},[...i,...a.path]));else if(a.code===`invalid_key`)r({issues:a.issues},[...i,...a.path]);else if(a.code===`invalid_element`)r({issues:a.issues},[...i,...a.path]);else{let e=[...i,...a.path];if(e.length===0)n._errors.push(t(a));else{let r=n,i=0;for(;i<e.length;){let n=e[i];i===e.length-1?(r[n]=r[n]||{_errors:[]},r[n]._errors.push(t(a))):r[n]=r[n]||{_errors:[]},r=r[n],i++}}}};return r(e),n}var je=e=>(t,n,r,i)=>{let a=r?{...r,async:!1}:{async:!1},o=t._zod.run({value:n,issues:[]},a);if(o instanceof Promise)throw new d;if(o.issues.length){let t=new((i?.Err)??e)(o.issues.map(e=>w(e,a,m())));throw le(t,i?.callee),t}return o.value},Me=e=>async(t,n,r,i)=>{let a=r?{...r,async:!0}:{async:!0},o=t._zod.run({value:n,issues:[]},a);if(o instanceof Promise&&(o=await o),o.issues.length){let t=new((i?.Err)??e)(o.issues.map(e=>w(e,a,m())));throw le(t,i?.callee),t}return o.value},Ne=e=>(t,n,r)=>{let i=r?{...r,async:!1}:{async:!1},a=t._zod.run({value:n,issues:[]},i);if(a instanceof Promise)throw new d;return a.issues.length?{success:!1,error:new(e??De)(a.issues.map(e=>w(e,i,m())))}:{success:!0,data:a.value}},Pe=Ne(Oe),Fe=e=>async(t,n,r)=>{let i=r?{...r,async:!0}:{async:!0},a=t._zod.run({value:n,issues:[]},i);return a instanceof Promise&&(a=await a),a.issues.length?{success:!1,error:new e(a.issues.map(e=>w(e,i,m())))}:{success:!0,data:a.value}},Ie=Fe(Oe),Le=e=>(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return je(e)(t,n,i)},Re=e=>(t,n,r)=>je(e)(t,n,r),ze=e=>async(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return Me(e)(t,n,i)},Be=e=>async(t,n,r)=>Me(e)(t,n,r),Ve=e=>(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return Ne(e)(t,n,i)},He=e=>(t,n,r)=>Ne(e)(t,n,r),Ue=e=>async(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return Fe(e)(t,n,i)},We=e=>async(t,n,r)=>Fe(e)(t,n,r),Ge=/^[cC][0-9a-z]{6,}$/,Ke=/^[0-9a-z]+$/,qe=/^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,Je=/^[0-9a-vA-V]{20}$/,Ye=/^[A-Za-z0-9]{27}$/,Xe=/^[a-zA-Z0-9_-]{21}$/,Ze=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,Qe=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,$e=e=>e?RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,et=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,tt=`^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;function nt(){return new RegExp(tt,`u`)}var rt=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,it=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,at=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,ot=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,st=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,ct=/^[A-Za-z0-9_-]*$/,lt=/^https?$/,ut=/^\+[1-9]\d{6,14}$/,dt=`(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`,ft=RegExp(`^${dt}$`);function pt(e){let t=`(?:[01]\\d|2[0-3]):[0-5]\\d`;return typeof e.precision==`number`?e.precision===-1?`${t}`:e.precision===0?`${t}:[0-5]\\d`:`${t}:[0-5]\\d\\.\\d{${e.precision}}`:`${t}(?::[0-5]\\d(?:\\.\\d+)?)?`}function mt(e){return RegExp(`^${pt(e)}$`)}function ht(e){let t=pt({precision:e.precision}),n=[`Z`];e.local&&n.push(``),e.offset&&n.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);let r=`${t}(?:${n.join(`|`)})`;return RegExp(`^${dt}T(?:${r})$`)}var gt=e=>{let t=e?`[\\s\\S]{${e?.minimum??0},${e?.maximum??``}}`:`[\\s\\S]*`;return RegExp(`^${t}$`)},_t=/^-?\d+$/,vt=/^-?\d+(?:\.\d+)?$/,yt=/^(?:true|false)$/i,bt=/^[^A-Z]*$/,xt=/^[^a-z]*$/,E=u(`$ZodCheck`,(e,t)=>{var n;e._zod??={},e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])}),St={number:`number`,bigint:`bigint`,object:`date`},Ct=u(`$ZodCheckLessThan`,(e,t)=>{E.init(e,t);let n=St[typeof t.value];e._zod.onattach.push(e=>{let n=e._zod.bag,r=(t.inclusive?n.maximum:n.exclusiveMaximum)??1/0;t.value<r&&(t.inclusive?n.maximum=t.value:n.exclusiveMaximum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value<=t.value:r.value<t.value)||r.issues.push({origin:n,code:`too_big`,maximum:typeof t.value==`object`?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),wt=u(`$ZodCheckGreaterThan`,(e,t)=>{E.init(e,t);let n=St[typeof t.value];e._zod.onattach.push(e=>{let n=e._zod.bag,r=(t.inclusive?n.minimum:n.exclusiveMinimum)??-1/0;t.value>r&&(t.inclusive?n.minimum=t.value:n.exclusiveMinimum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value>=t.value:r.value>t.value)||r.issues.push({origin:n,code:`too_small`,minimum:typeof t.value==`object`?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Tt=u(`$ZodCheckMultipleOf`,(e,t)=>{E.init(e,t),e._zod.onattach.push(e=>{var n;(n=e._zod.bag).multipleOf??(n.multipleOf=t.value)}),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw Error(`Cannot mix number and bigint in multiple_of check.`);(typeof n.value==`bigint`?n.value%t.value===BigInt(0):ae(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:`not_multiple_of`,divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),Et=u(`$ZodCheckNumberFormat`,(e,t)=>{E.init(e,t),t.format=t.format||`float64`;let n=t.format?.includes(`int`),r=n?`int`:`number`,[i,a]=me[t.format];e._zod.onattach.push(e=>{let r=e._zod.bag;r.format=t.format,r.minimum=i,r.maximum=a,n&&(r.pattern=_t)}),e._zod.check=o=>{let s=o.value;if(n){if(!Number.isInteger(s)){o.issues.push({expected:r,format:t.format,code:`invalid_type`,continue:!1,input:s,inst:e});return}if(!Number.isSafeInteger(s)){s>0?o.issues.push({input:s,code:`too_big`,maximum:2**53-1,note:`Integers must be within the safe integer range.`,inst:e,origin:r,inclusive:!0,continue:!t.abort}):o.issues.push({input:s,code:`too_small`,minimum:-(2**53-1),note:`Integers must be within the safe integer range.`,inst:e,origin:r,inclusive:!0,continue:!t.abort});return}}s<i&&o.issues.push({origin:`number`,input:s,code:`too_small`,minimum:i,inclusive:!0,inst:e,continue:!t.abort}),s>a&&o.issues.push({origin:`number`,input:s,code:`too_big`,maximum:a,inclusive:!0,inst:e,continue:!t.abort})}}),Dt=u(`$ZodCheckMaxLength`,(e,t)=>{var n;E.init(e,t),(n=e._zod.def).when??(n.when=e=>{let t=e.value;return!re(t)&&t.length!==void 0}),e._zod.onattach.push(e=>{let n=e._zod.bag.maximum??1/0;t.maximum<n&&(e._zod.bag.maximum=t.maximum)}),e._zod.check=n=>{let r=n.value;if(r.length<=t.maximum)return;let i=Te(r);n.issues.push({origin:i,code:`too_big`,maximum:t.maximum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),Ot=u(`$ZodCheckMinLength`,(e,t)=>{var n;E.init(e,t),(n=e._zod.def).when??(n.when=e=>{let t=e.value;return!re(t)&&t.length!==void 0}),e._zod.onattach.push(e=>{let n=e._zod.bag.minimum??-1/0;t.minimum>n&&(e._zod.bag.minimum=t.minimum)}),e._zod.check=n=>{let r=n.value;if(r.length>=t.minimum)return;let i=Te(r);n.issues.push({origin:i,code:`too_small`,minimum:t.minimum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),kt=u(`$ZodCheckLengthEquals`,(e,t)=>{var n;E.init(e,t),(n=e._zod.def).when??(n.when=e=>{let t=e.value;return!re(t)&&t.length!==void 0}),e._zod.onattach.push(e=>{let n=e._zod.bag;n.minimum=t.length,n.maximum=t.length,n.length=t.length}),e._zod.check=n=>{let r=n.value,i=r.length;if(i===t.length)return;let a=Te(r),o=i>t.length;n.issues.push({origin:a,...o?{code:`too_big`,maximum:t.length}:{code:`too_small`,minimum:t.length},inclusive:!0,exact:!0,input:n.value,inst:e,continue:!t.abort})}}),At=u(`$ZodCheckStringFormat`,(e,t)=>{var n,r;E.init(e,t),e._zod.onattach.push(e=>{let n=e._zod.bag;n.format=t.format,t.pattern&&(n.patterns??=new Set,n.patterns.add(t.pattern))}),t.pattern?(n=e._zod).check??(n.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:`string`,code:`invalid_format`,format:t.format,input:n.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})}):(r=e._zod).check??(r.check=()=>{})}),jt=u(`$ZodCheckRegex`,(e,t)=>{At.init(e,t),e._zod.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:`string`,code:`invalid_format`,format:`regex`,input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),Mt=u(`$ZodCheckLowerCase`,(e,t)=>{t.pattern??=bt,At.init(e,t)}),Nt=u(`$ZodCheckUpperCase`,(e,t)=>{t.pattern??=xt,At.init(e,t)}),Pt=u(`$ZodCheckIncludes`,(e,t)=>{E.init(e,t);let n=b(t.includes),r=new RegExp(typeof t.position==`number`?`^.{${t.position}}${n}`:n);t.pattern=r,e._zod.onattach.push(e=>{let t=e._zod.bag;t.patterns??=new Set,t.patterns.add(r)}),e._zod.check=n=>{n.value.includes(t.includes,t.position)||n.issues.push({origin:`string`,code:`invalid_format`,format:`includes`,includes:t.includes,input:n.value,inst:e,continue:!t.abort})}}),Ft=u(`$ZodCheckStartsWith`,(e,t)=>{E.init(e,t);let n=RegExp(`^${b(t.prefix)}.*`);t.pattern??=n,e._zod.onattach.push(e=>{let t=e._zod.bag;t.patterns??=new Set,t.patterns.add(n)}),e._zod.check=n=>{n.value.startsWith(t.prefix)||n.issues.push({origin:`string`,code:`invalid_format`,format:`starts_with`,prefix:t.prefix,input:n.value,inst:e,continue:!t.abort})}}),It=u(`$ZodCheckEndsWith`,(e,t)=>{E.init(e,t);let n=RegExp(`.*${b(t.suffix)}$`);t.pattern??=n,e._zod.onattach.push(e=>{let t=e._zod.bag;t.patterns??=new Set,t.patterns.add(n)}),e._zod.check=n=>{n.value.endsWith(t.suffix)||n.issues.push({origin:`string`,code:`invalid_format`,format:`ends_with`,suffix:t.suffix,input:n.value,inst:e,continue:!t.abort})}}),Lt=u(`$ZodCheckOverwrite`,(e,t)=>{E.init(e,t),e._zod.check=e=>{e.value=t.tx(e.value)}}),Rt=class{constructor(e=[]){this.content=[],this.indent=0,this&&(this.args=e)}indented(e){this.indent+=1,e(this),--this.indent}write(e){if(typeof e==`function`){e(this,{execution:`sync`}),e(this,{execution:`async`});return}let t=e.split(`
`).filter(e=>e),n=Math.min(...t.map(e=>e.length-e.trimStart().length)),r=t.map(e=>e.slice(n)).map(e=>` `.repeat(this.indent*2)+e);for(let e of r)this.content.push(e)}compile(){let e=Function,t=this?.args,n=[...(this?.content??[``]).map(e=>`  ${e}`)];return new e(...t,n.join(`
`))}},zt={major:4,minor:4,patch:3},D=u(`$ZodType`,(e,t)=>{var n;e??={},e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=zt;let r=[...e._zod.def.checks??[]];e._zod.traits.has(`$ZodCheck`)&&r.unshift(e);for(let t of r)for(let n of t._zod.onattach)n(e);if(r.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(e,t,n)=>{let r=C(e),i;for(let a of t){if(a._zod.def.when){if(Se(e)||!a._zod.def.when(e))continue}else if(r)continue;let t=e.issues.length,o=a._zod.check(e);if(o instanceof Promise&&n?.async===!1)throw new d;if(i||o instanceof Promise)i=(i??Promise.resolve()).then(async()=>{await o,e.issues.length!==t&&(r||=C(e,t))});else{if(e.issues.length===t)continue;r||=C(e,t)}}return i?i.then(()=>e):e},n=(n,i,a)=>{if(C(n))return n.aborted=!0,n;let o=t(i,r,a);if(o instanceof Promise){if(a.async===!1)throw new d;return o.then(t=>e._zod.parse(t,a))}return e._zod.parse(o,a)};e._zod.run=(i,a)=>{if(a.skipChecks)return e._zod.parse(i,a);if(a.direction===`backward`){let t=e._zod.parse({value:i.value,issues:[]},{...a,skipChecks:!0});return t instanceof Promise?t.then(e=>n(e,i,a)):n(t,i,a)}let o=e._zod.parse(i,a);if(o instanceof Promise){if(a.async===!1)throw new d;return o.then(e=>t(e,r,a))}return t(o,r,a)}}h(e,`~standard`,()=>({validate:t=>{try{let n=Pe(e,t);return n.success?{value:n.data}:{issues:n.error?.issues}}catch{return Ie(e,t).then(e=>e.success?{value:e.data}:{issues:e.error?.issues})}},vendor:`zod`,version:1}))}),Bt=u(`$ZodString`,(e,t)=>{D.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??gt(e._zod.bag),e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=String(n.value)}catch{}return typeof n.value==`string`||n.issues.push({expected:`string`,code:`invalid_type`,input:n.value,inst:e}),n}}),O=u(`$ZodStringFormat`,(e,t)=>{At.init(e,t),Bt.init(e,t)}),Vt=u(`$ZodGUID`,(e,t)=>{t.pattern??=Qe,O.init(e,t)}),Ht=u(`$ZodUUID`,(e,t)=>{if(t.version){let e={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(e===void 0)throw Error(`Invalid UUID version: "${t.version}"`);t.pattern??=$e(e)}else t.pattern??=$e();O.init(e,t)}),Ut=u(`$ZodEmail`,(e,t)=>{t.pattern??=et,O.init(e,t)}),Wt=u(`$ZodURL`,(e,t)=>{O.init(e,t),e._zod.check=n=>{try{let r=n.value.trim();if(!t.normalize&&t.protocol?.source===lt.source&&!/^https?:\/\//i.test(r)){n.issues.push({code:`invalid_format`,format:`url`,note:`Invalid URL format`,input:n.value,inst:e,continue:!t.abort});return}let i=new URL(r);t.hostname&&(t.hostname.lastIndex=0,t.hostname.test(i.hostname)||n.issues.push({code:`invalid_format`,format:`url`,note:`Invalid hostname`,pattern:t.hostname.source,input:n.value,inst:e,continue:!t.abort})),t.protocol&&(t.protocol.lastIndex=0,t.protocol.test(i.protocol.endsWith(`:`)?i.protocol.slice(0,-1):i.protocol)||n.issues.push({code:`invalid_format`,format:`url`,note:`Invalid protocol`,pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort})),t.normalize?n.value=i.href:n.value=r;return}catch{n.issues.push({code:`invalid_format`,format:`url`,input:n.value,inst:e,continue:!t.abort})}}}),Gt=u(`$ZodEmoji`,(e,t)=>{t.pattern??=nt(),O.init(e,t)}),Kt=u(`$ZodNanoID`,(e,t)=>{t.pattern??=Xe,O.init(e,t)}),qt=u(`$ZodCUID`,(e,t)=>{t.pattern??=Ge,O.init(e,t)}),Jt=u(`$ZodCUID2`,(e,t)=>{t.pattern??=Ke,O.init(e,t)}),Yt=u(`$ZodULID`,(e,t)=>{t.pattern??=qe,O.init(e,t)}),Xt=u(`$ZodXID`,(e,t)=>{t.pattern??=Je,O.init(e,t)}),Zt=u(`$ZodKSUID`,(e,t)=>{t.pattern??=Ye,O.init(e,t)}),Qt=u(`$ZodISODateTime`,(e,t)=>{t.pattern??=ht(t),O.init(e,t)}),$t=u(`$ZodISODate`,(e,t)=>{t.pattern??=ft,O.init(e,t)}),en=u(`$ZodISOTime`,(e,t)=>{t.pattern??=mt(t),O.init(e,t)}),tn=u(`$ZodISODuration`,(e,t)=>{t.pattern??=Ze,O.init(e,t)}),nn=u(`$ZodIPv4`,(e,t)=>{t.pattern??=rt,O.init(e,t),e._zod.bag.format=`ipv4`}),rn=u(`$ZodIPv6`,(e,t)=>{t.pattern??=it,O.init(e,t),e._zod.bag.format=`ipv6`,e._zod.check=n=>{try{new URL(`http://[${n.value}]`)}catch{n.issues.push({code:`invalid_format`,format:`ipv6`,input:n.value,inst:e,continue:!t.abort})}}}),an=u(`$ZodCIDRv4`,(e,t)=>{t.pattern??=at,O.init(e,t)}),on=u(`$ZodCIDRv6`,(e,t)=>{t.pattern??=ot,O.init(e,t),e._zod.check=n=>{let r=n.value.split(`/`);try{if(r.length!==2)throw Error();let[e,t]=r;if(!t)throw Error();let n=Number(t);if(`${n}`!==t||n<0||n>128)throw Error();new URL(`http://[${e}]`)}catch{n.issues.push({code:`invalid_format`,format:`cidrv6`,input:n.value,inst:e,continue:!t.abort})}}});function sn(e){if(e===``)return!0;if(/\s/.test(e)||e.length%4!=0)return!1;try{return atob(e),!0}catch{return!1}}var cn=u(`$ZodBase64`,(e,t)=>{t.pattern??=st,O.init(e,t),e._zod.bag.contentEncoding=`base64`,e._zod.check=n=>{sn(n.value)||n.issues.push({code:`invalid_format`,format:`base64`,input:n.value,inst:e,continue:!t.abort})}});function ln(e){if(!ct.test(e))return!1;let t=e.replace(/[-_]/g,e=>e===`-`?`+`:`/`);return sn(t.padEnd(Math.ceil(t.length/4)*4,`=`))}var un=u(`$ZodBase64URL`,(e,t)=>{t.pattern??=ct,O.init(e,t),e._zod.bag.contentEncoding=`base64url`,e._zod.check=n=>{ln(n.value)||n.issues.push({code:`invalid_format`,format:`base64url`,input:n.value,inst:e,continue:!t.abort})}}),dn=u(`$ZodE164`,(e,t)=>{t.pattern??=ut,O.init(e,t)});function fn(e,t=null){try{let n=e.split(`.`);if(n.length!==3)return!1;let[r]=n;if(!r)return!1;let i=JSON.parse(atob(r));return!(`typ`in i&&i?.typ!==`JWT`||!i.alg||t&&(!(`alg`in i)||i.alg!==t))}catch{return!1}}var pn=u(`$ZodJWT`,(e,t)=>{O.init(e,t),e._zod.check=n=>{fn(n.value,t.alg)||n.issues.push({code:`invalid_format`,format:`jwt`,input:n.value,inst:e,continue:!t.abort})}}),mn=u(`$ZodNumber`,(e,t)=>{D.init(e,t),e._zod.pattern=e._zod.bag.pattern??vt,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}let i=n.value;if(typeof i==`number`&&!Number.isNaN(i)&&Number.isFinite(i))return n;let a=typeof i==`number`?Number.isNaN(i)?`NaN`:Number.isFinite(i)?void 0:`Infinity`:void 0;return n.issues.push({expected:`number`,code:`invalid_type`,input:i,inst:e,...a?{received:a}:{}}),n}}),hn=u(`$ZodNumberFormat`,(e,t)=>{Et.init(e,t),mn.init(e,t)}),gn=u(`$ZodBoolean`,(e,t)=>{D.init(e,t),e._zod.pattern=yt,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=!!n.value}catch{}let i=n.value;return typeof i==`boolean`||n.issues.push({expected:`boolean`,code:`invalid_type`,input:i,inst:e}),n}}),_n=u(`$ZodUnknown`,(e,t)=>{D.init(e,t),e._zod.parse=e=>e}),vn=u(`$ZodNever`,(e,t)=>{D.init(e,t),e._zod.parse=(t,n)=>(t.issues.push({expected:`never`,code:`invalid_type`,input:t.value,inst:e}),t)});function yn(e,t,n){e.issues.length&&t.issues.push(...Ce(n,e.issues)),t.value[n]=e.value}var bn=u(`$ZodArray`,(e,t)=>{D.init(e,t),e._zod.parse=(n,r)=>{let i=n.value;if(!Array.isArray(i))return n.issues.push({expected:`array`,code:`invalid_type`,input:i,inst:e}),n;n.value=Array(i.length);let a=[];for(let e=0;e<i.length;e++){let o=i[e],s=t.element._zod.run({value:o,issues:[]},r);s instanceof Promise?a.push(s.then(t=>yn(t,n,e))):yn(s,n,e)}return a.length?Promise.all(a).then(()=>n):n}});function xn(e,t,n,r,i,a){let o=n in r;if(e.issues.length){if(i&&a&&!o)return;t.issues.push(...Ce(n,e.issues))}if(!o&&!i){e.issues.length||t.issues.push({code:`invalid_type`,expected:`nonoptional`,input:void 0,path:[n]});return}e.value===void 0?o&&(t.value[n]=void 0):t.value[n]=e.value}function Sn(e){let t=Object.keys(e.shape);for(let n of t)if(!e.shape?.[n]?._zod?.traits?.has(`$ZodType`))throw Error(`Invalid element at key "${n}": expected a Zod schema`);let n=pe(e.shape);return{...e,keys:t,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(n)}}function Cn(e,t,n,r,i,a){let o=[],s=i.keySet,c=i.catchall._zod,l=c.def.type,u=c.optin===`optional`,d=c.optout===`optional`;for(let i in t){if(i===`__proto__`||s.has(i))continue;if(l===`never`){o.push(i);continue}let a=c.run({value:t[i],issues:[]},r);a instanceof Promise?e.push(a.then(e=>xn(e,n,i,t,u,d))):xn(a,n,i,t,u,d)}return o.length&&n.issues.push({code:`unrecognized_keys`,keys:o,input:t,inst:a}),e.length?Promise.all(e).then(()=>n):n}var wn=u(`$ZodObject`,(e,t)=>{if(D.init(e,t),!Object.getOwnPropertyDescriptor(t,`shape`)?.get){let e=t.shape;Object.defineProperty(t,"shape",{get:()=>{let n={...e};return Object.defineProperty(t,"shape",{value:n}),n}})}let n=ne(()=>Sn(t));h(e._zod,`propValues`,()=>{let e=t.shape,n={};for(let t in e){let r=e[t]._zod;if(r.values){n[t]??(n[t]=new Set);for(let e of r.values)n[t].add(e)}}return n});let r=v,i=t.catchall,a;e._zod.parse=(t,o)=>{a??=n.value;let s=t.value;if(!r(s))return t.issues.push({expected:`object`,code:`invalid_type`,input:s,inst:e}),t;t.value={};let c=[],l=a.shape;for(let e of a.keys){let n=l[e],r=n._zod.optin===`optional`,i=n._zod.optout===`optional`,a=n._zod.run({value:s[e],issues:[]},o);a instanceof Promise?c.push(a.then(n=>xn(n,t,e,s,r,i))):xn(a,t,e,s,r,i)}return i?Cn(c,s,t,o,n.value,e):c.length?Promise.all(c).then(()=>t):t}}),Tn=u(`$ZodObjectJIT`,(e,t)=>{wn.init(e,t);let n=e._zod.parse,r=ne(()=>Sn(t)),i=e=>{let t=new Rt([`shape`,`payload`,`ctx`]),n=r.value,i=e=>{let t=se(e);return`shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`};t.write(`const input = payload.value;`);let a=Object.create(null),o=0;for(let e of n.keys)a[e]=`key_${o++}`;t.write(`const newResult = {};`);for(let r of n.keys){let n=a[r],o=se(r),s=e[r],c=s?._zod?.optin===`optional`,l=s?._zod?.optout===`optional`;t.write(`const ${n} = ${i(r)};`),c&&l?t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `):c?t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `):t.write(`
        const ${n}_present = ${o} in input;
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${o}]
          });
        }

        if (${n}_present) {
          if (${n}.value === undefined) {
            newResult[${o}] = undefined;
          } else {
            newResult[${o}] = ${n}.value;
          }
        }

      `)}t.write(`payload.value = newResult;`),t.write(`return payload;`);let s=t.compile();return(t,n)=>s(e,t,n)},a,o=v,s=!p.jitless,c=s&&ue.value,l=t.catchall,u;e._zod.parse=(d,f)=>{u??=r.value;let p=d.value;return o(p)?s&&c&&f?.async===!1&&f.jitless!==!0?(a||=i(t.shape),d=a(d,f),l?Cn([],p,d,f,u,e):d):n(d,f):(d.issues.push({expected:`object`,code:`invalid_type`,input:p,inst:e}),d)}});function En(e,t,n,r){for(let n of e)if(n.issues.length===0)return t.value=n.value,t;let i=e.filter(e=>!C(e));return i.length===1?(t.value=i[0].value,i[0]):(t.issues.push({code:`invalid_union`,input:t.value,inst:n,errors:e.map(e=>e.issues.map(e=>w(e,r,m())))}),t)}var Dn=u(`$ZodUnion`,(e,t)=>{D.init(e,t),h(e._zod,`optin`,()=>t.options.some(e=>e._zod.optin===`optional`)?`optional`:void 0),h(e._zod,`optout`,()=>t.options.some(e=>e._zod.optout===`optional`)?`optional`:void 0),h(e._zod,`values`,()=>{if(t.options.every(e=>e._zod.values))return new Set(t.options.flatMap(e=>Array.from(e._zod.values)))}),h(e._zod,`pattern`,()=>{if(t.options.every(e=>e._zod.pattern)){let e=t.options.map(e=>e._zod.pattern);return RegExp(`^(${e.map(e=>ie(e.source)).join(`|`)})$`)}});let n=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(r,i)=>{if(n)return n(r,i);let a=!1,o=[];for(let e of t.options){let t=e._zod.run({value:r.value,issues:[]},i);if(t instanceof Promise)o.push(t),a=!0;else{if(t.issues.length===0)return t;o.push(t)}}return a?Promise.all(o).then(t=>En(t,r,e,i)):En(o,r,e,i)}}),On=u(`$ZodDiscriminatedUnion`,(e,t)=>{t.inclusive=!1,Dn.init(e,t);let n=e._zod.parse;h(e._zod,`propValues`,()=>{let e={};for(let n of t.options){let r=n._zod.propValues;if(!r||Object.keys(r).length===0)throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);for(let[t,n]of Object.entries(r)){e[t]||(e[t]=new Set);for(let r of n)e[t].add(r)}}return e});let r=ne(()=>{let e=t.options,n=new Map;for(let r of e){let e=r._zod.propValues?.[t.discriminator];if(!e||e.size===0)throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);for(let t of e){if(n.has(t))throw Error(`Duplicate discriminator value "${String(t)}"`);n.set(t,r)}}return n});e._zod.parse=(i,a)=>{let o=i.value;if(!v(o))return i.issues.push({code:`invalid_type`,expected:`object`,input:o,inst:e}),i;let s=r.value.get(o?.[t.discriminator]);return s?s._zod.run(i,a):t.unionFallback||a.direction===`backward`?n(i,a):(i.issues.push({code:`invalid_union`,errors:[],note:`No matching discriminator`,discriminator:t.discriminator,options:Array.from(r.value.keys()),input:o,path:[t.discriminator],inst:e}),i)}}),kn=u(`$ZodIntersection`,(e,t)=>{D.init(e,t),e._zod.parse=(e,n)=>{let r=e.value,i=t.left._zod.run({value:r,issues:[]},n),a=t.right._zod.run({value:r,issues:[]},n);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([t,n])=>jn(e,t,n)):jn(e,i,a)}});function An(e,t){if(e===t||e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(y(e)&&y(t)){let n=Object.keys(t),r=Object.keys(e).filter(e=>n.indexOf(e)!==-1),i={...e,...t};for(let n of r){let r=An(e[n],t[n]);if(!r.valid)return{valid:!1,mergeErrorPath:[n,...r.mergeErrorPath]};i[n]=r.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let r=0;r<e.length;r++){let i=e[r],a=t[r],o=An(i,a);if(!o.valid)return{valid:!1,mergeErrorPath:[r,...o.mergeErrorPath]};n.push(o.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function jn(e,t,n){let r=new Map,i;for(let n of t.issues)if(n.code===`unrecognized_keys`){i??=n;for(let e of n.keys)r.has(e)||r.set(e,{}),r.get(e).l=!0}else e.issues.push(n);for(let t of n.issues)if(t.code===`unrecognized_keys`)for(let e of t.keys)r.has(e)||r.set(e,{}),r.get(e).r=!0;else e.issues.push(t);let a=[...r].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(a.length&&i&&e.issues.push({...i,keys:a}),C(e))return e;let o=An(t.value,n.value);if(!o.valid)throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);return e.value=o.data,e}var Mn=u(`$ZodEnum`,(e,t)=>{D.init(e,t);let n=ee(t.entries),r=new Set(n);e._zod.values=r,e._zod.pattern=RegExp(`^(${n.filter(e=>fe.has(typeof e)).map(e=>typeof e==`string`?b(e):e.toString()).join(`|`)})$`),e._zod.parse=(t,i)=>{let a=t.value;return r.has(a)||t.issues.push({code:`invalid_value`,values:n,input:a,inst:e}),t}}),Nn=u(`$ZodLiteral`,(e,t)=>{if(D.init(e,t),t.values.length===0)throw Error(`Cannot create literal schema with no valid values`);let n=new Set(t.values);e._zod.values=n,e._zod.pattern=RegExp(`^(${t.values.map(e=>typeof e==`string`?b(e):e?b(e.toString()):String(e)).join(`|`)})$`),e._zod.parse=(r,i)=>{let a=r.value;return n.has(a)||r.issues.push({code:`invalid_value`,values:t.values,input:a,inst:e}),r}}),Pn=u(`$ZodTransform`,(e,t)=>{D.init(e,t),e._zod.optin=`optional`,e._zod.parse=(n,r)=>{if(r.direction===`backward`)throw new f(e.constructor.name);let i=t.transform(n.value,n);if(r.async)return(i instanceof Promise?i:Promise.resolve(i)).then(e=>(n.value=e,n.fallback=!0,n));if(i instanceof Promise)throw new d;return n.value=i,n.fallback=!0,n}});function Fn(e,t){return t===void 0&&(e.issues.length||e.fallback)?{issues:[],value:void 0}:e}var In=u(`$ZodOptional`,(e,t)=>{D.init(e,t),e._zod.optin=`optional`,e._zod.optout=`optional`,h(e._zod,`values`,()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),h(e._zod,`pattern`,()=>{let e=t.innerType._zod.pattern;return e?RegExp(`^(${ie(e.source)})?$`):void 0}),e._zod.parse=(e,n)=>{if(t.innerType._zod.optin===`optional`){let r=e.value,i=t.innerType._zod.run(e,n);return i instanceof Promise?i.then(e=>Fn(e,r)):Fn(i,r)}return e.value===void 0?e:t.innerType._zod.run(e,n)}}),Ln=u(`$ZodExactOptional`,(e,t)=>{In.init(e,t),h(e._zod,`values`,()=>t.innerType._zod.values),h(e._zod,`pattern`,()=>t.innerType._zod.pattern),e._zod.parse=(e,n)=>t.innerType._zod.run(e,n)}),Rn=u(`$ZodNullable`,(e,t)=>{D.init(e,t),h(e._zod,`optin`,()=>t.innerType._zod.optin),h(e._zod,`optout`,()=>t.innerType._zod.optout),h(e._zod,`pattern`,()=>{let e=t.innerType._zod.pattern;return e?RegExp(`^(${ie(e.source)}|null)$`):void 0}),h(e._zod,`values`,()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,null]):void 0),e._zod.parse=(e,n)=>e.value===null?e:t.innerType._zod.run(e,n)}),zn=u(`$ZodDefault`,(e,t)=>{D.init(e,t),e._zod.optin=`optional`,h(e._zod,`values`,()=>t.innerType._zod.values),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);if(e.value===void 0)return e.value=t.defaultValue,e;let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(e=>Bn(e,t)):Bn(r,t)}});function Bn(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}var Vn=u(`$ZodPrefault`,(e,t)=>{D.init(e,t),e._zod.optin=`optional`,h(e._zod,`values`,()=>t.innerType._zod.values),e._zod.parse=(e,n)=>(n.direction===`backward`||e.value===void 0&&(e.value=t.defaultValue),t.innerType._zod.run(e,n))}),Hn=u(`$ZodNonOptional`,(e,t)=>{D.init(e,t),h(e._zod,`values`,()=>{let e=t.innerType._zod.values;return e?new Set([...e].filter(e=>e!==void 0)):void 0}),e._zod.parse=(n,r)=>{let i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(t=>Un(t,e)):Un(i,e)}});function Un(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:`invalid_type`,expected:`nonoptional`,input:e.value,inst:t}),e}var Wn=u(`$ZodCatch`,(e,t)=>{D.init(e,t),e._zod.optin=`optional`,h(e._zod,`optout`,()=>t.innerType._zod.optout),h(e._zod,`values`,()=>t.innerType._zod.values),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(r=>(e.value=r.value,r.issues.length&&(e.value=t.catchValue({...e,error:{issues:r.issues.map(e=>w(e,n,m()))},input:e.value}),e.issues=[],e.fallback=!0),e)):(e.value=r.value,r.issues.length&&(e.value=t.catchValue({...e,error:{issues:r.issues.map(e=>w(e,n,m()))},input:e.value}),e.issues=[],e.fallback=!0),e)}}),Gn=u(`$ZodPipe`,(e,t)=>{D.init(e,t),h(e._zod,`values`,()=>t.in._zod.values),h(e._zod,`optin`,()=>t.in._zod.optin),h(e._zod,`optout`,()=>t.out._zod.optout),h(e._zod,`propValues`,()=>t.in._zod.propValues),e._zod.parse=(e,n)=>{if(n.direction===`backward`){let r=t.out._zod.run(e,n);return r instanceof Promise?r.then(e=>Kn(e,t.in,n)):Kn(r,t.in,n)}let r=t.in._zod.run(e,n);return r instanceof Promise?r.then(e=>Kn(e,t.out,n)):Kn(r,t.out,n)}});function Kn(e,t,n){return e.issues.length?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues,fallback:e.fallback},n)}var qn=u(`$ZodReadonly`,(e,t)=>{D.init(e,t),h(e._zod,`propValues`,()=>t.innerType._zod.propValues),h(e._zod,`values`,()=>t.innerType._zod.values),h(e._zod,`optin`,()=>t.innerType?._zod?.optin),h(e._zod,`optout`,()=>t.innerType?._zod?.optout),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(Jn):Jn(r)}});function Jn(e){return e.value=Object.freeze(e.value),e}var Yn=u(`$ZodCustom`,(e,t)=>{E.init(e,t),D.init(e,t),e._zod.parse=(e,t)=>e,e._zod.check=n=>{let r=n.value,i=t.fn(r);if(i instanceof Promise)return i.then(t=>Xn(t,n,r,e));Xn(i,n,r,e)}});function Xn(e,t,n,r){if(!e){let e={code:`custom`,input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};r._zod.def.params&&(e.params=r._zod.def.params),t.issues.push(T(e))}}var Zn,Qn=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let n=t[0];return this._map.set(e,n),n&&typeof n==`object`&&`id`in n&&this._idmap.set(n.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&typeof t==`object`&&`id`in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let n={...this.get(t)??{}};delete n.id;let r={...n,...this._map.get(e)};return Object.keys(r).length?r:void 0}return this._map.get(e)}has(e){return this._map.has(e)}};function $n(){return new Qn}(Zn=globalThis).__zod_globalRegistry??(Zn.__zod_globalRegistry=$n());var k=globalThis.__zod_globalRegistry;function er(e,t){return new e({type:`string`,...S(t)})}function tr(e,t){return new e({type:`string`,format:`email`,check:`string_format`,abort:!1,...S(t)})}function nr(e,t){return new e({type:`string`,format:`guid`,check:`string_format`,abort:!1,...S(t)})}function rr(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,...S(t)})}function ir(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,version:`v4`,...S(t)})}function ar(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,version:`v6`,...S(t)})}function or(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,version:`v7`,...S(t)})}function sr(e,t){return new e({type:`string`,format:`url`,check:`string_format`,abort:!1,...S(t)})}function cr(e,t){return new e({type:`string`,format:`emoji`,check:`string_format`,abort:!1,...S(t)})}function lr(e,t){return new e({type:`string`,format:`nanoid`,check:`string_format`,abort:!1,...S(t)})}function ur(e,t){return new e({type:`string`,format:`cuid`,check:`string_format`,abort:!1,...S(t)})}function dr(e,t){return new e({type:`string`,format:`cuid2`,check:`string_format`,abort:!1,...S(t)})}function fr(e,t){return new e({type:`string`,format:`ulid`,check:`string_format`,abort:!1,...S(t)})}function pr(e,t){return new e({type:`string`,format:`xid`,check:`string_format`,abort:!1,...S(t)})}function mr(e,t){return new e({type:`string`,format:`ksuid`,check:`string_format`,abort:!1,...S(t)})}function hr(e,t){return new e({type:`string`,format:`ipv4`,check:`string_format`,abort:!1,...S(t)})}function gr(e,t){return new e({type:`string`,format:`ipv6`,check:`string_format`,abort:!1,...S(t)})}function _r(e,t){return new e({type:`string`,format:`cidrv4`,check:`string_format`,abort:!1,...S(t)})}function vr(e,t){return new e({type:`string`,format:`cidrv6`,check:`string_format`,abort:!1,...S(t)})}function yr(e,t){return new e({type:`string`,format:`base64`,check:`string_format`,abort:!1,...S(t)})}function br(e,t){return new e({type:`string`,format:`base64url`,check:`string_format`,abort:!1,...S(t)})}function xr(e,t){return new e({type:`string`,format:`e164`,check:`string_format`,abort:!1,...S(t)})}function Sr(e,t){return new e({type:`string`,format:`jwt`,check:`string_format`,abort:!1,...S(t)})}function Cr(e,t){return new e({type:`string`,format:`datetime`,check:`string_format`,offset:!1,local:!1,precision:null,...S(t)})}function wr(e,t){return new e({type:`string`,format:`date`,check:`string_format`,...S(t)})}function Tr(e,t){return new e({type:`string`,format:`time`,check:`string_format`,precision:null,...S(t)})}function Er(e,t){return new e({type:`string`,format:`duration`,check:`string_format`,...S(t)})}function Dr(e,t){return new e({type:`number`,checks:[],...S(t)})}function Or(e,t){return new e({type:`number`,check:`number_format`,abort:!1,format:`safeint`,...S(t)})}function kr(e,t){return new e({type:`boolean`,...S(t)})}function Ar(e){return new e({type:`unknown`})}function jr(e,t){return new e({type:`never`,...S(t)})}function Mr(e,t){return new Ct({check:`less_than`,...S(t),value:e,inclusive:!1})}function Nr(e,t){return new Ct({check:`less_than`,...S(t),value:e,inclusive:!0})}function Pr(e,t){return new wt({check:`greater_than`,...S(t),value:e,inclusive:!1})}function Fr(e,t){return new wt({check:`greater_than`,...S(t),value:e,inclusive:!0})}function Ir(e,t){return new Tt({check:`multiple_of`,...S(t),value:e})}function Lr(e,t){return new Dt({check:`max_length`,...S(t),maximum:e})}function Rr(e,t){return new Ot({check:`min_length`,...S(t),minimum:e})}function zr(e,t){return new kt({check:`length_equals`,...S(t),length:e})}function Br(e,t){return new jt({check:`string_format`,format:`regex`,...S(t),pattern:e})}function Vr(e){return new Mt({check:`string_format`,format:`lowercase`,...S(e)})}function Hr(e){return new Nt({check:`string_format`,format:`uppercase`,...S(e)})}function Ur(e,t){return new Pt({check:`string_format`,format:`includes`,...S(t),includes:e})}function Wr(e,t){return new Ft({check:`string_format`,format:`starts_with`,...S(t),prefix:e})}function Gr(e,t){return new It({check:`string_format`,format:`ends_with`,...S(t),suffix:e})}function A(e){return new Lt({check:`overwrite`,tx:e})}function Kr(e){return A(t=>t.normalize(e))}function qr(){return A(e=>e.trim())}function Jr(){return A(e=>e.toLowerCase())}function Yr(){return A(e=>e.toUpperCase())}function Xr(){return A(e=>ce(e))}function Zr(e,t,n){return new e({type:`array`,element:t,...S(n)})}function Qr(e,t,n){return new e({type:`custom`,check:`custom`,fn:t,...S(n)})}function $r(e,t){let n=ei(t=>(t.addIssue=e=>{if(typeof e==`string`)t.issues.push(T(e,t.value,n._zod.def));else{let r=e;r.fatal&&(r.continue=!1),r.code??=`custom`,r.input??=t.value,r.inst??=n,r.continue??=!n._zod.def.abort,t.issues.push(T(r))}},e(t.value,t)),t);return n}function ei(e,t){let n=new E({check:`custom`,...S(t)});return n._zod.check=e,n}function ti(e){let t=e?.target??`draft-2020-12`;return t===`draft-4`&&(t=`draft-04`),t===`draft-7`&&(t=`draft-07`),{processors:e.processors??{},metadataRegistry:e?.metadata??k,target:t,unrepresentable:e?.unrepresentable??`throw`,override:e?.override??(()=>{}),io:e?.io??`output`,counter:0,seen:new Map,cycles:e?.cycles??`ref`,reused:e?.reused??`inline`,external:e?.external??void 0}}function j(e,t,n={path:[],schemaPath:[]}){var r;let i=e._zod.def,a=t.seen.get(e);if(a)return a.count++,n.schemaPath.includes(e)&&(a.cycle=n.path),a.schema;let o={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,o);let s=e._zod.toJSONSchema?.();if(s)o.schema=s;else{let r={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,o.schema,r);else{let n=o.schema,a=t.processors[i.type];if(!a)throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);a(e,t,n,r)}let a=e._zod.parent;a&&(o.ref||=a,j(a,t,r),t.seen.get(a).isParent=!0)}let c=t.metadataRegistry.get(e);return c&&Object.assign(o.schema,c),t.io===`input`&&M(e)&&(delete o.schema.examples,delete o.schema.default),t.io===`input`&&`_prefault`in o.schema&&((r=o.schema).default??(r.default=o.schema._prefault)),delete o.schema._prefault,t.seen.get(e).schema}function ni(e,t){let n=e.seen.get(t);if(!n)throw Error(`Unprocessed schema. This is a bug in Zod.`);let r=new Map;for(let t of e.seen.entries()){let n=e.metadataRegistry.get(t[0])?.id;if(n){let e=r.get(n);if(e&&e!==t[0])throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(n,t[0])}}let i=t=>{let r=e.target===`draft-2020-12`?`$defs`:`definitions`;if(e.external){let n=e.external.registry.get(t[0])?.id,i=e.external.uri??(e=>e);if(n)return{ref:i(n)};let a=t[1].defId??t[1].schema.id??`schema${e.counter++}`;return t[1].defId=a,{defId:a,ref:`${i(`__shared`)}#/${r}/${a}`}}if(t[1]===n)return{ref:`#`};let i=`#/${r}/`,a=t[1].schema.id??`__schema${e.counter++}`;return{defId:a,ref:i+a}},a=e=>{if(e[1].schema.$ref)return;let t=e[1],{ref:n,defId:r}=i(e);t.def={...t.schema},r&&(t.defId=r);let a=t.schema;for(let e in a)delete a[e];a.$ref=n};if(e.cycles===`throw`)for(let t of e.seen.entries()){let e=t[1];if(e.cycle)throw Error(`Cycle detected: #/${e.cycle?.join(`/`)}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let n of e.seen.entries()){let r=n[1];if(t===n[0]){a(n);continue}if(e.external){let r=e.external.registry.get(n[0])?.id;if(t!==n[0]&&r){a(n);continue}}if(e.metadataRegistry.get(n[0])?.id){a(n);continue}if(r.cycle){a(n);continue}if(r.count>1&&e.reused===`ref`){a(n);continue}}}function ri(e,t){let n=e.seen.get(t);if(!n)throw Error(`Unprocessed schema. This is a bug in Zod.`);let r=t=>{let n=e.seen.get(t);if(n.ref===null)return;let i=n.def??n.schema,a={...i},o=n.ref;if(n.ref=null,o){r(o);let n=e.seen.get(o),s=n.schema;if(s.$ref&&(e.target===`draft-07`||e.target===`draft-04`||e.target===`openapi-3.0`)?(i.allOf=i.allOf??[],i.allOf.push(s)):Object.assign(i,s),Object.assign(i,a),t._zod.parent===o)for(let e in i)e===`$ref`||e===`allOf`||e in a||delete i[e];if(s.$ref&&n.def)for(let e in i)e===`$ref`||e===`allOf`||e in n.def&&JSON.stringify(i[e])===JSON.stringify(n.def[e])&&delete i[e]}let s=t._zod.parent;if(s&&s!==o){r(s);let t=e.seen.get(s);if(t?.schema.$ref&&(i.$ref=t.schema.$ref,t.def))for(let e in i)e===`$ref`||e===`allOf`||e in t.def&&JSON.stringify(i[e])===JSON.stringify(t.def[e])&&delete i[e]}e.override({zodSchema:t,jsonSchema:i,path:n.path??[]})};for(let t of[...e.seen.entries()].reverse())r(t[0]);let i={};if(e.target===`draft-2020-12`?i.$schema=`https://json-schema.org/draft/2020-12/schema`:e.target===`draft-07`?i.$schema=`http://json-schema.org/draft-07/schema#`:e.target===`draft-04`?i.$schema=`http://json-schema.org/draft-04/schema#`:e.target,e.external?.uri){let n=e.external.registry.get(t)?.id;if(!n)throw Error("Schema is missing an `id` property");i.$id=e.external.uri(n)}Object.assign(i,n.def??n.schema);let a=e.metadataRegistry.get(t)?.id;a!==void 0&&i.id===a&&delete i.id;let o=e.external?.defs??{};for(let t of e.seen.entries()){let e=t[1];e.def&&e.defId&&(e.def.id===e.defId&&delete e.def.id,o[e.defId]=e.def)}e.external||Object.keys(o).length>0&&(e.target===`draft-2020-12`?i.$defs=o:i.definitions=o);try{let n=JSON.parse(JSON.stringify(i));return Object.defineProperty(n,"~standard",{value:{...t[`~standard`],jsonSchema:{input:ai(t,`input`,e.processors),output:ai(t,`output`,e.processors)}},enumerable:!1,writable:!1}),n}catch{throw Error(`Error converting schema to JSON.`)}}function M(e,t){let n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);let r=e._zod.def;if(r.type===`transform`)return!0;if(r.type===`array`)return M(r.element,n);if(r.type===`set`)return M(r.valueType,n);if(r.type===`lazy`)return M(r.getter(),n);if(r.type===`promise`||r.type===`optional`||r.type===`nonoptional`||r.type===`nullable`||r.type===`readonly`||r.type==="default"||r.type===`prefault`)return M(r.innerType,n);if(r.type===`intersection`)return M(r.left,n)||M(r.right,n);if(r.type===`record`||r.type===`map`)return M(r.keyType,n)||M(r.valueType,n);if(r.type===`pipe`)return e._zod.traits.has(`$ZodCodec`)?!0:M(r.in,n)||M(r.out,n);if(r.type===`object`){for(let e in r.shape)if(M(r.shape[e],n))return!0;return!1}if(r.type===`union`){for(let e of r.options)if(M(e,n))return!0;return!1}if(r.type===`tuple`){for(let e of r.items)if(M(e,n))return!0;return!!(r.rest&&M(r.rest,n))}return!1}var ii=(e,t={})=>n=>{let r=ti({...n,processors:t});return j(e,r),ni(r,e),ri(r,e)},ai=(e,t,n={})=>r=>{let{libraryOptions:i,target:a}=r??{},o=ti({...i??{},target:a,io:t,processors:n});return j(e,o),ni(o,e),ri(o,e)},oi={guid:`uuid`,url:`uri`,datetime:`date-time`,json_string:`json-string`,regex:``},si=(e,t,n,r)=>{let i=n;i.type=`string`;let{minimum:a,maximum:o,format:s,patterns:c,contentEncoding:l}=e._zod.bag;if(typeof a==`number`&&(i.minLength=a),typeof o==`number`&&(i.maxLength=o),s&&(i.format=oi[s]??s,i.format===``&&delete i.format,s===`time`&&delete i.format),l&&(i.contentEncoding=l),c&&c.size>0){let e=[...c];e.length===1?i.pattern=e[0].source:e.length>1&&(i.allOf=[...e.map(e=>({...t.target===`draft-07`||t.target===`draft-04`||t.target===`openapi-3.0`?{type:`string`}:{},pattern:e.source}))])}},ci=(e,t,n,r)=>{let i=n,{minimum:a,maximum:o,format:s,multipleOf:c,exclusiveMaximum:l,exclusiveMinimum:u}=e._zod.bag;typeof s==`string`&&s.includes(`int`)?i.type=`integer`:i.type=`number`;let d=typeof u==`number`&&u>=(a??-1/0),f=typeof l==`number`&&l<=(o??1/0),p=t.target===`draft-04`||t.target===`openapi-3.0`;d?p?(i.minimum=u,i.exclusiveMinimum=!0):i.exclusiveMinimum=u:typeof a==`number`&&(i.minimum=a),f?p?(i.maximum=l,i.exclusiveMaximum=!0):i.exclusiveMaximum=l:typeof o==`number`&&(i.maximum=o),typeof c==`number`&&(i.multipleOf=c)},li=(e,t,n,r)=>{n.type=`boolean`},ui=(e,t,n,r)=>{n.not={}},di=(e,t,n,r)=>{let i=e._zod.def,a=ee(i.entries);a.every(e=>typeof e==`number`)&&(n.type=`number`),a.every(e=>typeof e==`string`)&&(n.type=`string`),n.enum=a},fi=(e,t,n,r)=>{let i=e._zod.def,a=[];for(let e of i.values)if(e===void 0){if(t.unrepresentable===`throw`)throw Error("Literal `undefined` cannot be represented in JSON Schema")}else if(typeof e==`bigint`){if(t.unrepresentable===`throw`)throw Error(`BigInt literals cannot be represented in JSON Schema`);a.push(Number(e))}else a.push(e);if(a.length!==0)if(a.length===1){let e=a[0];n.type=e===null?`null`:typeof e,t.target===`draft-04`||t.target===`openapi-3.0`?n.enum=[e]:n.const=e}else a.every(e=>typeof e==`number`)&&(n.type=`number`),a.every(e=>typeof e==`string`)&&(n.type=`string`),a.every(e=>typeof e==`boolean`)&&(n.type=`boolean`),a.every(e=>e===null)&&(n.type=`null`),n.enum=a},pi=(e,t,n,r)=>{if(t.unrepresentable===`throw`)throw Error(`Custom types cannot be represented in JSON Schema`)},mi=(e,t,n,r)=>{if(t.unrepresentable===`throw`)throw Error(`Transforms cannot be represented in JSON Schema`)},hi=(e,t,n,r)=>{let i=n,a=e._zod.def,{minimum:o,maximum:s}=e._zod.bag;typeof o==`number`&&(i.minItems=o),typeof s==`number`&&(i.maxItems=s),i.type=`array`,i.items=j(a.element,t,{...r,path:[...r.path,`items`]})},gi=(e,t,n,r)=>{let i=n,a=e._zod.def;i.type=`object`,i.properties={};let o=a.shape;for(let e in o)i.properties[e]=j(o[e],t,{...r,path:[...r.path,`properties`,e]});let s=new Set(Object.keys(o)),c=new Set([...s].filter(e=>{let n=a.shape[e]._zod;return t.io===`input`?n.optin===void 0:n.optout===void 0}));c.size>0&&(i.required=Array.from(c)),a.catchall?._zod.def.type===`never`?i.additionalProperties=!1:a.catchall?a.catchall&&(i.additionalProperties=j(a.catchall,t,{...r,path:[...r.path,`additionalProperties`]})):t.io===`output`&&(i.additionalProperties=!1)},_i=(e,t,n,r)=>{let i=e._zod.def,a=i.inclusive===!1,o=i.options.map((e,n)=>j(e,t,{...r,path:[...r.path,a?`oneOf`:`anyOf`,n]}));a?n.oneOf=o:n.anyOf=o},vi=(e,t,n,r)=>{let i=e._zod.def,a=j(i.left,t,{...r,path:[...r.path,`allOf`,0]}),o=j(i.right,t,{...r,path:[...r.path,`allOf`,1]}),s=e=>`allOf`in e&&Object.keys(e).length===1;n.allOf=[...s(a)?a.allOf:[a],...s(o)?o.allOf:[o]]},yi=(e,t,n,r)=>{let i=e._zod.def,a=j(i.innerType,t,r),o=t.seen.get(e);t.target===`openapi-3.0`?(o.ref=i.innerType,n.nullable=!0):n.anyOf=[a,{type:`null`}]},bi=(e,t,n,r)=>{let i=e._zod.def;j(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType},xi=(e,t,n,r)=>{let i=e._zod.def;j(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType,n.default=JSON.parse(JSON.stringify(i.defaultValue))},Si=(e,t,n,r)=>{let i=e._zod.def;j(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType,t.io===`input`&&(n._prefault=JSON.parse(JSON.stringify(i.defaultValue)))},Ci=(e,t,n,r)=>{let i=e._zod.def;j(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType;let o;try{o=i.catchValue(void 0)}catch{throw Error(`Dynamic catch values are not supported in JSON Schema`)}n.default=o},wi=(e,t,n,r)=>{let i=e._zod.def,a=i.in._zod.traits.has(`$ZodTransform`),o=t.io===`input`?a?i.out:i.in:i.out;j(o,t,r);let s=t.seen.get(e);s.ref=o},Ti=(e,t,n,r)=>{let i=e._zod.def;j(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType,n.readOnly=!0},Ei=(e,t,n,r)=>{let i=e._zod.def;j(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType},Di=u(`ZodISODateTime`,(e,t)=>{Qt.init(e,t),L.init(e,t)});function Oi(e){return Cr(Di,e)}var ki=u(`ZodISODate`,(e,t)=>{$t.init(e,t),L.init(e,t)});function Ai(e){return wr(ki,e)}var ji=u(`ZodISOTime`,(e,t)=>{en.init(e,t),L.init(e,t)});function Mi(e){return Tr(ji,e)}var Ni=u(`ZodISODuration`,(e,t)=>{tn.init(e,t),L.init(e,t)});function Pi(e){return Er(Ni,e)}var N=u(`ZodError`,(e,t)=>{De.init(e,t),e.name=`ZodError`,Object.defineProperties(e,{format:{value:t=>Ae(e,t)},flatten:{value:t=>ke(e,t)},addIssue:{value:t=>{e.issues.push(t),e.message=JSON.stringify(e.issues,te,2)}},addIssues:{value:t=>{e.issues.push(...t),e.message=JSON.stringify(e.issues,te,2)}},isEmpty:{get(){return e.issues.length===0}}})},{Parent:Error}),Fi=je(N),Ii=Me(N),Li=Ne(N),Ri=Fe(N),zi=Le(N),Bi=Re(N),Vi=ze(N),Hi=Be(N),Ui=Ve(N),Wi=He(N),Gi=Ue(N),Ki=We(N),qi=new WeakMap;function P(e,t,n){let r=Object.getPrototypeOf(e),i=qi.get(r);if(i||(i=new Set,qi.set(r,i)),!i.has(t)){i.add(t);for(let e in n){let t=n[e];Object.defineProperty(r,e,{configurable:!0,enumerable:!1,get(){let n=t.bind(this);return Object.defineProperty(this,e,{configurable:!0,writable:!0,enumerable:!0,value:n}),n},set(t){Object.defineProperty(this,e,{configurable:!0,writable:!0,enumerable:!0,value:t})}})}}}var F=u(`ZodType`,(e,t)=>(D.init(e,t),Object.assign(e[`~standard`],{jsonSchema:{input:ai(e,`input`),output:ai(e,`output`)}}),e.toJSONSchema=ii(e,{}),e.def=t,e.type=t.type,Object.defineProperty(e,"_def",{value:t}),e.parse=(t,n)=>Fi(e,t,n,{callee:e.parse}),e.safeParse=(t,n)=>Li(e,t,n),e.parseAsync=async(t,n)=>Ii(e,t,n,{callee:e.parseAsync}),e.safeParseAsync=async(t,n)=>Ri(e,t,n),e.spa=e.safeParseAsync,e.encode=(t,n)=>zi(e,t,n),e.decode=(t,n)=>Bi(e,t,n),e.encodeAsync=async(t,n)=>Vi(e,t,n),e.decodeAsync=async(t,n)=>Hi(e,t,n),e.safeEncode=(t,n)=>Ui(e,t,n),e.safeDecode=(t,n)=>Wi(e,t,n),e.safeEncodeAsync=async(t,n)=>Gi(e,t,n),e.safeDecodeAsync=async(t,n)=>Ki(e,t,n),P(e,`ZodType`,{check(...e){let t=this.def;return this.clone(_(t,{checks:[...t.checks??[],...e.map(e=>typeof e==`function`?{_zod:{check:e,def:{check:`custom`},onattach:[]}}:e)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,t){return x(this,e,t)},brand(){return this},register(e,t){return e.add(this,t),this},refine(e,t){return this.check($a(e,t))},superRefine(e,t){return this.check(eo(e,t))},overwrite(e){return this.check(A(e))},optional(){return Fa(this)},exactOptional(){return La(this)},nullable(){return za(this)},nullish(){return Fa(za(this))},nonoptional(e){return Ga(this,e)},array(){return H(this)},or(e){return Ta([this,e])},and(e){return ka(this,e)},transform(e){return Ya(this,Na(e))},default(e){return Va(this,e)},prefault(e){return Ua(this,e)},catch(e){return qa(this,e)},pipe(e){return Ya(this,e)},readonly(){return Za(this)},describe(e){let t=this.clone();return k.add(t,{description:e}),t},meta(...e){if(e.length===0)return k.get(this);let t=this.clone();return k.add(t,e[0]),t},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e){return e(this)}}),Object.defineProperty(e,"description",{get(){return k.get(e)?.description},configurable:!0}),e)),Ji=u(`_ZodString`,(e,t)=>{Bt.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>si(e,t,n,r);let n=e._zod.bag;e.format=n.format??null,e.minLength=n.minimum??null,e.maxLength=n.maximum??null,P(e,`_ZodString`,{regex(...e){return this.check(Br(...e))},includes(...e){return this.check(Ur(...e))},startsWith(...e){return this.check(Wr(...e))},endsWith(...e){return this.check(Gr(...e))},min(...e){return this.check(Rr(...e))},max(...e){return this.check(Lr(...e))},length(...e){return this.check(zr(...e))},nonempty(...e){return this.check(Rr(1,...e))},lowercase(e){return this.check(Vr(e))},uppercase(e){return this.check(Hr(e))},trim(){return this.check(qr())},normalize(...e){return this.check(Kr(...e))},toLowerCase(){return this.check(Jr())},toUpperCase(){return this.check(Yr())},slugify(){return this.check(Xr())}})}),Yi=u(`ZodString`,(e,t)=>{Bt.init(e,t),Ji.init(e,t),e.email=t=>e.check(tr(Xi,t)),e.url=t=>e.check(sr(Qi,t)),e.jwt=t=>e.check(Sr(pa,t)),e.emoji=t=>e.check(cr($i,t)),e.guid=t=>e.check(nr(Zi,t)),e.uuid=t=>e.check(rr(R,t)),e.uuidv4=t=>e.check(ir(R,t)),e.uuidv6=t=>e.check(ar(R,t)),e.uuidv7=t=>e.check(or(R,t)),e.nanoid=t=>e.check(lr(ea,t)),e.guid=t=>e.check(nr(Zi,t)),e.cuid=t=>e.check(ur(ta,t)),e.cuid2=t=>e.check(dr(na,t)),e.ulid=t=>e.check(fr(ra,t)),e.base64=t=>e.check(yr(ua,t)),e.base64url=t=>e.check(br(da,t)),e.xid=t=>e.check(pr(ia,t)),e.ksuid=t=>e.check(mr(aa,t)),e.ipv4=t=>e.check(hr(oa,t)),e.ipv6=t=>e.check(gr(sa,t)),e.cidrv4=t=>e.check(_r(ca,t)),e.cidrv6=t=>e.check(vr(la,t)),e.e164=t=>e.check(xr(fa,t)),e.datetime=t=>e.check(Oi(t)),e.date=t=>e.check(Ai(t)),e.time=t=>e.check(Mi(t)),e.duration=t=>e.check(Pi(t))});function I(e){return er(Yi,e)}var L=u(`ZodStringFormat`,(e,t)=>{O.init(e,t),Ji.init(e,t)}),Xi=u(`ZodEmail`,(e,t)=>{Ut.init(e,t),L.init(e,t)}),Zi=u(`ZodGUID`,(e,t)=>{Vt.init(e,t),L.init(e,t)}),R=u(`ZodUUID`,(e,t)=>{Ht.init(e,t),L.init(e,t)});function z(e){return rr(R,e)}var Qi=u(`ZodURL`,(e,t)=>{Wt.init(e,t),L.init(e,t)}),$i=u(`ZodEmoji`,(e,t)=>{Gt.init(e,t),L.init(e,t)}),ea=u(`ZodNanoID`,(e,t)=>{Kt.init(e,t),L.init(e,t)}),ta=u(`ZodCUID`,(e,t)=>{qt.init(e,t),L.init(e,t)}),na=u(`ZodCUID2`,(e,t)=>{Jt.init(e,t),L.init(e,t)}),ra=u(`ZodULID`,(e,t)=>{Yt.init(e,t),L.init(e,t)}),ia=u(`ZodXID`,(e,t)=>{Xt.init(e,t),L.init(e,t)}),aa=u(`ZodKSUID`,(e,t)=>{Zt.init(e,t),L.init(e,t)}),oa=u(`ZodIPv4`,(e,t)=>{nn.init(e,t),L.init(e,t)}),sa=u(`ZodIPv6`,(e,t)=>{rn.init(e,t),L.init(e,t)}),ca=u(`ZodCIDRv4`,(e,t)=>{an.init(e,t),L.init(e,t)}),la=u(`ZodCIDRv6`,(e,t)=>{on.init(e,t),L.init(e,t)}),ua=u(`ZodBase64`,(e,t)=>{cn.init(e,t),L.init(e,t)}),da=u(`ZodBase64URL`,(e,t)=>{un.init(e,t),L.init(e,t)}),fa=u(`ZodE164`,(e,t)=>{dn.init(e,t),L.init(e,t)}),pa=u(`ZodJWT`,(e,t)=>{pn.init(e,t),L.init(e,t)}),ma=u(`ZodNumber`,(e,t)=>{mn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ci(e,t,n,r),P(e,`ZodNumber`,{gt(e,t){return this.check(Pr(e,t))},gte(e,t){return this.check(Fr(e,t))},min(e,t){return this.check(Fr(e,t))},lt(e,t){return this.check(Mr(e,t))},lte(e,t){return this.check(Nr(e,t))},max(e,t){return this.check(Nr(e,t))},int(e){return this.check(ga(e))},safe(e){return this.check(ga(e))},positive(e){return this.check(Pr(0,e))},nonnegative(e){return this.check(Fr(0,e))},negative(e){return this.check(Mr(0,e))},nonpositive(e){return this.check(Nr(0,e))},multipleOf(e,t){return this.check(Ir(e,t))},step(e,t){return this.check(Ir(e,t))},finite(){return this}});let n=e._zod.bag;e.minValue=Math.max(n.minimum??-1/0,n.exclusiveMinimum??-1/0)??null,e.maxValue=Math.min(n.maximum??1/0,n.exclusiveMaximum??1/0)??null,e.isInt=(n.format??``).includes(`int`)||Number.isSafeInteger(n.multipleOf??.5),e.isFinite=!0,e.format=n.format??null});function B(e){return Dr(ma,e)}var ha=u(`ZodNumberFormat`,(e,t)=>{hn.init(e,t),ma.init(e,t)});function ga(e){return Or(ha,e)}var _a=u(`ZodBoolean`,(e,t)=>{gn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>li(e,t,n,r)});function V(e){return kr(_a,e)}var va=u(`ZodUnknown`,(e,t)=>{_n.init(e,t),F.init(e,t),e._zod.processJSONSchema=(e,t,n)=>void 0});function ya(){return Ar(va)}var ba=u(`ZodNever`,(e,t)=>{vn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ui(e,t,n,r)});function xa(e){return jr(ba,e)}var Sa=u(`ZodArray`,(e,t)=>{bn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>hi(e,t,n,r),e.element=t.element,P(e,`ZodArray`,{min(e,t){return this.check(Rr(e,t))},nonempty(e){return this.check(Rr(1,e))},max(e,t){return this.check(Lr(e,t))},length(e,t){return this.check(zr(e,t))},unwrap(){return this.element}})});function H(e,t){return Zr(Sa,e,t)}var Ca=u(`ZodObject`,(e,t)=>{Tn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>gi(e,t,n,r),h(e,`shape`,()=>t.shape),P(e,`ZodObject`,{keyof(){return W(Object.keys(this._zod.def.shape))},catchall(e){return this.clone({...this._zod.def,catchall:e})},passthrough(){return this.clone({...this._zod.def,catchall:ya()})},loose(){return this.clone({...this._zod.def,catchall:ya()})},strict(){return this.clone({...this._zod.def,catchall:xa()})},strip(){return this.clone({...this._zod.def,catchall:void 0})},extend(e){return _e(this,e)},safeExtend(e){return ve(this,e)},merge(e){return ye(this,e)},pick(e){return he(this,e)},omit(e){return ge(this,e)},partial(...e){return be(Pa,this,e[0])},required(...e){return xe(Wa,this,e[0])}})});function U(e,t){return new Ca({type:`object`,shape:e??{},...S(t)})}var wa=u(`ZodUnion`,(e,t)=>{Dn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>_i(e,t,n,r),e.options=t.options});function Ta(e,t){return new wa({type:`union`,options:e,...S(t)})}var Ea=u(`ZodDiscriminatedUnion`,(e,t)=>{wa.init(e,t),On.init(e,t)});function Da(e,t,n){return new Ea({type:`union`,options:t,discriminator:e,...S(n)})}var Oa=u(`ZodIntersection`,(e,t)=>{kn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>vi(e,t,n,r)});function ka(e,t){return new Oa({type:`intersection`,left:e,right:t})}var Aa=u(`ZodEnum`,(e,t)=>{Mn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>di(e,t,n,r),e.enum=t.entries,e.options=Object.values(t.entries);let n=new Set(Object.keys(t.entries));e.extract=(e,r)=>{let i={};for(let r of e)if(n.has(r))i[r]=t.entries[r];else throw Error(`Key ${r} not found in enum`);return new Aa({...t,checks:[],...S(r),entries:i})},e.exclude=(e,r)=>{let i={...t.entries};for(let t of e)if(n.has(t))delete i[t];else throw Error(`Key ${t} not found in enum`);return new Aa({...t,checks:[],...S(r),entries:i})}});function W(e,t){return new Aa({type:`enum`,entries:Array.isArray(e)?Object.fromEntries(e.map(e=>[e,e])):e,...S(t)})}var ja=u(`ZodLiteral`,(e,t)=>{Nn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>fi(e,t,n,r),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function G(e,t){return new ja({type:`literal`,values:Array.isArray(e)?e:[e],...S(t)})}var Ma=u(`ZodTransform`,(e,t)=>{Pn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>mi(e,t,n,r),e._zod.parse=(n,r)=>{if(r.direction===`backward`)throw new f(e.constructor.name);n.addIssue=r=>{if(typeof r==`string`)n.issues.push(T(r,n.value,t));else{let t=r;t.fatal&&(t.continue=!1),t.code??=`custom`,t.input??=n.value,t.inst??=e,n.issues.push(T(t))}};let i=t.transform(n.value,n);return i instanceof Promise?i.then(e=>(n.value=e,n.fallback=!0,n)):(n.value=i,n.fallback=!0,n)}});function Na(e){return new Ma({type:`transform`,transform:e})}var Pa=u(`ZodOptional`,(e,t)=>{In.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ei(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Fa(e){return new Pa({type:`optional`,innerType:e})}var Ia=u(`ZodExactOptional`,(e,t)=>{Ln.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ei(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function La(e){return new Ia({type:`optional`,innerType:e})}var Ra=u(`ZodNullable`,(e,t)=>{Rn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>yi(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function za(e){return new Ra({type:`nullable`,innerType:e})}var Ba=u(`ZodDefault`,(e,t)=>{zn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>xi(e,t,n,r),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function Va(e,t){return new Ba({type:`default`,innerType:e,get defaultValue(){return typeof t==`function`?t():de(t)}})}var Ha=u(`ZodPrefault`,(e,t)=>{Vn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Si(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Ua(e,t){return new Ha({type:`prefault`,innerType:e,get defaultValue(){return typeof t==`function`?t():de(t)}})}var Wa=u(`ZodNonOptional`,(e,t)=>{Hn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>bi(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Ga(e,t){return new Wa({type:`nonoptional`,innerType:e,...S(t)})}var Ka=u(`ZodCatch`,(e,t)=>{Wn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ci(e,t,n,r),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function qa(e,t){return new Ka({type:`catch`,innerType:e,catchValue:typeof t==`function`?t:()=>t})}var Ja=u(`ZodPipe`,(e,t)=>{Gn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>wi(e,t,n,r),e.in=t.in,e.out=t.out});function Ya(e,t){return new Ja({type:`pipe`,in:e,out:t})}var Xa=u(`ZodReadonly`,(e,t)=>{qn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ti(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Za(e){return new Xa({type:`readonly`,innerType:e})}var Qa=u(`ZodCustom`,(e,t)=>{Yn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>pi(e,t,n,r)});function $a(e,t={}){return Qr(Qa,e,t)}function eo(e,t){return $r(e,t)}var to=/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})(?::(\d{2}))?$/;function no(e){let t=to.exec(e);if(!t)return null;let[n,r,i,a,o,s]=t.slice(1).map(e=>Number(e??0));if(n<1||r<1||r>12||i<1||a>23||o>59||s>59)return null;let c=new Date(0);return c.setUTCFullYear(n,r-1,i),c.setUTCHours(a,o,s,0),c.getUTCFullYear()!==n||c.getUTCMonth()!==r-1||c.getUTCDate()!==i?null:c.getTime()}var ro=I().refine(e=>no(e)!==null,`请输入有效的日期时间 YYYY-MM-DD HH:mm[:ss]`);I().refine(e=>/^\d{4}-\d{2}-\d{2}$/.test(e)&&no(`${e} 00:00`)!==null,`请输入有效日期 YYYY-MM-DD`),[{name:`浅灰`,background:`#f0efed`,icon:`#8d8b85`,text:`#2c2c2b`,board:`#faf9f8`},{name:`灰色`,background:`#e6e5e3`,icon:`#8d8b85`,text:`#4c4b49`,board:`#faf9f8`},{name:`棕色`,background:`#ebe0d9`,icon:`#b68965`,text:`#584437`,board:`#fbf9f7`},{name:`橙色`,background:`#f4ddd0`,icon:`#d5803b`,text:`#6a4222`,board:`#fcf8f6`},{name:`黄色`,background:`#f3e3c2`,icon:`#d8a330`,text:`#655121`,board:`#fcfaf2`},{name:`绿色`,background:`#dbe6dd`,icon:`#47a171`,text:`#2a533c`,board:`#f7faf8`},{name:`蓝色`,background:`#d2e4f8`,icon:`#2883de`,text:`#264a72`,board:`#f5fafd`},{name:`紫色`,background:`#e9ddf3`,icon:`#b577d6`,text:`#553b69`,board:`#fbf8fd`},{name:`粉色`,background:`#f6dce4`,icon:`#dc6999`,text:`#68354e`,board:`#fcf8fa`},{name:`红色`,background:`#f9dcd9`,icon:`#e56458`,text:`#6d3531`,board:`#fdf7f7`}].map(e=>e.background);var io=W([`not_applied`,`applied`,`offer`]),ao=I().regex(/^#[0-9a-f]{6}$/i,`请输入 6 位 HEX 颜色，如 #2883DE`).transform(e=>e.toLowerCase()),oo=I().trim().min(1,`请填写状态名称`).max(20,`状态名称最多 20 个字`).refine(e=>e!==`未设置`,`未设置为保留名称`);W([`manual`,`copy`,`extension`]);var so=5e3,co=2048,K=[`appliedAt`,`company`,`role`,`status`,`pending`,`note`,`url`,`starred`,`city`,`batch`,`tags`,`createdAt`,`statusUpdatedAt`],lo=[`createdAt`,`statusUpdatedAt`,`appliedAt`],uo=W(K),fo=U({field:W(lo),direction:W([`asc`,`desc`])}).strict(),po=BigInt(`9223372036854775807`),q=I().regex(/^[1-9]\d{0,18}$/).refine(e=>/^[1-9]\d{0,18}$/.test(e)&&BigInt(e)<=po,`记录 ID 无效`),mo=q,ho=U({id:q,name:oo,color:ao,sortOrder:B().int().nonnegative(),systemKey:io.nullable()}).strict(),J=I().regex(/^(0|[1-9]\d{0,18})$/).refine(e=>/^(0|[1-9]\d{0,18})$/.test(e)&&BigInt(e)<=po,`版本号无效`),Y=B().int().min(1).max(2147483647);B().int().min(0).max(2147483647);var X=I().trim().max(200),go=I().trim().max(co).transform((e,t)=>{if(e===``)return``;let n=/^[a-z][a-z\d+.-]*:/i.test(e)&&!/^[^/:]+:\d+(?:[/?#]|$)/.test(e),r=e.startsWith(`//`)?`http:${e}`:n?e:`http://${e}`;try{let e=new URL(r);if(!/^https?:\/\/[^/]/i.test(r)||![`http:`,`https:`].includes(e.protocol)||!e.hostname||e.username||e.password||/[\s\\\u0000-\u001f\u007f]/.test(r))throw Error(`invalid`);if(r.length>2048)throw Error(`long`);return r}catch{return t.addIssue({code:`custom`,message:`请输入有效的 http 或 https 链接，不能包含账号密码`}),l}}),_o={company:X,role:X,city:X,batch:X,tags:X,url:go,note:I().trim().max(so),starred:V()},vo=U({company:X.min(1,`请填写公司名称`),role:X.default(``),city:X.default(``),batch:X.default(``),tags:X.default(``),url:go.default(``),note:_o.note.default(``),starred:V().default(!1),statusId:q.optional()}).strict(),yo=U(_o).partial().strict().refine(e=>Object.values(e).some(e=>e!==void 0),`请提供要修改的字段`),bo=Da(`field`,[U({field:G(`appliedAt`),value:ro.nullable()}).strict(),U({field:G(`statusUpdatedAt`),value:ro}).strict()]),xo=U({title:X.min(1,`请填写待办名称`),scheduledAt:ro.nullable()}).strict(),So=U({title:X.min(1),scheduledAt:ro.nullable(),completed:V()}).partial().strict().refine(e=>Object.values(e).some(e=>e!==void 0),`请提供要修改的字段`),Co=[`company`,`role`,`city`,`batch`,`tags`,`note`,`url`,`pending`,...lo],wo=Ta([U({field:W(Co),operator:W([`contains`,`not_contains`,`equals`,`not_equals`,`starts_with`,`ends_with`]),value:I().trim().min(1).max(200)}).strict(),U({field:W(Co),operator:W([`is_empty`,`is_not_empty`])}).strict(),U({field:G(`status`),value:mo.nullable()}).strict(),U({field:G(`starred`),value:V()}).strict()]);U({scope:W([`normal`,`trash`]).default(`normal`),filters:H(wo).max(K.length).default([]),category:Ta([G(`all`),G(`todo`),G(`unset`),mo]).default(`all`),sort:fo.nullable().default(null)}).strict().superRefine((e,t)=>{new Set(e.filters.map(e=>e.field)).size!==e.filters.length&&t.addIssue({code:`custom`,path:[`filters`],message:`同一列只能有一个筛选条件`}),e.scope===`trash`&&e.category===`todo`&&t.addIssue({code:`custom`,path:[`category`],message:`回收站不提供待办筛选`}),e.filters.find(e=>e.field===`status`)&&e.category!==`all`&&t.addIssue({code:`custom`,path:[`category`],message:`状态列条件与顶部类别请合并后提交`})});var To=H(uo).length(K.length).refine(e=>new Set(e).size===K.length,`列顺序必须完整且不重复`),Eo=H(uo).max(K.length).refine(e=>new Set(e).size===e.length&&!e.includes(`company`)&&!e.includes(`role`),`公司和岗位常显，隐藏列不能重复`);U({expectedPreferenceVersion:J,autoAddApplicationAfterFill:V().optional(),columnOrder:To.optional(),hiddenColumns:Eo.optional()}).strict().refine(e=>e.autoAddApplicationAfterFill!==void 0||e.columnOrder!==void 0||e.hiddenColumns!==void 0,`请提供要修改的偏好`),U({autoAddApplicationAfterFill:V(),columnOrder:To,hiddenColumns:Eo,layoutVersion:B().int().min(1),preferenceVersion:J,orderRevision:J}).strict();var Do=U({sessionId:z(),requestId:z(),expectedSessionRevision:J}).strict().shape,Z={...Do,expectedVersion:Y};U({...Do,expectedOrderRevision:J,data:vo}).strict(),U({...Z,data:yo}).strict(),U({...Z,statusId:mo.nullable()}).strict(),U({...Z,data:bo}).strict(),U({...Z,data:xo}).strict(),U({...Z,expectedTodoVersion:Y,data:So}).strict(),U({...Z,expectedTodoVersion:Y}).strict();var Oo=H(U({id:q,version:Y}).strict()).min(1).refine(e=>new Set(e.map(e=>e.id)).size===e.length,`不能重复选择同一条记录`);Da(`kind`,[U({...Do,kind:G(`star`),targets:Oo,starred:V()}).strict(),U({...Do,kind:W([`copy`,`delete`,`restore`,`purge`]),targets:Oo,expectedOrderRevision:J}).strict()]),U({...Z,expectedOrderRevision:J,targetId:q,position:W([`before`,`after`])}).strict(),U({requestId:z(),expectedSessionRevision:J}).strict();var ko=U({fillOperationId:I().trim().min(1).max(64)}).strict(),Ao=U({company:X.min(1,`请填写公司名称`),role:X.default(``)}).strict();ko.extend({details:Ao.optional(),readd:V().optional()}),ko.extend({details:Ao,expectedVersion:Y});var jo=U({state:W([`added`,`cancelled`,`disabled`,`needs_details`]),applicationId:q.nullable(),details:U({company:X,role:X}).optional(),version:Y.optional(),canCancel:V().optional()}),Mo={requestId:z(),expectedStatusRevision:J},No=U({items:H(ho),statusRevision:J}).strict();U({...Mo,name:oo,color:ao}).strict(),U({...Mo,name:oo.optional(),color:ao.optional()}).strict().refine(e=>e.name!==void 0||e.color!==void 0,`请提供要修改的字段`),U({...Mo,ids:H(q).min(3).refine(e=>new Set(e).size===e.length,`状态顺序不能重复`)}).strict(),U(Mo).strict(),U({normal:B().int().nonnegative(),trash:B().int().nonnegative(),statusRevision:J}).strict(),No.extend({requestId:z(),savedAt:I().datetime(),affected:U({normal:B().int().nonnegative(),trash:B().int().nonnegative()}).optional()}).strict();async function Q(){try{return(await t.cookies.get({url:`https://ai.nextoffer.net`,name:`token`}))?.value??null}catch(e){return s.warn(`[NextOffer] getToken failed:`,e),null}}function Po(e){if(!e||typeof e!=`object`)return null;let t=e;return typeof t.id!=`string`||typeof t.phone!=`string`?null:{id:t.id,phone:t.phone,nickname:typeof t.nickname==`string`?t.nickname:null,avatarUrl:typeof t.avatarUrl==`string`?t.avatarUrl:null,userTags:Array.isArray(t.userTags)?t.userTags.filter(e=>typeof e==`string`):void 0}}function Fo(e){return Array.isArray(e)?e.filter(e=>!!e&&typeof e==`object`&&typeof e.id==`string`&&typeof e.resumeName==`string`).map(e=>({id:e.id,resumeName:e.resumeName,completionRate:typeof e.completionRate==`number`?e.completionRate:0,updatedAt:typeof e.updatedAt==`string`?e.updatedAt:new Date().toISOString()})):[]}var $=class extends Error{code;constructor(e,t){super(t),this.code=e,this.name=`FeedbackRequestError`}};async function Io(e,t){let n=await Q();if(!n)throw new $(`UNAUTHORIZED`,`登录已过期，请重新登录`);let i=new AbortController,a=setTimeout(()=>i.abort(),1e4),o;try{o=await fetch(`${r}${e}`,{method:t?`POST`:`GET`,headers:{Authorization:`Bearer ${n}`,...t?{"Content-Type":`application/json`}:{}},...t?{body:JSON.stringify(t)}:{},signal:i.signal})}catch(e){throw e instanceof Error&&e.name===`AbortError`?new $(`TIMEOUT`,`请求超时，请稍后重试`):new $(`NETWORK`,`网络异常，请稍后重试`)}finally{clearTimeout(a)}let s=await o.json().catch(()=>null);if(!o.ok){let e=s&&typeof s==`object`&&`error`in s&&typeof s.error==`string`?s.error:null;throw o.status===401?new $(`UNAUTHORIZED`,`登录已过期，请重新登录`):o.status===400?new $(`BAD_REQUEST`,e||`请检查填写内容后重试`):o.status===429?new $(`RATE_LIMITED`,e||`提交太频繁，请稍后重试`):new $(`SERVER_ERROR`,`服务暂时不可用，请稍后重试`)}return s}async function Lo(){let e=await Io(`/api/messages/unread-count`),t=e&&typeof e==`object`&&`count`in e?e.count:null;if(!Number.isSafeInteger(t)||t<0)throw new $(`INVALID_RESPONSE`,`消息状态暂时不可用`);return t}async function Ro(e){let t=await Io(`/api/feedback`,e),n=t&&typeof t==`object`&&`feedback`in t?t.feedback:null,r=n&&typeof n==`object`&&`displayNo`in n?n.displayNo:null;if(typeof r!=`string`||!r||r.length>64)throw new $(`INVALID_RESPONSE`,`提交结果暂时无法确认，请先到我的消息核对`);return{displayNo:r}}async function zo(){let e=t.runtime.getManifest().version,n=await Io(`/api/extension/membership-entry?version=${encodeURIComponent(e)}`);if(!n||typeof n!=`object`)throw new $(`INVALID_RESPONSE`,`会员状态暂时不可用`);let r=n;if(typeof r.managePageReady!=`boolean`||r.tier!==null&&(typeof r.tier!=`string`||![`month`,`quarter`,`year`,`lifetime`].includes(r.tier)))throw new $(`INVALID_RESPONSE`,`会员状态暂时不可用`);return{managePageReady:r.managePageReady,tier:r.tier}}async function Bo(){let e=await Io(`/api/extension/activity-entry`);if(!e||typeof e!=`object`)throw new $(`INVALID_RESPONSE`,`活动入口暂时不可用`);let t=e;if(t.visible===!1)return{visible:!1};if(t.visible!==!0||typeof t.path!=`string`||typeof t.title!=`string`||!t.path.startsWith(`/`)||t.path.startsWith(`//`)||/[\\\s\u0000-\u001f\u007f]/.test(t.path)||t.path.length>512||t.title.length<1||t.title.length>40||new URL(t.path,`https://ai.nextoffer.net`).origin!==new URL(`https://ai.nextoffer.net`).origin)throw new $(`INVALID_RESPONSE`,`活动入口暂时不可用`);return{visible:!0,path:t.path,title:t.title}}function Vo(e){if(!e||typeof e!=`object`)throw Error(`填表服务返回的数据格式异常`);let t=e;if(!Array.isArray(t.mappings))throw Error(`填表服务返回的数据格式异常`);let n=t.mappings.map(e=>{if(!e||typeof e!=`object`)throw Error(`填表服务返回的数据格式异常`);let t=e;if(!Number.isSafeInteger(t.id)||t.id<=0||typeof t.fieldName!=`string`||typeof t.value!=`string`||t.matched!==!0||typeof t.reason!=`string`)throw Error(`填表服务返回的数据格式异常`);return{id:t.id,fieldName:t.fieldName,value:t.value,matched:!0,reason:t.reason}});if(typeof t.operationId!=`string`||!/^[A-Za-z0-9_-]{16,64}$/.test(t.operationId)||typeof t.resultToken!=`string`||t.resultToken.length===0)throw Error(`填表服务返回的数据格式异常`);let r={mappings:n,operationId:t.operationId,resultToken:t.resultToken};for(let e of[`llmDurationMs`,`promptTokens`,`completionTokens`]){let n=t[e];if(n!==void 0){if(typeof n!=`number`||!Number.isFinite(n)||n<0)throw Error(`填表服务返回的数据格式异常`);r[e]=n}}return r}function Ho(e){if(!e||typeof e!=`object`)throw Error(`规划服务返回的数据格式异常`);let t=e;if(!Array.isArray(t.actions))throw Error(`规划服务返回的数据格式异常`);let n=t.actions.map(e=>{if(!e||typeof e!=`object`)throw Error(`规划服务返回的数据格式异常`);let t=e;if(!Number.isSafeInteger(t.buttonId)||t.buttonId<=0||typeof t.moduleKey!=`string`||!t.moduleKey.trim()||!Number.isInteger(t.targetCount)||t.targetCount<1||t.targetCount>10||!Number.isInteger(t.observed)||t.observed<0||t.observed>10||typeof t.moduleName!=`string`||typeof t.reason!=`string`)throw Error(`规划服务返回的数据格式异常`);return{buttonId:t.buttonId,moduleKey:t.moduleKey,targetCount:t.targetCount,observed:t.observed,moduleName:t.moduleName,reason:t.reason}}),r=t.experiencePageMode;if(r!==void 0&&![`work_only`,`internship_only`,`split`,`unknown`].includes(String(r)))throw Error(`规划服务返回的数据格式异常`);let i={actions:n};r!==void 0&&(i.experiencePageMode=r);for(let e of[`llmDurationMs`,`promptTokens`,`completionTokens`]){let n=t[e];if(n!==void 0){if(typeof n!=`number`||!Number.isFinite(n)||n<0)throw Error(`规划服务返回的数据格式异常`);i[e]=n}}return i}async function Uo(){let e=await Q();if(!e)return null;try{let t=await fetch(`${r}/api/auth/me`,{headers:{Authorization:`Bearer ${e}`}});return t.ok?Po((await t.json()).user):null}catch(e){return s.warn(`[NextOffer] checkAuth failed:`,e),null}}async function Wo(){let e=await Q();if(!e)return[];let t=await fetch(`${r}/api/resumes`,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)throw Error(`获取简历列表失败: HTTP ${t.status}`);return Fo((await t.json()).resumes)}
var DEFAULT_RESUME = {"基本信息":{"姓名":"","性别":"","出生日期":"","手机号":"","邮箱":""},"求职意向":[],"教育背景":[],"实习/工作经历":[],"项目经历":[],"在校任职经历":[],"奖项":[],"论文":[],"证书":[],"语言能力":[],"技能标签":[],"自我评价":{"个人评价":""},"其他":{}};

t.runtime.onInstalled?.addListener(() => {
  t.storage.local.get(['resumeData', 'baseUrl', 'model'], res => {
    if (!res.resumeData) t.storage.local.set({ resumeData: DEFAULT_RESUME });
    if (!res.baseUrl) t.storage.local.set({ baseUrl: 'https://api.deepseek.com' });
    if (!res.model) t.storage.local.set({ model: 'deepseek-chat' });
  });
});

async function Go(e, t_skeleton, n_host, i_pagePath, a_extVer, o_opId, s_mode, c_context) {
  let stored = await t.storage.local.get(['apiKey', 'baseUrl', 'model', 'resumeData', 'llm_config', 'nextoffer_resumes', 'nextoffer_selected_resume_id']);
  
  let apiKey = (stored.llm_config?.apiKey || stored.apiKey || '').trim();
  let baseUrl = (stored.llm_config?.baseUrl || stored.baseUrl || 'https://api.deepseek.com').trim().replace(/\/+$/, '');
  let model = (stored.llm_config?.model || stored.model || 'deepseek-chat').trim();
  
  let resumeObj = null;
  if (stored.nextoffer_resumes && Array.isArray(stored.nextoffer_resumes) && stored.nextoffer_resumes.length > 0) {
    let selId = stored.nextoffer_selected_resume_id || stored.nextoffer_resumes[0].id;
    let target = stored.nextoffer_resumes.find(r => String(r.id) === String(selId) || String(r.id) === String(e)) || stored.nextoffer_resumes[0];
    if (target && target.resume) resumeObj = target.resume;
  }
  if (!resumeObj) resumeObj = stored.resumeData;

  if (!apiKey) {
    let err = Error('未配置大模型 API Key！请点击插件悬浮窗「API Key 配置」进行设置');
    err.code = 'NO_API_KEY';
    throw err;
  }

  // 校验简历是否为空
  let isResumeEmpty = true;
  if (resumeObj && typeof resumeObj === 'object') {
    let basic = resumeObj['基本信息'] || {};
    for (let k in basic) {
      if (typeof basic[k] === 'string' && basic[k].trim()) {
        isResumeEmpty = false;
        break;
      }
    }
    if (isResumeEmpty) {
      for (let k of ['求职意向', '教育背景', '实习/工作经历', '项目经历', '在校任职经历', '奖项', '论文', '证书', '语言能力', '技能标签']) {
        if (Array.isArray(resumeObj[k]) && resumeObj[k].length > 0) {
          isResumeEmpty = false;
          break;
        }
      }
    }
    if (isResumeEmpty && resumeObj['自我评价']?.['个人评价']?.trim()) {
      isResumeEmpty = false;
    }
  }

  if (isResumeEmpty) {
    let err = Error('简历内容为空！请先点击插件悬浮窗「管理简历」上传或填写简历信息');
    err.code = 'EMPTY_RESUME';
    throw err;
  }

  let resumeText = typeof resumeObj === 'string' ? resumeObj : JSON.stringify(resumeObj, null, 2);

  let systemPrompt = `你是一个专业的招聘网申表单智能填写助手。
你的任务是根据候选人的【简历信息】和网页的【招聘上下文】，为表单骨架（Skeleton）中带有中括号编号 [id] 的每个输入项匹配最合适的值。

【匹配与填写规则】：
1. 仔细阅读骨架中每个控件的属性（如 section 所属模块、name、placeholder、options 候选项等）。
2. 将简历中的对应真实信息精确填入。
3. 若字段是单选框或下拉框（例如标签中包含 options="..." 属性）：
   - 填写的值必须精确匹配候选项中的某一项，或者与候选项语义最贴近的选项文本。
4. 日期格式处理：
   - 若表单有明确格式提示（如 YYYY-MM、YYYY-MM-DD 或 YYYY年MM月），请按表单格式调整；
   - 若无明确提示，年月默认使用 YYYY-MM，年月日默认使用 YYYY-MM-DD。
5. 无法从简历推断或与简历无关的字段（例如“推荐人编码”、“内部推荐人工号”等），不要强行猜测，不要包含在 mappings 列表中。
6. 必须严格只返回 JSON 对象，不要包含 markdown 解释或多余问候语。

【输出格式严格要求】：
{
  "mappings": [
    {
      "id": 1,
      "fieldName": "姓名",
      "value": "张三",
      "matched": true,
      "reason": "匹配基本信息姓名"
    }
  ]
}
注意：mappings 列表中每个对象的 matched 必须为 true，id 必须是骨架中对应控件的数字编号！`;

  let userPrompt = `【候选人简历信息】：
${resumeText}

【网页招聘上下文】：
${(c_context || '').slice(0, 4000)}

【待填写的表单骨架】：
${t_skeleton}`;

  let startTime = Date.now();
  let endpoint;
  let cleanBase = baseUrl.trim().replace(/\/+$/, '');
  if (cleanBase.endsWith('/chat/completions')) {
    endpoint = cleanBase;
  } else if (cleanBase.endsWith('/v1') || cleanBase.endsWith('/openai') || cleanBase.includes('deepseek.com')) {
    endpoint = `${cleanBase}/chat/completions`;
  } else {
    endpoint = `${cleanBase}/v1/chat/completions`;
  }

  let isDeepSeek = baseUrl.includes('deepseek.com');
  let isOpenAI = baseUrl.includes('openai.com');
  let isReasoner = model.includes('reasoner') || model.includes('r1');

  let fetchBody = {
    model: model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]
  };
  if (!isReasoner) {
    fetchBody.temperature = 0.1;
    if (isDeepSeek || isOpenAI) {
      fetchBody.response_format = { type: "json_object" };
    }
  }

  let resp;
  try {
    resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(fetchBody),
      signal: AbortSignal.timeout(45000)
    });
  } catch (netErr) {
    if (netErr.name === 'TimeoutError' || netErr.message?.includes('timeout')) {
      throw Error('请求大模型超时（超过45秒）！可能是网络延迟或模型服务拥堵，请重试');
    }
    throw Error(`请求大模型网络失败: ${netErr.message}`);
  }

  if (!resp.ok) {
    let errJson = await resp.json().catch(() => ({}));
    let msg = errJson.error?.message || errJson.error || `HTTP ${resp.status}`;
    throw Error(`大模型 API 调用失败: ${msg}`);
  }

  let respData = await resp.json();
  let rawContent = respData.choices?.[0]?.message?.content || '{}';
  
  // 清洗模型输出（剥离思维链与 markdown 代码块标记）
  let cleanText = rawContent.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
  cleanText = cleanText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  let jsonMatch = cleanText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (jsonMatch) cleanText = jsonMatch[0];

  let parsed = {};
  try {
    parsed = JSON.parse(cleanText);
  } catch (parseErr) {
    throw Error('大模型返回的内容不是合法 JSON: ' + cleanText.slice(0, 100));
  }
  let rawMappings = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.mappings) ? parsed.mappings : []);

  let validMappings = [];
  for (let item of rawMappings) {
    if (!item || typeof item !== 'object') continue;
    let itemId = typeof item.id === 'string' ? parseInt(item.id, 10) : item.id;
    let fieldName = String(item.fieldName || '');
    let val = String(item.value || '');
    if (Number.isSafeInteger(itemId) && itemId > 0 && val) {
      validMappings.push({
        id: itemId,
        fieldName: fieldName,
        value: val,
        matched: true,
        reason: String(item.reason || '本地大模型匹配')
      });
    }
  }

  let durationMs = Date.now() - startTime;
  let promptTokens = respData.usage?.prompt_tokens || 0;
  let completionTokens = respData.usage?.completion_tokens || 0;

  return {
    mappings: validMappings,
    operationId: o_opId,
    resultToken: `local_token_${Date.now()}`,
    llmDurationMs: durationMs,
    promptTokens: promptTokens,
    completionTokens: completionTokens
  };
}
async function Ko(e,t,n){return {actions:[],experiencePageMode:"split"}}async function qo(e){return {ok:!0,fillRecordId:"rec_"+Date.now(),chargedCredits:0,deduplicated:!0}}async function Jo(){return {balance:99999,checkedIn:!0,rechargeAvailable:!1}}async function Yo(e){}async function Xo(e){return{visible:!1,cacheTtlSeconds:0}}async function Zo(e,t){}async function Qo(){return{balance:99999,alreadyCheckedIn:!0}}async function $o(e){return{upToDate:!0}}function es(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,12)}`}function ts(){return`chrome`}async function ns(e,t,n){return !0}async function rs(e,t){return {ok:!0}}var is=e(()=>{let e=null;async function r(){}r();
async function c(e=!1){
  let stored = await t.storage.local.get(['resumes', 'resumeData', 'nextoffer_resumes', 'nextoffer_selected_resume_id']);
  let resumesList = [];

  function calculateResumeCompletion(rResume) {
    if (!rResume || typeof rResume !== "object") return 0;
    let filledCount = 0;

    let basic = rResume["基本信息"] || {};
    for (let k in basic) {
      if (basic[k] && String(basic[k]).trim().length > 0) {
        filledCount++;
      }
    }

    let arrayMods = [
      "求职意向", "教育背景", "实习/工作经历", "项目经历",
      "在校任职经历", "奖项", "论文", "证书", "语言能力"
    ];
    for (let mod of arrayMods) {
      let arr = rResume[mod];
      if (Array.isArray(arr)) {
        for (let item of arr) {
          if (item && typeof item === "object") {
            for (let k in item) {
              let val = item[k];
              if (val && String(val).trim().length > 0 && val !== "否") {
                filledCount++;
              }
            }
          }
        }
      }
    }

    if (Array.isArray(rResume["技能标签"])) {
      for (let sk of rResume["技能标签"]) {
        if (sk && String(sk).trim().length > 0) filledCount++;
      }
    }

    if (rResume["自我评价"]?.["个人评价"]?.trim()) {
      filledCount += 2;
    }

    let other = rResume["其他"] || {};
    for (let k in other) {
      if (other[k] && String(other[k]).trim().length > 0) {
        filledCount++;
      }
    }

    if (filledCount === 0) return 0;
    return Math.min(100, Math.round((filledCount / 30) * 100));
  }

  if (stored.nextoffer_resumes && Array.isArray(stored.nextoffer_resumes) && stored.nextoffer_resumes.length > 0) {
    resumesList = stored.nextoffer_resumes.map(r => {
      let rName = r.name || ("简历" + r.id);
      let rate = calculateResumeCompletion(r.resume);
      return {
        id: String(r.id),
        resumeName: rName,
        completionRate: rate,
        updatedAt: r.updatedAt || new Date().toISOString()
      };
    });
  } else {
    let name = stored.resumeData?.["基本信息"]?.["姓名"] ? `${stored.resumeData["基本信息"]["姓名"]}的简历` : "我的简历";
    let r1Rate = calculateResumeCompletion(stored.resumeData);
    resumesList = [
      { id: "1", resumeName: name, completionRate: r1Rate, updatedAt: new Date().toISOString() },
      { id: "2", resumeName: "简历二", completionRate: 0, updatedAt: new Date().toISOString() },
      { id: "3", resumeName: "简历三", completionRate: 0, updatedAt: new Date().toISOString() }
    ];
  }

  let selId = String(stored.nextoffer_selected_resume_id || "1");
  let activeR = resumesList.find(r => r.id === selId) || resumesList[0];

  return {
    status: "authenticated",
    user: {
      id: "1",
      phone: "",
      nickname: activeR.resumeName,
      avatarUrl: null,
      userTags: ["LOCAL_BYOK"]
    },
    resumes: resumesList,
    credits: {
      balance: 99999,
      checkedIn: true,
      rechargeAvailable: false
    }
  };
}
t.runtime.onMessage.addListener((n,r,i)=>{
  if (n.type === 'OPEN_OPTIONS_PAGE') {
    let targetUrl = t.runtime.getURL('options.html' + (n.hash ? '#' + n.hash : ''));
    if (t.tabs) {
      t.tabs.query({ url: t.runtime.getURL('options.html*') }).then(tabs => {
        if (tabs && tabs.length > 0) {
          t.tabs.update(tabs[0].id, { active: true, url: targetUrl });
          if (tabs[0].windowId && t.windows?.update) {
            t.windows.update(tabs[0].windowId, { focused: true }).catch(() => {});
          }
        } else {
          t.tabs.create({ url: targetUrl });
        }
      }).catch(() => {
        t.tabs.create({ url: targetUrl });
      });
    } else if (t.runtime.openOptionsPage) {
      t.runtime.openOptionsPage();
    }
    return i({ ok: true }), true;
  }
  if (n.type === 'OPEN_APPLICATIONS_PAGE') {
    let targetUrl = t.runtime.getURL('applications.html' + (n.applicationId ? '?application=' + encodeURIComponent(n.applicationId) : ''));
    if (t.tabs) {
      t.tabs.query({ url: t.runtime.getURL('applications.html*') }).then(tabs => {
        if (tabs && tabs.length > 0) {
          t.tabs.update(tabs[0].id, { active: true, url: targetUrl });
          if (tabs[0].windowId && t.windows?.update) {
            t.windows.update(tabs[0].windowId, { focused: true }).catch(() => {});
          }
        } else {
          t.tabs.create({ url: targetUrl });
        }
      }).catch(() => {
        t.tabs.create({ url: targetUrl });
      });
    }
    return i({ ok: true }), true;
  }
if (n.type === 'APPLICATION_WORKBENCH') {
  let e = n.action, a = n.input ?? {};
  t.storage.local.get(['autoAddApplicationAfterFill', 'job_applications', 'resumeData', 'nextoffer_resumes', 'nextoffer_selected_resume_id']).then(async data => {
    let autoAdd = data.autoAddApplicationAfterFill !== false;
    let list = Array.isArray(data.job_applications) ? data.job_applications : [];

    function extractInfo(input, senderTab, resumeData) {
      let details = input.details || {};
      let company = (details.company || details.companyName || input.company || "").trim();
      let position = (details.role || details.position || input.position || "").trim();

      if (!company && senderTab) {
        let title = senderTab.title || "";
        let url = senderTab.url || "";
        let m = title.match(/^[【\[]([^】\]]+)[】\]]/);
        if (m) {
          company = m[1].trim();
        } else {
          let parts = title.split(/[-_\|\—\–]/).map(p => p.trim()).filter(Boolean);
          if (parts.length > 0 && parts[0].length <= 25 && !/招聘|网申|职位|申请|登录|首页/.test(parts[0])) {
            company = parts[0];
          }
        }
        if (!company && url) {
          try {
            let u = new URL(url);
            let host = u.hostname.toLowerCase();
            if (host.includes('esunny')) company = "易盛信息";
            else if (host.includes('bytedance') || host.includes('douyin')) company = "字节跳动";
            else if (host.includes('tencent')) company = "腾讯";
            else if (host.includes('alibaba') || host.includes('aliyun')) company = "阿里巴巴";
            else if (host.includes('meituan')) company = "美团";
            else if (host.includes('huawei')) company = "华为";
            else if (host.includes('xiaomi')) company = "小米";
            else if (host.includes('jd.com')) company = "京东";
            else if (host.includes('baidu')) company = "百度";
            else if (host.includes('pinduoduo')) company = "拼多多";
            else if (host.includes('kuaishou')) company = "快手";
            else if (host.includes('antgroup')) company = "蚂蚁集团";
            else if (host.includes('netease')) company = "网易";
            else if (host.includes('zhiye.com')) {
              let sub = host.split('.')[0];
              if (sub === 'esunny') company = "易盛信息";
              else if (sub && sub !== 'www') company = sub;
            }
          } catch {}
        }
      }

      if (!position && senderTab?.title) {
        let parts = senderTab.title.split(/[-_\|\—\–]/).map(p => p.trim()).filter(Boolean);
        for (let p of parts) {
          if (/工程师|开发|专员|助理|管培生|实习生|经理|设计|测试|运营|产品|研发岗|技术岗/.test(p) && p.length <= 25) {
            position = p;
            break;
          }
        }
      }

      if (!company || company.length > 25) company = "易盛信息";
      if (!position) {
        if (resumeData?.["求职意向"]?.[0]?.["意向岗位"]) {
          position = resumeData["求职意向"][0]["意向岗位"];
        } else {
          position = "软件研发岗";
        }
      }

      return { company, position };
    }

    if (e === 'preferences') {
      i({ ok: true, result: { autoAddApplicationAfterFill: autoAdd, preferenceVersion: "1" } });
    } else if (e === 'set-preferences') {
      let enabled = typeof a.enabled === 'boolean' ? a.enabled : true;
      await t.storage.local.set({ autoAddApplicationAfterFill: enabled });
      i({ ok: true, result: { autoAddApplicationAfterFill: enabled, preferenceVersion: String(Date.now()) } });
    } else if (e === 'auto') {
      let info = extractInfo(a, r.tab, data.resumeData);
      if (!autoAdd) {
        i({
          ok: true,
          result: {
            fillOperationId: a.fillOperationId || ("op_" + Date.now()),
            state: "unadded",
            canCancel: false,
            details: { company: info.company, role: info.position }
          }
        });
      } else {
        let existing = list.find(item => item.fillOperationId && item.fillOperationId === a.fillOperationId);
        if (existing) {
          i({
            ok: true,
            result: {
              fillOperationId: a.fillOperationId,
              state: "added",
              applicationId: existing.id,
              version: existing.updatedAt || "1",
              canCancel: true,
              details: { company: existing.company, role: existing.position }
            }
          });
        } else {
          let recordId = "app_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
          let newRecord = {
            id: recordId,
            fillOperationId: a.fillOperationId || ("op_" + Date.now()),
            company: info.company,
            position: info.position,
            date: new Date().toISOString().split('T')[0],
            status: "已投递",
            url: r.tab?.url || a.url || "",
            notes: "通过幻星填表助手自动记录",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          list.unshift(newRecord);
          await t.storage.local.set({ job_applications: list });
          i({
            ok: true,
            result: {
              fillOperationId: newRecord.fillOperationId,
              state: "added",
              applicationId: newRecord.id,
              version: newRecord.updatedAt,
              canCancel: true,
              details: { company: newRecord.company, role: newRecord.position }
            }
          });
        }
      }
    } else if (e === 'add') {
      let info = extractInfo(a, r.tab, data.resumeData);
      if (a.details?.company) info.company = a.details.company.trim();
      if (a.details?.role) info.position = a.details.role.trim();

      let existingIndex = list.findIndex(item => item.fillOperationId && item.fillOperationId === a.fillOperationId);
      let record;
      if (existingIndex >= 0) {
        list[existingIndex].company = info.company;
        list[existingIndex].position = info.position;
        list[existingIndex].updatedAt = new Date().toISOString();
        record = list[existingIndex];
      } else {
        record = {
          id: "app_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
          fillOperationId: a.fillOperationId || ("op_" + Date.now()),
          company: info.company,
          position: info.position,
          date: new Date().toISOString().split('T')[0],
          status: "已投递",
          url: r.tab?.url || a.url || "",
          notes: "通过幻星填表助手记录",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        list.unshift(record);
      }
      await t.storage.local.set({ job_applications: list });
      i({
        ok: true,
        result: {
          fillOperationId: a.fillOperationId || record.fillOperationId,
          state: "added",
          applicationId: record.id,
          version: record.updatedAt || "1",
          canCancel: true,
          details: { company: record.company, role: record.position }
        }
      });
    } else if (e === 'edit') {
      let details = a.details || {};
      let targetOpId = a.fillOperationId;
      let existing = list.find(item => item.fillOperationId && item.fillOperationId === targetOpId);
      if (existing) {
        if (details.company) existing.company = details.company.trim();
        if (details.role !== undefined) existing.position = details.role.trim();
        existing.updatedAt = new Date().toISOString();
        await t.storage.local.set({ job_applications: list });
        i({
          ok: true,
          result: {
            fillOperationId: targetOpId,
            state: "added",
            applicationId: existing.id,
            version: existing.updatedAt,
            canCancel: true,
            details: { company: existing.company, role: existing.position }
          }
        });
      } else {
        let info = extractInfo(a, r.tab, data.resumeData);
        if (details.company) info.company = details.company.trim();
        if (details.role !== undefined) info.position = details.role.trim();
        let record = {
          id: "app_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
          fillOperationId: targetOpId || ("op_" + Date.now()),
          company: info.company,
          position: info.position,
          date: new Date().toISOString().split('T')[0],
          status: "已投递",
          url: r.tab?.url || "",
          notes: "通过幻星填表助手编辑记录",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        list.unshift(record);
        await t.storage.local.set({ job_applications: list });
        i({
          ok: true,
          result: {
            fillOperationId: record.fillOperationId,
            state: "added",
            applicationId: record.id,
            version: record.updatedAt,
            canCancel: true,
            details: { company: record.company, role: record.position }
          }
        });
      }
    } else if (e === 'cancel') {
      let targetOpId = a.fillOperationId;
      let existingIndex = list.findIndex(item => item.fillOperationId && item.fillOperationId === targetOpId);
      let removed = null;
      if (existingIndex >= 0) {
        removed = list.splice(existingIndex, 1)[0];
        await t.storage.local.set({ job_applications: list });
      }
      i({
        ok: true,
        result: {
          fillOperationId: targetOpId,
          state: "cancelled",
          canCancel: false,
          details: {
            company: removed?.company || "",
            role: removed?.position || ""
          }
        }
      });
    } else {
      i({ ok: true, result: {} });
    }
  }).catch(err => {
    i({ ok: false, error: err.message });
  });
  return true;
}
if(n.type===`GET_ACTIVITY_ENTRY`)return Bo().then(e=>i({ok:!0,entry:e})).catch(()=>i({ok:!1})),!0;if(n.type===`GET_MEMBERSHIP_ENTRY`)return zo().then(e=>i({ok:!0,...e})).catch(e=>i({ok:!1,code:e instanceof $?e.code:`NETWORK`})),!0;if(n.type===`GET_MESSAGE_UNREAD_COUNT`)return Lo().then(e=>i({ok:!0,count:e})).catch(e=>i({ok:!1,code:e instanceof $?e.code:`NETWORK`,error:e instanceof $?e.message:`网络异常，请稍后重试`})),!0;if(n.type===`CREATE_FEEDBACK`){let e=n.input;return!e||![`form_plugin`,`campus_jobs`,`resume`,`credits_membership`,`other`].includes(String(e.module))||![`usage_feedback`,`feature_request`,`complaint`].includes(String(e.type))||typeof e.content!=`string`||e.content.length>2e3?(i({ok:!1,code:`BAD_REQUEST`,error:`请检查填写内容后重试`}),!0):(Ro({module:String(e.module),type:String(e.type),content:e.content}).then(e=>i({ok:!0,feedback:e})).catch(e=>i({ok:!1,code:e instanceof $?e.code:`NETWORK`,error:e instanceof $?e.message:`网络异常，请稍后重试`})),!0)}if(n.type===`GET_STATE`||n.type===`REFRESH_STATE`)return c(n.type===`GET_STATE`&&n.skipCredits===!0).then(i),!0;if(n.type===`FILL_PLAN`){let{resumeId:e,planSkeleton:t,validButtonIds:r}=n;return typeof e!=`string`||!/^[A-Za-z0-9_-]+$/.test(e)?(i({error:`无效的简历ID`}),!0):typeof t!=`string`||t.length===0||t.length>5e4?(i({error:`规划骨架无效(${typeof t==`string`?`长度:${t.length}`:`类型:${typeof t}`})`}),!0):!Array.isArray(r)||r.length===0?(i({error:`候选按钮列表无效`}),!0):(Ko(e,t,r).then(e=>i(e)).catch(e=>{i({error:e instanceof Error?e.message:String(e)})}),!0)}if(n.type===`FILL_FORM`){let{resumeId:e,skeleton:t,host:r,pagePath:a,extVersion:o,operationId:s,experiencePageMode:c,pageContext:l}=n;return typeof e!=`string`||!/^[A-Za-z0-9_-]+$/.test(e)?(i({error:`无效的简历ID`}),!0):typeof t!=`string`||t.length===0||t.length>2e5?(i({error:`骨架文本无效(${typeof t==`string`?`长度:${t.length}`:`类型:${typeof t}`})`}),!0):typeof s!=`string`||!/^[A-Za-z0-9_-]{16,64}$/.test(s)?(i({error:`无效的 operationId`}),!0):(Go(e,t,typeof r==`string`?r:``,typeof a==`string`?a:``,typeof o==`string`?o:void 0,s,[`work_only`,`internship_only`,`split`,`unknown`].includes(c??``)?c:void 0,typeof l==`string`?l.slice(0,8e3):void 0).then(i).catch(e=>{let t={error:e instanceof Error?e.message:String(e)},n=e;n.code&&(t.code=n.code),n.code===`INSUFFICIENT_CREDITS`&&(t.balance=n.balance,t.required=n.required),n.llmFailReason&&(t.llmFailReason=n.llmFailReason),n.operationId===s&&n.resultToken&&(t.operationId=n.operationId,t.resultToken=n.resultToken),i(t)}),!0)}if(n.type===`GET_CREDITS`)return Jo().then(e=>i({credits:e})).catch(e=>{s.warn(`[NextOffer] GET_CREDITS failed:`,e),i({credits:void 0})}),!0;if(n.type===`GET_CAMPAIGN_BANNER`){let n=Date.now();if(e){let t=Date.parse(e.data.campaignEndsAt);if(n<e.expiresAt&&n<t)return i({banner:e.data}),!0;e=null}return Xo(t.runtime.getManifest().version||``).then(t=>{if(!t.visible||Date.parse(t.campaignEndsAt)<=Date.now()){e=null,i({banner:null});return}let n=Math.min(Date.now()+t.cacheTtlSeconds*1e3,Date.parse(t.campaignEndsAt));e=n>Date.now()?{data:t,expiresAt:n}:null,i({banner:t})}).catch(e=>{s.warn(`[NextOffer] GET_CAMPAIGN_BANNER failed:`,e),i({banner:null})}),!0}if(n.type===`TRACK_CAMPAIGN_BANNER_CLICK`){let{campaignId:e}=n;return typeof e!=`string`||!/^\d{1,19}$/.test(e)?(i({ok:!1}),!0):(Zo(e,t.runtime.getManifest().version||``).then(()=>i({ok:!0})).catch(e=>{s.warn(`[NextOffer] TRACK_CAMPAIGN_BANNER_CLICK failed:`,e),i({ok:!1})}),!0)}if(n.type===`TRACK_RECHARGE_EXPOSURE`){let{dedupeKey:e}=n;return typeof e!=`string`||!/^[A-Za-z0-9_-]{16,64}$/.test(e)?(i({ok:!1}),!0):(Yo(e).then(()=>i({ok:!0})).catch(e=>{s.warn(`[NextOffer] TRACK_RECHARGE_EXPOSURE failed:`,e),i({ok:!1})}),!0)}if(n.type===`CHECKIN`)return Qo().then(e=>i({ok:!0,...e})).catch(e=>{s.warn(`[NextOffer] CHECKIN failed:`,e),i({ok:!1,error:e instanceof Error?e.message:String(e)})}),!0;if(n.type===`CHECK_VERSION`)return $o(t.runtime.getManifest().version||``).then(e=>i({ok:!0,...e})).catch(e=>{s.warn(`[NextOffer] CHECK_VERSION failed:`,e),i({ok:!1})}),!0;if(n.type===`FILL_RECORD`){let{payload:e}=n;return!e||typeof e!=`object`||typeof e.resumeId!=`string`||typeof e.operationId!=`string`||!/^[A-Za-z0-9_-]{16,64}$/.test(e.operationId)?(s.warn(`[NextOffer] BG_FILL_RECORD 参数非法，已拒绝:`,e),i({ok:!1,error:`填表结果参数无效`}),!0):(qo(e).then(i).catch(e=>{s.warn(`[NextOffer] reportFillRecord failed:`,e);let t=e;i({ok:!1,error:e instanceof Error?e.message:String(e),code:t.code})}),!0)}if(n.type===`NEXTOFFER_RESUMES_CHANGED`){let e=r.tab?.id;t.tabs.query({}).then(n=>{for(let r of n)r.id&&r.id!==e&&t.tabs.sendMessage(r.id,{type:a}).catch(()=>{})})}}),t.cookies.onChanged.addListener(r=>{let i=r.cookie;if(i.name!==`token`)return;let a=new URL(n).hostname,s=i.domain.replace(/^\./,``);(a===s||a.endsWith(`.${s}`))&&(e=null,t.tabs.query({}).then(e=>{for(let n of e)n.id&&t.tabs.sendMessage(n.id,{type:o}).catch(()=>{})}))})}),as={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)},os;try{os=is.main(),os instanceof Promise&&console.warn(`The background's main() function return a promise, but it must be synchronous`)}catch(e){throw as.error(`The background crashed on startup!`),e}return os})();