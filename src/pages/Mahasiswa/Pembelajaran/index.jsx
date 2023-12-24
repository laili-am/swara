import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import { CustomButton } from "../../../components";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";
import {
  ALLmateribymahasiswaID,
  GETPosttestIsSubmited,
  GETPretestIsSubmited,
} from "../../../graphql/query";
import { useQuery, useLazyQuery } from "@apollo/client";
import style from "./Pembelajaran.module.css";
import Cookies from "js-cookie";
import { useEffect } from "react";

function Pembelajaran() {
  const idMahasiswa = JSON.parse(Cookies.get("user")).id;
  const { data: allMateriForAMahasiswaId, refetch } = useQuery(ALLmateribymahasiswaID, {
    variables: { id_mahasiswa: idMahasiswa },
  });
  const allMateri = allMateriForAMahasiswaId?.mahasiswa_materi;
  const navigate = useNavigate();
  const { data: pretestIsSubmited } = useQuery(GETPretestIsSubmited, {
    variables: { id_mahasiswa: idMahasiswa },
  });
  const { data: posttestIsSubmited } = useQuery(GETPosttestIsSubmited, {
    variables: { id_mahasiswa: idMahasiswa },
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <LayoutMahasiswa>
        <h2
          style={{
            textAlign: "center",
            color: "var(--color-primary",
            marginBottom: "48px",
          }}
        >
          Belajar dengan Swara
        </h2>
        <Row justify="center">
          <Col lg={{ span: 14, offset: 1 }} xs={{ span: 16 }}>
            <CustomButton
              onClick={() => navigate(`/Pretest`)}
              // className={style.button}
              disabled={pretestIsSubmited?.pretest.length}
              style={{
                width: "100%",
                height: "64px",
                background: "var(--color-primary-surface)",
                opacity: pretestIsSubmited?.pretest.length ? 0.6 : 1,
                marginBottom: "16px",
              }}
            >
              <h5
                style={{
                  color: "var(--color-black)",
                  margin: "16px 24px 16px",
                  textAlign: "left",
                }}
              >
                Pretest
              </h5>
            </CustomButton>
          </Col>
          {allMateri?.map((item) => {
            return (
              <>
                <Col lg={{ span: 14, offset: 1 }} xs={{ span: 16 }}>
                  <CustomButton
                    onClick={() => navigate(`/Materi/${item.materi.id_materi}`)}
                    // className={style.button}
                    style={{
                      width: "100%",
                      height: "64px",
                      background: "var(--color-primary-surface)",
                      marginBottom: "16px",
                    }}
                  >
                    <h5
                      style={{
                        color: "var(--color-black)",
                        margin: "16px 24px 16px",
                        textAlign: "left",
                      }}
                    >
                      {item.materi.judul_materi}
                    </h5>
                  </CustomButton>
                </Col>
              </>
            );
          })}
          <Col lg={{ span: 14, offset: 1 }} xs={{ span: 16 }}>
            <CustomButton
              onClick={() => navigate(`/Posttest`)}
              disabled={posttestIsSubmited?.posttest.length}
              style={{
                width: "100%",
                height: "64px",
                background: "var(--color-primary-surface)",
                opacity: posttestIsSubmited?.posttest.length ? 0.6 : 1,
                marginBottom: "16px",
              }}
            >
              <h5
                style={{
                  color: "var(--color-black)",
                  margin: "16px 24px 16px",
                  textAlign: "left",
                }}
              >
                Posttest
              </h5>
            </CustomButton>
          </Col>
        </Row>
      </LayoutMahasiswa>
    </>
  );
}

export default Pembelajaran;
