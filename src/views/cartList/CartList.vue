<template>

  <Head title="购物车" />
  <div class="wrapper">
    <div class="shops">
      <template v-for="(item, key) in cartList"
                :key="key">
        <CartProductInfo :shopId="key"
                         :shopName="item.shopName" />
      </template>
      <div class="clear"
           @click="handleClearCart">清空购物车</div>
    </div>
    <div v-if="isEmpty"
         class="container">
      <img src="./emptyCart.png"
           alt="购物车空空如也，再逛逛吧"
           class="container__empty">
    </div>
  </div>
  <Check v-if="!isEmpty" />
  <Docker :currentIndex="1" />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import CartProductInfo from '@/components/CartProductInfo.vue'
import Check from './Check.vue'
import Docker from '@/components/Docker.vue'
import Head from '@/components/Head.vue'

export default {
  name: 'CartList',
  components: { Head, Check, Docker, CartProductInfo },
  setup () {
    const store = useStore()
    // 获取响应式的 cartList
    const cartList = computed(() => store.state.cartList)

    // 计算购物车是否为空
    const isEmpty = computed(() => {
      const cartList = store.state.cartList
      // console.log('cartList', cartList)
      const cartListKeys = Object.keys(cartList)

      let shopNumber = cartListKeys.length
      if (shopNumber === 0) {
        return true
      } else {
        for (const i in cartList) {
          const productList = cartList[i]?.productList
          const productListKeys = Object.keys(productList)
          // console.log('productListKeys', productListKeys)
          if (productListKeys.length === 0) {
            shopNumber -= 1
          }
          // console.log('shopNumber', shopNumber)
        }
        if (shopNumber === 0) {
          return true
        } else {
          return false
        }
      }
    })

    // 发起清空购物车
    const handleClearCart = () => {
      store.commit('clearCart')
    }
    return { cartList, isEmpty, handleClearCart }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 1rem;
  padding: 0.16rem 0.18rem;
  background: $page-bgColor;
}
.shops {
  position: absolute;
  top: 0rem;
  left: 0.18rem;
  right: 0.18rem;
  bottom: 0.16rem;
}
.clear {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 1rem;
  margin: 0.16rem 0;
  padding: 0.05rem;
  box-sizing: border-box;
  font-size: 0.14rem;
  text-align: center;
  color: $bg-color;
  background: $btn-bgcolor;
  border-radius: 0.15rem;
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: -0.5rem;
  background: $bg-color;
  &__empty {
    position: absolute;
    width: 1.8rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
