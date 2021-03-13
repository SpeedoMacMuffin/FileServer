const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const uploadController = {
  routeCheck: (req, res) => {},
  upload: async (req, res) => {
    const uuid = Math.floor(Math.random() * 100000 + 1);
    if (req.files === null) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = req.files.file;

    const uploads = fs.readdirSync("uploads");
    uploads.forEach((upload) => {
      if (upload === file.name) {
        file.name = file.name.replace(
          /^([^.]+)$|(\.[^.]+)$/i,
          "$1" + uuid + "$2"
        );
      }
    });
    // exec(`echo ${file.name}`, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`exec error: ${error}`);
    //     return;
    //   }
    //   console.log(`${stdout}`);
    //   console.error(`stderr: ${stderr}`);
    // });
    await file.mv(`uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.send({
        fileName: file.name,
        filePath: `uploads/${file.name}`,
      });
    });
    console.log(file);
  },
  open: (req, res) => {
    const { id } = req.params;
    const file = `uploads/${id}`;
    fs.readFile(file, (err, data) => {
      if (err) {
        console.log(err);
      }
      res.write(data);
      return res.end();
    });
  },
};

module.exports = uploadController;
