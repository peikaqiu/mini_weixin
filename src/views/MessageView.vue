<template>
  <div>
    <div v-if="isAjax">请求中</div>
    <div class="container" v-else>
      <div class="title">
        <span>微信</span>
        <span v-show="totalUnread">({{totalUnread}})</span>
        <mu-icon class="icon" value="add_circle_outline"></mu-icon>
      </div>
      <div class="msgView" ref="msgLoop">
        <div class="content">
          <SearchBar></SearchBar>
          <mu-list textline="two-line">
            <div class="list" v-for="f in msgViewList" :key="f._id">
              <router-link to="/MessageView/ChatView">
                <v-touch @swipeleft="onSwipeleft(f._id)" @swiperight="cancelRemove" @tap="itemClick(f)">
                  <mu-list-item class="item" :class="{remove:currentId === f._id,active:f.toTop}" avatar button>
                    <mu-list-item-action>
                      <mu-avatar :size="40">
                        <img :src="`${baseUrl}${f.avatar}`">
                        <span v-show="f.unread">{{f.unread}}</span>
                      </mu-avatar>
                    </mu-list-item-action>
                    <mu-list-item-content>
                      <mu-list-item-title>{{f.name}}</mu-list-item-title>
                      <mu-list-item-sub-title>{{f.lastMessage.msg}}</mu-list-item-sub-title>
                    </mu-list-item-content>
                    <mu-list-item-action class="desc">
                      <mu-list-item-title><span class="time">{{f.lastMessage.time | getTime}}</span></mu-list-item-title>
                    </mu-list-item-action>
                  </mu-list-item>
                </v-touch>
                <mu-divider inset></mu-divider>
              </router-link>
              <div class="put-btn" @click="putMsg(f._id)">{{toTop(f._id)}}</div>
              <div class="delete-btn" @click="delMsg(f._id)">删除</div>
            </div>
          </mu-list>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex'
  import {timeDesc} from '../assets/js/tool'
  import BScroll from 'better-scroll'
  import SearchBar from '../components/SearchBar'
  export default{
    data(){
      return {
        currentId: null
      }
    },
    computed: {
      ...mapState(['isAjax', 'baseUrl', 'messageList', 'chat']),
      ...mapGetters(['msgViewList', 'totalUnread'])
    },
    filters: {
      getTime(val){
        return timeDesc(val)
      }
    },
    methods: {
      ...mapActions(['sendParToChar']),
      onSwipeleft(id){
        this.currentId = id
      },
      cancelRemove(){
        this.currentId = null
      },
      itemClick(friend){
        this.sendParToChar(friend)
        this.currentId = null
      },
      delMsg(id){
        this.$store.commit('DELETD_MESSAGE', id)
      },
      putMsg(id){
        this.currentId = null
        this.$store.commit('PUT_MESSAGE', id)
      },
      toTop(f){
        let record = this.messageList.find(p => f === p._id)
        //console.log(this.messageList);
        if (record.toTop === true) {
          return '取消置顶'
        } else {
          return '置顶'
        }
      }
    },
    created(){
        this.$nextTick(() => {
            if(!this.msgScroll){
                this.msgScroll = new BScroll(this.$refs.msgLoop,{
                    click:true
                })
            }else{
                this.msgScroll.refresh()
            }
        })
    },
    components:{
      SearchBar
    }
  }
</script>

<style scoped>
  .title {
    width: 100%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #f2f2f2;
    font-size: 18px;
    font-weight: 700;
    position: relative;
  }

  .title span {
    display: inline-block;
  }

  .title .icon {
    position: absolute;
    right: 12px;
    top: 12px;
  }
  .msgView{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 56px;
    overflow: hidden;
  }
  .mu-list {
    padding: 0;
  }

  .list {
    position: relative;
  }

  .item.active {
    background: #f2f2f2;
  }

  .item {
    background: #fff;
    position: relative;
    transition: all .3s linear;
    z-index: 3;
  }

  .item.remove {
    transform: translateX(-150px);
  }

  .list .put-btn {
    position: absolute;
    right: 50px;
    top: 0;
    width: 100px;
    height: 72px;
    line-height: 72px;
    text-align: center;
    color: #fff;
    background: #c8c7cd;
    z-index: 2;
  }

  .list .delete-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 72px;
    line-height: 72px;
    text-align: center;
    color: #fff;
    background: #ff3a32;
    z-index: 2;
  }

  .mu-avatar {
    border-radius: 0;
    position: relative;
  }

  .mu-avatar span {
    position: absolute;
    right: -10px;
    top: -10px;
    color: #fff;
    border-radius: 50%;
    display: inline-block;
    background: red;
    text-align: center;
    font-size: 10px;
    width: 20px;
    height: 20px;
  }

  .item .desc {
    position: relative;
  }

  .item .desc .time {
    display: inline-block;
    width: 100%;
    text-align: right;
    font-size: 10px;
    position: absolute;
    top: 10px;
  }
</style>
