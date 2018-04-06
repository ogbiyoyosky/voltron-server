"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var OrderSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('Order', OrderSchema);
//# sourceMappingURL=order.model.js.map