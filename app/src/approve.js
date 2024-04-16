import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import { setApprovedFlag } from './App';
import { useEscrowList, provider, api_server } from './App';

async function approve(escrowContract, signer) {
    // const gasLimitEstimate = await provider.estimateGas({
    //     to: escrowContract.address,
    //     data: "",
    //     value: ethers.utils.parseEther("0")

    // });
    // console.log(gasLimitEstimate);
    const approveTxn = await escrowContract.connect(signer).approve({gasLimit: 50000});
    await approveTxn.wait().then(async (receipt) => {
        if (receipt && receipt.status === 1) {
            fetch(api_server + '/approve/' + escrowContract.address);
        }});

}

export async function approveByEscrowContractAddress(a) {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const escrowContract = new ethers.Contract(a, Escrow.abi, signer);
    escrowContract.on('Approved', () => {
            document.getElementById(escrowContract.address).className =
              'complete';
            document.getElementById(escrowContract.address).innerText =
              "✓ It's been approved!";
          });
    await approve(escrowContract, signer);
    // export function setApprovedFlag(adr) {
    // const [escrows, setEscrows] = useEscrowList();
    // setEscrows(escrows.map((escrow) => escrow.address === adr
    // ?
    // {address: escrow.address, arbiter: escrow.arbiter, beneficiary: escrow.beneficiary, value: escrow.value, approved: true}
    // :
    // escrow));
}