import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';

export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const api_server = "http://localhost:8000";

function serialize(obj) {
  var str = [];
  for(var p in obj)
     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  useEffect(() => {
    async function getEscrows() {
    const url = api_server + '/list';
    const dat = await fetch(url).then((res) => res.json());
    setEscrows(dat);
    }
    getEscrows();
  }, [])

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = ethers.utils.parseEther(document.getElementById('amount').value);
    const depositor = await signer.getAddress();
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);

    const escrow = {
      contract: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      depositor: depositor,
      approved: false,
    };

    setEscrows([...escrows, escrow]);

    const params = serialize(escrow);
    const url = api_server + '/deploy?' + params;
    fetch(url);
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
            return <Escrow key={escrow.contract} setter={setEscrows} escrows={escrows} {...escrow} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
