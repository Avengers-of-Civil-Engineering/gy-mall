<template>

  <Head title="购物车" />
  <div class="wrapper">
    <div class="shops">
      <template v-for="(item, key) in cartList"
                :key="key">
        <CartProductInfo :shopId="key"
                         :shopName="item.shopName" />
      </template>
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
    const cartList = store.state.cartList
    console.log('cartList', cartList)
    const cartListKeys = Object.keys(cartList)

    const isEmpty = computed(() => {
      let result
      let shopNumber = cartListKeys.length
      if (shopNumber === 0) {
        result = true
      } else {
        for (const i in cartList) {
          const productList = cartList[i]?.productList
          const productListKeys = Object.keys(productList)
          if (productListKeys.length === 0) {
            shopNumber -= 1
          }
          console.log('shopNumber', shopNumber)
        }
        if (shopNumber === 0) {
          result = true
        }
      }
      console.log('result', result)

      return result
    })
    return { cartList, isEmpty }
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
