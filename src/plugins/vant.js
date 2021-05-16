/**
 * @description  按需引入Vant
*/
import {
  Button, Tabbar, TabbarItem, Cell, CellGroup,
} from 'vant';

const pluginsVant = [
  Button,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
];
export const vantPlugins = {
  install(vm) {
    pluginsVant.forEach((item) => {
      vm.component(item.name, item);
    });
  },
};
