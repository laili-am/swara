import LayoutAdmin from "../../../layouts/Admin";
import { useQuery, useMutation } from "@apollo/client";
import { GETmateri, GETminiquiz } from "../../../graphql/query";
import { Row, Col, Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import style from "./KelolaSoalMiniQuiz.module.css";
import { CustomButton } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DELETEminiquiz } from "../../../graphql/mutation";

function KelolaSoalMiniQuiz() {
  const { id_materi } = useParams();
  const { loading, error, data } = useQuery(GETminiquiz, {
    variables: { id_materi },
    fetchPolicy: "cache-and-network",
  });
  const navigate = useNavigate();

  const [deleteMateri] = useMutation(DELETEminiquiz, {
    refetchQueries: [GETminiquiz],
  });

  const handleDelete = (id_soal_miniquiz) => {
    deleteMateri({
      variables: {
        id_soal_miniquiz: id_soal_miniquiz,
      },
    });
    alert("Soal mini quiz berhasil dihapus!");
  };

  return (
    <>
      <LayoutAdmin>
        <h2 style={{ textAlign: "center" }}>Kelola Miniquiz</h2>
        <Row
          justify='center'
          style={{
            background: "var(--color-primary-surface)",
          }}>
          {data?.soal_miniquiz.map((item) => {
            return (
              <>
                <Col
                  span={16}
                  style={{
                    background: "var(--color-white)",
                    marginTop: "16px",
                    marginBottom: "16px",
                    padding: "8px",
                  }}>
                  <h5 style={{ marginLeft: "16px" }}>{item.soal_miniquiz}</h5>
                </Col>
                <Row style={{ float: "right" }}>
                  <Col
                    style={{
                      background: "var(--color-white)",
                      marginTop: "16px",
                      marginBottom: "16px",
                      padding: "8px",
                    }}>
                    <Button
                      className={style.btn}
                      onClick={() =>
                        navigate(
                          `/admin/Edit-Miniquiz/${item.id_soal_miniquiz}`
                        )
                      }
                      style={{
                        background: "var(--color-info)",
                        color: "var(--color-white)",
                        borderRadius: "6px",
                        width: "24px",
                        height: "30px",
                        marginRight: "8px",
                      }}>
                      <EditFilled />
                    </Button>
                  </Col>
                  <Col
                    style={{
                      background: "var(--color-white)",
                      marginTop: "16px",
                      marginBottom: "16px",
                      padding: "8px",
                    }}>
                    <Button
                      className={style.btn}
                      onClick={() => handleDelete(item.id_soal_miniquiz)}
                      style={{
                        background: "var(--color-danger)",
                        color: "var(--color-white)",
                        borderRadius: "6px",
                        width: "24px",
                        height: "30px",
                        marginRight: "32px",
                      }}>
                      <DeleteFilled />
                    </Button>
                  </Col>
                </Row>
              </>
            );
          })}
        </Row>
        <Row justify='center'>
          <Link to={`/admin/Tambah-MiniQuiz/${id_materi}`}>
            <CustomButton variant='secondary'>Tambah Mini Quiz</CustomButton>
          </Link>
        </Row>
      </LayoutAdmin>
    </>
  );
}

export default KelolaSoalMiniQuiz;
