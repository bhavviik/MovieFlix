import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import { Star } from 'react-feather'

export default function TopRated() {

  const [TopMovies, setTopMovies] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWFiNThjYTQ2NjQ4YzRkOTY2YWFkM2Q5YWYyMzg2ZCIsInN1YiI6IjY1MjNmNTNjNzQ1MDdkMDBlMjEzYWYxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o0jIrBzscUCOP9mAERuXait3-UD8sDADG4jdTLteDa0'
    }
  };

  const TrendingMovies = async () => {
    const MovieData = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    MovieData.json().then(json => {
      setTopMovies(json.results)
    })
  }

  useEffect(() => {
    TrendingMovies();
  })

  return (
    <>
      <div className='TopRated-Movies-Header'>
        <h1 className='TopRated-Movies-Title'>
          Top Rated Movies
        </h1>
      </div>


      <div className="Main-TopRated-Div grid grid-cols-1 gap-8 gap-y-6 border-b border-gray-300 py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
        {TopMovies.map((Movies) => (
          <Link to='/MovieDetail'
            state={{movieid : Movies.id}}
          >
            <div className="Movies-TopRated rounded-md border-black" key={Movies.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${Movies.poster_path}`}
                alt={Movies.id}
                className="h-[550px] w-[full] rounded-lg object-cover "
              />
              <p className="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">{Movies.title}</p>
              <p className="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
                {Movies.overview}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
