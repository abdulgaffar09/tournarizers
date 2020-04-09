// import Promise from 'promise';
import MongoClient from '../db/mongo-singleton';
class MongoManager{

    static findAllDocuments(mongoClient,dbName, collectionName,query,limit,sort){
        return new Promise ((resolve,reject ) => {
            try{
                mongoClient.connect(err => {
                    const collection = mongoClient.db(dbName).collection(collectionName);
                    let result = collection.find({}).project({_id:0});
                    
                    if(limit){result = collection.limit(limit);}
                    if(sort){result = collection.sort(sort);}
                    result.toArray((err,docs) => {
                          if(err){
                            console.log('Exception while findAllDocuments: ',err);
                            reject(err);
                          }
                          resolve(docs);                          
                        }); 
                    });
                } catch(e){
                console.log('Exception while findAllDocuments: ',e);
                reject(e);
            }finally{
                if(mongoClient){
                    mongoClient.close();
                }
            }
        });
    }

    static findOneDocument(mongoClient,dbName, collectionName,query){
        return new Promise ((resolve,reject ) => {
            try{
                mongoClient.connect(err => {
                    const collection = mongoClient.db(dbName).collection(collectionName);
                    let result = collection.find({}).project({_id:0}).limit(1);
                    result.toArray((err,docs) => {
                          if(err){
                            console.log('Exception while findOneDocument: ',err);
                            reject(err);
                          }
                          resolve(docs);                          
                        }); 
                    });
                } catch(e){
                console.log('Exception while findOneDocument: ',e);
                reject(e);
            }finally{
                if(mongoClient){
                    mongoClient.close();
                }
            }
        });
    }

    static findOneAndUpdate(mongoClient,dbName, collectionName,query,setDoc,isUpsert){
        return new Promise ((resolve,reject ) => {
            try{
                // console.log('mongo connection before closed',mongoClient.connectionClosed())
                let mongoCli = new MongoClient().client;
                mongoCli.connect(err => {
                    const collection = mongoCli.db(dbName).collection(collectionName);
                    collection.findOneAndUpdate(query,setDoc, {returnOriginal:true,upsert:isUpsert},(err,result) =>{
                        console.log('records created............')
                        if(err){
                            console.log('Error while findOneAndUpdate: ',err);
                            reject(err);
                            }else{
                                resolve(result.value);
                            }
                            if(mongoCli){
                                console.log('mongo connection before closed',mongoCli)
                                mongoCli.close();
                                console.log('mongo connection closed',mongoCli)
                            }
                        });
                    });
                } catch(e){
                console.log('Exception while findOneAndUpdate: ',e);
                reject(e);
                if(mongoCli){
                    console.log('mongo connection before closed',mongoCli)
                    mongoCli.close();
                    console.log('mongo connection closed',mongoCli)
                }
            }finally{
               
            }
        });
    }

    static findOneAndDelete(mongoClient,dbName, collectionName,query){
        return new Promise ((resolve,reject ) => {
            try{
                mongoClient.connect(err => {
                    const collection = mongoClient.db(dbName).collection(collectionName);
                    collection.findOneAndDelete(query,(err,result) =>{
                        if(err){
                            console.log('Error while findOneAndDelete: ',err);
                            reject(err);
                            }else{
                                resolve(result.value);
                            }
                            
                        });
                    });
                } catch(e){
                console.log('Exception while findOneAndDelete: ',e);
                reject(e);
            }finally{
                if(mongoClient){
                    mongoClient.close();
                }
            }
        });
    }

    static updateMany(mongoClient,dbName, collectionName,query,setDoc,isUpsert){
        return new Promise ((resolve,reject ) => {
            try{
                mongoClient.connect(err => {
                    const collection = mongoClient.db(dbName).collection(collectionName);
                    collection.bulkWrite([{ updateMany: { filter: query, update: {$set: setDoc}, upsert:isUpsert } }],
                        {ordered:true,w:1},(err,result) =>{
                        if(err){
                            console.log('Error while updateMany: ',err);
                            reject(err);
                            }
                            resolve(result);
                        });
                    });
                } catch(e){
                console.log('Exception while updateMany: ',e);
                reject(e);
            }finally{
                if(mongoClient){
                    mongoClient.close();
                }
            }
        });
    }

    static deleteMany(mongoClient,dbName, collectionName,query,setDoc,isUpsert){
        return new Promise ((resolve,reject ) => {
            try{
                mongoClient.connect(err => {
                    const collection = mongoClient.db(dbName).collection(collectionName);
                    collection.bulkWrite([{ deleteMany: { filter: query} }],
                        {ordered:true,w:1},(err,result) =>{
                        if(err){
                            console.log('Error while deleteMany: ',err);
                            reject(err);
                            }
                            resolve(result);
                        });
                    });
                } catch(e){
                console.log('Exception while deleteMany: ',e);
                reject(e);
            }finally{
                if(mongoClient){
                    mongoClient.close();
                }
            }
        });
    }
}

export default MongoManager;