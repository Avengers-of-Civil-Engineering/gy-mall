<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link :to="`/merchants/${item.id}`"
                 v-for="item in nearbyList"
                 :key="item.id">
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { get } from '@/utils/request.js'
import ShopInfo from '@/components/ShopInfo.vue'

// 获取 NearbyList 数据
const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    try {
      // const result = await get('api/shop/hot-list')
      const result = await get('api/v1/merchants/')
      console.log(result)
      if (result?.length) {
        nearbyList.value = result
      }
    } catch (err) {
      console.log('请求失败')
    }
  }
  return { nearbyList, getNearbyList }
}

export default {
  components: { ShopInfo },
  name: 'Nearby',
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}
</style>
