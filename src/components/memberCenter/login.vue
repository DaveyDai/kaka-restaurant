<template>
	<div id="login" style="position: relative;height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;">
		<section class="main fixed">
			<article class="content login-c">
				<div class="nmtop">
					<div class="nlogo">
						<img src="../../images/restaurant/login_in_head_img-@2x.png" alt="" />
					</div>
				</div>
				<div class="cy-nav">
					<div class="login-menberName">
						<img src="../../images/restaurant/login_in_phone_number_img-@2x.png" />
						<input v-model="loginParam.username" type="text" placeholder="手机号/账号/用户名" maxlength="30" />
					</div>
					<div class="login-menberName login-possd">
						<img src="../../images/restaurant/login_in_password_img-@2x.png" />
						<input v-model="loginParam.password" type="password" placeholder="登录密码" maxlength="20" />
					</div>
					<div class="login-now"><button v-on:click="login()" class="loginbut">登录</button></div>
				</div>
				<div class="login-other">
					<router-link :to="{name:'register'}" href="javascript:void(0)" class="login-o-get">快速注册</router-link>
					<router-link :to="{name:'messLogin'}" href="javascript:void(0)" class="login-o-forget">短信登录</router-link>
					<!--<router-link :to="{name:'callPasswd'}" href="javascript:void(0)" class="login-o-forget">忘记密码？</router-link>-->
				</div>
			</article>
		</section>
	</div>
</template>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		loginParam:{
        			shopid:configuration.global.shopid,
        			username:"",
        			password:""
        		}
        	}
        },    	
        mounted: function () {
        },
        methods: {
        	isEnNumeric:function(strValue){
        		// 判断是否为英文、数字、字母或_
				var pattern = /^[_0-9a-zA-Z]+$/;  
				return pattern.test(strValue);        		
        	},        	
        	login:function(){
        		if(this.checkParam()){
			        this.$http.post(configuration.global.serverPath + "/api/login/login",this.loginParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
		                if(results.code === 200){
		                	sessionStorage.setItem("token",results.data.token);
		                	this.$router.push({name:sessionStorage.getItem("toLoginPageCode")});
		                }else if(results.code === -1){
		                    globalMethod.layerUtils.iAlert(results.data);
		                }else{
		                	globalMethod.layerUtils.iAlert(results.message);
		                }
			        },function (response) {
			        	alert(JSON.stringify(response.data));
			        });         			
        		}else{
        			globalMethod.layerUtils.iAlert("请输入正确的用户名密码");
        		}
        	},
		    checkParam:function(){
		    	return (!!this.loginParam.username && this.isEnNumeric(this.loginParam.username)) && (this.loginParam.password && this.loginParam.password.replace(/\s/g,"").length > 0);
		    }
        }
    }
</script>
<style>
    .login-c .nmtop {
    	background: white;
    	background: url(../../images/restaurant/login_in_bg_img-@2x.png) no-repeat;
    	background-size: 100% 22.066666666666666rem;
    	height: 22.066666666666666rem;
    	width: 100%;
    	line-height: 22.066666666666666rem;
    }
    .login-c .nlogo {
    	width: 6.966666666666667rem;
    	height: 6.966666666666667rem;
    	margin: 0px auto;
    	text-align: center;
    }
    
    .login-c .nlogo>img {
    	width: 6.966666666666667rem;
    	height: 6.966666666666667rem;
    	margin: 0px auto;
    }
    
    .login-c .cy-nav {
    	width: 18.6rem;
    	height: 11.066666666666666rem;
    	background: white;
    	margin: 0px auto;
    	margin-top: -5rem;
    	text-align: center;
    	font-size: 0.9333333333333333rem;
    	color: #666666;
    	border-radius: 6px;
    }
    
    .login-c .cy-nav .login-menberName {
    	height: 3.3333333333333335rem;
    	margin: 0 0.8rem;
    	text-align: center;
    	border-bottom: 1px solid #E5E5E5;
    }
    
    .login-c .cy-nav .login-menberName>img {
    	width: 1.6rem;
    	height: 1.6rem;
    }
    
    .login-c .cy-nav .login-menberName input {
    	width: 80%;
    	height: 3.1rem;
    	font-size: 1.1rem;
    	color: #666666;
    	padding: 0 0.6666666666666666rem;
    	border: none;
    }
    .login-c .cy-nav .login-now {
    	margin-top: 3rem;
    	height: 2.6rem;
    	line-height: 2.6rem;
    	text-align: center;
    }
    .login-c .cy-nav .login-now .loginbut {
    	height: 2.6rem;
    	width: 10.866666666666667rem;
    	line-height: 2.6rem;
    	text-align: center;
    	border: 1px;
    	background: -ms-linear-gradient(left bottom, #ff9166, #ff5959);
    	background: -webkit-linear-gradient(left bottom, #ff9166, #ff5959);
    	background: -o-linear-gradient(left bottom, #ff9166, #ff5959);
    	font-size: 1.2rem;
    	color: #FFFFFF;
    	border-radius: 46px;
    }
    .login-other {
    	margin-top: 2rem;
    	width: auto;
    	height: 3rem;
    	line-height: 3rem;
    	font-size: 1.2rem;
    }
    
    .login-other .login-o-get {
    	text-decoration: underline;
    	margin-left: 1.2rem;
    	color: #0b83dc;
    }
    
    .login-other .login-o-forget {
    	position: absolute;
    	right: 1.2rem;
    	text-decoration: underline;
    	color: #0b83dc;
    }    
</style>
