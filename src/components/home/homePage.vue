<template>
	<div id="homePage" style="position: relative;height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;">
		<section class="main fixed">
			<header class="header">
				<div class="hx_banner" id="wrapper_index_head">
					<ul class="ban_list" id="scroller_index_head">
						<li v-for="item in homeBannerList" ><a v-bind:href=item.url ><img v-bind:src=item.image ></a></li>
						<!--<li><a><img src="../../images/home_banner@2x.png" style="width: 750px; height: 11rem;" /></a></li>-->
					</ul>
					<div class="num-list">
						<div class="num_list" id="tag_index_head">
							<span v-for="item in homeBannerList"></span>
						</div>						
					</div>
				</div>							
			</header>				
			<article class="content">
				<div class="c-hotel-tall">
					<img src="../../images/home_notice@2x.png"/>
					<span>{{notice.text}}</span>
				</div>
				<div class="c-hotel-centent" v-on:click="goAbout">
					<div class="c-h-in c-h-img">
						<img v-bind:src="getimgUrl+storeInfo.logo"/>
					</div>
					<div class="c-h-in c-h-cent">
						<div class="c-h-name">
							<span v-text="storeInfo.name"></span>
							<img src="../../images/home_right_arrow@2x.png"/>
						</div>
						<div class="c-h-yysj">
							<span>营业时间:</span>
							<span class="c-h-time" v-text="storeInfo.open_time+'-'+storeInfo.end_time"></span>
						</div>
						<div class="c-h-phone">
							<span>联系电话:</span>
							<span><a href="tel:0755" v-text="storeInfo.phone"></a></span>
						</div>
					</div>
					<div class="c-h-in c-h-sfyy">
						<div class="c-h-yyz" v-bind:class="{active:isBusiness}"><span v-text="isBusiness&&'营业中'||'未营业'"></span></div>
					</div>
				</div>
				<div class="c-hotel-modular">
					<ul>
						<li v-for="homeItem in homeMenuList" v-on:mousedown="gotoModel(homeItem)" >
							<div class="c-mod-img"><img v-bind:src="homeMenuLogo+homeItem.image" /></div>
							<div class="c-mod-ct">
								<div class="c-mod-name">{{homeItem.module_name}}</div>
								<div class="c-mod-sm">{{homeItem.subtitle}}</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="c-h-zwf"></div>
				<div class="c-hotel-hot">
					<img src="../../images/home_hot_product@2x.png"/>
					<span class="c-hot-name">热门商品</span>
					<span class="c-hot-sm">(＜--左右滑动--＞)</span>
				</div>
				<div class="c-hot-hotel">
					<div class="hot-h" v-for="hotItem in hotProductList" v-on:mousedown="shopDetails(hotItem)" >
						<div class="hot-h-img"><img v-bind:src="getimgUrl+hotItem.image"/></div>
						<div class="hot-h-name" v-text="hotItem.name"></div>
						<div class="hot-h-price">¥ {{hotItem.price}}/{{hotItem.unit}}</div>
					</div>
				</div>
				<!--<div class="hotel-copyright">Copyright @ 万达广场 版权所有</div>-->
			</article>				
		</section>
		<div class="moveright moveright_p" style="display: none;">
			<div class="mrwarp">
				<div class=""><strong>更多功能</strong></div>
				<div class="mrtype rightswiper">
					<ul class="swiper-wrapper">
						<li class="swiper-slide">
							<a href="javascript:void(0)">酒店团购</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">特色客房展示</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">代客叫车服务</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">代客洗衣服务</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">蛋糕</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">周边旅行</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">鲜花</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">特色送餐服务</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">代客洗车服务</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">娱乐指南</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">文具</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">便客服务</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)" title="关于我们">关于我们</a>
						</li>
					</ul>
				</div>
			</div>
		</div>		
	</div>
</template>
<script type="text/javascript">
	require("./homePage.css");
    var myhScroller = null; // 水平滑动组件对象
    var menuList = [{"id":"9","module_name":"商品列表","shopid":"shop888","image":"../../images/restaurant/home_shop_list_img@2x.png","module_id":null,"status":"0","is_menu":"2","create_date":null,"modify_date":null,"orders":"1","subtitle":"您的网上微商城"},
    {"id":"10","module_name":"我的订单","shopid":"shop888","image":"home_mine_order_img@2x.png","module_id":null,"status":"0","is_menu":"2","create_date":null,"modify_date":null,"orders":"1","subtitle":"消费明白"},
    {"id":"11","module_name":"我要预约","shopid":"shop888","image":"home_mine_book_img@2x.png","module_id":null,"status":"0","is_menu":"2","create_date":null,"modify_date":null,"orders":"1","subtitle":"吃喝玩乐"},
    {"id":"12","module_name":"地图引导","shopid":"shop888","image":"home_map_img@2x.png","module_id":null,"status":"0","is_menu":"2","create_date":null,"modify_date":null,"orders":"1","subtitle":"地图指引"},
    {"id":"13","module_name":"七嘴八舌","shopid":"shop888","image":"home_chat_img@2x.png","module_id":null,"status":"0","is_menu":"2","create_date":null,"modify_date":null,"orders":"1","subtitle":"聊聊谈谈"},
    {"id":"14","module_name":"关于我们","shopid":"shop888","image":"home_about_us_img@2x.png","module_id":null,"status":"0","is_menu":"2","create_date":null,"modify_date":null,"orders":"1","subtitle":"放心消费"},
    {"id":"15","module_name":"公告栏","shopid":"shop888","image":"home_board_img@2x.png","module_id":null,"status":"0","is_menu":"2","create_date":null,"modify_date":null,"orders":"1","subtitle":"最新公告"},
    {"id":"16","module_name":"更多分类","shopid":"shop888","image":"home_more@2x.png","module_id":null,"status":"0","is_menu":"2","create_date":null,"modify_date":null,"orders":"1","subtitle":"点击查看"}]
    export default {
        data: function(){
        	return {
        		queryUel:configuration.global.serverPath,
        		homeBannerList: [],
        		homeMenuList: [],
        		hotProductList: [],
        		storeInfo:{
        			logo:"20170330/17547f168d6268fedf62028406d11640.png"
        		},
        		isBusiness:true,
        		notice:{"text":"优雅 休闲 浪漫的主题 特色 开启您的DIY生活空间"},
        		homeMenuLogo:"src/images/restaurant/",
        		getimgUrl:configuration.global.imgPath
        	}
        },    	
        mounted: function () {
	      	console.log("加载首页...");
      		//globalMethod.layerUtils.iLoading(true);
            queryScroller(this); //初始化滑动组件
            this.homeMenuList = menuList
            this.getStoreInfo();
//          this.getHomeMenu();
            this.getHotProduct();
            this.getNotice();
            globalMethod.setHscroll("homePage");
        },
        methods: {
			getStoreInfo:function(){
		         this.$http.post(configuration.global.serverPath + "/api/Product/getShop",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.storeInfo = results.data[0];
		         		 document.title = this.storeInfo.name;
		         		 sessionStorage.setItem("storeInfo",JSON.stringify(results.data[0]));
		         		 this.isBusiness = this.timeCheck(results.data[0].open_time,results.data[0].end_time)
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },
			getHomeMenu:function(){
		         this.$http.post(configuration.global.serverPath + "/api/tabbar/getHomeMenu",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.homeMenuList = results.data;
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },
			getHotProduct:function(){
		         this.$http.post(configuration.global.serverPath + "/api/Product/getHotProduct",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.hotProductList = results.data;
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },
			getNotice:function(){
		         this.$http.post(configuration.global.serverPath + "/api/Tabbar/getNotice",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.notice = results.data||this.notice;
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },	
		    gotoModel:function(item){
		    	var modelId = {
		    		"9":"lifeHome",
		    		"10":"orderAll",
		    		"11":"myReserve",
		    		"13":"messageboard",
		    		"14":"aboutOur",
		    		"15":"bulletinBoard"
		    	}
		    	this.$router.push({name:modelId[item.id]});
		    },
		    shopDetails:function(shopItem){
		    	this.$router.push({name:'shopdetails',query: {shopDetail:JSON.stringify(shopItem)}});
		    },
		    timeCheck:function(open_time,end_time){
		    	open_time = open_time || "00:00";
		    	end_time = end_time || "23:59";
		    	var dateNew = new Date();
		    	var open_hours = open_time.slice(0,open_time.indexOf(":")),open_minutes = open_time.slice(open_time.indexOf(":")+1);
		    	var end_hours = end_time.slice(0,end_time.indexOf(":")),end_minutes = end_time.slice(end_time.indexOf(":")+1);
		    	return open_hours == end_hours?Number(open_minutes)<=dateNew.getMinutes() && dateNew.getMinutes()<=Number(end_minutes):Number(open_hours)<=dateNew.getHours() && dateNew.getHours()<=Number(end_hours);
		    },
		    goAbout:function(){
		    	this.$router.push({name:"aboutOur"});
		    }
        }       
    }
    //轮播广告
    var queryScroller = function(v) {
    	var vm = v;
    	var url = vm.queryUel + "/api/Product/getBanner";
         vm.$http.post(url,{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
         	var results = response.data;
         	if(results.code === 200){
         		 vm.homeBannerList = results.data;
         		 initScroller(results.data.length);
         	}else{
         		globalMethod.layerUtils.iAlert(results.msg||"请求服务器失败");
         	}
        }, function (response) {
        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
        });
    }
    var initScroller = function(item){
    	
        var scrollOptions = {
            $wrapper: $("#wrapper_index_head"),
            $tabNav: $("#tag_index_head"), // 导航点 zepto 对象
            autoScroll: true, // 是否是自动滚动，默认 false
            autoTime: 2000, // 自动滚动的间隔时间，单位毫秒，默认 2000
            scrollEndHandler: function () {
            } 
        };
        var headElem =  document.getElementById("scroller_index_head")
        headElem.style.width = window.innerWidth *item + "px"
	    setTimeout(function(){
	     	var imgElem = headElem.getElementsByTagName("img");
	     	for(var i=0,len=imgElem.length;i<len;i++){
	     		imgElem[i].style.cssText = "width: "+window.innerWidth+"px;height:11rem;"
	     	}
	    },50);        
        myhScroller = globalMethod.iscrollUtils.hScroller(scrollOptions);
    }
    window.addEventListener("popstate", function (e){
        if (myhScroller) {
            myhScroller.destroy();
            myhScroller = null;
        }
        e.stopPropagation();
    });    
</script>
