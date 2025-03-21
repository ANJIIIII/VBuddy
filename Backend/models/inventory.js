const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  recommendedDoses: {
    type: Number,
    required:true,
  },
  stockUnit: {
    type: Number,
    required: true,
  },
  itemType: {
    type: String,
    enum: ["disposable", "syringe"],
    required: true,
  },
  volumeML: {
    type: Number,
  },
  totalVolume: {
    type: Number,
  },
  unitCostPrice: {
    type: Number,
  },
  unitMinRetailPriceNGO: {
    type: Number,
  },
  unitMaxRetailPriceCustomer: {
    type: Number,
  },
  linkedSales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sales",
    },
  ],
});

module.exports = mongoose.model("Inventory", inventorySchema);
