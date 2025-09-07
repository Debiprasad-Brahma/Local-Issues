import React from 'react'
import Header from '../components/Header'
import Stats from '../components/Stats'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
        <Header />
        <Stats />
        <Footer />
      </div>
    </>
  )
}

export default Home
