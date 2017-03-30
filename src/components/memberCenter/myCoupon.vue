<template>
	<div id="myCoupon" style="position: relative;height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;">
		<section class="main fixed">
			<article class="content">
			   <div class="nav">
			       <ul>
			           <li id="couponshop" class="active" @click="changeCoupon($event)">商家劵</li>
			           <li id="couponme" class="" @click="changeCoupon($event)" >我的优惠劵</li>
			       </ul>
			   </div>				
				<div class="mycoupon-conter" style="display: none;">
					<li>
						<div class="mycoupon-tr coupon-center">
							<div class="mycoupon-td">
								<p class="mycoupon-td-p1"><em>¥</em>30</p>
								<p class="mycoupon-td-p2">抵用券</p>
							</div>
							<div class="mycoupon-td1">
								<p class="mycoupon-td1-p1">万达广场豪华标间30元抵用券</p>
								<p class="mycoupon-td1-p2">满300元可用</p>
							</div>
						</div>
						<div class="mycoupon-tr coupon-time">有效期至：2017年2月22日</div>
					</li>
					<li>
						<div class="mycoupon-tr coupon-center">
							<div class="mycoupon-td">
								<p class="mycoupon-td-p1"><em>¥</em>30</p>
								<p class="mycoupon-td-p2">抵用券</p>
							</div>
							<div class="mycoupon-td1">
								<p class="mycoupon-td1-p1">万达广场豪华标间30元抵用券</p>
								<p class="mycoupon-td1-p2">满300元可用</p>
							</div>
						</div>
						<div class="mycoupon-tr coupon-time">有效期至：2017年2月22日</div>
					</li>
					<li>
						<div class="mycoupon-tr coupon-center">
							<div class="mycoupon-td">
								<p class="mycoupon-td-p1"><em>¥</em>30</p>
								<p class="mycoupon-td-p2">抵用券</p>
							</div>
							<div class="mycoupon-td1">
								<p class="mycoupon-td1-p1">万达广场豪华标间30元抵用券</p>
								<p class="mycoupon-td1-p2">满300元可用</p>
							</div>
						</div>
						<div class="mycoupon-tr coupon-time">有效期至：2017年2月22日</div>
					</li>
				</div>
				<div class="myCoupon-conter-no" style="display: block;">
					<div class="content">
						<ul class="">
							<li>
								<img src="../../images/restaurant/none_coupons_img@2x.png" alt="" />
								<p>该商家未发布优惠劵~呜...呜...留言给商家看看有木有</p>
							</li>
						</ul>
					</div>
					<div class="fabu"><span class="btn" v-on:mousedown="gomesses()">发布留言</span></div>				
				</div>			
			</article>	
		</section>
	</div>
</template>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        	}
        },    	
        mounted: function () {
        },
        methods: {
            gomesses: function () {
            	this.$router.push({ name: "messageboard" });
            },
            changeCoupon:function(event){
            	document.getElementById("couponme").className = document.getElementById("couponshop").className = "";
            	event.target.className = "active";
            }
        }
    }
</script>
<style>
	.mycoupon-conter li{
		display: table;
		margin: 0.6666666666666666rem 7% 0 7%;
		background: url(../../images/member_coupon_image@2x.png) no-repeat;
		width: 86%;
		height: 6.066666666666666rem;
		background-size: 100%;
	}
	.mycoupon-conter li .mycoupon-td{
		display: table-cell;
		width: 30%;
		text-align: center;
		vertical-align: middle;
		color: #05ceae;
	}
	.mycoupon-conter li .mycoupon-td-p1{
		font-size: 1.8666666666666667rem;
	}
	.mycoupon-conter li .mycoupon-td-p1 > em{
		font-size: 0.8333333333333334rem;
		padding-right: 0.3333333333333333rem;
	}
	.mycoupon-conter li .mycoupon-td-p2{
		font-size: 0.7333333333333333rem;
		margin-top: -1rem;
	}
	.mycoupon-conter li .mycoupon-td1{
	    display: table-cell;
	    text-align: left;
	    vertical-align: middle;
	    padding-left: 1.0666666666666667rem;
	    padding-top: 0.3333333333333333rem;	    
	}
	.mycoupon-conter li .mycoupon-td1-p1{
	    font-size: 0.8rem;
	}
	.mycoupon-conter li .mycoupon-td1-p2{
	    color: #999;
    	font-size: 0.6666666666666666rem;
	}
	.mycoupon-conter li .coupon-center{
		height: 4rem;
	}
	.mycoupon-conter li .coupon-time{
		height: 2.066666666666667rem;
		line-height: 2.066666666666667rem;
	    font-size: 0.7333333333333333rem;
	    color: #999;
	    padding-left: 0.8333333333333334rem;		
	}
	.nav{
	    width:100%;
	    height:3rem;
	    background-color: #fff;
	}
	.nav>ul{
	    height:3rem;
	    display:-webkit-flex;
	    display:flex;
	}
	.nav>ul>li{
	    text-align:center;
	    height:3rem;
	    line-height:3rem;
	    border-bottom:2px solid gainsboro;
	    -webkit-flex:1;
	    flex:1;
	}
	.nav > ul > li.active{
		color: #ff5102;
	    border-bottom:2px solid #ff5102;
	}
	.myCoupon-conter-no .content{
	    width:100%;
	    margin:0px auto;
	}
	.content>ul{
	
	}
	.myCoupon-conter-no .content>ul>li{
	    text-align:center;
	    padding-top:2.966666666666667rem;
	}
	.myCoupon-conter-no .content>ul>li>img{
	    width:7.9rem;
	    height:8.4rem;
	}
	.myCoupon-conter-no .content>ul>li>p{
	    font-size:0.9333333333333333rem;
	    color:#000000;
	    padding-top:2.2666666666666666rem;
	}
	.myCoupon-conter-no .fabu{
	    width:100%;
	    height: 2.1rem;
	    text-align: center;
	    margin-top: 2rem;
	}
	.myCoupon-conter-no .fabu .btn{
		display: inline-block;
	    height:2.1rem;
	    line-height: 2.1rem;
	    font-size:0.9333333333333333rem;
	    color:#ff5102;
	    border:1px solid #ff5102;
	    border-radius:4px;
	    padding: 0 1rem;
	}	
</style>

