import LayoutAdmin from "../../../layouts/Admin";
import { useQuery, useMutation } from "@apollo/client";
import { GETmateri, GETminiquiz } from "../../../graphql/query";
import { Row, Col, Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import style from "./KelolaMiniquiz.module.css";
import { CustomButton } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { DELETEminiquiz } from "../../../graphql/mutation";

function KelolaMiniquiz() {
  const { loading, error, data } = useQuery(GETmateri, {
    fetchPolicy: "cache-and-network"
  });
  console.log(data);
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
          justify="center"
          style={{
            background: "var(--color-primary-surface)",
          }}
        >
          {data?.materi.map((item) => {
            return (
              <>
                <Col
                  span={16}
                  style={{
                    background: "var(--color-white)",
                    marginTop: "16px",
                    marginBottom: "16px",
                    padding: "8px",
                  }}
                >
                  <h5 style={{ marginLeft: "16px" }}>{item.judul_materi}</h5>
                </Col>
                <Row style={{ float: "right" }}>
                  <Col
                    style={{
                      background: "var(--color-white)",
                      marginTop: "16px",
                      marginBottom: "16px",
                      padding: "8px",
                    }}
                  >
                    <Link to={`/admin/Kelola-MiniQuiz/${item.id_materi}`}>
                      <CustomButton variant="secondary">Tambah Mini Quiz</CustomButton>
                    </Link>
                  </Col>
                </Row>
              </>
            );
          })}
        </Row>
        {/* <Row justify='center'>
          
        </Row> */}
      </LayoutAdmin>
    </>
  );
}

export default KelolaMiniquiz;
