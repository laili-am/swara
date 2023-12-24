import LayoutAdmin from "../../../layouts/Admin";
import { useState, useEffect } from "react";
import { Form } from "antd";
import { CustomButton, CustomInput } from "../../../components";
import { EDITposttest } from "../../../graphql/mutation";
import { GETposttest, GETsoalPosttestbyId } from "../../../graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import style from "./EditPosttest.module.css";

function EditPosttest() {
  const { id_soal_posttest } = useParams();
  const { data: dataFetched } = useQuery(GETsoalPosttestbyId, {
    variables: { id_soal_posttest },
  });

  const [data, setData] = useState({
    soal_posttest: "",
    pilihan_a_posttest: "",
    pilihan_b_posttest: "",
    pilihan_c_posttest: "",
    pilihan_d_posttest: "",
    jawaban_benar_posttest: "",
  });

  useEffect(() => {
    setData({
      soal_posttest: dataFetched?.soal_posttest_by_pk.soal_posttest,
      pilihan_a_posttest: dataFetched?.soal_posttest_by_pk.pilihan_a_posttest,
      pilihan_b_posttest: dataFetched?.soal_posttest_by_pk.pilihan_b_posttest,
      pilihan_c_posttest: dataFetched?.soal_posttest_by_pk.pilihan_c_posttest,
      pilihan_d_posttest: dataFetched?.soal_posttest_by_pk.pilihan_d_posttest,
      jawaban_benar_posttest:
        dataFetched?.soal_posttest_by_pk.jawaban_benar_posttest,
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
  const [updateSoalPosttest] = useMutation(EDITposttest, {
    refetchQueries: [GETposttest],
  });
  const editSoalPosttest = (newSoal) => {
    updateSoalPosttest({
      variables: {
        id_soal_posttest: id_soal_posttest,
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
      editSoalPosttest(newData);
      setData({
        ...data,
        soal_posttest: "",
        pilihan_a_posttest: "",
        pilihan_b_posttest: "",
        pilihan_c_posttest: "",
        pilihan_d_posttest: "",
        jawaban_benar_posttest: "",
      });
      alert("Edit soal posttest berhasil!");
    } else {
      alert("Data masih ada yang kosong");
    }
  };
  return (
    <>
      <LayoutAdmin>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center" }}>Edit Soal Posttest</h2>
          <Form.Item
            className={style.form}
            rules={[
              {
                required: true,
                message: "Soal posttest tidak boleh kosong!",
              },
            ]}>
            <p className={style.body1}>Soal Posttest</p>
            <CustomInput
              value={data?.soal_posttest}
              className={style.input}
              name='soal_posttest'
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
              value={data?.pilihan_a_posttest}
              className={style.input}
              name='pilihan_a_posttest'
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
              value={data?.pilihan_b_posttest}
              className={style.input}
              name='pilihan_b_posttest'
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
              value={data?.pilihan_c_posttest}
              className={style.input}
              name='pilihan_c_posttest'
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
              value={data?.pilihan_d_posttest}
              className={style.input}
              name='pilihan_d_posttest'
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
              value={data?.jawaban_benar_posttest}
              className={style.input}
              name='jawaban_benar_posttest'
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
export default EditPosttest;
