import request from '@/utils/request'
export const getNoticeList = () => {
  return request({
    url: '/notice/getNoticeList',
    method: 'get'
  })
}
export const getManageAndWorkData = () => {
  return request({
    url: '/notice/getManageAndWorkData',
    method: 'get'
  })
}
export const getTradeMarketList = (params) => {
  return request({
    url: '/notice/getTradeMarketList',
    method: 'post',
    data: params
  })
}
export const getMessageList = (data) => {
  return request({
    url: '/notice/getMessageList',
    method: 'post',
    data: data
  })
}
