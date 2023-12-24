import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { GETuser_admin } from "../../../graphql/query";
import style from "./Login.module.css";
import { Form, Input, Row, Col, message, Space } from "antd";
import { CustomButton, CustomInput } from "../../../components";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const cookie = new Cookies();
function LoginAdmin() {
  const message = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const error = () => {
      messageApi.open({
        type: "error",
        content: "Email atau password Salah!",
      });
    };
  };

  const [getData, { data: dataUser, loading }] = useLazyQuery(GETuser_admin);
  useEffect(() => {
    console.log("dataUser:", dataUser);
  }, dataUser);

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

  const handleChange = (e) => {
    const key = e.target.id;
    const val = e.target.value;

    if (key === "basic_email") {
      setData({ ...data, email: val });
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
      if (dataUser?.admin.length === 1) {
        const userData = JSON.stringify({
          id: dataUser.admin[0].id_admin,
          roles: dataUser.admin[0].role,
        });
        cookie.set("admin", userData);
        return navigate("/admin/Kelola-User");
      } else if (dataUser?.admin.length !== 1) {
        setErr({
          ...err,
          wrong: "Email atau password salah!",
        });
      }
      if (cookie.get("admin")) {
        return navigate("/admin/Kelola-User");
      }
    }
  }, [dataUser]);

  return (
    <>
      <Row className={style.background}>
        <Row className={style.container}>
          <Col>
            <Form
              name='basic'
              layout='vertical'
              requiredMark={false}
              onSubmit={login}
              initialValues={{
                remember: true,
              }}>
              <Row justify={"center"}>
                <h2>Login</h2>
              </Row>
              <p className={style.text}> Email</p>
              <Form.Item
                className={style.input}
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
              <p className={style.text}>Password</p>

              <Form.Item
                className={style.input}
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

              <ul className='error'>
                {err.email !== "" && (
                  <li>
                    {err.email} <br />
                  </li>
                )}
                {err.wrong !== "" && (
                  <li>
                    {err.wrong} <br />
                  </li>
                )}
              </ul>

              <CustomButton
                variant='primary'
                type={"submit"}
                style={{ width: "100%" }}
                able={able}
                onClick={login}>
                Login
              </CustomButton>
            </Form>
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default LoginAdmin;
