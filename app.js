const express = require('express')
const app = express()
const port = 3030
const router = require('./router/index')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/', router)


const server = app.listen(port, function () {
    const {address, port} = server.address()
    console.log('Http 服务启动成功： http://localhost:%s', port)
})
