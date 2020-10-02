const mongoose = require("mongoose");

const Mixed = mongoose.Schema.Types.Mixed;

const ProductSchema = mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true
  },
  id: String,
  productId: String,
  productRefId: String,
  refId: String,
  ean: String,
  name: String,
  skuName: String,
  modalType: String,
  parentItemIndex: String,
  parentAssemblyBinding: String,
  assemblies: Mixed,
  priceValidUntil: String,
  tax: Number,
  price: Number,
  listPrice: Number,
  manualPrice: Mixed,
  sellingPrice: Number,
  rewardValue: Number,
  isGift: Boolean,
  additionalInfo: {
    brandName: String,
    brandId: String,
    offeringInfo: Mixed,
    offeringType: Mixed,
    offeringTypeId: Mixed
  },
  preSaleDate: Mixed,
  productCategoryIds: String,
  productCategories: Mixed,
  quantity: Number,
  seller: String,
  sellerChain: Mixed,
  imageUrl: String,
  detailUrl: String,
  components: Mixed,
  bundleItems: Mixed,
  attachments: Mixed,
  attachmentOfferings: Mixed,
  offerings: Mixed,
  priceTags: [
    {
      name: String,
      value: Number,
      rawValue: Number,
      isPercentual: Boolean,
      identifier: String
    }
  ],
  availability: String,
  measurementUnit: String,
  unitMultiplier: Number,
  manufacturerCode: Mixed
});

module.exports = mongoose.model("Product", ProductSchema);
