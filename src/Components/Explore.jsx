import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Explore() {

    const [movieGenre, setMovieGenre] = useState([]);
    const [movies, setMovies] = useState([]);
    const [genreid, setGenreId] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWFiNThjYTQ2NjQ4YzRkOTY2YWFkM2Q5YWYyMzg2ZCIsInN1YiI6IjY1MjNmNTNjNzQ1MDdkMDBlMjEzYWYxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o0jIrBzscUCOP9mAERuXait3-UD8sDADG4jdTLteDa0'
        }
    };
    const MovieDetail = async () => {

        let MovieGenreList;
        let TrendingMovie;
        try {
            MovieGenreList = await fetch('https://api.themoviedb.org/3/genre/movie/list', options);
        } catch (e) {
            console.log('error fetching MovieData: ', e);
        }
        if (MovieGenreList) {
            const parsedData = await MovieGenreList.json();
            setMovieGenre(parsedData.genres)
        }
        if (genreid.length !== 0) {
            const genreConverted = genreid.join();
            try {
                TrendingMovie = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreConverted}`, options);
            }
            catch (e) {
                console.log('Error Fetching Movies')
            }
            if (TrendingMovie) {
                const parsedMovies = await TrendingMovie.json();
                setMovies(parsedMovies.results)
            }

        }
        else {
            try {
                TrendingMovie = await fetch('https://api.themoviedb.org/3/trending/movie/week', options);
            }
            catch (e) {
                console.log('Error Fetching Movies')
            }
            if (TrendingMovie) {
                const parsedMovies = await TrendingMovie.json();
                setMovies(parsedMovies.results)
            }

        }
    }

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    function handleChange(event) {

        MovieDetail()
        const { value, checked } = event.target

        if (checked) {
            setGenreId(pre => [...pre, value])
        }
        else {
            setGenreId(pre => {
                return [...pre.filter(skill => skill !== value)]
            })
        }
    }

    useEffect(() => {
        MovieDetail()
    }, [])
    return (
        <>
            <div className='flex item-center mt-5'>
                <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100 mt-2' onClick={slideLeft} size={40} />
                <div id='slider' className='slider w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth no-scrollbar'>
                    {movieGenre.map((MovieNumbers) => (
                        <div className='Genre-Buttons inline-flex overflow-x-scroll scroll whitespace-nowrap scroll-smooth no-scrollbar'>
                            <label className='mt-2 ml-2'>
                                <input
                                    type='checkbox'
                                    //className='bg-black inline-flex items-center justify-center hover:bg-white w-auto hover:text-black border-solid border-2 border-black text-white font-bold py-2 px-4 rounded-full mt-10 m-2'
                                    value={MovieNumbers.id}
                                    onChange={handleChange}
                                    onClick={MovieDetail}
                                />
                                <span>
                                    {MovieNumbers.name}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
                <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100 mt-2' onClick={slideRight} size={40} />
            </div>
            <div className='className="Main-TopRated-Div grid grid-cols-1 gap-5 gap-y-5 border-b border-gray-300 py-10 pb-20 md:grid-cols-2 lg:grid-cols-5'>
                {movies.map((moviesData) => (
                    <Link
                        to='/MovieDetail'
                        state={{ movieid: moviesData.id }}
                    >
                        <div className="Movies-TopRated rounded-md border-black" key={moviesData.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${moviesData.poster_path}`}
                                alt={moviesData.id}
                                className="h-[460px] w-[310px] rounded-lg object-cover "
                            />
                            <p className="mt-6 w-full px-2 text-xl font-bold font-semibold text-gray-900">{moviesData.title}</p>

                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
