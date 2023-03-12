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
import { getMethods } from '@/utils/FooUtils'
// NOTE: これは opencv/opencv.git から自力でビルドしたもの。
//       ただしバグがあり、下の方の "return cv.ready" を "return cv" へ書き換える必要がある。
//       https://github.com/opencv/opencv/issues/21776
// import cv from '@/assets/opencv'

// NOTE: vue-cli と近い使用感を実現するため Object Style で実装します。
export default Vue.extend({
  name: 'QRReaderPage',
  // NOTE: 外部 JS はこう読み込む。
  //       もし opencv.js を docs.opencv.org から取得するならこう。
  head() {
    return {
      script: [
        {
          // src: 'https://docs.opencv.org/5.x/opencv.js'
          src: 'https://docs.opencv.org/4.x/opencv.js'
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
      const canvasContext = (canvas as any).getContext('2d')
      const image = new Image()
      const reader = new FileReader()
      reader.onload = e => {
        image.onload = () => {
          // canvas#input に画像を貼ります。画像が表示されます。
          canvasContext.drawImage(image, 0, 0, (canvas as any).width, (canvas as any).height)

          // XXX: Cannot find name 'cv' が出るけど無視。ちゃんと読まれてる。
          //      head メソッドの opencv.js から読み込まれている。
          const src: cv.Mat = cv.imread('input')

          // 試しにグレースケールにすることを試す。
          const dstGray = new cv.Mat()
          cv.cvtColor(src, dstGray, cv.COLOR_RGBA2GRAY, 0)
          // canvas#output に画像を貼ります。画像が表示されます。
          cv.imshow('output', dstGray)

          const detector = new cv.QRCodeDetector()
          console.info(
            'このバージョンの QRCodeDetector に存在する methods 一覧:',
            getMethods(detector)
          )
          // NOTE: 本プロジェクトは、ここで頓挫した。
          //       詳しくは NuxtMultiQRStudyMemo を参照すること。
          //       簡単にいうと、今回の目当てだった detectAndDecodeMulti は
          //       JavaScript 版の OpenCV には未実装だった。
          //       以下、 detectMulti + それぞれ decode することを試したけど難しすぎてヤメた記録。
          //       Mat から image を切り抜いて、その image をひとつずつ decode できれば
          //       いいんじゃないかと思うんだけどぼくにはムズイ。

          // detectMulti を試みる。
          // bool cv::QRCodeDetector::detectMulti(InputArray img, OutputArray points)
          // const detectMultiPoints = new cv.Mat()
          // const detectMultiResult: boolean = detector.detectMulti(src, detectMultiPoints)

          // decode を試みる。
          // std::string cv::QRCodeDetector::decode(InputArray img, InputArray points, OutputArray straight_qrcode = noArray() )
          // img grayscale or color (BGR) image containing QR code.
          // points Quadrangle vertices found by detect() method (or some other algorithm).
          // straight_qrcode The optional output image containing rectified and binarized QR code
          src.delete()
          dstGray.delete()
        }
        (image as any).src = (e as any).target.result
      }
      reader.readAsDataURL(file)
    }
  }
})
</script>
