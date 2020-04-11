import jwt from 'jsonwebtoken';
class JwtService{

    static createJwtToken(profile){
        return jwt.sign({emailId:profile.emailId, userId: profile.userId},"tournaXYZ",{expiresIn:'4h'});
    }

    static validateJwtToken(jwtToken,profile){
        return new Promise((resolve,reject) => {
            let jwtRes = {}
            jwt.verify(jwtToken,"tournaXYZ",(err,decoded) => {
                if(decoded.emailId == profile.emailId && decoded.userId == profile.userId){
                    jwtRes = {
                        status : 'success',
                        jwtToken: this.createJwtToken(profile)
                    }
                    resolve(jwtRes);
                }else{
                    reject(new Error("Invalid jwtToken."));
                }
            });
        });
        
    }
}

export default JwtService;