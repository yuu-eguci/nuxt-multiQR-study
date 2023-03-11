<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue'
import TheSampleView from '../presentational/TheSampleView.vue'

// NOTE: API アクセスのコードは container に書くよ。
export default Vue.extend({
  methods: {
    // API access
    getRandomData (): string {
      return 'foo'
    }
  },
  // render (h) { だと、 Property 'getRandomData' does not exist on type 'CombinedVueInstance が出る
  render (h: CreateElement): VNode {
    return h(TheSampleView, {
      props: {
        getRandomData: this.getRandomData,
        alan: 'alan'
      }
    })
  }
})
</script>
