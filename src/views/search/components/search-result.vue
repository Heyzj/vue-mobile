<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in searchList" :key="index" :title="item.title"/>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'search-result',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      error: false,
      searchList: [],
      page: 1,
      per_page: 10
    }
  },
  created () {
  },
  methods: {
    async onLoad () {
      const query = {
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      }
      try {
        const { data } = await getSearchResult(query)
        const { results } = data.data
        this.searchList.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
