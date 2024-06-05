import mongoose from "mongoose";

const criminalSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		alias: {
			type: String,
		},
		statement: {
			type: String,
		},
		image: {
			type: String,
		},
		imageId: {
			type: String,
		},
		inmateNumber: {
			type: Number,
		},
		dob: {
			type: String,
		},
		gender: {
			type: String,
		},
		nationality: {
			type: String,
		},
		address: {
			type: String,
		},
		identificationNumber: {
			type: String,
		},
		height: {
			type: String,
		},
		weight: {
			type: String,
		},
		eyeColor: {
			type: String,
		},
		hairColor: {
			type: String,
		},
		arrestDate: {
			type: String,
		},
		arrestLocation: {
			type: String,
		},
		charges: {
			type: String,
		},
		status: {
			type: String,
		},
		sealed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Criminal = mongoose.model("Criminal", criminalSchema);

export default Criminal;
