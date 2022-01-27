<template>
  <Position />
  <div class="wrapper">
    <StaticPart />
    <Nearby />
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
.wrapper {
  overflow-y: auto;
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  padding: 0 0.18rem 0.2rem 0.18rem;
}
</style>
