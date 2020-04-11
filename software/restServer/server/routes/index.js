// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.use('/users',)
// module.exports = router;

import express from 'express';
import LoginController from '../api/controller/login-controller';
const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login',LoginController.login)
export default router;