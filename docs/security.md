# セキュリティメモ

## Node.js

- `.node-version` / `package.json` (`engines`, `volta`) / `Dockerfile` / GitHub Actions は、すべて Node.js 24.22.1 を使う。
- 24.22.1 は [2026-10-21 の Node.js セキュリティリリース](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) で修正済みの 24.x (LTS) 。
- Nuxt 4.6 の `engines` は `^22.22.3 || ^24.15.0 || >=26.0.0` で、 24.22.1 は範囲内。
- Node.js のバージョンを上げるときは、 `test/toolchain.test.ts` の `PATCHED_NODE_24` も合わせて更新する。

## フレームワーク

- Nuxt 2 / Vue 2 / Vuetify 2 はサポート終了済みだったため、 Nuxt 4.6 / Vue 3.5 / Vuetify 4.3 / @nuxtjs/i18n 10 へ移行した。
- [Nuxt Roadmap](https://nuxt.com/docs/4.x/community/roadmap) では v4 が現行版で、 Nuxt 3 は 2026-07-31 に EOL 。 Vuetify は 4.x が Active 、 3.x は 2027-07-27 まで LTS ([Vuetify Long-term support](https://vuetifyjs.com/en/introduction/long-term-support/)) 。

## 依存パッケージ

`yarn audit` (Yarn 1.22.22 、 npm registry の audit API) の結果。 critical / high / moderate / low の件数は「advisory × 依存経路」の数なので、同じ advisory が複数の経路にあると複数件になる。 devDependencies も含めた全体の件数。

| 時点 | critical | high | moderate | low | advisory の種類 |
| --- | --- | --- | --- | --- | --- |
| Nuxt 2.18 (2026-10-22T09:33Z) | 2 | 61 | 51 | 17 | 49 |
| Nuxt 4.6 (2026-10-22T09:50Z) | 0 | 3 | 0 | 0 | 2 |

残っている 3 件 (2 種類) は、どれも修正版が公開されていない。 GitHub Advisory Database の `first_patched_version` は null 、 yarn audit の `patched_versions` は `<0.0.0` で、インストール済みの版が npm の最新版 (2026-10-22 時点) 。

| advisory | パッケージ | 依存経路 | 使われる場面 |
| --- | --- | --- | --- |
| [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv) (RSA PKCS#1 v1.5 署名検証) | node-forge 1.4.0 (最新、影響範囲 `<= 1.4.0`) | nuxt > @nuxt/nitro-server > nitropack 2.13.5 > listhen 1.10.1 > node-forge (1 経路) | nitropack の開発サーバの listen 処理 (listhen) が依存する。 listhen 1.10.1 の dist が使う node-forge の API は証明書と鍵の生成、 PEM の読み書きで、署名検証 (`verify`) は呼ばない。 `nuxt build` の `.output/server/node_modules` には含まれない。 |
| [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) (深くネストしたパターンでのスタック枯渇) | braces 3.0.3 (最新、影響範囲 `<= 3.0.3`) | nuxt > @nuxt/nitro-server > nitropack 2.13.5 > globby 16.2.4 > micromatch 4.0.8 > braces と、 globby > fast-glob 3.3.3 > micromatch > braces (2 経路、インストールは 1 つ) | nitropack がビルド時に globby でファイルを探す処理。パターンは nitropack 内の固定値とプロジェクトのディレクトリ名で、リクエストの内容は渡らない。 `nuxt build` の `.output/server/node_modules` には含まれない。 |

`resolutions` で別のバージョンに差し替えても、修正版がないため解消しない。修正版の公開後に依存を更新し、監査と動作を再確認する。

## 配信

- `yarn start` と Docker イメージは、 `nuxt build` の出力 (`.output/server/index.mjs`) を Node.js で配信する。
- Docker イメージ内では `HOST=0.0.0.0` で待ち受けるため、どこまで公開されるかは `docker run -p` の指定で決まる。 README の例は `127.0.0.1` だけに公開する。
- `yarn dev` は既定で `localhost` だけで待ち受ける (実測では `[::1]` のみ) 。 `--host` を付けると外部からも届く。

## OpenCV.js

- `/qr-reader` は npm パッケージ `@techstark/opencv-js` (OpenCV.js の非公式ビルド) を同じオリジンから配信する。
- バージョンは `package.json` で完全一致に固定し、 `yarn.lock` の integrity で中身を検証する。
