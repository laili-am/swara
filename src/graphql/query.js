import { gql } from "@apollo/client";

export const CEKjawaban_mahasiswa_isDuplicated = gql`
  query CekJawaban($id_mahasiswa: Int, $id_soal_pretest: Int) {
    pretest(
      where: {
        _and: {
          id_mahasiswa: { _eq: $id_mahasiswa }
          id_soal_pretest: { _eq: $id_soal_pretest }
        }
      }
    ) {
      id_pretest
      jawaban_pretest
      id_soal_pretest
      id_mahasiswa
    }
  }
`;

export const CEKemail = gql`
  query MyQuery($_eq: String) {
    mahasiswa(where: { email: { _eq: $_eq } }) {
      email
    }
  }
`;

export const ALLmateribymahasiswaID = gql`
  query MyQuery($id_mahasiswa: Int) {
    mahasiswa_materi(where: { id_mahasiswa: { _eq: $id_mahasiswa } }) {
      materi {
        id_materi
        judul_materi
        materi
        media_gambar
        media_video
      }
    }
  }
`;

export const CEKmahasiswa_materi = gql`
  query cekMahasiswaMateri($id_materi: Int, $id_mahasiswa: Int) {
    mahasiswa_materi(
      where: {
        id_mahasiswa: { _eq: $id_mahasiswa }
        id_materi: { _eq: $id_materi }
      }
    ) {
      id_mahasiswa
      id
      id_materi
    }
  }
`;

export const ALLmaterimahasiswaID = gql`
  query MyQuery($id_mahasiswa: Int) {
    mahasiswa_materi(where: { id_mahasiswa: { _eq: $id_mahasiswa } }) {
      id_materi
    }
  }
`;

export const ALLmaterimahasiswa = gql`
  query MyQuery($id_materi: Int) {
    materi(where: { id_materi: { _eq: $id_materi } }) {
      media_video
      media_gambar
      materi
      judul_materi
    }
  }
`;

export const cekJawabanMahasiswa = gql`
  query MyQuery($id_mahasiswa: Int, $id_posttest: Int) {
    posttest(
      where: {
        _and: {
          id_mahasiswa: { _eq: $id_mahasiswa }
          id_posttest: { _eq: $id_posttest }
        }
      }
    ) {
      selesai
    }
  }
`;

export const GETuser_admin = gql`
  query MyQuery($email: String!, $password: String!) {
    admin(where: { email: { _iregex: $email }, password: { _eq: $password } }) {
      id_admin
      email
      password
      role
    }
  }
`;

export const GETuser_mahasiswa = gql`
  query MyQuery($email: String!, $password: String!) {
    mahasiswa(
      where: { email: { _iregex: $email }, password: { _eq: $password } }
    ) {
      id_mahasiswa
      email
      password
      role
    }
  }
`;
export const GETuser = gql`
  query MyQuery {
    mahasiswa {
      id_mahasiswa
      nama
      email
      password
      konfirmasi_password
      jenis_kelamin
      no_telepon
      tanggal_lahir
      avatar
      total_score
    }
  }
`;

export const GETmateri = gql`
  query MyQuery {
    materi(order_by: { id_materi: asc }) {
      id_materi
      judul_materi
      materi
      media_gambar
      media_video
    }
  }
`;

export const GETpretest = gql`
  query MyQuery {
    soal_pretest {
      id_soal_pretest
      soal_pretest
      pilihan_a_pretest
      pilihan_b_pretest
      pilihan_c_pretest
      pilihan_d_pretest
      jawaban_benar_pretest
    }
  }
`;

export const GETminiquiz = gql`
  query MyQuery($id_materi: Int!) {
    soal_miniquiz(where: { id_materi: { _eq: $id_materi } }) {
      id_soal_miniquiz
      soal_miniquiz
      pilihan_a_miniquiz
      pilihan_b_miniquiz
      pilihan_c_miniquiz
      pilihan_d_miniquiz
      jawaban_benar_miniquiz
    }
  }
`;

export const GETposttest = gql`
  query MyQuery {
    soal_posttest {
      id_soal_posttest
      soal_posttest
      pilihan_a_posttest
      pilihan_b_posttest
      pilihan_c_posttest
      pilihan_d_posttest
      jawaban_benar_posttest
    }
  }
`;

export const GETsoalPosttest = gql`
  query MyQuery {
    soal_posttest {
      id_soal_posttest
      soal_posttest
      pilihan_a_posttest
      pilihan_b_posttest
      pilihan_c_posttest
      pilihan_d_posttest
    }
  }
`;

export const GETsoalPretest = gql`
  query MyQuery {
    soal_pretest {
      id_soal_pretest
      soal_pretest
      pilihan_a_pretest
      pilihan_b_pretest
      pilihan_c_pretest
      pilihan_d_pretest
    }
  }
`;

export const GETsoalMiniquiz = gql`
  query MyQuery {
    soal_miniquiz {
      id_soal_miniquiz
      soal_miniquiz
      pilihan_a_miniquiz
      pilihan_b_miniquiz
      pilihan_c_miniquiz
      pilihan_d_miniquiz
    }
  }
`;

// QUERY BY ID

export const GETUserbyId = gql`
  query MyQuery($id_mahasiswa: Int!) {
    mahasiswa_by_pk(id_mahasiswa: $id_mahasiswa) {
      nama
      email
      jenis_kelamin
      no_telepon
      tanggal_lahir
      avatar
    }
  }
`;

export const GETavatarbyid = gql`
  query MyQuery($id_mahasiswa: Int!) {
    mahasiswa_by_pk(id_mahasiswa: $id_mahasiswa) {
      avatar
    }
  }
`;

export const GETMateribyId = gql`
  query MyQuery($id_materi: Int!) {
    materi_by_pk(id_materi: $id_materi) {
      judul_materi
      materi
      media_gambar
      media_video
    }
  }
`;

export const GETsoalPretestbyId = gql`
  query MyQuery($id_soal_pretest: Int!) {
    soal_pretest_by_pk(id_soal_pretest: $id_soal_pretest) {
      jawaban_benar_pretest
      pilihan_a_pretest
      pilihan_b_pretest
      pilihan_c_pretest
      pilihan_d_pretest
      soal_pretest
    }
  }
`;
export const GETsoalPosttestbyId = gql`
  query MyQuery($id_soal_posttest: Int!) {
    soal_posttest_by_pk(id_soal_posttest: $id_soal_posttest) {
      jawaban_benar_posttest
      pilihan_a_posttest
      pilihan_b_posttest
      pilihan_c_posttest
      pilihan_d_posttest
      soal_posttest
    }
  }
`;
export const GETsoalMiniquizbyId = gql`
  query MyQuery($id_soal_miniquiz: Int!) {
    soal_miniquiz_by_pk(id_soal_miniquiz: $id_soal_miniquiz) {
      jawaban_benar_miniquiz
      pilihan_a_miniquiz
      pilihan_b_miniquiz
      pilihan_c_miniquiz
      pilihan_d_miniquiz
      soal_miniquiz
    }
  }
`;

export const GETmahasiswaLeaderboards = gql`
  query MyQuery {
    mahasiswa(order_by: { total_score: desc }) {
      nama
      avatar
      total_score
    }
  }
`;

export const GETscore = gql`
  query MyQuery($id_mahasiswa: Int!) {
    mahasiswa_by_pk(id_mahasiswa: $id_mahasiswa) {
      pretest_score
      posttest_score
    }
  }
`;

export const GETAllSoal = gql`
  query MyQuery {
    soal_miniquiz {
      soal_miniquiz
    }
    soal_posttest {
      soal_posttest
    }
    soal_pretest {
      soal_pretest
    }
  }
`;

export const GETPretestIsSubmited = gql`
  query MyQuery($id_mahasiswa: Int!) {
    pretest(
      where: {
        id_mahasiswa: { _eq: $id_mahasiswa }
        is_submited: { _eq: true }
      }
    ) {
      is_submited
      mahasiswa {
        nama
      }
    }
  }
`;

export const GETPosttestIsSubmited = gql`
  query MyQuery($id_mahasiswa: Int!) {
    posttest(
      where: {
        id_mahasiswa: { _eq: $id_mahasiswa }
        is_submited: { _eq: true }
      }
    ) {
      is_submited
      mahasiswa {
        nama
      }
    }
  }
`;

export const GETMiniquizIsSubmited = gql`
  query MyQuery($id_mahasiswa: Int!, $id_materi: Int!) {
    miniquiz(
      where: {
        id_mahasiswa: { _eq: $id_mahasiswa }
        id_materi: { _eq: $id_materi }
        is_submited: { _eq: true }
      }
    ) {
      is_submited
      mahasiswa {
        nama
      }
    }
  }
`;
