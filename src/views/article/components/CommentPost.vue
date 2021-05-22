<template>
  <!-- 发布评论 -->
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="说点什么吧"
      show-word-limit
    />
    <van-button
      class="post-btn"
      type="info"
      size="small"
      :disabled="!message.length"
      @click="onAddComment"
    >发布
    </van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
import JSONBig from 'json-bigint'

export default {
  name: 'CommentPost',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  created () {
  },
  methods: {
    async onAddComment () {
      try {
        this.$toast.loading({
          duration: 2000, // 持续展示 toast
          forbidClick: true,
          message: '发布中...'
        })
        const id = JSONBig.stringify(this.target)
        const { data } = await addComment({
          target: id,
          content: this.message,
          art_id: this.articleId
        })
        this.$toast.success('发表成功')
        this.message = ''
        this.$emit('post-list', data.data)
      } catch (err) {
        this.$toast.fail('评论失败了')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment {
  display: flex;
  padding: 15px;
  align-items: center;

  .post-field {
    flex: 22;
    background: #f5f7f9;
    margin-right: 15px;
  }

  .post-btn {
    flex: 2;
    border: none;
    outline: none;
  }
}
</style>
