nuxt-multiQR-study
===

In this repository, I tried to study Nuxt (inject + middleware + utils + page + container + presentational) + TypeScript + Object Style + Vuetify + dotenv + @nuxtjs/i18n + OpenCV + GitHub Pages.

画像を選び、 OpenCV.js でグレースケール化する学習用リポジトリ。

- Node.js: 24.22.1 (LTS)
- Package manager: Yarn 1.22.22
- Framework: Nuxt 4.6 + Vue 3.5 + Vuetify 4.3 + @nuxtjs/i18n 10 + TypeScript
- Linter: ESLint
- Test: Vitest
- Docker: 対応!

依存関係の脆弱性の状況は [docs/security.md](docs/security.md) にまとめた。

## Pages

- `/` : トップページ
- `/qr-reader` : 画像を選ぶと、 `canvas#input` に元画像、 `canvas#output` に OpenCV.js でグレースケール化した画像を表示。
- `/sample-page` : page + container + presentational と utils のサンプル
- `/inspire` : Nuxt テンプレートのサンプル

`ssr: false` の SPA 。 i18n は `ja` (既定) と `en` の文言を `i18n/locales/` に置き、 `strategy: no_prefix` で URL は変えない。ブラウザの言語が `en` なら `en` を使う。

## パッと実行してみたい

OpenCV.js は npm パッケージ `@techstark/opencv-js` を `yarn install` 時に `public/opencv/opencv.js` へコピーし、同じオリジンから読み込む。 docs.opencv.org の opencv.js は別オリジンからの読み込みが拒否されるため使わない。

Node.js のバージョンは `.node-version` と `package.json` の `engines` / `volta` で 24.22.1 を指定。

```bash
# install dependencies
$ yarn install --frozen-lockfile

# serve with hot reload at localhost:3000 (.env.local_)
$ yarn dev

# lint, type check and test
$ yarn lint
$ yarn typecheck
$ yarn test

# build for Node.js server (.env.local_) and serve it at localhost:3000
$ yarn build
$ yarn start

# generate static files (.env.local_) into .output/public
$ yarn generate

# generate static files for GitHub Pages (.env.github-pages, baseURL /nuxt-multiQR-study/)
$ yarn generate-for-github-pages
```

`.env.*` の `ROUTER_BASE` は `nuxt.config.ts` で `app.baseURL` になる。

For detailed explanation on how things work, check out the [documentation](https://nuxt.com/docs/4.x).

## Docker

ホストに Node.js を入れずに、 lint / typecheck / test / build をしてから `node .output/server/index.mjs` で配信。

```bash
docker build -t nuxt-multiqr-study .
docker run --rm -p 127.0.0.1:3000:3000 nuxt-multiqr-study
# http://localhost:3000/
```

## CI / Deploy

- `.github/workflows/ci.yml` : push / pull request で lint / typecheck / test / generate を実行。
- `.github/workflows/cd-github-pages.yml` : GitHub Pages への deploy。 Actions 画面からの手動実行 (`workflow_dispatch`) のみ。

## Directories

Nuxt 4 では、アプリのコードは `app/` 以下に置く。

- `app/pages/` : ページ。ファイル構成から Vue Router のルートが自動で作られる。 [docs](https://nuxt.com/docs/4.x/directory-structure/app/pages)
- `app/components/` : コンポーネント。自動 import される。 `qr-reader/` と `sample-page/` は container (処理・状態管理) と presentational (表示) に分けている。 [docs](https://nuxt.com/docs/4.x/directory-structure/app/components)
- `app/layouts/` : レイアウト。 `default.vue` が全ページで使われる。 [docs](https://nuxt.com/docs/4.x/directory-structure/app/layouts)
- `app/error.vue` : エラーページ。 [docs](https://nuxt.com/docs/4.x/directory-structure/app/error)
- `app/plugins/` : アプリ起動前に実行される。 `debugLog.client.ts` は `$debug` を provide し、開発時だけ `console.log` する。 [docs](https://nuxt.com/docs/4.x/directory-structure/app/plugins)
- `app/middleware/` : ルート遷移ごとに実行される。 `.global` を付けると全ページに適用される。 [docs](https://nuxt.com/docs/4.x/directory-structure/app/middleware)
- `app/utils/` : `export function` と `export class` のサンプル。 [docs](https://nuxt.com/docs/4.x/directory-structure/app/utils)
- `public/` : そのまま `baseURL` 直下に配信される静的ファイル。 [docs](https://nuxt.com/docs/4.x/directory-structure/public)
- `i18n/locales/` : @nuxtjs/i18n の文言ファイル。
