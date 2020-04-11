
// import Promise from 'promise';
import constants from '../utils/application-constants';
import MongoManager from '../db/mongo-manager';
import JwtService from '../services/jwt-service';
import bcrypt from 'bcrypt';
const saltRounds = 10;

class LoginService{
    
    static login(mongoClient,payload){
        return new Promise((resolve,reject) => {
            let query = {emailId:payload.emailId};
            let profile = {};
            let options = {};
            MongoManager.findOneDocument(mongoClient,constants.TOURNARIZERS_DB,constants.USER_PROFILES_COLLECTION,query,options)
            .then(userProfile => {
                if(userProfile && userProfile.password){
                    profile = userProfile;
                    return bcrypt.compare(payload.password, userProfile.password).then(isPasswordValid => {
                        if(isPasswordValid){
                            let jwtToken = JwtService.createJwtToken(profile);
                            let resp = {jwtToken: jwtToken};
                            resolve(resp);
                            }else{
                                reject(new Error("Invalid emailId or password."));
                            }
                    });
                } else{
                    throw new Error("User profile not found.");   
                }
            }).catch(err => {
                console.log('Error occured while find the user: ',err);
                return reject(err);
            });
        });
    }
}
export default LoginService;