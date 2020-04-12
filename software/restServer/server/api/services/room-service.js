import constants from '../utils/application-constants';
import MongoManager from '../db/mongo-manager';
import JwtService from '../services/jwt-service';
import CommonUtils from '../utils/common-utils';
import UserService from '../services/user-service';

export default class RoomService {

    static createRoom(mongoClient, payload, jwt) {
        return new Promise((resolve, reject) => {
            if (!payload || !jwt) {
                return reject(new Error("required params not found."));
            }
            JwtService.validateJwtTokenAndGetProfile(mongoClient, jwt).then(resp => {
                if (resp.status == 'success' && resp.jwtToken && resp.profile) {
                    let roomId;
                    let createdRoom;
                    let query = { 'roomName': payload.roomDetails.roomName }
                    query.userId = resp.profile.userId;
                    MongoManager.findOneDocument(mongoClient, constants.TOURNARIZERS_DB,
                        constants.ROOMS_COLLECTION, query).then(result => {
                            if (!result) {
                                CommonUtils.getLatestIdByType(constants.TYPE_ROOM, mongoClient).then(id => {
                                    roomId = id.lastUpdated + '';
                                    payload.roomDetails = payload.roomDetails || {};
                                    payload.roomDetails.roomId = roomId;
                                    payload.roomDetails.userId = resp.profile.userId;
                                    return MongoManager.insertDocument(mongoClient, constants.TOURNARIZERS_DB,
                                        constants.ROOMS_COLLECTION, payload.roomDetails);
                                }).then(roomCreated => {
                                    resp.profile.rooms ? resp.profile.rooms.push(roomId) : resp.profile.rooms = [roomId];
                                    let payload = { profile: {} };
                                    payload.profile = resp.profile;
                                    createdRoom = roomCreated;
                                    return UserService.updateUser(mongoClient, payload);
                                }).then(profile => {
                                    resolve({ data: createdRoom, token: resp.jwtToken });
                                }).catch(err => {
                                    reject(new Error('Error occured while creating room'))
                                });
                            } else {
                                let error = {};
                                error.name = 'ROOM_ALREADY_EXISTS'
                                error.code = 401;
                                error.message = 'Room already exists';
                                return reject(error);
                            }
                        }).catch(err => {
                            !err.message && (err.message = 'Error occured while creating room');
                            reject(err);
                        });
                } else {
                    let error = {};
                    error.name = 'INVALID_TOKEN';
                    error.code = 400;
                    reject(error);
                }
            }).catch(err => {
                !err.message && (err.message = 'Error occured while creating room');
                reject(err);
            });
        })
    }

    static getRoomInfo(mongoClient, roomId, jwt) {
        return new Promise((resolve, reject) => {
            let query = { roomId: roomId };
            JwtService.validateJwtTokenAndGetProfile(mongoClient, jwt).then(resp => {
                if (resp.status == 'success' && resp.jwtToken && resp.profile) {
                    query.userId = resp.profile.userId;
                    let options = { projection: { '_id': 0 } };
                    MongoManager.findOneDocument(mongoClient, constants.TOURNARIZERS_DB, constants.ROOMS_COLLECTION, query, options)
                        .then(userProfile => {
                            if (userProfile) {
                                resolve(userProfile);;
                            } else {
                                reject(new Error('Room doesnt exist'));
                            }
                        }).catch(err => {
                            let error = {};
                            error.name = 'ROOM_DOESNT_EXIST';
                            error.code = 402;
                            reject(error);
                        });
                } else {
                    let error = {};
                    error.name = 'INVALID_TOKEN';
                    error.code = 400;
                    reject(error);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    static updateRoom(mongoClient, payload, jwt) {
        return new Promise((resolve, reject) => {
            if (!payload || !payload['roomDetails'] || !payload.roomDetails.roomId) {
                reject(new Error("required params not found."));
                return;
            }
            let query = { roomId: payload.roomDetails.roomId }
            let setDoc = { '$set': payload.roomDetails };
            JwtService.validateJwtTokenAndGetProfile(mongoClient, jwt).then(resp => {
                if (resp.status == 'success' && resp.jwtToken && resp.profile) {
                    query.userId = resp.profile.userId;
                    MongoManager.findOneDocument(mongoClient, constants.TOURNARIZERS_DB,
                        constants.ROOMS_COLLECTION, query).then(result => {
                            if (result) {
                                MongoManager.findOneAndUpdate(mongoClient, constants.TOURNARIZERS_DB, constants.ROOMS_COLLECTION, query, setDoc, true)
                                    .then(updatedRoom => {
                                        resolve({ data: updatedRoom, then: resp.jwtToken });
                                    }).catch(err => {
                                        console.log('Error occured while updating room: ', err);
                                        reject(err);
                                    });
                            } else {
                                let error = {};
                                error.name = 'ROOM_DOESNT_EXIST'
                                error.code = 402;
                                error.message = 'Room doesnt exists';
                                return reject(error);
                            }
                        }).catch(err => {
                            !err.message && (err.message = 'Error occured while updating room');
                            reject(err);
                        });
                } else {
                    let error = {};
                    error.name = 'INVALID_TOKEN';
                    error.code = 400;
                    reject(error);
                }
            }).catch(err => {
                !err.message && (err.message = 'Error occured while updating room');
                reject(err);
            });
        });
    }

    static getAllRooms(mongoClient, jwt) {
        return new Promise((resolve, reject) => {
            let query = {};
            JwtService.validateJwtTokenAndGetProfile(mongoClient, jwt).then(resp => {
                if (resp.status == 'success' && resp.jwtToken && resp.profile) {
                    console.log(">>>>>>>>>", resp.profile.userId)
                    query.userId = resp.profile.userId;
                    MongoManager.findAllDocuments(mongoClient, constants.TOURNARIZERS_DB, constants.ROOMS_COLLECTION, query)
                        .then(roomsList => {
                            resolve({ data: roomsList, token: resp.jwtToken });
                        }).catch(err => {
                            console.log('Error occured while getAllRooms: ', err);
                            reject(err);
                        });
                } else {
                    let error = {};
                    error.name = 'INVALID_TOKEN';
                    error.code = 400;
                    reject(error);
                }
            }).catch(err => {
                !err.message && (err.message = 'Error occured while getting rooms List');
                reject(err);
            });
        });
    }
}
