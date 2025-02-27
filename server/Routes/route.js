const express = require('express');
const router = express.Router();
const testController = require('../controller/userController');
const eventController = require('../controller/eventController');
const BiometricController = require('../controller/BiometricController');
const TechnicalController = require('../controller/TechnicalController');
const othersController = require('../controller/othersController');
const {signup,getbill} = require('../controller/mailController');



router.get('/login', testController);
router.post('/create', eventController.CreateEvents);
router.get('/get', eventController.FetchEvents);
router.put('/update', eventController.UpdateEvents);
router.delete('/delete/:id', eventController.DeleteEvents);
router.get('/getreq', BiometricController.getAllRequests);
router.post('/createreq', BiometricController.createRequest);
router.get('/gettechreq', TechnicalController.getAllRequests);
router.post('/createtechreq', TechnicalController.createRequest);
router.get('/others', othersController);
router.post('/user/signup', signup);
router.post('/product/bill',getbill);

module.exports = router;