import { useState } from 'react'
import Header from './components/Header';

import SearchBar from './components/SearchBar';
import './App.css'

function App() {


  return (
    <>
    <Header />
    <div className="bg-gray-300 pt-20 min-h-svh w-dvw flex flex-col  items-center">
     
    <h1 className="text-4xl mb-7 text-center font-thin font-mono">
    Check ERC Token balances here
    </h1>

    <SearchBar />
  </div>
  </>
  )
}

export default App
