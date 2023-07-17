const { Schema, model } = require("mongoose");
const { Reaction } = require("./Reaction");

const thoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    reactions: [{ type: Schema.Types.ObjectId, ref: 'reaction' }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thoughts = model("thought", thoughtSchema);

module.exports = { Thoughts };
