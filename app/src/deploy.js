import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';

export default async function deploy(signer, arbiter, beneficiary, value) {
  // const url = process.env.REACT_APP_SEPOLIA_URL;
  // const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  // const provider = new ethers.providers.JsonRpcProvider(url);
  // let wallet = new ethers.Wallet(privateKey, provider);
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  let deployed = await factory.deploy(arbiter, beneficiary, { value });
  return deployed;
}
