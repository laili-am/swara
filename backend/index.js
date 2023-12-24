const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
// const port = 8080;
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const axiosInstance = axios.create({
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "qwwJa5iNIZeyRdOeNCNJTDtXj8vWmg3nvb7vDf6bKY2RCrP1YaKcl1Aejo1A5h3x",
  },
});

app.get("/", (_, res) => {
  res.send("Hello It's Swara");
});

app.post("/pretest/answer", (req, res) => {
  const reqIdMahasiswa = req.body.idMahasiswa;
  const reqIdSoal = req.body.idSoal;
  const reqAnswer = req.body.answer;
  const getData = async () => {
    const dataSoalPretest = await axiosInstance.get(
      `https://swara.hasura.app/api/rest/soal/pretest/${reqIdSoal}`
    );
    const jawabanBenar =
      dataSoalPretest.data.soal_pretest[0].jawaban_benar_pretest;

    const data = await axiosInstance.post(
      `https://swara.hasura.app/api/rest/pretest/tambahjawaban/${reqIdSoal}/${reqIdMahasiswa}/${reqAnswer}/${
        jawabanBenar === reqAnswer
      }`
    );
    res.send(data.data.insert_pretest.returning[0]);
  };
  getData();
});

app.post("/pretest/generate/score", (req, res) => {
  const reqIdMahasiswa = req.body.idMahasiswa;
  const generateScore = async () => {
    const allTrueAnswers = await axiosInstance.put(
      `https://swara.hasura.app/api/rest/pretest/true/answer/${reqIdMahasiswa}`
    );
    const totalTrueAnswer = allTrueAnswers.data.pretest.length || 0;

    const allSoal = await axiosInstance.get(
      `https://swara.hasura.app/api/rest/all/soal/pretest`
    );
    const lengthAllSoal = allSoal.data.soal_pretest.length;
    const scoreCount = Math.round((totalTrueAnswer / lengthAllSoal) * 100);

    const gettotalScore = await axiosInstance.get(
      `https://swara.hasura.app/api/rest/totalscore/${reqIdMahasiswa}`
    );
    const totalScore = gettotalScore.data.mahasiswa[0].total_score;

    const response = await axiosInstance.put(
      `https://swara.hasura.app/api/rest/pretest/score/${reqIdMahasiswa}/${scoreCount}`
    );

    const setTotalScore = await axiosInstance.put(
      `https://swara.hasura.app/api/rest/set/totalscore/${reqIdMahasiswa}/${
        scoreCount + totalScore
      }`
    );

    const setSubmitedTrue = await axiosInstance.put(
      `https://swara.hasura.app/api/rest/pretest/submited/${reqIdMahasiswa}`
    );
    res.send({ pretest_score: scoreCount });
  };
  generateScore();
});

app.post("/posttest/answer", (req, res) => {
  const reqIdMahasiswa = req.body.idMahasiswa;
  const reqIdSoal = req.body.idSoal;
  const reqAnswer = req.body.answer;
  const getData = async () => {
    const dataSoalPosttest = await axiosInstance.get(
      `https://swara.hasura.app/api/rest/soal/posttest/${reqIdSoal}`
    );
    const jawabanBenar =
      dataSoalPosttest.data.soal_posttest[0].jawaban_benar_posttest;

    const data = await axiosInstance.post(
      `https://swara.hasura.app/api/rest/posttest/tambahjawaban/${reqIdSoal}/${reqIdMahasiswa}/${reqAnswer}/${
        jawabanBenar === reqAnswer
      }`
    );
    res.send(data.data.insert_posttest.returning[0]);
  };
  getData();
});

app.post("/posttest/generate/score", (req, res) => {
  const reqIdMahasiswa = req.body.idMahasiswa;
  const generateScore = async () => {
    const allTrueAnswers = await axiosInstance.put(
      `https://swara.hasura.app/api/rest/posttest/true/answer/${reqIdMahasiswa}`
    );
    const totalTrueAnswer = allTrueAnswers.data.posttest.length || 0;

    const allSoal = await axiosInstance.get(
      `https://swara.hasura.app/api/rest/all/soal/posttest`
    );
    const lengthAllSoal = allSoal.data.soal_posttest.length;
    const scoreCount = Math.round((totalTrueAnswer / lengthAllSoal) * 100);

    const gettotalScore = await axiosInstance.get(
      `https://swara.hasura.app/api/rest/totalscore/${reqIdMahasiswa}`
    );
    const totalScore = gettotalScore.data.mahasiswa[0].total_score;

    const response = await axiosInstance.put(
      `https://swara.hasura.app/api/rest/posttest/score/${reqIdMahasiswa}/${scoreCount}`
    );

    const setTotalScore = await axiosInstance.put(
      `https://swara.hasura.app/api/rest/set/totalscore/${reqIdMahasiswa}/${
        scoreCount + totalScore
      }`
    );

    const setSubmitedTrue = await axiosInstance.put(
      `https://swara.hasura.app/api/rest/posttest/submited/${reqIdMahasiswa}`
    );
    res.send({ posttest_score: scoreCount });
  };
  generateScore();
});

app.post("/miniquiz/answer", (req, res) => {
  const reqIdMahasiswa = req.body.idMahasiswa;
  const reqIdMateri = req.body.idMateri;
  const reqIdSoal = req.body.idSoal;
  const reqAnswer = req.body.answer;
  const getData = async () => {
    const dataSoalMiniquiz = await axiosInstance.get(
      `https://swara.hasura.app/api/rest/soal/miniquiz/${reqIdSoal}`
    );
    const jawabanBenar =
      dataSoalMiniquiz.data.soal_miniquiz[0].jawaban_benar_miniquiz;

    const data = await axiosInstance.post(
      `https://swara.hasura.app/api/rest/miniquiz/tambahjawaban/${reqIdSoal}/${reqIdMahasiswa}/${reqIdMateri}/${reqAnswer}/${
        jawabanBenar === reqAnswer
      }`
    );
    res.send(data.data.insert_miniquiz.returning[0]);
  };
  getData();
});

app.post("/miniquiz/generate/score", (req, res) => {
  const reqIdMahasiswa = req.body.idMahasiswa;
  const reqIdMateri = req.body.idMateri;
  const generateScore = async () => {
    const allTrueAnswers = await axiosInstance.get(
      `https://swara.hasura.app/api/rest/miniquiz/true/answer/${reqIdMahasiswa}/${reqIdMateri}`
    );
    const totalTrueAnswer = allTrueAnswers.data.miniquiz.length || 0;

    const allSoal = await axiosInstance.get(
      `https://swara.hasura.app/api/rest/all/soal/miniquiz/${reqIdMateri}`
    );
    const lengthAllSoal = allSoal.data.soal_miniquiz.length;
    const scoreCount = Math.round((totalTrueAnswer / lengthAllSoal) * 100);

    const gettotalScore = await axiosInstance.get(
      `https://swara.hasura.app/api/rest/totalscore/${reqIdMahasiswa}`
    );
    const totalScore = gettotalScore.data.mahasiswa[0].total_score;

    const setTotalScore = await axiosInstance.put(
      `https://swara.hasura.app/api/rest/set/totalscore/${reqIdMahasiswa}/${
        scoreCount + totalScore
      }`
    );

    const setSubmitedTrue = await axiosInstance.put(
      `https://swara.hasura.app/api/rest/miniquiz/submited/${reqIdMahasiswa}/${reqIdMateri}`
    );
    res.send({ miniquiz_score: scoreCount });
  };
  generateScore();
});

app.listen(port, "0.0.0.0", function () {
  console.log(`Example app listening on port ${port}`);
});
// app.listen(port, () => {});
