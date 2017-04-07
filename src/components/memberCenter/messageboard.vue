<template>
	<div id="messageboard" style="position: relative;">
		<section class="main fixed" style="height:calc(100vh - 6.26rem);overflow-x: hidden;overflow-y: auto;">
			<article class="content">
				<div class="ly_top">
					<div class="ly_toptitle">留言板/ Message Board</div>
				</div>
				<div class="p_re nlyb_top clearfix overflow">
					<div class="nlyb_br"></div>
					<div class="nlyb_warp">
						<ul id="lyb">
							<li class="nlyb_bgstyle p_re" v-for="item in messageList" >
								<div class="nlyb_radius"></div>
								<div class="nlyb_box clearfix">
									<span class="nlyb_name">{{item.name||'匿名'}}</span>
									<span class="nlyb_time">{{item.create_time}}</span>
									<!--<span v-bind:class="'nlyb_star_'+item.count" class="nlyb_star"></span>-->
									<span class="mess-xinxin">
										<em v-bind:class="isActive(item,1)" class="order-xinxin"></em>
										<em v-bind:class="isActive(item,2)" class="order-xinxin"></em>
										<em v-bind:class="isActive(item,3)" class="order-xinxin"></em>
										<em v-bind:class="isActive(item,4)" class="order-xinxin"></em>
										<em v-bind:class="isActive(item,5)" class="order-xinxin"></em>
									</span>
								</div>
								<div class="nlyb_con">{{item.text}}</div>
								<div class="nlyb_admin p_re" v-for="messItem in item.message" >
									<div class="nlyb_adthree"></div>
									<em>{{messItem.name||'匿名'}}</em>回复：<span class="nlyb_empty">{{messItem.text}}</span>
								</div>
								<div class="mess-reinput" v-on:click="messageInput(item.id)" ></div>
							</li>
						</ul>
					</div>
				</div>
				<div class="hotel-page">
					<div class="hotel-page-b" v-on:mousedown="getMessage('back')" >
						<img src="../../images/life_previous_pages_arrow@2x.png"/>
						<span class="hotel-page-back">{{pageList.pageNo==1&&"已到首页"||"上一页"}}</span>							
					</div>
					<span class="hotel-pages-th">{{pageList.pageNo}}/{{pageList.pageAll}}</span>
					<div class="hotel-page-n" v-on:mousedown="getMessage('next')" >
						<span class="hotel-page-next">{{pageList.pageNo==pageList.pageAll&&"已到尾页"||"下一页"}}</span>
						<img src="../../images/life_next_pages_arrow@2x.png"/>
					</div>
				</div>				
			</article>	
		</section>
		<div class="ly_header"><span id="ly_showalert" v-on:click="messageInput()" ><a href="javascript:void(0);">发表留言</a></span></div>
	</div>
</template>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		messageList:[],
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		}         		
        	}
        },    	
        mounted: function () {
            this.getMessage();
        },
        methods: {
		    getMessage:function(page){
		    	var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
		    	pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数		    	
		        this.$http.post(configuration.global.serverPath + "/api/Personal/getMessage",{page:pageNo,token:sessionStorage.getItem("token"),shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.messageList = results.data.data;
		         		this.pageList.pageAll = Math.ceil(results.data.count/10)||1;
		         		this.pageList.pageNo = pageNo;		         		
		         	}else{
		         		globalMethod.layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	globalMethod.layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });			    		
		    },
		    messageInput:function(id){
		    	sessionStorage.setItem("messtypeid",id||"");
		    	this.$router.push({name:"messageInput"});
		    },
		    isActive:function(item,xin){
		    	return Number(xin) > Number(item.count)?'active':'';
		    }
        }
    }
</script>
<style>
	#messageboard .hotel-copyright{
		margin-top: 3rem;
	}
	#messageboard .hotel-page{
		margin-top: 2rem;
	}
	#messageboard .nlyb_admin em{
		color: #039cf9;
		padding-right: 10px;
		text-decoration: underline;
	}
	#messageboard .mess-reinput{
	    width: 3.8rem;
	    height: 1.7rem;
	    line-height: 1.7rem;
	    text-align: center;
	    background-color: #63cd52;
	    border-radius: 9px;
	    color: #fff;
	    font-size: 0.9rem;
	    margin-left: 82%;
	    background: url(../../images/member_whole_reply_img.png) no-repeat;
	    background-size: 100%;		
	    margin-top: 0.6rem;
	}
	.overflow{
		overflow: hidden;
		position: relative;
	}
	        .nlyb_br {
            width: 5px;
            height: 100%;
            background: #f5f5f5;
            position: absolute;
            top: 0;
            left: 10px
        }
        .nlyb_warp {
            margin-left: 27px;
        }
        .ly_bottom {
            padding-bottom: 45px
        }
        .nlyb_warp1 {
            padding-bottom: 0
        }
        .ly_top {
            background: url("../../images/member_message_board_image@2x.png") no-repeat;
            background-size: 100% 100% !important;
            height: 100px;
            width: 100%
        }

        .ly_toptitle {
            color: #fff;
            font-size: 22px;
            text-align: center;
            line-height: 100px
        }

        .nlyb_star {
            background: url("../../images/member_star_image@2x.png") no-repeat;
            background-size: 70px 80px !important;
            display: block;
            width: 70px;
            height: 15px;
            position: absolute;
            right: 10px;
            top: 10px;
        }

        .nlyb_bgstyle {
            border-bottom:1px solid #e5e5e5;
            background: #fff;
            padding: 10px;
            position: relative;
            padding-bottom:0.3rem;
            padding-top:0.3rem;
        }

        .nlyb_name {
            font-size: 0.8rem;;
            color: #000
        }

        .nlyb_time {
            font-size: 0.8rem;
            color: #666;
            padding-left: 10px
        }

        .nlyb_radius {
            background: url("../../images/restaurant/member_symbo_image@2x.png") no-repeat;
            background-size: 20px 20px !important;
            width: 20px;
            height: 20px;
            position: absolute;
            left: -24px;
            top: 10px;
        }

        .nlyb_warp li {
            
        }

        .nlyb_box {
            padding: 0 0 5px 0
        }

        .nlyb_con {
            color: #666;
            font-size:0.9rem;
        }

        .nlyb_adthree {
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid #f3f3f3;
            font-size: 0;
            line-height: 0;
            position: absolute;
            top: -8px
        }

        .nlyb_admin {
            background: #f3f3f3;
            font-size: 0.8rem;
            padding: 5px;
            margin: 10px 5px 5px 0;
            color: #666;
            position:relative;
        }

        .nlyb_star_2 {
            background-position: 0 -16px
        }

        .nlyb_star_3 {
            background-position: 0 -32px
        }

        .nlyb_star_4 {
            background-position: 0 -49px
        }

        .nlyb_star_5 {
            background-position: 0 -67px
        }
        .lya_warp {
            margin-top: 5px;
            background: #fff;
            z-index: 99;
            opacity: 0;
            display: none;
            padding-bottom: 10px
        }

        .lya_warp2 {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%
        }

        .lya_zindex {
            z-index: 9999
        }

        .lya_title {
            height: 35px;
            line-height: 35px
        }

        .lya_title span {
            display: block;
            width: 33.33333%;
            float: left;
            text-align: center
        }

        .lya_sub font {
            box-shadow: 0 0 1px #007aff inset;
            box-shadow: 0 0 1px #007aff inset;
            color: #007aff;
            font-weight: bold;
            width: 50px;
            padding: 5px 10px
        }

        .lya_sub input {
            border: 0;
            background: #fff;
            font-weight: bold;
            color: #007aff
        }

        .ly_customer {
            margin-top: 0
        }

        .lya_false {
            text-align: left !important
        }

        .lya_false font {
            margin-left: 15px
        }

        .lya_true {
            text-align: right !important
        }

        .lya_true font {
            margin-right: 15px
        }
        .ly_starwar {
            padding-bottom: 0 !important
        }

        .ly_starwar1 {
            margin-top: 5px
        }

        .ly_star_ccc {
            background-position: -19px 0
        }

        #ly_star_3 .ly_star:nth-child(4),
        #ly_star_3 .ly_star:nth-child(5) {
            background-position: -19px 0
        }

        #ly_star_1 .ly_star:nth-child(2),
        #ly_star_1 .ly_star:nth-child(3),
        #ly_star_1 .ly_star:nth-child(4),
        #ly_star_1 .ly_star:nth-child(5) {
            background-position: -19px 0
        }

        #ly_star_2 .ly_star:nth-child(3),
        #ly_star_2 .ly_star:nth-child(4),
        #ly_star_2 .ly_star:nth-child(5) {
            background-position: -19px 0
        }

        #ly_star_4 .ly_star:nth-child(5) {
            background-position: -19px 0
        }

        #ly_star_5 .ly_star:nth-child(5) {
            background-position: 2px 0
        }

        .ly_starnum {
            margin-left: 10px;
            margin-top: 10px;
            font-size: 12px;
            color: #666
        }

        .ly_ver {
            vertical-align: middle
        }

        .ly_check {
            width: 90px !important
        }
    #messageboard .mess-xinxin{
    	position: absolute;
    	right: 0.7rem;
	}
	#messageboard .mess-xinxin .order-xinxin{
		display: inline-block;
		margin: -0.26rem 0;
		width: 1rem;
		height: 1rem;
		background: url(../../images/member_star_image@2x.png) no-repeat;
		background-size: 1rem;
	}
	#messageboard .mess-xinxin em.active{
		background: url(../../images/member_empty_star_img@2x.png) no-repeat;
		background-size: 1rem;
	}
</style>
