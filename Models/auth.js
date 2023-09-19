//Ice Task 5 code
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, 'MywebtokenStringToSecureMyToken')
        next()
    }
    catch(error){
        res.status(403).json({
            message: 'You have to login first!'
        })
    }
}