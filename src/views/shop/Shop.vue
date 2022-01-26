<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont"
           @click="handleBack">
        &#xe679;
      </div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe6a0;</span>
        <input type="text"
               class="search__content__input"
               placeholder="请输入商品名称搜索">
      </div>
    </div>
    <ShopInfo :item="item"
              :hideBorder="true" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '@/utils/request.js'
import ShopInfo from '@/components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const shopId = route.params.id
  const data = reactive({
    item: {}
  })
  const getItemData = async () => {
    try {
      const result = await get(`/api/shop/${shopId}`)
      // console.log(result)
      if (result?.errno === 0 && result?.data) {
        data.item = result.data
      }
    } catch (err) {
      console.log(err)
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 处理点击回退
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return { handleBack }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    getItemData()
    const { handleBack } = useBackRouterEffect()

    return { item, handleBack }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.14rem 0 0.04rem 0;
  line-height: 0.32rem;
  &__back {
    font-size: 0.24rem;
    width: 0.3rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &__input {
      display: block;
      flex: 1;
      @include formatInput;
      @include ellipsis;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
  }
}
</style>
