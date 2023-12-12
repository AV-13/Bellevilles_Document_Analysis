const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const groupSchema = new Schema({
    groupId: { type: ObjectId, ref: 'Group' },
    groupName: String,
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
