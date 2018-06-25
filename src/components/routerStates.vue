<template>
     <div class="routerShow">
       <div class="routerShow_box routerShow_width">
         <span class="leftPath">{{leftPath}}</span>
         <div class="rightPath">
           <template v-for="(item,index) in rightPath" >
             <router-link   :to="{ path: '/'+item.link }"  v-if="index!=rightPath.length-1">{{item.text}} <span >/ </span> </router-link>
             <span  v-else class="lightYellow">{{item.text}} </span>
           </template>
         </div>
       </div>
     </div>
</template>

<script>
    export default {
      name:"routerStates",
      computed: {
        rightPath: function () {
          let routRightPathObj = {
            '/blocks': [{"link": "home", "text": this.$t('commonStr.home')}, {
              "link": "blocks",
              "text": this.$t('commonStr.blocks')
            }],
            '/blocks/blocksInfo': [{
              "link": "home",
              "text": this.$t('commonStr.home')
            }, {
              "link": "blocks",
              "text": this.$t('commonStr.blocks')
            }, {"link": "/blocks/blocksInfo", "text": this.$t('commonStr.blockInfo')}]
            ,
            '/transactions': [{
              "link": "home",
              "text": this.$t('commonStr.home')
            }, {"link": "transactions", "text": this.$t('commonStr.transactions')}]
            ,
            '/transactions/transactionsInfo': [{
              "link": "home",
              "text": this.$t('commonStr.home')
            }, {
              "link": "transactions",
              "text": this.$t('commonStr.transactions')
            }, {"link": "/transactions/transactionsInfo", "text": this.$t('commonStr.transactionInfo')}]
            ,
            '/accounts': [{"link": "home", "text": this.$t('commonStr.home')}, {
              "link": "accounts",
              "text": this.$t('commonStr.accounts')
            }]
            ,
            '/accounts/accountsInfo': [{"link": "home", "text": this.$t('commonStr.home')}, {
              "link": "accounts",
              "text": this.$t('commonStr.accounts')
            }, {"link": "/accounts/accountsInfo", "text": this.$t('commonStr.addressInfo')}],
          };
          return  routRightPathObj[this.$route.path];
        }
        ,leftPath:function(){
          let leftObj = {
            '/blocks':this.$t('commonStr.blocks'),
            '/blocks/blocksInfo':this.$t('commonStr.blockInfo')
            ,'/transactions':this.$t('commonStr.transactions')
            ,'/transactions/transactionsInfo':this.$t('commonStr.transactionInfo')
            ,'/accounts':this.$t('commonStr.accounts')
            ,'/accounts/accountsInfo':this.$t('commonStr.addressInfo')
          };
          return  leftObj[this.$route.path]+"  "+this.getLeftRoutePath();
        }
      },
      created:function(){
      },
      mounted:function(){
      },
      methods:{
        //获取左边路径和参数
        getLeftRoutePath:function() {
          let canShu="";
          if(this.$route.query.length!==0){
            for(let i in this.$route.query){
              canShu=this.$route.query[i];
            }
          }
          return canShu
        }
      }
    }
</script>

<style scoped>
  /* @import '../commonStyle/common.css'; */
  .routerBox{
    max-width: 100%;
  }
.routerShow_box{
  min-height: 60px;
      padding-top: 10px;
    padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;color: #868686;
      border-bottom: solid 1px #e8e4e4;
}
.leftPath{
      font-size: 16px;    width: 75%;overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;text-align: left

}
.rightPath{
  text-transform: capitalize;    width: 25%;
}
.rightPath{
  color: #868686;    text-align: right;
}

a:link{
   color: #868686; 
}   
a:visited {     
  color: #868686;     
}     
a:hover {     
  color: #f5a623;     
}     
a:active {     
  color: #868686;     
}

    @media only screen and (max-width: 768px){
      .routerShow_box{
           flex-direction: column;
        align-items: left;

     }
     .leftPath[data-v-f6d769ca] {
        font-size: 16px;
        width: 96%;
        text-align: left;
        margin-bottom: 10px;
    }
    .rightPath {
    color: #868686;
    text-align: left;
        width: 95%;
    }

    }
</style>
