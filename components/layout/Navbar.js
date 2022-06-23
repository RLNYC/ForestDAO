import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Button } from 'antd';
import Web3 from 'web3';

import {
  TICKET_CONTRACT_ADDRESS,
  GOVTOKEN_CONTRACT_ADDRESS,
  ERC20_CONTRACT_ABI,
  FORESTDAO_CONTRACT_ABI,
  FORESTDAO_CONTRACT_ADDRESS
 }  from '../../helpers/contract';

const styles = {
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};

function Navbar({ account, setAccount, setGContract, setTicketContract, setVoteContract }) {
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

    const contract = await new web3.eth.Contract(FORESTDAO_CONTRACT_ABI, FORESTDAO_CONTRACT_ADDRESS );
    setGContract(contract);

    const contract2 = await new web3.eth.Contract(ERC20_CONTRACT_ABI, TICKET_CONTRACT_ADDRESS );
    setTicketContract(contract2);

    const contract3 = await new web3.eth.Contract(ERC20_CONTRACT_ABI, GOVTOKEN_CONTRACT_ADDRESS );
    setVoteContract(contract3);
  }

  return (
    <Layout.Header style={styles.header}>
      <p>Logo</p>
      <Menu
        theme="light"
        mode="horizontal"
        style={{
          display: "flex",
          fontSize: "17px",
          fontWeight: "500",
          marginLeft: "50px",
          width: "100%",
        }}
        defaultSelectedKeys={["landing"]}
      >
        <Menu.Item key="landing">
          <Link href="/">🏠 Home</Link>
        </Menu.Item>
        <Menu.Item key="buytree">
          <Link href="/buytree">🛒 Buy Trees</Link>
        </Menu.Item>
        <Menu.Item key="forestmap">
          <Link href="/forestmap">🗺️ Forest Map</Link>
        </Menu.Item>
        <Menu.Item key="governance">
          <Link href="/governance">🗳️ Governance</Link>
        </Menu.Item>
        <Menu.Item key="spin">
          <Link href="/spin">💫 Spin</Link>
        </Menu.Item>
      </Menu>
      <div style={styles.headerRight}>
      <Button
        style={{ margin: '0 1rem'}}
        type="primary"
        onClick={connectWallet}
      >
        { account ? account.substring(0, 7) + '...' + account.substring(35, 42) : "Connect to Wallet" }
      </Button>
      </div>
    </Layout.Header>
  )
}

export default Navbar;