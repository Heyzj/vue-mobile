<template>
  <van-cell class="comment-item" :class="bg?'bgColor':''">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        @click="onLike"
        :class="comment.is_liking?'liked':''"
        :icon="comment.is_liking?'good-job':'good-job-o'"
      >{{ comment.like_count }}
      </van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comment.pubdate | formatTimeToAfter }}</span>
        <van-button @click="$emit('reply-click',comment)"
                    v-show="showButton"
                    class="reply-btn" round>
          回复 {{ comment.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { commentLike, cancelCommentLike } from '@/api/comment'

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    },
    bg: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {
    async onLike () {
      try {
        if (this.comment.is_liking) {
          // 执行取消点赞
          await cancelCommentLike(this.comment.com_id)
          this.comment.like_count--
          this.$toast.success('取消点赞成功')
        } else {
          // 执行点赞
          await commentLike(this.comment.com_id)
          this.comment.like_count++
          this.$toast.success('点赞成功')
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        this.$toast({
          message: '出错了，稍后再试',
          position: 'top'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }

  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }

  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }

  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }

  .bottom-info {
    display: flex;
    align-items: center;
  }

  .reply-btn {
    min-width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }

  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    background: transparent;

    &.liked {
      color: #eb5253;
    }

    .van-icon {
      font-size: 30px;
    }
  }

  &.bgColor {
    background: #f3f2f1;
    opacity: .7;
  }
}
</style>
