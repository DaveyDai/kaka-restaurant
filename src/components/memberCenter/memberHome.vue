<template>
	<div id="memberHome" style="position: relative;height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;">
		<div class="memberHome">
			<div class="newmember">
				<div class="nmtop">
					<div class="nlogo fl"><img src="../../images/restaurant/member_self_image@2x.png" alt="商家logo" /></div>
					<div class="newsmem">
						<div>{{personInfo.nickname && '昵称： '||''}}{{personInfo.nickname||'未设置昵称'}}</div>
						<div>
							<span class="nmuen1" v-text="personInfo.point">0</span>
							<span class="nmuen2" style="display:inline">积分</span>
						</div>
					</div>
				</div>
				<div class="cy_nav">
					<li v-on:click="signCheck()">
						<a href="javascript:void(0);"><img src="../../images/restaurant/member_sign_in_img@2x.png" alt="" />
							<p>每日签到</p>
						</a>
					</li>
					<router-link :to="{name:'orderAll'}" tag="li">
						<a href="javascript:void(0);">
							<img src="../../images/restaurant/member_order_img@2x.png" alt="" />
							<p>全部订单</p>
						</a>
					</router-link>
					<router-link :to="{name:'myCoupon'}" tag="li">
						<a href="javascript:void(0);">
							<img src="../../images/restaurant/member_coupon_img@2x.png" alt="" />
							<p>优惠劵</p>
						</a>
					</router-link>
				</div>				
			</div>
			<div class="nmenlist">
					<router-link :to="{name:'personInfo'}" tag="li">
						<a href="javascript:void(0);">
							<img src="../../images/restaurant/member_formation_img-@2x.png" alt="" />
							<p>个人资料</p>
						</a>
					</router-link>
					<router-link :to="{name:'myReserve'}" tag="li">
						<a href="javascript:void(0);">
							<img src="../../images/restaurant/member_book_img@2x.png" alt="" />
							<p>我要预约</p>
						</a>
					</router-link>
					<router-link :to="{name:'myReservation'}" tag="li">
						<a href="javascript:void(0);">
							<img src="../../images/restaurant/member_book_record_img@2x.png" alt="" />
							<p>预约记录</p>
						</a>
					</router-link>
					<router-link :to="{name:'memberPoints'}" tag="li">
						<a href="javascript:void(0);">
							<img src="../../images/restaurant/member_card_img@2x.png" alt="" />
							<p>会员积分卡</p>
						</a>
					</router-link>
					<li>
						<a href="javascript:void(0);">
							<img src="../../images/restaurant/member_guagua_card_img@2x.png" alt="" />
							<p>刮刮卡</p>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);">
							<img src="../../images/restaurant/member_value_card_img@2x.png" alt="" />
							<p>储值卡专区</p>
						</a>
					</li>
					<li>
						<a href="javascript:void(0);">
							<img src="../../images/restaurant/member_table_img@2x.png" alt="" />
							<p>大转盘</p>
						</a>
					</li>
	
					<li>
						<a href="javascript:void(0);">
							<img src="../../images/restaurant/member_number_img@2x.png" alt="" />
							<p>我的排号</p>
						</a>
					</li>
					<li></li>
			</div>
			<div class="account">
				<div class="btn" v-on:mousedown="outLogin()">退出登录</div>
			</div>
		</div>
		<div id="signCheckN" class="sign-page-tips" style="display: none;">
			<div class="tips-sign-content">
				<div class="tips-title-ok">
					<img src="../../images/member_success_img@2x.png" />
					<span class="title-tip-yes">签到成功</span>
					<div class="tips-fenge"></div>
				</div>
				<div class="tips-title-silist">
					<p>恭喜您！明天再接再厉哦~</p>
					<div class="sign-tipss-to" @click="checkSignList()">签到记录</div>
				</div>
			</div>
			<div class="sign-tips-img" v-on:click="signHide()"><img src="../../images/member_close_img@2x.png" /></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data: function() {
			return {
				personInfo: {}
			}
		},
		mounted: function() {
			this.getPersonInfo();
		},
		methods: {
			signHide: function() {
				$("#memberHome #signCheckN").fadeOut();
			},
			signCheck: function() {
				this.$http.post(configuration.global.serverPath + "/api/Personal/signIn", { token: sessionStorage.getItem("token") }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, emulateJSON: true }).then(function(response) {
					var results = response.data;
					if(results.code === 200) {
						$("#memberHome #signCheckN").fadeIn();
					} else {
						globalMethod.layerUtils.iAlert(results.message || "请求服务器失败");
					}
				}, function(response) {
					globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
				});
			},
			outLogin: function() {
				sessionStorage.setItem("toLoginPageCode", sessionStorage.getItem("pageCode"));
				sessionStorage.removeItem("token");
				this.$router.push({ name: "login" });
			},
			getPersonInfo: function() {
				this.$http.post(configuration.global.serverPath + "/api/Personal/getPersonalData", { shopid: configuration.global.shopid, token: sessionStorage.getItem("token") }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, emulateJSON: true }).then(function(response) {
					var results = response.data;
					if(results.code === 200) {
						this.personInfo = results.data;
					} else {
						globalMethod.layerUtils.iAlert(results.message || "请求服务器失败");
					}
				}, function(response) {
					globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
				});
			},
			checkSignList: function() {
				this.$router.push({ name: "signPage" });
			}
		}
	}
</script>
<style>
	.newmember .nmtop {
		background-color: #FFF;
		background: url(../../images/restaurant/member_background_image@2x.png) no-repeat;
		height: 12.5rem;
		width: 100%;
		background-size: 100% 100%;
	}
	.newmember .nlogo {
		padding-top: 2.3rem;
		text-align: center;
	}
	.newmember .nlogo img {
		width: 5.6rem;
		height: 5.6rem;
	}
	.newmember .newsmem{
		text-align: center;
		color: #fff;
		font-size: 0.86rem;
		line-height: 1.5rem;
	}
	.newmember .cy_nav {
		width: 100%;
		height: 7.2rem;
		background-color: #FFF;
		display: -webkit-flex;
		display: flex;		
	}
	.newmember .cy_nav li {
		padding-top: 1rem;
		-webkit-flex: 1;
		flex: 1;
	}
	.newmember .cy_nav li>a {
		display: block;
	}
	.newmember .cy_nav li>a>img {
		width: 3rem;
		height: 3rem;
		margin: 0 auto;
		display: inherit;
	}
	.newmember .cy_nav li>a>p {
		font-size: 0.9333333333333333rem;
		color: #000000;
		text-align: center;
		padding-top: 0.5333333333333333rem;
	}
	
	.nmenlist {
		width: 100%;
		height: 17rem;
		background: white;
		margin-top: 0.67rem;
	}
	.nmenlist li {
		width: 33.3%;
		height: 5.666666666666667rem;
		float: left;
		border-bottom: 1px solid #E5E5E5;
		border-right: 1px solid #E5E5E5;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
		-webkit-justify-content: center;
		justify-content: center;
	}
	
	.nmenlist li>a {
		display: block;
	}
	
	.nmenlist li>a>img {
		width: 2rem;
		height: 2rem;
		margin: 0 auto;
		display: inherit;
	}
	
	.nmenlist li>a>p {
		font-size: 0.9333333333333333rem;
		color: #000000;
		text-align: center;
		padding-top: 0.5333333333333333rem;
	}
	
	.memberHome .account {
		height: 5.3rem;
		width: 100%;
		background: white;
		padding-top: 1.2rem;
		margin-bottom: 1.4333333333333333rem;
		text-align: center;
		padding-left: 7%;
		margin-top: 0;
	}
	
	.memberHome .account .btn {
		width: 91%;
		height: 2.6666666666666665rem;
		line-height: 2.6666666666666665rem;
		font-size: 1rem;
		color: #f7353c;
		text-align: center;
		background-color: white;
		border: 1px solid #f7353c;
		border-radius: 10px;
	}
	/*签到弹出层*/
	
	.sign-page-tips {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .6);
		z-index: 3000;
		display: -webkit-flex;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-flex-direction: column;
		flex-direction: column;
	}
	
	.sign-page-tips .tips-sign-content {
		position: relative;
		width: 60%;
		height: 9.8rem;
	}
	
	.sign-page-tips .tips-title-ok {
		position: relative;
		width: 100%;
		height: 3.6666666666666665rem;
		background-color: #fff6da;
		border-top-left-radius: 0.7333333333333333rem;
		border-top-right-radius: 0.7333333333333333rem;
		font-size: 1.2rem;
		color: #f05638;
		font-weight: bold;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
		-webkit-flex-direction: column;
		flex-direction: column;
		-webkit-justify-content: center;
		justify-content: center;
	}
	
	.sign-page-tips .tips-title-ok img {
		width: 2.3666666666666667rem;
		height: 2.3666666666666667rem;
	}
	
	.sign-page-tips .tips-title-ok img {
		width: 2.3666666666666667rem;
		height: 2.3666666666666667rem;
	}
	
	.sign-page-tips .title-tip-yes {
		margin-bottom: 1.5rem;
	}
	
	.sign-page-tips .tips-fenge {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 0.14rem;
		background: url(../../images/member_img@2x.png) no-repeat;
	}
	
	.sign-page-tips .tips-title-silist {
		width: 100%;
		height: 5.833333333333333rem;
		background-color: #14B6F5;
		border-bottom-left-radius: 0.7333333333333333rem;
		border-bottom-right-radius: 0.7333333333333333rem;
		color: #fff;
		text-align: center;
	}
	
	.sign-page-tips .tips-title-silist p {
		font-size: 0.9333333333333333rem;
		padding: 0.9333333333333333rem 0 0.3333333333333333rem 0;
	}
	
	.sign-page-tips .sign-tipss-to {
		font-size: 0.8rem;
		border: 2px solid #fff;
		border-radius: 26px;
		display: inline-block;
		padding: 0.16666666666666666rem 1rem;
	}
	
	.sign-page-tips .sign-tips-img {
		text-align: center;
		margin-top: 2.933333333333333rem;
	}
	
	.sign-page-tips .sign-tips-img img {
		width: 70%;
		height: 70%;
	}
</style>