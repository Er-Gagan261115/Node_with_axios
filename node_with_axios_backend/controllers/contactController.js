// async hadler in place of try catch block to handle error while dealing with database it is a middle ware and it will pass the error to errorhandler we have created
const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel.js");

const getAllContacts = asyncHandler(async (req, res) => {
   const contacts = await Contact.find({user_id:req.user.id});
   res.status(200).json(contacts)
})

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact)
   {
      res.status(404);
      throw new Error("Contact Not Found")
   }
   res.status(200).json({ "Details": contact })
})

const createContact = asyncHandler(async (req, res) => {
   console.log({ "request body": req.body })
   const { name, email, phone } = req.body;

   if (!name || !email || !phone) {
      res.status(400);
      throw new Error("missing field")

   }
   const contact = await Contact.create({
      name,
      email,
      phone,
      user_id:req.user.id
   })
   console.log(contact);
   res.status(201).json(contact)

})

const updateContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
   if(!contact)
   {
      res.status(404);
      throw new Error("Contact Not Found")
   }
   if(contact.user_id.toString()!== req.user.id)
   {
      res.status(400);
      throw new Error("User don't have permission to update")
   }
   const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
         new:true
      }
   )
   res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
   if(!contact)
   {
      res.status(404);
      throw new Error("Contact Not Found")
   }
   if(contact.user_id.toString()!== req.user.id)
   {
      res.status(400);
      throw new Error("User don't have permission to delete")
   }
   // await contact.d
    await contact.deleteOne({_id:req.params.id});
   res.status(200).json(contact);
})

module.exports = { getAllContacts, createContact, getContact, updateContact, deleteContact }
