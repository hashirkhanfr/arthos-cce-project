import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGallery extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  publicId: string;
  category: string;
  featured: boolean;
  takenAt?: Date;
  createdAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["events", "volunteers", "programs", "community", "other"],
    },
    featured: { type: Boolean, default: false },
    takenAt: { type: Date },
  },
  { timestamps: true }
);

const Gallery: Model<IGallery> =
  mongoose.models.Gallery ??
  mongoose.model<IGallery>("Gallery", GallerySchema);

export default Gallery;
