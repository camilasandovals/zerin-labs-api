import { Schema } from "mongoose";
import { model } from "mongoose";

const MedicationSchema = new Schema({
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
        type: Number,
        required: true
    }

})

const Medication = new model("Medication", MedicationSchema);
export default Medication;