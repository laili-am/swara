import { Col, Dropdown, Menu, Row, Space } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton, Sidebar } from "../../components";

export default function AdminLayout(props) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", setWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", setWidth(window.innerWidth));
    };
  }, [width]);

  const navigate = useNavigate();

  const logout = () => {
    // Cookies.remove("token");
    Cookies.remove("admin", { path: "/admin" });
    navigate("/admin/Login");
  };

  return (
    <Row className='layout-admin'>
      <Col
        lg={5}
        md={3}
        sm={3}
        xs={3}
        style={{ background: "var(--color-white)", height: "100vh" }}>
        <Sidebar />
      </Col>

      <Col lg={19} md={21} sm={21} xs={21} style={{ position: "relative" }}>
        <main className='layout-main-admin'>
          <Row>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <div style={{ borderRadius: "100%", color: "white" }}></div>
              <Col>
                <CustomButton variant={"primary"} onClick={logout}>
                  Logout
                </CustomButton>
              </Col>
            </Col>
            <Col span={24}>{props.children}</Col>
          </Row>
        </main>
      </Col>
    </Row>
  );
}
