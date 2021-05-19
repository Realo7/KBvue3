/**
 * @description  按需引入Vant
*/
import {
  Button, Tabbar, TabbarItem, Cell, CellGroup,Picker, Form, Popup, 
  Field,Notify,Grid, GridItem,Empty,Swipe, SwipeItem,DatetimePicker
} from 'vant';

const pluginsVant = [
  Empty,Button,Tabbar,TabbarItem,Cell,
  CellGroup,Form,Popup,Field,Picker,
  Notify,Grid, GridItem,Swipe, SwipeItem,
  DatetimePicker
];
export const vantPlugins = {
  install(vm) {
    pluginsVant.forEach((item) => {
      vm.component(item.name, item);
    });
  },
};
