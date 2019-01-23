<template>
  <div v-if="isAjax">请求中</div>
  <div v-else>
    <mu-bottom-nav :value.sync="tab" @change="change" class="bottom">
      <span class="unread" v-show="totalUnread">{{totalUnread}}</span>
      <mu-bottom-nav-item value="MessageView" title="微信" icon="chat_bubble_outline"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="FriendsView" title="联系人" icon="supervisor_account"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="DiscoverView" title="发现" icon="explore"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="MySelfView" title="我" icon="person_outline"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
  import {mapGetters,mapState} from 'vuex'
  export default{
    data(){
      return {
        tab: 'MessageView'
      }
    },
    methods: {
      change(val){
        this.$router.push(val)
      }
    },
    computed:{
      ...mapState(['isAjax']),
      ...mapGetters(['totalUnread'])
    }
  }
</script>

<style scoped>
.bottom{
  position: relative;
}
  .bottom .unread{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #fff;
    font-size: 9px;
    text-align: center;
    background: #ff4d4f;
    position: absolute;
    top: 0;
    left: 55px;
  }
</style>
