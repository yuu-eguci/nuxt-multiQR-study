<template>
  <div>
    <v-file-input
      v-model="file"
      clearable
      label="File input"
      variant="solo"
    ></v-file-input>
    <canvas
      id="input"
      width="320"
      height="320"
    ></canvas>
    <canvas
      id="output"
      width="320"
      height="320"
    ></canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QRReaderContainer from '@/components/qr-reader/container/QRReaderContainer.vue'

// NOTE: vue-cli と近い使用感を実現するため Object Style で実装します。
export default Vue.extend({
  name: 'QRReaderPage',
  // NOTE: 外部 JS はこう読み込む。
  head() {
    return {
      script: [
        {
          src: 'https://docs.opencv.org/4.7.0/opencv.js'
        }
      ]
    }
  },
  components: {
    QRReaderContainer
  },
  data: () => ({
    // 型はこう書く。
    innerFile: {} as File
  }),
  computed: {
    file: {
      // getter
      get() {
        return this.innerFile
      },
      // setter
      set(newValue: File) {
        console.info(typeof(newValue))
        if (newValue) {
          this.doSomethingToFile(newValue)
        }
        this.innerFile = newValue
      }
    }
  },
  mounted () {
  },
  methods: {
    doSomethingToFile (file: File): void {
      const canvas = document.getElementById('input')
      const ctx = (canvas as any).getContext("2d")
      const image = new Image()
      const reader = new FileReader()
      reader.onload = e => {
        image.onload = () => {
          ctx.drawImage(image, 0, 0, (canvas as any).width, (canvas as any).height)
          // XXX: Cannot find name 'cv' が出るけど無視。ちゃんと読まれてる。
          //      head メソッドの opencv.js から読み込まれている。
          const src = (cv as any).imread('input')
          const dst = new cv.Mat()
          cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0)
          cv.imshow('output', dst)
          src.delete()
          dst.delete()
        }
        (image as any).src = (e as any).target.result
      }
      reader.readAsDataURL(file)
    }
  }
})
</script>
