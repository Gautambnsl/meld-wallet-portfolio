import HTTPService from '../api';
import { API_END_POINTS } from '../../utils/constants/ApiEndPoints';

export const unsubscribeAPI = () => {
  return HTTPService.post(API_END_POINTS.USER.UNSUBSCRIBE, {});
};