# セキュリティメモ

## Node.js

- `.node-version` / `package.json` (`engines`, `volta`) / `Dockerfile` / GitHub Actions は、すべて Node.js 24.22.1 を使う。
- 24.22.1 は [2026-10-21 の Node.js セキュリティリリース](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) で修正済みの 24.x (LTS) 。
- Node.js のバージョンを上げるときは、 `test/toolchain.test.ts` の `PATCHED_NODE_24` も合わせて更新する。

## 依存パッケージ

2026-10-22 時点の `yarn audit` (依存経路ごとの件数) は critical 2 / high 61 / moderate 51 / low 17 。 critical 2 件はどちらも tar の GHSA-23hp-3jrh-7fpw 。

残っている high / critical は、 Nuxt 2 / webpack 4 / Vuetify 2 が固定しているメジャーバージョンに由来する。修正版は互換性のないメジャーバージョンにしかないため、 `resolutions` で強制せずに残している。

| パッケージ | 経路 | 使われる場面 |
| --- | --- | --- |
| tar, postcss, braces, serialize-javascript, webpack-dev-middleware | nuxt の webpack 4 ビルド / 開発サーバ | ビルド時と `yarn dev` 。 `yarn dev` は既定で `localhost` だけで待ち受ける (実測では `[::1]` のみ) 。 `HOST` を変えると外部からも届く。 |
| devalue, defu, ip, parse-git-config, tmp | nuxt の generator / server / loading-screen / telemetry, @nuxtjs/i18n | ビルド時と Node.js 側の処理。 devalue は SSR 時だけ使われ、このアプリは `ssr: false` 。 ip は待ち受けアドレスの表示 (`ip.address()`) にだけ使われる。 |
| vuetify (GHSA-3jp5-5f8r-q2wg) | ブラウザに配信 | 修正は Vuetify 3 以降のみ。このアプリが Vuetify に渡す設定は `nuxt.config.ts` の固定値だけ。 |

`nuxt start` と Docker イメージは generate 済みの静的ファイルを Node.js (`@nuxt/server`) で配信する。 Docker イメージ内では `HOST=0.0.0.0` で待ち受けるため、どこまで公開されるかは `docker run -p` の指定で決まる。 README の例は `127.0.0.1` だけに公開する。

根本的な解消には Nuxt 3 以降 / Vue 3 / Vuetify 3 への移行が必要。

## OpenCV.js

- `/qr-reader` は npm パッケージ `@techstark/opencv-js` (OpenCV.js の非公式ビルド) を同じオリジンから配信する。
- バージョンは `package.json` で完全一致に固定し、 `yarn.lock` の integrity で中身を検証する。
