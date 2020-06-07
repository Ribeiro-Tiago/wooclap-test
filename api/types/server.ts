import {
  Request as RestifyRequest,
  Response as RestifyResponse,
  Next,
  Server,
  Route as RestifyRoute,
} from "restify";

export interface CustomError {
  status: number;
  message: string;
}

export interface Request extends RestifyRequest {}

export interface Response extends RestifyResponse {
  error: (err: CustomError, errors?: object) => void;
}

export interface Route {
  (server: Server): RestifyRoute | boolean;
}

export { Next, Server };
