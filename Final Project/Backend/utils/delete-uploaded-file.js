const fs = require("fs");
const path = require("path");

const deleteUploadedFile = (filename, folder) => {

  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    folder,
    filename
  );

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

};

module.exports = deleteUploadedFile;