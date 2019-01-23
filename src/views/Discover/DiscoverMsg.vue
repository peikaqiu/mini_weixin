<template>
  <div class="discoverMsg">
    <div class="header_box" :class="{active:headloop}">
      <div class="header_bar">
        <div class="left_btn" @click="back">
          <i class="iconfont icon-icon"></i>
        </div>
        <span>朋友圈</span>
        <div class="right_btn" @click="writemsg">
          <i class="iconfont icon-zhaoxiangji1"></i>
        </div>
      </div>
    </div>
    <div class="circleview" ref="circleLoop">
      <div class="content">
        <div class="header">
          <div class="name">
            <span>{{self.name}}</span>
          </div>
          <div class="avatar">
            <img :src="`${baseUrl}${self.avatar}`">
          </div>
        </div>
        <div class="msg">
          <div class="msgItem" v-for="(item,index) in circleViewList" :key="index">
            <div class="avatar">
              <img :src="`${baseUrl}${item.avatar}`">
            </div>
            <div class="msgContent">
              <div class="name">{{item.name}}</div>
              <div class="message">{{item.msg}}</div>
              <div class="pic" v-if="item.pic">
                <img :src="`${baseUrl}${item.pic}`">
              </div>
              <div class="set">
                <span class="time">{{item.time | getTime}}</span>
                <span class="del" v-if="!item._id" @click="delCircle(index)">删除</span>
                <div class="fantacy" @click="showgood(index)">
                  <i class="iconfont icon-iconliangdian"></i>
                </div>
                <transition name="fade">
                  <div class="ranting" v-show="index == currentIndex">
                    <div class="good" @click="goodView(index)">
                      <i class="iconfont icon-iconfontlove" :class="{active:item.good}"></i>
                      <span>赞</span>
                    </div>
                    <div class="say" @click="setMessage(index)">
                      <i class="iconfont icon-pinglun"></i>
                      <span>评论</span>
                    </div>
                  </div>
                </transition>
              </div>
              <div class="setmsg">
                <div v-for="(item,i) in commentViewList" :key="i" v-if="i === index">
                  <p v-for="(items,indes) in item" :key="indes">我 : {{items}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="writepage" v-show="msg">
      <div class="write_header">
        <span class="cancel" @click="writemsg">取消</span>
        <span class="write_title">发表文字</span>
        <div class="sent">
          <span :class="{active:str.length}" @click="addCircle">发表</span>
        </div>
      </div>
      <div class="writer_content">
        <div class="write_msg">
          <textarea v-model="str"></textarea>
        </div>
      </div>
    </div>
    <div class="writemsg" v-show="message">
      <div class="bg" @click="setMessage"></div>
      <div class="bottom">
        <div class="inp"><input v-model="msgarr" type="text"/></div>
        <span class="iconfont icon-xiaolian happy"></span>
        <div class="send" v-show="msgarr.length" @click="sentMsg">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import BScroll from 'better-scroll'
  import {timeDesc} from '../../assets/js/tool'
  export default{
    data(){
      return {
        currentIndex: -1,
        msg: false,
        str: "",
        goodIndex: -1,
        timeArr: [],
        message: false,
        msgarr: "",
        sayIndex: null,
        headloop: false
      }
    },
    computed: {
      ...mapState({
        self: state => state.data.self,
        baseUrl: 'baseUrl'
      }),
      ...mapGetters(['circleViewList', 'commentViewList'])
    },
    methods: {
      ...mapActions(['getCircleMsg', 'delCircleMsg', 'thumbUp', 'getMsg', 'setCommentArr']),
      back(){
        this.$router.back()
      },
      showgood(index){
        if (index === this.currentIndex) {
          this.currentIndex = -1
        } else {
          this.currentIndex = index
        }
      },
      writemsg(){
        this.currentIndex = -1
        this.msg = !this.msg
      },
      addCircle(){
        if (!this.str.trim()) {
          return
        } else {
          this.msg = !this.msg
          let message = this.str
          let time = new Date().getTime()
          /*this.timeArr.unshift(time)*/
          this.getCircleMsg({msg: message, time, pic: false})
          this.str = ""
          /*console.log(this.timeArr);*/
        }
      },
      delCircle(index){
        /*let currentTime = this.timeArr[index]
         this.delCircleMsg({time: currentTime})*/
        this.delCircleMsg(index)
      },
      goodView(index){
        this.thumbUp(index)
      },
      setMessage(index){
        this.currentIndex = -1
        this.message = !this.message
        this.msgarr = ""
        this.sayIndex = index
      },
      sentMsg(){
        this.message = !this.message
        let msg = this.msgarr
        this.getMsg({index: this.sayIndex, msg})
        this.setCommentArr()
        this.msgarr = ""
      },
      headSlider(y){
        y = parseInt(-y)
        if (y >= 360) {
          this.headloop = true
        }else {
          this.headloop = false
        }
      }
    },
    created(){
      this.$nextTick(() => {
        if (!this.circleScroll) {
          this.circleScroll = new BScroll(this.$refs.circleLoop, {
            click: true,
            probeType: 3 //滑动监听
          })
          //添加滚动监听
          this.circleScroll.on('scroll', ({y}) => {
            //console.log(y);
            this.headSlider(y)
          })
        } else {
          this.circleScroll.refresh()
        }
      })
    },
    filters: {
      getTime(val){
        return timeDesc(val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .discoverMsg {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 50;
    .header_box {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 5;
      &.active {
        background: #f2f2f2;
        span {
          color: #050504;
        }
        .header_bar{
          .left_btn{
            .icon-icon{
              color: #050504;
            }
          }
          .right_btn {
            .icon-zhaoxiangji1 {
              color: #050504;
            }
          }
        }
      }
      .header_bar {
        display: flex;
        height: 56px;
        line-height: 56px;
        .left_btn {
          flex: 0 0 35px;
          .icon-icon {
            font-size: 25px;
            color: #fff;
          }
        }
        span {
          flex: 1;
          text-align: center;
          font-size: 18px;
          font-weight: 700;
        }
        .right_btn {
          flex: 0 0 40px;
          .icon-zhaoxiangji1 {
            font-size: 25px;
            color: #fff;
          }
        }
      }
    }
    .circleview {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      overflow: hidden;
      .content {
        .header {
          position: relative;
          box-sizing: border-box;
          padding: 0 15px;
          height: 360px;
          background: url("../../../public/images/bg.jpg") no-repeat;
          background-size: 100% 100%;
          .name {
            position: absolute;
            bottom: 10px;
            right: 135px;
            span {
              font-size: 18px;
              color: #979797;
            }
          }
          .avatar {
            position: absolute;
            bottom: -20px;
            right: 15px;
            img {
              width: 80px;
              height: 80px;
              border-radius: 5px;
            }
          }
        }
        .msg {
          box-sizing: border-box;
          padding: 55px 0px 0 0px;
          .msgItem {
            box-sizing: border-box;
            padding: 20px 0 30px 10px;
            border-bottom: 1px solid red;
            display: flex;
            .avatar {
              flex: 0 0 55px;
              img {
                width: 45px;
                height: 45px;
                border-radius: 5px;
                border: 1px solid red;
              }
            }
            .msgContent {
              flex: 1;
              box-sizing: border-box;
              padding: 0 15px 0 0;
              .name {
                font-size: 20px;
                color: #616488;
              }
              .message {
                font-size: 20px;
                font-weight: 500;
                margin-bottom: 10px;
              }
              .pic {
                margin-bottom: 10px;
                img {
                  width: 80px;
                  height: 80px;
                }
              }
              .set {
                display: flex;
                height: 20px;
                line-height: 20px;
                position: relative;
                .time {
                  flex: 1;
                  color: #b6b6b6;
                }
                .del {
                  position: absolute;
                  left: 80px;
                  background: #f7f7f7;
                }
                .fantacy {
                  flex: 0 0 10px;
                  .icon-iconliangdian {
                    display: inline-block;
                    background: #f7f7f7;
                    width: 35px;
                    border-radius: 5px;
                    line-height: 25px;
                    height: 20px;
                    font-size: 40px;
                    vertical-align: middle;
                    position: relative;
                    z-index: 15;
                  }
                }
                .fade-enter-active,
                .fade-leave-active {
                  transition: all 0.5s linear;
                }
                .fade-enter {
                  transform: translateX(10px);
                  opacity: 0.3;
                }
                .fade-leave-to {
                  transform: translateX(10px);
                  opacity: 0;
                }
                .ranting {
                  position: absolute;
                  top: -10px;
                  right: 60px;
                  display: flex;
                  width: 200px;
                  background: #4d5154;
                  text-align: center;
                  padding: 10px 0;
                  box-sizing: border-box;
                  height: 40px;
                  line-height: 20px;
                  border-radius: 5px;
                  .good {
                    flex: 1;
                    .icon-iconfontlove {
                      color: #fff;
                      margin-right: 5px;
                    }
                    .icon-iconfontlove.active {
                      color: red;
                    }
                    span {
                      color: #fff;
                    }
                  }
                  .say {
                    border-left: 1px solid red;
                    flex: 1;
                    .icon-pinglun {
                      color: #fff;
                      margin-right: 5px;
                      vertical-align: middle;
                    }
                    span {
                      color: #fff;
                    }
                  }
                }
              }
              .setmsg {
                margin-top: 10px;
                width: 100%;
                background: #f3f3f5;
              }
            }
          }
        }
      }
    }
    .writepage {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      z-index: 16;
      .write_header {
        display: flex;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        padding: 0 15px;
        .cancel {
          flex: 0 0 40px;
          font-size: 18px;
        }
        .write_title {
          flex: 1;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
        }
        .sent {
          font-size: 18px;
          .active {
            background: #07c15d;
          }
          span {
            padding: 5px 10px;
            background: #ccc;
            border-radius: 5px;
            color: #fff;
          }
        }
      }
      .writer_content {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 25px;
        .write_msg {
          width: 100%;
          height: 200px;
          border-bottom: 1px solid #ccc;
          textarea {
            width: 100%;
            height: 197px;
            outline: 0;
            border: 0;
          }
        }
      }
    }
    .writemsg {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .1);
      z-index: 16;
      .bg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 70px;
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
        padding: 10px;
        background: #f8f8f8;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);
        .happy {
          text-align: center;
          font-size: 30px;
          flex: 0 0 60px;
          font-weight: 400;
        }
        .inp {
          display: inline-block;
          height: 48px;
          flex: 1;
          position: relative;
          border-radius: 4px;
          input {
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
        }
        .send {
          margin-top: 3px;
          flex: 0 0 50px;
          display: inline-block;
          width: 50px;
          line-height: 43px;
          height: 43px;
          text-align: center;
          background: #8feb6b;
          border-radius: 5px;
        }
      }
    }
  }
</style>
