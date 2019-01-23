import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutation'
import actions from './action'
import getters from  './getters'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: process.env.BASE_URL,
    data: {
      self: {},
      friends: [],
      circle:[]
    },
    currentUser: {}, // 当前聊天对象
    currentMsgList: {}, // 当前聊天对象的聊天记录
    chat:false,//是否打开了页面
    isAjax: false,
    toBottom:false,
    commentArr:null,
    // 消息列表
    messageList: [
      {// 上午
        _id: 1,
        toTop:true,
        list: [
          {msg: '你大爷', time: 1546853193936, read: false},
          {msg: '快还钱?', time: 1546853195938, read: false},
          {msg: '脸都给你打歪?', time: 1546853199936, read: false}
        ]
      }, // 下午
      {
        _id: 2,
        toTop:false,
        list: [
        {msg: '我会讲笑话', time: 1546803095936, read: true},
        {msg: '笑话?', time: 1546803096936, read: true, self: true}
      ]
      }, // 昨天
      {_id: 3, toTop:false,list: [{msg: '吃了没，帮我打包?', time: 1546703067936, read: false}]}, // 1天前
      {_id: 4, toTop:false,list: [{msg: 'hi,我是vue?', time: 1546553077936, read: false}]}, // 七天以内 展示星期几      星期天
      {_id: 5, toTop:false,list: [{msg: '来了，老弟', time: 1541900394524, read: false}]} // 一年以上展示年月日
    ]
  },
  mutations,
  actions,
  getters
});
