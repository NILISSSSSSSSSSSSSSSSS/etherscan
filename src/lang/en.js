/**
 * Created by Administrator on 2018/4/19.
 */
/**
 * Created by Administrator on 2018/4/19.
 */
module.exports={
  header:["home","blocks","transactions","accounts"],
  routeState:{"/blocks":["home","blocks"],"/blocks/blocksInfo":["home","blocks","blocks Info"],"/transactions":["home","blocks",'transactions'],
    "/transactions/transactionsInfo":["home","transactions","transactionsInfo"],"/accounts":["home","accounts"],
    "/accounts/accountsInfo":["首页","账户","账户详情"]},
  home:{
    LASTBLOCKS:"last BLOCKS",
    MINNERS:"MINNERS",
    REWARD:"REWARD",
    inputPlaceholder:"Search By Address/TxHash/BlockHeight",
    blockHash:"block Hash",
    logoTit:"Accel chain Explorer"
  },


  block:' block | blocks ',
  transaction: " transaction | transactions",
  account:' account | accounts ',
 

  yearago:" year ago | years ago",
  monthago:" month ago | months ago",
  weekago:" week ago | weeks ago",
  dayago:" day ago  |  days ago",
  hourago:" hour ago  | hours ago",
  minago:" minute ago | minutes ago",
  secago:" second ago | seconds ago",
  
  
  echartTit:"15days transations history",
  echartXname:"date",
  commonStr:{
    home:"home",
    block:"block",
    blocks:"blocks",
    account:"account",
    accounts:"accounts",
    transaction:"transaction",
    transactions:"transactions",
    viewAll:"View All >>",
    height:"height",
    ages:"ages",
    Txn:"Txn",
    from:"from",
    to:"to",
    hash:"hash",
    TimeStamp:"TimeStamp",
    size:"size",
    address:"address",
    ParentHash:"Parent Hash",
    value:"value",
    rank:"rank",
    transactionInfo:"transaction Info",
    blockInfo:"block Info",
    addressInfo:"Address Info",
    ago:"",
    totalFee:"TotalFee",
    fee:"fee",
    blockReward:"TotalFee",
    TxType:"TxType",
    TxReceiptStatus:"TxReceipt Status",
    TxHash:"TxHash",
    TxCount:"TxCount",
    TotalTxt:"TotalTxt",

    noData:"No Data"
  }
}
