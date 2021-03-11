const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const server = require("./serverConfig");
const PORT = server.PORT;

const cors = require("cors");

app.use(cors());

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const filesRoutes = require("./Routes/files");
const uploadRoutes = require("./Routes/upload");
const downloadRoutes = require("./Routes/download");

app.use("/local", filesRoutes);
app.use("/upload", uploadRoutes);
app.use("/download", downloadRoutes);

app.listen(PORT, () =>
  console.log(`DeadNode-FileServer connected on port ${PORT}`)
);
