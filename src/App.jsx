import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Category from './components/Category'
import LandingPage from './components/LandingPage'

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