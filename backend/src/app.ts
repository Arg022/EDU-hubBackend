import express from "express";
import dotenv from "dotenv";
import fileRoutes from "./routes/fileRoutes";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import type { NextFunction, Request, Response } from "express";

dotenv.config();

const BACKEND_SERVICE_URL =
  process.env.BACKEND_SERVICE_URL || "http://localhost:8083";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api/v1/materials", fileRoutes);

// middleware di logging
app.use((req: Request, response: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  next(); // chiamo la next function per passare al prossimo middleware della chain
});

// Middleware per risorsa non trovata
app.use((req, res, next) => {
  const error = new CustomError("Resource not found.", 404);
  next(error);
});

// Middleware per la gestione degli errori
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ error: err.message });
  } else {
    res.status(500).send({ error: err.message });
  }
});

// Classe di errore personalizzata
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
  }
}

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});