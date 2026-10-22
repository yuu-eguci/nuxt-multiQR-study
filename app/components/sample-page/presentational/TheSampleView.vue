<template>
  <v-row>
    <v-col class="text-center">
      <img
        :src="`${routerBase}v.png`"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em> {{ randomData }}
          </small>
          <v-btn @click="foo">
            Foo って console するよ
          </v-btn>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'TheSampleView',
  props: {
    getRandomData: {
      //                                    ↓返り値
      type: Function as PropType<() => string>,
      required: true
    },
    alan: {
      type: String,
      required: true
    }
  },
  computed: {
    randomData (): string {
      return this.getRandomData()
    },
    a (): string {
      return this.alan
    },
    routerBase (): string {
      return useRuntimeConfig().app.baseURL
    }
  },
  methods: {
    foo (): void {
      // NOTE: Nuxt 2 (Vue 2.7) のころは、 computed の返り値の型を書かないと
      //       methods で Property 'getRandomData' does not exist on type 'Vue' が出ていました。
      console.info(this.getRandomData())
      // console.info(this.$props.getRandomData())
    },
    getAlan () {
      console.info(this.alan)
    }
  }
})
</script>
