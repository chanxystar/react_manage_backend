/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Divider, Row, Table } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { TablePaginationConfig } from "antd/es/table";

interface Props {
  searchGroup: ReactNode;
  children?: ReactNode;
  tableTitle: string;
  tableBtnGroup?: ReactNode;
  columns: any[];
  dataSource: any[];
  rowKey: string;
  pagination: TablePaginationConfig;
  loading: boolean;
  scrollx?: number;
  searchRows?: number;
}

function ListPage({
  children,
  searchGroup,
  tableTitle,
  tableBtnGroup,
  columns,
  dataSource,
  rowKey,
  pagination,
  loading,
  scrollx,
  searchRows = 1,
}: Props) {
  const [scrolly, setScrolly] = useState(0);
  useEffect(() => {
    const windowHeight = window.innerHeight;
    const tableHeight = windowHeight - (370 + 40 * searchRows); // 减去其他组件的高度
    setScrolly(tableHeight);
  }, [window.innerHeight]);
  return (
    <>
      {searchGroup}
      <Divider />
      <Row style={{ marginBottom: 20 }} justify={"space-between"}>
        <Col style={{ fontSize: 18, fontWeight: 600 }}>{tableTitle}</Col>
        <Col>{tableBtnGroup}</Col>
      </Row>
      <Table
        loading={loading}
        size={"small"}
        scroll={{ x: scrollx, y: scrolly }}
        rowKey={rowKey}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
      >
        {children}
      </Table>
    </>
  );
}

export default ListPage;
