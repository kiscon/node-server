## React开发

### 使用react-create-app搭建项目
- 全局安装 npm install -g create-react-app
- 创建项目 create-react-app + 项目名称

### 引入sass处理器编写样式

安装：

```javascript
"node-sass-chokidar": "^1.3.0",
"npm-run-all": "^4.1.3",
```

package.json如下：

```json
  "scripts": {
    "build-css": "node-sass-chokidar src/assets/sass -o src/assets/css",
    "watch-css": "npm run build-css && node-sass-chokidar src/assets/sass -o src/assets/css --watch --recursive",
    "start-js": "react-scripts start",
    "start": "npm-run-all -p watch-css start-js",
    "build-js": "react-scripts build",
    "build": "npm-run-all build-css build-js",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
```

[配置方法](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)


### 配置代理到node层
```json
 "proxy": {
    "/api": {
      "target": "http://localhost:4222/"
    }
  }
```

### 问题及方案

- 打包时报错： Import in body of module; reorder to top import/first
    - 解决方案：https://blog.csdn.net/Wu_shuxuan/article/details/78722055



