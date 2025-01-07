import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
import Category from './features/category/Category'

const App = () => {
  return (
    <main >
      <Header />
      <Category />
      <LandingPage />
    </main>
  )
}

export default App