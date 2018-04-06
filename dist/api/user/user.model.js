"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt = require("bcrypt");
var uniqueValidator = require("mongoose-unique-validator");
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        default: ''
    },
    username: {
        type: String,
        unique: true,
        required: true,
        default: '',
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    updatedAt: {
        type: Date,
        default: new Date
    },
});
UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', function (next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))
        return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
//interface UserSchemaInterface extends UserSchemaDoc {}
// method to compare password
UserSchema.methods = {
    comparePassword: function (pw, cb) {
        bcrypt.compare(pw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    }
};
exports.default = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map