import { useParams } from "react-router-dom";
import LayoutMahasiswa from "../../../layouts/Mahasiswa";
import style from "./Miniquiz.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { GETmateri, GETminiquiz } from "../../../graphql/query";
import { Radio, Space } from "antd";
import { CustomButton, ModalScore } from "../../../components";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ADDjoinmahasiswamateri } from "../../../graphql/mutation";

const isDev = process.env.NODE_ENV === "development";

const axiosInstance = axios.create({
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "qwwJa5iNIZeyRdOeNCNJTDtXj8vWmg3nvb7vDf6bKY2RCrP1YaKcl1Aejo1A5h3x",
  },
});

function MiniQuiz() {
  const { id_materi } = useParams();
  const { loading, error, data } = useQuery(GETminiquiz, {
    variables: { id_materi },
  });
  console.log(data);
  const [changeAnswerLoading, setChangeAnswerLoading] = useState(false);
  const [dataMiniquiz, setDataMiniquiz] = useState([]);
  const idUser = JSON.parse(Cookies.get("user")).id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);

  const { data: allMateri } = useQuery(GETmateri);
  const [addMateri] = useMutation(ADDjoinmahasiswamateri);
  const materiIndex = allMateri?.materi.findIndex((element) => {
    return element.id_materi === Number(id_materi);
  });
  const nextMateri = allMateri?.materi[materiIndex + 1];

  const onChange = async (e, item) => {
    const idSoal = item.id_soal_miniquiz;
    const jawaban = e.target.value;
    setChangeAnswerLoading(true);
    await axiosInstance.post(
      isDev
        ? "http://localhost:8080/miniquiz/answer"
        : "https://swara-production.up.railway.app/miniquiz/answer",
      {
        idSoal,
        idMahasiswa: idUser,
        idMateri: id_materi,
        answer: jawaban,
      }
    );
    setChangeAnswerLoading(false);
    setDataMiniquiz([
      ...dataMiniquiz,
      {
        jawaban_miniquiz: jawaban,
        id_soal_miniquiz: idSoal,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    if (dataMiniquiz.length === data.soal_miniquiz.length) {
      setChangeAnswerLoading(true);
      const score = await axiosInstance.post(
        isDev
          ? "http://localhost:8080/miniquiz/generate/score"
          : "https://swara-production.up.railway.app/miniquiz/generate/score",
        {
          idMahasiswa: idUser,
          idMateri: id_materi,
        }
      );
      setChangeAnswerLoading(false);
      setIsModalOpen(true);
      setScore(score.data.miniquiz_score);
      setDataMiniquiz([]);
      addMateri({
        variables: {
          id_mahasiswa: idUser,
          id_materi: nextMateri.id_materi,
        },
      });
    } else {
      alert("Data masih ada yang kosong");
    }
  };

  return (
    <>
      <ModalScore
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        score={score}
      />
      <LayoutMahasiswa>
        <div className={style.layout}>
          <h2
            style={{
              textAlign: "center",
            }}>
            Miniquiz
          </h2>
          <ol>
            {data?.soal_miniquiz.map((item) => {
              return (
                <>
                  <li>
                    <h5>{item.soal_miniquiz}</h5>

                    <Radio.Group onChange={(e) => onChange(e, item)}>
                      <Space direction='vertical'>
                        <Radio
                          value={item.pilihan_a_miniquiz}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_a_miniquiz}
                        </Radio>
                        <Radio
                          value={item.pilihan_b_miniquiz}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_b_miniquiz}
                        </Radio>
                        <Radio
                          value={item.pilihan_c_miniquiz}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_c_miniquiz}
                        </Radio>
                        <Radio
                          value={item.pilihan_d_miniquiz}
                          disabled={changeAnswerLoading}>
                          {item.pilihan_d_miniquiz}
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

export default MiniQuiz;
