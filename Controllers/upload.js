const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const uploadController = {
  //upload single file
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
    await file.mv(`uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      // const filetypes = /jpeg|jpg|png|gif/;
      // const extname = filetypes.test(path.extname(file.name).toLowerCase());
      // const mimetype = filetypes.test(file.mimetype);
      //will only work on pi. removes exif-data from supported files
      // if (mimetype && extname) {
      //   exec(
      //     `exiftool -EXIF= /home/pi/DeadNode/FileServer/uploads/${file.name}`,
      //     (e, stdout, stderr) => {
      //       if (e) {
      //         console.error(e);
      //         throw e;
      //       }

      //       console.log("stdout", stdout);
      //       exec(
      //         `rm -rf /home/pi/DeadNode/FileServer/uploads/${file.name}_original`
      //       );
      //     }
      //   );
      // }
      res.send({
        fileName: file.name,
        filePath: `uploads/${file.name}`,
        fileSize: file.size,
      });
    });
  },
  //opens file
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
