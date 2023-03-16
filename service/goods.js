const {querySql} = require('../db/index')

function getData() {
    const sql = `select  * from goods`
    return querySql(sql)
}

function getCategory() {
    const sql = `select * from goods_type`
    return querySql(sql)
}

function getInfo(name) {
    const sql = `select * from goods where gd_Name = '${name}'`
    return querySql(sql)
}



module.exports = {
    getData,
    getCategory,
    getInfo,
}
