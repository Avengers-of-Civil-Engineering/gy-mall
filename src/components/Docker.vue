<template>
  <div class="docker">
    <div v-for="(item, index) in dockerList"
         :key="item.text"
         :class="{'docker__item': true, 'docker__item--active': index === currentIndex}">
      <router-link :to="item.to">
        <div class="iconfont"
             v-html="item.icon" />
        <div class="docker__title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe7d8;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe6bc;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe63e;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe660;', text: '我的', to: { name: 'Mine' } }
    ]
    return {
      dockerList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables";

.docker {
  display: flex;
  position: absolute;
  z-index: 10;
  box-sizing: border-box;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgcolor;
  color: $content-fontcolor;
  &__item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
      color: $content-fontcolor;
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.2rem;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
