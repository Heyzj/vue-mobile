<template>
  <van-button
    :icon="likeId===1?'good-job':'good-job-o'"
    :class="[likeId===1?'liked':'']"
    :loading="loading"
    @click="onLike"
  />
</template>

<script>
import { goodLike, cancelGoodLike } from '@/api/article'

export default {
  name: 'GoodLike',
  model: {
    prop: 'likeId',
    event: 'update-like'
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    likeId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  created () {
  },
  methods: {
    async onLike () {
      this.loading = true
      let status = 1
      try {
        if (this.likeId === 1) {
          // 取消点赞
          await cancelGoodLike(this.articleId)
          status = -1
        } else {
          // 点赞
          await goodLike(this.articleId)
          status = 1
        }
        this.$toast.success(this.likeId === 1 ? '取消点赞' : '点赞成功')
        this.$emit('update-like', status)
      } catch (err) {
        this.$toast({
          message: '操作失败，请稍后重试',
          position: 'top'
        })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-button {
  border: none;
}

.liked {
  color: #eb5253 !important;

  .van-icon-good-job {
    font-size: 40px;
  }
}
</style>
