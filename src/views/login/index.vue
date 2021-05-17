<template>
  <div class="loginContainer">
    <van-nav-bar class="page-nav-bar" left-arrow @click-left="$router.back()" title="登录"></van-nav-bar>
    <van-form @submit="onSubmit" ref="FormRef">
      <van-field
        v-model="userInfo.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="FormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="form-icon icon icon-shouji"></i>
      </van-field>
      <van-field
        v-model="userInfo.code"
        name="password"
        placeholder="请输入验证码"
        :rules="FormRules.code"
        maxlength="6"
      >
        <i slot="left-icon" class="form-icon icon icon-yanzhengma"></i>
        <template #button>
          <van-count-down v-if="countDownIsShow" @finish="countDownIsShow = false" :time="codeTime">
            <template #default="timeData">
              <span class="code-time">{{ timeData.seconds }}秒后重新获取</span>
            </template>
          </van-count-down>
          <van-button v-else
                      size="small"
                      round class="msg-validate"
                      native-type="button"
                      type="default"
                      @click="sendValidate">
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-submit">
        <van-button class="login-btn" block native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'

export default {
  name: 'Index',
  data () {
    return {
      userInfo: {
        mobile: '',
        code: ''
      },
      FormRules: {
        mobile: [
          {
            required: true,
            message: '手机号必填'
          },
          {
            pattern: /1[3|5|8|9]\d{9}$/,
            message: '请输入正确的手机号'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码必填'
          },
          {
            pattern: /^\d{6}$/,
            message: '请输入6位的验证码'
          }
        ]
      },
      countDownIsShow: false
    }
  },
  created () {
  },
  methods: {
    async onSubmit () {
      try {
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true,
          duration: 0
        })
        const { data } = await login(this.userInfo)
        this.$store.commit('setUserToken', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        this.$toast.fail('登录失败')
        console.log(err)
      }
    },
    async sendValidate () {
      try {
        await this.$refs.FormRef.validate('mobile')
      } catch (err) {
        return Promise.reject(err)
      }
      this.countDownIsShow = true
      try {
        const { status } = await sendCode(this.userInfo.mobile)
        if (status === 200) {
          this.$toast.success('验证码发送成功')
        }
      } catch (err) {
        this.countDownIsShow = false
        if (err.response.status === 429) {
          this.$toast('你发送的太频繁了，请在1分钟后重试')
        } else {
          this.$toast('发送失败，请在1分钟后重试')
        }
      }
    }
  },
  computed: {
    codeTime () {
      return 1000 * 60
    }
  }
}
</script>

<style lang="less" scoped>
.loginContainer {
  .form-icon {
    font-size: 35px;
  }

  .msg-validate {
    background: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }

  .login-submit {
    padding: 53px 33px;

    .login-btn {
      background: #6db4fb;
      border: none;
    }
  }

  .code-time {
    display: block;
    height: 36px;
    padding: 5px;
    line-height: 36px;
    text-align: center;
    background: #c7c7c7;
    color: #ffffff;
    border-radius: 10px;
  }
}
</style>
