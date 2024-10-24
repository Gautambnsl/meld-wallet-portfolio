/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTPService from '../api';
import { API_END_POINTS } from '../../utils/constants/ApiEndPoints';

export const subscribeAPI = (data: any) => {
  return HTTPService.post(API_END_POINTS.USER.SUBSCRIBE, data);
};