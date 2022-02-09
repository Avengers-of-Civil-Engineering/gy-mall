<template>
  <div class="wrapper">
    <div class="content">
      <div class="content__item"
           v-for="item in formData"
           :key="item.id">
        <span class="content__item__tag">{{item.tag}}</span>
        <input class="content__item__input"
               v-model="item.value"
               :placeholder="item.placeholder" />
      </div>
    </div>
    <button class="save"
            @click="handleSave">保存</button>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get, patch, post } from '@/utils/request.js'

// 获取要编辑的地址详情
const useGetEditAddressEffect = (formData) => {
  const route = useRoute()
  const addressId = route.params.id

  const getEditAddress = async () => {
    try {
      const result = await get(`/api/v1/addresses/${addressId}/`)
      // console.log('result', result)
      if (result) {
        formData[0].value = result.address_full_txt
        formData[3].value = result.name
        formData[4].value = result.phone_number
      }
    } catch (e) {
      console.log(e)
    }
  }
  if (addressId) {
    getEditAddress()
  }

  // 提交修改
  const patchEditResult = async () => {
    try {
      const result = await patch(`/api/v1/addresses/${addressId}/`, {
        address_full_txt: formData[0].value,
        name: formData[3].value,
        phone_number: formData[4].value
      })
      console.log('result', result)
    } catch (e) {
      console.log(e)
    }
  }

  // 提交新建收货地址
  const postNewAddress = async () => {
    try {
      const result = await post('/api/v1/addresses/', {
        address_full_txt: formData[0].value,
        name: formData[3].value,
        phone_number: formData[4].value
      })
      console.log('result', result)
    } catch (e) {
      console.log(e)
    }
  }

  return { patchEditResult, postNewAddress }
}

export default {
  name: 'AddressForm',
  props: ['msg'],
  setup (props) {
    const router = useRouter()
    const formData = reactive([
      { id: 1, tag: '所在城市：', placeholder: '如北京市', value: '' },
      { id: 2, tag: '小区/大厦/学校：', placeholder: '如北理工大学国防科技园', value: '' },
      { id: 3, tag: '楼号-门牌号：', placeholder: '如A号楼B层', value: '' },
      { id: 4, tag: '收货人：', placeholder: '请填写收货人的姓名', value: '' },
      { id: 5, tag: '联系电话：', placeholder: '请填写收货手机号', value: '' }
    ])
    const { patchEditResult, postNewAddress } = useGetEditAddressEffect(formData)

    const handleSave = () => {
      if (props.msg === 'edit') {
        patchEditResult()
      } else {
        postNewAddress()
      }
      router.back()
    }
    return { formData, handleSave }
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
.save {
  position: relative;
  margin-top: 0.16rem;
  padding: 0.08rem 0;
  box-sizing: border-box;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.16rem;
  color: $bg-color;
  background: $btn-bgcolor;
  border: none;
  border-radius: 0.2rem;
}
</style>
