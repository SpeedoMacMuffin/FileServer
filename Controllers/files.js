const fs = require("fs");

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
};

module.exports = filesController;
