(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0d77":function(e,t,n){"use strict";(function(e){n("7779"),n("921b");o(n("66fd"));var t=o(n("60c2"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},"4c11":function(e,t,n){"use strict";var o,a=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",function(){return a}),n.d(t,"c",function(){return u}),n.d(t,"a",function(){return o})},"60c2":function(e,t,n){"use strict";n.r(t);var o=n("4c11"),a=n("d769");for(var u in a)"default"!==u&&function(e){n.d(t,e,function(){return a[e]})}(u);n("f754");var r,i=n("f0c5"),l=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=l.exports},d769:function(e,t,n){"use strict";n.r(t);var o=n("ee66"),a=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=a.a},eb42:function(e,t,n){},ee66:function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("c8c3")),u=r(n("dea5"));function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e){var t={id:e,title:null,date:null,content:null};return t.title=plus.storage.getItem("journal"+e+"_title"),t.date=plus.storage.getItem("journal"+e+"_date"),t.content=plus.storage.getItem("journal"+e+"_content"),t}var s={data:function(){return{title:"Hello",numberOfJournals:0,journals:[]}},onShow:function(){var t;for(console.log(e("index onLoad()"," at pages\\index\\index.vue:57")),o.showLoading({title:"loading..."}),this.numberOfJournals=parseInt(plus.storage.getItem("numberOfJournals"),10),this.journals=[],t=this.numberOfJournals;t>0;t--){this.journals.push(l(t));var n=plus.storage.getItem("journal"+t+"_submitted");if("false"==n){console.log(e(n," at pages\\index\\index.vue:77")),console.log(e("false"==n," at pages\\index\\index.vue:78")),console.log(e("trying to submit journal id:"+t," at pages\\index\\index.vue:79"));var r=plus.storage.getItem("journal"+t+"_title"),s=plus.storage.getItem("journal"+t+"_date"),d=plus.storage.getItem("journal"+t+"_content1"),c=plus.storage.getItem("journal"+t+"_content2"),f=plus.storage.getItem("journal"+t+"_content3"),g=plus.storage.getItem("journal"+t+"_grateful"),p=plus.storage.getItem("journal"+t+"_happy"),m=plus.storage.getItem("journal"+t+"_sad"),v=(g=parseInt(g,10),p=parseInt(p,10),m=parseInt(m,10),t),b=new a.default;b.post("https://redcap.uits.iu.edu/api/",i({token:"109C822E84832BAA0E9A842632F04772",data:'[{"recordid":"55",'.concat('"userid":','"',getApp().globalData.userID,'",','"journalid":',JSON.stringify(t),",",'"title":',JSON.stringify(r),",",'"date":','"',(0,u.default)(s,"MM/DD/YYYY").format("YYYY-MM-DD"),'",','"content1":',JSON.stringify(d),",",'"content2":',JSON.stringify(c),",",'"content3":',JSON.stringify(f),",",'"grateful":',JSON.stringify(g+1),",",'"happy":',JSON.stringify(p+1),",",'"sad":',JSON.stringify(m+1),",",'"journal_complete":"2" }]'),content:"record",format:"json",type:"flat",overwriteBehavior:"normal",forceAutoNumber:"true",returnContent:"count",returnFormat:"json"},"forceAutoNumber","true")).then(function(t){console.log(e(t," at pages\\index\\index.vue:120")),console.log(e("notepad post success"," at pages\\index\\index.vue:121")),plus.storage.setItem("journal"+v+"_submitted","true"),console.log(e(v," at pages\\index\\index.vue:123"))}).catch(function(t){console.log(e(t," at pages\\index\\index.vue:125")),console.log(e("notepad post fail"," at pages\\index\\index.vue:126"))})}}console.log(e("before hide loading in index"," at pages\\index\\index.vue:130")),o.hideLoading()},methods:{settings:function(){o.navigateTo({url:"../setting/setting"})},examples:function(){o.navigateTo({url:"../examples/examples"})},about:function(){o.navigateTo({url:"../about/about"})},newjournal:function(){var e=this.numberOfJournals+1;o.navigateTo({url:"../notepad1/notepad1?id="+e})},openJournal:function(t){console.log(e(t," at pages\\index\\index.vue:177"));var n=t.currentTarget.dataset.id;o.navigateTo({url:"../notepad1/notepad1?id="+n})}}};t.default=s}).call(this,n("0de9")["default"],n("6e42")["default"])},f754:function(e,t,n){"use strict";var o=n("eb42"),a=n.n(o);a.a}},[["0d77","common/runtime","common/vendor"]]]);