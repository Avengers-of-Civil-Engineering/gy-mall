<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__input">
      </div>
      <SearchBar msg="尖椒肉丝"
                 @search="handleSearchEnter" />
      <div class="search__cancel"
           @click="handleBack">取消</div>
    </div>
    <div class="category">
      <h3 class="category__title">
        搜索历史
        <span class="category__clear">清除搜索历史</span>
      </h3>
      <div class="category__items">
        <span class="category__item">尖椒肉丝</span>
        <span class="category__item">鲜花</span>
        <span class="category__item">山姆会员店</span>
        <span class="category__item">新鲜水果</span>
        <span class="category__item">生日鲜花</span>
        <span class="category__item">香槟玫瑰</span>
        <span class="category__item">酸奶</span>
        <span class="category__item">牛奶</span>
      </div>
    </div>
    <div class="category">
      <h3 class="category__title">热门搜索</h3>
      <div class="category__items">
        <span class="category__item">尖椒肉丝</span>
        <span class="category__item">鲜花</span>
        <span class="category__item">山姆会员店</span>
        <span class="category__item">新鲜水果</span>
        <span class="category__item">生日鲜花</span>
        <span class="category__item">香槟玫瑰</span>
        <span class="category__item">酸奶</span>
        <span class="category__item">牛奶</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import { useBackRouterEffect } from '@/components/Back.vue'

export default {
  name: 'Search',
  components: { SearchBar },
  setup () {
    const router = useRouter()
    const handleSearchEnter = () => {
      router.push({ name: 'SearchResult' })
    }
    const { handleBack } = useBackRouterEffect()
    return { handleSearchEnter, handleBack }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables";
@import "@/style/mixins";

.wrapper {
  position: absolute;
  top: 0.2rem;
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
