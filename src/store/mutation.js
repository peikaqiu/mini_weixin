import * as types from './mutation-types'

export default {
  [types.RECEIVE_DATA](state, data){
    state.data = data
  },
  [types.REFRESH_AJAX](state, val){
    state.isAjax = val
  },
  [types.DELETD_MESSAGE](state, id){
    let record = state.messageList.find(m => m._id === id)
    if (!record) {
      return
    }
    let index = state.messageList.indexOf(record)
    state.messageList.splice(index, 1)
  },
  [types.PUT_MESSAGE](state, id){
    let record = state.messageList.find(m => m._id === id)
    let index = state.messageList.indexOf(record)

    let num = 0
    state.messageList.map(m => {
      if (m.toTop) {
        num++
      }
      return num
    })

    if (!record.toTop) {
      let msg = state.messageList.splice(index, 1)
      state.messageList.unshift(msg[0])
      record.toTop = true
      //console.log(state.messageList.toTop);

    } else {
      let message = state.messageList.splice(index, 1)
      console.log(num);
      state.messageList.splice(num - 1, 0, message[0])
      record.toTop = false
      //console.log(state.messageList.toTop);
    }
  },
  [types.RECEIVE_CURRENT_USER](state, user){
    state.toBottom = true
    state.currentUser = user
    let record = state.messageList.find(f => f._id === user._id)
    if (!record) {
      record = {
        _id: user._id,
        list: []
      }
      state.messageList.push(record)
    }else{
      record.list.forEach(f => f.read = true)
    }
    state.currentMsgList = record
  },
  [types.ADD_MESSAGE](state,msg){
    state.currentMsgList.list.push(msg)
  },
  [types.GET_NEW_MESSAGE](state,{msg,id,time}){
    // 根据id返回对应好友的聊天消息数组
    let record = state.messageList.find(m => m._id === id)
    if (!record) {
      // 当前好友没有与用户没有聊天记录,向messageList添加一条对应的聊天记录
      record = {
        _id: id,
        list: []
      }
      state.messageList.push(record)
    }
    let read = state.currentUser._id === id && state.chat
    record.list.push({
      msg,
      time,
      read
    })
  },
  [types.ADD_CRICLE_MESSAGE](state,{msg,time,pic}){
    /*let record = {...state.data.self}
    record.msg = msg
    record.time = time
    record.pic = pic
    //console.log(record);
    state.data.circle = [record, ...state.data.circle]
    console.log(state.data.circle);*/
    let avatar = state.data.self.avatar
    let name = state.data.self.name
    let good = state.data.self.good
    let sayarr = state.data.self.sayarr
    let record = {avatar,name,good,sayarr,msg,time,pic}
    state.data.circle = [record, ...state.data.circle]
    console.log(state.data.circle);
  },
  /*[types.DEL_CRICLE_MESSAGE](state,{time}){
    let record = state.data.circle.find(f => f.time = time)
    let index = state.data.circle.indexOf(record)
    state.data.circle.splice(index,1)
    console.log(record);
    console.log(index);
  },*/
  [types.DEL_CRICLE_MESSAGE](state,index){
    state.data.circle.splice(index,1)
  },
  [types.DIAN_ZAN](state,index){
    let indexs = index
    let record = state.data.circle[indexs]
    record.good = !record.good
  },
  [types.SET_MSG_ARR](state,{index,msg}){
    let record = state.data.circle[index]
    record.sayarr.push(msg)
  },
  [types.SET_COMMENT_ARR](state){
    let result = []
    let record = state.data.circle
    for(let i=0;i<record.length;i++){
      result[i] = record[i].sayarr
    }
    state.commentArr = result
  }
}
