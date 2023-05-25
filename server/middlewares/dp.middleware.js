const multer = require("multer");

const filterOptions = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  )
    cb(null, true);
  else cb(null, false);
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profileImages/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname
    );
  },
});

var dpUpload = multer({
  storage: storage,
  fileFilter: filterOptions,
});

module.exports = dpUpload;
