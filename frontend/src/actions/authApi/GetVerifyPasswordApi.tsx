import { HTTPService } from '../../utils/axios/index';
import { API_END_POINTS } from '../../utils/constant/ApiEndPoints';
import { IApiRes } from '../ActionType';

export const GetVerifyPasswordApi = (
  body: IGetVerifyPasswordApiParams
): Promise<IApiRes> => {
  return HTTPService.get(API_END_POINTS.AUTH.VERIFY_PASSWORD_KEY, body);
};

interface IGetVerifyPasswordApiParams {
  verifyKey: string | undefined;
}
