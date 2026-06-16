import React, { useState, useEffect } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genre");
  const [rate, setRate] = useState("All");

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error loading movies:", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRate(e.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGenre =
      genre === "All Genre" ||
      movie.genre.toLowerCase() === genre.toLocaleLowerCase();

    const movieRating = parseFloat(movie.rating);

    const matchesRating =
      rate === "All" ||
      (rate === "Excellent" && movieRating >= 8) ||
      (rate === "Good" && movieRating >= 7 && movieRating < 8) ||
      (rate === "Bad" && movieRating < 7);

    return matchesSearch && matchesGenre && matchesRating;
  });

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search Movie..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option value="All Genre">All Genre</option>
            <option value="horror">Horror</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="action">Action</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rate}
            onChange={handleRatingChange}
          >
            <option value="All">All</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Bad">Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MoviesGrid;
