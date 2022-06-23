import React from 'react';
import { Menu } from 'antd';

function Sidebar({ currentTab, setCurrentTab }) {
  const handleClick = e => {
    console.log('click ', e);
    setCurrentTab(e.key);
  };

  return <Menu
    onClick={handleClick}
    selectedKeys={[currentTab]}
    defaultOpenKeys={['sub1']}
    mode="inline"
  >
    <p style={{ margin: '1.4rem 0 1.4rem 1.4rem', fontWeight: 'bold'}}>
      Governance
    </p>
    <Menu.Item key="Governance Tokens">
      Governance Tokens
    </Menu.Item>
    <Menu.Item key="Proposal">
      Proposal
    </Menu.Item>
  </Menu>;
}

export default Sidebar;
