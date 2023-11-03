import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

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
    console.log("conectado ao banco com sucesso!");
    return mongoose;
  } catch (error) {
    return error;
  }
}
