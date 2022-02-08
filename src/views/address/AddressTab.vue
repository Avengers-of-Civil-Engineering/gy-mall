<template>
  <div class="receiver"
       v-for="item in addressInfoList"
       :key="item.id">
    <div class="receiver__info">
      <span class="receiver__info__name">{{item.name}}</span>
      <span class="receiver__info__phone">{{item.phone}}</span>
    </div>
    <div class="receiver__address">{{item.address}}</div>
    <div class="receiver__icon iconfont"
         @click="handleEditClick">&#xe679;</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

// addressInfoList 列表 应是从服务器 ’获取收货地址列表‘
const addressInfoList = [
  {
    id: 1,
    name: '小慕',
    phone: '18911023261',
    address: '北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 10层'
  },
  {
    id: 2,
    name: '小浣熊',
    phone: '18911020000',
    address: '上海市浦东新区'
  }
]

export default {
  name: 'AddressTab',
  setup () {
    const router = useRouter()
    const handleEditClick = () => {
      router.push({ name: 'EditAddress' })
    }
    return { addressInfoList, handleEditClick }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.receiver {
  position: relative;
  height: 1.04rem;
  margin-bottom: 0.16rem;
  padding: 0.18rem 0.16rem;
  box-sizing: border-box;
  background: $bg-color;
  border-radius: 0.04rem;
  &__info {
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: $light-fontColor;
    &__name {
      margin-right: 0.66rem;
    }
  }
  &__address {
    margin: 0.14rem 0 0.06rem 0;
    width: 85%;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: $content-fontcolor;
  }
  &__icon {
    position: absolute;
    top: 0.44rem;
    right: 0.16rem;
    font-size: 0.18rem;
    color: $medium-fontColor;
    transform: rotate(180deg);
  }
}
</style>
