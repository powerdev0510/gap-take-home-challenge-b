import { useState, useEffect } from 'react';
import { fetchImages } from '../services';
import Card from './Card';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [sortDir, setSortDir] = useState(1);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const loadImages = async () => {
    try {
      const data = await fetchImages({ query, sort: sortDir });
      setImages(data);
      if (data.length === 0) {
        setMessage("No images found.");
      } else {
        setMessage(null);
      }
      setError(null);
    } catch (e) {
      setError('Error while calling API.');
      setImages([]);
      setMessage(null);
    }
  }
  
  useEffect(() => {
    if (query.length > 0) {
      loadImages();
    }
  }, [sortDir]);
  const handleSearch = () => {
    if (query.length > 0) {
      loadImages();
    }
  }

  const toggleSort = () => {
    setSortDir(sortDir * (-1));
  }

  return (
    <div className="App">
      <h1>Gap Take-Home Challenge (Unsplash Images)</h1>
      <div className="tool-bar">
        <input className="search-input" type="text" value={query} onChange={e => setQuery(e.target.value)} />
        <button className="btn" onClick={handleSearch}>Search</button>
        <button className='btn' onClick={toggleSort}>Sort <i className={"fas fa-arrow-" + (sortDir === 1 ? 'down' : 'up')}></i></button>
      </div>
      {error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : (
        <div className="container">
          {images.map((image, idx) => (
            <Card key={idx} image={image} />
          ))}
        </div>
      )}
      {message && (
        <p className="message">{message}</p>
      )}

    </div>
  );
}

export default App;
