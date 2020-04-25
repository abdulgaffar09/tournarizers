import JwtService from '../services/jwt-service';
import successResponse from '../utils/success-response';
import errorResponse from '../utils/error-response';;
class JwtController{
    static validateJwtTokenAndGetProfile(req,res){
        const mongoClient = req.app.get('mongoClient');
        const jwtToken = req.header('X-ACCESS-TOKEN');
        console.log('request received at validateJwtTokenAndGetProfile: ',jwtToken);
        return JwtService.validateJwtTokenAndGetProfile(mongoClient,jwtToken).then(result => {
            res.status(200).json(new successResponse(result));
        }).catch(err => {
            console.log('Error while validateJwtTokenAndGetProfile ==>> ',err);
            res.status(500).json(new errorResponse(err));
        });

    }

}
export default JwtController;