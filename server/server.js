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
      'X-RapidAPI-Key': '8f26eecff1msh5fb17874cc3ec1cp1259f3jsne1a4bd11f2ba',
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

app.get('/get-tracks',async(req,res)=>{
  const id = req.query.ids;
  const options = {
    method: "GET",
    url: "https://spotify-scraper.p.rapidapi.com/v1/album/tracks",
    params: { 
      albumId: id
    },
    headers: {
      "X-RapidAPI-Key": '8f26eecff1msh5fb17874cc3ec1cp1259f3jsne1a4bd11f2ba',
      "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com"
    }
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
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
})

app.get('/album-metadata',async(req,res)=>{
  const id = req.query.ids;
  const options = {
    method: "GET", 
    url: "https://spotify-scraper.p.rapidapi.com/v1/album/metadata",
    params: {
      albumId: id 
    },
    headers: {
      "X-RapidAPI-Key": "8f26eecff1msh5fb17874cc3ec1cp1259f3jsne1a4bd11f2ba",
      "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com"
    } 
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
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
})

app.get('/search',async(req,res) =>{
  const search = req.query.search;
  console.log(search)
  const options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/search',
    params: {term: search},
    headers: {
      'X-RapidAPI-Key': '8f26eecff1msh5fb17874cc3ec1cp1259f3jsne1a4bd11f2ba',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
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

})


app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
