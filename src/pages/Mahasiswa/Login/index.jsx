import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import { Form, Input, Row, Col } from "antd";
import { CustomButton, CustomInput } from "../../../components";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useLazyQuery } from "@apollo/client";
import { GETuser_mahasiswa, CEKemail } from "../../../graphql/query";
import { useNavigate } from "react-router-dom";

const cookie = new Cookies();
function Login() {
  const [getData, { data: dataUser, loading }] =
    useLazyQuery(GETuser_mahasiswa);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState({
    email: "",
    password: "",
    wrong: "",
  });

  const [able, setAble] = useState(false);
  const navigate = useNavigate();
  const emailRex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[gmail]+(?:\.[com]+)*$/;

  const handleChange = (e) => {
    const key = e.target.id;
    const val = e.target.value;

    if (key === "basic_email") {
      setData({ ...data, email: val });

      setErr({ ...err, email: "" });

      return;
    }

    setData({ ...data, password: val });
  };

  const login = (e) => {
    e.preventDefault();
    getData({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  useEffect(() => {}, [data, dataUser]);

  useEffect(() => {
    if (data.email === "" && data.password === "") {
      setAble(false);
    } else if (err.email === "" && err.password === "") {
      setAble(true);
    } else {
      setAble(false);
    }
  }, [data, err]);

  useEffect(() => {
    if (dataUser !== undefined) {
      if (dataUser?.mahasiswa.length === 1) {
        const userData = JSON.stringify({
          id: dataUser.mahasiswa[0].id_mahasiswa,
          roles: dataUser.mahasiswa[0].role,
        });
        cookie.set("user", userData);
        return navigate("/");
      } else if (dataUser?.mahasiswa.length !== 1) {
        setErr({ ...err, wrong: "Email atau password salah!" });
      }
      if (cookie.get("user")) {
        return navigate("/");
      }
    }
  }, [dataUser]);

  return (
    <>
      <Row>
        <Col className={style.kotak}></Col>
        <Col style={{ marginLeft: "55vw", transform: "translate(0%, 40%)" }}>
          <Form
            name='basic'
            layout='vertical'
            requiredMark={false}
            onSubmit={login}
            initialValues={{
              remember: true,
            }}>
            <h2 style={{ marginBottom: "24px" }}>Login</h2>

            <Form.Item
              className={style.input}
              label='Email'
              name='email'
              value={data.email}
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: "Email tidak boleh kosong!",
                },
                {
                  pattern:
                    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[gmail]+(?:\.[com]+)*$/,
                  message: "Format email tidak valid!",
                },
              ]}>
              <CustomInput placeholder='Masukkan Email Anda!' />
            </Form.Item>
            <Form.Item
              className={style.input}
              label='Password'
              name='password'
              value={data.password}
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: "Password tidak boleh kosong!",
                },
              ]}>
              <Input.Password
                className='input'
                placeholder='Masukkan Password Anda'
              />
            </Form.Item>

            <ul className={style.error}>
              {err.email !== "" && (
                <strong>
                  <li>
                    {err.email} <br />
                  </li>
                </strong>
              )}
              {err.wrong !== "" && (
                <strong>
                  <li>
                    {err.wrong} <br />
                  </li>
                </strong>
              )}
            </ul>
            <CustomButton
              variant='secondary'
              type={"submit"}
              style={{ width: "100%" }}
              able={able}
              onClick={login}>
              Login
            </CustomButton>
            <p className={`${style.link} ${style.linkMobile} body1-m`}>
              Anda belum punya akun? silahkan
              <Link to='/register' style={{ color: "var(--color-primary" }}>
                {" "}
                register
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Login;
