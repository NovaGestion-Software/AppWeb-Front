import { isAxiosError } from 'axios';
import apiNoAuth from '../lib/axiosNoAuth';
import { Account } from '../types';

export async function loginEmpresa(formData: Account) {
  try {
    const { data } = await apiNoAuth.post('/login_empresa', formData);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
      // console.log(error.response.data);
    } else {
      throw new Error('Hubo un error...');
    }
  }
}
