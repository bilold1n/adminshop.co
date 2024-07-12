import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Button } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { Input, QRCode, Space } from "antd";
import React from "react";

export default function Dashboard() {
  const [text, setText] = React.useState("https://admin-shopco.netlify.app");
  return (
    <>
      <div className="container flex flex-col gap-5 w-[90%] items-center">
        <Row className="w-full" gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <div className="flex  justify-between w-full p-4">
          <Row className="bg-[#fff] w-[50%] rounded-2xl p-2" gutter={16}>
            <Col span={12}>
              <Statistic
                title="Active Users"
                valueStyle={{ color: "#3f8600" }}
                value={112893}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Account Balance (CNY)"
                valueStyle={{ color: "#3f8600" }}
                value={112893}
                precision={2}
              />
              <Button style={{ marginTop: 16 }} type="primary">
                Recharge
              </Button>
            </Col>
            <Col span={12}>
              <Statistic
                title="Active Users"
                valueStyle={{ color: "#3f8600" }}
                value={112893}
                loading
              />
            </Col>
          </Row>
          <Row
            className="bg-[#fff] w-[50%] rounded-2xl flex items-center justify-center "
            gutter={16}
          >
            <Col span={12}>
              <Statistic
                title="Feedback"
                value={1128}
                prefix={<LikeOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </Col>
          </Row>
        </div>
      </div>
      <div className="container bg-[#fff] flex items-center justify-center w-[40%] rounded-2xl py-5">
        {" "}
        <Space direction="vertical" align="center">
          <QRCode value={text || "-"} />
          <Input
            placeholder="-"
            maxLength={60}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Space>
      </div>
    </>
  );
}
