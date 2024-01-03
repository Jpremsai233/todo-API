var jwt = require('jsonwebtoken');


async function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
        var jwt_secrect = "36s634uper!@_$%~^131*($133421%Dsecrzxcet_123456@aaa"
        jwt.verify(token, jwt_secrect, function (err, decoded) {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.json({
                        code: 401,
                        messaage: "token experied"
                    })
                }
                if (err.name === 'JsonWebTokenError') {
                    res.json({
                        code: 401,
                        messaage: "Invalid token"
                    })
                }
            }
            else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.json({
            code: 400,
            messaage: "Please provide access token"
        })
    }
}


module.exports = {


    verifyToken


}



