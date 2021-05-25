import { createStore } from 'vuex';
import { login, getInfo } from '@/api/user';

export default createStore({
  state: {
    userNmae: 'vue3.0',
    authCode:'',
    userid: '',
    username: '',//钉钉返回的用户名
    avatar: '',
    mobile: '15526441465',
    qhid:0,//上线重置
    qhusername:'',//琦航对应的用户名
    qhroleId:0,
    test:'1',
    showtabbar:true
  },
  mutations: {
    getUserNmae(state, data) {
      state.userNmae = data;
    },
    getTest(state,test){
      state.test=test
    }
  },
  actions: {
    async forceGetUserInfo(state, data) {
      const rew = await getInfo(data)
        .then(
          (res) => {
            console.log(res);
            return res;
          },
        )
        .catch(
          (err) => {
            console.log(err);
            return err;
          },
        );
      return rew;
    },
    async dduserlogin(state, authCode) {
      console.log(`参数${JSON.stringify(authCode)}`);
      const rew = await login(authCode)
        .then(
          (res) => {
            console.log(`login返回res${res}`);
            return res;
          },
        )
        .catch((err) => {
          console.log(`login返回err${err}`);
          return err;
        });
      return rew;
    },
  },
  modules: {
  },
});
