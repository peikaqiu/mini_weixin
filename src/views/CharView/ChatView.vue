<template>
  <div class="chat">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="back">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      <div class="nav-title">{{currentUser.name}}</div>
      <mu-button icon slot="right">
        <mu-icon value="more_horiz"></mu-icon>
      </mu-button>
    </mu-appbar>
    <div class="content" ref="msgView">
      <!--给自定义组件使用ref的话,该ref将会获取当前自定义组件实例对象-->
      <ChatContent ref="chatConten"></ChatContent>
    </div>
    <div class="bottom">
      <span class="iconfont icon-yuyin say"></span>
      <div class="inp"><input v-model="val" type="text"/></div>
      <span class="iconfont icon-xiaolian add"></span>
      <span class="iconfont icon-tianjia happy"></span>
      <div class="send" v-show="val.length" @click="sentMessage">发送</div>
    </div>
  </div>
</template>

<script>
  import ChatContent from '../CharView/ChatContent'
  import {mapState,mapActions} from 'vuex'
  import BScroll from 'better-scroll'
  export default{
    data(){
      return {
        val: ''
      }
    },
    components: {
      ChatContent
    },
    methods: {
      ...mapActions(['sentMsg','getNewMessage']),
      back(){
        this.$router.back()
      },
      sentMessage(){
          if(!this.val.trim()){
              return
          }
        let msg = this.val
        let time = new Date().getTime()
        let msgList = {msg,time,self:true,read:true}
        this.sentMsg(msgList)
        this.val = ''
        this.scrollToBottom()

        // 将当前消息发送给服务器,等待好友回复的消息
        this.getNewMessage({id: this.currentUser._id, msg, axios: this.axios})
          .then(() => {
            // 将action封装成promise对象保证 网络数据请求完毕更新vuex的store后,调用then方法
            this.scrollToBottom()
          })
      },
      scrollToBottom(){
        this.$nextTick(() => {
          // 当聊天消息增加时(发生改变时)会引起页面重新渲染,$nextTick等待页面及子组件因数据发生该变重新渲染完毕时
          // 重新计算better-scroll内容高度
          this.msgScroll.refresh()
          //console.log(this.$refs.chatConten);
          let bottomEl = this.$refs.chatConten.$refs.bottom
          //使用better-scroll的scrollToElement API滑动到聊天内容区的最底部
          this.msgScroll.scrollToElement(bottomEl,0)
        })
      }
    },
    computed: mapState(['currentUser','toBottom','chat']),
    created(){
        this.$nextTick(() => {
            if(!this.msgScroll){
                this.msgScroll = new BScroll(this.$refs.msgView,{
                    click:true
                })
            }else{
                this.msgScroll.refresh()
            }
            if(this.toBottom){
                this.scrollToBottom()
            }
        })
    },
    beforeRouteEnter:(to,from,next)=>{
      next(vm =>{
        //此时该组件被实例化了
        vm.$store.state.chat = true
      })
    },
    beforeRouteLeave(to, from, next){
      this.$store.state.chat = false
      next()
    },
  }
</script>

<style scoped>
  .chat {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 50;
  }
  .nav-title {
    text-align: center;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 56px;
    bottom: 70px;
    overflow: hidden;
    background: #f2f2f2;
  }

  .bottom {
    width: 100%;
    height: 70px;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    box-sizing: border-box;
    padding: 10px 0;
    background: #f8f8f8;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
  }

  .bottom .say {
    text-align: center;
    font-size: 30px;
    flex: 0 0 50px;
    font-weight: 400;
  }

  .bottom .happy {
    text-align: center;
    font-size: 30px;
    flex: 0 0 50px;
    font-weight: 400;
  }

  .bottom .add {
    text-align: center;
    font-size: 35px;
    flex: 0 0 50px;
    font-weight: 400;
  }

  .bottom .inp {
    display: inline-block;
    height: 48px;
    flex: 1;
    position: relative;
    border-radius: 4px;
  }

  .bottom input {
    width: 100%;
    height: 43px;
    border: none;
    outline: none;
    position: absolute;
    top: 3px;
    left: 0;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .bottom .send {
    position: absolute;
    top: 14px;
    right: 5px;
    display: inline-block;
    width: 50px;
    line-height: 43px;
    height: 43px;
    text-align: center;
    background: #8feb6b;
    border-radius: 5px;
  }
</style>
