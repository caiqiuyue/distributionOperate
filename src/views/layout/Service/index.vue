<template>
  <div class="ds-service">
    <div class="hoverbtn">
      <span>联</span><span>系</span><span>我</span><span>们</span>
      <img class="hoverimg" src="@/assets/img/hoverbtnbg.gif" height="9" width="13">
    </div>
    <div class="cont">
      <div class="qqcall">
        <dl class="fn_cle">
          <dt>
            在线客服：
          </dt>
          <dd class="kefuQQ">
            <span>客服一</span>
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=345513119&amp;site=qq&amp;menu=yes"></a>
          </dd>
          <dd class="kefuQQ">
            <span>客服二</span>
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=1765979295&amp;site=qq&amp;menu=yes"></a>
          </dd>
        </dl>
        <div class="blank0"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .ds-service{
    position: fixed;
    left: -230px;
    bottom: 0px;
    width: 230px;
    height: 100%;
    background: #009aff;
    z-index: 99999999999;
    transition: all .5s ease;
    opacity:0.6;
    &:hover{
      left: 0;
      opacity:1;
      .hoverimg{
        transform: rotateY(180deg);
      }
    }
    .hoverbtn{
      width: 30px;
      height: 129px;
      padding-top: 20px;
      cursor: pointer;
      position: absolute;
      bottom: 0;
      margin-top: -66px;
      right: -30px;
      font-size: 14px;
      color: #fff;
      background: #009aff;
      border-radius: 0px 3px 3px 0px;
      -moz-box-shadow: 4px 4px 4px -4px #000;
      -webkit-box-shadow: 4px 4px 4px -4px #000;
      box-shadow: 4px 4px 4px -4px #000;
      span{
        width: 30px;
        height: 19px;
        line-height: 19px;
        text-align: center;
        overflow: hidden;
        float: left;
      }
      .hoverimg{
        width: 13px;
        height: 9px;
        margin: 10px 0px 0px 10px;
        float: left;
        display: inline;
        background-repeat: no-repeat;
      }
    }
    .cont{
      padding:20px;
    }
    .qqcall {
      padding:100px 20px;
      border-bottom: 1px solid #ddd;
      dl{
        dt {
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          color: #fff;
          vertical-align: top;
          font-weight: bold;
          background: url("../../../assets/img/zxkfqq.png") 0 center no-repeat transparent;
          padding-left:32px;
        }
        .kefuQQ{
          width: 142px;
          font-size: 12px;
          color: #fff;
          height: 30px;
          line-height: 30px;
          a {
            background: url(../../../assets/img/button-custom-qq.gif) no-repeat;
            width: 70px;
            height: 20px;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }

    }

  }
</style>
<script>
export default{
  props: {

  },
  components: {

  },
  data () {
    return{

    }
  },
  methods: {

  }
}
</script>
