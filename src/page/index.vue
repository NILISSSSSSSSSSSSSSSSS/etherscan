<template>
  <el-container class="indexBox" style="height: 100%; border: 1px solid #eee" >
    <tap-header></tap-header>
    <div class="routerBox">
        <router-view>
        </router-view>
    </div>
    <tap-footer>
    
    </tap-footer>
  </el-container>

</template>

<style scoped>
  /*@import '../commonStyle/common.css';*/
  .indexBox{
   flex-direction: column;align-items: center;border: 0;
  }
  .indexBox>.el-container,.el-container>div{
    width: 100%;
  }
  .routerBox{
     box-sizing: border-box;
  }
</style>

<script>
import tapHeader from "../components/tapHeader.vue"
import tapFooter from "../components/tapFooter.vue"
  export default {
    name:"index",
    data(){
      return {
         menuData:[],
        dataAct:true
      }
    },
    components: {
      // <my-component> 将只在父组件模板中可用
      'tap-header': tapHeader,
       'tap-footer': tapFooter
    },
    mounted(){
     this.$nextTick(function () {
    })

    },
    methods:{
    }
  };
</script>
