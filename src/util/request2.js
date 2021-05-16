// 该文件在尹鹏未集成钉钉后端时使用,集成后可删除
import axios from 'axios';
import { Notify } from 'vant';

axios.defaults.baseURL = '/c/';
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.interceptors.request.use(

  (req) => {
    const rew = req;
    rew.headers.token = sessionStorage.getItem('token'); // 请求头部添加token
    return rew;
  },
  (error) => Promise.reject(error),
);
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.data);
    console.log(`err:${error}`); // for debug
    Notify('网络请求出现问题');
    return Promise.reject(error);
  },
);

export default axios;
