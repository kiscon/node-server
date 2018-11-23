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