<template>
	<div id="myReserve" style="position: relative;height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;">
		<section class="main fixed">
			<article class="content">
				<div class="bgstyle clear customer">
					<dl>
						<dt>预约时间<em>*</em></dt>
						<dd id="reserve_time" >
							<input class="r-time" type="datetime-local" name="" id="dateDefault" v-model="reserveList.reserve_time"/>
							<span class="select-com"><img src="src/images/shop_down_arrow@2x.png"/></span>
						</dd>
						<p id="reserve_timeC" >*请填写预约人数</p>
					</dl>
					<dl><dt>预约人数<em>*</em></dt>
						<dd>
							<input v-model="reserveList.number" class="radius5 inputRes" type="tel" placeholder="填写人数，以便我们安排" maxlength="6">
						</dd>
						<p id="numberC" >*请填写预约人数</p>
					</dl>
					<dl class="situation"><dt>预订包厢<em>*</em></dt>
						<dd>
							<select class="r-time" name="reserveType" v-model="reserveList.reserve_id" >
								<option v-bind:value="item.id" v-for="(item,index) in reserveType" v-text="item.name"></option>
							</select>
							<span class="select-com"><img src="src/images/shop_down_arrow@2x.png"/></span>							
						</dd>
					</dl>
					<dl><dt>您的手机号<em>*</em></dt>
						<dd><input v-model="reserveList.phone" class="radius5 inputRes" type="tel" name="tel" value="" maxlength="11" datatype="Require" placeholder="填写电话，以便我们联系您"></dd>
						<p id="phoneC" >*请填写联系手机号</p>
					</dl>
					<dl><dt>您的姓名<em>*</em></dt>
						<dd><input v-model="reserveList.name" class="radius5 inputRes" type="text" name="xm" value="" maxlength="10" datatype="Require" placeholder="在这里输入您的姓名/称呼"></dd>
						<p id="nameC" >*请填写您的姓名</p>
					</dl>
					<dl><dt>您的性别<em>*</em></dt>
						<dd>
							<select class="r-time" name="reserveType" v-model="reserveList.sex" >
								<option value="0">男</option>
								<option value="1">女</option>
							</select>
							<span class="select-com"><img src="src/images/shop_down_arrow@2x.png"/></span>							
						</dd>
					</dl>
					<dl class="beizhushuom"><dt>备注说明</dt>
						<dd><textarea v-model="reserveList.note" class="cartextarea radius5" placeholder="填写您的备注信息，尽量控制在100字以内。" maxlength="100"></textarea></dd>
					</dl>
				</div>
				<div class="account"><div class="account-btn" v-on:mousedown="putReserve()" >确认提交</div></div>
			</article>	
		</section>
	</div>	
</template>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		reserveList:{
        			shopid:configuration.global.shopid,
        			token:sessionStorage.getItem("token"),
        			number:"",//人数
        			name:"",
        			sex:0,//男：0，女：1
        			reserve_id:"0",//预订类型
        			reserve_time:"",//预订时间
        			note:"",//备注
        			phone:""//手机号码
        		},
        		reserveType:[]
        	}
        },    	
        mounted: function () {
            var dataNew = new Date();
          	this.reserveList.reserve_time = dataNew.getFullYear() + "-" + this.timeDeta(dataNew.getMonth()+1) + "-" + this.timeDeta(dataNew.getDate()) + "T18:00:00";
            this.reserveInit();
        },
        methods: {
        	reserveInit:function(){
		        this.$http.post(configuration.global.serverPath + "/api/Personal/myReserveClass",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.reserveType = results.data.data;
		         		this.reserveList.reserve_id = results.data.data[0].id;
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
        	},
        	putReserve:function(){
        		if(this.isCheck()){
        			this.reserveList.reserve_time = this.reserveList.reserve_time.replace(/T/," ");
			        this.$http.post(configuration.global.serverPath + "/api/Personal/reserve",this.reserveList,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
			         	if(results.code === 200){
			         		globalMethod.layerUtils.iAlert("预订成功",function(){
								this.$router.push({name:"myReservation"});
			         		}.bind(this));
			         	}else{
			         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
			         	}
			        }, function (response) {
			        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
			        });        			
        		}
        	},
        	isCheck:function(){
        		var isCheck = true,resTime = this.reserveList.reserve_time;
        		resTime = resTime.replace(/T/," ");
        		if(!resTime || !resTime.replace(/\s/g,"").length){
        			document.getElementById("reserve_timeC").style.display = "block";
        			isCheck = false;
        		}else{
        			document.getElementById("reserve_timeC").style.display = "none";
        		}
        		if(!this.reserveList.number || !this.reserveList.number.replace(/\s/g,"").length){
        			document.getElementById("numberC").style.display = "block";
        			isCheck = false;
        		}else{
        			document.getElementById("numberC").style.display = "none";
        		}
        		if(!this.reserveList.name || !this.reserveList.name.replace(/\s/g,"").length){
        			document.getElementById("nameC").style.display = "block";
        			isCheck = false;
        		}else{
        			document.getElementById("nameC").style.display = "none";
        		}
        		if(!this.reserveList.phone || !this.reserveList.phone.replace(/\s/g,"").length){
        			document.getElementById("phoneC").style.display = "block";
        			isCheck = false;
        		}else{
        			document.getElementById("phoneC").style.display = "none";
        		}
        		return isCheck;
        	},
        	queryInput:function(typeElem){
        		var inputValue;
        		typeElem.each(function(){
        			if(this.checked){
        				inputValue = this.value;
        				return false;
        			}
        		});
        		return inputValue;
        	},
        	timeDeta:function(time){
        		return time < 10 ? "0"+time : time;
        	}
        }
    }
</script>
<style>
	#myReserve p{
		display: none;
		position: absolute;
		bottom: -1rem;
		left: 0;
		color: red;
		font-size: 0.8rem;
		
	}
	#myReserve .customer{
		background-color: #fff;
		font-size: 1rem!important;
	}
	#myReserve .customer dl dt em{color:#f7353c;}
	#myReserve .customer dl{
		height: 2.8rem;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
		position: relative;
		border-bottom: 1px solid #E5E5E5;
		margin: 0.1rem 0.33rem;
		line-height:2.8rem;
	}		
	#myReserve .customer > dl > dt{
		display: inline-block;
		height: 2.8rem;
		line-height: 2.8rem;
		color: #000;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;		
		overflow: hidden;
		width: 30%;
		padding:0 0.8rem;		
		color: #333;
	}
	#myReserve .customer > dl > dd{
		position: relative;
		display: inline-block;
		height: 2.8rem;
		line-height: 2.8rem;
		width: 75%;
		padding-left: 5px;
	}
	#myReserve .customer > dl > dd input{
		height: 2.5rem;
	}
	#myReserve select,#myReserve input,#myReserve textarea{
		border: 0;
		-webkit-appearance: none;
		outline: none;		
		width: 85%;
		height: 2.5rem;
		font-size: 1rem;
		color: #333;
	}
	#myReserve select{
		width: 100%;
		background-color: #fff;
	}
	#myReserve .r-time{
		width: 100%;
		background-color: #fff;
	}
	#myReserve .customer dl.beizhushuom,#myReserve .customer dl.beizhushuom dt,#myReserve .customer dl.beizhushuom dd,#myReserve .customer dl.beizhushuom dd textarea{
		height: 9rem;
	}
	.select-com{
	    position: absolute;
	    right: 0.8rem;
	    top: 50%;
	    margin-top: -0.23333333333333334rem;
	    line-height: 0;
	}
	.select-com img{
		width: 0.8333333333333334rem;
		height: 0.4666666666666667rem;
	}
	#myReserve .beizhushuom textarea{
		padding-top: 0.6rem;
	}
</style>
