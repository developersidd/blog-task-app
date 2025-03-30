import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";

const uploadUserAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "Please upload an image");
  const data = await uploadOnCloudinary(req.file?.path);
  console.log(" data:", data)
  if (!data) throw new ApiError(500, "Error uploading image to cloudinary");
  const { secure_url, public_id } = data;
  return res.status(201).json(
    new ApiResponse(
      200,
      {
        secure_url,
        public_id,
      },
      "Image uploaded successfully"
    )
  );
});

export { uploadUserAvatar };
