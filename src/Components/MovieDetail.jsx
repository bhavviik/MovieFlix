import React, { useEffect, useState } from 'react'
import { ChevronsRight,DollarSign, Star, X, Trash, Plus } from 'react-feather'
import { useLocation, Link } from 'react-router-dom'
import Popup from 'reactjs-popup';
import axios from 'axios';

export default function MovieDetail() {

  const [movieDetails, setMovieDetails] = useState([]);
  const [topCast, setTopCast] = useState([]);
  const [genres, setGenres] = useState([]);
  const [lists, setLists] = useState([]);
  const userID = localStorage.getItem('UserID');
  const location = useLocation()
  const state = location.state;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWFiNThjYTQ2NjQ4YzRkOTY2YWFkM2Q5YWYyMzg2ZCIsInN1YiI6IjY1MjNmNTNjNzQ1MDdkMDBlMjEzYWYxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o0jIrBzscUCOP9mAERuXait3-UD8sDADG4jdTLteDa0'
    }
  };

  const MovieDetail = async () => {
    let movie;
    let CastDetails
    if (state.movieid) {
      try {
        movie = await fetch(`https://api.themoviedb.org/3/movie/${state.movieid}?language=en-US`, options);
      } catch (err) {
        console.log('error getting movieDetails: ', err);
      }

      if (movieDetails) {
        const parsedData = await movie.json();
        setMovieDetails(parsedData);
        setGenres(parsedData.genres)
      }

      try {
        CastDetails = await fetch(`https://api.themoviedb.org/3/movie/${state.movieid}/credits`, options);
      } catch (err) {
        console.log('error getting CastDetails: ', err);
      }

      if (CastDetails) {
        const CastData = await CastDetails.json();
        const topcastSliced = CastData.cast;
        setTopCast(topcastSliced.slice(0, 5));
      }
    }
  }
  const getLists = async () => {
    if (userID) {
      await axios.post('http://localhost:3001/GetLists', { userID })
        .then(res => {
          setLists(res.data.data)
        })
        .catch((err) => console.log(err))
    }
  }

  function CreateList() {

    var ListDiv = document.getElementById("CreateList-div");
    var buttonDiv = document.getElementById("CreateList-Button-Div");
    var listName = document.getElementById("CreateListInputBox").value;

    if (ListDiv.style.display === "block") {
      if (listName) {
        axios.post('http://localhost:3001/CreateList', { listName, userID })
          .then(result => {
            ListDiv.style.display = "none"
            buttonDiv.style.display = "block"
            listName = '';
            getLists();
          })
          .catch(err => console.log(err))
      }
      else {
        ListDiv.style.display = "none"
        buttonDiv.style.display = "block"
      }
    }
  }

  function deleteList(e) {
    const listID = e.listID;
      axios.delete('http://localhost:3001/deleteList/'+listID)
      .then(result => {
        getLists();
      })
      .catch((err) => console.log(err))
  }
  function addMovieTolist(e) {
    const movieID = e.movieID;
    const listID = e.listID;
    axios.post('http://localhost:3001/AddMovieToList', { listID, movieID })
      .then(result => {
        console.log(result)
        if (result.data === "Success") {
          document.getElementById("MovieAddedAlert").style.cssText = `
              display : block;
          `;
          setTimeout(hideAlert, 5000)
        }

      })
      .catch((err) => console.log(err))
  }
  function hideAlert(){
    const SuccessMsg = document.getElementById("MovieAddedAlert");
    SuccessMsg.style.display = "none";
  }

  function CreateListButton() {
    var buttonDiv = document.getElementById("CreateList-Button-Div");
    var ListDiv = document.getElementById("CreateList-div");
    if (buttonDiv.style.display === "none") {
      buttonDiv.style.display = "block";
    }
    else {
      buttonDiv.style.display = "none";
      ListDiv.style.display = "block";
    }
  }

  useEffect(() => {
    MovieDetail()
    getLists()
  }, [])

  return (
    <>
      <section className="Main-Header-Div">

        <>
          <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} key={movieDetails.id} className="MainPoster" />
          <div className='Header-Movie-Details flex flex-col'>
            <h2 className="MovieTitle">{movieDetails.title}</h2>
            <h2 className=' mt-2'><b>{movieDetails.tagline}</b></h2>
            <div className='MovieRating'>
              <div className='mx-8'>
                <p> <Star color='gold' /> </p> <b><p className='m-4'> {movieDetails.vote_average} / 10 </p></b>
              </div>
              <div>
                <p><b>{movieDetails.runtime} Mins / {movieDetails.release_date} / {movieDetails.original_language}</b></p>
              </div>
            </div>
            <p className='text-xl font-bold'>Movie Genre</p>
            <div className='flex flex-row'>

              {genres.map((genreItem) => (

                <div className='flex mx-10 my-5'>
                  <img width="40" height="40" src={`./src/assets/Images/${genreItem.name}.png`} alt="Genre Icon" /><p className='text-xl font-bold ml-5'>{genreItem.name}</p>
                </div>
              ))}
            </div>
            <h2 className='text-xl underline'><b>Overview </b></h2>
            <h1 className='MovieOverView text-left'>{movieDetails.overview}</h1>

            <p className='font-black font-semibold text-2xl mt-4'><b>Top Cast</b></p>
            <div className='Container-TopCast'>
              <div className='Cast-Card'>
                {topCast.map((casts) => (

                  <div className='h-[260px] w-[200px] mx-3 mt-5 '>
                    <img src={`https://image.tmdb.org/t/p/w500/${casts.profile_path}`} className='rounded-md h-full w-full object-cover' />
                    <div>
                      <h1 className="text-xs font-semibold text-black">Character Name - {casts.character}</h1>
                      <h1 className="text-xs font-semibold text-black">Original Name - {casts.original_name}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-around mt-14 text-xl font-bold'>
              <div className='flex mx-10'>
                Budget -
                <DollarSign color='Green'></DollarSign>{movieDetails.budget}
              </div>
              <div className='flex mx-10'>
                Revenue -
                <DollarSign color='green'></DollarSign>{movieDetails.revenue}
              </div>
              {userID ? (<div>
                <Popup trigger={<button className="bg-black hover:bg-white hover:text-black border-solid border-2 border-black text-white font-bold py-2 px-4 rounded-full mx-4">Add To List</button>} position="top left">
                  {close => (
                    <div>
                      <div
                        className="m-auto my-5 w-screen max-w-sm bg-white rounded-lg border border-black p-4 pt-4 shadow-sm sm:p-6 lg:p-8"
                        aria-modal="true"
                        role="dialog"

                      >
                        <button className="relative ml-auto block text-gray-600 transition hover:scale-110" onClick={close}>
                          <span className="sr-only">Close cart</span>
                          <X size={24} />
                        </button>
                        <div className='CreateList-Form hidden' id='CreateList-div'>
                          <input
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder="Enter List Name"
                            id="CreateListInputBox"
                          ></input>
                          <button
                            type="button"
                            className="w-full rounded-md bg-black mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={CreateList}
                          >
                            Create New List
                          </button>
                        </div>
                        <div id='CreateList-Button-Div'>
                          <button
                            type="button"
                            className="w-full rounded-md bg-black mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={CreateListButton}
                          >
                            Create New List
                          </button>
                        </div>
                        <div className="mt-6 space-y-6 ">
                          <div className='overflow-auto scroll no-scrollbar h-[300px] border-2 border-black rounded-lg bg-gray-200'>
                            <ul className="space-y-4">
                              {lists.map((listItem) => (
                                <li key={listItem._id} className="flex items-center gap-4">
                                  <div className='flex w-[300px] justify-between m-1'>
                                    <p className='text-xl ml-2 font-bold flex w-[200px]'>{listItem.listName}</p>
                                    <div className='pt-1'>
                                      <button className='mr-2' onClick={() => deleteList({listID:listItem._id})}><Trash size={20}></Trash></button>
                                      <button onClick={() => addMovieTolist({listID : listItem._id, movieID: movieDetails.id})}><Plus size={20}></Plus></button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-4 text-center">
                            <Link
                              to="/Lists"
                              className="inline-block text-sm text-black transition hover:text-gray-700 hover:underline hover:underline-offset-4"
                            >
                              View All Lists &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </Popup>
              </div>) : (<div>
                <Link to='/Signin'
                >
                  <button className="bg-black hover:bg-white hover:text-black border-solid border-2 border-black text-white font-bold py-2 px-4 rounded-full mx-4">Add To List</button>
                </Link>
              </div>)}
            </div>
            <div className="hidden absolute top-[6%] left-[40%] text-center py-4 lg:px-4" id='MovieAddedAlert'>
                <div className="p-2 bg-gray-600 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                  <span className="flex rounded-full bg-black uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
                  <span className="font-semibold mr-2 text-left flex-auto">Movie added successfully to the list . . . . . </span>
                  <ChevronsRight></ChevronsRight>
                </div>
              </div>

            {/* <span className='Button-Group-Main-header mt-10'>
                            <Link to='/MovieDetail'
                                state={{ movieid: movieDetails.id }}
                            >
                                <button className="bg-black hover:bg-white hover:text-black border-solid border-2 border-black text-white font-bold py-2 px-4 rounded-full mt-10 mx-4">View Detail</button>
                            </Link>
                            <button className="bg-black hover:bg-white hover:text-black border-solid border-2 border-black text-white font-bold py-2 px-4 rounded-full mt-10 mx-4">Add To List</button>
                        </span> */}
          </div>

        </>
      </section>


    </>
  )
}
