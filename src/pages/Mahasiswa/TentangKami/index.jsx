import React from "react";
import { Row, Col } from "antd";
import { Tentangkami } from "../../../assets";
import style from "./TentangKami.module.css";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";

function TentangKami() {
  return (
    <>
      <LayoutMahasiswa>
        <Row
          justify='center'
          style={{ marginBottom: "88px", marginTop: "48px" }}>
          <Col lg={{ span: 8, offset: 1 }} xs={{ span: 20 }} justify='end'>
            <img src={Tentangkami} alt='tentangkami' className={style.img} />
          </Col>
          <Col lg={{ span: 9 }} xs={{ span: 20 }}>
            <h2 className={style.textjudul}>Tentang Kami</h2>
            <p className={`${"body1"} ${style.textketerangan}`}>
              Swara merupakan aplikasi yang dibangun untuk membantu peminat
              musik dalam mengenal paduan suara lebih baik. Swara memberikan
              fasilitas bagi penggunanya dalam layanan pembelajaran teori dasar
              paduan suara.
            </p>
          </Col>
        </Row>
      </LayoutMahasiswa>
    </>
  );
}

export default TentangKami;
