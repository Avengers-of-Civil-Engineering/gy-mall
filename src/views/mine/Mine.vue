<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__edit iconfont">&#xe631;</div>
    </div>
    <div class="user">
      <input type="file"
             id="file"
             accept="image/*"
             @change="changePicture($event)"
             class="user__img__file">
      <img :src="userInfo?.avatar?.img"
           class="user__img"
           @click="callFile">
      <div class="user__info">
        <h1 class="user__info__name">{{userInfo.first_name}}</h1>
        <div class="user__info__id">ID: {{userInfo.id}}</div>
        <div class="user__info__line"></div>
        <div class="user__content">
          <div class="user__content__item"
               v-for="item in TAB_LIST"
               :key="item.id">
            <div class="user__content__title">{{item.tag}}</div>
            <div class="user__content__num">{{item.num}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card__item">
        <div class="card__item__icon  card__item__icon__1 iconfont">&#xe600;</div>
        <div class="card__item__text">我的钱包</div>
        <div class="card__item__go iconfont">&#xe6a3;</div>
      </div>
      <div class="card__item"
           @click="handleGoClick">
        <div class="card__item__icon card__item__icon__2 iconfont">&#xe65e;</div>
        <div class="card__item__text">我的地址</div>
        <div class="card__item__go iconfont">&#xe6a3;</div>
      </div>
      <div class="card__item">
        <div class="card__item__icon card__item__icon__3 iconfont">&#xe740;</div>
        <div class="card__item__text">客服与帮助</div>
        <div class="card__item__go iconfont">&#xe6a3;</div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="3" />
</template>

<script>
// import { computed, reactive, toRefs, watchEffect } from 'vue'
import { reactive, toRefs, watchEffect } from 'vue'
import Docker from '@/components/Docker.vue'
import { useRouter } from 'vue-router'
// import { getUserAuth } from '@/utils/auth.js'
import { uploadImage, changeUserImg, getUserInfo } from '@/utils/user.js'

const TAB_LIST = [
  { id: 1, tag: '红包', num: '218' },
  { id: 2, tag: '优惠券', num: '12张' },
  { id: 3, tag: '鲜豆', num: '88' },
  { id: 4, tag: '白条', num: '1000' }
]

// 处理修改用户头像
const useChangeUserImgEffect = () => {
  const data = reactive({
    userInfo: {}
  })
  // 将图片点击转移到 input 以上传图片文件
  const callFile = () => {
    const fileDom = document.querySelector('#file')
    fileDom.click()
  }
  // 获取用户信息
  const getUser = async () => {
    try {
      const result = await getUserInfo()
      if (result) {
        data.userInfo = result
      }
    } catch (e) {
      console.log(e)
    }
  }
  // 修改用户头像
  const changePicture = async (e) => {
    // console.log(e.target.files)
    const imgFile = e.target.files[0]

    // 将单个图片对象放到 FormData 中。使用 FormData 的 append 方法。
    const formData = new FormData()
    formData.append('desc', 'test')
    formData.append('img', imgFile)
    try {
      const result = await uploadImage(formData)
      // console.log('result', result)
      const result2 = await changeUserImg(data.userInfo?.username, result.id)
      console.log('result2', result2)
      if (result2) {
        data.userInfo = result2
        updateLocalAuthInfo(result2)
      }
      // await getUser()
    } catch (e) {
      console.log(e)
    }
  }
  // 更新本地(localStorage)用户信息
  const updateLocalAuthInfo = (data) => {
    const oldAuthInfo = localStorage.getItem('authInfo')
    const authInfo = JSON.parse(oldAuthInfo)
    authInfo.userInfo = data
    const newAuthInfo = JSON.stringify(authInfo)
    localStorage.setItem('authInfo', newAuthInfo)
  }
  watchEffect(() => getUser())
  const { userInfo } = toRefs(data)
  return { userInfo, callFile, changePicture }
}

export default {
  name: 'Mine',
  components: { Docker },
  setup () {
    const router = useRouter()

    const { userInfo, callFile, changePicture } = useChangeUserImgEffect()

    const handleGoClick = () => {
      router.push({ name: 'AddressManage' })
    }
    return { userInfo, TAB_LIST, handleGoClick, callFile, changePicture }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.2rem 0.18rem;
}
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2.3rem;
  background-image: radial-gradient(
      circle at top,
      rgba(0, 0, 0, 0) 80%,
      #fff 80%
    ),
    linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
  &__edit {
    position: absolute;
    top: 0.37rem;
    right: 0.21rem;
    font-size: 0.2rem;
    color: $bg-color;
  }
}
.user {
  position: relative;
  top: 0.88rem;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  background: $bg-color;
  &__img {
    position: absolute;
    width: 0.94rem;
    height: 0.94rem;
    border-radius: 50%;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    background: $bg-color;
    &__file {
      display: none;
    }
  }
  &__info {
    padding-top: 0.59rem;
    &__name {
      margin: 0;
      text-align: center;
      line-height: 0.36rem;
      font-size: 0.24rem;
      font-weight: normal;
      color: #262628;
    }
    &__id {
      margin: 0.02rem 0 0.12rem 0;
      line-height: 0.17rem;
      font-size: 0.14rem;
      color: #c1c0c9;
      text-align: center;
    }
    &__line {
      height: 0.01rem;
      background: #f1f1f1;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    padding: 0 0.28rem;
    &__title {
      margin: 0.12rem 0 0.03rem;
      line-height: 0.17rem;
      font-size: 0.12rem;
      color: #c1c0c9;
      text-align: center;
    }
    &__num {
      margin-bottom: 0.16rem;
      line-height: 0.28rem;
      font-size: 0.2rem;
      color: #262628;
      text-align: center;
    }
  }
}
.card {
  position: relative;
  margin-top: 0.16rem;
  padding: 0 0.16rem;
  box-sizing: border-box;
  top: 0.88rem;
  box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 0.08rem;
  background: $bg-color;
  &__item {
    display: flex;
    line-height: 0.22rem;
    padding: 0.12rem 0;
    &__icon {
      margin-right: 0.12rem;
      width: 0.22rem;
      height: 0.22rem;
      font-size: 0.13rem;
      text-align: center;
      color: $bg-color;
      border-radius: 0.08rem;
      &__1 {
        background: #ed4a47;
      }
      &__2 {
        background: #32c5ff;
      }
      &__3 {
        background: #9013fe;
      }
    }
    &__text {
      flex: 1;
      font-size: 0.14rem;
      color: #262626;
    }
    &__go {
      width: 0.1rem;
      font-size: 0.18rem;
      color: #c2c4ca;
    }
  }
}
</style>
