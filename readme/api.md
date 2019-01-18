## API文档

### 1.注册

URL：/api/userSve/add

```json
{
	"userName": "555",
	"userCode": 117106,
	"mobile": "",
	"password": 11111
}
```

### 2.登录

URL：/api/userSve/login

```json
{
	"userCode": 117156,
	"password": 11111
}
```

### 3.退出登录

URL: /api/userSve/logOut

只需要调用一下，清空node端的的session存储

### 4.注销用户

URL: /api/userSve/cancellation

```json
{
	"userCode": 117122,
	"password": 11111,
	"isdel": 1
}
// 传入isdel为1
```

