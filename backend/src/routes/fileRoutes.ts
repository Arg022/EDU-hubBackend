import { Router } from "express";
import {
  uploadFile,
  listFiles,
  deleteFile,
  getFile,
  downloadFile,
} from "../controllers/fileController";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", listFiles);
router.get("/:filename", getFile);
router.get("/download/:materialId", downloadFile);
router.delete("/delete/:filename", deleteFile);

export default router;
