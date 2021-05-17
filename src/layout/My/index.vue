<template>
  <div class="my-tab">
    <top-bar-login v-if="userToken"></top-bar-login>
    <top-bar v-else></top-bar>
    <van-grid class="grid-tab" :column-num="2">
      <van-grid-item>
        <i slot="icon" class="icon icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="icon icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- cell 布局栏 -->
    <div class="cell-tab">
      <van-cell title="消息通知" is-link/>
      <van-cell title="小爱同学" is-link/>
      <van-cell v-if="userToken" clickable @click="logout" class="logout" title="退出登录"/>
    </div>
  </div>
</template>

<script>
import TopBar from '@/layout/My/components/top-bar'
import TopBarLogin from '@/layout/My/components/top-bar-login'
import { mapState } from 'vuex'

export default {
  name: 'MyIndex',
  components: {
    TopBar,
    TopBarLogin
  },
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$dialog.confirm({ title: '确定退出吗?' }).then(() => {
        this.$store.commit('setUserToken', null)
      }).catch(() => {
      })
    }
  },
  computed: {
    ...mapState(['userToken'])
  }
}
</script>

<style lang="less" scoped>
.grid-tab {
  i.icon-shoucang {
    font-size: 45px;
    color: #eb5253;
  }

  i.icon-lishi {
    font-size: 45px;
    color: #eb8252;
  }

  span.text {
    font-size: 28px;
  }
}

.logout {
  margin-top: 9px;
  text-align: center;
  color: #eb5253;
}

</style>
