<template>
  <div class="input">
    <span class="iconfont">&#xe6a0;</span>
    <input type="text"
           :placeholder="msg"
           v-model="inputValue"
           class="input__text"
           @click="toSearch"
           @keyup.enter="search">
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SearchBar',
  props: {
    msg: {
      type: String,
      default () {
        return '搜索内容'
      }
    }
  },
  emits: ['toSearch', 'search'],
  setup (props, { emit }) {
    const inputValue = ref('')
    const toSearch = () => {
      emit('toSearch')
    }
    const search = () => {
      emit('search', inputValue.value)
    }
    return { inputValue, toSearch, search }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables";
@import "@/style/mixins";

.input {
  display: flex;
  flex: 1;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: 0.16rem;
  &__text {
    flex: 1;
    display: inline-block;
    font-size: 0.14rem;
    @include formatInput;
  }
}
.iconfont {
  display: inline-block;
  font-size: 0.16rem;
  padding: 0 0.08rem 0 0.16rem;
  width: 0.16rem;
}
</style>
