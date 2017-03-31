<template>
	<div id="lifeHome" style="position: relative;height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;">
		<header class="header">
			<div class="life-navigationBar">
				<div class="navB-content" v-for="(item,index) in categoryList" v-bind:class="{active:index===0}" v-on:mousedown="categoryChoice(item,$event)" >{{item.name}}</div>
			</div>	
			<div class="screen-hotel">
				<a class="screen-input" href="javascript:void(0);" v-on:click="screenExplant()" >
					<img src="../../images/life_search@2x.png" />
					<span>请输入商家或商家名称</span>
				</a>
				<input class="hotel-screen-input" type="text" name="screen" id="screenInput" value="" v-on:blur="screenInput(true)" v-model="screenValue" />
				<a class="screen-th-hotel" href="javascript:void(0);" v-on:mousedown="getProduct(false,true)" >搜索</a>
			</div>			
		</header>		
		<section class="main fixed">
			<article class="content">
				<div class="hotel-list">
					<ul id="productAll">
						<li v-for="item in productList" v-bind:id="item.id" >
							<div class="hotel-lists hotel-list-img" v-on:mousedown="shopDetails(item)"><img v-bind:src="getImgUrl+item.image" /></div>
							<div class="hotel-lists hotel-list-content">
								<div class="hotel-content-name">{{item.name}}<div class="hotel-change-hot" v-if="item.is_hot==1" >火爆</div></div>
								<div class="hotel-content-pay" v-on:mousedown="shopDetails(item)">¥ {{item.price}}元  / {{item.unit}}</div>
								<div class="hotel-content-integral" v-on:mousedown="shopDetails(item)">积分         {{item.point}}</div>
							</div>
							<div class="commodity-choice">
								<!--<div class="hotel-change-hot">热销</div>-->
								<div class="commodity-change-1 c-red1" id="red1" >-1</div>
								<div class="commodity-change-j" v-on:mousedown.stop="redCommodity(item,$event)" v-bind:style="{display:!!item.num&&'block'||'none'}" ></div>
								<div class="commodity-change-input commodityNum" v-bind:style="{display:!!item.num&&'block'||'none'}" >{{item.num}}</div>
								<div class="commodity-change-z" v-on:mousedown.stop="addCommodity(item,$event)" ></div>
								<div class="commodity-change-1 c-add1" id="add1">+1</div>
							</div>
						</li>
					</ul>
					<div class="hotel-page" v-if="productList.length > 0">
						<div class="hotel-page-b" v-on:mousedown="getProduct('back')" >
							<img src="../../images/life_previous_pages_arrow@2x.png"/>
							<span class="hotel-page-back">{{pageList.pageNo==1&&"已到首页"||"上一页"}}</span>							
						</div>
						<span class="hotel-pages-th">{{pageList.pageNo}}/{{pageList.pageAll}}</span>
						<div class="hotel-page-n" v-on:mousedown="getProduct('next')" >
							<span class="hotel-page-next">{{pageList.pageNo==pageList.pageAll&&"已到尾页"||"下一页"}}</span>
							<img src="../../images/life_next_pages_arrow@2x.png"/>
						</div>
					</div>
				</div>
				<div class="myCoupon-conter-no" v-if="productList.length == 0">
					<div class="content">
						<ul class="">
							<li>
								<!--<img src="../../images/restaurant/none_coupons_img@2x.png" alt="" />
								<p>当前无商品信息</p>-->
							</li>
						</ul>
					</div>
				</div>				
			</article>
		</section>
	</div>
</template>
<script type="text/javascript">
	require("./lifeHome.css");
    export default {
        data: function(){
        	return {
        		categoryList: [{id:"",name:"全部商品"}],
        		productList:[],
        		getStoreList:[],
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		},
        		screenValue:"",
        		isScreen:false,
        		product_category:"",
        		getImgUrl:configuration.global.imgPath
        	}
        },    	
        mounted: function () {
        	this.getStoreInfo();
        	this.getProduct();
        	globalMethod.setHscroll("lifeHome");
        },
        methods: {
			getStoreInfo:function(){
		         this.$http.post(configuration.global.serverPath + "/api/tabbar/getCategory",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.categoryList = this.categoryList.concat(results.data);
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },
			getProduct:function(page,isScreen){//page 分页  isScreen 搜索标识
				if(!page)this.isScreen = isScreen?this.screenValue == ""?false:true:false;//非点击分页按钮情况下 判断是否搜索商品模式
				var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
				var getUrl = !this.isScreen?configuration.global.serverPath + "/api/Product/getProduct":configuration.global.serverPath + "/api/Product/getSearch";//是否搜索商品
				pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数
				var shopParam = {
					shopid:configuration.global.shopid,
					page:pageNo,
					title:!this.isScreen?"":this.screenValue,
					product_category:this.product_category
				};
		        this.$http.post(getUrl,shopParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.pageList.pageAll = Math.ceil(results.data.count/10)||1;
		         		 this.pageList.pageNo = pageNo;
		         		 var shopCart = JSON.parse(localStorage.getItem("shopCart"));
		         		 this.productList = shopCart && shopCart.length > 0?this.initProductNum(shopCart,results.data.data):results.data.data;//回显选购商品
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },
		    initProductNum:function(shopCart,shopList){
		    	for(var j=shopList.length;j--;){
		    		for(var i=shopCart.length;i--;){
		    			if(shopList[j].id == shopCart[i].id)shopList[j].num = shopCart[i].num;
		    		}		    		
		    	}
		    	return shopList;
		    },
		    redCommodity:function(item,event){
		    	var inputElement = event.target.nextElementSibling;
		    	inputElement.innerText = Number(inputElement.innerText) > 0?Number(inputElement.innerText)-1:0;
		    	if(inputElement.innerText == 0){
		    		inputElement.style.display = event.target.style.display ="none";
		    	}		    	
				globalMethod.changeLocalStorage(false,item,"",event.target.previousElementSibling);
		    },
		    addCommodity:function(item,event){
		    	var inputElement = event.target.previousElementSibling;
		    	if(inputElement.innerText == 0){
		    		inputElement.style.display = inputElement.previousElementSibling.style.display ="block";
		    	}
		    	inputElement.innerText = Number(inputElement.innerText) + 1;
		    	//修改购物车状态
		    	globalMethod.changeLocalStorage(true,item,"",event.target.nextElementSibling);
		    },
        	categoryChoice:function(item,event){
        		$(event.target).addClass("active").siblings().removeClass("active");
				this.product_category = item.id;
				this.getProduct();
        	},
        	screenInput:function(isShow){
        		document.getElementsByClassName("screen-input")[0].style.display = isShow && document.getElementById("screenInput").value ==""?"block":"none";
        	},
        	screenExplant:function(){
        		document.getElementsByClassName("screen-input")[0].style.display = "none";
        		document.getElementById("screenInput").focus();
        	},
		    shopDetails:function(shopItem){
		    	this.$router.push({name:'shopdetails',query: {shopDetail:JSON.stringify(shopItem)}});
		    },
		    initChangeNum:function(elem){
//		    	elem.addEventListener("")
		    }
        }
    }
</script>
