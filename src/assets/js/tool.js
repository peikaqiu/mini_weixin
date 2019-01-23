const weelArr = ['天', '一', '二', '三', '四', '五', '六']

export function timeDesc(time) {
  let nowYear = new Date().getFullYear()
  let nowMonth = new Date().getMonth() + 1
  let nowData = new Date().getDate()

  let oldYear = new Date(time).getFullYear()
  let oldMonth = new Date(time).getMonth() + 1
  let oldData = new Date(time).getDate()
  let oldHouer = new Date(time).getHours()
  let oldMin = new Date(time).getMinutes()
  let week = new Date(time).getDay()
  if(nowYear - oldYear > 0){
    let Month = returnDoubleDate(oldMonth+'')
    let Data = returnDoubleDate(oldData+'')
    return `${oldYear}/${Month}/${Data}`
  }else if(nowMonth - oldMonth >1){
    return `${nowMonth - oldMonth}月前`
  }else if(nowData - oldData > 7){
    return `${nowData - oldData}天前`
  }else if(nowData - oldData>2 && nowData - oldData <=7 ){
    return `星期${weelArr[week]}`
  }else if(nowData - oldData>1 && nowData - oldData <=2 ){
    return `昨天`
  }else if(nowData - oldData<=1){
    if(oldHouer>12){
      return `下午${oldHouer-12}:${oldMin}`
    }else{
      return `上午${oldHouer}:${oldMin}`
    }
  }
}

function returnDoubleDate(time) {
  return ('00' + time).substr(time.length)
}
