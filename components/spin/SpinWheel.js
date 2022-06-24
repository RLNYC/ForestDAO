import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Divider, List, Card } from 'antd';

import Wheel from '../Wheel';

function SpinWheel({ account, gContract, ticketContract, myWinnings, setMyWinnings }) {
  const [wheelclass, setWheelclass] = useState("box");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [winningURL, setWinnginURL] = useState("");
  const [wonOne, setWonOne] = useState(0);
  const [usedTickets, setUsedTickets] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if(ticketContract) getTicketToken();
  }, [ticketContract])

  const getTicketToken = async () => {
    const amount = await ticketContract.methods.balanceOf(account).call();
    setTokenBalance(amount);
  }

  const startRotation = (wheelNumber, text) => {
    setWheelclass("box start-rotate");
    setTimeout(async () => {
      setWheelclass("box start-rotate stop-rotate");
      setIsModalVisible(true);
    }, (1000 + (125 * +wheelNumber)))
  }

  const earnToken = async () => {
    try{
      setLoading(true);
      const tx = await gContract.methods.useTicketToken().send({ from: account });
      console.log(tx);
      setUsedTickets(usedTickets + 1);
      setWonOne(tx.events[tx.events.length - 1].args.amount.toString());
      setResult(tx.events[tx.events.length - 1].args.result);
      startRotation(tx.events[tx.events.length - 1].args.wheelNumber.toString(), tx.events[tx.events.length - 1].args.result);

      setMyWinnings([...myWinnings, { "id": myWinnings.length + 1, "result": tx.events[tx.events.length - 1].args.result, "amount": tx.events[tx.events.length - 1].args.amount.toString()}])
      setLoading(false);
      getTicketToken();
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <Card>
      <Row id="wheelgame" gutter={16}>
        <Col className="gutter-row" xs={{ span: 32 }} lg={{ span: 14 }}>
          <Wheel
            wheelclass={wheelclass}
            loading={loading}
            earnToken={earnToken}/>
        </Col>
        <Col className="gutter-row" xs={{ span: 32 }} lg={{ span: 10 }}>
          <Typography.Title level={2} style={{ marginTop: '8rem'}}>
            Your Spin Tickets: {tokenBalance / 10 ** 18}
          </Typography.Title >
          
          <Divider orientation="left">Your Winnings</Divider>
          <List
            style={{ backgroundColor: 'white'}}
            bordered
            itemLayout="horizontal">
              <List.Item>
                <List.Item.Meta
                  title={`ETH : ${wonOne / 10 ** 18}`}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={`Spin Tickets : ${usedTickets}`}
                />
              </List.Item>
          </List>
          <br />
        </Col>
      </Row>
    </Card>
  )
}

export default SpinWheel;
