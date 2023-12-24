import { Notfound } from "../../../assets";
import { CustomButton } from "../../../components";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";

function NotFoundAdmin() {
  return (
    <>
      <Row justify='center' style={{ marginTop: "40px" }}>
        <img src={Notfound} alt='notfound' style={{ width: "25%" }} />
      </Row>
      <Row justify='center'>
        <Col>
          <h3>Kamu sedang mencari halaman apa?</h3>
        </Col>
      </Row>
      <Row justify='center'>
        <Col>
          <Link to='/admin/Kelola-User'>
            <CustomButton
              variant='secondary'
              style={{
                width: "160px",
                height: "48px",
              }}>
              {" "}
              Kembali ke admin
            </CustomButton>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default NotFoundAdmin;
