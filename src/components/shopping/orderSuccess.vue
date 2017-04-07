<template>
	<div id="orderSuccess" style="position: relative;height:calc(100vh);overflow-x: hidden;overflow-y: auto;">
		<section class="main fixed">
			<article class="content">
				<div class="order-ok-img"><img src="../../images/shop_success@2x.png"/><div>恭喜您，下单成功</div></div>
				<div class="order-cz-back">
					<router-link :to="{name:'orderAll'}" tag="div" class="look-order look-that">查看订单</router-link>
					<router-link :to="{name:'homePage'}" tag="div" class="look-order">店铺主页</router-link>
				</div>
			</article>				
		</section>
	</div>
</template>
<style type="text/css">
	#orderSuccess{
		background-color: #fff;
		text-align: center;
	}
	.order-ok-img{
		position: relative;
		width: 100%;
		height: 11.666666666666666rem;
		font-size: 1.2rem;
		color: #F7353C;
	}
	.order-ok-img > img{
		width: 4.933333333333334rem;
		height: 4.933333333333334rem;
		margin-top: 3.933333333333333rem;
	}
	.order-ok-img > div{
		margin-top: 1.6rem;
	}
	.order-cz-back{
		font-size: 1rem;
		margin-top: 3.5rem;
	}
	.order-cz-back > div{
		display: inline-block;
		width: auto;
		height: 2.6666666666666665rem;
		line-height: 2.6666666666666665rem;
		border-radius:1.3rem;
		border:1px solid #efefef;
	}
	.order-cz-back .look-order{
		background-color: #efefef;
		margin: 0 1rem;
		padding: 0 2.6666666666666665rem;
		color:#666;
	}
	.order-cz-back .look-that{
		background-color: #F7353C;
		color: #fff;
	}
	.order-cz-back .shop-home-page{
		background-color: #C94E3F;
		margin: 0 2.033333333333333rem 0 0.5666666666666667rem;
		padding: 0 2.6666666666666665rem;
	}
</style>
<script type="text/javascript">
    export default {
        mounted: function () {
        }
    }
</script>
