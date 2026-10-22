nuxt-multiQR-study
===

In this repository, I tried to study Nuxt.js 2 (inject + middleware + utils + page + container + presentational) + TypeScript + Object Style + Vuetify + @nuxtjs/dotenv + @nuxtjs/i18n + OpenCV + GitHub Pages.

Nuxt 2 で、画像をアップロードして OpenCV.js でグレースケール化するところまでを試した学習用リポジトリ。

- Node.js: 24.22.1 (LTS)
- Package manager: Yarn 1.22.22
- Framework: Nuxt 2.18 + Vue 2.7 + Vuetify 2.7 + TypeScript
- Linter: ESLint
- Test: Vitest
- Docker: 対応!

Nuxt 2 / Vue 2 / Vuetify 2 は公式サポートは終了済み。依存関係の既知の脆弱性のうち、 Nuxt 2 系のままでは解消できないものは [docs/security.md](docs/security.md) にまとめた。

## Pages

- `/` : トップページ
- `/qr-reader` : 画像を選ぶと、 `canvas#input` に元画像、 `canvas#output` に OpenCV.js でグレースケール化した画像を表示。
- `/sample-page` : page + container + presentational と utils のサンプル
- `/inspire` : Nuxt テンプレートのサンプル

## パッと実行してみたい

Node.js のバージョンは `.node-version` と `package.json` の `engines` / `volta` で 24.22.1 を指定。

```bash
# install dependencies
$ yarn install --frozen-lockfile

# serve with hot reload at localhost:3000
$ yarn dev

# lint, type check and test
$ yarn lint
$ yarn typecheck
$ yarn test

# generate static project (.env.local_) and serve it at localhost:3000
$ yarn generate
$ yarn start

# generate static project for GitHub Pages (.env.github-pages)
$ yarn generate-for-github-pages
```

For detailed explanation on how things work, check out the [documentation](https://v2.nuxt.com/).

## Docker

ホストに Node.js を入れずに、 lint / test / generate をしてから `nuxt start` で配信。

```bash
docker build -t nuxt-multiqr-study .
docker run --rm -p 127.0.0.1:3000:3000 nuxt-multiqr-study
# http://localhost:3000/
```

## CI / Deploy

- `.github/workflows/ci.yml` : push / pull request で lint / typecheck / test / generate を実行。
- `.github/workflows/cd-github-pages.yml` : GitHub Pages への deploy。 Actions 画面からの手動実行 (`workflow_dispatch`) のみ。

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://v2.nuxt.com/docs/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://v2.nuxt.com/docs/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://v2.nuxt.com/docs/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://v2.nuxt.com/docs/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.ts`.

More information about the usage of this directory in [the documentation](https://v2.nuxt.com/docs/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://v2.nuxt.com/docs/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://v2.nuxt.com/docs/directory-structure/store).
