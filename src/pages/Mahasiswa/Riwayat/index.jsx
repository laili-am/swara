import React from "react";
import { Row, Col } from "antd";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";
import style from "./Riwayat.module.css";
import Cookies from "js-cookie";
import { useQuery } from "@apollo/client";
import { GETscore } from "../../../graphql/query";

function Riwayat() {
  const idUser = JSON.parse(Cookies.get("user")).id;
  const { loading, error, data } = useQuery(GETscore, {
    variables: { id_mahasiswa: idUser },
  });
  console.log("id_mahasiswa: ", idUser, data);

  return (
    <>
      <LayoutMahasiswa>
        <h2 style={{ textAlign: "center", marginBottom: "32px" }}>Riwayat</h2>
        <Row justify={"center"}>
          <Col span={14} className={style.background}>
            <Row className={style.konten}>
              <Col offset={1} span={2}>
                <h5 className={style.text}>Pretest</h5>
              </Col>
              <Col offset={19} span={1}>
                <h5 className={style.text}>
                  {data?.mahasiswa_by_pk.pretest_score !== null
                    ? Math.floor(
                        (data?.mahasiswa_by_pk.pretest_score / 15) * 100
                      )
                    : 0}
                </h5>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify={"center"}>
          <>
            <Col span={14} className={style.background}>
              <Row className={style.konten}>
                <Col offset={1} span={2}>
                  <h5 className={style.text}>Posttest</h5>
                </Col>
                <Col offset={19} span={1}>
                  <h5 className={style.text}>
                    {data?.mahasiswa_by_pk.posttest_score !== null
                      ? Math.floor(
                          (data?.mahasiswa_by_pk.posttest_score / 20) * 100
                        )
                      : 0}
                  </h5>
                </Col>
              </Row>
            </Col>
          </>
        </Row>
      </LayoutMahasiswa>
    </>
  );
}

export default Riwayat;
