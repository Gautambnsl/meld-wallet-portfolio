import HTTPService from '../api';
import { API_END_POINTS } from '../../utils/constants/ApiEndPoints';

export const subscribeAPI = (data) => {
  return HTTPService.post(API_END_POINTS.USER.SUBSCRIBE, data);
};