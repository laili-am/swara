import { React, useEffect, useState } from "react";
import { Form, Input, Row, Col } from "antd";
import { CustomButton } from "../../../components";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";
import { useMutation, useQuery } from "@apollo/client";
import { EDITpassword } from "../../../graphql/mutation";
import { useParams } from "react-router-dom";
import style from "./UbahPassword.module.css";
import { GETUserbyId } from "../../../graphql/query";
import Cookies from "js-cookie";

function UbahPassword() {
  const idUser = JSON.parse(Cookies.get("user")).id;

  const { data: dataFetched } = useQuery(GETUserbyId, {
    variables: { idUser },
  });

  const [data, setData] = useState({
    basic_password: "",
    basic_konfirmasi_password: "",
  });

  console.log("idUser: ", idUser);

  useEffect(() => {
    setData({
      password: dataFetched?.mahasiswa_by_pk.password,
      konfirmasi_password: dataFetched?.mahasiswa_by_pk.konfirmasi_password,
    });
  }, [dataFetched]);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const [updatePassword] = useMutation(EDITpassword);
  const EditPassword = (newPassword) => {
    updatePassword({
      variables: {
        id_mahasiswa: idUser,
        password: newPassword.password,
        konfirmasi_password: newPassword.konfirmasi_password,
      },
    });
  };

  const handleSubmit = (e) => {
    if (data.basic_password && data.basic_konfirmasi_password) {
      const newData = {
        password: data.basic_password,
        konfirmasi_password: data.basic_konfirmasi_password,
      };
      EditPassword(newData);
      setData({
        ...data,
        password: "",
        konfirmasi_password: "",
      });
      alert("Password Anda berhasil diubah");
      return;
    } else {
      alert("Data masih ada yang kosong");
    }
  };

  return (
    <>
      <LayoutMahasiswa>
        <Row justify={"center"}>
          <Col>
            <h2>Ubah Password</h2>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Form
            onSubmit={handleSubmit}
            name='basic'
            layout='vertical'
            requiredMark={false}
            initialValues={{
              remember: true,
            }}>
            <p className={style.body1}>Password</p>
            <Form.Item
              name='password'
              value={data.basic_password}
              onChange={onChange}
              className={style.input}
              rules={[
                {
                  required: true,
                  message: "Password tidak boleh kosong!",
                },
                {
                  min: 8,
                  message: "Password minimal 8 karakter",
                },
                {
                  max: 16,
                  message: "Password maksimal 16 karakter",
                },
              ]}>
              <Input.Password placeholder='Masukkan Password Anda' />
            </Form.Item>
            <p className={style.body1}>Konfirmasi Password</p>
            <Form.Item
              name='konfirmasi_password'
              value={data.basic_konfirmasi_password}
              onChange={onChange}
              className={style.input}
              rules={[
                {
                  required: true,
                  message: "Konfirmasi password tidak boleh kosong!",
                },
                {
                  min: 8,
                  message: "Password minimal 8 karakter",
                },
                {
                  max: 16,
                  message: "Password maksimal 16 karakter",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Password yang dimasukkan tidak sama dengan password awal"
                    );
                  },
                }),
              ]}
              hasFeedback>
              <Input.Password placeholder='Konfirmasi Password Anda' />
            </Form.Item>

            <CustomButton variant='secondary' onClick={handleSubmit}>
              Simpan
            </CustomButton>
          </Form>
        </Row>
      </LayoutMahasiswa>
    </>
  );
}

export default UbahPassword;
