const db = require('../connects/db');

const getAllContacts = async (req, res) => {
  try {
    const dbInstance = db.getDB();
    const contacts = await dbInstance.collection('contacts').find({}).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

const getContactById = async (req, res) => {
  try {
    const dbInstance = db.getDB();
    const contact = await dbInstance.collection('contacts').findOne({ contactId: parseInt(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

module.exports = { getAllContacts, getContactById };