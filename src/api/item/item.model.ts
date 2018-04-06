import { Schema, model } from 'mongoose';

let ItemSchema: Schema = new Schema({
    id: {
      type: Number,
    },
    title: {
        type: String,
        required: true,
        unique: true
      },
    type: {
        type: String,
        required: true,
        default: ''
      },
    desc: {
        type: String,
        default:'',
      },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        default: ''
      },
    inStock: {
    type: Number,
    default: 0,
    required: true
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




export default model('Item', ItemSchema);