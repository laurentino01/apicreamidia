import { Response } from "express";

export class HttpHandler {
  constructor() {}

  conflict(res: Response, data?: any) {
    return res.status(409).json({
      status: 409,
      body: { data },
    });
  }

  ok(res: Response, data?: any) {
    return res.status(200).json({
      status: 200,
      body: { data },
    });
  }
  notFound(res: Response, data?: any) {
    return res.status(404).json({
      status: 404,
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
