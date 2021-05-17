<template>
  <div class="memory-tab">
    <van-cell icon="search"
              v-for="(item,index) in suggestionList"
              :key="index"
              @click="$emit('searchItem',item)">
      <div class="sug-text"
           slot="title"
           v-html="highLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'search-memory',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestionList: []
    }
  },
  created () {
  },
  methods: {
    async loadSuggestion (val) {
      try {
        const { data } = await getSuggestion(val)
        this.suggestionList = data.data.options
      } catch (err) {
        this.$toast('数据出错了，请稍后在试')
      }
    },
    // 高亮显示联想搜索的字符串
    highLight (item) {
      const reg = new RegExp(this.searchText, 'gi')
      const htmlStr = `<span class="high-light">${this.searchText}</span>`
      return item.replace(reg, htmlStr)
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (val) {
        this.loadSuggestion(val)
      }, 250),
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.memory-tab {
  /deep/ .van-cell {
    span.high-light {
      color: #527deb;
    }
  }
}
</style>
