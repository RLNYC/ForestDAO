import React from 'react';
import { Button } from 'antd';

import {
  DollarCircleOutlined,
  FrownOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

function Wheel({ wheelclass }) {
  return (
    <div className="wheel">
      <div className="mainbox">
        <div className="arrow"></div>
        
        <div className={wheelclass}>
          <div className="box1">
            <span className="span1">
              <DollarCircleOutlined className="icon" />
            </span>
            <span className="span2">
              <DollarCircleOutlined className="icon" />
            </span>
            <span className="span3">
              <ProfileOutlined  className="icon" />
            </span>
            <span className="span4">
              <FrownOutlined className="icon" />
            </span>
          </div>
          <div className="box2">
            <span className="span1">
              <DollarCircleOutlined className="icon" />
            </span>
            <span className="span2">
              <DollarCircleOutlined className="icon" />
            </span>
            <span className="span3">
              <DollarCircleOutlined className="icon" />
            </span>
            <span className="span4">
              <ProfileOutlined className="icon" />
            </span>
          </div>
        </div>
        <button className="spin"></button>
          <Button className="primary-bg-color btn-spin" type="primary" size="large">
            SPIN (Cost 1 Ticket)
          </Button>
      </div>
    </div>
    
  )
}

export default Wheel;
