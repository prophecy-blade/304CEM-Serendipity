const mongoose = require('mongoose');
const db = 'mongodb://nicole:abc123@ds217864.mlab.com:17864/nicolegalaxy';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to Galaxy database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  date: { type: String },
  explanation: { type: String },
  hdurl: { type: String },
  title: { type: String },
  url: { type: String }
});

const Galaxy = mongoose.model('Galaxy', schema, 'galaxyCollection');

module.exports = Galaxy;
