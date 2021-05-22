<template>
  <div class="user-tab">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="个人信息"
                 @click-left="$router.back()"
                 left-arrow/>
    <van-cell class="user-avatar" @click="$refs.file.click()" title="头像" is-link>
      <template #default>
        <van-image
          class="avatar"
          fit="cover"
          round
          :src="userList.photo?userList.photo:defaultAvatar"
        />
      </template>
    </van-cell>
    <van-cell title="昵称" @click="showPopupName=true" is-link :value="userList.name"></van-cell>
    <van-cell title="性别" @click="showPopupGender=true" is-link :value="isGender"></van-cell>
    <van-cell title="生日" @click="showPopupBirth=true" is-link :value="userList.birthday"></van-cell>
    <van-cell title="电话" :value="userList.mobile"></van-cell>
    <!-- 修改昵称的弹出层 -->
    <van-popup v-model="showPopupName"
               position="bottom"
               class="name-popup">
      <update-name v-if="showPopupName"
                   v-model="userList.name"
                   @close-popup="showPopupName = false"/>
    </van-popup>
    <!-- /修改昵称的弹出层 -->
    <!-- 修改性别弹出层 -->
    <van-popup v-model="showPopupGender"
               position="bottom"
               class="gender-popup">
      <update-gender v-if="showPopupGender"
                     @close-popup="showPopupGender = false"
                     v-model="userList.gender"/>
    </van-popup>
    <!-- /修改性别弹出层 -->
    <!-- 修改生日弹出层 -->
    <van-popup v-model="showPopupBirth"
               position="bottom"
               class="gender-popup">
      <update-birth v-if="showPopupBirth"
                    @close-popup="showPopupBirth = false"
                    v-model="userList.birthday"/>
    </van-popup>
    <!-- /修改生日性别弹出层 -->
    <!-- 编辑修改头像 -->
    <input type="file" @change="onChangeFile" hidden ref="file">
    <van-popup v-model="showPopupPhoto"
               position="bottom"
               style="height: 100%">
      <update-photo @photo="userList.photo=$event"
                    :img="img"
                    v-if="showPopupPhoto"
                    @close-popup="showPopupPhoto = false"/>
    </van-popup>
    <!-- /编辑修改头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from '@/views/user-info/components/UpdateName'
import UpdateGender from '@/views/user-info/components/UpdateGender'
import UpdateBirth from '@/views/user-info/components/UpdateBirth'
import UpdatePhoto from '@/views/user-info/components/UpdatePhoto'

export default {
  name: 'UserInfoIndex',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirth,
    UpdatePhoto
  },
  data () {
    return {
      userList: {},
      defaultAvatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
      showPopupName: false,
      showPopupGender: false,
      showPopupBirth: false,
      showPopupPhoto: false,
      img: null
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      try {
        const { data } = await getUserProfile()
        this.userList = data.data
      } catch (err) {
        this.$toast({
          message: '获取个人资料失败',
          position: 'top'
        })
      }
    },
    // 处理头像图片
    onChangeFile () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.showPopupPhoto = true
      this.$refs.file.value = ''
    }
  },
  computed: {
    isGender () {
      if (this.userList.gender === 1) {
        return '女孩子'
      } else if (this.userList.gender === 0) {
        return '男孩子'
      } else {
        return '保密'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-avatar {
  display: flex;
  align-items: center;

  .avatar {
    width: 60px;
    height: 60px;
  }
}

.gender-popup {
  border-radius: 20px 20px 0 0;
}

.name-popup {
  height: 85%;
  background-color: #f5f7f9;
  border-radius: 20px 20px 0 0;
}
</style>
