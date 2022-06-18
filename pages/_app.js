import { Layout } from 'antd';
import '../styles/globals.css';
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
  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Navbar />
      <div style={styles.content}>
        <Component {...pageProps} />
      </div>
    </Layout>
  )
}

export default MyApp;
