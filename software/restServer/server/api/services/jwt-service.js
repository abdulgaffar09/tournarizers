import jwt from 'jsonwebtoken';
import MongoManager from '../db/mongo-manager';
import UserService from '../services/user-service';
class JwtService {

    static createJwtToken(profile) {
        return jwt.sign({ emailId: profile.emailId, userId: profile.userId }, "tournaXYZ", { expiresIn: '24h' });
    }

    static validateJwtToken(mongoCLient, jwtToken, profile) {
        return new Promise((resolve, reject) => {
            let jwtRes = {}
            jwt.verify(jwtToken, "tournaXYZ", (err, decoded) => {
                if (err) {
                    jwtRes = {
                        status: 'failure',
                        message: "Invalid jwtToken"
                    }
                    reject(jwtRes);
                }
                if (!profile || !Object.keys(profile).length && decoded.userId) {
                    UserService.getUser(mongoClient, decoded.userId).then(profile => {
                        profile = profile;
                        jwtRes = {
                            status: 'success',
                            jwtToken: this.createJwtToken(profile)
                        }
                        resolve(jwtRes);
                    }).catch(err => {
                        jwtRes = {
                            status: 'failure',
                            error: err
                        }
                        resolve(err)
                    })
                } else if (decoded.emailId == profile.emailId && decoded.userId == profile.userId) {
                    jwtRes = {
                        status: 'success',
                        jwtToken: this.createJwtToken(profile)
                    }
                    resolve(jwtRes);
                } else {
                    jwtRes = {
                        status: 'failure',
                        message: "Invalid jwtToken"
                    }
                    reject(jwtRes);
                }
            });
        })
    }

    static validateJwtTokenAndGetProfile(mongoClient, jwtToken) {
        return new Promise((resolve, reject) => {
            let jwtRes = {}
            jwt.verify(jwtToken, "tournaXYZ", (err, decoded) => {
                if (err) {
                    console.log('err verify validateJwtTokenAndGetProfile',err);
                    jwtRes = {
                        status: 'failure',
                        message: "Invalid jwtToken",
                        name: "INVALID_TOKEN",
                        code: 400
                    }
                    reject(jwtRes);
                }
                UserService.getUser(mongoClient, decoded.userId).then(profile => {
                    if (profile) {
                        jwtRes = {
                            status: 'success',
                            jwtToken: this.createJwtToken(profile),
                            profile: profile
                        }
                        resolve(jwtRes);
                    } else {
                        jwtRes = {
                            status: 'failure',
                            message: "Invalid jwtToken",
                            name: "INVALID_TOKEN",
                            code: 400
                        }
                        reject(jwtRes);
                    }
                }).catch(err => {
                    jwtRes = {
                        status: 'failure',
                        error: err
                    }
                    reject(jwtRes)
                })
            });
        })
    }
}

export default JwtService;