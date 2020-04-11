
// import Promise from 'promise';
import constants from '../utils/application-constants';
import MongoManager from '../db/mongo-manager';
import CommonUtils from '../utils/common-utils';
import bcrypt from 'bcrypt';
const saltRounds = 10;

class UserService{
    
    static getAllUsers(mongoClient){
        return new Promise((resolve,reject) => {
            let query = {};
            MongoManager.findAllDocuments(mongoClient,constants.TOURNARIZERS_DB,constants.USER_PROFILES_COLLECTION,query)
            .then(userProfiles => {
                console.log('no of userProfiles found are: ',userProfiles.length);
                resolve(userProfiles);
            }).catch(err => {
                console.log('Error occured while getAllUsers: ',err);
                reject(err);
            });

        });
    }

    static createUser(mongoClient,payload){
        return new Promise((resolve,reject) => {
            if(!payload  || !payload['profile']){
                reject(new Error("required params not found."));
                return;
            }
            let query = {emailId:payload.profile.emailId};   
            MongoManager.findOneDocument(mongoClient,constants.TOURNARIZERS_DB,constants.USER_PROFILES_COLLECTION,query)
            .then((result) => {
                console.log('user already exists',result);
                if(result && result.emailId && result.emailId == payload.profile.emailId){
                    return reject("user already exists.");
                }else{
                     CommonUtils.getLatestIdByType(constants.TYPE_USER,mongoClient).then(userId => {
                        payload.profile.userId = userId.lastUpdated+"";
                        console.log('profile userId -> ',payload.profile);
                        let password = payload.profile.password; 
                        return bcrypt.hash(password, saltRounds);        
                    }).then((hashPassword) =>{
                        payload.profile.password = hashPassword;
                        console.log('profile hashPassword -> ',payload.profile);
                        return MongoManager.insertDocument(mongoClient,constants.TOURNARIZERS_DB,
                            constants.USER_PROFILES_COLLECTION,payload.profile);
                    }).then(userCreated => {
                        console.log('user profile created: ',userCreated);
                        if(userCreated){
                            delete userCreated["_id"];
                            delete userCreated["password"];
                        }
                        
                        resolve(userCreated);
                    }).catch(err => {
                        console.log('Error occured while createUser: ',err);
                        reject(err);
                    });
                    
                }
            }).catch(err => {
                console.log("Error while finding a document.");
                return reject(err);
            })
        });
    }

    static getUser(mongoClient,id){
        return new Promise((resolve,reject) => {
            let query = {userId:id};
            let options = {projection:{'_id': 0,  'password':0 }};
            MongoManager.findOneDocument(mongoClient,constants.TOURNARIZERS_DB,constants.USER_PROFILES_COLLECTION,query,options)
            .then(userProfile => {
                console.log('userProfile found: ',userProfile);
                resolve(userProfile);
            }).catch(err => {
                console.log('Error occured while getUser: ',err);
                reject(err);
            });

        });
    }

    static updateUser(mongoClient,payload){
        return new Promise((resolve,reject) => {
            if(!payload  || !payload['profile']){
                reject(new Error("required params not found."));
                return;
            }
            let query = {email:payload.profile.emailId};
            let setDoc = {'$set':payload.profile};
            MongoManager.findOneAndUpdate(mongoClient,constants.TOURNARIZERS_DB,constants.USER_PROFILES_COLLECTION,query,setDoc,true)
            .then(userCreated => {
                console.log('user profile updated: ',userCreated);
                resolve(userCreated);
            }).catch(err => {
                console.log('Error occured while updateUser: ',err);
                reject(err);
            });
        });
    }
}
export default UserService;