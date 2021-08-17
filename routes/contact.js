const express = require("express");
const router = express.Router();

/**
 * @desc: add new contact
 * @methode : POST
 * @path : http://localhost:7000/api/contacts/
 * @data : req.body
 */

//require model
const Contact = require("../Model/Contact");

/// Bodyparser Middleware
app.use(express.json());

///require controllers

const controllers = require(".././Controllers/contact.controllers");
router.post("/", controllers.addcontact);

/**
 * @desc: get user contact
 * @methode : get
 * @path : http://localhost:7000/api/contacts/:_id
 * @data : _id
 */

router.get("/:id", async (req, res) => {
  try {
    const contacttofind = req.params.id;
    const contactfound = await Contact.findOne({ _id: contacttofind });
    res.status(200).send({ msg: "here is the user you want", contactfound });
  } catch (error) {
    res.status(400).send({ msg: "No user is found" });
  }
});

/**
 * @desc: get all the contacts
 * @methode : get
 * @path : http://localhost:7000/api/contacts/
 * @data :
 */

router.get("/", async (req, res) => {
  try {
    const contactfound = await Contact.find();
    res.status(200).send({ msg: "here is the list of users", contactfound });
  } catch (error) {
    res.status(400).send({ msg: "No user is found" });
  }
});

/**
 * @desc: Delete the contacts
 * @methode : Delete
 * @path : http://localhost:7000/api/contacts/_id
 * @data : user id
 */

router.delete("/:id", async (req, res) => {
  try {
    const contacttodelete = req.params.id;

    ///test if user is found
    const isfound = await Contact.findOne({ _id: contacttodelete });
    if (!isfound) {
      res.status(404).send({ msg: "no user is found" });
    }

    const contactdeleted = await Contact.deleteOne({ _id: contacttodelete });
    res
      .status(200)
      .send({ msg: "contact deleted successfully", contactdeleted });
  } catch (error) {
    res.status(400).send({ msg: "No user is found" });
  }
});

/**
 * @desc: Update contact
 * @methode : Update
 * @path : http://localhost:7000/api/contacts/_id
 * @data : user id
 */

router.put("/:id", async (req, res) => {
  try {
    const contactid = req.params.id;
    const newcontactup = req.body;
    ///test if update is already done ;

    const result = await Contact.updateOne(
      { _id: contactid },
      { $set: { ...newcontactup } }
    );
    if (result.nModified === 0) {
      res.status(400).send({ msg: "contact alreaduy updated" });
    }
    res.status(200).send({ msg: "contact updated successfully", result });
  } catch (error) {
    res.status(400).send({ msg: "No user is updated" });
  }
});

module.exports = router;
