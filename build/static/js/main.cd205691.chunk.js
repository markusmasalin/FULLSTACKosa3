(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(38)},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(11),u=t.n(o),c=t(12),l=t(2),i=t(3),m=t.n(i),d="http://localhost:3001/api/persons",f=function(){return m.a.get(d).then(function(e){return e.data})},s=function(e){return m.a.post(d,e).then(function(e){return e.data})},h=function(e,n){return m.a.put("".concat(d,"/").concat(e),n).then(function(e){return e.data})},b=function(e){return m.a.delete("".concat(d,"/").concat(e)).then(function(e){return e.data})},g=function(e){var n=e.rows,t=e.deleteNumber;return n.map(function(e){return r.a.createElement("div",{key:e.id},e.name," ",e.number,r.a.createElement("button",{value:e.id,onClick:t},"delete"))})},p=function(e){var n=e.message;return""===n?null:null===n?null:r.a.createElement("div",{style:{color:"red",background:"lightgrey",fontSize:20,border:"solid",padding:"10px",margin:"10px"}},n)},v=function(e){var n=e.message;return""===n?null:r.a.createElement("div",{style:{color:"green",background:"lightgrey",fontSize:20,border:"solid",padding:"10px",margin:"10px"}},n)},E=function(e){var n=e.filterInput,t=e.handleFilter;return console.log(n),r.a.createElement("form",null,"rajaa n\xe4ytett\xe4vi\xe4",r.a.createElement("input",{value:n,onChange:t}))},w=function(e){var n=e.addName,t=e.newName,a=e.handleNameChange,o=e.newNumber,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,r.a.createElement("h3",null,"lis\xe4\xe4 nimi\xe4"),"nimi: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:o,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),i=Object(l.a)(u,2),m=i[0],d=i[1],j=Object(a.useState)(""),N=Object(l.a)(j,2),O=N[0],y=N[1],k=Object(a.useState)(""),C=Object(l.a)(k,2),S=C[0],T=C[1],x=Object(a.useState)(""),I=Object(l.a)(x,2),D=I[0],z=I[1],F=Object(a.useState)(""),J=Object(l.a)(F,2),L=J[0],B=J[1];Object(a.useEffect)(function(){f().then(function(e){o(e)})},[]),console.log("render",t.length,"persons");var P=t.filter(function(e){return e.name.toLowerCase().includes(S.toLowerCase())});return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(p,{message:D}),r.a.createElement(v,{message:L}),r.a.createElement(E,{filterInput:S,handleFilter:function(e){console.log(e.target.value),T(e.target.value)}}),r.a.createElement(w,{addName:function(e){e.preventDefault();var n={name:m,number:O},a=!1;if(t.forEach(function(e){e.name===n.name&&(a=!0)}),!0===a&&window.confirm("".concat(m," is already added to phonebook, replace the old number with a new one?"))){var r=t.find(function(e){return e.name===m}),u=Object(c.a)({},r,{number:n.number});h(r.id,u).then(function(e){B("The number of '".concat(r.name,"' is updated to server")),setTimeout(function(){B(null)},5e3),o(t.map(function(n){return n.id!==r.id?n:e}))}).catch(function(e){z("Name '".concat(r.name,"' was already removed from phonebook")),setTimeout(function(){z(null)},5e3),o(t.filter(function(e){return e.id!==r.id}))})}!1===a&&(o(t.concat(n)),y(""),d(""),s(n).then(function(e){o(t.concat(e)),d(""),B("".concat(n.name," is added to phonebook")),setTimeout(function(){z(null)},5e3)}).catch(function(e){z("Ups, something went wrong. Try to add  '".concat(n.name,"' again")),setTimeout(function(){z(null)},5e3)}))},newName:m,handleNameChange:function(e){console.log(e.target.value),d(e.target.value)},newNumber:O,handleNumberChange:function(e){console.log(e.target.value),y(e.target.value)}}),r.a.createElement("h3",null,"Numerot"),r.a.createElement(g,{rows:P,deleteNumber:function(e){e.preventDefault();var n=parseInt(e.target.value),a=t.filter(function(e){return e.id===n});window.confirm("Delete "+a[0].name)&&b(n).then(function(e){o(t.filter(function(e){return e.id!==n})),B("".concat(a[0].name," is deleted from the phonebook")),setTimeout(function(){B(null)},5e3)}).catch(function(e){z("Name ".concat(n.name," was already removed from server")),setTimeout(function(){z(null)},5e3)})}}))};u.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.cd205691.chunk.js.map