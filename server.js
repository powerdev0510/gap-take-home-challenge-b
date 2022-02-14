const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const ACCESS_KEY = 'sgbkayD1zdkvC68yaLACusjZp7jF3-owd2nbFY78txs';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.post('/api/search', async (req, res) => {

  try {
    const { query, sort } = req.body;
    const url = `https://api.unsplash.com/search/photos?query=${query}`;
    const config = {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`
      }
    };
    const response = await axios.get(url, config);
    const results = response.data.results;
    let data = results.map(item => ({ imageUrl: item.urls.regular, likes: item.likes }));
    if (sort === -1) {
      data = data.sort((a, b) => a.likes - b.likes);
    } else {
      data = data.sort((a, b) => b.likes - a.likes);
    }

    res.json(data);

  } catch (e) {
    res.status(500).json(e.message);
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
