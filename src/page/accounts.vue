<template>
  <div>
    <!--//状态栏显示-->
    <router-states></router-states>
    <!-- blocks列表-->
    <div class="routerShow_width">
       <!-- 自定义分页 -->
       <div class="pageBox">
        <div class="el-pagination">
              <button type="button" ref="btnPrev" class="btn-prev"  @click="pageChange(tabAll.currentPage1-1)"><i class="el-icon el-icon-arrow-left"></i></button>
              <ul class="el-pager">
                <li class="number " @click="pageChange(1)" :class="{ active:tabAll.currentPage1==1}" >1</li>
                <li class="number" v-if="dianIsShow">...</li>
              </ul>
              <button type="button" ref="btnNext" class="btn-next" @click="pageChange(tabAll.currentPage1+1)"><i class="el-icon el-icon-arrow-right"></i></button>
            </div>
       </div>
   
      <!-- <div class="pageBox">
        <! <p> {{tabAll.total}} {{ $tc('account', parseInt(tabAll.total)) }}</p> -->
        <!-- 分页-->
        <!-- <el-pagination  @current-change="handleCurrentChange" :pager-count="pagerCount"
                       :page-size="pageSize" layout="prev, pager, next" :total="tabAll.total" :current-page.sync="tabAll.currentPage1">
        </el-pagination> -->
      <!-- </div> --> 
      <!--//表格-->
      <el-table :data="tabAll.tableData" style="width: 100%">
       <div  slot="empty">{{$t('commonStr.noData')}}</div>
        <el-table-column type="index" :label="$t('commonStr.rank')" width="60" align="center"></el-table-column>
        <el-table-column prop="Address" :label="$t('commonStr.address')" min-width="270"  align="center">
          <template slot-scope="scope">
            <router-link class="lightYellow" :to="{path:'/accounts/accountsInfo',query: {address: scope.row.Address}}" >{{scope.row.Address}}</router-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commonStr.value')" align="center">
            <template slot-scope="scope">
                        {{ scope.row.Balance  }}
             </template>
        </el-table-column>
        <el-table-column  :label="$t('commonStr.TxCount')" min-width="110"  align="center">
           <template slot-scope="scope">
                        {{ scope.row.TransCount  }}
             </template>
        </el-table-column>
      </el-table>
      <!--//下边分页-->
      <!-- 分页-->
      <!-- <el-pagination class="bottomPage"  @current-change="handleCurrentChange" :pager-count="pagerCount"
                     :page-size="pageSize" layout="prev, pager, next" :total="tabAll.total" :current-page.sync="tabAll.currentPage1">
      </el-pagination> -->

       <!-- 自定义分页 -->
        <div class="pageBox ziDIngPage">
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
  /*@import '../commonStyle/common.css';*/
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
    padding: 16px 0;       justify-content: flex-end;
    display: flex;border-bottom: 1px solid #ebeef5;
   
  }
  .ziPage{
     height: 40px;
    line-height: 40px;
    color: gray;
    text-align: right;
        display: block;
    font-size: 12px;
    font-weight: 700;
  }
  .ziPage>span{
    padding: 0 4px;
    cursor: pointer
  }
  .el-pagination {
  text-align: right;
}
</style>

<script>
  import routerStates from "../components/routerStates.vue"
   import { getAddrlist } from "../api/api.js";
   let globVar;
  export default {
    name:"accounts",
    data:function(){
      return {
        dianIsShow:true,
         pagerCount:5,
          pageSize:20,
        tabAll:{
          total:0,
          currentPage1: 1,
          tableData: [ ],
        },

      }
    },
    components: {
      'router-states': routerStates
    },
    mounted:function(){
      globVar=0;
			this.getAccount();
    },
    methods:{
      pageChange:function(val) {
        	this.tabAll.currentPage1=val;
          this.getAccount();
      },
      styleChange(className,flag){
        
         document.getElementsByClassName(className)[0].disabled=flag
          document.getElementsByClassName(className)[1].disabled=flag
      }, 
      // handleCurrentChange:function(val) {
      //   	this.tabAll.currentPage1=val;
      // 	 this.getAccount();
      // },
      getAccount(){
        var dataObj={'page':this.tabAll.currentPage1,'count':this.pageSize};
        getAddrlist(dataObj).then(resp => {
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

               //如果是第一页,改变分页样式
               this.tabAll.currentPage1==1 ?  this.styleChange("btn-prev",true) : this.styleChange("btn-prev",false);
              //如果是最后一页，改变分页样式
              this.tabAll.tableData.length<this.pageSize ? this.styleChange("btn-next",true) :  this.styleChange("btn-next",false)
	        	}
	      }).catch(err=>{
           this.commonTips("请求失败");
        });
    
      },
      
    }
  };
</script>
