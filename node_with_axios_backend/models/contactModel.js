const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"]
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
    },

},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("datacontacts", contactSchema);
// datacontacts is the collection name in mongodb and it must be plural