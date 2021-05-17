<template>
  <div class="article-tab">
    <van-pull-refresh v-model="isRefreshLoading"
                      :success-text="successRefreshText"
                      success-duration="1500"
                      animation-duration="500"
                      style="min-height: 100vh;"
                      @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item :article="art" v-for="(art,index) in list" :key="index"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import ArticleItem from '@/components/ArticleItem'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      successRefreshText: '刷新成功'
    }
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticleList({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      return data
    },
    async onLoad () {
      try {
        const data = await this.loadArticle()
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const data = await this.loadArticle()
        const { results } = data.data
        this.list.unshift(...results)
        this.isRefreshLoading = false
        this.successRefreshText = `刷新成功 更新了${results.length}条数据`
      } catch (err) {
        this.successRefreshText = '刷新失败'
        this.isRefreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-tab {
  height: 79vh;
  overflow-y: auto;
}

</style>
