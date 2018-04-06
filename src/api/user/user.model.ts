import { Schema, Document, model, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as uniqueValidator from "mongoose-unique-validator";
import * as mongoose from 'mongoose';

const SALT_WORK_FACTOR = 10;

let UserSchema: Schema = new Schema({
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
        default:'',
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

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });


});


interface UserSchemaDoc extends Document {
  comparePassword(pw, cb);
}

//interface UserSchemaInterface extends UserSchemaDoc {}

// method to compare password
UserSchema.methods = {
  comparePassword: function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
          return cb(err);
        }
        cb(null, isMatch); 
    });
  }
};



export default model<UserSchemaDoc>('User', UserSchema);