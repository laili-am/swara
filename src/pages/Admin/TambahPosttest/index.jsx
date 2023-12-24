import LayoutAdmin from "../../../layouts/Admin";
import { INSERTsoal_posttest } from "../../../graphql/mutation";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form } from "antd";
import { CustomButton, CustomInput } from "../../../components";
import style from "./TambahPosttest.module.css";
import { useEffect } from "react";
import { GETposttest } from "../../../graphql/query";
import { useNavigate } from "react-router-dom";

function TambahPosttest() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    soal_posttest: "",
    pilihan_a_posttest: "",
    pilihan_b_posttest: "",
    pilihan_c_posttest: "",
    pilihan_d_posttest: "",
    jawaban_benar_posttest: "",
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

  const [insertSoalPosttest] = useMutation(INSERTsoal_posttest, {
    refetchQueries: [GETposttest],
  });
  const tambahSoalPosttest = (newSoal) => {
    insertSoalPosttest({
      variables: {
        soal_posttest: newSoal.soal_posttest,
        pilihan_a_posttest: newSoal.pilihan_a_posttest,
        pilihan_b_posttest: newSoal.pilihan_b_posttest,
        pilihan_c_posttest: newSoal.pilihan_c_posttest,
        pilihan_d_posttest: newSoal.pilihan_d_posttest,
        jawaban_benar_posttest: newSoal.jawaban_benar_posttest,
      },
    });
  };

  const handleSubmit = (e) => {
    if (
      data.soal_posttest &&
      data.pilihan_a_posttest &&
      data.pilihan_b_posttest &&
      data.pilihan_c_posttest &&
      data.pilihan_d_posttest &&
      data.jawaban_benar_posttest
    ) {
      const newData = {
        soal_posttest: data.soal_posttest,
        pilihan_a_posttest: data.pilihan_a_posttest,
        pilihan_b_posttest: data.pilihan_b_posttest,
        pilihan_c_posttest: data.pilihan_c_posttest,
        pilihan_d_posttest: data.pilihan_d_posttest,
        jawaban_benar_posttest: data.jawaban_benar_posttest,
      };
      tambahSoalPosttest(newData);
      setData({
        ...data,
        soal_posttest: "",
        pilihan_a_posttest: "",
        pilihan_b_posttest: "",
        pilihan_c_posttest: "",
        pilihan_d_posttest: "",
        jawaban_benar_posttest: "",
      });
      alert("Penambahan soal posttest berhasil!");
      navigate("/admin/Kelola-Posttest");
    } else {
      alert("Data masih ada yang kosong");
    }
  };
  return (
    <>
      <LayoutAdmin>
        <Form
          onSubmit={handleSubmit}
          layout='vertical'
          requiredMark={false}
          initialValues={{
            remember: true,
          }}>
          <h2 style={{ textAlign: "center" }}>Tambah Soal Posttest</h2>
          <p className={style.body1}>Soal Posttest</p>
          <Form.Item
            className={style.form}
            value={data.soal_posttest}
            name='soal_posttest'
            onChange={onChange}
            rules={[
              {
                required: true,
                message: "Soal posttest tidak boleh kosong!",
              },
            ]}>
            <CustomInput placeholder='Masukkan soal posttest' />
          </Form.Item>
          <p className={style.body1}>Pilihan A</p>

          <Form.Item
            className={style.form}
            value={data.pilihan_a_posttest}
            name='pilihan_a_posttest'
            onChange={onChange}
            rules={[
              {
                required: true,
                message: "Pilihan A tidak boleh kosong!",
              },
            ]}>
            <CustomInput placeholder='Masukkan pilihan A' />
          </Form.Item>
          <p className={style.body1}>Pilihan B</p>

          <Form.Item
            className={style.form}
            value={data.pilihan_b_posttest}
            name='pilihan_b_posttest'
            onChange={onChange}
            rules={[
              {
                required: true,
                message: "Pilihan B tidak boleh kosong!",
              },
            ]}>
            <CustomInput placeholder='Masukkan pilihan B' />
          </Form.Item>
          <p className={style.body1}>Pilihan C</p>

          <Form.Item
            className={style.form}
            value={data.pilihan_c_posttest}
            name='pilihan_c_posttest'
            onChange={onChange}
            rules={[
              {
                required: true,
                message: "Pilihan C tidak boleh kosong!",
              },
            ]}>
            <CustomInput placeholder='Masukkan pilihan C' />
          </Form.Item>
          <p className={style.body1}>Pilihan D</p>

          <Form.Item
            className={style.form}
            value={data.pilihan_d_posttest}
            name='pilihan_d_posttest'
            onChange={onChange}
            rules={[
              {
                required: true,
                message: "Pilihan D tidak boleh kosong!",
              },
            ]}>
            <CustomInput placeholder='Masukkan pilihan D' />
          </Form.Item>
          <p className={style.body1}>Jawaban Benar</p>

          <Form.Item
            className={style.form}
            value={data.jawaban_benar_posttest}
            name='jawaban_benar_posttest'
            onChange={onChange}
            rules={[
              {
                required: true,
                message: "Jawaban benar tidak boleh kosong!",
              },
            ]}>
            <CustomInput placeholder='Masukkan jawaban benar' />
          </Form.Item>

          <CustomButton
            variant='secondary'
            onClick={handleSubmit}
            style={{ marginTop: "16px" }}>
            Simpan
          </CustomButton>
        </Form>
      </LayoutAdmin>
    </>
  );
}

export default TambahPosttest;
