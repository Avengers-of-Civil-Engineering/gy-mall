<template>
  <div class="wrapper">
    <img src="@/assets/user.png"
         class="wrapper__img" />
    <div class="wrapper__input"
         v-for="item in registerData"
         :key="item.id">
      <input :type="item.type"
             v-model="item.value"
             class="wrapper__input__content"
             :placeholder="item.placeholder"
             required>
    </div>
    <div class="wrapper__register-btn"
         @click="handleRegister">注册</div>
    <div class="wrapper__login-link"
         @click="handleToLogin">已有账号，去登陆</div>
  </div>
  <Toast v-if="show"
         :message="toastMessage" />
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/utils/auth.js'
import Toast, { useToastEffect } from '@/components/Toast.vue'

// 处理登陆逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const registerData = reactive([
    { id: 1, label: '用户名:', placeholder: '请输入用户名', value: '', type: 'text' },
    { id: 2, label: '邮箱:', placeholder: '请输入邮箱', value: '', type: 'text' },
    { id: 3, label: '昵称:', placeholder: '请输入昵称', value: '', type: 'text' },
    { id: 4, label: '手机号:', placeholder: '请输入手机号', value: '', type: 'text' },
    { id: 5, label: '密码:', placeholder: '请输入密码', value: '', type: 'password' },
    { id: 6, label: '确认密码:', placeholder: '请确认密码', value: '', type: 'password' }
  ])
  const handleRegister = async () => {
    if (registerData[5].value === registerData[4].value) {
      try {
        const result = await register({
          username: registerData[0].value,
          email: registerData[1].value,
          first_name: registerData[2].value,
          phone_number: registerData[3].value,
          password: registerData[4].value
        })
        console.log(result)
        if (result) {
          router.push({ name: 'Login' })
        } else {
          showToast('注册失败')
        }
      } catch (error) {
        // axios 错误处理(Handling Errors)
        if (error.response) {
          // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
          console.log('response', error.response)
          const errorMsg = error.response?.data?.msg || error.response?.data?.username?.[0] || error.response?.data?.email?.[0]
          showToast(`请求失败: ${errorMsg}`)
        } else if (error.request) {
          // 请求已经成功发起，但没有收到响应
          // console.log('Error-request', error.request)
          showToast('请求失败: 未响应')
        } else {
          // 发送请求时出了点问题
          console.log('Error-message', error.message)
          showToast('发送请求失败')
        }
      }
    } else {
      showToast('密码不一致')
    }
  }
  // const { username, password, ensurment } = toRefs(data)
  return { registerData, handleRegister }
}

// 处理去注册逻辑
const useToLoginEffect = () => {
  const router = useRouter()

  const handleToLogin = () => {
    router.push({ name: 'Login' })
  }
  return { handleToLogin }
}

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { registerData, handleRegister } = useRegisterEffect(showToast)
    const { handleToLogin } = useToLoginEffect()

    return {
      registerData,
      handleRegister,
      handleToLogin,
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
      width: 100%;
      margin-top: 0.12rem;
      line-height: 0.24rem;
      font-size: 0.16rem;
    }
  }
  &__register-btn {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: $btn-bgColor;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    line-height: 0.48rem;
    font-size: 0.16rem;
    color: $bg-color;
    text-align: center;
  }
  &__login-link {
    font-size: 0.14rem;
    text-align: center;
    color: $content-notice-fontcolor;
  }
}
</style>
