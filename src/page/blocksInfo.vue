<template>
  <div v-cloak >
    <!--//状态栏显示-->
    <router-states></router-states>
    <!--info-->
    <div class="commonInfoBox routerShow_width" v-if="infobody">
      <div class="commonInfoHeader lightYellow">
       {{ $t('commonStr.blockInfo')}}
      </div>
      <div class="commonInfoBody">
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.height')}}: </span><span class="commonInfo_itemR">{{infobody.Height}}</span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.TimeStamp')}}:</span><span class="commonInfo_itemR">{{ age(infobody.TimeStamp) }}</span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.transactions')}}:</span>
          <span class="commonInfo_itemR">
      
          	<a class="lightYellow" @click="showTransactions()" style="cursor: pointer;">{{infobody.trade}} transactions</a>
            <!--<router-link :to="{path:'/transactions',query:{block:infobody.Height}}" class="lightYellow"> {{infobody.trade}} transactions</router-link>-->
         </span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.hash')}}:</span><span class="commonInfo_itemR">{{infobody.BlockHash}}</span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.ParentHash')}}:</span><span class="commonInfo_itemR">
            {{infobody.ParentHash}}
           <!-- <router-link :to="{path:'/blocks/blocksInfo',query:{type:'hash',value:infobody.ParentHash}}" class="lightYellow">  {{infobody.ParentHash}}</router-link> -->
         </span>
        </div>
        <!--<div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.size')}}:</span><span>{{infobody.Size}}</span>
        </div>-->
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.blockReward')}}:</span><span class="commonInfo_itemR">{{infobody.TotalFee}}</span>
        </div>
      </div>
    </div>
    <div v-else class="noDataClass">
       未找到该区块
    </div>
    <div class="routerShow_width"  style="margin-top: 20px;" v-if="showTable">
    	<!--//表格-->
      <el-table :data="tabAll" style="width: 100%">
        <div  slot="empty">{{$t('commonStr.noData')}}</div>
        <el-table-column prop="TxHash"  :label="$t('commonStr.TxHash')"  width="180" align="center">
          <template slot-scope="scope">
            <router-link class="lightYellow"  :to="{path:'/transactions/transactionsInfo',query: {hash: scope.row.TxHash}}" >{{scope.row.TxHash}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="BlockHeight"  :label="$t('commonStr.block')" width="90" align="center">
          <template slot-scope="scope">
           {{scope.row.BlockHeight}}
          </template>
        </el-table-column>
        <el-table-column prop="Status" :label="$t('commonStr.TxReceiptStatus')"  width="90" align="center">
          <template slot-scope="scope">
                        {{ scope.row.Status | filterStatus }}
           </template>
        </el-table-column>
        <el-table-column  :label="$t('commonStr.TimeStamp')"  align="center">
             <template slot-scope="scope">
                        {{ age(scope.row.TimeStamp) }}
             </template>
        </el-table-column>
        <el-table-column prop="FromAddress" :label="$t('commonStr.from')" min-width="170" align="center">
          <template slot-scope="scope">
                        {{ scope.row.FromAddress  }}
             </template>
        </el-table-column>
        <el-table-column prop="ToAddress" :label="$t('commonStr.to')" min-width="170" align="center">
             <template slot-scope="scope">
                        {{ scope.row.ToAddress  }}
             </template>
        </el-table-column>
        <el-table-column prop="Value" :label="$t('commonStr.value')" min-width="100" align="center"></el-table-column>
        <el-table-column prop="Fee" :label="$t('commonStr.fee')" align="center">
            <template slot-scope="scope">
                        {{ scope.row.Fee  }}
             </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped>
 
  [v-cloak] {
  /*//避免vue加载时有代码显示*/
      display: none;
  }
 .el-table__body{
    width: 100%;
  }
  .el-table th {
    background: gray;
  }
  .bottomPage{
    margin-bottom: 20px;text-align: right;
  }
  .el-table tr{
    background: transparent;
  }
  .pageBox{
    padding: 16px 0;    justify-content: space-between;
    display: flex;border-bottom: 1px solid #ebeef5;
  }
  .cell {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-table {
  
    margin-bottom: 30px;
}
.commonInfo_itemL {
  
    min-width: 102px;
}
</style>

<script>
  import routerStates from "../components/routerStates.vue"
    import {getBlockinfo } from "../api/api.js";
    let _this
  export default {
    name:"blocksInfoView",
    data(){
      return{
        infobody:"",
      	type:"",value:"",
      	tabAll:[],
        showTable:false,
    	}
    },
    components: {
      'router-states': routerStates,
    },
   
    beforeMount(){
       _this=this;
    	this.value=this.$route.query.height;
    },
    mounted:function(){
			this.getBlockDetail();
    },
    methods:{
			getBlockDetail(){
        getBlockinfo({'height':""+this.value}).then(resp => {
        	if(resp.code=="0"){
        		this.infobody=resp.data;
            this.tabAll=resp.data.transactions;
            this.infobody.trade=this.infobody.transactions.length;
          }
          else{
             this.commonTips(resp.msg);
          }
         
	      }).catch(err=>{
           this.commonTips("请求失败");
        });
			},
	
			showTransactions(){
				this.showTable=!this.showTable;
			}
			
    }
  };
</script>
