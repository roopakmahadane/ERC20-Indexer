import { useState, useEffect } from "react";
import {ethers} from 'ethers';


export default function ConnectWallet({accountAddress}){
    const [loading, setLoading] = useState(false);

    const handleClick = async() => {
        setLoading(true);
       if(window.ethereum){
        try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts",[]);
            accountAddress(accounts[0]);
            setLoading(false);
        }catch(err){
            console.log(err, "User rejected connection");
            setLoading(false);
        }
       }
    }
        

    return (
       <>
        {loading ? (
        <button disabled={loading} onClick={handleClick} className=" bg-yellow-400 w-max rounded-md p-2 m-5 hover:bg-yellow-300 cursor-not-allowed" >Connecting...</button>
         )
        :
        (     <button disabled={loading} onClick={handleClick} className="bg-yellow-400 w-max rounded-md p-2 m-5 hover:bg-yellow-300 hover:cursor-pointer" >Connect Wallet</button>
        )}
       </>
    )

}