(function(t){function i(i){for(var s,a,r=i[0],c=i[1],l=i[2],u=0,d=[];u<r.length;u++)a=r[u],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);h&&h(i);while(d.length)d.shift()();return n.push.apply(n,l||[]),e()}function e(){for(var t,i=0;i<n.length;i++){for(var e=n[i],s=!0,r=1;r<e.length;r++){var c=e[r];0!==o[c]&&(s=!1)}s&&(n.splice(i--,1),t=a(a.s=e[0]))}return t}var s={},o={app:0},n=[];function a(i){if(s[i])return s[i].exports;var e=s[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=t,a.c=s,a.d=function(t,i,e){a.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,i){if(1&i&&(t=a(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(a.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)a.d(e,s,function(i){return t[i]}.bind(null,s));return e},a.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(i,"a",i),i},a.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},a.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=i,r=r.slice();for(var l=0;l<r.length;l++)i(r[l]);var h=c;n.push([0,"chunk-vendors"]),e()})({0:function(t,i,e){t.exports=e("56d7")},"015d":function(t,i,e){"use strict";var s=e("1c02"),o=e.n(s);o.a},"034f":function(t,i,e){"use strict";var s=e("85ec"),o=e.n(s);o.a},"1c02":function(t,i,e){},"1d8a":function(t,i,e){"use strict";var s=e("334c"),o=e.n(s);o.a},"334c":function(t,i,e){},"56d7":function(t,i,e){"use strict";e.r(i);e("e260"),e("e6cf"),e("cca6"),e("a79d");var s=e("2b0e"),o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"app"}},[e("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},n=[],a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"hello"},[e("a-row",[e("a-col",{attrs:{xs:{span:5,offset:1},lg:{span:10,offset:6}}},[e("BtnGroup",{attrs:{upList:t.upList,downList:t.downList},on:{select:t.handleSelect}})],1)],1),e("a-row",{staticClass:"gap"}),e("a-row",[e("a-col",{attrs:{xs:{span:5,offset:1},lg:{span:8,offset:2}}},[e("Elevator",{attrs:{upWaitList:t.upList,downWaitList:t.downList,load:t.eleLoadList[0],capacity:t.eleCapacity,id:0,reqList:t.eleReqList[0],cancel:t.cancel,stop:t.handleStop,ignore:t.ignoreList[0]},on:{changeFloor:t.updateEle,changeState:t.updateState,changeDir:t.updateDir}})],1),e("a-col",{attrs:{xs:{span:5,offset:1},lg:{span:8,offset:2}}},[e("Elevator",{attrs:{upWaitList:t.upList,downWaitList:t.downList,load:t.eleLoadList[1],capacity:t.eleCapacity,id:1,reqList:t.eleReqList[1],cancel:t.cancel,stop:t.handleStop,ignore:t.ignoreList[1]},on:{changeFloor:t.updateEle,changeState:t.updateState,changeDir:t.updateDir}})],1)],1),e("a-row",{staticClass:"gap"}),e("a-row",[e("a-col",{attrs:{xs:{span:5,offset:1},lg:{span:8,offset:2}}},[e("Elevator",{attrs:{upWaitList:t.upList,downWaitList:t.downList,load:t.eleLoadList[2],capacity:t.eleCapacity,id:2,reqList:t.eleReqList[2],cancel:t.cancel,stop:t.handleStop,ignore:t.ignoreList[2]},on:{changeFloor:t.updateEle,changeState:t.updateState,changeDir:t.updateDir}})],1),e("a-col",{attrs:{xs:{span:5,offset:1},lg:{span:8,offset:2}}},[e("Elevator",{attrs:{upWaitList:t.upList,downWaitList:t.downList,load:t.eleLoadList[3],capacity:t.eleCapacity,id:3,reqList:t.eleReqList[3],cancel:t.cancel,stop:t.handleStop,ignore:t.ignoreList[3]},on:{changeFloor:t.updateEle,changeState:t.updateState,changeDir:t.updateDir}})],1)],1),e("a-row",{staticClass:"gap"}),e("a-row",[e("a-col",{attrs:{xs:{span:5,offset:1},lg:{span:8,offset:2}}},[e("Elevator",{attrs:{upWaitList:t.upList,downWaitList:t.downList,load:t.eleLoadList[4],capacity:t.eleCapacity,id:4,reqList:t.eleReqList[4],cancel:t.cancel,stop:t.handleStop,ignore:t.ignoreList[4]},on:{changeFloor:t.updateEle,changeState:t.updateState,changeDir:t.updateDir}})],1)],1)],1)},r=[],c=(e("d81d"),e("2909")),l=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"elevator"},[e("div",{class:{map1:0===t.direction&&0===t.doorState,map2:!(0===t.direction&&0===t.doorState)}},[e("div",{staticClass:"BtnGroup"},t._l(t.btnList,(function(i,s){return e("a-button",{key:s,class:{aButton:!t.isSelect[s],selectBtn:t.isSelect[s]},attrs:{shape:"circle",ghost:!0},on:{click:function(e){return t.handleClick(i-1)}}},[t._v(" "+t._s(i)+" ")])})),1),e("div",{staticClass:"success-box"},[e("div",{class:{face:t.content.isStop,face2:!t.content.isStop}},[e("div",{staticClass:"eye"}),e("div",{staticClass:"eye right"}),e("div",{staticClass:"mouth happy"})]),e("div",{staticClass:"shadow scale"}),e("div",{staticClass:"message"},[e("h1",{staticClass:"alert"},[t._v(t._s(t.content.stateStr))]),e("p",[t._v(t._s(t.content.poster))]),e("h1",{staticClass:"alert"},[t._v("载重："+t._s(t.load))])]),e("div",[e("h1",{staticClass:"alert-top"},[t._v(t._s(t.ctFloor+1)+"F")])])])])])},h=[],u=(e("a9e3"),{name:"Elevator",data:function(){return{btnList:Object(c["a"])(Array(20)).map((function(t,i){return i+1})),doorState:0,ctFloor:0,destination:0,isSelect:Object(c["a"])(Array(20)).map((function(){return!1})),upList:Object(c["a"])(Array(20)).map((function(){return!1})),downList:Object(c["a"])(Array(20)).map((function(){return!1})),oldDir:0,waitToRun:!1}},props:{id:Number,upWaitList:Array,downWaitList:Array,load:Number,capacity:Number,cancel:Number,ignore:Boolean},computed:{direction:function(){return this.ctFloor===this.destination?0:this.ctFloor>this.destination?-1:(console.log("已经改变dir为1了"),1)},content:function(){return 1===this.doorState?{poster:"oh baby just wait a minute.",stateStr:"Open the Door",isStop:!0,isBusy:!0}:0===this.direction?{poster:"yay, everything is ready.",stateStr:"Free",isStop:!0,isBusy:!1}:{poster:"oh baby just wait a minute.",stateStr:"Busy",isStop:!1,isBusy:!0}}},methods:{handleClick:function(t){this.$set(this.isSelect,t,!0),0===this.direction&&(console.log(t),t===this.ctFloor?0===this.doorState&&this.openDoor(!1):(console.log("改变dst了"),this.destination=t))},run:function(){var t;0!==this.direction?(console.log(this.id+this.destination+this.ctFloor),1===this.direction?(this.ctFloor++,this.upList[this.ctFloor]||this.isSelect[this.ctFloor]||0===this.direction&&this.downList[this.ctFloor]?(this.$emit("changeFloor",this.ctFloor,this.id),this.openDoor(!0)):setTimeout(this.run,1e3)):-1===this.direction&&(this.ctFloor--,this.downList[this.ctFloor]||this.isSelect[this.ctFloor]||0===this.direction&&this.upList[this.ctFloor]?(this.$emit("changeFloor",this.ctFloor,this.id),this.openDoor(!0)):setTimeout(this.run,1e3))):1===this.oldDir?(t=this.checkFromTop(),-1===t&&(t=this.checkFromBottom()),-1===t?(this.destination=this.ctFloor,this.$emit("changeState",0,this.id)):this.destination=t):-1===this.oldDir&&(t=this.checkFromBottom(),-1===t&&(t=this.checkFromTop()),-1===t?(this.destination=this.ctFloor,this.$emit("changeState",0,this.id)):this.destination=t)},checkFromBottom:function(){for(var t=0;t<=this.ctFloor;++t)if(this.isSelect[t]||this.upList[t]||this.downList[t])return t;return-1},checkFromTop:function(){for(var t=this.isSelect.length-1;t>=this.ctFloor;--t)if(this.isSelect[t]||this.upList[t]||this.downList[t])return t;return-1},openDoor:function(t){this.$emit("stop",this.ctFloor,this.id),this.doorState=1,this.isSelect[this.ctFloor]=!1,setTimeout(this.closeDoor,2500,t)},closeDoor:function(t){console.log("关门"),this.doorState=0,(t||this.waitToRun)&&(this.waitToRun=!1,setTimeout(this.run,1e3))}},watch:{direction:function(t,i){this.$emit("changeDir",t,this.id),this.oldDir=i,0!==t&&(this.$emit("changeState",1,this.id),0===this.doorState?this.run():this.waitToRun=!0)},upWaitList:function(t){for(var i=0;i<t.length;++i)t[i]!==this.upList[i]&&(!0===t[i]&&!0===this.ignore||(this.upList[i]=this.upWaitList[i]));if(this.isSelect[this.destination]||this.downList[this.destination]||this.upList[this.destination]||(this.destination=this.ctFloor),0===this.doorState&&0===this.direction)for(var e=0;e<t.length;++e)if(this.upList[e]){this.destination=e;break}},downWaitList:function(t){for(var i=0;i<t.length;++i)t[i]!==this.downList[i]&&(!1!==t[i]&&!1!==this.ignore||this.$set(this.downList,i,t[i]));if(this.isSelect[this.destination]||this.downList[this.destination]||this.upList[this.destination]||(this.destination=this.ctFloor),0===this.doorState&&0===this.direction)for(var e=0;e<t.length;++e)if(this.downList[e]){this.destination=e;break}},cancel:function(t){t>=0&&t<20&&(this.$set(this.upList,this.cancel,!1),this.$set(this.downList,this.cancel,!1))}}}),d=u,p=(e("ef87"),e("2877")),f=Object(p["a"])(d,l,h,!1,null,"cf1842a8",null),L=f.exports,g=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"map2"},[e("div",{staticClass:"BtnGroup"},t._l(t.labelList,(function(i,s){return e("div",{key:s,staticClass:"ctn"},[e("h1",{staticClass:"alert"},[t._v(t._s(i))]),e("a-button",{class:{aBtn:!t.upList[s],aBtn2:t.upList[s]},attrs:{icon:"arrow-up",shape:"circle",ghost:!0},on:{click:function(i){return t.handleClick(1,s)}}}),e("a-button",{class:{aBtn:!t.downList[s],aBtn2:t.downList[s]},attrs:{icon:"arrow-down",shape:"circle",ghost:!0},on:{click:function(i){return t.handleClick(-1,s)}}})],1)})),0)])},m=[],w=(e("d3b7"),e("25f0"),{name:"BtnGroup",data:function(){return{labelList:Object(c["a"])(Array(20)).map((function(t,i){return i+1<10?"0"+(1+i).toString():(1+i).toString()})),ghost:!0}},props:{upList:Array,downList:Array},methods:{handleClick:function(t,i){this.$emit("select",t,i)}}}),v=w,S=(e("1d8a"),Object(p["a"])(v,g,m,!1,null,"37abc79a",null)),y=S.exports,b={name:"HelloWorld",props:{msg:String,stateList:[]},components:{Elevator:L,BtnGroup:y},data:function(){return{upList:Object(c["a"])(new Array(20)).map((function(){return!1})),downList:Object(c["a"])(new Array(20)).map((function(){return!1})),eleStateList:Object(c["a"])(new Array(5)).map((function(){return 0})),eleDirList:Object(c["a"])(new Array(5)).map((function(){return 0})),eleOldDirList:Object(c["a"])(new Array(5)).map((function(){return 0})),elePosList:Object(c["a"])(new Array(5)).map((function(){return 0})),cancel:-1,ignoreList:[!1,!0,!0,!0,!0],eleLoadList:Object(c["a"])(new Array(5)).map((function(){return 0})),eleReqList:Object(c["a"])(new Array(5)).map((function(){return Object(c["a"])(new Array(20)).map((function(){return 0}))})),eleCapacity:10}},methods:{handleSelect:function(t,i){console.log("当前电梯方向数组："+this.eleDirList),this.checkPassing(t,i),1===t?this.$set(this.upList,i,!0):-1===t&&this.$set(this.downList,i,!0)},handleStop:function(t,i){console.log(i),this.cancel=t},updateDir:function(t,i){this.$set(this.eleOldDirList,i,this.eleDirList[i]),this.$set(this.eleDirList,i,t)},updateEle:function(t,i){this.$set(this.elePosList,i,t),this.upList[t]&&this.$set(this.upList,t,!1),this.downList[t]&&this.$set(this.downList,t,!1)},updateState:function(t,i){this.$set(this.eleStateList,i,t)},checkPassing:function(t,i){for(var e=0;e<this.elePosList.length;++e)0===this.eleDirList[e]&&0===this.eleStateList[e]&&(this.ignoreList[e]=!0);var s=-1;console.log(this.eleDirList+" * "+this.eleOldDirList+" XXX "+this.eleStateList);for(var o=0;o<this.eleDirList.length;++o)(this.eleDirList[o]===t||this.eleOldDirList[o]===t&&1===this.eleStateList[o])&&(1===t&&this.elePosList[o]<i||-1===t&&this.elePosList[o]>i)&&(s=o);if(-1===s)for(var n=0;n<this.elePosList.length;++n)if(0===this.eleDirList[n]&&0===this.eleStateList[n]){this.ignoreList[n]=!1;break}}}},F=b,D=(e("015d"),Object(p["a"])(F,a,r,!1,null,"e4e12c5e",null)),O=D.exports,j={name:"App",components:{HelloWorld:O}},C=j,_=(e("034f"),Object(p["a"])(C,o,n,!1,null,null,null)),$=_.exports,k=e("ba2c"),A=(e("500a"),e("4f93"));s["a"].use(A["a"]),s["a"].config.productionTip=!1,s["a"].use(k["a"]),new s["a"]({render:function(t){return t($)}}).$mount("#app")},"6d08":function(t,i,e){},"85ec":function(t,i,e){},ef87:function(t,i,e){"use strict";var s=e("6d08"),o=e.n(s);o.a}});
//# sourceMappingURL=app.b6c6f9b5.js.map