import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Select, Input, Button, Typography  } from 'antd';

function Proposal({ account, gContract }) {
  const [proposals, setProposals] = useState([]);
  
  useEffect(() => {
    if(gContract) getProposals();
  }, [gContract])

  async function getProposals() {
    try {
      const count = await gContract.methods.proposalCount().call();
      let temp = [];

      for(let i = 1; i <= count; i++){
        const proposal = await gContract.methods.listofProposal(i).call();
        console.log(proposal);
        temp.push(proposal);
      }

      setProposals(temp);
    } catch (error) {
      console.log(error);
    }
  }

  async function voteYes(id) {
    try {
      const txt = await gContract.methods.voteYes(id).send({ from: account });
      console.log(txt);
    } catch (error) {
      console.log(error);
    }
  }

  async function voteNo(id) {
    try {
      const txt = await gContract.methods.voteNo(id).send({ from: account });
      console.log(txt);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Proposal</h1>
      {proposals.map(p => (
        <Card style={{ display: "flex", alignItems: "center", margin: '1rem 0'}} key={p.id}>
          <div>
            <h2 style={{ fontWeight: "bold", marginBottom: 0, marginTop: "1rem"}}>
              Proposal #{p.id}
            </h2>
            <p style={{ fontSize: "1rem"}}>
              {p.detail}
            </p>
            <p>Your number of votes is 10.</p>
            <Button type="primary" onClick={() => voteYes(p.id)}>Yes</Button>
            <Button onClick={() => voteNo(p.id)}>No</Button>
            <p>5 spin tickets will be awarded for your vote.</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default Proposal;