import React from "react";
import { Table } from "antd";

const styles = {
  table: {
    margin: "0 auto",
    width: "1000px",
  },
};

function NFTForestTable({ name, columns, data }) {
  return (
    <>
      <div>
        <div style={styles.table}>
          <h2>{name}</h2>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </>
  );
}

export default NFTForestTable;