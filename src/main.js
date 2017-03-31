import Vue from 'vue'
import VueResource from 'vue-resource'
//注册模块插件
Vue.use(VueResource);
require("./css/style.css")
//全局对象
window.globalMethod = {};
globalMethod.iscrollUtils = require("./js/plugins/iscroll/scripts/iscrollUtils.js");
globalMethod.layerUtils = require("./js/plugins/layer/layer.js");
globalMethod.setHscroll = function(elem){
	setTimeout(function() {
		document.getElementById(elem).scrollTop = 1;
	}, 0)
	document.getElementById(elem).onscroll = function () {  
        var topheight = document.getElementById(elem).scrollTop;
        if(topheight<2)document.getElementById(elem).scrollTop = 1; 
    }	
}
window.configuration = {
	"global": {
		"serverPath": "http://wx.szgulu.com/vipyun/public",//http://112.74.18.249:88/vipyun/public/index.php",
		"imgPath":"http://wx.szgulu.com/vipyun/public/uploads/",
		"shopid":localStorage.getItem("shopid")
	}
};
//启动路由
import router from './router/router'
new Vue({mode:'history',router:router}).$mount('#app');
//底部菜单栏
var footerElem = document.getElementById("footer").getElementsByTagName("li"), footerName = ["首页","菜单","购物车","会员中心"];
for(var i = footerElem.length;i--;){
	footerElem[i].getElementsByTagName("span")[0].innerText = footerName[i];
	footerElem[i].addEventListener("touchstart",function(){
		this.style.backgroundColor = "#999"
	})
	footerElem[i].addEventListener("touchend",function(){
		this.style.backgroundColor = "#fff"
	})
}

//微信自动登陆
var code = sessionStorage.getItem("code"),ua = navigator.userAgent.toLowerCase();
if(ua.indexOf('micromessenger') != -1&&code&&!sessionStorage.getItem("token")){
	Vue.http.post(configuration.global.serverPath + "/api/wxpay/wxLogin", {shopid:configuration.global.shopid,code:code}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, emulateJSON: true }).then(function(response) {
		var results = response.data;
		if(results.code === 200) {
			sessionStorage.setItem("token",results.data.token);
			sessionStorage.setItem("openid",results.data.openid);
		} 
	}, function(response) {});	
}
//购物车状态全局管理
globalMethod.changeLocalStorage = function(key,item,callback,elem){
	var commodity = {id:Number(item.id),name:item.name,unit:item.unit,price:item.price,point:item.point,num:1,image:item.image};//构建商品
	var shopCart = JSON.parse(localStorage.getItem("shopCart"))||[];
	var hasShop = false,commodNum = 0;
	for(var ii = 0,shopLength = shopCart.length;ii < shopLength;ii++){
		if(shopCart[ii].id == commodity.id){
			hasShop = true;
			key?shopCart[ii].num++:shopCart[ii].num--;
		}
		commodNum += shopCart[ii].num;
		if(shopCart[ii].num === 0){  //移除数量为0的商品
			shopCart.splice(ii,1);
			shopLength--;
		}
	}
	if(!hasShop && key){
		shopCart.push(commodity);
		commodNum++;
	}
	localStorage.setItem("shopCart",JSON.stringify(shopCart));
	var choiceElem = document.getElementById("choiceCommodityNum");
	choiceElem.innerText = commodNum;
	choiceElem.style.display = commodNum > 0?"block":"none";
	//+-动画
	if(typeof elem === "object"){
		var animfn = function(){
			elem.classList.remove('move');
			elem.removeEventListener("animationend",animfn)
			elem.removeEventListener("webkitAnimationend",animfn)
		}
		elem.classList.add("move");
		elem.addEventListener("animationend",animfn)
		elem.addEventListener("webkitAnimationend",animfn)
	}
	if(typeof callback === "function")callback();
}
//购物车显示重拾
var comCart = JSON.parse(localStorage.getItem("shopCart"))||[],commNum = 0;
for(var comIt=0,comLen=comCart.length;comIt<comLen;comIt++){
	commNum += comCart[comIt].num;
}
var choiceElem = document.getElementById("choiceCommodityNum");
choiceElem.innerText = commNum;
choiceElem.style.display = commNum > 0?"block":"none";
