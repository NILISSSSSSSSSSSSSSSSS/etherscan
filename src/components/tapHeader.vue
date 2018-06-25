<template>
   <div>
       <div class="tapHeaderArrView routerShow_width">
    <el-row :gutter="10">
      <!-- logo -->
        <el-col :xs="10" :sm="5" >
          <div class="logo">
            <img src="../assets/logo.png" alt="">
           
            <p> {{$t('home.logoTit')}}</p>
          </div>
        </el-col>
        <!-- 选择语言 -->
        <el-col :xs="10" :sm="5" class="selectBox">
           <div class="selectLang">
            <el-select v-model="value" placeholder="请选择语言" size="mini"  @change="changeLanguage()">
              <el-option
                v-for="(item,index) in options" 
                :label="item.label"
                :value="item.value" :key="index">
              </el-option>
            </el-select>
          </div>
        </el-col>
         <!-- 菜单按钮 -->
        <el-col :xs="4"  class="hidden-sm-and-up lines">
          <i class="iconfont icon-caidan menuButton" @click="menuIsShow=!menuIsShow"></i>
        </el-col>
        <!-- 导航栏部分 -->
        
        <el-col :xs="24" :sm="14" class="menuBox" :class="{ noHeight: menuIsShow }">
            <div  class="menuWrapper">
                  <el-menu 
                    :default-active="changeMenu"
                    class="el-menu-demo"
                    mode="horizontal"
                    :router="isRoute">
                    <!-- 没有二级菜单的情况 -->
                    <el-menu-item   v-if="item.children.length==0"   :index="item.link" v-for="(item,index) in topDate" :key="index"> {{ item.text }}</el-menu-item>
                      <!-- 有二级菜单的情况 -->
                      
                    <el-submenu  index="2" v-else>
                      <template slot="title">{{item.text}}</template>
                      <el-menu-item :index="subitem.link" v-for="(subitem,index) in item.children" :key="index">{{ subitem.text }}</el-menu-item>
                    </el-submenu>
               </el-menu>
            </div>
            
        </el-col>
   </el-row>

  </div>
  <div class="line"></div>
   </div>
</template>


<script type="text/ecmascript-6">
  export default {
    name: 'tapHeader',
    data:function(){
      return{
        menuIsShow:true,
        isRoute:true,
        routPath:"",
        tapHeaderArr:"",
         isCollapse: true,
         currentIndex:0,
        routObj:{
          '/home':'/home',
          '/blocks':'/blocks',
          '/blocks/blocksInfo':'/blocks'
          ,'/transactions':'/transactions'
          ,'/transactions/transactionsInfo':'/transactions'
          ,'/accounts':'/accounts'
          ,'/accounts/accountsInfo':'/accounts'
        },
        activeIndex: '/home',
        options: [{
          label:"中文",
          value: 'zh',
        }, {
          label:"English",
          value: 'en',
        }],
        value: 'zh'
      }
    },
    created(){
     this.value=this.$cookie.get('language') ||  this.value
     this.$i18n.locale=this.value
    },
    computed: {
      topDate:function(){
        this.tapHeaderArr=[
          {
            link:'/home'
            ,text:this.$t('commonStr.home')
            ,children:[]
          }
          ,{
            link:'/blocks'
            ,text:this.$t('commonStr.blocks')
            ,children:[]
          }
          ,{
            link:'/transactions'
            ,text:this.$t('commonStr.transactions')
            ,children:[]
          }
          ,{
            link:'/accounts'
            ,text:this.$t('commonStr.accounts')
            ,children:[]
          }
        ];
        return this.tapHeaderArr;
      },
      changeMenu:function(){
        return this.activeIndex=this.routObj[this.$route.path];
      },
    },

    methods:{
     
      changeLanguage:function(){
        let lang = this.value
        // lang === 'zh' ? this.$i18n.locale = 'zh' : this.$i18n.locale = 'en';
        this.$cookie.set('language',lang,{ expires: '1h' });//设置cookie
        location.reload();
      },

    }
  }
</script>

<style scoped lang="scss">
  .selectBox,.menuBox,.lines{
    margin-top: 30px
  }
  .logo{
    float: left;

    img{
     width: 90px;
    }
    p{
    color: #f5a623;
    font-size: 12px;
    }
  }


  .tapHeaderArrView{
    position: relative;
    flex-direction: row;
    width: 100%;    justify-content: center;
        padding: 12px 20px;
  }
 
  .menuBox{
    overflow: hidden;max-height: 300px;
    transition: max-height .5s;
  }
  .el-menu--horizontal{
    border-bottom: 0;

    .el-menu-item.is-active {
        border-bottom: 2px solid $mainColor;
            color: $mainColor!important;
        }
      .el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
          border-bottom: 2px solid $mainColor!important;
        color: $mainColor!important;
      }  
    }



  @media only screen and (max-width: 768px){

      div.noHeight{
        max-height: 0px;
      }
    
      .el-menu{
        margin-top: 20px
      }
        .menuBox{
            margin-top: 0
          }
      .el-menu--horizontal {
        border-bottom: 0px;
            .el-menu-item {
              float: none;
              width: 100%;
              padding: 4px;
              line-height: initial;
              height: auto;
              text-align: left;
              padding: 8px 14px;
              border-bottom: solid 1px #eee!important;
            }
            .el-menu-item.is-active {
              border-bottom: 0px solid $mainColor;
              color:white!important;
              background: $mainColor
          }
          
          .el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
               background: $mainColor!important;color:white!important;
           }
      }
  }
 
 

  .tapHeaderArrView li{
       text-transform: uppercase;
    font-size: 13px;
    color: black!important;
    height: 30px;
    line-height: 30px;
    /* width: 25%; */
    padding: 0px 30px;
    float: none;
    display: inline-block;
            
  }
  .el-menu{
    line-height: normal;
    /* margin-top: 30px; */line-height: normal;
   text-align: right;
  }
  .selectLang{
    height: 30px;line-height: 30px;
  }
  .selectLang{
    /* float: right; */
  }
  .line{
           border-bottom: solid 2px #e4e4e4;
  }
  
  .menuButton{
        font-size: 29px;
    color: $mainColor;
    cursor: pointer;
  }
</style>
