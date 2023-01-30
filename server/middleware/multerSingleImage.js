const multer = require("multer");
function uploadImage(a) {
  const storage = multer.diskStorage({
    
    destination: `../client/./public/assets/images/${a}`,
    //destination: `./public/images/${a}`,

    filename: function (req, file, callback) {
      let extension = file.originalname.slice(file.originalname.lastIndexOf("."), file.originalname.length);
      callback(null, "Id-" + Date.now() + extension);
    },
  });

  const upload = multer({ storage: storage }).single("file");

  return upload;
}

module.exports = uploadImage;

