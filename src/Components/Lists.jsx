import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Folder } from 'react-feather';
import { Link } from 'react-router-dom';

export default function Lists() {

  const [lists, setLists] = useState([]);
  const [listMovies, setListMovies] = useState([]);
  const [listMovieDetail, setListMovieDetails] = useState([]);
  const userID = localStorage.getItem('UserID');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWFiNThjYTQ2NjQ4YzRkOTY2YWFkM2Q5YWYyMzg2ZCIsInN1YiI6IjY1MjNmNTNjNzQ1MDdkMDBlMjEzYWYxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o0jIrBzscUCOP9mAERuXait3-UD8sDADG4jdTLteDa0'
    }
  };

  const getLists = async () => {
    if (userID) {
      await axios.post('http://localhost:3001/GetLists', { userID })
        .then(res => {
          setLists(res.data.data)
        })
        .catch((err) => console.log(err))
    }
  }

  const getListItem = async (e) => {
      setListMovies([]);
      setListMovieDetails([]);
      const listID = e.listID;

      await axios.post('http://localhost:3001/GetlistMovies', { listID: listID })
        .then(res => {
          setListMovies(res.data.data)
        })
        .then(
          getListMovieDetail
        )
        .catch((err) => console.log(err))
    
    
  }
  const getListMovieDetail = async () =>{
    
    Object.keys(listMovies).forEach(async function (key) {
      const listMovie = listMovies[key];
      if(listMovie)
      {
        try {
          const movie = await fetch(`https://api.themoviedb.org/3/movie/${listMovie.movieID}?language=en-US`, options);
          const movieData = await movie.json();
          if(movieData)
          {
              setListMovieDetails(pre => [...pre, movieData])
          }
        } catch (err) {
          console.log('error getting movieDetails: ', err);
        }
      }
    })
  }
  console.log(listMovieDetail)
  useEffect(() => {
    getLists();
  }, [])
  return (
    <>
      <p className='text-3xl font-extrabold ml-20 mt-20'>Your Lists</p>
      <div className='flex h-auto mt-5 mr-[18%] ml-[12%] border-2 border-black rounded-lg flex-wrap bg-gray-200'>
        {lists.map((listItem) => (
          <div className='flex m-5 p-5 bg-gray-400 rounded-lg'>
            <p className='mr-10 text-black'>{listItem.listName}</p>
            <button onClick={() => getListItem({ listID: listItem._id })}><Folder></Folder></button>
          </div>
        ))}
      </div>
      <div className='ListDetails mt-5 ml-[12%] mr-[18%]'>
          {listMovieDetail ? (<div>
            {listMovieDetail.map((movie) => (
              <Link to="/MovieDetail"
              state={{ movieid: movie.id }}
            >
              <div className='relative inline-flex mx-2'>
                <img className='w-[432px] z-[-1] h-full rounded-2xl' src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
                <p className='absolute text-lg font-extrabold mix-blend-exclusion text-white bottom-5 left-5'>{movie.title}</p>
              </div>
            </Link>
            ))}
          </div>) : (<div>

          </div>)}
      </div>
    </>
  )
}
