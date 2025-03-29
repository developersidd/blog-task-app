import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

// configure environment variables
dotenv.config({ path: "./.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  console.log("name", process.env.CLOUDINARY_API_KEY);
  try {
    if (!localFilePath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: "nnsel-portfolio-task",
      resource_type: "auto", // jpeg, png etc
    });
    console.log("response:", response);
    return response;
  } catch (err) {
    console.log("uploading error", err);
    return null;
  } finally {
    // remove the local file
    fs.unlinkSync(localFilePath);
  }
};

const deleteFromCloudinary = async (public_id: string) => {
  try {
    const res = await cloudinary.uploader.destroy(public_id);
    return res;
  } catch (error) {
    // console.log("error on deleting from cloudinary:", error);
    return null;
  }
};

export { deleteFromCloudinary, uploadOnCloudinary };
