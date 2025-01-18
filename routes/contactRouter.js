const router = require('express').Router();
const contact = require('../controllers/contactController');

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Get all contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 */
router.get('/', contact.getAllContacts);

/**
 * @swagger
 * /contact/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the contact to retrieve
 *     responses:
 *       200:
 *         description: A contact object
 *       404:
 *         description: Contact not found
 */
router.get('/:id', contact.getContactById);

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', contact.createContact);

/**
 * @swagger
 * /contact/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 */
router.put('/:id', contact.updateContact);

/**
 * @swagger
 * /contact/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the contact to delete
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */
router.delete('/:id', contact.deleteContact);

module.exports = router;
