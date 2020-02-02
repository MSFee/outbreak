<template>
  <div class="home">
    <ChinaMap msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ChinaMap from '@/components/ChinaMap.vue'

export default {
  name: 'home',
  components: {
    ChinaMap
  }
}
</script>
