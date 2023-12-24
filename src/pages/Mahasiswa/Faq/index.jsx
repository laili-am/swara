import React from "react";
import { Collapse, Row, Col } from "antd";
import style from "./Faq.module.css";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";

const { Panel } = Collapse;
const kontenFAQ = [
  {
    key: "1",
    pertanyaan:
      "Saya ingin melakukan pembelajaran mengenai paduan suara. Bagaimana caranya?",
    jawaban:
      "Untuk melakukan pembelajaran, Anda harus memiliki akun Swara terlebih dahulu.",
  },
  {
    key: "2",
    pertanyaan: "Apa yang akan saya dapatkan dari Swara?",
    jawaban:
      "Swara memberikan layanan pembelajaran teori dasar paduan suara dengan berbagai latihan soal. Swara juga menghadirkan materi dasar paduan suara secara runtut dan juga contoh implementasi untuk menunjang proses pembelajaranmu.",
  },
  {
    key: "3",
    pertanyaan:
      "Apakah saya dapat melihat nilai pretest dan posttest yang telah saya kerjakan sebelumya?",
    jawaban:
      "Anda dapat melihat nilai pretest dan posttest melalui halaman riwayat yang diakses melalui navbar.",
  },
];
export default function Faq() {
  return (
    <>
      <LayoutMahasiswa>
        <Col span={20} offset={2} style={{ paddingTop: "40px" }}></Col>
        <h1 className={style.title}>FAQ</h1>
        <Row justify='center' style={{ paddingBottom: "88px" }}>
          <Col lg={{ span: 16 }} xs={{ span: 20 }}>
            {kontenFAQ.map((item) => {
              return (
                <Collapse defaultActiveKey={[]}>
                  <Panel
                    className={style.panel}
                    header={
                      <h5
                        style={{
                          color: "var(  --color-white)",
                          marginBottom: "0",
                        }}>
                        {item.pertanyaan}
                      </h5>
                    }>
                    <p className='body1'>{item.jawaban}</p>
                  </Panel>
                </Collapse>
              );
            })}
          </Col>
        </Row>
      </LayoutMahasiswa>
    </>
  );
}
