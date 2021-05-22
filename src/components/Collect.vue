<template>
  <van-button
    class="tab-btn"
    :loading="loading"
    :icon="isCollect ? 'star':'star-o'"
    :class="{collected:isCollect}"
    @click="onCollect"
  />
</template>

<script>
import { collect, cancelCollect } from '@/api/article'

export default {
  name: 'Collect',
  model: {
    prop: 'isCollect',
    event: 'updateCollect'
  },
  props: {
    isCollect: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
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
    async onCollect () {
      this.loading = true
      try {
        if (this.isCollect) {
          // 取消收藏文章
          await cancelCollect(this.articleId)
        } else {
          // 收藏文章
          await collect(this.articleId)
        }
        this.$emit('updateCollect', !this.isCollect)
        this.$toast.success(!this.isCollect ? '收藏成功' : '取消成功')
      } catch (err) {
        console.log(err)
        this.$toast({
          message: '操作失败，请稍后再试',
          position: 'top'
        })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  color: #f5ea2d !important;
}

.van-icon-star {
  font-size: 40px;
}

.tab-btn {
  border: none;
}
</style>
