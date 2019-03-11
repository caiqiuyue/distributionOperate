<template>
  <div class="recharge-content">
    <el-tabs style="box-shadow: none;border: none;background-color: #ffffff" type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="首页" name="0">
        <div class="dashboard components-wrap" style="background-color: #ffffff">
          <el-row :gutter="10">
            <el-col :span="12">
              <panel-group
                @handlePanelSelect="handlePanelSelect">
              </panel-group>
            </el-col>
            <el-col :span="12">
              <Notice></Notice>
              <Message></Message>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="交易大厅" name="1">
        <div :index="1">
          <Hall />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import PanelGroup from './components/PanelGroup/PanelGroup.vue'
import Notice from './notice'
import Hall from './hall'
import Message from './notice/Message.vue'
export default {
  components: {
    PanelGroup,
    Notice,
    Message,Hall
  },
  created () {
  },
  data () {
    return {
      activeName: '0'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab);
    },
    handlePanelSelect (type) {
      console.log(type)
      switch (type) {
        case 'shoppings':
          this.$router.push({
            name:'cart'
          });
          break;
        case 'unfinished':
          this.$router.push({
            name:'order_unfinished'
          });
          break;
        case 'finished':
          this.$router.push({
            name:'order_finished'
          });
          break;
        case 'b-service':
          this.$router.push({
            name:'order_service'
          });
          break;
        case 'recharge':
          this.$router.push({
            name:'recharge'
          });
          break;
        case 's-unfinished':
          this.$router.push({
            name:'shop_unfinished'
          });
          break;
        case 'orderService':
          this.$router.push({
            name:'order_service'
          });
          break;
      }
    }
  },
  activated () {
  }
}
</script>

<style lang="scss">
@import '../../styles/mixin.scss';
.dashboard{
  position: relative;
  .main-line{
    width: 100%;
    margin-bottom: 15px;
  }
}
</style>
