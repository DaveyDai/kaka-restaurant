<template>
	<div id="pointsChange" style="position: relative;height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;">
		<div id="pointConter">  
			<div class="point-nav" v-for="item in pointList">
				<ul class="ul1">
					<li>
						<p>订单ID: <em v-text="item.order_id"></em></p>
					</li>
				</ul>
				<ul class="ul2">
					<li>
						<p>积分</p>
					</li>
					<li>
						<p><span v-text="item.point"></span></p>
					</li>
				</ul>
				<ul class="ul3">
					<li>
						<p>积分说明</p>
					</li>
					<li style="padding-left: 5rem;">
						<p class="p2"><em v-text="item.create_time"></em><br>
							消费积分变动<span v-text="item.type_status==0&&'(积分还没有入账，等待店家处理)'||'(已入账)'"></span></p>
					</li>
				</ul>
			</div>
			<div class="hotel-page" v-if="pointList.length > 0">
				<div class="hotel-page-b" v-on:mousedown="getPointList('back')" >
					<img src="../../images/life_previous_pages_arrow@2x.png"/>
					<span class="hotel-page-back">{{pageList.pageNo==1&&"已到首页"||"上一页"}}</span>							
				</div>
				<span class="hotel-pages-th">{{pageList.pageNo}}/{{pageList.pageAll}}</span>
				<div class="hotel-page-n" v-on:mousedown="getPointList('next')" >
					<span class="hotel-page-next">{{pageList.pageNo==pageList.pageAll&&"已到尾页"||"下一页"}}</span>
					<img src="../../images/life_next_pages_arrow@2x.png"/>
				</div>
			</div>				
		</div>
		<div id="conterNo" style="display: none;">
			<div class="content">
				<li>
					<img src="../../images/restaurant/none_coupons_img@2x.png" alt="" />
					<p>暂未查到您的积分变动,请稍后再试</p>
				</li>
			</div>
			<div class="fabu"><span class="btn" v-on:mousedown="gomesses()">先去逛逛~</span></div>				
		</div>		
	</div>
</template>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		pointList:[],
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		}        		
        	}
        },    	
        mounted: function () {
            this.getPointList();
        },
        methods: {
		    getPointList:function(page){
		    	var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
		    	pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数
		        this.$http.post(configuration.global.serverPath + "/api/Personal/getPointList",{token:sessionStorage.getItem("token"),page:pageNo},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.pointList = results.data.data;
			            document.getElementById("pointConter").style.display = results.data.data.length === 0?"none":"block";
			            document.getElementById("conterNo").style.display = results.data.data.length === 0?"block":"none";		         		
		         		this.pageList.pageAll = Math.ceil(results.data.count/10)||1;
		         		this.pageList.pageNo = pageNo;
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });			    		
		    },
		    gomesses:function(){
		    	this.$router.push({name:"lifeHome"});
		    }
        }
    }
</script>
<style>
	.point-nav{
	    width:100%;
	    background:white;
	    margin-bottom: 0.3rem;
	}
	.point-nav>ul{
	    display:-webkit-flex;
	    display:flex;
	
	}
	.point-nav>ul>li{
	    padding-left:0.8rem;
	    border-bottom:1px solid gainsboro;
	    -webkit-flex:1;
	    flex:1;
	}
	
	.point-nav>.ul1>li{
	    padding-top:0.6rem;
	    padding-bottom:0.6rem;
	    border-bottom:1px solid gainsboro;
	}
	.point-nav>.ul1>li>p{
	    font-size:0.8666666666666667rem;
	    color:#333333;
	
	}
	.point-nav>.ul2{
	    height:3rem;
	}
	.point-nav>.ul2>li{
	    border-bottom:1px solid gainsboro;
	    position: relative;
	    padding-top:0.6rem;
	}
	.point-nav>.ul2>li>p{
	
	    font-size:0.8rem;
	    color:#666666;
	}
	.point-nav>.ul2>li>p>span{
	    position: absolute;
	    right:0.7333333333333333rem;
	
	    font-size:0.8666666666666667rem;
	    color:#333333;
	}
	
	.point-nav>.ul3>li{
	    padding-top:0.6rem;
	}
	.point-nav>.ul3>li>p{
	    font-size:0.8rem;
	    color:#666666;
	}
	.point-nav>.ul3>li>.p2{
	    font-size:0.8666666666666667rem;
	    color:#333333;
	}
	.point-nav>.ul3>li>p>span{
	    font-size:0.8666666666666667rem;
	    color:#da0202;
	}
	.content{
	    width:100%;
	    margin:0px auto;
	}
	.content>li{
	    text-align:center;
	    padding-top:2.966666666666667rem;
	}
	.content>li>img{
	    width:7.9rem;
	    height:8.4rem;
	}
	.content>li>p{
	    font-size:0.9333333333333333rem;
	    color:#000000;
	    padding-top:2.2666666666666666rem;
	}
	
	.fabu{
	    width:100%;
	    height: 2.1rem;
	    text-align: center;
	    margin-top: 2rem;
	}
	.fabu .btn{
		display: inline-block;
	    height:2.1rem;
	    line-height: 2rem;
	    font-size:0.9333333333333333rem;
	    color:#ff5102;
	    border:1px solid #ff5102;
	    border-radius:4px;
	    padding: 0 1rem;
	}	
</style>
