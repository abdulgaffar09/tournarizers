
// import Promise from 'promise';
import constants from '../utils/application-constants';
import MongoManager from '../db/mongo-manager';
import bcrypt from 'bcrypt';
const saltRounds = 10;

class UserService{
    
    static getAllUsers(mongoClient){
        return new Promise((resolve,reject) => {
            let query = {};
            MongoManager.findAllDocuments(mongoClient,constants.tournarizersDbName,constants.userProfileCollection,query)
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
            let query = {email:payload.profile.emailId};   
            let password = payload.profile.password;         
            bcrypt.hash(password, saltRounds).then((hashPassword) => {
                payload.profile.password = hashPassword;
                let setDoc = {'$set':payload.profile};
                return MongoManager.findOneAndUpdate(mongoClient,constants.tournarizersDbName,
                    constants.userProfileCollection,query,setDoc,true);
            }).catch(err => {
                console.log(err)
                return reject(err);
            }).then(userCreated => {
                console.log('user profile created: ',userCreated);
                resolve(userCreated);
            }).catch(err => {
                console.log('Error occured while createUser: ',err);
                reject(err);
            });
        });
    }

    static getUser(mongoClient,id){
        return new Promise((resolve,reject) => {
            let query = {userId:id};
            let options = {projection:{'_id': 0,  'password':0 }};
            MongoManager.findOneDocument(mongoClient,constants.tournarizersDbName,constants.userProfileCollection,query,options)
            .then(userProfile => {
                console.log('userProfile found: ',userProfile);
                resolve(userProfile);
            }).catch(err => {
                console.log('Error occured while getUser: ',err);
                reject(err);
            });``

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
            MongoManager.findOneAndUpdate(mongoClient,constants.tournarizersDbName,constants.userProfileCollection,query,setDoc,true)
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