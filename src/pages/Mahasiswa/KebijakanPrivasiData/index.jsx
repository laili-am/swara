import React from "react";
import { Row, Col } from "antd";
import style from "./KebijakanPrivasiData.module.css";
import { Kebijakan } from "../../../assets";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";

function KebijakanPrivasiData() {
  return (
    <>
      <LayoutMahasiswa>
        <Row justify='center'>
          <Col span={16} allign='middle'>
            <h2 className={style.title}>Kebijakan Privasi Data</h2>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={8}>
            <img src={Kebijakan} alt='kebijakan-privasi-data' width='100%' />
          </Col>
        </Row>
        <Row className={style.Kebijakan} justify='center'>
          <Col span={20} style={{ marginTop: "80px" }}>
            <h5 className={style.tekskebijakan}>
              Swara hanya mengumpulkan data dan informasi pengguna untuk
              digunakan dalam menjalankan layanan yang tersedia di dalam
              aplikasi. Beberapa data dan informasi yang akan Swara gunakan
              adalah:
            </h5>
          </Col>
          <Col span={20} style={{ marginTop: "24px" }}>
            <h5 className={style.tekskebijakan}>
              1. Informasi kebutuhan registrasi
            </h5>
          </Col>
          <Col span={20}>
            <b2 className={style.tekskebijakan}>
              Untuk dapat menggunakan dan mengakses layanan aplikasi, calon
              pengguna akan diminta untuk membuat akun Swara agar dapat
              menggunakan layanan yang tersedia. Data yang dibutuhkan termasuk
              nama, email, dan password.
            </b2>
          </Col>
          <Col span={20} style={{ marginTop: "24px" }}>
            <h5 className={style.tekskebijakan}>
              2. Informasi yang kami kumpulkan
            </h5>
          </Col>
          <Col span={20}>
            <b2 className={style.tekskebijakan}>
              Swara akan mendata informasi terkait penggunaan aplikasi yang
              dilakukan oleh setiap pengguna, seperti id pengguna saat melakukan
              registrasi.
            </b2>
          </Col>
          <Col span={20} style={{ marginTop: "24px" }}>
            <b2 className={style.tekskebijakan}>
              Setiap data dan informasi yang tersimpan akan diolah untuk
              kebutuhan:
            </b2>
          </Col>
          <Col span={20}>
            <b2 className={style.tekskebijakan}>
              1. Menyimpan dan menampilkan histori pengguna fitur pretest dan
              posttest yang pengguna lakukan.
            </b2>
          </Col>
          <Col span={20}>
            <b2 className={style.tekskebijakan}>
              2. Menyimpan dan menampilkan data dalam leaderboards.
            </b2>
          </Col>
          <Col span={20} style={{ marginTop: "24px", marginBottom: "80px" }}>
            <b2 className={style.tekskebijakan}>
              Semua informasi dan data yang pengguna masukkan ke dalam aplikasi
              akan disimpan dengan aman dalam sistem dan tidak akan dibagikan
              kepada pihak yang tidak memiliki akses dan izin terkait kebijakan
              aplikasi. Dengan menggunakan aplikasi Swara, dengan ini pengguna
              menyetujui Kebijakan Privasi Data dan menyetujui syarat dan
              ketentuannya.
            </b2>
          </Col>
        </Row>
      </LayoutMahasiswa>
    </>
  );
}

export default KebijakanPrivasiData;
