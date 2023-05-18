<template>
  <div style="height: 100%; width: 100%">
    <h2>包里的页面</h2>
    <errorPage v-if="!componentName" />
    <component v-else :is="componentName" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'Middleware'
}
</script>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'

import errorPage from '@/views/Error/404.vue'

const route = useRoute()
const componentName = ref(route.meta.moduleInComponent)
</script>
<style lang="scss" scoped></style>
