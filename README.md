# 0. 主要内容
    1). 理解数据库
    2). 理解MongoDB数据库
    3). 通过命令操作mongodb
    4). 通过mongoose操作mongodb
    
# 1. 理解数据库
    1). 什么是数据库? : 管理数据的系统/软件/服务器
    2). 为什么要用? : 应用开发中有数据持久化存储管理需求, 且数据库的效率是最好的
    3). 分类? : 关系型数据库和NoSQl数据库
    
# 2. 理解MongoDB数据库
    1). 安装
        安装后配置path
        4.0之前的需要手动配置windows服务来实现开机自启动mongodb的服务
    2). Mongodb中的3个重要概念
        数据库: database
        集合: collection
        文档: document
    4). mongodb支持的数据类型
        JS类型: String/Number/Boolean/Array/Date
        mongoose定义类型: mongoose.Types.Mixed/ObjectId
    
# 3. 通过命令操作mongodb(参照操作2遍即可)
## 1. 操作db和collection
    mongo : cmd窗口中连接mongodb
    show dbs : 显示所有数据库
    use db_name : 声明使用某个数据库
    db: 显示当前数据库
    show collections : 显示当前数据库中的所有集合列表
    db.createCollection('users') : 创建一个空集合users
    db.createCollection('emps') : 创建一个空集合emps
    db.emps.drop() : 删除指定名称的集合
    db.dropDatabase() : 删除数据库

## 2. 对集合中的数据进行CRUD操作
    1). C - Create 添加/插入一个或多个新的文档
        db.collection.insert(object1): 一次添加一个对象
        db.collection.insert([object1, object2]): 一次添加多个对象
    
    2). R - Read 查询一个或多个匹配的文档
        db.collection.find(查询条件, 过滤投影): 查询所有匹配的doc
        db.collection.findOne(查询条件, 过滤投影): 查询匹配的一个doc
    
    3). U - Update 更新匹配的文档
        db.collection.update(查询条件, 新数据)  默认只更新一个
        db.collection.update(查询条件, 新数据 , {multi: true})  更新多个
    
    4). D - Delete 删除匹配的文档
        db.collection.remove(查询条件)
    
# 4. 通过mongoose操作mongodb
## 1. 整体流程
    1). 引入mongoose
    2). 连接数据库, 并监视连接是否成功
    3). 创建定义文档结构的schema对象
    4). 创建能用于操作集合数据的Model构造函数
    5). 通过Model或Model实例对集合数据进行CRUD操作
    
## 2. 连接数据库
    const mongoose = require('mongoose)
    mongoose.connect(url).then(
      () => {连接成功},
      error => {连接失败}
    )
    
## 3. 定义schema和Model
    const xxxSchema = new mongoose.Schema({文档结构描述})
    const XxxModel = mongoose.model(xxxs, xxxSchema)

## 4. 通过Model或其实例对象操作集合数据
    XxxModel.create(object).then()
    XxxModel.create(objects).then()
    XxxModel.find(查询条件, 过滤投影).then()
    XxxModel.findOne(查询条件, 过滤投影).then()
    XxxModel.update(查询条件, {$set: 新数据}, {multi: true}).then()
    XxxModel.remove(查询条件).then()