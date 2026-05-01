import mongoose from 'mongoose';

const galleryCollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Collection title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  images: [{
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  }
}, {
  timestamps: true
});

const GalleryCollection = mongoose.models.GalleryCollection || mongoose.model('GalleryCollection', galleryCollectionSchema);

export default GalleryCollection;
