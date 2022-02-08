<template>
  <div class="wrapper">
    <div class="content">
      <div class="content__item"
           v-for="item in formList"
           :key="item.name">
        <span class="content__item__tag">{{item.tag}}</span>
        <input class="content__item__input"
               :value="item.value"
               :placeholder="item.placeholder" />
      </div>
    </div>
  </div>
</template>

<script>
// formList 的 value 值：
// 新建收货地址时，value = ‘’；编辑收货地址时，应从服务器 获取单个收货地址
const formList = [
  { tag: '所在城市：', placeholder: '如北京市', value: '北京市' },
  { tag: '小区/大厦/学校：', placeholder: '如北理工大学国防科技园', value: '北理工大学国防科技园' },
  { tag: '楼号-门牌号：', placeholder: '如A号楼B层', value: '2号楼10层' },
  { tag: '收货人：', placeholder: '请填写收货人的姓名', value: '小慕' },
  { tag: '联系电话：', placeholder: '请填写收货手机号', value: '18911023277' }
]
export default {
  name: 'AddressForm',
  setup () {
    return { formList }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0.44rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: $page-bgColor;
}
.content {
  margin-top: 0.12rem;
  padding: 0 0.18rem;
  background: $bg-color;
  &__item {
    display: flex;
    padding: 0.12rem 0;
    font-size: 0.14rem;
    border-bottom: 0.01rem solid #f1f1f1;
    &__tag {
      color: $medium-fontColor;
    }
    &__input {
      flex: 1;
      color: #151515;
      @include formatInput;
      @include ellipsis;
    }
  }
}
</style>
