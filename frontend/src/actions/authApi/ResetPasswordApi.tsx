import { HTTPService } from "../../utils/axios/index";
import { API_END_POINTS } from "../../utils/constant/ApiEndPoints";
import { IApiRes } from "../ActionType";

export const ResetPasswordApi = (body: IResetPasswordApiParams): Promise<IApiRes> => {
    return HTTPService.post(API_END_POINTS.AUTH.FORGOT_PASSWORD, body);
};

interface IResetPasswordApiParams {
    email: string;
}