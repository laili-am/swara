import { Notfound } from "../../../assets";
import { CustomButton } from "../../../components";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";

function NotFound() {
  return (
    <>
      <LayoutMahasiswa>
        <Row justify='center'>
          <img src={Notfound} alt='notfound' style={{ width: "25%" }} />
        </Row>
        <Row justify='center'>
          <Col>
            <h3>Kamu sedang mencari halaman apa?</h3>
          </Col>
        </Row>
        <Row justify='center'>
          <Col>
            <Link to='/'>
              <CustomButton
                variant='secondary'
                style={{
                  width: "160px",
                  height: "48px",
                  marginBottom: "88px",
                }}>
                {" "}
                Kembali ke home
              </CustomButton>
            </Link>
          </Col>
        </Row>
      </LayoutMahasiswa>
    </>
  );
}

export default NotFound;
