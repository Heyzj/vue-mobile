<template>
  <van-cell class="art-item-tab">
    <div class="title van-multi-ellipsis--l2" slot="title">{{ article.title }}</div>
    <div class="art-content" slot="label">
      <div class="art-img" v-if="article.cover.type===3">
        <div class="art-item-img" :key="index" v-for="(img,index) in article.cover.images">
          <van-image
            fit="cover"
            :src="img"/>
        </div>
      </div>
      <span class="art-top">{{ article.ch_id }}</span>
      <span class="art-author">{{ article.aut_name }}</span>
      <span class="art-count">{{ article.comm_count }}</span>
      <span class="art-time">{{ article.pubdate | formatTimeToAfter }}</span>
    </div>
    <van-image v-if="article.cover.type===1"
               slot="default"
               fit="cover"
               class="right-img"
               :src="article.cover.images[0]"/>
  </van-cell>
</template>

<script>

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.art-item-tab {
  .title {
    font-size: 34px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 230px;
    height: 146px;
    padding-left: 20px;
  }

  .right-img {
    width: 230px;
    height: 146px;
  }

  .art-content {
    padding-top: 8px;

    span {
      font-size: 25px;
      color: #b4b4b5;
      margin-right: 20px;
    }

    .art-top {
      color: #f81f1f;
    }
  }

  .art-img {
    display: flex;

    .art-item-img {
      flex: 1;
      height: 146px;
      padding: 30px 0;

      &:not(:last-child) {
        padding-right: 5px;
      }

      .van-image {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
