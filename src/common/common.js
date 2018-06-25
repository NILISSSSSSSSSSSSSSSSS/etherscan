//公共提示框封装
export const commonTips=function(msg){
 
    $vm.$alert(msg, '', {
        showConfirmButton:false,
          center: true,
          callback: action => {
          }
        });
}



// 时间转换
let a=0;
export  function getDateDiff(dateTimeStamp){
    dateTimeStamp=utcToLocale(dateTimeStamp);

    
    var second=1000;
   var minute = 1000 * 60;
   var hour = minute * 60;
   var day = hour * 24;
   var halfamonth = day * 15;
   var month = day * 30;
   var now = new Date().getTime();
   var diffValue = now - dateTimeStamp;

 
   if(diffValue < 0){return;}
  
   var monthC =diffValue/month;
 
   var weekC =diffValue/(7*day);
   var dayC =diffValue/day;
   var hourC =diffValue/hour;
   var minC =diffValue/minute;
   var secC =diffValue/second;
   var result;
    
   if(monthC>=1){
       result="" + parseInt(monthC) + this.$tc('monthago', parseInt(monthC));
   }
   else if(weekC>=1){
       result="" + parseInt(weekC) + this.$tc('weekago', parseInt(weekC));
   }
   else if(dayC>=1){
       //天前
       result=""+ parseInt(dayC) + this.$tc('dayago', parseInt(dayC));//通过传参数，来判断英文是单数还剩复数。例如：1 day ago / 4 days ago
       // result=""+ parseInt(dayC) +"天前";
   }
   else if(hourC>=1){
       result=""+ parseInt(hourC) + this.$tc('hourago', parseInt(hourC));//小时前
   
   }
   else if(minC>=1){
       result=""+ parseInt(minC) + this.$tc('minago', parseInt(minC));//分钟前
   }
   else result=""+ parseInt(secC) + this.$tc('secago', parseInt(secC));//秒前
//	else result="刚刚";
   return result;
}

function utcToLocale(UTCDateString){
   
   if(!UTCDateString){return '-';}
   function formatFunc(str) { return str > 9 ? str : '0' + str}
   var arr = UTCDateString.split(/[- : \/]/);//new Date（）的时候，苹果手机不能兼容new Date(yyyy-mm-dd)，需要改成new Date(yyyy,mm,dd,hh,mm,ss）
   var date2 = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);     //这步是关键
  
   var year = date2.getFullYear();
   var mon = formatFunc(date2.getMonth() + 1);
   var day = formatFunc(date2.getDate());
   var hour = formatFunc(date2.getHours());
   var min = formatFunc(date2.getMinutes());
   var sec=formatFunc(date2.getSeconds());
   var dateStr = year+'-'+mon+'-'+day+' '+hour+':'+min+':'+sec;
   
   return Date.parse(dateStr.replace(/-/gi,"/"));//转化成时间戳
}

function test(c){
    a=a+1;
    if(a==1){
     alert(c)
    }
   
}