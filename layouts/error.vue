<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

// NOTE: vue-cli と近い使用感を実現するため Object Style で実装します。
export default Vue.extend({
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  // NOTE: 返り値 Object を書くまで、
  //       Property 'pageNotFound' does not exist on type 'CombinedVueInstance...
  //       が出た。
  head (): Object {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  mounted () {
    // XXX: 公式ページ通り "Combined Inject" しているのに、
    //      Property '$debug' does not exist on type 'CombinedVueInstance...
    //      が出る。
    //      別に画面上でエラーにはなっていないから、 VSCode 上だけ?
    this.$debug({
      hereIs: 'layout/error',
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
