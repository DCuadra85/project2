
module.exports = function (sequelize, DataTypes) {
    var UserSongs = sequelize.define("UserSongs", {
    });
  
    // associate UserEvents with Users and Events
    UserSongs.associate = models => {
      // Each UserEvent belongs to one User
      models.UserSongs.belongsTo(models.User, { onDelete: "cascade" });
      // and One Event
      models.UserSongs.belongsTo(models.Songs, { onDelete: "cascade" });
    }
  
    return UserSongs;
  }