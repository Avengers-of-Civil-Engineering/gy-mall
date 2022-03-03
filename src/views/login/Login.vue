<template>
  <div class="wrapper">
    <img src="@/assets/user.png"
         class="wrapper__img" />
    <div class="wrapper__input">
      <input type="text"
             v-model="username"
             class="wrapper__input__content"
             placeholder="请输入用户名">
    </div>
    <div class="wrapper__input">
      <input type="password"
             v-model="password"
             class="wrapper__input__content"
             placeholder="请输入密码">

    </div>
    <div class="wrapper__login-btn"
         @click="handleLogin">登陆</div>
    <div class="wrapper__register-link"
         @click="handleToRegister">没有账号，立即注册</div>
  </div>
  <Toast v-if="show"
         :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/utils/auth.js'
import Toast, { useToastEffect } from '@/components/Toast.vue'

// 处理登陆逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    const { username, password } = data
    if (username !== '' && password !== '') {
      try {
        const result = await login({
          username: username,
          password: password
        })
        // console.log(result)
        if (result.token !== '') {
          // 将用户信息存储到本地
          localStorage.authInfo = JSON.stringify({
            token: result.token,
            userInfo: result.user,
            loginAt: Date.now()
          })
          router.push({ name: 'Home' })
        } else {
          showToast('登陆失败')
        }
      } catch (error) {
        // axios 错误处理(Handling Errors)
        if (error.response) {
          // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
          console.log('response', error.response)
          // const errorMsg = error.response?.data?.non_field_errors
          showToast('请求失败: 用户名或密码错误')
          // showToast(`请求失败: ${errorMsg}`)
        } else if (error.request) {
          // 请求已经成功发起，但没有收到响应
          // console.log('Error-request', error.request)
          showToast('请求失败: 未响应')
        } else {
          // 发送请求时出了点问题
          console.log('Error-message', error.message)
          showToast('发送请求失败')
        }
        // console.log(error.config)
      }
    } else {
      showToast('账号密码不能为空')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

// 处理去注册逻辑
const useToRegisterEffect = () => {
  const router = useRouter()

  const handleToRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleToRegister }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleToRegister } = useToRegisterEffect()

    return {
      username,
      password,
      handleLogin,
      handleToRegister,
      show,
      toastMessage
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    &__content {
      @include formatInput;
      margin-top: 0.12rem;
      line-height: 0.24rem;
      width: 70%;
      font-size: 0.16rem;
    }
  }
  &__login-btn {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: $btn-bgColor;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    line-height: 0.48rem;
    font-size: 0.16rem;
    color: $bg-color;
    text-align: center;
  }
  &__register-link {
    font-size: 0.14rem;
    text-align: center;
    color: $content-notice-fontcolor;
  }
}
</style>
