<template>
  <div>
    <TheSampleContainer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { foo, bar } from '@/utils/FooUtils'
import { Baz } from '@/utils/BazUtils'
import TheSampleContainer from '@/components/sample-page/container/TheSampleContainer.vue'

// NOTE: vue-cli と近い使用感を実現するため Object Style で実装します。
export default Vue.extend({
  name: 'SamplePage',
  components: {
    TheSampleContainer
  },
  mounted () {
    // 動作確認用、意味のないコード
    // const foo: string = ''
    // console.log(foo)

    // eslint-disable-next-line
    console.info(foo())
    // eslint-disable-next-line
    console.info(bar())
    // eslint-disable-next-line
    console.info(new Baz(1, 2))
  }
})
</script>
