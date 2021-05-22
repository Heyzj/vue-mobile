<template>
  <div class="update-tab">
    <!-- 导航栏 -->
    <van-nav-bar left-text="取消"
                 right-text="确定"
                 title="修改昵称"
                 @click-left="$emit('close-popup')"
                 @click-right="updateName"/>
    <!-- 昵称输入框 -->
    <div class="field-name">
      <van-field
        v-model="userName"
        rows="2"
        autosize
        :autofocus="true"
        type="textarea"
        maxlength="7"
        show-word-limit
        placeholder="请输入昵称"
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateName',
  model: {
    prop: 'name',
    event: 'update-name'
  },
  props: {
    name: {
      type: String,
      required: true,
      default: 'Hi'
    }
  },
  data () {
    return {
      userName: this.name
    }
  },
  created () {
  },
  methods: {
    async updateName () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const username = this.userName
        if (!username.length) {
          return this.$toast({
            message: '昵称不能为空',
            position: 'top'
          })
        }
        await updateUserProfile({ name: this.userName })
        this.$toast.success('修改成功')
        this.$emit('update-name', username)
        this.$emit('close-popup')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-tab {
  border-radius: 20px 20px 0 0;

  /deep/ .van-nav-bar {

    .van-nav-bar__title {
      color: #3692fa;
      font-size: 28px;
    }
  }

  .field-name {
    padding: 20px;

    .van-field {
      border-radius: 15px;
    }
  }
}
</style>
