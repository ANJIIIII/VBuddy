const mongoose = require('mongoose');
 
const visitSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    itemDetails: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Inventory',
          required: true,
        },
        dose: {
          type: Number,
          required: true,
          min: 1,
        },
        volumeML: {
          type: Number,
          min: 1,
        },
      },
    ],
    customerType: {
      type: String,
      enum: ['NGO', 'Customer'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    nextFollowUp: {
      type: Date,
      required: true,
    },
    followUpPurpose: {
      type: String,
      required:true
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model('Visit', visitSchema);
 