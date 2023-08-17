const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5000;
const key = 'd56393c5dbmsh1fe807a7b0e4b52p1d79ddjsn35512a54fce6';
const key1= '8f26eecff1msh5fb17874cc3ec1cp1259f3jsne1a4bd11f2ba';
const key2='2e87ac32cfmshbbe7b492ebe9c20p12daf1jsnd4ad019388c7';
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
      'X-RapidAPI-Key': key,
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
      "X-RapidAPI-Key": key,
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
      "X-RapidAPI-Key": key,
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
      'X-RapidAPI-Key': key,
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

app.get('/get-lyric',async(req,res)=>{
  const id=req.query.id;
  const options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/lyrics',
    params: {
      trackId: id
    },
    headers: {
      'X-RapidAPI-Key': key,
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

app.get('/search-video',async(req,res)=>{
  const search=req.query.search;
  const options = {
    method: 'GET',
    url: 'https://youtube-media-downloader.p.rapidapi.com/v2/search/videos',
    params: {
      keyword: search
    },
    headers: {
      'X-RapidAPI-Key': key1,
      'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'
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
app.get('/get-video',async(req,res)=>{
  const id=req.query.id;
  const options = {
    method: 'GET',
    url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details',
    params: {
      videoId: id
    },
    headers: {
      'X-RapidAPI-Key': key1,
      'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'
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

const trendid=(data)=>{
  let videoid = [];
  data.map((video)=>{
    videoid.push(video.id)
  })
  return videoid;

}

app.get('/trend', async(req,res)=>{
  const options = {
    method: 'GET',
    url: 'https://youtube-trending.p.rapidapi.com/trending',
    params: {
      country: 'US',
      type: 'music'
    },
    headers: {
      'X-RapidAPI-Key': key2,
      'X-RapidAPI-Host': 'youtube-trending.p.rapidapi.com'
    }
   };
    
    try {
	    const response = await axios.request(options);
	    console.log(response.data);
      const videoid = trendid(response.data);
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
