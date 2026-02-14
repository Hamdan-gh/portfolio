import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  collection: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

export default mongoose.model('Data', dataSchema);
