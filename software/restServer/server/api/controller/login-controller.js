import LoginService from '../services/login-service';
import successResponse from '../utils/success-response';
import errorResponse from '../utils/error-response';
class LoginController{
    static login(req,res){
            const mongoClient = req.app.get('mongoClient');
            let payload = req.body;
            console.log('request received at login: ',payload);
            return LoginService.login(mongoClient,payload).then(result => {
                res.status(200).json(new successResponse(result));
            }).catch(err => {
                console.log('Error while login ==>> ',err);
                res.status(500).json(new errorResponse(err));
            });
            
    }

}
export default LoginController;