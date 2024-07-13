import AxiosInstance from '../AxiosInstance'
export const login = async (email, password) => {
  try {
    const url = '/users/login'
    const body = {
      email: email,
      password: password
    }
    return await AxiosInstance().post(url, body)
  } catch (error) {
    throw error
  }
}

export const register = async (email, password, username) => {
  try {
    const url = '/users/register'
    const body = {
      email: email,
      password: password,
      username: username
    }
    return await AxiosInstance().post(url, body)
  } catch (error) {
    throw error
  }
}

// export const fogotPass = async email => {
//   try {
//     const url = '/users/forgot-password';
//     const body = {
//       email: email,
//     };
//     return await AxiosInstance().post(url, body);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
