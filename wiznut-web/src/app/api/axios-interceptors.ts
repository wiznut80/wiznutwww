import axios from 'axios';
import * as Sentry from '@sentry/nextjs';

const axiosInstance = axios.create({
  baseURL: process.env.WIZNUT_API_BASE_URL,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
      Sentry.captureException(error);
      if (error.response) {
        console.info('[error status] ', error.response.status);
        switch (error.response.status) {
          case 401:
            break;
          case 403:
            break;
          case 500:
            break;
          default:
            console.error('[Unhandled error] ', error.response.status);
        }
      } else if (error.request) {
        // 요청은 발송되었으나 응답을 받지 못한 경우
        console.error('No response received');
      } else {
        // 요청 설정 중에 발생한 에러
        console.error('[Error setting up request] ', error.message);
      }
      return Promise.reject(error);
    }
);

export default axiosInstance;
