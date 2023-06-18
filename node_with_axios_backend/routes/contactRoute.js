
const express = require('express');
const router = express.Router();

const {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require("../controllers/contactController");  
const validateToken = require('../midddleware/validataTokenHandler');

// for imposing validateroute on all users
router.use(validateToken)
//get all
router.get("/",getAllContacts)

//get one
router.get("/:id",getContact)

//post data
router.post("/",createContact)

//update data
router.put("/:id",updateContact)

//delete data
router.delete("/:id",deleteContact)
 
// also we can do is
// router.route('/').get(getAllContacts).post(createContact)
// router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;