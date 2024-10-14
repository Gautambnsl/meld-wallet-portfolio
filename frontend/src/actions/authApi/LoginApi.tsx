import axios from "axios";
import { API_END_POINTS } from "../../utils/constant/ApiEndPoints";
import { IApiRes } from "../ActionType";
import { dispatch } from "store";
import { openSnackbar } from "store/reducers/snackbar";

export const LoginApi = (body: ILoginApiParams): Promise<ILoginApiRes> => {
    return axios.post(`${process.env.REACT_APP_API_DOMAIN_ADMIN}${API_END_POINTS.AUTH.LOGIN}`, body).then((response) => {
        dispatch(
            openSnackbar({
                open: true,
                message: response.data.message,
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            })
        )
        return response.data
    }).catch((error) => {
        dispatch(
            openSnackbar({
                open: true,
                message: error.response.data.message,
                variant: 'alert',
                alert: {
                    color: 'error'
                },
                close: false
            })
        )
    });
};

interface ILoginApiParams {
    email: string;
    password: string;
}

export interface IUserData {
    adminRole: {
        isActive: string;
        isDeleted: string;
        roleLevel: number;
        roleName: string;
    }
    createdAt: string;
    createdBy: string;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    notification: number;
    permission: any;
    profilePic: string
    roleId: string;
    updatedAt: string;
    userId: string;
}

interface ILoginApiRes extends IApiRes {
    data: {
        token: string;
        user: IUserData;
    };
}
