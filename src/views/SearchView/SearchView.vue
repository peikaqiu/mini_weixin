<template>
  <div class="search-view">
    <div class="header">
      <div class="inp">
        <input type="text" v-model="str" placeholder="搜索">
        <div class="search_text">
          <i class="iconfont icon-tubiao-"></i>
        </div>
      </div>
      <span class="cancel" @click="back">取消</span>
    </div>
    <mu-list textline="two-line">
      <div class="list" v-for="friend in searchFriends" :key="friend._id">
        <router-link to="/MessageView/ChatView">
          <mu-list-item class="item" avatar button @click="itemClick(friend)">
            <mu-list-item-action>
              <mu-avatar :size="40">
                <img :src="`${baseUrl}${friend.avatar}`">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{friend.name}}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider inset></mu-divider>
        </router-link>
      </div>
    </mu-list>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default{
    data(){
      return {
        str: ""
      }
    },
    methods: {
      ...mapActions(['sendParToChar']),
      back(){
        this.$router.back()
      },
      itemClick(friend){
        this.sendParToChar(friend)
        this.$router.replace({path:'/MessageView/ChatView'})
      }
    },
    computed: {
      ...mapState({
        baseUrl: 'baseUrl',
        // 根据输入框的文本内容,与好友数组进行filter过滤,返回一个好友name值与输入框文本正则匹配成功的新数组
        searchFriends(state){
          if (!this.str.trim()) {
            return
          }
          return state.data.friends.filter(f => {
            let reg = new RegExp(this.str, 'img')
            return reg.test(f.name)
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .search-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
    line-height: 40px;
    background: #f2f2f2;
    .header {
      display: flex;
      position: relative;
      .inp {
        border: 1px solid #f2f2f2;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 2px;
        height: 35px;
        line-height: 35px;
        flex: 1;
        input {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          outline: 0;
          border: 0;
          padding: 0 0 0 30px;
        }
        .search_text {
          position: absolute;
          top: 0;
          left: 5px;
          .icon-tubiao- {
            font-size: 25px;
            vertical-align: middle;
            color: #828284;
          }
          span {
            margin-left: 5px;
            letter-spacing: 2px;
            color: #828284;
          }
        }
      }
      .cancel {
        flex: 0 0 50px;
        text-align: center;
        font-size: 18px;
      }
    }
    .mu-avatar {
      border-radius: 0;
      position: relative;
    }

    .mu-list {
      padding: 0;
    }
  }
</style>
