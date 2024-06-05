import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (res: Response, userId: object) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
		expiresIn: "30d",
	});

	return token;
};

export default generateToken;
