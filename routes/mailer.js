const { Router } = require('express');
const { SendMailer } = require('../controllers/mailer');

const router = Router();


router.post('/', SendMailer)


module.exports = router;