<template>
	<div id="myReservation" style="position: relative;height:calc(100vh - 3.26rem);overflow-x: hidden;overflow-y: auto;">
		<section class="main fixed">
			<article class="content">
			   <div class="nav">
			       <ul>
			           <li class="li1">我的预约</li>
			           <router-link :to="{name:'myReserve'}" tag="li" class="li2">预约中心</router-link>
			       </ul>
			   </div>				
				<div class="myReser-conter" id="reserall">
					<li v-for="item in reserveList" >
						<div class="myReser-conter-img"><img v-bind:src="item.image||storeInfo.logo" /></div>
						<div class="myRescon-explant">
							<p class="r-explant-title" v-text="storeInfo.name"></p>
							<p>类型：&nbsp;&nbsp;<em v-text="item.reserve_name||'大厅'"></em></p>
							<p>时间：&nbsp;&nbsp;<em v-text="item.reserve_time"></em></p>
							<p>电话：&nbsp;&nbsp;<em v-text="item.phone"></em></p>
							<p>备注：&nbsp;&nbsp;<em v-text="item.phone"></em></p>
						</div>
						<div class="rescon-start" v-text="item.status==0&&'预定成功'||'预定失败'"></div>
					</li>
				</div>
				<div class="hotel-page" v-if="reserveList.length > 0">
					<div class="hotel-page-b" v-on:mousedown="queryReserve('back')" >
						<img src="../../images/life_previous_pages_arrow@2x.png"/>
						<span class="hotel-page-back">{{pageList.pageNo==1&&"已到首页"||"上一页"}}</span>							
					</div>
					<span class="hotel-pages-th">{{pageList.pageNo}}/{{pageList.pageAll}}</span>
					<div class="hotel-page-n" v-on:mousedown="queryReserve('next')" >
						<span class="hotel-page-next">{{pageList.pageNo==pageList.pageAll&&"已到尾页"||"下一页"}}</span>
						<img src="../../images/life_next_pages_arrow@2x.png"/>
					</div>
				</div>	
				<div v-if="reserveList.length==0" class="reservation-no">
					<div class="content">
						<ul class="">
							<li>
								<img src="../../images/restaurant/none_messages_img@2x.png" alt="" />
								<p>您暂无预约记录~,您可以</p>
							</li>
						</ul>
					</div>
					<div class="fabu"><router-link :to="{name:'myReserve'}" tag="span" class="btn">马上预约</router-link></div>				
				</div>				
			</article>	
		</section>
	</div>
</template>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		},
        		reserveList:[],
        		storeInfo:{}
        	}
        },    	
        mounted: function () {
        	this.storeInfo = JSON.parse(sessionStorage.getItem("storeInfo"))||{};
            this.queryReserve();
        },
        methods: {
		    queryReserve:function(page){
		    	var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
		    	pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数
		        this.$http.post(configuration.global.serverPath + "/api/Personal/myReserve",{shopid:configuration.global.shopid,token:sessionStorage.getItem("token"),page:pageNo},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.reserveList = results.data.data;
		         		this.pageList.pageAll = Math.ceil(results.data.count/10)||1;
		         		this.pageList.pageNo = pageNo;
//		         		document.getElementById("reserall").style.display = this.reserveList.length === 0?"none":"block";
//		         		document.getElementById("reserNo").style.display = this.reserveList.length === 0?"block":"none";
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
	.myReser-conter{
		width: 100%;
		background-color: #fff;
	}
	.myReser-conter li{
		height: 7.2rem;
		border-bottom: 1px solid #E5E5E5;
	}
	.myReser-conter li > div{
		float: left;
	}
	.myReser-conter li .myReser-conter-img img{
		width: 2.933333333333333rem;
		height: 2.8666666666666667rem;
		margin: 1.1333333333333333rem 1.2rem 3.2rem 1rem;
	}
	.myReser-conter li .myRescon-explant{
		font-size: 0.8rem;
		color: #333;
		line-height: 1.2rem;
		margin-top: 0.5rem;
	}
	.myReser-conter li .r-explant-title{
		line-height: 1.5rem;
		font-size: 0.9333333333333333rem;
		color: #000;
		font-weight: bold;
	}
	.rescon-start{
	    position: absolute;
	    right: 1.1rem;
	    font-size: 0.86rem;
	    color: #00b9a4;
	    margin-top: 0.6rem;		
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
	.nav>ul>.li1{
		color: #ff5102;
	    border-bottom:2px solid #ff5102;
	}	
	.reservation-no .content{
	    width:100%;
	    margin:0px auto;
	}
	.reservation-no .content>ul{
	
	}
	.reservation-no .content>ul>li{
	    text-align:center;
	    padding-top:2.966666666666667rem;
	}
	.reservation-no .content>ul>li>img{
	    width:7.9rem;
	    height:8.4rem;
	}
	.reservation-no .content>ul>li>p{
	    font-size:0.9333333333333333rem;
	    color:#000000;
	    padding-top:2.2666666666666666rem;
	}	
	.reservation-no .fabu{
	    width:100%;
	    height: 2.1rem;
	    text-align: center;
	    margin-top: 2rem;
	}
	.reservation-no .fabu .btn{
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
