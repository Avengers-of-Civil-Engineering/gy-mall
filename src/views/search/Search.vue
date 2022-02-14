<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__input">
      </div>
      <SearchBar :msg="HOT_SEARCH[0]"
                 v-model:searchKey="searchKey"
                 @searchResult="handleSearchEnter" />
      <div class="search__cancel"
           @click="handleBack">取消</div>
    </div>
    <div class="category">
      <h3 class="category__title">
        搜索历史
        <span class="category__clear"
              @click="handleClearHistory">清除搜索历史</span>
      </h3>
      <div class="category__items">
        <span v-for="item in historyList"
              :key="item"
              class="category__item"
              @click="() => handleSelectClick(item)">{{item}}</span>
      </div>
    </div>
    <div class="category">
      <h3 class="category__title">热门搜索</h3>
      <div class="category__items">
        <span v-for="item in HOT_SEARCH"
              :key="item"
              class="category__item"
              @click="() => handleSelectClick(item)">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import { useBackRouterEffect } from '@/components/Back.vue'

// 获取历史搜索记录列表
const useSearchHistoryEffect = () => {
  const store = useStore()
  const router = useRouter()
  const historyList = computed(() => store.state.searchHistory)

  const searchKey = ref('')

  // 点击‘搜索历史’或者‘热门搜索’直接进行搜索
  const handleSelectClick = (inputValue) => {
    searchKey.value = inputValue
    // console.log('searchKey', searchKey.value)

    store.commit('addToSearchHistory', { inputValue })
    router.push({ name: 'SearchResult' })
  }

  // 输入搜索内容，回车执行搜索
  const handleSearchEnter = () => {
    const inputValue = searchKey.value
    console.log('inputvalue', inputValue)
    store.commit('addToSearchHistory', { inputValue })
    router.push({ name: 'SearchResult' })
  }

  // 清除搜索历史记录
  const handleClearHistory = () => {
    store.commit('clearSearchHistory')
  }

  return { searchKey, historyList, handleSelectClick, handleSearchEnter, handleClearHistory }
}

const HOT_SEARCH = ['游戏机', '鲜花', '沃尔玛', '车厘子', '螺蛳粉', '玫瑰', '酸奶', '牛奶']

export default {
  name: 'Search',
  components: { SearchBar },
  setup () {
    // const { searchKey, handleSelectClick } = useSearchKeyEffect()
    const { searchKey, historyList, handleSelectClick, handleSearchEnter, handleClearHistory } = useSearchHistoryEffect()
    const { handleBack } = useBackRouterEffect()
    return { historyList, handleSearchEnter, handleClearHistory, handleBack, HOT_SEARCH, searchKey, handleSelectClick }
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
  &__cancel {
    margin-left: 0.12rem;
    width: 0.32rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
    text-align: center;
  }
}
.category {
  &__title {
    margin: 0.24rem 0 0 0;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
    font-weight: normal;
  }
  &__clear {
    float: right;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
    font-weight: normal;
  }
  &__items {
    display: flex;
    flex-wrap: wrap;
  }
  &__item {
    margin: 0.12rem 0.1rem 0 0;
    padding: 0.08rem 0.1rem;
    background: $search-bgColor;
    border-radius: 0.02rem;
    font-size: 0.14rem;
    color: $medium-fontColor;
    line-height: 0.16rem;
  }
}
</style>
