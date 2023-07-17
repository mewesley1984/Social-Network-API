const { Schema, model } = require('mongoose');

// Schema to create a course model
const reactionSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: true,
  }
);

const Reaction = model('reaction', reactionSchema)

module.exports = { Reaction };
