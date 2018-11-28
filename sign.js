const mongoose = require('mongoose');
const db = 'mongodb://nicole:abc123@ds217864.mlab.com:17864/nicolegalaxy';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to Sign database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  fullname: { type: String },
  min_size: { type: String },
  size_sigma: { type: String },
  radar_snr_a: { type: String },
  obs_end: { type: String },
  obs_start: { type: String },
  radar_obs_g: { type: String }
});

const Sign = mongoose.model('Sign', schema, 'signCollection');

module.exports = Sign;
