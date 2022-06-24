import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import Sidebar from '../components/spin/Sidebar';
import SpinWheel from '../components/spin/SpinWheel';
import Winnings from '../components/spin/Winnings';

function Spin({ account, ticketContract, gContract }) {
  const [currentTab, setCurrentTab] = useState("Spin");
  const [myWinnings, setMyWinnings] = useState([]);

  let content;

  switch (currentTab) {
    case "Spin":
      content = <SpinWheel
        account={account}
        ticketContract={ticketContract}
        gContract={gContract}
        myWinnings={myWinnings}
        setMyWinnings={setMyWinnings} />;
      break;
    case "Winnings":
      content = <Winnings
        myWinnings={myWinnings} />;
      break;
    default:
      content = 'Page not found';
  }

  console.log(myWinnings, "myWinnings")

  return <div>
    <Layout width={1000}>
      <Layout.Sider
        width={210}
        className="white-bg-color"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      > 
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </Layout.Sider>
      <Layout className="white-bg-color" style={{ padding: '0 24px 24px', minHeight: '92vh' }}>
        <Layout.Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {content}
        </Layout.Content>
      </Layout>
    </Layout>
  </div>;
}

export default Spin;
