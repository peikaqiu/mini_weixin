export default {
  // 根据state消息数据生成,message页面列表数据,包含头像,用户名,消息等
  msgViewList(state){
    let result = []
    let friends = state.data.friends
    if (!friends) {
      result
    }
    state.messageList.forEach(item => {
      // 根据id获取好友信息
      let friendsData = friends.find(f => f._id === item._id)
      let unread = 0
      let lastMessage = {}
      let toTop = item.toTop
      item.list.forEach(m => {
        if (!m.read) {
          unread++
        }
        lastMessage = m
      })
      result.push({
        ...friendsData,
        unread,
        lastMessage,
        toTop
      })
    })
    //console.log(result);
    return result
  },
  totalUnread(state, getters){
    let resultArr = getters.msgViewList
    let unread = 0
    resultArr.map(u => {
      unread += u.unread
    })
    return unread
  },
  firstCord(state){
    let record =  state.data.friends.map(f => f.firstcode)
    let arrLetter = [...new Set(record)].sort()
    console.log(arrLetter);
    return arrLetter
  },
  circleViewList(state){
    let friendCircle = state.data.circle
    return friendCircle
  },
  commentViewList(state){
    let record = state.commentArr
    return record
  }
}
