import { Logo } from "../../assets";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown, Space, Menu, Drawer } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CustomButton from "../CustomButton";
import { isAuthenticatedUser } from "../../utils/Auth";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    // Cookies.remove("token");
    Cookies.remove("user");
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: <Link to='/Profil'>Profil</Link>,
    },
    {
      key: "2",
      label: <Link to='/Ubah-Password'>Ubah Password</Link>,
    },
    {
      key: "3",
      label: <span onClick={logout}>Logout</span>,
    },
  ];

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Row className={style.Navbar}>
        <Col>
          <Link to='/'>
            <img src={Logo} alt='logo' className={style.logo} />
          </Link>
        </Col>
        {isAuthenticatedUser() === true ? (
          <>
            <Row>
              <Col>
                <Link to='/Pembelajaran'>
                  <p className={style.link}>Pembelajaran</p>
                </Link>
              </Col>
              <Col>
                <Link to='/Riwayat'>
                  <p className={style.link}>Riwayat</p>
                </Link>
              </Col>
              <Col>
                <Link to='/Leaderboards'>
                  <p className={style.link}>Leaderboards</p>
                </Link>
              </Col>
              <Col>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space className={style.link}>
                      Profil
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </Col>
            </Row>
            <Drawer
              title={<img src={Logo} alt='logo' className={style.logo} />}
              placement='right'
              onClose={onClose}
              visible={visible}>
              <Row>
                <Col>
                  <Link to='/Pembelajaran'>
                    <p className={style.link}>Pembelajaran</p>
                  </Link>
                </Col>
                <Col>
                  <Link to='/Riwayat'>
                    <p className={style.link}>Riwayat</p>
                  </Link>
                </Col>
                <Col>
                  <Link to='/Leaderboards'>
                    <p className={style.link}>Leaderboards</p>
                  </Link>
                </Col>
                <Col>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className={style.link}>
                        Profil
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </Col>
              </Row>
            </Drawer>
          </>
        ) : (
          <nav className={style.navlink}>
            <CustomButton variant='secondary'>
              <Link to='/login'>Login</Link>
            </CustomButton>
            <CustomButton variant='secondary'>
              <Link to='/register'>Register</Link>
            </CustomButton>
          </nav>
        )}
      </Row>
    </>
  );
}

export default Navbar;
