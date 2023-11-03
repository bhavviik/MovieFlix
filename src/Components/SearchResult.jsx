import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function SearchResult() {

    const location = useLocation();
    const state = location.state;

    const [movieData, setMovieData] = useState([]);
    

    const option = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWFiNThjYTQ2NjQ4YzRkOTY2YWFkM2Q5YWYyMzg2ZCIsInN1YiI6IjY1MjNmNTNjNzQ1MDdkMDBlMjEzYWYxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o0jIrBzscUCOP9mAERuXait3-UD8sDADG4jdTLteDa0'
        }
    };
    const SearchedMovie = async () => {
        let movies;
        if (state.searchData) {
            try {
                movies = await fetch(`https://api.themoviedb.org/3/search/movie?query=${state.searchData}`, option)
            }
            catch (err) {
                console.log('error getting movieDetails: ', err);
            }
            if (movies) {
                const parsedData = await movies.json();
                setMovieData(parsedData.results);
            }
        }
    }
    useEffect(() => {
        SearchedMovie()
    }, [])
    return (
        <>
            <div className='className="Main-TopRated-Div grid grid-cols-1 gap-5 gap-y-5 border-b border-gray-300 py-10 pb-10 md:grid-cols-2 lg:grid-cols-5'>
                {movieData.map((movie) => (
                    <Link
                        to='/MovieDetail'
                        state={{ movieid: movie.id }}
                    >
                        <div className="Movies-TopRated rounded-md border-black" key={movie.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.id}
                                className="h-[460px] w-[310px] rounded-lg object-cover "
                            />
                            <p className="mt-6 w-full px-2 text-xl font-bold font-semibold text-gray-900">{movie.title}</p>

                        </div>
                    </Link>
                ))}
            </div>

        </>
    )
}
