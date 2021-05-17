<template>
  <div class="home-tab">
    <!-- 头部搜索栏 -->
    <van-nav-bar class="top-bar" fixed>
      <van-button slot="title"
                  type="info" to="/search"
                  class="top-bar-btn"
                  size="small" round icon="search">搜索
      </van-button>
    </van-nav-bar>
    <!-- tab数据栏-->
    <van-tabs v-model="active" class="tab-bar" animated swipeable>
      <van-tab v-for="channels in channelList" :key="channels.id" :title="channels.name">
        <!-- 数据列表 -->
        <article-list :channel="channels"></article-list>
      </van-tab>
      <div class="placeholder" slot="nav-right"></div>
      <div class="more-title" @click="isChangechannel = true" slot="nav-right">
        <i class="icon icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出频道编辑区 -->
    <van-popup
      v-model="isChangechannel"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit @on-channel="onChangeChannel" :channel-list="channelList"
                    :current-active="active"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelList } from '@/api/channel'
import ArticleList from '@/layout/Home/components/ArticleList'
import ChannelEdit from '@/layout/Home/components/ChannelEdit'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channelList: [],
      isChangechannel: false
    }
  },
  created () {
    this.getAllChannel()
  },
  methods: {
    async getAllChannel () {
      let myChannel = []
      if (this.$store.state.userToken) {
        try {
          const { data } = await getChannelList()
          myChannel = data.data.channels
        } catch (err) {
          console.log(err)
          this.$toast('获取用户频道失败')
        }
      } else {
        const localChannel = getItem('channelList')
        if (myChannel) {
          myChannel = localChannel
        } else {
          const { data } = await getChannelList()
          myChannel = data.data.channels
        }
      }
      this.channelList = myChannel
    },
    // 子组件点击后切换对应的频道
    onChangeChannel (index, isTrue) {
      this.active = index
      this.isChangechannel = isTrue
    }
  }
}
</script>

<style lang="less" scoped>
.home-tab {
  .top-bar {
    background: #3692fa;

    .top-bar-btn {
      width: 555px;
      height: 64px;
      line-height: 64px;
      box-sizing: border-box;
      font-size: 28px;
      background-color: #5babfb;
      border: none;
      color: #fff;

      .van-icon {
        font-size: 36px;
        color: #ffffff;
      }
    }
  }

  /deep/ .tab-bar {
    padding-top: 174px;

    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 99;
    }

    .van-tabs__nav--complete {
      padding-left: 0;
      padding-right: 0;
    }

    .van-tab {
      min-width: 120px;

      .van-tab__text {
        font-size: 30px;
        color: #777777;
      }
    }

    .van-tab--active {
      .van-tab__text {
        color: #333;
      }
    }

    .van-tabs__nav {
      z-index: 1;
      padding-bottom: 0;
    }

    .van-tabs__line {
      background-color: #3692fa;
      height: 6px;
      width: 55px;
      bottom: 10px;
    }

    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }

    .more-title {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      opacity: .91;

      i {
        font-size: 35px;
      }

      &::before {
        position: absolute;
        left: 0;
        content: '';
        width: 1px;
        height: 80%;
        background-image: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
    }
  }
}
</style>
