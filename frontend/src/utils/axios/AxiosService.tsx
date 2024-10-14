import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { dispatch, store } from 'store'
import { LOGOUT } from 'store/reducers/actions'
import { openSnackbar } from 'store/reducers/snackbar'
import { setLoading } from 'store/slices/loadingSlice'
import { cookieKeys, project } from 'utils/constant/Constants'
import { StatusCode } from 'utils/constant/StatusCode'
import { getDecryptedCookie } from 'utils/functions/CommonFunctions'

const getUrl = () => {
  const selectedProject = store.getState()?.auth?.currentProject
  if (selectedProject === project.admin) {
    return process.env.REACT_APP_API_DOMAIN_ADMIN
  } else if (selectedProject === project.banji) {
    return process.env.REACT_APP_API_DOMAIN_BANJI
  } else if (selectedProject === project.bvote) {
    return process.env.REACT_APP_API_DOMAIN_BVOTE
  } else if (selectedProject === project.bmessage) {
    return process.env.REACT_APP_API_DOMAIN_BMESSAGE
  } else if (selectedProject === project.nft) {
    return process.env.REACT_APP_API_DOMAIN_BNFT
  } else if (selectedProject === project.bstamp) {
    return process.env.REACT_APP_API_DOMAIN_BSTAMP
  } else if (selectedProject === project.byou) {
    return process.env.REACT_APP_API_DOMAIN_BYOU
  } else if (selectedProject === project.universe) {
    return process.env.REACT_APP_API_DOMAIN_UNIVERSE
  } else if (selectedProject === project.edexanetwork) {
    return process.env.REACT_APP_API_DOMAIN_STAKING
  } else if (selectedProject === project.btrack) {
    return process.env.REACT_APP_API_DOMAIN_BTRACK
  } else if (selectedProject === project.bsign) {
    return process.env.REACT_APP_API_DOMAIN_BSIGN
  } else {
    return process.env.REACT_APP_API_DOMAIN_ADMIN
  }
}

const axiosServices = axios.create()

const errorInterceptor = (errorResponse: AxiosResponse) => {
  if (errorResponse) {
    const { status } = errorResponse.data
    if (
      status === StatusCode.unauthorized ||
      status === StatusCode.not_acceptable
    ) {
      localStorage.clear()
      sessionStorage.clear()
      dispatch({ type: LOGOUT })
    } else {
      dispatch(
        openSnackbar({
          open: true,
          message: errorResponse.data.message,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      )
    }
  }
  dispatch(setLoading(false))
}

function checkInternetConnectivity() {
  return navigator.onLine
}

axiosServices.interceptors.request.use(
  (request) => {
    if (!checkInternetConnectivity()) {
      dispatch(
        openSnackbar({
          open: true,
          message: 'No Internet Connection!',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      )
      return Promise.reject(new Error('No Internet Connection'))
    }
    const cookie = getDecryptedCookie(cookieKeys.token)
    if (cookie) {
      request.headers.Authorization = `Bearer ${cookie}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    errorInterceptor(error.response)
    return Promise.reject(error?.response?.data || 'Wrong Services')
  }
)

class HTTPService {
  static async request<T>(
    method: string,
    url: string,
    params?: any,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    let baseURL = getUrl()
    try {
      dispatch(setLoading(true))
      const response = await axiosServices.request<T>({
        method,
        baseURL,
        url,
        params,
        data,
        ...config
      })
      if (method !== 'GET') {
        dispatch(
          openSnackbar({
            open: true,
            // @ts-ignore
            message: response.data.message,
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        )
      }
      return response.data
    } catch (error: any) {
      dispatch(
        openSnackbar({
          open: true,
          message: error?.message,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      )
      // Explicitly specify the type of the error object
      return Promise.reject(error?.response?.data || error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  static get<T>(url: string, params?: any): Promise<T> {
    return HTTPService.request<T>('GET', url, params)
  }

  static put<T>(url: string, body: any): Promise<T> {
    return HTTPService.request<T>('PUT', url, {}, body)
  }

  static patch<T>(url: string, body: any): Promise<T> {
    return HTTPService.request<T>('PATCH', url, {}, body)
  }

  static post<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return HTTPService.request<T>('POST', url, {}, body, config)
  }

  static delete<T>(url: string, body?: any): Promise<T> {
    const deleteConfig: AxiosRequestConfig = body
      ? { data: body }
      : {}
    return HTTPService.request<T>(
      'DELETE',
      url,
      {},
      undefined,
      deleteConfig
    )
  }

  static deleteWithParams<T>(url: string, params?: any): Promise<T> {
    return HTTPService.request<T>('DELETE', url, params)
  }
}

export default HTTPService
