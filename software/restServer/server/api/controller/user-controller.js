import UserService from '../services/user-service';
import successResponse from '../utils/success-response';
import errorResponse from '../utils/error-response';
class UserController{
    static getAllUsers(req,res){
            const mongoClient = req.app.get('mongoClient');
            console.log('request received at getAllUsers: ');
            return UserService.getAllUsers(mongoClient).then(result => {
                res.status(200).json(new successResponse(result));
            }).catch(err => {
                res.status(500).json(new errorResponse(err));
            });
            
    }

    static createUser(req,res){
        const mongoClient = req.app.get('mongoClient');
        console.log('mongoClient: ',mongoClient);
        const payload = req.body;
        return UserService.createUser(mongoClient,payload).then(result => {
            res.status(200).json(new successResponse(result));
        }).catch(err => {
            res.status(500).json(new errorResponse(err));
        }); 
    }

    static getUser(req,res){
        const mongoClient = req.app.get('mongoClient');
        let id = req.params.id;
        return UserService.getUser(mongoClient,id).then(result => {
            res.status(200).json(new successResponse(result));
        }).catch(err => {
            res.status(500).json(new errorResponse(err));
        });
    }

    static updateUser(req,res){
        const mongoClient = req.app.get('mongoClient');
        const payload = req.body;
        return UserService.updateUser(mongoClient,payload).then(result => {
            res.status(200).json(new successResponse(result));
        }).catch(err => {
            res.status(500).json(new errorResponse(err));
        });
    }

}
export default UserController;