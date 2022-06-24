import React, { useState } from "react";
import { Card, Image, Tooltip, Typography, Modal, Button } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { treeCollections } from '../helpers/collections';

const { Meta } = Card;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "20px auto",
    maxWidth: "1000px",
    gap: "30px",
  },
  NFTs_header: {
    display: "flex",
    justifyContent: "space-between",
  },
  NFTs_price: {
    fontSize: '20px'
  },
  NFTs_price_text: {
    marginTop: '-7px'
  },
  NFTs_buttons: {
    display: 'flex',
    justifyContent: 'center'
  },
  banner: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0 auto",
    width: "600px",
    height: "150px",
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "solid 1px #e3e3e3",
  },
  logo: {
    height: "115px",
    width: "115px",
    borderRadius: "50%",
    border: "solid 4px white",
  },
  text: {
    color: "#041836",
    fontSize: "27px",
    fontWeight: "bold",
  },
};

function Buytree({ account, gContract }) {
  const [tree1Amount, setTree1Amount] = useState(0);
  const [tree2Amount, setTree2Amount] = useState(0);

  async function purchase(nft) {
    try {
      const txt = await gContract.methods.mintTree(nft.cid).send({ from: account });
      console.log(txt);

      succPurchase(txt);
    } catch (error) {
      failPurchase();
      console.log(error);
    }
  }

  const handleBuyClick = (nft) => {
    console.log(nft.image);
  };

  function succPurchase(txt) {
    let secondsToGo = 10;
    const modal = Modal.success({
      title: "Success!",
      content: `You have purchased this NFT. ${txt.transactionHash}`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failPurchase() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem when purchasing this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  const addTreeToCart = (index) => {
    if(index === 0) {
      setTree1Amount(tree1Amount + 1);
    } else {
      setTree2Amount(tree2Amount + 1);
    }
  }

  const removeTreeFromCart = (index) => {
    if(index === 0) {
      setTree1Amount(tree1Amount - 1);
    } else {
      setTree2Amount(tree2Amount - 1);
    }
  }

  return (
    <>
      <div>
        <div style={styles.NFTs}>
          {treeCollections?.map((nft, index) => (
              <Card
                key={index}
                hoverable
                actions={[
                  <div style={styles.NFTs_buttons} key={index}>
                    <Button shape="circle" icon={<MinusOutlined />} size="small" onClick={() => removeTreeFromCart(index)} />
                    <p style={{ margin: '0 7px'}}>{index === 0 ? tree1Amount : tree2Amount}</p>
                    <Button shape="circle" icon={<PlusOutlined />} size="small" onClick={() => addTreeToCart(index)} />
                  </div>,
                  <Tooltip title="Add to Cart" key={index}>
                    <ShoppingCartOutlined
                      onClick={() => purchase(nft)}
                    />
                  </Tooltip>,
                ]}
                style={{ width: 340, border: "2px solid #e7eaf3" }}
                cover={
                  <Image
                    preview={false}
                    src={nft?.image || "error"}
                    alt=""
                    style={{ height: "240px" }}
                  />
                }
              >
                <div style={styles.NFTs_header}>
                  <Meta title={nft.name} style={{ fontSize: '30px' }} />
                  <div>
                    <Typography.Text type="success" style={styles.NFTs_price}>
                      ${nft.price}
                    </Typography.Text>
                    <p style={styles.NFTs_price_text}>per tree</p>
                  </div>
                </div>
                
                <Typography.Text type="success">
                  Age: Under 1 year old
                </Typography.Text>
                <br />
                <Typography.Text type="success">
                  Time before harvesting: {nft.harvestingTime} years
                </Typography.Text>
                <br />
                <p style={{ marginTop: '10px'}}><strong>Benefits</strong></p>
                <Typography.Text type="success">
                  Estimated CO2 absorption: ${nft.CO2_absorption} ton/per year
                </Typography.Text>
                <br />
                <Typography.Text type="success">
                  Expected gross grain: ${nft.grossGrain}
                </Typography.Text>
                <br />
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}

export default Buytree;