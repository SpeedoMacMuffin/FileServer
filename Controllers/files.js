const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const filesController = {
  getAllFiles: async (__, res) => {
    const dir = `uploads/`;
    try {
      const files = await fs.readdirSync(dir);
      res.json({
        message: `successfully fetched all files in folder ${dir}`,
        status: 200,
        length: files.length,
        data: files,
      });
    } catch (err) {
      console.error(err);
    }
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
    const dirCheck = fs.readdirSync("uploads");
    if (dirCheck.length) {
      await fs.unlink(file, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        console.log(`${file} deleted`);
        res.json({
          code: 200,
          message: `${file} deleted`,
        });
      });
    } else {
      return res.send({
        message: `Folder already empty`,
      });
    }
  },
  deleteAll: async (__, res) => {
    const dir = "uploads";
    const dirCheck = fs.readdirSync("/uploads");

    if (dirCheck) {
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
    }
  },
};

module.exports = filesController;
