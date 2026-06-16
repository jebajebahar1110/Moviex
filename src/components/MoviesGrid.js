import React, { useState, useEffect } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error loading movies:", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm (e.target.value)
  }
  
  const filteredMovie = movies.filter(
    (movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search Movie..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="movies-grid">
        {filteredMovie.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MoviesGrid;