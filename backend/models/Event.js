import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  image: {
    data: Buffer, // Store binary data
    contentType: String, // Store MIME type (image/png, image/jpeg, etc.)
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  category: {
    type: String,
    enum: ['academic', 'cultural', 'sports', 'technical', 'social'],
    default: 'academic'
  }
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);
