import multer from "multer";
import path from "path";
export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },

  filename: (req, file, cb) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("Resolved path:", path.resolve("./public/temp"));

    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      console.log("file.mimetype:", file.mimetype);
      cb(null, true); // accept file and upload it
    } else {
      cb(new Error("File format not supported")); // reject file
    }
  },
  //limits: {
  //  fileSize: 1024 * 1024 * 5, // 5MB
  //},
});

export default upload;
