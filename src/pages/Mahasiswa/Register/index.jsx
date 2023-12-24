import React, { useState, useEffect } from "react";
import style from "./Register.module.css";
import { Form, Input, Row, Col, Alert, Space } from "antd";
import { CustomButton, CustomInput } from "../../../components";
import { Link } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  GETuser_register,
  ADDjoinmahasiswamateri,
} from "../../../graphql/mutation";
import { useNavigate } from "react-router-dom";
import { CEKemail } from "../../../graphql/query";

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    basic_nama: "",
    basic_email: "",
    basic_password: "",
    basic_konfirmasi_password: "",
  });

  const [cekEmail, { data: search }] = useLazyQuery(CEKemail);

  const [err, setErr] = useState({
    basic_email: "",
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);
  const [insertUser, { data: registeredMahasiswa }] =
    useMutation(GETuser_register);
  const [insermateri1] = useMutation(ADDjoinmahasiswamateri);

  useEffect(() => {
    const idMahasiswa =
      registeredMahasiswa?.insert_mahasiswa.returning[0].id_mahasiswa;
    if (registeredMahasiswa) {
      insermateri1({
        variables: {
          id_mahasiswa: idMahasiswa,
          id_materi: 18,
        },
      });
      navigate("/login");
      return;
    }
  }, [registeredMahasiswa]);

  const tambahUser = (newUser) => {
    insertUser({
      variables: {
        nama: newUser.nama,
        email: newUser.email,
        password: newUser.password,
        konfirmasi_password: newUser.konfirmasi_password,
      },
    });
  };

  const handleSubmit = (e) => {
    if (
      data.basic_nama &&
      data.basic_email &&
      data.basic_password &&
      data.basic_konfirmasi_password
    ) {
      const newData = {
        nama: data.basic_nama,
        email: data.basic_email,
        password: data.basic_password,
        konfirmasi_password: data.basic_konfirmasi_password,
      };
      tambahUser(newData);
      setData({
        ...data,
        nama: "",
        email: "",
        password: "",
        konfirmasi_password: "",
      });

      return;
    } else {
      alert("Data masih ada yang kosong");
    }
  };

  return (
    <>
      <Row>
        <Col className={style.kotak}></Col>
        <Col style={{ marginLeft: "55vw", marginTop: "32px" }}>
          <Form
            onSubmit={handleSubmit}
            name='basic'
            layout='vertical'
            requiredMark={false}
            initialValues={{
              remember: true,
            }}>
            <h2>Register</h2>
            <Form.Item
              label='Nama'
              name='nama'
              value={data.basic_nama}
              onChange={onChange}
              className={style.input}
              rules={[
                {
                  required: true,
                  message: "Nama tidak boleh kosong!",
                },
                {
                  pattern: /^[a-z A-Z]*$/,
                  message: "Input harus berupa huruf!",
                },
                {
                  min: 4,
                  message: "Masukkan minimal 4 karakter",
                },
              ]}>
              <CustomInput placeholder='Masukkan Nama Anda' />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              value={data.basic_email}
              onChange={onChange}
              className={style.input}
              rules={[
                {
                  required: true,
                  message: "Email tidak boleh kosong!",
                },
                {
                  pattern: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com$/,
                  message: "Format email tidak valid!",
                },
              ]}>
              <CustomInput placeholder='Masukkan Email Anda!' />
            </Form.Item>
            <Form.Item
              label='Password'
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
            <Form.Item
              label='Konfirmasi Password'
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
            <Form.Item>
              <CustomButton
                variant='secondary'
                onClick={handleSubmit}
                style={{ width: "100%", marginTop: "8px" }}>
                Register
              </CustomButton>
            </Form.Item>
          </Form>
          <p className={`${style.link} ${style.linkMobile} body1-m`}>
            Anda sudah punya akun? silahkan
            <Link to='/login' style={{ color: "var(--color-primary" }}>
              {" "}
              login
            </Link>
          </p>
        </Col>
      </Row>
    </>
  );
}

export default Register;
