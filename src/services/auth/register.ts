import HTTPService from '../api';
import { IApiRes } from '../ActionType';
import { API_END_POINTS } from '../../utils/constants/ApiEndPoints';

export const registerAPI = (body: {
  name: string;
  email: string;
  password: string;
}): Promise<IApiRes> => {
  return HTTPService.post(API_END_POINTS.USER.SIGNUP, body);
};
