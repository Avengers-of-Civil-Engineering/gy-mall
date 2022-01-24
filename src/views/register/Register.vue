<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png"
         class="wrapper__img" />
    <div class="wrapper__input">
      <input type="text"
             class="wrapper__input__content"
             placeholder="请输入用户名">
    </div>
    <div class="wrapper__input">
      <input type="text"
             class="wrapper__input__content"
             placeholder="请输入密码">
    </div>
    <div class="wrapper__input">
      <input type="text"
             class="wrapper__input__content"
             placeholder="请确认密码">
    </div>
    <div class="wrapper__register-btn"
         @click="handleRegister">注册</div>
    <div class="wrapper__login-link"
         @click="handleToLogin">已有账号，去登陆</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup () {
    const router = useRouter()
    const handleRegister = () => {
      router.push({ name: 'Login' })
    }
    const handleToLogin = () => {
      router.push({ name: 'Login' })
    }
    return {
      handleRegister,
      handleToLogin
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
