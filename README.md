# 期货二级市场

[![build status](http://192.168.10.221/React-Native/futures/badges/master/build.svg)](http://192.168.10.221/React-Native/futures/commits/master)
[![coverage report](http://192.168.10.221/React-Native/futures/badges/master/coverage.svg)](http://192.168.10.221/React-Native/futures/commits/master)

## 开发流程

开发**不使用 GitFlow**，而是使用 gitlab 官方推荐的 [Gitlab Flow](http://192.168.10.221/H5/doc/blob/master/docs/gitLabflow.md)。

## 目录结构

```plain
├─__tests__
├─android
├─ios
├─js
│  ├─components
│  ├─config
│  ├─containers
│  ├─pages
│  └─utils
│      └─__tests__
├─build
├─ ...
└─ ...
```

## package.js - scripts

### android

1. android 命令需要将 `adb` 添加到环境变量

2. `gradlew` 可能需要微调

   1. 授予执行权限 `chmod 755 gradlew`
   2. 在 Windows 上：`gradlew task-name`
   3. 在 Mac 或 Linux 上：`./gradlew task-name`

```text
// 5.0+ 直接反向代理即可调试
"android-reverse-8081": "adb reverse tcp:8081 tcp:8081",
// 启动 android app
"android-run-dev": "cd ./android && ./gradlew runAppDevDirect",
// 编译&安装 debug-app & 启动
"android-install&run-dev": "cd ./android && ./gradlew runAppDev",
// 将生成的bundle文件（生成在assets的bundle），推送到手机sd卡
"android-push-bundle-sd":"",
// 生成assets的bundle文件，用于打包
"android-create-bundle-assets": "",
```

### ios

```shell
# 在 ios 项目中生成打包所必须的文件（assets 和 bundle 以及HTML文件）.
$ yarn ios-auto-create

# ios release 打包（须手动生成打包的必须文件），并生成 ipa 文件.(用于release调试)
$ yarn ios-archive-release-dev 

# ios debug 打包（须手动生成打包的必须文件），并生成 ipa 文件.(用于debug调试)
$ yarn ios-archive-debug-dev

# ios debug 打包（须手动生成打包的必须文件），并生成 ipa 文件.(用于提交AppStore)
$ yarn ios-archive-appstore

# ios release 打包（自动生成打包的必须文件），并生成 ipa 文件.(用于release调试)
$ yarn ios-auto-archive-release  

# ios debug 打包（自动生成打包的必须文件），并生成 ipa 文件.(用于debug调试)
$ yarn ios-auto-archive-debug

# ios debug 打包（自动生成打包的必须文件），并生成 ipa 文件.(用于提交AppStore)
$ yarn ios-auto-archive-appstore

# ios codePush 开发环境发布新版本
$ yarn ios-codePush-release-dev
```

### javascript

```shell
# 启动 JavaScript Server
$ yarn start

# 运行 eslint 检查
$ yarn lint  

# 进行单元测试
$ yarn test

# 生成测试覆盖率
$ yarn coverage
```

## JavaScript 模块组织

### js/components/

放置 React Native 组件，不包含业务逻辑。

组件开发参考 [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)（中文：[展示性组件和容器组件](http://www.zcfy.cc/article/1658)）。`containers/` 目录下面放**容器组件**，`components/` 目录下面放**展示性组件**。容器组件负责系统如何工作，展示性组件负责系统如何表现。

每个目录一个组件：

```plain
.
├── Avatar
│   ├── Avatar.js
│   ├── index.js
│   └── styles.js
├── Button
│   ├── Button.js
│   ├── index.js
│   └── styles.js
└── Loading
    ├── Loading.js
    ├── index.js
    └── styles.js
```

组件的样式放在单独的文件中。

### js/config/

放置配置信息：

```plain
.
├── routes.js
├── settings.js
└── styles.js
```

比如 settings.js 可以放服务器 url，第三方平台的 appkey、secretkey、等。

### js/lib/

放一些第三方平台的库代码。**不建议**使用此目录，第三方平台的代码可以通过 npm 包安装，如果没有提供 npm 包，或者需要修改第三方平台代码，可以先发布到本地 npm 仓库（<http://192.168.30.229:4873>），然后再安装。

### js/screens/

目录结构：

```plain
.
├── Details.js
├── Home.js
├── Profile.js
└── SignIn.js
```

### js/utils/

工具包

### js/index.js

入口文件

## npm 包

可能会用到：

* [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view)
* [react-native-hyperlink](https://github.com/obipawan/react-native-hyperlink)
* [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
* [react-native-swiper](https://github.com/leecade/react-native-swiper)
* [react-native-keyboard-spacer](https://github.com/Andr3wHur5t/react-native-keyboard-spacer)
* [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)

## Redux

Redux 的文件使用 ducks-modular-redux 组织。

* [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux)
* [Ducks: Redux Reducer Bundles（中文）](https://github.com/deadivan/ducks-modular-redux)
