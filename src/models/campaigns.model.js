const DonationCounter = require('./donationCounter.model');

const CampaignStatus = {
  ACTIVE: 'Active',
  CANCELED: 'Canceled',
  FAILED: 'Failed',
};

// campaigns-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
function createModel(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const campaign = new Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      dacs: { type: [String] },
      reviewerAddress: { type: String, required: true, index: true },
      ownerAddress: { type: String, required: true, index: true },
      status: {
        type: String,
        require: true,
        enum: Object.values(CampaignStatus),
        default: CampaignStatus.ACTIVE,
      },
      commitTime: { type: Number },
      communityUrl: { type: String },

      // Counters
      peopleCount: { type: Number },
      donationCounters: [DonationCounter],
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('campaign', campaign);
}

module.exports = {
  CampaignStatus,
  createModel,
};
