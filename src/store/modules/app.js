import _ from 'lodash';
import * as types from './../types'
const state= {
  channel: {
    postageTemList: {
      show: false,
    },
    postageSetting: {
      show: false,
      formData: {}
    }
  },
  goods: {
    formState: {
      show: false,
      formData: {}
    },
    cart:[],
    shelves: {
      show: false,
      formData: {}
    },
    regist: {
      show: false
    }
  },
  order: {
    formState: {
      show: false,
      formData: {}
    },
    drawback: {
      show: false,
      formData: {}
    }
  },
  orderInfo: {
    formState: {
      show: false,
      formData: {}
    }
  },
  orderPay: {
    formState: {
      show: false,
      formData: {}
    }
  },
  orderState: {
    formState: {
      show: false,
      formData: {
      }
    }
  },
  orderObjection: {
    formState: {
      show: false,
      formData: {}
    }
  },
  invoiceApply: {
    formState: {
      show: false,
      formData: {}
    }
  }
}
const mutations= {
  [types.CHANNEL_POSTAGE](state, dialogState) {
    state.channel.postageTemList.show = dialogState.show
  },
  [types.POSTAGE_SETTING](state, dialogState) {
    state.channel.postageSetting.show = dialogState.show
    state.channel.postageSetting.formData = dialogState.formData ? dialogState.formData : {}
  },
  [types.GOODS_DIALOG](state, dialogState) {
    state.goods.formState.show = dialogState.show
    state.goods.formState.formData = dialogState.formData ? dialogState.formData : {}
  },
  [types.GOODS_REGIST](state, dialogState) {
    state.goods.regist.show = dialogState.show
  },
  [types.ORDER_DIALOG](state, dialogState) {
    state.order.formState.show = dialogState.show
    state.order.formState.formData = dialogState.formData ? dialogState.formData : {}
  },
  [types.ORDER_INFO_DIALOG](state, dialogState) {
    state.orderInfo.formState.show = dialogState.show
    state.orderInfo.formState.formData = dialogState.formData ? dialogState.formData : {}
  },
  [types.ORDER_PAY_DIALOG](state, dialogState) {
    state.orderPay.formState.show = dialogState.show
    state.orderPay.formState.formData = dialogState.formData ? dialogState.formData : {}
  },
  [types.ORDER_STATE_DIALOG](state, dialogState) {
    state.orderState.formState.show = dialogState.show
    state.orderState.formState.formData = dialogState.formData ? dialogState.formData : {}
  },
  [types.ORDER_OBJECTION_DIALOG](state, dialogState) {
    state.orderObjection.formState.show = dialogState.show
    state.orderObjection.formState.formData = dialogState.formData ? dialogState.formData : {}
  },
  [types.INVOICE_DIALOG](state, dialogState) {
    state.invoiceApply.formState.show = dialogState.show
    state.invoiceApply.formState.formData = dialogState.formData ? dialogState.formData : {}
  },
  [types.SHELVES_DIALOG](state, dialogState) {
    state.goods.shelves.show = dialogState.show
    state.goods.shelves.formData = dialogState.formData ? dialogState.formData : {}
  },
  [types.DRAWBACK_DIALOG](state, dialogState) {
    state.order.drawback.show = dialogState.show
    state.order.drawback.formData = dialogState.formData ? dialogState.formData : {}
  }
}
const action= {

}
export default {
  state,
  mutations,
  action
}
