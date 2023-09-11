const { Schema, model } = require('mongoose');

const gymUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  subscriptionRenewal: {
    type: Date,
    required: true
  },
  lastRenewal: {
    type: Date
  },
  imcRecord: {
    type: [Number]
  }
});

const GymUser = model('GymUser', gymUserSchema);

module.exports = GymUser;
