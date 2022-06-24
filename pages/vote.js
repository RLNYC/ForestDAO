import React, { useEffect, useState } from 'react';
import { Collapse, Divider, Input, Button } from 'antd';

const styles = {
  container: {
    margin: "20px auto",
    maxWidth: "1000px",
  },
}

function Vote({ account, gContract }) {
  const [detail, setDetail] = useState("");
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    if(gContract) getProposals();
  }, [gContract])
  
  async function getProposals() {
    try {
      let i = 1;
      let temp = [];

      while(i){
        const proposal = await gContract.methods.listofProposal(i).call();
        console.log(proposal);
        if(proposal.detail === "") break;
        temp.push(proposal);
        i++;
      }

      setProposals(temp);
    } catch (error) {
      console.log(error);
    }
  }

  async function createProposals() {
    try {
      const txt = await gContract.methods.createProposal(detail).send({ from: account });
      console.log(txt);
    } catch (error) {
     
    }
  }

  const onChange = (key) => {
    console.log(key);
  };


  return (
    <div style={styles.container}>
      <p>Create Proposal</p>
      <Input.TextArea rows={4} placeholder="Details" onChange={(e) => setDetail(e.target.value)}/>
      <Button type="primary" onClick={createProposals}>Create</Button>

      <Divider>List of Proposals</Divider>

      <Collapse onChange={onChange}>
        {proposals.map(p => (
          <Collapse.Panel header={p.detail} key={p.id}>
          <p>{p.detail}</p>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  )
}

export default Vote;