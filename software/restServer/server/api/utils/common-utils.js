import MongoManager from '../db/mongo-manager';
import Constants from '../utils/application-constants';

class CommonUtils{
    static getLatestIdByType(type,mongoClient){
        let query = {type : type};
        return MongoManager.findOneAndUpdate(mongoClient,Constants.TOURNARIZERS_DB,
            Constants.ID_INCREMENTAL_COLLECTION,query,{$inc:{'lastUpdated':1}},true);
    }

}

export default CommonUtils;