import mongoose from "mongoose"
import { Schema } from "mongoose"

const OrderSchema = new Schema({
  product: [
    {
      productData: {
        type: Object,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  user: {
    username:{
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required : true,
      ref: 'User'
    }
  }
})

export default mongoose.model('Orders', OrderSchema)