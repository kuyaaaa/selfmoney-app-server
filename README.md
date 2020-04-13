# selfmoney-app

> nodejs+vue个人账本系统

## 简单说明
个人账本💰<br/>
全栈web项目，后端采用 nodejs + express，数据库MongoDB；前端使用 vue + elementUI + echarts，用于个人记账、查账及每月每年数据报表。<br/>

## 目前已实现功能
1️⃣ 账本表格：用于账单增删改查<br/>
2️⃣ 数据中心：现有数据月报及年度数据两个功能，分别展示对应的数据<br/>
3️⃣ 用户信息：查看用户的信息，目前可以修改用户名和用户密码<br/>

## 在线Demo预览
本程序已上传heroku，[在线连接](https://selfmoney-app.herokuapp.com/)（国外服务器，请科学上网）

## 测试账号
目前有已存储好数据的账号，可以查看账单以及数据报表：<br/>
用户名：qq1034816916@163.com<br/>
密码：test1234<br/>
月报数据请使用2020年4月，年报数据为2019年。<br/>
（为防止密码修改，已编辑账号没有修改密码功能）<br/>

## Dependencies
``` bash
// 后端
"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.3",
    "concurrently": "^4.1.0",
    "express": "^4.16.3",
    "gravatar": "^1.6.0",
    "jsonwebtoken": "^8.2.1",
    "mongoose": "^5.1.0",
    "passport": "^0.4.0",
    "passport-jwt": "^4.0.0",
    "validator": "^10.2.0"
  }
```

``` bash
// 前端
"dependencies": {
    "axios": "^0.18.0",
    "core-js": "^3.6.4",
    "echarts": "^4.7.0",
    "element-ui": "^2.4.6",
    "jwt-decode": "^2.2.0",
    "vue": "^2.6.11",
    "vue-count-to": "^1.0.13",
    "vue-router": "^3.1.5",
    "vuex": "^3.1.2"
  }
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## 联系我
✉ qq1034816916@163.com

🐧 1034816916
