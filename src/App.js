import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import Page_not_found from './components/Page_not_found';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile'
import Notes_page from './components/Notes_page'
import './CSS/Notes.css'
import 'react-toastify/dist/ReactToastify.css';


import "../src/CSS/Profile.css"
import Brand_name from './components/Brand_name';


function App() {

  const [key, setkey] = useState(0)

  return (
    <>
      <BrowserRouter>

        {/* <M_top /> */}

        <Brand_name/>

        <ToastContainer position="top-right"
            autoClose={1600}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />

        <Routes>
        {localStorage.getItem("token") ? <Route exact path="/" element={<Notes_page key={key}  />} />
        : <Route exact path="/" element={<Login setkey={setkey} />} />}

          <Route exact path="/Login" element={<Login setkey={setkey} />} />

          <Route exact path="/Signup" element={<Signup />} />

          {localStorage.getItem("token") ? <Route exact path="/Profile" element={<Profile/>} />
        : <Route exact path="/Profile" element={<Login setkey={setkey} />} />}

          <Route path="*" element={<Page_not_found />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
