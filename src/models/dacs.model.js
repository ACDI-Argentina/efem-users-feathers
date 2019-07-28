const DonationCounter = require('./donationCounter.model');

const DacStatus = {
  ACTIVE: 'Active',
  CANCELED: 'Canceled',
  FAILED: 'Failed',
};

// dacs-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
function createModel(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const dac = new Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      communityUrl: { type: String },
      status: {
        type: String,
        require: true,
        enum: Object.values(DacStatus),
        default: DacStatus.ACTIVE,
      },
      ownerAddress: { type: String, required: true, index: true },
      image: { type: String },

      // Counters
      donationCounters: [DonationCounter],
      peopleCount: { type: Number },
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('dac', dac);
}

module.exports = {
  DacStatus,
  createModel,
};
