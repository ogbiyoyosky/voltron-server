"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var bcrypt = require("bcrypt");
/** Schema of an user. */
var schema = new mongoose.Schema({
    email: { type: String, unique: true, uniqueCaseInsensitive: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: false }
});
schema.plugin(uniqueValidator);
schema.pre('save', function (next) {
    if (this._doc) {
        var doc_1 = this._doc;
        if (!doc_1.createdAt) {
            doc_1.createdAt = new Date();
        }
        // Encrypt the password
        bcrypt.hash(doc_1.password, 10, function (err, hash) {
            if (err)
                return next(err);
            console.log(hash);
            doc_1.password = hash;
            next();
        });
    }
    else {
        next();
        return this;
    }
});
exports.UserSchema = mongoose.model("Users", schema, "users");
//# sourceMappingURL=user.schema.js.map