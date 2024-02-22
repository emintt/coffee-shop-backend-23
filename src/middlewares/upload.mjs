import multer from "multer";
// multer configuration
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  },
  fileFilter: (req, file, cb) => {
    // allow only images and videos
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      // accept file
      cb(null, true);
    } else {
      // reject file
      const error = new Error("file missing or invalid");
      error.status = 400;
      cb(error, false);
    }
  },
});
export default upload;
