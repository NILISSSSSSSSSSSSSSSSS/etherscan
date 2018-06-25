<template>
  <div>
    <!--//状态栏显示-->
    <router-states></router-states>
    <!--info-->
    <div class="commonInfoBox routerShow_width">
      <div class="commonInfoHeader lightYellow">
        {{ $t('commonStr.addressInfo')}}
      </div>
      <div class="commonInfoBody">
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL"> {{ $t('commonStr.hash')}}:</span><span class="commonInfo_itemR">{{address }}</span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL"> {{ $t('commonStr.value')}}:</span><span class="commonInfo_itemR">{{infobody.Balance  }}</span>
        </div>
        <div class="commonInfoRow" >
          <span class="commonInfo_itemL">{{ $t('commonStr.TotalTxt')}}:</span>
          <span class="commonInfo_itemR">
           {{infobody.TransCount }}
         </span>
        </div>
      </div>
    </div>
    <!--//表格-->
    <div class="routerShow_width">
      <div class="infoTit">
        <span>{{ $t('commonStr.transactions')}}</span>
        <span> <router-link :to="{path:'/transactions',query: {'address': address}}">{{ $t('commonStr.viewAll')}}</router-link></span>
      </div>
      <!--//表格-->
      <el-table :data="tabAll.tableData" style="width: 100%; margin-bottom: 50px;">
        <div  slot="empty">{{$t('commonStr.noData')}}</div>
        

        <el-table-column prop="TxHash"  :label="$t('commonStr.hash')" min-width="180" align="center">
          <template slot-scope="scope" >
            <router-link class="lightYellow"  :to="{path:'/transactions/transactionsInfo',query: {hash: scope.row.TxHash}}" >{{scope.row.TxHash}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="BlockHeight"  :label="$t('commonStr.block')" width="100" align="center">
          <template slot-scope="scope">
            <router-link class="lightYellow"  :to="{path:'/blocks/blocksInfo',query: {height: scope.row.BlockHeight}}" >{{scope.row.BlockHeight}}</router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column  :label="$t('commonStr.TxType')"  align="center">
             <template slot-scope="scope">
                        {{ scope.row.Type | filterType}}
             </template>
        </el-table-column> -->
        <el-table-column :label="$t('commonStr.TimeStamp')"  align="center">
            <template slot-scope="scope">
                        {{ age(scope.row.TimeStamp) }}
             </template>
        </el-table-column>
        <el-table-column prop="FromAddress" :label="$t('commonStr.from')" min-width="180" align="center"></el-table-column>
        <el-table-column prop="ToAddress" :label="$t('commonStr.to')" min-width="180" align="center"></el-table-column>
        <el-table-column prop="Value" :label="$t('commonStr.value')" align="center"></el-table-column>
        <el-table-column prop="TotalFee" :label="$t('commonStr.fee')" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
  /*@import '../commonStyle/common.css';*/

  .infoTit{
   display: flex;margin-top: 40px;line-height: 2;
    height: 30px;justify-content: space-between;
  }
  .infoTit>span:nth-child(1){
    font-size: 15px;color: black;
  }
  .infoTit>span:nth-child(2)>a{
    color: #585f69;font-size: 14px;
  }

  .el-table__header th>.cell {
    text-transform: capitalize!important;    
  }
  .el-table div.cell{
  word-break:hyphenate;
  }
  /*.el-table .cell,*/
  .commonInfo_itemL {
    
    width: 35%;
    min-width: 45px;
}
</style>


<script>
  import routerStates from "../components/routerStates.vue"
  import {getAddrinfo } from "../api/api.js";

  export default {
    name:"transactionsInfoView",

    data:function(){
      return {
        infobody:{},
        address:"",
        tabAll:{
          currentPage1: 1,
          count:2,
          tableData: []
        },

      }
    },
    components: {
      'router-states': routerStates,
    },
  
    beforeMount(){
    	this.address=this.$route.query.address;
			this.getAccountInfo();
    },
    mounted(){
			
    },
    methods:{
      handleSizeChange:function(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange:function(val) {
        console.log(`当前页: ${val}`);
      },
      getAccountInfo(){
        getAddrinfo({'address':this.address}).then(resp=>{
	        	if(resp.code=="0"){
		      		this.infobody=resp.data;
		      		this.tabAll.tableData=this.infobody.Transactions.current;
            }
            else{
              this.commonTips(resp.msg);
            }
		    }).catch(err=>{
           this.commonTips("请求失败");
        });
      },
    
      
    }
  };
</script>
