// var express = require('express');
// var router = express.Router();
// var UserController = require('../api/controller/user-controller');
import express from 'express';
import UserController from '../api/controller/user-controller'
const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getAllUsers', UserController.getAllUsers);
router.get('/:id/get', UserController.getUser);
router.post('/create', UserController.createUser);
router.post('/update', UserController.updateUser);


export default router;