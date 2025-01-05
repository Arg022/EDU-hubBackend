import { Request, Response } from "express";
import prisma from "../config/db";
import { v4 as uuidv4 } from "uuid";
import { MaterialType } from "@prisma/client";

export const uploadFile = async (
  req: Request & {
    file?: Express.Multer.File;
    body: {
      courseId?: string;
      creatorId?: string;
      title?: string;
      id?: string;
    };
  },
  res: Response
) => {
  try {
    if (!req.file || !req.body.courseId || !req.body.creatorId) {
      res.status(400).json({
        error: "No file uploaded, courseId or creatorId not provided",
      });
      return;
    }

    const fileType: MaterialType = determineFileType(req.file.mimetype);
    const title = req.body.title || req.file.originalname;
    const id = req.body.id || uuidv4();

    const file = await prisma.material.create({
      data: {
        id: id,
        title: title,
        data: req.file.buffer,
        type: fileType,
        size: req.file.size,
        creatorId: req.body.creatorId,
        courseId: req.body.courseId,
      },
    });

    res.status(201).json(file);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
};

export const listFiles = async (req: Request, res: Response) => {
  try {
    const files = await prisma.material.findMany();

    res.status(200).json(files);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching files" });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const file = await prisma.material.findFirst({
      where: {
        title: req.params.filename,
      },
    });

    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    await prisma.material.delete({
      where: {
        id: file.id,
      },
    });

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting file" });
  }
};

export const getFile = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;

    const file = await prisma.material.findFirst({
      where: {
        title: filename,
      },
    });

    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    res.setHeader("Content-Type", file.type);
    res.send(file.data);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving file" });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const { materialId } = req.params;
    console.log("Material ID:", req.params);
    const material = await prisma.material.findUnique({
      where: { id: materialId },
    });

    if (!material) {
      res.status(404).json({ error: "Material not found" });
      return;
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${material.title}"`
    );

    res.setHeader("Content-Type", "application/octet-stream");
    res.send(material.data);
  } catch (error) {
    console.error("Error downloading material", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const determineFileType = (mimeType: string): MaterialType => {
  if (mimeType.startsWith("image/")) {
    return MaterialType.IMAGE;
  } else if (mimeType === "application/pdf") {
    return MaterialType.PDF;
  } else if (mimeType.startsWith("video/")) {
    return MaterialType.VIDEO;
  } else {
    return MaterialType.OTHER;
  }
};
