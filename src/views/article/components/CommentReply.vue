<template>
  <div class="reply-container">
    <van-nav-bar class="reply-nav">
      <template #title>
        <span class="text">{{ comment.reply_count ? comment.reply_count + ' 条评论' : '暂无评论' }}</span>
      </template>
      <template #left>
        <van-icon @click="$emit('close-reply')" name="cross"/>
      </template>
    </van-nav-bar>
    <!-- 被评论的对象-->
    <comment-item :bg="bg" :show-button="false" :comment="comment"/>
    <van-cell class="reply-all" title="全部回复"></van-cell>
    <!-- 被评论对象的评论列表 -->
    <comment-list :list="commentList" :article-id="comment.com_id" :type="'c'"/>
    <!-- 评论评论的评论 -->
    <van-cell class="reply-bottom">
      <van-button round size="small" @click="showReplyPost=true" class="reply-bottom-btn">回复</van-button>
    </van-cell>
    <!-- 写评论评论的评论 -->
    <van-popup v-model="showReplyPost" position="bottom">
      <comment-post @post-list="onPost" :target="comment.com_id"/>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/views/article/components/CommentItem'
import CommentList from '@/views/article/components/CommentList'
import CommentPost from '@/views/article/components/CommentPost'

export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  data () {
    return {
      bg: true,
      showReplyPost: false,
      commentList: []
    }
  },
  created () {
  },
  methods: {
    onPost (data) {
      this.showReplyPost = false
      this.comment.reply_count++
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.reply-container, .van-nav-bar__content, .van-nav-bar {
  border-radius: 20px 20px 0 0;
}

.reply-container {
  padding-top: 90px;
  padding-bottom: 96px;
}

.reply-nav {
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;

  .text {
    font-size: 24px;
  }
}

.reply-all {
  color: #dc9830;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 96px;
  padding: 0;
  border-top: 1px solid #f8f8f8;

  .van-cell__value {
    display: flex;
    justify-content: center;
    align-items: center;

    .reply-bottom-btn {
      width: 60%;
      letter-spacing: 8px;
      color: #62627f;
    }
  }
}
</style>
