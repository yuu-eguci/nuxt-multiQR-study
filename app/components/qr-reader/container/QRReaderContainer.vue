<script lang="ts">
import { defineComponent, h, type VNode } from 'vue'
import QRReaderView from '../presentational/QRReaderView.vue'

// NOTE: API アクセスのコードは container に書くよ。
export default defineComponent({
  methods: {
    // API access
    getRandomData (): string {
      return 'foo'
    }
  },
  // NOTE: Vue 3 では render の引数 h がなくなり、 vue から import した h を使います。
  render (): VNode {
    return h(QRReaderView, {
      getRandomData: this.getRandomData,
      alan: 'alan'
    })
  }
})
</script>
