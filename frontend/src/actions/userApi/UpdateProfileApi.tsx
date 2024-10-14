import axios from "axios";
import { API_END_POINTS } from "../../utils/constant/ApiEndPoints";
import { IApiRes } from "../ActionType";
import { getDecryptedCookie } from "utils/functions/CommonFunctions";
import { cookieKeys } from "utils/constant/Constants";

export const UpdateProfileApi = (body: IUpdateProfileApiParams | FormData): Promise<IApiRes> => {
    const authToken = getDecryptedCookie(cookieKeys.token);
    return axios.put(`${process.env.REACT_APP_API_DOMAIN_ADMIN}/${API_END_POINTS.ADMIN.PROFILE}`, body, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
    }).then((response) => {
        return response.data
    });
};

interface IUpdateProfileApiParams {
    firstName?: string;
    lastName?: string;
    profilePic?: string;
}