<template class="template"  >
    <div v-cloak class="homeBox routerShow_width"  >
      <!-- 上边 -->
        <div :gutter="20" class="homeBox_row">
            <!-- 左边echart -->
            <div id="myChart" ></div>
            <!-- 右边 -->
           <div class="serviceBlock" >
              <div class="blockColumn_item ">
                <h3 class="blockColumn_item_text">
                  <router-link to="blocks">{{$t('home.LASTBLOCKS')}}</router-link>
                </h3>
                <p class="blockColumn_item_text">
                  <router-link to="blocks" class="text_num"> {{BlockNumber}}</router-link>
                
                </p>
              </div>
              <div class="blockColumn_item ">
                <h3 class="blockColumn_item_text">
                  <router-link to="transactions">{{$t('commonStr.transactions')}}</router-link>
                </h3>
                <p class="blockColumn_item_text">
                  <router-link to="transactions" class="text_num"> {{TransactionCount}}</router-link>
                </p>
              </div>
         
              <div class="form">
                <input type="text" v-model.trim="keywords" class="formInput" :placeholder="$t('home.inputPlaceholder')"  @keyup.enter="searchAll()"/>
                <i class="el-icon-search formSearch" @click="searchAll()" ></i>
              </div>
            </div>
        </div>
        <div class="homeBox_row">
        <!-- 左边区块列表-->
        <div class="blockList">
           <div class="panel-heading">
              <h2 class="panel-title pull-left upperString">
                <i class="iconfont  icon-qian"></i>{{$t('commonStr.blocks')}}
               
              </h2>
             <span class="pull-right" v-if="blockData.length">
                <router-link to="blocks" >{{$t('commonStr.viewAll')}}</router-link>
             </span>
           </div>
          <div class="panel-body" v-if="blockData.length">
            <div class="panel-box">
              <div class="panel-item" v-for="(item,index) in blockData" :key="index">
                <h4>
                  <span class="upperString">{{$t('home.blockHash')}}:</span> {{item.BlockHash }}
                </h4>
                <p>
                  <span class="pull-left"> <!--<span class="upperString">-->{{$t('commonStr.height')}}<!--</span>-->:<router-link :to="{path:'/blocks/blocksInfo',query: {height:item.Height}}"  class="lightYellow">{{item.Height }}</router-link></span>
                  <span class="pull-right">{{ age(item.TimeStamp)  }} {{$t('commonStr.ago')}}</span>
                </p>
                 <p>
                   <span class="pull-left"><span class="upperString">{{$t('commonStr.Txn')}}</span>: {{item.TransCount || 0}}</span>
                   <!-- <span class="pull-right"><span class="upperString">{{$t('commonStr.totalFee')}}</span>: {{item.TotalFee || 0 }}</span> -->
                 </p>
              </div>
            </div>
          </div>
               <div v-else class="noDataClass">
               {{$t('commonStr.noData')}}
            </div>
        </div>
        <!-- 右边交易列表-->
        <div class="transationsList">
          <div class="panel-heading">
            <h2 class="panel-title pull-left">
             
              <i class="iconfont  icon-jiaoyimingxi"></i>
              <span class="upperString">
                {{$t('commonStr.transactions')}}
              </span>

            </h2>
             <span class="pull-right" v-if="TransactionsData.length">
                <router-link to="transactions">{{$t('commonStr.viewAll')}}</router-link>
             </span>
          </div>
          
          <div class="panel-body" v-if="TransactionsData.length">
          
            <div class="panel-box">
              <div class="panel-item" v-for="(item,index) in TransactionsData" :key="index">
                <h4>
                  
                  TX#: <router-link :to="{path:'/transactions/transactionsInfo',query: {hash: ''+item.TxHash}}" class="lightYellow">{{item.TxHash }}</router-link>
                </h4>
                <p>
                  <span class="pull-left textL3" > <span class="upperString">{{$t('commonStr.from')}}:</span><router-link :to="{path:'/accounts/accountsInfo',query: {address: item.FromAddress}}" class="lightYellow">{{item.FromAddress }}</router-link> </span>
                  <span class="pull-right">{{ age(item.TimeStamp) }} {{$t('commonStr.ago')}}</span>
                </p>
                <p>
                  <span class="pull-left textL3"><span class="upperString">{{$t('commonStr.to')}}:</span><router-link :to="{path:'/accounts/accountsInfo',query: {address: item.ToAddress}}" class="lightYellow">{{item.ToAddress }}</router-link></span>
                  <span class="pull-right textR3 "><span class="upperString">{{$t('commonStr.value')}}:</span>{{item.Value }} </span>
                </p>
              </div>
            </div>
          </div>
           <div v-else class="noDataClass">
               {{$t('commonStr.noData')}}
            </div>
        </div>

      </div>
    </div>

</template>

<script>

import { getBlocknumData,getTradenumData,getBloclist,getTradelist,getCount15days,search,getBlockinfo,getTradeinfo,getAddrinfo } from "../api/api.js";

   let dateArray;
    export default {
      name: 'homeView',
      data:function(){
          return{
           
            keywords:"",
            serviceBlock:"",
            blockData:[
	            // {"BlockHash":"0xe8210fb080f42c560b0d654344d3362f62c9e7706d09df508e050286","Height":"1364","TransCount":"1","time":"1mins","TotalFee":"0"},
            ],
            TransactionCount:"",
            BlockNumber:"",
            TransactionsData:[],
            // TransactionsData:[
            //   {"TxHash":" 0xe8210fb080f42c560b0d654344d3362f62c9e7706d09df508e050286", 
            //   "FromAddress":"0x7a9e11dcbe6bd68595a2608d2fc3f631c52b4ad9","ToAddress":"0x27811fd633825f35c50cf21c671967edb71c5f38", "time":"13", "Value":"123" },
            // ],
            aa:"123",
            //echarts实例
            echart: "", 
            option:{
              title : {
                text:this.$t('echartTit'),subtext: '',x:'center',y:"19",
                textStyle:{ fontSize:14,fontWeight:"normal" }
              },
              grid: {
                left: '20px',right: '65px',bottom: '20px',
                y:54,  containLabel: true,
              },
              tooltip : {trigger: 'axis'},
              toolbox: {
                show : false,
                feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar']},
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              calculable : true,
              xAxis : [
                {
                  name:this.$t('echartXname'), type : 'category',
                  nameTextStyle:{//修改坐标轴单位的字体颜色
                    color:'black',
                  },
                  axisLine:{show:false},
                  axisTick:{alignWithLabel:true},//设置值和刻度线对齐
                  axisLabel: {/*formatter: '{value}',*/ textStyle: {color: 'black'}},//修改坐标轴上值的字体颜色
                  data:[],
                }
              ],
              yAxis : [
                {
                  'name':'', type : 'value',
                  axisTick: { show: false }, //隐藏刻度线
                  axisLine:{ show:false  },
                  nameTextStyle:{color:'black'},//修改坐标轴单位的字体颜色
                  axisLabel: {/*formatter: '{value}',*/ textStyle: {color: 'black'} } //修改坐标轴上值的字体颜色
                }
              ],
              series : [
                {
                  name:'Transactions',type:'line',
                  data:[0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0],
                  symbol:"circle", symbolSize:5,
                  itemStyle : {
                    normal : {
                      color:'#ff9f43',
                      label : {show: false},
                      lineStyle:{//折现颜色
                        color:'#ff9f43'
                      }
                    }
                  },

                }
              ]
            }
          }
      },
   
      mounted(){
        this.getBlocknum();//块数据
        this.getTradenum();//交易数
        this.getBlocks();//最近块
        this.getTrade();//最近交易
        this.getTradeCount15days();
        
        this.getxAxisdata();
        //  this.init();
         window.onresize = this.resize;
      },
     
      methods: {
        resize(){
          this.echart.resize();
        },
        init:function() {
            this.echart = this.$echarts.init(document.getElementById("myChart"));
            this.echart.setOption(this.option);
        },
       
        //横坐标值是今天往前推15天
        getxAxisdata(){//折线图X坐标
          var myDate = new Date(); //获取今天日期
          myDate.setDate(myDate.getDate() - 14);
           dateArray = []; 
          var dateTemp; 
          var flag = 1; 
          for (var i = 0; i <= 15; i++) {
              dateTemp = (myDate.getMonth()+1)+"/"+myDate.getDate();
              dateArray.push(dateTemp);
              myDate.setDate(myDate.getDate() + flag);
          }
        	 this.option.xAxis[0].data=dateArray;
        },
        getTradeCount15days(){//折线图数据
          getCount15days().then(resp=>{
            
	          	if(resp.code=="0"){
                //横坐标遍历获取 /后面的日期
                let newXaray=dateArray.map(ele=>{
                    return parseInt(ele.split('/')[1])
                })
                //对应赋值
                let seriesData=resp.data;
                 for(var i = 0 ; i < newXaray.length ; i++){
                      for(var j = 0 ; j < seriesData.length ; j++){
                        if(newXaray[i]==parseInt(seriesData[j].date.split('-')[2])){
                          this.option.series[0].data[i]=seriesData[j].num
                        }
                      }
                 }
                 this.init();
	          	}
	        })
       
        },
        getBlocknum(){
          getBlocknumData().then(resp=>{
                if(resp.code=="0"){
                  this.BlockNumber=resp.data.BlockNumber;
                }
              
            })
        },
        getTradenum(){
          getTradenumData().then(resp=>{
                if(resp.code=="0"){
                this.TransactionCount=resp.data.TransactionCount;
              }
            
            })
        },
        getBlocks(){
          getBloclist().then(resp => {
                if(resp.code=="0"){
                  this.blockData=resp.data.current;
                }
                else{
                   this.commonTips(resp.msg);
                }
            }).catch(res=>{ this.commonTips("请求失败")})
        },
        getTrade(){
            getTradelist().then(resp => {
                if(resp.code=="0"){
                  this.TransactionsData=resp.data.current;
                }
            })

        },
        // 搜索部分
        searchAll(){
         
          const keyword=this.keywords.match(/^0x[0-9A-Fa-f]*$/); //匹配以 0x开头的，包含有 0-9,A-F,a-f的字符串
          const len=this.keywords.length;
          if(keyword!=null){
            switch(len){
              case 42:
              //搜索Address
              this.searchCommon("/explorer/addrinfo",{'address':this.keywords},{
                  path:'/accounts/accountsInfo',
                  query:{
                    address: this.keywords
                  }
                }); break;
              case 66:
              //搜索TradeHash
                this.searchCommon("/explorer/tradeinfo",{'hash':this.keywords},{
                path:'/transactions/transactionsInfo',
                query:{
                  hash: this.keywords
                }
              }); break;
              default:this.commonTips("搜索格式错误");
            }
          }else if(this.keywords!=""){
            //搜索块高
              this.searchCommon("/explorer/blockinfo",{'height':""+this.keywords},{
                path:"/blocks/blocksInfo",
                query:{
                    height:this.keywords
                }
              });
          }else{
           this.commonTips("搜索值不能为空");
          }
        },

        //搜索公共函数,ajaxPath:接口地址；params：参数;routerPush:跳转页面的地址和传递参数
        searchCommon(ajaxPath,params,routerPush){
          search(ajaxPath,params).then(resp => {
            if(resp.code=="0"){ 
              this.$router.push(routerPush);
            }
            else{
              this.commonTips(resp.msg)
            }
          }).catch(res=>{ this.commonTips("请求失败")})
        },
  
      }
    }
</script>

<style scoped lang="scss">
// [v-cloak] {
//     display: none;
// }
    .homeBox{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
           min-height: 680px;
        width: 100%!important;
    }
    section{
        max-width: 1200px!important;
    }
    .homeBox{
     background: #ededed;
    }
    .homeBox_row{
      display: flex;flex-direction: row; justify-content: space-around;    margin-top: 20px;
    }
    .homeBox_row:first-child(2){margin-bottom: 0px;}
    .homeBox_row:nth-child(2){margin-top: 0px;}
   .echart{
        width: 100%;height: 221px;
    }
    #myChart{
      height: 221px;background: white; border-left: 2px solid  $mainColor;
      border-right: 2px solid  $mainColor;box-shadow: 0px 5px 9px #b5b1b1;

    }
  #myChart>div{
    /*background: white;   */
  }
  .textL3{
     width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;    text-align: left;
  }
  .textL2{
     overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;width: 100%; text-align: left;
  }
  .textR3{
    width: 25%;text-align: right;
  }
  .serviceBlock{
    padding: 19px 28px; background:  $mainColor;color: white;height: 221px;    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
        align-items: center;
  }
  .blockList{

  }
  .homeBox_row>div{
    width: 48%;
  }

 .blockColumn_item_text  a{
    color: white;text-transform: uppercase;font-size: 16px;
  }
  a{
    text-decoration: none;
  }
    a:hover{
      text-decoration: underline;
    }
  .blockColumn_item_text{
    margin-bottom: 10px;font-size: 15px;
  }
  .blockColumn_item{
    text-align: left;width: 45%;
  }
  .text_num{
    font-size: 15px;
  }
  .form{
    width: 100%;
    position: relative;
    height: 40px;
  }
  .formInput{
    width: 100%;
    /* height: 30px; */
    width: 100%;
    /* height: 40px; */
    background: #efbc6d;
    /* width: 80%; */
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 30px 0 8px;
    border: 0;
    align-items: center;
    box-sizing: border-box;
    HEIGHT: 100%;
  }
  .formSearch{
    font-size: 19px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);cursor: pointer;
  }
  p>a{
    color:white;
  }
    input::-webkit-input-placeholder{
      color:white;font-size: 13px;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
      color:white;font-size: 13px;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      color:white;font-size: 13px;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
      color:white;font-size: 13px;
    }
  .panel-heading{
    color: #585f69;
    background: #fff;font-size: 15px!important;
    padding: 7px 15px;    overflow: hidden;
    border-bottom: solid 1px #e4e3e8;
  }
  .panel-heading a,.panel-item h4, .panel-item p{
    color: #868686;font-size: 14px;
  }
  .panel-heading a{
    font-size: 12px;
  }
  .panel-title{
    font-size: 16px!important;
    font-weight: normal;

  }
  .panel-title i{
    font-size: 20px;
    margin-right: 7px;
  }
  .panel-item>h4>a{
    margin-left: 4px;
  }
  .homeBox_row{
    margin-bottom: 20px;
  }
  .panel-item{
    padding: 9px 15px 6px 42px;  border-bottom: 2px solid #f8f3f0;
    background: white;position: relative;
    font-size: 15px;
        font-family: "iconfont" !important;

  }
  .panel-box{

  }
  .panel-item h4{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
    text-align: left;
        font-size: 14px;
  }
  .panel-item h4, .panel-item p{
    margin-bottom: 11px;
  }
 .panel-item p{
   overflow: hidden;
 }
  .blockList .panel-item:before,.transationsList .panel-item:before{
      position: absolute;
    content: "\E79D";
    left: 19px;
    top: 8px;
    
    color: #716e6e;
  }
  .blockList .panel-item:before{
   content: "\E79D";
    font-size: 23px;
    left: 15px;
  }
  .transationsList .panel-item:before{
      content: "\E749";font-size: 17px;
  
  }
  .panel-body{
     height: 500px;overflow-y: auto;
  }


  @media only screen and (max-width: 768px) {
  	.homeBox_row>div{
	    width: 100%;
	    margin-bottom: 20px;
	  }
    .homeBox_row{flex-direction: column;}
    .panel-body{
      height:auto;
    }
  }
</style>

