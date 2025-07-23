(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/Newsbox/Newsbox"],{"1f26":function(t,e,n){"use strict";n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var u=function(){var t=this.$createElement;this._self._c},i=[]},"5a3e":function(t,e,n){"use strict";var u=n("c8e0"),i=n.n(u);i.a},8776:function(t,e,n){"use strict";n.r(e);var u=n("1f26"),i=n("bfef");for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("5a3e");var f=n("828b"),r=Object(f["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],void 0);e["default"]=r.exports},b4af:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"newsbox",props:{seqNum:{type:Number,default:1},title:{type:String,default:"默认标签"},content:{type:String,default:"这里是默认内容"},typeLabel:{type:String,default:"tz"},defaultPic:{type:String,default:"../../static/images/geren.png"},pic:{type:Array,default:function(){return[]}}},computed:{displayPic:function(){return this.pic.length>0?this.pic[0]:this.defaultPic}}};e.default=u},bfef:function(t,e,n){"use strict";n.r(e);var u=n("b4af"),i=n.n(u);for(var a in u)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=i.a},c8e0:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/Newsbox/Newsbox-create-component',
    {
        'components/Newsbox/Newsbox-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('df3c')['createComponent'](__webpack_require__("8776"))
        })
    },
    [['components/Newsbox/Newsbox-create-component']]
]);
