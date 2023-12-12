const Quotation = require('../models/Quotation');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload  = multer({ storage: storage });

const {useCradl} = require('./cradlai');

const findCradlInfos = (pred, label) => {
    const maxObject =  pred
    .filter(p => p.label === label)
    .reduce((max, p) => p.confidence > max.confidence ? p : max, { confidence: -Infinity });
    return {
        value: maxObject.value,
        confidence: maxObject.confidence
    }
};

const registerQuotation = async (req, res) => {
    try {
        const groupId = 'essai2'; // Replace with dynamic data if needed
        const file = 'public/img/facture.pdf'; // Replace with dynamic data if needed

        const cradleResponse = await useCradl(file); // Wait for the promise to resolve
        const prediction = cradleResponse.predictions;

        const newQuotation = new Quotation({
            groupId: groupId,
            quotationNumber: findCradlInfos(prediction, 'invoice_id'),
            vatAmount: findCradlInfos(prediction, 'vat_amount'),
            quotationDate: findCradlInfos(prediction, 'invoice_date'),
            supplier: findCradlInfos(prediction, 'supplier_name'),
            totalAmount: findCradlInfos(prediction, 'total_amount'),
            fileUrl: file,
        });

        await newQuotation.save();


            // res.redirect('TODO')
    } catch(error) {
        console.log("error : ", error);
        // res.status(500).send("Erreur lors de l'enregistrement d'un devis.")
    }
};

module.exports = {registerQuotation};