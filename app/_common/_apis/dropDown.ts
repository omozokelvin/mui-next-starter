import { httpService } from '@/app/_common/_apis/httpService';
import { HttpSuccessResponse } from '@/app/_common/_types/ApiResponse';
import { CountryEnum } from '@/app/_common/_types/DropDown';

export const getStatesApi = async (
  country: CountryEnum
): Promise<HttpSuccessResponse<string[]>> => {
  return httpService.get(`datalookup/states/${country}`);
};
