import { Router } from "express";
import { uploadUserAvatar } from "../controllers/user.controller";
import upload from "../middlewares/multer.middleware";

const router = Router();

router.post("/upload/avatar", upload.single("avatar"), uploadUserAvatar);

export default router;
