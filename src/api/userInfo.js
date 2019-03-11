import request from '@/utils/request'

export const fetchUserInfo = (query) => {
  return request({
    url: '/system/userInfo',
    method: 'get',
    params: query
  })
}

export const fetchArrowSelect = (query) => {
  return request({
    method: 'get',
    url: '/system/getSearchList',
    params: query
  })
}
export const getSmsCode = (query) => {
  return request({
    method: 'get',
    url: '/user/getSMSCode',
    params: query
  })
}
export const getImageCode = () => {
  return request({
    url: '/user/getImageCode',
    method: 'get'
  })
}
export const userLogin = (params) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: params
  })
}
export const userRegister = (params) => {
  return request({
    url: '/user/register',
    method: 'post',
    data: params
  })
}
export const setPayPassword = (params) => {
  return request({
    url: '/account/setPayPassword',
    method: 'post',
    data: params
  })
}
export const editUserInfo = (params) => {
  return request({
    url: 'user/editUserInfo',
    method: 'post',
    data: params
  })
}
export const editPassword = (params) => {
  return request({
    url: '/user/editPassword',
    method: 'post',
    data: params
  })
}
export const editUserPhone = (params) => {
  return request({
    url: '/user/editUserPhone',
    method: 'post',
    data: params
  })
}
export const getUserInfo = (params) => {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    data: params
  })
}
