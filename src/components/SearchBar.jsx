import { useState, useEffect } from "react"
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import TokenCard from "./tokenCard";

export default function SearchBar(){

    const [userAddress, setUserAddress] = useState(""); 
    const [results, SetResults] = useState([]);
    const [hasQueried, setHasQueried] = useState(false);
    const [tokenDataObjects, setTokenDataObjects] = useState([]);
    const [dataOfPage, setDataOfPage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentpage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(tokenDataObjects.length / itemsPerPage);

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDataOfPage(tokenDataObjects.slice(indexOfFirstItem, indexOfLastItem));
    console.log("Updated currentPage:", currentPage);
    }, [currentPage, tokenDataObjects])

   
    const updatePage = (direction) => {
        if(direction == "prev"){
            setCurrentpage(prev => Math.max(prev - 1, 1))
        }
        if(direction=="next"){
            
            setCurrentpage(prev => Math.min(prev + 1, totalPages))
            
        }
    }


    async function getTokenBalance(e) {
        e.preventDefault();
        setLoading(true);
        setHasQueried(false);
        const config = {
          apiKey: 'CF7OmE5L9FhgqVzJp65zcJA6p71UeRo_',
          network: Network.ETH_MAINNET,
        };
    
        const alchemy = new Alchemy(config);
        
        const data = await alchemy.core.getTokenBalances(userAddress);
    
        SetResults(data);
        console.log(results);
        const tokenDataPromises = [];
        
    
        for (let i = 0; i < data.tokenBalances.length; i++) {
          const tokenData = alchemy.core.getTokenMetadata(
            data.tokenBalances[i].contractAddress
          );
          tokenDataPromises.push(tokenData);
          
        }
        setTokenDataObjects(await Promise.all(tokenDataPromises))
        setHasQueried(true);
        setLoading(false);
        console.log("seacrg bar",tokenDataObjects);
        setDataOfPage(tokenDataObjects.slice(0, 10));
        console.log("DATA PER PAGE",dataOfPage);
      }

       

    return(
        <>
             <form onSubmit={getTokenBalance} class="w-2/4 mx-auto">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input onChange={e =>  setUserAddress(e.target.value)} value={userAddress} type="search" id="default-search" class="block w-full p-4 ps-10 text-sm  border border-black placeholder-black rounded-lg  focus:ring-yellow-500 focus:border-yellow-500" placeholder="Search Address" required />
            <button type="submit" class="text-black absolute end-2.5 bottom-2.5 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer font-medium rounded-lg text-sm px-4 py-2 border">Search</button>
        </div>
    </form>
        {loading && !hasQueried && <h3>Loading!!</h3>}
         {!loading && hasQueried && 
         results.tokenBalances.slice(((currentPage*itemsPerPage))-itemsPerPage, currentPage*itemsPerPage).map((e,i) => {
            return (
                <>
                <TokenCard key={i} tokenDataObject={dataOfPage[i]} tokenBalance={e.tokenBalance} id={e.id}/>    
                </>
            )})
            
         }

<div>
                <button onClick={() => updatePage("prev")} className="p-1 px-2 bg-blue-800 m-2 rounded-md text-white">Prev</button>
                <button onClick={() => updatePage("next")} className="p-1 px-2 bg-blue-800 m-2 rounded-md text-white">Next</button>
                </div>
        
        </>
       
    )
}