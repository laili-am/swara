import LayoutAdmin from "../../../layouts/Admin";
import { INSERTsoal_miniquiz } from "../../../graphql/mutation";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Form } from "antd";
import { CustomButton, CustomInput } from "../../../components";
import { GETminiquiz } from "../../../graphql/query";
import style from "./TambahMiniQuiz.module.css";
import { useNavigate, useParams } from "react-router-dom";

function TambahMiniquiz() {
  const navigate = useNavigate();
  const { id_materi } = useParams();

  const [data, setData] = useState({
    soal_miniquiz: "",
    pilihan_a_miniquiz: "",
    pilihan_b_miniquiz: "",
    pilihan_c_miniquiz: "",
    pilihan_d_miniquiz: "",
    jawaban_benar_miniquiz: "",
  });
  const onChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const [insertSoalMiniquiz] = useMutation(INSERTsoal_miniquiz, {
    refetchQueries: [GETminiquiz],
  });
  const tambahSoalMiniquiz = (newSoal) => {
    insertSoalMiniquiz({
      variables: {
        id_materi: id_materi,
        soal_miniquiz: newSoal.soal_miniquiz,
        pilihan_a_miniquiz: newSoal.pilihan_a_miniquiz,
        pilihan_b_miniquiz: newSoal.pilihan_b_miniquiz,
        pilihan_c_miniquiz: newSoal.pilihan_c_miniquiz,
        pilihan_d_miniquiz: newSoal.pilihan_d_miniquiz,
        jawaban_benar_miniquiz: newSoal.jawaban_benar_miniquiz,
      },
    });
  };

  const handleSubmit = (e) => {
    if (
      data.soal_miniquiz &&
      data.pilihan_a_miniquiz &&
      data.pilihan_b_miniquiz &&
      data.pilihan_c_miniquiz &&
      data.pilihan_d_miniquiz &&
      data.jawaban_benar_miniquiz
    ) {
      const newData = {
        soal_miniquiz: data.soal_miniquiz,
        pilihan_a_miniquiz: data.pilihan_a_miniquiz,
        pilihan_b_miniquiz: data.pilihan_b_miniquiz,
        pilihan_c_miniquiz: data.pilihan_c_miniquiz,
        pilihan_d_miniquiz: data.pilihan_d_miniquiz,
        jawaban_benar_miniquiz: data.jawaban_benar_miniquiz,
      };
      tambahSoalMiniquiz(newData);
      setData({
        ...data,
        soal_miniquiz: "",
        pilihan_a_miniquiz: "",
        pilihan_b_miniquiz: "",
        pilihan_c_miniquiz: "",
        pilihan_d_miniquiz: "",
        jawaban_benar_miniquiz: "",
      });
      alert("Penambahan soal mini quiz berhasil!");
      navigate("/admin/Kelola-MiniQuiz");
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
          <h2 style={{ textAlign: "center" }}>Tambah Soal Miniquiz</h2>

          <p className={style.body1}>Soal Miniquiz</p>
          <Form.Item
            className={style.form}
            value={data.soal_miniquiz}
            name='soal_miniquiz'
            onChange={onChange}
            rules={[
              {
                required: true,
                message: "Soal miniquiz tidak boleh kosong!",
              },
            ]}>
            <CustomInput placeholder='Masukkan soal miniquiz' />
          </Form.Item>
          <p className={style.body1}>Pilihan A</p>

          <Form.Item
            className={style.form}
            value={data.pilihan_a_miniquiz}
            name='pilihan_a_miniquiz'
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
            value={data.pilihan_b_miniquiz}
            name='pilihan_b_miniquiz'
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
            value={data.pilihan_c_miniquiz}
            name='pilihan_c_miniquiz'
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
            value={data.pilihan_d_miniquiz}
            name='pilihan_d_miniquiz'
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
            value={data.jawaban_benar_miniquiz}
            name='jawaban_benar_miniquiz'
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

export default TambahMiniquiz;
