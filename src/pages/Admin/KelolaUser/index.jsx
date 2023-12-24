import LayoutAdmin from "../../../layouts/Admin";
import { useQuery, useMutation } from "@apollo/client";
import { GETuser } from "../../../graphql/query";
import { DELETEuser } from "../../../graphql/mutation";
import { Row, Col, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import style from "./KelolaUser.module.css";
import { Loading } from "../../../components";
function KelolaUser() {
  const { loading, error, data } = useQuery(GETuser);

  const [deleteUser, { loading: loadingDeleteUser }] = useMutation(DELETEuser, {
    refetchQueries: [GETuser],
  });

  const handleDelete = (id_mahasiswa) => {
    deleteUser({
      variables: {
        id_mahasiswa: id_mahasiswa,
      },
    });
    alert("User berhasil dihapus!");
  };

  return (
    <>
      <LayoutAdmin>
        <h2 style={{ textAlign: "center" }}>Kelola User</h2>
        <Row
          justify='center'
          style={{
            background: "var(--color-primary-surface)",
          }}>
          {data?.mahasiswa.map((item) => {
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
                  <h5 style={{ marginLeft: "16px" }}>{item.nama}</h5>
                </Col>
                <Row style={{ float: "right" }}>
                  <Col
                    style={{
                      background: "var(--color-white)",
                      marginTop: "16px",
                      marginBottom: "16px",
                      padding: "8px",
                    }}></Col>
                  <Col
                    style={{
                      background: "var(--color-white)",
                      marginTop: "16px",
                      marginBottom: "16px",
                      padding: "8px",
                    }}>
                    <Button
                      className={style.btn}
                      onClick={() => handleDelete(item.id_mahasiswa)}
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
      </LayoutAdmin>
    </>
  );
}

export default KelolaUser;
