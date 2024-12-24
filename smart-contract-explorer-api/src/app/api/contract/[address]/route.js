import { ethers } from 'ethers';
import { NextResponse } from 'next/server';
import contractABI from './mycontract.json';  // ABI in src folder
const abi = contractABI.abi;
//console.log(abi)
//const contractAddress = '0xb19382073c7A0aDdbb56Ac6AF1808Fa49e377B75'
const contractAddress = '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06'
//const provider = new ethers.providers.AlchemyProvider("sepolia", "")
//const provider = new ethers.providers.JsonRpcProvider(
//  process.env.NEXT_PUBLIC_RPC_URL,
//        'sepolia'  
//);


const provider = new ethers.providers.InfuraProvider("sepolia", process.env.NEXT_PUBLIC_RPC_URL)
export async function GET(request, context) {
  try {

    //provider = blockNum()
      const addres1s = context.params.address;
      console.log("address", contractAddress)
      console.log(provider)
      
      // Validate address
      if (!ethers.utils.isAddress(contractAddress)) {
          return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
      }
      else{
        console.log("Valid address")
      }

      const checksumAddress = ethers.utils.getAddress(contractAddress);

      // Get contract data
      //const code = await provider.getCode(checksumAddress);
      const balance = await provider.getBalance(contractAddress);
      //const txCount = await provider.getTransactionCount(contractAddress);

      return NextResponse.json({
        checksumAddress,
          isContract: code !== '0x',
          balance: ethers.utils.formatEther(balance),
          //transactionCount: txCount,
          //bytecode: code
      });

  } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}