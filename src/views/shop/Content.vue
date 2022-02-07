<template>
  <div class="content">
    <div class="category">
      <div v-for="item in categories"
           :key="item.id"
           :class="{'category__item': true, 'category__item--active': item.slug === currentTab}"
           @click="() => handleTabClick(item.slug)">
        {{item.name}}
      </div>
    </div>
    <div class="product">
      <div class="product__item"
           v-for="item in list"
           :key="item.id">
        <img :src="item.img.img"
             class="product__item__img">
        <div class="product__item__details">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.old_price}}</span>
          </p>
        </div>
        <div class="product__item__number">
          <span class="product__item__number__minus iconfont"
                @click="() => {changeCartItem(shopId, item.id, item, -1, shopName)}">&#xe780;</span>
          <span class="product__item__number__num">{{getProductCartCount(shopId, item.id)}}</span>
          <span class="product__item__number__plus iconfont"
                @click="() => {changeCartItem(shopId, item.id, item, 1, shopName)}">&#xe653;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '@/utils/request.js'
import useCommonCartEffect from '@/effect/CartEffects.js'
import { useStore } from 'vuex'

// 侧边栏 品类
const useCategoriesEffect = (shopId) => {
  const data = reactive({
    categories: []
  })
  const getCategories = async () => {
    try {
      const result = await get(`/api/v1/merchants/${shopId}/tabs/`)
      console.log('categories', result)
      if (result) {
        data.categories = result
      }
    } catch (e) {
      console.log('请求失败')
    }
  }
  getCategories()

  const currentTab = ref('all')
  console.log('currentTab', currentTab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  const { categories } = toRefs(data)
  return { categories, currentTab, handleTabClick }
}

// 获取列表内容相关逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({
    list: []
  })
  const getContentData = async () => {
    try {
      // const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
      const result = await get(`/api/v1/merchants/${shopId}/products`, { tab: currentTab.value })
      console.log('tabProductList', result)
      if (result) {
        content.list = result
      }
    } catch (e) {
      console.log('请求失败')
    }
  }
  watchEffect(() => getContentData())
  const { list } = toRefs(content)
  return { shopId, list, getContentData }
}

const useCartEffect = (shopId) => {
  const store = useStore()
  const { changeCartItemInfo, getProductCartCount } = useCommonCartEffect(shopId)
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, productInfo, num, shopName) => {
    changeCartItemInfo(shopId, productId, productInfo, num)
    changeShopName(shopId, shopName)
  }
  return { getProductCartCount, changeCartItem }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { categories, currentTab, handleTabClick } = useCategoriesEffect(shopId)
    // const { currentTab, handleTabClick } = useTabEffect(categories)
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { getProductCartCount, changeCartItem } = useCartEffect(shopId)

    return { categories, shopId, currentTab, handleTabClick, list, getProductCartCount, changeCartItem }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.content {
  display: flex;
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
}
.category {
  overflow-y: scroll;
  width: 0.76rem;
  height: 100%;
  background: $search-bgColor;
  &__item {
    line-height: 0.4rem;
    font-size: 0.14rem;
    text-align: center;
    color: $content-fontcolor;
    &--active {
      background: $bg-color;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
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
      width: 0.65rem;
      height: 0.65rem;
      margin-right: 0.1rem;
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
    &__sales {
      margin: 0;
      line-height: 0.16rem;
      font-size: 0.12rem;
      color: $content-fontcolor;
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
        margin-right: 0.08rem;
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
        margin-left: 0.08rem;
        font-size: 0.2rem;
        color: $btn-bgColor;
      }
    }
  }
}
</style>
