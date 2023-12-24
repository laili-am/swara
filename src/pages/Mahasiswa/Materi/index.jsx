import { useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { CustomButton } from "../../../components";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";
import { useQuery } from "@apollo/client";
import { GETMateribyId, GETMiniquizIsSubmited } from "../../../graphql/query";
import Cookies from "js-cookie";
import style from "./Materi.module.css";

function Materi() {
  const { id_materi } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GETMateribyId, {
    variables: { id_materi },
  });

  const idUser = JSON.parse(Cookies.get("user")).id;

  const { data: miniquizIsSubmited } = useQuery(GETMiniquizIsSubmited, {
    variables: { id_mahasiswa: idUser, id_materi: Number(id_materi) },
  });
  console.log("miniquizIsSubmited: ", miniquizIsSubmited?.miniquiz.length);

  return (
    <>
      <LayoutMahasiswa>
        <>
          <Row justify='center'>
            <h2>{data?.materi_by_pk.judul_materi}</h2>
          </Row>
          <Row justify='center'>
            <img
              src={data?.materi_by_pk.media_gambar}
              className={style.gambar}
            />
          </Row>
          <Row justify='center'>
            <Col lg={{ span: 18 }} md={{ span: 18 }} xs={{ span: 20 }}>
              <p
                dangerouslySetInnerHTML={{ __html: data?.materi_by_pk.materi }}
              />
            </Col>
          </Row>
          <Row justify='center'>
            {data?.materi_by_pk.media_video !== null ? (
              <>
                <iframe
                  width='560'
                  height='315'
                  src={data?.materi_by_pk.media_video}></iframe>
              </>
            ) : (
              <></>
            )}
          </Row>
          <Row justify='start' style={{ marginTop: "24px" }}>
            <Col lg={{ span: 2, offset: 3 }}>
              <CustomButton
                variant={
                  miniquizIsSubmited?.miniquiz.length
                    ? "primary-disabled"
                    : "secondary"
                }
                disabled={miniquizIsSubmited?.miniquiz.length}
                onClick={() => navigate(`/Materi/miniquiz/${id_materi}`)}>
                Miniquiz
              </CustomButton>
            </Col>
          </Row>
        </>
      </LayoutMahasiswa>
    </>
  );
}

export default Materi;
