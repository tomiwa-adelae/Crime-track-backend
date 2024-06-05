import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface UserDocument extends mongoose.Document {
	isModified: (path?: string) => boolean;
	password: string;
}

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		image: {
			type: String,
			required: true,
			default:
				"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		imageId: {
			type: String,
		},
	},
	{ timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (this: UserDocument, next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
