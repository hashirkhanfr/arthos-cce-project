import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBookDonation extends Document {
  donorName: string;
  email: string;
  phone: string;
  address: string;
  condition: string;
  quantity: number;
  pickupRequired: boolean;
  message?: string;
  createdAt: Date;
}

const BookDonationSchema = new Schema<IBookDonation>(
  {
    donorName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    condition: {
      type: String,
      required: true,
      enum: ["new", "good", "fair"],
    },
    quantity: { type: Number, required: true, min: 1 },
    pickupRequired: { type: Boolean, required: true, default: false },
    message: { type: String, trim: true },
  },
  { timestamps: true }
);

const BookDonation: Model<IBookDonation> =
  mongoose.models.BookDonation ??
  mongoose.model<IBookDonation>("BookDonation", BookDonationSchema);

export default BookDonation;
