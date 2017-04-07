<template>
	<div id="orderAll" style="position: relative;height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;">
		<section class="main fixed" style="background-color:e5e5e5;">
			<div class="cy-content" id="has_orders" style="display: none;background-color:#e5e5e5;">
				<ul>
					<li v-for="item in orderList">
						<div class="cy-order" v-on:click="orderDetail(item)">
							<!--<span class="cy-li-img"></span>-->
							<span class="cy-li-order">订单编号:<em v-text="item.id"></em></span>
							<span class="cy-no-pay" v-text="item.pay_status==0&&'待处理'||item.pay_status==1&&'未支付'||item.pay_status==2&&'已支付'||item.pay_status==3&&'已完成'"></span>
						</div>
						<div class="content-allname" v-on:click="orderDetail(item)">
							<div class="cy-new" v-for="orTr in item.order">
								<div class="cy-new-content1">
									<img v-bind:src="getImgUrl+orTr.image" alt="" />
								</div>
								<div class="cy-new-content2">
									<span v-text="orTr.product_name"></span>
								</div>
								<div class="cy-new-content3">
									<p v-text="'x'+orTr.num"></p>
									<div class="cy-new-price">
										<p class="p2"></p>
										<p class="p3" v-text="'￥'+orTr.total+'元'"></p>
									</div>
								</div>
							</div>	
						</div>
						<div class="cy-consume">
							<div class="cy-consume-content2">
								<div class="cy-consume-content2-number3">下单时间：<span v-text="item.create_time"></span></div>
								<div class="cy-consume-content2-number4">
									<span class="bottom-money"><em style="font-size: 1rem;color: #333;">合计：</em><em v-text="'￥'+item.total"></em></span>
									<span @click="deleteOrder(item)" v-text="item.pay_status==0||item.pay_status==1?'取消订单':'删除订单'"></span>
									<span class="input2" @click="payOrders(item)" v-if="item.pay_status==0||item.pay_status==1">立即支付</span>
									<span class="input2" @click="choiceOrder(item)" v-if="item.pay_status==2||item.pay_status==3">再来一单</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="hotel-page">
					<div class="hotel-page-b" v-on:mousedown="getOrderList('back')" >
						<img src="../../images/life_previous_pages_arrow@2x.png"/>
						<span class="hotel-page-back">{{pageList.pageNo==1&&"已到首页"||"上一页"}}</span>							
					</div>
					<span class="hotel-pages-th">{{pageList.pageNo}}/{{pageList.pageAll}}</span>
					<div class="hotel-page-n" v-on:mousedown="getOrderList('next')" >
						<span class="hotel-page-next">{{pageList.pageNo==pageList.pageAll&&"已到尾页"||"下一页"}}</span>
						<img src="../../images/life_next_pages_arrow@2x.png"/>
					</div>
				</div>				
			</div>	
			<div id="no_order" class="order-no" style="display: none;height:calc(100vh);background-color:#fff;">
				<div class="content">
					<ul class="">
						<li>
							<img src="../../images/restaurant/none_product_img@2x.png" alt="" />
							<p>您还没有订单，赶紧行动吧！您可以</p>
						</li>
					</ul>
				</div>
				<div class="fabu"><router-link :to="{name:'lifeHome'}" tag="span" class="btn">点击选购</router-link></div>
			</div>			
		</section>
	</div>
</template>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		orderList:[],
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		},
        		getImgUrl:configuration.global.imgPath
        	}
        },    	
        mounted: function () {
            sessionStorage.removeItem("orderDetail");
            this.getOrderList();
        },
        methods: {
		    getOrderList:function(page){
		    	var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
		    	pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数
		    	var orderParam = {
		    		shopid:configuration.global.shopid,
		    		token:sessionStorage.getItem("token"),
		    		page:pageNo
		    	}
		        this.$http.post(configuration.global.serverPath + "/api/order/getOrder",orderParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200 && results.data.data.length > 0){
		         		var dataList = results.data.data;
		         		for(var i=dataList.length;i--;){
		         			if(dataList[i].order && dataList[i].order.length === 0){
		         				dataList[i].order[0] = JSON.parse(JSON.stringify(dataList[i]))
		         			}
		         		}
		         		this.orderList = dataList;
		         		this.pageList.pageAll = Math.ceil(results.data.count/10)||1;
		         		this.pageList.pageNo = pageNo;
		         		document.getElementById("has_orders").style.display = "block"
		         		document.getElementById("no_order").style.display = "none"
		         	}else{
		         		document.getElementById("has_orders").style.display = "none"
		         		document.getElementById("no_order").style.display = "block"		         		
		         	}
		         	globalMethod.setHscroll("orderAll");
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });	
		    },
		    orderDetail:function(item){
		    	sessionStorage.setItem("orderDetail",JSON.stringify(item));
		    	this.$router.push({name:"orderDetail"});
		    },
		    payOrders:function(item){
		    	sessionStorage.setItem("payOrder",JSON.stringify({order:item.id,money:item.total}));
		    	sessionStorage.setItem("payItem",JSON.stringify(item));
		    	this.$router.push({name:"orderPay"});
		    },
		    choiceOrder:function(item){
		    	this.$router.push({name:"lifeHome"});
		    },
		    deleteOrder:function(item){
		    	var deleParam = {
		    		shopid:configuration.global.shopid,
		    		token:sessionStorage.getItem("token"),		    	
		    		orderId:item.id
		    	}
		        this.$http.post(configuration.global.serverPath + "/api/order/deleteOrder",deleParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
//		         		globalMethod.layerUtils.iAlert(results.message);
		         		this.getOrderList();
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });		    	
		    }
        }
    }
</script>
<style>
.cy-content > ul > li {
	background-color: #fff;
}
.cy-content > ul > li .content-allname{
    max-height: 17.5rem;
    overflow-y: auto;
    overflow-x: hidden;
}	
.cy-order{
    position: relative;
    width:100%;
    height:3.2666666666666666rem;
    background: #fff;
    font-size:0.8666666666666667rem;
    color:#666666;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    letter-spacing:0.03rem;
}
.cy-order .cy-li-img{
    margin: 0 0.6rem 0 0.8rem;
    width: 1rem;
    height: 1.0333333333333334rem;
    background:url("../../images/restaurant/shop_selected_img@2x.png") no-repeat;
    background-size:100%;
}
.cy-order .cy-li-order{
    margin-left: 0.8rem;
}
.cy-order > span.active{
    background:url("../../images/restaurant/shop_unselected_img@2x.png") no-repeat;
    background-size: 100%;
}
.cy-order .cy-no-pay{
    position: absolute;
    right: 0.8rem;
    display: inline-block;
    height: 3.26rem;
    line-height: 3.26rem;
}
/*列表2*/
.cy-new{
    position: relative;
    width:100%;
    display:-webkit-flex;
    display:flex;
    background-color:#f5f5f5;
    height:4.733333333333333rem;
    margin-bottom: 0.2rem;
}
.cy-new .cy-new-content1{
    padding-left:0.8rem;
    height:4.733333333333333rem;
}
.cy-new .cy-new-content1 >img{

    margin-top:0.5333333333333333rem;

    width:3.7333333333333334rem;
    height:3.7333333333333334rem;
}

.cy-new .cy-new-content2{
    padding-left:0.6rem;
    height:6.8rem;
    height:4.733333333333333rem;
    font-size:0.8666666666666667rem;
    color:#303030;
    padding-top:0.5333333333333333rem;
    padding-right:0.8rem;
}
.cy-new .cy-new-content3{
    position: absolute;
    right: 0.8rem;
    height:4.733333333333333rem;
    text-align:right;
    font-size:0.85rem;
    color:#303030;
    padding-top:0.6666666666666666rem;

}
.cy-new .cy-new-content3 .cy-new-price{

    font-size:0.8666666666666667rem;
    margin-top:-0.3333333333333333rem;
}
.cy-new .cy-new-content3 .cy-new-price >.p2{
    height: 1.3333333333333333rem
}


/*列表3*/
.cy-consume{
    width:100%;
    display:-webkit-flex;
    display:flex;

    background:#fff;
    margin-bottom: 0.5rem;
}

.cy-consume .cy-consume-content1 .cy-consume-content1-number{
    font-size:0.8666666666666667rem;
    color:#9a9a9a;

}

.cy-consume .cy-consume-content2{
    -webkit-flex:2.5;
    flex:2.5;
    text-align:right;
    font-size:0.8666666666666667rem;
    color:#9a9a9a;
    padding-top:0.5rem;
    padding-right:0.8rem;
    padding-bottom:0.6333333333333333rem;

}
.cy-consume .cy-consume-content2 .cy-consume-content2-number3>span:nth-of-type(2) {
    padding-left:1.5333333333333334rem;
}
.cy-consume .cy-consume-content2 .cy-consume-content2-number{
    padding-top:0.5333333333333333rem;
}
.cy-consume-content2-number4 span{
	display: inline-block;
    border:1px solid #ff323a;
    border-radius:28px;
    height:1.8666666666666667rem;
    color:#ff323a;
    font-size:0.8rem;
    margin-top:0.36666666666666664rem;
    line-height: 1.8rem;
    padding: 0 1rem;
}
.cy-consume-content2-number4 .input2{
	margin-left: 0.5rem;
    background:#ff323a;
    color:#FFFFFF;
}
.cy-consume-content2-number4 .bottom-money {
	position: absolute;
	left: 1rem;
	font-size: 1.2rem;
	color: #D5383E;
	border: 0;
}
.order-no .content{
    width:100%;
    margin:0px auto;
}
.order-no .content>ul{

}
.order-no .content>ul>li{
    text-align:center;
    padding-top:2.966666666666667rem;
}
.order-no .content>ul>li>img{
    width:7.9rem;
    height:8.4rem;
}
.order-no .content>ul>li>p{
    font-size:0.9333333333333333rem;
    color:#000000;
    padding-top:2.2666666666666666rem;
}	
.order-no .fabu{
    width:100%;
    height: 2.1rem;
    text-align: center;
    margin-top: 2rem;
}
.order-no .fabu .btn{
	display: inline-block;
    height:2.1rem;
    line-height: 2rem;
    font-size:0.9333333333333333rem;
    color:#ff5102;
    border:1px solid #ff5102;
    border-radius:4px;
    padding: 0 1rem;
}
/*.null{
    width:100%;
    background:#f5f5f5;
    height:0.5rem;
}
.null1{
    width:100%;
    background:white;
    height:0.3333333333333333rem;
}			*/
</style>