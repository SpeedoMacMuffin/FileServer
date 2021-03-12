const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const filesController = {
  getAllFiles: async (__, res) => {
    const dir = `uploads/`;
    try {
      const files = await fs.readdirSync(dir);
      // files.forEach((file) => {
      //   const data = fs.stat(dir + file, (err, stats) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //     file = { filename: file, stats };

      //     console.log(file);
      //   });
      // });
      res.json({
        message: `successfully fetched all files in folder ${dir}`,
        status: 200,
        length: files.length,
        data: files,
      });
    } catch (err) {
      console.error(err);
    }
    // await fs.readdir(dir, function (err, files) {
    //   if (err) {
    //     throw err;
    //   }

    //   files
    //     .map(function (file) {
    //       return path.join(dir, file);
    //     })
    //     .filter(function (file) {
    //       return fs.statSync(file).isFile();
    //     })
    //     .forEach(function (file) {
    //       console.log("%s (%s)", file, path.extname(file));
    //     });
    // });
    // res.json({
    //   message: `successfully fetched all files in folder ${dir}`,
    //   status: 200,
    //   length: files.length,
    //   data: files,
    // });
  },
  getFileInfo: async (req, res) => {
    const { id } = req.params;
    const file = `uploads/` + id;
    const detail = await fs.stat(file, (err, stats) => {
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
  },
  deleteFile: async (req, res) => {
    const { id } = req.params;
    const file = `uploads/` + id;
    await fs.unlink(file, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.send({
        message: "File deleted",
      });
    });
  },
  deleteAll: async (__, res) => {
    const dir = "uploads";
    await fs.unlink(dir, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      } else {
        fs.mkdir(dir, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
          res.json({
            message: `successfully deleted and reinstated path ${dir}`,
          });
        });
      }
    });
  },
};

module.exports = filesController;
