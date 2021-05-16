import { createStore } from 'vuex';
import { login, getInfo } from '@/api/user';

export default createStore({
  state: {
    userNmae: 'vue3.0',
  },
  mutations: {
    getUserNmae(state, data) {
      state.userNmae = data;
    },
  },
  actions: {
    async forceGetUserInfo(state, data) {
      console.log(`参数${JSON.stringify(data)}`);
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
