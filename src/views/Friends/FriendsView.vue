<template>
  <div>
    <div class="title">
      <span>通讯录</span>
      <mu-icon class="icon" value="add_circle_outline"></mu-icon>
    </div>
    <div class="friendView" ref="friendLoop">
      <div class="content">
        <SearchBar></SearchBar>
        <div class="firstName" v-for="first in firstCord" :key="first._id" ref="everyItem">
          <div class="name">{{first}}</div>
          <mu-list textline="two-line">
            <div class="list" v-for="friend in friends" :key="friend._id" v-if="first === friend.firstcode">
              <router-link to="/FriendsView/FriendMsg">
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
      </div>
      <div class="nameTitle">
        <div v-for="(first,index) in firstCord" :class="{active:index == currentIndex}" :key="first._id" @click="goElement(index)">{{first}}</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex'
  import BScroll from 'better-scroll'
  import SearchBar from '../../components/SearchBar'
  export default{
    data(){
      return {
        currentIndex: 0,
        friendsHeightArr: []
      }
    },
    computed: {
      ...mapState({
        friends: state => state.data.friends,
        baseUrl: 'baseUrl'
      }),
      ...mapGetters(['firstCord'])
    },
    methods: {
      ...mapActions(['sendParToChar']),
      itemClick(friend){
        this.sendParToChar(friend)
      },
      _initFriendsHeight(){
        let y = 0
        this.friendsHeightArr.push(y)
        for (let i = 0; i < this.$refs.everyItem.length; i++) {
          let everyFriendHeight = this.$refs.everyItem[i]
          y += everyFriendHeight.clientHeight
          this.friendsHeightArr.push(y)
        }
      },
      refreshCurrentIndex(y){
        y = parseInt(-y)
        for (let i = 0; i < this.friendsHeightArr.length - 1; i++) {
          let nowHeight = this.friendsHeightArr[i]
          let nextHeight = this.friendsHeightArr[i + 1]
          if (y >= nowHeight && y < nextHeight) {
            this.currentIndex = i
            //console.log(i);
            break
          }
        }
      },
      goElement(index){
        let currentEl = this.$refs.everyItem[index]
        this.friendScroll.scrollToElement(currentEl,10)
      }
    },
    created(){
      this.$nextTick(() => {
        //console.log(this.$refs.everyItem);
        if (!this.friendScroll) {
          this.friendScroll = new BScroll(this.$refs.friendLoop, {
            click: true,
            probeType: 3 //滑动监听
          })
          //添加滚动监听
          this.friendScroll.on('scroll', ({y}) => {
            //console.log(y);
            this.refreshCurrentIndex(y)
          })
        } else {
          this.friendScroll.refresh()
        }

        this._initFriendsHeight()
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

  .friendView {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 56px;
    overflow: hidden;
  }

  .firstName {
    width: 100%;
    background: #fff;
  }

  .name {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f1f1f1;
    box-sizing: border-box;
    padding: 0 15px;
    font-size: 16px;
    font-weight: 300;
    color: #7a7a7a;
  }

  .mu-avatar {
    border-radius: 0;
    position: relative;
  }

  .mu-list {
    padding: 0;
  }

  .nameTitle {
    position: fixed;
    right: 0;
    top: 150px;
    text-align: center;
  }

  .nameTitle > div {
    width: 15px;
    height: 15px;
    line-height: 15px;
    margin: 5px;
    border-radius: 50%;
    font-size: 9px;
  }

  .nameTitle > div.active {
    background: #07c359;
    color: #fff;
  }
</style>
