import LayoutAdmin from "../../../layouts/Admin";
import { useQuery, useMutation } from "@apollo/client";
import { GETmateri } from "../../../graphql/query";
import { DELETEmateri } from "../../../graphql/mutation";
import { Row, Col, Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import style from "./KelolaMateri.module.css";
import { CustomButton } from "../../../components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function KelolaMateri() {
  const { loading, error, data } = useQuery(GETmateri);
  const navigate = useNavigate();

  const [deleteMateri] = useMutation(DELETEmateri, {
    refetchQueries: [GETmateri],
  });

  const handleDelete = (id_materi) => {
    deleteMateri({
      variables: {
        id_materi: id_materi,
      },
    });
    alert("Materi berhasil dihapus!");
  };

  return (
    <>
      <LayoutAdmin>
        <h2 style={{ textAlign: "center" }}>Kelola Materi</h2>
        <Row
          justify='center'
          style={{
            background: "var(--color-primary-surface)",
          }}>
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
                  }}>
                  <h5 style={{ marginLeft: "16px" }}>{item.judul_materi}</h5>
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
                        navigate(`/admin/Edit-Materi/${item.id_materi}`)
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
                      onClick={() => handleDelete(item.id_materi)}
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
          <Link to='/admin/Tambah-Materi'>
            <CustomButton variant='secondary'>Tambah Materi</CustomButton>
          </Link>
        </Row>
      </LayoutAdmin>
    </>
  );
}

export default KelolaMateri;
