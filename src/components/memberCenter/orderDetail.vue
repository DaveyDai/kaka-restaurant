<template>
	<div id="orderDetail" style="position: relative;">
		<section class="main fixed" style="height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;background-color: #fff;">
			<article class="content">
				<div class="detail-content">
					<div class="detail-order">
						<div class="detail-order-content1">
							<div class="detail-order-content1-number">
								<p> 订单编号：<span v-text="orderDetail.id"></span></p>
								<p>订单金额：<span>￥{{orderDetail.total}}</span></p>
							</div>
						</div>
						<div class="detail-order-content2">
							<div v-text="orderDetail.pay_status==0&&'待处理'||orderDetail.pay_status==1&&'未支付'||orderDetail.pay_status==2&&'已支付'||orderDetail.pay_status==3&&'已完成'"></div>
						</div>
					</div>
					<div class="detail-new" v-for="item in orderDetail.order">
						<div class="detail-new-content1">
							<img v-bind:src="getImgUrl+item.image" alt="" />
						</div>
						<div class="detail-new-content2">
							<span>{{item.product_name}}</span>
						</div>
						<div class="detail-new-content3">
							<p> x{{item.num}}</p>
							<div class="detail-new-price">
								<p class="p2"></p>
								<p class="p3">￥{{item.total}}元</p>
							</div>
						</div>
					</div>
					<div class="detail-consume">
						<div class="detail-order-content1">
							<div class="detail-order-content1-number">配送费</div>
							<div class="detail-order-content1-pay">实付款</div>
						</div>
						<div class="detail-order-content2">
							<div class="detail-order-content2-number">￥0元</div>
							<div class="detail-order_content2-pay">￥{{orderDetail.total}}元</div>
						</div>
					</div>
				</div>
				<div class="detail-allconsume">
					<div class="detail-allconsum-content">
						<p>消费总额：<span>￥{{orderDetail.total}}</span></p>
						<p>店内桌号：<span>{{orderDetail.room_id}}</span></p>
						<p>消费积分：<span>{{orderDetail.point||0}}</span></p>
						<p>下单时间：<span>{{orderDetail.create_time}}</span><span class="span2"></span></p>
					</div>
				</div>
			</article>
		</section>
		<div class="detail-footer">
			<span class="order-money-t">合计：  <em>￥{{orderDetail.total}}</em></span>
			<span @click="deleteOrder()" class="noc-order" v-text="orderDetail.pay_status==0||orderDetail.pay_status==1?'取消订单':'删除订单'"></span>
			<span @click="payOrders()" class="order-topay" v-if="orderDetail.pay_status==0||orderDetail.pay_status==1">去支付</span>		
			<span @click="choiceOrder()" class="order-topay" v-if="orderDetail.pay_status==2||orderDetail.pay_status==3">再来一单</span>		
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data: function() {
			return {
				orderDetail: {},
				getImgUrl:configuration.global.imgPath
			}
		},
		mounted: function() {
			var orderdeta = JSON.parse(sessionStorage.getItem("orderDetail"));
			if(orderdeta&&orderdeta.order.length ===0)orderdeta.order = JSON.parse(JSON.stringify(orderdeta));
			this.orderDetail = orderdeta;
		},
		methods: {
			goMess: function() {
				this.$router.push({ name: "messageboard" });
			},
		    payOrders:function(){
		    	var item = this.orderDetail;
		    	sessionStorage.setItem("payOrder",JSON.stringify({order:item.id,money:item.total}));
		    	sessionStorage.setItem("payItem",JSON.stringify(item));
		    	this.$router.push({name:"orderPay"});
		    },
		    choiceOrder:function(){
		    	this.$router.push({name:"lifeHome"});
		    },
		    deleteOrder:function(){
		    	var item = this.orderDetail;
		    	var deleParam = {
		    		shopid:configuration.global.shopid,
		    		token:sessionStorage.getItem("token"),		    	
		    		orderId:item.id
		    	}
		        this.$http.post(configuration.global.serverPath + "/api/order/deleteOrder",deleParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.$router.push({name:"orderAll"});
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
	.detail-content {
		line-height: 1.8rem;
	}
	
	.detail-order {
		width: 100%;
		height: 4.466666666666667rem;
		display: -webkit-flex;
		display: flex;
	}
	
	.detail-order .detail-order-content1 {
		-webkit-flex: 2.5;
		flex: 2.5;
		padding-left: 0.8rem;
		padding-top: 0.6rem;
	}
	
	.detail-order .detail-order-content1 .detail-order-content1-number {
		height: 4.466666666666667rem;
		font-size: 0.9333333333333333rem;
		color: #333333;
	}
	
	.detail-order .detail-order-content1 .detail-order-content1-number>p {}
	
	.detail-order .detail-order-content2 {
		height: 4.466666666666667rem;
		line-height: 4.466666666666667rem;
		font-size: 1.1333333333333333rem;
		color: #d5383e;
		padding-right: 0.8rem;
		text-align: right;
		-webkit-flex: 1;
		flex: 1;
	}
	/*列表2*/
	
	.detail-new {
		position: relative;
		width: 100%;
		display: -webkit-flex;
		display: flex;
		background-color: #f5f5f5;
		height: 6.8rem;
		margin-bottom: 0.2rem;
	}
	
	.detail-new .detail-new-content1 {
		padding-left: 0.8rem;
		height: 6.8rem;
	}
	
	.detail-new .detail-new-content1>img {
		margin-top: 0.8rem;
		width: 5.2rem;
		height: 5.2rem;
	}
	
	.detail-new .detail-new-content2 {
		padding-left: 0.6rem;
		height: 6.8rem;
		font-size: 0.8666666666666667rem;
		color: #303030;
		padding-top: 0.9333333333333333rem;
		padding-right: 0.8rem;
	}
	
	.detail-new .detail-new-content3 {
		position: absolute;
		right: 0.8rem;
		height: 6.8rem;
		;
		text-align: right;
		font-size: 0.9333333333333333rem;
		color: #303030;
		padding-top: 0.9333333333333333rem;
	}
	
	.detail-new .detail-new-content3 .detail-new-price {
		padding-top: 0.8rem;
		margin-bottom: 0.8rem;
	}
	
	.detail-new .detail-new-content3 .detail-new-price>.p2 {
		height: 1.3333333333333333rem
	}
	
	.detail-new .detail-new-content3 .detail-new-price>.p3 {
		padding-bottom: 0.3333333333333333rem;
	}
	/*列表3*/
	
	.detail-consume {
		width: 100%;
		height: 4.833333333333333rem;
		display: -webkit-flex;
		display: flex;
	}
	
	.detail-consume .detail-order-content1 {
		-webkit-flex: 1;
		flex: 1;
		padding-left: 0.8rem;
		height: 4.833333333333333rem;
		font-size: 0.9333333333333333rem;
		color: #666666;
	}
	
	.detail-consume .detail-order-content1 .detail-order-content1-number {
		padding-top: 0.3333333333333333rem;
	}
	
	.detail-consume .detail-order-content1 .detail-order-content1-pay {
		padding-top: 0.2rem;
	}
	
	.detail-consume .detail-order-content2 {
		-webkit-flex: 1;
		flex: 1;
		padding-right: 0.8rem;
		height: 4.833333333333333rem;
		text-align: right;
		font-size: 0.9333333333333333rem;
		color: #303030;
	}
	
	.detail-consume .detail-order-content2 .detail-order-content2-number {
		padding-top: 0.3333333333333333rem;
		font-size: 0.8rem
	}
	
	.detail-consume .detail-order-content2 .detail-order_content2-pay {
		padding-top: 0.16666666666666666rem;
		font-size: 1rem;
		color: #d5383e;
	}
	/*列表4*/
	
	.detail-allconsume {
		width: 100%;
		margin-top: 0px;
		height: 5.533333333333333rem;
		margin-bottom: 1.4333333333333333rem;
		line-height: 1.2rem;
	}
	
	.detail-allconsum-content {
		width: 95%;
		margin: 0 auto;
		border: 1px solid gainsboro;
		font-size: 0.8rem;
		color: #666666;
		line-height: 1.5rem;
	}
	
	.detail-allconsum-content>p {
		padding-left: 0.8rem;
	}
	
	.detail-allconsum-content>p>.span2 {
		padding-left: 2.5rem;
	}
	/*底部*/
	.detail-footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 3.2666666666666666rem;
		padding:0 0.8rem;
		line-height: 3.2666666666666666rem;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
    	align-items: center;
    	-webkit-justify-content: flex-end;
    	justify-content: flex-end;
    	border-top: 1px solid #E5E5E5;
    	z-index: 999;
    	background-color: #fff;
	}
	.detail-footer span{
		display: inline-block;
		font-size: 0.93rem;
		text-align: center;
		border-radius: 0.933rem;
		height: 2rem;
		line-height: 2rem;
		text-align: center;
	}
	.detail-footer .order-money-t {
		position: absolute;
		left: 0.8rem;
		font-size: 1.2rem;
		color: #F7353C;
		font-weight: bold;
		height: 3.26rem;
		line-height: 3.26rem;
	}
	.detail-footer .noc-order{
		color: #F7353C;
		border: 1px solid #F7353C;
		margin-right: 0.5rem;
		width: 5.8rem;
	}
	.detail-footer .order-topay{
		color: #fff;
		background-color: #F7353C;
		border: 1px solid #F7353C;
		width: 5.8rem;
		line-height: 1.8rem;
	}
</style>