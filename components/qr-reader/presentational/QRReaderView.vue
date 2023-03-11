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
import Vue from 'vue'

export default Vue.extend({
  name: 'QRReaderView',
  props: {
    getRandomData: {
      //                                    ↓返り値
      type: Function as Vue.PropType<() => string>,
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
      return process.env.ROUTER_BASE!
    }
  },
  methods: {
    foo (): void {
      // Property 'getRandomData' does not exist on type 'Vue'.Vetur(2339)
      // computed.randomData では this.getRandomData で使えてるのに。
      // ↓
      // computed と methods で同じ props (Function でも String でも) 使ってて、
      // computed のほうで返り値の型 (: string とか) を書いてないと、 methods のほうで
      // 上述エラーが出る………
      // eslint-disable-next-line
      console.info(this.getRandomData())
      // console.info(this.$props.getRandomData())
    },
    getAlan () {
      // eslint-disable-next-line
      console.info(this.alan)
    }
  }
})
</script>
