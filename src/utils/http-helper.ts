import { HttpResponse } from "../models/http-response-model";

export const ok = async (data: any): Promise<HttpResponse> => {
  return {
    statusCode: 200,
    body: data,
  };
};

export const noContent = async (): Promise<HttpResponse> => {
  return {
    statusCode: 204,
    body: null,
  };
};

export const badRequest = async (): Promise<HttpResponse> => {
  return {
    statusCode: 400,
    body: null,
  };
};

export const created = async (): Promise<HttpResponse> => {
  return {
    statusCode: 201,
    body: null
  };
};

export const internalServerError = async (): Promise<HttpResponse> => {
  return {
    statusCode: 500,
    body: null,
  };
};

export const notFound = async (): Promise<HttpResponse> => {
  return {
    statusCode: 404,
    body: null,
  };
};