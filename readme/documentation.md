## 说明文档

### 1.安装JDK

- 控制面板\系统和安全\系统\高级系统设置\环境变量\系统变量

```
变量名：JAVA_HOME
变量值：C:\Program Files\Java\jdk1.8.0_91\bin;C:\Program Files\Java\jdk1.8.0_91\jre\bin;   // 要根据自己的实际路径配置

变量名：CLASSPATH
变量值：.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;         //记得前面有个"."

变量名：Path
变量值：%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;
```

前两个是新建，后一个是添加

- cmd输入：java -version ，出现以下信息，说明环境变量配置成功；

```
C:\Users\Administrator>java -version
java version "1.8.0_131"
Java(TM) SE Runtime Environment (build 1.8.0_131-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.131-b11, mixed mode)
```

[参考资料](http://www.runoob.com/java/java-environment-setup.html)

### 2.安装Mysql

密码：随意

安装教程：https://blog.csdn.net/qq_34952973/article/details/79094074

用mysql创建的数据库：C:\ProgramData\MySQL\MySQL Server 5.7\Data

###  3.安装Navicat

Navicat for MySQL破解教程

https://blog.csdn.net/weixin_37017560/article/details/78295066

### 4.建表

用户信息 user_info

| 名          | 类型      | 长度 | 说明                        |
| :---------- | --------- | ---- | --------------------------- |
| id          | bigint    | 20   |                             |
| user_name   | varchar   | 32   | utf8mb4、utf8mb4_general_ci |
| user_code   | varchar   | 32   |                             |
| mobile      | varchar   | 16   |                             |
| password    | varchar   | 64   |                             |
| isdel       | tinyint   | 4    |                             |
| regist_time | timestamp | 0    |                             |

### 5.关联表

- left join 会以左侧表中的数据为准，会把左侧表中的所有数据否查询出来，然后根据on条件指定关联关系，去右侧表中，根据关联关系查找指定的数据，如果能找到，则把指定的数据显示出来，如果找不到，则显示null

```
select image_info.*,user_info.user_name from image_info left join user_info on image_info.user_id=user_info.id
```

## 虚拟机的linux环境配置

### 1.安装nodejs

https://www.cnblogs.com/len0031/p/4975615.html

### 2.安装pm2

npm install -g pm2

### 3.安装Git并生成SSH key

https://blog.csdn.net/u012442401/article/details/48147799

yum install git

ssh-keygen –t rsa

### 4.pm2的文档地址

pm2 init 生成pm2的配置文件，并且更改相应的配置

https://pm2.io/doc/en/runtime/guide/ecosystem-file/

https://pm2.io/doc/en/runtime/guide/easy-deploy-with-ssh/

```javascript
module.exports = {
  apps : [{
    name: 'node-serve',// 项目启动名称
    script: './server/bin/webapp',// 执行项目下的哪个文件
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : { // 部署
    production : {
      user : 'root',
      host : '192.168.45.128',//服务器远程地址
      ref  : 'origin/master',//仓库的master分支
      // repo : 'git@github.com:kiscon/node-serve.git',//仓库地址？
      repo : 'git@gitee.com:kiscon/node-serve.git',//仓库地址
      path : '/home/www/nodeserve1',//发布到的地址
      'post-deploy' : 'git pull && npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
```

