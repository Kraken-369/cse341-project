const router = require('express').Router();
const contact = require('../controllers/contactController');

router.get('/', contact.getAllContacts);

router.get('/:id', contact.getContactById);

module.exports = router;
