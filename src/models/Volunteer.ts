import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVolunteer extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  age: number;
  occupation: string;
  motivation: string;
  availability: string;
  createdAt: Date;
}

const VolunteerSchema = new Schema<IVolunteer>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 16 },
    occupation: { type: String, required: true, trim: true },
    motivation: { type: String, required: true, trim: true },
    availability: {
      type: String,
      required: true,
      enum: ["weekdays", "weekends", "both"],
    },
  },
  { timestamps: true }
);

const Volunteer: Model<IVolunteer> =
  mongoose.models.Volunteer ??
  mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);

export default Volunteer;
