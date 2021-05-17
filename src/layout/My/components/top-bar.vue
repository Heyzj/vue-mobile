<template>
  <div class="top-container">
    <div class="container">
      <div class="login-img" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'top-bar',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 361px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/banner.png");
  background-size: cover;

  .login-img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }

    span.text {
      color: #ffffff;
      font-size: 28px;
      letter-spacing: 2px;
    }
  }
}
</style>
