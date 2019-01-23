<template>
  <div class="msg-content">
    <div class="msg" :class="{self:msg.self}" v-for="msg in msgList" :key="msg.time">
      <div class="avatar">
        <img :src="msg.self?`${baseUrl}${self.avatar}`:`${baseUrl}${friend.avatar}`" width="100%" height="100%">
      </div>
      <div class="left_tail" v-show="!msg.self"></div>
      <div class="right_tail" v-show="msg.self"></div>
      <div class="bubble">{{msg.msg}}</div>
    </div>
    <div ref="bottom"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    computed: {
      ...mapState({
        baseUrl: 'baseUrl',
        friend: 'currentUser',
        self: state => state.data.self,
        msgList: state => state.currentMsgList.list
      })
    }
  }
</script>
<style scoped>
  .msg-content .msg {
    position: relative;
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    font-size: 0;
    margin: 5px 0;
  }
  .msg .avatar {
    display: inline-block;
    width: 45px;
    height: 45px;
    overflow: hidden;
    background: #fff;
    border-radius: 5px;
  }
  .msg .bubble {
    display: inline-block;
    vertical-align: top;
    margin-left: 15px;
    padding: 10px 10px 10px 10px;
    border-radius: 4px;
    line-height: 25px;
    max-width: 50%;
    word-wrap: break-word;
    font-size: 14px;
    background: #fff;
    color: #040404;
  }
  .msg .left_tail{
    position: absolute;
    top: 19px;
    left: 60px;
    display: inline-block;
    width: 0;
    height: 0;
    border: 10px solid #ffffff;
    border-left: none;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
  .msg .right_tail{
    position: absolute;
    top: 19px;
    right: 60px;
    display: inline-block;
    width: 0;
    height: 0;
    border: 10px solid #8af067;
    border-right: none;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
  .msg.self {
    text-align: right;
  }
  .msg.self .avatar {
    float: right;
    margin-left: 5px;
  }
  .msg.self .bubble {
    background: #8feb6b;
    text-align: left;
    color: #011700;
    margin-right: 10px;
  }
</style>
