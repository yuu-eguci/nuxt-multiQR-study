# セキュリティメモ

## Node.js

- `.node-version` / `package.json` (`engines`, `volta`) / `Dockerfile` / GitHub Actions は、すべて Node.js 24.22.1 を使います。
- 24.22.1 は [2026-10-21 の Node.js セキュリティリリース](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) で修正済みの 24.x (LTS) です。
- Node.js のバージョンを上げるときは、 `test/toolchain.test.ts` の `PATCHED_NODE_24` も合わせて更新します。

## 依存パッケージ

`yarn audit` で残っている high / critical は、 Nuxt 2 / webpack 4 / Vuetify 2 が固定しているメジャーバージョンに由来します。修正版は互換性のないメジャーバージョンにしかないため、 `resolutions` で強制せずに残しています。

| パッケージ | 経路 | 影響 |
| --- | --- | --- |
| tar, postcss, braces, serialize-javascript, webpack-dev-middleware | nuxt の webpack 4 ビルド / 開発サーバ | ビルド時と `yarn dev` のみ。信頼できない tar や CSS / source map は扱いません。 `yarn dev` はローカル専用です。 |
| devalue, defu, ip, parse-git-config, tmp | nuxt の generator / server / loading-screen / telemetry | ビルド時と `nuxt start` のみ。ユーザ入力を渡しません。 |
| vuetify (GHSA-3jp5-5f8r-q2wg) | ブラウザに配信 | 修正は Vuetify 3 以降のみ。このアプリは固定値の設定だけを渡し、外部入力をマージしません。 |

根本的な解消には Nuxt 3 以降 / Vue 3 / Vuetify 3 への移行が必要です。
