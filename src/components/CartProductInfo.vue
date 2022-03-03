<template>
  <div class="shop">
    <div class="shop__title"
         v-if="shopName && productNumber">
      <span class="shop__icon iconfont"
            @click="() => changeAllChecked(shopId, calculations.allChecked)"
            v-html="calculations.allChecked? '&#xe656;': '&#xe7ae;'"></span>
      <span @click="() => handleToShopPage(shopId)">
        <span class="shop__name">{{shopName}}</span>
        <span class="iconfont">&#xe6a3;</span>
      </span>
    </div>
    <div class="shop__item"
         v-for="item in productList"
         :key="item.id">
      <div class="shop__item__checked iconfont"
           @click="() => changeCartItemChecked(shopId, item.id)"
           v-html="item.check ? '&#xe656;' : '&#xe7ae;'"></div>
      <img :src="item?.img?.img"
           class="shop__item__img">
      <div class="shop__item__details">
        <h4 class="shop__item__title">{{item.name}}</h4>
        <p class="shop__item__price">
          <span class="shop__item__yen">&yen;</span>{{item.price}}
          <span class="shop__item__origin">&yen;{{item.old_price}}</span>
        </p>
      </div>
      <div class="shop__item__number">
        <span class="shop__item__number__minus iconfont"
              @click="() => {changeCartItemInfo(shopId, item.id, item, -1)}">&#xe780;</span>
        <span class="shop__item__number__num">{{getProductCartCount(shopId, item.id)}}</span>
        <span class="shop__item__number__plus iconfont"
              @click="() => {changeCartItemInfo(shopId, item.id, item, 1)}">&#xe653;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import useCommonCartEffect from '@/effect/CartEffects.js'
import { useRouter } from 'vue-router'

export default {
  name: 'CartProductInfo',
  props: ['shopId', 'shopName'],
  setup (props) {
    const router = useRouter()
    const store = useStore()
    const shopId = ref(props.shopId)

    const { changeCartItemInfo, getProductCartCount, productList, calculations } = useCommonCartEffect(shopId.value)

    const productNumber = computed(() => {
      const productListKeys = Object.keys(productList.value)
      return productListKeys.length
    })

    const changeCartItemChecked = (shopId, productId) => {
      store.commit('changeCartItemChecked', { shopId, productId })
    }
    const changeAllChecked = (shopId, isAllChecked) => {
      store.commit('changeAllChecked', { shopId, isAllChecked })
    }

    const handleToShopPage = (shopId) => {
      // console.log('shopId', shopId)
      router.push({ path: `/merchants/${shopId}` })
    }

    return {
      changeCartItemChecked,
      changeAllChecked,
      changeCartItemInfo,
      getProductCartCount,
      productList,
      calculations,
      productNumber,
      handleToShopPage
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.shop {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  background: $bg-color;
  border-radius: 0.04rem;
  &__title {
    margin-top: 0.16rem;
    padding: 0.16rem 0.16rem 0 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__name {
    margin-right: 0.05rem;
  }
  &__icon {
    position: relative;
    top: 0.02rem;
    margin-right: 0.06rem;
    font-size: 0.2rem;
    color: $btn-bgColor;
  }
  &__item {
    position: relative;
    display: flex;
    box-sizing: border-box;
    margin: 0 0.16rem;
    padding: 0.12rem 0;
    border-bottom: 0.01rem solid $content-bgcolor;
    &__checked {
      width: 0.19rem;
      height: 0.19rem;
      margin-right: 0.16rem;
      line-height: 0.5rem;
      font-size: 0.2rem;
      color: $btn-bgColor;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__details {
      overflow: hidden;
    }
    &__title {
      margin: 0 0 0.06rem 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      font-weight: normal;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    &__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      &__minus {
        margin-right: 0.1rem;
        font-size: 0.2rem;
        color: $medium-fontColor;
      }
      &__num {
        position: relative;
        top: -0.02rem;
        font-size: 0.14rem;
        color: $content-fontcolor;
      }
      &__plus {
        margin-left: 0.1rem;
        font-size: 0.2rem;
        color: $btn-bgColor;
      }
    }
  }
}
</style>
