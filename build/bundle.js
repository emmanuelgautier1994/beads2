var app=function(){"use strict";function t(){}function n(t,n){for(const e in n)t[e]=n[e];return t}function e(t){return t()}function i(){return Object.create(null)}function s(t){t.forEach(e)}function l(t){return"function"==typeof t}function o(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function r(n,e,i){n.$$.on_destroy.push(function(n,...e){if(null==n)return t;const i=n.subscribe(...e);return i.unsubscribe?()=>i.unsubscribe():i}(e,i))}function c(t,n,e,i){if(t){const s=u(t,n,e,i);return t[0](s)}}function u(t,e,i,s){return t[1]&&s?n(i.ctx.slice(),t[1](s(e))):i.ctx}function a(t,n,e,i,s,l,o){const r=function(t,n,e,i){if(t[2]&&i){const s=t[2](i(e));if(void 0===n.dirty)return s;if("object"==typeof s){const t=[],e=Math.max(n.dirty.length,s.length);for(let i=0;i<e;i+=1)t[i]=n.dirty[i]|s[i];return t}return n.dirty|s}return n.dirty}(n,i,s,l);if(r){const s=u(n,e,i,o);t.p(s,r)}}function d(t,n){t.appendChild(n)}function f(t,n,e){t.insertBefore(n,e||null)}function g(t){t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function $(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function h(t){return document.createTextNode(t)}function m(){return h(" ")}function v(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function y(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function b(t,n){for(const e in n)y(t,e,n[e])}function x(t){return""===t?null:+t}function w(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function k(t,n){t.value=null==n?"":n}function S(t,n,e,i){t.style.setProperty(n,e,i?"important":"")}function _(t,n,e){t.classList[e?"add":"remove"](n)}let M;function R(t){M=t}const z=[],j=[],E=[],O=[],C=Promise.resolve();let A=!1;function L(t){E.push(t)}function B(t){O.push(t)}let N=!1;const P=new Set;function T(){if(!N){N=!0;do{for(let t=0;t<z.length;t+=1){const n=z[t];R(n),q(n.$$)}for(R(null),z.length=0;j.length;)j.pop()();for(let t=0;t<E.length;t+=1){const n=E[t];P.has(n)||(P.add(n),n())}E.length=0}while(z.length);for(;O.length;)O.pop()();A=!1,N=!1,P.clear()}}function q(t){if(null!==t.fragment){t.update(),s(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(L)}}const X=new Set;let F;function G(){F={r:0,c:[],p:F}}function H(){F.r||s(F.c),F=F.p}function Y(t,n){t&&t.i&&(X.delete(t),t.i(n))}function D(t,n,e,i){if(t&&t.o){if(X.has(t))return;X.add(t),F.c.push((()=>{X.delete(t),i&&(e&&t.d(1),i())})),t.o(n)}}function I(t,n){t.d(1),n.delete(t.key)}function J(t,n){D(t,1,1,(()=>{n.delete(t.key)}))}function K(t,n,e,i,s,l,o,r,c,u,a,d){let f=t.length,g=l.length,p=f;const $={};for(;p--;)$[t[p].key]=p;const h=[],m=new Map,v=new Map;for(p=g;p--;){const t=d(s,l,p),r=e(t);let c=o.get(r);c?i&&c.p(t,n):(c=u(r,t),c.c()),m.set(r,h[p]=c),r in $&&v.set(r,Math.abs(p-$[r]))}const y=new Set,b=new Set;function x(t){Y(t,1),t.m(r,a),o.set(t.key,t),a=t.first,g--}for(;f&&g;){const n=h[g-1],e=t[f-1],i=n.key,s=e.key;n===e?(a=n.first,f--,g--):m.has(s)?!o.has(i)||y.has(i)?x(n):b.has(s)?f--:v.get(i)>v.get(s)?(b.add(i),x(n)):(y.add(s),f--):(c(e,o),f--)}for(;f--;){const n=t[f];m.has(n.key)||c(n,o)}for(;g;)x(h[g-1]);return h}function Q(t,n){const e={},i={},s={$$scope:1};let l=t.length;for(;l--;){const o=t[l],r=n[l];if(r){for(const t in o)t in r||(i[t]=1);for(const t in r)s[t]||(e[t]=r[t],s[t]=1);t[l]=r}else for(const t in o)s[t]=1}for(const t in i)t in e||(e[t]=void 0);return e}function U(t,n,e){const i=t.$$.props[n];void 0!==i&&(t.$$.bound[i]=e,e(t.$$.ctx[i]))}function V(t){t&&t.c()}function W(t,n,i){const{fragment:o,on_mount:r,on_destroy:c,after_update:u}=t.$$;o&&o.m(n,i),L((()=>{const n=r.map(e).filter(l);c?c.push(...n):s(n),t.$$.on_mount=[]})),u.forEach(L)}function Z(t,n){const e=t.$$;null!==e.fragment&&(s(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function tt(t,n){-1===t.$$.dirty[0]&&(z.push(t),A||(A=!0,C.then(T)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function nt(n,e,l,o,r,c,u=[-1]){const a=M;R(n);const d=e.props||{},f=n.$$={fragment:null,ctx:null,props:c,update:t,not_equal:r,bound:i(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:i(),dirty:u,skip_bound:!1};let p=!1;if(f.ctx=l?l(n,d,((t,e,...i)=>{const s=i.length?i[0]:e;return f.ctx&&r(f.ctx[t],f.ctx[t]=s)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](s),p&&tt(n,t)),e})):[],f.update(),p=!0,s(f.before_update),f.fragment=!!o&&o(f.ctx),e.target){if(e.hydrate){const t=function(t){return Array.from(t.childNodes)}(e.target);f.fragment&&f.fragment.l(t),t.forEach(g)}else f.fragment&&f.fragment.c();e.intro&&Y(n.$$.fragment),W(n,e.target,e.anchor),T()}R(a)}class et{$destroy(){Z(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function it(n){let e;return{c(){e=p("div"),e.innerHTML='<div class="title svelte-g6crc9"><span class="letter-b svelte-g6crc9">B</span> \n    <span class="letter-e svelte-g6crc9">e</span> \n    <span class="letter-a svelte-g6crc9">a</span> \n    <span class="letter-d svelte-g6crc9">d</span> \n    <span class="letter-s svelte-g6crc9">s</span></div>',y(e,"class","cell svelte-g6crc9")},m(t,n){f(t,e,n)},p:t,i:t,o:t,d(t){t&&g(e)}}}class st extends et{constructor(t){super(),nt(this,t,null,it,o,{})}}const lt=t=>({}),ot=t=>({}),rt=t=>({}),ct=t=>({}),ut=t=>({}),at=t=>({}),dt=t=>({}),ft=t=>({});function gt(t){let n,e,i,s,l,o;const r=t[3].label,u=c(r,t,t[2],at),d=t[3].slider,$=c(d,t,t[2],ct),h=t[3]["go-button"],v=c(h,t,t[2],ot);return{c(){n=p("div"),u&&u.c(),e=m(),i=p("div"),$&&$.c(),s=m(),l=p("div"),v&&v.c(),y(n,"class","cell cell-label svelte-mdu8in"),y(i,"class","cell cell-slider svelte-mdu8in"),y(l,"class","cell cell-go-button svelte-mdu8in")},m(t,r){f(t,n,r),u&&u.m(n,null),f(t,e,r),f(t,i,r),$&&$.m(i,null),f(t,s,r),f(t,l,r),v&&v.m(l,null),o=!0},p(t,n){u&&u.p&&4&n&&a(u,r,t,t[2],n,ut,at),$&&$.p&&4&n&&a($,d,t,t[2],n,rt,ct),v&&v.p&&4&n&&a(v,h,t,t[2],n,lt,ot)},i(t){o||(Y(u,t),Y($,t),Y(v,t),o=!0)},o(t){D(u,t),D($,t),D(v,t),o=!1},d(t){t&&g(n),u&&u.d(t),t&&g(e),t&&g(i),$&&$.d(t),t&&g(s),t&&g(l),v&&v.d(t)}}}function pt(t){let n,e,i,s;const l=t[3]["rotate-buttons"],o=c(l,t,t[2],ft);let r=t[1]&&gt(t);return{c(){n=p("div"),e=p("div"),o&&o.c(),i=m(),r&&r.c(),y(e,"class","cell cell-rotate-buttons svelte-mdu8in"),y(n,"class","grid svelte-mdu8in"),_(n,"painting",t[0]),_(n,"configuring",t[1])},m(t,l){f(t,n,l),d(n,e),o&&o.m(e,null),d(n,i),r&&r.m(n,null),s=!0},p(t,[e]){o&&o.p&&4&e&&a(o,l,t,t[2],e,dt,ft),t[1]?r?(r.p(t,e),2&e&&Y(r,1)):(r=gt(t),r.c(),Y(r,1),r.m(n,null)):r&&(G(),D(r,1,1,(()=>{r=null})),H()),1&e&&_(n,"painting",t[0]),2&e&&_(n,"configuring",t[1])},i(t){s||(Y(o,t),Y(r),s=!0)},o(t){D(o,t),D(r),s=!1},d(t){t&&g(n),o&&o.d(t),r&&r.d()}}}function $t(t,n,e){let{$$slots:i={},$$scope:s}=n,{painting:l}=n,{configuring:o}=n;return t.$$set=t=>{"painting"in t&&e(0,l=t.painting),"configuring"in t&&e(1,o=t.configuring),"$$scope"in t&&e(2,s=t.$$scope)},[l,o,s,i]}class ht extends et{constructor(t){super(),nt(this,t,$t,pt,o,{painting:0,configuring:1})}}function mt(n){let e,i,l,o,r,c;return{c(){e=p("div"),i=p("button"),i.textContent="L",l=m(),o=p("button"),o.textContent="R",y(e,"slot","rotate-buttons")},m(t,s){f(t,e,s),d(e,i),d(e,l),d(e,o),r||(c=[v(i,"click",n[5]),v(o,"click",n[4])],r=!0)},p:t,d(t){t&&g(e),r=!1,s(c)}}}function vt(t){let n,e,i,s;return{c(){n=p("p"),e=h(t[0]),i=h(" x "),s=h(t[0]),y(n,"slot","label"),y(n,"class","label svelte-1tb05gl")},m(t,l){f(t,n,l),d(n,e),d(n,i),d(n,s)},p(t,n){1&n&&w(e,t[0]),1&n&&w(s,t[0])},d(t){t&&g(n)}}}function yt(t){let n,e,i,l,o,r;return{c(){n=p("input"),y(n,"type","range"),y(n,"slot","slider"),y(n,"min",e=5),y(n,"max",i=50),y(n,"step",l=1),y(n,"class","svelte-1tb05gl")},m(e,i){f(e,n,i),k(n,t[0]),o||(r=[v(n,"change",t[7]),v(n,"input",t[7])],o=!0)},p(t,e){1&e&&k(n,t[0])},d(t){t&&g(n),o=!1,s(r)}}}function bt(t){let n,e,i;return{c(){n=p("button"),n.textContent="Go!",y(n,"slot","go-button"),y(n,"class","go-button svelte-1tb05gl")},m(s,o){f(s,n,o),e||(i=v(n,"click",(function(){l(t[3])&&t[3].apply(this,arguments)})),e=!0)},p(n,e){t=n},d(t){t&&g(n),e=!1,i()}}}function xt(n){let e,i,s;return{c(){e=m(),i=m(),s=m()},m(t,n){f(t,e,n),f(t,i,n),f(t,s,n)},p:t,d(t){t&&g(e),t&&g(i),t&&g(s)}}}function wt(t){let e,i,s;const l=[{configuring:t[1],painting:t[2]}];let o={$$slots:{default:[xt],"go-button":[bt],slider:[yt],label:[vt],"rotate-buttons":[mt]},$$scope:{ctx:t}};for(let t=0;t<l.length;t+=1)o=n(o,l[t]);return i=new ht({props:o}),{c(){e=p("div"),V(i.$$.fragment),y(e,"class","cell svelte-1tb05gl")},m(t,n){f(t,e,n),W(i,e,null),s=!0},p(t,[n]){const e=6&n?Q(l,[{configuring:t[1],painting:t[2]}]):{};265&n&&(e.$$scope={dirty:n,ctx:t}),i.$set(e)},i(t){s||(Y(i.$$.fragment,t),s=!0)},o(t){D(i.$$.fragment,t),s=!1},d(t){t&&g(e),Z(i)}}}function kt(t,n,e){let{gridSize:i}=n,{layoutRotation:s}=n,{configuring:l}=n,{painting:o}=n,{toggleStep:r}=n;return t.$$set=t=>{"gridSize"in t&&e(0,i=t.gridSize),"layoutRotation"in t&&e(6,s=t.layoutRotation),"configuring"in t&&e(1,l=t.configuring),"painting"in t&&e(2,o=t.painting),"toggleStep"in t&&e(3,r=t.toggleStep)},[i,l,o,r,()=>{e(6,s=(s+90)%360)},()=>{e(6,s=(s-90+360)%360)},s,function(){i=x(this.value),e(0,i)}]}class St extends et{constructor(t){super(),nt(this,t,kt,wt,o,{gridSize:0,layoutRotation:6,configuring:1,painting:2,toggleStep:3})}}const _t=t=>({}),Mt=t=>({}),Rt=t=>({}),zt=t=>({}),jt=t=>({}),Et=t=>({}),Ot=t=>({}),Ct=t=>({}),At=t=>({}),Lt=t=>({}),Bt=t=>({}),Nt=t=>({});function Pt(t){let n,e,i,s,l,o,r,u,$,h,v,b,x;const w=t[1]["hue-slider"],k=c(w,t,t[0],Nt),S=t[1]["sat-slider"],_=c(S,t,t[0],Lt),M=t[1]["light-slider"],R=c(M,t,t[0],Ct),z=t[1].colors,j=c(z,t,t[0],Et),E=t[1]["history-buttons"],O=c(E,t,t[0],zt),C=t[1]["reset-button"],A=c(C,t,t[0],Mt);return{c(){n=p("div"),e=p("div"),k&&k.c(),i=m(),s=p("div"),_&&_.c(),l=m(),o=p("div"),R&&R.c(),r=m(),u=p("div"),j&&j.c(),$=m(),h=p("div"),O&&O.c(),v=m(),b=p("div"),A&&A.c(),y(e,"class","cell cell-hue-slider svelte-3yab1n"),y(s,"class","cell cell-sat-slider svelte-3yab1n"),y(o,"class","cell cell-light-slider svelte-3yab1n"),y(u,"class","cell cell-colors svelte-3yab1n"),y(h,"class","cell cell-history-buttons svelte-3yab1n"),y(b,"class","cell cell-reset-button svelte-3yab1n"),y(n,"class","grid svelte-3yab1n")},m(t,c){f(t,n,c),d(n,e),k&&k.m(e,null),d(n,i),d(n,s),_&&_.m(s,null),d(n,l),d(n,o),R&&R.m(o,null),d(n,r),d(n,u),j&&j.m(u,null),d(n,$),d(n,h),O&&O.m(h,null),d(n,v),d(n,b),A&&A.m(b,null),x=!0},p(t,[n]){k&&k.p&&1&n&&a(k,w,t,t[0],n,Bt,Nt),_&&_.p&&1&n&&a(_,S,t,t[0],n,At,Lt),R&&R.p&&1&n&&a(R,M,t,t[0],n,Ot,Ct),j&&j.p&&1&n&&a(j,z,t,t[0],n,jt,Et),O&&O.p&&1&n&&a(O,E,t,t[0],n,Rt,zt),A&&A.p&&1&n&&a(A,C,t,t[0],n,_t,Mt)},i(t){x||(Y(k,t),Y(_,t),Y(R,t),Y(j,t),Y(O,t),Y(A,t),x=!0)},o(t){D(k,t),D(_,t),D(R,t),D(j,t),D(O,t),D(A,t),x=!1},d(t){t&&g(n),k&&k.d(t),_&&_.d(t),R&&R.d(t),j&&j.d(t),O&&O.d(t),A&&A.d(t)}}}function Tt(t,n,e){let{$$slots:i={},$$scope:s}=n;return t.$$set=t=>{"$$scope"in t&&e(0,s=t.$$scope)},[s,i]}class qt extends et{constructor(t){super(),nt(this,t,Tt,Pt,o,{})}}const Xt=[];function Ft(n,e=t){let i;const s=[];function l(t){if(o(n,t)&&(n=t,i)){const t=!Xt.length;for(let t=0;t<s.length;t+=1){const e=s[t];e[1](),Xt.push(e,n)}if(t){for(let t=0;t<Xt.length;t+=2)Xt[t][0](Xt[t+1]);Xt.length=0}}}return{set:l,update:function(t){l(t(n))},subscribe:function(o,r=t){const c=[o,r];return s.push(c),1===s.length&&(i=e(l)||t),o(n),()=>{const t=s.indexOf(c);-1!==t&&s.splice(t,1),0===s.length&&(i(),i=null)}}}}const Gt=Ft([{h:175,s:65,l:35,id:0},{h:150,s:74,l:72,id:1},{h:50,s:91,l:70,id:2},{h:11,s:100,l:85,id:3},{h:16,s:95,l:65,id:4},{h:0,s:100,l:100,id:5},{h:0,s:100,l:100,id:6},{h:0,s:100,l:100,id:7},{h:0,s:100,l:100,id:8},{h:0,s:100,l:100,id:9},{h:0,s:100,l:100,id:10},{h:0,s:100,l:100,id:11}]),Ht=Ft(0),Yt=(()=>{const{subscribe:t,update:n}=Ft({cursor:0,versions:[{}]});return{subscribe:t,commit:t=>n((n=>{const e={...n.versions[n.cursor],...t};return i=n.versions[n.cursor],s=e,Object.keys(i).length===Object.keys(s).length&&Object.entries(i).reduce(((t,[n,e])=>t&&n in s&&s[n]==e),!0)?n:{cursor:n.cursor+1,versions:[...n.versions.slice(0,n.cursor+1),e]};var i,s})),undo:()=>n((t=>0===t.cursor?t:{...t,cursor:t.cursor-1})),redo:()=>n((t=>t.cursor===t.versions.length-1?t:{...t,cursor:t.cursor+1}))}})(),Dt=Ft({});function It(t,n,e){const i=t.slice();return i[13]=n[e],i}function Jt(t){let n,e,i;return{c(){n=p("input"),y(n,"slot","hue-slider"),y(n,"type","range"),y(n,"class","hue-gradient svelte-9sorvl"),y(n,"min","0"),y(n,"max","360"),y(n,"step","1")},m(s,l){f(s,n,l),k(n,t[1][t[2]].h),e||(i=[v(n,"change",t[10]),v(n,"input",t[10])],e=!0)},p(t,e){6&e&&k(n,t[1][t[2]].h)},d(t){t&&g(n),e=!1,s(i)}}}function Kt(t){let n,e,i;return{c(){n=p("input"),y(n,"slot","sat-slider"),y(n,"type","range"),y(n,"class","sat-gradient svelte-9sorvl"),S(n,"--h",t[3].h),S(n,"--l",t[3].l+"%"),y(n,"min","0"),y(n,"max","100"),y(n,"step","1")},m(s,l){f(s,n,l),k(n,t[1][t[2]].s),e||(i=[v(n,"change",t[11]),v(n,"input",t[11])],e=!0)},p(t,e){8&e&&S(n,"--h",t[3].h),8&e&&S(n,"--l",t[3].l+"%"),6&e&&k(n,t[1][t[2]].s)},d(t){t&&g(n),e=!1,s(i)}}}function Qt(t){let n,e,i;return{c(){n=p("input"),y(n,"slot","light-slider"),y(n,"type","range"),y(n,"class","light-gradient svelte-9sorvl"),S(n,"--h",t[3].h),S(n,"--s",t[3].s+"%"),y(n,"min","0"),y(n,"max","100"),y(n,"step","1")},m(s,l){f(s,n,l),k(n,t[1][t[2]].l),e||(i=[v(n,"change",t[12]),v(n,"input",t[12])],e=!0)},p(t,e){8&e&&S(n,"--h",t[3].h),8&e&&S(n,"--s",t[3].s+"%"),6&e&&k(n,t[1][t[2]].l)},d(t){t&&g(n),e=!1,s(i)}}}function Ut(t,n){let e,i,s;return{key:t,first:null,c(){e=p("div"),y(e,"class","color svelte-9sorvl"),S(e,"--h",n[13].h),S(e,"--s",n[13].s+"%"),S(e,"--l",n[13].l+"%"),_(e,"selected",n[13].id==n[2]),_(e,"blank",100==n[13].l),this.first=e},m(t,o){f(t,e,o),i||(s=v(e,"click",(function(){l(n[6](n[13].id))&&n[6](n[13].id).apply(this,arguments)})),i=!0)},p(t,i){n=t,2&i&&S(e,"--h",n[13].h),2&i&&S(e,"--s",n[13].s+"%"),2&i&&S(e,"--l",n[13].l+"%"),6&i&&_(e,"selected",n[13].id==n[2]),2&i&&_(e,"blank",100==n[13].l)},d(t){t&&g(e),i=!1,s()}}}function Vt(t){let n,e=[],i=new Map,s=t[1];const l=t=>t[13].id;for(let n=0;n<s.length;n+=1){let o=It(t,s,n),r=l(o);i.set(r,e[n]=Ut(r,o))}return{c(){n=p("div");for(let t=0;t<e.length;t+=1)e[t].c();y(n,"slot","colors"),y(n,"class","colors-grid svelte-9sorvl")},m(t,i){f(t,n,i);for(let t=0;t<e.length;t+=1)e[t].m(n,null)},p(t,s){if(70&s){const o=t[1];e=K(e,s,l,1,t,o,i,n,I,Ut,null,It)}},d(t){t&&g(n);for(let t=0;t<e.length;t+=1)e[t].d()}}}function Wt(t){let n,e,i,l,o,r,c,u,a,$;return{c(){n=p("div"),e=p("button"),i=h("<"),o=m(),r=p("button"),c=h(">"),e.disabled=l=!t[4],_(e,"disabled",!t[4]),r.disabled=u=!t[5],_(r,"disabled",!t[5]),y(n,"slot","history-buttons")},m(s,l){f(s,n,l),d(n,e),d(e,i),d(n,o),d(n,r),d(r,c),a||($=[v(e,"click",t[7]),v(r,"click",t[8])],a=!0)},p(t,n){16&n&&l!==(l=!t[4])&&(e.disabled=l),16&n&&_(e,"disabled",!t[4]),32&n&&u!==(u=!t[5])&&(r.disabled=u),32&n&&_(r,"disabled",!t[5])},d(t){t&&g(n),a=!1,s($)}}}function Zt(t){let n,e,i;return{c(){n=p("button"),n.textContent="X",y(n,"slot","reset-button"),y(n,"class","reset-button svelte-9sorvl")},m(s,o){f(s,n,o),e||(i=v(n,"click",(function(){l(t[0])&&t[0].apply(this,arguments)})),e=!0)},p(n,e){t=n},d(t){t&&g(n),e=!1,i()}}}function tn(n){let e,i,s,l,o;return{c(){e=m(),i=m(),s=m(),l=m(),o=m()},m(t,n){f(t,e,n),f(t,i,n),f(t,s,n),f(t,l,n),f(t,o,n)},p:t,d(t){t&&g(e),t&&g(i),t&&g(s),t&&g(l),t&&g(o)}}}function nn(t){let n,e,i;return e=new qt({props:{$$slots:{default:[tn],"reset-button":[Zt],"history-buttons":[Wt],colors:[Vt],"light-slider":[Qt],"sat-slider":[Kt],"hue-slider":[Jt]},$$scope:{ctx:t}}}),{c(){n=p("div"),V(e.$$.fragment),y(n,"class","cell svelte-9sorvl")},m(t,s){f(t,n,s),W(e,n,null),i=!0},p(t,[n]){const i={};65599&n&&(i.$$scope={dirty:n,ctx:t}),e.$set(i)},i(t){i||(Y(e.$$.fragment,t),i=!0)},o(t){D(e.$$.fragment,t),i=!1},d(t){t&&g(n),Z(e)}}}function en(t,n,e){let i,s,l;r(t,Gt,(t=>e(1,i=t))),r(t,Ht,(t=>e(2,s=t))),r(t,Yt,(t=>e(9,l=t)));let{toggleStep:o}=n;let c,u,a;return t.$$set=t=>{"toggleStep"in t&&e(0,o=t.toggleStep)},t.$$.update=()=>{6&t.$$.dirty&&e(3,c=i[s]),512&t.$$.dirty&&e(4,u=l.cursor>0),512&t.$$.dirty&&e(5,a=l.cursor<l.versions.length-1)},[o,i,s,c,u,a,t=>()=>Ht.set(t),()=>{Yt.undo(),Dt.set(l.versions[l.cursor])},()=>{Yt.redo(),Dt.set(l.versions[l.cursor])},l,function(){i[s].h=x(this.value),Gt.set(i)},function(){i[s].s=x(this.value),Gt.set(i)},function(){i[s].l=x(this.value),Gt.set(i)}]}class sn extends et{constructor(t){super(),nt(this,t,en,nn,o,{toggleStep:0})}}function ln(t){let n,e;const i=t[1].default,s=c(i,t,t[0],null);return{c(){n=p("div"),s&&s.c(),y(n,"class","cell svelte-1bjus1p")},m(t,i){f(t,n,i),s&&s.m(n,null),e=!0},p(t,[n]){s&&s.p&&1&n&&a(s,i,t,t[0],n,null,null)},i(t){e||(Y(s,t),e=!0)},o(t){D(s,t),e=!1},d(t){t&&g(n),s&&s.d(t)}}}function on(t,n,e){let{$$slots:i={},$$scope:s}=n;return t.$$set=t=>{"$$scope"in t&&e(0,s=t.$$scope)},[s,i]}class rn extends et{constructor(t){super(),nt(this,t,on,ln,o,{})}}function cn(e){let i,l,o,r=[{id:e[0],x:e[1],y:e[2],width:e[3],height:e[4],fill:e[5]},{stroke:"black"},{"stroke-width":"0.1"}],c={};for(let t=0;t<r.length;t+=1)c=n(c,r[t]);return{c(){i=$("rect"),b(i,c),_(i,"svelte-1rmw8na",!0)},m(t,n){f(t,i,n),l||(o=[v(i,"click",e[6]),v(i,"mouseenter",e[7])],l=!0)},p(t,[n]){b(i,c=Q(r,[63&n&&{id:t[0],x:t[1],y:t[2],width:t[3],height:t[4],fill:t[5]},{stroke:"black"},{"stroke-width":"0.1"}])),_(i,"svelte-1rmw8na",!0)},i:t,o:t,d(t){t&&g(i),l=!1,s(o)}}}function un(t,n,e){let i,s,l;r(t,Dt,(t=>e(9,i=t))),r(t,Gt,(t=>e(11,s=t))),r(t,Ht,(t=>e(12,l=t)));let{id:o}=n,{x:c}=n,{y:u}=n,{width:a}=n,{height:d}=n;const f=()=>Dt.update((t=>({...t,[o]:l})));let g,p,$;return t.$$set=t=>{"id"in t&&e(0,o=t.id),"x"in t&&e(1,c=t.x),"y"in t&&e(2,u=t.y),"width"in t&&e(3,a=t.width),"height"in t&&e(4,d=t.height)},t.$$.update=()=>{513&t.$$.dirty&&e(8,g=i[o]),2304&t.$$.dirty&&e(10,p=void 0!==g?s[g]:{h:0,s:100,l:100}),1024&t.$$.dirty&&e(5,$=`hsl(${p.h}, ${p.s}%, ${p.l}%)`)},[o,c,u,a,d,$,()=>{f(),Yt.commit(i)},t=>{1===t.buttons&&f()},g,i,p,s]}class an extends et{constructor(t){super(),nt(this,t,un,cn,o,{id:0,x:1,y:2,width:3,height:4})}}function dn(t,n,e){const i=t.slice();return i[14]=n[e],i}function fn(t,e){let i,s,l;const o=[e[14]];let r={};for(let t=0;t<o.length;t+=1)r=n(r,o[t]);return s=new an({props:r}),{key:t,first:null,c(){i=h(""),V(s.$$.fragment),this.first=i},m(t,n){f(t,i,n),W(s,t,n),l=!0},p(t,n){const e=2&n?Q(o,[(i=t[14],"object"==typeof i&&null!==i?i:{})]):{};var i;s.$set(e)},i(t){l||(Y(s.$$.fragment,t),l=!0)},o(t){D(s.$$.fragment,t),l=!1},d(t){t&&g(i),Z(s,t)}}}function gn(t){let n,e,i,l,o=[],r=new Map,c=t[1];const u=t=>t[14].id;for(let n=0;n<c.length;n+=1){let e=dn(t,c,n),i=u(e);r.set(i,o[n]=fn(i,e))}return{c(){n=$("svg");for(let t=0;t<o.length;t+=1)o[t].c();y(n,"viewBox",t[0]),y(n,"class","svelte-u89dj0")},m(s,r){f(s,n,r);for(let t=0;t<o.length;t+=1)o[t].m(n,null);e=!0,i||(l=[v(n,"touchmove",t[3]),v(n,"pointerup",t[9])],i=!0)},p(t,[i]){if(2&i){const e=t[1];G(),o=K(o,i,u,1,t,e,r,n,J,fn,null,dn),H()}(!e||1&i)&&y(n,"viewBox",t[0])},i(t){if(!e){for(let t=0;t<c.length;t+=1)Y(o[t]);e=!0}},o(t){for(let t=0;t<o.length;t+=1)D(o[t]);e=!1},d(t){t&&g(n);for(let t=0;t<o.length;t+=1)o[t].d();i=!1,s(l)}}}function pn(t,n,e){let i,s;r(t,Dt,(t=>e(2,i=t))),r(t,Ht,(t=>e(10,s=t)));let{gridSize:l}=n,{layoutRotation:o}=n,{painting:c}=n;const u=t=>[...Array(t).keys()];let a,d,f,g;return t.$$set=t=>{"gridSize"in t&&e(4,l=t.gridSize),"layoutRotation"in t&&e(5,o=t.layoutRotation),"painting"in t&&e(6,c=t.painting)},t.$$.update=()=>{16&t.$$.dirty&&e(7,a=2*(l+1)),16&t.$$.dirty&&e(8,d=2*(l+2)),384&t.$$.dirty&&e(0,f=`0 0 ${a} ${d}`),432&t.$$.dirty&&e(1,g=((t,n,e,i,s,l)=>{switch(l){case 90:return u(t).flatMap((s=>u(t).flatMap((l=>({id:s*t+l,x:i-(s%2?n*(l+1):n*(l+1.5)),y:e*(s+1.5)+3,height:e,width:n})))));case 180:return u(t).flatMap((l=>u(t).flatMap((o=>({id:l*t+o,x:s-e*(l+1.5)-6,y:i-(l%2?n*(o+1):n*(o+1.5))+1,height:n,width:e})))));case 270:return u(t).flatMap((i=>u(t).flatMap((l=>({id:i*t+l,x:i%2?n*(l+1):n*(l+1.5)-2,y:s-(e*(i+1.5)+3)-2,height:e,width:n})))));default:return u(t).flatMap((i=>u(t).flatMap((s=>({id:i*t+s,x:e*(i+1.5)+2,y:i%2?n*(s+1):n*(s+1.5),height:n,width:e})))))}})(l,2,1.64,a,d,o))},[f,g,i,t=>{!function(t,n,e=n){t.set(e)}(Dt,i[document.elementFromPoint(t.touches[0].pageX,t.touches[0].pageY).id]=s,i)},l,o,c,a,d,()=>Yt.commit(i)]}class $n extends et{constructor(t){super(),nt(this,t,pn,gn,o,{gridSize:4,layoutRotation:5,painting:6})}}function hn(t){let e,i;const s=[{toggleStep:t[4]}];let l={};for(let t=0;t<s.length;t+=1)l=n(l,s[t]);return e=new sn({props:l}),{c(){V(e.$$.fragment)},m(t,n){W(e,t,n),i=!0},p(t,n){const i=16&n?Q(s,[{toggleStep:t[4]}]):{};e.$set(i)},i(t){i||(Y(e.$$.fragment,t),i=!0)},o(t){D(e.$$.fragment,t),i=!1},d(t){Z(e,t)}}}function mn(t){let e,i;const s=[{painting:t[2],gridSize:t[0],layoutRotation:t[1]}];let l={};for(let t=0;t<s.length;t+=1)l=n(l,s[t]);return e=new $n({props:l}),{c(){V(e.$$.fragment)},m(t,n){W(e,t,n),i=!0},p(t,n){const i=7&n?Q(s,[{painting:t[2],gridSize:t[0],layoutRotation:t[1]}]):{};e.$set(i)},i(t){i||(Y(e.$$.fragment,t),i=!0)},o(t){D(e.$$.fragment,t),i=!1},d(t){Z(e,t)}}}function vn(t){let e,i,s,l,o,r,c,u,a,$;i=new st({});const h=[{toggleStep:t[4],configuring:t[3],painting:t[2]}];function v(n){t[6].call(null,n)}function b(n){t[7].call(null,n)}let x={};for(let t=0;t<h.length;t+=1)x=n(x,h[t]);void 0!==t[0]&&(x.gridSize=t[0]),void 0!==t[1]&&(x.layoutRotation=t[1]),l=new St({props:x}),j.push((()=>U(l,"gridSize",v))),j.push((()=>U(l,"layoutRotation",b)));let w=t[2]&&hn(t);return a=new rn({props:{$$slots:{default:[mn]},$$scope:{ctx:t}}}),{c(){e=p("main"),V(i.$$.fragment),s=m(),V(l.$$.fragment),c=m(),w&&w.c(),u=m(),V(a.$$.fragment),y(e,"class","svelte-1dgoflq"),_(e,"painting",t[2]),_(e,"configuring",t[3])},m(t,n){f(t,e,n),W(i,e,null),d(e,s),W(l,e,null),d(e,c),w&&w.m(e,null),d(e,u),W(a,e,null),$=!0},p(t,[n]){const i=28&n?Q(h,[{toggleStep:t[4],configuring:t[3],painting:t[2]}]):{};!o&&1&n&&(o=!0,i.gridSize=t[0],B((()=>o=!1))),!r&&2&n&&(r=!0,i.layoutRotation=t[1],B((()=>r=!1))),l.$set(i),t[2]?w?(w.p(t,n),4&n&&Y(w,1)):(w=hn(t),w.c(),Y(w,1),w.m(e,u)):w&&(G(),D(w,1,1,(()=>{w=null})),H());const s={};263&n&&(s.$$scope={dirty:n,ctx:t}),a.$set(s),4&n&&_(e,"painting",t[2]),8&n&&_(e,"configuring",t[3])},i(t){$||(Y(i.$$.fragment,t),Y(l.$$.fragment,t),Y(w),Y(a.$$.fragment,t),$=!0)},o(t){D(i.$$.fragment,t),D(l.$$.fragment,t),D(w),D(a.$$.fragment,t),$=!1},d(t){t&&g(e),Z(i),Z(l),w&&w.d(),Z(a)}}}function yn(t,n,e){let i="configuring",s=20,l=90;let o,r;return t.$$.update=()=>{32&t.$$.dirty&&e(2,o="painting"==i),32&t.$$.dirty&&e(3,r="configuring"==i)},[s,l,o,r,()=>{e(5,i={configuring:"painting",painting:"configuring"}[i])},i,function(t){s=t,e(0,s)},function(t){l=t,e(1,l)}]}return new class extends et{constructor(t){super(),nt(this,t,yn,vn,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
