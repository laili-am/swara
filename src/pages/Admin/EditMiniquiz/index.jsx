import LayoutAdmin from "../../../layouts/Admin";
import { useMutation, useQuery } from "@apollo/client";
import { EDITminiquiz } from "../../../graphql/mutation";
import { GETminiquiz, GETsoalMiniquizbyId } from "../../../graphql/query";
import { useState } from "react";
import { Form, Input, Row, Col, Alert, Space } from "antd";
import { CustomButton, CustomInput } from "../../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import style from "./EditMiniquiz.module.css";

function EditMiniquiz() {
  const { id_soal_miniquiz } = useParams();
  const { data: dataFetched } = useQuery(GETsoalMiniquizbyId, {
    variables: { id_soal_miniquiz },
  });

  console.log(id_soal_miniquiz);

  const [data, setData] = useState({
    soal_miniquiz: "",
    pilihan_a_miniquiz: "",
    pilihan_b_miniquiz: "",
    pilihan_c_miniquiz: "",
    pilihan_d_miniquiz: "",
    jawaban_benar_miniquiz: "",
  });

  useEffect(() => {
    setData({
      soal_miniquiz: dataFetched?.soal_miniquiz_by_pk.soal_miniquiz,
      pilihan_a_miniquiz: dataFetched?.soal_miniquiz_by_pk.pilihan_a_miniquiz,
      pilihan_b_miniquiz: dataFetched?.soal_miniquiz_by_pk.pilihan_b_miniquiz,
      pilihan_c_miniquiz: dataFetched?.soal_miniquiz_by_pk.pilihan_c_miniquiz,
      pilihan_d_miniquiz: dataFetched?.soal_miniquiz_by_pk.pilihan_d_miniquiz,
      jawaban_benar_miniquiz:
        dataFetched?.soal_miniquiz_by_pk.jawaban_benar_miniquiz,
    });
  }, [dataFetched]);
  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const [updateSoalMiniquiz] = useMutation(EDITminiquiz, {
    refetchQueries: [GETsoalMiniquizbyId],
  });
  const editSoalMiniquiz = (newSoal) => {
    updateSoalMiniquiz({
      variables: {
        id_soal_miniquiz: id_soal_miniquiz,
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
      editSoalMiniquiz(newData);
      setData({
        ...data,
        soal_miniquiz: "",
        pilihan_a_miniquiz: "",
        pilihan_b_miniquiz: "",
        pilihan_c_miniquiz: "",
        pilihan_d_miniquiz: "",
        jawaban_benar_miniquiz: "",
      });
      alert("Edit soal mini quiz berhasil!");
    } else {
      alert("Data masih ada yang kosong");
    }
  };
  return (
    <>
      <LayoutAdmin>
        <Form
          onSubmit={handleSubmit}
          name='basic'
          layout='vertical'
          requiredMark={false}
          initialValues={{
            remember: true,
          }}>
          <h2 style={{ textAlign: "center" }}>Edit Soal Miniquiz</h2>
          <Form.Item
            className={style.form}
            rules={[
              {
                required: true,
                message: "Soal mini quiz tidak boleh kosong!",
              },
            ]}>
            <p className={style.body1}>Soal Miniquiz</p>
            <CustomInput
              value={data?.soal_miniquiz}
              className={style.input}
              name='soal_miniquiz'
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            className={style.form}
            rules={[
              {
                required: true,
                message: "Pilihan A tidak boleh kosong!",
              },
            ]}>
            <p className={style.body1}>Pilihan A</p>
            <CustomInput
              value={data?.pilihan_a_miniquiz}
              className={style.input}
              name='pilihan_a_miniquiz'
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            className={style.form}
            rules={[
              {
                required: true,
                message: "Pilihan B tidak boleh kosong!",
              },
            ]}>
            <p className={style.body1}>Pilihan B</p>
            <CustomInput
              value={data?.pilihan_b_miniquiz}
              className={style.input}
              name='pilihan_b_miniquiz'
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            className={style.form}
            rules={[
              {
                required: true,
                message: "Pilihan C tidak boleh kosong!",
              },
            ]}>
            <p className={style.body1}>Pilihan C</p>
            <CustomInput
              value={data?.pilihan_c_miniquiz}
              className={style.input}
              name='pilihan_c_miniquiz'
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            className={style.form}
            rules={[
              {
                required: true,
                message: "Pilihan D tidak boleh kosong!",
              },
            ]}>
            <p className={style.body1}>Pilihan D</p>
            <CustomInput
              value={data?.pilihan_d_miniquiz}
              className={style.input}
              name='pilihan_d_miniquiz'
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            className={style.form}
            rules={[
              {
                required: true,
                message: "Jawaban benar tidak boleh kosong!",
              },
            ]}>
            <p className={style.body1}>Jawaban Benar</p>
            <CustomInput
              value={data?.jawaban_benar_miniquiz}
              className={style.input}
              name='jawaban_benar_miniquiz'
              onChange={onChange}
            />
          </Form.Item>

          <CustomButton
            variant='secondary'
            onClick={handleSubmit}
            style={{ marginTop: "16px" }}>
            Simpan
          </CustomButton>
        </Form>
      </LayoutAdmin>
      ;
    </>
  );
}

export default EditMiniquiz;
