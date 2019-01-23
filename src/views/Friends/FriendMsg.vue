<template>
  <div class="friendMsg">
    <div class="header">
      <mu-button icon slot="left" @click="back" class="left_btn">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      <mu-button icon slot="right" class="ext_btn">
        <mu-icon value="more_horiz"></mu-icon>
      </mu-button>
      <div class="msg">
        <div class="avatar">
          <img :src="`${baseUrl}${currentUser.avatar}`">
        </div>
        <div class="msglist">
          <div class="name">
            <span>{{currentUser.name}}</span>
            <i class="iconfont"
               :class="{ 'icon-nan':currentUser.gender==='male','icon-nv':currentUser.gender==='female'}"></i>
          </div>
          <div class="littlename">昵称 : {{currentUser.littlename}}</div>
          <div class="wechat">微信号 : {{currentUser.wechat}}</div>
          <div class="adress">地区 : {{currentUser.address}}</div>
        </div>
        <div class="showmsg">
          <i class="iconfont"
             :class="{ 'icon-pengyouquan':currentUser.canset==='1','icon-pengyouquan1':currentUser.canset==='2'}"></i>
        </div>
      </div>
      <div class="set">
        <span>设置备注和标签</span>
        <mu-list-item-action class="right_row">
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </div>
    </div>
    <split></split>
    <div class="message">
      <div class="circle">
        <div class="circle_bottom">
          <span>朋友圈</span>
          <mu-list-item-action class="right_row">
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </mu-list-item-action>
        </div>
      </div>
      <div class="msg">
        <span>更多信息</span>
        <mu-list-item-action class="right_row">
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </div>
    </div>
    <split></split>
    <div class="tool">
      <div class="sent sentmsg">
        <router-link to="/MessageView/ChatView">
          <i class="iconfont icon-xiaoxi"></i>
          <span>发消息</span>
        </router-link>
      </div>
      <div class="sent">
        <i class="iconfont icon-yinshipin"></i>
        <span>音视频通话</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Split from "../../views/widget/Spilt.vue";
  export default{
    components: {Split},
    computed: mapState(['currentUser', 'baseUrl']),
    methods: {
      back(){
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .friendMsg {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #f2f2f2;
    z-index: 50;
    .header {
      box-sizing: border-box;
      padding: 0 15px;
      background: #fff;
      .ext_btn {
        float: right;
      }
      .msg {
        display: flex;
        border-bottom: 1px solid #d7d7d7;
        box-sizing: border-box;
        padding: 0 0 38px 0;
        .avatar {
          flex: 0 0 85px;
          width: 80px;
          img {
            width: 68px;
            height: 68px;
            border-radius: 5px;
            border: 1px solid red;
          }
        }
        .msglist {
          flex: 1;
          .name {
            font-size: 22px;
            font-weight: 700;
            .icon-nan {
              color: 47 b4ef;
            }
            .icon-nv {
              color: red;
            }
            i {
              display: inline-block;
              width: 20px;
              height: 20px;
              font-size: 20px;
              color: #47b4ef;
              margin-left: 10px;
            }
          }
          .littlename,
          .wechat,
          .adress {
            font-size: 18px;
            color: #888888;
          }

        }
        .showmsg {
          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            font-size: 20px;
          }
          .icon-pengyouquan1{
            color: red;
            font-size: 25px;
          }
        }
      }
      .set {
        background: #fff;
        height: 60px;
        line-height: 60px;
        position: relative;
        span {
          display: inline-block;
          font-size: 18px;
          font-weight: 500;
          color: #303030;
          letter-spacing: 2px;
        }
        .right_row{
          position: absolute;
          right: -35px;
          top: 0;
        }
      }
    }
    .message{
      background: #fff;
      .circle{
        height: 84px;
        line-height: 84px;
        position: relative;
        box-sizing: border-box;
        padding: 0 0 0 15px;
        .circle_bottom{
          border-bottom: 1px solid #d7d7d7;
          span {
            display: inline-block;
            font-size: 18px;
            font-weight: 500;
            color: #303030;
            letter-spacing: 2px;
          }
          .right_row{
            position: absolute;
            right: -20px;
            top: 0;
          }
        }
      }
      .msg{
        height: 60px;
        line-height: 60px;
        position: relative;
        box-sizing: border-box;
        padding: 0 15px;
        span {
          display: inline-block;
          font-size: 18px;
          font-weight: 500;
          color: #303030;
          letter-spacing: 2px;
        }
        .right_row{
          position: absolute;
          right: -20px;
          top: 0;
        }
      }
    }
    .tool{
      background: #fff;
      .sent{
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #707c8c;
        font-size: 18px;
        font-weight: 500;
        &>a{
          color: #707c8c;
        }
        i {
          font-size: 20px;
          margin-right: 10px;
          color: #5a6075;
        }
        .icon-yinshipin{
          font-size: 30px;
          display: inline-block;
          vertical-align: middle;
          color: #5a6075;
        }
      }
      .sentmsg{
        border-bottom: 1px solid #d7d7d7;
      }
    }
  }
</style>
