import { Utils } from 'alchemy-sdk';


export default function TokenCard({tokenDataObject, tokenBalance}){
   // console.log("token card",tokenDataObject);

    return (
        <>
        {tokenDataObject && 
            <div className="w-2/4 mx-auto bg-blue-400 rounded-md my-2 p-3 flex justify-between items-center px-10">
            <img className="rounded-full w-10 h-10"
             src={tokenDataObject.logo ? tokenDataObject.logo : '../../public/Token.png'} alt={tokenDataObject.symbol}/>
            <h3>{tokenDataObject.symbol}</h3>
            <h3 className="break-words w-1/3">{Utils.formatUnits(
                      tokenBalance,
                      tokenDataObject.decimals
                    )} {tokenDataObject.symbol}</h3>

        </div>
                }
        
        </>
    )
}