import axios from 'axios'
import { API_END_POINTS } from '../../utils/constant/ApiEndPoints'
import { IApiRes } from '../ActionType'
import { cookieKeys } from 'utils/constant/Constants';
import { getDecryptedCookie } from 'utils/functions/CommonFunctions';

export const getProfileAPi = (): Promise<IGetRecentProfileApiRes> => {
  const authToken = getDecryptedCookie(cookieKeys.token);
  return axios.get(`${process.env.REACT_APP_API_DOMAIN_ADMIN}/${API_END_POINTS.ADMIN.PROFILE}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }).then((response) => {
    return response.data
  })
}

interface IGetRecentProfileApiRes extends IApiRes {
  data: {
    firstName: string
    lastName: string
    email: string
    profilePic: number
    userId: number
    roleId: string
    createdBy: string
    permission: string[]
  }
}
