const mongoose = require("mongoose");
const db = require("../connects/db");
const Contact = require("../models/contactModel")(mongoose);
const { ObjectId } = require("mongoose").Types; // Import ObjectId

const getAllContacts = async (req, res) => {
  try {
    const contacts = await db.getDB().collection("contacts").find({}).toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const getContactById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const contact = await db
      .getDB()
      .collection("contacts")
      .findOne({ _id: ObjectId.createFromHexString(req.params.id) });
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const createContact = async (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: "Contact data is required!" });
    return;
  }
  const contact = new Contact(req.body);

  try {
    await contact.save();
    res.setHeader("Content-Type", "application/json");
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const updateContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    if (!await db.getDB()
        .collection("contacts")
        .findOneAndUpdate(
          { _id: ObjectId.createFromHexString(req.params.id) },
          { $set: req.body },
          {
            new: true,
            upsert: false,
          }))
    {
      return res.status(404).json({ error: "Contact not found" });
    }
    
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const deleteContact = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    if (!await db.getDB()
          .collection("contacts")
          .findOneAndDelete({ _id: ObjectId.createFromHexString(req.params.id) }))
    {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
