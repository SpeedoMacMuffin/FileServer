const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4000;
const fs = require("fs");
const cors = require("cors");

app.use(cors());

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ message: "Hello World!" }));
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const file = req.files.file;

  file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
app.get("/upload/:id", (req, res) => {
  const { id } = req.params;
  const file = `${__dirname}/uploads/${id}`;
  fs.readFile(file, function (err, data) {
    res.write(data);
    return res.end();
  });
});

app.get("/local", (req, res) => {
  const dir = `${__dirname}/uploads`;
  try {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      console.log(file);
    });
    res.json({
      message: `successfully fetched all files in folder ${dir}`,
      status: 200,
      length: files.length,
      data: files,
    });
  } catch (err) {
    console.error(err);
  }
});
app.get("/local/:id", (req, res) => {
  const { id } = req.params;
  const file = `${__dirname}/uploads/` + id;
  const detail = fs.stat(file, (err, stats) => {
    if (err) {
      console.log(err);
    }
    res.json({
      message: "succesfully fetched data",
      data: {
        name: id,
        url: file,
        details: stats,
      },
    });
  });
});
app.get("/download/:id", (req, res) => {
  const { id } = req.params;
  const file = `${__dirname}/uploads/` + id;
  res.download(file);
});

app.listen(PORT, () =>
  console.log(`DeadNode-FileServer connected on port ${PORT}`)
);
