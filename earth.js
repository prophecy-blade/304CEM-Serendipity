const mongoose = require('mongoose');
const db = 'mongodb://nicole:abc123@ds217864.mlab.com:17864/nicolegalaxy';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to Earth database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  // cloud_score: { type: String },
  // date: { type: String },
  // service_version: { type: String },
  // url: { type: String }
  // links: { type: String }
  neo_reference_id: { type: String },
  name: { type: String },
  designation: { type: String },
  nasa_jpl_url: { type: String }
});

const Earth = mongoose.model('Earth', schema, 'earthCollection');

module.exports = Earth;
