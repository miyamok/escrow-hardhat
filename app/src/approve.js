import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import { setApprovedFlag } from './App';
import { useEscrowList, provider, api_server } from './App';

async function approve(escrowContract, signer) {
    const approveTxn = await escrowContract.connect(signer).approve({gasLimit: 50000});
    await approveTxn.wait().then(async (receipt) => {
        if (receipt && receipt.status === 1) {
            fetch(api_server + '/approve/' + escrowContract.address);
        }});

}

export async function approveByEscrowContractAddress(a) {
    const signer = provider.getSigner()
    const escrowContract = new ethers.Contract(a, Escrow.abi, signer);
    escrowContract.on('Approved', () => {
            document.getElementById(escrowContract.address).className =
              'complete';
            document.getElementById(escrowContract.address).innerText =
              "✓ It's been approved!";
          });
    await approve(escrowContract, signer);
}