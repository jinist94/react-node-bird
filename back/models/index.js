const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // 배포 시 process.env.NODE_ENV 부분이 production으로 변경. 아무것도 설정되어있지 않다면 development
const config = require("../config/config")[env]; // 현재 env는 development이기 때문에 config에서 설정한 development를 가지고 오게 된다.
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); //sequelize가 Node와 MySQL을 연결시켜준다.

db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// db를 반복하며 모델들의 associate를 실행

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
