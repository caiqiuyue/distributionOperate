export function sex (value) {
  if (value === 1) {
    return '男'
  } else if (value === 0) {
    return '女'
  } else {
    return '中性'
  }
}
export function sendTime (days) {
  if (days === 0) {
    return '当天'
  } else if (days === 1) {
    return '隔天'
  } else {
    return days + '天'
  }
}
export function percent (value) {
  return value  + '%'
}
export function stock (value) {
  let stocks = ['每天更新', '定期更新', '实时更新']
  return stocks[value]
}
export function feedbackTime (value) {
  if (value < 24) {
    return '当天反馈'
  } else if (value > 24 && value < 48) {
    return '隔天反馈'
  } else {

  }
}
// 快捷下单中每个型号的商品数量
export function modelGoodsNum (value, name) {
  let num = 0
  value.forEach(item => {
    if (item.modelName === name) {
      num = item.stockNum
    }
  })
  return num
}
// 购物车提交订单计算一类商品金额
export function goodsAmount (value, otherValue = 0) {
  if (value.split(',').length !== 0) {
    return parseInt(value.split(',')[0]) + otherValue
  }
  return 0 + otherValue
}
// 货运状态 0待发货 1发货中 2确认收货 3退货中 4确认退货
export function postState (value) {
  let arr = ['待发货', '发货中', '确认收货', '退货中', '确认退货']
  return arr[value]
}
// 资金状态 0待支付 1买家已付款 2平台托管 3平台解付中 4卖家已收款 5卖家已退款 6平台托管 7平台解付 8买家已退款
export function capitalState (value) {
  let arr = ['待支付', '买家已付款', '平台托管', '平台解付中', '卖家已收款', '卖家已退款', '平台托管', '平台解付', '买家已退款']
  return arr[value]
}
// 订单状态 -1删除 1买家新建 2卖家反馈中 3买家撤销 4卖家接受 5卖家拒绝 6订单异议 7订单完成 8订单关闭
export function orderState (value) {
  if (value === -1) {
    return '已删除'
  } else {
    let arr = ['', '买家新建', '卖家反馈中', '买家已撤销', '卖家接受', '卖家拒绝', '处理中', '订单完成', '订单关闭']
    return arr[value]
  }
  return value * 100 + '%'
}
// 计算距当前时间几天
export function howManyDays(val) {
  let today = new Date()
  let year = val.substring(0,4)
  let month = parseInt(val.substring(5,7))
  let day = parseInt(val.substring(8,10))
  if (today.getFullYear() == year && (today.getMonth()+1) == month&&today.getDate() == day) {
    return '今天'
  }
  let theDay = new Date(val.replace(/-/g,"/"));
  let time = today-theDay
  let days = Math.ceil(time/(24*60*60*1000))
  return (days == 0 ? 1 : days)+'天前'
}
// 截取日期
export function getDate(date) {
  return date.substring(0, 10)
}
