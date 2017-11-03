# Bango_frontend
晩御飯のレシピを検索するためのシステムのフロントエンド

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

---

## 初期構築（フロントエンド）
``` bash
$ npm install --global vue-cli
$ vue init webpack Bango_frontend/
? Target directory exists. Continue? Yes
? Project name bango_frontend
? Project description Bango frontend
? Author かとう えい <XXXXX@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? Yes
? Setup e2e tests with Nightwatch? Yes

   vue-cli · Generated "Bango_frontend/".

   To get started:
   
     cd Bango_frontend/
     npm install
     npm run dev
   
   Documentation can be found at https://vuejs-templates.github.io/webpack

$ cd Bango_frontend/
$ npm install
$ npm run dev
$ npm install --save vuex
```

