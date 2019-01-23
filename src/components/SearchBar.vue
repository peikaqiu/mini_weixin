<template>
  <div class="search">
    <router-link to="/MessageView/SearchView">
      <div class="inp">
        <input type="text">
        <div class="search_text">
          <i class="iconfont icon-tubiao-"></i>
          <span>搜索</span>
        </div>
      </div>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default{}
</script>

<style lang="scss" scoped>
  .search {
    box-sizing: border-box;
    padding: 0 10px;
    background: #f2f2f2;
    .inp {
      border: 1px solid #f2f2f2;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 2px;
      height: 35px;
      line-height: 35px;
      position: relative;
      input {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        outline: 0;
        border: 0;
        padding: 0 0 0 10px;
      }
      .search_text {
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -30px;
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
  }
</style>
