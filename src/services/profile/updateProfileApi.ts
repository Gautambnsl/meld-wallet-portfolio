import HTTPService from '../api';
import { API_END_POINTS } from '../../utils/constants/ApiEndPoints';

export const updateProfileApi = (data: any) => {
  return HTTPService.post(API_END_POINTS.USER.UPDATE, data);
};
