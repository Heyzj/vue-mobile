<template>
  <div class="channel-edit-tab">
    <van-cell :border="false">
      <div class="edit-title" slot="title">我的频道</div>
      <van-button size="mini" type="danger"
                  class="edit-btn"
                  @click="isEdit=!isEdit"
                  plain round>{{ isEdit ? '完 成' : '编 辑' }}
      </van-button>
    </van-cell>
    <van-grid :gutter="10" :border="false" class="my-edit">
      <van-grid-item class="edit-grid-item"
                     v-for="(myChannel,index) in channelList"
                     @click="toggleChannel(myChannel,index)"
                     :key="index">
        <van-icon slot="icon"
                  v-show="isEdit && !fixedChannel.includes(myChannel.id)"
                  name="clear"></van-icon>
        <span :class="{current:currentActive===index}" class="edit-name" slot="text">{{ myChannel.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道列表 -->
    <van-cell :border="false">
      <div class="edit-title" slot="title">频道列表</div>
    </van-cell>
    <van-grid :gutter="8" :border="false" direction="horizontal">
      <van-grid-item class="edit-grid-item"
                     icon="plus"
                     v-for="(channel,index) in recommendChannel"
                     :key="index"
                     @click="addChannel(channel)"
                     :text="channel.name"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelList, updateChannel, deleteChannel } from '@/api/channel'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'

export default {
  name: 'ChannelEdit',
  props: {
    channelList: {
      type: Array,
      required: true
    },
    currentActive: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      list: [],
      clear: true,
      isEdit: false,
      fixedChannel: [0, 2]
    }
  },
  created () {
    this.getAllChannel()
  },
  methods: {
    // 获取全部频道列表数据
    async getAllChannel () {
      const { data } = await getAllChannelList()
      this.list = data.data.channels
    },
    // 添加频道列表到自己的列表中
    async addChannel (channel) {
      this.channelList.push(channel)
      // 数据持久化
      if (this.userToken) {
        try {
          // 登录状态，接口请求
          await updateChannel({
            id: channel.id,
            seq: this.channelList.length
          })
        } catch (err) {
          this.$toast({
            message: '添加失败，请稍后重试',
            position: 'top'
          })
        }
      } else {
        // 未登录，使用本地缓存
        setItem('channelList', this.channelList)
      }
    },
    // 点击频道切换删除或者进入频道主页
    async toggleChannel (channel, index) {
      if (this.isEdit) {
        // 删除我的频道
        if (index <= this.currentActive) {
          this.$emit('on-channel', this.currentActive - 1, true)
        }
        if (this.fixedChannel.indexOf(channel.id) === -1) {
          this.channelList.splice(index, 1)
        } else {
          this.$toast({
            message: '该项不能删除',
            position: 'top'
          })
        }
        if (this.userToken) {
          try {
            await deleteChannel(channel.id)
          } catch (err) {
            this.$toast('删除失败，请稍后再试')
          }
        } else {
          setItem('channelList', this.channelList)
        }
      } else {
        // 进入的频道
        this.$emit('on-channel', index, false)
      }
    }
  },
  computed: {
    ...mapState(['userToken']),
    // 过滤出非自己的频道列表
    recommendChannel () {
      return this.list.filter(channel => {
        return !this.channelList.find(item => {
          return item.id === channel.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit-tab {
  padding: 85px 0;

  .edit-title {
    color: #333333;
    font-size: 32px;
  }

  .van-cell {
    align-items: center;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    border: 1px solid #eb5253;
    margin-bottom: 5px;
  }

  /deep/ .my-edit {
    .van-grid-item__text {
      margin-top: 0;
    }

    .van-icon, .van-icon-clear {
      position: absolute;
      right: 5px;
      top: -12px;
      color: #cccccc;
      z-index: 99;
    }
  }

  /deep/ .edit-grid-item {
    width: 160px;
    height: 86px;
    white-space: nowrap;

    .van-grid-item__content {
      background-color: #f4f5f6;
      border-radius: 5px;

      .van-grid-item__icon-wrapper {
        position: unset;
      }

      .van-grid-item__text, .van-grid-item__icon, .van-icon-clear, .edit-name {
        color: #222222;
        font-size: 25px;
      }

      .van-grid-item__text {
        margin-left: 6px;
      }

      .current {
        color: red;
      }
    }
  }
}
</style>
