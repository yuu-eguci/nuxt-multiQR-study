<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>{{ title }}</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
// NOTE: vue-cli と近い使用感を実現するため Object Style で実装します。
export default defineComponent({
  name: 'DefaultLayout',
  data () {
    return {
      title: 'Vuetify.js'
    }
  }
})
</script>
