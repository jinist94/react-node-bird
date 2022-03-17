module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // 모델 이름. MySQL에서는 자동으로 소문자, 복수로 users의 테이블이 생성된다.
      // id가 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30), // 자바스크립트에서 1차 검증을 하겠지만 데이터베이스에서도 검사를 한번 해주어야 한다.
        allowNull: false, // 필수면 false
        unique: true, // 고유한 값인지
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Likers" }); // 사용자와 게시글의 좋아요 관계
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followers", foreignKey: "FollowingId" });
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followings", foreignKey: "FollowerId" });
  };
  return User;
};

// 첫번째 객체는 MySQL에 저장할 데이터의 형식을 지정
//2번째 객체는 유저 모델에 대한 세팅
