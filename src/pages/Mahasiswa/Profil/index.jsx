import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { GETUserbyId, GETuser_mahasiswa } from "../../../graphql/query";
import { EDITprofil } from "../../../graphql/mutation";
import { useQuery, useMutation } from "@apollo/client";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";
import {
  CustomButton,
  CustomInput,
  ModalAvatar,
  Avatar,
} from "../../../components";
import { Form, Row, Select, DatePicker, Col } from "antd";
import style from "./Profil.module.css";
import Cookies from "js-cookie";

const { Option } = Select;
function Profil() {
  const idUser = JSON.parse(Cookies.get("user")).id;
  const { data: dataFetched } = useQuery(GETUserbyId, {
    variables: { id_mahasiswa: idUser },
  });

  const [data, setData] = useState({
    nama: "",
    email: "",
    no_telepon: "",
    jenis_kelamin: "",
    tanggal_lahir: "",
  });

  console.log("data: ", data);

  useEffect(() => {
    if (!dataFetched) return;
    const newData = {
      nama: dataFetched?.mahasiswa_by_pk?.nama,
      email: dataFetched?.mahasiswa_by_pk?.email,
      no_telepon: dataFetched?.mahasiswa_by_pk?.no_telepon,
      jenis_kelamin: dataFetched?.mahasiswa_by_pk?.jenis_kelamin,
      tanggal_lahir: dataFetched?.mahasiswa_by_pk?.tanggal_lahir,
    };
    setData(newData);
  }, [dataFetched]);

  const onChange = (e) => {
    if (e._d) {
      setData({
        ...data,
        tanggal_lahir: e._d,
      });
      return;
    }
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const onGenderChange = (value) => {
    setData({ ...data, jenis_kelamin: value });
  };

  const [updateProfil] = useMutation(EDITprofil, {
    refetchQueries: [GETuser_mahasiswa],
  });

  const editProfil = (newEdit) => {
    updateProfil({
      variables: {
        id_mahasiswa: idUser,
        nama: newEdit.nama,
        email: newEdit.email,
        no_telepon: newEdit.no_telepon,
        jenis_kelamin: newEdit.jenis_kelamin,
        tanggal_lahir: newEdit.tanggal_lahir,
      },
    });
  };

  const handleSubmit = (e) => {
    console.log("data: ", data);
    if (
      data.nama &&
      data.email &&
      data.no_telepon &&
      data.jenis_kelamin &&
      data.tanggal_lahir
    ) {
      const newData = {
        nama: data.nama,
        email: data.email,
        no_telepon: data.no_telepon,
        jenis_kelamin: data.jenis_kelamin,
        tanggal_lahir: data.tanggal_lahir,
      };
      editProfil(newData);
      setData({
        ...data,
        nama: "",
        email: "",
        no_telepon: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
      });
      alert("Data profil berhasil diperbarui");
    } else {
      alert("Data masih ada yang kosong");
    }
  };
  return (
    <>
      <LayoutMahasiswa>
        <Row justify={"center"}>
          <Form onSubmit={handleSubmit} initialValues={{ nama: data.nama }}>
            <h2 style={{ textAlign: "center" }}>Profil</h2>

            <Avatar />
            <Row justify={"center"} style={{ marginTop: "16px" }}>
              <ModalAvatar />
            </Row>

            <p className={style.body1}>Nama</p>

            <Form.Item
              className={style.input}
              id='nama'
              name='nama'
              onChange={onChange}
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
            <p className={style.body1}>Email</p>
            <Form.Item
              className={style.input}
              id='email'
              name='email'
              value={data.email}
              onChange={onChange}
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
            <p className={style.body1}>No Telepon</p>
            <Form.Item
              className={style.input}
              id='no_telepon'
              name='no_telepon'
              value={data.no_telepon}
              onChange={onChange}
              rules={[
                {
                  required: true,
                  message: "Nomor telepon tidak boleh kosong!",
                },
                {
                  pattern: /[0-9]/,
                  message: "Format nomor telepon tidak valid!",
                },
              ]}>
              <CustomInput placeholder='Masukkan Nomor Telepon Anda!' />
            </Form.Item>

            <p className={style.body1}>Jenis Kelamin</p>
            <Select
              placeholder='Pilih jenis kelamin'
              onChange={onGenderChange}
              id='jenis_kelamin'
              name='jenis_kelamin'
              label='jenis kelamin'
              className={style.input}
              rules={[
                {
                  required: true,
                },
              ]}
              allowClear>
              <Option value={"laki-laki"}>Laki-laki</Option>
              <Option value={"perempuan"}>Perempuan</Option>
            </Select>
            <p className={style.body1}>Tanggal Lahir</p>
            <DatePicker
              label='Tanggal Lahir'
              id='tanggal_lahir'
              name='tanggal_lahir'
              // onChange={onChange}
              // value={data?.tanggal_lahir}
              placeholder='Pilih tanggal lahir'
              className={style.input}
              onSelect={onChange}
            />

            <CustomButton variant={"secondary"} onClick={handleSubmit}>
              Simpan
            </CustomButton>
          </Form>
        </Row>
      </LayoutMahasiswa>
    </>
  );
}

export default Profil;
