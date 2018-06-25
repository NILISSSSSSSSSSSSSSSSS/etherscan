<template>
  <div >
    <!--//状态栏显示-->
    <router-states></router-states>
    <!--info-->
    <div class="commonInfoBox routerShow_width">
      <div class="commonInfoHeader lightYellow">
        {{ $t('commonStr.transactionInfo')}}
      </div>
      <div class="commonInfoBody">
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.TxHash')}}:</span><span class="commonInfo_itemR">{{infobody.TxHash}}</span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.TxReceiptStatus')}}:</span><span class="commonInfo_itemR">{{infobody.Status | filterStatus}} </span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.height')}}:</span>
          <span class="commonInfo_itemR">
            <router-link :to="{path:'/blocks/blocksInfo',query:{height:infobody.BlockHeight}}" class="lightYellow"> {{infobody.BlockHeight}}</router-link><!--(3 block confirmations)-->
         </span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.TimeStamp')}}:</span><span class="commonInfo_itemR">{{ age(infobody.TimeStamp) }}</span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.from')}}:</span><span class="commonInfo_itemR">
           <router-link :to="{path:'/accounts/accountsInfo',query:{address:infobody.FromAddress}}" class="lightYellow">  {{infobody.FromAddress}}</router-link>
         </span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.to')}}:</span><span class="commonInfo_itemR">
           <router-link :to="{path:'/accounts/accountsInfo',query:{address:infobody.ToAddress}}" class="lightYellow">  {{infobody.ToAddress}}</router-link>
         </span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.value')}}:</span><span class="commonInfo_itemR">{{infobody.Value}}</span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.fee')}}:</span><span class="commonInfo_itemR">{{infobody.Fee}}</span>
        </div>

      </div>
    </div>
  </div>

</template>

<style scoped>
  /*@import '../commonStyle/common.css';*/

</style>

<script>
  import routerStates from "../components/routerStates.vue"
  import {getTradeinfo } from "../api/api.js";
  export default {
    name:"transactionsInfoView",

    data:function(){
      return{
        infobody: {},
          hash:""
      }
    },
    components: {
      'router-states': routerStates,
    },
  
    beforeMount(){
    	this.getTradeDetail();
    },
    mounted:function(){

    },
    methods:{
			getTradeDetail(){
        this.hash=this.$route.query.hash;
        getTradeinfo({'hash':this.hash}).then(resp => {
        	console.log(resp.data);
        	if(resp.code=="0"){
            this.infobody=resp.data;
        	}else{
             this.commonTips(resp.msg);
          }
	      }).catch(err=>{
           this.commonTips("请求失败");
        });
			},
    }
  };
</script>
