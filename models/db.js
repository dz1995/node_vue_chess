/*
* @Author: dz
* @Date:   2017-12-11 10:02:03
* @Last Modified by:   dz
* @Last Modified time: 2017-12-28 09:44:45
*/
'use  strict'

const mysql = require('mysql')

const pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '1234',
	database: 'vue_chess'
})

exports.query = function () {
	let args = arguments
	let sqlStr = args[0]
	let params = []
	let callback;
	if (args.length === 2 && typeof args[1] === 'function') {
		callback = ages[1]
	} else if (args.length === 3 && Array.isArray(args[1]) && typeof args[2] === 'function') {
		params = args[1]
		callback = args[2]
	} else {
		throw new ('参数个数不匹配')
	}

	pool.getConnection(function (err, connection) {
		if (err) {
			return callback(err)
		} else {
			connection.query(sqlStr, params, function (err, rows) {
				if (err) {
					callback(err)
				}
				connection.release()
				callback.apply(null, arguments)
			})
		}
	})
}