<template>
  <div class="birth-tab">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @change="onChange"
      @cancel="$emit('close-popup')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdateBirth',
  model: {
    prop: 'birth',
    event: 'update-birth'
  },
  props: {
    birth: {
      type: String,
      required: true,
      default: () => new Date()
    }
  },
  data () {
    return {
      minDate: new Date(1970, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birth)
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
        const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfile({ birthday: birthday })
        this.$toast.success('修改成功')
        this.$emit('update-birth', birthday)
        this.$emit('close-popup')
      } catch (err) {
        this.$toast.fail('修改失败')
      }
    },
    onChange (picker, value, index) {
      this.currentDate = index
    }
  }

}
</script>

<style lang="less" scoped>

</style>
