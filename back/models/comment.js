module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘까지 넣고 싶다면 nb4를 붙인다.
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsTo(db.User);
  };
  return Comment;
};
