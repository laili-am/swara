import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import { Form } from "antd";
import { CustomButton, CustomInput } from "../../../components";
import { EDITpretest } from "../../../graphql/mutation";
import { GETpretest, GETsoalPretestbyId } from "../../../graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import style from "./EditPretest.module.css";

function EditPretest() {
  const { id_soal_pretest } = useParams();
  const { data: dataFetched } = useQuery(GETsoalPretestbyId, {
    variables: { id_soal_pretest },
  });

  const [data, setData] = useState({
    soal_pretest: "",
    pilihan_a_pretest: "",
    pilihan_b_pretest: "",
    pilihan_c_pretest: "",
    pilihan_d_pretest: "",
    jawaban_benar_pretest: "",
  });

  useEffect(() => {
    setData({
      soal_pretest: dataFetched?.soal_pretest_by_pk.soal_pretest,
      pilihan_a_pretest: dataFetched?.soal_pretest_by_pk.pilihan_a_pretest,
      pilihan_b_pretest: dataFetched?.soal_pretest_by_pk.pilihan_b_pretest,
      pilihan_c_pretest: dataFetched?.soal_pretest_by_pk.pilihan_c_pretest,
      pilihan_d_pretest: dataFetched?.soal_pretest_by_pk.pilihan_d_pretest,
      jawaban_benar_pretest:
        dataFetched?.soal_pretest_by_pk.jawaban_benar_pretest,
    });
  }, [dataFetched]);

  // useEffect(() => {
  //   console.log("data: ", data);
  // }, [data]);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const [updateSoalPretest] = useMutation(EDITpretest, {
    refetchQueries: [GETsoalPretestbyId],
  });
  const editSoalPretest = (newSoal) => {
    updateSoalPretest({
      variables: {
        id_soal_pretest: id_soal_pretest,
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
      editSoalPretest(newData);
      setData({
        ...data,
        soal_pretest: "",
        pilihan_a_pretest: "",
        pilihan_b_pretest: "",
        pilihan_c_pretest: "",
        pilihan_d_pretest: "",
        jawaban_benar_pretest: "",
      });
      alert("Edit soal pretest berhasil!");
    } else {
      alert("Data masih ada yang kosong");
    }
  };
  return (
    <>
      <LayoutAdmin>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center" }}>Edit Soal Pretest</h2>
          <Form.Item
            className={style.form}
            rules={[
              {
                required: true,
                message: "Soal pretest tidak boleh kosong!",
              },
            ]}>
            <p className={style.body1}>Soal Pretest</p>
            <CustomInput
              value={data?.soal_pretest}
              className={style.input}
              name='soal_pretest'
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
              value={data?.pilihan_a_pretest}
              className={style.input}
              name='pilihan_a_pretest'
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
              value={data?.pilihan_b_pretest}
              className={style.input}
              name='pilihan_b_pretest'
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
              value={data?.pilihan_c_pretest}
              className={style.input}
              name='pilihan_c_pretest'
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
              value={data?.pilihan_d_pretest}
              className={style.input}
              name='pilihan_d_pretest'
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
              value={data?.jawaban_benar_pretest}
              className={style.input}
              name='jawaban_benar_pretest'
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
    </>
  );
}
export default EditPretest;
