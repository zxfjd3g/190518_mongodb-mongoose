/* 
1. 引入mongoose
2. 连接数据库, 并监视连接是否成功
3. 创建定义文档结构的schema对象
4. 创建能用于操作集合数据的Model构造函数
5. 通过Model或Model实例对集合数据进行CRUD操作
*/

//1. 引入mongoose 
const mongoose = require('mongoose')

// 2. 连接数据库, 并监视连接是否成功
const url = 'mongodb://localhost:27017/test2'
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('连接数据库成功')
  })
  .catch(error => {
    console.log('连接数据库失败', error)
  })

// 3. 创建定义文档结构的schema对象
/* 
  用户相关信息
    用户名: 必须的且唯一的
    密码: 必须的
    年龄
    电话
    爱好: 可以有多个
    时间: 包含创建时间和更新时间的对象, 时间默认值为当前时间
    相关信息: 可以任意类型
*/
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // 必须
    unique: true, // 唯一
  },
  pwd: {
    type: String,
    required: true, // 必须
  },
  age: Number,
  phone: String,
  likes: Array,
  time: {
    create_time: {
      type: Date,
      default: Date.now // 不能调用
    },
    update_time: {
      type: Date,
      default: Date.now // 不能调用
    }
  },
  info: mongoose.SchemaTypes.Mixed // 任意类型
})

// 4. 创建能用于操作集合数据的Model构造函数
const UserModel = mongoose.model('users', userSchema)
