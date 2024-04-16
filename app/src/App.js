import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';
import { approveByEscrowContractAddress } from './approve';

export const provider = new ethers.providers.Web3Provider(window.ethereum);

// export async function approve(escrowContract, signer) {
//   const approveTxn = await escrowContract.connect(signer).approve();
//   await approveTxn.wait();
// }

const deployedEscrows = localStorage.getItem("deployedEscrows");

function getDeployedEscrows() {
  if (deployedEscrows) {
    const p = JSON.parse(deployedEscrows);
    if (p.length === 0) {
      return [];
    } else {
      return p;
    }
  } else {
    return [];
  }
}

export function useEscrowList() {
  const [escrows, setEscrows] = useState(() => getDeployedEscrows());
  useEffect(() => {
    localStorage.setItem("deployedEscrows", JSON.stringify(escrows));
  }, [escrows]);
  return [escrows, setEscrows];
}

// export function setApprovedFlag(adr) {
//   const [escrows, setEscrows] = useEscrowList();
//   return escrows.map((escrow) => escrow.address === adr
//   ?
//   {address: escrow.address, arbiter: escrow.arbiter, beneficiary: escrow.beneficiary, value: escrow.value, approved: true}
//   :
//   escrow);
// }

function App() {
  const [escrows, setEscrows] = useState(() => getDeployedEscrows());
  //const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  //const [escrows, setEscrows] = useEscrowList();

  useEffect(() => {
    async function getAccounts() {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  useEffect(() => {
    localStorage.setItem("deployedEscrows", JSON.stringify(escrows));
  }, [escrows])

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = ethers.utils.parseEther(document.getElementById('amount').value);
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      approved: false,
      // handleApprove: async () => {
      //   escrowContract.on('Approved', () => {
      //     document.getElementById(escrowContract.address).className =
      //       'complete';
      //     document.getElementById(escrowContract.address).innerText =
      //       "✓ It's been approved!";
      //   });

      //   await approveByEscrowContractAddress(escrowContract, signer);
      // },
    };

    setEscrows([...escrows, escrow]);
  }

  return (
    <div className="container">
      <div className="row contract">
        <span className="fs-1">New Escrow Contract</span>
        <div className="row">
          <label>
            Arbiter Address
            <input className="form-control input-lg" type="text" id="arbiter" />
          </label>
          </div>
          <div className="row">
          <label>
            Beneficiary Address
            <input className="form-control input-lg" type="text" id="beneficiary" />
          </label>
          </div>
          <div className="row">
          <label>
            Deposit Amount (in ETH)
            <input className="form-control input-lg" type="text" id="amount" />
          </label>
        </div>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
      </div>
      <div className="row existing-contracts">
        <span className="fs-1">Existing Contracts</span>

        <div id="container">

          {escrows.length === 0 ? <span className="fs-5">No deployed contracts found</span> : escrows.map((escrow) => {
            return <Escrow key={escrow.address} setter={setEscrows} escrows={escrows} {...escrow} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
