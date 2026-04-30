import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  oldSlugs: [{
    type: String,
    trim: true,
    index: true
  }],
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  featuredImage: {
    type: String,
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title should not exceed 60 characters']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description should not exceed 160 characters']
    },
    keywords: [{
      type: String,
      trim: true
    }],
    ogImage: {
      type: String,
      default: null
    }
  },
  publishedAt: {
    type: Date,
    default: null
  },
  readTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Auto-generate slug from title before saving
blogSchema.pre('save', async function () {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

// Auto-generate excerpt if not provided
blogSchema.pre('save', async function () {
  if (!this.excerpt && this.content) {
    const plainText = this.content.replace(/<[^>]*>/g, '');
    this.excerpt = plainText.substring(0, 150) + '...';
  }
});

// Calculate read time based on content
blogSchema.pre('save', async function () {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const plainText = this.content.replace(/<[^>]*>/g, '');
    const wordCount = plainText.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
});

// Set publishedAt when status changes to published
blogSchema.pre('save', async function () {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
