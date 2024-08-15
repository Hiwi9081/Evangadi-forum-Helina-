const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware (req, res, next){
    const autheader = req.header.authonticatin

    if (!autheader || autheader.startswith('Bearer')) {
     return res .status(StatusCodes.UNAUTHORIZED).json({msg: ' authentication invalid.'});

    }
    const token = autheader.split('')[1]
    console.log(autheader)
    console.log(token)


    try{
        const {username, userid} = jwt.verify(autheader, 'secret')
            // return res.status(StatusCodes.OK).json(data)
            req.user={username, userid}
            next()
    }catch(error) {
        return res .status(StatusCodes.UNAUTHORIZED).json({msg: ' authentication invalid.'});

    }
}

module.exports = authMiddleware