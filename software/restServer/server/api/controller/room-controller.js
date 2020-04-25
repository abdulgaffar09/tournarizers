import RoomService from '../services/room-service';
import successResponse from '../utils/success-response';
import errorResponse from '../utils/error-response';

export default class RoomController {

    static createRoom(req, res) {
        const mongoClient = req.app.get('mongoClient');
        let payload = req.body;
        const jwt = req.headers['x-access-token'];
        return RoomService.createRoom(mongoClient, payload, jwt).then(result => {
            res.status(200).json(new successResponse(result.data, result.token));
        }).catch(err => {
            res.status(500).json(new errorResponse(err));
        });
    }

    static updateRoom(req, res) {
        const mongoClient = req.app.get('mongoClient');
        const payload = req.body;
        const jwt = req.headers['x-access-token'];
        return RoomService.updateRoom(mongoClient, payload, jwt).then(result => {
            res.status(200).json(new successResponse(result));
        }).catch(err => {
            res.status(500).json(new errorResponse(err));
        });
    }

    static getRoomInfo(req, res) {
        const mongoClient = req.app.get('mongoClient');
        let id = req.params.id;
        const jwt = req.headers['x-access-token'];
        return RoomService.getRoomInfo(mongoClient, id, jwt).then(result => {
            res.status(200).json(new successResponse(result));
        }).catch(err => {
            res.status(500).json(new errorResponse(err));
        });
    }

    static getAllRooms(req, res) {
        const mongoClient = req.app.get('mongoClient');
        const jwt = req.headers['x-access-token'];
        return RoomService.getAllRooms(mongoClient, jwt).then(result => {
            res.status(200).json(new successResponse(result));
        }).catch(err => {
            res.status(500).json(new errorResponse(err));
        });

    }

}
