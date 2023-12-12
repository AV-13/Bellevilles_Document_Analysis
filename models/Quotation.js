const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const quotationSchema = new Schema({
    quotationID: { type: ObjectId, ref: 'Quotation' },
    quotationNumber: {value: String, confidence: Number},
    groupId: { type: ObjectId, ref: 'Group' },
    vatAmount: {value: Number, confidence: Number},
    quotationDate: {value: String, confidence: Number},
    supplier: {value: String, confidence: Number},
    totalAmount: {value: Number, confidence: Number},
    fileUrl: String,
}, { timestamps: true });

const Quotation = mongoose.model("Quotation", quotationSchema);

module.exports = Quotation;
