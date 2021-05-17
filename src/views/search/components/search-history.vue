<template>
  <div class="history-tab">
    <van-cell title="搜索历史">
      <div class="delete-text" v-if="isShowDel">
        <span class="all-del" @click="deleteAll">全部删除</span>
        <span @click="isShowDel=false">完成</span>
      </div>
      <van-icon v-else @click="isShowDel=true" name="delete"></van-icon>
    </van-cell>
    <van-cell v-for="(item,index) in saveHistory"
              @click="toggleHistory(item,index)"
              :key="index">
      <span>{{ item }}</span>
      <van-icon slot="right-icon" v-show="isShowDel" name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'search-history',
  props: {
    saveHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isShowDel: false
    }
  },
  created () {
  },
  methods: {
    deleteAll () {
      this.$emit('empty-history')
    },
    toggleHistory (item, index) {
      if (this.isShowDel) {
        // 删除逻辑
        this.saveHistory.splice(index, 1)
      } else {
        // 搜索逻辑
        this.$emit('search-history', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.history-tab {
  .delete-text {
    font-size: 18px;
    color: #333333;

    .all-del {
      padding-right: 15px;
    }
  }
}
</style>
