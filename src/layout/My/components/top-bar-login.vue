<template>
  <div class="container">
    <div class="info">
      <div class="top-info">
        <div class="left">
          <van-image
            class="l-img"
            fit="cover"
            round
            :src="userInfo.photo"
          />
          <span class="text">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button class="r-btn" icon="setting-o" type="info" size="mini" round>
            <span>编辑资料</span>
          </van-button>
        </div>
      </div>
      <div class="bu-info">
        <div class="info-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="info-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="info-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="info-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'

export default {
  name: 'top-bar-login',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.$store.state.userToken) {
      this.loadUserInfo()
    }
  },
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        console.log(err)
      }
    }
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

  .info {
    width: 100%;

    .top-info {
      height: 231px;
      display: flex;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .l-img {
          width: 132px;
          height: 132px;
          border: 1px solid #ffffff;
          margin-right: 23px;
          box-sizing: border-box;
        }

        span.text {
          font-size: 30px;
          letter-spacing: 2px;
          color: #ffffff;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .r-btn {
          background: #ffffff;
          color: #7b7a7a;
          letter-spacing: 3px;
        }
      }
    }

    .bu-info {
      height: 130px;
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .info-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .count {
          color: #eaeeec;
          font-size: 36px;
        }

        .text {
          color: #ffffff;
          font-size: 23px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
