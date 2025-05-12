const mongoose = require('mongoose');

const ParcelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupAddress: { type: String, required: true },
  address: { type: String, required: true }, // Delivery address
  contact: { type: String, required: true },
  recipientName: { type: String }, // Optional
  status: { type: String, enum: ['Pending', 'In Transit', 'Delivered'], default: 'Pending' },
  history: [{
    status: String,
    date: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Parcel', ParcelSchema);
