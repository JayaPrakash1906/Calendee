const express = require('express');
const router = express.Router();
const pool = require("../config/db");
const authController = require('../controller/authController');
const eventController = require('../controller/eventController');
const BiometricController = require('../controller/BiometricController');
const TechnicalController = require('../controller/TechnicalController');
const othersController = require('../controller/othersController');
const { EmailController } = require('../controller/MailController');




//router.get('/login', testController);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/create', eventController.CreateEvents);
router.get('/get', eventController.FetchEvents);
router.put('/update/:id', eventController.UpdateEvents);
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
router.post('/sendemail', EmailController);

module.exports = router;