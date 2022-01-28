<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__input">
        <span class="iconfont">&#xe6a0;</span>
        <input type="text"
               placeholder="山姆会员商店优惠商品"
               class="search__input__text"
               @click="handleSearch">
      </div>
      <div class="search__cancel">取消</div>
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
export default {
  name: 'Search'
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
  &__input {
    flex: 1;
    background: $search-bgColor;
    color: $search-fontColor;
    border-radius: 0.16rem;
    &__text {
      display: inline-block;
      font-size: 0.14rem;
      @include formatInput;
    }
  }
  .iconfont {
    display: inline-block;
    font-size: 0.16rem;
    padding: 0 0.08rem 0 0.16rem;
  }
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
