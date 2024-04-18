# Decentralized Escrow Application

This is a deliverable for the 5th week assignment, decentralized escrow application, of the Ethereum development bootcamp, Alchemy University (alchemy.com/university).
An escrow is a service to arbitrate a trade, eg. sending an item to the buyer to the seller, by the third entity, which has a power to secure the buyer's payment until the agreement, eg. the item delivery, has indeed been fulfilled.
The seller may receive the payment only after it has been approved by the arbiter.
This project offers the following features to implement the escraw service through blockchain technology.

- Web app frontend
  - A depositor can deploy escrow smart contract, designating the beneficiary and the arbiter, sending the payment to the contract.
  - The arbiter can approve the paynent.
  - The beneficiary receives money from the contract after the approval.
- API server backend
  - Keeps the deployed escrow contracts
 
The following challenges, suggested by the alchemy university, are fulfilled.

- Challenge 1: Run the dApp on a Live Testnet
  - It runs on Sepolia testnet.
- Challenge 2: Stylize
  - Customized by means of bootstrap.
- Challenge 3: Wei to Ether Conversion
  - ETH used instead of wei.
- Challenge 4: Persistence
  - The backend does the job.
- Challenge 5: What else?
  - Contract emits another event for deployment.
 
There are some limitations for this moment.
The lifetime of the data persistency is only for the period the backend program is kept running.  Once the backend is shut down, the data is gone.
The backend works at localhost:8000 by default, and in order to change it, you need to modify the following source code.

- <code>api_server = "http://localhost:8000"</code> in <code>app/App.js</code>.
- <code>api.run(port=8000)</code> in <code>api/app.py</code>.

In order to start-up the frontend app,
```
% cd app
% npm start
```

To start-up the backend server,
```
% cd api
% python3 api.py
```
It requires python3 (>= 3.6.8), flask, and flask_cors installed.

## Frontend

The frontend is developed through ethers.js and react, and its source code is found in https://github.com/miyamok/escrow-hardhat/tree/main/app .

## Smart contract

The escrow smart contract is developed using Solidity, and the code is [https://github.com/miyamok/escrow-hardhat/blob/main/contracts/Escrow.sol](https://github.com/miyamok/escrow-hardhat/blob/main/contracts/Escrow.sol) .

## Backend

The backend is developed through python/flask, and the code is https://github.com/miyamok/escrow-hardhat/blob/main/api/app.py .
The following REST APIs are implemented.

### <code>/deploy?contract=&lt;address&gt;&depositor=&lt;address&gt;&arbiter=&lt;address&gt;&beneficiary=&lt;address&gt;&value=&lt;uint&gt;</code>

It creates a new data entry of an escrow contract.
Required parameters are the addresses of the contract, the depositor, the arbiter, and the beneficiary, and also the value deposited.

### <code>/list</code>

It gives the list of deployed escrow contracts.
Each entry has the boolean approval status in addition to the data given as the parameters to call the <code>deploy</code> method.

### <code>/approve?contract=&lt;address&gt;</code>

The approval status of the escrow contract goes true.
The address of the escrow contract is required as a parameter.

The rest of this document is just to keep the original README by alchemy.com .

# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

