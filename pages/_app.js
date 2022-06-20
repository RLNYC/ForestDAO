import React, { useState } from 'react';
import { Layout } from 'antd';
import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import "antd/dist/antd.css";

import Navbar from '../components/layout/Navbar';

const styles = {
  content: {
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "50px",
    padding: "10px",
  }
};

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState('');
  const [gContract, setGContract] = useState(null);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Navbar
        account={account}
        setAccount={setAccount}
        setGContract={setGContract} />
      <div style={styles.content}>
        <Component {...pageProps} account={account} gContract={gContract} />
      </div>
    </Layout>
  )
}

export default MyApp;
