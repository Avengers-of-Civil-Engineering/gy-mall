<template>
  <div class="product"
       v-if="isNotEmpty">
    <div class="product__title">{{shopName}}</div>
    <div class="product__list">
      <template v-for="(item,key,index) in newProductList"
                :key="item._id">
        <div class="product__item"
             v-if="index < 2 || showMore">
          <img :src="item.imgUrl"
               class="product__item__img">
          <div class="product__item__details">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__count">
                <span class="product__item__yen">&yen;</span>
                {{item.price}} x {{item.count}}
              </span>
              <span class="product__item__total">
                <span class="product__item__yen">&yen;</span>
                {{(item.price * item.count).toFixed(2)}}
              </span>
            </p>
          </div>
        </div>
      </template>
      <div class="product__expand"
           v-if="productNumber > 2 && !showMore"
           @click="() => handleShowMoreOrLess(true)">
        共计 {{productNumber}} 件
        <span class="product__expand__icon iconfont">&#xe6c0;</span>
      </div>
      <div class="product__expand"
           v-if="showMore"
           @click="() => handleShowMoreOrLess(false)">
        收起
        <span class="product__expand__icon iconfont">&#xe892;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'ProductList',
  props: ['shopName', 'productList'],
  setup (props) {
    const newProductList = computed(() => {
      const productList = props.productList
      const noEmptyProductList = {}
      for (const i in productList) {
        const product = productList[i]
        if (product.count > 0) {
          noEmptyProductList[i] = product
        }
      }
      return noEmptyProductList
    })
    const newProductListKeys = Object.keys(newProductList.value)
    const productNumber = newProductListKeys.length
    const isNotEmpty = !!productNumber
    // console.log('isNotEmpty', isNotEmpty)
    // console.log('newProductList', newProductList, newProductList.value)
    const showMore = ref(false)
    const handleShowMoreOrLess = (isMore) => {
      showMore.value = isMore
    }
    return { productNumber, isNotEmpty, newProductList, showMore, handleShowMoreOrLess }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.product {
  position: relative;
  margin-top: 0.16rem;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.16rem;
  background: $bg-color;
  border-radius: 0.04rem;
  &__title {
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__list {
    overflow-y: scroll;
    position: relative;
    top: 0rem;
    left: 0;
    right: 0;
    bottom: 0;
    max-height: 3rem;
  }
  &__item {
    position: relative;
    display: flex;
    box-sizing: border-box;
    margin: 0 0.16rem;
    padding: 0.12rem 0;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__details {
      flex: 1;
      overflow: hidden;
    }
    &__title {
      margin: 0 0 0.06rem 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      font-weight: normal;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: $dark-fontcolor;
    }
  }
  &__expand {
    padding: 0.04rem 0.16rem;
    line-height: 0.2rem;
    font-size: 0.14rem;
    text-align: center;
    color: $light-fontColor;
    background: $search-bgColor;
    &__icon {
      position: relative;
      top: 0.02rem;
      font-size: 0.2rem;
      transform: rotate(180deg);
    }
  }
}
</style>
