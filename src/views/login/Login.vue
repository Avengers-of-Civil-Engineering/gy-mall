<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png"
         class="wrapper__img" />
    <div class="wrapper__input">
      <input type="text"
             v-model="username"
             class="wrapper__input__content"
             placeholder="请输入用户名">
    </div>
    <div class="wrapper__input">
      <input type="text"
             v-model="password"
             class="wrapper__input__content"
             placeholder="请输入密码">
    </div>
    <div class="wrapper__login-btn"
         @click="handleLogin">登陆</div>
    <div class="wrapper__register-link"
         @click="handleToRegister">没有账号，立即注册</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { post } from '@/utils/request.js'
import { reactive, toRefs } from 'vue'

// 处理登陆逻辑
const useLoginEffect = () => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    const { username, password } = data
    if (username !== '' && password !== '') {
      try {
        const result = await post('/api/user/login', {
          username: username,
          password: password
        })
        // console.log(result)
        if (result.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          console.log('登陆失败')
        }
      } catch (e) {
        console.log('请求失败')
      }
    } else {
      console.log('账号密码不能为空')
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
  setup () {
    const { username, password, handleLogin } = useLoginEffect()
    const { handleToRegister } = useToRegisterEffect()
    return {
      username,
      password,
      handleLogin,
      handleToRegister
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

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
      border: none;
      outline: none;
      background: none;
      margin-top: 0.12rem;
      line-height: 0.24rem;
      width: 100%;
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
