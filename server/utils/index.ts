import axios from 'axios';

export const fetchData = async (apiUrl: string, headers: any) => {
  return await axios(apiUrl, {
    method: 'GET',
    withCredentials: true,
    headers: headers,
  });
};
