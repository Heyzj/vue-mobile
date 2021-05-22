<template>
  <van-button
    v-if="userInfo.is_followed"
    class="follow-btn"
    round
    @click="onFollow"
    :loading="loadingFollow"
    size="small"
  >已关注
  </van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    @click="onFollow"
    :loading="loadingFollow"
    size="small"
    icon="plus"
  >关注
  </van-button>
</template>

<script>
import { followUser, cancelFollowUser } from '@/api/user'

export default {
  name: 'FollowUser',
  props: {
    userInfo: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loadingFollow: false
    }
  },
  created () {
  },
  methods: {
    // 是否关注用户
    async onFollow () {
      this.loadingFollow = true
      try {
        if (this.userInfo.is_followed) {
          // 执行取消关注
          await cancelFollowUser(this.userInfo.aut_id)
          this.$toast.success('取消关注成功')
        } else {
          // 执行关注操作
          await followUser(this.userInfo.aut_id)
          this.$toast.success('关注成功')
        }
        this.$emit('is-follow', !this.userInfo.is_followed)
      } catch (err) {
        let message = '操作失败，请稍后在试'
        if (err.response && err.response.status === 400) {
          message = '您不能关注自己'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.loadingFollow = false
    }
  }
}
</script>

<style lang="less" scoped>
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>
