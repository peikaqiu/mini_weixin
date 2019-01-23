import 'muse-ui/lib/styles/base.less'
import {
  Button,
  BottomNav,
  List,
  Divider,
  Avatar,
  Icon,
  AppBar
} from 'muse-ui'

const componets = [Button,BottomNav,List,Divider,Avatar,Icon,AppBar]

export default {
  // Vue.use(对象) 方法会调用对象的install方法并且将,Vue构造函数传入install函数内
  install(Vue) {
    componets.forEach(c => Vue.use(c))
  }
}
