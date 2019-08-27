/* 
1. 引入mongoose
2. 连接数据库, 并监视连接是否成功
3. 创建定义文档结构的schema对象
4. 创建能用于操作集合数据的Model构造函数
5. 通过Model或Model实例对集合数据进行CRUD操作
*/

const md5 = require('blueimp-md5')
//1. 引入mongoose 
const mongoose = require('mongoose')

// 2. 连接数据库, 并监视连接是否成功
const url = 'mongodb://localhost:27017/test2'
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true })
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
  name: {
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
}, {versionKey: false}) // 不要生成__v这个属性

// 4. 创建能用于操作集合数据的Model构造函数
const UserModel = mongoose.model('users', userSchema)


//5. 通过Model或Model实例对集合数据进行CRUD操作

/*
需求:
1. 保存一个新的user数据对象
2. 保存多个新的user数据对象
3. 查询一个年龄为21的user
4. 查询所有年龄为21的user
5. 查询所有年龄为21的user, 但不需要user中的pwd数据
6. 更新所有年龄为21的info为atuigu
7. 删除所有年龄小于22的user
*/
/*
测试保存
1. 保存一个新的user数据对象
2. 保存多个新的user数据对象
*/
function testAdd() {
  const user = {
    name: 'damu3',
    pwd: md5('123'),
    age: 23,
    sex: '男',
    phone: '13712341234',
    likes: ['吃吃吃', '睡睡睡', '喝喝喝'],
    info: '看着不像女的'
  }
  const user2 = {
    name: 'sadamu3',
    pwd: md5('234'),
    age: 23,
    sex: '男',
    phone: '13312341234',
    likes: ['吃吃吃', '睡睡睡', '喝喝喝'],
    info: '本人男爱好女'
  }

  /* UserModel.create(user).then(
    userDoc => {
      console.log('保存成功', userDoc)
    },
    error => {
      console.log('保存失败', error)
    },
  ) */

  /* new UserModel(user2).save().then(
    userDoc => {
      console.log('保存成功2', userDoc)
    },
    error => {
      console.log('保存失败2', error)
    },
  ) */

  UserModel.create([user, user2]).then(
    userDocs => {
      console.log('保存成功', userDocs)
    },
    error => {
      console.log('保存失败', error)
    },
  )
}
// testAdd()

/*
测试查询
3. 查询一个年龄为21的user
4. 查询所有年龄为21的user
5. 查询所有年龄为21的user, 但不需要user中的pwd数据
*/
function testQuery() {
  // 3. 查询一个年龄为21的user
  UserModel.findOne({age: 21}).then(
    userDoc => {
      console.log('查询成功1', userDoc)
    },
    error => {
      console.log('查询失败1', error)
    }
  )

  // 4. 查询所有年龄为21的user
  // 5. 查询所有年龄为21的user, 但不需要user中的pwd数据
  UserModel.find({age: 21}, {pwd: 0}).then(
    userDocs => {
      console.log('查询成功2', userDocs)
    },
    error => {
      console.log('查询失败2', error)
    }
  )
}
// testQuery()

/*
测试更新
6. 更新所有年龄为21的info为atuigu
*/
function testUpdate() {
  UserModel.update({age: 21}, {info: 'atguigu'}, {multi: true}).then(
    doc => {
      console.log('更新成功', doc)
    },
    error => {
      console.log('更新失败', error)
    }
  )

}
// testUpdate()

/*
测试删除
7. 删除所有年龄小于22的user
*/
function testDelete() {
  UserModel.deleteMany({age: {$lt: 22}}).then(
    doc => {
      console.log('删除成功', doc)
    },
    error => {
      console.log('删除失败', error)
    }
  )
}
testDelete()