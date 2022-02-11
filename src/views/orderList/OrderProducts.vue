<template>
  <div class="product">
    <div class="product__title"
         @click="() => handleToShopPage(orderInfo?.merchant_id)">
      {{orderInfo?.merchant?.name}}
      <span class="iconfont">&#xe6a3;</span>
    </div>
    <div class="product__list">
      <template v-for="item in orderInfo?.items"
                :key="item.id">
        <div class="product__item">
          <img :src="item?.product_img?.img"
               class="product__item__img">
          <div class="product__item__details">
            <h4 class="product__item__title">{{item.product_desc}}</h4>
            <p class="product__item__price">
              <span class="product__item__count">
                <span class="product__item__yen">&yen;</span>
                {{item.price}} x {{item.quantity}}
              </span>
              <span class="product__item__total">
                <span class="product__item__yen">&yen;</span>
                {{(item.price * item.quantity).toFixed(2)}}
              </span>
            </p>
            <div class="product__item__add"
                 @click="() => changeCartItem(orderInfo?.merchant_id, item?.id, item, 1, orderInfo?.merchant?.name)">加入购物车</div>
          </div>
        </div>
      </template>
      <div class="product__total">实付款:
        <span class="product__total__money">&yen;{{orderInfo?.price_total}}</span>
      </div>
    </div>
  </div>
  <div class="order">
    <div class="order__title">订单信息</div>
    <div class="order__info">
      <div class="order__info__item"
           v-for="item in orderInfoList"
           :key="item.tag">
        <span class="order__info__tag">{{item.tag}}</span>
        <span class="order__info__desc">{{item.value}}</span>
      </div>
    </div>
  </div>
  <Toast v-if="show"
         :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { getOrderInfo } from '@/utils/order.js'
import dayjs from 'dayjs'
import Toast, { useToastEffect } from '@/components/Toast.vue'

// 获取订单详情
export const useOrderInfoEffect = () => {
  const route = useRoute()
  const orderId = route.params.id

  const data = reactive({
    orderInfo: {},
    orderInfoList: [
      { tag: '订单编号:', value: '' },
      { tag: '创建时间:', value: '' }
    ]
  })
  const getSingleOrder = async () => {
    try {
      const result = await getOrderInfo(orderId)
      console.log('orderInfo', result)
      if (result) {
        data.orderInfo = result
        data.orderInfoList[0].value = result?.id
        data.orderInfoList[1].value = dayjs(result?.create_at).format('YYYY-MM-DD')
      }
    } catch (e) {
      console.log(e)
    }
  }
  getSingleOrder()
  const { orderInfo, orderInfoList } = toRefs(data)
  return { orderInfo, orderInfoList }
}

export default {
  name: 'OrderProducts',
  components: { Toast },
  setup () {
    const router = useRouter()
    const store = useStore()

    const { show, toastMessage, showToast } = useToastEffect()
    const { orderInfo, orderInfoList } = useOrderInfoEffect()

    const handleToShopPage = (shopId) => {
      // console.log('shopId', shopId)
      router.push({ path: `/merchants/${shopId}` })
    }

    const changeCartItemInfo = (shopId, productId, productInfo, num) => {
      store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
    }
    const changeShopName = (shopId, shopName) => {
      store.commit('changeShopName', { shopId, shopName })
    }
    const changeCartItem = (shopId, productId, productInfo, num, shopName) => {
      changeCartItemInfo(shopId, productId, productInfo, num)
      changeShopName(shopId, shopName)
      showToast('商品已成功加入购物车')
    }

    return { orderInfo, orderInfoList, handleToShopPage, changeCartItem, show, toastMessage }
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
    /* overflow-y: scroll; */
    position: relative;
    top: 0rem;
    left: 0;
    right: 0;
    bottom: 0;
    /* max-height: 3rem; */
  }
  &__item {
    position: relative;
    display: flex;
    box-sizing: border-box;
    /* margin: 0 0.16rem; */
    padding: 0.12rem 0;
    &__img {
      width: 0.6rem;
      height: 0.6rem;
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
    &__add {
      float: right;
      width: 0.8rem;
      margin-top: 0.05rem;
      padding: 0.05rem;
      box-sizing: border-box;
      text-align: center;
      color: $medium-fontColor;
      border: 0.01rem solid $light-fontColor;
      border-radius: 0.2rem;
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
  &__total {
    margin-top: 0.16rem;
    text-align: right;
    line-height: 0.2rem;
    font-size: 0.14rem;
    &__money {
      color: $hightlight-fontColor;
    }
  }
}
.order {
  margin-top: 0.16rem;
  padding: 0.16rem;
  box-sizing: border-box;
  background: $bg-color;
  &__title {
    font-size: 0.16rem;
  }
  &__info {
    margin-top: 0.16rem;
    &__item {
      display: flex;
      margin: 0.08rem 0;
      font-size: 0.12rem;
      color: $content-fontcolor;
    }
    &__tag {
      width: 0.8rem;
    }
    &__desc {
      flex: 1;
    }
  }
}
</style>
