const express = require('express');
const app = express();
const axios = require('axios');
const Galaxy = require('./galaxy');
const Earth = require('./earth');
const Mars = require('./mars');
const Sign = require('./sign');
const apikey = 'LZIVIJBNvrWUMmEUTpzSrPsjXPfBfsdPGKqLWdaJ';
const astkey = 'D58e8Z3D121ff45ckcG77R2e117k3FM0a262bA2e';

//localhost:5000/getastronomy?date=Date
app.get('/getastronomy', (req, res) => {
  const date = req.query.date;
  const querystr = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apikey}`;

  axios
    .get(querystr)
    .then(response => {
      const galaxy = new Galaxy({
        date: response.data.date,
        explanation: response.data.explanation,
        hdurl: response.data.hdurl,
        title: response.data.title,
        url: response.data.url
      });
      if (!galaxy.date) {
        res.status(200).json('Not found');
        return;
      }
      galaxy
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// localhost:5000/getallastronomy
app.get('/getallastronomy', (req, res) => {
  Galaxy.find({})
    .sort([['_id', -1]])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// localhost:5000/deleteastronomy?date=Date
app.get('/deleteastronomy', (req, res) => {
  Galaxy.deleteOne({ date: req.query.date })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// localhost:5000/deleteall
app.post('/deleteall', (req, res) => {
  Galaxy.deleteMany()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// astronomy of the day functions end here

// localhost:5000/getnhats?des=Des
app.get('/getnhats', (req, res) => {
  const des = req.query.des;
  const querystr = `https://ssd-api.jpl.nasa.gov/nhats.api?des=${des}`;

  axios
    .get(querystr)
    .then(response => {
      const sign = new Sign({
        fullname: response.data.fullname,
        min_size: response.data.min_size,
        size_sigma: response.data.size_sigma,
        radar_snr_a: response.data.radar_snr_a,
        obs_end: response.data.obs_end,
        obs_start: response.data.obs_start,
        radar_obs_g: response.data.radar_obs_g
      });
      sign
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// localhost:5000/getallnhats
app.get('/getallnhats', (req, res) => {
  Sign.find({})
    .sort([['_id', -1]])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// localhost:5000/deletenhats?des=Des
app.get('/deletenhats', (req, res) => {
  Sign.deleteOne({ date: req.query.date })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
