(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{189:function(t,e,r){"use strict";e.a=function(t,e){t.isDev?e("debug",(function(){var t;return(t=console).log.apply(t,arguments)})):e("debug",(function(){}))}},246:function(t,e,r){var content=r(332);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(44).default)("38cbaa69",content,!0,{sourceMap:!1})},260:function(t){t.exports=JSON.parse('{"indexPage":{"theCanvas":{"theHandwriting":"手書き","draw":"書く","eraser":"消す","reset":"リセット","download":"ダウンロード","setImageA":"画像Aを貼る","setImageB":"画像Bを貼る"}}}')},262:function(t,e,r){"use strict";var n=r(391),o=r(394),l=r(395),c=r(393),f=r(392),d=r(259),h=(r(154),r(0).a.extend({name:"DefaultLayout",data:function(){return{fixed:!1,title:"Vuetify.js"}}})),_=r(89),component=Object(_.a)(h,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e(n.a,{attrs:{dark:""}},[e(o.a,{attrs:{fixed:"",app:""}},[e(d.a,[t._v(t._s(t.title))])],1),t._v(" "),e(f.a,[e(l.a,[e("Nuxt")],1)],1),t._v(" "),e(c.a,{attrs:{absolute:!t.fixed,app:""}},[e("span",[t._v("© "+t._s((new Date).getFullYear()))])])],1)}),[],!1,null,null,null);e.a=component.exports},283:function(t,e,r){r(284),t.exports=r(285)},321:function(t,e,r){"use strict";r.r(e);e.default=function(t){t.app.$debug(JSON.stringify({hereIs:"middleware/access-logging",fullPathIs:t.route.fullPath}))}},331:function(t,e,r){"use strict";r(246)},332:function(t,e,r){var n=r(43)((function(i){return i[1]}));n.push([t.i,"h1[data-v-44e95fb5]{font-size:20px}",""]),n.locals={},t.exports=n},78:function(t,e,r){"use strict";var n=r(391),o=r(0).a.extend({name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}},mounted:function(){this.$debug({hereIs:"layout/error",message:this.error.message,statusCode:this.error.statusCode})}}),l=(r(331),r(89)),component=Object(l.a)(o,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e(n.a,{attrs:{dark:""}},[404===t.error.statusCode?e("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):e("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),e("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"44e95fb5",null);e.a=component.exports}},[[283,15,2,16]]]);