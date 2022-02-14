<template>
  <div class="input">
    <span class="iconfont">&#xe6a0;</span>
    <input type="text"
           :placeholder="msg"
           :value="searchKey"
           @input="$emit('update:searchKey', $event.target.value)"
           class="input__text"
           @click="toSearchPage"
           @keyup.enter="toSearchResultPage">
  </div>
</template>

<script>

export default {
  name: 'SearchBar',
  props: {
    msg: {
      type: String,
      default () {
        return '搜索内容'
      }
    },
    searchKey: {
      type: String
    }
  },
  emits: ['toSearch', 'searchResult', 'update:searchKey'],
  setup (props, { emit }) {
    // 点击跳转到搜索页
    const toSearchPage = () => {
      emit('toSearch')
    }
    // 回车执行搜索功能
    const toSearchResultPage = () => {
      emit('searchResult')
    }

    return { toSearchPage, toSearchResultPage }
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
