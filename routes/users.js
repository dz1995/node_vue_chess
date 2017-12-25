const router = require('koa-router')()
const User = require('../models/user.js')

function checkRootLogin(ctx, next) {
	console.log(ctx.session)
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
	// if (!ctx.session.vCode ||)
})
 
module.exports = router
