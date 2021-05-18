/**
 * @description  按需引入Vant
*/
import {
  Button, Tabbar, TabbarItem, Cell, CellGroup,Picker, Form, Popup, 
  Field,Notify,Grid, GridItem
} from 'vant';

const pluginsVant = [
  Button,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  Form,
  Popup,
  Field,
  Picker,
  Notify,
  Grid, 
  GridItem

];
export const vantPlugins = {
  install(vm) {
    pluginsVant.forEach((item) => {
      vm.component(item.name, item);
    });
  },
};
