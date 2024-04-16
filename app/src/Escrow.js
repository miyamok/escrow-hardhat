import {ethers} from 'ethers';
import {approveByEscrowContractAddress} from './approve';

export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  approved,
//  handleApprove,
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
          <div>{address}</div>
        </li>
        { approved ? <div className="complete">✓ It's been approved!</div> :
        <div
          className="button"
          id={address}
          onClick={(e) => {
            e.preventDefault();

            // handleApprove();
            approveByEscrowContractAddress(address);
            
          }}
        >
          Approve
        </div>}
      </ul>
    </div>
  );
}
