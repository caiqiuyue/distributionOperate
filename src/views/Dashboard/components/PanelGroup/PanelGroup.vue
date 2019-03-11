<template lang="html">
  <div>
      <div v-if="role==1">
        <el-row :gutter="15">
          <el-col :span="12">
            <sm-card
              name="pay"
              topText="待付款"
              :botText="buyer.waitPay"
              @click.native="handlePanelSelect('unfinished')"
            >
            </sm-card>
          </el-col>
          <el-col :span="12">
            <sm-card
              name="wait"
              topText="待处理工单"
              :botText="buyer.waitService"
              @click.native="handlePanelSelect('b-service')"
            >
            </sm-card>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col  :span="12">
            <sm-card
              name="box3"
              topText="待收货"
              :botText="buyer.waitReceive"
              @click.native="handlePanelSelect('unfinished')"
            >
            </sm-card>
          </el-col>
          <el-col  :span="12">
            <sm-card
              name="success"
              topText="累计成功订单数"
              :botText="buyer.orderSum"
              @click.native="handlePanelSelect('finished')"
            >
            </sm-card>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col  :span="12">
            <sm-card
              name="my_order"
              topText="累计订单数"
              :botText="buyer.orderSum"
            >
            </sm-card>
          </el-col>
          <el-col  :span="12">
            <sm-card
              name="money" topText="余额"
              :botText="account.balance"
              :duration="500"
              @click.native="handlePanelSelect('recharge')"
            >
            </sm-card>
          </el-col>
        </el-row>

        <!--<el-row :gutter="15">-->
        <!--<el-col  :span="12">-->
        <!--<sm-card name="shoppingCard" topText="购物车" :botText="cartInfo.num"-->
        <!--@click.native="handlePanelSelect('shoppings')"></sm-card>-->
        <!--</el-col>-->

        <!--</el-row>-->

      </div>
      <div :span="12" v-else>
        <el-row :gutter="15">
          <el-col :span="12">
            <sm-card
              name="post_wait"
              topText="待发货"
              :botText="seller.waitSend"
              @click.native="handlePanelSelect('s-unfinished')"
            >
            </sm-card>
          </el-col>
          <el-col :span="12">
            <sm-card
              name="orders_wait"
              topText="待接收订单"
              :botText="seller.waitTake"
              @click.native="handlePanelSelect('s-unfinished')"
            >
            </sm-card>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col  :span="12">
            <sm-card
              name="box-empty"
              topText="等待配货"
              :botText="seller.waitMatch"
              :duration="500"
              @click.native="handlePanelSelect('s-unfinished')"
            >
            </sm-card>
          </el-col>
          <el-col  :span="12">
            <sm-card
              name="wait"
              topText="待处理工单"
              :botText="seller.waitWork"
              @click.native="handlePanelSelect('orderService')"
            >
            </sm-card>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col  :span="12">
            <sm-card
              name="box3"
              topText="配货总商品数量"
              :botText="seller.matchSum"
            >
            </sm-card>
          </el-col>

          <el-col  :span="12">
            <sm-card
              name="my_order"
              topText="累计订单数"
              :botText="seller.orderSum"
            >
            </sm-card>
          </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>
import {getManageAndWorkData} from '@/api/notice'
import SmCard from './cards.vue'
export default {
  components: {
    SmCard
  },
  data() {
    return{
      buyer: {
        waitReceive: 0,
        waitService: 0,
        waitPay: 0,
        orderSum: 0,
        successSum: 0
      },
      seller: {
        waitSend: 0,
        waitTake: 0,
        matchSum: 0,
        waitWork: 0,
        waitMatch: 0,
        orderSum: 0
      }
    }
  },
  computed: {
    cartInfo() {
      return this.$store.getters['shopping/cartInfo']
    },
    account() {
      return this.$store.state.trade.recharge
    },
    role() {
      return this.$store.state.user.role
    }
  },
  created() {
    this.$store.dispatch('trade/getRechargeAccount')
    this.getManageAndWorkData()
  },
  methods: {
    handlePanelSelect (type) {
      this.$emit('handlePanelSelect', type)
    },
    getManageAndWorkData () {
      getManageAndWorkData().then(res => {
        if(res.code === 0){
        if(this.role === '1'){
          this.buyer = res.data
        } else {
          this.seller = res.data
        }
      }
    }, e =>{})
    }
  }
}
</script>

<style lang="scss">
.mr15{
  margin-right: 15px;
}
</style>
