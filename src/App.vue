<template>
  <div id="app">
    <div v-if="isAjax">请求中</div>
    <div v-else>
      <router-view/>
      <div class="tabbar">
        <BottomTab></BottomTab>
      </div>
    </div>
  </div>
</template>

<script>
  import BottomTab from './components/BottomTab'
  import {mapState} from 'vuex'
  import ChatView from "./views/CharView/ChatView";
  export default{
      computed:mapState(['isAjax']),
      components:{
        ChatView,
        BottomTab
      }
  }
</script>

<style>
  .tabbar{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
