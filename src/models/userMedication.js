import { Schema } from "mongoose";
import { model } from "mongoose";

const MedicationSchema = new Schema({
  id: {
    type: String,
  },
  nameMed: {
    type: String,
  },
  email: {
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
    required: true,
  },
  notes: {
    type: String,
  },
  medImg: {
    type: String,
  },
  show: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  uid: {
    type: String,
  },
  endDate: {
    type: Date,
  },
  doctor: {
    type: String,
  },
  reactions: {
    type: String,
  },
  takingPerDayOrWeek: {
    type: String,
  },
  totalTaken: {
    type: Number,
  },
});

const Medication = new model("Medication", MedicationSchema);
export default Medication;
