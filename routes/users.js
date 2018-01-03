const router = require('koa-router')()
const User = require('../models/user.js')

function checkRootLogin(ctx, next) {
	next()
}

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/register', function (ctx, next) {
	console.log(ctx.request.body)
	if(!ctx.request.body.username) return ctx.body = {"error": 403, "message": "用户名未填写！"}
	if(!ctx.request.body.password) return  ctx.body = {"error": 403, "message": "密码未填写！"}
	if(!ctx.request.body.mobile) return  ctx.body = {"error": 403, "message": "手机号码未填写！"}

	const newUser = new User({
		username: ctx.request.username,
		password: ctx.request.password,
		mobile: ctx.request.mobile,
		isDelete: 1
	})

	User.getUserByName(ctx.request.body.username, function (err, result) {
		if (err) return ctx.body = {"error": 403, "message": "数据库异常!"}
			 return ctx.body = "ok";
		if (result.username) {
			return ctx.body = {"error": 403, "message": "用户名已存在"}
		} else {
			User.getUserByMobile(ctx.request.body.mobile, function (err, result) {
				if (err) return ctx.body = {"error": 403, "message": "数据库异常！"}
				if (result.length > 0) return ctx.body = {"error": 403, "message": "手机号码已注册过！！！"}
				else {
					User.addUser(newUser, function (err, data) {
						if (err) return ctx.body = {"error": 403, "message": "数据库异常！！！"}
						newUser.id = data.insertId;
						ctx.session.user = newUser;
						ctx.body = {'success': true}
					})
				}
			})
		}
	})
})
  
module.exports = router
