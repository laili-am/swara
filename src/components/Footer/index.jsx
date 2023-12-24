import { Col, Row } from "antd";
import React from "react";
import style from "./Footer.module.css";
import { MailOutlined, InstagramOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <Row className={style.footer} gutter={[0, 16]}>
        <Col lg={12} md={24} sm={24} xs={24} className='gutter-row'></Col>
        <Col lg={6} md={12} sm={12} xs={24} className='gutter-row'>
          <h4 className={style.primary}>Informasi</h4>
          <Link to='/Tentang-Kami' className={style.link}>
            <p className={style.link}>Tentang kami</p>
          </Link>
          <Link to='/Faq'>
            <p className={style.link}>FAQ</p>
          </Link>
          <Link to='/Kebijakan-Privasi-Data'>
            <p className={style.link}>Kebijakan Privasi Data</p>
          </Link>
        </Col>
        <Col lg={6} md={12} sm={12} xs={24} className='gutter-row'>
          <h4 className={style.primary}>Hubungi Kami </h4>
          <Row gutter={[0, 16]}>
            <Col className='gutter-row' span={24}>
              <Row gutter={8}>
                <Col flex='24px'>
                  <MailOutlined
                    style={{ fontSize: "24px", color: " var(--color-primary)" }}
                    className='gutter-row'
                  />
                </Col>
                <Col flex='auto'>
                  <span className={`${style.body1} gutter-row`}>
                    swara@gmail.com
                  </span>
                </Col>
              </Row>
            </Col>
            <Col className='gutter-row' span={24}>
              <Row gutter={8}>
                <Col flex='24px'>
                  <InstagramOutlined
                    style={{ fontSize: "24px", color: " var(--color-primary)" }}
                    className='gutter-row'
                  />
                </Col>
                <Col flex='auto'>
                  <span className={`${style.body1} gutter-row`}>swara</span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={style.copyright}>
            <span className={style.white}>Copyright 2023</span>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Footer;
