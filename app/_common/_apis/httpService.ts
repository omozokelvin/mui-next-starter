import { HttpErrorResponse } from '@/app/_common/_types/ApiResponse';
import axios, { AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const httpService = axios.create({ baseURL });

httpService.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error: AxiosError<HttpErrorResponse>) => {
    throw error?.response?.data;
  }
);
