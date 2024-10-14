import { HTTPService } from '../../utils/axios/index';
import { API_END_POINTS } from '../../utils/constant/ApiEndPoints';
import { IApiRes } from '../ActionType';

export const SetResetPasswordApi = (
  body: ISetPasswordApiParams
): Promise<IApiRes> => {
  return HTTPService.post(API_END_POINTS.AUTH.SET_RESET_PASSWORD, body);
};

interface ISetPasswordApiParams {
  verifyKey: string;
  password: string;
  confirmPassword: string;
}
