import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, Select, Input, Button, Typography  } from 'antd';

const layout = {
  labelCol: {
    span: 5,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 16,
    span: 16,
  },
};

function GovernanceTokens({ account, voteContract, gContract }) {
  const [form] = Form.useForm();

  const [ethBalance, setETHBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [govTokenBalance, setGovTokenBalance] = useState(0);

  useEffect(() => {
    if(voteContract) getGovToken();
  }, [voteContract])

  const getGovToken = async () => {
    const amount = await voteContract.methods.balanceOf(account).call();
    setGovTokenBalance(amount);
  }

  const onFinish = async (values) => {
    try{
      setLoading(true);
      console.log(values);
      const txt = await gContract.methods.buyTreeDao(values.amount.toString()).send({ from: account });
      console.log(txt);

      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Card style={{ display: "flex", alignItems: "center", margin: '1rem 0'}}>
        <div>
          <p style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: 0, marginTop: "1rem"}}>
            All proceeds from the sales of governance tokens go to our treasury for buying lands and keeping Forest DAO operational.
          </p>
          <p style={{ fontSize: "1rem", fontWeight: "bold"}}>
            Each governance token allows one vote on our proposals such where to build our forest. 
          </p>
        </div>
      </Card>
      <Card>
        <p>Your Available Governance Tokens: {govTokenBalance / 10 ** 18}</p>
        <Card title="Purchase Governance Token">
          <Typography.Title level={4} style={{ marginTop: '0'}}>
            Your Available Funds:  {ethBalance / 10 ** 18} CELO
          </Typography.Title>
          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout} loading={loading}>
              <Button type="primary" htmlType="submit" className="primary-bg-color">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
          
          <p>* 1 CELO = 1 Governance Token</p>
        </Card>
      </Card>
      
    </div>
  )
}

export default GovernanceTokens;