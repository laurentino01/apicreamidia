import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpHandler } from "../utils/HttpHandler";

export async function mongoConnect(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    try {
      next();
    } catch {}
    console.log("database up...");
    return mongoose;
  } catch (error) {
    return new HttpHandler().badRequest(res, error);
  }
}
