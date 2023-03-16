const { querySql,queryOne } = require('../db/index')

function login(username, password) {
    const sql = `select * from user where us_Name = '${username}' and us_Pass = '${password}'`
    return querySql(sql)
}

function findUser(username){
    const sql =`select id,username,role,nickname,avatar from admin_user where username='${username}'`
    return queryOne(sql)
}

module.exports = {
    login,
    findUser
}
