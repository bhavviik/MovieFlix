import React from "react"
import Header from "./Components/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopRated from "./Components/TopRated";
import Popular from "./Components/Popular";
import UpComing from "./Components/UpComing";
import Signin from "./Components/Signin&SignUp/Signin";
import Signup from "./Components/Signin&SignUp/Signup";
import WithoutNav from "./Components/WithoutNav";
import WithNav from "./Components/WithNav";
import MovieDetail from "./Components/MovieDetail";
import Explore from "./Components/Explore";
import SearchResult from "./Components/SearchResult";
import Profile from "./Components/Profile";
import Lists from "./Components/Lists";

function App() {

  return (
    <>
      {/* <BrowserRouter >
        <NavBar />
        <Routes>
          <Route path="/" element={<Header />}></Route>
          <Route path="/TopRated" element={<TopRated />}></Route>
          <Route path="/Popular" element={<Popular />}></Route>
          <Route path="/UpComing" element={<UpComing />} ></Route>
          <Route path="/Signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter> */}

      <BrowserRouter>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/Signin" element={<Signin />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
          </Route>
          <Route element={<WithNav />}>
            <Route path="/" element={<Header />}></Route>
            <Route path="/TopRated" element={<TopRated />}></Route>
            <Route path="/Popular" element={<Popular />}></Route>
            <Route path="/UpComing" element={<UpComing />} ></Route>
            <Route path='/MovieDetail' element={<MovieDetail />}></Route>
            <Route path='/Explore' element={<Explore />}></Route>
            <Route path="/SearchResult" element={<SearchResult />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/Lists" element={<Lists />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
