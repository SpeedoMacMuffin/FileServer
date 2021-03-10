const downloadController = {
  download: (req, res) => {
    const { id } = req.params;
    const file = "uploads/" + id;
    res.download(file);
  },
};

module.exports = downloadController;
