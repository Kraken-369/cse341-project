const mongoose = require('mongoose');
const db = require('../connects/db');
const Contact = require('../models/contactModel')(mongoose);

const getAllContacts = async (req, res) => {
  try {
    const contacts = await db.getDB()
      .collection('contacts')
      .find({})
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

const getContactById = async (req, res) => {
  try {
    const contact = await db.getDB()
      .collection('contacts')
      .findOne({ contactId: parseInt(req.params.id) });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

const createContact = async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'Contact data is required!' });
    return;
  }
  console.log(req.body);
  const contact = new Contact(req.body);
  
  try {
    await contact.save();
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.toString() });
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact
};
