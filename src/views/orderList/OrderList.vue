<template>

  <Head title="我的订单" />
  <div class="wrapper">
    <div class="order"
         v-for="(item, index) in list"
         :key="index">
      <div class="order__title">
        <!-- TODO: 缺订单商铺名 -->
        {{item?.merchant?.name}}
        <span class="order__status">{{item?.status_txt}}</span>
      </div>
      <div class="order__content">
        <div class="order__content__imgs">
          <template v-for="(innerItem, innerIndex) in item?.items"
                    :key="innerIndex">
            <!-- TODO: 缺订单商品的图片 -->
            <img class="order__content__img"
                 :src="innerItem?.product_img?.img"
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
import Head from '@/components/Head.vue'
import Docker from '@/components/Docker.vue'

// 处理请求订单信息的逻辑
const useGetOrderListEffect = () => {
  const data = reactive({
    list: []
  })
  const getOrderList = async () => {
    try {
      const result = await get('/api/v1/orders/')
      console.log(result)
      if (result) {
        const orderList = result
        orderList.forEach(order => {
          const productList = order?.items || []
          let totalNumber = 0
          let totalPrice = 0
          productList.forEach(productItem => {
            totalNumber += (productItem?.quantity || 0)
            totalPrice += (productItem?.quantity * productItem?.price || 0)
          })
          order.totalNumber = totalNumber
          order.totalPrice = totalPrice.toFixed(2)
        })
        data.list = orderList
      }
    } catch (e) {
      console.log('请求失败')
    }
  }
  const { list } = toRefs(data)
  return { list, getOrderList }
}

// 订单状态列表

export default {
  name: 'OrderList',
  components: { Head, Docker },
  setup () {
    const { list, getOrderList } = useGetOrderListEffect()
    getOrderList()

    return { list, getOrderList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0.44rem;
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
    width: 100%;
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
