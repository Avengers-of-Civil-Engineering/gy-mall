<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__edit iconfont">&#xe631;</div>
    </div>
    <div class="user">
      <img src="https://lh3.googleusercontent.com/a-/AOh14Gj-5hAQkbP3n3iA73U8hQ14xTnNs4ztSM7s0tIz=s192-c-rg-br100"
           class="user__img">
      <div class="user__info">
        <h1 class="user__info__name">小浣熊</h1>
        <div class="user__info__id">ID: 20201009</div>
        <div class="user__info__line"></div>
        <div class="user__content">
          <div class="user__content__item">
            <div class="user__content__title">红包</div>
            <div class="user__content__num">218</div>
          </div>
          <div class="user__content__item">
            <div class="user__content__title">优惠券</div>
            <div class="user__content__num">12张</div>
          </div>
          <div class="user__content__item">
            <div class="user__content__title">鲜豆</div>
            <div class="user__content__num">88</div>
          </div>
          <div class="user__content__item">
            <div class="user__content__title">白条</div>
            <div class="user__content__num">1000</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__item">
        <div class="card__item__icon  card__item__icon__1 iconfont">&#xe600;</div>
        <div class="card__item__text">我的钱包</div>
        <div class="card__item__go iconfont">&#xe6a3;</div>
      </div>
      <div class="card__item">
        <div class="card__item__icon card__item__icon__2 iconfont">&#xe65e;</div>
        <div class="card__item__text">我的地址</div>
        <div class="card__item__go iconfont">&#xe6a3;</div>
      </div>
      <div class="card__item">
        <div class="card__item__icon card__item__icon__3 iconfont">&#xe740;</div>
        <div class="card__item__text">客服与帮助</div>
        <div class="card__item__go iconfont">&#xe6a3;</div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
import Docker from '@/components/Docker.vue'

export default {
  name: 'Mine',
  components: { Docker }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.2rem 0.18rem;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2.3rem;
  background-image: radial-gradient(
      circle at top,
      rgba(0, 0, 0, 0) 80%,
      #fff 80%
    ),
    linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  &__edit {
    position: absolute;
    top: 0.37rem;
    right: 0.21rem;
    font-size: 0.2rem;
    color: $bg-color;
  }
}
.user {
  position: relative;
  top: 0.88rem;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  background: $bg-color;
  &__img {
    position: absolute;
    top: -20%;
    width: 0.94rem;
    height: 0.94rem;
    left: 50%;
    transform: translateX(-50%);
  }
  &__info {
    padding-top: 0.59rem;
    &__name {
      margin: 0;
      text-align: center;
      line-height: 0.36rem;
      font-size: 0.24rem;
      font-weight: normal;
      color: #262628;
    }
    &__id {
      margin: 0.02rem 0 0.12rem 0;
      line-height: 0.17rem;
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
    }
    &__line {
      height: 0.01rem;
      background: #f1f1f1;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    padding: 0 0.28rem;
    &__title {
      margin: 0.12rem 0 0.03rem;
      line-height: 0.17rem;
      font-size: 0.12rem;
      color: #c1c0c9;
      text-align: center;
    }
    &__num {
      margin-bottom: 0.16rem;
      line-height: 0.28rem;
      font-size: 0.2rem;
      color: #262628;
      text-align: center;
    }
  }
}
.card {
  position: relative;
  margin-top: 0.16rem;
  padding: 0 0.16rem;
  box-sizing: border-box;
  top: 0.88rem;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  background: $bg-color;
  &__item {
    display: flex;
    line-height: 0.22rem;
    padding: 0.12rem 0;
    &__icon {
      margin-right: 0.12rem;
      width: 0.22rem;
      height: 0.22rem;
      font-size: 0.13rem;
      text-align: center;
      color: $bg-color;
      border-radius: 0.08rem;
      &__1 {
        background: #ed4a47;
      }
      &__2 {
        background: #32c5ff;
      }
      &__3 {
        background: #9013fe;
      }
    }
    &__text {
      flex: 1;
      font-size: 0.14rem;
      color: #262626;
    }
    &__go {
      width: 0.1rem;
      font-size: 0.18rem;
      color: #c2c4ca;
    }
  }
}
</style>
