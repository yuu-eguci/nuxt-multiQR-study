<template>
  <v-app>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink :to="'/'" @click="clearError()">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import type { NuxtError } from '#app'
import type { PropType } from 'vue'

// NOTE: Nuxt 4 では layouts/error.vue ではなく app/error.vue がエラーページになります。
export default defineComponent({
  name: 'ErrorPage',
  props: {
    error: {
      type: Object as PropType<NuxtError>,
      required: true
    }
  },
  setup (props) {
    const pageNotFound = '404 Not Found'
    const otherError = 'An error occurred'
    useHead({
      title: props.error.statusCode === 404 ? pageNotFound : otherError
    })
    return { pageNotFound, otherError }
  },
  mounted () {
    this.$debug({
      hereIs: 'error',
      message: this.error.message,
      statusCode: this.error.statusCode
    })
  }
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
