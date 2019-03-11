/**
* 日期格式化
* @param {type} String HHMMDDhhmmss  至于中间用什么请自便
* @param {timer} Number
* HH年MM月DD月 hh:mm:ss => 2018年4月12日 22:09:30
*/
export const format = (type, timer) => {
  const date = timer ? new Date(timer * 1) : new Date()
  const times = {
    'H+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let i in times) {
    const reg = new RegExp(`${i}`, 'g')
    const tt = ('' + times[i]).length === 1 ? ('00' + times[i]).slice(-2) : times[i]
    type = type.replace(reg, tt)
  }
  return type
}
export const throttle = (delay, times, callback) => {
  let startTime = (new Date()).getTime()
  let timer = null
  return function () {
    let currTime = (new Date()).getTime()
    let that = this
    let args = arguments
    clearTimeout(timer)
    if (currTime - startTime >= delay) {
      callback.apply(that, args)
      startTime = currTime
    } else {
      timer = setTimeout(function () {
        callback.apply(that, args)
      }, times)
    }
  }
}
/**
* 推算路由的父name
*/
export const filterName = (routes, name) => {
  const filters = routes.filter((item) => {
    return item.children.length > 1
  })
  const len = filters.length
  for (let i = 0; i < len; i++) {
    const len2 = filters[i].children.length
    for (let j = 0; j < len2; j++) {
      const items = filters[i].children[j]
      if (items.name === name) {
        return filters[i].name
      }
    }
  }
  return false
}

export const isHidePage = () => {
  let hidden
  let visibilityChange
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden'
    visibilityChange = 'visibilitychange'
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden'
    visibilityChange = 'msvisibilitychange'
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden'
    visibilityChange = 'webkitvisibilitychange'
  }
  document.addEventListener(visibilityChange, () => {
    if (document[hidden]) {
      document.title = '快回来搞事情啦...'
    }
  }, false)
}
export const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
      onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
      onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}

export const addressAnalyze = (str, pcaa) => {
  try{
    let info = {}, type = ''
    let areaResult = []
    let isStraight = str.match(/北京|天津|上海|重庆/) // 直辖市
    if (str.match('收货人')) {
      console.log('type:京东')
      str = str.replace(/\s+/g, '')
      type = 'jd'
      info.name = str.split('收货人:')[1].split('地址:')[0]
      info.fullAddress = str.split('地址:')[1].split('手机')[0]
      info.phoneNo = str.split('手机号')[1].replace(/[^0-9]/ig,"")
      let match = info.fullAddress.match(/北京|上海|天津|重庆|河北|山西|河南|辽宁|吉林|黑龙江|内蒙古|江苏|山东|安徽|浙江|福建|湖北|湖南|广东|广西|江西|四川|海南|贵州|云南|西藏|陕西|甘肃|青海|宁夏|新疆|港澳|台湾|钓鱼岛/)
      areaResult[0] = match[0]
      let cityRegion = info.fullAddress.replace(areaResult[0], '')// 去掉一级地区
      let regArea = cityRegion.match(/.+?(市|区)/g) // 市 区
      if(isStraight) {
        areaResult[2] = regArea[0]
      } else {
        areaResult[1] = regArea[0]
        areaResult[2] = regArea[1]
      }
      info.address = info.fullAddress.replace(areaResult.join(''), '')
      console.log(info)
    } else if ( str.match('收货地址:') ) {
      console.log('type:苏宁')
      type = 'sn'
      str = str.replace(/\s+/g, '')
      info.name = str.split('买家')[1].replace(/：|:/g, '')
      info.fullAddress = str.split('地址')[1].split('手机')[0].replace(/：|:/g, '')
      info.phoneNo = str.split('手机')[1].replace(/：|:/g, '').replace(/[^0-9]/ig, '')
      let regArea = /.+?(省|市|自治区|自治州|县|区)/g
      areaResult = info.fullAddress.match(regArea)
      info.address = info.fullAddress.replace(areaResult.slice(0,3).join(''), '')
    } else {
      // 张三 ，13888888888 ，0731-2222222 ，湖南省 长沙市 芙蓉区 五一路888号 ，410005
      console.log('type:淘宝')
      type = 'tb'
      let arr = str.split(',')
      if(arr.length === 4){
        info={
          name: arr[0],
          phoneNo: arr[1],
          fullAddress: arr[2],
          postNo: arr[3]
        }
      } else {
        info= {
          name: arr[0],
          phoneNo: arr[1],
          telNo: arr[2],
          fullAddress: arr[3],
          postNo: arr[4]
        }
      }
      // let regArea = /.+?(省|市|自治区|自治州|县|区)/g
      if(isStraight){
        areaResult[0] = info.fullAddress.split(' ')[1]
        areaResult[1] = ''
        areaResult[2] = info.fullAddress.split(' ')[2]
      }else{
        // areaResult = info.fullAddress.match(regArea)
        areaResult[0] = info.fullAddress.split(' ')[0]
        areaResult[1] = info.fullAddress.split(' ')[1]
        areaResult[2] = info.fullAddress.split(' ')[2]
      }
      info.address = info.fullAddress.split(areaResult[areaResult.length-1])[1]
    }
    console.log('area:', areaResult)
    let provinces = pcaa['86']
    let pKey, cKey, rKey, province = '', city = '', region = ''
    Object.keys(provinces).forEach(key => {
      if (provinces[key].match(areaResult[0])) {
        console.log('province:', key, provinces[key])
        pKey = key
        province = provinces[key]
      }
    })

    if (isStraight) {
      cKey = parseInt(pKey) + 100 + ''
      city = '市辖区'
      console.log('city:', cKey, '市辖区')
    } else {
      let cities = pcaa[pKey]
      Object.keys(cities).forEach(key => {
        if(cities[key].match(areaResult[1])){
          console.log('city:', key, cities[key])
          cKey = key
          city = cities[key]
        }
      })
    }

    let regions = pcaa[cKey]
    Object.keys(regions).forEach(key => {
      if(regions[key].match(areaResult[2])){
        console.log('region:', key, regions[key])
        rKey = key
        region = regions[key]
      }
    })
    info.province = province
    info.city = city
    info.region = region
    console.log(info)
    return info
  } catch (e) {
    return null
  }
}
