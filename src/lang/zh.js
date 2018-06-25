/**
 * Created by Administrator on 2018/4/19.
 */
module.exports={
  header:["首页","块","交易","账户"],
  routeState:{"/blocks":["首页","块"],"/blocks/blocksInfo":["首页","块","块详情"],"/transactions":["首页","交易"],
    "/transactions/transactionsInfo":["首页","交易","交易详情"],"/accounts":["首页","账户"],
    "/accounts/accountsInfo":["首页","账户","账户详情"]
  },
  home:{
    LASTBLOCKS:"最新区块",
    MINNERS:"矿工数",
    REWARD:"交易额",
    inputPlaceholder:"通过 Address/TxHash/BlockHeight 搜索",
    blockHash:"块哈希",
    logoTit:"Accel加速链浏览器"
  },

  block:"块",
  transaction:'交易',
  account:'账户',

  

  yearago:"年前",
  monthago:"个月前",
  weekago:"周前",
  dayago:"天前",
  hourago:"小时前",
  minago:"分钟前",
  secago:"秒前",
  
  echartTit:"15天交易历史",
  echartXname:"日期",
  commonStr:{
    home:"首页",
    block:"块",
    blocks:"块",
    account:"账户",
    accounts:"账户",
    transaction:"交易",
    transactions:"交易",
    viewAll:"查看全部 >>",
    height:"块高",
    ages:"年龄",
    Txn:"交易量",
    from:"从",
    to:"至",
    hash:"哈希",
    TimeStamp:"时间",
    ParentHash:"父级哈希",
    size:"大小",
    address:"地址",
    value:"值",
    rank:"排名",
    transactionInfo:"交易详情",
    blockInfo:"块详情",
    addressInfo:"地址详情",
     noData:"暂无数据",
//  ago:"前",
  	ago:"",
    totalFee:"手续费",
    fee:"手续费",
    blockReward:"手续费",
    TxType:"交易类型",
    TxReceiptStatus:"交易状态",
    TxHash:"交易哈希",
    TxCount:"交易数量",
    TotalTxt:"转出交易数"
  }
}
