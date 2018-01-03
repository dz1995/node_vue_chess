/*
* @Author: dz
* @Date:   2017-12-11 10:46:42
* @Last Modified by:   dz
* @Last Modified time: 2017-12-28 09:44:24
*/
const db = require('./db.js')

class User {
	constructor (user) {
		this.id = user.id
		this.username = user.username
		this.password = user.password
		this.mobile = user.mobile
		this.isDelete = user.isDelete
	}
}
	User.queryUser = function (page, callback) {
		let selectSql = 'select * from user '
		selectSql += ' LIMIT ?,?'
		db.query(selectSql, [(page.page - 1) * page.size, page.size], function (err, result) {
			if (err) {
				return callback(err)
			}
			let data = result
			callback(err, data)
		})
	}

	User.queryUserMessage = function (id, callback) {
		let selectSql = 'select * form user where id=?'
		db.query(selectSql, [id], function (err, result) {
			if (err) {
				return callback(err)
			}
			let data = result[0]
			callback(err, data)
		})
	}

	User.updateUser = function (user, callback) {
		let selectSql = 'UPDATE user SET isDelete =? WHERE id=?'
		db.query(selectSql, [parseInt(user.isDelete), user.id], function (err, result) {
			if (err) {
				return callback(err)
			}
			callback(err, result)
		})
	}

	User.countUser = function (callback) {
		let selectSql = 'SELECT count(id) as count FROM user '
		db.query(selectSql, function (err, result) {
			if (err) {
				return callback(err)
			}
			let data = result[0]
			callback(err, data)
		})
	}

	User.getUserById = function (id, callback) {
		let selectSql = 'select * from user where id =?'
		db.query(selectSql, [id], function (err, result) {
			if (err) {
				return callback(err)
			}
			let data = result[0]
			callback(err, data)
		})
	}

	User.getUserByName = function (username, callback) {
		let selectSql = 'select * from user where username =?'
		db.query(selectSql, [username], function (err, result) {
			if (err) {
				return callback(err)
			}
			let data = result[0]
			callback(err, data)
		})
	}
 
	User.getUserByMobile = function (mobile, callback) {
		var selectSql = 'select * from user where mobile = ?';
	    db.query(selectSql, [mobile], function (err, result) {
	        if (err) {
	            return callback(err);
	        }
	        var data = result;
	        callback(err, data);
	    });
	}

	User.addUser = function (user, callback) {
		let selectSql = 'insert into user (id,username,password,mobile,isDelete) values (null,?,?,?,?)'
		db.query(selectSql, [user.username, user.password, user.moblie, user.isDelete], function (err, result) {
			if (err) {
				return callback(err)
			}
			callback(err, result)
		})
	}

	User.updatePassword = function (id, password, callback) {
		let selectSql = 'UPDATE user SET password =? WHERE id=?'
		db.query(selectSql, [password, id], function (err, result) {
			if (err) {
				return callback(err)
			}
			callback(err, result)
		})
	}

module.exports = User