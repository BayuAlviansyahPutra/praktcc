const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "34.101.134.51",
  user: "bayu",
  password: "bayu",
  database: "arsip",
});

db.connect();

app.get("/surat", (req, res) => {
  db.query("SELECT * FROM surat", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/surat", (req, res) => {
  const {
    nama_surat,
    no_surat,
    pihak_pertama,
    pihak_kedua,
    tanggal_masuk,
    tanggal_keluar,
    keterangan,
    file,
  } = req.body;
  db.query(
    "INSERT INTO surat (nama_surat, no_surat, pihak_pertama, pihak_kedua, tanggal_masuk, tanggal_keluar, keterangan, file) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nama_surat,
      no_surat,
      pihak_pertama,
      pihak_kedua,
      tanggal_masuk,
      tanggal_keluar,
      keterangan,
      file,
    ],
    (err) => {
      if (err) throw err;
      res.status(201).json({ message: "Surat added successfully" });
    }
  );
});

app.put("/surat/:id", (req, res) => {
  const { id } = req.params;
  const {
    nama_surat,
    no_surat,
    pihak_pertama,
    pihak_kedua,
    tanggal_masuk,
    tanggal_keluar,
    keterangan,
    file,
  } = req.body;
  db.query(
    "UPDATE surat SET nama_surat = ?, no_surat = ?, pihak_pertama = ?, pihak_kedua = ?, tanggal_masuk = ?, tanggal_keluar = ?, keterangan = ?, file = ? WHERE id = ?",
    [
      nama_surat,
      no_surat,
      pihak_pertama,
      pihak_kedua,
      tanggal_masuk,
      tanggal_keluar,
      keterangan,
      file,
      id,
    ],
    (err) => {
      if (err) throw err;
      res.json({ message: "Surat updated successfully" });
    }
  );
});

app.delete("/surat/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM surat WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Surat deleted successfully" });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Surat service running on port ${PORT}`);
});
