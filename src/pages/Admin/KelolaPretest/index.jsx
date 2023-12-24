import LayoutAdmin from "../../../layouts/Admin";
import { useQuery, useMutation } from "@apollo/client";
import { GETpretest } from "../../../graphql/query";
import { Row, Col, Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import style from "./KelolaPretest.module.css";
import { CustomButton } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { DELETEpretest } from "../../../graphql/mutation";

function KelolaPretest() {
  const { loading, error, data } = useQuery(GETpretest);
  const navigate = useNavigate();

  const [deletePretest] = useMutation(DELETEpretest, {
    refetchQueries: [GETpretest],
  });

  const handleDelete = (id_soal_pretest) => {
    deletePretest({
      variables: {
        id_soal_pretest: id_soal_pretest,
      },
    });
    alert("Soal pretest berhasil dihapus!");
  };
  return (
    <>
      <LayoutAdmin>
        <h2 style={{ textAlign: "center" }}>Kelola Pretest</h2>

        <Row
          justify='center'
          style={{
            background: "var(--color-primary-surface)",
          }}>
          {data?.soal_pretest.map((item) => {
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
                  <h5 style={{ marginLeft: "16px" }}>{item.soal_pretest}</h5>
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
                        navigate(`/admin/Edit-Pretest/${item.id_soal_pretest}`)
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
                      onClick={() => handleDelete(item.id_soal_pretest)}
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
          <Link to='/admin/Tambah-Pretest'>
            <CustomButton variant='secondary'>Tambah Pretest</CustomButton>
          </Link>
        </Row>
      </LayoutAdmin>
    </>
  );
}

export default KelolaPretest;
