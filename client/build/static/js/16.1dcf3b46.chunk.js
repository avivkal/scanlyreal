(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[16],{127:function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return n}));var r=a(52),n=function(){return{type:r.a.FINISHED_LOADING}},s=function(){return{type:r.a.LOADING}}},128:function(e,t,a){"use strict";var r=a(141),n=a.n(r),s=a(10);n.a.defaults.baseURL=s.k;var i=JSON.parse(localStorage.getItem("token"));n.a.defaults.headers.common.Authorization=i,n.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded",n.a.interceptors.request.use((function(e){var t=JSON.parse(localStorage.getItem("token"));return e.headers.common.Authorization||t&&(e.headers.common.Authorization=t),e}),(function(e){return Promise.reject(e)})),t.a=n.a},129:function(e,t,a){"use strict";a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return n}));var r=function(e){s()&&s().wifiPassword&&(e.wifiPassword=s().wifiPassword),localStorage.setItem("currentUser",JSON.stringify(e))},n=function(e){localStorage.setItem("token",JSON.stringify(e))},s=function(){return JSON.parse(localStorage.getItem("currentUser"))}},131:function(e,t,a){"use strict";a.d(t,"g",(function(){return f})),a.d(t,"c",(function(){return b})),a.d(t,"a",(function(){return v})),a.d(t,"d",(function(){return O})),a.d(t,"h",(function(){return u})),a.d(t,"f",(function(){return d})),a.d(t,"e",(function(){return j})),a.d(t,"b",(function(){return h}));var r=a(132),n=a.n(r),s=a(133),i=a(52),c=a(128),o=a(129),l=a(127),u=function(e,t){return function(){var a=Object(s.a)(n.a.mark((function a(r){var s;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r(Object(l.b)()),a.prev=1,a.next=4,c.a.post("/wifi",{email:Object(o.a)().email,wifiUsername:e,wifiPassword:t});case 4:s=a.sent,r(f(s.data)),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(1),r(m("\u05ea\u05e7\u05dc\u05d4",a.t0.response.data));case 11:return a.prev=11,r(Object(l.a)()),a.finish(11);case 14:case"end":return a.stop()}}),a,null,[[1,8,11,14]])})));return function(e){return a.apply(this,arguments)}}()},d=function(e,t,a,r,i,u){var d=arguments.length>6&&void 0!==arguments[6]&&arguments[6];return function(){var p=Object(s.a)(n.a.mark((function s(p){var v;return n.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return p(Object(l.b)()),n.prev=1,n.next=4,c.a.post("/settings",{email:Object(o.a)().email,shufersalUsername:e,shufersalPassword:t,ramiLevyUsername:a,ramiLevyPassword:r,selection:i,sound:u});case 4:return v=n.sent,n.next=7,p(f(v.data));case 7:return n.next=9,p(b());case 9:d||p(m("\u05e0\u05e9\u05de\u05e8","\u05db\u05dc \u05d4\u05de\u05d9\u05d3\u05e2 \u05e0\u05e9\u05de\u05e8")),n.next=16;break;case 12:n.prev=12,n.t0=n.catch(1),console.log(n.t0),p(m("\u05ea\u05e7\u05dc\u05d4",n.t0.response.data));case 16:return n.prev=16,p(Object(l.a)()),n.finish(16);case 19:case"end":return n.stop()}}),s,null,[[1,12,16,19]])})));return function(e){return p.apply(this,arguments)}}()},f=function(e){return function(t){Object(o.c)(e);try{void 0!==e.token&&null!==e.token&&""!==e.token&&(Object(o.b)(e.token),t(p(e.token)))}catch(a){console.log(a)}return{type:i.a.UPDATE_USERNAME,payload:e}}},m=function(e,t,a){return{type:i.a.OPEN_PROMPT,title:e,text:t,subjectOptional:a}},b=function(){return{type:i.a.LOGGED_IN}},p=function(e){return{type:i.a.UPDATE_TOKEN,token:e}},v=function(e,t){return function(){var a=Object(s.a)(n.a.mark((function a(r){var s;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r(Object(l.b)()),a.prev=1,a.next=4,c.a.post("/login",{email:e,password:t});case 4:return s=a.sent,a.next=7,r(f(s.data));case 7:return a.next=9,r(b());case 9:a.next=14;break;case 11:a.prev=11,a.t0=a.catch(1),r(m("\u05ea\u05e7\u05dc\u05d4",a.t0.response.data));case 14:return a.prev=14,r(Object(l.a)()),a.finish(14);case 17:case"end":return a.stop()}}),a,null,[[1,11,14,17]])})));return function(e){return a.apply(this,arguments)}}()},h=function(e,t){return function(){var a=Object(s.a)(n.a.mark((function a(r){var s;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r(Object(l.b)()),a.prev=1,a.next=4,c.a.post("/login/adminfind",{email:e,password:t});case 4:return s=a.sent,a.next=7,r(f(s.data));case 7:return a.next=9,r(b());case 9:a.next=14;break;case 11:a.prev=11,a.t0=a.catch(1),r(m("\u05ea\u05e7\u05dc\u05d4",a.t0.response.data));case 14:return a.prev=14,r(Object(l.a)()),a.finish(14);case 17:case"end":return a.stop()}}),a,null,[[1,11,14,17]])})));return function(e){return a.apply(this,arguments)}}()},j=function(e,t,a,r,i,l,f,b,p,v){return function(){var h=Object(s.a)(n.a.mark((function s(h){return n.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,c.a.post("/settings/update",{shufersalUsername:a,shufersalPassword:r,ramiLevyUsername:i,ramiLevyPassword:l,selection:f});case 2:if(!n.sent.data.should){n.next=13;break}return n.next=6,h(O(e,t));case 6:if(!Object(o.a)()){n.next=11;break}return n.next=9,h(u(p,v));case 9:return n.next=11,h(d(a,r,i,l,f,b,!0));case 11:n.next=14;break;case 13:h(m("\u05ea\u05e7\u05dc\u05d4"," \u05d4\u05d0\u05d9\u05de\u05d9\u05d9\u05dc \u05d5\u05d4\u05e1\u05d9\u05e1\u05de\u05d4 \u05dc\u05d0\u05ea\u05e8 \u05d4\u05e7\u05e0\u05d9\u05d5\u05ea \u05dc\u05d0 \u05e0\u05de\u05e6\u05d0\u05d5"));case 14:case"end":return n.stop()}}),s)})));return function(e){return h.apply(this,arguments)}}()},O=function(e,t){return function(){var a=Object(s.a)(n.a.mark((function a(r){var s;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r(Object(l.b)()),a.prev=1,a.next=4,c.a.post("/register",{email:e,password:t});case 4:return s=a.sent,a.next=7,r(f(s.data));case 7:a.next=13;break;case 9:a.prev=9,a.t0=a.catch(1),console.log(a.t0),r(m("\u05ea\u05e7\u05dc\u05d4",a.t0.response.data));case 13:return a.prev=13,r(Object(l.a)()),a.finish(13);case 16:case"end":return a.stop()}}),a,null,[[1,9,13,16]])})));return function(e){return a.apply(this,arguments)}}()}},143:function(e,t,a){"use strict";var r=a(2),n=a(4),s=a(6),i=a.n(s),c=a(0),o=a.n(c),l=a(9),u=o.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.fluid,c=e.as,u=void 0===c?"div":c,d=e.className,f=Object(n.a)(e,["bsPrefix","fluid","as","className"]),m=Object(l.a)(a,"container"),b="string"===typeof s?"-"+s:"-fluid";return o.a.createElement(u,Object(r.a)({ref:t},f,{className:i()(d,s?""+m+b:m)}))}));u.displayName="Container",u.defaultProps={fluid:!1},t.a=u},196:function(e,t,a){"use strict";var r=a(2),n=a(4),s=a(6),i=a.n(s),c=a(0),o=a.n(c),l=(a(80),a(7)),u=a.n(l),d={type:u.a.string,tooltip:u.a.bool,as:u.a.elementType},f=o.a.forwardRef((function(e,t){var a=e.as,s=void 0===a?"div":a,c=e.className,l=e.type,u=void 0===l?"valid":l,d=e.tooltip,f=void 0!==d&&d,m=Object(n.a)(e,["as","className","type","tooltip"]);return o.a.createElement(s,Object(r.a)({},m,{ref:t,className:i()(c,u+"-"+(f?"tooltip":"feedback"))}))}));f.displayName="Feedback",f.propTypes=d;var m=f,b=o.a.createContext({controlId:void 0}),p=a(9),v=o.a.forwardRef((function(e,t){var a=e.id,s=e.bsPrefix,l=e.bsCustomPrefix,u=e.className,d=e.type,f=void 0===d?"checkbox":d,m=e.isValid,v=void 0!==m&&m,h=e.isInvalid,j=void 0!==h&&h,O=e.isStatic,x=e.as,y=void 0===x?"input":x,g=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","className","type","isValid","isInvalid","isStatic","as"]),w=Object(c.useContext)(b),P=w.controlId,N=w.custom?[l,"custom-control-input"]:[s,"form-check-input"],k=N[0],I=N[1];return s=Object(p.a)(k,I),o.a.createElement(y,Object(r.a)({},g,{ref:t,type:f,id:a||P,className:i()(u,s,v&&"is-valid",j&&"is-invalid",O&&"position-static")}))}));v.displayName="FormCheckInput";var h=v,j=o.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.bsCustomPrefix,l=e.className,u=e.htmlFor,d=Object(n.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(c.useContext)(b),m=f.controlId,v=f.custom?[s,"custom-control-label"]:[a,"form-check-label"],h=v[0],j=v[1];return a=Object(p.a)(h,j),o.a.createElement("label",Object(r.a)({},d,{ref:t,htmlFor:u||m,className:i()(l,a)}))}));j.displayName="FormCheckLabel";var O=j,x=o.a.forwardRef((function(e,t){var a=e.id,s=e.bsPrefix,l=e.bsCustomPrefix,u=e.inline,d=void 0!==u&&u,f=e.disabled,v=void 0!==f&&f,j=e.isValid,x=void 0!==j&&j,y=e.isInvalid,g=void 0!==y&&y,w=e.feedbackTooltip,P=void 0!==w&&w,N=e.feedback,k=e.className,I=e.style,C=e.title,E=void 0===C?"":C,L=e.type,S=void 0===L?"checkbox":L,F=e.label,U=e.children,R=e.custom,T=e.as,V=void 0===T?"input":T,A=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","title","type","label","children","custom","as"]),D="switch"===S||R,G=D?[l,"custom-control"]:[s,"form-check"],z=G[0],J=G[1];s=Object(p.a)(z,J);var M=Object(c.useContext)(b).controlId,B=Object(c.useMemo)((function(){return{controlId:a||M,custom:D}}),[M,D,a]),_=D||null!=F&&!1!==F&&!U,q=o.a.createElement(h,Object(r.a)({},A,{type:"switch"===S?"checkbox":S,ref:t,isValid:x,isInvalid:g,isStatic:!_,disabled:v,as:V}));return o.a.createElement(b.Provider,{value:B},o.a.createElement("div",{style:I,className:i()(k,s,D&&"custom-"+S,d&&s+"-inline")},U||o.a.createElement(o.a.Fragment,null,q,_&&o.a.createElement(O,{title:E},F),(x||g)&&o.a.createElement(m,{type:x?"valid":"invalid",tooltip:P},N))))}));x.displayName="FormCheck",x.Input=h,x.Label=O;var y=x,g=o.a.forwardRef((function(e,t){var a=e.id,s=e.bsPrefix,l=e.bsCustomPrefix,u=e.className,d=e.isValid,f=e.isInvalid,m=e.lang,v=e.as,h=void 0===v?"input":v,j=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","lang","as"]),O=Object(c.useContext)(b),x=O.controlId,y=O.custom?[l,"custom-file-input"]:[s,"form-control-file"],g=y[0],w=y[1];return s=Object(p.a)(g,w),o.a.createElement(h,Object(r.a)({},j,{ref:t,id:a||x,type:"file",lang:m,className:i()(u,s,d&&"is-valid",f&&"is-invalid")}))}));g.displayName="FormFileInput";var w=g,P=o.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.bsCustomPrefix,l=e.className,u=e.htmlFor,d=Object(n.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(c.useContext)(b),m=f.controlId,v=f.custom?[s,"custom-file-label"]:[a,"form-file-label"],h=v[0],j=v[1];return a=Object(p.a)(h,j),o.a.createElement("label",Object(r.a)({},d,{ref:t,htmlFor:u||m,className:i()(l,a),"data-browse":d["data-browse"]}))}));P.displayName="FormFileLabel";var N=P,k=o.a.forwardRef((function(e,t){var a=e.id,s=e.bsPrefix,l=e.bsCustomPrefix,u=e.disabled,d=void 0!==u&&u,f=e.isValid,v=void 0!==f&&f,h=e.isInvalid,j=void 0!==h&&h,O=e.feedbackTooltip,x=void 0!==O&&O,y=e.feedback,g=e.className,P=e.style,k=e.label,I=e.children,C=e.custom,E=e.lang,L=e["data-browse"],S=e.as,F=void 0===S?"div":S,U=e.inputAs,R=void 0===U?"input":U,T=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","disabled","isValid","isInvalid","feedbackTooltip","feedback","className","style","label","children","custom","lang","data-browse","as","inputAs"]),V=C?[l,"custom"]:[s,"form-file"],A=V[0],D=V[1];s=Object(p.a)(A,D);var G=Object(c.useContext)(b).controlId,z=Object(c.useMemo)((function(){return{controlId:a||G,custom:C}}),[G,C,a]),J=null!=k&&!1!==k&&!I,M=o.a.createElement(w,Object(r.a)({},T,{ref:t,isValid:v,isInvalid:j,disabled:d,as:R,lang:E}));return o.a.createElement(b.Provider,{value:z},o.a.createElement(F,{style:P,className:i()(g,s,C&&"custom-file")},I||o.a.createElement(o.a.Fragment,null,C?o.a.createElement(o.a.Fragment,null,M,J&&o.a.createElement(N,{"data-browse":L},k)):o.a.createElement(o.a.Fragment,null,J&&o.a.createElement(N,null,k),M),(v||j)&&o.a.createElement(m,{type:v?"valid":"invalid",tooltip:x},y))))}));k.displayName="FormFile",k.Input=w,k.Label=N;var I=k,C=(a(63),o.a.forwardRef((function(e,t){var a,s,l=e.bsPrefix,u=e.bsCustomPrefix,d=e.type,f=e.size,m=e.htmlSize,v=e.id,h=e.className,j=e.isValid,O=void 0!==j&&j,x=e.isInvalid,y=void 0!==x&&x,g=e.plaintext,w=e.readOnly,P=e.custom,N=e.as,k=void 0===N?"input":N,I=Object(n.a)(e,["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),C=Object(c.useContext)(b).controlId,E=P?[u,"custom"]:[l,"form-control"],L=E[0],S=E[1];if(l=Object(p.a)(L,S),g)(s={})[l+"-plaintext"]=!0,a=s;else if("file"===d){var F;(F={})[l+"-file"]=!0,a=F}else if("range"===d){var U;(U={})[l+"-range"]=!0,a=U}else if("select"===k&&P){var R;(R={})[l+"-select"]=!0,R[l+"-select-"+f]=f,a=R}else{var T;(T={})[l]=!0,T[l+"-"+f]=f,a=T}return o.a.createElement(k,Object(r.a)({},I,{type:d,size:m,ref:t,readOnly:w,id:v||C,className:i()(h,a,O&&"is-valid",y&&"is-invalid")}))})));C.displayName="FormControl";var E=Object.assign(C,{Feedback:m}),L=o.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,l=e.children,u=e.controlId,d=e.as,f=void 0===d?"div":d,m=Object(n.a)(e,["bsPrefix","className","children","controlId","as"]);a=Object(p.a)(a,"form-group");var v=Object(c.useMemo)((function(){return{controlId:u}}),[u]);return o.a.createElement(b.Provider,{value:v},o.a.createElement(f,Object(r.a)({},m,{ref:t,className:i()(s,a)}),l))}));L.displayName="FormGroup";var S=L,F=a(108),U=o.a.forwardRef((function(e,t){var a=e.as,s=void 0===a?"label":a,l=e.bsPrefix,u=e.column,d=e.srOnly,f=e.className,m=e.htmlFor,v=Object(n.a)(e,["as","bsPrefix","column","srOnly","className","htmlFor"]),h=Object(c.useContext)(b).controlId;l=Object(p.a)(l,"form-label");var j="col-form-label";"string"===typeof u&&(j=j+" "+j+"-"+u);var O=i()(f,l,d&&"sr-only",u&&j);return m=m||h,u?o.a.createElement(F.a,Object(r.a)({as:"label",className:O,htmlFor:m},v)):o.a.createElement(s,Object(r.a)({ref:t,className:O,htmlFor:m},v))}));U.displayName="FormLabel",U.defaultProps={column:!1,srOnly:!1};var R=U,T=o.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.className,c=e.as,l=void 0===c?"small":c,u=e.muted,d=Object(n.a)(e,["bsPrefix","className","as","muted"]);return a=Object(p.a)(a,"form-text"),o.a.createElement(l,Object(r.a)({},d,{ref:t,className:i()(s,a,u&&"text-muted")}))}));T.displayName="FormText";var V=T,A=o.a.forwardRef((function(e,t){return o.a.createElement(y,Object(r.a)({},e,{ref:t,type:"switch"}))}));A.displayName="Switch",A.Input=y.Input,A.Label=y.Label;var D=A,G=a(26),z=Object(G.a)("form-row"),J=o.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.inline,c=e.className,l=e.validated,u=e.as,d=void 0===u?"form":u,f=Object(n.a)(e,["bsPrefix","inline","className","validated","as"]);return a=Object(p.a)(a,"form"),o.a.createElement(d,Object(r.a)({},f,{ref:t,className:i()(c,l&&"was-validated",s&&a+"-inline")}))}));J.displayName="Form",J.defaultProps={inline:!1},J.Row=z,J.Group=S,J.Control=E,J.Check=y,J.File=I,J.Switch=D,J.Label=R,J.Text=V;t.a=J},344:function(e,t,a){},631:function(e,t,a){"use strict";a.r(t);var r=a(66),n=a(41),s=a(42),i=a(44),c=a(43),o=a(3),l=a(0),u=a(31),d=a(131),f=a(10),m=a(129),b=a(108),p=a(143),v=a(196),h=a(643),j=a(109),O=a(128),x=a(67),y=a(127),g=(a(344),a(121)),w=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var s=arguments.length,i=new Array(s),c=0;c<s;c++)i[c]=arguments[c];return(e=t.call.apply(t,[this].concat(i))).state={shufersalUsername:"",shufersalPassword:"",ramiLevyUsername:"",ramiLevyPassword:"",selection:"Shufersal",sound:!0},e.componentDidMount=function(){e.props.loggedIn?e.loadData():Object(m.a)()?(e.props.setLoggedIn(),e.loadData()):e.props.history.push(f.h)},e.loadData=function(){e.props.load();try{O.a.post("/details/",{email:Object(m.a)().email}).then((function(t){var a=t.data;""!==a.selection&&void 0!==a.selection&&null!==a.selection||(a.selection="Shufersal"),e.setState({shufersalUsername:a.shufersalUsername,shufersalPassword:a.shufersalPassword,ramiLevyUsername:a.ramiLevyUsername,ramiLevyPassword:a.ramiLevyPassword,selection:a.selection,sound:a.sound})}))}catch(t){e.props.openPrompt("\u05ea\u05e7\u05dc\u05d4","\u05dc\u05d0 \u05e0\u05d9\u05ea\u05df \u05dc\u05d1\u05e6\u05e2 \u05d0\u05ea \u05d4\u05e4\u05e2\u05d5\u05dc\u05d4")}finally{e.props.finishedLoading()}},e.onSubmit=function(t){t.preventDefault(),e.props.updateSettings(e.state.shufersalUsername,e.state.shufersalPassword,e.state.ramiLevyUsername,e.state.ramiLevyPassword,e.state.selection,e.state.sound)},e.onChange=function(t){e.setState(Object(r.a)({},t.target.name,t.target.value))},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return this.props.loading?Object(o.jsx)(b.a,{xs:12,className:"d-flex justify-content-center spinner-style",children:Object(o.jsx)(g.a,{})}):Object(o.jsx)(p.a,{children:Object(o.jsx)(v.a,{onSubmit:this.onSubmit,className:"align-right margin",children:Object(o.jsxs)(b.a,{xs:12,lg:6,className:"float-right",children:[Object(o.jsxs)(h.a,{children:[Object(o.jsx)(h.a.Toggle,{variant:"dark",id:"dropdown-basic",className:"margin-cart",children:"Shufersal"===this.state.selection?"\u05e9\u05d5\u05e4\u05e8\u05e1\u05dc":"\u05e8\u05de\u05d9 \u05dc\u05d5\u05d9"}),"\u05d1\u05d7\u05e8 \u05e2\u05d2\u05dc\u05d4",Object(o.jsxs)(h.a.Menu,{className:"margin-cart",children:[Object(o.jsx)(h.a.Item,{onClick:function(){return e.setState({selection:"Shufersal"})},children:"\u05e9\u05d5\u05e4\u05e8\u05e1\u05dc"}),Object(o.jsx)(h.a.Item,{onClick:function(){return e.setState({selection:"Rami Levy"})},children:"\u05e8\u05de\u05d9 \u05dc\u05d5\u05d9"})]})]}),Object(o.jsxs)("div",{className:"form-margin-top",children:["Shufersal"===this.state.selection&&Object(o.jsxs)("div",{children:[Object(o.jsxs)(v.a.Group,{controlId:"formBasicEmail",children:[Object(o.jsx)(v.a.Label,{children:"\u05e9\u05d5\u05e4\u05e8\u05e1\u05dc \u05d0\u05d9\u05de\u05d9\u05d9\u05dc"}),Object(o.jsx)(v.a.Control,{name:"shufersalUsername",type:"text",placeholder:"\u05d4\u05db\u05e0\u05e1 \u05de\u05d9\u05d9\u05dc \u05dc\u05e9\u05d5\u05e4\u05e8\u05e1\u05dc",onChange:function(t){return e.onChange(t)},value:this.state.shufersalUsername})]}),Object(o.jsxs)(v.a.Group,{controlId:"formBasicPassword",children:[Object(o.jsx)(v.a.Label,{children:"\u05e9\u05d5\u05e4\u05e8\u05e1\u05dc \u05e1\u05d9\u05e1\u05de\u05d4"}),Object(o.jsx)(v.a.Control,{name:"shufersalPassword",type:"password",placeholder:"\u05d4\u05db\u05e0\u05e1 \u05e1\u05d9\u05e1\u05de\u05d4 \u05dc\u05e9\u05d5\u05e4\u05e8\u05e1\u05dc",onChange:function(t){return e.onChange(t)},value:this.state.shufersalPassword})]})]}),"Shufersal"!==this.state.selection&&Object(o.jsxs)("div",{children:[Object(o.jsxs)(v.a.Group,{controlId:"formBasicEmail",children:[Object(o.jsx)(v.a.Label,{children:"\u05e8\u05de\u05d9 \u05dc\u05d5\u05d9 \u05d0\u05d9\u05de\u05d9\u05d9\u05dc"}),Object(o.jsx)(v.a.Control,{name:"ramiLevyUsername",type:"text",placeholder:"\u05d4\u05db\u05e0\u05e1 \u05de\u05d9\u05d9\u05dc \u05dc\u05e8\u05de\u05d9 \u05dc\u05d5\u05d9",onChange:function(t){return e.onChange(t)},value:this.state.ramiLevyUsername})]}),Object(o.jsxs)(v.a.Group,{controlId:"formBasicPassword",children:[Object(o.jsx)(v.a.Label,{children:"\u05e8\u05de\u05d9 \u05dc\u05d5\u05d9 \u05e1\u05d9\u05e1\u05de\u05d4"}),Object(o.jsx)(v.a.Control,{name:"ramiLevyPassword",type:"password",placeholder:"\u05d4\u05db\u05e0\u05e1 \u05e1\u05d9\u05e1\u05de\u05d4 \u05dc\u05e8\u05de\u05d9 \u05dc\u05d5\u05d9",onChange:function(t){return e.onChange(t)},value:this.state.ramiLevyPassword})]})]}),Object(o.jsx)(v.a.Group,{controlId:"formBasicCheckbox",className:"margin-sound",children:Object(o.jsx)(v.a.Check,{name:"sound",type:"checkbox",label:"\u05ea\u05d2\u05d5\u05d1\u05d5\u05ea \u05d0\u05d5\u05d3\u05d9\u05d5 \u05de\u05d4\u05de\u05db\u05e9\u05d9\u05e8",onChange:function(t){return e.setState({sound:t.target.checked})},checked:this.state.sound})}),Object(o.jsx)(j.a,{variant:"primary",type:"submit",children:"\u05e9\u05de\u05d5\u05e8"})]})]})})})}}]),a}(l.Component);t.default=Object(u.b)((function(e){return{currentUser:e.main.currentUser,loggedIn:e.main.loggedIn,loading:e.loading.loading}}),(function(e){return{updateCurrentUser:function(t){return e(d.g(t))},setLoggedIn:function(){return e(d.c())},updateSettings:function(t,a,r,n,s,i){return e(d.f(t,a,r,n,s,i))},openPrompt:function(t,a){return e(x.b(t,a))},load:function(){return e(y.b())},finishedLoading:function(){return e(y.a())}}}))(w)}}]);
//# sourceMappingURL=16.1dcf3b46.chunk.js.map