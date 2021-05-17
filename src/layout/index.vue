<template>
  <div class="layout-container">
    <router-view/>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="icon icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="icon icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="icon icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="icon icon-wode"></i>
        <span class="text">{{ this.$store.state.userToken ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  padding-bottom: 100px;

  i.icon {
    font-size: 36px;
  }

  span.text {
    font-size: 18px;
  }
}
</style>
