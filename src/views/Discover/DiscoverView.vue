<template>
  <div>
    <div class="title">
      <span>发现</span>
    </div>
    <div class="discoverView" ref="discoverLoop">
      <div class="content">
        <router-link to="/DiscoverView/DiscoverMsg">
          <div class="circle">
            <div class="circle_bottom">
              <i class="iconfont icon-pengyouquan"></i>
              <span>朋友圈</span>
              <mu-list-item-action class="right_row">
                <mu-icon value="keyboard_arrow_right"></mu-icon>
              </mu-list-item-action>
            </div>
          </div>
        </router-link>
        <split></split>
        <div class="message">
          <div class="tool">
            <div class="tool_bottom">
              <i class="iconfont icon-saoyisao"></i>
              <span>扫一扫</span>
              <mu-list-item-action class="right_row">
                <mu-icon value="keyboard_arrow_right"></mu-icon>
              </mu-list-item-action>
            </div>
          </div>
          <div class="msg">
            <i class="iconfont icon-wx_shake-copy"></i>
            <span>摇一摇</span>
            <mu-list-item-action class="right_row">
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </div>
        </div>
        <split></split>
        <div class="message">
          <div class="tool">
            <div class="tool_bottom">
              <i class="iconfont icon-kanyikan"></i>
              <span>看一看</span>
              <mu-list-item-action class="right_row">
                <mu-icon value="keyboard_arrow_right"></mu-icon>
              </mu-list-item-action>
            </div>
          </div>
          <div class="msg">
            <i class="iconfont icon-search"></i>
            <span>搜一搜</span>
            <mu-list-item-action class="right_row">
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </div>
        </div>
        <split></split>
        <div class="message">
          <div class="tool">
            <div class="tool_bottom">
              <i class="iconfont icon-faxian-fujinderen"></i>
              <span>附近的人</span>
              <mu-list-item-action class="right_row">
                <mu-icon value="keyboard_arrow_right"></mu-icon>
              </mu-list-item-action>
            </div>
          </div>
          <div class="msg">
            <i class="iconfont icon-piaoliuping"></i>
            <span>漂流瓶</span>
            <mu-list-item-action class="right_row">
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </div>
        </div>
        <split></split>
        <div class="message">
          <div class="tool">
            <div class="tool_bottom">
              <i class="iconfont icon-gouwu"></i>
              <span>购物</span>
              <mu-list-item-action class="right_row">
                <mu-icon value="keyboard_arrow_right"></mu-icon>
              </mu-list-item-action>
            </div>
          </div>
          <div class="msg">
            <i class="iconfont icon-youxi"></i>
            <span>游戏</span>
            <mu-list-item-action class="right_row">
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </div>
        </div>
        <split></split>
        <div class="circle">
          <div class="circle_bottom">
            <i class="iconfont icon-xiaochengxu"></i>
            <span>小程序</span>
            <mu-list-item-action class="right_row">
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </mu-list-item-action>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Split from "../../views/widget/Spilt";
  import BScroll from "better-scroll"
  export default{
    components: {Split},
    created(){
        this.$nextTick(() => {
            if(!this.discoverScroll){
                this.discoverScroll = new BScroll(this.$refs.discoverLoop,{
                    click:true
                })
            }else{
                this.discoverScroll.refresh()
            }
        })
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #f2f2f2;
    font-size: 18px;
    font-weight: 700;
    position: relative;
    .title span {
      display: inline-block;
    }
  }

  .discoverView {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 56px;
    overflow: hidden;
    .content {
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
          .icon-pengyouquan,
          .icon-xiaochengxu {
            font-size: 25px;
            margin-right: 15px;
          }
          .icon-pengyouquan {
            color: #e3ce2c;
          }
          .icon-xiaochengxu {
            color: #2071b2;
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
            right: -20px;
            top: 0;
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
            border-bottom: 1px solid #d7d7d7;
            i {
              flex: 0 0 30px;
            }
            .icon-saoyisao,
            .icon-kanyikan,
            .icon-faxian-fujinderen,
            .icon-gouwu {
              font-size: 25px;
              margin-right: 15px;
            }
            .icon-saoyisao {
              color: #2071b2;
            }
            .icon-kanyikan {
              color: #e3ce2c;
            }
            .icon-faxian-fujinderen {
              color: #2071b2;
            }
            .icon-gouwu {
              color: #e4655f;
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
              right: -20px;
              top: 0;
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
          .icon-wx_shake-copy,
          .icon-search,
          .icon-piaoliuping,
          .icon-youxi {
            font-size: 25px;
            margin-right: 15px;
          }
          .icon-wx_shake-copy {
            color: #2071b2;
          }
          .icon-search {
            color: #e4655f;
          }
          .icon-piaoliuping {
            color: #2071b2;
          }
          .icon-youxi {
            color: #e3ce2c;
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
            right: -20px;
            top: 0;
          }
        }
      }
    }
  }
</style>
