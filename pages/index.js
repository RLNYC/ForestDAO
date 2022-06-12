import React, { useState } from 'react';
import Web3 from 'web3';

const abi = [
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "_greeting",
              "type": "string"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "greet",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "_greeting",
              "type": "string"
          }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
];

const address = "0xB13318E45F727D6FCE72502106b63BAae1bFBBc3";

function App() {
  const [account, setAccount] = useState('');
  const [gContract, setGContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
      await loadBlockchain();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      await loadBlockchain();
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  const loadBlockchain = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const contract = await new web3.eth.Contract(abi, address);
    setGContract(contract);
    const greet = await contract.methods.greet().call();
    console.log(greet);
  }

  const setGreet = async () => {
    const res = await gContract.methods.setGreeting("Hi").send({ from: account });
    console.log(res);
  }

  return (
    <main>
      <h1>Celo Voting DApp</h1>
      <p>{address}</p>
      <button onClick={connectWallet}>Click here to connect your wallet</button>
      <button onClick={setGreet}>Set Greet</button>
    </main>
  )
}

export default App;