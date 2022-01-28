<template>
  <div class="container">
    <div class="position">
      <span class="iconfont position__icon">&#xe61f;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe60b;</span>
    </div>
    <div class="search">
      <SearchBar msg="山姆会员商店优惠商品"
                 @toSearch="handleToSearch" />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'Position',
  components: { SearchBar },
  setup () {
    const router = useRouter()
    const handleToSearch = () => {
      router.push({ name: 'Search' })
    }
    return { handleToSearch }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables";
@import "@/style/mixins";

.container {
  position: absolute;
  box-sizing: border-box;
  padding: 0 0.18rem;
  top: 0;
  left: 0;
  width: 100%;
}
.position {
  position: relative;
  line-height: 0.22rem;
  padding: 0.16rem 0.24rem 0.16rem 0;
  font-size: 0.16rem;
  color: $content-fontcolor;
  @include ellipsis;
  &__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  &__notice {
    position: absolute;
    right: 0rem;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}
.search {
  position: relative;
  line-height: 0.32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: 0.16rem;
}
</style>
