import { HTTPService } from '../../utils/axios/index';
import { API_END_POINTS } from '../../utils/constant/ApiEndPoints';
import { IApiRes } from '../ActionType';

export const ChangePasswordApi = (
  body: IChangePasswordApiParams
): Promise<IApiRes> => {
  return HTTPService.put(API_END_POINTS.ADMIN.CHANGE_PASSWORD, body);
};

interface IChangePasswordApiParams {
  userId?: string;
  oldPassword: string;
  newPassword: string;
}