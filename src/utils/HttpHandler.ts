import { Response } from "express";

export class HttpHandler {
  constructor() {}

  ok(res: Response, data?: any) {
    return res.status(200).json({
      status: 200,
      body: { data },
    });
  }
  unauthorized(res: Response, data?: any) {
    return res.status(401).json({
      status: 401,
      body: { data },
    });
  }

  badRequest(res: Response, data?: any) {
    return res.status(400).json({
      status: 400,
      body: { data },
    });
  }
}
