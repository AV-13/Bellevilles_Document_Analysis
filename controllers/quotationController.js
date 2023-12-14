const Quotation = require('../models/Quotation');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload  = multer({ storage: storage });

const {useCradl} = require('./cradlai');


exports.getQuotationsByGroup = async (req, res) => {
    const { groupId } = req.query

    console.log('enfin chef !',req);
    try {
        const quotations = await Quotation.find({ groupId: groupId })
        .populate({
            path: "groupId",
          });
        res.status(200).json(quotations);
    } catch(error) {
        console.log("quotationController.getQuotationsByGroup : ", error);
    }
}
const findCradlInfos = (pred, label) => {
    const maxObject =  pred
    .filter(p => p.label === label)
    .reduce((max, p) => p.confidence > max.confidence ? p : max, { confidence: -Infinity }); 
    if (maxObject?.value) {
        return {
        value: maxObject.value,
        confidence: maxObject.confidence
        }
    } else {
        return {
            value: null,
            confidence: 0
        }
    }
};

function extractPublicPath(path) {
    const pathParts = path.split('\\');
    const publicIndex = pathParts.indexOf('public');
    if (publicIndex === -1) {
        return null;
    }
    return pathParts.slice(publicIndex).join('/');
}

exports.analyzeQuotation = async (req, res) => {
    try {
        const {filePath, groupId} = req.body;
        const newPath = extractPublicPath(filePath);
        const cradleResponse = await useCradl(newPath);
        const prediction = cradleResponse.predictions;

        const newQuotation = new Quotation({
            groupId: groupId,
            quotationNumber: findCradlInfos(prediction, 'invoice_id'),
            vatAmount: findCradlInfos(prediction, 'vat_amount'),
            quotationDate: findCradlInfos(prediction, 'invoice_date'),
            supplier: findCradlInfos(prediction, 'supplier_name'),
            totalAmount: findCradlInfos(prediction, 'total_amount'),
            fileUrl: newPath,
        });

        await newQuotation.save();
        res.status(200).json({ message: 'Quotation analyzed and saved successfully' });

    } catch(error) {
        console.log("error : ", error);
        res.status(500).json({ error: "Erreur lors de l'enregistrement d'un devis." });
    }
};

exports.getAllQuotations = async (req, res) => {

    try {
        const quotations = await Quotation.find()
        .populate({
            path: "groupId",
          });
        res.status(200).json(quotations);
    } catch(error) {
        console.log("quotationController.getAllQuotations : ", error);
    }
};