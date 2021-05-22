<template>
  <van-list
    v-model="loading"
    :finished="finished"
    :error="error"
    error-text="请求失败，点击重新加载"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
    <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.content"/>-->
    <comment-item @reply-click="$emit('reply-click',$event)" :comment="item" v-for="(item,index) in list" :key="index"/>
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import JSONBig from 'json-bigint'
import CommentItem from '@/views/article/components/CommentItem'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (val) {
        return ['a', 'c'].includes(val)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        // 异步更新数据
        const artId = JSONBig.stringify(this.articleId)
        const { data } = await getComment({
          type: this.type,
          source: artId,
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        this.list.push(...results)
        this.$emit('total', data.data.total_count)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (results.length) {
          this.offset = data.data.last_id
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
