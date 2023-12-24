import { Row, Col, Input, Radio, Space } from "antd";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";
import style from "./Posttest.module.css";
import { useQuery, useMutation } from "@apollo/client";
import { GETsoalPosttest } from "../../../graphql/query";
import { CustomButton } from "../../../components";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "qwwJa5iNIZeyRdOeNCNJTDtXj8vWmg3nvb7vDf6bKY2RCrP1YaKcl1Aejo1A5h3x",
  },
});

function Posttest() {
  const { loading, error, data } = useQuery(GETsoalPosttest);

  const [dataPosttest, setDataPosttest] = useState([]);
  const [changeAnswerLoading, setChangeAnswerLoading] = useState(false);

  const idUser = JSON.parse(Cookies.get("user")).id;

  const onChange = async (e, item) => {
    const idSoal = item.id_soal_posttest;
    const jawaban = e.target.value;
    setChangeAnswerLoading(true);
    await axiosInstance.post("http://localhost:8080/posttest/answer", {
      idSoal,
      idMahasiswa: idUser,
      answer: jawaban,
    });
    setChangeAnswerLoading(false);
    setDataPosttest([
      ...dataPosttest,
      {
        jawaban_posttest: jawaban,
        id_soal_posttest: idSoal,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    if (dataPosttest.length === data.soal_posttest.length) {
      setChangeAnswerLoading(true);
      await axiosInstance.post(
        "http://localhost:8080/posttest/generate/score",
        {
          idMahasiswa: idUser,
        }
      );
      setChangeAnswerLoading(false);

      setDataPosttest([]);
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
            Posttest
          </h2>
          <ol>
            {data?.soal_posttest.map((item) => {
              return (
                <>
                  <li>
                    <h5>{item.soal_posttest}</h5>

                    <Radio.Group onChange={(e) => onChange(e, item)}>
                      <Space direction='vertical'>
                        <Radio
                          value={item.pilihan_a_posttest}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_a_posttest}
                        </Radio>
                        <Radio
                          value={item.pilihan_b_posttest}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_b_posttest}
                        </Radio>
                        <Radio
                          value={item.pilihan_c_posttest}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_c_posttest}
                        </Radio>
                        <Radio
                          value={item.pilihan_d_posttest}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_d_posttest}
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

export default Posttest;
