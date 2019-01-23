<template>
  <div>
    <div class="header">
      <div class="avatar">
        <img :src="`${baseUrl}${self.avatar}`">
      </div>
      <div class="name_content">
        <div class="name">{{self.name}}</div>
        <div class="wechat">
          <span class="num">微信号 : {{self.wechat}}</span>
          <span class="weima"><i class="iconfont icon-ico"></i></span>
        </div>
      </div>
      <span class="right_btn"><i class="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i></span>
      <span class="photo"><i class="iconfont icon-zhaoxiangji"></i></span>
    </div>
    <Spilt></Spilt>
    <div class="circle">
      <div class="circle_bottom">
        <i class="iconfont icon-weixinzhifu"></i>
        <span>支付</span>
        <span class="right_row"><i class="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i></span>
      </div>
    </div>
    <Spilt></Spilt>
    <div class="message">
      <div class="tool">
        <div class="tool_bottom">
          <i class="iconfont icon-weixinshoucang"></i>
          <span class="set_border">收藏</span>
          <span class="right_row"><i class="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i></span>
        </div>
      </div>
      <div class="tool">
        <div class="tool_bottom">
          <i class="iconfont icon-xiangce"></i>
          <span class="set_border">相册</span>
          <span class="right_row"><i class="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i></span>
        </div>
      </div>
      <div class="tool">
        <div class="tool_bottom">
          <i class="iconfont icon-qiabao"></i>
          <span class="set_border">卡包</span>
          <span class="right_row"><i class="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i></span>
        </div>
      </div>
      <div class="msg">
        <i class="iconfont icon-xiaolian"></i>
        <span>表情</span>
        <span class="right_row"><i class="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i></span>
      </div>
    </div>
    <spilt></spilt>
    <div class="circle">
      <div class="circle_bottom">
        <i class="iconfont icon-shezhi"></i>
        <span>设置</span>
        <span class="right_row"><i class="iconfont icon-iconfontyoujiantou-copy-copy-copy-copy"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import Spilt from "../views/widget/Spilt"
  export default{
    computed: {
      ...mapState({
        self: state => state.data.self,
        baseUrl: "baseUrl"
      })
    },
    components:{
      Spilt
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    height: 200px;
    box-sizing: border-box;
    padding: 60px 20px;
    .avatar {
      flex: 0 0 100px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 5px;
      }
    }
    .name_content {
      flex: 1;
      .name {
        font-size: 22px;
        font-weight: 700;
        margin: 5px 0 10px 0;
      }
      .wechat {
        display: flex;
        .num{
          font-size: 18px;
          color: #666666;
          flex: 1;
        }
        .weima{
          font-size: 18px;
          flex: 0 0 30px;
        }
      }
    }
    .right_btn{
      margin: 48px 0 0 0;
      i{
        font-size: 20px;
      }
    }
    .photo{
      position: absolute;
      top: 10px;
      right: 10px;
      i{
        font-size: 22px;
      }
    }
  }
  .circle {
    height: 60px;
    line-height: 60px;
    position: relative;
    box-sizing: border-box;
    padding: 0 0 0 15px;
    background: #fff;
    .circle_bottom {
      display: flex;
      i {
        flex: 0 0 30px;
      }
      .icon-weixinzhifu,
      .icon-shezhi {
        font-size: 25px;
        margin-right: 15px;
      }
      .icon-weixinzhifu {
        color: #209f72;
      }
      .icon-shezhi {
        color: #257de8;
        font-size: 30px;
        margin: 0 10px 0 -10px;
      }
      span {
        display: inline-block;
        font-size: 18px;
        font-weight: 500;
        color: #303030;
        letter-spacing: 2px;
      }
      .right_row {
        position: absolute;
        right: 10px;
        i{
          font-size: 20px;
        }
      }
    }
  }
  .message {
    background: #fff;
    .tool {
      height: 60px;
      line-height: 60px;
      position: relative;
      box-sizing: border-box;
      padding: 0 0 0 15px;
      .tool_bottom {
        display: flex;
        i {
          flex: 0 0 30px;
        }
        .icon-weixinshoucang,
        .icon-xiangce,
        .icon-qiabao{
          font-size: 25px;
          margin-right: 15px;
        }
        .icon-weixinshoucang {
          color: #feb240;
        }
        .icon-xiangce {
          color: #2579b4;
        }
        .icon-qiabao {
          color: #2071b2;
        }
        .set_border{
          border-bottom: 1px solid #d7d7d7;
        }
        span {
          flex: 1;
          display: inline-block;
          font-size: 18px;
          font-weight: 500;
          color: #303030;
          letter-spacing: 2px;
        }
        .right_row {
          position: absolute;
          right: 10px;
          i{
            font-size: 20px;
          }
        }
      }
    }
    .msg {
      height: 60px;
      line-height: 60px;
      position: relative;
      box-sizing: border-box;
      padding: 0 15px;
      display: flex;
      i {
        flex: 0 0 30px;
      }
      .icon-xiaolian {
        font-size: 25px;
        margin-right: 15px;
        color: #ef9b4c;
      }
      span {
        display: inline-block;
        font-size: 18px;
        font-weight: 500;
        color: #303030;
        letter-spacing: 2px;
      }
      .right_row {
        position: absolute;
        right: 10px;
        i{
          font-size: 20px;
        }
      }
    }
  }
</style>
