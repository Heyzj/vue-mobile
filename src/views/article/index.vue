<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中
        </van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="articleList.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleList.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleList.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleList.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleList.pubdate | formatTimeToAfter }}
          </div>
          <follow-user @is-follow="articleList.is_followed = $event" :user-info="articleList"/>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div ref="content" class="article-content markdown-body" v-html="articleList.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <comment-list :list="commentList"
                      @total="CommentTotal"
                      @reply-click="replyComment"
                      :article-id="articleList.art_id"/>
        <!-- 评论列表结束 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="showCommentPopup = true"
          >写评论
          </van-button>
          <!--          <van-icon-->
          <!--            name="comment-o"-->
          <!--            badge="123"-->
          <!--            color="#777"-->
          <!--          />-->
          <van-button disabled class="comment-count" icon="comment-o">
            <van-badge :content="total>99?'99+':total"/>
          </van-button>
          <collect v-model="articleList.is_collected"
                   :article-id="articleList.art_id"/>
          <good-like v-model="articleList.attitude"
                     :article-id="articleList.art_id"/>
          <van-button class="comment-share" icon="share-o"></van-button>
          <!--          <van-icon name="share" color="#777777"></van-icon>-->
        </div>
        <!-- /底部区域 -->
        <!-- 写评论弹层 -->
        <van-popup v-model="showCommentPopup" position="bottom">
          <comment-post @post-list="onPostList" :target="articleList.art_id"/>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure"/>
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure"/>
        <p class="text">内容加载失败！</p>
        <van-button @click="getArticleList" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 回复评论-->
    <van-popup v-model="showCommentReply"
               position="bottom"
               class="reply-popup"
               :overlay-style="{'opacity':'.6'}"
               :style="{ height: '85%' }">
      <comment-reply @close-reply="showCommentReply=false" v-if="showCommentReply" :comment="replyList"/>
    </van-popup>
    <!-- /回复评论-->

  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
import '@/styles/github-markdown.css'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/FollowUser'
import Collect from '@/components/Collect'
import GoodLike from '@/components/GoodLike'
import CommentList from '@/views/article/components/CommentList'
import CommentPost from '@/views/article/components/CommentPost'
import CommentReply from '@/views/article/components/CommentReply'

export default {
  name: 'articleIndex',
  components: {
    FollowUser,
    Collect,
    GoodLike,
    CommentList,
    CommentPost,
    CommentReply
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false,
      articleList: {},
      errStatus: 0,
      total: 0,
      showCommentPopup: false,
      commentList: [],
      showCommentReply: false,
      replyList: {}
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      this.loading = true
      try {
        const { data } = await getArticleDetail(this.articleId)
        this.articleList = data.data
        setTimeout(() => {
          this.imagePreview()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    imagePreview () {
      const contentList = this.$refs.content
      const image = contentList.querySelectorAll('img')
      const img = []
      image.forEach((item, index) => {
        img.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images: img,
            startPosition: index
          })
        }
      })
    },
    CommentTotal (total) {
      this.total = total
    },
    // 评论成功，将最新的评论数据传递过来
    onPostList (data) {
      // 关闭评论弹层
      this.showCommentPopup = false
      this.total++
      // 将评论添加到评论列表
      this.commentList.unshift(data.new_obj)
    },
    // 回复评论的评论
    replyComment (data) {
      this.replyList = data
      this.showCommentReply = true
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;

      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
    }

    .article-content {
      padding: 55px 32px;

      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    .comment-share {
      border: none;
      font-size: 32px;
    }

    .comment-count {
      border: none;

      &.van-button--disabled {
        opacity: unset;
      }

      .van-button__text {

        .van-badge {
          font-size: 12px;
        }

        position: absolute;
        top: 3px;
        right: 3px;
      }
    }
  }

  .reply-popup {
    border-radius: 20px 20px 0 0;
  }
}
</style>
