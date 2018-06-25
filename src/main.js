
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import RegionPicker from 'vue-region-picker'//三级联动
import CHINA_REGION from 'china-area-data'
import { commonTips,getDateDiff } from './common/common.js'

import App from './App'
import axios from 'axios'
var VueCookie = require('vue-cookie');
import echarts from 'echarts'
import router from './router'
import VueI18n from 'vue-i18n'

require ('./commonFont/font/iconfont.css');//字体图标引入

Vue.prototype.$echarts = echarts;
Vue.prototype.age = getDateDiff;
Vue.prototype.commonTips = commonTips;
// Vue.prototype.personalTips = personalTips;

Vue.prototype.$http = axios ; //axios并不是vue插件，所以不能 使用Vue.use()
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueCookie);//cookie插件
Vue.use(VueI18n); // 语言翻译


Vue.use(RegionPicker, {
  region: CHINA_REGION,
  vueVersion: 2
})

const i18n = new VueI18n({
  locale: 'zh',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh': require('./lang/zh'),   // 中文语言包
    'en': require('./lang/en')    // 英文语言包
  }
})


//---------------- 过滤器 -----------------

//过滤type
Vue.filter('filterType', function(val) {
  console.log(val)
  　return val==0 ? 'transfer':'reward';
});
//过滤状态
Vue.filter('filterStatus', function(val) {
   return val==0? 'pending':'success'
});
//时间


/* eslint-disable no-new */
window.$vm=new Vue({
  el: '#app',
  i18n,  // 不要忘记
  router,
  components: { App },
  template: '<App/>'
})



