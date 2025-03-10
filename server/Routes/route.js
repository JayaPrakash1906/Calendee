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
router.get('/getreq', BiometricController.FetchBiometric);
router.post('/createreq', BiometricController.CreateBiometric);
router.put('/updatereq', BiometricController.UpdateBiometric);
router.delete('/deletereq/:id', BiometricController.DeleteBiometric);
router.get('/gettechreq', TechnicalController.FetchTechnical);
router.post('/createtechreq', TechnicalController.CreateTechnical);
router.put('/updatetechreq', TechnicalController.UpdateTechnical);
router.delete('/deletetechreq/:id', TechnicalController.DeleteTechnical);
router.get('/others', othersController);
router.post('/user/signup', signup);
router.post('/product/bill',getbill);

module.exports = router;