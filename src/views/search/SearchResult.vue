<template>
  <div class="wrapper">
    <div class="search">
      <Back />
      <SearchBar msg="尖椒" />
    </div>
    <div class="result">
      <router-link :to="`/shop/${item._id}`"
                   v-for="item in searchResultList"
                   :key="item._id">
        <ShopInfo :item="item" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { get } from '@/utils/request.js'
import Back from '@/components/Back.vue'
import SearchBar from '@/components/SearchBar.vue'
import ShopInfo from '@/components/ShopInfo.vue'

// 获取 searchResultList 数据
const useSearchResultListEffect = () => {
  const searchResultList = ref([])
  const getSearchResultList = async () => {
    try {
      const result = await get('api/shop/hot-list')
      // console.log(result.data)
      if (result.errno === 0 && result?.data?.length) {
        searchResultList.value = result.data
      }
    } catch (err) {
      console.log('请求失败')
    }
  }
  return { searchResultList, getSearchResultList }
}

export default {
  name: 'SearchResult',
  components: { Back, SearchBar, ShopInfo },
  setup () {
    const { searchResultList, getSearchResultList } = useSearchResultListEffect()
    getSearchResultList()
    return { searchResultList, getSearchResultList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables";
@import "@/style/mixins";

.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.16rem 0 0 0;
  position: relative;
  line-height: 0.32rem;
}
.result {
  a {
    text-decoration: none;
  }
}
</style>
