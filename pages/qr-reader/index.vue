<template>
  <div>
    <QRReaderContainer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QRReaderContainer from '@/components/qr-reader/container/QRReaderContainer.vue'

// NOTE: vue-cli と近い使用感を実現するため Object Style で実装します。
export default Vue.extend({
  name: 'QRReaderPage',
  components: {
    QRReaderContainer
  },
  mounted () {
  }
})
</script>
