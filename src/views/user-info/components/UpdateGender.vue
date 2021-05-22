<template>
  <div class="gender-tab">
    <van-picker
      title="请选择性别"
      show-toolbar
      :default-index="gender"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  model: {
    prop: 'gender',
    event: 'update-gender'
  },
  props: {
    gender: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data () {
    return {
      columns: ['男孩子', '女孩子'],
      changeGender: this.gender
    }
  },
  created () {
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserProfile({ gender: this.changeGender })
        this.$toast.success('修改成功')
        this.$emit('update-gender', this.changeGender)
        this.$emit('close-popup')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    },
    onChange (picker, value, index) {
      this.changeGender = index
    },
    onCancel () {
      this.$emit('close-popup')
    }
  }
}
</script>

<style lang="less" scoped>
.gender-tab {
  /deep/ .van-picker {
    .van-picker__title {
      font-size: 30px;
      color: #3692fa;
    }
  }
}
</style>
