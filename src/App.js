import React, { useEffect, useState } from 'react';
import './App.css';
import AddMovie from './components/AddMovie';
import MoviesList from './components/MoviesList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMovies = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const loadedMovies = [];

      for (const [id, movie] of Object.entries(data)) {
        loadedMovies.push({
          id,
          ...movie,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleFetchMovies = () => loadMovies();
  const handleAddMovie = async movie => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://next-starter-bc9e6-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
        {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setMovies(prevMovies => [movie, ...prevMovies]);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  let content = <p>No movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={handleAddMovie} />
      </section>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
