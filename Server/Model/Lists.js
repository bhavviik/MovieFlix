const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema({
    listName: String,
    userID: String
})

const ListModel = mongoose.model("Lists",ListSchema)
module.exports = ListModel