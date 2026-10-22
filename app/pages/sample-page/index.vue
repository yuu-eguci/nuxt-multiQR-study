<template>
  <div>
    <TheSampleContainer />
  </div>
</template>

<script lang="ts">
import { foo, bar } from '~/utils/FooUtils'
import { Baz } from '~/utils/BazUtils'
import TheSampleContainer from '~/components/sample-page/container/TheSampleContainer.vue'

// NOTE: vue-cli と近い使用感を実現するため Object Style で実装します。
export default defineComponent({
  name: 'SamplePage',
  components: {
    TheSampleContainer
  },
  mounted () {
    console.info(foo())
    console.info(bar())
    console.info(new Baz(1, 2))
  }
})
</script>
