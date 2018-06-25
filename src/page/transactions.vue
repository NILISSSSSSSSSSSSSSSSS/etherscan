<template>
  <div >
    <!--//状态栏显示-->
    <router-states></router-states>
    <!-- blocks列表-->

    <div class="routerShow_width">

      <div class="pageBox" v-if="jiaoYi_fenYe">
        <p> {{tabAll.total}} {{ $tc('transaction', parseInt(tabAll.total)) }}</p>
        <!-- 交易列表分页-->
        <el-pagination  @current-change="handleCurrentChange" :pager-count="pagerCount"
                       :page-size="pageSize" layout="prev, pager, next" :total="tabAll.total" :current-page.sync="tabAll.currentPage1" >
        </el-pagination>
      </div>
           <!-- 自定义分页 -->
        <div class="pageBox ziDIngPage" v-else>
             <div class="el-pagination">
              <button type="button" ref="btnPrev" class="btn-prev"  @click="pageChange(tabAll.currentPage1-1)"><i class="el-icon el-icon-arrow-left"></i></button>
              <ul class="el-pager">
                <li class="number " @click="pageChange(1)" :class="{ active:tabAll.currentPage1==1}" >1</li>
                <li class="number" v-if="dianIsShow">...</li>
              </ul>
              <button type="button" ref="btnNext" class="btn-next" @click="pageChange(tabAll.currentPage1+1)"><i class="el-icon el-icon-arrow-right"></i></button>
            </div>
       </div>

      <!--//表格-->
      <el-table :data="tabAll.tableData" style="width: 100%;    margin-top: 20px;"  >
        <div  slot="empty">{{$t('commonStr.noData')}}</div>
        <el-table-column prop="TxHash"  :label="$t('commonStr.hash')"  min-width="183" align="center">
          <template slot-scope="scope">
            <router-link class="lightYellow"  :to="{path:'/transactions/transactionsInfo',query: {hash: scope.row.TxHash}}" >{{scope.row.TxHash}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="BlockHeight"  :label="$t('commonStr.block')" min-width="70" align="center">
          <template slot-scope="scope">
            <router-link class="lightYellow"  :to="{path:'/blocks/blocksInfo',query: { height: scope.row.BlockHeight}}" >{{scope.row.BlockHeight}}</router-link>
          </template>
        </el-table-column>
        <el-table-column  :label="$t('commonStr.TxReceiptStatus')"  width="90" align="center">
           <template slot-scope="scope">
                        {{ scope.row.Status | filterStatus }}
           </template>
        </el-table-column>
        <el-table-column  :label="$t('commonStr.TimeStamp')" min-width="90"  align="center">
             <template slot-scope="scope">
                        {{ age(scope.row.TimeStamp)}}
             </template>
        </el-table-column>
        <el-table-column  :label="$t('commonStr.from')" min-width="130" align="center">
           <template slot-scope="scope">
                        {{ scope.row.FromAddress}}
             </template>
        </el-table-column>
        <el-table-column  :label="$t('commonStr.to')" min-width="140" align="center">
             <template slot-scope="scope">
                        {{ scope.row.ToAddress}}
             </template>
        </el-table-column>
        <el-table-column  :label="$t('commonStr.value')" min-width="110" align="center">
           <template slot-scope="scope">
                        {{ scope.row.Value}}
           </template>
        </el-table-column>
        <el-table-column  :label="$t('commonStr.fee')" align="center" min-width="110">
            <template slot-scope="scope">
                        {{ scope.row.Fee}}
           </template>
        </el-table-column>
      </el-table>
      <!--//交易列表分页-->
      <!-- 分页-->
      <el-pagination class="bottomPage" v-if="jiaoYi_fenYe"  @current-change="handleCurrentChange" :pager-count="pagerCount"
                     :page-size="pageSize" layout="prev, pager, next" :total="tabAll.total" :current-page.sync="tabAll.currentPage1">
      </el-pagination>

          <!-- 自定义分页 -->
        <div class="pageBox ziDIngPage" v-else>
             <div class="el-pagination">
              <button type="button" ref="btnPrev" class="btn-prev"  @click="pageChange(tabAll.currentPage1-1)"><i class="el-icon el-icon-arrow-left"></i></button>
              <ul class="el-pager">
                <li class="number " @click="pageChange(1)" :class="{ active:tabAll.currentPage1==1}" >1</li>
                <li class="number" v-if="dianIsShow">...</li>
              </ul>
              <button type="button" ref="btnNext" class="btn-next" @click="pageChange(tabAll.currentPage1+1)"><i class="el-icon el-icon-arrow-right"></i></button>
            </div>
       </div>
    </div>
  </div>

</template>

<style scoped>

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
</style>

<script>
  import routerStates from "../components/routerStates.vue"
  import {getTradelist,getWalletRecord } from "../api/api.js";
  let globVar;
  export default {
    name:"transactions",
    data:function(){
      return {
        empty:"123",
        pageSize:20,
        pagerCount:5,
        address:"",
        dianIsShow:true,
        jiaoYi_fenYe:true,
        tabAll:{
          currentPage1: 1,
          total:1,
          tableData: []
        },
      }
    },
    components: {
      'router-states': routerStates
    },

    beforeMount(){
      this.$nextTick(()=>{
          globVar=0;
          this.address=this.$route.query.address;
          this.check_load()
      })
    	
    },
    methods:{
        // -------------------交易列表相关------------------
       handleCurrentChange:function(val) {
      	this.tabAll.currentPage1=val;
        this.check_load()
      },
      getTransaction(){
        var dataObj={'page':this.tabAll.currentPage1,'count':this.pageSize};
        getTradelist(dataObj).then(resp => {
	        	if(resp.code=="0"){
	        		this.tabAll.tableData=resp.data.current;
              this.tabAll.total=resp.data.total;
	        	}
	      })
   
      },
      // ----------------地址列表相关-----------
      pageChange:function(val) {
        	this.tabAll.currentPage1=val;
          this.check_load()
      },
      styleChange(className,flag){
        console.log(document.getElementsByClassName(className).length)
         document.getElementsByClassName(className)[0].disabled=flag
          document.getElementsByClassName(className)[1].disabled=flag
      },
       getAddress(){
         var dataObj={'address':this.address,'page':this.tabAll.currentPage1,'count':this.pageSize};
        getWalletRecord(dataObj).then(resp => {
        	if(resp.code=="0"){
              this.tabAll.tableData=resp.data.current;
              
                // 判断 ... 是否显示
               globVar=globVar+1;
              if(globVar==1){
                this.tabAll.tableData.length<this.pageSize ? this.dianIsShow=false : this.dianIsShow=true
              }
              else{
                this.dianIsShow=true
              }

              // this.tabAll.total=resp.data.total;
               //如果是第一页,改变分页样式
               this.tabAll.currentPage1==1 ?  this.styleChange("btn-prev",true) : this.styleChange("btn-prev",false);
              //如果是最后一页，改变分页样式
              this.tabAll.tableData.length<this.pageSize ? this.styleChange("btn-next",true) :  this.styleChange("btn-next",false)
	        	}
	      })
      },
      // -------------------结束----------------------

      check_load(){
           if(this.address==undefined){
              this.jiaoYi_fenYe=true;
              this.getTransaction();
           
          }else{
            this.jiaoYi_fenYe=false;
            this.getAddress();
          }
      }
      
      
    }
  };
</script>
