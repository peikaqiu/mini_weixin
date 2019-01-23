// 引入后台ajax模块
const ajax = require('superagent')
// 引入假数据文件
const data = require('./mockdata.json')
const self = data.self
const friends = data.friend
const circle = data.circle

module.exports = {
  devServer: {
    before: function (app) {
      app.get('/api/self', (req, res) => {
        res.json({data: self})
      })
      app.get('/api/friends', (req, res) => {
        res.json({data: friends})
      })
      app.get('/api/circle', (req ,res) => {
        res.json({data: circle})
      })
      app.get('/api/robot', (req, res) => {
        // 当请求http://localhost:8080/api/robot?id=123&msg=hello
        // req.query = {id: 123,msg: 'hello'}
        console.log(req.query)
        let info = req.query.msg
        let userid = req.query.id
        let key = '069e90c4262243bf964ad95014371384'
        // 后台网络请求其他服务器的数据
        ajax.post('http://www.tuling123.com/openapi/api')
          .send({info, userid, key})
          .end((err,data) => {
            if(err){
              console.log(err)
            }
            res.json({
              data: data.text
            })
          })
      })
    }
  }
}
