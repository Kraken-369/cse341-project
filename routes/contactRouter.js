const router = require('express').Router();
const contact = require('../controllers/contactController');
require('./contactSwagger');

router.get('/', contact.getAllContacts);
router.get('/:id', contact.getContactById);
router.post('/', contact.createContact);
router.put('/:id', contact.updateContact);
router.delete('/:id', contact.deleteContact);

module.exports = router;
