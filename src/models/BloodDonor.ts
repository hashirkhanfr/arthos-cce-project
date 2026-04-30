import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBloodDonor extends Document {
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  age: number;
  address: string;
  lastDonationDate?: Date;
  medicalConditions?: string;
  status: string;
  createdAt: Date;
}

const BloodDonorSchema = new Schema<IBloodDonor>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    age: { type: Number, required: true, min: 18, max: 65 },
    address: { type: String, required: true, trim: true },
    lastDonationDate: { type: Date },
    medicalConditions: { type: String, trim: true },
    status: {
      type: String,
      default: "unread",
      enum: ["unread", "read"],
    },
  },
  { timestamps: true }
);

const BloodDonor: Model<IBloodDonor> =
  mongoose.models.BloodDonor ??
  mongoose.model<IBloodDonor>("BloodDonor", BloodDonorSchema);

export default BloodDonor;
