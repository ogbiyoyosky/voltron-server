"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ItemSchema = new mongoose_1.Schema({
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
        default: '',
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
exports.default = mongoose_1.model('Item', ItemSchema);
//# sourceMappingURL=item.model.js.map