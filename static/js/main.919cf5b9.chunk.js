(this.webpackJsonppath_finding=this.webpackJsonppath_finding||[]).push([[0],{52:function(A,e,n){},53:function(A,e,n){},59:function(A,e,n){"use strict";n.r(e);var l=n(0),o=n.n(l),r=n(8),t=n.n(r),i=(n(52),n(21)),c=n(12),a=(n(53),n(17)),d=n(85),g=n(89),f=n(90);function j(A,e){var n,l=[];A.row>0&&((n=e[A.row-1][A.col]).isWall||l.push(n));A.col<e[0].length-1&&((n=e[A.row][A.col+1]).isWall||l.push(n));A.row<e.length-1&&((n=e[A.row+1][A.col]).isWall||l.push(n));A.col>0&&((n=e[A.row][A.col-1]).isWall||l.push(n));return l}function s(A,e){setTimeout((function(){Object(a.a)({targets:document.getElementById("node".concat(A.row*Math.floor(window.innerWidth/15)+A.col)),scale:[{value:1.1,easing:"easeOutSine",duration:500},{value:1,easing:"easeInOutQuad",duration:1200}],background:[{value:"#0CECDD",easing:"linear",duration:500},{value:"#7DEDFF",easing:"linear",duration:500}],borderRadius:[{value:"20%",easing:"linear",duration:1e3},{value:"0%",easing:"linear",duration:500}]})}),10*e)}function v(A,e){setTimeout((function(){Object(a.a)({targets:document.getElementById("node".concat(A.row*Math.floor(window.innerWidth/15)+A.col)),scale:[{value:1.1,easing:"easeOutSine",duration:500},{value:1,easing:"easeInOutQuad",duration:1200}],background:[{value:"#DF2E2E",easing:"linear",duration:500},{value:"#FF7600",easing:"linear",duration:500}],borderRadius:[{value:"20%",easing:"linear",duration:1e3},{value:"0%",easing:"linear",duration:500}]})}),15*e)}function u(A,e){for(var n=w(A,e),l=0,o=0;o<n.length;o++)if(n[o].isWall||l++,l>=2)return!1;return!0}function y(A,e){return!(A.row>0&&A.col>0&&!e[A.row-1][A.col-1].isWall&&e[A.row-1][A.col].isWall&&e[A.row][A.col-1].isWall)&&(!(A.row>0&&A.col<e[0].length-1&&!e[A.row-1][A.col+1].isWall&&e[A.row-1][A.col].isWall&&e[A.row][A.col+1].isWall)&&(!(A.row<e.length-1&&A.col>0&&!e[A.row+1][A.col-1].isWall&&e[A.row+1][A.col].isWall&&e[A.row][A.col-1].isWall)&&!(A.row<e.length-1&&A.col<e[0].length-1&&!e[A.row+1][A.col+1].isWall&&e[A.row+1][A.col].isWall&&e[A.row][A.col+1].isWall)))}function w(A,e){var n=[];return A.row>1&&n.push(e[A.row-1][A.col]),A.col<e[0].length-2&&n.push(e[A.row][A.col+1]),A.row<e.length-2&&n.push(e[A.row+1][A.col]),A.col>1&&n.push(e[A.row][A.col-1]),n}function B(A,e,n,l){setTimeout((function(){Object(a.a)({targets:document.getElementById("node".concat(A.row*n[0].length+A.col)),background:l})}),10*e)}var I=n(3);var h=function(){var A=_(),e=Object(l.useState)(_()),o=Object(c.a)(e,2),r=o[0],t=o[1],h=Object(l.useState)(!1),O=Object(c.a)(h,2),C=O[0],E=O[1],Q=Object(l.useState)([Math.floor((window.innerHeight-200)/30),Math.floor(window.innerWidth/60)]),b=Object(c.a)(Q,2),M=b[0],k=b[1],D=Object(l.useState)([Math.floor((window.innerHeight-200)/30),Math.floor(3*window.innerWidth/60)]),P=Object(c.a)(D,2),m=P[0],R=P[1],T=Object(l.useState)(!1),Z=Object(c.a)(T,2),x=Z[0],J=Z[1],p=Object(l.useState)(!1),H=Object(c.a)(p,2),G=H[0],z=H[1],L=Object(l.useState)("medium"),S=Object(c.a)(L,2),K=S[0],X=S[1],Y=Object(l.useState)("automatic"),W=Object(c.a)(Y,2),U=W[0],N=W[1],F=Object(l.useState)(20),q=Object(c.a)(F,2),V=(q[0],q[1]);function _(){for(var A=[],e=0;e<Math.floor((window.innerHeight-200)/15);e++){for(var n=[],l=0;l<Math.floor(window.innerWidth/15);l++)n.push({row:e,col:l,isWall:!1,isStart:!1,isEnd:!1,distance:-1});A.push(n)}return A}function $(A){return Object(I.jsx)("div",{style:{width:15,height:15},onMouseDown:function(){if(A.row!==M[0]||A.col!==M[1])if(A.row!==m[0]||A.col!==m[1]){var e=Object(i.a)(r),n=e[A.row][A.col];n.isWall=!A.isWall,e[A.row][A.col]=n,t(e),E(!0)}else z(!0);else J(!0)},onMouseEnter:function(){if(x){if(A.row===m[0]&&A.col===m[1])return;if(A.isWall)(n=(e=Object(i.a)(r))[A.row][A.col]).isWall=!A.isWall,e[A.row][A.col]=n,t(e);k([A.row,A.col])}if(G){if(A.row===M[0]&&A.col===M[1])return;if(A.isWall)(n=(e=Object(i.a)(r))[A.row][A.col]).isWall=!A.isWall,e[A.row][A.col]=n,t(e);R([A.row,A.col])}var e,n;C&&((n=(e=Object(i.a)(r))[A.row][A.col]).isWall=!A.isWall,e[A.row][A.col]=n,t(e))},onMouseUp:function(){x&&J(!1),G&&z(!1),C&&E(!1)},children:A.row===M[0]&&A.col===M[1]?Object(I.jsx)("div",{id:"node".concat(Math.floor(window.innerWidth/15)*A.row+A.col),style:{width:13,height:13},children:Object(I.jsx)("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA5nAAAOZwGPiYJxAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAfhQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe7yhUAAAAKd0Uk5TAAECAwQGBwgJCgsMDg8QERIUFRYXGRobHh8gISQlJygpKissLS8wMjQ2Nzg7PD4/QEFFRkdISUxOUVVWV1hZW1xdYGFlZmdoa2xtbm9yd3t/gIKDhoeIjI6Pk5WWmJqbnZ+gpaiqq6ytr7Cys7W2t7i5uru8vb6/wMPGysvMzdDR0tPU1tfY2dvf4eLj5OXm5+jp6uvs7e7v8PLz9PX29/j5+vv8/f6Ucmt/AAAG8ElEQVR42u3c+ZfNBRzG8RlEYdCeZRqhReuEFKVEm0pRTLvKUkYbI1pQKaWNLGmSlJmGz7/Zr3XOMHNOJ2fm+7yeP+Hzfp1zz733e29Ly8jahHufe/3dfYf7jn2+/c11y9paLGlXrOw+Xf9c/84npztLyuZsO1uD7JM7nSZh0zcOmr+q6r0bnafpm/TSmTr/zm26xokavZlf1oX303xHavDu+rmG2p8POVNj91h/DWNdY1yqmVtXw9uWcW7VxK2v4e4tAqL7E5Den4D0/gSk9ycgvT8B6f0JSO9PQHp/AtL7E5Den4D0/gSk9ycgvT8B6f0JSO9PwGjd01UEBG/BQBEQvPbeKgJy1/Z1FQHB21xFQPBuqSIgeT1FQPI6qwhI3qdFQPJuryIgeV1FQPS+KgKSN6OKgOQ9UQREb2sREL09RUD0vi8CotdXBCRvahUByesoAqJ3XREQvfFFQPZ6CcjegSIgeruLgOi9XARE754iIPttwO8EZG9bERC9R4qA6F15moDsdRUB0Zv6KwHZe7YIiN7EowRkb2kRkL3nCcheazcB2Zu0n4DszTxCQPY6CCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIaOhmE0AAAQQQQAABBBBAAAGZAo4SQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAaN1NxBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAHNFXCMAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIICAZm4OAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEDB6BRwngAACCCCAAAIIIIAAAhI3lwACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAAC/ts2uHm4gKfcPFvAwAI3zxbQ2+7m2QL2j3XzbAErnTxbwA/jnTxbwGoXzxZwYrKLZwtY5eDZAra7d7aAM5PcO1vAEufOFvCGa2cL+M6xR+TmXSwB/a2OnS3gcrfOFjDXqbMFeCpg5Ar45WIAeNihR+ru67sYAB506Oj+1enS0f2rw6mj+1ebW0f3/8Oto/vXAceO7l8vunZ0/7rbuaP7n/Qb0ej+tdm9o/vXMgeP7n/QK0B0/7rfxaP7f+ZxoOj+tcjJo/u/7+TR/b+d6ubJ/U/6Iji6/9nFbp7c318DhPdf6+b6m/6mv+lv+pv+pr/pb/qb/qa/6W/6m/6mv+lv+pv+pr/pb/qb/qa/6W/6m/6mv+lv+pv+pr/pb/qb/qa/6a+//vrrr7/++uuvv/7666+//vrrr7/++uuvv/7666+//vrrr7/++uuvv/7666+//vrrr7/++uuvv/7666+//vrrr7/++uuvv+lv+pv+pr/pb/qb/qa/6W/6m/6mv+lv+pv+pr/pb/qb/qa/6W/6m/6mv+lv+pv+pr/pb/qb/qa/6W/6m/7666+//vrrr7/++uuvv/7666+//vrrr7/++uuvv/7666+//vrrr7/++uuvv/7666+//vrrr7/++uuvv/7666+//vrrr7/++ru5/qa/6W/6m/6mv+lv+pv+pr/pb/qb/qa/6W/6m/6mv+lv+pv+pr/pb/qb/qa/6W/6m/6mv+lv+pv+pr/pb/rrr7/++uuvv/76669/zhbqH73rT+qfvCkH9U/e2B79o/eC/tGbPaB/9Lr1j96t+mfvI/2j16l/9l7VP3s/6h+9m/XP3lr9s7dP/+yd0j96E/XP3iz9s3eH/tlbqn/2VuifvcX6Z+8m/bN3lf7ZGzOgf/YO6Z+9Tfpn7wH9sze5X//s9eifvVX6Z29Kr/7Ze0b/7F16WP/sPap/9sZ9o3/25p3SP3tLzumfvTX6Z6/1bf2zd9ku/cM/Ddilf7iAD/UnQH8C9A8WsFN/AvQnQP9gAT36Z29Cj/4E6B8tYIf+BOhPgP7BArbrT4D+0QI+GGb/NW7VzI17ZTj5z6xwqcbu8aF/N3zkNmdq8DpPDNF/77WO1OjN2Hqh/KfXT3Cipm/+7vPl/+u1q50nYQv3DJZ/YHO706Rs1uqP//1fcr9tWT7NWaI2bXnXxh1fHO87tPedDWsXXeIg//f+BmieZkzoaEKrAAAAAElFTkSuQmCC",style:{width:13,height:13,position:"absolute",border:"1px solid #7DEDFF"},draggable:!1})}):Object(I.jsx)(I.Fragment,{children:A.row===m[0]&&A.col===m[1]?Object(I.jsx)("div",{id:"node".concat(Math.floor(window.innerWidth/15)*A.row+A.col),style:{width:13,height:13},children:Object(I.jsx)("img",{src:"data:image/png;base64,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",style:{width:13,height:13,position:"absolute",border:"1px solid #7DEDFF"},draggable:!1})}):Object(I.jsx)(I.Fragment,{children:A.isWall?Object(I.jsx)("div",{className:"node",id:"node".concat(Math.floor(window.innerWidth/15)*A.row+A.col),style:{width:15,height:15,backgroundColor:"black"}}):Object(I.jsx)("div",{className:"node",id:"node".concat(Math.floor(window.innerWidth/15)*A.row+A.col),style:{width:15,height:15}})})})})}return Object(l.useEffect)((function(){"very small"===K?V(25):"small"===K?V(20):"medium"===K?V(15):"big"===K?V(10):"very big"===K&&V(5)}),[K]),Object(I.jsxs)("div",{style:{height:window.innerHeight,overflow:"hidden"},children:[Object(I.jsxs)("div",{style:{height:200,width:"100%",backgroundColor:"teal"},children:[Object(I.jsx)(d.a,{variant:"contained",color:"primary",style:{width:100},onClick:function(){!function(A){for(var e=Object(c.a)(A,2),n=e[0],l=e[1],o=0;o<=n.length;o++){if(o===n.length)return void setTimeout((function(){for(var A=0;A<l.length;A++)v(l[A],A)}),10*o+100);s(n[o],o)}}(function(A,e,n){for(var l=n[0].length,o=[A],r=[],t=[],i=[A],c=!1,a=[],d=[],g=0;g<n.length;g++){for(var f=[],s=[],v=[],u=0;u<l;u++)f.push(!1),s.push(-1),v.push(-1);r.push(f),t.push(s),d.push(v)}for(;o.length>0&&!c;){var y=o[0];o.splice(0,1),r[y.row][y.col]=!0;var w=j(y,n);for(g=0;g<w.length;g++){var B=w[g];if(B.row===e[0]&&B.col===e[1]){i.push(B),c=!0,t[B.row][B.col]=y,d[B.row][B.col]=d[y.row][y.col]+1;break}r[B.row][B.col]||(o.push(B),r[B.row][B.col]=!0,t[B.row][B.col]=y,d[B.row][B.col]=d[y.row][y.col]+1,i.push(B))}}if(c){var I=i[i.length-1];for(a.push(I);I!=A;)a.push(I),I=t[I.row][I.col];a.push(A)}return[i,a]}(r[M[0]][M[1]],m,r))},children:"Start"}),Object(I.jsx)(d.a,{variant:"contained",color:"primary",style:{width:100},onClick:function(){t(A),k([Math.floor((window.innerHeight-200)/30),Math.floor(window.innerWidth/60)]),R([Math.floor((window.innerHeight-200)/30),Math.floor(3*window.innerWidth/60)]),Object(a.a)({targets:".node",background:"#FFFFFF"})},children:"Reset"}),Object(I.jsx)(d.a,{variant:"contained",color:"primary",style:{width:100},onClick:function(){!function(A,e,l){for(var o=new(n(54)),r=0,t=0;t<A.length;t++)A[t].distance>r&&(r=A[t].distance);Object(a.a)({targets:".node",background:"#000000",duration:500,easing:"linear"}),setTimeout((function(){for(var n=0;n<A.length;n++)B(A[n],n,e,"#".concat(o.colourAt(Math.floor(A[n].distance/r*100))))}),1e3)}(function(A,e){for(var n=[],l=Object(i.a)(A),o=[l[1][1]],r=[],t=0;t<l.length;t++){for(var c=[],a=0;a<l[0].length;a++)c.push(!1),l[t][a].isWall=!0;n.push(c)}for(l[1][1].distance=0;o.length>0;){if(o.length>=4){var d=o[g=Math.floor(4*Math.random())];o.splice(g,1)}else{var g;d=o[g=Math.floor(Math.random()*o.length)],o.splice(g,1)}if(!n[d.row][d.col]&&u(d,l)&&y(d,l)){r.push(d),l[d.row][d.col].isWall=!1,n[d.row][d.col]=!0;var f=w(d,l);for(t=0;t<f.length;t++)o.unshift(f[t]),l[f[t].row][f[t].col].distance=l[d.row][d.col].distance+1}}return setTimeout((function(){e(l)}),10*r.length+1500),console.log(r),r}(r,t),r)},children:"Maze"}),Object(I.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(I.jsxs)("div",{style:{margin:"10px 20px"},children:[Object(I.jsx)("p",{children:"Maze size"}),Object(I.jsxs)(g.a,{value:K,onChange:function(A){return X(A.target.value)},children:[Object(I.jsx)(f.a,{value:"very small",children:"Very small"}),Object(I.jsx)(f.a,{value:"small",children:"Small"}),Object(I.jsx)(f.a,{value:"medium",children:"Medium"}),Object(I.jsx)(f.a,{value:"big",children:"Big"}),Object(I.jsx)(f.a,{value:"very big",children:"Very big"})]})]}),Object(I.jsxs)("div",{style:{margin:"10px 20px"},children:[Object(I.jsx)("p",{children:"Search algorithm"}),Object(I.jsxs)(g.a,{value:K,onChange:function(A){console.log(A.target.value)},children:[Object(I.jsx)(f.a,{value:"small",children:"Small"}),Object(I.jsx)(f.a,{value:"medium",children:"Medium"}),Object(I.jsx)(f.a,{value:"big",children:"Big"})]})]}),Object(I.jsxs)("div",{style:{margin:"10px 20px"},children:[Object(I.jsx)("p",{children:"Maze generating algorithm"}),Object(I.jsxs)(g.a,{value:K,onChange:function(A){console.log(A.target.value)},children:[Object(I.jsx)(f.a,{value:"small",children:"Small"}),Object(I.jsx)(f.a,{value:"medium",children:"Medium"}),Object(I.jsx)(f.a,{value:"big",children:"Big"})]})]}),Object(I.jsxs)("div",{style:{margin:"10px 20px"},children:[Object(I.jsx)("p",{children:"Show grid"}),Object(I.jsxs)(g.a,{value:K,onChange:function(A){console.log(A.target.value)},children:[Object(I.jsx)(f.a,{value:!0,children:"Yes"}),Object(I.jsx)(f.a,{value:!1,children:"No"})]})]}),Object(I.jsxs)("div",{style:{margin:"10px 20px"},children:[Object(I.jsx)("p",{children:"Maze style"}),Object(I.jsxs)(g.a,{value:K,onChange:function(A){console.log(A.target.value)},children:[Object(I.jsx)(f.a,{value:!0,children:"Black & White"}),Object(I.jsx)(f.a,{value:!1,children:"Color"})]})]}),Object(I.jsxs)("div",{style:{margin:"10px 20px"},children:[Object(I.jsx)("p",{children:"Mode"}),Object(I.jsxs)(g.a,{value:U,onChange:function(A){return N(A.target.value)},children:[Object(I.jsx)(f.a,{value:"atomatic",children:"Automatic"}),Object(I.jsx)(f.a,{value:"manual",children:"Manual"})]})]})]})]}),Object(I.jsx)("div",{children:function(A){return Object(I.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:A.map((function(A){return Object(I.jsx)("div",{style:{display:"flex",flexDirection:"row"},children:A.map((function(A){return $(A)}))})}))})}(r)})]})},O=function(A){A&&A instanceof Function&&n.e(3).then(n.bind(null,92)).then((function(e){var n=e.getCLS,l=e.getFID,o=e.getFCP,r=e.getLCP,t=e.getTTFB;n(A),l(A),o(A),r(A),t(A)}))};t.a.render(Object(I.jsx)(o.a.StrictMode,{children:Object(I.jsx)(h,{})}),document.getElementById("root")),O()}},[[59,1,2]]]);
//# sourceMappingURL=main.919cf5b9.chunk.js.map