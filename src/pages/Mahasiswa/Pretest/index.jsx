import { Row, Col, Input, Radio, Space } from "antd";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";
import style from "./Pretest.module.css";
import { useQuery, useMutation } from "@apollo/client";
import { GETsoalPretest } from "../../../graphql/query";
import { CustomButton } from "../../../components";
import {
  INSERTjawabanPretest,
  ADDjoinmahasiswamateri,
} from "../../../graphql/mutation";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRoutes, useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "qwwJa5iNIZeyRdOeNCNJTDtXj8vWmg3nvb7vDf6bKY2RCrP1YaKcl1Aejo1A5h3x",
  },
});

function Pretest() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GETsoalPretest);
  const [addMateri] = useMutation(ADDjoinmahasiswamateri);

  const [dataPretest, setDataPretest] = useState([]);
  const [changeAnswerLoading, setChangeAnswerLoading] = useState(false);

  const idUser = JSON.parse(Cookies.get("user")).id;

  const onChange = async (e, item) => {
    const idSoal = item.id_soal_pretest;
    const jawaban = e.target.value;
    setChangeAnswerLoading(true);
    await axiosInstance.post("http://localhost:8080/pretest/answer", {
      idSoal,
      idMahasiswa: idUser,
      answer: jawaban,
    });
    setChangeAnswerLoading(false);
    setDataPretest([
      ...dataPretest,
      {
        jawaban_pretest: jawaban,
        id_soal_pretest: idSoal,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    if (dataPretest.length === data.soal_pretest.length) {
      setChangeAnswerLoading(true);
      await axiosInstance.post("http://localhost:8080/pretest/generate/score", {
        idMahasiswa: idUser,
      });
      addMateri({
        variables: {
          id_mahasiswa: idUser,
          id_materi: 18,
        },
      });
      setChangeAnswerLoading(false);

      setDataPretest([]);
      navigate("/Pembelajaran");
    } else {
      alert("Data masih ada yang kosong");
    }
  };

  return (
    <>
      <LayoutMahasiswa>
        <div className={style.layout}>
          <h2
            style={{
              textAlign: "center",
            }}>
            Pretest
          </h2>
          <ol>
            {data?.soal_pretest.map((item) => {
              return (
                <>
                  <li>
                    <h5>{item.soal_pretest}</h5>

                    <Radio.Group onChange={(e) => onChange(e, item)}>
                      <Space direction='vertical'>
                        <Radio
                          value={item.pilihan_a_pretest}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_a_pretest}
                        </Radio>
                        <Radio
                          value={item.pilihan_b_pretest}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_b_pretest}
                        </Radio>
                        <Radio
                          value={item.pilihan_c_pretest}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_c_pretest}
                        </Radio>
                        <Radio
                          value={item.pilihan_d_pretest}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_d_pretest}
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </li>
                </>
              );
            })}
          </ol>
          <CustomButton
            variant='secondary'
            onClick={handleSubmit}
            style={{ marginTop: "16px" }}>
            Submit
          </CustomButton>
        </div>
      </LayoutMahasiswa>
    </>
  );
}

export default Pretest;
