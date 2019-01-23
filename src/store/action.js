import * as types from './mutation-types'

export default {
  async getAllData({commit}, axios){
    commit(types.REFRESH_AJAX, true) // 正在请求
    let friends = await axios.get('/api/friends')
    friends = friends.data.data
    let self = await axios.get('/api/self')
    self = self.data.data
    let circle = await axios.get('/api/circle')
    circle = circle.data.data

    commit(types.RECEIVE_DATA, {self, friends, circle})
    commit(types.REFRESH_AJAX, false) //请求完毕
  },
  getNewMessage({commit}, {axios, id, msg}){
    return new Promise(resolve => {
      axios.get(`/api/robot?id=${id}&msg=${msg}`).then(
        res => {
          let data = JSON.parse(res.data.data)  // 将json字符串转化成对象
          // res.data => {data: "{"code":100000,"text":"我还不错呦，你应该能看出来吧。"}"}
          setTimeout(() => {
            commit(types.GET_NEW_MESSAGE, {msg: data.text, id, time: new Date().getTime()})
          }, 1000)
          resolve() // 异步函数执行完毕
        }
      )
    })
  },
  sendParToChar({commit}, item){
    commit(types.RECEIVE_CURRENT_USER, item)
  },
  sentMsg({commit}, msg){
    commit(types.ADD_MESSAGE, msg)
  },
  getCircleMsg({commit},{msg,time,pic}){
    commit(types.ADD_CRICLE_MESSAGE, {msg,time,pic})
  },
  delCircleMsg({commit},index){
    commit(types.DEL_CRICLE_MESSAGE,index)
  },
  thumbUp({commit},index){
    commit(types.DIAN_ZAN,index)
  },
  getMsg({commit},{index,msg}){
    commit(types.SET_MSG_ARR,{index,msg})
  },
  setCommentArr({commit}){
    commit(types.SET_COMMENT_ARR)
  }
}
