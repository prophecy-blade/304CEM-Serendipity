const mongoose = require('mongoose');
const db = 'mongodb://nicole:abc123@ds217864.mlab.com:17864/nicolegalaxy';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to Mars database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  photos: { type: String }
});

const Mars = mongoose.model('Mars', schema, 'marsCollection');

module.exports = Mars;
