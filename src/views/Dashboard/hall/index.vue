<template>
  <div class="ds-notice">
    <div>
      <span style="margin-right: 10px;color: grey">以下为最新求购和求买信息</span>
      <el-button size="small" @click="details()">全部</el-button>
      <el-button size="small" @click="details(1)">只看求买</el-button>
      <el-button size="small" @click="details(2)">只看求卖</el-button>
    </div>
    <div v-for="(item,index) in listData" :key="index" style="margin-top: 10px;border-bottom: 1px solid #ccc;padding-bottom: 10px">
      <div style="display: flex;flex-direction: row;align-items: center">
        <div style="height: 50px;width: 50px;border-radius: 25px;border: 1px solid #f0f0f0;overflow: hidden"><img style="width: 50px;height: 50px" :src="item.headImg" /></div>
        <div style="margin-left:15px;font-size: 18px;color: dodgerblue;font-weight: bold">{{item.userName}}</div>
        <div style="margin-left:15px;font-weight: bold">{{item.type==1?'求买':'求卖'}}</div>
        <div style="margin-left:15px;color: grey;">最迟日期:{{item.lateTime}}</div>
      </div>
      <div style="font-size: 22px;font-weight: bold;margin-top: 20px">{{item.content}}</div>
      <div style="color: grey;margin-top: 20px">{{`尺码:${item.model}, 价格:${item.price}, 货号:${item.goodsNo}, 数量:${item.saleNum}`}}
        <el-button @click="getSearchShop(item)" v-if="role==1&&item.type==2" style="margin-left: 30px" type="primary" size="mini">立即购买</el-button>
        <el-button v-if="role==2&&item.type==1" @click="uploadItem(item)" style="margin-left: 30px" type="primary" size="mini">立即上传</el-button>
        <span v-if="role==2&&item.type==1" style="color: grey">(上传库存平台会自动通知买家下单)</span>
      </div>
      <div v-if="item.images.length>0" style="display: flex;flex-direction: row;height: 200px;margin-top: 20px">
        <div style=" display: flex;align-items: center;width: 30%;height: 200px; margin:0 10px;" v-for="(imgs,index) in item.images" :key="index">
          <img style="width:auto;height:auto;max-width: 100%; max-height: 100%;" :src="imgs" />
        </div>
      </div>
    </div>
    <div class="block ds-pagination" v-show="pageInfo.totalItems != 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageInfo.current"
        :page-sizes="[5,10, 20, 30, 40]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.totalItems">
      </el-pagination>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>

import {getTradeMarketList} from '@/api/notice'
export default {
  components: {},
  data() {
    return {
      listData: [
      ],

      type: null,
      role: localStorage.getItem('role'),
      pageInfo: {
        current: 1,
        pageSize: 10,
        totalItems: 0
      }
    }
  },
  methods: {
    getSearchShop (item) {
      let data = {
        goodsNo: item.goodsNo,
        sellerId: item.userId,
        modelName: item.model
      };
      this.$store.commit('shopping/SET_ENTRY', data)
      this.$bus.$emit('refreshGoods')
      this.$router.push({
        name:'order_quick'
      });
    },
    uploadItem(item) {
      this.$store.commit('SHELVES_DIALOG', {
        show: true,
        formData: {
          goodsNo: item.goodsNo
        }
      });
      this.$router.push({
        name:'realTime'
      });
    },
    details(item) {
      this.type = item;
      getTradeMarketList({type: item, current: 1, pageSize: 10}).then(res => {
        if (res.code === 0) {
          this.listData = res.data.marketList
        }
      }, e => {

      })
    },
    handleCurrentChange(val) {
      getTradeMarketList({type: this.type, current: val, pageSize: 10}).then(res => {
        if (res.code === 0) {
          this.listData = res.data.marketList
        }
      }, e => {

      })
    },
    handleSizeChange(val) {
      getTradeMarketList({type: this.type, current: val, pageSize: 10}).then(res => {
        if (res.code === 0) {
          this.listData = res.data.marketList
        }
      }, e => {

      })
    },
  },
  mounted() {
    getTradeMarketList({current: 1, pageSize: 10}).then(res => {
      if (res.code === 0) {
        this.listData = res.data.marketList;
        this.pageInfo = res.data.pageInfo;
      }
    }, e => {

    })
  }
}
</script>
