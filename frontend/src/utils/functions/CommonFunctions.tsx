import moment from 'moment'
import { AES, enc } from 'crypto-js'
import {
  STACKING_STATUS_VALUE,
  cookieExpiresInDays,
  cookieKeys,
  dateFormat,
  envType
} from 'utils/constant/Constants'

interface MyObject {
  [key: string]: any
}

export const filterParameter = (data: MyObject) => {
  const newData: MyObject = {}
  Object.keys(data).forEach((key) => {
    const value = data[key]
    if (value !== undefined && value !== null && value !== '') {
      newData[key] = value
    }
  })
  return newData
}

export const getFormattedDate = (utcDate: string) => {
  return moment(utcDate).format(dateFormat)
}

export const handleTrim = (
  eventName: string,
  eventValue: string,
  setValue: any
) => {
  if (eventValue.trim() === '') {
    setValue(eventName, '')
  } else {
    setValue(eventName, eventValue)
  }
}

// convert an image to base64
export const getBase64 = (file: any) => {
  if (file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        return resolve(reader.result)
      }
      reader.onerror = function (error) {
        reject(error)
      }
    })
  } else {
    return Promise.resolve('')
  }
}
/**
 * This function will take cookie name as input and returns its decrypted value
 *
 * @param {string} key the name of the cookie
 * @returns {string} decrypted cookie string
 *
 * @isTestWrittenForThisFunction `true`
 */
export const getDecryptedCookie = (key: string) => {
  if (key) {
    const keyName = cookieKeys.initialKey + '-' + key.trim()
    const cookieData = getCookie(keyName)
    if (cookieData) {
      return decryptData(cookieData)
    }
  }
}

/**
 * It will take a key as Input and returns the cookie value of that key
 * @param {string} cookieName
 * @returns {string} cookie
 *
 * @isTestWrittenForThisFunction `false`
 */
export const getCookie = (cookieName: string) => {
  const name = cookieName + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  if (decodedCookie) {
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim()
      while (c.charAt(0) === '') {
        c = c.substring(1)
      }
      if (+c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
  }
  return ''
}

/**
 * This function accepts any input type and returns an encrypted string.
 *
 * @param {any} data
 * @returns {string}
 *
 * @isTestWrittenForThisFunction `true`
 */

export const encryptData = <
  T extends
  | string
  | object
  | boolean
  | Array<string>
  | Array<{ [key: string]: string | object }>
>(
  data: T
) => {
  return AES.encrypt(JSON.stringify(data), cookieKeys.secretKey)
}

/**
 * This function wil decrypt an encrypted string {the encrypted string suppose to be an object}
 *
 * @param {string} data
 * @returns {json | string}
 *
 * @isTestWrittenForThisFunction `true`
 */
export const decryptData = (data: string) => {
  const bytes = AES.decrypt(data.toString(), cookieKeys.secretKey)
  if (bytes.toString()) {
    return JSON.parse(bytes.toString(enc.Utf8))
  }
  return ''
}

/**
 * It will set and encrypted cookie to localhost and lateron we can use this cookie by decrypting it.
 * @param  {string} key
 * @param {any} data
 *
 * @isTestWrittenForThisFunction `true`
 */
export const setEncryptedCookie = <
  T extends
  | string
  | object
  | boolean
  | Array<string>
  | Array<{ [key: string]: string | object }>
>(
  key: string,
  data: T
) => {
  if (data && key) {
    const encryptedString = encryptData(data)
    const keyName = cookieKeys.initialKey + '-' + key.trim()
    const date = new Date()
    const expiryTime = new Date(
      date.setTime(
        date.getTime() + cookieExpiresInDays * 24 * 60 * 60 * 1000
      )
    ).toUTCString()
    if (process.env.REACT_APP_ENV_NAME === envType.DEVELOPMENT) {
      document.cookie = `${keyName}=${encryptedString};expires=${expiryTime};domain=${window.location.hostname};path=/;`
    } else {
      document.cookie = `${keyName}=${encryptedString};expires=${expiryTime};domain=${window.location.hostname.replace(
        'central',
        ''
      )};secure;path=/;`
    }
  }
}

/**
 * This function takes a key as input and remove that key's cookie from storage.
 * @param {string} key name of the cookie
 *
 * @isTestWrittenForThisFunction `false`
 */
export const removeCookie = (key: string) => {
  if (key) {
    const keyName = cookieKeys.initialKey + '-' + key.trim()
    if (process.env.REACT_APP_ENV_NAME === envType.DEVELOPMENT) {
      document.cookie = `${keyName}=;expires=${new Date(
        0
      ).toUTCString()};domain=${window.location.hostname};path=/;`
    } else {
      document.cookie = `${keyName}=;expires=${new Date(
        0
      ).toUTCString()};domain=${window.location.hostname.replace(
        'central',
        ''
      )};path=/;`
    }
  }
}

export const bytesToFormatted = (bytes: number) => {
  const KB = bytes / 1024;
  if (bytes < 0) {
    return "Infinite(∞)"
  }
  if (KB < 1000) {
    return KB.toFixed(2) + " KB";
  } else {
    const MB = KB / 1024;
    if (MB < 1000) {
      return MB.toFixed(2) + " MB";
    } else {
      const GB = MB / 1024;
      if (GB < 1000) {
        return GB.toFixed(2) + " GB";
      } else {
        const TB = GB / 1024;
        return TB.toFixed(2) + " TB";
      }
    }
  }
};

export const getQueryData = (state: number) => {
  if (state === STACKING_STATUS_VALUE.GENERAL) {
    return "General";
  } else if (state === STACKING_STATUS_VALUE.SOLUTION_PARTNERS) {
    return "Solution Partners";
  } else if (state === STACKING_STATUS_VALUE.TECHNOLOGY_PARTNERS) {
    return "Technology Partners";
  } else if (state === STACKING_STATUS_VALUE.EDUCATION_PARTNERS) {
    return "Education Partners";
  } else if (state === STACKING_STATUS_VALUE.ENROLL_BUSINESS) {
    return "Enroll Business";
  } else if (state === STACKING_STATUS_VALUE.BOUNTY_BUGS) {
    return "Bounty Bugs";
  }
};

export const getDomain = (state: string) => {
  if (state === 'edexa.network') {
    return 'Network';
  } else if (state === 'edexa.com') {
    return 'Website';
  } else {
    return 'Others';
  }
};