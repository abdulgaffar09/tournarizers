import express from 'express';
import RoomController from '../api/controller/room-controller';
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', RoomController.createRoom);
router.get('/room/:id', RoomController.getRoomInfo);
router.get('/get', RoomController.getAllRooms);
router.post('/update', RoomController.updateRoom);
export default router;