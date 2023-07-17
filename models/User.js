const { Schema, Types, model } = require("mongoose");
const { Thought } = require('./Thought')
const EMAIL_REGEX = /^.+@(?:[\w-]+\.)+\w+$/

var validateEmail = function(email) {
  return EMAIL_REGEX.test(email)
};

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
      minlength: 4,
      trimm: true,
    },
    email: {
      type: String,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [EMAIL_REGEX, 'Please fill a valid email address'],
      unique: true,
      maxlength: 50,
      minlength: 4,
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends?.length
})

const Users = model('user', userSchema)
module.exports = { Users };
