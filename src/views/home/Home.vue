<template>
  <Position />
  <div class="wrapper">
    <StaticPart />
    <Nearby />
    <div class="filing">
      <p class="filing__txt">© 2022 guying's App By GY |</p>
      <a href="https://www.beian.miit.gov.cn/"
         class="filing__link">沪ICP备2021035418号-1</a>
    </div>
  </div>
  <Docker :currentIndex="0" />
</template>

<script>
// @ is an alias to /src
import Position from './Position.vue'
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from '@/components/Docker'

export default {
  name: 'Home',
  components: {
    Position,
    StaticPart,
    Nearby,
    Docker
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.2rem 0.18rem;
}
.filing {
  margin: 0.1rem auto;
  display: flex;
  justify-content: center;
  font-size: 0.12rem;
  color: $medium-fontColor;
  &__txt {
    margin: 0;
  }
  &__link {
    margin-left: 0.05rem;
    text-decoration: none;
    color: $medium-fontColor;
  }
}
</style>
