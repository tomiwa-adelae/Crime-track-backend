import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Criminal from "../models/criminalModel";
import cloudinary from "../middleware/cloudinaryMiddleware";

declare module "express-serve-static-core" {
	export interface Request {
		user: any;
	}
}

// @desc    Fetch all criminals
// @route   GET /api/criminals
// @access  Private
const getCriminals = asyncHandler(async (req: Request, res: Response) => {
	const keyword = req.query.keyword
		? {
				$or: [
					{
						name: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						statement: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						alias: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						gender: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						nationality: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						address: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						identificationNumber: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						height: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						weight: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						eyeColor: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						hairColor: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						arrestDate: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						arrestLocation: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						charges: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
					{
						status: {
							$regex: req.query.keyword,
							$options: "i",
						},
					},
				],
		  }
		: {};
	const criminals = await Criminal.find({ ...keyword }).sort({
		updatedAt: -1,
	});

	res.status(200).json(criminals);
});

// @desc    Fetch a criminal by ID
// @route   GET /api/criminals/:id
// @access  Public
const getCriminalById = asyncHandler(async (req: Request, res: Response) => {
	const criminal = await Criminal.findById(req.params.id);

	if (criminal) {
		res.status(200).json(criminal);
	} else {
		res.status(400);
		throw new Error("Internal server error!");
	}
});

// @desc    Create a new criminal profile
// @route   POST /api/criminals
// @access  Private/admin
const createCriminalProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const { name } = req.body;

		if (!name) {
			res.status(400);
			throw new Error("Criminal name is required!");
		}

		const criminal = await Criminal.create({
			name,
		});

		if (criminal) {
			res.status(201).json(criminal);
		} else {
			res.status(400);
			throw new Error("Internal server error!");
		}
	}
);

// @desc    Update a criminal profile
// @route   PUT /api/criminals/:id
// @access  Private
const updateCriminalProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const criminal = await Criminal.findById(req.params.id);

		if (criminal) {
			criminal.name = req.body.name || criminal.name;
			criminal.statement = req.body.statement || criminal.statement;
			criminal.alias = req.body.alias || criminal.alias;
			criminal.image = req.body.image || criminal.image;
			criminal.dob = req.body.dob || criminal.dob;
			criminal.gender = req.body.gender || criminal.gender;
			criminal.nationality = req.body.nationality || criminal.nationality;
			criminal.address = req.body.address || criminal.address;
			criminal.identificationNumber =
				req.body.identificationNumber || criminal.identificationNumber;
			criminal.height = req.body.height || criminal.height;
			criminal.weight = req.body.weight || criminal.weight;
			criminal.eyeColor = req.body.eyeColor || criminal.eyeColor;
			criminal.hairColor = req.body.hairColor || criminal.hairColor;
			criminal.arrestDate = req.body.arrestDate || criminal.arrestDate;
			criminal.arrestLocation =
				req.body.arrestLocation || criminal.arrestLocation;
			criminal.charges = req.body.charges || criminal.charges;
			criminal.status = req.body.status || criminal.status;
			criminal.sealed = req.body.sealed || criminal.sealed;

			const updatedCriminalProfile = await criminal.save();

			res.status(200).json(updatedCriminalProfile);
		} else {
			res.status(400);
			throw new Error("Internal server error!");
		}
	}
);

// @desc    Delete a criminal profile
// @route   DELETE /api/criminals/:id
// @access  Private/admin
const deleteCriminalProfile = asyncHandler(
	async (req: Request, res: Response) => {
		const criminal = await Criminal.findById(req.params.id);

		if (criminal) {
			if (criminal.imageId) {
				await cloudinary.uploader.destroy(criminal.imageId, {
					invalidate: true,
				});
				await Criminal.deleteOne({ _id: criminal._id });
				res.status(200).json({
					message: "Criminal deleted successfully!",
				});
			} else {
				await Criminal.deleteOne({ _id: criminal._id });
				res.status(200).json({
					message: "Criminal deleted successfully!",
				});
			}
		} else {
			res.status(400);
			throw new Error("Internal server error!");
		}
	}
);

// @desc    Update a criminal image
// @route   PUT /api/criminals/:id/image
// @access  Private
const uploadCriminalImage = asyncHandler(
	async (req: Request, res: Response) => {
		const { image } = req.body;
		const criminal = await Criminal.findById(req.params.id);

		if (criminal) {
			if (criminal.imageId) {
				await cloudinary.uploader.destroy(criminal.imageId, {
					invalidate: true,
				});

				const uploadResponse = await cloudinary.uploader.upload(image, {
					upload_preset: "tekskillup",
				});

				criminal.image = uploadResponse.url;
				criminal.imageId = uploadResponse.public_id;

				const updatedCriminal = await criminal.save();

				res.status(200).json(updatedCriminal);
			} else {
				const uploadResponse = await cloudinary.uploader.upload(image, {
					upload_preset: "crimetrack",
				});

				criminal.image = uploadResponse.url;
				criminal.imageId = uploadResponse.public_id;

				const updatedCriminal = await criminal.save();

				res.status(200).json(updatedCriminal);
			}
		} else {
			res.status(400);
			throw new Error("Internal server error!");
		}
	}
);

export {
	getCriminals,
	createCriminalProfile,
	getCriminalById,
	updateCriminalProfile,
	deleteCriminalProfile,
	uploadCriminalImage,
};
