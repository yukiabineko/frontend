(this["webpackJsonpreact-frontend"]=this["webpackJsonpreact-frontend"]||[]).push([[0],{25:function(e,t,a){},36:function(e,t,a){},60:function(e,t,a){},86:function(e,t,a){"use strict";a.r(t);var c=a(1),s=a(0),n=a(17),r=a.n(n),i=(a(60),a(11)),l=a(21),j=a(6),d=(a(25),a(91)),o=a(93),b=(a(61),a(23)),h=a.n(b),u=a(28),m=a(88),O=a(52),x=a(89),p=a(90),f=a(14),g=a.n(f),v=(a(36),a(10)),w={border:"none",background:"none",color:"#333399",outline:"none",fontWeight:"bold",textDecoration:"underline"};var y=Object(j.e)(Object(v.b)((function(e){return e}))((function(e){var t=Object(s.useState)({data:localStorage.getItem("users")?JSON.parse(localStorage.getItem("users")):[]}),a=Object(i.a)(t,2),n=a[0],r=a[1];function l(){return(l=Object(u.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.get("https://uematsu-backend.herokuapp.com/users").then((function(e){localStorage.setItem("users",JSON.stringify(e.data))})).catch((function(e){console.log(e)}));case 2:r({data:JSON.parse(localStorage.getItem("users"))});case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(s.useState)(function(){return l.apply(this,arguments)}()),Object(s.useEffect)((function(){0===e.userData.length&&e.history.push("/login")})),Object(c.jsxs)("div",{className:"image",children:[Object(c.jsx)("div",{className:"text-center mt-5 mb-4",children:Object(c.jsx)("h2",{"data-testid":"usertitle",children:"\u4f1a\u54e1\u4e00\u89a7"})}),Object(c.jsx)(m.a,{children:Object(c.jsx)(O.a,{md:{span:8,offset:2},className:"p-5 bg-light shadow",children:n.data.length>0?Object(c.jsxs)(x.a,{striped:!0,bordered:!0,hover:!0,children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"text-center align-middle bg-dark text-white",children:"\u540d\u524d"}),Object(c.jsx)("th",{className:"text-center align-middle bg-dark text-white",children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),Object(c.jsx)("th",{className:"text-center align-middle bg-dark text-white"})]})}),Object(c.jsx)("tbody",{children:n.data.map((function(t){return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"text-center align-middle",children:Object(c.jsx)("button",{style:w,onClick:function(a){return t.id,void e.history.push("/users/show")},children:t.name})}),Object(c.jsx)("td",{className:"text-center align-middle",children:t.email}),Object(c.jsxs)("td",{children:[Object(c.jsx)(p.a,{variant:"primary",onClick:function(a){return c=t.id,e.editIdget(c),void e.history.push("/users/edit");var c},className:"ml-3",children:"\u7de8\u96c6"}),Object(c.jsx)(p.a,{variant:"danger",onClick:function(e){return function(e){window.confirm("\u524a\u9664\u3057\u3066\u3088\u308d\u3057\u3044\u3067\u3059\u304b\uff1f")&&g.a.delete("https://uematsu-backend.herokuapp.com/users/".concat(e)).then((function(e){alert(e.data.message)})).catch((function(e){console.log(e)}))}(t.id)},className:"ml-3",children:"\u524a\u9664"})]})]},t.name)}))})]}):Object(c.jsx)("div",{children:"\u30c7\u30fc\u30bf\u306a\u3057"})})})]})}))),N=a(18),k=a(15),C=a(92),I=a(29),S={userData:[]},D=function(e,t){var a=e.userData.slice();return a.splice(0),a.push(t.user),{userData:a}},L=function(e,t){var a=e.userData.slice();return a.splice(0),{userData:a}},G=Object(I.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":return D(e,t);case"LOGOUT":return L(e,t);default:return e}})),q=Object(j.e)(Object(v.b)((function(e){return e}))((function(e){var t=Object(s.useState)({email:"",password:""}),a=Object(i.a)(t,2),n=a[0],r=a[1],l=function(e){var t=e.target,a=t.name,c=t.value;r(Object(k.a)(Object(k.a)({},n),{},Object(N.a)({},a,c)))};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("div",{className:"text-center mt-5 mb-4",children:Object(c.jsx)("h2",{className:"text-secondary","data-testid":"logintitle",children:"\u30ed\u30b0\u30a4\u30f3"})}),Object(c.jsx)(m.a,{children:Object(c.jsx)(O.a,{md:{span:4,offset:4},className:"p-5 bg-light shadow",children:Object(c.jsxs)(C.a,{onSubmit:function(t){t.preventDefault();var a={email:n.email,password:n.password};g.a.post("https://uematsu-backend.herokuapp.com/sessions",a).then((function(t){var a={type:"LOGIN",user:t.data};e.dispatch(a),alert("\u30ed\u30b0\u30a4\u30f3\u3057\u307e\u3057\u305f"),r({name:"",email:"",password:"",confirmation:""})})).catch((function(e){alert(e)}))},"data-testid":"loginForm",children:[Object(c.jsxs)(C.a.Group,{children:[Object(c.jsx)(C.a.Label,{children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),Object(c.jsx)(C.a.Control,{type:"email",name:"email",placeholder:"(\u4f8b)sample@example.com",className:"h8",onChange:l,required:!0,value:n.email,"data-testid":"ml"})]}),Object(c.jsxs)(C.a.Group,{children:[Object(c.jsx)(C.a.Label,{children:"\u30d1\u30b9\u30ef\u30fc\u30c9"}),Object(c.jsx)(C.a.Control,{type:"password",name:"password",placeholder:"(\u4f8b)password",onChange:l,required:!0,value:n.password,"data-testid":"ps"})]}),Object(c.jsx)(p.a,{type:"submit",variant:"primary",className:"btn-block mt-4",children:"\u9001\u4fe1"}),Object(c.jsx)(p.a,{variant:"primary",onClick:function(){e.history.push("/users/new")},className:"btn-block mt-3",children:"\u65b0\u898f\u767b\u9332"})]})})})]})}))),F=Object(j.e)((function(e){var t=Object(s.useState)({display:"none"}),a=Object(i.a)(t,2),n=a[0],r=a[1],l=Object(s.useState)({name:"",email:"",password:"",confirmation:""}),j=Object(i.a)(l,2),d=j[0],o=j[1],b=function(e){var t=e.target,a=t.name,c=t.value;o(Object(k.a)(Object(k.a)({},d),{},Object(N.a)({},a,c)))};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("div",{className:"text-center mt-5 mb-4",children:Object(c.jsx)("h2",{"data-testid":"userNewtitle",children:"\u65b0\u898f\u4f1a\u54e1\u767b\u9332"})}),Object(c.jsx)(m.a,{children:Object(c.jsxs)(O.a,{md:{span:4,offset:4},className:"pt-3 pl-5 pr-5 pb-4 bg-light shadow",children:[Object(c.jsx)(p.a,{variant:"secondary",onClick:function(){e.history.push("/login")},className:"mb-3",children:"\u623b\u308b"}),Object(c.jsxs)(C.a,{onSubmit:function(e){if(e.preventDefault(),d.password===d.confirmation){var t={name:d.name,email:d.email,password:d.password,confirmation:d.confirmation};r({display:"none"}),g.a.post("https://uematsu-backend.herokuapp.com/users",t).then((function(e){alert(e.data.message),o({name:"",email:"",password:"",confirmation:""})})).catch((function(){alert("error")}))}else r({display:"block"})},children:[Object(c.jsxs)(C.a.Group,{children:[Object(c.jsx)(C.a.Label,{children:"\u304a\u540d\u524d"}),Object(c.jsx)(C.a.Control,{type:"text",name:"name",placeholder:"*\u5fc5\u9808\u3067\u3059\u3002",className:"h8",required:!0,onChange:b,value:d.name})]}),Object(c.jsxs)(C.a.Group,{children:[Object(c.jsx)(C.a.Label,{children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),Object(c.jsx)(C.a.Control,{type:"email",name:"email",placeholder:"*\u5fc5\u9808\u3067\u3059\u3002",required:!0,onChange:b,value:d.email})]}),Object(c.jsxs)(C.a.Group,{children:[Object(c.jsx)(C.a.Label,{children:"\u30d1\u30b9\u30ef\u30fc\u30c9"}),Object(c.jsx)("br",{}),Object(c.jsx)("div",{class:"balloon1",style:n,children:Object(c.jsx)("p",{children:"\u30d1\u30b9\u30ef\u30fc\u30c9\u304c\u4e00\u81f4\u3057\u3066\u307e\u305b\u3093\u3002"})}),Object(c.jsx)(C.a.Control,{type:"password",name:"password",placeholder:"*\u5fc5\u9808\u3067\u3059\u3002",required:!0,onChange:b,value:d.password})]}),Object(c.jsxs)(C.a.Group,{children:[Object(c.jsx)(C.a.Label,{children:"\u30d1\u30b9\u30ef\u30fc\u30c9\u78ba\u8a8d"}),Object(c.jsx)("br",{}),Object(c.jsx)("div",{class:"balloon1",style:n,children:Object(c.jsx)("p",{children:"\u30d1\u30b9\u30ef\u30fc\u30c9\u304c\u4e00\u81f4\u3057\u3066\u307e\u305b\u3093\u3002"})}),Object(c.jsx)(C.a.Control,{type:"password",name:"confirmation",placeholder:"*\u3082\u3046\u4e00\u5ea6\u5165\u529b\u304f\u3060\u3055\u3044\u3002",required:!0,onChange:b,value:d.confirmation})]}),Object(c.jsx)(p.a,{type:"submit",variant:"primary",className:"btn-block mt-4",children:"\u9001\u4fe1"})]})]})})]})})),J=Object(j.e)((function(e){var t=function(){var t=[];return JSON.parse(localStorage.getItem("users")).forEach((function(a){a.id===e.id&&t.push(a)})),t}(),a=Object(s.useState)({display:"none"}),n=Object(i.a)(a,2),r=n[0],l=n[1],j=Object(s.useState)({name:t[0].name,email:t[0].email,password:"",confirmation:""}),d=Object(i.a)(j,2),o=d[0],b=d[1],h=function(e){var t=e.target,a=t.name,c=t.value;b(Object(k.a)(Object(k.a)({},o),{},Object(N.a)({},a,c)))};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("div",{className:"text-center mt-5 mb-4",children:Object(c.jsxs)("h2",{children:[o.name,"\u60c5\u5831\u7de8\u96c6"]})}),Object(c.jsx)(m.a,{children:Object(c.jsxs)(O.a,{md:{span:4,offset:4},className:"pt-3 pl-5 pr-5 pb-4 bg-light shadow",children:[Object(c.jsx)(p.a,{variant:"secondary",onClick:function(){e.history.push("/")},className:"mb-3",children:"\u623b\u308b"}),Object(c.jsxs)(C.a,{onSubmit:function(t){if(t.preventDefault(),o.password===o.confirmation){var a={name:o.name,email:o.email,password:o.password,confirmation:o.confirmation};l({display:"none"}),g.a.patch("https://uematsu-backend.herokuapp.com/users/".concat(e.id),a).then((function(e){alert(e.data.message),b({name:"",email:"",password:"",confirmation:""})})).catch((function(){alert("error")}))}else l({display:"block"})},children:[Object(c.jsxs)(C.a.Group,{children:[Object(c.jsx)(C.a.Label,{children:"\u304a\u540d\u524d"}),Object(c.jsx)(C.a.Control,{type:"text",name:"name",placeholder:"*\u5fc5\u9808\u3067\u3059\u3002",className:"h8",required:!0,onChange:h,value:o.name})]}),Object(c.jsxs)(C.a.Group,{children:[Object(c.jsx)(C.a.Label,{children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),Object(c.jsx)(C.a.Control,{type:"email",name:"email",placeholder:"*\u5fc5\u9808\u3067\u3059\u3002",required:!0,onChange:h,value:o.email})]}),Object(c.jsxs)(C.a.Group,{children:[Object(c.jsx)(C.a.Label,{children:"\u30d1\u30b9\u30ef\u30fc\u30c9"}),Object(c.jsx)("br",{}),Object(c.jsx)("div",{class:"balloon1",style:r,children:Object(c.jsx)("p",{children:"\u30d1\u30b9\u30ef\u30fc\u30c9\u304c\u4e00\u81f4\u3057\u3066\u307e\u305b\u3093\u3002"})}),Object(c.jsx)(C.a.Control,{type:"password",name:"password",placeholder:"*\u5fc5\u9808\u3067\u3059\u3002",required:!0,onChange:h,value:o.password})]}),Object(c.jsxs)(C.a.Group,{children:[Object(c.jsx)(C.a.Label,{children:"\u30d1\u30b9\u30ef\u30fc\u30c9\u78ba\u8a8d"}),Object(c.jsx)("br",{}),Object(c.jsx)("div",{class:"balloon1",style:r,children:Object(c.jsx)("p",{children:"\u30d1\u30b9\u30ef\u30fc\u30c9\u304c\u4e00\u81f4\u3057\u3066\u307e\u305b\u3093\u3002"})}),Object(c.jsx)(C.a.Control,{type:"password",name:"confirmation",placeholder:"*\u3082\u3046\u4e00\u5ea6\u5165\u529b\u304f\u3060\u3055\u3044\u3002",required:!0,onChange:h,value:o.confirmation})]}),Object(c.jsx)(p.a,{type:"submit",variant:"primary",className:"btn-block mt-4",children:"\u9001\u4fe1"})]})]})})]})})),E=Object(j.e)(Object(v.b)((function(e){return e}))((function(e){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("div",{className:"text-center mt-5 mb-4  font-weight-bold",children:Object(c.jsxs)("h2",{children:[e.userData[0].name,"\u3055\u3093\u30da\u30fc\u30b8"]})}),Object(c.jsx)(m.a,{children:Object(c.jsx)(O.a,{md:{span:8,offset:2},className:"pt-3 pl-5 pr-5 pb-4 bg-light shadow",children:Object(c.jsxs)(m.a,{children:[Object(c.jsxs)(O.a,{md:{span:7},children:[Object(c.jsx)("p",{className:"font-weight-bold",children:"\u4f1a\u54e1\u60c5\u5831"}),Object(c.jsx)(x.a,{bordered:!0,className:"mt-3",children:Object(c.jsxs)("tbody",{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"bg-primary text-white w-50",children:"\u540d\u524d"}),Object(c.jsx)("td",{children:e.userData[0].name})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"bg-primary text-white w-50",children:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"}),Object(c.jsx)("td",{children:e.userData[0].email})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"bg-primary text-white w-50",children:"\u3054\u5229\u7528\u958b\u59cb\u65e5"}),Object(c.jsx)("td",{children:e.userData[0].created_at})]})]})})]}),Object(c.jsxs)(O.a,{md:{span:5},children:[Object(c.jsx)("p",{className:"font-weight-bold",children:"\u3054\u5229\u7528\u72b6\u6cc1"}),Object(c.jsx)(x.a,{bordered:!0,className:"mt-3",children:Object(c.jsxs)("tbody",{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"bg-primary text-white w-50",children:"\u3054\u5229\u7528\u56de\u6570"}),Object(c.jsx)("td",{})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"bg-primary text-white w-50",children:"\u6700\u7d42\u3054\u5229\u7528\u65e5"}),Object(c.jsx)("td",{})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"bg-primary text-white w-50",children:"\u73fe\u5728\u6ce8\u6587\u6709\u7121"}),Object(c.jsx)("td",{})]})]})})]})]})})})]})}))),T=[];var B=Object(j.e)(Object(v.b)((function(e){return e}))((function(e){function t(){return(t=Object(u.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.get("https://uematsu-backend.herokuapp.com/items").then((function(e){T=e.data})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(s.useState)(function(){return t.apply(this,arguments)}()),Object(s.useEffect)((function(){0===e.userData.length&&e.history.push("/login")})),Object(c.jsxs)("div",{className:!0,children:[Object(c.jsx)("div",{className:"text-center mt-5 mb-4",children:Object(c.jsx)("h2",{"data-testid":"usertitle",children:"\u5546\u54c1\u4e00\u89a7"})}),Object(c.jsx)(m.a,{children:Object(c.jsx)(O.a,{md:{span:8,offset:2},className:"p-5 bg-light shadow",children:e.userData.length>0?Object(c.jsxs)(x.a,{striped:!0,bordered:!0,hover:!0,children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{className:"text-center align-middle bg-dark text-white",children:"\u5546\u54c1\u540d"}),Object(c.jsx)("th",{className:"text-center align-middle bg-dark text-white",children:"\u4fa1\u683c"}),Object(c.jsx)("th",{className:"text-center align-middle bg-dark text-white",children:"\u30ab\u30c6\u30b4\u30ea\u30fc"})]})}),Object(c.jsx)("tbody",{children:T.map((function(e){return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:e.name}),Object(c.jsx)("td",{children:e.price}),Object(c.jsx)("td",{children:e.category})]})}))})]}):Object(c.jsx)("div",{children:"\u30c7\u30fc\u30bf\u306a\u3057"})})})]})})));var P=Object(v.b)((function(e){return e}))((function(e){var t=Object(s.useState)({editId:0,deleteId:0}),a=Object(i.a)(t,2),n=a[0],r=a[1];return Object(c.jsxs)(l.a,{children:[Object(c.jsxs)(d.a,{bg:"dark",children:[Object(c.jsx)(d.a.Brand,{href:"#home",className:"text-white font-weight-bold",children:"\u52a0\u5de5\u4f9d\u983c\u30a2\u30d7\u30ea"}),Object(c.jsxs)(o.a,{className:"mr-auto",children:[Object(c.jsx)(o.a.Item,{className:"text-info",children:e.userData.length>0?"".concat(e.userData[0].name,"\u3055\u3093"):""}),Object(c.jsx)(o.a.Item,{children:Object(c.jsx)(l.b,{to:"/",className:"text-light p-3",children:"HOME"})}),Object(c.jsx)(o.a.Item,{children:Object(c.jsx)(l.b,{to:"/items",className:"text-light p-3",children:"\u5546\u54c1\u4e00\u89a7"})})]}),Object(c.jsx)(o.a,{className:"mr-right",children:e.userData.length>0?Object(c.jsx)(o.a.Item,{children:Object(c.jsx)("button",{className:"logout",onClick:function(){var t={type:"LOGOUT"};e.dispatch(t)},"data-testid":"logintrue",children:"\u30ed\u30b0\u30a2\u30a6\u30c8"})}):Object(c.jsx)(o.a.Item,{children:Object(c.jsx)(l.b,{to:"/login",className:"text-light p-3","data-testid":"loginfalse",children:"\u30ed\u30b0\u30a4\u30f3"})})})]}),Object(c.jsx)(j.a,{exact:!0,path:"/",render:function(){return Object(c.jsx)(y,{editIdget:function(e){return function(e){r({editId:e,deleteId:n.deleteId})}(e)}})}}),Object(c.jsx)(j.a,{path:"/login",render:function(){return Object(c.jsx)(q,{})}}),Object(c.jsx)(j.a,{path:"/users/new",component:F}),Object(c.jsx)(j.a,{path:"/users/edit",render:function(){return Object(c.jsx)(J,{id:n.editId})}}),Object(c.jsx)(j.a,{path:"/users/show",component:E}),Object(c.jsx)(j.a,{path:"/items",component:B})]})})),U=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,94)).then((function(t){var a=t.getCLS,c=t.getFID,s=t.getFCP,n=t.getLCP,r=t.getTTFB;a(e),c(e),s(e),n(e),r(e)}))};r.a.render(Object(c.jsx)(v.a,{store:G,children:Object(c.jsx)(P,{})}),document.getElementById("root")),U()}},[[86,1,2]]]);
//# sourceMappingURL=main.aefb95f8.chunk.js.map