<template>
  <div class="photo-tab">
    <img class="photo-img" :src="img" ref="image" alt="">
    <div class="bottom-bar">
      <span class="cancel" @click="$emit('close-popup')">取消</span>
      <span class="confirm" @click="onConfirm">确定</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.min.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'

export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  created () {
  },
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    onConfirm () {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      try {
        this.cropper.getCroppedCanvas().toBlob(async blob => {
          const formDate = new FormData()
          formDate.append('photo', blob)
          const { data } = await updateUserPhoto(formDate)
          this.$emit('photo', data.data.photo)
          this.$emit('close-popup')
          this.$toast.success('更新成功')
        })
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.photo-tab {
  padding: 15px;
  background-color: #000;
  height: 100%;

  .photo-img {
    display: block;
    max-width: 100%;
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;

    .cancel, .confirm {
      height: 96px;
      width: 96px;
      color: #fff;
      font-size: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      letter-spacing: 5px;
    }
  }
}
</style>
