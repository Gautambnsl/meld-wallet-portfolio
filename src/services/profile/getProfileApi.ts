import HTTPService from '../api';
import { API_END_POINTS } from '../../utils/constants/ApiEndPoints';

export const getProfileApi = () => {
  return HTTPService.get(API_END_POINTS.USER.PROFILE);
};
