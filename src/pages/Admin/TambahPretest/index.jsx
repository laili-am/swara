import LayoutAdmin from "../../../layouts/Admin";
import { INSERTsoal_pretest } from "../../../graphql/mutation";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form } from "antd";
import { CustomButton, CustomInput } from "../../../components";
import style from "./TambahPretest.module.css";
import { useEffect } from "react";
import { GETpretest } from "../../../graphql/query";
import { useNavigate } from "react-router-dom";

function TambahPretest() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    soal_pretest: "",
    pilihan_a_pretest: "",
    pilihan_b_pretest: "",
    pilihan_c_pretest: "",
    pilihan_d_pretest: "",
    jawaban_benar_pretest: "",
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

  const [insertSoalPretest] = useMutation(INSERTsoal_pretest, {
    refetchQueries: [GETpretest],
  });
  const tambahSoalPretest = (newSoal) => {
    insertSoalPretest({
      variables: {
        soal_pretest: newSoal.soal_pretest,
        pilihan_a_pretest: newSoal.pilihan_a_pretest,
        pilihan_b_pretest: newSoal.pilihan_b_pretest,
        pilihan_c_pretest: newSoal.pilihan_c_pretest,
        pilihan_d_pretest: newSoal.pilihan_d_pretest,
        jawaban_benar_pretest: newSoal.jawaban_benar_pretest,
      },
    });
  };

  const handleSubmit = (e) => {
    if (
      data.soal_pretest &&
      data.pilihan_a_pretest &&
      data.pilihan_b_pretest &&
      data.pilihan_c_pretest &&
      data.pilihan_d_pretest &&
      data.jawaban_benar_pretest
    ) {
      const newData = {
        soal_pretest: data.soal_pretest,
        pilihan_a_pretest: data.pilihan_a_pretest,
        pilihan_b_pretest: data.pilihan_b_pretest,
        pilihan_c_pretest: data.pilihan_c_pretest,
        pilihan_d_pretest: data.pilihan_d_pretest,
        jawaban_benar_pretest: data.jawaban_benar_pretest,
      };
      tambahSoalPretest(newData);
      setData({
        ...data,
        soal_pretest: "",
        pilihan_a_pretest: "",
        pilihan_b_pretest: "",
        pilihan_c_pretest: "",
        pilihan_d_pretest: "",
        jawaban_benar_pretest: "",
      });
      alert("Penambahan soal pretest berhasil!");
      navigate("/admin/Kelola-Pretest");
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
          <h2 style={{ textAlign: "center" }}>Tambah Soal Pretest</h2>
          <p className={style.body1}>Soal Pretest</p>
          <Form.Item
            className={style.form}
            value={data.soal_pretest}
            name='soal_pretest'
            onChange={onChange}
            rules={[
              {
                required: true,
                message: "Soal pretest tidak boleh kosong!",
              },
            ]}>
            <CustomInput placeholder='Masukkan soal pretest' />
          </Form.Item>
          <p className={style.body1}>Pilihan A</p>

          <Form.Item
            className={style.form}
            value={data.pilihan_a_pretest}
            name='pilihan_a_pretest'
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
            value={data.pilihan_b_pretest}
            name='pilihan_b_pretest'
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
            value={data.pilihan_c_pretest}
            name='pilihan_c_pretest'
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
            value={data.pilihan_d_pretest}
            name='pilihan_d_pretest'
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
            value={data.jawaban_benar_pretest}
            name='jawaban_benar_pretest'
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

export default TambahPretest;
