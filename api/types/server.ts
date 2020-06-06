import {
  Request as RestifyRequest,
  Response as RestifyResponse,
  Next,
  Server,
  Route as RestifyRoute,
} from "restify";

export interface CustomError {
  code: number;
  status: number;
  message: string;
  key: string;
}

export interface Request extends RestifyRequest {}

export interface Response extends RestifyResponse {
  error: (err: CustomError) => void;
}

export interface Route {
  (server: Server): RestifyRoute | boolean;
}

export { Next, Server };
