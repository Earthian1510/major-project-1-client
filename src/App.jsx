import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import Category from './features/category/Category'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <main >
      <Header />
      <ToastContainer />
      <Category />
      <LandingPage />
    </main>
  )
}

export default App