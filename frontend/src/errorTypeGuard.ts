import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// export interface IDataError {
//   error: string;
//   message: string[];
//   statusCode: number;
//   status: number;
// }

export interface IError {
  status: number;
  data: object;
}

const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
  return error && typeof error.status === "number";
};

export const handleError = (error: any) => {
  if (isFetchBaseQueryError(error)) return error as IError;
};
