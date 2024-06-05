import express from "express";

import {
	getCriminals,
	createCriminalProfile,
	getCriminalById,
	updateCriminalProfile,
	deleteCriminalProfile,
	uploadCriminalImage,
} from "../controllers/criminalController";
import { protect } from "../middleware/authMiddleware";
import { createCriminalValidator, validate } from "../utils/validators";

const router = express.Router();

router
	.route("/")
	.get(protect, getCriminals)
	.post(protect, validate(createCriminalValidator), createCriminalProfile);
router
	.route("/:id")
	.get(getCriminalById)
	.put(protect, updateCriminalProfile)
	.delete(protect, deleteCriminalProfile);
router.route("/:id/image").put(protect, uploadCriminalImage);

export default router;
