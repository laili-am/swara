import LayoutAdmin from "../../../layouts/Admin";
import { useQuery, useMutation } from "@apollo/client";
import { GETposttest } from "../../../graphql/query";
import { DELETEposttest } from "../../../graphql/mutation";
import { Row, Col, Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import style from "./KelolaPosttest.module.css";
import { CustomButton } from "../../../components";
import { Link } from "react-router-dom";
import { EDITposttest } from "../../../graphql/mutation";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function KelolaPosttest() {
  const { loading, error, data } = useQuery(GETposttest, {
    fetchPolicy: "cache-and-network"
  });

  const navigate = useNavigate();
  const [deletePosttest] = useMutation(DELETEposttest, {
    refetchQueries: [GETposttest],
  });

  const handleDelete = (id_soal_posttest) => {
    deletePosttest({
      variables: {
        id_soal_posttest: id_soal_posttest,
      },
    });
    alert("Soal posttest berhasil dihapus!");
  };

  return (
    <>
      <LayoutAdmin>
        <h2 style={{ textAlign: "center" }}>Kelola Posttest</h2>
        <Row
          justify='center'
          style={{
            background: "var(--color-primary-surface)",
          }}>
          {data?.soal_posttest.map((item) => {
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
                  <h5 style={{ marginLeft: "16px" }}>{item.soal_posttest}</h5>
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
                          `/admin/Edit-Posttest/${item.id_soal_posttest}`
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
                      onClick={() => handleDelete(item.id_soal_posttest)}
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
          <Link to='/admin/Tambah-Posttest'>
            <CustomButton variant='secondary'>Tambah Posttest</CustomButton>
          </Link>
        </Row>
      </LayoutAdmin>
    </>
  );
}

export default KelolaPosttest;
