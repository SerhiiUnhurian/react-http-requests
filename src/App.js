import React, { useState } from 'react';
import './App.css';
import MoviesList from './components/MoviesList';

function App() {
  const [movies, setMovies] = useState([]);

  const hanldeFetchMovies = async () => {
    const response = await fetch('https://swapi.dev/api/films');
    const data = await response.json();
    const transformedMovies = data.results.map(movieData => ({
      id: movieData.episode_id,
      title: movieData.title,
      releaseDate: movieData.release_date,
      openingText: movieData.opening_crawl,
    }));

    setMovies(transformedMovies);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={hanldeFetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
