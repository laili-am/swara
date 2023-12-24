import { Col, Menu, Row, Space } from "antd";
import React, { useState } from "react";
import style from "./Sidebar.module.css";
import { Logo } from "../../assets";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const allMenu = [
    {
      id: 1,
      route: "/admin/Kelola-User",
      text: "Kelola User",
    },
    {
      id: 2,
      route: "/admin/Kelola-Materi",
      text: "Kelola Materi",
    },
    {
      id: 3,
      route: "/admin/Kelola-Pretest",
      text: "Kelola Pretest",
    },
    {
      id: 4,
      route: "/admin/Kelola-Posttest",
      text: "Kelola Posttest",
    },
    {
      id: 5,
      route: "/admin/Kelola-MiniQuiz",
      text: "Kelola Mini Quiz",
    },
  ];

  return (
    <Row gutter={[0, 80]} className={style.nav}>
      <Col span={24}>
        <div className={style.image}>
          <img src={Logo} alt='logo' style={{ width: "75%" }} />
        </div>
        <ul style={{ listStyleType: "none", margin: "0", padding: "0" }}>
          {allMenu.map((menu) => {
            return (
              <li
                className={
                  location.pathname === menu.route ? style.active : undefined
                }
                key={menu.id}>
                <h5>
                  <Link to={menu.route} className={style.menu}>
                    {menu.icon}
                    <span className={style.textMenu}>{menu.text}</span>
                  </Link>
                </h5>
              </li>
            );
          })}
        </ul>
      </Col>
    </Row>
  );
}
