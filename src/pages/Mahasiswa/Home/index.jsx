import style from "./Home.module.css";
import { Row, Col } from "antd";
import { CustomButton } from "./../../../components";
import { Homepage } from "../../../assets";
import { Link } from "react-router-dom";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";

const layanan = [
  {
    key: "1",
    title: "Belajar mandiri dengan materi lengkap dan runtut",
    img: "assets/illustration/layanan-user-1.png",
  },
  {
    key: "2",
    title: "Latihan soal untuk mengukur pemahamanmu",
    img: "assets/illustration/layanan-user-2.png",
  },
  {
    key: "3",
    title: "Raih nilai tertinggi untuk mencapai posisi teratas",
    img: "assets/illustration/layanan-user-3.png",
  },
];

function Home() {
  return (
    <>
      <LayoutMahasiswa>
        <Row justify='center' style={{ marginTop: "160px" }}>
          <Col>
            <h2 className={style.title} style={{ marginBottom: "8px" }}>
              Pelajari dasar-dasar paduan suara
            </h2>
            <h5 className={style.title}>
              kami memiliki materi lengkap tentang dasar-dasar paduan suara
            </h5>
            <Row justify='space-around' style={{ marginBottom: "160px" }}>
              <Col>
                <Link to='/Pembelajaran'>
                  <CustomButton
                    variant='secondary'
                    style={{
                      width: "160px",
                      height: "48px",
                    }}>
                    {"Belajar Sekarang"}
                  </CustomButton>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={style.Home} justify='center'>
          <Col lg={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
            <h2
              className={style.title}
              style={{
                color: "white",
                marginTop: "64px",
                marginBottom: "48px",
                textAlign: "center",
              }}>
              Cara Swara dapat meningkatkan pengetahuan paduan suara Anda
            </h2>
          </Col>
          <Row
            className={style.layanan}
            justify='center'
            gutter={[0, 48]}
            style={{ paddingLeft: "48px", paddingRight: "48px", gap: "64px" }}>
            {layanan.map((item) => {
              return (
                <Col
                  lg={{ span: 6 }}
                  md={{ span: 15 }}
                  xs={{ span: 18 }}
                  key={item.key}
                  justify='center'
                  className={style.col1}>
                  <Col>
                    <img
                      src={require(`../../../${item.img}`)}
                      alt='layanan'
                      className={style.gambar}
                    />
                    <h5 className={style.title}>{item.title}</h5>
                  </Col>
                </Col>
              );
            })}
          </Row>
        </Row>
        <Row
          justify='center'
          style={{ marginTop: "88px", marginBottom: "88px" }}>
          <Col lg={{ span: 10, offset: 1 }} xs={{ span: 20 }}>
            <h2 className={style.text} style={{ marginTop: "48px" }}>
              Siap untuk meningkatkan pengetahuan paduan suara Anda?
            </h2>
            <Link to='/Pembelajaran'>
              <CustomButton
                variant='secondary'
                style={{
                  width: "160px",
                  height: "48px",
                }}>
                {"Belajar Sekarang"}
              </CustomButton>
            </Link>
          </Col>
          <Col lg={{ span: 10 }} xs={{ span: 20 }} justify='end'>
            <img
              src={Homepage}
              alt='homepage'
              className={style.gambarhomepage}
            />
          </Col>
        </Row>
      </LayoutMahasiswa>
    </>
  );
}

export default Home;
