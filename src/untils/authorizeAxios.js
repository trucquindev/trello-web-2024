import axios from 'axios';
import { toast } from 'react-toastify';
import { interceptorLoadingElements } from './formatters';
// khởi tạo một đối tượng Axios mục đích để custom và cấu hình chung cho dự án
let authorizedAxiosInstance = axios.create();

// thời gian chờ tối đa của 1 request : 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

// witd creadentials : sẽ cho phép axios tự động gửi cookie lên mỗi request trên BE(phụ vụ việc chúng ta sẽ lưu JWT token)
// (refresh & access token) vào trong httpOnl Cookie của trình duyệt
authorizedAxiosInstance.defaults.withCredentials = true;

// cấu hình interceptors (Bộ đánh chặn giữa mọi request và response)
// https://axios-http.com/docs/interceptors

// interceptor requests: Can thiệp vào giữa nhưng request api
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // chặn spam click
    interceptorLoadingElements(true);
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

//  interceptor responses : Can thiệp vào giữa những response nhận về
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // chặn spam click
    interceptorLoadingElements(false);
    return response;
  },
  (error) => {
    // chặn spam click
    interceptorLoadingElements(false);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let errorrMessage = error?.message;
    if (error.response?.data?.message) {
      errorrMessage = error.response?.data?.message;
    }
    // dùng toastify để hiện thị mọi lỗi trừ 410- GONE mã của refresh token
    if (error.response?.status !== 410) {
      toast.error(errorrMessage);
    }
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
