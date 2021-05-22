/**
 * @description  按需引入Vant
*/
import {
  Button, Tabbar, TabbarItem, Cell,CellGroup,Picker, Form, Popup, 
  Field,Grid, GridItem,Empty,Swipe, SwipeItem,DatetimePicker,
  Col, Row,Tab,Tabs,NoticeBar,Divider,Loading
} from 'vant';

const pluginsVant = [
  Empty,Button,Tabbar,TabbarItem,Cell,
  CellGroup,Form,Popup,Field,Picker,Divider
  ,Grid, GridItem,Swipe, SwipeItem,
  DatetimePicker,Col, Row,Tab, Tabs ,NoticeBar,
  Loading
];
export const vantPlugins = {
  install(vm) {
    pluginsVant.forEach((item) => {
      vm.component(item.name, item);
    });
  },
};
