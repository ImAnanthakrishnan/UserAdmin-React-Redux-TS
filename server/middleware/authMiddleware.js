import jwt from "jsonwebtoken";
export const protectUser =async(req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).json("You need to Login")
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
        if(err){
            return res.status(403).json('Token is not valid');
        }
        req.user = user;
        next();
    })
}

export const protectAdmin = async(req,res,next) => {
    const token = req.cookies.acces_token1;
   

    if(!token){
        return res.status(401).json("you need to Login");
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,admin)=>{
        if(err){
            return res.status(403).json('Token is not valid');
        }
        req.admin = admin;
        next();
    })
}