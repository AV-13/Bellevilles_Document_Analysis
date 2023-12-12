const Quotation = require('../models/Quotation');

const multer = require('multer');

const {useCradl} = require('./cradlai');

// quotationID: { type: ObjectId, ref: 'User' },
// quotationNumber: {value: String, confidence: Number},
// groupId: String,
// vatAmount: {value: Number, confidence: Number},
// quotationDate: {value: String, confidence: Number},
// supplier: {value: String, confidence: Number},
// totalAmount: {value: Number, confidence: Number},
// fileUrl: String,

const findCradlInfos = (label) => {
    return {
        value: prediction
        .filter(p => p.label === label)
        .reduce((max, p) => p.confidence > max.confidence ? p : max, { confidence: -Infinity }).value,
        confidence: prediction.find(p => p.label = 'invoice_id')?.confidence
        .reduce((max, p) => p.confidence > max.confidence ? p : max, { confidence: -Infinity }).confidence
    }
}

exports.registerQuotation = async (req, res) => {
    try {
        const { groupId } = req.body;
        const file =  'public/img/facture.pdf';
        const prediction = useCradl(file).then(res => {
            return res.predictions;
        });
        const newQuotation = new Quotation(
            {
                quotationNumber: findCradlInfos('invoice_id'),
            }
        )

    }
}