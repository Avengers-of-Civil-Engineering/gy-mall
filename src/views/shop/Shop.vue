<template>
  <div class="wrapper">
    <div class="search">
      <Back />
      <div class="search__content">
        <SearchBar msg="请输入商品名称搜索" />
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
import { useRoute } from 'vue-router'
import { get } from '@/utils/request.js'
import ShopInfo from '@/components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'
import SearchBar from '@/components/SearchBar.vue'
import Back from '@/components/Back.vue'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const shopId = route.params.id
  const data = reactive({
    item: {}
  })
  const getItemData = async () => {
    try {
      const result = await get(`/api/v1/merchants/${shopId}`)
      // console.log(result)
      if (result) {
        data.item = result
      }
    } catch (err) {
      console.log(err)
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart, SearchBar, Back },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    getItemData()

    return { item }
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
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: 0.16rem;
  }
}
</style>
