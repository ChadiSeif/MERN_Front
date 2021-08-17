const addcontact = async (req, res) => {
  try {
    const newcontact = req.body;
    const contactToAdd = new Contact(newcontact);

    const contacttofindemail = await Contact.findOne({
      email: newcontact.email,
    });
    const contacttofindname = await Contact.findOne({ name: newcontact.name });
    if (contacttofindemail || contacttofindname) {
      return res.status(400).send({ msg: "contact already exists" });
    }
    await contactToAdd.save();
    res.status(200).send({ msg: "user added successfully", contactToAdd });
  } catch (error) {
    res.status(400).send({ msg: "Sorry email validation failed" });
  }
};

module.exports = controllers = { addcontact };
