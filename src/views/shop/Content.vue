<template>
  <div class="content">
    <div class="category">
      <div v-for="item in categories"
           :key="item.name"
           :class="{'category__item': true, 'category__item--active': item.tab === currentTab}"
           @click="() => handleTabClick(item.tab)">
        {{item.name}}
      </div>
    </div>
    <div class="product">
      <ProductInfo v-for="item in list"
                   :key="item._id"
                   :item="item"
                   :showSales="true"
                   :isImgLarge="true"
                   :shopId="shopId"
                   :shopName="shopName" />
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '@/utils/request.js'
import ProductInfo from '@/components/ProductInfo.vue'

// 侧边栏 品类
const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// Tab 切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 获取列表内容相关逻辑
const useCurrentListEffect = (currentTab) => {
  const route = useRoute()
  const shopId = route.params.id
  const content = reactive({
    list: []
  })
  const getContentData = async () => {
    try {
      const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
      // console.log(result)
      if (result?.errno === 0 && result?.data?.length) {
        content.list = result.data
      }
    } catch (e) {
      console.log('请求失败')
    }
  }
  watchEffect(() => getContentData())
  const { list } = toRefs(content)
  return { shopId, list, getContentData }
}

export default {
  name: 'Content',
  components: { ProductInfo },
  props: ['shopName'],
  setup () {
    const { currentTab, handleTabClick } = useTabEffect()
    const { shopId, list } = useCurrentListEffect(currentTab)

    return { categories, shopId, currentTab, handleTabClick, list }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

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
}
</style>
