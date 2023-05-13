import { Schema } from "mongoose";
import { model } from "mongoose";

const MedicationSchema = new Schema({
    id: {
        type: String
    },
    nameMed: {
        type: String,
        
    },
    dosage: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        required: true, 
    },
    unit: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    medImg: {
        type: String
    },
})

const Medication = new model("Medication", MedicationSchema);
export default Medication;