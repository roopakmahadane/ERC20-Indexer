import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ConnectWallet from './components/ConnectWallet';
import SearchBar from './components/SearchBar';
import './App.css'

function App() {
  const [address, setAddress] = useState("");

  return (
    <div className="bg-gray-300 h-svh w-dvw flex flex-col justify-center items-center">
    <h1 className="text-4xl text-center font-thin font-mono">
    Find your ERC Token balances here
    </h1>
    <ConnectWallet accountAddress={setAddress}/>
    <h3 className="mb-5">Or type the address below</h3>
    <SearchBar address={setAddress}/>
  </div>
  
  )
}

export default App
