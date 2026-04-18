import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDonation extends Document {
  donorName: string;
  email: string;
  phone: string;
  amount: number;
  currency: string;
  purpose: string;
  message?: string;
  transactionId?: string;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    donorName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, required: true, default: "BDT" },
    purpose: {
      type: String,
      required: true,
      enum: ["general", "education", "health", "food", "disaster-relief"],
    },
    message: { type: String, trim: true },
    transactionId: { type: String, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Donation: Model<IDonation> =
  mongoose.models.Donation ??
  mongoose.model<IDonation>("Donation", DonationSchema);

export default Donation;
