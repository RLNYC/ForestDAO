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
    margin: "0 auto",
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

function buytree({ inputValue, setInputValue }) {
  const [visible, setVisibility] = useState(false);
  const [nftToBuy, setNftToBuy] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tree1Amount, setTree1Amount] = useState(0);
  const [tree2Amount, setTree2Amount] = useState(0);

  async function purchase(treeName) {
    setLoading(true);
    const r1 = Math.random();
    const r2 = Math.random();

    console.log(treeCollections, "d")

    const fileData = JSON.stringify({
      location: [-106 + +r1, 40 + +r2],
      isNew: true,
      dateOfPlanting: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      treeType: treeName
    });

    const blob = new Blob([fileData], {type: "text/plain"});
    let data = new FormData();
    data.append('file', blob);

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      maxContentLength: "Infinity",
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY, 
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
      },
    })

    console.log(res);


    const transaction = await contractProcessor.fetch({
      params: ops,
      onSuccess: (msg) => {
        console.log("success", msg);
        setLoading(false);
        setVisibility(false);
        succPurchase(msg);
      },
      onError: (error) => {
        console.error(error);
        setLoading(false);
        failPurchase();
      },
    });
    console.log(transaction);
  }

  const handleBuyClick = (nft) => {
    console.log(nft.image);
    setVisibility(true);
  };

  function succPurchase(msg) {
    let secondsToGo = 10;
    const modal = Modal.success({
      title: "Success!",
      content: `You have purchased this NFT`,
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
                hoverable
                actions={[
                  <div style={styles.NFTs_buttons}>
                    <Button shape="circle" icon={<MinusOutlined />} size="small" onClick={() => removeTreeFromCart(index)} />
                    <p style={{ margin: '0 7px'}}>{index === 0 ? tree1Amount : tree2Amount}</p>
                    <Button shape="circle" icon={<PlusOutlined />} size="small" onClick={() => addTreeToCart(index)} />
                  </div>,
                  <Tooltip title="Add to Cart">
                    <ShoppingCartOutlined
                      onClick={() => purchase(nft.name)}
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
                key={index}
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

export default buytree;