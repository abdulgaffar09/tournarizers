// import Promise from 'promise';
import MongoClient from '../db/mongo-singleton';
class MongoManager {

    static getMongoClient(mongoClient) {
        if (mongoClient) {
            if (!mongoClient.isConnected()) {
                return mongoClient.connect().then(mongoClient => mongoClient);
            } else {
                return new Promise((resolve, reject) => resolve(mongoClient));
            }
        }
    }

    static insertDocument(mongoClient, dbName, collectionName,document) {
        return new Promise((resolve, reject) => {
            try {
                this.getMongoClient(mongoClient).then(mongoCli => {
                    const collection = mongoCli.db(dbName).collection(collectionName);
                    let result = collection.insertOne(document,(err,result) => {
                        if(err){
                            reject(err);
                        }else{
                            console.log('result => insert ',result);
                            resolve(result.ops[0]);
                        }
                    })
                });
            } catch (e) {
                console.log('Exception while insertDocument: ', e);
                reject(e);
            }
        });
    }

    static findAllDocuments(mongoClient, dbName, collectionName, query, limit, sort) {
        return new Promise((resolve, reject) => {
            try {
                this.getMongoClient(mongoClient).then(mongoCli => {
                    const collection = mongoCli.db(dbName).collection(collectionName);
                    let result = collection.find({}).project({ _id: 0 });

                    if (limit) { result = collection.limit(limit); }
                    if (sort) { result = collection.sort(sort); }
                    result.toArray((err, docs) => {
                        if (err) {
                            console.log('Exception while findAllDocuments: ', err);
                            reject(err);
                        }
                        resolve(docs);
                    });
                });
            } catch (e) {
                console.log('Exception while findAllDocuments: ', e);
                reject(e);
            }
        });
    }

    static findOneDocument(mongoClient, dbName, collectionName, query,options) {
        return new Promise((resolve, reject) => {
            try {
                this.getMongoClient(mongoClient).then(mongoCli => {
                    const collection = mongoCli.db(dbName).collection(collectionName);
                    collection.findOne(query,options,(err, docs) => {
                        if (err) {
                            console.log('Exception while findOneDocument: ', err);
                            reject(err);
                        }
                        resolve(docs);
                    });
                });
            } catch (e) {
                console.log('Exception while findOneDocument: ', e);
                reject(e);
            }
        });
    }

    static findOneAndUpdate(mongoClient, dbName, collectionName, query, setDoc, isUpsert) {
        return new Promise((resolve, reject) => {
            try {

                this.getMongoClient(mongoClient).then(mongoCli => {
                    const collection = mongoCli.db(dbName).collection(collectionName);
                    collection.findOneAndUpdate(query, setDoc, { returnOriginal: false, upsert: isUpsert }, (err, result) => {
                        if (err) {
                            console.log('Error while findOneAndUpdate: ', err);
                            reject(err);
                        } else {
                            resolve(result.value);
                        }
                    });
                });
            } catch (e) {
                console.log('Exception while findOneAndUpdate: ', e);
                reject(e);
            }
        });
    }

    static findOneAndDelete(mongoClient, dbName, collectionName, query) {
        return new Promise((resolve, reject) => {
            try {
                this.getMongoClient(mongoClient).then(mongoCli => {
                    const collection = mongoCli.db(dbName).collection(collectionName);
                    collection.findOneAndDelete(query, (err, result) => {
                        if (err) {
                            console.log('Error while findOneAndDelete: ', err);
                            reject(err);
                        } else {
                            resolve(result.value);
                        }
                    });
                });
            } catch (e) {
                console.log('Exception while findOneAndDelete: ', e);
                reject(e);
            }
        });
    }

    static updateMany(mongoClient, dbName, collectionName, query, setDoc, isUpsert) {
        return new Promise((resolve, reject) => {
            try {
                this.getMongoClient(mongoClient).then(mongoCli => {
                    const collection = mongoCli.db(dbName).collection(collectionName);
                    collection.bulkWrite([{ updateMany: { filter: query, update: { $set: setDoc }, upsert: isUpsert } }],
                        { ordered: true, w: 1 }, (err, result) => {
                            if (err) {
                                console.log('Error while updateMany: ', err);
                                reject(err);
                            }
                            resolve(result);
                        });
                });
            } catch (e) {
                console.log('Exception while updateMany: ', e);
                reject(e);
            }
        });
    }

    static deleteMany(mongoClient, dbName, collectionName, query, setDoc, isUpsert) {
        return new Promise((resolve, reject) => {
            try {
                this.getMongoClient(mongoClient).then(mongoCli => {
                    const collection = mongoCli.db(dbName).collection(collectionName);
                    collection.bulkWrite([{ deleteMany: { filter: query } }],
                        { ordered: true, w: 1 }, (err, result) => {
                            if (err) {
                                console.log('Error while deleteMany: ', err);
                                reject(err);
                            }
                            resolve(result);
                        });
                });
            } catch (e) {
                console.log('Exception while deleteMany: ', e);
                reject(e);
            }
        });
    }
}

export default MongoManager;