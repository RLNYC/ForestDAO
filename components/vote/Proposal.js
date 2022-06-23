import React from 'react';
import { Card, Row, Col, Form, Select, Input, Button, Typography  } from 'antd';

function Proposal() {
  return (
    <div>
      <h1>Proposal</h1>
      <Card style={{ display: "flex", alignItems: "center", margin: '1rem 0'}}>
        <div>
          <h2 style={{ fontWeight: "bold", marginBottom: 0, marginTop: "1rem"}}>
            Proposal #1
          </h2>
          <p style={{ fontSize: "1rem"}}>
            Each governance token allows one vote on our proposals such where to build our forest. 
          </p>
          <p>Your number of votes is 10.</p>
          <Button type="primary">Yes</Button>
          <Button>No</Button>
          <p>5 spin tickets will be awarded for your vote.</p>
        </div>
      </Card>
    </div>
  )
}

export default Proposal;