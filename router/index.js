const express = require('express')
const jwtAuth = require('./jwt')
const boom = require('boom')
const {body, validationResult} = require('express-validator')
const {PWD_SALT, PRIVATE_KEY, JWT_EXPIRED} = require('../utils/constant')
const {md5, decode} = require('../utils/index')
const Result = require('../modules/result')
const {user} = require("../db/config");
const {login, findUser} = require('../service/user')
const jwt = require('jsonwebtoken')
const goods = require('./goods')

//注册路由
const router = express.Router()

router.use(jwtAuth)

router.use((err, req, res, next) => {
    console.log(req.headers.authorization)
    if (err.name === 'UnauthorizedError') {
        console.error(req.path + ',无效token')
        res.status(401).send('非法token')
    } else {
        next()
    }
})

router.get('/', (req, res) => {
    res.send('访问成功')
})

router.post('/login', (req, res, next) => {
    // res.send('接受')
    // console.log(req.body.username)
    const err = validationResult(req)
    if (!err.isEmpty()) {
        const [{msg}] = err.errors
        // console.log(msg)
        next(boom.badRequest(msg))
    } else {
        const username = req.body.username
        let password = req.body.password
        login(username, password).then(user => {
            if (!user || user.length === 0) {
                new Result('登录失败，请检查用户名和密码是否正确').fail(res)
            } else {
                const token = jwt.sign(
                    {username},
                    PRIVATE_KEY,
                    {expiresIn: '1h'}
                )
                new Result({token, user}, '登录成功').success(res)
            }
        })
        return
    }
})

router.use('/goods', goods)

router.use((req, res, next) => {
    next(boom.notFound('接口不存在'))
})

module.exports = router
