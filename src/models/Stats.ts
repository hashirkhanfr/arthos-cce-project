import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStats extends Document {
  key: string;
  label: string;
  value: number;
  unit?: string;
  icon?: string;
  order: number;
  updatedAt: Date;
}

const StatsSchema = new Schema<IStats>(
  {
    key: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true, trim: true },
    value: { type: Number, required: true, default: 0 },
    unit: { type: String, trim: true },
    icon: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Stats: Model<IStats> =
  mongoose.models.Stats ?? mongoose.model<IStats>("Stats", StatsSchema);

export default Stats;
