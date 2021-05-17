<template>
  <div class="search-tab">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        :background="searchBg"
        autofocus
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult=false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result :search-text="searchText" v-if="isShowResult"></search-result>
    <!-- 搜索联想记录 -->
    <search-memory @searchItem="onSearch" :search-text="searchText" v-else-if="searchText"></search-memory>
    <!-- 搜索历史 -->
    <search-history @empty-history="emptyHistory"
                    :save-history="saveHistory"
                    @search-history="onSearch"
                    v-else></search-history>
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history'
import SearchMemory from '@/views/search/components/search-memory'
import SearchResult from '@/views/search/components/search-result'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'searchIndex',
  components: {
    SearchHistory,
    SearchMemory,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      searchBg: '#3296fa',
      isShowResult: false,
      saveHistory: getItem('historyList') || []
    }
  },
  created () {
  },
  watch: {
    saveHistory: {
      handler (val) {
        setItem('historyList', val)
      }
    }
  },
  methods: {
    emptyHistory () {
      this.saveHistory = []
    },
    onSearch (item) {
      this.searchText = item
      const index = this.saveHistory.indexOf(item)
      if (index !== -1) {
        this.saveHistory.splice(index, 1)
      }
      this.saveHistory.unshift(item)
      this.isShowResult = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-tab {
  padding-top: 110px;

  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .van-search__action {
    color: #ffffff;
  }
}
</style>
