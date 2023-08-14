const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from http://localhost:3000

app.get('/get-audio', async (req, res) => {
  const search = req.query.music;
  console.log(search);
  const options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud',
    params: {
      track: search
    },
    headers: {
      'X-RapidAPI-Key': '7853b13684mshdc75038438fbc40p1a797cjsn66b784385c19',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).send({
      message: 'Fetched successfully',
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'An error occurred',
      success: false,
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
