const express = require('express')
const {getData, getCategory, getInfo} = require('../service/goods')
const {database} = require("../db/config")
const Result = require("../modules/result")
const router = express.Router()

router.get('/getData', (req, res) => {
    // console.log(req.user)
    getData().then(data => {
        if (!data || data.length === 0) {
            new Result('获取数据失败，请检查语句！').fail(res)
        } else {
            new Result({data}, '操作成功').success(res)
        }
    })
})

router.get('/getCategory',(req, res)=>{
    getCategory().then(data=>{
        if (!data || data.length === 0) {
            new Result('获取数据失败，请检查语句！').fail(res)
        } else {
            new Result({data}, '操作成功').success(res)
        }
    })
})

router.post('/getGoodsInfo', (req, res)=>{
    let name = req.body.data
    getInfo(name).then(data=>{
        if (!data || data.length === 0) {
            new Result('获取数据失败，请检查语句！').fail(res)
        } else {
            new Result({data}, '操作成功').success(res)
        }
    })
})

module.exports = router
