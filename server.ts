import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";

import { connectDB } from "./config/db";

import { errorHandler, notFound } from "./middleware/errorMiddleware";

import criminalRoutes from "./routes/criminalRoutes";
import userRoutes from "./routes/userRoutes";

const app: Express = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

// API Routes
app.use("/api/criminals", criminalRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
	res.send(" API is up and running... ");
});

// Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
