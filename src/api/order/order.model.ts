import { Schema, model, Document } from 'mongoose';

let OrderSchema: Schema = new Schema({
    user: {
        type: Object,
        required: true,
        unique: true
      },
    items: {
        type: Array,
        required: true,
        default: []
    },
    createdAt: {
      type: Date,
      default: new Date
    },
    updatedAt: {
      type: Date,
      default: new Date
    },
    deletedAt: {
        type: Date,
    }, 
});

interface OrderSchemaDoc extends Document {}

export default model<OrderSchemaDoc>('Order', OrderSchema);