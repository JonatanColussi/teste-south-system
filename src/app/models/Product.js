import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const ProductsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductsSchema.plugin(mongoosePaginate);

export default mongoose.model('Products', ProductsSchema);
