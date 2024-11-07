var jwt= require('jsonwebtoken');

const createToken = (userData)=>{
    return jwt.sign(process.env.JWT_SECRET)
}
