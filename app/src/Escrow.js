import {ethers} from 'ethers';
import {approveByEscrowContractAddress} from './approve';

export default function Escrow({
  contract,
  arbiter,
  beneficiary,
  value,
  approved,
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {ethers.utils.formatEther(value)}&nbsp;ETH</div>
        </li>
        <li>
        <div> Escrow contract </div>
          <div>{contract}</div>
        </li>
        { approved ? <div className="complete">✓ It's been approved!</div> :
        <div
          className="button"
          id={contract}
          onClick={(e) => {
            e.preventDefault();

            approveByEscrowContractAddress(contract);
            
          }}
        >
          Approve
        </div>}
      </ul>
    </div>
  );
}
