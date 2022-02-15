<template>
  <div class="wrapper">
    <div class="search">
      <Back />
      <SearchBar :msg="msg"
                 v-model:searchKey="searchKey"
                 @searchResult="handleSearchEnter" />
    </div>
    <div class="category"
         v-if="productsList?.length !== 0 || merchantList?.length !== 0">
      <span v-for="item in SEARCH_CATEGOTIES"
            :key="item.tab"
            :class="{'category__item':true, 'category__item--active': item.tab === currentTab }"
            @click="() => handleSelectTab(item.tab)">
        {{item.name}}</span>
    </div>
    <div class="result">
      <div class="result__merchants"
           v-if="(currentTab === 'all' && productsList?.length === 0) || currentTab === 'merchant'">
        <router-link v-for="item in merchantList"
                     :key="item.id"
                     :to="`/merchants/${item.id}`">
          <ShopInfo :item="item" />
        </router-link>
      </div>
      <div class="result__products"
           v-if="currentTab === 'all' || currentTab === 'product'">
        <div class="result__products__item"
             v-for="item in productsList"
             :key="item.id">
          <img class="result__products__img"
               :src="item?.img?.img">
          <p class="result__products__name">{{item.name}}</p>
          <div class="result__products__info">
            <span class="result__products__price">&yen;{{item.price}}</span>
            <span class="result__products__sales">月销{{item.sales}}笔</span>
          </div>
          <div class="result__products__merchant"
               @click="() => handleToMerchant(item?.merchant?.id)">
            <span class="result__products__shop">{{item?.merchant?.name}}</span>
            <span class="result__products__icon iconfont">&#xe6a3;</span>
          </div>
        </div>
      </div>
      <Empty v-if="productsList?.length === 0 && merchantList?.length === 0"
             msg="抱歉，没有搜索到结果" />
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getSearchList } from '@/utils/search.js'
import Back from '@/components/Back.vue'
import SearchBar from '@/components/SearchBar.vue'
import ShopInfo from '@/components/ShopInfo.vue'
import Empty from '@/components/Empty.vue'

// 搜索种类
const SEARCH_CATEGOTIES = [
  { tab: 'all', name: '全部' },
  { tab: 'product', name: '商品' },
  { tab: 'merchant', name: '商铺' }
]

// 获取 searchResultList 数据
const useSearchResultEffect = () => {
  const store = useStore()
  const msg = computed(() => store.state.searchHistory[0])

  const searchData = reactive({
    searchResultList: [],
    merchantList: [],
    productsList: []
  })
  const getSearchResult = async () => {
    try {
      const result = await getSearchList({
        s: msg.value
        // type: currentTab.value
      })
      console.log(result)
      if (result) {
        searchData.searchResultList = result.search_result
        let products = []
        result.search_result.forEach(item => {
          if (item?.merchant) {
            searchData.merchantList.push(item?.merchant)
          }
          if (item?.products?.length !== 0) {
            console.log(item?.products)
            item.products.forEach(product => {
              product.merchant = item?.merchant
            })
            products = [...products, ...(item?.products)]
            searchData.productsList = products
          }
        })
        console.log('merchantList', searchData.merchantList)
        console.log('productsList', searchData.productsList)
      }
    } catch (err) {
      console.log('请求失败')
    }
  }
  watchEffect(() => getSearchResult())
  // getSearchResult()
  const { merchantList, productsList } = toRefs(searchData)
  return { msg, merchantList, productsList, getSearchResult }
}

// 处理切换 Tab
const useTabEffect = () => {
  const currentTab = ref('all')

  const handleSelectTab = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleSelectTab }
}

const useSearchEffect = () => {
  const store = useStore()
  const router = useRouter()
  const searchKey = ref('')

  // 输入搜索内容，回车执行搜索
  const handleSearchEnter = () => {
    const inputValue = searchKey.value
    console.log('inputvalue', inputValue)
    store.commit('addToSearchHistory', { inputValue })
    router.go(0)
  }
  return { searchKey, handleSearchEnter }
}

export default {
  name: 'SearchResult',
  components: { Back, SearchBar, ShopInfo, Empty },
  setup () {
    const router = useRouter()
    const handleToMerchant = (shopId) => {
      router.push({ path: `/merchants/${shopId}` })
    }
    const { searchKey, handleSearchEnter } = useSearchEffect()
    const { currentTab, handleSelectTab } = useTabEffect()
    const { msg, merchantList, productsList } = useSearchResultEffect()
    return { SEARCH_CATEGOTIES, searchKey, handleSearchEnter, currentTab, handleSelectTab, msg, merchantList, productsList, handleToMerchant }
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
.category {
  position: relative;
  margin: 0.16rem 0;
  &__item {
    margin-right: 0.2rem;
    font-size: 0.14rem;
    &--active {
      font-weight: bold;
      color: $hightlight-fontColor;
    }
  }
}
.result {
  a {
    text-decoration: none;
  }
  &__products {
    display: flex;
    flex-wrap: wrap;
    &__item {
      margin: 0.08rem;
      width: 45%;
      height: 60%;
    }
    &__img {
      position: relative;
      width: 1rem;
      height: 1rem;
      left: 50%;
      transform: translateX(-50%);
    }
    &__name {
      margin: 0.08rem 0;
      font-size: 0.14rem;
      @include ellipsis;
    }
    &__price {
      margin-right: 0.1rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
      font-weight: bold;
    }
    &__sales {
      font-size: 0.12rem;
      color: $light-fontColor;
    }
    &__merchant {
      margin: 0.06rem 0;
    }
    &__shop {
      font-size: 0.14rem;
    }
    &__icon {
      position: relative;
      top: 0.01rem;
    }
  }
}
</style>
