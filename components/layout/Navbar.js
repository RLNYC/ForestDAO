import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Button } from 'antd';

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

function Navbar() {
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
      </Menu>
      <div style={styles.headerRight}>
      <Button
        style={{ margin: '0 1rem'}}
        type="primary"
      >
        Connect to Wallet
      </Button>
      </div>
    </Layout.Header>
  )
}

export default Navbar;