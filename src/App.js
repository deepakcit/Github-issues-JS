import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await axios.get(
          `https://api.github.com/repositories/1296269/issues?page=${page}&per_page=5`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(page);
  }, [page]);

  const loadPrev = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  const loadNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h2>Page: {page}</h2>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ol>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ol>
      )}
      <button id="load_prev" onClick={loadPrev}>
        Load Prev
      </button>
      <button id="load_next" onClick={loadNext}>
        Load Next
      </button>
    </div>
  );
}

export default App;