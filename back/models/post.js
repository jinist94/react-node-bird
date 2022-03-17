module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    // RetweetId
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘까지 넣고 싶다면 nb4를 붙인다.
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: "postHashtag" });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Liked" }); // 사용자와 게시글의 좋아요 관계
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // Retweet, Post 안에서의 1대 다 관계 (column 생성)
  };
  return Post;
};
