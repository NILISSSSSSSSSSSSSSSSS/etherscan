<template>
  <div >
    <!--//状态栏显示-->
    <router-states></router-states>
    <!-- blocks列表-->
    <div class="routerShow_width" >
      <div class="pageBox">
          <p >
          
            {{tabAll.total}} {{$tc('block', parseInt(tabAll.total))}}
            <!-- {{ $t('blocks.tit', { msg3: tabAll.total }) }} -->
            </p>
        <!-- 分页-->
        <el-pagination  @current-change="handleCurrentChange" current-page.sync=1 :pager-count="pagerCount"
          :page-size="psgeSize" layout=" prev, pager, next" :total="tabAll.total" :current-page.sync="tabAll.currentPage1">
        </el-pagination>
      </div>
      <!--//表格-->
      <div style="width:100%">
          <el-table   :data="tabAll.tableData" style="width: 100%;margin-bottom: 50px;"><!-- height="500"--> 
           <div  slot="empty">{{$t('commonStr.noData')}}</div>
            <el-table-column   :label="$t('commonStr.hash')"   min-width="190" align="center">
              <template slot-scope="scope">
                        {{ scope.row.BlockHash  }}
             </template>
        </el-table-column>
        <el-table-column prop="Height" :label="$t('commonStr.height')"  min-width="70" align="center">
          <template slot-scope="scope">
              <router-link class="lightYellow"  :to="{path:'/blocks/blocksInfo',query: {height: scope.row.Height}}" >{{scope.row.Height}}</router-link>
          </template>
        </el-table-column>
        <el-table-column  :label="$t('commonStr.TimeStamp')"  min-width="90" align="center">
             <template slot-scope="scope">
                        {{ age(scope.row.TimeStamp) }}
             </template>
        </el-table-column>
        <el-table-column   :label="$t('commonStr.Txn')"  align="center"  width="90">
             <template slot-scope="scope">
                        {{ scope.row.TransCount  }}
             </template>
        </el-table-column>
        
        <!-- <el-table-column :label="$t('commonStr.totalFee')"  min-width="80" align="center">
          <template slot-scope="scope">
                        {{ scope.row.TotalFee  }}
          </template>
        </el-table-column> -->
      </el-table>
      </div>
      <!--//下边分页-->
      <el-pagination class="bottomPage"  @current-change="handleCurrentChange" :pager-count="pagerCount"
                     :page-size="psgeSize" layout="prev, pager, next" :total="tabAll.total" :current-page.sync="tabAll.currentPage1">
      </el-pagination>
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

</style>

<script>
  import routerStates from "../components/routerStates.vue"
  import {getBloclist } from "../api/api.js";
  let _this;
  export default {
    name:"blocks",
    data:function(){
      return {
         pagerCount:5,
         psgeSize:20,
       	tabAll:{
         currentPage1: 1,
         total:0,
         tableData: [ ],
        
       },
      }
    },
    components: {
      'router-states': routerStates
    },
    mounted(){
        // this.commonTips("333");
      //  this.commonTips("444");
    	
    },
    created:function(){
        _this=this;
        this.getBlocks(1);
    },
    methods:{
      handleCurrentChange(val) {
      	this.tabAll.currentPage1=val;
      	this.getBlocks();
      },
      getBlocks(){
        var dataObj={'page':this.tabAll.currentPage1,'count':this.psgeSize};
        getBloclist(dataObj).then(resp => {
	        	if(resp.code=="0"){
	        		this.tabAll.tableData=resp.data.current;
	        		this.tabAll.total=resp.data.total;
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
