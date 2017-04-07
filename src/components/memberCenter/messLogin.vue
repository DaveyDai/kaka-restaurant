<template>
	<div id="messLogin" style="position: relative;height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;background-color: #fff;">
		<section class="main fixed">
			<article class="content">
				<div class="login-head">
					<img src="../../images/restaurant/login_in_head_img@2x.png"/>
				</div>				
				<div class="pass-input" style="margin-top: 3rem;">
					<div class="inputmess">
						<span>手机号</span>
						<input type="text" name="phone" v-model="loginParam.phone" placeholder="请输入您的手机号" />
					</div>
				</div>
				<div class="pass-input">
					<div class="inputmess pass-name">
						<span>验证码</span>
						<input type="tel" name="sms" v-model="loginParam.sms" placeholder="请输入短信验证码" />
						<span class="l-login-get" v-on:mousedown="getPhoneMessage" >获取验证码</span>						
					</div>
					<p id="checkEmail">*请输入短信验证码</p>
				</div>
				<div class="pass-go">
					<span class="pass-goto" v-on:click="phoneLogin" >登录</span>
					<router-link :to="{name:'login'}" tag="span" class="pass-back">返回登录窗口</router-link>
				</div>
			</article>		
		</section>		
	</div>	
</template>
<script type="text/javascript">
    export default {
    	data:function(){
    		return {
    			loginParam:{
    				phone:"",
    				sms:""
    			},
    			getMessageUrl:configuration.global.serverPath + "/api/login/send",
    			loginUrl:configuration.global.serverPath + "/api/login/phoneLogin"
    		}
    	},
        ready: function () {
        	
        },
        methods: {
         	getPhoneMessage:function(){
         		if(!isMobile(this.loginParam.phone)){
         			globalMethod.layerUtils.iAlert("请输入正确的手机号码");
         			return false;
         		}
		        this.$http.post(this.getMessageUrl,this.loginParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 0){
		         		globalMethod.layerUtils.iAlert("获取短信验证码成功");
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.msg||"获取短信验证码失败");
		         	}
		        }, function (response) {
		      		alert(JSON.stringify(response));
		        });         		
        	},
        	phoneLogin:function(){
        		if(!isMobile(this.loginParam.phone)||!this.loginParam.sms){
        			globalMethod.layerUtils.iAlert("请输入正确的手机号码和短信验证码");
        			return;
        		}
		        this.$http.post(this.loginUrl,this.loginParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
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
		      		alert(JSON.stringify(response));
		        });        		
        	},       	
           	pageBack: function(event){
                if (window.history && window.history.pushState) {
                    window.history.back();
                }           	
           }
      	}
    }
    function isMobile(strValue){
		if (isEmpty(strValue))
			return false;
		var pattern = /^(13|14|15|17|18)[0-9]{9}$/;
	    return executeExp(pattern, strValue);
	}
	function isEmpty(strValue){
		strValue = jQuery.trim(strValue);
		return strValue.length == 0;
	} 
	function executeExp(pattern, strValue){
	    return pattern.test(strValue);
	}	
</script>
<style>
/*内容*/
	#callPasswd article{
		background-color: #fff;
	}
	.pass-input{
		height: auto;
		border-bottom: 1px solid #e5e5e5;
		margin: 0 8%;
		padding-top: 1.5rem;
		padding-bottom: 0.2rem;
	}
	.pass-input .inputmess > span{
	    font-size: 1.2rem;
	    color: #333;
	    padding-left: 0.5rem;
	}
	.pass-input .inputmess > input{
		margin-left: 0.5rem;
		width: 68%;
		height: 2rem;
		line-height: 2rem;
		font-size: 1.1rem;
		color: #999;
		border: 0;
	}
	.pass-input .pass-name > input{
		margin-left: 0.5rem;
		width: 46%;
		height: 2.5rem;
		font-size: 1.1rem;
		color: #999;
		border: 0;
	}
	.pass-input .pass-name .l-login-get{
	    display: inline-block;
	    font-size: 0.93rem;
	    background-color: #ff5959;
	    padding: 0.5rem 0.7rem;
	    border-radius: 1.5rem;
	    color: #fff;	
	    float:right;	
	}
	.pass-input #checkEmail{
		display: none;
		color: red;
	}
	.pass-go{
	    width: 84%;
	    line-height: 2.6rem;
	    margin: 8%;
	    font-size: 1.2rem;		
	}
	.pass-go span{
	    display: block;
	    text-align: center;	
	    border-radius: 40px;	
	}
	.pass-go span.pass-goto{
		background-color: #ff5959;
		color: #ffffff;
		height:2.7rem;
		line-height:2.7rem;
	}
	.pass-go span.pass-back{
		margin-top: 1.3333333333333333rem;
		border: 1px solid #ff5959;
		color: #ff5959;
	}
	.login-head{
		position: relative;
		width: 100%;
		height: 8.233333333333333rem;
		background: linear-gradient(to right top,#ff5959,#ff9146);
	}
	.login-head img{
		width: 5.466666666666667rem;
		height: 5.466666666666667rem;
		position: absolute;
		display: inline-block;
		bottom: -1rem;
		left: 50%;
		transform: translateX(-50%);
	}
</style>