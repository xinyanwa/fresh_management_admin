const expressJwt = require('express-jwt')
const {PRIVATE_KEY} = require('../utils/constant')


// exports.setToken = function (username, userid) {
//     return new Promise((resolve, reject) => {
//         const token = jwt.sign({
//             name: username,
//             _id: userid
//         }, signkey, {expiresIn: '1h'});
//         resolve(token);
//     })
// }
//
// exports.verToken = function (token) {
//     return new Promise((resolve, reject) => {
//         var info = jwt.verify(token.split(' ')[1], signkey);
//         resolve(info);
//     })
// }


const jwtAuth = expressJwt({
    secret: PRIVATE_KEY,
    algorithms: ['HS256'],
}).unless({
    path: [
        '/',
        '/login'
    ]
})


module.exports = jwtAuth
