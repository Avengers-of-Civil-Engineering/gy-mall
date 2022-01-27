<template>
  <div class="title">我的订单</div>
  <div class="wrapper">
    <div class="order"
         v-for="(item, index) in list"
         :key="index">
      <div class="order__title">
        {{item.shopName}}
        <span class="order__status">{{item.isCanceled ? '已取消': '已下单'}}</span>
      </div>
      <div class="order__content">
        <div class="order__content__imgs">
          <template v-for="(innerItem, innerIndex) in item.products"
                    :key="innerIndex">
            <img class="order__content__img"
                 :src="innerItem.product.img"
                 v-if="innerIndex <= 3">
          </template>
        </div>
        <div class="order__content__info">
          <div class="order__content__price">&yen;{{item.totalPrice}}</div>
          <div class="order__content__count">共 {{item.totalNumber}} 件</div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '@/utils/request.js'
import Docker from '@/components/Docker.vue'

// 处理请求订单信息的逻辑
const useGetOrderListEffect = () => {
  const data = reactive({
    list: []
  })
  const getOrderList = async () => {
    try {
      const result = await get('/api/order')
      console.log(result)
      if (result?.errno === 0 && result?.data?.length > 0) {
        const orderList = result.data
        orderList.forEach(order => {
          const productList = order?.products || []
          let totalNumber = 0
          let totalPrice = 0
          productList.forEach(productItem => {
            totalNumber += (productItem?.orderSales || 0)
            totalPrice += (productItem?.orderSales * productItem?.product?.price || 0)
          })
          order.totalNumber = totalNumber
          order.totalPrice = totalPrice
        })
        // data.list = result.data
        data.list = orderList
      }
    } catch (e) {
      console.log('请求失败')
    }
  }
  const { list } = toRefs(data)
  return { list, getOrderList }
}

export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list, getOrderList } = useGetOrderListEffect()
    getOrderList()

    return { list, getOrderList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0.31rem 0 0.11rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  text-align: center;
  color: $content-fontcolor;
  background: $bg-color;
}
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0.64rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.2rem 0.18rem;
  background: $page-bgColor;
}
.order {
  margin-top: 0.16rem;
  padding: 0.16rem;
  box-sizing: border-box;
  background: $bg-color;
  border-radius: 0.04rem;
  &__title {
    line-height: 0.22rem;
    font-size: 0.16rem;
    text-align: left;
    color: $content-fontcolor;
  }
  &__status {
    float: right;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: $light-fontColor;
  }
  &__content {
    margin-top: 0.16rem;
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
    &__info {
      width: 0.6rem;
    }
    &__price {
      line-height: 0.2rem;
      font-size: 0.14rem;
      text-align: right;
      color: $hightlight-fontColor;
    }
    &__count {
      margin: 0.04rem 0 0.02rem 0;
      line-height: 0.14rem;
      font-size: 0.12rem;
      text-align: right;
      color: $content-fontcolor;
    }
  }
}
</style>
